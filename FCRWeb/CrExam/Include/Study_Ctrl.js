/****************************************************************************

  @file Study_Ctrl.js

  @brief Study_Ctrlのクライアントスクリプト

  @author YSK齋藤

        SpotCode MAX 7

  Copyright(C) 2004-2009 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/11/09  YSK齋藤       V1.0       新規作成
  @date  06/10/23  HSK山本       V1.4       CR検査部構造見直し[4]対応 
  @date  06/11/09  HSK酒井       V1.4       CR検査部構造見直し[2]対応 
  @date  07/03/01  YSK齋藤     V2.0       ×ボタン押下対応(PVCS#1956) 
  @date  07/03/20  HSK古場       V2.0       内視鏡画像取り込み機能 
  @date  07/06/14  HSK山本       V2.0       PVCS#2209対応 
  @date  08/04/11  HSK山本       V3.2HF     PVCS#2790対応 
  @date  08/04/18  HSK由比       V4.0       ガイダンス表示対応
  @date  09/05/20  HSK山本       V5.1       心電図本対応 
  @date  09/07/16  原田憲        V6.0       NAS対応 
  @date  09/12/01  FFS黒田       V1.1(B)    患者情報項目追加
  @date	 10/10/19  NDD照屋       V2.0(B)    CQ#453 30501エラー改善対応

*****************************************************************************/
var PROC_MODE            = "STUDY_CTRL";    //ＡＳＰのＩＤ
var FATAL_ERROR          = "FATAL_ERROR";   //致命的なエラー 
var RETRY_ERROR          = "RETRY_ERROR";   //再試行可能なエラー
var SPOT_CODE            = 0;               //スポットコード

var FILE_NAME            = "Study_Ctrl.js"; //ファイル名

var MESSAGE_ID           = 30500;           //メッセージID 
var MESSAGE_ID_ACCESS    = 30501;           //メッセージID 
// オープンモード

var OPEN_MODE_CE         = 0;	// CEで開かれた場合

var OPEN_MODE_WINDOW     = 1;	// ブラウザで開かれた場合

var OPEN_MODE_DIALOG     = 2;	// ダイアログで開かれた場合

// 排他モード

var EXCLUSIVE_MODE1      = 1;
var EXCLUSIVE_MODE2      = 2;
var EXCLUSIVE_MODE3      = 3;
// 検査取得フラグ
var FLAG_STUDY_GETDATA   = 1;
var FLAG_STUDY_NOGETDATA = 0;
//070320 HSK古場 ADD-ST
// 画像種別
var IMAGEKIND_FCRIMAGE     = "1";	// FCR画像 
var IMAGEKIND_NON_FCRIMAGE = "0";	// FCR画像以外 
var IMAGEKIND_NON_IMAGE    = "-1";	// 非画像 
//070320 HSK古場 ADD-ED
// 検査画面状況フラグ
var SCREEN_STATUS_INIT   = 0;// 初期
var SCREEN_STATUS_MODIFY = 1;// 修正完了

var SCREEN_STATUS_CANCEL = 2;// 修正キャンセル
var EndGetDataFlag       = FLAG_STUDY_NOGETDATA;          //データ取得完了フラグ
var OpenMode;
var ExclusiveMode = "";		   // 排他モード

//患者情報
var StudySequence;           //検査シーケンス
var PatientId;               //患者ID
var PatientName;             //患者名(シングルバイト)
var PatientKanjiName;        //患者名(マルチバイト)
var PatientSex;              //性別
var PatientBirthDate;        //生年月日
var PatientAge;              //年齢
var PatientsSexNeutred;      //避妊処置 2009/12/01 FFS黒田 ADD
var DataCount;               //検査メニューデータ数
//検査情報
var StudyStatus;             //検査ステータス
//070320 HSK古場 ADD-ST
//画像種別
var ImageKind;
//070320 HSK古場 ADD-ED
//ユーザ情報
var SbcsStorageUserName;     //ユーザ名(SBCS)
var DbcsStorageUserName;     //ユーザ名(DBCS)
//画像データ
// 2005/07/06 002 H.SAITO PVCS#870 メディアから取り込んだ検査
var MediaGetStatus;          //メディアから取り込んだ検査かフラグ
var AssosiateId;             //画像シーケンス－添え字（連想配列）

var ImageSeq;                //画像シーケンス
var MenuName;                //検査メニュー名
// 080418 HSK由比 ガイダンス表示対応 ADD-ST
var MenuCode;                // 拡張MPMコード
// 080418 HSK由比 ガイダンス表示対応 ADD-ED

var MenuKind;                //入力データ種別
var ImageStatus;             //画像データ状態

var DataStatus;              //データステータス
var ThumbnailFileName;       //サムネイルファイル名

var ThumbnailHeight;         //サムネイル高さ
var ThumbnailWidth;          //サムネイル幅

var ImageFileName;           //画像ファイル名

var ImageHeight;             //画像高さ
var ImageWidth;              //画像幅 
//070614 HSK山本 PVCS#2209 ADD-ST
var MediaOutStatus;    //メディア出力有無
//070614 HSK山本 PVCS#2209 ADD-ED
//080411 HSK山本 PVCS#2790 ADD-ST
var SeriesUID;         //シリーズUID
//080411 HSK山本 PVCS#2790 ADD-ED

var ThumbnailFilePath;  //** 2009/07/16 k.harada add

var InputStatus;             //画像の入力ステータス(0:未撮/1:入力中(だらだら対象外)/2:入力中(だらだら対象)/3:(既撮)
//画像入力完了時にのみ対象の要素に1がセットされる。1の場合はサムネイルと処理済画像を表示する
//サムネイルと処理済画像を表示するかページ切り替え時にリセットする。

var ImageViewFlag;           //処理済画像の入力直後表示フラグ(画像入力直後のサムネイルと処理済画像の表示に使用する)
//だらだら情報
var InputMode;               //入力中モード

var InputOnFlag;						 //入力中(だらだら情報あり)フラグ
var InputOnImageSeq;				 //入力中(だらだら情報あり)対象の画像シーケンス
var InputOffFlag;						 //入力中(だらだら情報なし)フラグ
var InputOffImageSeq;				 //入力中(だらだら情報なし)対象の画像シーケンス
var DivInfoResendCount;      //再送カウント（通常時1、再送時は2以上）

var DivInfoDirection;        //だらだら方向 Bottom:（下から上）Top:（上から下）Left:（左から右）Right:（右から左）

var DivInfoDivcount;         //だらだら分割数（総数）

var DivInfoDivCompcount;     //だらだら読み込み完了数
var DivInfoTotalImageHeight; //総画像サイズのHEIGHT
var DivInfoTotalImageWidth;  //総画像サイズのWIDTH
var DivDataFileName;				 //だらだら画像ファイル名

var DivDataImageHeight;			 //だらだら画像サイズのHEIGHT
var DivDataImageWidth;			 //だらだら画像サイズのWIDTH
var ScreenStatus = SCREEN_STATUS_INIT;	//検査画面状況フラグ(0:初期 1:修正完了 2:修正キャンセル) 
//2005/04/24 003 H.SAITO
//排他取得状態(0:未取得,1:検査排他取得,2:検査,RU排他取得)
var ExclusiveState = 0;
//var ErrorImageId;                                        // 入力中に失敗した画像ID(検査画面OPEN時に使用)
//var ReSendMode;                                          // 再送処理のモード(再送処理のダイアログボックスでの判定に使用する）


// 2005/07/13 003 H.SAITO 再送処理対応

var InputErrorImageId;                                   // 入力中に失敗した画像ID(検査画面OPEN時に使用)
var InputErrorCode;                                      // 画像入力・画像処理エラーコード(再送処理のダイアログボックスでの判定に使用する）

// CQ#453 ADD ST
var MAX_RELOAD_COUNT = 2;									// ポーリング監視フレーム画面生成途中時の最大ループ値
var StudyWatchProcReloadCount;								// ポーリング監視フレーム画面生成途中カウント
// CQ#453 ADD ED

// 2005/11/30 PVCS#1560 H.SAITO -ST-
//// 2005/08/01 003 H.SAITO #790 RU排他の自己排他対応(RU自己排他エラー発生時はCookieチェックを行う)
//var RuSelfExclusionErrorFlag;
//var StudySelfExclusionErrorFlag;
//// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
//var RuExclusionErrorFlag;
//var StudyExclusionErrorFlag;
//var CompletedErrorFlag;
//// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-
var RuExclusionErrorFlag;
var StudyExclusionErrorFlag;
var CompletedErrorFlag;
// 2005/11/30 PVCS#1560 H.SAITO -ED-
//*****************************************************************************
// Fn_InitPage
//
// １．機能
//      ページロード時の処理

// ２．戻り値
//      なし

// ３．備考

//      なし

//*****************************************************************************
function Fn_InitPage(){
  try{
		//ページローダ生成
		var loader = new PageLoader();
		//ページ情報追加
		// 2007/03/01 PVCS#1956 H.SAITO -ST-
		//loader.AddLoadPage("STUDYDATA_GET_PROC","StudyData_Get_Proc.aspx");  
		loader.AddLoadPage("STUDYDATA_GET_PROC","Main_StudyData_Get_Proc.aspx");  
		// 2007/03/01 PVCS#1956 H.SAITO -ED-
		loader.AddLoadPage("STUDY_START_PROC","Study_Start_Proc.aspx");
		loader.AddLoadPage("STUDY_TURNIMAGE_PROC","Study_TurnImage_Proc.aspx");
		loader.AddLoadPage("STUDY_STATECHANGE_PROC","Study_StateChange_Proc.aspx");  
		loader.AddLoadPage("STUDY_NOTIFY_PROC","Study_Notify_Proc.aspx");
		loader.AddLoadPage("STUDY_WATCH_PROC","Study_Watch_Proc.aspx");
		loader.AddLoadPage("INFORMATION_VIEW","Information_View.aspx");
		loader.AddLoadPage("STUDY_VIEW","Study_View.aspx?OpenMode=" + OpenMode);
		loader.AddLoadPage("EXCLUSIVE_PROC","Exclusive_Proc.aspx");
		//ロード開始

		loader.Start();
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
  }
}
//*****************************************************************************
// Public_Init
//
// １．機能
//      検査画面を開く

// ２．戻り値
//      なし

// ３．備考

//      なし

//*****************************************************************************
function Public_Init(){
	try{
    // 修正キャンセル時以外は初期化を行う
    if(parent.ScreenStatus != SCREEN_STATUS_CANCEL){
		  Fn_Init();
    }
    // 最初に検査画面に入ったときのみユーザ情報を初期化する
    if(parent.ScreenStatus == SCREEN_STATUS_INIT){
      SbcsStorageUserName  = ""; //ユーザ名(SBCS)
      DbcsStorageUserName  = ""; //ユーザ名(DBCS)
    }
		// 排他モード設定

    switch(OpenMode){
      case OPEN_MODE_CE:
			  ExclusiveMode = EXCLUSIVE_MODE2;
        break;  
		  case OPEN_MODE_WINDOW:
			  ExclusiveMode = EXCLUSIVE_MODE2;
        break;  
      default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
        break;               
    }
		// インジケータ画面通知
		top.SetCurrentView("STUDY");		
		// 検査シーケンス取得

		StudySequence = top.StudySequence;
// ADD 2005/02/03 hata==========
		// 画面状況フラグ取得

		ScreenStatus = parent.ScreenStatus;
// ADD EN=====================
		
		//初期画面遷移処理

		var moveViewInfo = new MoveViewInfo("STUDY_VIEW");
		//コールバック関数の登録
		moveViewInfo.SetFinishedNotification(ViewFinished);
		//画面制御実行

		MoveView(moveViewInfo);
}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
	}
}
//*****************************************************************************
// Fn_Init
//
// １．機能
//      初期化処理を行う
// ２．戻り値
//      なし


// ３．備考


//      なし


//*****************************************************************************
function Fn_Init(){
  try{
    EndGetDataFlag          = FLAG_STUDY_NOGETDATA;	//データ取得完了フラグ
	  ExclusiveMode           = 0;
    //患者情報の初期化

    StudySequence           = -1; //検査シーケンス
    PatientId               = ""; //患者ID
    PatientName             = ""; //患者名
		PatientKanjiName		    = "";	//患者名(マルチバイト)
    PatientSex              = ""; //性別
    PatientBirthDate        = ""; //生年月日
    PatientAge					    = "";	//年齢
	PatientsSexNeutred		= ""; //避妊処置 2009/12/01 FFS黒田 ADD
    DataCount               = 0;  //撮影メニューデータ数
    //検査情報
    StudyStatus             = ""; //検査ステータス
    //画像の初期化

    // 2005/07/06 002 H.SAITO PVCS#870 メディアから取り込んだ検査
    MediaGetStatus          = ""; //メディアから取り込んだ検査かフラグ
    AssosiateId             = new Array(); //画像シーケンス－添え字（連想配列）

    ImageSeq                = new Array(); //画像シーケンス
    MenuName                = new Array(); //検査メニュー
// 080418 HSK由比 ガイダンス表示対応 ADD-ST
    MenuCode                = new Array(); // 拡張MPMコード
// 080418 HSK由比 ガイダンス表示対応 ADD-ED
    MenuKind                = new Array(); //入力データ種別
    ImageStatus             = new Array(); //画像データ状態

    DataStatus              = new Array(); //データステータス
    ThumbnailFileName       = new Array(); //サムネイルファイル名

    ThumbnailHeight         = new Array(); //サムネイル高さ
    ThumbnailWidth          = new Array(); //サムネイル幅

    ImageFileName           = new Array(); //画像ファイル名

    ImageHeight             = new Array(); //画像高さ
    ImageWidth              = new Array(); //画像幅
//070614 HSK山本 PVCS#2209 ADD-ST
    MediaOutStatus      = new Array(); //メディア出力有無
//070614 HSK山本 PVCS#2209 ADD-ED
//080411 HSK山本 PVCS#2790 ADD-ST
    SeriesUID      = new Array(); //シリーズUID
//080411 HSK山本 PVCS#2790 ADD-ED

    ThumbnailFilePath = new Array();//サムネイル画像のフルパス  //** 2009/07/16 k.harada add

		InputStatus             = new Array(); //画像の入力ステータス
    ImageViewFlag           = new Array(); //処理済画像の入力直後表示フラグ
		//だらだら情報の初期化

    InputMode               = "";          //入力中モード

		InputOnFlag							= "";	         //入力中(だらだら情報あり)フラグ
		InputOnImageSeq					= "";	         //入力中(だらだら情報あり)対象の画像シーケンス
		InputOffFlag						= "";          //入力中(だらだら情報なし)フラグ
		InputOffImageSeq				= new Array(); //入力中(だらだら情報なし)対象の画像シーケンス
		DivInfoResendCount			= 0;           //再送カウント（通常時1、再送時は2以上）

		DivInfoDirection				= -1;          //だらだら方向 0:Bottom（下から上）1:Top（上から下）2:Left（左から右）3:Right（右から左）

		DivInfoDivcount					= 0;           //だらだら分割数（総数）

		DivInfoDivCompcount			= 0;           //だらだら読み込み完了数
		DivInfoTotalImageHeight = 0;           //総画像サイズのHEIGHT
		DivInfoTotalImageWidth	= 0;           //総画像サイズのWIDTH
		DivDataFileName         = new Array(); //だらだら画像ファイル名

		DivDataImageHeight      = new Array(); //だらだら画像サイズのHEIGHT
		DivDataImageWidth       = new Array(); //だらだら画像サイズのWIDTH
    // 2005/07/14 003 H.SAITO 再送処理対応 
    //InputErrorImageId       = "";          // 入力中に失敗した画像ID
    InputErrorCode          = 0;           // 画像入力・画像処理エラーコード(再送処理のダイアログボックスでの判定に使用する）


    // 2005/11/30 PVCS#1560 H.SAITO -ST-
    //// 2005/08/01 003 H.SAITO #790 RU排他の自己排他対応(RU自己排他エラー発生時はCookieチェックを行う)
    //RuSelfExclusionErrorFlag   = "";
    //StudySelfExclusionErrorFlag= "";
    //// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
    //RuExclusionErrorFlag       = "";
    //StudyExclusionErrorFlag    = "";
    //CompletedErrorFlag         = "";
    //// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-
    RuExclusionErrorFlag       = 0;
    StudyExclusionErrorFlag    = 0;
    CompletedErrorFlag         = "";
    // 2005/11/30 PVCS#1560 H.SAITO -ED-
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
  }
}
//*****************************************************************************
// ViewFinished
// １．機能
//      画面フレーム終了時のハンドラ
//
// ２．戻り値
//　　  なし

//
// ３．備考

//      なし

//
//*****************************************************************************
function ViewFinished(viewId, viewInfo){
    try{
        if(viewInfo.commandMode == "MODIFY"){
            // 修正機能呼び出し

            parent.Public_View_Modify("MODIFYMAIN_VIEW");
        }else{
            // ユーザ情報を初期化する
            SbcsStorageUserName  = ""; //ユーザ名(SBCS)
            DbcsStorageUserName  = ""; //ユーザ名(DBCS)
            // インジケータ画面通知
            top.SetCurrentView("");
            // 親への完了通知
            var notifyInfo = { "commandMode" : viewInfo.commandMode, "modifyFlag" : "" };
            NotifyFrameFinished(notifyInfo);
            // 初期化(修正時以外は初期化する)
            Fn_Init();
        }
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
    }
}
//***************************************************************************
//  IndicatorUtilityOpen()		
//  1．機能
//     インジケータユーティリティ開始通知
//  2．戻り値  
//		なし

//  3．備考

//      ここでは処理しない

//***************************************************************************
function IndicatorUtilityOpen(){
	try{
    //インジケータ開始通知を受けた場合は、未選択通知を送信し、だらだらを停止する
    STUDY_VIEW.Public_OtherFunctionOpen();
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
	}
}			
//***************************************************************************
//  IndicatorUtilityClose()		
//  1．機能
//     インジケータユーティリティ終了通知
//  2．戻り値  
//		  なし

//  3．備考

//      ここでは処理しない

//***************************************************************************
function IndicatorUtilityClose(){
	try{
    //インジケータ終了通知を受けた場合は、選択通知を送信し、だらだらを再開する
    STUDY_VIEW.Public_OtherFunctionClose();
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
	}
}
//#1432 2005/09/17--ST
//***************************************************************************
//  Public_EndModify()
//  1．機能
//     修正機能読み込み完了通知
//  2．戻り値  
//		  なし


//  3．備考


//      
//***************************************************************************
function Public_EndModify(){
  try{
		if(parent.ModifyDispFlag == 1){
			STUDY_VIEW.Public_EndModify();
		}
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
	}
}
//#1432 2005/09/17--ST

// CQ#453 ADD ST
//*****************************************************************************
// Public_ReloadStudyWatchProc
//
// １．機能
//      ページロード時の処理
//
// ２．戻り値
//      なし
//
// ３．備考
//      なし
//*****************************************************************************
function Public_ReloadStudyWatchProc(){
	try {
		// ページローダ生成
		var loader = new PageLoader();

		// ページ情報追加
		loader.AddLoadPage("STUDY_WATCH_PROC","Study_Watch_Proc.aspx");

		//ロード開始
		loader.Start();

		// リロードカウントアップ
		StudyWatchProcReloadCount += 1;
	}
	catch(e) {
		Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
	}
}
// CQ#453 ADD ED
