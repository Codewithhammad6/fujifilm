/****************************************************************************

  @file SystemEnd.js

  @brief SystemEndのクライアントスクリプト

  @author YSK畑
        SpotCode MAX 4

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/12  YSK畑       V1.0　     新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応

/****************************************************************************/
var FATAL_ERROR         = "FATAL_ERROR";            //致命的なエラー 
var RETRY_ERROR         = "RETRY_ERROR";            //再試行可能なエラー
var SPOT_CODE           = 0;                        //スポットコード
var FILE_NAME           = "SystemEnd.js"           //ファイル名
var MESSAGE_ID          = 30500;                    //メッセージID 
var MESSAGE_ID_ACCESS   = 30501;                    //メッセージID 

var IMG_START_DOWN = "../Bmp/cmSquare2BtnD.gif"
var IMG_START_UP   = "../Bmp/cmSquare2BtnU.gif"

//*****************************************************************************
// Fn_InitPage
// １．機能
//     ・ページロード時の処理
//     ・ボタン名の初期表示を行う
// ２．戻り値
//　　  なし
// ３．備考
//*****************************************************************************
function Fn_InitPage(){
  try{
	// 文字列表示
	document.getElementById("divMessage").innerText = MessageString;
	document.getElementById("divStart").innerText   = StartButton;
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
  }
}
//*****************************************************************************
// Public_Init
// １．機能
//     画面を表示する
// ２．戻り値
//　　  なし
// ３．備考
//*****************************************************************************
function Public_Init(){
	try{
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
	}
}
//*****************************************************************************
// Public_Start
// １．機能
//       システムの開始要求を行う
// ２．戻り値
//　　  なし
// ３．備考
//*****************************************************************************
function Public_Start(){
    try{
      // システム開始要求      parent.Start();
    }
    catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
    }
}
//***************************************************************************
//  Fn_OnButton(tableNo ： ボタン種類)		
//
//  1．機能
//      ボタン押下時の処理//	2．戻り値  
//		  なし//  3．備考//     
//***************************************************************************
function Fn_OnButton(tableNo)
{
	try{
		switch(tableNo){
    //============
    //開始ボタン
    //============
		case 0:  // 編集ボタン
      // システム開始      Public_Start();
		  document.getElementById("imgStart").src = IMG_START_UP;
			break;
		case 1:  // ONMOUSEDOWN
		  document.getElementById("imgStart").src = IMG_START_DOWN;
			break;
		case 2:  // ONMOUSEOUT
		  document.getElementById("imgStart").src = IMG_START_UP;
			break;
		default:
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
			return;
		}
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
		return;
	}	
}