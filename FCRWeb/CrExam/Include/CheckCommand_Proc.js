/****************************************************************************

  @file CheckCommand_Proc.js

  @brief CheckCommand_Procのクライアントスクリプト

  @author YSK齋藤
  
        SpotCode MAX 1

  Copyright(c) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/08  YSK齋藤     V1.0       新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  07/06/05  HSK古場     V2.0       PVCS#2281対応 

/****************************************************************************/
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード
var FILE_NAME = "CheckCommand.js"  //ファイル名
var MESSAGE_ID = 30500;              //メッセージID 
//*****************************************************************************
// Fn_InitPage
//
// １．機能
//      ページロード時の処理// ２．戻り値
//　　  なし// ３．備考//*****************************************************************************
function Fn_InitPage(){
}
//*****************************************************************************
// Public_CheckCommand
//
// １．機能
//      サーバ側の処理を行う
// ２．戻り値
//　　  なし// ３．備考//*****************************************************************************
function Public_CheckCommand(procMode, commandMode){
	try{
		frmCheckForm.procMode.value		 = procMode;
		frmCheckForm.commandMode.value = commandMode;  
//070605 HSK古場 PVCS#2281 UPDATE-ST
//		frmCheckForm.loginUserId.value = escape(top.LoginUserId);  
		frmCheckForm.loginUserId.value = encodeURIComponent(top.LoginUserId);
//070605 HSK古場 PVCS#2281 UPDATE-ED
		frmCheckForm.loginTime.value   = top.LoginTime;  
		frmCheckForm.submit();
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
	}
}