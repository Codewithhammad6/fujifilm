//*****************************************************************************
//  Event_Ctrl.js 
//
//     Event_Ctrlのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2004/11/12  菅野      -----        新規作成
//     2006/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
//     2007/06/09  HSK由比     V2.0       PVCS#2313
//     2008/07/16  S1神立      V4.0       クライアント5台(連打禁止)
//     2009/05/29  FF蔵敷　　　 V6.0      インジケータ　エラー操作性改善　V60_NAS
//     2009/07/27  FF星野      V6.0       インジケーター切り離し対応
//     2010/04/05  FF星野    V2.0(B)      インジケーター全削除対応
//*****************************************************************************

  var g_intResultRowCount  = 0;          // 取得件数
  var g_intMaxPage;                      // 最大ページ数
  var g_intCurrentPage     = 1;          // 表示ページ番号
  var g_intKindFilter      = 0;          // 種別フィルター
  var g_intStatusFilter    = 2;          // ステータスフィルター
  
  //---- イベント情報 ----//
  var g_strEventSeq    = new Array();    // シーケンス番号
  var g_strErrCode     = new Array();    // エラーコード

  var g_strIncDateTime = new Array();    // 発生日時

  var g_strErrKind     = new Array();    // エラー種別
  var g_strErrLevel    = new Array();    // エラーレベル
  var g_strErrInfo     = new Array();    // エラー情報
  var g_strErrDetail   = new Array();    // 詳細情報
  var g_strErrStatus   = new Array();    // ステータス

  var PROC_MODE = "Event";               // 画面名


//*****************************************************************************
// Fn_InitPage
//
// １．機能
//     ・イベント情報画面を読み込む
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_InitPage(){
  try{
	LoadPage("EVENT_VIEW","Event_View.aspx",ChildPagesLoadedNotification);
  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// ChildPagesLoadedNotification
//
// １．機能
//     ・全フレーム読み込み終了時の処理

//     ・画面に表示する文字列の設定を行う
//     ・イベント情報取得メソッドを呼ぶ
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

// 20070609 HSK由比 V2.0 PVCS#2313 A Start //
    // コントロールにフォントサイズを設定
    // 種類ラベル
    document.getElementById("divErrorLevel").style.fontSize       = top.FUNCTION_FRAME.FontSizeS;
    // 種類テキスト
    document.getElementById("divErrorLevelTxt").style.fontSize    = top.FUNCTION_FRAME.FontSizeS;
    // コードラベル
    document.getElementById("divErrorCode").style.fontSize        = top.FUNCTION_FRAME.FontSizeS;
    // コードテキスト
    document.getElementById("divErrorCodeTxt").style.fontSize     = top.FUNCTION_FRAME.FontSizeS;
    // 発生日時ラベル
    document.getElementById("divDateTime").style.fontSize         = top.FUNCTION_FRAME.FontSizeS;
    // 発生日時テキスト
    document.getElementById("divDateTimeTxt").style.fontSize      = top.FUNCTION_FRAME.FontSizeS;
    // 発生元ラベル
    document.getElementById("divKind").style.fontSize             = top.FUNCTION_FRAME.FontSizeS;
    // 発生元テキスト
    document.getElementById("divKindTxt").style.fontSize          = top.FUNCTION_FRAME.FontSizeS;
    // 内容ラベル
    document.getElementById("divErrorInformation").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
    // 内容テキスト
    document.getElementById("divErrorInfoTxt").style.fontSize     = top.FUNCTION_FRAME.FontSizeS;
    // 詳細情報ラベル
    document.getElementById("divErrorDetail").style.fontSize      = top.FUNCTION_FRAME.FontSizeS;
    // 詳細情報テキスト
    document.getElementById("divErrorDetailTxt").style.fontSize   = top.FUNCTION_FRAME.FontSizeS;
    // 閉じるボタン
    document.getElementById("divClose").style.fontSize            = top.FUNCTION_FRAME.FontSizeS;
// 20070609 HSK由比 V2.0 PVCS#2313 A End //

    // 文字列設定

    document.getElementById("divOK").innerText               = parent.Public_GetString(KeyOK, DefaultOK);
    document.getElementById("divRefresh").innerText          = parent.Public_GetString(KeyRefresh, DefaultRefresh);
    document.getElementById("divErrorLevel").innerText       = parent.Public_GetString(KeyErrorLevel, DefaultErrorLevel);
    document.getElementById("divErrorCode").innerText        = parent.Public_GetString(KeyErrorCode, DefaultErrorCode);
    document.getElementById("divDateTime").innerText         = parent.Public_GetString(KeyIncDateTime, DefaultIncDateTime);
    document.getElementById("divKind").innerText             = parent.Public_GetString(KeyKind, DefaultKind);
    document.getElementById("divErrorInformation").innerText = parent.Public_GetString(KeyErrorInfo, DefaultErrorInfo);
    document.getElementById("divErrorDetail").innerText      = parent.Public_GetString(KeyDetailInfo, DefaultDetailInfo);
    document.getElementById("divClose").innerText            = parent.Public_GetString(KeyClose, DefaultClose);

    //---- コンボボックスの位置設定 ----//
    // 種別コンボボックス
    document.getElementById("tblKindComboBox").style.width = EVENT_VIEW.g_KindComboBoxWidth;
    document.getElementById("tblKindComboBox").style.top   = EVENT_VIEW.g_KindComboBoxTop + 41;
    document.getElementById("tblKindComboBox").style.left  = EVENT_VIEW.g_KindComboBoxLeft;
    document.getElementById("tdKindOption").style.width    = EVENT_VIEW.g_KindComboBoxWidth-4;
    // ステータスコンボボックス
    document.getElementById("tblStatusComboBox").style.width = EVENT_VIEW.g_StatusComboBoxWidth;
    document.getElementById("tblStatusComboBox").style.top   = EVENT_VIEW.g_StatusComboBoxTop + 41;
    document.getElementById("tblStatusComboBox").style.left  = EVENT_VIEW.g_StatusComboBoxLeft;
    document.getElementById("tdStatusOption").style.width    = EVENT_VIEW.g_StatusComboBoxWidth-4;

    // イベント情報取得

    Public_GetEvent();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_GetEvent
//
// １．機能
//     ・イベント情報取得メソッドを呼ぶ
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Public_GetEvent(){
  try{
    if(g_intCurrentPage < 1){
      g_intCurrentPage = 1;
    }

    // イベント情報取得用のURL作成
    var ProcURL = "";
    ProcURL =  "./Event_Get_Proc.aspx";
    ProcURL += "?LoginId=" + top.FUNCTION_FRAME.LoginUserId;
    ProcURL += "&LoginTime=" + top.FUNCTION_FRAME.LoginTime;
    ProcURL += "&EvtListMax=" + top.FUNCTION_FRAME.EvtListMax;
    ProcURL += "&Page=" + g_intCurrentPage;
    ProcURL += "&KindFilter=" + g_intKindFilter;
    ProcURL += "&StatusFilter=" + g_intStatusFilter;

    // 連打を禁止する 2008/07/16 神立
    parent.Public_ShowTransparentDialog();
    // イベント情報取得用ASPX読み込み
    EVENT_GET_PROC.location.replace(ProcURL);

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_EndGetEvent
//
// １．機能
//     ・イベント情報取得後の処理

//     ・イベント情報表示メソッドを呼ぶ
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_EndGetEvent(){
  try{
    EVENT_VIEW.Public_EndGetEvent();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_Refresh
//
// １．機能
//     ・画面のリフレッシュ
//
// ２．戻り値
//      なし
//
//
// ３．備考
// 4.  引数
//      0   更新後、1pageに戻る
//      1   更新後、現在のページのまま。
//*****************************************************************************
function Fn_Refresh(){
  try{
    // 操作ログ書込み
    Public_WriteLog("Refresh");
    //V60_NAS
    //g_intCurrentPage = 1;

    // イベント情報取得

    EVENT_VIEW.Public_GetEvent();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_CloseDialog
//
// １．機能
//     ・エラー詳細ダイアログを閉じる
//
// ２．戻り値
//      なし


//
// ３．備考


//*****************************************************************************
function Fn_CloseDialog(){
  try{
    // エラー詳細ダイアログを閉じる
    document.getElementById("tblDetailDispFrame").style.visibility = "hidden";

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_OpenDialog
//
// １．機能
//     ・エラー詳細ダイアログを表示する
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_OpenDialog(Index){
  try{
    // 画面にエラー情報を設定

    document.getElementById("divErrorLevelTxt").innerHTML  = g_strErrLevel[Index];
    document.getElementById("divErrorCodeTxt").innerHTML   = g_strErrCode[Index];
    document.getElementById("divDateTimeTxt").innerHTML    = g_strIncDateTime[Index];
    document.getElementById("divKindTxt").innerHTML        = g_strErrKind[Index];
    document.getElementById("divErrorInfoTxt").innerHTML   = g_strErrInfo[Index];
    document.getElementById("divErrorDetailTxt").innerHTML = g_strErrDetail[Index];

    // エラー詳細ダイアログを表示
    document.getElementById("tblDetailDispFrame").style.visibility = "visible";

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_ShowDeleteConfirm
//
// １．機能
//     ・確認ダイアログを表示する
//
// ２．戻り値
//      なし

//
// ３．備考

//       引数    strMessage    メッセージ文字列
//               strButton1    ボタン1の文字列
//               strButton2    ボタン2の文字列
//*****************************************************************************
function Public_ShowDeleteConfirm(strMessage, strButton1, strButton2){
  try{
    // 削除確認ダイアログを表示
    parent.Public_ShowConfirmDialog(strMessage, strButton1, strButton2, 2);

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//2010.04.05 FF 星野 インジケーター全削除対応 ADD-START
//*****************************************************************************
// Public_ShowAllDeleteConfirm
//
// １．機能
//     ・確認ダイアログを表示する
//
// ２．戻り値
//      なし

//
// ３．備考

//       引数    strMessage    メッセージ文字列
//               strButton1    ボタン1の文字列
//               strButton2    ボタン2の文字列
//*****************************************************************************
function Public_ShowAllDeleteConfirm(strMessage, strButton1, strButton2){
  try{
    // 削除確認ダイアログを表示
    parent.Public_ShowConfirmDialog(strMessage, strButton1, strButton2, 4);

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}
//2010.04.05 FF 星野 インジケーター全削除対応 ADD-END

//*****************************************************************************
// Public_DeleteEvent
//
// １．機能
//     ・削除確認ダイアログを閉じた後の処理

//
// ２．戻り値
//      なし

//
// ３．備考

//    引数    ProcFlag     0:｢いいえ｣ボタン押下/1:｢はい｣ボタン押下

//*****************************************************************************
function Public_DeleteEvent(ProcFlag){
  try{
    if(ProcFlag){
      // 操作ログ書込み
      Public_WriteLog("DeleteOK");
      EVENT_VIEW.Public_ControlEvent(2);
    }else{
      // 操作ログ書込み
      Public_WriteLog("DeleteCancel");
    }

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//2010.04.05 FF 星野 インジケーター全削除対応 ADD-START
//*****************************************************************************
// Public_AllDeleteEvent
//
// １．機能
//     ・削除確認ダイアログを閉じた後の処理

//
// ２．戻り値
//      なし

//
// ３．備考

//    引数    ProcFlag     0:｢いいえ｣ボタン押下/1:｢はい｣ボタン押下

//*****************************************************************************
function Public_AllDeleteEvent(ProcFlag){
  try{
    if(ProcFlag){
      // 操作ログ書込み
      Public_WriteLog("AllDeleteOK");
      EVENT_VIEW.Public_ControlEvent(4);
    }else{
      // 操作ログ書込み
      Public_WriteLog("AllDeleteCancel");
    }

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}
//2010.04.05 FF 星野 インジケーター全削除対応 ADD-END

//*****************************************************************************
// Public_ControlEvent
//
// １．機能
//     ・イベント情報操作メソッドを呼ぶ
//
// ２．戻り値
//      なし

//
// ３．備考

//       引数    EventSeq        シーケンス番号
//               intErrStatus    エラーステータス
//*****************************************************************************
function Public_ControlEvent(EventSeq, intErrStatus){
  try{
    // イベント情報取得用のURL作成
    var ProcURL = "";
    //2009.07.27 FF 星野 インジケーター切り離し対応 ADD-START
    var AllConfirm = 0;
    
    if(intErrStatus == 3)
    {
       AllConfirm = 1;
       intErrStatus = 1;
    }
       //2010.04.05 FF 星野 インジケーター全削除対応 ADD-START
    else if(intErrStatus == 4)
    {
       AllConfirm = 1;
       intErrStatus = 2;
    }
    //2010.04.05 FF 星野 インジケーター全削除対応 ADD-START
     
    //2009.07.27 FF 星野 インジケーター切り離し対応 ADD-END
    ProcURL =  "./Event_Control_Proc.aspx";
    ProcURL += "?LoginId="    + top.FUNCTION_FRAME.LoginUserId;
    ProcURL += "&LoginTime="  + top.FUNCTION_FRAME.LoginTime;
    ProcURL += "&EventSeq="   + EventSeq;
    ProcURL += "&ErrStatus="  + intErrStatus;
    ProcURL += "&AllConfirm=" + AllConfirm;//2009.07.27 FF 星野 インジケーター切り離し対応 ADD

    // 連打を禁止する 2008/07/16 神立
    parent.Public_ShowTransparentDialog();
    // イベント情報取得用ASPX読み込み
    EVENT_CONTROL_PROC.location.replace(ProcURL);

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_EndControlEvent
//
// １．機能
//     ・イベント情報操作後の処理

//     ・画面をリフレッシュする
//
// ２．戻り値
//      なし

//
// ３．備考

//       引数    retCode    イベント情報操作の戻り値
//                          0 : 正常終了

//                          3 : 確認済み
//                          4 : 削除済み
//                          -1 : DBアクセスエラー
//                          上記以外 : その他のエラー
//*****************************************************************************
function Public_EndControlEvent(){
  try{
    Fn_Refresh();

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
    document.getElementById("ComboBoxFrame").style.visibility     = "hidden";
    document.getElementById("tblKindComboBox").style.visibility   = "hidden";
    document.getElementById("tblStatusComboBox").style.visibility = "hidden";

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

//       引数      obj        カーソルが当たっている行

//                 ComboNo    コンボボックスの番号
//                            0 : 種別
//                            1 : ステータス
//*****************************************************************************
function Fn_ComboBoxSet(obj, ComboNo){
  try{
    switch(ComboNo){
      // 種別コンボボックス
      case 0:
        for(i = 0; i < EVENT_VIEW.arrayKindDisplay.length; i++){
          tdKindOption[i].bgColor = "";
        }
        obj.bgColor=EVENT_VIEW.g_Color;
        break;

      // ステータスコンボボックス
      case 1:
        for(i = 0; i < EVENT_VIEW.arrayStatusDisplay.length; i++){
          tdStatusOption[i].bgColor = "";
        }
        obj.bgColor=EVENT_VIEW.g_Color;
        break;
    }

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_Select
//
// １．機能
//     ・コンボボックスからメニューを選択する

//
// ２．戻り値
//      なし

//
// ３．備考

//     引数    obj        選択された行

//             index      選択された行番号
//             ComboNo    コンボボックス番号
//*****************************************************************************
function Fn_Select(obj,index,ComboNo){
  try{
    // 右クリックの場合は操作を無効にする
    if(event.type == "mouseup" && event.button == 2){
      return;
    }

    // コンボボックスを閉じる
    Fn_HideDrop();
    EVENT_VIEW.Public_Select(obj,index,ComboNo);

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}
