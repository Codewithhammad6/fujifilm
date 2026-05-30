/****************************************************************************

  @file Sub_EditPatient.js

  @brief Sub_EditPatientのクライアントスクリプト

  @author YSK畑
         SpotCode MAX 6

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/13  YSK畑       V1.0　     新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応


/****************************************************************************/

//[定数]
var PROC_MODE_EDITPATIENT     = "EDITPATIENT_CTRL";

var COMMAND_MODE_CANCEL   = "CANCEL";
var COMMAND_MODE_UPDATE   = "UPDATE";

// 修正完了フラグ
var FLAG_PARAM_CANCEL  = 0;
var FLAG_PARAM_UPDATE  = 1;

// エラーモード
var FATAL_ERROR         = "FATAL_ERROR";            //致命的なエラー 
var RETRY_ERROR         = "RETRY_ERROR";            //再試行可能なエラー
var SPOT_CODE           = 0;                        //スポットコード

var FILE_NAME           = "Sub_EditPatient.js"           //ファイル名

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
		LoadPage(PROC_MODE_EDITPATIENT,"EditPatient_Ctrl.aspx?OpenMode=2");

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
        EDITPATIENT_CTRL.Public_Init("EDITPATIENT_MAIN");
        // コールバック関数の登録
        EDITPATIENT_CTRL.SetFrameFinishedNotification(CtrlFinished, "");
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
function CtrlFinished(procId, procInfo){
    try{
        switch(procInfo.commandMode){
        case COMMAND_MODE_UPDATE:
        case COMMAND_MODE_CANCEL:
            // 親への完了通知
            NotifyFrameFinished(procInfo.modifyFlag);
            break;
        default:
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
            return;
        }
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
	}catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
	}
}