//*****************************************************************************
//  RU_Ctrl.js 
//
//     RU_Ctrlのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2004/11/12  菅野      -----        新規作成
//     2006/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
//     2008/07/30  S1 神立     V4.0       クライアント5台対応
//     2014/03/11  TYK石井     V3.0(B)    DR装置画面追加 MOD
//*****************************************************************************

  //-- RUステータス --//
  var g_strDeviceID     = "";   // 装置ID
  var g_strDeviceName   = "";   // 装置名称
  var g_intRUInfo       = 0;    // 内部状態情報
  var g_strDeviceStatus = "";   // 装置状態

  var g_strDetail       = "";   // 詳細情報
  var g_intSeq          = "";   // シーケンス番号
  var g_strRUButton1    = "";   // ボタン1
  var g_strRUButton2    = "";   // ボタン2
  var g_strRUButton3    = "";   // ボタン3
  var g_strRUButton4    = "";   // ボタン4

  var intRuDisplayFlag  = 0;     // RU表示画面フラグ
  var PROC_MODE         = "RU";  // 画面名

  var TimerID           = "";    // タイマID
  var RUControlFlag     = 0;     // RU操作フラグ

//*****************************************************************************
// Fn_InitPage
//
// １．機能
//      初期処理

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_InitPage(){
  try{
//2006/10/13 HSK山本 UPDATE ST 構造見直し（ページローダ）

	//ページローダ生成
	var loader = new PageLoader();
	//ページ情報追加
	loader.AddLoadPage("RUSTATUS_VIEW","RUStatus_View.aspx");
	loader.AddLoadPage("RUCONTROL_VIEW","RUControl_View.aspx");
	//コールバック設定

	loader.SetAllPageLoadedNotification(ChildPagesLoadedNotification);
	//ロード開始

	loader.Start();
//    //読み込むページを設定
//
//    PageListArray.push("RUStatus_View.aspx");
//    PageListArray.push("RUControl_View.aspx");
//    PageIdArray.push("RUSTATUS_VIEW");
//    PageIdArray.push("RUCONTROL_VIEW");
//
//    //ページの読み込み
//    Public_NextLoad();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// ChildPagesLoadedNotification
//
// １．機能
//     ・画面に表示する文字列の設定を行う
//     ・初期表示するユーティリティ画面の設定を行う
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function ChildPagesLoadedNotification(){
  try{
    // BODYのフォントを指定

    document.body.style.fontFamily = top.FUNCTION_FRAME.FontFamily;

    // 文字列設定
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD Start
    //document.getElementById("divRefresh").innerText   = parent.Public_GetString(KeyRefresh, DefaultRefresh);
    //document.getElementById("divOK").innerText        = parent.Public_GetString(KeyOK, DefaultOK);
    //document.getElementById("divRUStatus").innerText  = parent.Public_GetString(KeyStatus, DefaultStatus);
    //document.getElementById("divRUControl").innerText = parent.Public_GetString(KeyControl, DefaultControl);
    
    document.getElementById("divRefresh").innerText   = top.FUNCTION_FRAME.Public_GetString(KeyRefresh, DefaultRefresh);
    document.getElementById("divOK").innerText        = top.FUNCTION_FRAME.Public_GetString(KeyOK, DefaultOK);
    document.getElementById("divRUStatus").innerText  = top.FUNCTION_FRAME.Public_GetString(KeyStatus, DefaultStatus);
    document.getElementById("divRUControl").innerText = top.FUNCTION_FRAME.Public_GetString(KeyControl, DefaultControl);
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD End

    //---- クッキーの値取得 ----//
    myCookie = "RU_Display=";
    myValue = null;
    myStr = document.cookie + ";" ;
    myOfst = myStr.indexOf(myCookie);
    if (myOfst != -1){
      myStart = myOfst + myCookie.length;
      myEnd   = myStr.indexOf(";" , myStart);
      Index   = unescape(myStr.substring(myStart,myEnd));
    // クッキーに値がない場合


    }else{
      document.cookie = "RU_Display = 1;0";
      Index = 1;
    }

    // 初期表示画面設定

    ChangeDisplay(eval(Index));
    
    // RU装置状態情報取得

    Public_Refresh();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// ChangeDisplay
//
// １．機能
//     ・RUステータス画面/RU操作画面の表示を切り替える
//
// ２．戻り値
//      なし

//
// ３．備考

//     引数 intDisplayNumber  1:RUステータス画面
//                            2:RU操作画面
//*****************************************************************************
function ChangeDisplay(intDisplayNumber){
  try{
    switch(intDisplayNumber){
      // RUステータス画面
      case 1:
        document.getElementById("imgRUStatus").src  = "../Bmp/cmSquare3BtnD.gif";
        document.getElementById("imgRUControl").src = "../Bmp/cmSquare3BtnU.gif";
        document.getElementById("RUSTATUS_VIEW").style.visibility  = "visible";
        document.getElementById("RUCONTROL_VIEW").style.visibility = "hidden";
        break;

      // RU操作画面
      case 2:
        document.getElementById("imgRUControl").src = "../Bmp/cmSquare3BtnD.gif";
        document.getElementById("imgRUStatus").src  = "../Bmp/cmSquare3BtnU.gif";
        document.getElementById("RUCONTROL_VIEW").style.visibility = "visible";
        document.getElementById("RUSTATUS_VIEW").style.visibility  = "hidden";
        break;
    }
    intRuDisplayFlag = intDisplayNumber;

    // クッキーに保存

    document.cookie = "RU_Display = " + intDisplayNumber + ";0";

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// MouseOutRuButton
//
// １．機能
//     ・RU表示ボタンのonmouseoutイベント

//
// ２．戻り値
//      なし

//
// ３．備考

//     引数   obj          処理対象のオブジェクト

//            intRuButton  1:RUステータス
//                         2:RU操作画面
//*****************************************************************************
function MouseOutRuButton(obj, intRuButton){
  try{
    // 対象ボタンが選択中ではない場合


    if(intRuButton != intRuDisplayFlag){
      // 画像入れ替え


      SetImageUrl(obj, '../Bmp/cmSquare3BtnU.gif');
    }

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_EndGetStatus
//
// １．機能
//      RUステータス取得後の処理

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_EndGetStatus(){
  try{
    // RU操作フラグを設定する


    RUControlFlag = 1;
    // 取得した情報を表示する
    RUSTATUS_VIEW.Public_SetStatus();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_EndGetNoStatus
//
// １．機能
//      RUステータス取得後の処理(取得に失敗した場合)
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_EndGetNoStatus(){
  try{
    RUControlFlag = 0;
    RUSTATUS_VIEW.Public_EndGetNoStatus();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_WindowRequest
//
// １．機能
//     Window表示要求に対する操作

//
// ２．戻り値
//      なし

//
// ３．備考

//      引数   ButtonNo  Window表示要求に対して実行されたボタン
//*****************************************************************************
function Public_WindowRequest(ButtonNo){
  try{
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD Start
    //parent.Public_ShowProcessingDialog(parent.Public_GetString(KeyExecuting, DefaultExecuting));
    top.FUNCTION_FRAME.Public_ShowProcessingDialog(top.FUNCTION_FRAME.Public_GetString(KeyExecuting, DefaultExecuting));
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD End
    // Window表示要求応答用のURL作成
    var ProcURL = "";
    ProcURL =  "./RU_WinReq_Proc.aspx";
    ProcURL += "?LoginId="   + top.FUNCTION_FRAME.LoginUserId;
    ProcURL += "&LoginTime=" + top.FUNCTION_FRAME.LoginTime;
    ProcURL += "&Seq="       + g_intSeq;
    ProcURL += "&Response="  + ButtonNo;

    // Window表示要求応答用ASPX読み込み
    RU_CONTROL_PROC.location.replace(ProcURL);

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_EndWindowRequest
//
// １．機能
//     Window表示要求の応答完了後の処理

//
// ２．戻り値
//      なし

//
// ３．備考

//       引数    retCode    Window表示要求の戻り値
//                          0 : 正常終了

//                          3 : 応答中
//                          4 : 実行中
//                          5 : 実行済み
//                          6 : レコードなし

//                               (他筐体が実行済み、またはRUがキャンセルした)
//                          -1 : DBアクセスエラー
//                          上記以外 : その他のエラー
//*****************************************************************************
function Public_EndWindowRequest(){
  try{
    Fn_Watch();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_RUControl
//
// １．機能
//     RU操作を行う
//
// ２．戻り値
//      なし
//
// ３．備考
//      引数   Command  処理種別
//*****************************************************************************
function Public_RUControl(Command){
  try{
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD Start
    //parent.Public_ShowProcessingDialog(parent.Public_GetString(KeyExecuting, DefaultExecuting));
    top.FUNCTION_FRAME.Public_ShowProcessingDialog(top.FUNCTION_FRAME.Public_GetString(KeyExecuting, DefaultExecuting));
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD End
    // RU操作用のURL作成
    var ProcURL = "";
    ProcURL =  "./RU_Control_Proc.aspx";
    ProcURL += "?LoginId="       + top.FUNCTION_FRAME.LoginUserId;
    ProcURL += "&LoginTime="     + top.FUNCTION_FRAME.LoginTime;
    ProcURL += "&Command="       + Command;
    ProcURL += "&DeviceID="      + g_strDeviceID;
    ProcURL += "&DeviceName="    + g_strDeviceName;
    ProcURL += "&OriginDisplay=" + top.FUNCTION_FRAME.OriginDisplay;

    // RU装置状態ステータス取得用ASPX読み込み
    RU_CONTROL_PROC.location.replace(ProcURL);

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_EndRUControl
//
// １．機能
//     RU操作後の処理

//
// ２．戻り値
//      なし

//
// ３．備考

//       引数    retCode    RU操作の戻り値
//                          0 : 正常終了

//                           : 排他エラー
//                          -1 : DBアクセスエラー
//                          上記以外 : その他のエラー
//*****************************************************************************
function Public_EndRUControl(){
  try{
    Fn_Watch();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_Watch
//
// １．機能
//     RU操作の結果を監視する

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_Watch(){
  try{
    // RU操作監視用のURL作成
    var ProcURL = "";
    ProcURL =  "./RU_Watch_Proc.aspx";
    ProcURL += "?LoginId="       + top.FUNCTION_FRAME.LoginUserId;
    ProcURL += "&LoginTime="     + top.FUNCTION_FRAME.LoginTime;
    ProcURL += "&Seq="           + g_intSeq;
    ProcURL += "&OriginDisplay=" + top.FUNCTION_FRAME.OriginDisplay;

    // RU操作監視用ASPX読み込み
    RU_WATCH_PROC.location.replace(ProcURL);

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_EndWatch
//
// １．機能
//     RU操作の結果を監視する

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_EndWatch(){
  try{
    // RU操作監視タイマー開始


    TimerID = setTimeout("Fn_Watch();", top.FUNCTION_FRAME.RUWatchInt);

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_Refresh
//
// １．機能
//     画面をリフレッシュする
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_Refresh(){
  try{
    // 操作ログ書込み
    Public_WriteLog("Refresh");
    
    // 画面リフレッシュ
    Public_Refresh();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_Refresh
//
// １．機能
//     画面をリフレッシュする
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Public_Refresh(){
  try{
    // RU装置状態ステータス取得用のURL作成
    var ProcURL = "";
    ProcURL =  "./RUStatus_Get_Proc.aspx";
    ProcURL += "?LoginId="   + top.FUNCTION_FRAME.LoginUserId;
    ProcURL += "&LoginTime=" + top.FUNCTION_FRAME.LoginTime;

    // 連打を禁止する 2008/07/30 神立
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD Start
    //parent.Public_ShowTransparentDialog();
    top.FUNCTION_FRAME.Public_ShowTransparentDialog();
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD End
    // RU装置状態ステータス取得用ASPX読み込み
    RUSTATUS_GET_PROC.location.replace(ProcURL);

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_ShowWarningMessage
//
// １．機能
//     ・警告ダイアログを表示する
//
// ２．戻り値
//      なし

//
// ３．備考

//       引数    strMessage    確認ダイアログのメッセージ
//               strButton     ボタンのテキスト

//               ProcCode      ダイアログを閉じた後の処理

//*****************************************************************************
function Public_ShowWarningMessage(strMessage, strButton, ProcCode){
  try{
    // 警告ダイアログを表示
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD Start
    //parent.Public_ShowWarningMessage(strMessage, strButton, ProcCode);
    top.FUNCTION_FRAME.Public_ShowWarningMessage(strMessage, strButton, ProcCode);
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD End

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_ShowWarningDialog
//
// １．機能
//     ・警告ダイアログを表示する
//
// ２．戻り値
//      なし

//
// ３．備考

//       引数    errorFileName ファイル名


//               errorSpot     スポットコード


//               errorTitle1   Title1
//               errorTitle2   Title2
//               errorMessage  確認ダイアログのメッセージ
//               buttonString  ボタンのテキスト

//               ProcCode      ダイアログを閉じた後の処理

//*****************************************************************************
function Public_ShowWarningDialog(errorFileName,
                                  errorSpot,
                                  errorTitle1,
                                  errorTitle2,
                                  errorMessage,
                                  buttonString,
                                  ProcCode){
  try{
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD Start
    // 初期表示時は表示用フレームを表示する
    //if(parent.document.getElementById("VIEW_FRAME").style.visibility == "hidden"){
    //  parent.document.getElementById("VIEW_FRAME").style.visibility = "visible";
    //}

    // 警告ダイアログを表示
    //parent.Public_ShowWarningDialog(errorFileName, errorSpot, errorTitle1, errorTitle2, errorMessage, buttonString, ProcCode);
    
    // 初期表示時は表示用フレームを表示する
    if(top.FUNCTION_FRAME.document.getElementById("VIEW_FRAME").style.visibility == "hidden"){
      top.FUNCTION_FRAME.document.getElementById("VIEW_FRAME").style.visibility = "visible";
    }

    // 警告ダイアログを表示
    top.FUNCTION_FRAME.Public_ShowWarningDialog(errorFileName, errorSpot, errorTitle1, errorTitle2, errorMessage, buttonString, ProcCode);
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD End
    
  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_CloseProcessingDialog
//
// １．機能
//     処理中ダイアログを閉じる
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_CloseProcessingDialog(){
  try{
    // 処理中ダイアログを閉じる
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD Start
    //parent.Public_CloseProcessingDialog();
    top.FUNCTION_FRAME.Public_CloseProcessingDialog();
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD End

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//************************************************
// Public_WriteLog
//
// １．機能 
//      操作ログを出力する

// ２．戻り値
//　　  特になし

// ３．備考

//       引数      ctrlCommand    操作名
//************************************************
function Public_WriteLog(ctrlCommand){
  try{
    // 操作ログ出力


    var strURL = "";
    strURL =  "Logger_Proc.aspx?";
    strURL += "Display=" + PROC_MODE;
    strURL += "&Command=" + ctrlCommand;
    strURL += "&LoginId=" + top.FUNCTION_FRAME.LoginUserId;
    strURL += "&LoginTime=" + top.FUNCTION_FRAME.LoginTime;
    LOGGER_PROC.location.replace(strURL);
    
  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}
