/****************************************************************************

  @file Exclusive_Proc.js

  @brief Exclusive_Procのクライアントスクリプト

  @author YSK齋藤
  
        SpotCode MAX 3

  Copyright(c) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/14  YSK齋藤     V1.0       新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  07/06/07  HSK古場     V2.0       PVCS#2281対応 
  @date  09/07/13  FF蔵敷        V6.0       MONI_V60_0713
  @date  10/11/22  FFS生田     V2.0(B)    30501エラー改善対応
  @date  13/02/15  NDD北村     V2.3(B)HF  CQ#1650対応

/****************************************************************************/
//エラー
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード


var FILE_NAME = "Exclusive_Proc.js"  //ファイル名


var MESSAGE_ID = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS = 30501;              //メッセージID 
//2010/11/22 30501エラー改善対応 ADD ST
var objXMLHttp;
var Prototype = {
  emptyFunction: function() {}
}
//2010/11/22 30501エラー改善対応 ADD ED
// 2013/02/15 NDD北村 CQ#1650 ADD Start
var PROC_MODE = "";
// 2013/02/15 NDD北村 CQ#1650 ADD End

//*****************************************************************************
// Fn_InitPage
//
// １．機能
//     ページ完了通知
//
// ２．戻り値
//　　  なし


//
// ３．備考


//*****************************************************************************
function Fn_InitPage(){
}
//2010/11/22 30501エラー改善対応 MOD ST
//*****************************************************************************
// Public_Exclusive
//
// １．機能
//     サーバに更新処理を要求する
// ２．戻り値
//　　  なし
// ３．備考
//*****************************************************************************
function Public_Exclusive(procMode, studySequence, exclusiveModeRu, exclusiveModeStudy){
	try{
		// 2013/02/15 NDD北村 CQ#1650 ADD Start
		PROC_MODE = procMode;
		// 2013/02/15 NDD北村 CQ#1650 ADD End

		if ((top.WindowOpenMode == 0) || (top.forceFrameProcMode == true))
		{
			//更新情報をセット
			frmExclusiveForm.procMode.value				      = procMode;
			frmExclusiveForm.studySequence.value	      = studySequence;
			frmExclusiveForm.exclusiveModeRu.value	    = exclusiveModeRu;
			frmExclusiveForm.exclusiveModeStudy.value	  = exclusiveModeStudy;
			//070607 HSK古場 PVCS#2281 UPDATE-ST
			//		frmExclusiveForm.loginUserId.value		      = escape(top.LoginUserId);
			frmExclusiveForm.loginUserId.value		      = encodeURIComponent(top.LoginUserId);
			//070607 HSK古場 PVCS#2281 UPDATE-ED
	    	// 2005/06/25 002 H.SAITO PVCS#350
			frmExclusiveForm.loginTime.value		        = top.LoginTime;
			frmExclusiveForm.submit();
		} else {
			var strSendData = "procMode=" + procMode +
				              "&studySequence=" + studySequence + 
				              "&exclusiveModeRu=" + exclusiveModeRu +
				              "&exclusiveModeStudy=" + exclusiveModeStudy +
				              "&exclusiveModeOutput=" + "" +
				              "&loginUserId=" + encodeURIComponent(top.LoginUserId) +
				              "&loginTime=" + top.LoginTime;
			                  "&isMonitoring=" + "";
			if (objXMLHttp == null)
			{
				objXMLHttp = new ActiveXObject("MSXML2.XMLHTTP");
			}
			objXMLHttp.open("POST", "/FCRWeb/CrExam/Do_Exclusive_Proc.aspx", false);
			objXMLHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=Shift-JIS");
			objXMLHttp.setRequestHeader("Content-Type", "text/xml");
			objXMLHttp.onreadystatechange = function()
			{
				if ((objXMLHttp.readyState == 4) && (objXMLHttp.status == 200))
				{
					objXMLHttp.onreadystatechange = Prototype.emptyFunction;
					var xmlResponse = objXMLHttp.responseXML;
					objXMLHttp = null;
					if (xmlResponse.getElementsByTagName("Response")[0] == null)
					{
						return;
					}
					top.isExclusiveProcDone = true;
					var strNextFunction = decodeURIComponent(xmlResponse.getElementsByTagName("ClientScript")[0].text);
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

//2010/11/22 30501エラー改善対応 MOD ST
//*****************************************************************************
// Public_OutputExclusive
//
// １．機能
//     出力中排他チェックを要求する
// ２．戻り値
//　　  なし
// ３．備考
//*****************************************************************************
function Public_OutputExclusive(procMode, studySequence, outputStatus){
	try{
		if ((top.WindowOpenMode == 0) || (top.forceFrameProcMode == true))
		{
			//更新情報をセット
			frmExclusiveForm.procMode.value				      = procMode;
			frmExclusiveForm.studySequence.value	      = studySequence;
			frmExclusiveForm.exclusiveModeOutput.value	= outputStatus;
			//070607 HSK古場 PVCS#2281 UPDATE-ST
			//		frmExclusiveForm.loginUserId.value		      = escape(top.LoginUserId);
			frmExclusiveForm.loginUserId.value		      = encodeURIComponent(top.LoginUserId);
			//070607 HSK古場 PVCS#2281 UPDATE-ED
	    	// 2005/06/27 002 H.SAITO PVCS#350
			frmExclusiveForm.loginTime.value		        = top.LoginTime;
			frmExclusiveForm.submit();
		} else {
			var strSendData = "procMode=" + procMode +
				              "&studySequence=" + studySequence + 
				              "&exclusiveModeRu=" + "" +
				              "&exclusiveModeStudy=" + "" +
				              "&exclusiveModeOutput=" + outputStatus +
				              "&loginUserId=" + encodeURIComponent(top.LoginUserId) +
				              "&loginTime=" + top.LoginTime +
				              "&isMonitoring=" + "";
			objXMLHttp = new ActiveXObject("MSXML2.XMLHTTP");
			objXMLHttp.open("POST", "/FCRWeb/CrExam/Do_Exclusive_Proc.aspx", true);
			objXMLHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=Shift-JIS");
			objXMLHttp.setRequestHeader("Content-Type", "text/xml");
			objXMLHttp.onreadystatechange = function()
			{
				if ((objXMLHttp.readyState == 4) && (objXMLHttp.status == 200))
				{
					objXMLHttp.onreadystatechange = Prototype.emptyFunction;
					var xmlResponse = objXMLHttp.responseXML;
					objXMLHttp = null;
					if (xmlResponse.getElementsByTagName("Response")[0] == null)
					{
						return;
					}
					top.isExclusiveProcDone = true;
					var strNextFunction = decodeURIComponent(xmlResponse.getElementsByTagName("ClientScript")[0].text);
					eval(strNextFunction);
				}
			}
			objXMLHttp.send(strSendData);
		}
	}
	catch(e){
    	Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
	}
}
//2010/11/22 30501エラー改善対応 MOD ED


//2010/11/22 30501エラー改善対応 MOD ST
//MONI_V60_0713
function Public_Exclusive2(procMode, studySequence, exclusiveModeRu, exclusiveModeStudy,isMonitoring){
	try{
		if ((top.WindowOpenMode == 0) || (top.forceFrameProcMode == true))
		{
			frmExclusiveForm.procMode.value				      = procMode;
			frmExclusiveForm.studySequence.value	      = studySequence;
			frmExclusiveForm.exclusiveModeRu.value	    = exclusiveModeRu;
			frmExclusiveForm.exclusiveModeStudy.value	  = exclusiveModeStudy;
			frmExclusiveForm.loginUserId.value		      = encodeURIComponent(top.LoginUserId);
			frmExclusiveForm.loginTime.value		        = top.LoginTime;
			frmExclusiveForm.isMonitoring.value		        = isMonitoring;
			frmExclusiveForm.submit();
		} else {
			var strSendData = "procMode=" + procMode +
				              "&studySequence=" + studySequence + 
				              "&exclusiveModeRu=" + exclusiveModeRu +
				              "&exclusiveModeStudy=" + exclusiveModeStudy +
				              "&exclusiveModeOutput=" + "" +
				              "&loginUserId=" + encodeURIComponent(top.LoginUserId) +
				              "&loginTime=" + top.LoginTime +
				              "&isMonitoring=" + isMonitoring;
			var objXMLHttp = new ActiveXObject("MSXML2.XMLHTTP");
			objXMLHttp.open("POST", "/FCRWeb/CrExam/Do_Exclusive_Proc.aspx", true);
			objXMLHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=Shift-JIS");
			objXMLHttp.setRequestHeader("Content-Type", "text/xml");
			objXMLHttp.onreadystatechange = function()
			{
				if ((objXMLHttp.readyState == 4) && (objXMLHttp.status == 200))
				{
					objXMLHttp.onreadystatechange = Prototype.emptyFunction;
					var xmlResponse = objXMLHttp.responseXML;
					objXMLHttp = null;
					if (xmlResponse.getElementsByTagName("Response")[0] == null)
					{
						return;
					}
					top.isExclusiveProcDone = true;
					var strNextFunction = decodeURIComponent(xmlResponse.getElementsByTagName("ClientScript")[0].text.replace(/\+/g," "));
					eval(strNextFunction);
				}
			}
			objXMLHttp.send(strSendData);
		}
	}
	catch(e){
		Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
	}
}
//2010/11/22 30501エラー改善対応 MOD ED