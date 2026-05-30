/****************************************************************************

  @file Sub_ChangeImg.js

  @brief Sub_ChangeImgのクライアントスクリプト

  @author YSK齋藤

        SpotCode MAX 6

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/11  YSK齋藤       V1.0　     新規作成
  @date  06/10/23  HSK山本       V1.4       CR検査部構造見直し[4]対応
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応

/****************************************************************************/
var COMMAND_MODE_UPDATE = "UPDATE";     //更新
var COMMAND_MODE_CANCEL = "CANCEL";     //キャンセル
// 修正完了フラグ
var FLAG_PARAM_CANCEL   = 0;
var FLAG_PARAM_UPDATE   = 1;
//エラー
var FATAL_ERROR         = "FATAL_ERROR";            //致命的なエラー 
var RETRY_ERROR         = "RETRY_ERROR";            //再試行可能なエラー
var SPOT_CODE           = 0;                        //スポットコード


var FILE_NAME           = "Sub_ChangeImg.js"           //ファイル名


var MESSAGE_ID          = 30500;                    //メッセージID 
var MESSAGE_ID_ACCESS   = 30501;                    //メッセージID 

// #1444 2005/09/20--ST
var ButtonClose = 0;				// [閉じる]/[修正完了]で閉じた場合：１
// #1444 2005/09/20--EN

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
		//OpenMode(0:CE画面 1:ブラウザ 2:ダイアログ)
		LoadPage("CHANGEIMG_CTRL","ChangeImg_Ctrl.aspx?OpenMode=2");
	}
	catch(exception){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
	}
}

//*****************************************************************************
//  Public_Init(	
// １．機能
//      機能開始処理を行う（データを取得する）

// ２．戻り値
//　　  なし

// ３．備考

//　　　なし

//*****************************************************************************
function Public_Init(){
	try{
		CHANGEIMG_CTRL.Public_Init();
        // コールバック関数の登録
        CHANGEIMG_CTRL.SetFrameFinishedNotification(CtrlFinished, "");
	}
	catch(exception){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
	}
}
//*****************************************************************************
// CtrlFinished
// １．機能
//      機能フレーム終了時のハンドラ
//
// ２．戻り値
//　　  なし//
// ３．備考//      なし//
//*****************************************************************************
function CtrlFinished(procId, procInfo){
    try{
        switch(procInfo.commandMode){
        case COMMAND_MODE_UPDATE:
        case COMMAND_MODE_CANCEL:
            ButtonClose = 1;
            // 親への完了通知
            NotifyFrameFinished(procInfo.modifyFlag);
            break;
        default:
            //トップのエラーメソッドを呼ぶ
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
            break;
        }
    }
    catch(exception){
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

// #1444 2005/09/20--ST
//*****************************************************************************
// Public_End
// １．機能
//      上位に更新/キャンセル終了を通知する
// ２．戻り値
//　　  なし
// ３．備考
//      なし
//*****************************************************************************
function Public_BeforeUnload(){
  try{
		if( ButtonClose == 0){
            // 親への完了通知
            NotifyFrameFinished(CHANGEIMG_CTRL.ModifyStatusFlag);
		}
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
  }
}
// #1444 2005/09/20--EN
