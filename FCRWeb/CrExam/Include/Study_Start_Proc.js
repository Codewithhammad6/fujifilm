/****************************************************************************

  @file Study_Start_Proc.js

  @brief Study_Start_Procのクライアントスクリプト

  @author YSK齋藤

        SpotCode MAX 1

  Copyright(c) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/11/10  YSK齋藤       V1.0       新規作成
  @date  06/10/23  HSK山本       V1.4       CR検査部構造見直し[4]対応 
  @date  07/06/07  HSK古場       V2.0       PVCS#2281対応 

/****************************************************************************/
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード

var FILE_NAME = "Study_Start_Proc.js"  //ファイル名

var MESSAGE_ID = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS   = 30501;              //メッセージID 
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
//*****************************************************************************
// Public_Start
//
// １．機能
//      サーバ側の処理を行う
// ２．戻り値
//　　  なし
// ３．備考
//*****************************************************************************
function Public_StartProc(procMode, studySequence){
  try{
    frmStartProcForm.procMode.value      = procMode;
    frmStartProcForm.studySequence.value = studySequence;  
//070607 HSK古場 PVCS#2281 UPDATE-ST
//    frmStartProcForm.loginUserId.value   = escape(top.LoginUserId);
    frmStartProcForm.loginUserId.value   = encodeURIComponent(top.LoginUserId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
    // 2005/06/27 002 H.SAITO PVCS#350 認証、権限チェック対応
    frmStartProcForm.loginTime.value     = top.LoginTime;
    frmStartProcForm.submit();
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
  }
}