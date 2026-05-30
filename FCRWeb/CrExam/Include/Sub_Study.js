/****************************************************************************

  @file Sub_Study.js

  @brief Sub_Studyのクライアントスクリプト

  @author YSK齋藤

        SpotCode MAX 9

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/11  YSK齋藤       V1.0　     新規作成
  @date  06/10/23  HSK山本       V1.4       CR検査部構造見直し[4]対応 
  @date  06/11/09  HSK酒井       V1.4       CR検査部構造見直し[2]対応 
  @date  06/11/21  YSK齋藤       V1.4　     PVCS#1770対応 
  @date  10/06/01  FF 星野       V2.0(B)    CQ#219対応 

/****************************************************************************/
var COMMAND_MODE_COMPLETED= "COMPLETED";  //確認
var COMMAND_MODE_MODIFY		= "MODIFY";     //修正
var COMMAND_MODE_SUSPEND	= "SUSPEND";    //保留
var COMMAND_MODE_UPDATE		= "UPDATE";     //更新
var COMMAND_MODE_CANCEL		= "CANCEL";     //キャンセル
// 2005/07/13 H.SAITO 002 再送処理対応

var COMMAND_MODE_STUDY_CANCEL = "CANCEL";	// 検査のキャンセル(エラーが発生した画像がある検査をキャンセルした場合）
// 2014/03/14 TYS沼 DR直結対応 ADD START ------------------------------------------------
var COMMAND_MODE_DRCHANGE	= "DRCHANGE";   //DR切替
// 2014/03/14 TYS沼 DR直結対応 ADD END --------------------------------------------------


var PROC_MODIFYMAIN_VIEW = "MODIFYMAIN_VIEW";
var PROC_MODIFY_CTRL     = "MODIFY_CTRL";
var PROC_STUDY_CTRL      = "STUDY_CTRL";

// 修正完了フラグ
var FLAG_PARAM_CANCEL  = 0;
var FLAG_PARAM_UPDATE  = 1;

// 検査画面状況フラグ
var SCREEN_STATUS_INIT   = 0;	// 初期
var SCREEN_STATUS_MODIFY = 1;	// 修正完了
var SCREEN_STATUS_CANCEL = 2;	// 修正キャンセル

var FATAL_ERROR         = "FATAL_ERROR";            //致命的なエラー 
var RETRY_ERROR         = "RETRY_ERROR";            //再試行可能なエラー
var SPOT_CODE           = 0;                        //スポットコード
var FILE_NAME           = "Sub_Study.js";           //ファイル名
var MESSAGE_ID          = 31500;                    //メッセージID 
var MESSAGE_ID_ACCESS   = 31501;                    //メッセージID 
//[変数]
var StudySequence;
var ScreenStatus = SCREEN_STATUS_INIT;	//検査画面状況フラグ(0:初期 1:修正完了 2:修正キャンセル) 
var ProcId = PROC_STUDY_CTRL;	// 表示中のフレーム
var ModifyDispFlag=0;         //修正画面起動フラグ
//*****************************************************************************
// Fn_InitPage
// １．機能
//      ページロード時の処理

// ２．戻り値
//　　  なし
// ３．備考
//　　　なし
//*****************************************************************************
function Fn_InitPage(){
	try{
		LoadPage("STUDY_CTRL","Study_Ctrl.aspx?OpenMode=1",ChildPagesLoadedNotification);
	}
	catch(exception){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
	}
}
//*****************************************************************************
// ChildPagesLoadedNotification
// １．機能
//      下位ページの読み込みが完了した通知

// ２．戻り値
//　　  なし
// ３．備考
//　　　なし
//*****************************************************************************
function ChildPagesLoadedNotification(){
  try{
    // 修正画面読み込み
	//document.getElementById("MODIFY_CTRL").src =  "Modify_Ctrl.aspx?OpenMode=0";
  document.getElementById("MODIFY_CTRL").src =  "Modify_Ctrl.aspx?OpenMode=1";//2010.06.01 CQ#219対応 FF星野 ADD
  }
  catch(exception){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
  }
}
//*****************************************************************************
//  Public_Init(	
// １．機能
//      機能開始処理を行う
// ２．戻り値
//　　  なし
// ３．備考
//　　　なし
//*****************************************************************************
function Public_Init(){
    try{
        ShowFrameById(PROC_STUDY_CTRL, IFRAME_CTRL_VISIBLE_WIDTH, IFRAME_CTRL_VISIBLE_HEIGHT);
        // 画面状況設定(初期)
        ScreenStatus = SCREEN_STATUS_INIT; //検査画面状況フラグ(0:初期 1:修正完了 2:修正キャンセル) 
        STUDY_CTRL.Public_Init();
        // コールバック関数の登録
        STUDY_CTRL.SetFrameFinishedNotification(CtrlFinished, PROC_STUDY_CTRL);
    }
    catch(exception){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
    }
}
//*****************************************************************************
// Fn_Init
// １．機能
//      初期化処理を行う
// ２．戻り値
//　　  なし
// ３．備考
//　　　なし
//*****************************************************************************
function Fn_Init(){
	ScreenStatus = SCREEN_STATUS_INIT;	//検査画面状況フラグ(0:初期 1:修正完了 2:修正キャンセル) 

}
//*****************************************************************************
// CtrlFinished
// １．機能
//      機能フレーム終了時のハンドラ
//
// ２．戻り値
//　　  なし

//
// ３．備考

//      なし

//
//*****************************************************************************
function CtrlFinished(procId, procInfo){
    try{
        switch(procId){
        //----------------//
        // 検査機能の終了 //
        //----------------//
        case PROC_STUDY_CTRL:
            switch(procInfo.commandMode){
            // 修正
            case COMMAND_MODE_MODIFY:
                Public_View_Modify(procId);
                break;
            // 確認

            case COMMAND_MODE_COMPLETED:
                // 親への完了通知
                NotifyFrameFinished(FLAG_PARAM_CANCEL);
                break;
            // 保留
            case COMMAND_MODE_SUSPEND:
                // 親への完了通知
                NotifyFrameFinished(FLAG_PARAM_CANCEL);
                break;
            // 検査キャンセル(エラーが発生した画像がある検査をキャンセルした場合）

            case COMMAND_MODE_STUDY_CANCEL:
                // 親への完了通知
                NotifyFrameFinished(FLAG_PARAM_CANCEL);
                break;
// 2014/03/14 TYS沼 DR直結対応 ADD START ------------------------------------------------
            // DR切替
            case COMMAND_MODE_DRCHANGE:
                // 親への完了通知
                NotifyFrameFinished(FLAG_PARAM_CANCEL);
                break;
// 2014/03/14 TYS沼 DR直結対応 ADD END --------------------------------------------------
            }
            break;
        //----------------//
        // 修正機能の終了 //
        //----------------//
        case PROC_MODIFY_CTRL:
            if(procInfo.commandMode ==COMMAND_MODE_CANCEL){
                Public_Hidden_Modify(procInfo.modifyFlag);
            }
            // 修正機能で更新された場合は,検査画面のデータを再読み込みする
            else if(procInfo.commandMode == COMMAND_MODE_UPDATE){
                Public_Hidden_Modify(procInfo.modifyFlag);
            }
            break;
        // エラー
        default:
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
            break;
        }
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
    }
}
//***************************************************************************
//  Public_View_Modify()
//
//  1．機能
//      
//
//  2．戻り値
//      なし
//
//  3．備考
//
//**************************************************************************
function Public_View_Modify(viewId)
{
    try{
        //修正画面が起動していないときは表示しない

        if(ModifyDispFlag == 0)return;
            // 修正機能の初期化

            MODIFY_CTRL.Public_Init(viewId);
            // 修正機能の表示
            ShowFrameById(PROC_MODIFY_CTRL, IFRAME_CTRL_VISIBLE_WIDTH, IFRAME_CTRL_VISIBLE_HEIGHT);
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
    }
}

//***************************************************************************
//  Public_Hidden_Modify(retValue : 処理結果(0:キャンセル 1:修正完了)
//
//  1．機能
//      
//  2．戻り値  
//      なし
//
//  3．備考
//
//***************************************************************************
function Public_Hidden_Modify(retValue){
    try{
        // 呼び出し元の機能初期化

        switch(ProcId){
        case PROC_STUDY_CTRL:
            // 修正完了の場合

            if(retValue == 1 || retValue == 2){
                // 画面状況設定(修正完了)
                ScreenStatus = SCREEN_STATUS_MODIFY; //検査画面状況フラグ(0:初期 1:修正完了 2:修正キャンセル) 
            // 修正キャンセル
            }else{
                // 画面状況設定(修正キャンセル)
                ScreenStatus = SCREEN_STATUS_CANCEL; //検査画面状況フラグ(0:初期 1:修正完了 2:修正キャンセル) 
            }
            STUDY_CTRL.Public_Init();
            break;
        default:
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
            break;
        }
        // 修正機能の非表示
        HideFrameById(PROC_MODIFY_CTRL);
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
    }
}
//***************************************************************************
//  IndicatorUtilityOpen()		
//  1．機能
//     インジケータユーティリティ開始通知
//  2．戻り値  
//		なし
//  3．備考
//      ここでは処理しない
//***************************************************************************
function IndicatorUtilityOpen(){
	try{
		STUDY_CTRL.IndicatorUtilityOpen();
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
	}
}			
//***************************************************************************
//  IndicatorUtilityClose()		
//  1．機能
//     インジケータユーティリティ終了通知
//  2．戻り値  
//		  なし
//  3．備考
//      ここでは処理しない
//***************************************************************************
function IndicatorUtilityClose(){
	try{
		// 2006/11/21 PVCS#1770 H.SAITO -ST-
		if(parent.Public_GetCloseFlag()){
			parent.Exit();
		}
		// 2006/11/21 PVCS#1770 H.SAITO -ED-
		STUDY_CTRL.IndicatorUtilityClose();
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
	}
}

//***************************************************************************
//  Public_EndModify()
//  1．機能
//     修正機能読み込み完了通知
//  2．戻り値  
//		  なし


//  3．備考


//      
//***************************************************************************
function Public_EndModify(){
  try{
        if(ModifyDispFlag == 1){
            STUDY_CTRL.Public_EndModify();
            // コールバック関数の登録
            MODIFY_CTRL.SetFrameFinishedNotification(CtrlFinished, PROC_MODIFY_CTRL);
        }
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
    }
}
