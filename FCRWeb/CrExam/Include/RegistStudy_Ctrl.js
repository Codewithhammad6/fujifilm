/****************************************************************************

  @file RegistStudy_Ctrl.js

  @brief RegistStudy_Ctrlのクライアントスクリプト

  @author YSK畑
        SpotCode MAX 15

  Copyright(c) 2004-2009 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/11  YSK畑       V1.0       新規作成
  @date  06/08/09  HSK酒井     V1.4       CR検査部構造見直し[8]対応  @date  06/10/13  S1神立      V1.4       操作性向上(フォーカス制御)
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応  @date  09/12/01  FFS黒田     V1.1(B)    患者情報項目追加
  @date  10/06/01  FF 星野     V2.0(B)    CQ#219対応

/****************************************************************************/

var PROC_MODE = "REGISTSTUDY_CTRL";

var COMMAND_MODE_CANCEL = "CANCEL";
var COMMAND_MODE_UPDATE = "UPDATE";
var COMMAND_MODE_ENTRY  = "ENTRY";
var COMMAND_MODE_STUDY  = "STUDY";

var VIEW_MODE_INFOMATION        = "INFORMATION_VIEW";
var VIEW_MODE_EDITPATIENTID     = "EDITPATIENTID_VIEW";
var VIEW_MODE_EDITPATIENTDETAIL = "EDITPATIENTDETAIL_VIEW";
var VIEW_MODE_REGADDMENU        = "REGADDMENU_VIEW";
var VIEW_MODE_SEARCHPATIENT     = "SEARCHPATIENTDATA";
var VIEW_MODE_REGSTUDY_UPDATE   = "REGSTUDY_UPDATE_PROC";
var VIEW_MODE_EKARTEDATA        = "EKARTEDATA_GET_PROC";
var VIEW_MODE_EXCLUSIVE         = "EXCLUSIVE_PROC";

// オープンモードvar OPEN_MODE_CE     = 0;
var OPEN_MODE_WINDOW = 1;
var OPEN_MODE_DIALOG = 2;

// 排他モードvar EXCLUSIVE_MODE1 = 1;
var EXCLUSIVE_MODE2 = 2;

// 既存患者フラグ
var FLAG_PATIENT_NEW   = 0;
var FLAG_PATIENT_EXIST = 1;

// 患者編集フラグ
var FLAG_PATIENT_NOEDIT = 0;
var FLAG_PATIENT_EDIT   =1;

// エラーモードvar FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコードvar FILE_NAME = "RegistStudy_Ctrl.js"  //ファイル名var MESSAGE_ID          = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS   = 30501;              //メッセージID 
//患者情報
var PatientFlag = FLAG_PATIENT_NEW;			// 既存患者フラグ 
var PatientEditFlag = FLAG_PATIENT_NOEDIT;				// 既存患者編集フラグ

var StudySequence;     //検査シーケンス
var PatientId;         // 患者ID
var PatientName;       // 患者名
var PatientKanjiName;  // 漢字患者名
var PatientSex;        // 性別
var PatientBirthDate;  // 生年月日
var PatientBirthDate;  // 生年月日
var PatientAge;        // 年齢
var PatientsSexNeutred;//避妊処置 2009/12/01 FFS黒田 ADD
var GetDate;			// 取得時間
//2010.06.01 CQ#219対応 FF星野 ADD-ST
var PatientComment;
var PatientsSize;
var PatientsWeight;
var PatientSpeciesDescription;
var PatientBreedDescription;
var ResponsiblePerson;
var ResponsiblePersonIdoGraphic;
var ResponsibleOrganization;
//2010.06.01 CQ#219対応 FF星野 ADD-ED
// 画面フレームID
var ViewId = "";

var DataCount;         //検査メニューデータ数

var ExclusiveMode = "";		// 排他モード
//*****************************************************************************
// Fn_InitPage
//
// １．機能
//      ページロード時の処理
// ２．戻り値
//　　  なし// ３．備考//　　　なし//*****************************************************************************
function Fn_InitPage(){
	try{
		// 排他モード設定		ExclusiveMode = EXCLUSIVE_MODE1;
		
		//ページローダ生成
		var loader = new PageLoader();
		//ページ情報追加
		loader.AddLoadPage(VIEW_MODE_INFOMATION,"./Information_View.aspx");
		loader.AddLoadPage(VIEW_MODE_EDITPATIENTID,"./EditPatientId_View.aspx?VIEW=INPUT&OpenMode=" + OpenMode);
		if(isWindowsCE()){
			loader.AddLoadPage(VIEW_MODE_EDITPATIENTDETAIL,"./EditPatientDetail_View.aspx?VIEW=INPUTDETAIL&OpenMode=" + OpenMode);
			loader.AddLoadPage(VIEW_MODE_REGADDMENU,"./RegAddMenu_View.aspx?RegMenuMode=0&OpenMode=" + OpenMode);
		}
		loader.AddLoadPage(VIEW_MODE_SEARCHPATIENT,"./SearchPatientData.aspx");
		loader.AddLoadPage(VIEW_MODE_REGSTUDY_UPDATE,"./RegStudy_Update_Proc.aspx");
		loader.AddLoadPage(VIEW_MODE_EKARTEDATA,"./EKarteData_Get_Proc.aspx");
		loader.AddLoadPage(VIEW_MODE_EXCLUSIVE,"./Exclusive_Proc.aspx");
		//ページロード開始
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
//      画面を表示する。
// ２．戻り値
//　　  なし
// ３．備考//   06/11/06 S1神立 V1.4 フォーカスの当て方を変更
//
//*****************************************************************************
function Public_Init(){
	try{

		// 初期化		Fn_Init();

		// ブラウザ起動時のみ患者IDを取得		if(OpenMode == OPEN_MODE_WINDOW){
			// 患者ID取得			PatientId = top.PatientId;
			// メインフレームの患者IDをクリア
			top.PatientId = "";
		}
    					
		// 患者ID画面に遷移
		var moveViewInfo = new MoveViewInfo(VIEW_MODE_EDITPATIENTID);
        movedParam = { "focusMode" : "Init"};//フォーカスモード（InitFocusで行う）
        moveViewInfo.SetMovedParam(movedParam);//遷移後通知のパラメータ
        moveViewInfo.SetFinishedNotification(ViewFinished);//遷移画面終了時の通知
        //画面遷移処理実行
        MoveView(moveViewInfo);
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
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
	
		//switch内で処理関数およびパラメータを決定        var executeFunction = null;
        var moveFunction = MoveView;//画面遷移関数
		var movingMode = FC_MOVING_MODE_UPDATE;//データのみ更新
		var divId = null;
		var frmId = null;
		var srcPage = null;
		var movedParam = null;
		switch(viewId){
			case VIEW_MODE_EDITPATIENTID:// 患者ID入力画面
			if(viewInfo.commandMode == COMMAND_MODE_CANCEL){//戻るボタン押下                //閉じる（キャンセル）
                executeFunction = RegistStudy_PatientIdBack;
			}else if(viewInfo.commandMode == COMMAND_MODE_UPDATE){//次へボタン押下
                //患者詳細情報画面表示へ
                frmId = VIEW_MODE_EDITPATIENTDETAIL;
				if (!isWindowsCE()){
					divId = "DivDetail";
					srcPage = "./EditPatientDetail_View.aspx?VIEW=INPUTDETAIL&OpenMode=" + OpenMode;
				}
                movedParam = { "focusMode" : "Init"};//フォーカスモード（InitFocusで行う）
			}
			break;
			
			case VIEW_MODE_EDITPATIENTDETAIL:// 患者詳細入力画面
			if(viewInfo.commandMode == COMMAND_MODE_CANCEL){//戻るボタン押下
			    //患者ID画面に戻る
			    frmId = VIEW_MODE_EDITPATIENTID;
                //FocusTextboxでフォーカスを行う
                movedParam = { "focusMode" : "TextBox"};
                moveFunction = MoveViewAndInit;
			}else if(viewInfo.commandMode == COMMAND_MODE_UPDATE){//次へボタン押下
                //撮影メニュー追加画面表示へ
                frmId = VIEW_MODE_REGADDMENU;
				if (!isWindowsCE()){
					divId = "DivRegAdd";
					srcPage = "./RegAddMenu_View.aspx?RegMenuMode=0&OpenMode=" + OpenMode;
				}
				movingMode = FC_MOVING_MODE_CLEAR;
			}
			break;
			
			case VIEW_MODE_REGADDMENU:// 撮影メニュー登録画面
			if(viewInfo.commandMode == COMMAND_MODE_CANCEL){// 戻るボタン押下
			    //撮影メニュー登録画面戻る(患者詳細画面表示)
                frmId = VIEW_MODE_EDITPATIENTDETAIL;
                movedParam = { "focusMode" : "TextBox"};
			}else if(viewInfo.commandMode == COMMAND_MODE_ENTRY){// 登録ボタン押下                //閉じる（更新）
				executeFunction = RegistStudy_RegAddMenuRegister;
			}else if(viewInfo.commandMode == COMMAND_MODE_STUDY){// 検査開始ボタン押下				// 検査シーケンス設定				top.StudySequence = viewInfo.commandParam;
                //撮影メニュー登録画面検査開始
				executeFunction = RegistStudy_RegAddMenuStudy;
			}
			break;
			
			default:
        		Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
			  return;
		}	
					
		
		//処理実行
        if(executeFunction){
            executeFunction();
        }else{
            var moveViewInfo = new MoveViewInfo(frmId);
            moveViewInfo.SetMovingMode(movingMode);//遷移時のモード
            moveViewInfo.SetMovedParam(movedParam);//遷移後通知のパラメータ
            moveViewInfo.SetFinishedNotification(ViewFinished);//遷移画面終了時の通知
            if(divId){
	            LoadPageInDiv(divId,frmId,srcPage,moveFunction,moveViewInfo,FrameCreatedNotification);
            }else if(moveFunction){
	            moveFunction(moveViewInfo);
            }
        }
		// 画面フレームIDを設定
		ViewId = viewId;

	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
	}
	

}


//***************************************************************************
//  FrameCreatedNotification()		
//
//  1．機能
//      フレームが生成通知
//		
//  2．戻り値  
//		  なし//  3．備考//     
//***************************************************************************
function FrameCreatedNotification(frameId)
{
	try{
		//画面表示
		ClearAndShowViewById(frameId);
	}catch(e){
	    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
	}
}

//***************************************************************************
//  MoveViewAndInit()		
//  1．機能
//      画面遷移後に初期化（Fn_Init）を行う
//  2．戻り値  
//      なし//  3．備考//***************************************************************************
function MoveViewAndInit(moveViewInfo){
    //画面遷移実行
    MoveView(moveViewInfo);
    // 患者情報初期化    Fn_Init();
}

//***************************************************************************
//  RegistStudy_PatientIdBack()		
//
//  1．機能
//      患者ID画面戻る
//  2．戻り値  
//		  なし
//  3．備考
//     
//***************************************************************************
function RegistStudy_PatientIdBack()
{
	try{
		// サブメインフレームよびだし        var notifyInfo = { "commandMode" : COMMAND_MODE_CANCEL };
        NotifyFrameFinished(notifyInfo);
		// 患者情報初期化		Fn_Init();
	}
	catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
	}

}

//***************************************************************************
//  RegistStudy_RegAddMenuRegister()
//
//  1．機能
//        撮影メニュー登録画面登録(予約検査画面表示)
//
//  2．戻り値
//        なし
//
//  3．備考
//
//***************************************************************************
function RegistStudy_RegAddMenuRegister()
{
    try{
        // 初期化
        Fn_Init();
        // 親への完了通知
        var notifyInfo = { "commandMode" : COMMAND_MODE_ENTRY };
        NotifyFrameFinished(notifyInfo);
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
    }
}

//***************************************************************************
//  RegistStudy_RegAddMenuStudy()
//
//  1．機能
//        撮影メニュー登録画面検査開始(検査画面表示)
//
//  2．戻り値
//        なし
//
//  3．備考
//
//***************************************************************************
function RegistStudy_RegAddMenuStudy()
{
    try{
        // 初期化
        Fn_Init();
        // 親への完了通知
        var notifyInfo = { "commandMode" : COMMAND_MODE_STUDY };
        NotifyFrameFinished(notifyInfo);
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
    }
}


//*****************************************************************************
// Fn_Init
// １．機能
//      初期化処理を行う
// ２．戻り値
//　　  なし// ３．備考//　　　なし//*****************************************************************************
function Fn_Init(){
  try{
		//患者情報の初期化
		// 情報初期化
		PatientFlag      = FLAG_PATIENT_NEW;			// 既存患者フラグ 
		PatientEditFlag	 = FLAG_PATIENT_NOEDIT;
		GetDate          = "";
		
		StudySequence       = -1; //検査シーケンス
		PatientId           = ""; //患者ID
		PatientName         = ""; //患者名
		PatientKanjiName    = ""; //患者名
		PatientSex          = ""; //性別
		PatientBirthDate    = ""; //生年月日
		PatientAge			    = ""; //年齢
		PatientsSexNeutred  = ""; //避妊処置 2009/12/01 FFS黒田 ADD

		DataCount           = 0;  //撮影メニューデータ数


	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
	}
}


