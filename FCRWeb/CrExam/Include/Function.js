/****************************************************************************

  @file Function.js

  @brief Functionのクライアントスクリプト

  @author YSK畑
        SpotCode MAX 0

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/17  YSK畑       V1.0       新規作成

/****************************************************************************/
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード
var FILE_NAME = "Function.js"  //ファイル名
var MESSAGE_ID = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS = 30501;              //メッセージID 

//*****************************************************************************
// Fn_DispPage
// １．機能
//      ページロード時に、上位に対して読み込み完了を通知する
// ２．戻り値
//　　  なし
// ３．備考
//　　　なし
//*****************************************************************************
function Fn_DispPage(){
	try{
		parent.Public_Init();
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
	}
}
