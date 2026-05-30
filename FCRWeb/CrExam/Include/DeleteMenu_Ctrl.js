/****************************************************************************

  @file DeleteMenu_Ctrl.js

  @brief Delete_Menuのクライアントスクリプト

  @author YSK齋藤
  
        SpotCode MAX 5

  Copyright(C) 2004-2009 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/11/05  YSK齋藤     V1.0       新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応 
  @date  07/03/01  YSK齋藤     V2.0       ×ボタン押下対応(PVCS#1956) 
  @date  07/03/20  HSK古場     V2.0       内視鏡画像取り込み機能 
  @date  07/06/14  HSK山本     V2.0       PVCS#2209対応 
  @date  08/04/11  HSK山本     V3.2HF     PVCS#2790対応 
  @date  09/07/16  原田憲      V6.0       NAS対応 
  @date  09/12/01  FFS黒田     V1.1(B)    患者情報項目追加
  @date  14/04/14  TYS会田     V3.0(B)    DR直結-検査情報修正

/****************************************************************************/
//[定数]
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード



var FILE_NAME = "DeleteMenu_Ctrl.js"  //ファイル名



var MESSAGE_ID = 30500;              //メッセージID 
// 検査取得フラグ
var FLAG_STUDY_GETDATA   = 1;
var FLAG_STUDY_NOGETDATA = 0;
// オープンモード


var OPEN_MODE_CE         = 0;				// CEで開かれた場合


var OPEN_MODE_WINDOW     = 1;				// ブラウザで開かれた場合


var OPEN_MODE_DIALOG     = 2;				// ダイアログで開かれた場合


// 排他モード

var EXCLUSIVE_MODE1      = 1;
var EXCLUSIVE_MODE2      = 2;
var EXCLUSIVE_MODE3      = 3;
//070320 HSK古場 ADD-ST
// 画像種別
var IMAGEKIND_FDXIMAGE     = "2";	// FCR画像	//2014.04.14 TYS会田 DR直結-検査情報修正 ADD
var IMAGEKIND_FCRIMAGE     = "1";	// FCR画像

var IMAGEKIND_NON_FCRIMAGE = "0";	// FCR画像以外

//070320 HSK古場 ADD-ED
//[変数]
var EndGetDataFlag       = 0;		              //データ取得完了フラグ
var ExclusiveMode        = "";		  // 排他モード

//患者情報
var StudySequence;     //検査シーケンス
var PatientId;         //患者ID
var PatientName;       //患者名
var PatientKanjiName;	 //患者名(マルチバイト)
var PatientSex;        //性別
var PatientBirthDate;  //生年月日
var PatientAge;				 //年齢
var PatientsSexNeutred;	//避妊処置 2009/12/01 FFS黒田 ADD
var DataCount;         //検査メニューデータ数
//検査情報
var StudyStatus;       //検査ステータス
var PurPose;           //管理目的 2005/09/22
//070320 HSK古場 ADD-ST
//画像種別
var ImageKind;
//070320 HSK古場 ADD-ED
//画像データ
// 2005/07/06 002 H.SAITO PVCS#870 メディアから取り込んだ検査
var MediaGetStatus;    //メディアから取り込んだ検査かフラグ
var AssosiateId;       //画像シーケンス－添え字（連想配列）

var ImageSeq;          //画像シーケンス
var MenuName;          //検査メニュー名

var MenuKind;          //入力データ種別
var ImageStatus;       //画像データ状態

var DataStatus;        //データステータス
var ThumbnailFileName; //サムネイルファイル名

var ThumbnailHeight;   //サムネイル高さ
var ThumbnailWidth;    //サムネイル幅

var ImageFileName;     //画像ファイル名

var ImageHeight;       //画像高さ
var ImageWidth;        //画像幅
//070614 HSK山本 PVCS#2209 ADD-ST
var MediaOutStatus;    //メディア出力有無
//070614 HSK山本 PVCS#2209 ADD-ED
//080411 HSK山本 PVCS#2790 ADD-ST
var SeriesUID;         //シリーズUID
//080411 HSK山本 PVCS#2790 ADD-ED

var ThumbnailFilePath;  //** 2009/07/16 k.harada add


// ADD 2005/02/03 hata============
var ModifyStatusFlag = 0;	// 修正完了状況フラグ(0:修正未 1:修正完了)
//ADD EN===========================
// 2005/11/30 PVCS#1560 H.SAITO -ST-
var StudyExclusionErrorFlag;
var RuExclusionErrorFlag;
var CompletedErrorFlag;
// 2005/11/30 PVCS#1560 H.SAITO -ED-
//*****************************************************************************
// Fn_InitPage
// １．機能
//      ページロード時の処理
// ２．戻り値
//　　  なし


// ３．備考


//　　　なし


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
		loader.AddLoadPage("INFORMATION_VIEW","Information_View.aspx");
		loader.AddLoadPage("DELETEMENU_UPDATE_PROC","DeleteMenu_Update_Proc.aspx");
		loader.AddLoadPage("EXCLUSIVE_PROC","Exclusive_Proc.aspx");
		loader.AddLoadPage("DELETEMENU_VIEW","DeleteMenu_View.aspx?OpenMode=" + OpenMode);
		//ロード開始

		loader.Start();
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
  }
}

//*****************************************************************************
// Public_View
// １．機能
//      機能開始処理を行う（データを取得する）


// ２．戻り値
//　　  なし


// ３．備考


//　　　なし


//*****************************************************************************
function Public_Init(){
  try{
    Fn_Init();
	// 排他モード設定


	if(OpenMode == OPEN_MODE_DIALOG){
	  ExclusiveMode = EXCLUSIVE_MODE2;
	}
	else{
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
	}
    
    StudySequence = top.StudySequence;
    var moveViewInfo = new MoveViewInfo("DELETEMENU_VIEW");
    moveViewInfo.SetFinishedNotification(ViewFinished);
    MoveView(moveViewInfo);
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
  }
}
//*****************************************************************************
// Fn_Init
// １．機能
//      初期化処理を行う
// ２．戻り値
//　　  なし


// ３．備考


//　　　なし


//*****************************************************************************
function Fn_Init(){
  try{
    EndGetDataFlag      = FLAG_STUDY_NOGETDATA;	//データ取得完了フラグ
    ExclusiveMode       = 0;
    // 患者情報の初期化

    StudySequence       = -1;          //検査シーケンス
    PatientId           = "";          //患者ID
    PatientName         = "";          //患者名
		PatientKanjiName		= "";	         //患者名(マルチバイト)
    PatientSex          = "";          //性別
    PatientBirthDate    = "";          //生年月日
    PatientAge					= "";          //年齢
    PatientsSexNeutred  = "";          //避妊処置 2009/12/01 FFS黒田 ADD
    DataCount           = 0;           //撮影メニューデータ数
    //検査情報
    StudyStatus         = "";          //検査ステータス
    // 画像の初期化

    // 2005/07/06 002 H.SAITO PVCS#870 メディアから取り込んだ検査
    MediaGetStatus      = "";          //メディアから取り込んだ検査かフラグ
    AssosiateId         = new Array(); //画像シーケンス－添え字（連想配列）

    ImageSeq            = new Array(); //画像シーケンス
    MenuName            = new Array(); //検査メニュー
    MenuKind            = new Array(); //入力データ種別
    ImageStatus         = new Array(); //画像データ状態

    DataStatus          = new Array(); //データステータス
    ThumbnailFileName   = new Array(); //サムネイルファイル名

    ThumbnailHeight     = new Array(); //サムネイル高さ
    ThumbnailWidth      = new Array(); //サムネイル幅

    ImageFileName       = new Array(); //画像ファイル名

    ImageHeight         = new Array(); //画像高さ
    ImageWidth          = new Array(); //画像幅
//070614 HSK山本 PVCS#2209 ADD-ST
    MediaOutStatus      = new Array(); //メディア出力有無
//070614 HSK山本 PVCS#2209 ADD-ED
//080411 HSK山本 PVCS#2790 ADD-ST
    SeriesUID      = new Array(); //シリーズUID
//080411 HSK山本 PVCS#2790 ADD-ED

    ThumbnailFilePath = new Array();//サムネイル画像のフルパス  //** 2009/07/16 k.harada add


 // ADD 2005/02/03 hata============
	ModifyStatusFlag = 0;	// 修正完了状況フラグ(0:修正未 1:修正完了)
//ADD EN===========================
    // 2005/11/30 PVCS#1560 H.SAITO -ST-
    StudyExclusionErrorFlag = 0;
    RuExclusionErrorFlag    = 0;
    CompletedErrorFlag      = "";
    // 2005/11/30 PVCS#1560 H.SAITO -ED-
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
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
        // 親への完了通知
        var notifyInfo = { "commandMode" : viewInfo.commandMode, "modifyFlag" : ModifyStatusFlag };
        NotifyFrameFinished(notifyInfo);
        Fn_Init();
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
    }
}
