//*****************************************************************************
//  Media_Ctrl.js 
//
//     Media_Ctrlのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2004/12/16  菅野      -----        新規作成
//     2006/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
//     2008/07/16  S1 神立     V2.0       クライアント5台対応(連打禁止)
//     2009/05/29  FF 蔵敷　　 V6.0       NAS対応 V60_NAS
//*****************************************************************************

  var g_intResultRowCount = 0;    // 取得件数
  var g_intMaxPage        = 0;    // 最大ページ
  var g_intCurrentPage    = 0;    // 表示ページ
  var intMaxCount         = 0;    // 取得件数
// 2005/09/12 Kanno UPDATE ST PVCS#799
//  var g_strIpAddress      = "";   // IPアドレス
  var g_strHostName       = "";   // ホスト名
// 2005/09/12 Kanno UPDATE ED PVCS#799
  var g_intWritingHDDIndex = 0;      // V60_NAS

  //---- メディア装置状態 ----//
  var g_intDeviceID   = new Array();   // 装置ID
  var g_strDeviceName = new Array();   // 装置名

  var g_intDeviceType = new Array();   //装置タイプ　　　//V60_NAS
  var g_strLabelName  = new Array();   // ラベル名

  var g_strFreeRate   = new Array();   // 空き容量

  var g_strMediaKind  = new Array();   // メディア種別
  var g_strWritable   = new Array();   // 書込み設定

  var g_strDeviceAttr = new Array();   // 装置属性

  //---- 保管用ディスク一覧 ----//
  var g_strDiskName      = new Array();   // ディスク名

  var g_strOpenDateTime  = new Array();   // 書込み開始日時

  var g_strCloseDateTime = new Array();   // 書込み終了日時

  var g_strMediaAttr     = new Array();   // メディア属性

  var PROC_MODE           = "Media";      // 画面名

  var intMediaDisplayFlag = 0;            // メディア表示画面フラグ

//*****************************************************************************
// Fn_InitPage
//
// １．機能
//     ・読み込むページを設定する

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
	loader.AddLoadPage("MEDIASTATUS_VIEW","MediaStatus_View.aspx");
	loader.AddLoadPage("MEDIALIST_VIEW","MediaList_View.aspx");
	//コールバック設定

	loader.SetAllPageLoadedNotification(ChildPagesLoadedNotification);
	//ロード開始

	loader.Start();
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

    document.body.style.fontFamily                      = top.FUNCTION_FRAME.FontFamily;

    // 文字列設定

    document.getElementById("divRefresh").innerText     = parent.Public_GetString(KeyRefresh, DefaultRefresh);
    document.getElementById("divOK").innerText          = parent.Public_GetString(KeyOK, DefaultOK);
    document.getElementById("divMediaStatus").innerText = parent.Public_GetString(KeyDVDStatus, DefaultDVDStatus);
    document.getElementById("divMediaList").innerText   = parent.Public_GetString(KeyDVDList, DefaultDVDList);

    // クッキーの値取得

    myCookie = "Media_Display=";
    myValue = null;
    myStr = document.cookie + ";" ;
    myOfst = myStr.indexOf(myCookie);
    if (myOfst != -1){
      myStart = myOfst + myCookie.length;
      myEnd   = myStr.indexOf(";" , myStart);
      Index = unescape(myStr.substring(myStart,myEnd));
    // クッキーに値がない場合


    }else{
      document.cookie = "Media_Display = 1;0";
      Index = "1";
    }

    // 初期表示画面設定

    ChangeDisplay(eval(Index));
    
    // メディア装置状態情報取得

    Public_GetMediaStatus();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// ChangeDisplay
//
// １．機能
//     ・画面に表示する文字列の設定を行う
//     ・初期表示するユーティリティ画面の設定を行う
//
// ２．戻り値
//      なし

//
// ３．備考

//     引数 intDisplayNumber  1:メディアステータス画面
//                            2:保管用ディスク一覧画面
//*****************************************************************************
function ChangeDisplay(intDisplayNumber){
  try{
    switch(intDisplayNumber){

      // メディアステータス画面
      case 1:
        document.getElementById("imgMediaStatus").src = "../Bmp/cmSquare3BtnD.gif";
        document.getElementById("imgMediaList").src   = "../Bmp/cmSquare3BtnU.gif";
        document.getElementById("MEDIASTATUS_VIEW").style.visibility = "visible";
        document.getElementById("MEDIALIST_VIEW").style.visibility   = "hidden";
        break;

      // 保管用ディスク一覧画面
      case 2:
        document.getElementById("imgMediaList").src   = "../Bmp/cmSquare3BtnD.gif";
        document.getElementById("imgMediaStatus").src = "../Bmp/cmSquare3BtnU.gif";
        document.getElementById("MEDIALIST_VIEW").style.visibility   = "visible";
        document.getElementById("MEDIASTATUS_VIEW").style.visibility = "hidden";
        break;

      default:
        break;
    }
    intMediaDisplayFlag = intDisplayNumber;

    // クッキーに保存

    document.cookie = "Media_Display = " + intDisplayNumber + ";0";

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// MouseOutMediaButton
//
// １．機能
//     ・メディア表示ボタンのonmouseoutイベント

//
// ２．戻り値
//      なし

//
// ３．備考

//     引数   obj             処理対象のオブジェクト

//            intMediaButton  1:メディアステータス
//                            2:ディスク一覧画面
//*****************************************************************************
function MouseOutMediaButton(obj, intMediaButton){
  try{
    // 対象のボタンが選択中では無い場合


    if(intMediaButton != intMediaDisplayFlag){
      // ボタンを凸状態にする
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
//      ステータス取得後の処理

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_EndGetStatus(){
  try{
    MEDIASTATUS_VIEW.Public_EndGetStatus();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_GetMediaList
//
// １．機能
//      保管用ディスク一覧を取得する
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Public_GetMediaList(){
  try{
    if(g_intCurrentPage < 1){
      g_intCurrentPage = 1;
    }

    // 保管用ディスク一覧取得用のURL作成
    var ProcURL = "";
    ProcURL =  "./MediaList_Get_Proc.aspx";
    ProcURL += "?LoginId="      + top.FUNCTION_FRAME.LoginUserId;
    ProcURL += "&LoginTime="    + top.FUNCTION_FRAME.LoginTime;
    ProcURL += "&DiskListMax="  + top.FUNCTION_FRAME.MediaListMax;
    ProcURL += "&Page="         + g_intCurrentPage;

    // 連打を禁止する 2008/07/16 神立
    parent.Public_ShowTransparentDialog();
    
    // メディア装置状態ステータス取得用ASPX読み込み
    MEDIALIST_GET_PROC.location.replace(ProcURL);

  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_EndGetMediaList
//
// １．機能
//       保管用ディスク一覧取得後の処理

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_EndGetMediaList(){
  try{
    MEDIALIST_VIEW.Public_EndGetMediaList();

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

    // 1ページ目を取得する


    g_intCurrentPage = 1;

    // 画面リフレッシュ
    Public_GetMediaStatus();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_GetMediaStatus
//
// １．機能
//     メディア装置状態ステータスを取得する
//
// ２．戻り値
//      なし
//
// ３．備考

//*****************************************************************************
function Public_GetMediaStatus(){
  try{
    // メディア装置状態ステータス取得用のURL作成
    var ProcURL = "";
    ProcURL =  "./MediaStatus_Get_Proc.aspx";
    ProcURL += "?LoginId="    + top.FUNCTION_FRAME.LoginUserId;
    ProcURL += "&LoginTime="  + top.FUNCTION_FRAME.LoginTime;
    ProcURL += "&ProcCode=0";

    // 連打を禁止する 2008/07/16 神立
    parent.Public_ShowTransparentDialog();
    
    // メディア装置状態ステータス取得用ASPX読み込み
    MEDIASTATUS_GET_PROC.location.replace(ProcURL);

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_WriteLog
//
// １．機能 
//      操作ログを出力する

// ２．戻り値
//　　  特になし

// ３．備考

//       引数      ctrlCommand    操作名
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
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_HideDrop() {
  try{
    // 右クリックの場合は操作を無効にする
    if(event.type == "mouseup" && event.button == 2){
      return;
    }

    // コンボボックスを非表示にする
    document.getElementById("ComboBoxFrame").style.visibility = "hidden";
    document.getElementById("ComboBox").style.visibility      = "hidden";

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_ComboBoxSet
//
// １．機能
//     ・カーソルが当たっている行の色を変える

//
// ２．戻り値
//      なし

//
// ３．備考

//       引数      obj    カーソルが当たっている行

//*****************************************************************************
function Fn_ComboBoxSet(obj){
  try{
    // 情報が2件以上の場合
    if(g_strDeviceName.length > 1){
      // 取得件数分処理を行う
      for(i=0; i<g_strDeviceName.length; i++){
// 20050604 YSK)Kanno UPDATE プルダウン項目が１件のとき、初期表示で項目が選択されない不具合対応(PVCS#721) START
        // コンボボックスの背景を白に設定する
//        tdOption[i].bgColor = "";
		document.getElementById("tdOption" + i).bgColor = "";
// 20050604 YSK)Kanno UPDATE プルダウン項目が１件のとき、初期表示で項目が選択されない不具合対応 END
      }
    }
    // 選択された行を選択状態にする
    obj.bgColor=MEDIASTATUS_VIEW.g_Color;

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_Select
//
// １．機能
//     選択されたメディアの装置状態を表示
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_Select(Index){
  try{
    // コンボボックスを閉じる
    Fn_HideDrop();
    MEDIASTATUS_VIEW.Public_Select(Index);

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
    parent.Public_ShowWarningMessage(strMessage, strButton, ProcCode);

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

//*****************************************************************************
// Public_MediaControl
//
// １．機能
//     メディア操作

//
// ２．戻り値
//      なし

//
// ３．備考

//       引数      Control    0 : 入れ替え

//                            1 : 取り出し

//                            2 : クライアントユーティリティ
//*****************************************************************************
function Public_MediaControl(Control){
   try{
    // メディア操作


    MEDIASTATUS_VIEW.Fn_MediaControl(Control);

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_DiskChange
//
// １．機能
//     ディスク入れ替え操作
//
// ２．戻り値
//      なし
//
// ３．備考
//      ダイアログが出てきて連打できないので 透明フレームは表示しない 2008/07/22神立
//*****************************************************************************
function Public_DiskChange(){
  try{
    // ディスク入れ替え操作用のURL作成
    var ProcURL = "";
    ProcURL =  "./MediaStatus_Get_Proc.aspx";
    ProcURL += "?LoginId="    + top.FUNCTION_FRAME.LoginUserId;
    ProcURL += "&LoginTime="  + top.FUNCTION_FRAME.LoginTime;
    ProcURL += "&ProcCode=1";

    // ディスク入れ替えASPX読み込み
    MEDIASTATUS_GET_PROC.location.replace(ProcURL);
  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}
