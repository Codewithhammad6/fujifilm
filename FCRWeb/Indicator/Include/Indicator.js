//*****************************************************************************
//  Indicator.js 
//
//     Indicatorのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2004/12/16  菅野      -----        新規作成
//     2006/04/18  YSK齋藤   V1.1(HotFix) タイマー制御不良対応(PVCS#1743)
//     2006/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
//     2006/11/21  YSK齋藤   V1.4         インジケータ開始・終了通知における機能レベルのフィルタを削除(PVCS#1770)
//     2006/11/28  YSK齋藤   V1.4         インジケータ開始・終了通知におけるハンドラの存在チェック(PVCS#1964,#1960,#1903)
//     2008/02/28  HSK由比   V3.2         RU非接続時のRUアイコンとタブ非表示対応
//     2008/07/16  S1 神立   V4.0         クライアント5台対応、ポーリングが止まらないようにする。
//     2009/05/29  FF 蔵敷　  V6.0         NAS対応 V60_NAS
//     2011/03/28  FF 星野　  V2.1(B)      CQ#810対応
//     2011/04/15  NDD小林   V2.1(B)      CQ#807対応 スクリプトエラー対応
//     2012/06/13  FF 小林   V2.3(B)      CQ#1381対応
//     2012/06/22  NDD北村   V2.3(B)      CQ#1355対応 自動ログオフ対応(ポーリング再開)
//     2012/07/20  NDD北村   V2.3(B)      CQ#1409対応 ポーリング開始/タイムアウト時にコマンドログに書き込まない
//     2014/03/11  TYK石井   V3.0(B)      DR装置画面対応
//*****************************************************************************

  var intRUStatus     = 0;              // RUアイコンステータス
  var intMediaStatus  = 0;              // メディアアイコンステータス
  var intPrtStatus    = 0;              // プリンタアイコンステータス
  var intOutputStatus = 0;              // 出力キューアイコンステータス
  var intEventStatus  = 0;              // イベント情報アイコンステータス
  var intHDDStatus = 0;				//HDDアイコンステータス　V60_NAS
  var ServerTime      = "";             // サーバ時間

  var g_CurrentView   = "";             // 呼び出し元画面
  var TimerID         = "";             // ポーリングタイマID
  var IndicatorUpdateInt;               // インジケータ更新間隔
  var DcmOptionKey;                     // DICOMオプションキー
  var PROC_MODE = "IndicatorIcon";      // 画面名

  var ConnectingRU;                     // RUと直接接続かどうか
  
  //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD Start
  var ConnectingDR;                     // DRと直接接続かどうか
  var intDRStatus     = 0;              // DRアイコンステータス
  var CurrentView;                      // カレント画面
  //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD End

  var ColorType = 0;                    // インジケータアイコンのカラータイプ
                                        // 1:画像参照 / 0:画像参照以外

  // 2005/07/22 010 H.SAITO Net断対応

  var intGetprocErrCount = 0;           // ポーリング連続失敗回数。Net断を検知するためのカウント。2008/07/16神立
//var TimerWatchID    = "";             // ポーリング監視タイマID →削除 2008/07/16神立
  var IndicatorWatchInt;                // Net断を検知するまでの時間
  var ErrorTitle1;                      // Net断エラータイトル1
  var ErrorTitle2;                      // Net断エラータイトル1
  var ErrorMessage;                     // Net断エラーメッセージ
  var ButtonString;                     // Net断エラーダイアログボタン
  var FATAL_ERROR     = "FATAL_ERROR";
  var FileName        = "Indicator.js";
  var SpotCode        = 0;
  // 2006/12/07 PVCS#1770 H.SAITO -ST-
  var VIEWSTATUS_MODAL= "MODAL";
  var ModalViewStatus = "";		// モーダル中かどうかのステータス
  // 2006/12/07 PVCS#1770 H.SAITO -ED-
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
function Fn_InitPage(Type){
  // カラータイプを設定



  ColorType = Type;
	LoadPage("INDICATOR_VIEW","Indicator_View.aspx",ChildPagesLoadedNotification);
}

//*****************************************************************************
// ChildPagesLoadedNotification
//
// １．機能
//     ・インジケータアイコン読み込み完了通知
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function ChildPagesLoadedNotification(){

	// 2012/06/22 NDD北村 CQ#1355 ADD Start
	// イベントログ書込み
	Fn_WriteLog("PollingStart");
	// 2012/06/22 NDD北村 CQ#1355 ADD End

  TimerID = setInterval("Fn_GetIndicatorStatus()",IndicatorUpdateInt);
}

//*****************************************************************************
// Fn_GetIndicatorStatus
//
// １．機能
//     ・インジケータアイコンのステータスを取得する
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Fn_GetIndicatorStatus(){
  // 一定期間失敗し続けていれば Net断と判断して終了する
  if((intGetprocErrCount * IndicatorUpdateInt) > IndicatorWatchInt){
    // メッセージを表示する
    Fn_PollingTimeout();

	// 2012/06/22 NDD北村 CQ#1355 ADD Start
	// 5分後にポーリングを再開
	setTimeout("ChildPagesLoadedNotification();", 5 * 60 * 1000);
	// 2012/06/22 NDD北村 CQ#1355 ADD End

    return ;
  }

  var ProcURL = "";
  ProcURL =  "./Indicator_Get_Proc.aspx";
  ProcURL += "?LoginId=" + top.LoginUserId;
  ProcURL += "&LoginTime=" + top.LoginTime;
  ProcURL += "&ProcFlag=" + 0;

  // 2005/07/22 002 H.SAITO Net断対応   →削除2008/07/16神立
  //TimerWatchID = setTimeout("Fn_PollingTimeout();", IndicatorWatchInt);
  
  // エラーカウントを1つ増やす (ロード成功時にゼロに戻される)
  intGetprocErrCount += 1; 
  // リロード実行
  INDICATOR_GET_PROC.location.replace(ProcURL);
}
// 2005/07/22 016 H.SAITO Net断対応


//*****************************************************************************
// Fn_PollingTimeout
//
// １．機能
//      ポーリングタイムアウト(=Net断)時の処理
//
// ２．戻り値
//      なし
//
// ３．備考

//*****************************************************************************
function Fn_PollingTimeout(){
  // メッセージがいくつも出続けない様にポーリングを止める
  Public_StopTimer();
  // 2011/04/15 NDD小林 CQ#807対応 スクリプトエラー対応 ADD START
  // イベントログ書込み
  Fn_WriteLog("PollingTimeout");
  // 2011/04/15 NDD小林 CQ#807対応 スクリプトエラー対応 ADD END
  // 2011/04/15 NDD小林 CQ#807対応 スクリプトエラー対応 DEL START
  //// Net断をダイアログメッセージとして表示する
  //top.Public_ErrorDialog(FATAL_ERROR,FileName,SpotCode + 1,ErrorTitle1,ErrorTitle2,ErrorMessage,ButtonString);
  // 2011/04/15 NDD小林 CQ#807対応 スクリプトエラー対応 DEL END
}
//*****************************************************************************
// Public_EndGetStatus
//
// １．機能
//      アイコンステータス取得後の処理
// ２．戻り値
//      なし
// ３．備考
//      次のポーリングの予約(setTimeout)は不要になりました。 2008/07/16 神立
//*****************************************************************************
function Public_EndGetStatus(){
  // 2005/07/22 003 H.SAITO Net断対応
  // タイムアウトクリア →削除2008/07/16神立
  // clearTimeout(TimerWatchID);

  // エラーカウントをクリア 2008/07/16 神立
  intGetprocErrCount = 0;

  //サーバ時間通知
  // 2006/12/07 PVCS#1770 H.SAITO -ST-
  //top.SetTime(ServerTime);
  if(ModalViewStatus != VIEWSTATUS_MODAL){
  	top.SetTime(ServerTime);
  }
  // 2006/12/07 PVCS#1770 H.SAITO -ED-

  // アイコンの切替
  INDICATOR_VIEW.Public_EndGetStatus();

  // タイマイベント開始 →削除。2008/07/16神立
  //TimerID = setTimeout("Fn_GetIndicatorStatus();", IndicatorUpdateInt);
}

//*****************************************************************************
// IndicatorShow
//
// １．機能
//       インジケータユーティリティを表示する
//
// ２．戻り値
//      なし



//
// ３．備考



//       引数      intNumber    選択されたインジケータの番号
//*****************************************************************************
function IndicatorShow(intNumber){
  var strQuery = "";       // ダイアログのURLに指定するクエリ文字列 
  var strURL   = "";       // ダイアログのURL
  var Return = 0;          // インジケータユーティリティからの戻り値
                           // -1 : サーバアプリケーション未起動時の処理(確認モニタ筐体)
                           // -2 : サーバアプリケーション未起動時の処理(デスクトップ筐体)
                           // -3 : 認証が切れた場合の処理(確認モニタ筐体)
                           // -4 : 認証が切れた場合の処理(デスクトップ筐体)
//2006/04/18 H.SAITO PVCS#1743 -ST-
//  // ポーリング監視を一時停止
//  clearTimeout(TimerID);
//2006/04/18 H.SAITO PVCS#1743 -ED-

  // クエリ文字列を作成
  switch(intNumber){
    case 1:
      strQuery = "RU";
      break;
    case 2:
      strQuery = "Media";
      break;
    case 3:
      strQuery = "Printer";
      break;
    case 4:
      strQuery = "Output";
      break;
    case 5:
      strQuery = "Event";
      break;
    //V60_NAS
    case 6:
      strQuery ="HDD";
      break;  
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD Start
    case 7:
      strQuery ="DR";
      break;
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD End
    default:
      strQuery = "RU";
      break;
  }
  // イベントログ書込み
  Fn_WriteLog(strQuery);

  // 2006/11/21 PVCS#1770 H.SAITO -ST-
  top.SetTime("");
  // 2006/11/21 PVCS#1770 H.SAITO -ED-
  // 2006/11/21 PVCS#1770 H.SAITO -ST-
  //// 呼出元画面が予約検査画面、検査画面のときは通知を行う
  //// Hobbit-V1.3 電カル連携対応 Hirao chg Start
  //if(g_CurrentView == "RESERVESTUDY" || g_CurrentView == "STUDY" || g_CurrentView == "STUDYLIST"){
  //// Hobbit-V1.3 電カル連携対応 Hirao chg End
  //  top.IndicatorUtilityOpen();
  //}
  // 2006/11/28 PVCS#1964,#1960,#1903 H.SAITO -ST-
  //top.IndicatorUtilityOpen();
  try{
    top.IndicatorUtilityOpen();
  }catch(e){
  }
  // 2006/11/28 PVCS#1964,#1960,#1903 H.SAITO -ED-
  // 2006/11/21 PVCS#1770 H.SAITO -ED-
  // 2006/12/07 PVCS#1770 H.SAITO -ST-
  ModalViewStatus = VIEWSTATUS_MODAL;
  // 2006/12/07 PVCS#1770 H.SAITO -ED-

  // URL文字列を作成
// 2005/09/09 Kanno UPDATE ST PVCS#1332
//  strURL = "Main.aspx?UtilityKind=" + strQuery + "&OriginDisplay=" + g_CurrentView;
  strURL =  "Main.aspx"
  strURL += "?UtilityKind=" + strQuery;
  strURL += "&OriginDisplay=" + g_CurrentView;
  strURL += "&AuthCheck=1";
  strURL += "&LoginId=" + top.LoginUserId;
  strURL += "&LoginTime=" + top.LoginTime;
// 2005/09/09 Kanno UPDATE ST PVCS#1332

  //2011/03/28 FF星野 CQ#810対応 ADD-ST
  //if('function' === typeof window.external.SetTimer)
  if(g_CurrentView == "" && typeof window.external.SetTimer != "undefined") // CQ#1381
  {
    window.external.SetTimer(0);//インジケータのタイマー停止
  }
  //2011/03/28 FF星野 CQ#810対応 ADD-ED

  // インジケータユーティリティ画面を表示
  Return = window.showModalDialog(strURL, window, "scroll=no; toolbar=no; help=off; location=no; directories=no; status=no; menubar=no; resizable=no; dialogHeight:634px;dialogWidth:808px");

  //2011/03/28 FF星野 CQ#810対応 ADD-ST
  //if('function' === typeof window.external.SetTimer)
  if(g_CurrentView == "" && typeof window.external.SetTimer != "undefined") // CQ#1381
  {
    window.external.SetTimer(1);//インジケーターのタイマー再稼動
  }
  //2011/03/28 FF星野 CQ#810対応 ADD-ED

  // 2006/12/07 PVCS#1770 H.SAITO -ST-
  ModalViewStatus = "";
  // 2006/12/07 PVCS#1770 H.SAITO -ED-
  // 2006/11/21 PVCS#1770 H.SAITO -ST-
  //// 呼出元画面が予約検査画面、検査画面のときはクローズ通知を行う
  //// Hobbit-V1.3 電カル連携対応 Hirao chg Start
  //if(g_CurrentView == "RESERVESTUDY" || g_CurrentView == "STUDY" || g_CurrentView == "STUDYLIST"){
  //// Hobbit-V1.3 電カル連携対応 Hirao chg End
  //  top.IndicatorUtilityClose();
  //}
  // 2006/11/28 PVCS#1964,#1960,#1903 H.SAITO -ST-
  //top.IndicatorUtilityClose();
  try{
    top.IndicatorUtilityClose();
  }catch(e){
  }
  // 2006/11/28 PVCS#1964,#1960,#1903 H.SAITO -ED-
  // 2006/11/21 PVCS#1770 H.SAITO -ED-

//2006/04/18 H.SAITO PVCS#1743 -ST-
//  // ポーリング監視を再開
//  TimerID = setTimeout("Fn_GetIndicatorStatus();",IndicatorUpdateInt);
//2006/04/18 H.SAITO PVCS#1743 -ED-
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
function Fn_WriteLog(ctrlCommand){
  var strURL = "";
  strURL =  "Logger_Proc.aspx?";
  strURL += "Display=" + PROC_MODE;
  strURL += "&Command=" + ctrlCommand;
  strURL += "&LoginId=" + top.LoginUserId;
  strURL += "&LoginTime=" + top.LoginTime;
  // 2012/07/20 NDD北村 CQ#1409 ADD Start
  // コマンドログへの書き込みは行わない。
  strURL += "&NotWrite=TRUE";
  // 2012/07/20 NDD北村 CQ#1409 ADD End
  LOGGER_PROC.location.replace(strURL);
}

//*****************************************************************************
// SetCurrentView
//
// １．機能
//     現在表示されている画面の情報を設定



//
// ２．戻り値
//      なし



//
// ３．備考



//       CurrentView      表示されている画面のコード



//                        RESERVESTUDY  : 予約検査画面
//                        STUDY         : 検査画面
//                        LOGIN         : ユーザ認証画面
//                        null          : その他の画面
//*****************************************************************************
function SetCurrentView(CurrentView){
  g_CurrentView = CurrentView;
}

//*****************************************************************************
// Public_Check
//
// １．機能
//       サーバの起動状態、ユーザ認証状況の確認を行う
//
// ２．戻り値
//      なし



//
// ３．備考



//*****************************************************************************
function Public_Check(Page){

  switch(g_CurrentView){
  
    // ログイン画面、未登録画面、ヴァージョンチェック画面、サーバ未起動画面では何もしない



    case "LOGIN":
    case "UNKNOWNCLT":
    case "VERCHECK":
    case "SVNOTEXIST":
      break;

    // サーバ起動状態、ユーザ認証状態確認用ASPXを読み込む
    default:
// 2005/09/09 Kanno UPDATE ST PVCS#1332
//      var ProcURL = "";
//      ProcURL =  "./Indicator_Get_Proc.aspx";
//      ProcURL += "?LoginId=" + top.LoginUserId;
//      ProcURL += "&LoginTime=" + top.LoginTime;
//      ProcURL += "&ProcFlag=" + 1;
//      ProcURL += "&Page=" + Page;
//      INDICATOR_GET_PROC.location.replace(ProcURL);
	// インジケータ画面起動


	IndicatorShow(Page);
// 2005/09/09 Kanno UPDATE ED PVCS#1332
      break;
  }
}

//*****************************************************************************
// StopTimer
//
// １．機能
//   ・アイコンステータスの監視を停止する
//
// ２．戻り値
//      なし
//
// ３．備考
//      ポーリング開始方法を setInterval に変えた事により、停止方法も変更。2008/07/16神立
//*****************************************************************************
function Public_StopTimer(){
  if(TimerID){
    // clearTimeout(TimerID);
    clearInterval(TimerID);
  }
}
