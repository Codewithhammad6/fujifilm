//*****************************************************************************
//  Queue_Ctrl.js 
//
//     Queue_Ctrlのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2004/12/03  菅野      -----        新規作成
//     2006/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
//     2007/03/16  HSK平尾     V2.0       内視鏡画像取込対応
//     2008/07/16  S1 神立     V4.0       クライアント5台対応
//
//*****************************************************************************

  var g_intResultRowCount = 0;    // 取得件数
  var g_intMaxPage;               // 最大ページ
  var g_intCurrentPage    = 1;    // 表示ページ
  var g_intFilter         = 0;    // フィルター

  //---- 出力キュー情報 ----//
  var g_strOutputID       = new Array();    // OutputID
  var g_strPatientID      = new Array();    // 患者ID
  var g_strPatientName    = new Array();    // 患者名
  var g_strStudyDateTime  = new Array();    // 検査日時

  var g_strAliasName      = new Array();    // エイリアス名
  // 20070316 HSK平尾 V2.0 内視鏡対応 A Start
  var g_strModality       = new Array();    // モダリティ
  // 20070316 HSK平尾 V2.0 内視鏡対応 A End

  var g_strStatus         = new Array();    // ステータス
  var g_strKind           = new Array();    // 種別

  var QueueStatus         = new Array();    // ステータスの配列
  var strQueueStatus      = new Array();    // ステータス文字列の配列

  var PROC_MODE           = "Output";       // 画面名



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
	LoadPage("QUEUE_VIEW","Queue_View.aspx",ChildPagesLoadedNotification);
  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// ChildPagesLoadedNotification
//
// １．機能
//     ・出力キュー情報を取得する

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function ChildPagesLoadedNotification(){
  try{
    // BODYのフォントを指定

    document.body.style.fontFamily                   = top.FUNCTION_FRAME.FontFamily;

    // コンボボックスの位置設定

    document.getElementById("ComboBox").style.width  = QUEUE_VIEW.g_ComboBoxWidth;
    document.getElementById("ComboBox").style.top    = QUEUE_VIEW.g_ComboBoxTop + 41;
    document.getElementById("ComboBox").style.left   = QUEUE_VIEW.g_ComboBoxLeft;
    document.getElementById("divOption").style.width = QUEUE_VIEW.g_ComboBoxWidth-4;

    // 文字列設定

    document.getElementById("divOK").innerText       = parent.Public_GetString(KeyOK, DefaultOK);
    document.getElementById("divRefresh").innerText  = parent.Public_GetString(KeyRefresh, DefaultRefresh);

    // リフレッシュボタン表示/非表示切替
    if(!top.FUNCTION_FRAME.QueRefreshInt){
      document.getElementById("divRefresh").style.visibility = "visible";
      document.getElementById("imgRefresh").style.visibility = "visible";
      // 2005/07/13 002 H.SAITO 更新ボタンの背景を修正
      document.getElementById("imgRefreshBtnBack").style.visibility = "visible";
    }

    // 出力キューリスト表示
    document.getElementById("QUEUE_VIEW").style.visibility = "visible";

    //---- 出力キューステータス配列、出力キューステータス文字列配列の設定 ----//
    //---- 優先度が高いほうから設定する ----//
    // 処理完了中
    QueueStatus[0]     = 0X100000;
    strQueueStatus[0]  = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus20, parent.DefaultOutputStatus20);
    // 他筐体画像取得エラー
    QueueStatus[1]     = 0X200000;
    strQueueStatus[1]  = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus21, parent.DefaultOutputStatus21);
    // フィルムサイズエラー
    QueueStatus[2]     = 0X80000;
    strQueueStatus[2]  = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus19, parent.DefaultOutputStatus19);
    // 出力不可
    QueueStatus[3]     = 0X2000;
    strQueueStatus[3]  = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus14, parent.DefaultOutputStatus14);
    // 利用可能Dicomフィルム無し

    QueueStatus[4]     = 0X800;
    strQueueStatus[4]  = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus12, parent.DefaultOutputStatus12);
    // 画像処理エラー
    QueueStatus[5]     = 0X8;
    strQueueStatus[5]  = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus4, parent.DefaultOutputStatus4);
    // 出力エラー
    QueueStatus[6]     = 0X40;
    strQueueStatus[6]  = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus7, parent.DefaultOutputStatus7);
    // 利用可能ローカルフィルム無し

    QueueStatus[7]     = 0X200;
    strQueueStatus[7]  = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus10, parent.DefaultOutputStatus10);
    // 出力オプション無し

    QueueStatus[8]     = 0X400;
    strQueueStatus[8]  = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus11, parent.DefaultOutputStatus11);
    // エラー復旧中
    QueueStatus[9]     = 0X1000;
    strQueueStatus[9]  = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus13, parent.DefaultOutputStatus13);
    // スプール中
    QueueStatus[10]    = 0X1;
    strQueueStatus[10] = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus1, parent.DefaultOutputStatus1);
    // 画像処理待ち
    QueueStatus[11]    = 0X2;
    strQueueStatus[11] = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus2, parent.DefaultOutputStatus2);
    // 画像処理中
    QueueStatus[12]    = 0X4;
    strQueueStatus[12] = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus3, parent.DefaultOutputStatus3);
    // 出力中
    QueueStatus[13]    = 0X20;
    strQueueStatus[13] = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus6, parent.DefaultOutputStatus6);
    // 出力待ち
    QueueStatus[14]    = 0X10;
    strQueueStatus[14] = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus5, parent.DefaultOutputStatus5);
    // 削除済み
    QueueStatus[15]    = 0X100;
    strQueueStatus[15] = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus9, parent.DefaultOutputStatus9);
    // 出力済み
    QueueStatus[16]    = 0X80;
    strQueueStatus[16] = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus8, parent.DefaultOutputStatus8);
    // 出力一時停止
    QueueStatus[17]    = 0X4000;
    strQueueStatus[17] = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus15, parent.DefaultOutputStatus15);
    // コミットメント出力エラー
    QueueStatus[18]    = 0X20000;
    strQueueStatus[18] = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus18, parent.DefaultOutputStatus18);
    // コミットメント完了待ち
    QueueStatus[19]    = 0X10000;
    strQueueStatus[19] = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus17, parent.DefaultOutputStatus17);
    // コミットメント待ち
    QueueStatus[20]    = 0X8000;
    strQueueStatus[20] = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputStatus16, parent.DefaultOutputStatus16);

    // 出力キュー情報取得

    Public_GetQueue();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_GetQueue
//
// １．機能
//     ・出力キュー情報を取得する
// ２．戻り値
//      なし
// ３．備考
//*****************************************************************************
function Public_GetQueue(){
  try{
    // 現在表示ページ数が1より小さい場合は現在表示ページを1に設定する
    if(g_intCurrentPage < 1){
      g_intCurrentPage = 1;
    }

    // 出力キュー情報取得用のURL作成
    var ProcURL = "";
    ProcURL =  "./Queue_Get_Proc.aspx";
    ProcURL += "?LoginId="    + top.FUNCTION_FRAME.LoginUserId;
    ProcURL += "&LoginTime="  + top.FUNCTION_FRAME.LoginTime;
    ProcURL += "&QueListMax=" + top.FUNCTION_FRAME.QueListMax;
    ProcURL += "&MultiByte="  + top.FUNCTION_FRAME.MultiByte;
    ProcURL += "&Page="       + g_intCurrentPage;
    ProcURL += "&Filter="     + g_intFilter;

    // 連打を禁止する 2008/07/16 神立
    parent.Public_ShowTransparentDialog();

    // 出力キュー情報取得用ASPX読み込み
    QUEUE_GET_PROC.location.replace(ProcURL);

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_EndGetQueue
//
// １．機能
//     ・出力キュー情報取得後の処理

//
// ２．戻り値
//      なし

//
// ３．備考

//       引数    retCode    出力キュー情報取得の戻り値
//                          0 : 正常終了

//                          -1 : DBアクセスエラー
//                          上記以外 : その他のエラー
//*****************************************************************************
function Public_EndGetQueue(){
  try{
    QUEUE_VIEW.Public_EndGetQueue();

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
// ３．備考

//*****************************************************************************
function Fn_Refresh(){
  try{
    // 操作ログ書込み
    Public_WriteLog("Refresh");

    // 1ページ目を取得する


    g_intCurrentPage = 1;

    // イベント情報取得

    QUEUE_VIEW.Public_GetQueue();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_ControlQueue
//
// １．機能
//     ・出力キュー情報操作メソッドを呼ぶ
//
// ２．戻り値
//      なし

//
// ３．備考

//    引数    intQueueSeq  : 出力キューシーケンス番号
//            intCommand   : 操作種別(0:削除,1:強制出力)
//*****************************************************************************
function Public_ControlQueue(intQueueSeq, intCommand){
  try{
    // 出力キュー操作用のURL作成
    var ProcURL = "";
    ProcURL =  "./Queue_Control_Proc.aspx";
    ProcURL += "?LoginId="    + top.FUNCTION_FRAME.LoginUserId;
    ProcURL += "&LoginTime="  + top.FUNCTION_FRAME.LoginTime;
    ProcURL += "&QueueSeq="   + intQueueSeq;
    ProcURL += "&Command="    + intCommand;
    ProcURL += "&Kind="       + "0";

    // 連打を禁止する 2008/07/16 神立
    parent.Public_ShowTransparentDialog();

    // 出力キュー操作用ASPX読み込み
    QUEUE_CONTROL_PROC.location.replace(ProcURL);

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_EndControlQueue
//
// １．機能
//     ・出力キュー情報操作終了

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_EndControlQueue(){
}

//*****************************************************************************
// Public_ShowConfirmDialog
//
// １．機能
//     ・確認ダイアログを表示する
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
    // 確認ダイアログを表示
    parent.Public_ShowConfirmDialog(strMessage, strButton1, strButton2, ProcCode);

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_DeleteQueue
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
function Public_DeleteQueue(ProcFlag){
  try{
    // 出力キューリスト更新タイマ起動

    QUEUE_VIEW.Public_SetTimer();

    if(ProcFlag){
      // 操作ログ登録
      Public_WriteLog("DeleteOK");
      // 出力キューの削除を行う
      QUEUE_VIEW.Public_ControlQueue(0);
    }else{
      // 操作ログ登録
      Public_WriteLog("DeleteCancel");
    }

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_ShowWarningMessage
//
// １．機能
//     ・警告ダイアログを表示する(クライアント用)
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
//     ・警告ダイアログを表示する(サーバ用)
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
    if(parent.document.getElementById("VIEW_FRAME").style.visibility == "hidden"){
      parent.document.getElementById("VIEW_FRAME").style.visibility = "visible";
    }

    // 警告ダイアログを表示
    parent.Public_ShowWarningDialog(errorFileName,
                                    errorSpot,
                                    errorTitle1,
                                    errorTitle2,
                                    errorMessage,
                                    buttonString,
                                    ProcCode);

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

//
// ２．戻り値
//　　  特になし

//
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
    // コンボボックスの背景色を設定する


    for(i=0; i<QUEUE_VIEW.arrayDisplay.length; i++){
      option1[i].bgColor = "";
    }
    obj.bgColor=QUEUE_VIEW.g_Color;

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

//     引数    obj     選択された行

//             index  選択された行番号
//*****************************************************************************
function Fn_Select(obj,index){
  try{
    // コンボボックスを非表示にする
    Fn_HideDrop();
    // 項目選択時の処理


    QUEUE_VIEW.Public_Select(obj,index);

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}
