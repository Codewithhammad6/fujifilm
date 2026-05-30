/****************************************************************************

  @file StudyData_Get_Proc.js

  @brief StudyData_Get_Procのクライアントスクリプト

  @author YSK齋藤

        SpotCode MAX 1

  Copyright(c) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/10/29  YSK齋藤     V1.0　     新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  07/03/01  YSK齋藤     V2.0       ×ボタン押下対応(PVCS#1956)
  @date  07/06/07  HSK古場     V2.0       PVCS#2281対応 

/****************************************************************************/
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード

var FILE_NAME = "StudyData_Get_Proc.js"  //ファイル名

var MESSAGE_ID = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS   = 30501;              //メッセージID 
// 2007/03/01 PVCS#1956 H.SAITO -ST-
var OPEN_MODE_WINDOW	= 1;		// ブラウザで開かれた場合 
var STUDYDATA_GET_PROC	= "Main_StudyData_Get_Proc.aspx";
var EXCLUSIVE_SET		= 1;		// 排他制御(設定)
// 2007/03/01 PVCS#1956 H.SAITO -ED-
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
}
//*****************************************************************************
// Public_GetData
// １．機能
//      サーバに引数を渡す
// ２．戻り値
//　　  なし
// ３．備考
//      なし
//*****************************************************************************
function Public_GetData(procMode, studySequence, exclusiveModeRu, exclusiveModeStudy){
  try{  
 	// 2007/03/01 PVCS#1956 H.SAITO -ST-
    //frmGetForm.procMode.value           = procMode;
    //frmGetForm.studySequence.value      = studySequence;
    //frmGetForm.exclusiveModeRu.value    = exclusiveModeRu;
    //frmGetForm.exclusiveModeStudy.value = exclusiveModeStudy;
    //frmGetForm.loginUserId.value        = escape(top.LoginUserId);
    //frmGetForm.loginTime.value          = top.LoginTime;
    //frmGetForm.submit();
	var requestURL;	
	var dialogParam;
	var topPos;
	var leftPos;
	if(parent.OpenMode == OPEN_MODE_WINDOW && (exclusiveModeRu == EXCLUSIVE_SET || exclusiveModeStudy == EXCLUSIVE_SET) ){
		requestURL = STUDYDATA_GET_PROC 
					+ "?procMode="				+	procMode
					+ "&studySequence="			+	studySequence
					+ "&exclusiveModeRu="		+	exclusiveModeRu
					+ "&exclusiveModeStudy="	+	exclusiveModeStudy
//070607 HSK古場 PVCS#2281 UPDATE-ST
//					+ "&loginUserId="			+	escape(top.LoginUserId)
					+ "&loginUserId="			+	encodeURIComponent(top.LoginUserId)
//070607 HSK古場 PVCS#2281 UPDATE-ED
					+ "&loginTime="				+	top.LoginTime;
		topPos	=	window.screenTop;
		leftPos	=	window.screenLeft;
		dialogParam = "scroll=no; toolbar=no; help=off; location=no; directories=no; status=no; menubar=no; resizable=no; dialogTop:" + topPos + "px;dialogLeft:" + leftPos + "px; dialogHeight:0px; dialogWidth:0px";
		showModalDialog(requestURL, window, dialogParam);
	}
	else{
	    frmGetForm.procMode.value           = procMode;
		frmGetForm.studySequence.value      = studySequence;
		frmGetForm.exclusiveModeRu.value    = exclusiveModeRu;
		frmGetForm.exclusiveModeStudy.value = exclusiveModeStudy;
//070607 HSK古場 PVCS#2281 UPDATE-ST
//		frmGetForm.loginUserId.value        = escape(top.LoginUserId);
		frmGetForm.loginUserId.value        = encodeURIComponent(top.LoginUserId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
		frmGetForm.loginTime.value          = top.LoginTime;
		frmGetForm.submit();
	}
 	// 2007/03/01 PVCS#1956 H.SAITO -ED-
  }
  catch(Exception){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
  }
}