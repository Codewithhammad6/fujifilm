/****************************************************************************

  @file Sub_RegAddMenu.js

  @brief Sub_RegAddMenuのクライアントスクリプト

  @author YSK田中

        SpotCode MAX 6

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/10  YSK田中     V1.0　     新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応

/****************************************************************************/
//処理モード
var COMMAND_MODE_CANCEL = "CANCEL";
var COMMAND_MODE_UPDATE = "UPDATE";

// 修正完了フラグ
var FLAG_PARAM_CANCEL  = 0;
var FLAG_PARAM_UPDATE  = 1;

var FATAL_ERROR         = "FATAL_ERROR";            //致命的なエラー 
var RETRY_ERROR         = "RETRY_ERROR";            //再試行可能なエラー
var SPOT_CODE           = 0;                        //スポットコード

var FILE_NAME           = "Sub_RegAddMenu.js"           //ファイル名

var MESSAGE_ID          = 30500;                    //メッセージID 
var MESSAGE_ID_ACCESS   = 30501;                    //メッセージID 
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
  //読み込むページを設定
  try{	
	LoadPage("REGADDMENU_CTRL","RegAddMenu_Ctrl.aspx?OpenMode=2");
  }
  catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
  }
}

//*****************************************************************************
//  Public_Init()
//
// １．機能
//      機能開始処理を行う（データを取得する）//
// ２．戻り値
//　　  なし//
// ３．備考//　　　なし//
//*****************************************************************************
function Public_Init(){
    try{
        REGADDMENU_CTRL.Public_Init();
        // コールバック関数の登録
        REGADDMENU_CTRL.SetFrameFinishedNotification(CtrlFinished, "");
    }
    catch(e){
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
        Fn_Init();
        switch(procInfo.commandMode){
        case COMMAND_MODE_UPDATE:
        case COMMAND_MODE_CANCEL:
            // 親への完了通知
            NotifyFrameFinished(procInfo.modifyFlag);
            break;
        default:
            //トップのエラーメソッドを呼ぶ
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
            break;
        }
    }
    catch(e){
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