/****************************************************************************

  @file EditPatient_Ctrl.js

  @brief EditPatient_Ctrlのクライアントスクリプト

  @author YSK畑


        SpotCode MAX 22

  Copyright(C) 2004-2009 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/21  YSK畑       V1.0       新規作成
  @date  06/10/13  S1神立      V1.4       操作性向上(フォーカス制御)
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応 
  @date  07/03/01  YSK齋藤     V2.0       ×ボタン押下対応(PVCS#1956) 
  @date  07/03/20  HSK古場     V2.0       内視鏡画像取り込み機能 
  @date  07/06/14  HSK山本     V2.0       PVCS#2209対応 
  @date  08/04/11  HSK山本     V3.2HF     PVCS#2790対応 
  @date  09/05/20  HSK山本     V5.1       心電図本対応 
  @date  09/07/16  原田憲      V6.0       NAS対応 
  @date  09/12/01  FF 星野     V1.1(B)    1.1(B)対応 
  @date  09/12/01  FFS黒田     V1.1(B)    1.1(B)対応 
  @date  10/04/19  TYS園木     V2.0(B)    責任者マルチバイト対応

/****************************************************************************/
 //検査情報============================================
//[定数]
var PROC_MODE     = "EDITPATIENT_CTRL";

var COMMAND_MODE_CANCEL        = "CANCEL";
var COMMAND_MODE_UPDATE        = "UPDATE";
var COMMAND_MODE_EDIT_ID       = "EDITPATIENTID";
var COMMAND_MODE_EDIT_DETAIL   = "EDITPATIENTDETAIL";
var COMMAND_MODE_CHANGE_ID     = "CHANGEPATIENTID";

var VIEW_MODE_INFORMATION         = "INFORMATION_VIEW";
var VIEW_MODE_EDITPATIENTMAIN     = "EDITPATIENTMAIN_VIEW";
var VIEW_MODE_EDITPATIENTID       = "EDITPATIENTID_VIEW";
var VIEW_MODE_EDITPATIENTDETAIL   = "EDITPATIENTDETAIL_VIEW";
var VIEW_MODE_CHANGEPATIENTID     = "CHANGEPATIENTID_VIEW";
var VIEW_MODE_CHANGEPATIENTDETAIL = "CHANGEPATIENTDETAIL_VIEW";
var VIEW_MODE_STUDYDATA           = "STUDYDATA_GET_PROC";
var VIEW_MODE_PATIENTIDUPDATE     = "EDITPATIENTID_UPDATE_PROC";
var VIEW_MODE_PATIENTDETAILUPDATE = "EDITPATIENTDETAIL_UPDATE_PROC";
var VIEW_MODE_SEARCHPATIENTDATA   = "SEARCHPATIENTDATA";
var VIEW_MODE_EKARTEDATA          = "EKARTEDATA_GET_PROC";
var VIEW_MODE_EXCLUSIVE           = "EXCLUSIVE_PROC";
// オープンモード


var OPEN_MODE_CE     = 0;				// CEで開かれた場合


var OPEN_MODE_WINDOW = 1;				// ブラウザで開かれた場合


var OPEN_MODE_DIALOG = 2;				// ダイアログで開かれた場合


// 排他モード


var EXCLUSIVE_MODE1 = 1;
var EXCLUSIVE_MODE2 = 2;
var EXCLUSIVE_MODE3 = 3;
// 修正完了フラグ
var FLAG_PARAM_CANCEL  = 0;
var FLAG_PARAM_UPDATE  = 1;

// 検査取得フラグ
var FLAG_STUDY_GETDATA   = 1;
var FLAG_STUDY_NOGETDATA = 0;

// エラーモード


var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード


var FILE_NAME = "EditPatient_Ctrl.js"  //ファイル名


var MESSAGE_ID = 30500;              //メッセージID 

//070320 HSK古場 ADD-ST
// 画像種別
var IMAGEKIND_FCRIMAGE     = "1";	// FCR画像 
var IMAGEKIND_NON_FCRIMAGE = "0";	// FCR画像以外 
var IMAGEKIND_NON_IMAGE    = "-1";	// 非画像 
//070320 HSK古場 ADD-ED

 //[変数]
//患者情報
var StudySequence;     //検査シーケンス
var PatientId;         //患者ID
var PatientName;       //患者名
var PatientKanjiName;  //漢字患者名
var PatientSex;        //性別
var PatientBirthDate;  //生年月日
var PatientAge;		     //年齢
var DataCount;         //検査メニューデータ数

//2009.12.01 V1.1(B)対応 FF星野 ADD-ST
var PatientComment;//患者コメント
var PatientsSize;//身長
var PatientsWeight;//体重
var PatientsSexNeutred;//去勢避妊
var PatientSpeciesDescription;//種別
var PatientBreedDescription;//品種
var ResponsiblePerson;//責任者
var ResponsibleOrganization;//所属先
//2009.12.01 V1.1(B)対応 FF星野 ADD-ED
//2010.04.19 責任者マルチバイト対応 TYS園木 ADD-ST
var ResponsiblePersonIdoGraphic;//責任者
//2010.04.19 責任者マルチバイト対応 TYS園木 ADD-ED

//検査情報
var StudyStatus;       //検査ステータス
var PurPose;           //管理目的 2005/09/22
//070320 HSK古場 ADD-ST
//画像種別
var ImageKind;
//070320 HSK古場 ADD-ED
//画像データ
var AssosiateId;       //画像シーケンス－添え字（連想配列）

var ImageSeq;           //画像シーケンス
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


var EndGetDataFlag = FLAG_STUDY_NOGETDATA;		// 検査データ取得フラグ(0:未取得/1:取得済)
var SearchChangeFlag = 0;    //検索処理実行フラグ
var EditPatientId;         //検査DBの患者ID
var EditPatientName;       //検査DBの患者名
var EditPatientKanjiName;  //検査DBの漢字患者名
var EditPatientSex;        //検査DBの性別
var EditPatientBirthDate;  //検査DBの生年月日
var GetDate;			// 取得時間


var PatientEditFlag = 0;          // 患者情報編集フラグ


//======================================================
var InitViewId = "";	// 初期表示する画面フレームID
var ViewId     = "";	// 画面フレームID
var ExclusiveMode = "";		// 排他モード



// ADD 2005/02/03 hata============
var ModifyStatusFlag = 0;	// 修正完了状況フラグ(0:修正未 1:修正完了)
//ADD EN===========================
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
var StudyExclusionErrorFlag;
var CompletedErrorFlag;
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-
// 2005/11/30 PVCS#1560 H.SAITO -ST-
var RuExclusionErrorFlag;
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
		loader.AddLoadPage(VIEW_MODE_INFORMATION,"Information_View.aspx");
		loader.AddLoadPage(VIEW_MODE_EDITPATIENTMAIN,"EditPatientMain_View.aspx?OpenMode=" + OpenMode);
		// 2007/03/01 PVCS#1956 H.SAITO -ST-
		//loader.AddLoadPage(VIEW_MODE_STUDYDATA,"StudyData_Get_Proc.aspx");
		loader.AddLoadPage(VIEW_MODE_STUDYDATA,"Main_StudyData_Get_Proc.aspx");
		// 2007/03/01 PVCS#1956 H.SAITO -ED-
		loader.AddLoadPage(VIEW_MODE_PATIENTIDUPDATE,"EditPatientId_Update_Proc.aspx");
		loader.AddLoadPage(VIEW_MODE_PATIENTDETAILUPDATE,"EditPatientDetail_Update_Proc.aspx");
		loader.AddLoadPage(VIEW_MODE_SEARCHPATIENTDATA,"SearchPatientData.aspx");
		loader.AddLoadPage(VIEW_MODE_EKARTEDATA,"EKarteData_Get_Proc.aspx");
		loader.AddLoadPage(VIEW_MODE_EXCLUSIVE,"Exclusive_Proc.aspx");
		//ロード開始

		loader.Start();
		ClearAndShowViewById(VIEW_MODE_EDITPATIENTMAIN);
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
	}
}

//***************************************************************************
//  Public_Init(
//				viewId :画面フレームID)		
//
//  1．機能
//      修正メイン機能初期化

//		
//  2．戻り値  
//		  なし

//  3．備考

//     
//***************************************************************************
function Public_Init(viewId)
{
	try{
		if(EndGetDataFlag == FLAG_STUDY_NOGETDATA){
			Fn_Init();
		}
		// 排他モード設定


		if(OpenMode == OPEN_MODE_DIALOG){
		  ExclusiveMode = EXCLUSIVE_MODE2;
		}
		else{
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
		}
		
		// 画面フレームIDを設定


		InitViewId = viewId ;

		// 検査シーケンス設定


		StudySequence = top.StudySequence;

		var moveViewInfo = new MoveViewInfo(VIEW_MODE_EDITPATIENTMAIN);
		moveViewInfo.SetFinishedNotification(ViewFinished);
		MoveView(moveViewInfo);
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
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
function ViewFinished(viewId, viewInfo)
{

    try{
        //switch内で実行関数およびパラメータを決める
        var executeFunction = null;
        var divId = null;
        var frmId = null;
        var viewSrc = null;
        var movedParam=null;
        
        switch(viewId){
            //------------------//
            //患者編集メイン画面//
            //------------------//
            case VIEW_MODE_EDITPATIENTMAIN:
                // 戻るボタン    
                if(viewInfo.commandMode == COMMAND_MODE_CANCEL){
                    executeFunction = Cancel_End;
                }
                // 患者ID編集ボタン
                else if(viewInfo.commandMode == COMMAND_MODE_EDIT_ID){
                    // 患者ID編集画面フレーム作成
                    divId = "DivEditId",frmId = VIEW_MODE_EDITPATIENTID;
                    viewSrc = "./EditPatientId_View.aspx?VIEW=EDIT&OpenMode=" + OpenMode;
                    movedParam = { "focusMode" : "TextBox"};
                }
                // 患者詳細編集ボタン
                else if(viewInfo.commandMode == COMMAND_MODE_EDIT_DETAIL){
                    // 患者詳細編集画面フレーム作成
                    divId = "DivEditDetail",frmId = VIEW_MODE_EDITPATIENTDETAIL;
                    viewSrc = "./EditPatientDetail_View.aspx?VIEW=EDITDETAIL&OpenMode=" + OpenMode;
                    movedParam = { "focusMode" : "TextBox"};
                }
                // 患者変更ボタン
                else if(viewInfo.commandMode == COMMAND_MODE_CHANGE_ID){
                    // 変更患者編集画面フレーム作成
                    divId = "DivChangeId",frmId = VIEW_MODE_CHANGEPATIENTID;
                    viewSrc = "./EditPatientId_View.aspx?VIEW=CHANGE&OpenMode=" + OpenMode;
                    movedParam = { "focusMode" : "TextBox"};
                }
                // 閉じるボタン
//                else if(viewInfo.commandMode == COMMAND_MODE_UPDATE){
//                    Update_End(viewParameter);                
//                }
                else{
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
                }
                break;
            //--------------//
            //患者ID編集画面//
            //--------------//
            case VIEW_MODE_EDITPATIENTID:
                // 戻るボタン    
                if(viewInfo.commandMode == COMMAND_MODE_CANCEL){
                    frmId = VIEW_MODE_EDITPATIENTMAIN;
                }
                // 修正完了ボタン    
                else if(viewInfo.commandMode == COMMAND_MODE_UPDATE){
                    executeFunction = Update_End;
                }
                break;
            //----------------//
            //患者詳細編集画面//
            //----------------//
            case VIEW_MODE_EDITPATIENTDETAIL:
                // 戻るボタン    
                if(viewInfo.commandMode == COMMAND_MODE_CANCEL){
                    frmId = VIEW_MODE_EDITPATIENTMAIN;
                }
                // 修正完了ボタン    
                else if(viewInfo.commandMode == COMMAND_MODE_UPDATE){
                    executeFunction = Update_End;
                }
                else{
                    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
                    return;
                }
                break;
            //--------------//
            //患者ID変更画面//
            //--------------//
            case VIEW_MODE_CHANGEPATIENTID:
                // 戻るボタン    
                if(viewInfo.commandMode == COMMAND_MODE_CANCEL){
                    Fn_InitEdit();
                    frmId = VIEW_MODE_EDITPATIENTMAIN;
                }
                // 次へボタン    
                else if(viewInfo.commandMode == COMMAND_MODE_UPDATE){
                    // 変更患者詳細編集画面フレーム作成
                    divId = "DivChangeDetail",frmId = VIEW_MODE_CHANGEPATIENTDETAIL;
                    viewSrc = "./EditPatientDetail_View.aspx?VIEW=CHANGEDETAIL&OpenMode=" + OpenMode;
                    movedParam = { "focusMode" : "TextBox"};
                }
                else{
                Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
                return;
                }
                break;
            //----------------//
            //患者詳細変更画面//
            //----------------//
            case VIEW_MODE_CHANGEPATIENTDETAIL:
                // 戻るボタン    
                if(viewInfo.commandMode == COMMAND_MODE_CANCEL){
                    frmId = VIEW_MODE_CHANGEPATIENTID;
                    movedParam = { "focusMode" : "TextBox"};
                }
                // 修正完了ボタン    
                else if(viewInfo.commandMode == COMMAND_MODE_UPDATE){
                    executeFunction = Update_End;
                }
                else{
                    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
                    return;
                }
                break;
            //------//
            //その他//
            //------//
            default:
                Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
                return;
        }

        //処理実行

        if(executeFunction){//実行関数が設定されていたら

            executeFunction();
        }else{
            //フレーム遷移時のパラメータ
            var moveViewInfo = new MoveViewInfo(frmId);
            moveViewInfo.SetMovedParam(movedParam);//遷移後通知のパラメータ
            moveViewInfo.SetFinishedNotification(ViewFinished);//遷移画面終了時の通知
            if(divId){
                LoadPageInDiv(divId,frmId,viewSrc,MoveView,moveViewInfo,FrameCreatedNotification);
            }else{
                //dividが設定されていない場合、frameが生成されていること前提で初期化

                MoveView(moveViewInfo);
            }
        }

        
        // 画面フレームIDを設定
        ViewId = viewId;
        
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
    }
}

//***************************************************************************
//  FrameCreatedNotification()        
//
//  1．機能
//      フレームが生成通知
//        
//  2．戻り値  
//          なし
//  3．備考
//     
//***************************************************************************
function FrameCreatedNotification(frameId)
{
    try{
        //画面表示
        ClearAndShowViewById(frameId);
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
    }
}


//***************************************************************************
//  Cancel_End()
//
//  1．機能
//      修正メイン機能キャンセル
//
//  2．戻り値  
//      なし
//
//  3．備考
//
//***************************************************************************
function Cancel_End()
{
    try{
        // 親への完了通知
        var notifyInfo = { "commandMode" : COMMAND_MODE_CANCEL, "modifyFlag" : ModifyStatusFlag };
        NotifyFrameFinished(notifyInfo);
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+10);
    }
}
//***************************************************************************
//  Update_End()
//
//  1．機能
//      修正メイン機能修正完了
//
//  2．戻り値
//      なし
//
//  3．備考
//
//***************************************************************************
function Update_End()
{
    try{
        // 親への完了通知
        var notifyInfo = { "commandMode" : COMMAND_MODE_UPDATE, "modifyFlag" : ModifyStatusFlag };
        NotifyFrameFinished(notifyInfo);
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+11);
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
 // ADD 2005/02/03 hata============
		ModifyStatusFlag = 0;	// 修正完了状況フラグ(0:修正未 1:修正完了)
//ADD EN===========================
		EndGetDataFlag		= FLAG_STUDY_NOGETDATA; //データ未取得フラグ
//		ExclusiveMode       = 0; //初期化すると検査一覧⇒患者情報編集遷移時に排他モードがクリアされてしまうためコメント

		//患者情報の初期化

		StudySequence       = -1; //検査シーケンス
		PatientID           = ""; //患者ID
		PatientName         = ""; //患者名
		PatientSex          = ""; //性別
		PatientBirthDate    = ""; //生年月日
		PatientAge          = "";		   //年齢
		PatientsSexNeutred  = ""; //避妊処置 2009/12/01 FFS黒田 ADD
		DataCount           = 0;  //撮影メニューデータ数
		SearchChangeFlag	   = 0;
		EditPatientId        = "";			//患者変更時患者テーブルの患者ID
		EditPatientName      = "";			//患者変更時患者テーブルの患者名
		EditPatientKanjiName = "";			//患者変更時患者テーブルの漢字患者名
		EditPatientSex       = "";			//患者変更時患者テーブルの性別
		EditPatientBirthDate = "";			//患者変更時患者テーブルの生年月日
		GetDate              = "";			// 取得時間

    PatientEditFlag      = 0;          // 患者情報編集フラグ
    //検査情報
    StudyStatus          = "";       //検査ステータス 
		//画像の初期化

		AssosiateID       = new Array(); //画像シーケンス－添え字（連想配列）

		ImageID           = new Array(); //画像シーケンス
		MenuName          = new Array(); //検査メニュー
		MenuKind          = new Array(); //入力データ種別
		ImageStatus       = new Array(); //画像データ状態

		DataStatus        = new Array(); //データステータス
		ThumbnailFileName = new Array(); //サムネイルファイル名

		ThumbnailHeight   = new Array(); //サムネイル高さ
		ThumbnailWidth    = new Array(); //サムネイル幅

		ImageFileName     = new Array(); //画像ファイル名

		ImageHeight       = new Array(); //画像高さ
		ImageWidth        = new Array(); //画像幅
//070614 HSK山本 PVCS#2209 ADD-ST
        MediaOutStatus      = new Array(); //メディア出力有無
//070614 HSK山本 PVCS#2209 ADD-ED
//080411 HSK山本 PVCS#2790 ADD-ST
    SeriesUID      = new Array(); //シリーズUID
//080411 HSK山本 PVCS#2790 ADD-ED

    ThumbnailFilePath = new Array();//サムネイル画像のフルパス  //** 2009/07/16 k.harada add


		EndGetDataFlag = FLAG_STUDY_NOGETDATA;		// 検査データ取得フラグ(0:未取得/1:取得済)
    // 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
    StudyExclusionErrorFlag    = 0;
    CompletedErrorFlag         = "";
    // 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-
    // 2005/11/30 PVCS#1560 H.SAITO -ST-
    RuExclusionErrorFlag       = 0;
    // 2005/11/30 PVCS#1560 H.SAITO -ED-
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+12);
	}
}

//*****************************************************************************
// Fn_InitEdit
// １．機能
//      変更患者情報の初期化処理を行う
// ２．戻り値
//　　  なし


// ３．備考


//　　　なし


//*****************************************************************************
function Fn_InitEdit(){
  try{
    SearchChangeFlag     = 0;    //検索処理実行フラグ
		EditPatientId        = "";			//患者変更時患者テーブルの患者ID
		EditPatientName      = "";			//患者変更時患者テーブルの患者名
		EditPatientKanjiName = "";			//患者変更時患者テーブルの漢字患者名
		EditPatientSex       = "";			//患者変更時患者テーブルの性別
		EditPatientBirthDate = "";			//患者変更時患者テーブルの生年月日
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+13);
	}
}
