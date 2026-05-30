/****************************************************************************

  @file EditPatientId_View.js

  @brief EditPatientId_Viewのクライアントスクリプト

  @author YSK畑



         SpotCode MAX 46

  Copyright(c) 2004-2009 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/16  YSK畑       V1.0       新規作成
  @date  06/10/13  S1神立      V1.4       操作性向上(キーボード操作)
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  06/11/08  YSK齋藤     V1.4　     PVCS#1962,#1666対応 
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応 
  @date  07/05/15  HSK山本     V2.0       PVCS2227対応 
  @date  07/06/07  HSK古場     V2.0       PVCS#2281対応 
  @date  07/08/13  HSK古場     V3.0       PVCS#2321対応 
  @date  09/05/15  園木		   V5.1       MWMOnline連携対応

  @date  09/12/01  FFS黒田     V1.1(B)    患者情報項目追加
  @date  10/02/01  FF 西川     V1.2(B)    検査修正を通知 UPDSTUDY_12B
  @date  10/11/22  FFS生田     V2.0(B)    30501エラー改善対応
  @date  12/10/09  FF高松      V2.3(B)    検査情報修正の制限時間変更
  @date  13/02/15  NDD北村     V2.3(B)HF  CQ#1650対応
  @date  14/05/23  TYS会田     V3.0(B)    DR直結-検査情報修正

/****************************************************************************/

//[定数]
var PROC_MODE_EDIT            = "EDITPATIENTID_VIEW";
var PROC_MODE_CHANGE          = "CHANGEPATIENTID_VIEW"; 
var PROC_MODE_INPUT           = "INPUTPATIENTID_VIEW";
var COMMAND_MODE_CANCEL       = "CANCEL";
var COMMAND_MODE_UPDATE       = "UPDATE";
var VIEW_MODE_INPUT           = "INPUT";
var VIEW_MODE_EDIT            = "EDIT";
var VIEW_MODE_CHANGE          = "CHANGE";
// オープンモード


var OPEN_MODE_CE     = 0;				// CEで開かれた場合


var OPEN_MODE_WINDOW = 1;				// ブラウザで開かれた場合


var OPEN_MODE_DIALOG = 2;				// ダイアログで開かれた場合



// 操作ログ出力コマンド


var CTRL_ELECTKARTE						= "ElectKarte";        // 電子カルテ連携
var CTRL_UPDATE								= "Update";            // 修正完了


var CTRL_SEARCH								= "Search";            // 検索
// ソフトキーボードフラグ
var FLAG_SOFTKEYBOARD_USE          = 1;				// ソフトキーボード使用
var FLAG_SOFTKEYBOARD_NOUSE        = 0;				// ソフトキーボード使用不可 
// パディングフラグ
var FLAG_PADDING_USE          = 1;				// パディング
var FLAG_PADDING_NOUSE        = 0;				// パディング不可 
// 検査取得フラグ
var FLAG_STUDY_GETDATA        = 1;				// 検査取得



var FLAG_STUDY_NOGETDATA      = 0;				// 検査未取得



// 電子カルテ連携
var FLAG_ELECTKARTE_USE       = 1;				// 電子カルテ連携可
var FLAG_ELECTKARTE_NOUSE     = 0;				// 電子カルテ連携不可
// 電子カルテ使用I/F
var FLAG_ELECTKARTE_IF_NO     = 0;				// 接続なし



var FLAG_ELECTKARTE_IF_SANYO  = 1;				// 三洋I/F
// 電子カルテ初期取得フラグ
var FLAG_ELECTKARTE_GET       = 1;				// 初期取得有効
var FLAG_ELECTKARTE_NOGET     = 0;				// 初期取得無効
// エラーモード



var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var USER_NOTHING_ERROR = "USER_NOTHING_ERROR";	//ユーザチェックエラー
var SPOT_CODE = 0;                   //スポットコード


var FILE_NAME = "EditPatientId_View.js"  //ファイル名


var MESSAGE_ID = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS = 30501;              //メッセージID 
//2010/11/16 30501エラー対応 ADD ST
var MESSAGE_ID_ACCESS_EXCLUSIVE = 40505;      //メッセージID
//2010/11/16 30501エラー対応 ADD ED
// 2013/02/15 NDD北村 CQ#1650 ADD Start
var MESSAGE_ID_ACCESS_EDITPATIENTID = 40507;    //メッセージID
// 2013/02/15 NDD北村 CQ#1650 ADD End
//20050609(PVCS#350)ST
var MESSAGE_ID_NOLOGIN   = 31502;              //メッセージID 
var MESSAGE_ID_LOGOFF    = 31503;              //メッセージID 
var MESSAGE_ID_DIFERENT  = 31504;              //メッセージID 
var MESSAGE_ID_FORBIDDEN = 31505;
//20050609(PVCS#350)EN
//警告メッセージ
var MSG_WARNING_EKARTE              = 31510;
// 2005/07/20 009 H.SAITO #903 メッセージレベル変更(31512～31526→34512～34526)
//var MSG_WARNING_ID_PROHIBITION      = 31513;
//var MSG_WARNING_ID_OVER             = 31514;
//var MSG_WARNING_ID_NOTHING          = 31515;
//var MSG_CHANGE_VERIFIED             = 31526; // 確定した検査に対する修正確認

var MSG_WARNING_ID_PROHIBITION      = 34513;
var MSG_WARNING_ID_OVER             = 34514;
var MSG_WARNING_ID_NOTHING          = 34515;
//070813 HSK古場 PVCS#2321 ADD-ST
var MSG_WARNING_ID_ZERO             = 34528;
//070813 HSK古場 PVCS#2321 ADD-ED
var MSG_CHANGE_VERIFIED             = 34526; // 確定した検査に対する修正確認

var MSG_WARNING_RECEIPT             = 31527;
// 2005/08/05 005 PVCS#915 H.SAITO 電カルエラーの戻りによってメッセージを変える
var MSG_WARNING_EKARTE_1            = 31536;
var MSG_WARNING_EKARTE_2            = 31537;
var MSG_WARNING_EKARTE_3            = 31538;
var MSG_WARNING_EKARTE_4            = 31539;
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
var MSG_ERROR_EXCLUSIVE_STUDY       = 31506; //他筐体が検査を実施中
var MSG_ERROR_COMPLETED             = 31540; //確認/確定済みの検査です
// 2009/05/15 園木 ADD-ST
var MSG_ERROR_MWMONLINE				= 31541;
// 2009/05/15 園木 ADD-ED
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-
// 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ST-
var MSG_ERROR_NODATA     = 31511;
// 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ED-
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
var DIALOGPROCMODE_STUDY_ERROR          = "DIALOGPROCMODE_STUDY_ERROR";
var DIALOGPROCMODE_COMPLETED_ERROR      = "DIALOGPROCMODE_COMPLETED_ERROR";
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-
// 操作権限チェック 戻り値
var RETURN_OK														=  0; //正常終了


var CHECK_AUTHORITY_ERROR_NOT_LOGGED_IN	= -1; //ログインされていない


var CHECK_AUTHORITY_ERROR_LOGGED_OFF		= -2; //ログオフされた
var CHECK_AUTHORITY_ERROR_DIFFERENT_ID	= -3; //ユーザIDがアプリケーション変数と異なっている
var CHECK_AUTHORITY_ERROR_AUTHORITY			= -4; //操作権限がない



// 更新処理タイマ値
var UPDATE_TIMEOUT            = 600000; // FF高松 制限時間変更100秒から600秒へ
//排他制御スイッチ
var EXCLUSIVE_NOTHING         = -1;       // 排他制御(何もしない)
var EXCLUSIVE_DELL            = 0;        // 排他制御(開放)
var EXCLUSIVE_SET             = 1;        // 排他制御(設定)
var EXCLUSIVE_CHECK           = 2;        // 排他制御(チェック)
// 定数定義=======================================
// 2013/02/15 NDD北村 CQ#1650 ADD Start
var PROC_MODE = "";
// 2013/02/15 NDD北村 CQ#1650 ADD End
// 画像パス
var IMG_BACK_DOWN      = "../Bmp/cmOvalAPaleLBtnD.gif";
var IMG_BACK_UP        = "../Bmp/cmOvalAPaleLBtnU.gif";
var IMG_BACK_DISABLE   = "../Bmp/cmOvalAPaleLBtnX.gif";
var IMG_BACK_FOCUS     = "../Bmp/cmOvalAPaleLBtnF.gif"; // 061002 神立

var IMG_NEXT_DOWN      = "../Bmp/cmCirBGreenBtnD.gif";
var IMG_NEXT_UP        = "../Bmp/cmCirBGreenBtnU.gif";
var IMG_NEXT_DISABLE   = "../Bmp/cmCirBGreenBtnX.gif";
var IMG_NEXT_FOCUS     = "../Bmp/cmCirBGreenBtnF.gif";  // 061002 神立

var IMG_EKARTE_DOWN    = "../Bmp/crkalteBtnD.gif";
var IMG_EKARTE_UP      = "../Bmp/crKalteBtnU.gif";
var IMG_EKARTE_FOCUS   = "../Bmp/crKalteBtnF.gif";      // 061012 神立

var IMG_CONF_NG_DOWN   = "../Bmp/cmOvalAPaleLBtnD.gif";
var IMG_CONF_NG_UP     = "../Bmp/cmOvalAPaleLBtnU.gif";
var IMG_CONF_NG_FOCUS  = "../Bmp/cmOvalAPaleLBtnF.gif"; // 061006 神立

var IMG_CONF_OK_DOWN   = "../Bmp/cmOvalAGreenLBtnD.gif";
var IMG_CONF_OK_UP     = "../Bmp/cmOvalAGreenLBtnU.gif";
var IMG_CONF_OK_FOCUS  = "../Bmp/cmOvalAGreenLBtnF.gif";// 061006 神立

var IMG_CONF_SKIP_DOWN = "../Bmp/cmOvalAPaleLBtnD.gif";
var IMG_CONF_SKIP_UP   = "../Bmp/cmOvalAPaleLBtnU.gif";
var IMG_CONF_SKIP_FOCUS= "../Bmp/cmOvalAPaleLBtnF.gif"; // 061006 神立

//================================================
// 検査ステータス
var STATE_VERIFIED            = "VERIFIED";     // 検査ステータス(確定)
// 2005/07/21 003 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
//// 2005/06/29 002 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
//var COOKIE_NAME_STUDY2        = "StudyLock";	  // 検査排他中クッキー名


//#1346 2005/09/22--ST
var CON_PURPOSE = 0;	// 管理目的

//#1346 2005/09/22--EN

//[変数]
// 更新処理タイムアウトＩＤ
var UpdateTimeoutId = null;
var CheckTimeoutId = null;

var ErrorCode = 0;				// エラーコード 0:なし 1:患者ID
var ExclusiveModeStudy;                    // 画面ＯＰＥＮ時の排他処理 
var ExclusiveModeStudyEnd;                 // 画面終了時の排他処理


var ExclusiveModeStudyBack;                // 戻るボタン押下時の排他処理


var ExclusiveModeStudyNext;                // 次へ/修正完了/検索ボタン押下時の排他処理



var SearchMode = 0;                     	 // 検索処理モード


var EkarteInitFlag = 0;                    // 電子カルテ初期取得フラグ
var ConfirmFlag = 0;                       // 確認ダイアログフラグ

var EditPatientId = ""                     //患者ID(患者情報チェック後)
//*****************************************************************************
// Fn_InitPage
//
// １．機能
//     ・ページロード時の処理
//     ・ボタン名の初期表示を行う
//
// ２．戻り値
//      なし



//
// ３．備考



//*****************************************************************************
function Fn_InitPage(){
  try{

    //画面遷移開始通知設定

    SetViewMovingNotification(ViewMovingNotification);
    //画面遷移終了通知設定

    SetViewMovedNotification(ViewMovedNotification);

  	// 文字列取得


		document.getElementById("DivPatientId_Value").innerText = LabelPatientId;
		document.getElementById("DivButtonNG_Value").innerText = ButtonBack;
		document.getElementById("DivButtonOK_Value").innerText = ButtonNext;
		document.getElementById("DivElect_Value").innerText = ButtonElect;

		// 電子カルテボタン表示/非表示(電子カルテ連携有効かつ三洋I/Fのみ)
		if(ElectKarteConnectFlag == FLAG_ELECTKARTE_USE && ElectKarteUse == FLAG_ELECTKARTE_IF_SANYO){
			document.getElementById("DivElect_Value").style.visibility = "visible";
			document.getElementById("imgElect").style.visibility       = "visible";
			document.getElementById("IMG_Elect_Back").style.visibility = "visible";
		}else{
			document.getElementById("DivElect_Value").style.visibility = "hidden";
			document.getElementById("imgElect").style.visibility       = "hidden";
			document.getElementById("IMG_Elect_Back").style.visibility = "hidden";
		}
    //フォント名,フォントサイズの設定


    document.getElementById("BODY").style.fontFamily             = FONT_NAME;
    // 2005/06/23 002 H.SAITO デザイン変更対応(フォントサイズ)
    //document.getElementById("BODY").style.fontSize               = FONT_SIZE + "px";
    document.getElementById("txtPatientId").style.fontFamily        = FONT_NAME;
    // 2005/06/23 017 H.SAITO デザイン変更対応(フォントサイズ)
    document.getElementById("txtPatientId").style.fontSize          = FONT_SIZE_INPUTBOX;
    document.getElementById("DivPatientId_Value").style.fontSize    = FONT_SIZE_CAPTION;
    document.getElementById("DivButtonNG_Value").style.fontSize     = FONT_SIZE_BUTTON;
    document.getElementById("DivButtonOK_Value").style.fontSize     = FONT_SIZE_BUTTON;
    document.getElementById("DIV_ConfirmCancelText").style.fontSize = FONT_SIZE_BUTTON;
    document.getElementById("DIV_ConfirmSkipText").style.fontSize   = FONT_SIZE_BUTTON;
    document.getElementById("DIV_ConfirmOkText").style.fontSize     = FONT_SIZE_BUTTON;
    document.getElementById("TD_ConfirmTitle1").style.fontSize      = FONT_SIZE_OTHER;
    document.getElementById("TD_ConfirmTitle2").style.fontSize      = FONT_SIZE_OTHER;
    document.getElementById("TD_ConfirmText").style.fontSize        = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorTitle1").style.fontSize        = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorTitle2").style.fontSize        = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorText").style.fontSize          = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorCode").style.fontSize          = FONT_SIZE_OTHER;
    document.getElementById("TD_ProcText").style.fontSize           = FONT_SIZE_OTHER;
    document.getElementById("DIV_ErrorOkText").style.fontSize       = FONT_SIZE_BUTTON;
    //フィルタ解除
		Public_CloseMessage();
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
	return;
  }
}
//*****************************************************************************
// Public_Init
//
// １．機能
//     画面を表示する
//
// ２．戻り値
//      なし



//
// ３．備考



//*****************************************************************************
function Public_Init(){
	try{
    //メニューボタン不活性化



    Fn_ButtonEnable(0);

    //--------------------------------------------------------------//
    //排他モードと表示中の画面に応じて排他の管理スイッチを切り替える//
    //--------------------------------------------------------------//
    switch(ViewStatus){
      // 患者ＩＤ入力時(常に排他の管理は行わない)
      case VIEW_MODE_INPUT:
        // 2013/02/15 NDD北村 CQ#1650 ADD Start
        PROC_MODE = PROC_MODE_INPUT;
        // 2013/02/15 NDD北村 CQ#1650 ADD End
// 2005/08/22 Kanno ADD ST タイトルバーの文字列対応


        // タイトル設定


        top.SetTitle(TitleString);
// 2005/08/22 Kanno ADD ED タイトルバーの文字列対応


        ExclusiveModeStudy            = EXCLUSIVE_NOTHING;   // 画面ＯＰＥＮ時の排他処理


        ExclusiveModeStudyBack        = EXCLUSIVE_NOTHING;   // 戻るボタン押下時の排他処理


        ExclusiveModeStudyNext        = EXCLUSIVE_NOTHING;   // 次へボタン押下時の排他処理


        break;
      // 患者ＩＤ編集


      case VIEW_MODE_EDIT:
        // 2013/02/15 NDD北村 CQ#1650 ADD Start
        PROC_MODE = PROC_MODE_EDIT;
        // 2013/02/15 NDD北村 CQ#1650 ADD End
        switch(parent.ExclusiveMode){
          // モード１：開放のみ
          case parent.EXCLUSIVE_MODE1:
            ExclusiveModeStudy        = EXCLUSIVE_NOTHING;   // 画面ＯＰＥＮ時の排他処理 
            ExclusiveModeStudyBack    = EXCLUSIVE_NOTHING;   // 戻るボタン押下時の排他処理


            ExclusiveModeStudyNext    = EXCLUSIVE_DELL;      // 修正完了押下時の排他処理


            break;
          // モード２：何もしない


          case parent.EXCLUSIVE_MODE2:
            ExclusiveModeStudy        = EXCLUSIVE_NOTHING;   // 画面ＯＰＥＮ時の排他処理 
            ExclusiveModeStudyBack    = EXCLUSIVE_NOTHING;   // 戻るボタン押下時の排他処理


            ExclusiveModeStudyNext    = EXCLUSIVE_NOTHING;   // 修正完了押下時の排他処理


            break;
          // モード３：設定と開放
          case parent.EXCLUSIVE_MODE3:
            ExclusiveModeStudy        = EXCLUSIVE_SET;       // 画面ＯＰＥＮ時の排他処理


            ExclusiveModeStudyBack    = EXCLUSIVE_DELL;      // 戻るボタン押下時の排他処理


            ExclusiveModeStudyNext    = EXCLUSIVE_DELL;      // 修正完了押下時の排他処理


            break;
        }
        break;
      // 変更患者検索時


      case VIEW_MODE_CHANGE:
        // 2013/02/15 NDD北村 CQ#1650 ADD Start
        PROC_MODE = PROC_MODE_CHANGE;
        // 2013/02/15 NDD北村 CQ#1650 ADD End
        switch(parent.ExclusiveMode){
          // モード１：検索ボタンがあるため何もしない


          case parent.EXCLUSIVE_MODE1:
            ExclusiveModeStudy        = EXCLUSIVE_NOTHING;   // 画面ＯＰＥＮ時の排他処理 
            ExclusiveModeStudyBack    = EXCLUSIVE_NOTHING;   // 戻るボタン押下時の排他処理


            ExclusiveModeStudyNext    = EXCLUSIVE_NOTHING;   // 検索押下時の排他処理


            break;
          // モード２：何もしない


          case parent.EXCLUSIVE_MODE2:
            ExclusiveModeStudy        = EXCLUSIVE_NOTHING;   // 画面ＯＰＥＮ時の排他処理 
            ExclusiveModeStudyBack    = EXCLUSIVE_NOTHING;   // 戻るボタン押下時の排他処理


            ExclusiveModeStudyNext    = EXCLUSIVE_NOTHING;   // 検索押下時の排他処理


            break;
          // モード３：設定と開放
          case parent.EXCLUSIVE_MODE3:
            ExclusiveModeStudy        = EXCLUSIVE_SET;       // 画面ＯＰＥＮ時の排他処理


            ExclusiveModeStudyBack    = EXCLUSIVE_DELL;      // 戻るボタン押下時の排他処理


            ExclusiveModeStudyNext    = EXCLUSIVE_NOTHING;   // 検索押下時の排他処理


            break;
        }
        break;
    }
		if(ViewStatus == VIEW_MODE_INPUT){
			// 電子カルテ初期取得フラグがONかつ連携有効かつ三洋の場合患者ID取得


			if(ViewStatus == VIEW_MODE_INPUT && ElectKarteInitialFlag == FLAG_ELECTKARTE_GET && ElectKarteConnectFlag == FLAG_ELECTKARTE_USE && ElectKarteUse == FLAG_ELECTKARTE_IF_SANYO){
				// 患者IDが存在しない場合のみ電子カルテから取得


				if( parent.PatientId == ""){
//ADD hata(05/01/25 No34)==============				
					// ユーザガイダンス表示
 					parent.INFORMATION_VIEW.Public_ClearInformation();
//2005/05/24-ST==========
//					parent.INFORMATION_VIEW.Public_SetUserGuidance(UserGuidanceStringInput); 
					parent.INFORMATION_VIEW.Public_SetUserGuidance(UserGuidanceStringInput,0); 
//2005/05/24-EN==========
//ADD END======================
					// 電子カルテ連携
          EkarteInitFlag = 1;       //電子カルテ初期設定フラグON
					GetElectKarte();
				}
				else{
					Public_EndGetData();
				}
			}
			else{
				Public_EndGetData();
			}
		}
		else{
			//検査取得済ならばデータを取得しない


			if(parent.EndGetDataFlag == FLAG_STUDY_GETDATA){
				Public_EndGetData();			
			}
			else if(parent.EndGetDataFlag == FLAG_STUDY_NOGETDATA){
				switch(ViewStatus){
				  case VIEW_MODE_EDIT:
					  parent.STUDYDATA_GET_PROC.Public_GetData(PROC_MODE_EDIT, parent.StudySequence, "", ExclusiveModeStudy);
					  break;
				  case VIEW_MODE_CHANGE:
					  parent.STUDYDATA_GET_PROC.Public_GetData(PROC_MODE_CHANGE, parent.StudySequence, "", ExclusiveModeStudy);
					  break;
				  default:
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
					  return;
				}
			}
		}
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
		return;
	}
}
//*****************************************************************************
// Public_EndGetData
//
// １．機能
//     データ取得後に画面を表示する
// ２．戻り値
//      なし
// ３．備考
//     061019 S1神立 V1.4操作性向上 フォーカス位置の決め方を変更
//
//*****************************************************************************	
function Public_EndGetData(){		
  try{
  // 2005/11/30 PVCS#1560 H.SAITO -ST-
	//// 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ST-
  //  // 対象となる検査が０件の場合
  //  if(parent.StudyExclusionErrorFlag == "2"){
  //    // 2005/11/28 PVCS#1560 H.SAITO -ST-
	//	  //parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
  //    // 2005/11/28 PVCS#1560 H.SAITO -ED-
  //    Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_NODATA,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_NODATA,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_NODATA,"Cannt Get Message."), DIALOGPROCMODE_STUDY_ERROR); 
  //    return;
  //  }
	//// 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ED-
  //  // 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
  //  if(parent.StudyExclusionErrorFlag == "1"){
  //    // 2005/11/28 PVCS#1560 H.SAITO -ST-
	//	  //parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
  //    // 2005/11/28 PVCS#1560 H.SAITO -ED-
  //    Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_EXCLUSIVE_STUDY,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_EXCLUSIVE_STUDY,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_EXCLUSIVE_STUDY,"Cannt Get Message."), DIALOGPROCMODE_STUDY_ERROR); 
  //    return;
  //  }
	//  // 2005/10/27 PVCS#1571 H.SAITO CEのみ撮影終了/確定済みの検査は編集不可能とする -ST-
  //  //if(parent.CompletedErrorFlag      == "1"){
  //  if(parent.CompletedErrorFlag      == "1" && parent.OpenMode == OPEN_MODE_CE){
	//  // 2005/10/27 PVCS#1571 H.SAITO CEのみ撮影終了/確定済みの検査は編集不可能とする -ED-
  //    // 2005/11/28 PVCS#1560 H.SAITO -ST-
	//	  //parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
  //    // 2005/11/28 PVCS#1560 H.SAITO -ED-
  //    Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_COMPLETED,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_COMPLETED,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_COMPLETED,"Cannt Get Message."), DIALOGPROCMODE_COMPLETED_ERROR); 
  //    return;
  //  }
  //  // 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-
  //  // 2005/11/28 PVCS#1560 H.SAITO -ST-
  //  // 検査自己排他エラーが発生した場合はエラーメッセージを表示して終了する

  //  if(parent.StudySelfExclusionErrorFlag == "1"){
  //    // 2005/11/28 PVCS#1560 H.SAITO -ST-
	//	  //parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
  //    // 2005/11/28 PVCS#1560 H.SAITO -ED-
  //    Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_EXCLUSIVE_STUDY_SELF,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_EXCLUSIVE_STUDY_SELF,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_EXCLUSIVE_STUDY_SELF,"Cannt Get Message."), DIALOGPROCMODE_STUDY_ERROR);
  //    return;
  //  }
  // // 2005/11/28 PVCS#1560 H.SAITO -ED-
    //--------------------------//
    // 検査の排他エラーチェック //
    //--------------------------//
    switch(parent.StudyExclusionErrorFlag){
      case 0:
        break;      
      case 3:
      case 4:
        Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_EXCLUSIVE_STUDY,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_EXCLUSIVE_STUDY,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_EXCLUSIVE_STUDY,"Cannt Get Message."), DIALOGPROCMODE_STUDY_ERROR); 
        return;      
      // 対象となる検査が０件の場合
      case 5:
        Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_NODATA,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_NODATA,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_NODATA,"Cannt Get Message."), DIALOGPROCMODE_STUDY_ERROR);
        return;      
    }
    // ＣＥかつ確定ステータスの場合はエラーとする
    if(parent.CompletedErrorFlag == "1" && parent.OpenMode == OPEN_MODE_CE){
      Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_COMPLETED,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_COMPLETED,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_COMPLETED,"Cannt Get Message."), DIALOGPROCMODE_COMPLETED_ERROR); 
      return;
    }
  // 2005/11/30 PVCS#1560 H.SAITO -ED-
    //2005/04/24 012 H.SAITO
    //排他取得状態(0:未取得,1:検査排他取得,2:検査,RU排他取得)
    if(ExclusiveModeStudy == EXCLUSIVE_SET){
      switch(parent.OpenMode){
        case OPEN_MODE_CE:
          top.ExclusiveState    = 1;
          break;
        case OPEN_MODE_WINDOW:
          parent.ExclusiveState = 1;
          break;      
      }
      // 2005/07/21 004 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
      //// 2005/06/29 003 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
      //// 排他取得時はCookieの検査の排他も取得する
      //top.AddCookie(COOKIE_NAME_STUDY2, parent.StudySequence);
    }

		//初期化
		Fn_Init();

		// ユーザガイダンス表示
		var pp = parent.INFORMATION_VIEW;
 	    pp.Public_ClearInformation();
		
		switch(ViewStatus){
		  case VIEW_MODE_INPUT:
			  //患者情報表示
//2005/05/24-ST==========
//			  pp.Public_SetUserGuidance(UserGuidanceStringInput); 
			  pp.Public_SetUserGuidance(UserGuidanceStringInput,0); 
//2005/05/24-EN==========
			  break;
		  case VIEW_MODE_EDIT:
  			parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
//2005/05/24-ST==========
//			  pp.Public_SetUserGuidance(UserGuidanceStringEdit); 
			  pp.Public_SetUserGuidance(UserGuidanceStringEdit,1); 
//2005/05/24-EN==========
			  //患者情報表示
		    pp.Public_SetPatientId(parent.PatientId); 
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update Start
//		    pp.Public_SetPatientSex(parent.PatientSex);
			pp.Public_SetPatientSex(parent.PatientSex, parent.PatientsSexNeutred);
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update End
		    pp.Public_SetPatientName(parent.PatientName, parent.PatientKanjiName);   
		    pp.Public_SetPatientBirthDate(parent.PatientBirthDate);
			  pp.Public_SetPatientAge(parent.PatientAge);		
			  break;
		  case VIEW_MODE_CHANGE:
  			parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
//2005/05/24-ST==========
//			  pp.Public_SetUserGuidance(UserGuidanceStringChange); 
			  pp.Public_SetUserGuidance(UserGuidanceStringChange,1); 
//2005/05/24-EN==========
			  //患者情報表示
		    pp.Public_SetPatientId(parent.PatientId); 
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update Start
//		    pp.Public_SetPatientSex(parent.PatientSex);
			pp.Public_SetPatientSex(parent.PatientSex, parent.PatientsSexNeutred);
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update End

		    pp.Public_SetPatientName(parent.PatientName, parent.PatientKanjiName);   
		    pp.Public_SetPatientBirthDate(parent.PatientBirthDate);
			  pp.Public_SetPatientAge(parent.PatientAge);
			  break;
      default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
        return;
		}
		pp = null;

		// 患者IDを画面に表示する
		if(parent.SearchChangeFlag == 1){
			document.getElementById("txtPatientId").value = parent.EditPatientId;
		}else{
			document.getElementById("txtPatientId").value = parent.PatientId;
		}
        // 061019 神立 >>>
        // 表示時のフォーカス位置の決め方を変更
        // document.getElementById("txtPatientId").focus();
        // <<<

    //メニューボタン活性化
    Fn_ButtonEnable(1);

  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
  }
}
//*****************************************************************************
// ViewMovingNotification
//
// １．機能
//     画面遷移を行う前通知
//
// ２．戻り値
//　　  なし

// ３．備考

//
//*****************************************************************************
function ViewMovingNotification(notifyInfo,initMode)
{
    try{
        if(initMode == FC_MOVING_MODE_UPDATE){//更新
            Public_EndGetData();
        }else{
            Public_Init();
        }
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
    }
}

//*****************************************************************************
// ViewMovedNotification
//
// １．機能
//     画面遷移を行った後通知
//
// ２．戻り値
//　　  なし

// ３．備考

//
//*****************************************************************************
function ViewMovedNotification(notifyInfo)
{
    try{
        if(notifyInfo.focusMode == "TextBox"){
            FocusTextbox();
        }else{
            InitFocus();
        }
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
    }
}


//*****************************************************************************
// Fn_Init
//
// １．機能
//     変数を初期化する
// ２．戻り値
//      なし



// ３．備考



//*****************************************************************************
function Fn_Init(){
  try{
// ADD V1.0-1354 2005/02/06 hata=================================
		// ユーザガイダンス情報クリア
		parent.INFORMATION_VIEW.Public_ClearInformation();
// ADD EN======================================================
		
// 2005/09/15 Kanno ADD ST PVCS#1469
		InitCurPosition();
// 2005/09/15 Kanno ADD ED PVCS#1469
		
		// 患者ID入力入力初期化
		document.getElementById("txtPatientId").value = "";
		// 検索状況フラグ初期化


		SearchMode = 0;
    ConfirmFlag = 0;                       // 確認ダイアログフラグ
    
		// ソフトキーボード初期化
		if(SoftKeyBoardFlag == FLAG_SOFTKEYBOARD_USE){
			frmSoftKeyBoard.Fn_Init();
		}
		EditPatientId  = "";                  //患者ID(患者情報チェック後)
			
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
  }
}
//***************************************************************************
//  PatientIdBack()		
//
//  1．機能
//      患者ID戻る要求



//	2．戻り値  
//		  なし



//  3．備考



//     
//***************************************************************************
function PatientIdBack(){
	
	try{
	  // 戻るボタン押下時の排他処理スイッチのセット
    ExclusiveModeStudyEnd = ExclusiveModeStudyBack;
    // 排他処理


    Fn_Exclusive(COMMAND_MODE_CANCEL, "");

    parent.SearchChangeFlag = 0;
/*
		switch(ViewStatus){
			case VIEW_MODE_INPUT:
				// サブメインフレームに処理要求



				parent.Public_End(PROC_MODE_EDIT, COMMAND_MODE_CANCEL, "");
				// 患者ID情報初期化



				Fn_Init();
				break;
			case VIEW_MODE_EDIT:
        // 排他処理



        Fn_Exclusive(COMMAND_MODE_CANCEL, "");
				break;
			case VIEW_MODE_CHANGE:
        // 排他処理



        Fn_Exclusive(COMMAND_MODE_CANCEL, "");
				break;
			default:
				Public_Error(FATAL_ERROR, "PatientIdBack Exception"); 
				break;
		}
*/		
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
		return;
	
	}

}
//***************************************************************************
//  PatientIdNext()		
//
//  1．機能
//      患者ID次へ要求



//	2．戻り値  
//		  なし



//  3．備考



//     
//***************************************************************************
function PatientIdNext(){
	try{
		// 更新処理タイムアウト予約解除
		clearTimeout(UpdateTimeoutId);

		// 処理中表示解除
		Public_CloseMessage();			

	  // 次へ/検索/修正完了ボタン押下時の排他処理スイッチのセット
    ExclusiveModeStudyEnd = ExclusiveModeStudyNext;

// ADD 2005/02/03 hata====================
		// 患者編集時のみ修正完了状況フラグを修正完了とする
		if(ViewStatus == VIEW_MODE_EDIT){
			parent.ModifyStatusFlag = 1;
		}
//ADD EN===========================

    // 排他処理



    Fn_Exclusive(COMMAND_MODE_UPDATE, "");
  
/*
		switch(ViewStatus){
			case VIEW_MODE_INPUT:
				// サブメインフレームに処理要求



				parent.Public_End(PROC_MODE_EDIT, COMMAND_MODE_UPDATE, "");
				break;
			case VIEW_MODE_EDIT:
        // 排他処理



        Fn_Exclusive(COMMAND_MODE_UPDATE, "");
				break;
			case VIEW_MODE_CHANGE:
				// サブメインフレームに処理要求



        // 検索ボタン押下時は排他処理を行なわない



				parent.Public_End(PROC_MODE_CHANGE, COMMAND_MODE_UPDATE, "");
				break;
			default:
				Public_Error(FATAL_ERROR, "PatientIdNext Exception"); 
				break;
		}
*/
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
		return;
	}
}
//*****************************************************************************
// Fn_Exclusive
//
// １．機能
//     排他の開放処理を行う
// ２．戻り値
//      なし



// ３．備考



//      なし



//*****************************************************************************
function Fn_Exclusive(commandMode, commandParam){
  try{
    //終了モードとパラメータの退避
    CommandMode  = commandMode;
    CommandParam = commandParam;

    //----------------------------------------------------------//
    // 検査の開放を行わない場合はサーバアクセスしないようにする //
    //----------------------------------------------------------//
    if(ExclusiveModeStudyEnd == EXCLUSIVE_NOTHING){
      Public_EndExclusive(0 , 0);
    }
    else{
			//処理中表示
			Public_Message("DIALOG", ProcString);
      //タイマ予約


			//2010/11/22 30501エラー改善対応 MOD ST
			// 2013/02/15 NDD北村 CQ#1650 DEL Start 
			//PROC_MODE = (ViewStatus == VIEW_MODE_EDIT) ? PROC_MODE_EDIT : PROC_MODE_CHANGE;
			// 2013/02/15 NDD北村 CQ#1650 DEL End 
			UpdateTimeoutId	= setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS_EXCLUSIVE+",'"+FILE_NAME+"',"+ (SPOT_CODE+10) +")", UPDATE_TIMEOUT);
			//2010/11/22 30501エラー改善対応 MOD ED
      //排他の開放処理



      switch(ViewStatus){
			  case VIEW_MODE_EDIT:
          parent.EXCLUSIVE_PROC.Public_Exclusive(PROC_MODE_EDIT,   parent.StudySequence, "", ExclusiveModeStudyEnd);
          break;
			  case VIEW_MODE_CHANGE:
          parent.EXCLUSIVE_PROC.Public_Exclusive(PROC_MODE_CHANGE, parent.StudySequence, "", ExclusiveModeStudyEnd);
          break;
        default:
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+11);
      }
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+12);
  }
}
//*****************************************************************************
// Public_EndExclusive
//
// １．機能 
//      排他処理後の処理



// ２．戻り値
//    無し



// ３．備考



//*****************************************************************************
function Public_EndExclusive(returnCodeRu, returnCodeStudy){
  try{
    //タイマ予約解除
    clearTimeout(UpdateTimeoutId);

    //エラーのチェックを行う
    if(returnCodeStudy != 0){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+13);
//      Public_Error(FATAL_ERROR, "Exclusive Control was failed :" +  returnCodeStudy);
      return;
    }

    //2005/04/24 012 H.SAITO
    //排他取得状態(0:未取得,1:検査排他取得,2:検査,RU排他取得)
    if(ExclusiveModeStudyEnd == EXCLUSIVE_DELL){
      switch(parent.OpenMode){
        case OPEN_MODE_CE:
          top.ExclusiveState    = 0;
          break;
        case OPEN_MODE_WINDOW:
          parent.ExclusiveState = 0;
          break;      
      }
      // 2005/07/21 004 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
      //// 2005/06/29 003 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
      //// 開放時はCookieの検査の排他も開放する
      //top.UnSetCookie(COOKIE_NAME_STUDY2, parent.StudySequence);
    }

    //処理中表示解除
    Public_CloseMessage();

    //変数初期化
    Fn_Init();

    // 親への完了通知
    //2011/01/17 30501エラー改善対応 MOD ST
    if (top.ignoreFinish != true)
    {
	    var notifyInfo = { "commandMode" : CommandMode, "commandParam" : CommandParam };
	    NotifyFrameFinished(notifyInfo);
	}
	top.ignoreFinish = false;
	//2011/01/17 30501エラー改善対応 MOD ED
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+15);
  }
}
//***************************************************************************
//  CheckPatientId()		
//
//  1．機能
//      患者IDの入力チェック
//	2．戻り値  
//		  なし



//  3．備考



//     
//***************************************************************************
function CheckPatientId(){
	try{
	  //処理モードが編集と変更の場合、情報未取得ならば処理を行わない



	  if(ViewStatus == VIEW_MODE_EDIT || ViewStatus == VIEW_MODE_CHANGE){
	    if(parent.EndGetDataFlag == FLAG_STUDY_NOGETDATA)return;  
	  }
		var pp = "";
		var patId = document.getElementById("txtPatientId").value;

		// 2005/07/22 006 H.SAITO PVCS:#954 患者IDの後方スペースを除去する
    var count;
    // ｶﾝｼﾞｬﾒｲの半角スペースを除去する
    count        = Fn_GetRemoveStrCount(patId, " ", patId.length - 1);
    patId        = patId.substring(0, count);
    document.getElementById("txtPatientId").value  = patId;

		// 禁則文字列チェック================
		var retCode = chkPatientID(patId, PatientIdLength, PatientIdProhibition)
		if(retCode != 0)
		{
//  		document.getElementById("txtPatientId").onfocus();		
			ErrorCode = 1;
			if(retCode == -1){
//        Public_ErrorDisplay(RETRY_ERROR, 31505, FILE_NAME, 0);
//				Public_Error(RETRY_ERROR, ErrorStringPatientId); 
				Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_ID_PROHIBITION,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_ID_PROHIBITION,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_ID_PROHIBITION,"Cannt Get Message.")); 
				return;
			}else if(retCode == -2){
//      Public_ErrorDisplay(RETRY_ERROR, 31506, FILE_NAME, 0);
//				Public_Error(RETRY_ERROR, ErrorInputPatientId); 
				Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_ID_OVER,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_ID_OVER,""), ErrorInputPatientId); 
				return;
//070810 HSK古場 PVCS#2321 UPDATE-ST
//		}else{
			}else if(retCode == -3){
//070810 HSK古場 PVCS#2321 UPDATE-ED
//        Public_ErrorDisplay(RETRY_ERROR, 31507, FILE_NAME, 0);
				Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_ID_NOTHING,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_ID_NOTHING,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_ID_NOTHING,"Cannt Get Message.")); 
				return;
//070810 HSK古場 PVCS#2321 ADD-ST
			}else{
				Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_ID_ZERO,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_ID_ZERO,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_ID_ZERO,"Cannt Get Message.")); 
				return;
//070810 HSK古場 PVCS#2321 ADD-ED
			}		
		}

		//パディング処理===================================
		patId = CheckPadding(patId);

// ADD hata 2005/02/28=======================
    // 患者ID編集


    if(parent.PatientId != patId){
      // 患者ID編集フラグON
      parent.PatientEditFlag = 1;
    }else{
      // 患者ID編集フラグOFF
      parent.PatientEditFlag = 0;
    }
// ADD EN====================================
//CHANGE 2005/05/16===================
		// 患者情報設定


		EditPatientId  = patId;
/*
		if(ViewStatus == VIEW_MODE_INPUT || ViewStatus == VIEW_MODE_EDIT){
			parent.PatientId = patId;
		}else if(ViewStatus == VIEW_MODE_CHANGE){
			parent.EditPatientId = patId;
		}		
*/
//====================================
		switch(ViewStatus){
			case VIEW_MODE_INPUT:
  			parent.PatientId = EditPatientId;
        // 操作ログ出力


        Fn_WriteLog(PROC_MODE_INPUT, CTRL_SEARCH);

				// 更新処理タイムアウト予約
				// 2013/02/15 NDD北村 CQ#1650 UPD Start
				//UpdateTimeoutId	= setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+16) +")", UPDATE_TIMEOUT);
				// 2013/02/15 NDD北村 CQ#1650 UPD
				UpdateTimeoutId	= setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS_EDITPATIENTID+",'"+FILE_NAME+"',"+ (SPOT_CODE+16) +")", UPDATE_TIMEOUT);
				// 2013/02/15 NDD北村 CQ#1650 UPD End
				// 処理中表示
				Public_Message("DIALOG", ProcString);

				pp = parent.SEARCHPATIENTDATA.frmSearchForm;
				// 患者IDを検索条件にセット
// CHANGE hata==============
//070607 HSK古場 PVCS#2281 UPDATE-ST
//				pp.txtId.value = escape(parent.PatientId);
				pp.txtId.value = encodeURIComponent(parent.PatientId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
//CHANGE EN=========================
				pp.txtMode.value = ViewStatus;
				pp.txtSearchMode.value = SearchMode;
//070607 HSK古場 PVCS#2281 UPDATE-ST
//				pp.loginUserId.value = escape(top.LoginUserId);
				pp.loginUserId.value = encodeURIComponent(top.LoginUserId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
				pp.loginTime.value   = top.LoginTime;
				pp.submit();
				pp = null;
				break;
			case VIEW_MODE_EDIT:
			  // 操作ログ出力



        Fn_WriteLog(PROC_MODE_EDIT, CTRL_UPDATE);

//				// 確認ダイアログ表示
//				document.getElementById("TD_ConfirmText").innerHTML = ConfirmChangeString;
//				// 確認ボックス
//				document.getElementById("DIV_ConfirmOkText").innerHTML		= ConfirmOkString;
//				document.getElementById("DIV_ConfirmCancelText").innerHTML	= ConfirmCancelString;
//				Public_Confirm();

				// 確認ボックス
				document.getElementById("DIV_ConfirmOkText").innerHTML		 = ConfirmOkString;
				document.getElementById("DIV_ConfirmCancelText").innerHTML = ConfirmCancelString;
        //検査ステータスが確定の場合は確認ダイアログを表示する
				// #1346 2005/09/22--ST 確定＆管理もくてきのみ表示
//070515 HSK山本 PVCS#2227 UPDATE-ST
//        if(parent.StudyStatus == STATE_VERIFIED && parent.PurPose == CON_PURPOSE){
        if(parent.PatientEditFlag == 1 && parent.StudyStatus == STATE_VERIFIED && parent.PurPose == CON_PURPOSE){
//070515 HSK山本 PVCS#2227 UPDATE-ED
          document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_CHANGE_VERIFIED,"");
          document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_CHANGE_VERIFIED,"");
          document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_CHANGE_VERIFIED,"Cannt Get Message.");
      		ConfirmFlag = 3;  //確認ダイアログのフラグ(確定後操作の確認)
          Public_Confirm();
        }
				// #1346 2005/09/22--EN 
        else{
          document.getElementById("TD_ConfirmTitle1").innerHTML = "";
          document.getElementById("TD_ConfirmTitle2").innerHTML = "";
//2014.05.23 TYS会田 DR直結-検査情報修正 MOD-ST
          //document.getElementById("TD_ConfirmText").innerText = ConfirmChangeString;
          document.getElementById("TD_ConfirmText").innerHTML = ConfirmChangeString;
//2014.05.23 TYS会田 DR直結-検査情報修正 MOD-ED
       		ConfirmFlag = 2;  //確認ダイアログのフラグ(DB反映)
          Public_Confirm();
        }

				break;
			case VIEW_MODE_CHANGE:
  			parent.EditPatientId = EditPatientId;

        // 操作ログ出力


        Fn_WriteLog(PROC_MODE_CHANGE, CTRL_SEARCH);

				// 更新処理タイムアウト予約
				// 2013/02/15 NDD北村 CQ#1650 UPD Start
				//UpdateTimeoutId	= setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+17) +")", UPDATE_TIMEOUT);
				// 2013/02/15 NDD北村 CQ#1650 UPD
				UpdateTimeoutId	= setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS_EDITPATIENTID+",'"+FILE_NAME+"',"+ (SPOT_CODE+17) +")", UPDATE_TIMEOUT);
				// 2013/02/15 NDD北村 CQ#1650 UPD End
				// 処理中表示
				Public_Message("DIALOG", ProcString);
//				pp = parent.SEARCHPATIENTDATA.frmSearchForm
    // 画像確認モニタの場合



    if(parent.isModifyCtrlCE){
				pp = parent.FRAME_PROC.frmSearchForm;
    }
    // 画像確認モニタ以外(既存処理)
    else{
				pp = parent.SEARCHPATIENTDATA.frmSearchForm
    }
				// 患者IDを検索条件にセット
// CHANGE hata==============
//070607 HSK古場 PVCS#2281 UPDATE-ST
//				pp.txtId.value = escape(parent.EditPatientId);
				pp.txtId.value = encodeURIComponent(parent.EditPatientId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
//CHANGE EN=========================
				pp.txtMode.value = ViewStatus;
				pp.txtSearchMode.value = SearchMode;
//070607 HSK古場 PVCS#2281 UPDATE-ST
//				pp.loginUserId.value = escape(top.LoginUserId);
				pp.loginUserId.value = encodeURIComponent(top.LoginUserId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
				pp.loginTime.value   = top.LoginTime;
				pp.submit();
				pp = null;
				// 検索処理実行フラグ
				parent.SearchChangeFlag = 1;
				break;
			default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+18);
				return;
		}

	}catch(e){
 //   Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+19);
	}

}
//***************************************************************************
//  CheckPadding()		
//
//  1．機能
//      パディングチェック
//	2．戻り値  
//		  なし



//  3．備考



//     
//***************************************************************************
function CheckPadding(patId){
	try{
		// パディング処理




		if(PaddingFlag == FLAG_PADDING_USE){
			var idLen = patId.length;
//UPDATE ST hata V1.0-0041(2005/01/29)================
			if(idLen < PatientIdLength){
				for(i=0; i<PatientIdLength-idLen; i++){
					patId = "0"+patId;
				}
			}
/*
			if(idLen < PaddingLength){
				for(i=0; i<PaddingLength-idLen; i++){
					patId = "0"+patId;
				}
			}
*/
//UPDATE ED===========================================
		}
		return patId;
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+20);
		return "";
	}
}
//************************************************
// Fn_CloseError
//                           
// 	エラーダイアログのOKボタン押下時処理


//  ダイアログを閉じる(入力チェックエラーの場合はフォーカスを判定する)
//
// １．機能 
//     ・クリックした性別の色を変更する
//  2．戻り値  
//		なし


//  3．備考


//       
//************************************************
function Fn_CloseError()
{
	// エラーダイアログ非表示
	Public_CloseError();

	// エラーコード判定


	if(ErrorCode == 1){
		// 患者IDにフォーカス当てる



		document.getElementById("txtPatientId").onfocus();		
	}
	
	ErrorCode = 0;
	
}
//***************************************************************************
//  ErrorReceiptDialog()		
//
//  1．機能
//      エラー選択ダイアログのボタン表示
//	2．戻り値  
//		  なし



//  3．備考



//     
//***************************************************************************
function ErrorReceiptDialog(){
	try{
    //タイマ予約解除
    clearTimeout(UpdateTimeoutId);

    document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_RECEIPT,"");
    document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_RECEIPT,"");
    document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_WARNING_RECEIPT,"Cannt Get Message.");
		// エラー確認ボックス
		document.getElementById("DIV_ConfirmOkText").innerText		= ErrorConfirmOkString;
		document.getElementById("DIV_ConfirmCancelText").innerText	= ErrorConfirmCancelString;
		document.getElementById("DIV_ConfirmSkipText").innerText	= ErrorConfirmSkipString;
		ConfirmFlag = 1;  //確認ダイアログのフラグ(レセコン)
		Public_ErrorConfirm();

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+21);
		return;
	}
}

//***************************************************************************
//  Fn_OnConfirmButton(command  : 1:OKボタン押下 0:キャンセルボタン押下)		
//
//  1．機能
//      確認ダイアログのボタン押下時処理


//      OK    :更新処理


//      Cancel:画面に戻る


//	2．戻り値  
//		  なし


//  3．備考


//     
//***************************************************************************
function Fn_OnConfirmButton(command)
{
	try{
		switch(ViewStatus){
			
			case VIEW_MODE_INPUT:
			case VIEW_MODE_CHANGE:
				//処理中表示解除
				Public_CloseMessage();

				// 確認ボックスを閉じる
    		document.getElementById("txtPatientId").onfocus();		
				Public_ErrorCloseConfirm();

        switch(command){
          //============
          //キャンセル
          //============
          case 0:   
           return;
          //============
          //スキップ
          //============
          case 2:
					  switch(SearchMode){		// 検索モードを変更
						  case 2:		//レセコンのみ
						  case 3:		// 患者テーブル優先
// 2009/05/15 園木 ADD-ST
						  case 5:		// MWMOmlineのみ
						  case 6:		// 患者テーブル優先(MWMOnline)
// 2009/05/15 園木 ADD-ED


							  // 次画面に遷移(検索処理を行わない) 
							  PatientIdNext();
							  return;
						  case 4:		// レセコン優先
// 2009/05/15 園木 ADD-ST						  
						  case 7:		// MWMOnline優先
// 2009/05/15 園木 ADD-ED


							  SearchMode = 1;		// 患者テーブルのみ検索
							  break;
						  default:
                Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+22);
							  return;
					  }
					  break;
          //============
          //再試行



          //============
          case 1:   //ONCLICK
					  switch(SearchMode){		// 検索モードを変更
						  case 2:		//レセコンのみ
						  case 3:		// 患者テーブル優先


							  SearchMode = 2;		// レセコンのみ検索
							  break;
						  case 4:		// レセコン優先


							  SearchMode = 4;		// レセコン優先
							  break;
// 2009/05/15 園木 ADD-ST
						  case 5:					// MWMOnlineのみ
						  case 6:					// 患者テーブル優先(MWM)
							  SearchMode = 5;		// MWMOnlineのみ検索
							  break;
						　case 7:					// MWMOnline優先
						　	  SearchMode = 7;		// MWMOnline優先
							  break;
// 2009/05/15 園木 ADD-ED							
						  default:
                Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+23);
							  return;
					  }
					  break;
            
				  default:
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+24);
	  				return;
				}			

				// 更新処理タイムアウト予約
				// 2013/02/15 NDD北村 CQ#1650 UPD Start
				//UpdateTimeoutId	= setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+25) +")", UPDATE_TIMEOUT);
				// 2013/02/15 NDD北村 CQ#1650 UPD
				UpdateTimeoutId	= setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS_EDITPATIENTID+",'"+FILE_NAME+"',"+ (SPOT_CODE+25) +")", UPDATE_TIMEOUT);
				// 2013/02/15 NDD北村 CQ#1650 UPD End
				// 処理中表示
				Public_Message("DIALOG", ProcString);

        if(ViewStatus == VIEW_MODE_CHANGE){
          // 画像確認モニタの場合



          if(parent.isModifyCtrlCE){
				      pp = parent.FRAME_PROC.frmSearchForm;
          }
          // 画像確認モニタ以外(既存処理)
          else{
				      pp = parent.SEARCHPATIENTDATA.frmSearchForm;
          }
        }
        else{
		      pp = parent.SEARCHPATIENTDATA.frmSearchForm;
        }
        
				// 患者IDを検索条件にセット
//CHANGE 2005/03/14===================
				if(ViewStatus == VIEW_MODE_INPUT){
//070607 HSK古場 PVCS#2281 UPDATE-ST
//  				pp.txtId.value = escape(parent.PatientId);
  				pp.txtId.value = encodeURIComponent(parent.PatientId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
        }else if(ViewStatus == VIEW_MODE_CHANGE){
//070607 HSK古場 PVCS#2281 UPDATE-ST
//  				pp.txtId.value = escape(parent.EditPatientId);
  				pp.txtId.value = encodeURIComponent(parent.EditPatientId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
        }        
//CHANGE EN=====================
				pp.txtMode.value = ViewStatus;
				pp.txtSearchMode.value = SearchMode;
//070607 HSK古場 PVCS#2281 UPDATE-ST
//				pp.loginUserId.value = escape(top.LoginUserId);
				pp.loginUserId.value = encodeURIComponent(top.LoginUserId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
				pp.loginTime.value   = top.LoginTime;
				pp.submit();
				pp = null;

				break;		
			case VIEW_MODE_EDIT:
				// 確認ボックスを閉じる
				Public_CloseConfirm();
// CHANGE hata 2005/02/28======================================
			  // 患者IDを編集しないかつ患者テーブルに変更しない場合は更新処理を行わない



        if(parent.PatientEditFlag == 0 && command == 0){
          // 画面遷移
          PatientIdNext();
        }else{
				  // 更新処理タイムアウト予約
				  // 2013/02/15 NDD北村 CQ#1650 UPD Start
				  //UpdateTimeoutId	= setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+26) +")", UPDATE_TIMEOUT);
				  // 2013/02/15 NDD北村 CQ#1650 UPD
				  UpdateTimeoutId	= setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS_EDITPATIENTID+",'"+FILE_NAME+"',"+ (SPOT_CODE+26) +")", UPDATE_TIMEOUT);
				  // 2013/02/15 NDD北村 CQ#1650 UPD End
				  // 処理中表示
				  Public_Message("DIALOG", ProcString);
//				  var pp = parent.EDITPATIENTID_UPDATE_PROC.frmUpdate;
    // 画像確認モニタの場合



    if(parent.isModifyCtrlCE){
				  var pp = parent.FRAME_PROC.frmUpdate;
    }
    // 画像確認モニタ以外(既存処理)
    else{
				  var pp = parent.EDITPATIENTID_UPDATE_PROC.frmUpdate;
    }
				  // 処理フレームに処理要求


				  pp.txtMode.value          = VIEW_MODE_EDIT;
				  pp.commandId.value        = command; 
				  pp.studySequence.value    = parent.StudySequence; 
//070607 HSK古場 PVCS#2281 UPDATE-ST
//				  pp.patientId.value        = escape(EditPatientId);
				  pp.patientId.value        = encodeURIComponent(EditPatientId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
				  pp.patientName.value      = parent.PatientName;
				  pp.patientKanjiName.value = parent.PatientKanjiName;
				  pp.patientSex.value       = parent.PatientSex;
				  pp.patientBirth.value     = parent.PatientBirthDate;
				  pp.studyStatus.value      = parent.StudyStatus;
//070607 HSK古場 PVCS#2281 UPDATE-ST
//				  pp.loginUserId.value      = escape(top.LoginUserId);
				  pp.loginUserId.value      = encodeURIComponent(top.LoginUserId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
					pp.loginTime.value        = top.LoginTime;
  //ADD hata 2005/02/28===============
          pp.updateFlag.value       = parent.PatientEditFlag;
  //===================================				
				  pp.submit();
				  pp = null;
        }
				break;
			default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+27);
				return;
// CHANGE EN ===========================================================					
		}
	}catch(e){
     Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+28);
	}
	
}

//*****************************************************************************
// GetElectKarte()
//
// １．機能
//     電子カルテに患者IDを要求する



// ２．戻り値
//      なし



// ３．備考



//*****************************************************************************	
function GetElectKarte()
{
	try{
    // 操作ログを出力する



	  switch(ViewStatus){
	    case VIEW_MODE_INPUT:
        Fn_WriteLog(PROC_MODE_INPUT,  CTRL_ELECTKARTE);
	      break;
	    case VIEW_MODE_EDIT:
        Fn_WriteLog(PROC_MODE_EDIT,   CTRL_ELECTKARTE);
	      break;
	    case VIEW_MODE_CHANGE:
        Fn_WriteLog(PROC_MODE_CHANGE, CTRL_ELECTKARTE);
        break;	  
	  }
		// タイムアウト値設定



		GetTimeoutId = setTimeout("InitialElectKarteNoData()", UPDATE_TIMEOUT);
		// 処理中表示
		Public_Message("DIALOG", GetElectDataString);

		var pp = parent.EKARTEDATA_GET_PROC.frmGetData;
		// 電子カルテ処理フレームに処理要求



//DEL hata(05/01/25)
//		pp.EKarteIpAddress.value = ElectKarteAddress;
//		pp.EKartePipeName.value  = ElectKartePipe;
//		pp.EKarteTimeOut.value   = ElectKarteTimeOut;
//DEL hata(05/01/25)
		pp.ViewMode.value        = ViewStatus;
//070607 HSK古場 PVCS#2281 UPDATE-ST
//		pp.loginUserId.value = escape(top.LoginUserId);
		pp.loginUserId.value = encodeURIComponent(top.LoginUserId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
		pp.loginTime.value   = top.LoginTime;
		pp.submit();
		pp = null;

	}catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+29);
	}
}
//*****************************************************************************
// InitialElectKarteNoData()
//
// １．機能
//     電子カルテ



// ２．戻り値
//      なし



// ３．備考



//*****************************************************************************	
function InitialElectKarteNoData()
{
	try{
		// 更新処理タイムアウト予約解除
		clearTimeout(GetTimeoutId);
		GetTimeoutId=0;
		// 処理中表示解除
		Public_CloseMessage();

		// 患者IDにフォーカス当てる


		document.getElementById("txtPatientId").onfocus();		
			
	}catch(e){
     Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+30);
	}
}
//*****************************************************************************
// SetElectKarteData()
//
// １．機能
//     患者IDを画面に表示する 
// ２．戻り値 
//      なし 
// ３．備考 
//          061127  S1神立  V1.4    ID取得後「次へ」ボタンにフォーカスする 
//*****************************************************************************	
function SetElectKarteData()
{
	try{
        // 更新処理タイムアウト予約解除
        clearTimeout(GetTimeoutId);
        GetTimeoutId=0;
        // 処理中表示解除
        Public_CloseMessage();

        patientId = parent.EKARTEDATA_GET_PROC.PatientId;
        document.getElementById("txtPatientId").value = patientId;
        // 061127 神立 >>> 
        //document.getElementById("txtPatientId").onfocus();
        // <<<

        //修正完了ボタン活性化 
        Fn_ButtonEnable(1);

        // 061127 神立 >>>
        document.getElementById("TABLE_Next").focus();
        // <<<

    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+31);
    }
}
//*****************************************************************************
// SetElectKarteNoData()
//
// １．機能
//     電子カルテから情報が取得できなかった場合




//     確認ダイアログを表示
// ２．戻り値
//      なし



// ３．備考



//*****************************************************************************	
// 2005/08/05 003 PVCS#915 H.SAITO 電カルエラーの戻りによってメッセージを変える



//function SetElectKarteNoData()
function SetElectKarteNoData(returnCode)
{
	try{
		// 更新処理タイムアウト予約解除
		clearTimeout(GetTimeoutId);
		GetTimeoutId=0;
		// 処理中表示解除
		Public_CloseMessage();

		ErrorCode = 1;
//		document.getElementById("txtPatientId").onfocus();		
    //修正完了ボタン活性化



    Fn_ButtonEnable(1);

    //電子カルテ初期設定フラグON
    if(EkarteInitFlag == 1){
      InitialElectKarteNoData();
    }
    //電子カルテ初期設定フラグOFFの場合警告表示
    else{
		  // ダイアログ表示
// 2005/08/05 029 PVCS#915 H.SAITO 電カルエラーの戻りによってメッセージを変える



////      Public_ErrorDisplay(RETRY_ERROR, 31515, FILE_NAME, 0);
//		  Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_EKARTE,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_EKARTE,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_EKARTE,"Cannt Get Message.")); 
      switch(returnCode){
        case -1: // "電子カルテのIPアドレス" パラメータチェックエラー
        case -2: // "パイプ名称" パラメータチェックエラー     
        case -3: // "受信タイムアウト時間" パラメータチェックエラー     
        case -4: // パイプ接続エラー(相手PCのパイプに接続できない場合はこのエラー)
        case -5: // パイプ書き込みエラー
        case -6: // パイプ読み込みエラー
        case -7: // 受信タイムアウト



		  Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_EKARTE_1,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_EKARTE_1,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_EKARTE_1,"Cannt Get Message."));
          break;      
        case -8: // 電子カルテからエラーを受信 "電文形式が正しくない"
        case -10:// 電子カルテからエラーを受信 "その他"
		  Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_EKARTE_2,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_EKARTE_2,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_EKARTE_2,"Cannt Get Message.")); 
          break;      
        case -11:// 受信電文解析エラー
        case -99:// GetPatientInfo()メソッド内例外



		  Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_EKARTE_3,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_EKARTE_3,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_EKARTE_3,"Cannt Get Message.")); 
          break;      
        case -9: // 電子カルテから"該当患者が存在しない"を受信
		  Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_EKARTE_4,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_EKARTE_4,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_EKARTE_4,"Cannt Get Message.")); 
          break;      
        default:
		  Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_EKARTE,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_EKARTE,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_EKARTE,"Cannt Get Message.")); 
          break;
      }
    }
    //電子カルテ初期フラグをOFFとする
    EkarteInitFlag = 0;

	}catch(e){
     Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+32);
	}
}

//************************************************
// Fn_WriteLog
//
// １．機能 
//      ログを出力する



// ２．戻り値
//      特になし



// ３．備考



//************************************************
function Fn_WriteLog(procMode, ctrlCommand){
	try{
		parent.LOGGER_PROC.location.replace("Logger_Proc.aspx?" + "Display=" + procMode + "&Command=" + ctrlCommand + "&LoginUserId=" + top.LoginUserId + "&OpenMode=" + parent.OpenMode);
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+33);
	}
}
//*****************************************************************************
// Fn_ButtonEnable(disp  0:不活性  1:活性
// １．機能
//     メニューボタンを活性・不活性化する



// ２．戻り値
//      なし


// ３．備考


//*****************************************************************************
function Fn_ButtonEnable(disp){
	try{
	  switch(disp){
	    case 0:     //不活性
  		  document.getElementById("TABLE_Next").style.visibility       = "hidden";
  		  document.getElementById("imgNext_Enable").style.visibility   = "hidden";
  		  document.getElementById("imgNext_Disable").style.visibility  = "visible";
	      document.getElementById("DivButtonOK_Value").style.color     = "gray";
	      break;
	    case 1:   //活性
  		  document.getElementById("TABLE_Next").style.visibility       = "visible";
  		  document.getElementById("imgNext_Enable").style.visibility   = "Visible";
  		  document.getElementById("imgNext_Disable").style.visibility  = "hidden";
	      document.getElementById("DivButtonOK_Value").style.color     = "black";
	      break;
	    default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+34);
	      break;
	  }
	}
	catch(e){
     Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+35);
	}
}
//*****************************************************************************
// Fn_SoftKeyBoardLoad
// １．機能
//      ソフトキーボード読み込み完了後にソフトキーボード表示
// ２．戻り値
//      なし


// ３．備考


//      なし


//*****************************************************************************
function Fn_SoftKeyBoardLoad(){
	try{
	  //ページ読み込み完了後ソフトキーボード表示
    document.getElementById("frmSoftKeyBoard").style.width  = "800px";
    document.getElementById("frmSoftKeyBoard").style.height = "313px";
		
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+36);
	}
}
//***************************************************************************
//  Fn_OnButton(tableNo:ボタン番号)		
//
//  1．機能
//      ボタン押下時処理


//	2．戻り値  
//		  なし


//  3．備考

//         更新履歴  担当        Ver.       内容
//  -----  --------  ----------  --------   -------------------------------
//  @date  06/10/02  S1神立      V1.4       フォーカス関連の処理を追加
//     
//***************************************************************************
function Fn_OnButton(tableNo){
  try{
		switch(tableNo){
    //============
    //電子カルテ連携ボタン
    //============
		case 1:  // ONCLICK
		  GetElectKarte()
			break;
		case 2:  // ONMOUSEDOWN
		  document.getElementById("imgElect").src = IMG_EKARTE_DOWN;
			break;
        case 3:  // ONMOUSEUP
            // 061012 神立 >>>
            if(document.getElementById("divElect").focused == true){
                document.getElementById("imgElect").src = IMG_EKARTE_FOCUS;
            }else{
                document.getElementById("imgElect").src = IMG_EKARTE_UP;
            }
            // <<<
            break;
        case 4:  // onfocus 061012 神立

            if(document.getElementById("divElect").pressed != true){
                document.getElementById("imgElect").src = IMG_EKARTE_FOCUS;
            }
            break;
        case 5:  // onblur  061012 神立

            if(document.getElementById("divElect").pressed != true){
                document.getElementById("imgElect").src = IMG_EKARTE_UP;
            }
            break;

    //============
    //確認ダイアログキャンセル
    //============
        case 50:   //ONCLICK
//          Fn_OnConfirmButton(0);
            switch(ConfirmFlag){
            // ＤＢ反映時/レセコン取得失敗時
            case 1:
            case 2:
                 Fn_OnConfirmButton(0);
                 break;
            // 確定後の検査の修正時
            default:
                 Public_CloseConfirm();
                 break;
            }
            break;
        case 51:   //ONMOUSEDOWN
            document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_DOWN;
            break;
        case 52:   //ONMOUSEUP
            // 061006 神立 >>>
            if(document.getElementById("DIV_ConfirmCancelButton").focused == true){
                document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_FOCUS;
            }else{
                document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_UP;
            }
            // <<<
            break;
        case 53 :  // ONFOCUS 061006 神立

            if(document.getElementById("DIV_ConfirmCancelButton").pressed != true){
                document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_FOCUS;
            }         
            break;
        case 54 :  // ONBLUR 061006 神立

            if(document.getElementById("DIV_ConfirmCancelButton").pressed != true){
                document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_UP;
            }
            break;

    //============
    //確認ダイアログスキップ
    //============
        case 55:   //ONCLICK
            Fn_OnConfirmButton(2);
			break;
        case 56:   //ONMOUSEDOWN
            document.getElementById("IMG_ConfirmSkipButton").src = IMG_CONF_SKIP_DOWN;
            break;
        case 57:   //ONMOUSEUP
            // 神立 >>>
            if(document.getElementById("DIV_ConfirmSkipButton").focused == true){
                document.getElementById("IMG_ConfirmSkipButton").src = IMG_CONF_SKIP_FOCUS;
            }else {
                document.getElementById("IMG_ConfirmSkipButton").src = IMG_CONF_SKIP_UP;
            }
            // <<<
            break;
        case 58 :  // ONFOCUS 061006 神立

            if(document.getElementById("DIV_ConfirmSkipButton").pressed != true){
                document.getElementById("IMG_ConfirmSkipButton").src = IMG_CONF_SKIP_FOCUS;
            }
            break;
        case 59 :  // ONBLUR 061006 神立

            if(document.getElementById("DIV_ConfirmSkipButton").pressed != true){
                document.getElementById("IMG_ConfirmSkipButton").src = IMG_CONF_SKIP_UP;
            }
            break;

    //============
    //確認ダイアログ再試行(OK)
    //============
        case 60:   //ONCLICK
            switch(ConfirmFlag){
                // ＤＢ反映時/レセコン取得失敗時
                case 1:
                case 2:
                    Fn_OnConfirmButton(1);
                    break;
                // 確定後の検査の修正時
        default:
          document.getElementById("TD_ConfirmTitle1").innerHTML = "";
          document.getElementById("TD_ConfirmTitle2").innerHTML = "";
//2014.05.23 TYS会田 DR直結-検査情報修正 MOD-ST
          //document.getElementById("TD_ConfirmText").innerText = ConfirmChangeString;
          document.getElementById("TD_ConfirmText").innerHTML = ConfirmChangeString;				  
//2014.05.23 TYS会田 DR直結-検査情報修正 MOD-ED
      		ConfirmFlag = 2;  //確認ダイアログのフラグ(DB反映)
          Public_Confirm();
          break;
      }
			break;
        case 61:   //ONMOUSEDOWN
      document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_DOWN;
	  	break;
        case 62:   //ONMOUSEUP
            // 061006 神立 >>>
            if(document.getElementById("DIV_ConfirmOkButton").focused == true){
                document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_FOCUS;
            }else{
                document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_UP;
            }
            // <<<
            break;
        case 63 :  // ONFOCUS 061006 神立

            if(document.getElementById("DIV_ConfirmOkButton").pressed != true){
                document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_FOCUS;
            }
            break;
        case 64 :  // ONBLUR 061006 神立

            if(document.getElementById("DIV_ConfirmOkButton").pressed != true){
                document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_UP;
            }
            break;

    //============
    //戻るボタン
    //============
		case 90:  // ONCLICK
      PatientIdBack();
			break;
		case 91:  // ONMOUSEDOWN
		  document.getElementById("imgBack").src = IMG_BACK_DOWN;
			break;
        case 92:  // ONMOUSEUP
            // 061002神立 >>>
            if(document.getElementById("divButtonNG").focused == true){
                document.getElementById("imgBack").src = IMG_BACK_FOCUS;
            }else{
                document.getElementById("imgBack").src = IMG_BACK_UP;
            }
            // <<<
            break;
        case 93:  // ONFOCUS 061002神立

            if(document.getElementById("divButtonNG").pressed != true){
                document.getElementById("imgBack").src = IMG_BACK_FOCUS;
            }
            break;
        case 94: // ONBLUR 061002神立

            if(document.getElementById("divButtonNG").pressed != true){
                document.getElementById("imgBack").src = IMG_BACK_UP;
            }
            break;

    //============
    //次へ(修正完了)ボタン
    //============
		case 95:// 次へボタン
      CheckPatientId();

    if((parent.OpenMode == OPEN_MODE_DIALOG) && 
      ('function' === typeof window.external.ValidateModifyPatientFlag)){       //UPDSTUDY_12B
        window.external.ValidateModifyPatientFlag(); //UPDSTUDY_12B
    }                                                //UPDSTUDY_12B

			break;
		case 96:  // ONMOUSEDOWN
		  document.getElementById("imgNext_Enable").src = IMG_NEXT_DOWN;
			break;
        case 97:  // ONMOUSEUP
          // 061002神立 >>>
          if(document.getElementById("TABLE_Next").focused == true){
            document.getElementById("imgNext_Enable").src = IMG_NEXT_FOCUS;
          }else{
            document.getElementById("imgNext_Enable").src = IMG_NEXT_UP;
          }
          // <<<
          break;
          
        case 98:  // ONFOCUS 061002神立 
          if(document.getElementById("TABLE_Next").pressed != true){
            document.getElementById("imgNext_Enable").src = IMG_NEXT_FOCUS;
          }
          break;
        
        case 99:  // ONBLUR 061002神立

          if(document.getElementById("TABLE_Next").pressed != true){
            document.getElementById("imgNext_Enable").src = IMG_NEXT_UP;
          }
          break;
          
    // 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応(ダイアログが使いづらいので、インタフェース見直し）-ST-
    //============
    // OKボタン
    //============
        case 201: //ONCLICK
      switch(DialogProcMode){
        case "":
          break;
        case DIALOGPROCMODE_STUDY_ERROR:
        case DIALOGPROCMODE_COMPLETED_ERROR:
          //終了処理
          ExclusiveModeStudyBack  = EXCLUSIVE_NOTHING;   // 戻るボタン押下時の排他処理を無効にする
          PatientIdBack();
          break;        
      }        
      Public_CloseError();
      DialogProcMode = "";
      break;
    // 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応(ダイアログが使いづらいので、インタフェース見直し）-ED-
		default:
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+37);
			return;
		}
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+38);
  }
}
//20050609(PVCS#350)ST
//***************************************************************************
//  Public_ErrorCheckCommand
//	(returnCode：操作権限チェック結果)	
//
//  1．機能
//      操作権限チェックで失敗した後の処理



//	2．戻り値  
//		  なし



//  3．備考



//***************************************************************************
function Public_ErrorCheckCommand(returnCode){
	try{
    //タイマ予約解除
		clearTimeout(UpdateTimeoutId);
    //処理中表示解除
    Public_CloseMessage();
		//------------------------------//
		// 操作権限チェック結果を調べる //
		//------------------------------//
		switch(returnCode){
			//ログインされていない 
			case CHECK_AUTHORITY_ERROR_NOT_LOGGED_IN:
				// 2006/11/08 PVCS#1962,#1666 H.SAITO -ST-
				switch(parent.OpenMode){
					case OPEN_MODE_CE:
						top.ExclusiveState    = 0;
						break;
					case OPEN_MODE_WINDOW:
						parent.ExclusiveState = 0;
						break;      
				}
				// 2006/11/08 PVCS#1962,#1666 H.SAITO -ED-
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_NOLOGIN,FILE_NAME,SPOT_CODE+39)
				return;
			//ログオフされた
			case CHECK_AUTHORITY_ERROR_LOGGED_OFF:
				// 2006/11/08 PVCS#1962,#1666 H.SAITO -ST-
				switch(parent.OpenMode){
					case OPEN_MODE_CE:
						top.ExclusiveState    = 0;
						break;
					case OPEN_MODE_WINDOW:
						parent.ExclusiveState = 0;
						break;      
				}
				// 2006/11/08 PVCS#1962,#1666 H.SAITO -ED-
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_LOGOFF,FILE_NAME,SPOT_CODE+40)
				return;			
			//ユーザIDがアプリケーション変数と異なっている
			case CHECK_AUTHORITY_ERROR_DIFFERENT_ID:
				// 2006/11/08 PVCS#1962,#1666 H.SAITO -ST-
				switch(parent.OpenMode){
					case OPEN_MODE_CE:
						top.ExclusiveState    = 0;
						break;
					case OPEN_MODE_WINDOW:
						parent.ExclusiveState = 0;
						break;      
				}
				// 2006/11/08 PVCS#1962,#1666 H.SAITO -ED-
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_DIFERENT,FILE_NAME,SPOT_CODE+41)
				return;
			//操作権限がない 
			case CHECK_AUTHORITY_ERROR_AUTHORITY:
    		Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MESSAGE_ID_FORBIDDEN,""), top.DispFrame.Public_GetLangMsgTitle2(MESSAGE_ID_FORBIDDEN,""),top.DispFrame.Public_GetLangMsgString(MESSAGE_ID_FORBIDDEN,"Cannt Get Message.")); 
				return;
			default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+42);
				return;
		}
	}catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+43);
	}	
}
//20050609(PVCS#350)EN
// 2005/07/22 029 H.SAITO PVCS:#954 患者IDの後方スペースを除去する
//***************************************************************************
//  Fn_GetRemoveStrCount(targetStr, searchChar)
//	(targetStr: 対象文字列, searchChar：検査文字, strPosition：検査位置)	
//
//  1．機能
//      文字列の後方に指定した文字がいくつあるかを数え、その文字を除いた後の文字列数を返します。


//	2．戻り値  
//		  文字列数
//  3．備考


//***************************************************************************
function Fn_GetRemoveStrCount(targetStr, searchChar, strPosition){
   try{
     // チェック対象文字であればひとつ前の文字を再検索
     if(targetStr.charAt(strPosition) == searchChar){
       // ただし、すでに先頭まで検索済みの場合は、終了。


       if(strPosition == 0){
         return 0;
       }
       return Fn_GetRemoveStrCount(targetStr, searchChar, strPosition - 1);
     }
     // チェック文字と異なったため終了



     else{
       return strPosition + 1;
     }
   }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+44);
   }	
}

//***************************************************************************
//  InitFocus()
//  1．機能 
//      患者ID入力画面のフォーカス初期位置をセットする。

//          ① 検査予約画面以外は患者ID入力にフォーカス
//          ② 検査予約画面で 患者IDが入力されている時は「次へ」にフォーカス
//          ③ 患者IDがブランクで電カルが有効・初期取得無効の時は
//             電カル連携ボタンにフォーカス
//          ④ その他は患者ID入力にフォーカス
//  2．戻り値   なし

//  3．備考     06/11/02    S1神立  V1.4    新規作成
//              06/12/20    S1神立  V1.4    PVCS2052対応

//  
//***************************************************************************
function InitFocus(){
    try{
        var txtBox      = document.getElementById("txtPatientId");
        var nextBtn     = document.getElementById("TABLE_Next");
        var kalteBtn    = document.getElementById("divElect");
        var kalteBtnImg = document.getElementById("imgElect");

        if(ViewStatus != VIEW_MODE_INPUT){
            txtBox.focus();     // ①
        }
        else if(txtBox.value != ""){
            nextBtn.focus();    // ②
            txtBox.style.color           = NONACTIVE_FORE_COLOR;
            txtBox.style.backgroundColor = NONACTIVE_BACK_COLOR;
            gSelected = null ;
        }else if(kalteBtnImg.style.visibility == "visible"
               && ElectKarteInitialFlag == FLAG_ELECTKARTE_NOGET){
            kalteBtn.focus();   // ③
            txtBox.style.color           = NONACTIVE_FORE_COLOR;
            txtBox.style.backgroundColor = NONACTIVE_BACK_COLOR;
            gSelected = null ;
        }else{
            txtBox.focus();     // ④
        }
    }catch(exception){
        WriteIISLog(FILE_NAME, SPOT_CODE + 45);
    }
}

// 2009/05/15 園木 ADD-ST
//***************************************************************************
//  ErrorMWMOnlineDialog()		
//
//  1．機能
//      エラー選択ダイアログのボタン表示
//	2．戻り値  
//		  なし
//  3．備考
//     
//***************************************************************************
function ErrorMWMOnlineDialog(){
	try{
    //タイマ予約解除
    clearTimeout(UpdateTimeoutId);

    document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_MWMONLINE,"");
    document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_MWMONLINE,"");
    document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_ERROR_MWMONLINE,"Cannt Get Message.");
		// エラー確認ボックス
		document.getElementById("DIV_ConfirmOkText").innerText		= ErrorConfirmOkString;
		document.getElementById("DIV_ConfirmCancelText").innerText	= ErrorConfirmCancelString;
		document.getElementById("DIV_ConfirmSkipText").innerText	= ErrorConfirmSkipString;
		ConfirmFlag = 1;  //確認ダイアログのフラグ(MWM患者情報連携)
		Public_ErrorConfirm();

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+46);
		return;
	}
}
// 2009/05/15 園木 ADD-ED

//***************************************************************************
//  FocusTextbox()
//  1．機能 
//      患者ID入力テキストボックスにフォーカスを当てる

//  2．戻り値   なし

//  3．備考     06/11/06    S1神立  V1.4    新規作成
//  
//***************************************************************************
function FocusTextbox(){
    document.getElementById("txtPatientId").focus();
}
