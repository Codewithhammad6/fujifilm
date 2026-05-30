/****************************************************************************

  @file Sub_Modify.js

  @brief Sub_Modifyのクライアントスクリプト

  @author YSK畑

        SpotCode MAX 6

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/13  YSK畑       V1.0　     新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応  @date  06/11/21  YSK齋藤     V1.4　     PVCS#1770対応



/****************************************************************************/

//[定数]
var PROC_MODE_MODIFY     = "MODIFY_CTRL";

var COMMAND_MODE_CANCEL   = "CANCEL";
var COMMAND_MODE_UPDATE   = "UPDATE";

var VIEW_MODE_MODIFYMAIN  = "MODIFYMAIN_VIEW";

// 修正完了フラグ
var FLAG_PARAM_CANCEL   = 0;						// キャンセル
var FLAG_PARAM_UPDATE   = 1;						// 修正完了
var FLAG_PARAM_NOUPDATE = 2;					// 修正完了不要


// エラーモード
var FATAL_ERROR         = "FATAL_ERROR";            //致命的なエラー 
var RETRY_ERROR         = "RETRY_ERROR";            //再試行可能なエラー
var SPOT_CODE           = 0;                        //スポットコード

var FILE_NAME           = "Sub_Modify.js"           //ファイル名

var MESSAGE_ID          = 31500;                    //メッセージID 
var MESSAGE_ID_ACCESS   = 31501;                    //メッセージID 

//[変数]
// 機能フレーム
var ProcId = "";
var ModifyDispFlag = 0;  //修正画面起動フラグ
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
		LoadPage(PROC_MODE_MODIFY,"./Modify_Ctrl.aspx?OpenMode=1");
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
//      なし//
//  3．備考//
//***************************************************************************
function Public_Init()
{
    try{
        // 初期化(修正メイン画面呼び出し)
        MODIFY_CTRL.Public_Init(VIEW_MODE_MODIFYMAIN);
        // コールバック関数の登録
        MODIFY_CTRL.SetFrameFinishedNotification(CtrlFinished, PROC_MODE_MODIFY);
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
        switch(procId){
        // 修正機能
        case PROC_MODE_MODIFY:
            // 親への完了通知
            NotifyFrameFinished(procInfo.modifyFlag);
            break;
        default:
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
            return;
        }
        // 機能フレームIDを設定
        ProcId = procId;
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
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
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
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
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
	}
}
//#1432 2005/09/17--ST
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
	return;
}
//#1432 2005/09/17--EN
