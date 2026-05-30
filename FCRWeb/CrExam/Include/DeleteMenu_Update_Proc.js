/****************************************************************************

  @file DeleteMenu_Update_Proc.js

  @brief DeleteMenu_Update_Procのクライアントスクリプト

  @author YSK齋藤
  
        SpotCode MAX 1

  Copyright(c) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/11/05  YSK齋藤     V1.0       新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  07/06/07  HSK古場     V2.0       PVCS#2281対応 

/****************************************************************************/
//エラー
var FATAL_ERROR = "FATAL_ERROR";                //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";                //再試行可能なエラー
var SPOT_CODE   = 0;                            //スポットコードvar FILE_NAME   = "DeleteMenu_Update_Proc.js";  //ファイル名var MESSAGE_ID  = 30500;                        //メッセージID 
//*****************************************************************************
// Fn_InitPage
//
// １．機能
//     ペーロード時の処理//
// ２．戻り値
//　　  なし//
// ３．備考//*****************************************************************************
function Fn_InitPage(){
}
//*****************************************************************************
// Public_Update
//
// １．機能
//     ＤＢコンポーネントに更新処理を要求する//
// ２．戻り値
//　　  なし//
// ３．備考//*****************************************************************************
function Public_Update(procMode, studySequence, sendImageSeq, sendMenuNo, studyStatus, patientId){
  try{
    //更新情報をセット
    frmUpdateForm.procMode.value      = procMode;
    frmUpdateForm.studySequence.value = studySequence;
    frmUpdateForm.imageSeq.value      = sendImageSeq;
    frmUpdateForm.menuNo.value        = sendMenuNo;
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
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
  }
}