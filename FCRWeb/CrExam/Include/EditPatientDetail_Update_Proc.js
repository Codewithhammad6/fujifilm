/****************************************************************************

  @file EditPatientDetail_Update_Proc.js

  @brief EditPatientDetail_Update_Procのクライアントスクリプト

  @author YSK畑
        SpotCode MAX 0

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/20  YSK畑       V1.0       新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応

/****************************************************************************/
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード

var FILE_NAME = "EditPatientDetail_Update_Proc.js"  //ファイル名

var MESSAGE_ID = 30500;              //メッセージID 

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
