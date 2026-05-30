/****************************************************************************

  @file Study_TurnImage_Proc.js

  @brief Study_TurnImage_Procのクライアントスクリプト

  @author YSK齋藤

        SpotCode MAX 1

  Copyright(c) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/18  YSK齋藤     V1.0　     新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  07/06/07  HSK古場     V2.0       PVCS#2281対応 
  @date  10/11/22  FFS生田     V2.0       30501エラー改善対応

/****************************************************************************/
var FATAL_ERROR         = "FATAL_ERROR";              //致命的なエラー 
var RETRY_ERROR         = "RETRY_ERROR";              //再試行可能なエラー
var SPOT_CODE           = 0;                          //スポットコード
var FILE_NAME           = "Study_TurnImage_Proc.js";  //ファイル名
var MESSAGE_ID          = 30500;                      //メッセージID 
var MESSAGE_ID_ACCESS   = 30501;                      //メッセージID 
var objXMLHttp;
//2010/11/22 30501エラー改善対応 ADD ST
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
// Public_TurnImage
//
// １．機能
//      サーバ側の処理を行う
// ２．戻り値
//　　  なし
// ３．備考
//*****************************************************************************
function Public_TurnImage(procMode, studySequence, imageSequence, imageAngle, studyStatus, patientId){
try{
	if ((top.WindowOpenMode == 0) || (top.forceFrameProcMode == true))
	{
		frmTurnForm.procMode.value      = procMode;
		frmTurnForm.studySequence.value = studySequence;  
		frmTurnForm.imageSequence.value = imageSequence;  
		frmTurnForm.imageAngle.value    = imageAngle;  
		frmTurnForm.studyStatus.value   = studyStatus;  
		//070607 HSK古場 PVCS#2281 UPDATE-ST
		//    frmTurnForm.patientId.value     = escape(patientId);
		//    frmTurnForm.loginUserId.value   = escape(top.LoginUserId);
		frmTurnForm.patientId.value     = encodeURIComponent(patientId);
		frmTurnForm.loginUserId.value   = encodeURIComponent(top.LoginUserId);
		//070607 HSK古場 PVCS#2281 UPDATE-ED
		// 2005/06/27 002 H.SAITO PVCS#350 認証、権限チェック対応
		frmTurnForm.loginTime.value     = top.LoginTime;
		frmTurnForm.submit();
	} else {
		var strSendData = "procMode=" + procMode +
			              "&studySequence=" + studySequence +
			              "&imageSequence=" + imageSequence +
			              "&imageAngle=" + imageAngle +
			              "&studyStatus=" + studyStatus +
			              "&patientId=" + encodeURIComponent(patientId) +
			              "&loginUserId=" + encodeURIComponent(top.LoginUserId) +
			              "&loginTime=" + top.LoginTime;
		if (objXMLHttp == null)
		{
			objXMLHttp = new ActiveXObject("MSXML2.XMLHTTP");
		}
		objXMLHttp.open("POST", "/FCRWeb/CrExam/Do_Study_TurnImage_Proc.aspx", true);
		objXMLHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
		objXMLHttp.onreadystatechange = function()
		{
			if ((objXMLHttp.readyState == 4) && (objXMLHttp.status == 200))
			{
				objXMLHttp.onreadystatechange = Prototype.emptyFunction;
				var xmlResponse = objXMLHttp.responseXML;
				if (xmlResponse.getElementsByTagName("Response")[0] == null)
				{
					return;
				}
				objXMLHttp = null;
				
				//サーバーサイドエラーの扱い
				if (xmlResponse.getElementsByTagName("ImageSequence")[0] == null)
				{
					var strError = decodeURIComponent(xmlResponse.getElementsByTagName("ClientScript")[0].text.replace(/\+/g," "));
					eval(strError);
					return;
				}

				//データを取得
				var ImageSequence = "";
				var ImageFileName = "";
				var ImageHeight = "";
				var ImageWidth = "";
				var ThumbnailFileName = "";
				var ThumbnailHeight = "";
				var ThumbnailWidth = "";
				var ClientScript = "";
				
				ImageSequence = xmlResponse.getElementsByTagName("ImageSequence")[0].text;
				ImageFileName = xmlResponse.getElementsByTagName("ImageFileName")[0].text;
				ImageHeight = xmlResponse.getElementsByTagName("ImageHeight")[0].text;
				ImageWidth = xmlResponse.getElementsByTagName("ImageWidth")[0].text;
				ThumbnailFileName = xmlResponse.getElementsByTagName("ThumbnailFileName")[0].text;
				ThumbnailHeight = xmlResponse.getElementsByTagName("ThumbnailHeight")[0].text;
				ThumbnailWidth = xmlResponse.getElementsByTagName("ThumbnailWidth")[0].text;
				ClientScript = decodeURIComponent(xmlResponse.getElementsByTagName("ClientScript")[0].text.replace(/\+/g," "));
				
				if (ImageSequence != "")
				{
					var i = parent.AssosiateId[ImageSequence];
					parent.ImageFileName[i] = ImageFileName;
					parent.ImageHeight[i] = ImageHeight;
					parent.ImageWidth[i] = ImageWidth;
					parent.ThumbnailFileName[i] = ThumbnailFileName;
					parent.ThumbnailHeight[i] = ThumbnailHeight;
					parent.ThumbnailWidth[i] = ThumbnailWidth;
				}
					
				//画面遷移関数評価
				eval(ClientScript);
			}
		}
		objXMLHttp.send(strSendData);
	}
}catch(e){
	Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
}
}
//2010/11/22 30501エラー改善対応 MOD ED