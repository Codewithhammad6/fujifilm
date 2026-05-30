//*****************************************************************************
//  Function.js 
//
//     Functionのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2004/12/21  菅野      -----        新規作成
//     2008/02/28  HSK由比   V3.2         RU非接続時のRUアイコンとタブ非表示対応
//     2008/07/16  S1 神立   V4.0         クライアント5台対応 連打禁止用の透明フレームの操作を追加
//     2010/04/05  FF星野    V2.0(B)      インジケーター全削除対応
//     2014/03/11  TYK石井   V3.0(B)      DR装置画面対応

//*****************************************************************************

  var QueRefreshInt;               // 出力キュー画面自動更新間隔
  var QueListMax;                  // 出力キューリスト最大表示件数
  var EvtListMax;                  // イベント情報リスト最大表示
  var MediaListMax;                // メディアリスト最大表示件数
  var MultiByte;                   // マルチバイト

  var RUWatchInt;                  // RU操作監視間隔

  var UtilityKind;                 // 初期表示ユーティリティ画面
  var OriginDisplay;               // 呼出元画面
  var LoginUserId;                 // ログインID
  var LoginTime;                   // ログイン時間
  var DcmOptionKey;                // DICOMオプションキー
  var FontSize;                    // フォントサイズ
  var FontFamily;                  // フォント

  var SystemType;                  // 自筐体種別
  var ConfirmProc = "";            // 確認ダイアログを閉じた後の処理

  var WarningProc = "";            // 警告ダイアログを閉じた後の処理

  var LangStrArray = new Array();  // 文字列
  var ConnectingRU;                // RUと直接接続かどうか
  
  var TransparentDialogTimeout ;   // 連打禁止を解除するためのタイマー
  //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD Start
  var ConnectingDR;                // DRと直接接続かどうか
  var SeDeviceRefreshInterval      // SE装置状態リストの自動表示更新間隔(秒)
  var BatteryWarningCapacity;      // バッテリー容量低下警告時間(分)
  var BatteryMaxTime;              // 撮影可能最大時間(時間)
  var LangSEStrArray = new Array();  // SEメッセージ文字列
  var LangSEIntArray = new Array();  // SEメッセージ文字列
  var LangSEArrayNum;
  //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD End

//*****************************************************************************
// Fn_InitPage
//
// １．機能
//   ・初期処理


//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_InitPage(){
  try{
		//インジケータアイコン非表示
		top.Fn_DisplayIndIcon(0);
		
    // BODYのフォントを指定

    document.body.style.fontFamily           = FontFamily;

    // タブ表示フレームを読み込む
    document.getElementById("TUB_FRAME").src = "Tub.aspx";

  }catch(ex){
    // 例外発生時の処理


    Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_ShowConfirmDialog
//
// １．機能
//   ・確認ダイアログを表示する
//
// ２．戻り値
//      なし

//
// ３．備考

//       引数    strMessage    確認ダイアログのメッセージ
//               strButton1    ボタン1のテキスト

//               strButton2    ボタン2のテキスト

//               ProcCode      ダイアログを閉じた後の処理

//*****************************************************************************
function Public_ShowConfirmDialog(strMessage, strButton1, strButton2, ProcCode){
  try{
    document.getElementById("tdConformText").innerHTML     = strMessage;
    document.getElementById("divYesText").innerText        = strButton1;
    document.getElementById("divNoText").innerText         = strButton2;
    document.getElementById("tblConfirm").style.visibility = "visible";
    ConfirmProc = ProcCode;

  }catch(ex){
    // 例外発生時の処理


    Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_CloseConfirmDialog
//
// １．機能
//     ・確認ダイアログを閉じる
//
// ２．戻り値
//      なし

//
// ３．備考

//    引数    ProcFlag     0:｢いいえ｣ボタン押下/1:｢はい｣ボタン押下

//*****************************************************************************
function Fn_CloseConfirmDialog(ProcFlag){
  try{
    // 確認ダイアログを閉じる
    document.getElementById("tblConfirm").style.visibility = "hidden";

    // ダイアログを閉じた後の処理


    switch(ConfirmProc){
      // 出力キュー情報の削除
      case 1:
        VIEW_FRAME.Public_DeleteQueue(ProcFlag);
        break;

      // イベント情報の削除
      case 2:
        VIEW_FRAME.Public_DeleteEvent(ProcFlag);
        break;
      //2010.04.05 FF 星野 インジケーター全削除対応 ADD-START
      //イベント全削除
      case 4:
        VIEW_FRAME.Public_AllDeleteEvent(ProcFlag);
        break;
      //2010.04.05 FF 星野 インジケーター全削除対応 ADD-END        
    }

    // 確認ダイアログを閉じた後の処理コードに初期値を設定する


    ConfirmProc = 0;

  }catch(ex){
    // 例外発生時の処理


    Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_ShowWarningDialog
//
// １．機能
//   ・警告ダイアログを表示する
//
// ２．戻り値
//      なし

//
// ３．備考

//       引数    strMessage    警告ダイアログのメッセージ
//               strButton1    ボタンのテキスト

//               ProcCode      ダイアログを閉じた後の処理

//*****************************************************************************
function Public_ShowWarningDialog(errorFileName, errorSpot, errorTitle1, errorTitle2, errorMessage, buttonString, ProcCode){
  try{
    // ボタンの文字に指定が無ければOKを表示する
    if(!buttonString){
      buttonString = Public_GetString(KeyOK, DefaultOK);
    }

    // ダイアログを表示する  
// PVCS#1667 2005/12/12 up-st
// ダイアログ上にはファイル名・スポットコードは表示させない

//	  var errorTitle = errorTitle1+ "    FileName:" + errorFileName + "  SpotCode:"+ errorSpot; 	
	  var errorTitle = errorTitle1;
// PVCS#1667 2005/12/12 up-ed

	  // エラーメッセージ表示
    document.getElementById("TABLE_MainErrorFrame").style.visibility  = "visible";
    document.getElementById("TD_MainErrorTitle1").innerHTML           = errorTitle;
    document.getElementById("TD_MainErrorTitle2").innerHTML           = errorTitle2;
    document.getElementById("TD_MainErrorText").innerHTML             = errorMessage;
    document.getElementById("DIV_MainErrorOkText").innerText          = buttonString;

    // ダイアログを閉じた後の処理コードを設定する

    WarningProc = ProcCode;

  }catch(ex){
    // 例外発生時の処理


    Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_ShowWarningMessage
//
// １．機能
//   ・警告ダイアログを表示する
//
// ２．戻り値
//      なし

//
// ３．備考

//       引数    strMessage    警告ダイアログのメッセージ
//               strButton1    ボタンのテキスト

//               ProcCode      ダイアログを閉じた後の処理

//*****************************************************************************
function Public_ShowWarningMessage(strMessage, strButton, ProcCode){
  try{
    // ボタンの文字に指定が無ければOKを表示する
    if(!strButton){
      strButton = Public_GetString(KeyOK, DefaultOK);
    }

	  // エラーメッセージ表示
    document.getElementById("TABLE_MainErrorFrame").style.visibility  = "visible";
    document.getElementById("TD_MainErrorTitle1").innerHTML           = "";
    document.getElementById("TD_MainErrorTitle2").innerHTML           = strMessage;
    document.getElementById("TD_MainErrorText").innerHTML             = "";
    document.getElementById("DIV_MainErrorOkText").innerText          = strButton;

    // ダイアログを閉じた後の処理コードを設定する

    WarningProc = ProcCode;

  }catch(ex){
    // 例外発生時の処理


    Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_CloseWarningDialog
//
// １．機能
//     ・警告ダイアログを閉じる
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_CloseWarningDialog(){
  try{
    // 確認ダイアログを閉じる
    document.getElementById("TABLE_MainErrorFrame").style.visibility = "hidden";
    // ダイアログを閉じた後の処理

    switch(WarningProc){
      // ユーザがログオフした場合の処理

      case 1:
        Fn_UserAuthorityError();
        break;

      // サーバアプリケーションが未起動の場合(画面を閉じる)
      case 2:
        Fn_End();
        break;

      // RUステータス画面をクリアする
      case 3:
        VIEW_FRAME.Public_EndGetNoStatus();
        break;

      // RU装置状態を取得する


      case 4:
        VIEW_FRAME.Public_Refresh();
        break;

      // メディアステータス画面を更新する
      case 5:
        VIEW_FRAME.Public_EndGetStatus();
        break;
    }

    // 警告ダイアログを閉じた後の処理コードに初期値を設定する


    WarningProc = 0;

  }catch(ex){
    // 例外発生時の処理


    Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_ShowProcessingDialog
//
// １．機能
//   ・処理中ダイアログを表示する
//
// ２．戻り値
//      なし

//
// ３．備考

//       引数    strMessage    処理中ダイアログのメッセージ
//*****************************************************************************
function Public_ShowProcessingDialog(strMessage){
  try{
    // ダイアログの文字列設定


    document.getElementById("tdProcessingText").innerText     = strMessage;
    document.getElementById("tblProcessing").style.visibility = "visible";

  }catch(ex){
    // 例外発生時の処理


    Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_CloseProcessingDialog
//
// １．機能
//     ・処理中ダイアログを閉じる
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_CloseProcessingDialog(){
  try{
    // 処理中ダイアログを閉じる
    document.getElementById("tdProcessingText").innerText     = "";
    document.getElementById("tblProcessing").style.visibility = "hidden";

  }catch(ex){
    // 例外発生時の処理


    Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_GetString
//
// １．機能
//   ・文字列を取得する

//
// ２．戻り値
//      なし

//
// ３．備考

//       引数        Code        文字列のキー
//                   DefaultVal  デフォルト値
//*****************************************************************************
function Public_GetString(Code, DefaultVal){
  try{
    // 指定されたキーの文字列があれば、取得した文字列を返す
    if(LangStrArray[Code]){
      return LangStrArray[Code];
    // 無ければデフォルト値を返す
    }else{
      return DefaultVal;
    }

  }catch(ex){
    // 例外発生時の処理


    Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_End
//
// １．機能
//   ・サーバ未起動時の処理

//   ・ブラウザを終了する

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_End(){
  try{
    // ブラウザを閉じる
    top.Exit();

  }catch(ex){
    // 例外発生時の処理


    Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_UserAuthorityError
//
// １．機能
//     ・ログオフされた場合の処理

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_UserAuthorityError(){
  try{
    // 直接起動の場合

    if(UtilityKind == "Direct"){

      // ファンクションフレームをリロードし、ユーザ認証画面に遷移する
      location.reload();
    
    // ダイアログ表示の場合

    }else{
      switch(SystemType){
        // 確認モニタ筐体の場合


        case 1:
          // ダイアログの戻り値に-3を設定する

          window.returnValue = -3;
          break;

        // デスクトップ筐体の場合


        default:
          // ダイアログの戻り値に-4を設定する

          window.returnValue = -4;
          break;
      }
      // ダイアログを閉じる
      Fn_End();
    }

  }catch(ex){
    // 例外発生時の処理


    Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_ServerAliveError
//
// １．機能
//     ・サーバアプリケーション未起動時の処理

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_ServerAliveError(){
  try{
    // 直接起動の場合


    if(UtilityKind == "Direct"){

      // ブラウザを閉じる
      Fn_End();
    
    // ダイアログ表示の場合


    }else{
      switch(SystemType){
        // 確認モニタ筐体の場合


        case 1:
          // ダイアログの戻り値に-1を設定する

          window.returnValue = -1;
          break;

        // デスクトップ筐体の場合


        default:
          // ダイアログの戻り値に-2を設定する

          window.returnValue = -2;
          break;
      }
      // ダイアログを閉じる
      Fn_End();
    }

  }catch(ex){
    // 例外発生時の処理


    Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_ExceptionMessage
//
// １．機能
//   ・スクリプトエラーメッセージを表示する
//
// ２．戻り値
//      なし

//
// ３．備考

//       引数    ex    Exception
//*****************************************************************************
function Public_ExceptionMessage(ex){

  var MessageKey     = KeyErrorMessage;
  var DefaultMessage = DefaultErrorMessage;
  var ButtonKey      = KeyOK;
  var DefaultButton  = DefaultOK;
  var strMessage     = Public_GetString(MessageKey, DefaultMessage);
  var strButton      = Public_GetString(ButtonKey, DefaultButton);

	// エラーメッセージ表示
  document.getElementById("TABLE_MainErrorFrame").style.visibility  = "visible";
  document.getElementById("TD_MainErrorTitle1").innerHTML           = "";
  document.getElementById("TD_MainErrorTitle2").innerHTML           = strMessage;
  document.getElementById("TD_MainErrorText").innerHTML             = "Error : " + ex.description;
  document.getElementById("DIV_MainErrorOkText").innerText          = strButton;
}

//*****************************************************************************
// Public_ShowTransparentDialog
//  １．機能    画面内の操作ができないように、連打禁止用の透明フレームを表示する。
//  ２．戻り値  なし
//  ３．備考    異常時にフリーズしないように、一定時間後に消えるようにしておく。
//*****************************************************************************
function Public_ShowTransparentDialog(){
  clearTimeout( TransparentDialogTimeout );
  document.getElementById("tblTransparentBox").style.visibility  = "visible";
  TransparentDialogTimeout = setTimeout( "Public_CloseTransparentDialog()", 10000); 
}

//*****************************************************************************
// Public_CloseTransparentDialog
//  １．機能    操作を可能にするため、連打禁止用の透明フレームを消す。
//  ２．戻り値  なし
//*****************************************************************************
function Public_CloseTransparentDialog(){
  clearTimeout( TransparentDialogTimeout );
  document.getElementById("tblTransparentBox").style.visibility  = "hidden";
}

//*****************************************************************************
// Public_GetString
//
// １．機能
//   ・文字列を取得する(SE装置のエラーメッセージ)

//
// ２．戻り値
//      なし

//
// ３．備考

//       引数        Code        文字列のキー
//                   DefaultVal  デフォルト値
//*****************************************************************************
function Public_GetSEString(Code, DefaultVal){
  try{
    // 指定されたキーの文字列があれば、取得した文字列を返す
    for(i = 0; i < LangSEArrayNum; i++){
      if(Code == LangSEIntArray[i])
      {
        return LangSEStrArray[i];
      }
    }
    
    //該当しない場合は、11126の文言を表示
    if(30000 <= Code )
    {
		return "[" + String(Code-30000) + "]" + Public_GetString(KeyDRCauseUnknownMessage, String(Code-30000));
    }
    else
    {
		return DefaultVal;
    }
    
  }catch(ex){
    // 例外発生時の処理
    Public_ExceptionMessage(ex);
  }
}