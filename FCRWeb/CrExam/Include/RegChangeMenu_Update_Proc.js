/****************************************************************************

  @file RegChangeMenuMenu_Update_Proc.js

  @brief RegChangeMenuMenu_Update_Procのクライアントスクリプト

  @author YSK田中
  
        SpotCode MAX 1

  Copyright(c) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/11  YSK田中       V1.0       新規作成
  @date  06/08/08  YSK齋藤       V1.3       拡張メニューコードの区切り文字変更(PVCS#1804)
  @date  06/10/23  HSK山本       V1.4       CR検査部構造見直し[4]対応 
  @date  07/06/07  HSK古場       V2.0       PVCS#2281対応 

/****************************************************************************/
//エラー
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード

var FILE_NAME = "RegChangeMenu_Update_Proc.js"  //ファイル名

var MESSAGE_ID = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS   = 30501;              //メッセージID 
// 2006/08/08 PVCS#1804 H.SAITO -ST-
var SPLIT_STRING_MENUDATA = "\\";
// 2006/08/08 PVCS#1804 H.SAITO -ED-
//*****************************************************************************
// Fn_InitPage
//
// １．機能
//     ページロード完了通知
// ２．戻り値
//　　  なし
//
// ３．備考
//*****************************************************************************
function Fn_InitPage(){
}
//*****************************************************************************
// Public_Update
//
// １．機能
//     ＤＢコンポーネントに更新処理を要求する// ２．戻り値
//　　  なし//
// ３．備考//*****************************************************************************
function Public_Update(studySequence, imageSequence, menuCode, studyStatus, patientId){
	try{
    //更新情報をセット
    frmUpdateForm.studySequence.value = studySequence;
    frmUpdateForm.imageSequence.value = imageSequence;
		// 2006/08/08 PVCS#1804 H.SAITO -ST-
    //frmUpdateForm.menuCode.value      = menuCode;
    frmUpdateForm.menuCode.value      = menuCode.join(SPLIT_STRING_MENUDATA);
		// 2006/08/08 PVCS#1804 H.SAITO -ED-
    frmUpdateForm.studyStatus.value   = studyStatus;
//070607 HSK古場 PVCS#2281 UPDATE-ST
//    frmUpdateForm.patientId.value     = escape(patientId);
//    frmUpdateForm.loginUserId.value   = escape(top.LoginUserId);
    frmUpdateForm.patientId.value     = encodeURIComponent(patientId);
    frmUpdateForm.loginUserId.value   = encodeURIComponent(top.LoginUserId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
		frmUpdateForm.loginTime.value     = top.LoginTime;
    frmUpdateForm.submit();
	}
	catch(exception){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
	}	
}
