/****************************************************************************

  @file EditPatientDetail_View.js

  @brief EditPatientDetail_Viewのクライアントスクリプト

  @author YSK畑 
        SpotCode MAX 35

  Copyright(c) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/16  YSK畑       V1.0       新規作成
  @date  06/04/06  YSK齋藤     V1.2       生年月日エラーチェック対応(PVCS#1730)
  @date  06/10/13  S1神立      V1.4       操作性向上(キーボード操作)
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  06/11/08  YSK齋藤     V1.4　     PVCS#1962,#1666対応 
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応 
  @date  07/02/08  S1神立      V1.4       PVCS2124
  @date  07/04/25  HSK山本     V2.0       PVCS2137対応 
  @date  07/05/14  HSK山本     V2.0       PVCS2204対応 
  @date  07/05/14  HSK山本     V2.0       HSK内部B#403対応 
  @date  07/05/15  HSK山本     V2.0       PVCS2227対応 
  @date  07/05/30  HSK山本     V2.0       PVCS2275対応 
  @date  07/06/07  HSK古場     V2.0       PVCS#2281対応 
  @date  09/10/20  HSK西山     V5.1       PVCS#3415対応 
  @date  09/12/01  FF 星野     V1.1(B)    1.1(B)対応 
  @date  09/12/01  FFS黒田     V1.1(B)    1.1(B)対応 
  @date  09/12/26  TYS松岡     V1.1(B)    CQ#61対応
  @date  10/02/01  FF 西川     V1.2(B)    検査修正を通知 UPDSTUDY_12B
  @date  10/04/19  TYS園木     V2.0(B)    責任者マルチバイト対応
  @date  10/04/19  FF 星野     V2.0(B)    CQ#218対応
  @date  10/06/01  FF 星野     V2.0(B)    CQ#219対応
  @date  10/11/22  FFS生田     V2.0(B)    30501エラー改善対応
  @date  11/02/22  NDD北村     V2.1(B)    CQ#557-559 避妊処置不具合対応
  @date  12/02/02  FFS生田     V2.2(B)HF0002 CQ#1287対応
  @date  12/10/09  FF高松      V2.3(B)    検査情報修正の制限時間変更
  @date  13/02/15  NDD北村     V2.3(B)HF  CQ#1650対応
  @date  14/05/23  TYS会田     V3.0(B)    DR直結-検査情報修正

  /****************************************************************************/
//[定数]
var PROC_MODE_EDIT           = "EDITPATIENTDETAIL_VIEW";
var PROC_MODE_CHANGE         = "CHANGEPATIENTDETAIL_VIEW";
var COMMAND_MODE_CANCEL      = "CANCEL";
var COMMAND_MODE_UPDATE      = "UPDATE";
var VIEW_MODE_INPUT          = "INPUTDETAIL";
var VIEW_MODE_EDIT           = "EDITDETAIL";
var VIEW_MODE_CHANGE         = "CHANGEDETAIL";
// 操作ログ出力コマンド 
var CTRL_UPDATE              = "Update";            // 修正完了 
// オープンモード 
var OPEN_MODE_CE     = 0;				// CEで開かれた場合 
var OPEN_MODE_WINDOW = 1;				// ブラウザで開かれた場合 
var OPEN_MODE_DIALOG = 2;				// ダイアログで開かれた場合 
// ソフトキーボードフラグ
var FLAG_SOFTKEYBOARD_USE          = 1;				// ソフトキーボード使用
var FLAG_SOFTKEYBOARD_NOUSE        = 0;				// ソフトキーボード使用不可 
// 検査取得フラグ
var FLAG_STUDY_GETDATA       = 1;   
var FLAG_STUDY_NOGETDATA     = 0;
// 日付フォーマット 
var FORMAT_JAPANESEDATE      = 0;				// JapaneseDate(S47.07.15)
var FORMAT_ANSILONGDATE      = 1;				// ANSI(1972.JUL.15)
var FORMAT_ANSISHORTDATE     = 2;				// ANSI(1972.07.15)
var FORMAT_AMERICANLONGDATE  = 3;				// American(JUL.15.1972)
var FORMAT_AMERICANSHORTDATE = 4;				// American(07.15.1972)
var FORMAT_EUROPEANLONGDATE  = 5;				// Euro(15.JUL.1972)
var FORMAT_EUROPEANSHORTDATE = 6;				// Euro(15.07.1972)
// 日付フォーマット記入例 
// 2005/07/01 017 H.SAITO PVCS#952 月を変更
//var FORMAT_EXAMPLE_JAPANESEDATE      = "47.07.15";				// JapaneseDate(47.07.15)
//var FORMAT_EXAMPLE_JAPANESEDATE_ERA  = "S47.07.15";				// JapaneseDate(S47.07.15)
//var FORMAT_EXAMPLE_ANSILONGDATE      = "1972.JUL.15";			// ANSI(1972.JUL.15)
//var FORMAT_EXAMPLE_ANSISHORTDATE     = "1972.07.15";			// ANSI(1972.07.15)
//var FORMAT_EXAMPLE_AMERICANLONGDATE  = "JUL.15.1972";			// American(JUL.15.1972)
//var FORMAT_EXAMPLE_AMERICANSHORTDATE = "07.15.1972";			// American(07.15.1972)
//var FORMAT_EXAMPLE_EUROPEANLONGDATE  = "15.JUL.1972";			// Euro(15.JUL.1972)
//var FORMAT_EXAMPLE_EUROPEANSHORTDATE = "15.07.1972";			// Euro(15.07.1972)
var FORMAT_EXAMPLE_JAPANESEDATE      = "47.08.15";				// JapaneseDate(47.08.15)
var FORMAT_EXAMPLE_JAPANESEDATE_ERA  = "S47.08.15";				// JapaneseDate(S47.08.15)
var FORMAT_EXAMPLE_ANSILONGDATE      = "1972.AUG.15";			// ANSI(1972.AUG.15)
var FORMAT_EXAMPLE_ANSISHORTDATE     = "1972.08.15";			// ANSI(1972.08.15)
var FORMAT_EXAMPLE_AMERICANLONGDATE  = "AUG.15.1972";			// American(AUG.15.1972)
var FORMAT_EXAMPLE_AMERICANSHORTDATE = "08.15.1972";			// American(08.15.1972)
var FORMAT_EXAMPLE_EUROPEANLONGDATE  = "15.AUG.1972";			// Euro(15.AUG.1972)
var FORMAT_EXAMPLE_EUROPEANSHORTDATE = "15.08.1972";			// Euro(15.08.1972)

// マルチバイトフラグ 
var REGISTRY_MULTIBYTE  = 1;					// マルチバイト 
var REGISTRY_SINGLEBYTE = 0;					// シングルバイト 
// 漢字フラグ 
var FLAG_NOKANJI        = 0;					// 漢字入力不可
var FLAG_KANJI          = 1;					// 漢字入力可
var FLAG_NOKANJI_MINI   = 2;					// 漢字入力不可、不活性
// 漢字フラグ 
var FLAG_DISPKANJI_VISIBLE  = 0;				// 漢字フィールド表示
var FLAG_DISPKANJI_HIDDEN   = 1;				// 漢字フィールド非表示
var FLAG_DISPKANJI_DISABLED = 2;				// 漢字フィールド不活性
// 新規患者フラグ
var FLAG_PATIENT_NEW	 = 0;					// 新規患者 
var FLAG_PATIENT_EXIT	 = 1;					// 既存患者 
// 患者編集フラグ
var FLAG_PATIENT_NOEDIT = 0;					// 未編集 
var FLAG_PATIENT_EDIT	= 1;					// 編集 
// 性別 
var SEX_MALE            = 1;					// 男性
var SEX_FEMALE          = 2;					// 女性
var SEX_OTHER           = 3;					// その他 
// 和暦 
var ERA_MEJI      = "M";						// 明治
var ERA_TAISHO    = "T";						// 大正
var ERA_SHOWA     = "S";						// 昭和 
var ERA_HEISEI    = "H";						// 平成 
// 和暦ボタン表示フラグ 
var ERABUTTON_DISPLAY         = 1;				// 和暦ボタン表示可
var ERABUTTON_NODISPLAY       = 0;				// 和暦ボタン表示不可
// 敬称表示フラグ 
var FLAG_HONORIFIC_USE        = 1;					// 敬称表示可
var FLAG_HONORIFIC_NOUSE      = 0;					// 敬称表示不可
// クライアント筐体モード 
var CLIENT_MODE_MINI          = 1;
var CLIENT_MODE_PC            = 0;
// エラーモード 
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var USER_NOTHING_ERROR   = "USER_NOTHING_ERROR";	//ユーザチェックエラー
var SPOT_CODE = 0;                   //スポットコード 
var FILE_NAME = "EditPatientDetail_View.js"  //ファイル名 
var MESSAGE_ID = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS = 30501;              //メッセージID 
//2010/11/22 30501エラー改善対応 ADD ST
var MESSAGE_ID_ACCESS_EXCLUSIVE = 40505;    //メッセージID
var MESSAGE_ID_ACCESS_EDITPATIENTDETAIL = 40506;    //メッセージID
//2010/11/22 30501エラー改善対応 ADD ED
//警告メッセージID
// 2005/07/20 013 H.SAITO #903 メッセージレベル変更(31512～31526→34512～34526)
//var MSG_WARNING_NAME_PROHIBITION      = 31516;
//var MSG_WARNING_NAME_OVER             = 31517;
//var MSG_WARNING_KANJINAME_PROHIBITION = 31518;
//var MSG_WARNING_KANJINAME_OVER        = 31519;
//var MSG_WARNING_BIRTHDAY              = 31520;
//var MSG_CHANGE_VERIFIED               = 31526; // 確定した検査に対する修正確認 


var MSG_WARNING_NAME_PROHIBITION      = 34516;
var MSG_WARNING_NAME_OVER             = 34517;
var MSG_WARNING_KANJINAME_PROHIBITION = 34518;
var MSG_WARNING_KANJINAME_OVER        = 34519;
var MSG_WARNING_BIRTHDAY              = 34520;
var MSG_CHANGE_VERIFIED               = 34526; // 確定した検査に対する修正確認 

//2009.12.01 V1.1(B)対応 FF星野 ADD-ST
var MSG_WARNING_SIZE_CHECK            = 34529;
var MSG_WARNING_WEIGHT_CHECK          = 34530;
var MSG_WARNING_SIZE_NEGATIVE_CHECK   = 34531;
var MSG_WARNING_WEIGHT_NEGATIVE_CHECK       = 34532;
var MSG_WARNING_RESPONSIBLE_PERSON_PROHIBITION = 34533;
var MSG_WARNING_RESPONSIBLE_ORGANIZATION_PROHIBITION = 34534;
var MSG_WARNING_SPECIES_DESCRIPTION_PROHIBITION = 34535;
var MSG_WARNING_BREED_DESCRIPTION_PROHIBITION = 34536;
var MSG_WARNING_SPECIES_EMPTY = 34537;
//2009.12.01 V1.1(B)対応 FF星野 ADD-ED
//2010.04.19 責任者マルチバイト対応 TYS園木 ADD-ST
var MSG_WARNING_RESPONSIBLE_PERSON_IDOGRAPHIC_PROHIBITION = 34541;
//2010.04.19 責任者マルチバイト対応 TYS園木 ADD-ED

//20050609(PVCS#350)ST
var MESSAGE_ID_NOLOGIN   = 31502;              //メッセージID 
var MESSAGE_ID_LOGOFF    = 31503;              //メッセージID 
var MESSAGE_ID_DIFERENT  = 31504;              //メッセージID 
var MESSAGE_ID_FORBIDDEN = 31505;
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
var MSG_ERROR_EXCLUSIVE_STUDY         = 31506; //他筐体が検査を実施中
var MSG_ERROR_COMPLETED               = 31540; //確認/確定済みの検査です 
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-
// 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ST-
var MSG_ERROR_NODATA     = 31511;
// 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ED-
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
var DIALOGPROCMODE_STUDY_ERROR        = "DIALOGPROCMODE_STUDY_ERROR";
var DIALOGPROCMODE_COMPLETED_ERROR    = "DIALOGPROCMODE_COMPLETED_ERROR";
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-

// 操作権限チェック 戻り値
var RETURN_OK														=  0; //正常終了 
var CHECK_AUTHORITY_ERROR_NOT_LOGGED_IN	= -1; //ログインされていない 
var CHECK_AUTHORITY_ERROR_LOGGED_OFF		= -2; //ログオフされた
var CHECK_AUTHORITY_ERROR_DIFFERENT_ID	= -3; //ユーザIDがアプリケーション変数と異なっている
var CHECK_AUTHORITY_ERROR_AUTHORITY			= -4; //操作権限がない 
//20050609(PVCS#350)EN


//070514 HSK山本 HSK B#403 UPDATE-ST
// 更新処理タイマ値
//var UPDATE_TIMEOUT            = 10000;
var UPDATE_TIMEOUT            = 600000; // FF高松 V2.3(B) 60秒から600秒に変更
//070514 HSK山本 HSK B#403 UPDATE-ED
// 排他制御スイッチ
var EXCLUSIVE_NOTHING         = -1;       // 排他制御(何もしない)
var EXCLUSIVE_DELL            = 0;        // 排他制御(開放)
var EXCLUSIVE_SET             = 1;        // 排他制御(設定)
var EXCLUSIVE_CHECK           = 2;        // 排他制御(チェック)
//定数定義============================
// 画像パス
var IMG_BACK_DOWN      = "../Bmp/cmOvalAPaleLBtnD.gif";
var IMG_BACK_UP        = "../Bmp/cmOvalAPaleLBtnU.gif";
var IMG_BACK_DISABLE   = "../Bmp/cmOvalAPaleLBtnX.gif";
var IMG_BACK_FOCUS     = "../Bmp/cmOvalAPaleLBtnF.gif";    // 061002 神立 
var IMG_NEXT_DOWN      = "../Bmp/cmCirBGreenBtnD.gif";
var IMG_NEXT_UP        = "../Bmp/cmCirBGreenBtnU.gif";
var IMG_NEXT_DISABLE   = "../Bmp/cmCirBGreenBtnX.gif";
var IMG_NEXT_FOCUS     = "../Bmp/cmCirBGreenBtnF.gif";     // 061002 神立 
var IMG_CONF_NG_DOWN   = "../Bmp/cmOvalAPaleLBtnD.gif";
var IMG_CONF_NG_UP     = "../Bmp/cmOvalAPaleLBtnU.gif";
var IMG_CONF_NG_FOCUS  = "../Bmp/cmOvalAPaleLBtnF.gif";    // 061006 神立 
var IMG_CONF_OK_DOWN   = "../Bmp/cmOvalAGreenLBtnD.gif";
var IMG_CONF_OK_UP     = "../Bmp/cmOvalAGreenLBtnU.gif";
var IMG_CONF_OK_FOCUS  = "../Bmp/cmOvalAGreenLBtnF.gif";   // 061006 神立 
// 画像パス
var IMGSEX_BUTTON_DOWN      = "../Bmp/cmSquare1BtnD.gif";
var IMGSEX_BUTTON_UP        = "../Bmp/cmSquare1BtnU.gif";
var IMGSEX_BUTTON_DOWN_FOCUS= "../Bmp/cmSquare1BtnDF.gif"; // 061002 神立 
var IMGSEX_BUTTON_UP_FOCUS  = "../Bmp/cmSquare1BtnUF.gif"; // 061002 神立 
var IMGERA_BUTTON_DOWN      = "../Bmp/cmSquare1BtnD.gif";
var IMGERA_BUTTON_UP        = "../Bmp/cmSquare1BtnU.gif";
var IMGERA_BUTTON_DOWN_FOCUS= "../Bmp/cmSquare1BtnDF.gif"; // 061002 神立 
var IMGERA_BUTTON_UP_FOCUS  = "../Bmp/cmSquare1BtnUF.gif"; // 061002 神立
var IMGPATIENT_BUTTON_DOWN  = "../Bmp/cmObtainPatientInfo1BtnD.gif";//2009.12.22 V1.1(B)対応 FF星野 ADD
var IMGPATIENT_BUTTON_UP    = "../Bmp/cmObtainPatientInfo1BtnU.gif";//2009.12.22 V1.1(B)対応 FF星野 ADD

// 検査ステータス
var STATE_VERIFIED            = "VERIFIED";     // 検査ステータス(確定)
// 2005/07/21 003 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
//// 2005/06/29 002 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
//var COOKIE_NAME_STUDY2        = "StudyLock";	  // 検査排他中クッキー名 
//#1346 2005/09/22--ST
var CON_PURPOSE = 0;	// 管理目的 
//#1346 2005/09/22--EN

//==================================== 
//変数仮定義===========================

var g_PSex			= SEX_OTHER;
var g_Era			= "";
var g_EraNo			= -1;
var ClientMode		= CLIENT_MODE_MINI;				// 0:クライアント筐体 1:確認モニタ
var setKanjiDisp	= FLAG_DISPKANJI_HIDDEN;		// 0:表示 1:非表示 2:不活性
var UpdateTimeoutId = null;							// 更新処理タイムアウトＩＤ
var ErrorCode       = 0;							// 入力チェックエラーコード 0:なし 1:ｶﾝｼﾞｬﾒｲ 2:漢字患者名 3:生年月日
//=====================================
// 2013/02/15 NDD北村 CQ#1650 ADD Start
var PROC_MODE = "";
// 2013/02/15 NDD北村 CQ#1650 ADD End
var ProcMode;                              // 現在の処理モード 
var ExclusiveModeStudy;                    // 画面ＯＰＥＮ時の排他処理 
var ExclusiveModeStudyEnd;                 // 画面終了時の排他処理 
var ExclusiveModeStudyBack;                // 戻るボタン押下時の排他処理 
var ExclusiveModeStudyNext;                // 次へ/修正完了/検索ボタン押下時の排他処理 
var ConfirmFlag = 0;                       // 確認ダイアログフラグ

var EditPatientName      = "";            //ｶﾝｼﾞｬﾒｲ(患者情報チェック後)
var EditPatientKanjiName = "";            //漢字患者名(患者情報チェック後)
var EditPatientSex       = SEX_OTHER;     //患者性別(患者情報チェック後)
var EditPatientBirth     = "";            //患者生年月日(患者情報チェック後)
var EditPatientAge       = "";            //患者年齢(患者情報チェック後)

//2009.12.01 V1.1(B)対応 FF星野 ADD-ST
//動物判定用
var VETERINARY_FLAG = 1;
// 性別
var SEX_NEUTRED_ALTERED            = 1;					// 去勢有り
var SEX_NEUTRED_UNALTERED          = 2;					// 去勢無し
// 2011/02/22 NDD北村 CQ#557-559 UPD ST
//var SEX_NEUTRED_UNKNOWN            = 3;					// 不明
// 2011/02/22 NDD北村 CQ#557-559 UPD
var SEX_NEUTRED_UNKNOWN            = 0;					// 不明
// 2011/02/22 NDD北村 CQ#557-559 UPD ED
var g_PNeutredSex = SEX_NEUTRED_UNKNOWN;

//患者情報チェック後用の変数
var EditPatientComment="";
var EditPatientsSize ="";
var EditPatientsWeight ="";
var EditNeuteredSex ="";
var EditSpeciesDescription ="";
var EditBreedDescription ="";
var EditResponsiblePerson ="";
var EditResponsibleOrganization ="";
// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ------------------------------------
var EditResponsiblePersonIdoGraphic ="";
// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ------------------------------------

// 2009/12/26 ADD TYS松岡 CQ#61対応 Start ------------------------------------
var SearchMode = "";
// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ------------------------------------

//2009.12.01 V1.1(B)対応 FF星野 ADD-ED
//*****************************************************************************
// Fn_InitPage
//
// １．機能
//     ・ページロード時の処理 
//     ・ボタン名の初期表示を行う
//
// ２．戻り値
//　　  なし 
// ３．備考 
//*****************************************************************************
function Fn_InitPage(){
  try{
        //画面遷移開始通知設定

        SetViewMovingNotification(ViewMovingNotification);
        //画面遷移終了通知設定

        SetViewMovedNotification(ViewMovedNotification);

		//文字列設定 
		document.getElementById("DivPatientName_Value").innerText      = LablePatientName;
		document.getElementById("DivPatientKanjiName_Value").innerText = LabelPatientKanjiName;
		document.getElementById("DivPatientSex_Value").innerText       = LabelPatientSex;
		document.getElementById("DivPatientBirth_Value").innerText     = LabelPatientBirth;

		document.getElementById("DivSexMale_Value").innerText   = LabelSexMale;
		document.getElementById("DivSexFemale_Value").innerText = LabelSexFemale;
		document.getElementById("DivSexOther_Value").innerText  = LabelSexOther;


		document.getElementById("DivButtonNG_Value").innerText = ButtonBack;
		document.getElementById("DivButtonOK_Value").innerText = ButtonNext;

		// 確認ボックス
		document.getElementById("DIV_ConfirmOkText").innerText		= ConfirmOkString;
		document.getElementById("DIV_ConfirmCancelText").innerText	= ConfirmCancelString;

		// 和暦ボタン
		document.getElementById("DivEraMeiji_Value").innerText  = LabelEraMeiji;
		document.getElementById("DivEraTaisho_Value").innerText = LabelEraTaisho;
		document.getElementById("DivEraShowa_Value").innerText  = LabelEraShowa;
		document.getElementById("DivEraHeisei_Value").innerText = LabelEraHeisei;

		// 敬称
		document.getElementById("DivNameHonorific").innerText  = HonorificTitle;
		document.getElementById("DivKanjiHonorific").innerText = HonorificTitle;
		// 敬称表示
		if(HonorificFlag == FLAG_HONORIFIC_USE ){
			document.getElementById("DivNameHonorific").style.visibility  = "visible";
			document.getElementById("DivKanjiHonorific").style.visibility = "visible";
		}else{
			document.getElementById("DivNameHonorific").style.visibility  = "hidden";
			document.getElementById("DivKanjiHonorific").style.visibility = "hidden";
		}

		// 生年月日の記入例を表示
		switch (DateFormat){
			case FORMAT_JAPANESEDATE:
				if(EraDisplayFlag == ERABUTTON_DISPLAY){
					exBirth = exBirth + FORMAT_EXAMPLE_JAPANESEDATE;
				}else{
					exBirth = exBirth + FORMAT_EXAMPLE_JAPANESEDATE_ERA;
				}
				break;
			case FORMAT_ANSILONGDATE:
				exBirth = exBirth + FORMAT_EXAMPLE_ANSILONGDATE;
				break;
			case FORMAT_ANSISHORTDATE:
				exBirth = exBirth + FORMAT_EXAMPLE_ANSISHORTDATE;
				break;
			case FORMAT_AMERICANLONGDATE:
				exBirth = exBirth + FORMAT_EXAMPLE_AMERICANLONGDATE;
				break;
			case FORMAT_AMERICANSHORTDATE:
				exBirth = exBirth + FORMAT_EXAMPLE_AMERICANSHORTDATE;
				break;
			case FORMAT_EUROPEANLONGDATE:
				exBirth = exBirth + FORMAT_EXAMPLE_EUROPEANLONGDATE;
				break;
			case FORMAT_EUROPEANSHORTDATE:
				exBirth = exBirth + FORMAT_EXAMPLE_EUROPEANSHORTDATE;
				break;
			default:
				DateFormat = FORMAT_ANSISHORTDATE;
				exBirth = exBirth + FORMAT_EXAMPLE_ANSISHORTDATE;
				break;
		}
		document.getElementById("divExample").innerText = exBirth;
	//2009.12.01 V1.1(B)対応 FF星野 ADD-ST
	document.getElementById("DivPatientComment_Value").innerText		= LabelPatientComment;
	document.getElementById("DivPatientsSize_Value").innerText			= LabelPatientsSize;
	document.getElementById("DivPatientsWeight_Value").innerText		= LabelPatientsWeight;
	document.getElementById("DivPatientSpeciesDescription_Value").innerText	= LabelPatientSpeciesDescription;
	document.getElementById("DivPatientBreedDescription_Value").innerText   = LabelPatientBreedDescription;
	document.getElementById("DivResponsiblePerson_Value").innerText			= LabelResponsiblePerson;
	document.getElementById("DivResponsibleOrganization").innerText			= LabelResponsibleOrganization;
	document.getElementById("DivPatientsSizeUnit_Value").innerText		= LabelUnitSize;
	document.getElementById("DivPatientsWeightUnit_Value").innerText    = LabelUnitWeight;
	
	document.getElementById("DivSexNeutred_Value").innerText			= LabelSexNeutred;
	document.getElementById("DivSexNeutredAltered_Value").innerText		= LabelSexNeutredAltered;
	document.getElementById("DivSexNeutredUnAltered_Value").innerText	= LabelSexNeutredUnAltered;
	document.getElementById("DivSexNeutredUnknown_Value").innerText		= LabelSexNeutredUnknown;
	//2009.12.01 V1.1(B)対応 FF星野 ADD-ED

    //フォント名,フォントサイズの設定 
    document.getElementById("BODY").style.fontFamily                = FONT_NAME;
    // 2005/06/23 002 H.SAITO デザイン変更対応(フォントサイズ)
    //document.getElementById("BODY").style.fontSize                  = FONT_SIZE + "px";
    document.getElementById("txtPatientName").style.fontFamily      = FONT_NAME;
    document.getElementById("txtPatientKanjiName").style.fontFamily = FONT_NAME;
    document.getElementById("txtPatientBirth").style.fontFamily     = FONT_NAME;

	//2009.12.01 V1.1(B)対応 FF星野 ADD-ST
    document.getElementById("txtPatientComment").style.fontFamily   = FONT_NAME;
    document.getElementById("txtPatientsSize").style.fontFamily		= FONT_NAME;
    document.getElementById("txtPatientsWeight").style.fontFamily   = FONT_NAME;
    document.getElementById("txtPatientSpeciesDescription").style.fontFamily= FONT_NAME;
    document.getElementById("txtPatientBreedDescription").style.fontFamily	= FONT_NAME;
    document.getElementById("txtResponsiblePerson").style.fontFamily		= FONT_NAME;
    document.getElementById("txtResponsibleOrganization").style.fontFamily  = FONT_NAME;
	//2009.12.01 V1.1(B)対応 FF星野 ADD-ED


    // 2005/06/23 031 H.SAITO デザイン変更対応(フォントサイズ)
    document.getElementById("txtPatientName").style.fontSize        = FONT_SIZE_INPUTBOX;
    document.getElementById("txtPatientKanjiName").style.fontSize   = FONT_SIZE_INPUTBOX;
    document.getElementById("txtPatientBirth").style.fontSize       = FONT_SIZE_INPUTBOX;
    document.getElementById("DivPatientName_Value").style.fontSize  = FONT_SIZE_CAPTION;
    document.getElementById("DivPatientKanjiName_Value").style.fontSize  = FONT_SIZE_CAPTION;
    document.getElementById("DivPatientSex_Value").style.fontSize   = FONT_SIZE_CAPTION;
    document.getElementById("DivPatientBirth_Value").style.fontSize = FONT_SIZE_CAPTION;
    document.getElementById("DivSexMale_Value").style.fontSize      = FONT_SIZE_BUTTON;
    document.getElementById("DivSexFemale_Value").style.fontSize    = FONT_SIZE_BUTTON;
    document.getElementById("DivSexOther_Value").style.fontSize     = FONT_SIZE_BUTTON;
    document.getElementById("DivEraMeiji_Value").style.fontSize     = FONT_SIZE_BUTTON;
    document.getElementById("DivEraTaisho_Value").style.fontSize    = FONT_SIZE_BUTTON;
    document.getElementById("DivEraShowa_Value").style.fontSize     = FONT_SIZE_BUTTON;
    document.getElementById("DivEraHeisei_Value").style.fontSize    = FONT_SIZE_BUTTON;
    document.getElementById("DivNameHonorific").style.fontSize      = FONT_SIZE_CAPTION_SIDE;
    document.getElementById("DivKanjiHonorific").style.fontSize     = FONT_SIZE_CAPTION_SIDE;
    document.getElementById("divExample").style.fontSize            = FONT_SIZE_CAPTION_SIDE;
    document.getElementById("DivButtonNG_Value").style.fontSize     = FONT_SIZE_BUTTON;
    document.getElementById("DivButtonOK_Value").style.fontSize     = FONT_SIZE_BUTTON;
    document.getElementById("DIV_ConfirmCancelText").style.fontSize = FONT_SIZE_BUTTON;
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
    //2009.12.01 V1.1(B)対応 FF星野 ADD-ST
    document.getElementById("DivPatientComment_Value").style.fontSize  = FONT_SIZE_CAPTION;
	document.getElementById("DivPatientsSize_Value").style.fontSize  = FONT_SIZE_CAPTION;
	document.getElementById("DivPatientsWeight_Value").style.fontSize  = FONT_SIZE_CAPTION;
	document.getElementById("DivPatientSpeciesDescription_Value").style.fontSize  = FONT_SIZE_CAPTION;
	document.getElementById("DivPatientBreedDescription_Value").style.fontSize  = FONT_SIZE_CAPTION;
	document.getElementById("DivResponsiblePerson_Value").style.fontSize  = FONT_SIZE_CAPTION;
	document.getElementById("DivResponsibleOrganization").style.fontSize  = FONT_SIZE_CAPTION;

	document.getElementById("DivPatientsSizeUnit_Value").style.fontSize  = FONT_SIZE_CAPTION;
	document.getElementById("DivPatientsWeightUnit_Value").style.fontSize  = FONT_SIZE_CAPTION;

    document.getElementById("DivSexNeutred_Value").style.fontSize  = FONT_SIZE_BUTTON;
	document.getElementById("DivSexNeutredAltered_Value").style.fontSize  = FONT_SIZE_BUTTON;
	document.getElementById("DivSexNeutredUnAltered_Value").style.fontSize  = FONT_SIZE_BUTTON;
	document.getElementById("DivSexNeutredUnknown_Value").style.fontSize  = FONT_SIZE_BUTTON;
	
	document.getElementById("txtPatientComment").style.fontSize  = FONT_SIZE_CAPTION;
    document.getElementById("txtPatientsSize").style.fontSize  = FONT_SIZE_INPUTBOX;
    document.getElementById("txtPatientsWeight").style.fontSize  = FONT_SIZE_INPUTBOX;
    document.getElementById("txtPatientSpeciesDescription").style.fontSize  = FONT_SIZE_INPUTBOX;
    document.getElementById("txtPatientBreedDescription").style.fontSize  = FONT_SIZE_INPUTBOX;
    document.getElementById("txtResponsiblePerson").style.fontSize  = FONT_SIZE_INPUTBOX;
    document.getElementById("txtResponsibleOrganization").style.fontSize  = FONT_SIZE_INPUTBOX;
	//2009.12.01 V1.1(B)対応 FF星野 ADD-ED
    //2010.05.25 CQ#218対応 FF星野 ADD-ST 
    if(parent.OpenMode == OPEN_MODE_CE)
    {

		document.getElementById("DivPatientComment_Value").style.visibility = "hidden";
		document.getElementById("DivPatientsSize_Value").style.visibility = "hidden";
		document.getElementById("DivPatientsWeight_Value").style.visibility = "hidden";
		document.getElementById("DivPatientSpeciesDescription_Value").style.visibility = "hidden";
		document.getElementById("DivPatientBreedDescription_Value").style.visibility = "hidden";
		document.getElementById("DivResponsiblePerson_Value").style.visibility = "hidden";
		document.getElementById("DivResponsibleOrganization").style.visibility = "hidden";
		document.getElementById("DivPatientsSizeUnit_Value").style.visibility = "hidden";
		document.getElementById("DivPatientsWeightUnit_Value").style.visibility = "hidden";

		document.getElementById("DivSexNeutred_Value").style.visibility = "hidden";
		document.getElementById("DivSexNeutredAltered_Value").style.visibility = "hidden";
		document.getElementById("DivSexNeutredUnAltered_Value").style.visibility = "hidden";
		document.getElementById("DivSexNeutredUnknown_Value").style.visibility = "hidden";
		
		document.getElementById("ImgSexNeutredAltered_Value").style.visibility = "hidden";
		document.getElementById("ImgSexNeutredUnAltered_Value").style.visibility = "hidden";
		document.getElementById("ImgSexNeutredUnknown_Value").style.visibility = "hidden";

		document.getElementById("txtPatientComment").style.visibility = "hidden";
		document.getElementById("txtPatientsSize").style.visibility = "hidden";
		document.getElementById("txtPatientsWeight").style.visibility = "hidden";
		document.getElementById("txtPatientSpeciesDescription").style.visibility = "hidden";
		document.getElementById("txtPatientBreedDescription").style.visibility = "hidden";
		document.getElementById("txtResponsiblePerson").style.visibility = "hidden";
		document.getElementById("txtResponsibleOrganization").style.visibility = "hidden";
    }
    //2010.05.25 CQ#218対応 FF星野 ADD-ED 
    //フィルタ解除
		Public_CloseMessage();
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
  }
}
//*****************************************************************************
// Public_Init
//
// １．機能
//     画面を表示する
//
// ２．戻り値
//　　  なし 
// ３．備考 
//     編集時,変更時に呼び出される。入力時の入り口はEndGetData
//*****************************************************************************
function Public_Init(){
	try{
    //メニューボタン不活性化 
    Fn_ButtonEnable(0);

		//初期化 
		Fn_Init();

    //------------------//
    // 処理モードの設定 //
    //------------------//
    switch(ViewStatus){
      // 患者詳細情報編集 
      case VIEW_MODE_EDIT:
        // 2013/02/15 NDD北村 CQ#1650 ADD Start
        PROC_MODE = PROC_MODE_EDIT;
        // 2013/02/15 NDD北村 CQ#1650 ADD End
        ProcMode = PROC_MODE_EDIT;
 // 2009/12/26 ADD TYS松岡 CQ#61対応 Start ------------------------------------
		document.getElementById("imgGetPatientInfo").style.visibility = "visible";
// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ------------------------------------
       break;
      // 変更患者詳細情報修正
      case VIEW_MODE_CHANGE:
        // 2013/02/15 NDD北村 CQ#1650 ADD Start
        PROC_MODE = PROC_MODE_CHANGE;
        // 2013/02/15 NDD北村 CQ#1650 ADD End
        ProcMode = PROC_MODE_CHANGE;
// 2009/12/26 ADD TYS松岡 CQ#61対応 Start ------------------------------------
		document.getElementById("imgGetPatientInfo").style.visibility = "visible";
// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ------------------------------------
       break;
      default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
        return;
    }

    //--------------------------------------------------------------//
    //排他モードと表示中の画面に応じて排他の管理スイッチを切り替える//
    //--------------------------------------------------------------//
    switch(ViewStatus){
      // 患者詳細情報編集 
      case VIEW_MODE_EDIT:
        switch(parent.ExclusiveMode){
          // モード１：修正完了時のみ開放
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
          // モード３：設定、戻る/修正完了時のみ開放
          case parent.EXCLUSIVE_MODE3:
            ExclusiveModeStudy        = EXCLUSIVE_SET;       // 画面ＯＰＥＮ時の排他処理 
            ExclusiveModeStudyBack    = EXCLUSIVE_DELL;      // 戻るボタン押下時の排他処理 
            ExclusiveModeStudyNext    = EXCLUSIVE_DELL;      // 修正完了押下時の排他処理 
            break;
          default:
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
            return;
        }
        break;
      // 変更患者詳細情報修正時 
      case VIEW_MODE_CHANGE:
        switch(parent.ExclusiveMode){
          // モード１：修正完了時のみ開放
          // モード３：修正完了時のみ開放(患者検索画面にて排他を取得しているため)
          case parent.EXCLUSIVE_MODE1:
          case parent.EXCLUSIVE_MODE3:
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
          default:
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
            break;
        }
        break;
    }
		//検査取得済ならばデータを取得しない 
		if(parent.EndGetDataFlag == FLAG_STUDY_GETDATA){
			Public_EndGetData();		
		}
		else if(parent.EndGetDataFlag == FLAG_STUDY_NOGETDATA){
			switch(ViewStatus){
			// 編集モード時/変更モード時
			case VIEW_MODE_EDIT:
			case VIEW_MODE_CHANGE:
				parent.STUDYDATA_GET_PROC.Public_GetData(ProcMode, parent.StudySequence, "", ExclusiveModeStudy);
				break;
			default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
				return;
			}
			parent.EndGetDataFlag  = FLAG_STUDY_GETDATA;
		}
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
	}
}
//*****************************************************************************
// Public_EndGetData
//
// １．機能
//     データ取得後に画面を表示する
// ２．戻り値
//　　  なし
// ３．備考
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
	//	  //parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
  //    Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_EXCLUSIVE_STUDY_SELF,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_EXCLUSIVE_STUDY_SELF,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_EXCLUSIVE_STUDY_SELF,"Cannt Get Message."), DIALOGPROCMODE_STUDY_ERROR);
  //    return;
  //  }
  //  // 2005/11/28 PVCS#1560 H.SAITO -ED-
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

		var pp = parent.INFORMATION_VIEW;
		// ユーザガイダンス表示
		switch(ViewStatus){
		// 入力モード時(Public_Initが呼ばれないため)
		case VIEW_MODE_INPUT:
			pp.Public_ClearInformation();
			//患者情報表示
//2005/05/24-ST==========
//			pp.Public_SetUserGuidance(UserGuidanceStringInput); 
			pp.Public_SetUserGuidance(UserGuidanceStringInput,0); 
//2005/05/24-EN==========
			pp.Public_SetPatientId(parent.PatientId);
			//2010.06.01 CQ#219対応 FF星野 ADD-ST
			pp.Public_SetPatientSex(parent.PatientSex, parent.PatientsSexNeutred);
			pp.Public_SetPatientName(parent.PatientName, parent.PatientKanjiName);   
			pp.Public_SetPatientBirthDate(parent.PatientBirthDate);
			pp.Public_SetPatientAge(parent.PatientAge);			
			//2010.06.01 CQ#219対応 FF星野 ADD-ED
      //処理モードと排他スイッチを設定する
      ProcMode = PROC_MODE_EDIT;
      ExclusiveModeStudyBack        = EXCLUSIVE_NOTHING;   // 戻るボタン押下時の排他処理
      ExclusiveModeStudyNext        = EXCLUSIVE_NOTHING;   // 次へボタン押下時の排他処理
			break;

		// 編集モード時
		case VIEW_MODE_EDIT:
      parent.EndGetDataFlag == FLAG_STUDY_GETDATA;
			//患者情報表示
//2005/05/24-ST==========
//			pp.Public_SetUserGuidance(UserGuidanceStringEdit); 
			pp.Public_SetUserGuidance(UserGuidanceStringEdit,1); 
//2005/05/24-EN==========
			pp.Public_SetPatientId(parent.PatientId); 
			
// 2009/12/01 FFS黒田 V1.1(B)対応 Update Start
//			pp.Public_SetPatientSex(parent.PatientSex);
			pp.Public_SetPatientSex(parent.PatientSex, parent.PatientsSexNeutred);
// 2009/12/01 FFS黒田 V1.1(B)対応 Update End
			
			pp.Public_SetPatientName(parent.PatientName, parent.PatientKanjiName);   
			pp.Public_SetPatientBirthDate(parent.PatientBirthDate);
			pp.Public_SetPatientAge(parent.PatientAge);
			break;

		// 変更モード時
		case VIEW_MODE_CHANGE:
      parent.EndGetDataFlag == FLAG_STUDY_GETDATA;
			//患者情報表示
//2005/05/24-ST==========
//			pp.Public_SetUserGuidance(UserGuidanceStringChange); 
			pp.Public_SetUserGuidance(UserGuidanceStringChange,1); 
//2005/05/24-EN==========
			pp.Public_SetPatientId(parent.PatientId); 
// 2009/12/01 FFS黒田 V1.1(B)対応 Update Start
//			pp.Public_SetPatientSex(parent.PatientSex);
			pp.Public_SetPatientSex(parent.PatientSex, parent.PatientsSexNeutred);
// 2009/12/01 FFS黒田 V1.1(B)対応 Update End
			pp.Public_SetPatientName(parent.PatientName, parent.PatientKanjiName);   
			pp.Public_SetPatientBirthDate(parent.PatientBirthDate);
			pp.Public_SetPatientAge(parent.PatientAge);
			break;
		default:
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
			return;
		}

		pp = null;

		// 画面表示
		Fn_PatientInfoDisplay();

    //メニューボタン活性化
    Fn_ButtonEnable(1);

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
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
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
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
//      06/12/20  S1神立    V1.4    PVCS#2051
//
//*****************************************************************************
function ViewMovedNotification(notifyInfo)
{
    try{
        if(notifyInfo.focusMode == "TextBox"){
            FocusTextbox();
            FocusTextbox();  // フォーカス処理を2回呼ぶ(PVCS2051)
        }else{
            InitFocus();
        }
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
    }
}

//*****************************************************************************
// Fn_PatientInfoDisplay
//
// １．機能
//     データ取得後に画面を表示する
// ２．戻り値
//　　  なし



// ３．備考
//      06/11/02    S1神立    表示時のフォーカス処理を変更 

//*****************************************************************************	
function Fn_PatientInfoDisplay(){		
	try{
        // 061023 神立 >>
        // ここでは漢字患者名にフォーカスできないので移動しました。

        // document.getElementById("txtPatientName").focus();
        //<<
		
		// マルチバイトの場合
		if(ValueMulti == REGISTRY_MULTIBYTE )
		{
		// 漢字患者名、表示(0)/非表示(1)/不活性(2)の分岐
// CHANGE V1.0 No1355 2005/02/06=================================
			// 非表示(漢字フラグ非表示かつ新規患者）
//			if(KanjiInputFlag == FLAG_NOKANJI && parent.PatientFlag == FLAG_PATIENT_NEW){
			// 非表示(漢字フラグ非表示かつ漢字患者名なし）
			if(KanjiInputFlag == FLAG_NOKANJI && parent.PatientKanjiName == ""){
				setKanjiDisp = FLAG_DISPKANJI_HIDDEN;
			}
			// 不活性(漢字フラグ非表示かつ既存患者 もしくは、確認モニタ)
//			else if((KanjiInputFlag == FLAG_NOKANJI && parent.PatientFlag == FLAG_PATIENT_EXIT) || (KanjiInputFlag == FLAG_NOKANJI_MINI && ClientMode == CLIENT_MODE_MINI)){
			// 不活性(漢字フラグ非表示かつ漢字患者名あり)
			else if(KanjiInputFlag == FLAG_NOKANJI && parent.PatientKanjiName != ""){
				setKanjiDisp = FLAG_DISPKANJI_DISABLED;
			}
			// 表示
			else{
				setKanjiDisp = FLAG_DISPKANJI_VISIBLE;
			}
//CHANGE EN======================================================
		}
		else{
			setKanjiDisp = FLAG_DISPKANJI_HIDDEN;
		}

		switch (setKanjiDisp){
			case 1:
				// 漢字患者名フィールドを非表示
				document.getElementById("DivPatientKanjiName_Value").style.display = "none";
				document.getElementById("txtPatientKanjiName").style.display       = "none";
				document.getElementById("DivKanjiHonorific").style.visibility      = "hidden";
				break;
			case 2:
				// 漢字患者名を表示させ、変更できないように設定
				document.getElementById("DivPatientKanjiName_Value").style.display = "block";
				document.getElementById("txtPatientKanjiName").style.display       = "block";

                //K.Kurashiki Add 2006/11/02 >>
                //WindowsCEの不活性
                document.getElementById("txtPatientKanjiName").disabled            = true;
                //WindowsXPの不活性
                document.getElementById("txtPatientKanjiName").Enabled             = false;
                // <<

				// 敬称表示・非表示
				if(HonorificFlag == FLAG_HONORIFIC_USE ){
					document.getElementById("DivKanjiHonorific").style.visibility = "visible";
				}else{
					document.getElementById("DivKanjiHonorific").style.visibility = "hidden";
				}						
				break;
			default:
				document.getElementById("DivPatientKanjiName_Value").style.display = "block";
				document.getElementById("txtPatientKanjiName").style.display       = "block";

                //K.Kurashiki Add 2006/11/02 >>
                //WindowsCEの活性
                document.getElementById("txtPatientKanjiName").disabled            = false;
                //WindowsXPの活性
                document.getElementById("txtPatientKanjiName").Enabled             = true;
                // <<

				// 敬称表示・非表示
				if(HonorificFlag == FLAG_HONORIFIC_USE ){
					document.getElementById("DivKanjiHonorific").style.visibility = "visible";
				}else{
					document.getElementById("DivKanjiHonorific").style.visibility = "hidden";
				}						
				break;
		}

		// 性別を選択状態にする
// 2009/12/26 ADD TYS松岡 CQ#61対応 Start ------------------------------------
		if(SearchMode == "1"){
			var sexNo = parent.EditPatientSex;
		}
		else{
// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ------------------------------------
			if(ViewStatus == VIEW_MODE_INPUT || ViewStatus == VIEW_MODE_EDIT){ 
				var sexNo = parent.PatientSex;
			}
			else if(ViewStatus == VIEW_MODE_CHANGE){
				var sexNo = parent.EditPatientSex;
			}
// 2009/12/26 ADD TYS松岡 CQ#61対応 Start ------------------------------------
		}
// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ------------------------------------
		if(sexNo > 0 && sexNo <= 3){ 
			document.getElementsByName("imgSex")[sexNo-1].onmousedown();
		}
		else{
			document.getElementsByName("imgSex")[SEX_OTHER-1].onmousedown();
		}

		// 生年月日を表示する
		// 日付フォーマットがJapaneseDateの場合 
			var birth
			var birthDate
			// 日付変換処理===============================
			// 生年月日をSysConfigのフォーマットに合わせる
// 2009/12/26 ADD TYS松岡 CQ#61対応 Start ------------------------------------
			if(SearchMode == "1"){
				birth = ChangeDateToScreenFormat(parent.EditPatientBirthDate, DateFormat);
			}
			else{
// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ------------------------------------
				if(ViewStatus == VIEW_MODE_INPUT || ViewStatus == VIEW_MODE_EDIT){ 
					birth = ChangeDateToScreenFormat(parent.PatientBirthDate, DateFormat);
				}
				else if(ViewStatus == VIEW_MODE_CHANGE){
					birth = ChangeDateToScreenFormat(parent.EditPatientBirthDate, DateFormat);
				}
// 2009/12/26 ADD TYS松岡 CQ#61対応 Start ------------------------------------
			}
// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ------------------------------------
			// 生年月日が異常値
			if(birth < 0) {
				g_Era = "";
				birthDate = "";
			}else{
				// 和暦の場合のみ1文字目を分割する
				if(DateFormat == FORMAT_JAPANESEDATE && EraDisplayFlag == ERABUTTON_DISPLAY){
					g_Era      = birth.charAt(0);
					birthDate  = birth.slice(1);
				}else{
					birthDate = birth;
				}
			}			
		if(DateFormat == FORMAT_JAPANESEDATE && EraDisplayFlag == ERABUTTON_DISPLAY){
			//============================================
			// 和暦の背景色を変更(ボタンテーブルを選択状態にする)
			switch (g_Era){
				case ERA_MEJI:
					document.getElementsByName("imgEra")[0].onmousedown();
					break;
				case ERA_TAISHO:
					document.getElementsByName("imgEra")[1].onmousedown();
					break;
				case ERA_SHOWA:
					document.getElementsByName("imgEra")[2].onmousedown();
					break;
				case ERA_HEISEI:
					document.getElementsByName("imgEra")[3].onmousedown();
					break;
				default:
					break;
			}
		}
		// 画面に患者情報を表示
// 2009/12/26 ADD TYS松岡 CQ#61対応 Start ------------------------------------
		if(SearchMode == "1"){
			document.getElementById("txtPatientName").value      = parent.EditPatientName;
			document.getElementById("txtPatientKanjiName").value = parent.EditPatientKanjiName;
		}
		else{
// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ------------------------------------
			if(ViewStatus == VIEW_MODE_INPUT || ViewStatus == VIEW_MODE_EDIT){ 
				document.getElementById("txtPatientName").value      = parent.PatientName;
				document.getElementById("txtPatientKanjiName").value = parent.PatientKanjiName;
			}
			else if(ViewStatus == VIEW_MODE_CHANGE){
				document.getElementById("txtPatientName").value      = parent.EditPatientName;
				document.getElementById("txtPatientKanjiName").value = parent.EditPatientKanjiName;
			}
// 2009/12/26 ADD TYS松岡 CQ#61対応 Start ------------------------------------
		}
// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ------------------------------------
		document.getElementById("txtPatientBirth").value     = birthDate;

		//2009.12.01 V1.1(B)対応 FF星野 ADD-ST
// 2009/12/26 ADD TYS松岡 CQ#61対応 Start ------------------------------------
		if(SearchMode == "1"){
			document.getElementById("txtPatientComment").value =parent.EditPatientComment;
			document.getElementById("txtPatientsSize").value =parent.EditPatientsSize;
			document.getElementById("txtPatientsWeight").value =parent.EditPatientsWeight;
			document.getElementById("txtPatientSpeciesDescription").value =parent.EditPatientSpeciesDescription;
			document.getElementById("txtPatientBreedDescription").value =parent.EditPatientBreedDescription;
			// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ------------------------------------
			if(KanjiInputFlag == FLAG_NOKANJI){
				document.getElementById("txtResponsiblePerson").value =parent.EditResponsiblePerson;
			}
			else{
				document.getElementById("txtResponsiblePerson").value =parent.EditResponsiblePersonIdoGraphic;
			}
			// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ------------------------------------
			// 2010/04/19 DEL TYS園木 責任者マルチバイト対応 Start ------------------------------------
			//document.getElementById("txtResponsiblePerson").value =parent.EditResponsiblePerson;
			// 2010/04/19 DEL TYS園木 責任者マルチバイト対応 End   ------------------------------------
			document.getElementById("txtResponsibleOrganization").value =parent.EditResponsibleOrganization;
		}
		else{
			if(ViewStatus == VIEW_MODE_INPUT || ViewStatus == VIEW_MODE_EDIT){
// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ------------------------------------
				document.getElementById("txtPatientComment").value =parent.PatientComment;
				document.getElementById("txtPatientsSize").value =parent.PatientsSize;
				document.getElementById("txtPatientsWeight").value =parent.PatientsWeight;
				document.getElementById("txtPatientSpeciesDescription").value =parent.PatientSpeciesDescription;		
				document.getElementById("txtPatientBreedDescription").value =parent.PatientBreedDescription;
				// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ------------------------------------
				if(KanjiInputFlag == FLAG_NOKANJI){
					document.getElementById("txtResponsiblePerson").value =parent.ResponsiblePerson;
				}
				else{
					document.getElementById("txtResponsiblePerson").value =parent.ResponsiblePersonIdoGraphic;
				}
				// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ------------------------------------
				// 2010/04/19 DEL TYS園木 責任者マルチバイト対応 Start ------------------------------------
				//document.getElementById("txtResponsiblePerson").value =parent.ResponsiblePerson;
				// 2010/04/19 DEL TYS園木 責任者マルチバイト対応 End   ------------------------------------
				document.getElementById("txtResponsibleOrganization").value =parent.ResponsibleOrganization;
// 2009/12/26 ADD TYS松岡 CQ#61対応 Start ------------------------------------
			}
			else if(ViewStatus == VIEW_MODE_CHANGE){
				document.getElementById("txtPatientComment").value =parent.EditPatientComment;
				document.getElementById("txtPatientsSize").value =parent.EditPatientsSize;
				document.getElementById("txtPatientsWeight").value =parent.EditPatientsWeight;
				document.getElementById("txtPatientSpeciesDescription").value =parent.EditPatientSpeciesDescription;
				document.getElementById("txtPatientBreedDescription").value =parent.EditPatientBreedDescription;
				// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ------------------------------------
				if(KanjiInputFlag == FLAG_NOKANJI){
					document.getElementById("txtResponsiblePerson").value =parent.EditResponsiblePerson;
				}
				else{
					document.getElementById("txtResponsiblePerson").value =parent.EditResponsiblePersonIdoGraphic;
				}
				// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ------------------------------------
				// 2010/04/19 DEL TYS園木 責任者マルチバイト対応 Start ------------------------------------
				//document.getElementById("txtResponsiblePerson").value =parent.EditResponsiblePerson;
				// 2010/04/19 DEL TYS園木 責任者マルチバイト対応 End   ------------------------------------
				document.getElementById("txtResponsibleOrganization").value =parent.EditResponsibleOrganization;
			}
		}
// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ------------------------------------
		//去勢/避妊を選択状態にする
// 2009/12/26 ADD TYS松岡 CQ#61対応 Start ------------------------------------
		if(SearchMode == "1"){
			var sexNeuteredNo = parent.EditPatientsSexNeutred;
		}
		else{
// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ------------------------------------
			if(ViewStatus == VIEW_MODE_INPUT || ViewStatus == VIEW_MODE_EDIT){ 
				var sexNeuteredNo = parent.PatientsSexNeutred;
			}
			else if(ViewStatus == VIEW_MODE_CHANGE){
// 2009/12/26 ADD TYS松岡 CQ#61対応 Start ------------------------------------
				var sexNeuteredNo = parent.EditPatientsSexNeutred;
// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ------------------------------------
// 2009/12/26 DEL TYS松岡 CQ#61対応 Start ------------------------------------
			//var sexNeuteredNo = parent.PatientsSexNeutred;
// 2009/12/26 DEL TYS松岡 CQ#61対応 End   ------------------------------------
			}
// 2009/12/26 ADD TYS松岡 CQ#61対応 Start ------------------------------------
		}
// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ------------------------------------
		// 2011/02/22 NDD北村 CQ#557-559 UPD ST
		//if(sexNeuteredNo > 0 && sexNeuteredNo <= 3){ 
		//	document.getElementsByName("imgSexNeutred")[sexNeuteredNo-1].onmousedown();
		//}
		//else{
		//	document.getElementsByName("imgSexNeutred")[SEX_NEUTRED_UNKNOWN-1].onmousedown();
		//}
		// 2011/02/22 NDD北村 CQ#557-559 UPD
		if(sexNeuteredNo >= 0 && sexNeuteredNo <= 2)
		{ 
			var num2;
			if(sexNeuteredNo == 0) num2 = 3; else num2 = sexNeuteredNo;
			document.getElementsByName("imgSexNeutred")[num2-1].onmousedown();
		}
		else
		{
			document.getElementsByName("imgSexNeutred")[2].onmousedown();
		}
		// 2011/02/22 NDD北村 CQ#557-559 UPD ED
		//2009.12.01 V1.1(B)対応 FF星野 ADD-ED

// 2005/09/15 Kanno ADD ST PVCS#1469
		// カーソル位置を設定
		InitCurPosition();
// 2005/09/15 Kanno ADD ED PVCS#1469
// 2009/12/26 ADD TYS松岡 CQ#61対応 Start ------------------------------------
		// 検索モード初期化
		SearchMode = "0";
// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ------------------------------------

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+10);
	}

}
//*****************************************************************************
// Fn_Init
//
// １．機能
//     変数を初期化する
// ２．戻り値
//　　  なし 
// ３．備考 
//*****************************************************************************
function Fn_Init(){
  try{
// ADD V1.0-1354 2005/02/06 hata=================================
		// ユーザガイダンス情報クリア
		parent.INFORMATION_VIEW.Public_ClearInformation();
// ADD EN======================================================
		// 患者性別ボタン解除
		document.getElementsByName("imgSex")[2].onmousedown();
		document.getElementsByName("imgSexNeutred")[2].onmousedown();

		// 患者詳細情報変数初期化 
		g_PSex       = SEX_OTHER;
		g_Era        = "";
		g_EraNo      = -1;
		ClientMode   = CLIENT_MODE_MINI;		// 0:クライアント筐体 1:確認モニタ
		setKanjiDisp = FLAG_DISPKANJI_HIDDEN;	//0:表示 1:非表示 2:不活性
    ConfirmFlag = 0;                       // 確認ダイアログフラグ
		g_PNeutredSex = SEX_NEUTRED_UNKNOWN;//2009.12.01 V1.1(B)対応 FF星野 ADD

		// 患者詳細情報入力初期化
		document.getElementById("txtPatientName").value      = "";
		document.getElementById("txtPatientKanjiName").value = "";
		document.getElementById("txtPatientBirth").value     = "";
		//2009.12.01 V1.1(B)対応 FF星野 ADD-ST
		document.getElementById("txtPatientComment").value      = "";
		document.getElementById("txtPatientsSize").value = "";
		document.getElementById("txtPatientsWeight").value     = "";
		document.getElementById("txtPatientSpeciesDescription").value     = "";	
		document.getElementById("txtPatientBreedDescription").value = "";
		document.getElementById("txtResponsiblePerson").value     = "";
		document.getElementById("txtResponsibleOrganization").value     = "";			
		//2009.12.01 V1.1(B)対応 FF星野 ADD-ED
		
		if(DateFormat == FORMAT_JAPANESEDATE){
			var eraNum = document.getElementsByName("imgEra").length;
			for(i=0; i<eraNum; i++){
				// ボタン解除
				document.getElementsByName("imgEra")[i].src = IMGERA_BUTTON_UP;
			}
		}
		if(isCE == true)//2009.12.01 V1.1(B)対応 FF星野 ADD
		{ 
			// ソフトキーボード初期化
			if(SoftKeyBoardFlag == FLAG_SOFTKEYBOARD_USE){
				frmSoftKeyBoard.Fn_Init();
			}
		}
//ADD ===============
EditPatientName      = "";            //ｶﾝｼﾞｬﾒｲ(患者情報チェック後)
EditPatientKanjiName = "";            //漢字患者名(患者情報チェック後)
EditPatientSex       = SEX_OTHER;     //患者性別(患者情報チェック後)
EditPatientBirth     = "";            //患者生年月日(患者情報チェック後)
EditPatientAge       = "";            //患者年齢(患者情報チェック後)
//===================
		//2009.12.01 V1.1(B)対応 FF星野 ADD-ST
		EditPatientComment="";
		EditPatientsSize ="";
		EditPatientsWeight ="";
		EditNeuteredSex =SEX_NEUTRED_UNKNOWN;
		EditSpeciesDescription ="";
		EditBreedDescription ="";
		EditResponsiblePerson ="";
		EditResponsibleOrganization ="";
		//2009.12.01 V1.1(B)対応 FF星野 ADD-ED
		// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ------------------------------------
		EditResponsiblePersonIdoGraphic ="";
		// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ------------------------------------
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+11);
  }
}

//***************************************************************************
//  PatientDetailBack() 
//
//  1．機能
//      患者詳細戻る要求 
//	2．戻り値  
//		  なし 
//  3．備考 
//     
//
//***************************************************************************
function PatientDetailBack(){
	try{
	  // 戻るボタン押下時の排他スイッチを設定
    ExclusiveModeStudyEnd = ExclusiveModeStudyBack;
    // 排他処理    
    Fn_Exclusive(COMMAND_MODE_CANCEL, "");

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+12);
	}
}
//***************************************************************************
//  PatientDetailNext()		
//
//  1．機能
//      患者詳細情報次へ要求 
//	2．戻り値  
//		  なし 
//  3．備考 
//     
//***************************************************************************
function PatientDetailNext()
{
	try{
		// 更新処理タイムアウト予約解除
		clearTimeout(UpdateTimeoutId);
	  // 次へ/修正完了ボタン押下時の排他スイッチを設定 
    ExclusiveModeStudyEnd = ExclusiveModeStudyNext;

// ADD 2005/02/03 hata====================
		// 患者編集,変更時のみ修正完了状況フラグを修正完了とする
		if(ViewStatus == VIEW_MODE_EDIT || ViewStatus == VIEW_MODE_CHANGE){
			parent.ModifyStatusFlag = 1;
		}
//ADD EN===========================

    // 排他処理    
    Fn_Exclusive(COMMAND_MODE_UPDATE, "");

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+13);
	}
}

//************************************************
// CheckPatinetDetail  ()
//
// １．機能 
//      患者情報のチェック
//      患者情報の設定 
//      画面遷移要求 
//  2．戻り値  
//      なし 
//  3．備考 
//      07/02/08    S1 Kandachi     PVCS2124
//
//************************************************
function CheckPatinetDetail()
{
	try{
	  //処理モードが編集と変更の場合、情報未取得ならば処理を行わない 
	  if(ViewStatus == VIEW_MODE_EDIT || ViewStatus == VIEW_MODE_CHANGE){
	    if(parent.EndGetDataFlag == FLAG_STUDY_NOGETDATA)return;  
	  }
	
		var patName      = document.getElementById("txtPatientName").value;
		var patKanjiName = document.getElementById("txtPatientKanjiName").value;
		var patBirth     = document.getElementById("txtPatientBirth").value;
		//2009.12.01 V1.1(B)対応 FF星野 ADD-ST
		//2010.06.01 CQ#219対応 FF星野 ADD-ST 
		var patientCommentValue	=document.getElementById("txtPatientComment").value;
		if(patientCommentValue == "undefined")
		{
			patientCommentValue ="";
		}
		
		var patientsSizeValue	=document.getElementById("txtPatientsSize").value;
		if(patientsSizeValue == "undefined")
		{
			patientsSizeValue ="";
		}
		
		var patientsWeightValue =document.getElementById("txtPatientsWeight").value;
		if(patientsWeightValue == "undefined")
		{
			patientsWeightValue ="";
		}
		
		var speciesDescriptionValue =document.getElementById("txtPatientSpeciesDescription").value;
		if(speciesDescriptionValue == "undefined")
		{
			speciesDescriptionValue ="";	
		}
		
		var breedDescriptionValue	=document.getElementById("txtPatientBreedDescription").value;
		if(breedDescriptionValue == "undefined")
		{
			breedDescriptionValue ="";		
		}
		
		var responsiblePersonValue	=document.getElementById("txtResponsiblePerson").value;
		if(responsiblePersonValue == "undefined")
		{
			responsiblePersonValue ="";	
		}
		
		var responsibleOrganizationValue =document.getElementById("txtResponsibleOrganization").value;
		if(responsibleOrganizationValue == "undefined")
		{
			responsibleOrganizationValue ="";		
		}
		//2010.06.01 CQ#219対応 FF星野 ADD-ED
		//2009.12.01 V1.1(B)対応 FF星野 ADD-ED
		// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ------------------------------------
		var responsiblePersonIdoGraphicValue	=document.getElementById("txtResponsiblePerson").value;	//画面に責任者(マルチバイト)ができた場合にはそのTextBoxの値を入れる。
		if(responsiblePersonIdoGraphicValue == "undefined")
		{
			responsiblePersonIdoGraphicValue ="";	
		}
		// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ------------------------------------
		// 2005/06/24 005 H.SAITO PVCS:#361 ｶﾝｼﾞｬﾒｲに含まれる全角スペースをすべて半角スペースに変換する
    while(patName.match(/　/)){
      patName = patName.replace("　", " ");
    }
    document.getElementById("txtPatientName").value = patName;

		// 2005/07/06 010 H.SAITO PVCS:#189 ｶﾝｼﾞｬﾒｲ,漢字患者名の後方スペースを除去する
    var count;
    // ｶﾝｼﾞｬﾒｲの半角スペースを除去する
    count        = Fn_GetRemoveStrCount(patName, " ", patName.length - 1);
// 2006/04/06 H.SAITO 関数名誤り -ST-
//    patName      = patName.substring(0, count);
    patName      = patName.substr(0, count);
// 2006/04/06 H.SAITO 関数名誤り -ED-
    document.getElementById("txtPatientName").value      = patName;
    // 漢字患者名の全角スペースを除去する
    count        = Fn_GetRemoveStrCount(patKanjiName, "　", patKanjiName.length - 1);
// 2006/04/06 H.SAITO 関数名誤り -ST-
//    patKanjiName = patKanjiName.substring(0, count);
    patKanjiName = patKanjiName.substr(0, count);
// 2006/04/06 H.SAITO 関数名誤り -ED-
    document.getElementById("txtPatientKanjiName").value = patKanjiName;
// 2006/04/06 H.SAITO PVCS#1730 -ST-
    // 生年月日の最前方の半角全角スペースを除去
    count = Fn_GetRemoveStrCountForwardEx(patBirth, "[ 　]", 0);
    patBirth  = patBirth.substr(count, patBirth.length - count);
    // 生年月日の最後方の半角全角スペースを除去
    count = Fn_GetRemoveStrCountEx(patBirth, "[ 　]", patBirth.length - 1);
    patBirth  = patBirth.substr(0, count);
		document.getElementById("txtPatientBirth").value = patBirth;
// 2006/04/06 H.SAITO PVCS#1730 -ED-

    // PVCS#2124 Kandachi 070208 >>>
    // 生年月日がブランクのときは年号も選択されていない事にする。

// 2009/10/20 PVCS#3415 Nishiyama DEL Start
//    if(patBirth == ""){
//        g_Era = "";
//    }
// 2009/10/20 PVCS#3415 Nishiyama DEL End
    // <<<

		//2009.12.01 V1.1(B)対応 FF星野 ADD-ST
		count = Fn_GetRemoveStrCountForwardEx(patientsSizeValue, "[ 　]", 0);
        patientsSizeValue  = patientsSizeValue.substr(count, patientsSizeValue.length - count);
        count = Fn_GetRemoveStrCountEx(patientsSizeValue, "[ 　]", patientsSizeValue.length - 1);
        patientsSizeValue  = patientsSizeValue.substr(0, count);
		document.getElementById("txtPatientsSize").value = patientsSizeValue;
		
		count = Fn_GetRemoveStrCountForwardEx(patientsWeightValue, "[ 　]", 0);
        patientsWeightValue  = patientsWeightValue.substr(count, patientsWeightValue.length - count);
        count = Fn_GetRemoveStrCountEx(patientsWeightValue, "[ 　]", patientsWeightValue.length - 1);
        patientsWeightValue  = patientsWeightValue.substr(0, count);
        document.getElementById("txtPatientsWeight").value = patientsWeightValue;	

		// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ------------------------------------
		if(KanjiInputFlag == FLAG_NOKANJI){
			count = Fn_GetRemoveStrCountForwardEx(responsiblePersonValue, "[ 　]", 0);
			responsiblePersonValue  = responsiblePersonValue.substr(count, responsiblePersonValue.length - count);
			count = Fn_GetRemoveStrCountEx(responsiblePersonValue, "[ 　]", responsiblePersonValue.length - 1);
			responsiblePersonValue  = responsiblePersonValue.substr(0, count);
			document.getElementById("txtResponsiblePerson").value = responsiblePersonValue;
        }
        else{
			count = Fn_GetRemoveStrCount(responsiblePersonIdoGraphicValue, "　", responsiblePersonIdoGraphicValue.length - 1);
			responsiblePersonIdoGraphicValue = responsiblePersonIdoGraphicValue.substr(0, count);
			document.getElementById("txtResponsiblePerson").value = responsiblePersonIdoGraphicValue;
        }
		// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ------------------------------------
		// 2010/04/19 DEL TYS園木 責任者マルチバイト対応 Start ------------------------------------
		//count = Fn_GetRemoveStrCountForwardEx(responsiblePersonValue, "[ 　]", 0);
        //responsiblePersonValue  = responsiblePersonValue.substr(count, responsiblePersonValue.length - count);
        //count = Fn_GetRemoveStrCountEx(responsiblePersonValue, "[ 　]", responsiblePersonValue.length - 1);
        //responsiblePersonValue  = responsiblePersonValue.substr(0, count);
        //document.getElementById("txtResponsiblePerson").value = responsiblePersonValue;	
        // 2010/04/19 DEL TYS園木 責任者マルチバイト対応 End   ------------------------------------

		count = Fn_GetRemoveStrCountForwardEx(speciesDescriptionValue, "[ 　]", 0);
        speciesDescriptionValue  = speciesDescriptionValue.substr(count, speciesDescriptionValue.length - count);
        count = Fn_GetRemoveStrCountEx(speciesDescriptionValue, "[ 　]", speciesDescriptionValue.length - 1);
        speciesDescriptionValue  = speciesDescriptionValue.substr(0, count);
        document.getElementById("txtPatientSpeciesDescription").value = speciesDescriptionValue;	
        
		count = Fn_GetRemoveStrCountForwardEx(breedDescriptionValue, "[ 　]", 0);
        breedDescriptionValue  = breedDescriptionValue.substr(count, breedDescriptionValue.length - count);
        count = Fn_GetRemoveStrCountEx(breedDescriptionValue, "[ 　]", breedDescriptionValue.length - 1);
        breedDescriptionValue  = breedDescriptionValue.substr(0, count);
        document.getElementById("txtPatientBreedDescription").value = breedDescriptionValue;	

		count = Fn_GetRemoveStrCountForwardEx(responsibleOrganizationValue, "[ 　]", 0);
        responsibleOrganizationValue  = responsibleOrganizationValue.substr(count, responsibleOrganizationValue.length - count);
        count = Fn_GetRemoveStrCountEx(responsibleOrganizationValue, "[ 　]", responsibleOrganizationValue.length - 1);
        responsibleOrganizationValue  = responsibleOrganizationValue.substr(0, count);
        document.getElementById("txtResponsibleOrganization").value = responsibleOrganizationValue;	

		//count = Fn_GetRemoveStrCount(responsiblePersonValue, " ", responsiblePersonValue.length - 1);
		//responsiblePersonValue = responsiblePersonValue.substr(0, count);
		//document.getElementById("txtResponsiblePerson").value = responsiblePersonValue;
		
		//count = Fn_GetRemoveStrCount(speciesDescriptionValue, "　", speciesDescriptionValue.length - 1);
		//speciesDescriptionValue = speciesDescriptionValue.substr(0, count);
		//document.getElementById("txtPatientSpeciesDescription").value = speciesDescriptionValue;

		//count = Fn_GetRemoveStrCount(breedDescriptionValue, "　", breedDescriptionValue.length - 1);
		//breedDescriptionValue = breedDescriptionValue.substr(0, count);
		//document.getElementById("txtPatientBreedDescription").value = breedDescriptionValue;

		//count = Fn_GetRemoveStrCount(responsibleOrganizationValue, "　", responsibleOrganizationValue.length - 1);
		//responsibleOrganizationValue = responsibleOrganizationValue.substr(0, count);
		//document.getElementById("txtResponsibleOrganization").value = responsibleOrganizationValue;
		//2009.12.01 V1.1(B)対応 FF星野 ADD-ED

		// 患者情報のチェック(禁則文字列チェック)=================
		// 患者名チェック
		var retCodeName = chkPatientName(patName, PatientNameLength, PatientNameProhibition);
		if(retCodeName != 0)
		{
			ErrorCode = 1;

			// 禁則文字エラー
			if(retCodeName == -1){
//      Public_ErrorDisplay(RETRY_ERROR, 31508, FILE_NAME, 0);
				Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_NAME_PROHIBITION,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_NAME_PROHIBITION,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_NAME_PROHIBITION,"Cannot get Message.")); 
				return false;
			// 入力文字制限エラー
			}else{
//      Public_ErrorDisplay(RETRY_ERROR, 31509, FILE_NAME, 0);
				Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_NAME_OVER,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_NAME_OVER,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_NAME_OVER,"Cannot get Message.")); 
				return false;
			}			 
		}
		// 漢字患者チェック	
		var retCodeKanji = chkKanjiPatientName(patKanjiName, PatientJapaneseNameLength, PatientJapaneseNameProhibition);
		if(retCodeKanji != 0)
		{
			ErrorCode = 2;
			// 禁則文字エラー
			if(retCodeKanji == -1){
//      Public_ErrorDisplay(RETRY_ERROR, 31510, FILE_NAME, 0);
				Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_KANJINAME_PROHIBITION,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_KANJINAME_PROHIBITION,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_KANJINAME_PROHIBITION,"Cannot get Message.")); 
				return false;
			// 入力文字制限エラー
			}else{
//      Public_ErrorDisplay(RETRY_ERROR, MSG_WARNING_NAME_OVER, FILE_NAME, 0);
				Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_KANJINAME_OVER,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_KANJINAME_OVER,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_KANJINAME_OVER,"Cannot get Message.")); 
				return false;
			}			 
		}
		// 生年月日チェック
		// 和暦ボタン表示の場合、元号と年数を組み合わせる
		if(DateFormat == FORMAT_JAPANESEDATE && EraDisplayFlag == ERABUTTON_DISPLAY){
// 2009/10/20 PVCS#3415 Nishiyama ADD Start
			if(patBirth != ""){
				patBirth = g_Era + patBirth;
			}
// 2009/10/20 PVCS#3415 Nishiyama ADD End
// 2009/10/20 PVCS#3415 Nishiyama DEL Start
//			patBirth = g_Era + patBirth;
// 2009/10/20 PVCS#3415 Nishiyama DEL End
		}

		patBirth = ChangeDateToDicomFormat(patBirth, DateFormat);
		if ( patBirth != -1 )
		{
			// テキストに何も入力していない 
			if(patBirth == 1)
			{
				patBirth = "";
			}
		}
		else
		{
			ErrorCode = 3;
//      Public_ErrorDisplay(RETRY_ERROR, 31512, FILE_NAME, 0);
				Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_BIRTHDAY,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_BIRTHDAY,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_BIRTHDAY,"Cannot get Message.")); 
			return false;

		}
			
		//========================================================
//CHANGE hata 2005/02/28 ============================		
/*
		if(parent.PatientFlag == 1){
			if(parent.PatientName != patName || parent.PatientKanjiName!=patKanjiName || parent.PatientSex!=g_PSex || parent.PatientBirthDate!=patBirth)
			{
				// 患者情報設定 
				parent.EditFlag = 1;
				parent.PatientName      = patName;
				parent.PatientKanjiName = patKanjiName;
				parent.PatientSex       = g_PSex;
				parent.PatientBirthDate = patBirth;
			}else{
			  // 編集フラグOFF
			  parent.EditFlag = 0;
			}
//ADD 2005/02/18================
      // 年齢設定 
      if(patBirth == ""){
        parent.PatientAge = "";
      }else{
        parent.PatientAge = GetAge(parent.PatientBirthDate);
      }
//ADD EN ==========================
		}else{
			// 患者情報設定 
			parent.EditFlag = 1;
			parent.PatientName      = patName;
			parent.PatientKanjiName = patKanjiName;
			parent.PatientSex       = g_PSex;
			parent.PatientBirthDate = patBirth;
//ADD 2005/02/18================
        // 年齢設定 
        if(patBirth == ""){
          parent.PatientAge = "";
        }else{
          parent.PatientAge = GetAge(parent.PatientBirthDate);
        }
//ADD EN ==========================
		
		}	
*/		
//		// 患者編集フラグがOFFの場合 
//		if(parent.PatientEditFlag == 0){
		  // 患者詳細情報を比較 
		  //2009.12.01 V1.1(B)対応 FF星野 ADD 
		  // 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ------------------------------------
		  if(parent.PatientName != patName || parent.PatientKanjiName!=patKanjiName || parent.PatientSex!=g_PSex || parent.PatientBirthDate!=patBirth
		     || parent.PatientComment !=patientCommentValue || parent.PatientsSize != patientsSizeValue  || parent.PatientsWeight != patientsWeightValue
		     || parent.PatientsSexNeutred != g_PNeutredSex || parent.PatientSpeciesDescription != speciesDescriptionValue
		     || parent.PatientBreedDescription != breedDescriptionValue || parent.ResponsiblePerson != responsiblePersonValue
		     || parent.ResponsiblePersonIdoGraphic != responsiblePersonIdoGraphicValue || parent.ResponsibleOrganization != responsibleOrganizationValue)
			{
		  // 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ------------------------------------
		  // 2010/04/19 DEL TYS園木 責任者マルチバイト対応 Start ------------------------------------
		  //if(parent.PatientName != patName || parent.PatientKanjiName!=patKanjiName || parent.PatientSex!=g_PSex || parent.PatientBirthDate!=patBirth
		  //   || parent.PatientComment !=patientCommentValue || parent.PatientsSize != patientsSizeValue  || parent.PatientsWeight != patientsWeightValue
		  //   || parent.PatientsSexNeutred != g_PNeutredSex || parent.PatientSpeciesDescription != speciesDescriptionValue
		  //   || parent.PatientBreedDescription != breedDescriptionValue || parent.ResponsiblePerson != responsiblePersonValue
		  //   || parent.ResponsibleOrganization != responsibleOrganizationValue)
		  //{
		  // 2010/04/19 DEL TYS園木 責任者マルチバイト対応 End   ------------------------------------
          // 患者編集フラグをON
          parent.PatientEditFlag = 1;
      }
      else{
          // 患者編集フラグをOFF
          parent.PatientEditFlag = 0;
      }
//    }
/*
    // 患者情報を設定 
		parent.PatientName      = patName;
		parent.PatientKanjiName = patKanjiName;
		parent.PatientSex       = g_PSex;
		parent.PatientBirthDate = patBirth;
//ADD 2005/02/18================
    // 年齢設定 
    if(patBirth == ""){
      parent.PatientAge = "";
    }else{
      parent.PatientAge = GetAge(parent.PatientBirthDate);
    }
//ADD EN ==========================
*/
    // 患者情報を設定 
		EditPatientName      = patName;
		EditPatientKanjiName = patKanjiName;
		EditPatientSex       = g_PSex;
		EditPatientBirth     = patBirth;
//ADD 2005/02/18================
    // 年齢設定 
    if(patBirth == ""){
      EditPatientAge = "";
    }else{
      EditPatientAge = GetAge(EditPatientBirth);
    }
//ADD EN ==========================

		//2009.12.01 V1.1(B)対応 FF星野 ADD-ST
		var retCode = 0;
		//患者コメント設定
		EditPatientComment	= patientCommentValue;
		
		
		//身長数値チェック/設定
		if(isNaN(patientsSizeValue))
		{
			Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_SIZE_CHECK,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_SIZE_CHECK,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_SIZE_CHECK,"Cannot get Message.")); 
			return false;
		}
		if(patientsSizeValue < 0)
		{
			Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_SIZE_NEGATIVE_CHECK,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_SIZE_NEGATIVE_CHECK,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_SIZE_NEGATIVE_CHECK,"Cannot get Message.")); 
			return false;
		}
		EditPatientsSize =patientsSizeValue;
		
		//体重数値チェック/設定
		if(isNaN(patientsWeightValue))
		{
			Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_WEIGHT_CHECK,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_WEIGHT_CHECK,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_WEIGHT_CHECK,"Cannot get Message.")); 
			return false;
		}
		if(patientsWeightValue < 0)
		{
			Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_WEIGHT_NEGATIVE_CHECK,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_WEIGHT_NEGATIVE_CHECK,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_WEIGHT_NEGATIVE_CHECK,"Cannot get Message.")); 
			return false;
		}
		EditPatientsWeight =patientsWeightValue;	
		
		//去勢避妊設定
		EditNeuteredSex =g_PNeutredSex;
		
		if(speciesDescriptionValue.length <= 0 && breedDescriptionValue.length > 0)
		{
			Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_SPECIES_EMPTY,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_SPECIES_EMPTY,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_SPECIES_EMPTY,"Cannot get Message.")); 
			return false; 
		}
		
		
		// (禁則文字列チェック)=================
		// 責任者チェック
		// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ------------------------------------
		if(KanjiInputFlag == FLAG_NOKANJI){
			retCode = chkPatientName(responsiblePersonValue, PatientNameLength, PatientNameProhibition);
			if(retCode != 0)
			{
				// 禁則文字エラー
				Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_RESPONSIBLE_PERSON_PROHIBITION,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_RESPONSIBLE_PERSON_PROHIBITION,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_RESPONSIBLE_PERSON_PROHIBITION,"Cannot get Message.")); 
				return false; 
			}
			EditResponsiblePerson =responsiblePersonValue;
		}
		else{
			retCode = chkKanjiPatientName(responsiblePersonIdoGraphicValue, PatientNameLength, PatientJapaneseNameProhibition);
			if(retCode != 0)
			{
				// 禁則文字エラー
				Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_RESPONSIBLE_PERSON_IDOGRAPHIC_PROHIBITION,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_RESPONSIBLE_PERSON_IDOGRAPHIC_PROHIBITION,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_RESPONSIBLE_PERSON_IDOGRAPHIC_PROHIBITION,"Cannot get Message.")); 
				return false; 
			}
			EditResponsiblePersonIdoGraphic =responsiblePersonIdoGraphicValue;
		}		
		// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ------------------------------------
		// 2010/04/19 DEL TYS園木 責任者マルチバイト対応 Start ------------------------------------
		//retCode = chkPatientName(responsiblePersonValue, PatientNameLength, PatientNameProhibition);
		//if(retCode != 0)
		//{
		//	// 禁則文字エラー
		//	Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_RESPONSIBLE_PERSON_PROHIBITION,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_RESPONSIBLE_PERSON_PROHIBITION,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_RESPONSIBLE_PERSON_PROHIBITION,"Cannot get Message.")); 
		//	return false; 
		//}
		//EditResponsiblePerson =responsiblePersonValue;
		// 2010/04/19 DEL TYS園木 責任者マルチバイト対応 End   ------------------------------------

		// 種別チェック/設定	
		if(!isProhibit(speciesDescriptionValue, PatientVeterinaryProhibition))
		{
			// 禁則文字エラー
			Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_SPECIES_DESCRIPTION_PROHIBITION,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_SPECIES_DESCRIPTION_PROHIBITION,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_SPECIES_DESCRIPTION_PROHIBITION,"Cannot get Message.")); 
			return false;			 
		}
		EditSpeciesDescription =speciesDescriptionValue;
		
		// 品種チェック/設定	
		if(!isProhibit(breedDescriptionValue, PatientVeterinaryProhibition))
		{
			// 禁則文字エラー
			Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_BREED_DESCRIPTION_PROHIBITION,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_BREED_DESCRIPTION_PROHIBITION,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_BREED_DESCRIPTION_PROHIBITION,"Cannot get Message.")); 
			return false;
		}
		EditBreedDescription =breedDescriptionValue;

		//所属先チェック/設定	
		if(!isProhibit(responsibleOrganizationValue, PatientVeterinaryProhibition))
		{
			// 禁則文字エラー
			Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_RESPONSIBLE_ORGANIZATION_PROHIBITION,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_RESPONSIBLE_ORGANIZATION_PROHIBITION,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_RESPONSIBLE_ORGANIZATION_PROHIBITION,"Cannot get Message.")); 
			return false;			 
		}			
		EditResponsibleOrganization =responsibleOrganizationValue;
		//2009.12.01 V1.1(B)対応 FF星野 ADD-ED

// CHANGE==================================================
		// 画面遷移要求 
		switch(ViewStatus){
			case VIEW_MODE_INPUT:
//ADD 2005/05/16====================== 
        // 患者情報を設定 
		    parent.PatientName      = EditPatientName;
		    parent.PatientKanjiName = EditPatientKanjiName;
		    parent.PatientSex       = EditPatientSex;
		    parent.PatientBirthDate = EditPatientBirth;
        parent.PatientAge       = EditPatientAge;
//ADD ================================
				// 次画面遷移要求 
				PatientDetailNext();
				break;
			case VIEW_MODE_EDIT:
		    // 操作ログ出力 
		    Fn_WriteLog(ProcMode, CTRL_UPDATE);
				// 確認ダイアログ表示
//				document.getElementById("TD_ConfirmText").innerText = ConfirmChangeString;
//				Public_Confirm();
        //検査ステータスが確定の場合は確認ダイアログを表示する
				// #1346 2005/09/22--ST 確定＆管理もくてきのみ表示
//070515 HSK山本 PVCS#2227 UPDATE-ST
//        if(parent.StudyStatus == STATE_VERIFIED && parent.PurPose == CON_PURPOSE){
        if(parent.PatientEditFlag == 1 && parent.StudyStatus == STATE_VERIFIED && parent.PurPose == CON_PURPOSE){
//070515 HSK山本 PVCS#2227 UPDATE-ED
				// #1346 2005/09/22--EN 
          document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_CHANGE_VERIFIED,"");
          document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_CHANGE_VERIFIED,"");
          document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_CHANGE_VERIFIED,"Cannt Get Message.");
      		ConfirmFlag = 3;  //確認ダイアログのフラグ(確定後操作の確認)
          Public_Confirm();
        }
        //
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
		    // 操作ログ出力 
		    Fn_WriteLog(ProcMode, CTRL_UPDATE);
				// 確認ダイアログ表示
//				document.getElementById("TD_ConfirmText").innerText = ConfirmChangeString;
//				Public_Confirm();
        //検査ステータスが確定の場合は確認ダイアログを表示する
				// #1346 2005/09/22--ST 確定＆管理もくてきのみ表示
//070515 HSK山本 PVCS#2227 UPDATE-ST
//        if(parent.StudyStatus == STATE_VERIFIED && parent.PurPose == CON_PURPOSE){
        if(parent.PatientEditFlag == 1 && parent.StudyStatus == STATE_VERIFIED && parent.PurPose == CON_PURPOSE){
//070515 HSK山本 PVCS#2227 UPDATE-ED
				// #1346 2005/09/22--EN 
          document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_CHANGE_VERIFIED,"");
          document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_CHANGE_VERIFIED,"");
          document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_CHANGE_VERIFIED,"Cannt Get Message.");
      		ConfirmFlag = 3;  //確認ダイアログのフラグ(確定後操作の確認)
          Public_Confirm();
        }
        //
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
			default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+14);
				return;
		}

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+15);
	}

}

//************************************************
// SelectSex  (num : 性別   1:男性    2:女性
//                            3:その他  0:不明
// 	性別テーブルクリック
//
// １．機能 
//     ・クリックした性別の色を変更する
//  2．戻り値  
//		なし 
//  3．備考 
//  061013  S1神立  V1.4   フォーカス状態のイメージに替えるように変更
//
//************************************************
function SelectSex(num)
{
	try{
		if(g_PSex > 0 && g_PSex <= 3) {		
           // 前回のクリックを解除
            document.getElementsByName("imgSex")[g_PSex-1].src = IMGSEX_BUTTON_UP;
            // 今回のボタンをチェック
            // 061010 神立 >>>
            // mousedownで選択された時はフォーカス状態のイメージにする
            if(event == null) {
                document.getElementsByName("imgSex")[num-1].src = IMGSEX_BUTTON_DOWN;
            }else if(event.type == "mousedown"){
                document.getElementsByName("imgSex")[num-1].src = IMGSEX_BUTTON_DOWN_FOCUS;
            }else{
                document.getElementsByName("imgSex")[num-1].src = IMGSEX_BUTTON_DOWN;
            }
            // <<<
 			g_PSex = num;
		}
		else{
			// ボタンを全てを解除
			document.getElementsByName("imgSex").src = IMGSEX_BUTTON_UP;
			// デフォルトのボタンをチェック
			document.getElementsByName("imgSex")[SEX_OTHER-1].src = IMGSEX_BUTTON_DOWN;
			g_PSex = PATIENT_OTHER;
		}
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+16);
	}
}
//************************************************
// FocusSex 
//     性別テーブルフォーカス
//
//  1. 機能 
//     ・フォーカスが当たった／離れた時にイメージを差し替える
//  2．戻り値  
//        なし 
//  3．備考 
//     ・061005 新規作成 S1 神立 
//       
//************************************************
function FocusSex(){
    try{
        var ID_MALE_RADIO   = "DivSexMale_Value";
        var ID_FEMALE_RADIO = "DivSexFemale_Value";
        var ID_OTHER_RADIO  = "DivSexOther_Value";

        var id = event.srcElement.id ;
       
       // ボタンのIDで性別を見分ける
        var num ;
        if(id == ID_MALE_RADIO){        // 男性
            num = SEX_MALE;
        }
        else if(id == ID_FEMALE_RADIO){ // 女性
            num = SEX_FEMALE;
        }
        else {                          // その他 
            num = SEX_OTHER;
        }
        
        // イメージを差し替える
        var img = document.getElementsByName("imgSex")[num-1];
        if(g_PSex != num && event.type == "blur"){      // 凸・フォーカス無し 

            img.src = IMGSEX_BUTTON_UP;
        }
        else if(g_PSex != num && event.type == "focus"){// 凸・フォーカス有り 
            img.src = IMGSEX_BUTTON_UP_FOCUS;
        }
        else if(g_PSex == num && event.type == "blur"){ // 凹・フォーカス無し 

            img.src = IMGSEX_BUTTON_DOWN;
        }
        else if(g_PSex == num && event.type == "focus"){// 凹・フォーカス有り 
            img.src = IMGSEX_BUTTON_DOWN_FOCUS;
        }
        
    }catch(exception){
        ;;;;;;
    }
}
//************************************************
// SelectEra  (EraNo ： 年号フラグ 1:明治2:大正3:昭和4:平成
//                Era   ： 年号 M:明治T:大正S:昭和H:平成
// 	和暦テーブルクリック
//
//  1. 機能 
//     ・クリックした和暦の色を変更する
//  2．戻り値  
//		なし
//  3．備考
//  061013  S1神立  V1.4   フォーカス状態のイメージに替えるように変更
//       
//************************************************
function SelectEra(EraNo,strEra)
{
	try{
        // 061013 神立 >>>
        // mousedownで解除された時にはフォーカス状態のイメージにする.
        var focused ;
        if(event != null){
            if(event.type == "mousedown"){
                focused = true;
            }
        }// <<<
        
		// 前回クリックした年号と同じ年号の場合
		if(EraNo == g_EraNo)
		{
            // ボタン解除
            // 061013 神立 >>>
            if(focused == true){
                document.getElementsByName("imgEra")[g_EraNo-1].src = IMGERA_BUTTON_UP_FOCUS;
            }else{
                document.getElementsByName("imgEra")[g_EraNo-1].src = IMGERA_BUTTON_UP;
            } // <<<
			g_EraNo = -1;
			g_Era   = "";
		}
		// 前回クリックした年号と異なる年号の場合 
		else if(EraNo > 0 && EraNo <= 4){
			// 前回のクリックを解除
			if(g_EraNo > 0 && g_EraNo <= 4)
			document.getElementsByName("imgEra")[g_EraNo-1].src = IMGERA_BUTTON_UP;
            // 今回のボタンをチェック
            // 061013 神立 >>>
            if(focused == true){
                document.getElementsByName("imgEra")[EraNo-1].src = IMGERA_BUTTON_DOWN_FOCUS;
            }else{
                document.getElementsByName("imgEra")[EraNo-1].src = IMGERA_BUTTON_DOWN;
            } // <<<
			g_EraNo = EraNo;
			g_Era   = strEra;
		}
		// 異常の場合 
		else{
			// ボタン解除
			document.getElementsByName("imgEra").src = IMGERA_BUTTON_UP;
			g_EraNo = -1;
			g_Era   = "";
		}		
		
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+17);
	}
}

//************************************************
// FocusEra 
//  和暦テーブルフォーカス
//
//  1. 機能 
//     ・フォーカスが当たった／離れた時にイメージを差し替える処理

//  2. 戻り値 
//      なし
//  3. 備考
//     ・061005 新規作成 S1 Kandachi
//       
//************************************************
function FocusEra(){
    try{
        var ID_MEIJI_RADIO     = "DivEraMeiji_Value";
        var ID_TAISHO_RADIO    = "DivEraTaisho_Value";
        var ID_SHOWA_RADIO     = "DivEraShowa_Value";
        var ID_HEISEI_RADIO    = "DivEraHeisei_Value";   

        var id = event.srcElement.id ;
       
       // ボタンのIDで選択された年号を振り分ける
       // 年号フラグ 1:明治2:大正3:昭和4:平成

        var num ;
        if(id == ID_MEIJI_RADIO){    
            num = 1;
        }
        else if(id == ID_TAISHO_RADIO){
            num = 2;
        }
        else if(id == ID_SHOWA_RADIO){
            num = 3;
            
        }else if(id == ID_HEISEI_RADIO){
            num = 4;
        }
        
        // イメージを差し替える
        var element = document.getElementsByName("imgEra")[num-1];
        if(g_EraNo != num && event.type == "blur"){       // 非選択中・フォーカス無し 
            element.src = IMGERA_BUTTON_UP;
        }
        else if(g_EraNo != num && event.type == "focus"){ // 非選択中・フォーカス有り
            element.src = IMGERA_BUTTON_UP_FOCUS;
        }
        else if(g_EraNo == num && event.type == "blur"){  // 選択中・フォーカス無し 
            element.src = IMGERA_BUTTON_DOWN;
        }
        else if(g_EraNo == num && event.type == "focus"){ // 選択中・フォーカス有り
            element.src = IMGERA_BUTTON_DOWN_FOCUS;
        }
        
    }catch(exception){
        ;;;;;;
    }
}

//2009.12.01 V1.1(B)対応 FF星野 ADD-ST
//************************************************
// SelectSexNeutred
//
// 	去勢避妊テーブルクリック
//
// １．機能 
//     ・クリックした去勢避妊の色を変更する
//  2．戻り値  
//		なし 
//  3．備考 
//
//************************************************
function SelectSexNeutred(num)
{
	try{
// 2011/02/22 NDD北村 CQ#557-559 UPD ST
//		if(g_PNeutredSex  > 0 && g_PNeutredSex <= 3) {		
//           // 前回のクリックを解除
//            document.getElementsByName("imgSexNeutred")[g_PNeutredSex-1].src = IMGSEX_BUTTON_UP;
//            // 今回のボタンをチェック
//            if(event == null) {
//                document.getElementsByName("imgSexNeutred")[num-1].src = IMGSEX_BUTTON_DOWN;
//            }else if(event.type == "mousedown"){
//                document.getElementsByName("imgSexNeutred")[num-1].src = IMGSEX_BUTTON_DOWN_FOCUS;
//            }else{
//                document.getElementsByName("imgSexNeutred")[num-1].src = IMGSEX_BUTTON_DOWN;
//            }
//            // <<<
// 			g_PNeutredSex = num;
//		}
// 2011/02/22 NDD北村 CQ#557-559 UPD
		if(g_PNeutredSex >= 0 && g_PNeutredSex <= 2)
		{
			var num2;
			if(g_PNeutredSex == 0) num2 = 3; else num2 = g_PNeutredSex;
			// 前回のクリックを解除
			document.getElementsByName("imgSexNeutred")[num2-1].src = IMGSEX_BUTTON_UP;

			// 今回のボタンをチェック
			if(event == null)
			{
				document.getElementsByName("imgSexNeutred")[num-1].src = IMGSEX_BUTTON_DOWN;
			}
			else if(event.type == "mousedown")
			{
				document.getElementsByName("imgSexNeutred")[num-1].src = IMGSEX_BUTTON_DOWN_FOCUS;
			}
			else
			{
				document.getElementsByName("imgSexNeutred")[num-1].src = IMGSEX_BUTTON_DOWN;
			}
			if(num == 3) g_PNeutredSex = 0; else g_PNeutredSex = num;
		}
// 2011/02/22 NDD北村 CQ#557-559 UPD ED
		else{
			// ボタンを全てを解除
			document.getElementsByName("imgSexNeutred").src = IMGSEX_BUTTON_UP;
			// デフォルトのボタンをチェック
			// 2011/02/22 NDD北村 CQ#557-559 UPD ST
			//document.getElementsByName("imgSexNeutred")[SEX_NEUTRED_UNKNOWN-1].src = IMGSEX_BUTTON_DOWN;
			// 2011/02/22 NDD北村 CQ#557-559 UPD
			document.getElementsByName("imgSexNeutred")[2].src = IMGSEX_BUTTON_DOWN;
			// 2011/02/22 NDD北村 CQ#557-559 UPD ED
			g_PNeutredSex = SEX_NEUTRED_UNKNOWN;
		}
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+16);
	}
}

//************************************************
// FocusSexNeutred 
//     去勢避妊テーブルフォーカス
//
//  1. 機能 
//     ・フォーカスが当たった／離れた時にイメージを差し替える処理
//  2．戻り値  
//        なし 
//  3．備考 
//       
//************************************************
function FocusSexNeutred(){
    try{
        var ID_ALTERED_RADIO   = "DivSexNeutredAltered_Value";
        var ID_UNALTERED_RADIO = "DivSexNeutredUnAltered_Value";
        var ID_UNKNOWN_RADIO  = "DivSexNeutredUnknown_Value";

        var id = event.srcElement.id ;
       
       // ボタンのIDで性別を見分ける
        var num ;
        if(id == ID_ALTERED_RADIO){        // 去勢有り
            num = SEX_NEUTRED_ALTERED;
        }
        else if(id == ID_UNALTERED_RADIO){ // 去勢無し
            num = SEX_NEUTRED_UNALTERED;
        }
        else {                          // 不明
            num = SEX_NEUTRED_UNKNOWN;
        }
        
        // イメージを差し替える
// 2011/02/22 NDD北村 CQ#557-559 UPD ST
//        var img = document.getElementsByName("imgSexNeutred")[num-1];
// 2011/02/22 NDD北村 CQ#557-559 UPD
		var num2;
		if(num == 0) num2 = 3; else num2 = num;
		var img = document.getElementsByName("imgSexNeutred")[num2-1];
// 2011/02/22 NDD北村 CQ#557-559 UPD ED
        if(g_PNeutredSex != num && event.type == "blur"){      // 凸・フォーカス無し 

            img.src = IMGSEX_BUTTON_UP;
        }
        else if(g_PNeutredSex != num && event.type == "focus"){// 凸・フォーカス有り 
            img.src = IMGSEX_BUTTON_UP_FOCUS;
        }
        else if(g_PNeutredSex == num && event.type == "blur"){ // 凹・フォーカス無し 

            img.src = IMGSEX_BUTTON_DOWN;
        }
        else if(g_PNeutredSex == num && event.type == "focus"){// 凹・フォーカス有り 
            img.src = IMGSEX_BUTTON_DOWN_FOCUS;
        }
        
    }catch(exception){
        ;;;;;;
    }
}

//************************************************
// GetPatientInfo
//     患者情報取得
//
//  1. 機能 
//     ・現在のDBから患者情報を取得する
//  2．戻り値  
//        なし 
//  3．備考 
//       
//************************************************
function GetPatientInfo()
{
// 2009/12/26 ADD TYS松岡 CQ#61対応 Start ------------------------------------
	if(document.getElementById("imgGetPatientInfo").style.visibility == "visible"){
// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ------------------------------------
		g_EraNo = -1;
		var pp = parent.EDITPATIENTDETAIL_UPDATE_PROC.frmUpdate;
		pp.txtMode.value    = ViewStatus;
		pp.searchMode.value = 1;
		pp.patientId.value  = encodeURIComponent(parent.PatientId);
		pp.loginUserId.value= encodeURIComponent(top.LoginUserId);
		pp.loginTime.value  = top.LoginTime;
		//2010/12/06 30501エラー改善対応 MOD-ST
		GetPatientInfoProc(pp);
		//pp.submit();
		//2010/12/06 30501エラー改善対応 MOD-ED
// 2009/12/26 ADD TYS松岡 CQ#61対応 Start ------------------------------------
		SearchMode = "1";
	}
// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ------------------------------------
}

//************************************************
// LengthCheck
//     文字数入力の抑制
//
//  1. 機能 
//     ・入力文字数の抑制を行う。
//  2．戻り値  
//        なし 
//  3．備考 
//       
//************************************************
function LengthCheck(target,maxlength) {
    if ( target.value.length > maxlength ) {
        target.value = target.value.substr(0,maxlength);
    }
    target.focus();
}

//2009.12.01 V1.1(B)対応 FF星野 ADD-ED

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
	try{
		// エラーダイアログ非表示
		Public_CloseError();

		// エラーコード判定 
		if(ErrorCode == 1){
			document.getElementById("txtPatientName").onfocus();		
		}
		else if(ErrorCode == 2){
			document.getElementById("txtPatientKanjiName").onfocus();		
		}
		else if(ErrorCode == 3){
			document.getElementById("txtPatientBirth").onfocus();		
		}
		
		ErrorCode = 0;
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+18);
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
//***************************************************************************
function Fn_OnConfirmButton(command){
	try{
/*
    switch(command){
      case 1:
        break;
      case 0:
		    // 確認ボックスを閉じる
		    Public_CloseConfirm();
        return;
      default:
	      Public_Error(FATAL_ERROR, "UnExcepted command" + command);	
        return;
    }
*/
// CHANGE hata 2005/02/28===========================================


/*
      document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_CHANGE_VERIFIED,"");
      document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_CHANGE_VERIFIED,"");
      document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_CHANGE_VERIFIED,"Cannt Get Message.");
      Public_Confirm();
*/

    //----------//
    // 更新処理 //
    //----------//
		// 患者情報を編集しないかつ患者テーブルに変更しない場合は更新処理を行わない 
    if(parent.PatientEditFlag == 0 && command == 0){
      // 画面遷移
      PatientDetailNext();
		  // 確認ボックスを閉じる
		  Public_CloseConfirm();
    }else{
		  // 処理中表示
		  Public_Message("DIALOG", ProcString);	
		  // 確認ボックスを閉じる
		  Public_CloseConfirm();
 		  // 更新処理タイムアウト予約 
		  //2010/11/22 30501エラー改善対応 MOD ST
		  UpdateTimeoutId	= setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS_EDITPATIENTDETAIL+",'"+FILE_NAME+"',"+ (SPOT_CODE+19) +")", UPDATE_TIMEOUT);
		  //2010/11/22 30501エラー改善対応 MOD ED
		  // 処理フレームに処理要求 
//		  var pp = parent.EDITPATIENTDETAIL_UPDATE_PROC.frmUpdate;
    if(parent.isModifyCtrlCE){
		  var pp = parent.FRAME_PROC.frmUpdate;
    }
    //ページローダを使用する(既存処理)
    else{
		  var pp = parent.EDITPATIENTDETAIL_UPDATE_PROC.frmUpdate;
    }

		  switch(ViewStatus){
			  case VIEW_MODE_EDIT:	// 患者詳細編集 
//				pp.patientId.value        = parent.PatientId;
//070607 HSK古場 PVCS#2281 UPDATE-ST
//				  pp.patientId.value        = escape(parent.PatientId);
				  pp.patientId.value        = encodeURIComponent(parent.PatientId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
				  break;
			  case VIEW_MODE_CHANGE:	// 変更患者詳細情報
//				pp.patientId.value        = parent.EditPatientId;
//070607 HSK古場 PVCS#2281 UPDATE-ST
//				  pp.patientId.value        = escape(parent.EditPatientId);
				  pp.patientId.value        = encodeURIComponent(parent.EditPatientId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
				  break;
			  default:
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+20);
				  return;
		  }
//CHANGE 2005/05/16===============
		  pp.txtMode.value          = ViewStatus;
		  pp.commandId.value        = command; 
		  pp.studySequence.value    = parent.StudySequence;
  //CHANGE hata===================
//070607 HSK古場 PVCS#2281 UPDATE-ST
//		  pp.patientName.value      = escape(EditPatientName);
//		  pp.patientKanjiName.value = escape(EditPatientKanjiName);
		  pp.patientName.value      = encodeURIComponent(EditPatientName);
		  pp.patientKanjiName.value = encodeURIComponent(EditPatientKanjiName);
//070607 HSK古場 PVCS#2281 UPDATE-ED
  //CHANGE EN=====================
		  pp.patientSex.value       = EditPatientSex;
		  pp.patientBirth.value     = EditPatientBirth;
      pp.studyStatus.value      = parent.StudyStatus;
//070607 HSK古場 PVCS#2281 UPDATE-ST
//      pp.loginUserId.value      = escape(top.LoginUserId);
      pp.loginUserId.value      = encodeURIComponent(top.LoginUserId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
			pp.loginTime.value        = top.LoginTime;
  //ADD hata 2005/02/28===============
      pp.updateFlag.value    = parent.PatientEditFlag;
  //===================================				
//CHANGE ===============

		//2009.12.01 V1.1(B)対応 FF星野 ADD-ST
		pp.searchMode.value = 0;
		pp.patientComment.value = EditPatientComment;
		pp.patientsSize.value	= EditPatientsSize;
		pp.patientsWeight.value = EditPatientsWeight;
		pp.neuteredSex.value	= EditNeuteredSex;
		pp.speciesDescription.value = EditSpeciesDescription;
		pp.breedDescription.value		= EditBreedDescription;
		// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ------------------------------------
		if(KanjiInputFlag == FLAG_NOKANJI){
			pp.responsiblePerson.value	= EditResponsiblePerson;
		}
		else{
			pp.responsiblePerson.value	= EditResponsiblePersonIdoGraphic;
		}
		// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ------------------------------------
		// 2010/04/19 DEL TYS園木 責任者マルチバイト対応 Start ------------------------------------
		//pp.responsiblePerson.value	= EditResponsiblePerson;
		// 2010/04/19 DEL TYS園木 責任者マルチバイト対応 End   ------------------------------------
		pp.responsibleOrganization.value = EditResponsibleOrganization;
		//2009.12.01 V1.1(B)対応 FF星野 ADD-ED
		//2010/12/06 30501エラー改善対応 MOD-ST
		  UpdatePatientInfoProc(pp);
		  //pp.submit();
		//2010/12/06 30501エラー改善対応 MOD-ED
		  pp = null;
		}
// CHANGE EN ==========================================================
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+21);
	}
}
//*****************************************************************************
// Fn_Exclusive
//
// １．機能
//     排他の開放処理を行う
// ２．戻り値
//　　  なし 
// ３．備考 
//　　　なし 
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
		  // 処理中表示
		  Public_Message("DIALOG", ProcString);	
      //タイマ予約 
			//2010/11/22 30501エラー改善対応 MOD ST
			// 2013/02/15 NDD北村 CQ#1650 DEL Start
			// PROC_MODE = (ViewStatus == VIEW_MODE_EDIT) ? PROC_MODE_EDIT : PROC_MODE_CHANGE;
			// 2013/02/15 NDD北村 CQ#1650 DEL End
			UpdateTimeoutId	= setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS_EXCLUSIVE+",'"+FILE_NAME+"',"+ (SPOT_CODE+22) +")", UPDATE_TIMEOUT);
			//2010/11/22 30501エラー改善対応 MOD ST
      //排他の開放処理 
      switch(ViewStatus){
			  case VIEW_MODE_EDIT:
			  case VIEW_MODE_CHANGE:
          parent.EXCLUSIVE_PROC.Public_Exclusive(ProcMode,   parent.StudySequence, "", ExclusiveModeStudyEnd);
          break;
        default:
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+23);
          return;          
      }
    }
  }
  catch(e){
     Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+24);
  }
}
//*****************************************************************************
// Public_EndExclusive
//
// １．機能 
//      排他処理後の処理 
// ２．戻り値
//　　  無し 
// ３．備考 
//*****************************************************************************
function Public_EndExclusive(returnCodeRu, returnCodeStudy){
  try{
    //タイマ予約解除
    clearTimeout(UpdateTimeoutId);

    //エラーのチェックを行う
    if(returnCodeStudy != 0){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+26);
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
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+26);
  }
}
//************************************************
// Fn_WriteLog
//
// １．機能 
//      ログを出力する



// ２．戻り値
//　　  特になし



// ３．備考



//************************************************
function Fn_WriteLog(procMode, ctrlCommand){
	try{
		parent.LOGGER_PROC.location.replace("Logger_Proc.aspx?" + "Display=" + procMode + "&Command=" + ctrlCommand + "&LoginUserId=" + top.LoginUserId + "&OpenMode=" + parent.OpenMode);
	}
	catch(e){
     Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+27);
	}
}
//*****************************************************************************
// Fn_ButtonEnable(disp  0:不活性  1:活性
// １．機能
//     メニューボタンを活性・不活性化する 
// ２．戻り値
//　　  なし 
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
  		  document.getElementById("imgNext_Enable").style.visibility   = "visible";
  		  document.getElementById("imgNext_Disable").style.visibility  = "hidden";
	      document.getElementById("DivButtonOK_Value").style.color     = "black";
	      break;
	    default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+28);
	      break;
	  }
	}
	catch(e){
     Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+29);
	}
}
//*****************************************************************************
// Fn_SoftKeyBoardLoad
// １．機能
//      ソフトキーボード読み込み完了後にソフトキーボード表示
// ２．戻り値
//　　  なし 
// ３．備考 
//　　　なし 
//*****************************************************************************
function Fn_SoftKeyBoardLoad(){
	try{
	  //ページ読み込み完了後ソフトキーボード表示
    document.getElementById("frmSoftKeyBoard").style.width  = "800px";
    document.getElementById("frmSoftKeyBoard").style.height = "313px";
		
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+30);
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
//     '06/10/13    S1神立      V1.4    操作性向上の為改造 
//     
//***************************************************************************
function Fn_OnButton(tableNo){
  try{
		switch(tableNo){
    //============
    //確認ダイアログキャンセル
    //============
    case 50:   //ONCLICK
//      Fn_OnConfirmButton(0);
      // ＤＢ反映時 
      if(ConfirmFlag == 2){
        Fn_OnConfirmButton(0);
      }
      // 確定後の検査の修正時 
      else{
        Public_CloseConfirm();
//070530 HSK山本 PVCS#2275 ADD-ST
        FocusTextbox();
//070530 HSK山本 PVCS#2275 ADD-ED
      }
      break;
    case 51:   //ONMOUSEDOWN
      document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_DOWN;
	  	break;
    case 52:   //ONMOUSEUP
            // 061006 Kandachi >>>
            if(document.getElementById("DIV_ConfirmCancelButton").focused == true){
                document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_FOCUS;
            }else{
                document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_UP;
            }
            // <<<
            break;
        case 53 :  // ONFOCUS 061006 Kandachi
            if(document.getElementById("DIV_ConfirmCancelButton").pressed != true){
//070425 HSK山本 PVCS#2137 UPDATE-ST
//        　  document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_FOCUS;
            document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_FOCUS;
//070425 HSK山本 PVCS#2137 UPDATE-ED
            }         
            break;
        case 54 :  // ONBLUR 061006 Kandachi
            if(document.getElementById("DIV_ConfirmCancelButton").pressed != true){
                document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_UP;
            }
            break;

    //============
    //確認ダイアログ再試行(OK)
    //============
    case 60:   //ONCLICK
//      Fn_OnConfirmButton(1);
      // ＤＢ反映時
      if(ConfirmFlag == 2){
        Fn_OnConfirmButton(1);
      }
      // 確定後の検査の修正時 
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
    case 61:   //ONMOUSEDOWN
      document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_DOWN;
	  	break;
    case 62:   //ONMOUSEUP
            // 061006 Kandachi >>>
            if(document.getElementById("DIV_ConfirmOkButton").focused == true){
                document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_FOCUS;
            }else{
                document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_UP;
            }
            // <<<
	  	break;
    case 63 :  // ONFOCUS 061006 Kandachi
            if(document.getElementById("DIV_ConfirmOkButton").pressed != true){
                document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_FOCUS;
            }
            break;
    case 64 :  // ONBLUR 061006 Kandachi
            if(document.getElementById("DIV_ConfirmOkButton").pressed != true){
                document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_UP;
            }
            break;

    //============
    //戻るボタン
    //============
		case 90:  // ONCLICK
      PatientDetailBack();
			break;
		case 91:  // ONMOUSEDOWN
		  document.getElementById("imgBack").src = IMG_BACK_DOWN;
			break;
		case 92:  // ONMOUSEUP
            if(document.getElementById("divButtonNG").focused == true){
                document.getElementById("imgBack").src = IMG_BACK_FOCUS;
            }else{
                document.getElementById("imgBack").src = IMG_BACK_UP;
            }
            break;
        case 93:  // ONFOCUS 061002Kandachi
            if(document.getElementById("divButtonNG").pressed != true){
                document.getElementById("imgBack").src = IMG_BACK_FOCUS;
            }
            break;
        case 94: // ONBLUR 061002Kandachi
            if(document.getElementById("divButtonNG").pressed != true){
                document.getElementById("imgBack").src = IMG_BACK_UP;
            }
            break;

    //============
    //次へ(修正完了)ボタン
    //============
		case 95:
      CheckPatinetDetail();

    if((parent.OpenMode == OPEN_MODE_DIALOG) && 
      ('function' === typeof window.external.ValidateModifyPatientFlag)){       //UPDSTUDY_12B
        window.external.ValidateModifyPatientFlag(); //UPDSTUDY_12B
    }                                                //UPDSTUDY_12B

			break;
		case 96:  // ONMOUSEDOWN
		  document.getElementById("imgNext_Enable").src = IMG_NEXT_DOWN;
			break;
		case 97:  // ONMOUSEUP
            // 061002Kandachi >>>
            if(document.getElementById("TABLE_Next").focused == true){
                document.getElementById("imgNext_Enable").src = IMG_NEXT_FOCUS;
            }else{
                document.getElementById("imgNext_Enable").src = IMG_NEXT_UP;
            }
            // <<<
            break;
        case 98:  // ONFOCUS 061002Kandachi
            if(document.getElementById("TABLE_Next").pressed != true){
                document.getElementById("imgNext_Enable").src = IMG_NEXT_FOCUS;
            }
            break;
        case 99:  // ONBLUR 061002Kandachi
            if(document.getElementById("TABLE_Next").pressed != true){
                document.getElementById("imgNext_Enable").src = IMG_NEXT_UP;
            }
            break;
      //2009.12.01 1.1(B)対応 FF星野 ADD-ST
    //============
    //患者情報取得ボタン
    //============
		case 100://ボタン押下後の処理
			GetPatientInfo();
			break;
		case 101://ONMOUSEDOWN
			document.getElementById("imgGetPatientInfo").src = IMGPATIENT_BUTTON_DOWN;
			break;
		case 102://ONMOUSEUP
			document.getElementById("imgGetPatientInfo").src = IMGPATIENT_BUTTON_UP;
			break;
     //2009.12.01 1.1(B)対応 FF星野 ADD-ED               
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
          PatientDetailBack();
          break;        
      }        
      Public_CloseError();
      DialogProcMode = "";
      break;
    // 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応(ダイアログが使いづらいので、インタフェース見直し）-ED-
		default:
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+31);
			return;
		}
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+32);
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_NOLOGIN,FILE_NAME,SPOT_CODE+33)
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_LOGOFF,FILE_NAME,SPOT_CODE+34)
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_DIFERENT,FILE_NAME,SPOT_CODE+35)
				return;
			//操作権限がない 
			case CHECK_AUTHORITY_ERROR_AUTHORITY:
    		Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MESSAGE_ID_FORBIDDEN,""), top.DispFrame.Public_GetLangMsgTitle2(MESSAGE_ID_FORBIDDEN,""),top.DispFrame.Public_GetLangMsgString(MESSAGE_ID_FORBIDDEN,"Cannt Get Message.")); 
				return;
			default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+36);
				return;
		}
	}catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+37);
	}	
}
//20050609(PVCS#350)EN
// 2005/07/06 029 H.SAITO PVCS:#189 ｶﾝｼﾞｬﾒｲ,漢字患者名の後方スペースを除去する
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
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+38);
   }	
}

// 2006/04/06 H.SAITO PVCS#1730 -ST-
//***************************************************************************
//  Fn_GetRemoveStrCountForwardEx(targetStr, searchRegChar, strPosition)
//	(targetStr: 対象文字列, searchChar：検査文字(正規表現), strPosition：検査位置)	
//
//  1．機能
//      文字列の前方に指定した文字がいくつあるかを数え、その文字を除いた後の文字位置を返します。

//	2．戻り値
//		  文字列数
//  3．備考

//***************************************************************************
function Fn_GetRemoveStrCountForwardEx(targetStr, searchRegChar, strPosition){
   try{
     // チェック対象文字であればひとつ後ろの文字を再検索
     if(targetStr.charAt(strPosition).match(searchRegChar)){
       // ただし、すでに後方まで検索済みの場合は、終了。

       if(strPosition == targetStr.length - 1){
         return targetStr.length;
       }
       return Fn_GetRemoveStrCountForwardEx(targetStr, searchRegChar, strPosition + 1);
     }
     // チェック文字と異なったため終了

     else{
       return strPosition;
     }
   }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+39);
   }	
}
// 2006/04/06 H.SAITO PVCS#1730 -ED-
// 2006/04/06 H.SAITO PVCS#1730 -ST-
//***************************************************************************
//  Fn_GetRemoveStrCountEx(targetStr, searchRegChar, strPosition)
//	(targetStr: 対象文字列, searchChar：検査文字(正規表現), strPosition：検査位置)	
//
//  1．機能
//      文字列の後方に指定した文字がいくつあるかを数え、その文字を除いた後の文字数を返します。

//	2．戻り値
//		  文字列数
//  3．備考

//***************************************************************************
function Fn_GetRemoveStrCountEx(targetStr, searchRegChar, strPosition){
   try{
     // チェック対象文字であればひとつ後ろの文字を再検索
     if(targetStr.charAt(strPosition).match(searchRegChar)){
       // ただし、すでに先頭まで検索済みの場合は、終了。

       if(strPosition == 0){
         return 0;
       }
       return Fn_GetRemoveStrCountEx(targetStr, searchRegChar, strPosition - 1);
     }
     // チェック文字と異なったため終了

     else{
       return strPosition + 1;
     }
   }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+40);
   }	
}
// 2006/04/06 H.SAITO PVCS#1730 -ED-


//***************************************************************************
//  InitFocus()
//  1．機能 
//      患者情報入力画面のフォーカス初期位置をセットする。 
//          ① テキストボックスの何れかが入力されている時は「次へ」にフォーカス 
//          ② それいがいは、テキストボックスにフォーカス 
//  2．戻り値   なし 
//  3．備考     06/11/02    S1神立  V1.4    新規作成 
//              06/11/27    S1神立  V1.4    キャレットの位置を設定する処理を追加 
//              07/05/14    HSK山本 V2.0    PVCS#2204対応 
//  
//***************************************************************************
function InitFocus(){
    try{
        var name      = document.getElementById("txtPatientName");
        var kanjiName = document.getElementById("txtPatientKanjiName");
        var birthDay  = document.getElementById("txtPatientBirth");
        var nextBtn          = document.getElementById("TABLE_Next");
        
        var isAllBlank = (name.value == "") && (kanjiName.value == "") && (birthDay.value == "");
        
        if(isAllBlank != true && ViewStatus != VIEW_MODE_EDIT){
            nextBtn.focus();    // ①
            name.style.color                = NONACTIVE_FORE_COLOR;
            name.style.backgroundColor      = NONACTIVE_BACK_COLOR;
            kanjiName.style.color           = NONACTIVE_FORE_COLOR;
            kanjiName.style.backgroundColor = NONACTIVE_BACK_COLOR;
//070514 HSK山本 PVCS#2204対応 ADD-ST
            birthDay.style.color           = NONACTIVE_FORE_COLOR;
            birthDay.style.backgroundColor = NONACTIVE_BACK_COLOR;
//070514 HSK山本 PVCS#2204対応 ADD-ED
            gSelected = null;
        }else {
            FocusTextbox();     // ②
        }
        // キャレットの位置を戻す 
        name.InitCaret();
        if(KanjiInputFlag == FLAG_KANJI){
            kanjiName.InitCaret();
        }
    }catch(exception){
        WriteIISLog(FILE_NAME, SPOT_CODE + 41);
    }
}

//***************************************************************************
//  FocusTextbox()
//  1．機能 
//      ① 確認モニタまたは漢字名入力不可またはﾌﾘｶﾞﾅ自動入力OFFの時は、ｶﾝｼﾞｬﾒｲにフォーカス
//      ② デスクトップPCで漢字名入力可且つﾌﾘｶﾞﾅ自動入力ONの時は漢字患者名にフォーカス
//  2．戻り値   なし 
//  3．備考     06/11/02    S1神立  V1.4    新規作成 
//              06/11/27    S1神立  V1.4    キャレットの位置を設定する処理を追加 
//  
//***************************************************************************
function FocusTextbox(){
    try{
        var name      = document.getElementById("txtPatientName");
        var kanjiName = document.getElementById("txtPatientKanjiName");
        var birthDay  = document.getElementById("txtPatientBirth");
        birthDay.focus();   // 最初に関係ない所にフォーカスする（理由は不明）


        if(isWindowsCE() == true 
        || KanjiInputFlag != FLAG_KANJI 
        || FuriganaAutomaticInput == false){
            name.focus();       // ①
        }else {
            kanjiName.focus();  // ②
        }
        // キャレットの位置を戻す

        name.InitCaret();
        if(KanjiInputFlag == FLAG_KANJI){
            kanjiName.InitCaret();
        }
    }catch(exception){
        WriteIISLog(FILE_NAME, SPOT_CODE + 42);
    }
}

//2010/12/06 30501エラー改善対応 ADD ST
var objXMLHttp;
var Prototype = {
  emptyFunction: function() {}
}
//*****************************************************************************
// UpdatePatientInfoProc
//
// １．機能
//      サーバ側の処理を行う
// ２．戻り値
//　　  なし

// ３．備考

//*****************************************************************************
function UpdatePatientInfoProc(objForm){
	try{
		if ((top.WindowOpenMode == 0) || (top.forceFrameProcMode == true))
		{
			objForm.submit();
		} else {
			//2012/02/02 FFS生田 CQ#1287 Mod -S
			//var strSendData = "patientId=" + objForm.patientId.value +
			var strSendData = "patientId=" + encodeURIComponent(objForm.patientId.value) +
			//2012/02/02 FFS生田 CQ#1287 Mod -E
				              "&txtMode=" + objForm.txtMode.value +
				              "&commandId=" + objForm.commandId.value +
				              "&studySequence=" + objForm.studySequence.value +
				              "&patientName=" + objForm.patientName.value +
				              "&patientKanjiName=" + objForm.patientKanjiName.value + 
				              "&patientSex=" + objForm.patientSex.value +
				              "&patientBirth=" + objForm.patientBirth.value +
				              "&studyStatus=" + objForm.studyStatus.value +
				              "&loginUserId=" + objForm.loginUserId.value +
				              "&loginTime=" + objForm.loginTime.value +
				              "&updateFlag=" + objForm.updateFlag.value +
				              "&searchMode=0" +
				              "&patientComment=" + encodeURIComponent(objForm.patientComment.value) + 
				              "&patientsSize=" + objForm.patientsSize.value +
				              "&patientsWeight=" + objForm.patientsWeight.value +
				              "&neuteredSex=" + objForm.neuteredSex.value +
				              "&speciesDescription=" + objForm.speciesDescription.value +
				              "&breedDescription=" + objForm.breedDescription.value +
				              "&responsiblePerson=" + objForm.responsiblePerson.value +
				              "&responsibleOrganization=" + objForm.responsibleOrganization.value;
			if (objXMLHttp == null)
			{
				objXMLHttp = new ActiveXObject("MSXML2.XMLHTTP");
			}
			objXMLHttp.open("POST", "/FCRWeb/CrExam/Do_EditPatientDetail_Update_Proc.aspx", true);
			objXMLHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=utf-8");
			objXMLHttp.onreadystatechange = function() {
				if ((objXMLHttp.readyState == 4) && (objXMLHttp.status == 200))
				{
					objXMLHttp.onreadystatechange = Prototype.emptyFunction;
					var xmlResponse = objXMLHttp.responseXML;
					objXMLHttp = null;
					if (xmlResponse.getElementsByTagName("Response")[0] == null)
					{
						return;
					}
					var strNextFunction = decodeURIComponent(xmlResponse.getElementsByTagName("ClientScript")[0].text);
					eval(strNextFunction);
				}
			}
			objXMLHttp.send(strSendData);
		}
	}
	catch(e){
    	Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+41);
	}
}

//*****************************************************************************
// GetPatientInfoProc
//
// １．機能
//      サーバ側の処理を行う
// ２．戻り値
//　　  なし

// ３．備考

//*****************************************************************************
function GetPatientInfoProc(objForm){
	try{
		if ((top.WindowOpenMode == 0) || (top.forceFrameProcMode == true))
		{
			window.alert("hoge");
			objForm.submit();
		} else {
			//2012/02/02 FFS生田 CQ#1287 Mod -S
			//var strSendData = "patientId=" + objForm.patientId.value +
			var strSendData = "patientId=" + encodeURIComponent(objForm.patientId.value) +
			//2012/02/02 FFS生田 CQ#1287 Mod -E
				              "&txtMode=" + objForm.txtMode.value +
				              "&commandId=" + "" +
				              "&studySequence=" + "" +
				              "&patientName=" + "" +
				              "&patientKanjiName=" + "" + 
				              "&patientSex=" + "" +
				              "&patientBirth=" + "" +
				              "&studyStatus=" + "" +
				              "&loginUserId=" + objForm.loginUserId.value +
				              "&loginTime=" + objForm.loginTime.value +
				              "&updateFlag=" + "" +
				              "&searchMode=1" +
				              "&patientComment=" + "" + 
				              "&patientsSize=" + "" +
				              "&patientsWeight=" + "" +
				              "&neuteredSex=" + "" +
				              "&speciesDescription=" + "" +
				              "&breedDescription=" + "" +
				              "&responsiblePerson=" + "" +
				              "&responsibleOrganization=" + "";
			if (objXMLHttp == null)
			{
				objXMLHttp = new ActiveXObject("MSXML2.XMLHTTP");
			}
			objXMLHttp.open("POST", "/FCRWeb/CrExam/Do_EditPatientDetail_Update_Proc.aspx", true);
			objXMLHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=utf-8");
			objXMLHttp.onreadystatechange = function() {
				if ((objXMLHttp.readyState == 4) && (objXMLHttp.status == 200))
				{
					objXMLHttp.onreadystatechange = Prototype.emptyFunction;
					var xmlResponse = objXMLHttp.responseXML;
					objXMLHttp = null;
					if (xmlResponse.getElementsByTagName("Response")[0] == null)
					{
						return;
					}
					parent.EditPatientId = decodeURIComponent(xmlResponse.getElementsByTagName("EditPatientId")[0].text.replace(/\+/g," "));
					parent.EditPatientName = decodeURIComponent(xmlResponse.getElementsByTagName("EditPatientName")[0].text.replace(/\+/g," "));
					parent.EditPatientKanjiName = decodeURIComponent(xmlResponse.getElementsByTagName("EditPatientKanjiName")[0].text.replace(/\+/g," "));
					parent.EditPatientSex = decodeURIComponent(xmlResponse.getElementsByTagName("EditPatientSex")[0].text.replace(/\+/g," "));
					parent.EditPatientBirthDate = decodeURIComponent(xmlResponse.getElementsByTagName("EditPatientBirthDate")[0].text.replace(/\+/g," "));
					parent.EditPatientAge = decodeURIComponent(xmlResponse.getElementsByTagName("EditPatientAge")[0].text.replace(/\+/g," "));
					parent.EditPatientComment = decodeURIComponent(xmlResponse.getElementsByTagName("EditPatientComment")[0].text.replace(/\+/g," "));
					parent.EditPatientsSize = decodeURIComponent(xmlResponse.getElementsByTagName("EditPatientsSize")[0].text.replace(/\+/g," "));
					parent.EditPatientsWeight = decodeURIComponent(xmlResponse.getElementsByTagName("EditPatientsWeight")[0].text.replace(/\+/g," "));
					parent.EditPatientsSexNeutred = decodeURIComponent(xmlResponse.getElementsByTagName("EditPatientsSexNeutred")[0].text.replace(/\+/g," "));
					parent.EditPatientSpeciesDescription = decodeURIComponent(xmlResponse.getElementsByTagName("EditPatientSpeciesDescription")[0].text.replace(/\+/g," "));
					parent.EditPatientBreedDescription = decodeURIComponent(xmlResponse.getElementsByTagName("EditPatientBreedDescription")[0].text.replace(/\+/g," "));
					parent.EditResponsiblePerson = decodeURIComponent(xmlResponse.getElementsByTagName("EditResponsiblePerson")[0].text.replace(/\+/g," "));
					parent.EditResponsiblePersonIdoGraphic = decodeURIComponent(xmlResponse.getElementsByTagName("EditResponsiblePersonIdoGraphic")[0].text.replace(/\+/g," "));
					parent.EditResponsibleOrganization = decodeURIComponent(xmlResponse.getElementsByTagName("EditResponsibleOrganization")[0].text.replace(/\+/g," "));
					
					var strNextFunction = decodeURIComponent(xmlResponse.getElementsByTagName("ClientScript")[0].text.replace(/\+/g," "));
					eval(strNextFunction);
				}
			}
			objXMLHttp.send(strSendData);
		}
	}
	catch(e){
    	Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+42);
	}
}
//2010/12/06 30501エラー改善対応 ADD ED