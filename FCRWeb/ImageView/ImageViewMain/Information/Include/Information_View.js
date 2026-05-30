/****************************************************************************

  @file Information_View.js

  @brief Information_View.jsのクライアントスクリプト

  @author HSK山本


  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応

/****************************************************************************/

//*****************************************************************************
// Fn_InitPage
//
// １．機能
//      ページロード時の処理
// ２．戻り値
//　　  なし// ３．備考//*****************************************************************************
var strStudySeq ;

function Fn_InitPage(){
}
//*****************************************************************************
// Public_ClearInformation
//
// １．機能
//     患者情報/ガイダンスの表示を消去する
// ２．戻り値
//　　  なし// ３．備考//*****************************************************************************
function Public_ClearInformation(){
  document.getElementById("DIV_PatientIDText").innerText        = ""; 
  document.getElementById("DIV_PatientSexText").innerText       = ""; 
  document.getElementById("DIV_PatientNameText").innerText      = "";
  document.getElementById("DIV_PatientBirthDateText").innerText = "";
  document.getElementById("DIV_PatientAgeText").innerText				= "";
}
//*****************************************************************************
// Public_SetPatientID
//
// １．機能
//     患者ＩＤをセットする(最大:26桁)
// ２．戻り値
//　　  なし
// ３．備考
//*****************************************************************************
function Public_SetPatientId(patientId){
  document.getElementById("DIV_PatientIDText").innerText = patientId; 
}
//*****************************************************************************
// Public_SetPatientSex
//
// １．機能
//     性別をセットする
// ２．戻り値
//　　  なし
// ３．備考
//*****************************************************************************
function Public_SetPatientSex(patientSex){
  document.getElementById("DIV_PatientSexText").innerText = patientSex; 
}
//*****************************************************************************
// Public_SetPatientName
//
// １．機能
//     患者名をセットする(最大:全角21文字[敬称含む],半角33文字[敬称含まない]) 
// ２．戻り値
//　　  なし
// ３．備考
//*****************************************************************************
function Public_SetPatientName(patientName){
  document.getElementById("DIV_PatientNameText").innerText = patientName; 
}
//*****************************************************************************
// Public_SetPatientBirthDate
//
// １．機能
//     患者の生年月日をセットする
// ２．戻り値
//　　  なし
// ３．備考
//*****************************************************************************
function Public_SetPatientBirthDate(patientBirthDate){
  document.getElementById("DIV_PatientBirthDateText").innerText = patientBirthDate;
}
//*****************************************************************************
// Public_SetPatientAge
//
// １．機能
//     患者の年齢をセットする
// ２．戻り値
//　　  なし
// ３．備考
//*****************************************************************************
function Public_SetPatientAge(patientAge){
  document.getElementById("DIV_PatientAgeText").innerText = patientAge;
}
//*****************************************************************************
// Public_InfoEdit
//
// １．機能
//     患者の編集をする
// ２．戻り値
//　　  なし
// ３．備考
//*****************************************************************************
function Public_InfoEdit(){

	// ここからCR検査の患者情報を呼び出す。
	// 戻り値は画像参照へ戻す


}
//*****************************************************************************
// Public_SetStudySEQ
//
// １．機能
//     検査シーケンスを登録する
// ２．戻り値
//　　  なし
// ３．備考
//*****************************************************************************
function Public_SetStudySEQ(StudySeq){
	strStudySeq = StudySeq ;
}


