/****************************************************************************

  @file Output_Ctrl.js

  @brief Output_Ctrlのクライアントスクリプト

  @author YSK畑

        SpotCode MAX 9

  Copyright(c) 2004-2009 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/10  YSK畑       V1.0       新規作成 
  @date  05/12/12  YSK齋藤     V1.1       C@Rnaサービスの機能別有効化対応(PVCS#1698) 
  @date  05/12/14  YSK齋藤     V1.1       ボタン押下連打の不具合対応(PVCS#1668) 
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応 
  @date  07/03/01  YSK齋藤     V2.0       ×ボタン押下対応(PVCS#1956) 
  @date  07/03/02  HSK山本     V2.0       DicomStorage出力機能 
  @date  06/03/20  HSK古場     V2.0       内視鏡画像取り込み機能 
  @date  09/05/20  HSK山本     V5.1       心電図本対応 
  @date  09/12/01  FFS黒田     V1.1(B)    患者情報項目追加
  @date  11/10/25  FF奥野      V2.2(B)    新画像処理対応

/****************************************************************************/
//[定数]
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード
var FILE_NAME = "Output_Ctrl.js"  //ファイル名
var MESSAGE_ID = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS   = 30501;              //メッセージID 
var PROC_MODE     = "OUTPUT_CTRL";
var COMMAND_MODE_CANCEL  = "CANCEL";
var COMMAND_MODE_UPDATE  = "UPDATE";
var COMMAND_MODE_DETAIL  = "DETAIL";
var VIEW_MODE_INFORMATION          = "INFORMATION_VIEW";
var VIEW_MODE_STUDYDATE            = "STUDYDATA_GET_PROC";
var VIEW_MODE_OUTPUT_UPDATE_PROC   = "OUTPUT_UPDATE_PROC";
var VIEW_MODE_OUTPUT_VIEW          = "OUTPUT_VIEW";
var VIEW_MODE_OUTPUTDETAIL_VIEW    = "OUTPUTDETAIL_VIEW";
var VIEW_MODE_OUTPUTALIAS_GET_PROC = "OUTPUTALIAS_GET_PROC";
var VIEW_MODE_EXCLUSIVE_PROC       = "EXCLUSIVE_PROC";
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
//070320 HSK古場 ADD-ST
// 画像種別
var IMAGEKIND_FDXIMAGE     = "2";	// FDX画像 V2.2(B) FF奥野 新画像処理対応ADD
var IMAGEKIND_FCRIMAGE     = "1";	// FCR画像 
var IMAGEKIND_NON_FCRIMAGE = "0";	// FCR画像以外 
var IMAGEKIND_NON_IMAGE    = "-1";	// 非画像 
//070320 HSK古場 ADD-ED

//[変数]
var EndGetDataFlag = FLAG_STUDY_NOGETDATA;								//データ取得完了フラグ
var ExclusiveMode = "";		// 排他モード

//検査情報
var StudyStatus;              //検査ステータス
//070320 HSK古場 ADD-ST
//画像種別
var ImageKind;
//070320 HSK古場 ADD-ED
//患者情報
var StudySequence;            //検査シーケンス
var PatientId;                //患者ID
var PatientName;              //患者名
var PatientKanjiName;	        //患者名(マルチバイト)
var PatientSex;               //性別
var PatientBirthDate;         //生年月日
var PatientAge;				  //年齢
var PatientsSexNeutred;	 	  //避妊処置 2009/12/01 FFS黒田 ADD
var DataCount;                //検査メニューデータ数
//出力先設定データ
var PrintPriority             //優先出力
var OutputCopies;             //プリント枚数
var OutputFlag;               //出力有無
var OutputStatus;             //出力状況
var DeviceCode;               //出力先装置コード
var DeviceType;               //出力先タイプ
var OutputTiming;             //出力タイミング
var OutputReqClass;           //出力依頼区分
var OutputDensity;            //画像密度
var OutputPicCompType;        //画像圧縮タイプ
var OutputPicProcessType;     //画像処理タイプ
var OutputPicProcessParam;    //画像処理パラメータ
var OutputDataCount= 0;       //装置数
//編集用出力先設定データ
var EditPrintPriority         //優先出力
var EditOutputCopies;         //プリント枚数
var EditOutputFlag;           //出力有無
var EditOutputStatus;         //出力状況
var EditDeviceCode;           //出力先装置コード
var EditDeviceType;           //出力先タイプ
var EditOutputTiming;         //出力タイミング
var EditOutputReqClass;       //出力依頼区分
var EditOutputDensity;        //画像密度
var EditOutputPicCompType;    //画像圧縮タイプ
var EditOutputPicProcessType; //画像処理タイプ
var EditOutputPicProcessParam;//画像処理パラメータ
var EditDeviceName;           //装置名称
var EditOutputDataCount= 0;       //装置数
//出力先情報データ
var OutputAliasMedia;         //メディア名称
var OutputAliasMediaNo;       //メディア装置コード

var OutputAliasMediaStatus;   //メディア出力状況

var OutputAliasPrinter;       //プリンタ名称(配列)
var OutputAliasPrinterNo;     //プリンタ装置コード(配列)
var OutputAliasPrinterStatus; //プリンタ出力状況(配列)
var OutputAliasCarna;         //C@Rna名称
var OutputAliasCarnaStatus;   //C@Rna出力状況//070302 HSK山本 ADD-ST
var OutputAliasStorage;       //DicomStorage名称(配列) 
var OutputAliasStorageNo;     //DicomStorage装置コード(配列) 
var OutputAliasStorageStatus; //DicomStorage出力状況(配列) 
//070302 HSK山本 ADD-ED


var OutputAliasFile;          //汎用ファイル名称 
var OutputAliasFileStatus;    //汎用ファイル出力状況

var OutputModifyFlag   = 0;          //出力先設定変更フラグ(0:変更無し1:変更有り)

// ADD 2005/02/03 hata============
var ModifyStatusFlag = 0;	// 修正完了状況フラグ(0:修正未 1:修正完了)
//ADD EN===========================
// 2005/11/30 PVCS#1560 H.SAITO -ST-
var StudyExclusionErrorFlag;
var RuExclusionErrorFlag;
var CompletedErrorFlag;
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
// １．機能
//      ページロード時の処理
// ２．戻り値
//      なし

// ３．備考

//      なし

//*****************************************************************************
function Fn_InitPage(){
  try{
    //読み込むページを設定
		//ページローダ生成
		var loader = new PageLoader();
		//ページ情報追加
		loader.AddLoadPage(VIEW_MODE_INFORMATION,"Information_View.aspx");
		// 2007/03/01 PVCS#1956 H.SAITO -ST-
		//loader.AddLoadPage(VIEW_MODE_STUDYDATE,"StudyData_Get_Proc.aspx");
		loader.AddLoadPage(VIEW_MODE_STUDYDATE,"Main_StudyData_Get_Proc.aspx");
		// 2007/03/01 PVCS#1956 H.SAITO -ED-
		loader.AddLoadPage(VIEW_MODE_OUTPUT_UPDATE_PROC,"Output_Update_Proc.aspx");
		loader.AddLoadPage(VIEW_MODE_OUTPUT_VIEW,"Output_View.aspx?OpenMode=" + OpenMode);
		loader.AddLoadPage(VIEW_MODE_EXCLUSIVE_PROC,"Exclusive_Proc.aspx");
		//ロード開始
		loader.Start();
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
  }
}


//*****************************************************************************
// Public_Init
// １．機能
//      機能開始処理を行う（データを取得する）

// ２．戻り値
//      なし

// ３．備考

//      なし

//*****************************************************************************
function Public_Init(){
  try{
    // 初期化

    Fn_Init();

  	// 排他モード設定

	if(OpenMode == OPEN_MODE_DIALOG){
		ExclusiveMode = EXCLUSIVE_MODE2;
	}
	else{
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
	}
    // 検査シーケンスを取得


    StudySequence = top.StudySequence;

	// 出力設定画面を表示
	var moveViewInfo = new MoveViewInfo("OUTPUT_VIEW");
    moveViewInfo.SetFinishedNotification(ViewFinished);//遷移画面終了時の通知
    MoveView(moveViewInfo);



    OUTPUT_VIEW.Public_Init();
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
//     なし
// ３．備考
//      なし
//*****************************************************************************
function Fn_Init(){
  try{
    EndGetDataFlag      = FLAG_STUDY_NOGETDATA;	//データ取得完了フラグ
    ExclusiveMode       = 0;
    //患者情報の初期化
    StudySequence       = -1; //検査シーケンス
    PatientId           = ""; //患者ID
    PatientName         = ""; //患者名
	  PatientKanjiName		= "";	//患者名(マルチバイト)
    PatientSex          = ""; //性別
	PatientsSexNeutred  = ""; //避妊処置 2009/12/01 FFS黒田 ADD
    PatientBirthDate    = ""; //生年月日
    PatientAge					= ""; //年齢
    DataCount           = 0;  //撮影メニューデータ数
    //出力先の初期化
    PrintPriority             = ""           //優先出力
    OutputCopies              = "";          //プリント枚数
    OutputFlag                = new Array(); //出力有無
    OutputStatus              = new Array(); //出力状況
    DeviceCode                = new Array(); //出力先装置コード
    DeviceType                = new Array(); //出力先タイプ
    OutputTiming              = new Array(); //出力タイミング
    OutputReqClass            = new Array(); //出力依頼区分
    OutputDensity             = new Array(); //画像密度
    OutputPicCompType         = new Array(); //画像圧縮タイプ
    OutputPicProcessType      = new Array(); //画像処理タイプ
    OutputPicProcessParam     = new Array(); //画像処理パラメータ
    OutputDataCount           = 0;
    //編集用の出力先情報
    EditPrintPriority         = ""           //優先出力
    EditOutputCopies          = "";          //プリント枚数
    EditOutputFlag            = new Array(); //出力有無
    EditOutputStatus          = new Array(); //出力状況
    EditDeviceCode            = new Array(); //出力先装置コード
    EditDeviceType            = new Array(); //出力先タイプ
    EditOutputTiming          = new Array(); //出力タイミング
    EditOutputReqClass        = new Array(); //出力依頼区分
    EditOutputDensity         = new Array(); //画像密度
    EditOutputPicCompType     = new Array(); //画像圧縮タイプ
    EditOutputPicProcessType  = new Array(); //画像処理タイプ
    EditOutputPicProcessParam = new Array(); //画像処理パラメータ
    EditDeviceName            = new Array(); //装置名称  
    EditOutputDataCount= 0;       //装置数
    //出力装置の情報
    OutputAliasMedia          = "";          //メディア名称
    OutputAliasMediaNo        = "";          //メディア装置コード

    OutputAliasMediaStatus    = "";          //メディア出力状況

    OutputAliasPrinter        = new Array(); //プリンタ名称(配列)
    OutputAliasPrinterNo      = new Array(); //プリンタ装置コード(配列)
    OutputAliasPrinterStatus  = new Array(); //プリンタ出力状況(配列)
//070302 HSK山本 ADD-ST
    OutputAliasStorage        = new Array(); //DicomStorage名称(配列) 
    OutputAliasStorageNo      = new Array(); //DicomStorage装置コード(配列) 
    OutputAliasStorageStatus  = new Array(); //DicomStorage出力状況(配列) 
//070302 HSK山本 ADD-ED
    OutputAliasCarna          = "";          //C@Rna名称
    OutputAliasCarnaStatus    = "";          //C@Rna出力状況

    OutputAliasFile           = "";          //汎用ファイル名称 
    OutputAliasFileStatus     = "";          //汎用ファイル出力状況

    OutputModifyFlag   = 0;          //出力先設定変更フラグ(0:変更無し1:変更有り)
    OutputArrayFlag = 0;      //出力先設定情報の配列作成済み(0:未作成 1:作成済)
// ADD 2005/02/03 hata============
	ModifyStatusFlag = 0;	// 修正完了状況フラグ(0:修正未 1:修正完了)
//ADD EN===========================
    // 2005/11/30 PVCS#1560 H.SAITO -ST-
    StudyExclusionErrorFlag    = 0;
    CompletedErrorFlag         = "";
    RuExclusionErrorFlag       = 0;
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
		//switch内で実行関数およびパラメータを決める
		var executeFunction = null;
		var divId = null;
		var frmId = null;
		var viewSrc = null;
        var movingMode = FC_MOVING_MODE_INIT;
        var movingParam = null;

		switch(viewId){
			//------------------//
			//出力先メイン画面//
			//------------------//
			case VIEW_MODE_OUTPUT_VIEW:
				// 戻る				if(viewInfo.commandMode == COMMAND_MODE_CANCEL){
				    executeFunction = Cancel_End;
				}
				// 修正完了				else if(viewInfo.commandMode == COMMAND_MODE_UPDATE){
				    executeFunction = Update_End;
				}
				// 詳細ボタン
				else if(viewInfo.commandMode == COMMAND_MODE_DETAIL){
					// 出力先設定詳細画面表示
					divId = "DivDetail";
					frmId = VIEW_MODE_OUTPUTDETAIL_VIEW;
					viewSrc = "./OutputDetail_View.aspx?OpenMode=" + OpenMode;
					movingParam = {"paramData" : viewInfo.commandParam};
				}
				break;
			//--------------//
			//出力先詳細画面//
			//--------------//
			case VIEW_MODE_OUTPUTDETAIL_VIEW:
				// キャンセルか更新
				if(viewInfo.commandMode == COMMAND_MODE_CANCEL || viewInfo.commandMode == COMMAND_MODE_UPDATE){
					frmId = VIEW_MODE_OUTPUT_VIEW;
					movingMode = FC_MOVING_MODE_UPDATE;
				}
				break;
			default:
                Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
				break;
		}
		if(executeFunction){//実行関数が設定されていたら
			executeFunction();
		}else{
			//フレーム遷移時のパラメータ
            var moveViewInfo = new MoveViewInfo(frmId);
            moveViewInfo.SetMovingMode(movingMode);//遷移時のモード
            moveViewInfo.SetMovingParam(movingParam);//遷移前通知のパラメータ
            moveViewInfo.SetFinishedNotification(ViewFinished);//遷移画面終了時の通知
			if(divId){
				LoadPageInDiv(divId,frmId,viewSrc,MoveView,moveViewInfo,FrameCreatedNotification);
			}else{
				//dividが設定されていない場合、frameが生成されていること前提で初期化
				MoveView(moveViewInfo);
			}
		}
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
  }
}

//***************************************************************************
//  Cancel_End()
//
//  1．機能
//      修正メイン機能キャンセル
//
//  2．戻り値
//      なし//
//  3．備考//
//***************************************************************************
function Cancel_End()
{
    try{
        // 終了通知
        var notifyInfo = { "commandMode" : COMMAND_MODE_UPDATE, "modifyFlag" : ModifyStatusFlag };
        NotifyFrameFinished(notifyInfo);
        // データ初期化        Fn_Init();
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
    }
} 
//***************************************************************************
//  Update_End()
//
//  1．機能
//      修正メイン機能修正完了//
//  2．戻り値  
//      なし//
//  3．備考//
//***************************************************************************
function Update_End()
{
    try{
        // 終了通知
        var notifyInfo = { "commandMode" : COMMAND_MODE_UPDATE, "modifyFlag" : ModifyStatusFlag };
        NotifyFrameFinished(notifyInfo);
        // データ初期化        Fn_Init();
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
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
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
    }
}
