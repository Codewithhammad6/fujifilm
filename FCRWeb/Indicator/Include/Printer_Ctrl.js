//*****************************************************************************
//  Printer_Ctrl.js 
//
//     Printer_Ctrlのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2004/12/03  菅野      -----        新規作成
//     2006/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応//     2008/07/30  S1 神立     V4.0       クライアント5台対応
//
//*****************************************************************************

  //---- プリンタ装置状態 ----//
  var strDeviceName = new Array();    // 装置名  var strStatus     = new Array();    // 装置状態  var strDetail     = new Array();    // 詳細情報

  var PROC_MODE     = "Printer";      // 画面名
//*****************************************************************************
// Fn_InitPage
//
// １．機能
//      初期処理//
// ２．戻り値
//      なし//
// ３．備考//*****************************************************************************
function Fn_InitPage(){
  try{
	LoadPage("PRINTER_VIEW","Printer_View.aspx",ChildPagesLoadedNotification);
  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// ChildPagesLoadedNotification
//
// １．機能
//      読み込み完了時の処理//
// ２．戻り値
//      なし//
// ３．備考//*****************************************************************************
function ChildPagesLoadedNotification(){
  try{
    // BODYのフォントを指定    document.body.style.fontFamily                   = top.FUNCTION_FRAME.FontFamily;

    // 文字列設定    document.getElementById("divOK").innerText       = top.FUNCTION_FRAME.Public_GetString(KeyOK, DefaultOK);
    document.getElementById("divRefresh").innerText  = top.FUNCTION_FRAME.Public_GetString(KeyRefresh, DefaultRefresh);

    // プリンタ画面を表示
    document.getElementById("PRINTER_VIEW").style.visibility = "visible";
    
    // プリンタ装置状態情報取得    Public_GetPrinterStatus();

  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_EndGetStatus
//
// １．機能
//       装置状態情報取得後の処理//
// ２．戻り値
//      なし//
// ３．備考//*****************************************************************************
function Public_EndGetStatus(){
  try{
    PRINTER_VIEW.Public_EndGetStatus();

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
//      なし//
// ３．備考//*****************************************************************************
function Fn_Refresh(){
  try{
    // 操作ログ書込み
    Public_WriteLog("Refresh");
    
    // 画面リフレッシュ
    Public_GetPrinterStatus();

  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_GetPrinterStatus
//
// １．機能
//     プリンタ装置状態情報を取得する
//
// ２．戻り値
//      なし//
// ３．備考//*****************************************************************************
function Public_GetPrinterStatus(){
  try{
    // プリンタ装置状態ステータス取得用のURL作成
    var ProcURL = "";
    ProcURL =  "./Printer_Get_Proc.aspx";
    ProcURL += "?LoginId="   + top.FUNCTION_FRAME.LoginUserId;
    ProcURL += "&LoginTime=" + top.FUNCTION_FRAME.LoginTime;

    // 連打を禁止する 2008/07/30 神立
    parent.Public_ShowTransparentDialog();
    // プリンタ装置状態ステータス取得用ASPX読み込み
    PRINTER_GET_PROC.location.replace(ProcURL);

  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_WriteLog
//
// １．機能 
//      操作ログを出力する// ２．戻り値
//　　  特になし// ３．備考//       引数      ctrlCommand    操作名
//*****************************************************************************
function Public_WriteLog(ctrlCommand){
  try{
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

//*****************************************************************************
// Fn_HideDrop
//
// １．機能
//     ・コンボボックスを非表示にする
//
// ２．戻り値
//      なし//
// ３．備考//*****************************************************************************
function Fn_HideDrop() {
  try{
    // 右クリックの場合は操作を無効にする
    if(event.type == "mouseup" && event.button == 2){
      return;
    }

    // コンボボックスを非表示にする
    document.getElementById("ComboBoxFrame").style.visibility = "hidden";
    document.getElementById("ComboBox").style.visibility = "hidden";

  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_ComboBoxSet
//
// １．機能
//     ・カーソルが当たっている行の色を変える//
// ２．戻り値
//      なし//
// ３．備考//       引数      obj    カーソルが当たっている行//*****************************************************************************
function Fn_ComboBoxSet(obj){
  try{
    // コンボボックスの背景を初期値に設定する
    if(strDeviceName.length > 1){
      for(i=0; i<strDeviceName.length; i++){
// 20050604 YSK)Kanno UPDATE プルダウン項目が１件のとき、初期表示で項目が選択されない不具合対応(PVCS#721) START
        // コンボボックスの背景を白に設定する//        tdOption[i].bgColor = "";
		document.getElementById("tdOption" + i).bgColor = "";
// 20050604 YSK)Kanno UPDATE プルダウン項目が１件のとき、初期表示で項目が選択されない不具合対応 END
      }
    }
    // カーソルが当たっている行の色を変える
    obj.bgColor=PRINTER_VIEW.g_Color;

  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_Select
//
// １．機能
//     選択されたプリンタの装置状態を表示
//
// ２．戻り値
//      なし//
// ３．備考//*****************************************************************************
function Fn_Select(Index){
  try{
    Fn_HideDrop();
    PRINTER_VIEW.Public_Select(Index);

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
//      なし//
// ３．備考//       引数    errorFileName ファイル名
//               errorSpot     スポットコード
//               errorTitle1   Title1
//               errorTitle2   Title2
//               errorMessage  確認ダイアログのメッセージ
//               buttonString  ボタンのテキスト//               ProcCode      ダイアログを閉じた後の処理//*****************************************************************************
function Public_ShowWarningDialog(errorFileName, errorSpot, errorTitle1, errorTitle2, errorMessage, buttonString, ProcCode){
  try{
    // 初期表示時は表示用フレームを表示する
    if(parent.document.getElementById("VIEW_FRAME").style.visibility == "hidden"){
      parent.document.getElementById("VIEW_FRAME").style.visibility = "visible";
    }

    // 警告ダイアログを表示
    parent.Public_ShowWarningDialog(errorFileName, errorSpot, errorTitle1, errorTitle2, errorMessage, buttonString, ProcCode);

  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}
