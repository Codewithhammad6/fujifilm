/****************************************************************************

  @file Modify_Ctrl.js

  @brief Modify_Ctrlのクライアントスクリプト

  @author YSK畑



        SpotCode MAX 28

  Copyright(C) 2004-2009 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/15  YSK畑       V1.0       新規作成
  @date  05/12/12  YSK齋藤     V1.1       C@Rnaサービスの機能別有効化対応(PVCS#1698)
  @date  06/10/13  S1神立      V1.4       操作性向上(フォーカス制御)
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応 
  @date  07/03/01  YSK齋藤     V2.0       ×ボタン押下対応(PVCS#1956) 
  @date  07/03/02  HSK山本     V2.0       DicomStorage出力機能 
  @date  07/03/20  HSK古場     V2.0       内視鏡画像取り込み機能 
  @date  07/06/14  HSK山本     V2.0       PVCS#2209対応 
  @date  08/04/11  HSK山本     V3.2HF     PVCS#2790対応 
  @date  09/05/20  HSK山本     V5.1       心電図本対応 
  @date  09/07/16  原田憲      V6.0       NAS対応 
  @date  09/12/01  FFS黒田     V1.1(B)    患者情報項目追加
  @date  09/12/25  TSY松岡     V1.1(B)    CQ#61対応
  @date  10/04/19  TYS園木     V2.0(B)    責任者マルチバイト対応
  @date  10/06/01  FF 星野     V2.0(B)    CQ#219対応
  @date  14/04/14  TYS会田     V3.0(B)    DR直結-検査情報修正
  
/****************************************************************************/
 //[定数]
var PROC_MODE     = "MODIFY_CTRL";

//呼び出し画面
var PROC_MODE_RESERVE      = "RESERVESTUDY_CTRL";
var PROC_MODE_STUDY        = "STUDY_CTRL";

var COMMAND_MODE_CANCEL      = "CANCEL";
var COMMAND_MODE_UPDATE      = "UPDATE";
var COMMAND_MODE_DETAIL      = "DETAIL";
var COMMAND_MODE_ADDMENU     = "ADDMENU";
var COMMAND_MODE_CHANGEMENU  = "CHANGEMENU";
var COMMAND_MODE_DELETEMENU  = "DELETEMENU";
var COMMAND_MODE_SORTMENU    = "SORTMENU";
var COMMAND_MODE_CHANGEIMG   = "CHANGEIMG";
var COMMAND_MODE_OUTPUT      = "OUTPUT";
var COMMAND_MODE_EDITPATIENT = "EDITPATIENT";
var COMMAND_MODE_EDITPATIENTID       = "EDITPATIENTID";
var COMMAND_MODE_EDITPATIENTDETAIL   = "EDITPATIENTDETAIL";
var COMMAND_MODE_CHANGEPATIENTID     = "CHANGEPATIENTID";
var COMMAND_MODE_CHANGEPATIENTDETAIL = "CHANGEPATIENTDETAIL";


var VIEW_MODE_MODIFYMAIN          = "MODIFYMAIN_VIEW";
var VIEW_MODE_ADDMENU             = "ADDMENU_VIEW";
var VIEW_MODE_CHANGEMENU          = "CHANGEMENU_VIEW";
var VIEW_MODE_DELETEMENU          = "DELETEMENU_VIEW";
var VIEW_MODE_SORTMENU            = "SORTMENU_VIEW";
var VIEW_MODE_CHANGEIMG           = "CHANGEIMG_VIEW";
var VIEW_MODE_OUTPUT              = "OUTPUT_VIEW";
var VIEW_MODE_OUTPUTDETAIL        = "OUTPUTDETAIL_VIEW";
var VIEW_MODE_EDITPATIENTMAIN     = "EDITPATIENTMAIN_VIEW";
var VIEW_MODE_EDITPATIENTID       = "EDITPATIENTID_VIEW";
var VIEW_MODE_EDITPATIENTDETAIL   = "EDITPATIENTDETAIL_VIEW";
var VIEW_MODE_CHANGEPATIENTID     = "CHANGEPATIENTID_VIEW";
var VIEW_MODE_CHANGEPATIENTDETAIL = "CHANGEPATIENTDETAIL_VIEW";
// オープンモード


var OPEN_MODE_CE     = 0;				// CEで開かれた場合


var OPEN_MODE_WINDOW = 1;				// ブラウザで開かれた場合


var OPEN_MODE_DIALOG = 2;				// ダイアログで開かれた場合


// 排他モード


var EXCLUSIVE_MODE1 = 1;
var EXCLUSIVE_MODE2 = 2;
var EXCLUSIVE_MODE3 = 3;
// 修正完了フラグ
var FLAG_PARAM_CANCEL  = 0;						// キャンセル
var FLAG_PARAM_UPDATE  = 1;						// 修正完了


// 検査取得フラグ
var FLAG_STUDY_GETDATA   = 1;					// 検査取得


var FLAG_STUDY_NOGETDATA = 0;					// 検査未取得


// エラーモード


var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード


var FILE_NAME = "Modify_Ctrl.js";  //ファイル名


var MESSAGE_ID        = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS = 30501;              //メッセージID 

//070320 HSK古場 ADD-ST
// 画像種別
var IMAGEKIND_FDXIMAGE     = "2";	// FDX画像 	//2014.04.14 TYS会田 DR直結-検査情報修正 ADD
var IMAGEKIND_FCRIMAGE     = "1";	// FCR画像 
var IMAGEKIND_NON_FCRIMAGE = "0";	// FCR画像以外 
var IMAGEKIND_NON_IMAGE    = "-1";	// 非画像 

//070320 HSK古場 ADD-ED

//検査情報============================================
//[変数]
//患者情報
var StudySequence;     //検査シーケンス
var PatientId;         //患者ID
var PatientName;       //患者名
var PatientKanjiName;  //漢字患者名
var PatientSex;        //性別
var PatientBirthDate;  //生年月日
var PatientAge;		     //年齢
// 2009/12/25 ADD TYS松岡 CQ#61対応 Start ------------------------------------
var PatientsSize;
var PatientsWeight;
var PatientSpeciesDescription;
var PatientBreedDescription;
var ResponsiblePerson;
var ResponsibleOrganization;
var PatientComment;
// 2009/12/25 ADD TYS松岡 CQ#61対応 End   ------------------------------------
// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ------------------------------------
var ResponsiblePersonIdoGraphic;
// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ------------------------------------
var PatientsSexNeutred; //避妊処置 2009/12/01 FFS黒田 ADD
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



var EndGetDataFlag = FLAG_STUDY_NOGETDATA;		// 検査データ取得フラグ(0:未取得/1:取得済)

var SearchChangeFlag = 0;    //検索処理実行フラグ
var EditPatientId;         //患者変更時患者テーブルの患者ID
var EditPatientName;       //患者変更時患者テーブルの患者名
var EditPatientKanjiName;  //患者変更時患者テーブルの漢字患者名
var EditPatientSex;        //患者変更時患者テーブルの性別
// 2009/12/25 ADD TYS松岡 CQ#61対応 Start ------------------------------------
var EditPatientsSize;
var EditPatientsWeight;
var EditPatientSpeciesDescription;
var EditPatientBreedDescription;
var EditResponsiblePerson;
var EditResponsibleOrganization;
var EditPatientsSexNeutred;
var EditPatientComment;
// 2009/12/25 ADD TYS松岡 CQ#61対応 End   ------------------------------------
// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ------------------------------------
var EditResponsiblePersonIdoGraphic;
// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ------------------------------------
var EditPatientBirthDate;  //患者変更時患者テーブルの生年月日
var GetDate;			// 取得時間


var PatientEditFlag   = 0;  //患者編集フラグ
//出力先設定データ
var PrintPriority      //優先出力


var OutputCopies;      //プリント枚数
var OutputFlag;        //出力有無
var OutputStatus;      //出力状況


var DeviceCode;        //出力先装置コード


var DeviceType;        //出力先タイプ


var OutputTiming;      //出力タイミング
var OutputReqClass;    //出力依頼区分


var OutputDensity;     //画像密度
var OutputPicCompType; //画像圧縮タイプ


var OutputPicProcessType;  //画像処理タイプ


var OutputPicProcessParam; //画像処理パラメータ
var OutputDataCount= 0 //装置数
//編集用出力先設定データ
var EditPrintPriority      //優先出力


var EditOutputFlag;  //出力有無
var EditOutputStatus;//出力状況


var EditDeviceCode;        //出力先装置コード


var EditDeviceType;        //出力先タイプ


var EditOutputTiming;      //出力タイミング
var EditOutputReqClass;    //出力依頼区分


var EditOutputDensity;     //画像密度
var EditOutputPicCompType; //画像圧縮タイプ


var EditOutputPicProcessType;  //画像処理タイプ


var EditOutputPicProcessParam; //画像処理パラメータ
var EditOutputCopies;      //プリント枚数
var EditDeviceName;        //装置名称
var EditOutputDataCount= 0;       //装置数
//出力先情報データ
var OutputAliasMedia;         //メディア名称
var OutputAliasMediaNo;       //メディア装置コード



var OutputAliasMediaStatus;   //メディア出力状況



var OutputAliasPrinter;       //プリンタ名称(配列)
var OutputAliasPrinterNo;     //プリンタ装置コード(配列)
var OutputAliasPrinterStatus; //プリンタ出力状況(配列)
var OutputAliasCarna;         //C@Rna名称
var OutputAliasCarnaStatus;   //C@Rna出力状況
//070302 HSK山本 ADD-ST
var OutputAliasStorage;       //DicomStorage名称(配列) 
var OutputAliasStorageNo;     //DicomStorage装置コード(配列) 
var OutputAliasStorageStatus; //DicomStorage出力状況(配列) 
//070302 HSK山本 ADD-ED


var OutputAliasFile;          //汎用ファイル名称 
var OutputAliasFileStatus;    //汎用ファイル出力状況



var OutputModifyFlag   = 0;          //出力先設定変更フラグ(0:変更無し1:変更有り)
//======================================================
var InitViewId = "";					// 初期表示する画面フレームID
var ViewId = "";						// 画面フレームID
var ExclusiveMode = "";		// 排他モード



var ModifyStatusFlag = 0;	// 修正完了状況フラグ(0:修正未 1:修正完了)
//2005/04/24 003 H.SAITO
//排他取得状態(0:未取得,1:検査排他取得,2:検査,RU排他取得)
var ExclusiveState = 0;
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
var StudyExclusionErrorFlag;
var CompletedErrorFlag;
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-
// 2005/11/30 PVCS#1560 H.SAITO -ST-
var RuExclusionErrorFlag;
// 2005/11/30 PVCS#1560 H.SAITO -ED-
//2005/11/28--ST #1629
var OutputDispType; // 出力先設定(表示タイプ)
var OutputDispArr; // 出力先設定(表示位置)
//2005/11/28--EN
//2005/12/12 PVCS#1698 -ST-
var OutputDispHiddenFlag; // 出力先非表示フラグ(0:表示:1:非表示)
//2005/12/12 PVCS#1698 -ED-
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
		loader.AddLoadPage(VIEW_MODE_MODIFYMAIN,"./ModifyMain.aspx?OpenMode=" + OpenMode);
		loader.AddLoadPage("INFORMATION_VIEW","./Information_View.aspx");
		// 2007/03/01 PVCS#1956 H.SAITO -ST-
		//loader.AddLoadPage("STUDYDATA_GET_PROC","./StudyData_Get_Proc.aspx");
		loader.AddLoadPage("STUDYDATA_GET_PROC","./Main_StudyData_Get_Proc.aspx");
		// 2007/03/01 PVCS#1956 H.SAITO -ED-
		loader.AddLoadPage("ADDMENU_UPDATE_PROC","./RegAddMenu_Update_Proc.aspx");
		loader.AddLoadPage("CHANGEMENU_UPDATE_PROC","./RegChangeMenu_Update_Proc.aspx");
		loader.AddLoadPage("DELETEMENU_UPDATE_PROC","./DeleteMenu_Update_Proc.aspx");
		loader.AddLoadPage("SORTMENU_UPDATE_PROC","./SortMenu_Update_Proc.aspx");
		loader.AddLoadPage("CHANGEIMG_UPDATE_PROC","./ChangeImg_Update_Proc.aspx");
		loader.AddLoadPage("OUTPUT_UPDATE_PROC","./Output_Update_Proc.aspx");
		loader.AddLoadPage("EDITPATIENTID_UPDATE_PROC","./EditPatientId_Update_Proc.aspx");
		loader.AddLoadPage("EDITPATIENTDETAIL_UPDATE_PROC","./EditPatientDetail_Update_Proc.aspx");
		loader.AddLoadPage("SEARCHPATIENTDATA","./SearchPatientData.aspx");
		loader.AddLoadPage("EKARTEDATA_GET_PROC","./EKarteData_Get_Proc.aspx");
		loader.AddLoadPage("CHECKCOMMAND_PROC","./CheckCommand_Proc.aspx");
		loader.AddLoadPage("EXCLUSIVE_PROC","./Exclusive_Proc.aspx");
		//コールバック設定

		loader.SetAllPageLoadedNotification(ChildPagesLoadedNotification);
		//ロード開始

		loader.Start();

  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
    }

}
//*****************************************************************************
// ChildPagesLoadedNotification
//
// １．機能
//      下位ページの読み込みが完了した通知


// ２．戻り値
//      なし


// ３．備考


//      なし


//*****************************************************************************
function ChildPagesLoadedNotification(){
  try{
    //修正画面起動フラグON
    parent.ModifyDispFlag = 1;
    //#1432 2005/09/17--ST
    parent.Public_EndModify();
    //#1432 2005/09/17--EN

  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
  }
}
//***************************************************************************
//  Public_Init(studySquence:検査シーケンス
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
		// 画面フレームIDを設定


		InitViewId = viewId ;

// CAHGE 2005/02/08 hata ===============
		// 排他モード設定


		if(OpenMode == OPEN_MODE_CE){
			if(parent.ProcId == PROC_MODE_RESERVE){
				if(InitViewId == VIEW_MODE_MODIFYMAIN){
					ExclusiveMode = EXCLUSIVE_MODE1;
				}else if(InitViewId == VIEW_MODE_EDITPATIENTID){
					ExclusiveMode = EXCLUSIVE_MODE3;
				}else if(InitViewId == VIEW_MODE_EDITPATIENTDETAIL){
					ExclusiveMode = EXCLUSIVE_MODE3;
				}else if(InitViewId == VIEW_MODE_CHANGEPATIENTID){
					ExclusiveMode = EXCLUSIVE_MODE3;
				}else{
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
				}			
			}else if(parent.ProcId == PROC_MODE_STUDY){
				ExclusiveMode = EXCLUSIVE_MODE2;
			}else{
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
			}						
		}
// CHANGE ============================
		else if(OpenMode ==OPEN_MODE_WINDOW)
		{
			//2010.06.01 CQ#219対応 FF星野 ADD-ST
			if(parent.ProcId == PROC_MODE_STUDY)
			{
				ExclusiveMode = EXCLUSIVE_MODE2;
			}
			else
			{
				ExclusiveMode = EXCLUSIVE_MODE1;
			}
			//2010.06.01 CQ#219対応 FF星野 ADD-ED			
		}
		else{
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
		}

		// 検査シーケンス設定


		StudySequence = top.StudySequence;

		//switch内でパラメータを決める
		var divId = null;
		var frmId = null;
		var viewSrc = null;
		var movedParam=null;
		switch(InitViewId){
			case VIEW_MODE_MODIFYMAIN:
			frmId = VIEW_MODE_MODIFYMAIN;
			break;
			case VIEW_MODE_EDITPATIENTID:
			// 患者ID編集画面表示
			divId = "DivEditId",frmId = VIEW_MODE_EDITPATIENTID;
			viewSrc = "./EditPatientId_View.aspx?VIEW=EDIT&OpenMode=" + OpenMode;
            movedParam = { "focusMode" : "TextBox"};
			break;
			case VIEW_MODE_EDITPATIENTDETAIL:
			// 患者詳細編集画面表示
			divId = "DivEditId",frmId = VIEW_MODE_EDITPATIENTID;
			viewSrc = "./EditPatientId_View.aspx?VIEW=EDIT&OpenMode=" + OpenMode;
            movedParam = { "focusMode" : "TextBox"};
			break;
			case VIEW_MODE_CHANGEPATIENTID:
			// 変更患者詳細画面表示
			divId = "DivEditId",frmId = VIEW_MODE_CHANGEPATIENTID;
			viewSrc = "./EditPatientId_View.aspx?VIEW=CHANGE&OpenMode=" + OpenMode;
            movedParam = { "focusMode" : "TextBox"};
			break;
			default:
			Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
			break;
		}

        var moveViewInfo = new MoveViewInfo(frmId);
        moveViewInfo.SetMovedParam(movedParam);//遷移後通知のパラメータ
        moveViewInfo.SetFinishedNotification(ViewFinished);//遷移画面終了時の通知
		if(divId){
			LoadPageInDiv(divId,frmId,viewSrc,MoveView,moveViewInfo,FrameCreatedNotification);
		}else{
			//dividが設定されていない場合、frameが生成されていること前提で初期化

			MoveView(moveViewInfo);
		}
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
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
        var movingMode = FC_MOVING_MODE_INIT;
        var movingParam = null;
        var movedParam=null;
		//遷移対象および他パラメータの決定

		switch(viewId){
			// 修正メイン画面
			case VIEW_MODE_MODIFYMAIN:
			if(viewInfo.commandMode == COMMAND_MODE_CANCEL){
				executeFunction = Cancel_End;
			}
			else if(viewInfo.commandMode == COMMAND_MODE_ADDMENU){
				// メニュー追加画面表示
				divId = "DivAddMenu",frmId = VIEW_MODE_ADDMENU;
				viewSrc = "RegAddMenu_View.aspx?RegMenuMode=1&OpenMode=" + OpenMode;
			}
			else if(viewInfo.commandMode == COMMAND_MODE_CHANGEMENU){
				// メニュー変更画面表示
				divId = "DivChangeMenu",frmId = VIEW_MODE_CHANGEMENU;
				viewSrc = "./RegAddMenu_View.aspx?RegMenuMode=2&OpenMode=" + OpenMode;
			}
			else if(viewInfo.commandMode == COMMAND_MODE_DELETEMENU){
				// メニュー削除画面表示
				divId = "DivDeleteMenu",frmId = VIEW_MODE_DELETEMENU;
				viewSrc = "./DeleteMenu_View.aspx?OpenMode=" + OpenMode;
			}
			else if(viewInfo.commandMode == COMMAND_MODE_SORTMENU){
				// 表示順並べ替え画面表示
				divId = "DivSortMenu",frmId = VIEW_MODE_SORTMENU;
				viewSrc = "./SortMenu_View.aspx?OpenMode=" + OpenMode;
			}
			else if(viewInfo.commandMode == COMMAND_MODE_CHANGEIMG){
				// 画像入れ替え画面表示
				divId = "DivChangeImg",frmId = VIEW_MODE_CHANGEIMG;
				viewSrc = "./ChangeImg_View.aspx?OpenMode=" + OpenMode;
			}
			else if(viewInfo.commandMode == COMMAND_MODE_OUTPUT){
				// 出力先設定画面表示
				divId = "DivOutput",frmId = VIEW_MODE_OUTPUT;
				viewSrc = "./Output_View.aspx?OpenMode=" + OpenMode;
			}
			else if(viewInfo.commandMode == COMMAND_MODE_EDITPATIENT){
				// 患者メイン編集画面表示
				divId = "DivEditMain",frmId = VIEW_MODE_EDITPATIENTMAIN;
				viewSrc = "./EditPatientMain_View.aspx?OpenMode=" + OpenMode;
			}
			break;
		
			//メニュー処理

			case VIEW_MODE_ADDMENU:// メニュー追加画面
			case VIEW_MODE_CHANGEMENU:// メニュー変更画面
			case VIEW_MODE_DELETEMENU:// メニュー削除画面
			case VIEW_MODE_SORTMENU:// 表示順並べ替え画面
			case VIEW_MODE_CHANGEIMG:// 画像入れ替え画面
			case VIEW_MODE_OUTPUT:// 出力先設定画面
			if(viewInfo.commandMode == COMMAND_MODE_CANCEL){
				frmId = VIEW_MODE_MODIFYMAIN;
			}
			else if(viewInfo.commandMode == COMMAND_MODE_UPDATE){
				executeFunction = Update_End;
			}else{//メニュー固有処理

				if(viewId == VIEW_MODE_OUTPUT){
					if(viewInfo.commandMode == COMMAND_MODE_DETAIL){
						// 出力先設定詳細画面表示
						divId = "DivOutputDetail",frmId = VIEW_MODE_OUTPUTDETAIL;
						viewSrc = "./OutputDetail_View.aspx?OpenMode=" + OpenMode;
						movingParam = {"paramData" : viewInfo.commandParam};
					}
				}
			}
			break;
			
			// 出力先詳細設定画面
			case VIEW_MODE_OUTPUTDETAIL:
			if(viewInfo.commandMode == COMMAND_MODE_CANCEL || viewInfo.commandMode == COMMAND_MODE_UPDATE){
				frmId = VIEW_MODE_OUTPUT;
				movingMode = FC_MOVING_MODE_UPDATE;
			}
			break;
			// 患者編集メイン画面
			case VIEW_MODE_EDITPATIENTMAIN:
			if(viewInfo.commandMode == COMMAND_MODE_CANCEL){
				frmId = VIEW_MODE_MODIFYMAIN;
			}
			else if(viewInfo.commandMode == COMMAND_MODE_EDITPATIENTID){
				// 患者ID編集画面表示
				divId = "DivEditId",frmId = VIEW_MODE_EDITPATIENTID;
				viewSrc = "./EditPatientId_View.aspx?VIEW=EDIT&OpenMode=" + OpenMode;
                movedParam = { "focusMode" : "TextBox"};
			}
			else if(viewInfo.commandMode == COMMAND_MODE_EDITPATIENTDETAIL){
				// 患者詳細編集画面表示
				divId = "DivEditDetail",frmId = VIEW_MODE_EDITPATIENTDETAIL;
				viewSrc = "./EditPatientDetail_View.aspx?VIEW=EDITDETAIL&OpenMode=" + OpenMode;
                movedParam = { "focusMode" : "TextBox"};
			}
			else if(viewInfo.commandMode == COMMAND_MODE_CHANGEPATIENTID){
				// 変更患者ID画面表示
				divId = "DivChangeId",frmId = VIEW_MODE_CHANGEPATIENTID;
				viewSrc = "./EditPatientId_View.aspx?VIEW=CHANGE&OpenMode=" + OpenMode;
                movedParam = { "focusMode" : "TextBox"};
			}
			break;
			// 患者ID編集画面
			case VIEW_MODE_EDITPATIENTID:
			if(viewInfo.commandMode == COMMAND_MODE_CANCEL){
				// 予約検査から直接遷移された場合
				if(InitViewId == VIEW_MODE_EDITPATIENTID){
					executeFunction = Cancel_End;
				}
				// 修正メイン画面から遷移された場合
				else if(InitViewId == VIEW_MODE_MODIFYMAIN){
					frmId = VIEW_MODE_EDITPATIENTMAIN;
				}
			}
			else if(viewInfo.commandMode == COMMAND_MODE_UPDATE){
				executeFunction = Update_End;
			}
			break;
			// 患者詳細編集画面
			case VIEW_MODE_EDITPATIENTDETAIL:
			if(viewInfo.commandMode == COMMAND_MODE_CANCEL){
				// 予約検査から直接遷移された場合
				if(InitViewId == VIEW_MODE_EDITPATIENTDETAIL){
					executeFunction = Cancel_End;
				}
				// 修正メイン画面から遷移された場合
				else if(InitViewId == VIEW_MODE_MODIFYMAIN){
					frmId = VIEW_MODE_EDITPATIENTMAIN;
				}
			}
			else if(viewInfo.commandMode == COMMAND_MODE_UPDATE){
				executeFunction = Update_End;
			}
			break;
			// 患者ID変更画面
			case VIEW_MODE_CHANGEPATIENTID:
			if(viewInfo.commandMode == COMMAND_MODE_CANCEL){
				// 予約検査から直接遷移された場合
				if(InitViewId == VIEW_MODE_CHANGEPATIENTID){
					executeFunction = Cancel_End;
				}
				// 修正メイン画面から遷移された場合
				else if(InitViewId == VIEW_MODE_MODIFYMAIN){
					frmId = VIEW_MODE_EDITPATIENTMAIN;
				}
			}
			else if(viewInfo.commandMode == COMMAND_MODE_UPDATE){
				// 変更患者詳細画面表示
				divId = "DivChangeDetail",frmId = VIEW_MODE_CHANGEPATIENTDETAIL;
				viewSrc = "./EditPatientDetail_View.aspx?VIEW=CHANGEDETAIL&OpenMode=" + OpenMode;
                movedParam = { "focusMode" : "TextBox"};
			}
			break;
			// 患者詳細変更画面
			case VIEW_MODE_CHANGEPATIENTDETAIL:
			if(viewInfo.commandMode == COMMAND_MODE_CANCEL){
				frmId = VIEW_MODE_CHANGEPATIENTID;
                movedParam = { "focusMode" : "TextBox"};
			}
			else if(viewInfo.commandMode == COMMAND_MODE_UPDATE){
				executeFunction = Update_End;
			}
			break;
			
			default:
			Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
			break;
		}	

		//処理実行

		if(executeFunction){//実行関数が設定されていたら

			executeFunction();
		}else{
			//フレーム遷移時のパラメータ
            var moveViewInfo = new MoveViewInfo(frmId);
            moveViewInfo.SetMovingMode(movingMode);//遷移時のモード

            moveViewInfo.SetMovingParam(movingParam);//遷移前通知のパラメータ
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
		
  }catch(e){
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
//		  なし
//  3．備考
//     
//***************************************************************************
function FrameCreatedNotification(frameId)
{
	try{
    	//画面表示
	    ClearAndShowViewById(frameId);
    }catch(e){
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
        // 終了通知
        var notifyInfo = { "commandMode" : COMMAND_MODE_UPDATE, "modifyFlag" : ModifyStatusFlag };
        NotifyFrameFinished(notifyInfo);
        // データ初期化
        Fn_Init();
    }catch(e){
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
        // 終了通知
        var notifyInfo = { "commandMode" : COMMAND_MODE_UPDATE, "modifyFlag" : ModifyStatusFlag };
        NotifyFrameFinished(notifyInfo);
        // データ初期化
        Fn_Init();
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+11);
    }
}
//*****************************************************************************
// Fn_Init
// １．機能
//      初期化処理を行う
// ２．戻り値
//      なし



// ３．備考



//      なし



//*****************************************************************************
function Fn_Init(){
	try{
		EndGetDataFlag       = FLAG_STUDY_NOGETDATA;	//データ取得完了フラグ
		ExclusiveMode        = 0;
		//患者情報の初期化


		StudySequence        = -1; //検査シーケンス
		PatientId            = ""; //患者ID
		PatientName          = ""; //患者名
		PatientSex           = ""; //性別
		PatientBirthDate     = ""; //生年月日
		PatientAge           = ""; //年齢
		PatientsSexNeutred   = ""; //避妊処置 2009/12/01 FFS黒田 ADD
// 2009/12/25 ADD TYS松岡 CQ#61対応 Start ------------------------------------
		PatientsSize         = ""; //身長
		PatientsWeight       = ""; //体重
		PatientSpeciesDescription = "";//種族
		PatientBreedDescription = "";//品種
		ResponsiblePerson    = ""; //責任者(個人)
		ResponsibleOrganization = "";//責任者(組織)
		PatientComment       = ""; //患者コメント
// 2009/12/25 ADD TYS松岡 CQ#61対応 End   ------------------------------------
// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ------------------------------------
		ResponsiblePersonIdoGraphic = ""; //責任者(個人)：全角
// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ------------------------------------
		DataCount            = 0;  //撮影メニューデータ数
		SearchChangeFlag	   = 0;
		EditPatientId        = ""; //患者変更時患者テーブルの患者ID
		EditPatientName      = ""; //患者変更時患者テーブルの患者名
		EditPatientKanjiName = ""; //患者変更時患者テーブルの漢字患者名
		EditPatientSex       = ""; //患者変更時患者テーブルの性別
		EditPatientBirthDate = ""; //患者変更時患者テーブルの生年月日
// 2009/12/25 ADD TYS松岡 CQ#61対応 Start ------------------------------------
		EditPatientsSize     = ""; //身長
		EditPatientsWeight   = ""; //体重
		EditPatientSpeciesDescription = "";//種族
		EditPatientBreedDescription = "";//品種
		EditResponsiblePerson = ""; //責任者(個人)
		EditResponsibleOrganization = "";//責任者(組織)
		EditPatientsSexNeutred = "";//避妊処置
		EditPatientComment   = ""; //患者コメント
// 2009/12/25 ADD TYS松岡 CQ#61対応 End   ------------------------------------
// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ------------------------------------
		EditResponsiblePersonIdoGraphic = ""; //責任者(個人)：全角
// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ------------------------------------
		GetDate              = ""; //取得時間


    PatientEditFlag      = 0;  //患者編集フラグ
    //検査情報の初期化



    StudyStatus          = ""; //検査ステータス
		//画像の初期化


        // 2005/07/06 002 H.SAITO PVCS#870 メディアから取り込んだ検査
        MediaGetStatus       = ""; //メディアから取り込んだ検査かフラグ
		AssosiateId          = new Array(); //画像シーケンス－添え字（連想配列）


		ImageSeq             = new Array(); //画像シーケンス
		MenuName             = new Array(); //検査メニュー
		MenuKind             = new Array(); //入力データ種別
		ImageStatus          = new Array(); //画像データ状態


		DataStatus           = new Array(); //データステータス
		ThumbnailFileName    = new Array(); //サムネイルファイル名


		ThumbnailHeight      = new Array(); //サムネイル高さ
		ThumbnailWidth       = new Array(); //サムネイル幅


		ImageFileName        = new Array(); //画像ファイル名


		ImageHeight          = new Array(); //画像高さ
		ImageWidth           = new Array(); //画像幅
//070614 HSK山本 PVCS#2209 ADD-ST
         MediaOutStatus      = new Array(); //メディア出力有無
//070614 HSK山本 PVCS#2209 ADD-ED
//080411 HSK山本 PVCS#2790 ADD-ST
    SeriesUID      = new Array(); //シリーズUID
//080411 HSK山本 PVCS#2790 ADD-ED

    ThumbnailFilePath = new Array();//サムネイル画像のフルパス  //** 2009/07/16 k.harada add



    PrintPriority   = ""                  //優先出力


    OutputCopies    = "";                 //プリント枚数
    OutputFlag      = new Array();        //出力有無
    OutputStatus    = new Array();        //出力状況


    DeviceCode      = new Array();        //出力先装置コード


    DeviceType      = new Array();        //出力先タイプ


    OutputTiming    = new Array();        //出力タイミング
    OutputReqClass  = new Array();        //出力依頼区分


    OutputDensity   = new Array();        //画像密度
    OutputPicCompType     = new Array(); //画像圧縮タイプ


    OutputPicProcessType  = new Array();  //画像処理タイプ


    OutputPicProcessParam = new Array(); //画像処理パラメータ
    OutputDataCount = 0;
    // 編集用の出力先情報
    EditPrintPriority  = ""                //優先出力


    EditOutputCopies   = "";     //プリント枚数
    EditOutputFlag   = new Array();  //出力有無
    EditOutputStatus = new Array();//出力状況


    EditDeviceCode     = new Array();      //出力先装置コード


    EditDeviceType     = new Array();      //出力先タイプ


    EditOutputTiming   = new Array();      //出力タイミング
    EditOutputReqClass = new Array();      //出力依頼区分


    EditOutputDensity  = new Array();      //画像密度
    EditOutputPicCompType     = new Array(); //画像圧縮タイプ


    EditOutputPicProcessType  = new Array();  //画像処理タイプ


    EditOutputPicProcessParam = new Array(); //画像処理パラメータ
    EditDeviceName     = new Array();     //装置名称  
    EditOutputDataCount= 0;       //装置数
		EndGetDataFlag = FLAG_STUDY_NOGETDATA;		// 検査データ取得フラグ(0:未取得/1:取得済)
    //出力装置の情報
    OutputAliasMedia          = "";          //メディア名称
    OutputAliasMediaNo        = "";          //メディア装置コード



    OutputAliasMediaStatus    = "";          //メディア出力状況



    OutputAliasPrinter        = new Array(); //プリンタ名称(配列)
    OutputAliasPrinterNo      = new Array(); //プリンタ装置コード(配列)
    OutputAliasPrinterStatus  = new Array(); //プリンタ出力状況(配列)
    OutputAliasCarna          = "";          //C@Rna名称
    OutputAliasCarnaStatus    = "";          //C@Rna出力状況
//070302 HSK山本 ADD-ST
    OutputAliasStorage        = new Array(); //DicomStorage名称(配列) 
    OutputAliasStorageNo      = new Array(); //DicomStorage装置コード(配列) 
    OutputAliasStorageStatus  = new Array(); //DicomStorage出力状況(配列) 
//070302 HSK山本 ADD-ED


    OutputAliasFile           = "";          //汎用ファイル名称 
    OutputAliasFileStatus     = "";          //汎用ファイル出力状況 
    OutputModifyFlag   = 0;          //出力先設定変更フラグ(0:変更無し1:変更有り)

 // ADD 2005/02/03 hata============
		ModifyStatusFlag = 0;	// 修正完了状況フラグ(0:修正未 1:修正完了)
//ADD EN===========================
    // 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
    StudyExclusionErrorFlag    = 0;
    CompletedErrorFlag         = "";
    // 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-
    // 2005/11/28 PVCS#1560 H.SAITO -ST-
    RuExclusionErrorFlag       = 0;
    // 2005/11/28 PVCS#1560 H.SAITO -ED-
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+12);
	}
}

//*****************************************************************************
// Fn_InitEdit
// １．機能
//      変更患者情報の初期化処理を行う
// ２．戻り値
//      なし



// ３．備考



//      なし



//*****************************************************************************
function Fn_InitEdit(){
  try{
    SearchChangeFlag     = 0;    //検索処理実行フラグ
		EditPatientId        = "";			//患者変更時患者テーブルの患者ID
		EditPatientName      = "";			//患者変更時患者テーブルの患者名
		EditPatientKanjiName = "";			//患者変更時患者テーブルの漢字患者名
		EditPatientSex       = "";			//患者変更時患者テーブルの性別
		EditPatientBirthDate = "";			//患者変更時患者テーブルの生年月日
// 2009/12/25 ADD TYS松岡 CQ#61対応 Start ------------------------------------
		EditPatientsSize     = "";			//身長
		EditPatientsWeight   = "";			//体重
		EditPatientSpeciesDescription = "";	//種族
		EditPatientBreedDescription = "";	//品種
		EditResponsiblePerson = "";			//責任者(個人)
		EditResponsibleOrganization = "";	//責任者(組織)
		EditPatientsSexNeutred = "";		//避妊処置
		EditPatientComment   = "";			//患者コメント
// 2009/12/25 ADD TYS松岡 CQ#61対応 End   ------------------------------------
// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ------------------------------------
		EditResponsiblePersonIdoGraphic = ""; //責任者(個人)：全角
// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ------------------------------------
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+13);
	}
}
