/****************************************************************************

  @file RegStudy_Update_Proc.js

  @brief RegStudy_Update_Procのクライアントスクリプト

  @author YSK齋藤
  
        SpotCode MAX 1

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/30  YSK齋藤     V1.0       新規作成
  @date  06/08/08  YSK齋藤     V1.3       拡張メニューコードの区切り文字変更(PVCS#1804)
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  07/06/05  HSK古場     V2.0       PVCS#2281対応 
  @date  10/06/01  FF 星野     V2.0(B)    CQ#219対応

/****************************************************************************/
//エラー
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード

var FILE_NAME = "RegistStudy_Update_Proc.js"  //ファイル名

var MESSAGE_ID = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS   = 30501;              //メッセージID 
// 2006/08/08 PVCS#1804 H.SAITO -ST-
var SPLIT_STRING_MENUDATA = "\\";
// 2006/08/08 PVCS#1804 H.SAITO -ED-
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
//*****************************************************************************
// Public_Update
//
// １．機能
//     サーバに更新処理を要求する//
// ２．戻り値
//　　  なし//
// ３．備考//*****************************************************************************
function Public_Update(commandType, patientId, patientNameSbcs, patientNameDbcs, patientSex, patientBirthDate, entryMenuCode, entryExamFlag){
	try{
    //更新情報をセット
		frmUpdate.commandType.value				= commandType;
//070605 HSK古場 PVCS#2281 UPDATE-ST
//		frmUpdate.patientId.value					= escape(patientId);
//		frmUpdate.patientNameSbcs.value		= escape(patientNameSbcs);
		frmUpdate.patientId.value					= encodeURIComponent(patientId);
		frmUpdate.patientNameSbcs.value		= encodeURIComponent(patientNameSbcs);
//070605 HSK古場 PVCS#2281 UPDATE-ED
		frmUpdate.patientNameDbcs.value		= patientNameDbcs
		frmUpdate.patientSex.value				= patientSex;
		frmUpdate.patientBirthDate.value	= patientBirthDate;
		// 2006/08/08 PVCS#1804 H.SAITO -ST-
		//frmUpdate.entryMenuCode.value			= entryMenuCode;
		//frmUpdate.entryExamFlag.value			= entryExamFlag;
		frmUpdate.entryMenuCode.value			= entryMenuCode.join(SPLIT_STRING_MENUDATA);
		frmUpdate.entryExamFlag.value			= entryExamFlag.join(SPLIT_STRING_MENUDATA);
		// 2006/08/08 PVCS#1804 H.SAITO -ED-
//070605 HSK古場 PVCS#2281 UPDATE-ST
//    frmUpdate.loginUserId.value       = escape(top.LoginUserId);
    frmUpdate.loginUserId.value       = encodeURIComponent(top.LoginUserId);
//070605 HSK古場 PVCS#2281 UPDATE-ED
    frmUpdate.loginTime.value         = top.LoginTime;
		frmUpdate.submit();
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
	}
}
//2010.06.01 CQ#219対応 FF星野 ADD-ST
function Public_Update(commandType, patientId, patientNameSbcs, patientNameDbcs, patientSex, patientBirthDate, entryMenuCode, entryExamFlag
			,patientComment,patientsSize,patientsWeight,patientSpeciesDescription,patientBreedDescription,responsiblePerson,responsiblePersonIdoGraphic,responsibleOrganization,sexNutered)
{
	try{
    //更新情報をセット
		frmUpdate.commandType.value			= commandType;
		frmUpdate.patientId.value			= encodeURIComponent(patientId);
		frmUpdate.patientNameSbcs.value		= encodeURIComponent(patientNameSbcs);
		frmUpdate.patientNameDbcs.value		= patientNameDbcs
		frmUpdate.patientSex.value			= patientSex;
		frmUpdate.patientBirthDate.value	= patientBirthDate;
		frmUpdate.entryMenuCode.value		= entryMenuCode.join(SPLIT_STRING_MENUDATA);
		frmUpdate.entryExamFlag.value		= entryExamFlag.join(SPLIT_STRING_MENUDATA);
		frmUpdate.loginUserId.value			= encodeURIComponent(top.LoginUserId);
		frmUpdate.loginTime.value			= top.LoginTime;
		frmUpdate.patientComment.value		= patientComment;
		frmUpdate.patientsSize.value		= patientsSize;
		frmUpdate.patientsWeight.value		= patientsWeight;
		frmUpdate.speciesDescription.value	= patientSpeciesDescription;
		frmUpdate.breedDescription.value	= patientBreedDescription;
		frmUpdate.responsiblePerson.value	= responsiblePerson;
		frmUpdate.responsiblePersonIdoGraphic.value = responsiblePersonIdoGraphic;
		frmUpdate.responsibleOrganization.value		= responsibleOrganization
		frmUpdate.neuteredSex.value			= sexNutered;
		frmUpdate.submit();
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
	}
}
//2010.06.01 CQ#219対応 FF星野 ADD-ED