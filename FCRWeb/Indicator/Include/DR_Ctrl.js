//*****************************************************************************
//  DR_Ctrl.js 
//
//     DR_Ctrlのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2014/03/11  TYK石井    3.0(B)      新規作成
//
//*****************************************************************************
  
  //-- 装置情報 --//
  var g_nRecordCount		= 0;
  var g_nNO					= new Array();// 装置No
  var g_strName				= new Array();// 装置名
  var g_strColor            = new Array();// カラー
  var g_nConnect			= new Array();// 接続状態
  var g_nShotReady			= new Array();// 撮影状態
  var g_nBatteryStatus		= new Array();// バッテリー状態
  var g_nBatteryTimeRemain	= new Array();// バッテリー残時間
  var g_nEmagencyMode		= new Array();// 緊急モード
  var g_nAutoCalib_Status	= new Array();// 自動測定状態
  var g_nOtherStatus1		= new Array();// エラー状態1
  var g_nOtherStatus2		= new Array();// エラー状態2
  var g_nOtherStatus3		= new Array();// エラー状態3
  var g_nOtherStatus4		= new Array();// エラー状態4
  var g_nOtherStatus5		= new Array();// エラー状態5
  var g_nOtherStatus6		= new Array();// エラー状態6
  var g_nOtherStatus7		= new Array();// エラー状態7
  var g_nOtherStatus8		= new Array();// エラー状態8
  var g_nOtherStatus9		= new Array();// エラー状態9
  var g_nOtherStatus10		= new Array();// エラー情報10
  var g_nEnable     		= new Array();// パネル設定有無

  var PROC_MODE         = "DR";  // 画面名

  var TimerID           = "";    // タイマID

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
  
	//ページローダ生成
	var loader = new PageLoader();
	//ページ情報追加
	loader.AddLoadPage("DRSTATUS_VIEW","DRStatus_View.aspx");
	//コールバック設定
	loader.SetAllPageLoadedNotification(ChildPagesLoadedDRStatus);
	
	//ロード開始
	loader.Start();

  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// ChildPagesLoadedDRStatus
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
function ChildPagesLoadedDRStatus(){
  try{
    // BODYのフォントを指定
    document.body.style.fontFamily = top.FUNCTION_FRAME.FontFamily;

    // 文字列設定
    document.getElementById("divRefresh").innerText   = top.FUNCTION_FRAME.Public_GetString(KeyRefresh, DefaultRefresh);
    document.getElementById("divOK").innerText        = top.FUNCTION_FRAME.Public_GetString(KeyOK, DefaultOK);
    
    // リフレッシュボタン表示/非表示切替
    //if(!top.FUNCTION_FRAME.QueRefreshInt){
      document.getElementById("divRefresh").style.visibility = "visible";
      document.getElementById("imgRefresh").style.visibility = "visible";
      document.getElementById("imgRefreshBtnBack").style.visibility = "visible";
    //}
    //else
    //{
    //  document.getElementById("divRefresh").style.visibility = "hidden";
    //  document.getElementById("imgRefresh").style.visibility = "hidden";
    //  document.getElementById("imgRefreshBtnBack").style.visibility = "hidden";
    //}
    
    // DR装置状態情報取得
    Public_GetDeviceInfo();

  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_EndGetStatus
//
// １．機能
//      撮影装置情報取得後の処理

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_EndGetDeviceInfo(){
  try{
    // 取得した情報を表示する
    DRSTATUS_VIEW.Public_EndGetDeviceInfo();

  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_GetDeviceInfo
//
// １．機能
//     撮影装置情報を取得
//
// ２．戻り値
//      なし
//
// ３．備考
//      引数   Command  処理種別
//*****************************************************************************
function Public_GetDeviceInfo(){
  try{
    
    // DR操作用のURL作成
    var ProcURL = "";
    ProcURL =  "./DRStatus_Get_Proc.aspx";
    ProcURL += "?LoginId="   + top.FUNCTION_FRAME.LoginUserId;
    ProcURL += "&LoginTime=" + top.FUNCTION_FRAME.LoginTime;

    // 連打を禁止する
    top.FUNCTION_FRAME.Public_ShowTransparentDialog();
    
    // 撮影装置状態ステータス取得用ASPX読み込み
    DRSTATUS_GET_PROC.location.replace(ProcURL);

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
    Public_GetDeviceInfo();

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
function Public_Refresh(){
  Fn_Refresh();
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
    DRSTATUS_VIEW.Public_EndGetNoStatus();

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
    // 初期表示時は表示用フレームを表示する
    if(top.FUNCTION_FRAME.document.getElementById("VIEW_FRAME").style.visibility == "hidden"){
      top.FUNCTION_FRAME.document.getElementById("VIEW_FRAME").style.visibility = "visible";
    }

    // 警告ダイアログを表示
    top.FUNCTION_FRAME.Public_ShowWarningDialog(errorFileName, errorSpot, errorTitle1, errorTitle2, errorMessage, buttonString, ProcCode);

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
