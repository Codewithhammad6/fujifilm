/****************************************************************************

  @file RegAddMenuMenu_Update_Proc.js

  @brief RegAddMenuMenu_Update_Procのクライアントスクリプト

  @author YSK田中

        SpotCode MAX 1

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/11  YSK田中       V1.0       新規作成
  @date  06/08/08  YSK齋藤       V1.3       拡張メニューコードの区切り文字変更(PVCS#1804)
  @date  06/10/23  HSK山本       V1.4       CR検査部構造見直し[4]対応 
  @date  07/06/07  HSK古場       V2.0       PVCS#2281対応 

/****************************************************************************/
var FATAL_ERROR       = "FATAL_ERROR";                //致命的なエラー 
var RETRY_ERROR       = "RETRY_ERROR";                //再試行可能なエラー
var SPOT_CODE         = 0;                            //スポットコード
var FILE_NAME         = "RegAddMenu_Update_Proc.js";  //ファイル名
var MESSAGE_ID        = 30500;                        //メッセージID 
var MESSAGE_ID_ACCESS = 30501;                        //メッセージID 
// 2006/08/08 PVCS#1804 H.SAITO -ST-
var SPLIT_STRING_MENUDATA	= "\\";
// 2006/08/08 PVCS#1804 H.SAITO -ED-
//*****************************************************************************
// Fn_InitPage
//
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
// Public_Update
//
// １．機能
//     サーバに更新処理を要求する//
// ２．戻り値
//　　  なし//
// ３．備考//*****************************************************************************
function Public_Update(studySequence, aryEntryMenuCode, aryEntryExamFlag, studyStatus, patientId){
	try{
		//更新情報をセット
		frmUpdate.studySequence.value = studySequence;
		// 2006/08/08 PVCS#1804 H.SAITO -ST-
		//frmUpdate.entryMenuCode.value = aryEntryMenuCode;
		//frmUpdate.entryExamFlag.value = aryEntryExamFlag;
		frmUpdate.entryMenuCode.value = aryEntryMenuCode.join(SPLIT_STRING_MENUDATA);
		frmUpdate.entryExamFlag.value = aryEntryExamFlag.join(SPLIT_STRING_MENUDATA);
		// 2006/08/08 PVCS#1804 H.SAITO -ED-
		frmUpdate.studyStatus.value   = studyStatus;
//070607 HSK古場 PVCS#2281 UPDATE-ST
//		frmUpdate.patientId.value     = escape(patientId);
//		frmUpdate.loginUserId.value   = escape(top.LoginUserId);
		frmUpdate.patientId.value     = encodeURIComponent(patientId);
		frmUpdate.loginUserId.value   = encodeURIComponent(top.LoginUserId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
		frmUpdate.loginTime.value     = top.LoginTime;
		frmUpdate.submit();
	}
	catch(exception){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
	}	
}