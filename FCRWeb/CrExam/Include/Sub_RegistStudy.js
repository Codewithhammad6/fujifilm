/****************************************************************************

  @file Sub_RegistStudy.js

  @brief Sub_RegistStudyのクライアントスクリプト

  @author YSK畑

        SpotCode MAX 8

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/13  YSK畑       V1.0　     新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応

  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応 
  @date  06/11/21  YSK齋藤     V1.4　     PVCS#1770対応 
/****************************************************************************/

//[定数]
var PROC_MODE_REGIST     = "REGISTSTUDY_CTRL";

var COMMAND_MODE_CANCEL   = "CANCEL";
var COMMAND_MODE_STUDY    = "STUDY";
var COMMAND_MODE_ENTRY    = "ENTRY";

// 修正完了フラグ
var FLAG_PARAM_CANCEL   = 0;						// キャンセル
var FLAG_PARAM_UPDATE   = 1;						// 修正完了

var FLAG_PARAM_NOUPDATE = 2;					// 修正完了不要


// エラーモード

var FATAL_ERROR         = "FATAL_ERROR";            //致命的なエラー 
var RETRY_ERROR         = "RETRY_ERROR";            //再試行可能なエラー
var SPOT_CODE           = 0;                        //スポットコード


var FILE_NAME           = "Sub_RegistStudy.js"           //ファイル名


var MESSAGE_ID          = 30500;                    //メッセージID 
var MESSAGE_ID_ACCESS   = 30501;                    //メッセージID 

//[変数]
// 機能フレーム
var ProcId = "";

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
		LoadPage(PROC_MODE_REGIST,"RegistStudy_Ctrl.aspx?OpenMode=1");

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
	}
	
}

//***************************************************************************
//  Public_Init()
//
//  1．機能
//      
//
//  2．戻り値  
//      なし
//
//  3．備考
//
//***************************************************************************
function Public_Init()
{
    try{
        // 初期化(検査登録機能フレーム呼び出し)
        REGISTSTUDY_CTRL.Public_Init();
        // コールバック関数の登録
        REGISTSTUDY_CTRL.SetFrameFinishedNotification(CtrlFinished, PROC_MODE_REGIST);
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
    }
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
function CtrlFinished(procId, procInfo)
{
    try{
        // 戻るボタン押下

        if(procInfo.commandMode == COMMAND_MODE_CANCEL){
            RegistStudy_Close();
        }
        // 登録ボタン押下時
        else if(procInfo.commandMode == COMMAND_MODE_ENTRY){
            RegistStudy_Close();
        }
        // 検査開始ボタン押下時
        else if(procInfo.commandMode == COMMAND_MODE_STUDY){
            RegistStudy_Study();
        }
        // 機能フレームIDを設定

        ProcId = procId;
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
    }

}
//***************************************************************************
//  RegistStudy_Close()
//
//  1．機能
//      検査登録機能終了
//
//  2．戻り値
//      なし
//
//  3．備考
//
//***************************************************************************
function RegistStudy_Close()
{
    try{
        // 親への完了通知
        NotifyFrameFinished(FLAG_PARAM_NOUPDATE);
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
    }
}
//***************************************************************************
//  RegistStudy_Study()
//
//  1．機能
//      検査機能呼び出し
//
//  2．戻り値
//      なし
//
//  3．備考
//
//***************************************************************************
function RegistStudy_Study()
{
    try{
        // 検査画面ウィンドウ表示
        strURL = "./Main.aspx?FunctionId=EntryStudy&StudySeq="+top.StudySequence;
        window.open(strURL,"","height=600px,width=800px" +
                    ",left=" + window.screenLeft + "px,top=" +  window.screenTop + "px" );	// 081101 H.Yoshida PVCS#2942
        // 親への完了通知
        NotifyFrameFinished(FLAG_PARAM_NOUPDATE);
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
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
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
	}
}			
//***************************************************************************
//  IndicatorUtilityClose()		
//  1．機能
//     インジケータユーティリティ開始通知
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
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
	}
}

