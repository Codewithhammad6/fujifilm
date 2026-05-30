/****************************************************************************

  @file Study_State_Proc.js

  @brief Study_State_Procのクライアントスクリプト

  @author YSK齋藤

        SpotCode MAX 1

  Copyright(c) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/07  YSK齋藤     V1.0　     新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  07/06/07  HSK古場     V2.0       PVCS#2281対応 
  @date  10/11/22  FFS生田     V2.0       30501エラー改善対応

/****************************************************************************/
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード


var FILE_NAME = "Study_StateChange_Proc.js"  //ファイル名


var MESSAGE_ID = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS   = 30501;              //メッセージID 
//2010/11/22 30501エラー改善対応 ADD ST
var objXMLHttp;
var Prototype = {
  emptyFunction: function() {}
}
//2010/11/22 30501エラー改善対応 ADD ED
//*****************************************************************************
// Fn_InitPage
//
// １．機能
//      ページロード時の処理

// ２．戻り値
//　　  なし

// ３．備考

//*****************************************************************************
function Fn_InitPage(){
}
//2010/11/22 30501エラー改善対応 MOD ST
//*****************************************************************************
// Public_ChangeState
//
// １．機能
//      サーバ側の処理を行う
// ２．戻り値
//　　  なし

// ３．備考

//*****************************************************************************
function Public_ChangeState(procMode, studySequence, commandMode, deleteMode, imageSequence){
	try{
		if ((top.WindowOpenMode == 0) || (top.forceFrameProcMode == true))
		{
			frmUpdateForm.procMode.value      = procMode;
		    frmUpdateForm.studySequence.value = studySequence;
		    frmUpdateForm.commandMode.value   = commandMode;
		    frmUpdateForm.deleteMode.value    = deleteMode;
		    frmUpdateForm.imageSequence.value = imageSequence;
			//070607 HSK古場 PVCS#2281 UPDATE-ST
			//frmUpdateForm.loginUserId.value   = escape(top.LoginUserId);
		    frmUpdateForm.loginUserId.value   = encodeURIComponent(top.LoginUserId);
			//070607 HSK古場 PVCS#2281 UPDATE-ED
		    frmUpdateForm.loginTime.value     = top.LoginTime;
		    frmUpdateForm.submit();
		} else {
			var strSendData = "procMode=" + procMode +
				              "&studySequence=" + studySequence +
				              "&commandMode=" + commandMode +
				              "&deleteMode=" + deleteMode +
				              "&imageSequence=" + imageSequence +
				              "&loginUserId=" +  encodeURIComponent(top.LoginUserId) +
				              "&loginTime=" + top.LoginTime;
			if (objXMLHttp == null)
			{
				objXMLHttp = new ActiveXObject("MSXML2.XMLHTTP");
			}
			objXMLHttp.open("POST", "/FCRWeb/CrExam/Do_Study_StateChange_Proc.aspx", true);
			objXMLHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=Shift-JIS");
			objXMLHttp.setRequestHeader("Content-Type", "text/xml");
			objXMLHttp.onreadystatechange = function() {
				if ((objXMLHttp.readyState == 4) && (objXMLHttp.status == 200))
				{
					objXMLHttp.onreadystatechange = Prototype.emptyFunction;
					var xmlResponse = objXMLHttp.responseXML;
					objXMLHttp = null;
					if (xmlResponse.getElementsByTagName("Response")[0] == null)
					{
						return;
					}
					var strNextFunction = decodeURIComponent(xmlResponse.getElementsByTagName("ClientScript")[0].text.replace(/\+/g," "));
					eval(strNextFunction);
				}
			}
			objXMLHttp.send(strSendData);
		}
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
  }
}
//2010/11/22 30501エラー改善対応 MOD ED