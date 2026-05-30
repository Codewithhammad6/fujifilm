/****************************************************************************

  @file SortMenu_View.js

  @brief SortMenu_Viewのクライアントスクリプト

  @author YSK齋藤

        SpotCode MAX 32
  
  Copyright(c) 2004-2009 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/01  YSK齋藤       V1.0       新規作成 
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  06/11/08  YSK齋藤     V1.4       PVCS#1962,#1666対応 
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応 
  @date  08/04/11  HSK山本     V3.2HF     PVCS#2790対応 
  @date  09/07/16  原田憲      V6.0       NAS対応 
  @date  09/12/01  FFS黒田     V1.1(B)    患者情報項目追加
  @date  14/02/21  FF奥野      V3.0(B)    DX撮影対応

/****************************************************************************/
//[定数]
var PROC_MODE						 = "SORTMENU_VIEW"; // データ取得後の遷移先


var MAXMENU							 = 4;               // １ページ最大４件表示
var THUMBNAIL_HEIGHT		 = 54;              // サムネイル領域高さ
var THUMBNAIL_WIDTH			 = 54;              // サムネイル領域幅


var UPDATE_TIMEOUT			 = 60000;						// 更新処理タイマー
var SELECTMENU_TOP			 = 35;							// メニューボタン上位置
var SELECTMENU_REVICE		 = 75;							// メニューボタン上位置補正値
var SELECTMENU_LEFT			 = 184;							// メニューボタン左位置
var COMMAND_MODE_UPDATE  = "UPDATE";
var COMMAND_MODE_CANCEL  = "CANCEL";
var FATAL_ERROR          = "FATAL_ERROR";   //致命的なエラー 
var RETRY_ERROR          = "RETRY_ERROR";   //再試行可能なエラー
var USER_NOTHING_ERROR   = "USER_NOTHING_ERROR";	//ユーザチェックエラー
var SPOT_CODE            = 0;               //スポットコード


var FILE_NAME            = "SortMenu_View.js";//ファイル名


var MESSAGE_ID           = 31500;           //メッセージID 
var MESSAGE_ID_ACCESS    = 31501;           //メッセージID 
// 2005/07/20 003 H.SAITO #903 メッセージレベル変更(31512～31526→34512～34526)
//var MSG_CHANGE_VERIFIED  = 31526;           // 確定した検査に対する修正確認

var MSG_CHANGE_VERIFIED  = 34526;           // 確定した検査に対する修正確認

//20050609(PVCS#350)ST
var MESSAGE_ID_NOLOGIN   = 31502;              //メッセージID 
var MESSAGE_ID_LOGOFF    = 31503;              //メッセージID 
var MESSAGE_ID_DIFERENT  = 31504;              //メッセージID 
var MESSAGE_ID_FORBIDDEN = 31505;

// 操作権限チェック 戻り値
var RETURN_OK														=  0; //正常終了


var CHECK_AUTHORITY_ERROR_NOT_LOGGED_IN	= -1; //ログインされていない


var CHECK_AUTHORITY_ERROR_LOGGED_OFF		= -2; //ログオフされた
var CHECK_AUTHORITY_ERROR_DIFFERENT_ID	= -3; //ユーザIDがアプリケーション変数と異なっている
var CHECK_AUTHORITY_ERROR_AUTHORITY			= -4; //操作権限がない


//20050609(PVCS#350)EN

// オープンモード

var OPEN_MODE_CE         = 0;               // CEで開かれた場合

var OPEN_MODE_WINDOW     = 1;               // ブラウザで開かれた場合

var OPEN_MODE_DIALOG     = 2;               // ダイアログで開かれた場合


//排他制御スイッチ
var EXCLUSIVE_NOTHING    = -1;              // 排他制御(何もしない)
var EXCLUSIVE_DELL       = 0;               // 排他制御(開放)
var EXCLUSIVE_SET        = 1;               // 排他制御(設定)
var EXCLUSIVE_CHECK      = 2;               // 排他制御(チェック)
//ステータス
var STATE_MISS_SHOT      = "MISS";					// 写損ステータス
var STATE_NOT_SHOT       = "0";							// 未撮ステータス
// 検査取得フラグ
var FLAG_STUDY_GETDATA   = 1;
var FLAG_STUDY_NOGETDATA = 0;
// 操作ログ出力コマンド

var CTRL_UPDATE					 = "Update";        // 修正完了

//サーバから取得する設定値
var IMAGE_FILE_PATH;			                  // 画像ファイルのパス名

var FONT_NAME;                              // フォント名
// 2005/06/23 007 H.SAITO デザイン変更対応(フォントサイズ）


//var FONT_SIZE;                                // フォントサイズ
var FONT_SIZE_MENU;                           // フォントサイズ(短冊内メニュー名称)
var FONT_SIZE_MENU_PAGE;                      // フォントサイズ(短冊メニューページ数)
var FONT_SIZE_BUTTON;                         // フォントサイズ(ボタン)
var FONT_SIZE_UPICON;                         // フォントサイズ(ボタン(上部にアイコンを含む))
var FONT_SIZE_OTHER;                          // フォントサイズ(その他)
//画像パス
var IMG_MENULIST_PREV_DOWN    = "../Bmp/cmUpPage2BtnD.gif"
var IMG_MENULIST_PREV_UP      = "../Bmp/cmUpPage2BtnU.gif"
var IMG_MENULIST_PREV_DISABLE = "../Bmp/cmUpPage2BtnX.gif"
var IMG_MENULIST_NEXT_DOWN    = "../Bmp/cmDownPage2BtnD.gif"
var IMG_MENULIST_NEXT_UP      = "../Bmp/cmDownPage2BtnU.gif"
var IMG_MENULIST_NEXT_DISABLE = "../Bmp/cmDownPage2BtnX.gif"
var IMG_MENU_FIRST_DOWN       = "../Bmp/crTopImageBtnD.gif"
var IMG_MENU_FIRST_UP         = "../Bmp/crTopImageBtnU.gif"
var IMG_MENU_FIRST_DISABLE    = "../Bmp/crTopImageBtnX.gif"
var IMG_MENU_PREV_DOWN        = "../Bmp/crUpImageBtnD.gif"
var IMG_MENU_PREV_UP          = "../Bmp/crUpImageBtnU.gif"
var IMG_MENU_PREV_DISABLE     = "../Bmp/crUpImageBtnX.gif"
var IMG_MENU_NEXT_DOWN        = "../Bmp/crDownImageBtnD.gif"
var IMG_MENU_NEXT_UP          = "../Bmp/crDownImageBtnU.gif"
var IMG_MENU_NEXT_DISABLE     = "../Bmp/crDownImageBtnX.gif"
var IMG_MENU_END_DOWN         = "../Bmp/crBottomImageBtnD.gif"
var IMG_MENU_END_UP           = "../Bmp/crBottomImageBtnU.gif"
var IMG_MENU_END_DISABLE      = "../Bmp/crBottomImageBtnX.gif"
var IMG_BACK_DOWN             = "../Bmp/cmOvalAPaleLBtnD.gif"
var IMG_BACK_UP               = "../Bmp/cmOvalAPaleLBtnU.gif"
var IMG_BACK_DISABLE          = "../Bmp/cmOvalAPaleLBtnX.gif"
var IMG_NEXT_DOWN             = "../Bmp/cmCirBGreenBtnD.gif"
var IMG_NEXT_UP               = "../Bmp/cmCirBGreenBtnU.gif"
var IMG_NEXT_DISABLE          = "../Bmp/cmCirBGreenBtnX.gif"
var IMG_CONF_NG_DOWN          = "../Bmp/cmOvalAPaleLBtnD.GIF";
var IMG_CONF_NG_UP            = "../Bmp/cmOvalAPaleLBtnU.GIF";
var IMG_CONF_OK_DOWN          = "../Bmp/cmOvalAGreenLBtnD.GIF";
var IMG_CONF_OK_UP            = "../Bmp/cmOvalAGreenLBtnU.GIF";
//検査ステータス
var STATE_VERIFIED            = "VERIFIED"; // 検査ステータス(確定)
// 2005/07/21 003 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
//// 2005/06/29 002 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
//var COOKIE_NAME_STUDY2        = "StudyLock";	  // 検査排他中クッキー名

//[変数]
var TotalPageString;                        // トータル文字

var PageString;                             // ページ文字

var MenuString;                             // メニュー文字

var ProcString;                             // お待ちください文字

var UserGuidanceString;                     // ユーザガイダンス文字

var MaxPage;		                            // 撮影メニューページの最大値
var SelectPageNo;	                          // 撮影リストページ選択番号
var SelectMenuPage;                         // 撮影メニュー選択ページ(1～)
var SelectMenuNo;                           // 撮影メニュー選択番号(1～)
var SelectMenuTable;                        // 撮影メニュー選択テーブル(1～4)
var SelectMenuCount;                        // 撮影メニュー選択数
// 2005/06/22 002 H.SAITO PVCS #865 並べ替えキャンセル時に、並べ替えした情報が戻らない不具合修正
//var WorkImageSeq;                           // 作業用の画像シーケンス
var UpdateTimeOutId;			                  // SortUpdateタイムアウトプロセスのＩＤ
//[並べ替え用ワーク領域]
var SortImageSeq;					                  // 画像シーケンス
var SortMenuName;					                  // 撮影メニュータイトル
var SortImageStatus;			                  // 画像データ状態 0:NORMAL(通常) / 2MISS(写損) 
var SortDataStatus;				                  // データステータス
var SortThumbnailFileName;                  // サムネイルファイル名
//080411 HSK山本 PVCS#2790対応 ADD-ST
var SortSeriesUID;					                  // シリーズUID
//080411 HSK山本 PVCS#2790対応 ADD-ED

var SortThumbnailHeight;	                  // サムネイル高さ
var SortThumbnailWidth;		                  // サムネイル幅

var SortThumbnailFilePath;					//サムネイルファイルのフルパス //** 2009/07/16 k.harada add

var ExclusiveModeStudy;                     // 検査の排他の設定／チェック 
var ExclusiveModeStudyRelease;              // 検査の排他の設定／チェック 
var CommandMode;                            // 終了コマンド

var CommandParam;                           // 終了パラメタ
// 2005/06/22 009 H.SAITO PVCS #865 並べ替えキャンセル時に、並べ替えした情報が戻らない不具合修正
// 並べ替え情報を記憶しておく領域。最初に機能フレームのデータをコピーし、以後、この領域を使って、データを操作する。


var WorkImageSeq;					                  // 作業用の画像シーケンス
var WorkMenuName;					                  // 作業用の撮影メニュータイトル
var WorkImageStatus;			                  // 作業用の画像データ状態 0:NORMAL(通常) / 2MISS(写損) 
var WorkDataStatus;				                  // 作業用のデータステータス
var WorkThumbnailFileName;                  // 作業用のサムネイルファイル名

var WorkThumbnailHeight;	                  // 作業用のサムネイル高さ
var WorkThumbnailWidth;		                  // 作業用のサムネイル幅
//080411 HSK山本 PVCS#2790対応 ADD-ST
var WorkSeriesUID;
//080411 HSK山本 PVCS#2790対応 ADD-ED

var WorkThumbnailFilePath;					//作業用サムネイルファイルのフルパス //** 2009/07/16 k.harada add

//*****************************************************************************
// Fn_InitPage
//
// １．機能
//     ・ページロード時の処理

//     ・ボタン名の初期表示を行う
// ２．戻り値
//　　  なし


// ３．備考


//*****************************************************************************
function Fn_InitPage(){
  try{
    //画面遷移開始通知設定

    SetViewMovingNotification(ViewMovingNotification);

    //初画面表示(後に、.csの LoadPageにて言語ＤＢから取得すること
    document.getElementById("DIV_TopMenuText").innerText           = TopMenuText;
    document.getElementById("DIV_UpMenuText").innerText            = UpMenuText;
    document.getElementById("DIV_DownMenuText").innerText          = DownMenuText;
    document.getElementById("DIV_LastMenuText").innerText          = LastMenuText;
    document.getElementById("DIV_CancelText").innerText            = CancelText;
    document.getElementById("DIV_UpdateText").innerText            = UpdateText;
		document.getElementById("DIV_ConfirmCancelText").innerText     = ConfirmCancelString; 
		document.getElementById("DIV_ConfirmOkText").innerText         = ConfirmOkString; 
    //フォント名,フォントサイズの設定

    document.getElementById("BODY").style.fontFamily               = FONT_NAME;
    // 2005/06/23 002 H.SAITO デザイン変更対応(フォントサイズ）


    //document.getElementById("BODY").style.fontSize                 = FONT_SIZE + "px";
    for(i = 1; i <= MAXMENU; i++){
      document.getElementById("DIV_SortText" + i).style.fontFamily = FONT_NAME;
      // 2005/06/23 003 H.SAITO デザイン変更対応(フォントサイズ）


      //document.getElementById("DIV_SortText" + i).style.fontSize   = FONT_SIZE + "px";
      document.getElementById("DIV_SortText" + i).style.fontSize   = FONT_SIZE_MENU;
    }
    // 2005/06/23 021 H.SAITO デザイン変更対応(フォントサイズ）


    // ボタン
    document.getElementById("DIV_TopMenuText").style.fontSize        = FONT_SIZE_BUTTON;
    document.getElementById("DIV_UpMenuText").style.fontSize         = FONT_SIZE_BUTTON;
    document.getElementById("DIV_DownMenuText").style.fontSize       = FONT_SIZE_BUTTON;
    document.getElementById("DIV_LastMenuText").style.fontSize       = FONT_SIZE_BUTTON;
    document.getElementById("DIV_CancelText").style.fontSize         = FONT_SIZE_BUTTON;
    document.getElementById("DIV_UpdateText").style.fontSize         = FONT_SIZE_BUTTON;
    // その他


		document.getElementById("TD_ProcText").style.fontSize            = FONT_SIZE_OTHER;
		document.getElementById("TD_ErrorText").style.fontSize           = FONT_SIZE_OTHER;
		document.getElementById("DIV_ErrorOkText").style.fontSize        = FONT_SIZE_BUTTON;
		document.getElementById("DIV_ConfirmCancelText").style.fontSize  = FONT_SIZE_BUTTON;
		document.getElementById("DIV_ConfirmOkText").style.fontSize      = FONT_SIZE_BUTTON;
    document.getElementById("TD_ConfirmTitle1").style.fontSize       = FONT_SIZE_OTHER;
    document.getElementById("TD_ConfirmTitle2").style.fontSize       = FONT_SIZE_OTHER;
    document.getElementById("TD_ConfirmText").style.fontSize         = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorTitle1").style.fontSize         = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorTitle2").style.fontSize         = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorText").style.fontSize           = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorCode").style.fontSize           = FONT_SIZE_OTHER;

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
//     ・画面を表示する
//
// ２．戻り値
//　　  なし


//
// ３．備考


//*****************************************************************************
function Public_Init(){
	try{
// 2005/08/22 Kanno ADD ST タイトルバーの文字列対応

	// タイトル設定

	top.SetTitle(TitleString);
// 2005/08/22 Kanno ADD ED タイトルバーの文字列対応

    //メニューボタン不活性化


    Fn_ButtonEnable(0);

    //初期化処理


    Fn_Init();

		//データ取得完了フラグが１以外ならばデータを取得する


		if(parent.EndGetDataFlag != FLAG_STUDY_GETDATA){
			parent.STUDYDATA_GET_PROC.Public_GetData(PROC_MODE, parent.StudySequence, "", ExclusiveModeStudy);
		}
		else{
			Public_EndGetData();
		}
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
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


//*****************************************************************************	
function Public_EndGetData(){	
  try{
    var i;
		var returnValue;

		//データ取得完了フラグをＯＮにする
		parent.EndGetDataFlag = FLAG_STUDY_GETDATA;

    //ユーザガイダンス
//2005/05/24-ST==========
//    parent.INFORMATION_VIEW.Public_SetUserGuidance(UserGuidanceString); 
    parent.INFORMATION_VIEW.Public_SetUserGuidance(UserGuidanceString,1); 
//2005/05/24-EN==========
    //患者情報表示
    parent.INFORMATION_VIEW.Public_SetPatientId(parent.PatientId); 
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update Start
//    parent.INFORMATION_VIEW.Public_SetPatientSex(parent.PatientSex);
    parent.INFORMATION_VIEW.Public_SetPatientSex(parent.PatientSex, parent.PatientsSexNeutred);
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update End
    parent.INFORMATION_VIEW.Public_SetPatientName(parent.PatientName, parent.PatientKanjiName);   
    parent.INFORMATION_VIEW.Public_SetPatientBirthDate(parent.PatientBirthDate);
    parent.INFORMATION_VIEW.Public_SetPatientAge(parent.PatientAge);

    // 2005/06/22 005 H.SAITO PVCS #865 並べ替えキャンセル時に、並べ替えした情報が戻らない不具合修正
    //最初の画像IDの並び順を退避
    //for(i = 0; i < parent.DataCount; i++){
    //  WorkImageSeq[i] = parent.ImageSeq[i];
    //}
    // 2005/06/22 009 H.SAITO PVCS #865 並べ替えキャンセル時に、並べ替えした情報が戻らない不具合修正
    // 機能フレームの情報をコピーして、この領域を使って並べ替えを行う。


    WorkImageSeq          = parent.ImageSeq.slice(0, parent.ImageSeq.length);	                 // 画像シーケンス
    WorkMenuName          = parent.MenuName.slice(0, parent.MenuName.length);                  // 撮影メニュータイトル
    WorkImageStatus       = parent.ImageStatus.slice(0, parent.ImageStatus.length);            // 画像データ状態 0:NORMAL(通常) / 2MISS(写損) 
    WorkDataStatus        = parent.DataStatus.slice(0, parent.DataStatus.length);              // データステータス
    WorkThumbnailFileName = parent.ThumbnailFileName.slice(0, parent.ThumbnailFileName.length);// サムネイルファイル名

    WorkThumbnailHeight   = parent.ThumbnailHeight.slice(0, parent.ThumbnailHeight.length);	   // サムネイル高さ
    WorkThumbnailWidth    = parent.ThumbnailWidth.slice(0, parent.ThumbnailWidth.length);		   // サムネイル幅
    WorkSeriesUID          = parent.SeriesUID.slice(0, parent.SeriesUID.length);	                 // シリーズUID

    WorkThumbnailFilePath = parent.ThumbnailFilePath.slice(0, parent.ThumbnailFilePath.length);// サムネイルファイルフルパス //** 2009/07/16 k.harada add

    //表示順並べ替えボタンを不活性化

    Fn_TopUpMenuBtn_Enable(2);  
    Fn_LastDownMenuBtn_Enable(2);  
    
    //１ページ目を表示する
    Fn_SelectPage(1);

    //メニューボタン活性化


    Fn_ButtonEnable(1);
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
  }
}

//*****************************************************************************
// Fn_Init
//
// １．機能
//     変数の初期化を行う
//
// ２．戻り値
//　　  なし


//
// ３．備考


//*****************************************************************************
function Fn_Init(){
  try{
    //初期化


    // 2005/06/22 009 H.SAITO PVCS #865 並べ替えキャンセル時に、並べ替えした情報が戻らない不具合修正
    //WorkImageSeq       = new Array(); //画像シーケンス
    WorkImageSeq          = "";      // 作業用の画像シーケンス
    WorkMenuName          = "";      // 作業用の撮影メニュータイトル
    WorkImageStatus       = "";      // 作業用の画像データ状態 0:NORMAL(通常) / 2MISS(写損) 
    WorkDataStatus        = "";      // 作業用のデータステータス
    WorkThumbnailFileName = "";      // 作業用のサムネイルファイル名 
    WorkThumbnailHeight   = "";      // 作業用のサムネイル高さ
    WorkThumbnailWidth    = "";      // 作業用のサムネイル幅
    WorkSeriesUID         = "";      // 作業用のシリーズUID
    MaxPage           = 0;		       //撮影メニューページの最大値
    SelectPageNo      = -1;	         //撮影リストページ選択番号
    SelectMenuPage    = -1;	         //撮影メニュー選択ページ(1～)
    SelectMenuNo      = -1;          //撮影メニュー選択番号(1～)
    SelectMenuTable   = -1;	         //撮影メニュー選択テーブル(1～4)
    SelectMenuCount   = 0;           //メニューの選択数 
    UpdateTimeOutId   = null;        //SortUpdateタイムアウトプロセスのＩＤ

    WorkThumbnailFilePath = "";      // 作業用のサムネイルファイルフルパス //** 2009/07/16 k.harada add

    parent.INFORMATION_VIEW.Public_ClearInformation();

    //--------------------------------------------//
    //モードに応じて排他の管理スイッチを切り替える//
    //--------------------------------------------//
    switch(parent.ExclusiveMode){
      case parent.EXCLUSIVE_MODE1:
        ExclusiveModeStudy        = EXCLUSIVE_NOTHING;   // 検査の排他の設定／チェック 
        ExclusiveModeStudyRelease = EXCLUSIVE_DELL;      // 検査の排他の開放
        break;
      case parent.EXCLUSIVE_MODE2:
        ExclusiveModeStudy        = EXCLUSIVE_NOTHING;   // 検査の排他の設定／チェック 
        ExclusiveModeStudyRelease = EXCLUSIVE_NOTHING;   // 検査の排他の開放
        break;
      default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
        break;
    }

  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
  }
}
//*****************************************************************************
// Fn_OnButton
//
// １．機能
//     ・ボタン押下時の処理を行う
//
// ２．戻り値
//　　  なし


//
// ３．備考


//　　　なし


//*****************************************************************************
function Fn_OnButton(tableNo){
  try{
    switch(tableNo){
      case 1: // 撮影メニュー１


      case 2: // 撮影メニュー２


      case 3: // 撮影メニュー３


      case 4: // 撮影メニュー４


        Fn_OnSelectMenu(tableNo);
        break;
      case 5: // 撮影メニュー５選択済みボタン(１～４)
        Fn_OnSelectMenu(SelectMenuTable);
        break;
			//----------//
      // ↑ボタン //    
			//----------//
      case 11: // CLICK
        Fn_SelectPage(SelectPageNo - 1);
        document.getElementById("IMG_UpBtn_Enable").src   = IMG_MENULIST_PREV_UP;
        break;
      case 12: // MOUSEDOWN
        document.getElementById("IMG_UpBtn_Enable").src   = IMG_MENULIST_PREV_DOWN;
        break;
      case 13: // MOUSEOUT
        document.getElementById("IMG_UpBtn_Enable").src   = IMG_MENULIST_PREV_UP;
        break;
			//----------//
      // ↓ボタン //
			//----------//
      case 15: // CLICK
        Fn_SelectPage(SelectPageNo + 1);
        document.getElementById("IMG_DownBtn_Enable").src = IMG_MENULIST_NEXT_UP;
        break;
      case 16: // MOUSEDOWN
        document.getElementById("IMG_DownBtn_Enable").src = IMG_MENULIST_NEXT_DOWN;
        break;
      case 17: // MOUSEOUT
        document.getElementById("IMG_DownBtn_Enable").src = IMG_MENULIST_NEXT_UP;
        break;
			//--------------//
      // 先頭へボタン //
			//--------------//
      case 21: // CLICK
        Fn_OnTopLastMenu(1);
        document.getElementById("IMG_TopMenuBtn_Enable").src = IMG_MENU_FIRST_UP;
        break;
      case 22: // MOUSEDOWN
        document.getElementById("IMG_TopMenuBtn_Enable").src = IMG_MENU_FIRST_DOWN;
        break;
      case 23: // MOUSEOUT
        document.getElementById("IMG_TopMenuBtn_Enable").src = IMG_MENU_FIRST_UP;
        break;
			//------------//
      // 上へボタン //
			//------------//
      case 31: // CLICK
        Fn_OnUpDownMenu(1);
        document.getElementById("IMG_UpMenuBtn_Enable").src = IMG_MENU_PREV_UP;
        break;
      case 32: // MOUSEDOWN
        document.getElementById("IMG_UpMenuBtn_Enable").src = IMG_MENU_PREV_DOWN;
        break;
      case 33: // MOUSEOUT
        document.getElementById("IMG_UpMenuBtn_Enable").src = IMG_MENU_PREV_UP;
        break;
			//------------//
      // 下へボタン //
			//------------//
      case 41: // CLICK
        Fn_OnUpDownMenu(2);
        document.getElementById("IMG_DownMenuBtn_Enable").src = IMG_MENU_NEXT_UP;
        break;
      case 42: // MOUSEDOWN
        document.getElementById("IMG_DownMenuBtn_Enable").src = IMG_MENU_NEXT_DOWN;
        break;
      case 43: // MOUSEOUT
        document.getElementById("IMG_DownMenuBtn_Enable").src = IMG_MENU_NEXT_UP;
        break;
			//--------------//
      // 最後へボタン //
			//--------------//
      case 51: // CLICK
        Fn_OnTopLastMenu(2);
        document.getElementById("IMG_LastMenuBtn_Enable").src = IMG_MENU_END_UP;
        break;
      case 52: // MOUSEDOWN
        document.getElementById("IMG_LastMenuBtn_Enable").src = IMG_MENU_END_DOWN;
        break;
      case 53: // MOUSEOUT
        document.getElementById("IMG_LastMenuBtn_Enable").src = IMG_MENU_END_UP;
        break;
			//------------//
      // 戻るボタン //
			//------------//
      case 91:// 戻るボタン
        document.getElementById("IMG_CancelBtn").src = IMG_BACK_UP;
        // 戻る/閉じる場合は排他の開放を行わない



        ExclusiveModeStudyRelease = EXCLUSIVE_NOTHING;
        Fn_Exclusive(COMMAND_MODE_CANCEL, "");
        break;
      case 92: // MOUSEDOWN
        document.getElementById("IMG_CancelBtn").src = IMG_BACK_DOWN;
        break;
      case 93: // MOUSEOUT
        document.getElementById("IMG_CancelBtn").src = IMG_BACK_UP;
        break;
			//----------------//
      // 修正完了ボタン //
			//----------------//
      case 95: // CLICK
        //情報未取得の場合は不活性
        if(parent.EndGetDataFlag == FLAG_STUDY_NOGETDATA)return;

        Fn_Update();
        document.getElementById("IMG_UpdateBtn_Enable").src = IMG_NEXT_UP;
        break;
      case 96: // MOUSEDOWN
        //情報未取得の場合は不活性
        if(parent.EndGetDataFlag == FLAG_STUDY_NOGETDATA)return;

        document.getElementById("IMG_UpdateBtn_Enable").src = IMG_NEXT_DOWN;
        break;
      case 97: // MOUSEOUT
        document.getElementById("IMG_UpdateBtn_Enable").src = IMG_NEXT_UP;
        break;
			//------------------------------//
      // 続行可能エラー時のＯＫボタン //
			//------------------------------//
      case 100:
        Public_CloseMessage();
        Public_CloseError();     
        break;
      //----------------//
      // 確認ＯＫボタン //
      //----------------//
			case 111:  //ONCLICK
        // 並べ替え処理実施
        Fn_UpdateExec();
        // 確認ダイアログ非表示
        Public_CloseConfirm();

        document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_UP;
				break;
			case 112:  //ONMOUSEDOWN
        document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_DOWN;
				break;
			case 113: //ONMOUSEOUT
        document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_UP;
				break;
      //----------------------//
      // 確認キャンセルボタン //
      //----------------------//
			case 121: //ONCLICK
        // 確認キャンセル
        Public_CloseConfirm();
        document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_UP;
				break;
			case 122: //ONMOUSEDOWN
        document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_DOWN;
				break;
			case 123: //ONMOUSEOUT
        document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_UP;
				break;
      default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
        return;
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
  }
}
//*****************************************************************************
// Fn_SelectPage
//
// １．機能 
//      指定されたページで撮影メニューリストを表示する
// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Fn_SelectPage(pageNo){
  try{
    var i;                   //ループカウンタ
    var firstMenuTableNo; //一番上に表示するデータの場所
    var menuTableNo;         //撮影メニュー作業用位置(1～∞)
    var pageCountMessage;    //メニュー数／ページ数表示
    var imageTagString;      //サムネイル表示ＩＭＧタグ

    //＜計算＞総ページ数(小数点以下切り上げ)
    MaxPage     = Math.ceil(parent.DataCount / MAXMENU);

    //＜チェック＞指定されたページが有効範囲内か
    if(pageNo < 1 || pageNo > MaxPage){
      return;
    }
    //--------------------//
    // 撮影メニューの表示 //
    //--------------------//
    //＜計算＞一番上に表示するデータの位置
    firstMenuTableNo = (pageNo - 1) * MAXMENU;

    //＜表示＞撮影メニュー
    for(i = 1; i <= MAXMENU; i++){

      //＜計算＞メニュー選択位置
      menuTableNo = firstMenuTableNo + i;

      //＜チェック＞表示するデータが全件数を超えていないか
      if(menuTableNo > parent.DataCount){
	      break;
      }
      
      //＜表示＞テキストを表示    
      document.getElementById("DIV_SortText" + i).style.visibility = "visible";

      //＜表示＞通常のメニューボタンを表示
      document.getElementById("IMG_SortMenu" + i).style.visibility = "visible";

      //＜表示＞未撮の場合はサムネイル非表示
      // 2005/06/22 003 H.SAITO PVCS #865 並べ替えキャンセル時に、並べ替えした情報が戻らない不具合修正
      //if(parent.DataStatus[menuTableNo - 1] == STATE_NOT_SHOT){
      if(WorkDataStatus[menuTableNo - 1] == STATE_NOT_SHOT){
        document.getElementById("DIV_SortFilm" + i).innerHTML        = "";
        document.getElementById("DIV_SortFilm" + i).style.visibility = "hidden";
      }
      //＜表示＞既撮の場合はサムネイル表示
      else{
        imageTagString =  Fn_GetImageTag(menuTableNo);
        document.getElementById("DIV_SortFilm" + i).innerHTML        = imageTagString;
        document.getElementById("DIV_SortFilm" + i).style.visibility = "visible";
      }

      //＜表示＞撮影メニュータイトル
      // 2005/06/22 003 H.SAITO PVCS #865 並べ替えキャンセル時に、並べ替えした情報が戻らない不具合修正
      //document.getElementById("DIV_SortText" + i).innerText=parent.MenuName[menuTableNo - 1];
      document.getElementById("DIV_SortText" + i).innerText=WorkMenuName[menuTableNo - 1];
        
      //＜表示＞ステータス表示（写損）画像データ状態 0:NORMAL(通常) 2:MISS(写損) 
      // 2005/06/22 003 H.SAITO PVCS #865 並べ替えキャンセル時に、並べ替えした情報が戻らない不具合修正
      //if(parent.ImageStatus[menuTableNo - 1] == STATE_MISS_SHOT ){
      if(WorkImageStatus[menuTableNo - 1] == STATE_MISS_SHOT ){
        document.getElementById("IMG_DeleteImage" + i).style.visibility = "visible";         
      }
      else{
        document.getElementById("IMG_DeleteImage" + i).style.visibility = "hidden";         
      }
    }
    //----------------------//
    // 選択状態ボタンの表示 //
    //----------------------//
    //＜表示＞メニュー表示をしなかった場合はメニューを不可視


    if(i <= MAXMENU){
      for(;i <= MAXMENU;i++){
        document.getElementById("IMG_SortMenu"  + i).style.visibility  = 'hidden';
        document.getElementById("DIV_SortFilm"  + i).style.visibility  = 'hidden';
        document.getElementById("DIV_SortText"  + i).style.visibility  = 'hidden';
        document.getElementById("DIV_SortFilm"  + i).innerHTML         = "";
        //＜表示＞ステータス表示を不可視


        document.getElementById("IMG_DeleteImage"  + i).style.visibility = 'hidden';
      }
    }  
    //＜表示＞選択状態ボタン表示
    //表示しているページに選択している撮影メニューがある場合


    if(pageNo == SelectMenuPage){
      //ソート後に呼ばれるため、選択ボタン位置の再計算を行う
      document.getElementById("DIV_SortMenu5").style.top        = SELECTMENU_TOP + SELECTMENU_REVICE * (SelectMenuTable - 1);
      document.getElementById("DIV_SortMenu5").style.left       = SELECTMENU_LEFT;
      document.getElementById("DIV_SortMenu5").style.visibility = "visible";
    }
    //表示しているページに選択している撮影メニューがない場合


    else{
      document.getElementById("DIV_SortMenu5").style.visibility = "hidden";
    }
    //----------------//
    // ページ数の表示 //
    //----------------//
    //＜表示＞総メニュー数　現ページ／総ページ数
    // 2005/06/23 005 H.SAITO デザイン変更対応(フォントサイズ）


    //pageCountMessage = TotalPageString  + parent.DataCount + MenuString;
    //pageCountMessage = pageCountMessage + pageNo  + "/"    + MaxPage + PageString;
    pageCountMessage = TotalPageString  + " "    + parent.DataCount + MenuString;
    pageCountMessage = pageCountMessage + "    " + pageNo  + "/"    + MaxPage + PageString;
    document.getElementById("DIV_TextCnt").innerText = pageCountMessage;

    //＜退避＞選択されているページ番号を保存


    if(MaxPage <= 0){
      SelectPageNo = 0;
    }
    else{
      SelectPageNo = pageNo;
    }
    //------------------------//
    // 前頁・次頁ボタンの表示 //
    //------------------------//
    if(pageNo <= 1){
      //＜表示＞前ページボタンを不活性化



      document.getElementById("IMG_UpBtn_Enable").style.visibility  = "hidden";
      document.getElementById("IMG_UpBtn_Disable").style.visibility = "visible";
    }
    else{
      //＜表示＞前ページボタンを活性化



      document.getElementById("IMG_UpBtn_Enable").style.visibility  = "visible";
      document.getElementById("IMG_UpBtn_Disable").style.visibility = "hidden";
    }
    if(pageNo >= MaxPage){
      //＜表示＞次ページボタンを不活性化



      document.getElementById("IMG_DownBtn_Enable").style.visibility  = "hidden";
      document.getElementById("IMG_DownBtn_Disable").style.visibility = "visible";
    }
    else{
      //＜表示＞次ページボタンを活性化



      document.getElementById("IMG_DownBtn_Enable").style.visibility  = "visible";
      document.getElementById("IMG_DownBtn_Disable").style.visibility = "hidden";
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
  }
}
//*****************************************************************************
// Fn_OnSelectMenu
//
// １．機能 
//      メニューが選択された時の処理を行う
// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Fn_OnSelectMenu(tableNo){
  try{
    var menuTableNo;   //撮影メニューのＮｏ(１～∞）



    if(MaxPage <= 0){
      //何もしない


      return;
    }

    //＜計算＞選択された撮影メニューＮｏ


    menuTableNo = (SelectPageNo - 1) * MAXMENU + tableNo;

    /*--------------*/
    /* 選択状態解除 */
    /*--------------*/
    //＜表示＞既に選択されている場合は選択解除
    if(menuTableNo == SelectMenuNo){

      //＜表示＞非選択画像にする
      document.getElementById("DIV_SortMenu5").style.visibility = "hidden";

      //＜表示＞通常のメニューボタンを表示する
      document.getElementById("IMG_SortMenu" + tableNo).style.visibility = "visible";

      //＜表示＞表示順並べ替えボタンを不活性化



      Fn_TopUpMenuBtn_Enable(2);
      Fn_LastDownMenuBtn_Enable(2);
      //＜退避＞選択情報初期化



      SelectMenuNo    = -1;	//撮影メニュー選択番号
      SelectMenuPage  = -1;	//撮影メニュー選択ページ
      SelectMenuTable = -1;	//撮影メニュー選択テーブル

      return;
    }
    //--------------//
    // 選択状態設定 //
    //--------------//
    //選択画像にする
    document.getElementById("DIV_SortMenu5").style.visibility = "visible";
    document.getElementById("DIV_SortMenu5").style.top        = SELECTMENU_TOP + SELECTMENU_REVICE * (tableNo - 1);
    document.getElementById("DIV_SortMenu5").style.left       = SELECTMENU_LEFT;

    //選択メニューの位置で並べ替えボタンの活性化/不活性化を切り替える
    switch(menuTableNo){
      //先頭の場合


      case 1:
        Fn_TopUpMenuBtn_Enable(2);
        Fn_LastDownMenuBtn_Enable(1);   
				//先頭かつ最後の場合(データが１件しかない場合）



				if(menuTableNo == parent.DataCount){
					Fn_LastDownMenuBtn_Enable(2);   			
				}
        break;
      //最後の場合


      case parent.DataCount:
        Fn_TopUpMenuBtn_Enable(1);
        Fn_LastDownMenuBtn_Enable(2);   
        break;
      //デフォルト


      default:
        Fn_TopUpMenuBtn_Enable(1);
        Fn_LastDownMenuBtn_Enable(1);   
        break;  
    }
    //--------------//
    // 選択情報設定 //
    //--------------//
    //＜退避＞選択情報設定


    //現在選択されているメニューの位置を保存


    SelectMenuPage  = SelectPageNo;
    SelectMenuTable = tableNo;
    SelectMenuNo    = menuTableNo;
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
  }
}
//*****************************************************************************
// Fn_Update
//
// １．機能 
//      修正完了ボタンが選択された時の処理を行う
// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Fn_Update(){
  try{
    var  i;           //ループカウンタ
    var  compareFlag; //データチェック用フラグ

    //操作ログ出力


    Fn_WriteLog(CTRL_UPDATE);

    //データチェック用フラグ初期化  
    compareFlag = "0";

    //送信データのチェック
    //データの長さをチェック
    if(WorkImageSeq.length != parent.ImageSeq.length){
      //データ長が違う（致命的なエラー)
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
    }
    //画像シーケンスの並び順を比較する


    for(i = 0; i < parent.DataCount; i++){
      //１つでも並びが異なっていれば次の処理へ
      if(WorkImageSeq[i] !=  parent.ImageSeq[i]){
        compareFlag = "1";  
        break;
      }
    }
    //最初の並びと同じであれば終了


    if(compareFlag == "0"){
      Public_EndUpdate();
      return;
    } 

    //検査ステータスが確定の場合は確認ダイアログを表示する
    if(parent.StudyStatus == STATE_VERIFIED){
      document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_CHANGE_VERIFIED,"");
      document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_CHANGE_VERIFIED,"");
      document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_CHANGE_VERIFIED,"Cannt Get Message.");
      Public_Confirm();
      return;    
    }

    //並べ替え処理を実施する
    Fn_UpdateExec();

//    //--------//
//    //更新要求//
//    //--------//
//    //修正完了状況フラグを修正完了とする
//    parent.ModifyStatusFlag = 1;
//    //処理中表示
//    Public_Message("DIALOG", ProcString);
//    //タイマ予約


//    UpdateTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+10) +")",UPDATE_TIMEOUT);
//    //＜更新＞処理ＡＳＰに更新を依頼する
//    parent.SORTMENU_UPDATE_PROC.Public_Update(PROC_MODE, parent.StudySequence, parent.ImageSeq, parent.StudyStatus);
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+10);
  }
}
//*****************************************************************************
// Fn_UpdateExec
//
// １．機能 
//      修正処理を行う
// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Fn_UpdateExec(){
  try{
    //--------//
    //更新要求//
    //--------//
    //修正完了状況フラグを修正完了とする
    parent.ModifyStatusFlag = 1;
    //処理中表示
    Public_Message("DIALOG", ProcString);
    //タイマ予約


    UpdateTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+11) +")",UPDATE_TIMEOUT);
    //＜更新＞処理ＡＳＰに更新を依頼する
//2005/04/23 008 H.SAITO
//    parent.SORTMENU_UPDATE_PROC.Public_Update(PROC_MODE, parent.StudySequence, parent.ImageSeq, parent.StudyStatus);
    if(parent.isModifyCtrlCE){
      // 2005/06/22 003 H.SAITO PVCS #865 並べ替えキャンセル時に、並べ替えした情報が戻らない不具合修正
      //parent.FRAME_PROC.Public_Update(PROC_MODE, parent.StudySequence, parent.ImageSeq, parent.StudyStatus);
      parent.FRAME_PROC.Public_Update(PROC_MODE, parent.StudySequence, WorkImageSeq, parent.StudyStatus);
    }
    else{
      // 2005/06/22 003 H.SAITO PVCS #865 並べ替えキャンセル時に、並べ替えした情報が戻らない不具合修正
      //parent.SORTMENU_UPDATE_PROC.Public_Update(PROC_MODE, parent.StudySequence, parent.ImageSeq, parent.StudyStatus);
      parent.SORTMENU_UPDATE_PROC.Public_Update(PROC_MODE, parent.StudySequence, WorkImageSeq, parent.StudyStatus);
    }
    
    //▼V3.0(B) FF奥野 DX撮影対応 ADD
    if((parent.OpenMode == OPEN_MODE_DIALOG) && 
       ('function' === typeof window.external.ValidateModifyStudyFlag)){
        window.external.ValidateModifyStudyFlag();
    }
    //▲V3.0(B) FF奥野 DX撮影対応 ADD
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+12);
  }
}
//*****************************************************************************
// Public_EndUpdate
//
// １．機能 
//      画像並べ替え成功終了時に表示を更新する
// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Public_EndUpdate(){
  try{
    //タイマ予約解除
    clearTimeout(UpdateTimeOutId);
    //排他開放処理



    Fn_Exclusive(COMMAND_MODE_UPDATE, "");    
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+13);
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

    //-----------------------------------------------------------------------//
    // ＲＵ,検査のいずれの開放も行わない場合はサーバアクセスしないようにする //
    //-----------------------------------------------------------------------//
    if(ExclusiveModeStudyRelease == EXCLUSIVE_NOTHING){
      Public_EndExclusive(0 , 0);
    }
    else{
      //処理中表示
      Public_Message("DIALOG", ProcString);
      //タイマ予約


      UpdateTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+14) +")", UPDATE_TIMEOUT);
      parent.EXCLUSIVE_PROC.Public_Exclusive(PROC_MODE, parent.StudySequence, "", ExclusiveModeStudyRelease);
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+15);
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
    clearTimeout(UpdateTimeOutId);

    //エラーのチェックを行う
    if(returnCodeStudy != 0){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+16);
//      Public_Error(FATAL_ERROR, "Exclusive Control was failed :" +  returnCodeStudy);
      return;
    }

    //2005/04/24 012 H.SAITO
    //排他取得状態(0:未取得,1:検査排他取得,2:検査,RU排他取得)
    if(ExclusiveModeStudyRelease == EXCLUSIVE_DELL){
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
    var notifyInfo = { "commandMode" : CommandMode, "commandParam" : CommandParam };
    NotifyFrameFinished(notifyInfo);

  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+17);
  }
}
//*****************************************************************************
// Fn_OnTopLastMenu
//
// １．機能 
//      先頭へまたは最後へボタンが押下された時の処理を行う 
// ２．戻り値 
//　　  無し 
// ３．備考 
//*****************************************************************************
function Fn_OnTopLastMenu(sortFlag){
  try{
    var i;       //ループカウンタ
    var tableNo; //テーブルNo
    //配列は０から始まるため

//080411 HSK山本 PVCS#2790対応 ADD-ST
    tableNo = SelectMenuNo - 1;  
    var selectImgSeq = WorkImageSeq[tableNo];

    var sameSeriesList = Fn_SameSeriesTableNoList(tableNo);
    var seriesRange = sameSeriesList.length;
//080411 HSK山本 PVCS#2790対応 ADD-ED
    switch(sortFlag){
      //上へ
      case 1:
        //不活性化のときは何もしない


        if(document.getElementById("IMG_TopMenuBtn_Enable").style.visibility == "hidden"){
          return;  
        }
        
//080411 HSK山本 PVCS#2790対応 ADD-ST
        Fn_ChangeMenus(sameSeriesList[0],0,seriesRange);
        //シリーズ移動後の選択位置
        for(i = 0;i < WorkImageSeq.length;i++)
        {
            if(WorkImageSeq[i] == selectImgSeq)
            {
                //新しいテーブルNOで上書き
                tableNo = i;
                break;
            }
        }
//080411 HSK山本 PVCS#2790対応 ADD-ED
        //先頭へ
        for(i = tableNo;i > 0; i--){
          Fn_ChangeMenu(i, i - 1); 
        }
        SelectMenuNo    = 1;  //撮影メニュー選択番号(1～) 
        SelectMenuTable = 1;  //撮影メニュー選択テーブル(1～4)
        SelectMenuPage  = 1;  //撮影メニュー選択ページ(1～)
        //並べ替えボタンの活性化不活性化


        Fn_TopUpMenuBtn_Enable(2);
        Fn_LastDownMenuBtn_Enable(1);   
        break;
      //下へ
      case 2:
        //不活性化のときは何もしない


        if(document.getElementById("IMG_LastMenuBtn_Enable").style.visibility == "hidden"){
          return;
        }
//080411 HSK山本 PVCS#2790対応 ADD-ST
        Fn_ChangeMenus(sameSeriesList[0],parent.DataCount,seriesRange);
        //シリーズ移動後の選択位置
        for(i = 0;i < WorkImageSeq.length;i++)
        {
            if(WorkImageSeq[i] == selectImgSeq)
            {
                //新しいテーブルNOで上書き
                tableNo = i;
                break;
            }
        }
//080411 HSK山本 PVCS#2790対応 ADD-ED
        //最後尾へ
        for(i = tableNo; i < parent.DataCount - 1; i++){
          Fn_ChangeMenu(i, i + 1); 
        }
        SelectMenuNo    = parent.DataCount;        //撮影メニュー選択番号(1～)   
        SelectMenuPage  = Math.ceil(SelectMenuNo / MAXMENU); //切り上げ
        SelectMenuTable = SelectMenuNo - ((SelectMenuPage - 1) * MAXMENU ); //撮影メニュー選択テーブル(1～4)

        //並べ替えボタンの活性化不活性化


        Fn_TopUpMenuBtn_Enable(1);
        Fn_LastDownMenuBtn_Enable(2);
        break;
    }
    SelectPageNo  = SelectMenuPage;          //撮影メニュー選択中のページを表示

    //再表示
    Fn_SelectPage(SelectMenuPage); 
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+18);
  }
}
//*****************************************************************************
// Fn_OnUpDownMenu
//
// １．機能 
//      上へまたは下へボタンが押下された時の処理を行う
// ２．戻り値
//　　  無し 
// ３．備考 
//*****************************************************************************
function Fn_OnUpDownMenu(sortFlag){
  try{
    var i;
    var tableNo;
    //配列は０から始まるため 
    tableNo = SelectMenuNo - 1;

 //080411 HSK山本 PVCS#2790対応 ADD-ST
   var sameSeriesList = Fn_SameSeriesTableNoList(tableNo);
    var selectImgSeq = WorkImageSeq[tableNo];
    var seriesRange = sameSeriesList.length;

    //移動する位置を確認
    var moveTableNo;
    if(sortFlag == 1)//上へ
    {
        moveTableNo = Fn_PrevTableNo(tableNo);
    }
    else if(sortFlag == 2)//下へ
    {
        moveTableNo = Fn_NextTableNo(tableNo);
    }
    else
    {
        return;
    }
    
    if(WorkSeriesUID[moveTableNo] != WorkSeriesUID[tableNo])
    {
        //シリーズが異なる→シリーズ単位でChange 
        Fn_ChangeMenus(sameSeriesList[0],moveTableNo,seriesRange);
        //シリーズ移動後の選択位置
        for(i = 0;i < WorkImageSeq.length;i++)
        {
            if(WorkImageSeq[i] == selectImgSeq)
            {
                //新しいテーブルNOで上書き 
                tableNo = i;
                break;
            }
        }
        SelectMenuNo = tableNo+1;
        SelectMenuPage  = Math.ceil(SelectMenuNo / MAXMENU); //切り上げ
        SelectMenuTable = SelectMenuNo - ((SelectMenuPage - 1) * MAXMENU ); //撮影メニュー選択テーブル(1～4) 

    }
    else
    {
        //シリーズが同じ→シリーズ内でChange（今までどおり） 
//080411 HSK山本 PVCS#2790対応 ADD-ED
        switch(sortFlag){
          //上へ
          case 1:
            //不活性化のときは何もしない 
            if(document.getElementById("IMG_UpMenuBtn_Enable").style.visibility == "hidden"){
              return;  
            }
            //直前のメニューとの入れ替え 
            Fn_ChangeMenu(tableNo, tableNo - 1); 
            SelectMenuNo    = SelectMenuNo    - 1;  //撮影メニュー選択番号(1～) 
            SelectMenuTable = SelectMenuTable - 1;  //撮影メニュー選択テーブル(1～4)
            break;
          //下へ
          case 2:
            //不活性化のときは何もしない 
            if(document.getElementById("IMG_DownMenuBtn_Enable").style.visibility == "hidden"){
              return;
            }
            //直後のメニューとの入れ替え 
            Fn_ChangeMenu(tableNo, tableNo + 1); 
            SelectMenuNo    = SelectMenuNo    + 1;  //撮影メニュー選択番号(1～)   
            SelectMenuTable = SelectMenuTable + 1;  //撮影メニュー選択テーブル(1～4)
            break;
        }
        //選択位置の変更
        //テーブル位置が0か5の場合はページの切り替え 
        switch(SelectMenuTable){
          case 0:
            SelectMenuTable = MAXMENU;             //撮影メニュー選択テーブル(1～4)
            SelectMenuPage  = SelectMenuPage - 1;  //撮影メニュー選択ページ(1～)
            break;
          case MAXMENU + 1:
            SelectMenuTable = 1;                   //撮影メニュー選択テーブル(1～4)
            SelectMenuPage  = SelectMenuPage + 1;  //撮影メニュー選択ページ(1～)   
            break;
          default:
            break;      
        }
    }
    //撮影メニュー選択中のページを表示
    SelectPageNo    = SelectMenuPage;

    //再表示
    Fn_SelectPage(SelectMenuPage); 

    //選択メニューの位置で並べ替えボタンの活性化不活性化を切り替える
    switch(SelectMenuNo){
      //先頭の場合 
      case 1:
        Fn_TopUpMenuBtn_Enable(2);
        Fn_LastDownMenuBtn_Enable(1);   
        break;
      //最後の場合 
      case parent.DataCount:
        Fn_TopUpMenuBtn_Enable(1);
        Fn_LastDownMenuBtn_Enable(2);   
        break;
      //デフォルト 
      default:
        Fn_TopUpMenuBtn_Enable(1);
        Fn_LastDownMenuBtn_Enable(1);   
        break;  
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+19);
  }
}
//080411 HSK山本 PVCS#2790対応 ADD-ST
//*****************************************************************************
// Fn_SameSeriesTableNoList
//
// １．機能 
//      同じシリーズのテーブルNOリスト 
// ２．引数 
//      srcTableNo:調べる元のテーブルNO
// ３．戻り値 
//      同じシリーズのテーブルNOリスト 
// ４．備考 
//*****************************************************************************
function Fn_SameSeriesTableNoList(srtTableNo)
{
    try
    {
        var sameSeriesList = new Array();
        
        for(var i = 0;i < WorkSeriesUID.length;i++)
        {
            if(WorkSeriesUID[i] == WorkSeriesUID[srtTableNo])sameSeriesList.push(i);
        }
        
        return sameSeriesList;
    }
    catch(e)
    {
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+34);
    }
}

//*****************************************************************************
// Fn_PrevTableNo
//
// １．機能 
//      移動可能な前のテーブル位置を取得 
// ２．引数 
//      srcTableNo:移動元のテーブルNO
// ３．戻り値 
//      移動可能な前のテーブル位置
// ４．備考 
//*****************************************************************************
function Fn_PrevTableNo(srcTableNo)
{
    return Fn_MovableTableNo(srcTableNo,true);
}

//*****************************************************************************
// Fn_NextTableNo
//
// １．機能 
//      移動可能な次のテーブル位置を取得 
// ２．引数 
//      srcTableNo:移動元のテーブルNO
// ３．戻り値 
//      移動可能な次のテーブル位置
// ４．備考 
//      シリーズをまたぐ場合、次シリーズの最後尾（その次のシリーズの先頭）のテーブル位置を返す 
//      次シリーズが最終シリーズの場合、全メニューリスト最後尾＋1を返す。 
//*****************************************************************************
function Fn_NextTableNo(srcTableNo)
{
    return Fn_MovableTableNo(srcTableNo,false);
}

//*****************************************************************************
// Fn_MovableTableNo
//
// １．機能 
//      移動可能なテーブル位置を取得 
// ２．引数 
//      srcTableNo:移動元のテーブルNO
//      isPrev:前に移動するか(true)/後に移動するか(false)
// ３．戻り値 
//      移動可能なテーブル位置
// ４．備考 
//*****************************************************************************
function Fn_MovableTableNo(srcTableNo,isPrev)
{
    try
    {
        var rtnTableNo;
        var cur = 0;
        var count = WorkSeriesUID.length;

        //前後でカーソル増量を決定 
        if(isPrev)
        {
            if(srcTableNo <= 0)
            {
                //ソースが先頭以下 
                return 0;
            }
            else
            {
                cur = -1;
            }
        }
        else
        {
            if(srcTableNo >= count - 1)
            {
                //ソースが最後尾以上 
                return (count - 1);
            }
            else
            {
                cur = +1;
            }
        }
        //一つカーソルを動かす 
        rtnTableNo = eval(srcTableNo) + eval(cur);
        //シリーズUIDが異なる場合は、移動可能な位置まで探索 
        if(WorkSeriesUID[rtnTableNo] != WorkSeriesUID[srcTableNo])
        {
            while(rtnTableNo > 0 && rtnTableNo < (count - 1))
            {
                if(WorkSeriesUID[rtnTableNo] != WorkSeriesUID[rtnTableNo + cur] )
                {
                    break;
                }
                rtnTableNo = rtnTableNo + cur;
            }
            if(cur == 1)rtnTableNo = rtnTableNo + cur;
        }
        
        return rtnTableNo;
    }
    catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+35);
    }

}

//*****************************************************************************
// Fn_ChangeMenus
//
// １．機能 
//      複数メニューの並べ替え（入れ替え）を行う 
// ２．引数 
//      srcTableNo :入れ替え元の先頭テーブルNO
//      distTableNo:入れ替え先の先頭テーブルNO
//      range      :入れ替える範囲（サイズ）
// ３．戻り値
//     無し 
// ４．備考 
//      入れ替え先先頭からrange分の配列にはコピーする領域があることを前提
//*****************************************************************************
function Fn_ChangeMenus(srcTableNo, distTableNo,range){
  try
  {
    //テンポラリ位置に格納
    var i;
    var SortImageSeqArray                       = new Array();
    var SortMenuNameArray                       = new Array();
    var SortImageStatusArray                    = new Array();
    var SortDataStatusArray                     = new Array();
    var SortThumbnailFileNameArray              = new Array();
    var SortThumbnailHeightArray                = new Array();
    var SortThumbnailWidthArray                 = new Array();
    var SortSeriesUIDArray                      = new Array();
    var SortThumbnailFilePathArray              = new Array();//** 2009/07/16 k.harada add
    
    for(i = 0;i < range;i++)
    {
        SortImageSeqArray.push(WorkImageSeq[eval(srcTableNo) + i]);
        SortMenuNameArray.push(WorkMenuName[eval(srcTableNo) + i]);
        SortImageStatusArray.push(WorkImageStatus[eval(srcTableNo) + i]);
        SortDataStatusArray.push(WorkDataStatus[eval(srcTableNo) + i]);
        SortThumbnailFileNameArray.push(WorkThumbnailFileName[eval(srcTableNo) + i]);
        SortThumbnailHeightArray.push(WorkThumbnailHeight[eval(srcTableNo) + i]);
        SortThumbnailWidthArray.push(WorkThumbnailWidth[eval(srcTableNo) + i]);
        SortSeriesUIDArray.push(WorkSeriesUID[eval(srcTableNo) + i]);
        SortThumbnailFilePathArray.push(WorkThumbnailFilePath[eval(srcTableNo) + i]);//** 2009/07/16 k.harada add
    }

    //TODO:以下処理をまとめられそう。 
    var cur;
    if(srcTableNo < distTableNo)
    {
        //srcシリーズがあった位置にsrcシリーズ以下を詰めていく 
        for(i = 0; i < WorkImageSeq.length ; i++)
        {
            cur = srcTableNo + i;
            if(cur + range >= distTableNo)break;
            WorkImageSeq[cur]          = WorkImageSeq[cur + range];
            WorkMenuName[cur]          = WorkMenuName[cur + range];
            WorkImageStatus[cur]       = WorkImageStatus[cur + range];
            WorkDataStatus[cur]        = WorkDataStatus[cur + range];
            WorkThumbnailFileName[cur] = WorkThumbnailFileName[cur + range];
            WorkThumbnailHeight[cur]   = WorkThumbnailHeight[cur + range];
            WorkThumbnailWidth[cur]    = WorkThumbnailWidth[cur + range];
            WorkSeriesUID[cur]         = WorkSeriesUID[cur + range];
            WorkThumbnailFilePath[cur] = WorkThumbnailFilePath[cur + range]; //** 2009/07/16 k.harada add
            
        }
        //distを変更する
        //上(srcの方)から詰めた場合、 
        //シリーズごと移動するため、最初に移動可能だった位置が変動する場合がある。
        //その対応
        distTableNo = cur;
    }
    else
    {
        //srcシリーズ最後尾があった位置からsrcシリーズより前を詰めていく 
        for(i = 0; i < WorkImageSeq.length ; i++)
        {
            cur = srcTableNo + range - 1 - i;
            if(cur - range < distTableNo)break;
            WorkImageSeq[cur]          = WorkImageSeq[cur - range];
            WorkMenuName[cur]          = WorkMenuName[cur - range];
            WorkImageStatus[cur]       = WorkImageStatus[cur - range];
            WorkDataStatus[cur]        = WorkDataStatus[cur - range];
            WorkThumbnailFileName[cur] = WorkThumbnailFileName[cur - range];
            WorkThumbnailHeight[cur]   = WorkThumbnailHeight[cur - range];
            WorkThumbnailWidth[cur]    = WorkThumbnailWidth[cur - range];
            WorkSeriesUID[cur]         = WorkSeriesUID[cur - range];
            WorkThumbnailFilePath[cur] = WorkThumbnailFilePath[cur - range]; //** 2009/07/16 k.harada add
        }
        //下(srcの最後尾)から詰めた場合、distは変更しない。 
    }
    
    

    for(i = 0;i < range;i++)
    {
        //Target←work
        WorkImageSeq[distTableNo + i]          = SortImageSeqArray[i];
        WorkMenuName[distTableNo + i]          = SortMenuNameArray[i];
        WorkImageStatus[distTableNo + i]       = SortImageStatusArray[i];
        WorkDataStatus[distTableNo + i]        = SortDataStatusArray[i];
        WorkThumbnailFileName[distTableNo + i] = SortThumbnailFileNameArray[i];
        WorkThumbnailHeight[distTableNo + i]   = SortThumbnailHeightArray[i];
        WorkThumbnailWidth[distTableNo + i]    = SortThumbnailWidthArray[i];
        WorkSeriesUID[distTableNo + i]        = SortSeriesUIDArray[i];
        WorkThumbnailFilePath[distTableNo + i] = SortThumbnailFilePathArray[i]; //** 2009/07/16 k.harada add
    }
  }
  catch(e)
  {
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+36);
  }
}
//080411 HSK山本 PVCS#2790対応 ADD-ED
//*****************************************************************************
// Fn_ChangeMenu
//
// １．機能 
//      メニューの並べ替え（入れ替え）を行う
// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Fn_ChangeMenu(srcTableNo, distTableNo){
  try{
    //引数で渡された添え字間でのページの入れ替えを行う  
    // 2005/06/22 049 H.SAITO PVCS #865 並べ替えキャンセル時に、並べ替えした情報が戻らない不具合修正
    ////work←src
    //SortImageSeq           = parent.ImageSeq[srcTableNo];
    //SortMenuName          = parent.MenuName[srcTableNo];
    //SortImageStatus       = parent.ImageStatus[srcTableNo];
    //SortDataStatus        = parent.DataStatus[srcTableNo];
    //SortThumbnailFileName = parent.ThumbnailFileName[srcTableNo];
    //SortThumbnailHeight   = parent.ThumbnailHeight[srcTableNo];
    //SortThumbnailWidth    = parent.ThumbnailWidth[srcTableNo];
    ////src←Target
    //parent.ImageSeq[srcTableNo]           = parent.ImageSeq[distTableNo];
    //parent.MenuName[srcTableNo]          = parent.MenuName[distTableNo];
    //parent.ImageStatus[srcTableNo]       = parent.ImageStatus[distTableNo];
    //parent.DataStatus[srcTableNo]        = parent.DataStatus[distTableNo];
    //parent.ThumbnailFileName[srcTableNo] = parent.ThumbnailFileName[distTableNo];
    //parent.ThumbnailHeight[srcTableNo]   = parent.ThumbnailHeight[distTableNo];
    //parent.ThumbnailWidth[srcTableNo]    = parent.ThumbnailWidth[distTableNo];
    ////Target←work
    //parent.ImageSeq[distTableNo]           = SortImageSeq;
    //parent.MenuName[distTableNo]          = SortMenuName;
    //parent.ImageStatus[distTableNo]       = SortImageStatus;
    //parent.DataStatus[distTableNo]        = SortDataStatus;
    //parent.ThumbnailFileName[distTableNo] = SortThumbnailFileName;
    //parent.ThumbnailHeight[distTableNo]   = SortThumbnailHeight;
    //parent.ThumbnailWidth[distTableNo]    = SortThumbnailWidth;
    //work←src
    SortImageSeq                       = WorkImageSeq[srcTableNo];
    SortMenuName                       = WorkMenuName[srcTableNo];
    SortImageStatus                    = WorkImageStatus[srcTableNo];
    SortDataStatus                     = WorkDataStatus[srcTableNo];
    SortThumbnailFileName              = WorkThumbnailFileName[srcTableNo];
    SortThumbnailHeight                = WorkThumbnailHeight[srcTableNo];
    SortThumbnailWidth                 = WorkThumbnailWidth[srcTableNo];
//080411 HSK山本 PVCS#2790対応 ADD-ST
    SortSeriesUID                 = WorkSeriesUID[srcTableNo];
//080411 HSK山本 PVCS#2790対応 ADD-ED

    SortThumbnailFilePath              = WorkThumbnailFilePath[srcTableNo]; //** 2009/07/16 k.harada add

    //src←Target
    WorkImageSeq[srcTableNo]           = WorkImageSeq[distTableNo];
    WorkMenuName[srcTableNo]           = WorkMenuName[distTableNo];
    WorkImageStatus[srcTableNo]        = WorkImageStatus[distTableNo];
    WorkDataStatus[srcTableNo]         = WorkDataStatus[distTableNo];
    WorkThumbnailFileName[srcTableNo]  = WorkThumbnailFileName[distTableNo];
    WorkThumbnailHeight[srcTableNo]    = WorkThumbnailHeight[distTableNo];
    WorkThumbnailWidth[srcTableNo]     = WorkThumbnailWidth[distTableNo];
//080411 HSK山本 PVCS#2790対応 ADD-ST
    WorkSeriesUID[srcTableNo]         = WorkSeriesUID[distTableNo];
//080411 HSK山本 PVCS#2790対応 ADD-ED

    WorkThumbnailFilePath[srcTableNo]  = WorkThumbnailFilePath[distTableNo]; //** 2009/07/16 k.harada add

    //Target←work
    WorkImageSeq[distTableNo]          = SortImageSeq;
    WorkMenuName[distTableNo]          = SortMenuName;
    WorkImageStatus[distTableNo]       = SortImageStatus;
    WorkDataStatus[distTableNo]        = SortDataStatus;
    WorkThumbnailFileName[distTableNo] = SortThumbnailFileName;
    WorkThumbnailHeight[distTableNo]   = SortThumbnailHeight;
    WorkThumbnailWidth[distTableNo]    = SortThumbnailWidth;
//080411 HSK山本 PVCS#2790対応 ADD-ST
    WorkSeriesUID[distTableNo]         = SortSeriesUID;
//080411 HSK山本 PVCS#2790対応 ADD-ED

    WorkThumbnailFilePath[distTableNo] = SortThumbnailFilePath; //** 2009/07/16 k.harada add

  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+20);
  }
}
//*****************************************************************************
// Fn_TopUpMenuBtn_Enable
//
// １．機能 
//      先頭へ、上へボタンの活性化・不活性化を切り替える
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Fn_TopUpMenuBtn_Enable(enableFlag){
  try{
    switch(enableFlag){
      //先頭へ、上へボタンを活性化/
      case 1:
        document.getElementById("TABLE_TopMenuBtn").style.visibility       = "visible";
        document.getElementById("IMG_TopMenuBtn_Enable").style.visibility  = "visible";
        document.getElementById("IMG_TopMenuBtn_Disable").style.visibility = "hidden";
        document.getElementById("DIV_TopMenuText").style.color             = "black";
        document.getElementById("TABLE_UpMenuBtn").style.visibility        = "visible";
        document.getElementById("IMG_UpMenuBtn_Enable").style.visibility   = "visible";
        document.getElementById("IMG_UpMenuBtn_Disable").style.visibility  = "hidden";
        document.getElementById("DIV_UpMenuText").style.color              = "black";
        break;
      //先頭へ、上へボタンを不活性化



      case 2:
        document.getElementById("TABLE_TopMenuBtn").style.visibility       = "hidden";
        document.getElementById("IMG_TopMenuBtn_Enable").style.visibility  = "hidden";
        document.getElementById("IMG_TopMenuBtn_Disable").style.visibility = "visible";
        document.getElementById("DIV_TopMenuText").style.color             = "gray";
        document.getElementById("TABLE_UpMenuBtn").style.visibility        = "hidden";
        document.getElementById("IMG_UpMenuBtn_Enable").style.visibility   = "hidden";
        document.getElementById("IMG_UpMenuBtn_Disable").style.visibility  = "visible";
        document.getElementById("DIV_UpMenuText").style.color              = "gray";
        break;
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+21);
  }
}
//*****************************************************************************
// Fn_LastDownMenuBtn_Enable
//
// １．機能 
//      最後へ、下へボタンの活性化・不活性化を切り替える
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Fn_LastDownMenuBtn_Enable(enableFlag){
  try{
    switch(enableFlag){
      //最後へ、下へボタンを活性化/
      case 1:
        document.getElementById("TABLE_LastMenuBtn").style.visibility       = "visible";
        document.getElementById("IMG_LastMenuBtn_Enable").style.visibility  = "visible";
        document.getElementById("IMG_LastMenuBtn_Disable").style.visibility = "hidden";
        document.getElementById("DIV_LastMenuText").style.color             = "black";
        document.getElementById("TABLE_DownMenuBtn").style.visibility       = "visible";
        document.getElementById("IMG_DownMenuBtn_Enable").style.visibility  = "visible";
        document.getElementById("IMG_DownMenuBtn_Disable").style.visibility = "hidden";
        document.getElementById("DIV_DownMenuText").style.color             = "black";
        break;
      //最後へ、下へボタンを不活性化



      case 2:
        document.getElementById("TABLE_LastMenuBtn").style.visibility       = "hidden";
        document.getElementById("IMG_LastMenuBtn_Enable").style.visibility  = "hidden";
        document.getElementById("IMG_LastMenuBtn_Disable").style.visibility = "visible";
        document.getElementById("DIV_LastMenuText").style.color             = "gray";
        document.getElementById("TABLE_DownMenuBtn").style.visibility       = "hidden";
        document.getElementById("IMG_DownMenuBtn_Enable").style.visibility  = "hidden";
        document.getElementById("IMG_DownMenuBtn_Disable").style.visibility = "visible";
        document.getElementById("DIV_DownMenuText").style.color             = "gray";
        break;
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+22);
  }
}
//************************************************
// Fn_GetImageTag
//
// １．機能 
//      ＩＭＧタグを生成する


// ２．戻り値
//　　  特になし


// ３．備考


//************************************************
function Fn_GetImageTag(menuTableNo){
  try{
    var imageTagString;	    //IMGタグ文字列
    var imageStyleString;	  //IMGタグスタイル
    var imageTagId;         //IMGタグのID
    var imageOnload;        //IMGタグのOnloadイベント



    var imageFileName;      //画像のファイル名
    var imageFilePath;      //画像ファイルのフルパス//** 2009/07/16 k.harada add


    var imageTopPosition;		//表示する画像の上位置
    var imageLeftPosition;  //表示する画像の左位置
    var imageViewTop;				//DIVからの相対位置のため0
    var imageViewLeft;			//DIVからの相対位置のため0
    var imageViewHeight;		//画像の高さ(相対位置)
    var imageViewWidth;			//画像の幅(相対位置)	
    var imageHeight;	      //表示する画像の高さ
    var imageWidth;	        //表示する画像の幅


    var dateObject;         //現在時刻

		var urlString;					//画像のパス

    //設定値を取得


    imageViewTop    = 0; //DIVからの相対位置のため0
    imageViewLeft   = 0; //DIVからの相対位置のため0
    imageViewHeight = THUMBNAIL_HEIGHT;
    imageViewWidth  = THUMBNAIL_WIDTH;

    // 2005/06/22 007 H.SAITO PVCS #865 並べ替えキャンセル時に、並べ替えした情報が戻らない不具合修正
    //imageHeight     = parent.ThumbnailHeight[menuTableNo   - 1] - 0;
    //imageWidth      = parent.ThumbnailWidth[menuTableNo    - 1] - 0;
    //imageFileName   = parent.ThumbnailFileName[menuTableNo - 1];
    imageHeight     = WorkThumbnailHeight[menuTableNo   - 1] - 0;
    imageWidth      = WorkThumbnailWidth[menuTableNo    - 1] - 0;
    imageFileName   = WorkThumbnailFileName[menuTableNo - 1];
    imageFilePath   = WorkThumbnailFilePath[menuTableNo - 1];//** 2009/07/16 k.harada add

    //画像の形状に合わせて表示領域＆位置を計算


    if(imageHeight > imageWidth){
      //長方形（縦長）


      imageWidth  = (imageWidth * imageViewHeight) / imageHeight;
      imageWidth  = Math.floor(imageWidth,0);//小数点以下切捨て
      imageHeight = imageViewHeight;
      imageTopPosition    = imageViewTop;
      imageLeftPosition   = imageViewLeft + (imageViewWidth - imageWidth) / 2;
      imageLeftPosition   = Math.floor(imageLeftPosition,0);//小数点以下切捨て
    }
    else if(imageWidth > imageHeight){
      //長方形（横長）


      imageHeight = (imageHeight * imageViewWidth) / imageWidth;
      imageHeight = Math.floor(imageHeight,0);//小数点以下切捨て
      imageWidth  = imageViewWidth;
      imageLeftPosition   = imageViewLeft;
      imageTopPosition    = imageViewTop + (imageViewHeight - imageHeight) / 2;
      imageTopPosition    = Math.floor(imageTopPosition,0);//小数点以下切捨て
    }
    else{
      //正方形
      imageTopPosition    = imageViewTop;
      imageLeftPosition   = imageViewLeft;
      imageWidth  = imageViewWidth;
      imageHeight = imageViewHeight;
    }
    //ファイルパス計算


    urlString = IMAGE_FILE_PATH + "/" + imageFileName;
      
    //画像表示領域計算



    imageStyleString = "POSITION:absolute;";
    imageStyleString = imageStyleString + "TOP:"    + imageTopPosition    + "px;";
    imageStyleString = imageStyleString + "LEFT:"   + imageLeftPosition   + "px;";
    imageStyleString = imageStyleString + "WIDTH:"  + imageWidth  + "px;";
    imageStyleString = imageStyleString + "HEIGHT:" + imageHeight + "px;";
    //IMGのONLOAD時にvisibleにする
    imageStyleString = imageStyleString + "visibility:hidden;";
    //日付オブジェクト生成



    dateObject       = new Date();

    //画像タグ作成１



    //通常サイズの画像はロードが終わったら表示する
    imageTagId   = "IMG_THUMBNAIL_" + menuTableNo;    
    imageOnload  = "ONLOAD=Fn_ViewThumbNail('" + imageTagId + "');";

    //画像タグ作成２

//2012/04/18 FF千葉 V2.3B DICOM受信性能改善 DEL-ST
////** 2009/07/16 k.harada add start
//    if(imageFilePath.indexOf("c:") != -1)
//    {
//    imageTagString = "<IMG SRC='" + urlString + "?"+ dateObject.getTime() + "'";
//    }
//    else
//    {
//        imageTagString = "<IMG SRC='" + imageFilePath + "'";
//    }
////** 2009/07/16 k.harada add end 
//2012/04/18 FF千葉 V2.3B DICOM受信性能改善 DEL-ED
//2012/04/18 FF千葉 V2.3B DICOM受信性能改善 ADD-ST
	var imageFilePathWithSubDir = imageFilePath.replace("file:", "");
	if(imageFilePathWithSubDir.substr(0,2) == "//")
	{
		//拡張NAS内データ
		imageTagString = "<IMG SRC='" + imageFilePath + "'";
	}
	else
	{
		//HDD内データ
		imageFilePathWithSubDir = imageFilePathWithSubDir.slice(imageFilePathWithSubDir.indexOf("/Image/"));
		imageFilePathWithSubDir = imageFilePathWithSubDir.replace("/Image/", "");	// Image/より後ろだけ取り出し。Sub/SubSub/FCRxxになる。
		imageTagString = "<IMG SRC='" + IMAGE_FILE_PATH + "/" + imageFilePathWithSubDir + "?"+ dateObject.getTime() + "'";
	}
//2012/04/18 FF千葉 V2.3B DICOM受信性能改善 ADD-ED

//    imageTagString = "<IMG SRC='" + urlString + "?"+ dateObject.getTime() + "'";  //** 2009/07/16 k.harada del
    imageTagString = imageTagString + " ID='" + imageTagId + "' " + imageOnload + " STYLE='" + imageStyleString + "'>";

    return imageTagString;
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+23);
  }
}
//************************************************
// Fn_ViewThumNail
//
// １．機能 
//      ＩＭＧタグを生成する


// ２．戻り値
//　　  特になし


// ３．備考


//************************************************
function Fn_ViewThumbNail(imageTagId){
  try{
    document.getElementById(imageTagId).style.visibility = "visible";
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+24);
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
function Fn_WriteLog(ctrlCommand){
	try{
		parent.LOGGER_PROC.location.replace("Logger_Proc.aspx?" + "Display=" + PROC_MODE + "&Command=" + ctrlCommand + "&LoginUserId=" + top.LoginUserId + "&OpenMode=" + parent.OpenMode);
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+25);
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
	      document.getElementById("TABLE_UpdateBtn").style.visibility       = "hidden";
	      document.getElementById("IMG_UpdateBtn_Enable").style.visibility  = "hidden";
	      document.getElementById("IMG_UpdateBtn_Disable").style.visibility = "visible";
	      document.getElementById("DIV_UpdateText").style.color             = "gray";
	      break;
	    case 1:   //活性
	      document.getElementById("TABLE_UpdateBtn").style.visibility       = "visible";
	      document.getElementById("IMG_UpdateBtn_Enable").style.visibility  = "visible";
	      document.getElementById("IMG_UpdateBtn_Disable").style.visibility = "hidden";
	      document.getElementById("DIV_UpdateText").style.color             = "black";
	      break;
	    default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+26);
	      break;
	  }
	}
	catch(e){
     Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+27);
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
		clearTimeout(UpdateTimeOutId);
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_NOLOGIN,FILE_NAME,SPOT_CODE+28)
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_LOGOFF,FILE_NAME,SPOT_CODE+29)
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_DIFERENT,FILE_NAME,SPOT_CODE+30)
				return;
			//操作権限がない 
			case CHECK_AUTHORITY_ERROR_AUTHORITY:
				Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MESSAGE_ID_FORBIDDEN,""), top.DispFrame.Public_GetLangMsgTitle2(MESSAGE_ID_FORBIDDEN,""),top.DispFrame.Public_GetLangMsgString(MESSAGE_ID_FORBIDDEN,"Cannt Get Message.")); 
				return;
			default:
				Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+31);
				return;
		}
	}catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+32);
	}	
}
//20050609(PVCS#350)EN


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
        Public_Init();
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+33);
    }
}

