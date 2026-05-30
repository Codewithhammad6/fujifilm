/****************************************************************************

  @file Output_View.js

  @brief Output_Viewのクライアントスクリプト

  @author YSK畑 
        SpotCode 29

  Copyright(C) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/10  YSK畑       V1.0       新規作成 
  @date  05/12/12  YSK齋藤     V1.1       C@Rnaサービスの機能別有効化対応(PVCS#1698) 
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  06/11/08  YSK齋藤     V1.4　     PVCS#1962,#1666対応 
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応 
  @date  07/01/05  FF 蔵敷　　　V1.4       PVCS#2045対応 
  @date  07/03/02  HSK山本     V2.0       DicomStorage機能 
  @date  07/03/19  HSK山本     V2.0       DicomStorage機能(装置台数６→５仕様変更) 
  @date  07/03/22  HSK古場     V2.0       内視鏡画像取り込み機能 
  @date  07/04/25  HSK山本     V2.0       PVCS2137対応 
  @date  07/05/14  HSK山本     V2.0       HSK内部B#403対応 
  @date  07/06/07  HSK古場     V2.0       PVCS#2281対応 
  @date  07/06/14  HSK山本     V2.0       PVCS#2342対応 
  @date  07/10/02  HSK山本     V2.1.0.0   V3.0 出力必須解除 
  @date  09/12/01  FFS黒田     V1.1(B)    患者情報項目追加
  @date  10/11/22  FFS生田     V2.0(B)    30501エラー改善対応
  @date  11/10/25  FF奥野      V2.2(B)    新画像処理対応

/****************************************************************************/
//[定数]
var PROC_MODE			 = "OUTPUT_VIEW";
//070514 HSK山本 HSK B#403 UPDATE-ST
//var UPDATE_TIMEOUT		 = 5000;					//更新処理タイムアウト時間       
var UPDATE_TIMEOUT		 = 60000;					//更新処理タイムアウト時間       
//070514 HSK山本 HSK B#403 UPDATE-ED
var COMMAND_MODE_UPDATE  = "UPDATE";			//更新
var COMMAND_MODE_CANCEL  = "CANCEL";			//キャンセル
var COMMAND_MODE_DETAIL  = "DETAIL";			//詳細
// オープンモード 
//2005/09/14--ST
var MESSAGE_ID_NOSELECT  = 34540;
//2005/09/14--ED
//070319 HSK山本 DEL-ST
////070302 HSK山本 ADD-ST
//var MESSAGE_ID_DUPLICATE  = 34541;
////070302 HSK山本 ADD-ED
//070319 HSK山本 DEL-ED

// 2005/12/12 PVCS#1698 H.SAITO -ST-
var MESSAGE_ID_DISABLE_CARNA  = 34527;
// 2005/12/12 PVCS#1698 H.SAITO -ED-
var OPEN_MODE_CE     = 0;				// CEで開かれた場合 
var OPEN_MODE_WINDOW = 1;				// ブラウザで開かれた場合 
//#1243 2005/08/19--ST
var DEFCOPYCOUNT = "1";
//#1243 2005/08/19--EN
var OPEN_MODE_DIALOG = 2;				// ダイアログで開かれた場合 
// オプションキーフラグ
var OPTION_USE   = 1;			//オプション有
var OPTION_NOUSE = 0;			//オプション無
// 2005/12/12 PVCS#1698 H.SAITO -ST-
// C@Rna画像保管
var CARNASTORAGE_ENABLE  = "1";	//画像保管有効
var CARNASTORAGE_DISABLE = "0";	//画像保管無効
// 2005/12/12 PVCS#1698 H.SAITO -ED-
// 出力有無
var FLAG_OUTPUT_USE = "1";
var FLAG_OUTPUT_NOUSE = "0";
//070306 HSK山本 ADD-ST
var FLAG_OUTPUT_EMPTY = "-1";
//070306 HSK山本 ADD-ED
//071002 HSK山本 V3.0 出力必須解除 ADD-ST
var FLAG_OUTPUT_DISPENSABLE = 0;   //出力任意 
var FLAG_OUTPUT_INDISPENSABLE = 1; //出力必須 
//071002 HSK山本 V3.0 出力必須解除 ADD-ED
// 出力状況 
var FLAG_STATUS_OUTPUT = "1";
var FLAG_STATUS_NOOUTPUT = "0";
// 出力タイミング
//2005/03/21 006 H.SAITO
//var FLAG_OUTPUT_DECISION = "1";
//var FLAG_OUTPUT_CONFIRM  = "0";
var FLAG_OUTPUT_NOOUT    = "0"; //出力しない 
var FLAG_OUTPUT_CONFIRM  = "1"; //確認時
var FLAG_OUTPUT_DECISION = "2"; //確定時
// 出力タイプ 
var OUTPUT_TYPE_MEDIA   = "MEDIA";
var OUTPUT_TYPE_PRINTER = "PRINTER";
var OUTPUT_TYPE_CARNA   = "CARNA";
var OUTPUT_TYPE_FILE    = "KARTE";
//070302 HSK山本 ADD-ST
var OUTPUT_TYPE_STORAGE    = "STORAGE";
//070302 HSK山本 ADD-ED
// 優先出力 
var OUTPUT_PROORITY_HIGH  = "HIGH";
var OUTPUT_PROORITY_MED   = "MED";
var OUTPUT_PROORITY_LOW   = "LOW";
//070319 HSK山本 UPDATE-ST
// 出力先表示数
//var DISPLAY_COUNT = 4;
var DISPLAY_COUNT = 5;
//070319 HSK山本 UPDATE-ED
// エラー
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var USER_NOTHING_ERROR   = "USER_NOTHING_ERROR";	//ユーザチェックエラー
var SPOT_CODE = 0;                   //スポットコード 
var FILE_NAME = "Output_View.js";  //ファイル名 
var MESSAGE_ID               = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS        = 30501;              //メッセージID 
//2010/11/16 30501エラー改善対応 ADD ST
var MESSAGE_ID_ACCESS_EXCLUSIVE = 40505;           //メッセージID
//2010/11/16 30501エラー改善対応 ADD ED
// 2005/06/17 002 H.SAITO PVCS:695 確定済み検査に対する修正時のメッセージを変更(出力画面では不要のため、削除)
//var MSG_CHANGE_VERIFIED      = 31526;              //確定した検査に対する修正確認 
var MSG_CHANGE_OUTPUTSETTING = 31528;              //出力無に変更時の確認  
//20050609(PVCS#350)ST
var MESSAGE_ID_NOLOGIN   = 31502;              //メッセージID 
var MESSAGE_ID_LOGOFF    = 31503;              //メッセージID 
var MESSAGE_ID_DIFERENT  = 31504;              //メッセージID 
var MESSAGE_ID_FORBIDDEN = 31505;
//070614 HSK山本 PVCS#2342 ADD-ST
var MSG_WARNING_ID_OUTPUT_EXCL = 34512;       //出力中メッセージ
//070614 HSK山本 PVCS#2342 ADD-ED
// 操作権限チェック 戻り値
var RETURN_OK														=  0; //正常終了 
var CHECK_AUTHORITY_ERROR_NOT_LOGGED_IN	= -1; //ログインされていない 
var CHECK_AUTHORITY_ERROR_LOGGED_OFF		= -2; //ログオフされた
var CHECK_AUTHORITY_ERROR_DIFFERENT_ID	= -3; //ユーザIDがアプリケーション変数と異なっている
var CHECK_AUTHORITY_ERROR_AUTHORITY			= -4; //操作権限がない 
//20050609(PVCS#350)EN
// 検査取得フラグ
var FLAG_STUDY_GETDATA   = 1;					// 検査取得 
var FLAG_STUDY_NOGETDATA = 0;					// 検査未取得 
// 出力先イメージ
//070322 HSK古場 UPDATE-ST
//var OUTPUTIMG = new Array();
var OUTPUT_ENABLEIMG = new Array();
//070322 HSK古場 UPDATE-ED
//070322 HSK古場 ADD-ST
var OUTPUT_DISABLEIMG = new Array();
var OV_OutputInfos = null;
//070322 HSK古場 ADD-ST
// 操作ログ出力コマンド 
var CTRL_OUTPUT_ON					  = "OutputOn";          // 出力する 
var CTRL_OUTPUT_OFF					  = "OutputOff";         // 出力しない 
var CTRL_OUTPUTDETAIL					= "OutputDetail";      // 出力先詳細設定 
var CTRL_FIRSTPRIORITY_ON			= "FirstPriorityOn";   // 優先出力を行う
var CTRL_FIRSTPRIORITY_OFF		= "FirstPriorityOff";  // 優先出力を行う
var CTRL_UPDATE								= "Update";            // 修正完了 

//排他制御スイッチ
var EXCLUSIVE_NOTHING    = -1;                  // 排他制御(何もしない)
var EXCLUSIVE_DELL       = 0;                   // 排他制御(開放)
var EXCLUSIVE_SET        = 1;                   // 排他制御(設定)
var EXCLUSIVE_CHECK      = 2;                   // 排他制御(チェック)
//検査ステータス
var STATE_VERIFIED            = "VERIFIED";     // 検査ステータス(確定)
// 2005/07/21 003 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
//// 2005/06/29 002 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
//var COOKIE_NAME_STUDY2        = "StudyLock";	  // 検査排他中クッキー名 

//画像パス
var IMG_DETAIL_DONW    = "../Bmp/cmSquare1BtnD.GIF"
var IMG_DETAIL_UP      = "../Bmp/cmSquare1BtnU.GIF"
var IMG_DETAIL_DISABLE = "../Bmp/cmSquare1BtnX.GIF"
var IMG_BACK_DOWN      = "../Bmp/cmOvalAPaleLBtnD.gif"
var IMG_BACK_UP        = "../Bmp/cmOvalAPaleLBtnU.gif"
var IMG_BACK_DISABLE   = "../Bmp/cmOvalAPaleLBtnX.gif"
var IMG_NEXT_DOWN      = "../Bmp/cmCirBGreenBtnD.gif"
var IMG_NEXT_UP        = "../Bmp/cmCirBGreenBtnU.gif"
var IMG_NEXT_DISABLE   = "../Bmp/cmCirBGreenBtnX.gif"
var IMG_CONF_NG_DOWN   = "../Bmp/cmOvalAPaleLBtnD.GIF";
var IMG_CONF_NG_UP     = "../Bmp/cmOvalAPaleLBtnU.GIF";
var IMG_CONF_OK_DOWN   = "../Bmp/cmOvalAGreenLBtnD.GIF";
var IMG_CONF_OK_UP     = "../Bmp/cmOvalAGreenLBtnU.GIF";

//ImageKind
var IMAGEKIND_FDXIMAGE     = "2";	// FDX画像 V2.2(B) FF奥野 新画像処理対応ADD
//[変数]
var UpdateTimeOutId;      //修正完了タイムアウトプロセスのＩＤ
var ExclusiveTimeOutId;      //修正完了タイムアウトプロセスのＩＤ
//070614 HSK山本 PVCS#2342 ADD-ST
var OV_GetdateTimeOutId;                                  //GetdateタイムアウトプロセスのＩＤ
var OV_CheckOutputExclusiveCallback = null;                         //出力排他確認後実行コールバック
var OV_BackByError = false;
//070614 HSK山本 PVCS#2342 ADD-ED

var AryOption       = new Array();		  // オプションキー
var AryDeviceName   = new Array();		  // 装置タイプ 
var AryDeviceDispType   = new Array();	// 表示装置タイプ 
var OutputName      = new Array();		  // 出力先名称
//2005/11/28--ST
//var OutputDispType  = new Array();
//var OutputDispArr   = new Array();
//2005/11/28--EN
var DisplayCount    = 0;
//============================================================
var ExclusiveModeStudy;                         // 検査の排他の設定／チェック 
var ExclusiveModeStudyRelease;                  // 検査の排他の設定／チェック 
var CommandMode;                                // 終了コマンド 
var CommandParam;                               // 終了パラメタ
var ConfirmFlag = 0;                            // 確認ダイアログフラグ
var CheckCommand = -1;                          // 確認ダイアログ表示時のチェックコマンド 
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

        // オプションキーで情報表示/非表示設定 
        AryOption[0] = OPTION_USE;          // メディア
        AryOption[1] = OptionPrinter;       // プリンタ
        AryOption[2] = OptionCarna;         // C@Rna
        AryOption[3] = OptionFile;          // 汎用ファイル
//070302 HSK山本 ADD-ST
        AryOption[4] = OptionStorage;       // DicomStorage1
//070319 HSK山本 DEL-ST
//        AryOption[5] = OptionStorage;       // DicomStorage2
//070319 HSK山本 DEL-ED
//070302 HSK山本 ADD-ED
//070309 HSK山本 UPDATE-ST
        // 装置タイプ設定 
        AryDeviceName[0] = OUTPUT_TYPE_MEDIA;
        AryDeviceName[1] = OUTPUT_TYPE_PRINTER;
        AryDeviceName[2] = OUTPUT_TYPE_CARNA;
        AryDeviceName[3] = OUTPUT_TYPE_FILE;
//070309 HSK山本 UPDATE-ED
//070302 HSK山本 ADD-ST
        AryDeviceName[4] = OUTPUT_TYPE_STORAGE;
//070319 HSK山本 DEL-ST
//        AryDeviceName[5] = OUTPUT_TYPE_STORAGE;
//070319 HSK山本 DEL-ED
//070302 HSK山本 ADD-ED
        
      //装置アイコン
//070329 HSK古場 UPDATE-ST
//        OUTPUTIMG[0] = "../Bmp/crMediaSim.gif";
//        OUTPUTIMG[1] = "../Bmp/crPrintSim.gif";
//        OUTPUTIMG[2] = "../Bmp/crCarnaSim.gif";
//        OUTPUTIMG[3] = "../Bmp/crFolderSim.gif";
//070302 HSK山本 ADD-ST
//        OUTPUTIMG[4] = "../Bmp/crDICOMStorageSim.gif";
//070319 HSK山本 DEL-ST
////        OUTPUTIMG[5] = "../Bmp/crDICOMStorageSim.gif";
//070319 HSK山本 DEL-ED
//070302 HSK山本 ADD-ED
        OUTPUT_ENABLEIMG[0] = "../Bmp/crMediaSim.gif";
        OUTPUT_ENABLEIMG[1] = "../Bmp/crPrintSim.gif";
        OUTPUT_ENABLEIMG[2] = "../Bmp/crCarnaSim.gif";
        OUTPUT_ENABLEIMG[3] = "../Bmp/crFolderSim.gif";
        OUTPUT_ENABLEIMG[4] = "../Bmp/crDICOMStorageSim.gif";
        OUTPUT_DISABLEIMG[0] = "../Bmp/crMediaSimX.gif";
        OUTPUT_DISABLEIMG[1] = "../Bmp/crPrintSimX.gif";
        OUTPUT_DISABLEIMG[2] = "../Bmp/crCarnaSimX.gif";
        OUTPUT_DISABLEIMG[3] = "../Bmp/crFolderSimX.gif";
        OUTPUT_DISABLEIMG[4] = "../Bmp/crDICOMStorageSimX.gif";
//070329 HSK古場 UPDATE-ED

        for(j=0; j<DISPLAY_COUNT; j++){
            var imgOutput       = "imgOutput"+j;
            var chkOutput       = "chkOutput"+j;
            var chkOutputStatus = "chkOutputStatus"+j;
            var divOutputStatus = "divOutputStatus"+j;
            var divOutputDevice = "divOutputDevice"+j;
            var divOutputTiming = "divOutputTiming"+j;
            var divDetail_Btn   = "divDetail_Btn"+j;
            var tableDetail_Btn = "TABLE_DetailBtn"+j;    
            document.getElementById(imgOutput).style.visibility        = "hidden";
            document.getElementById(chkOutput).style.visibility        = "hidden";
            document.getElementById(chkOutputStatus).style.visibility  = "hidden";
            document.getElementById(divOutputStatus).style.visibility  = "hidden";
            document.getElementById(divOutputDevice).style.visibility  = "hidden";
            document.getElementById(divOutputTiming).style.visibility  = "hidden";
            document.getElementById(divDetail_Btn).style.visibility    = "hidden";
            document.getElementById(tableDetail_Btn).style.visibility  = "hidden";
        }            
        //文字列設定 
        document.getElementById("divHeadder0").innerText  = Label_OutputFlag;
        document.getElementById("divHeadder1").innerText  = Label_OutputStatus;
        document.getElementById("divHeadder2").innerText  = Label_OutputDevice;
        document.getElementById("divHeadder3").innerText  = Label_OutputTiming;
        document.getElementById("divOutputHeight").innerText  = Label_OutputHeight;
        document.getElementById("DIV_CancelText").innerText  = Label_Button_Back;
        document.getElementById("DIV_UpdateText").innerText  = Label_Button_Next;
        document.getElementById("DIV_ConfirmCancelText").innerText       = ConfirmCancelString; 
        document.getElementById("DIV_ConfirmOkText").innerText           = ConfirmOkString;
        //フォント名,フォントサイズの設定 
        document.getElementById("BODY").style.fontFamily          = FONT_NAME;
        // 2005/06/24 011 H.SAITO デザイン変更対応（フォントサイズ） 
        //document.getElementById("BODY").style.fontSize            = FONT_SIZE + "px";
        //document.getElementById("divHeadder0").style.fontSize     = FONT_SIZE-2 + "px";
        //document.getElementById("divHeadder1").style.fontSize     = FONT_SIZE-2 + "px";
        //document.getElementById("divHeadder2").style.fontSize     = FONT_SIZE-2 + "px";
        //document.getElementById("divHeadder3").style.fontSize     = FONT_SIZE-2 + "px";
        // リストヘッダ
        document.getElementById("divHeadder0").style.fontSize            = FONT_SIZE_LIST_FIELD;
        document.getElementById("divHeadder1").style.fontSize            = FONT_SIZE_LIST_FIELD;
        document.getElementById("divHeadder2").style.fontSize            = FONT_SIZE_LIST_FIELD;
        document.getElementById("divHeadder3").style.fontSize            = FONT_SIZE_LIST_FIELD;
        // リスト 
//070302 HSK山本 UPDATE-ST
//    for(var i = 0; i < 4; i++){
        for(var i = 0; i < DISPLAY_COUNT; i++){
//070302 HSK山本 UPDATE-ED
            document.getElementById("divDetail_Btn" + i).style.fontSize    = FONT_SIZE_BUTTON; // 詳細ボタン
            document.getElementById("divOutputStatus" + i).style.fontSize  = FONT_SIZE_LIST;   // 出力先状況 
            document.getElementById("divOutputDevice" + i).style.fontSize  = FONT_SIZE_LIST;   // 出力先
            document.getElementById("divOutputTiming" + i).style.fontSize  = FONT_SIZE_LIST;   // 出力タイミング
        }
        // ボタン
        document.getElementById("DIV_CancelText").style.fontSize         = FONT_SIZE_BUTTON;
        document.getElementById("DIV_UpdateText").style.fontSize         = FONT_SIZE_BUTTON;
        // その他 
        document.getElementById("divOutputHeight").style.fontSize        = FONT_SIZE_OTHER;  // 優先出力 
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
//     画面を表示する
//
// ２．戻り値
//      なし 
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
        //初期化 
        Fn_Init();
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
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
            break;
        }

//		if(parent.EndGetDataFlag != FLAG_STUDY_GETDATA){
			// 検査情報要求(出力先設定は画面入力時に常に取得 
			parent.STUDYDATA_GET_PROC.Public_GetData(PROC_MODE, parent.StudySequence, "", ExclusiveModeStudy);		
//		}
//		else{
//			Public_EndGetData();
//		}

        //ユーザガイダンス設定 
//070425 HSK山本 PVCS#2137 UPDATE-ST
//        parent.INFORMATION_VIEW.Public_SetUserGuidance(UserGuidanceString,1); 		　 //add #2045 Kurashiki    
        parent.INFORMATION_VIEW.Public_SetUserGuidance(UserGuidanceString,1); 		   //add #2045 Kurashiki    
//070425 HSK山本 PVCS#2137 UPDATE-ED

    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
    }
}
//*****************************************************************************
// Public_EndGetData
//
// １．機能
//     データ取得後に画面を表示する
// ２．戻り値
//    なし 
// ３．備考 
//*****************************************************************************	
function Public_EndGetData(){
    try{
//2005/08/01--ST
        var j=0;
        var t=0;
        var arrayFlag = 0;
        var counter = 0;
//2005/08/01--EN
//    //2005/04/24 012 H.SAITO
//    //排他取得状態(0:未取得,1:検査排他取得,2:検査,RU排他取得)
//    if(ExclusiveModeStudy == EXCLUSIVE_SET){
//      switch(parent.OpenMode){
//        case OPEN_MODE_CE:
//          top.ExclusiveState    = 1;
//          break;
//        case OPEN_MODE_WINDOW:
//          parent.ExclusiveState = 1;
//          break;      
//      }
//    }
// 2005/12/12 PVCS#1698 H.SAITO -ST-
        var carnaDialogFlag = 0;
// 2005/12/12 PVCS#1698 H.SAITO -ED-
  
        //データ取得完了フラグをＯＮにする
        parent.EndGetDataFlag = FLAG_STUDY_GETDATA;

        var pp = parent.INFORMATION_VIEW;
//2005/05/24-ST==========
//		pp.Public_SetUserGuidance(UserGuidanceString); 
//		pp.Public_SetUserGuidance(UserGuidanceString,1);        //delete #2045 Kurashiki
//2005/05/24-EN==========
		//患者情報表示
        pp.Public_SetPatientId(parent.PatientId); 
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update Start
//        pp.Public_SetPatientSex(parent.PatientSex);
        pp.Public_SetPatientSex(parent.PatientSex, parent.PatientsSexNeutred);
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update End
        pp.Public_SetPatientName(parent.PatientName, parent.PatientKanjiName);   
        pp.Public_SetPatientBirthDate(parent.PatientBirthDate);
        pp.Public_SetPatientAge(parent.PatientAge);
        pp = null;

// 検査取得処理フレームから出力先設定を取得する========================
// 配列作成しなおし
        parent.EditPrintPriority = parent.PrintPriority; 
//#1243 2005/08/19--ST
        if(parent.OutputCopies ==""){
            parent.EditOutputCopies  = DEFCOPYCOUNT;
        }else{
            parent.EditOutputCopies  = parent.OutputCopies;
        }
//#1243 2005/08/19--EN
        var j=0;
        for(i=0; i<parent.OutputDataCount; i++){
            if(parent.DeviceType[i] != ""){
                parent.EditDeviceCode[j]         = parent.DeviceCode[i];
                parent.EditDeviceType[j]         = parent.DeviceType[i];
                parent.EditOutputTiming[j]       = parent.OutputTiming[i];
                parent.EditOutputReqClass[j]     = parent.OutputReqClass[i];
                parent.EditOutputDensity[j]      = parent.OutputDensity[i];
                parent.EditOutputPicCompType[j]     = parent.OutputPicCompType[i]; //画像圧縮タイプ 
                parent.EditOutputPicProcessType[j]  = parent.OutputPicProcessType[i];  //画像処理タイプ 
                parent.EditOutputPicProcessParam[j] = parent.OutputPicProcessParam[i]; //画像処理パラメータ
                parent.EditOutputFlag[j]            = parent.OutputFlag[i];
                parent.EditOutputStatus[j]          = parent.OutputStatus[i];
                parent.EditDeviceName[j]            = "";
                j++;
            }
        }
        //編集装置数
        parent.EditOutputDataCount = j;    
   
//2005/08/01--ST
        counter = j;
        j=0;
        for(t=0; t<AryDeviceName.length; t++){
            arrayFlag = 0;
            //オプション有効
            if(AryOption[t] == OPTION_USE)
            {
                for(i=0; i<parent.EditDeviceType.length; i++)
                {
                    if(parent.EditDeviceType[i] == AryDeviceName[t]){
                        // 2005/12/12 PVCS#1698 H.SAITO -ST-
                        // 非表示フラグを初期化
                        // (必要に応じて出力先データを持つが、画面表示はしないという制御に使用） 
                        parent.OutputDispHiddenFlag[i] = 0;
                        // 2005/12/12 PVCS#1698 H.SAITO -ED-

                        // 出力先名称
                        switch(parent.EditDeviceType[i]){
                            case OUTPUT_TYPE_MEDIA:
                            if(parent.OutputAliasMedia != ""){
                                parent.EditDeviceName[i] = parent.OutputAliasMedia;
                            }
                            break;
                            case OUTPUT_TYPE_PRINTER:
                            for(k=0; k < parent.OutputAliasPrinterNo.length; k++){
                                if(parent.OutputAliasPrinterNo[k] == parent.EditDeviceCode[i]){
                                    parent.EditDeviceName[i] = parent.OutputAliasPrinter[k];
//070309 HSK山本 ADD-ST
                                    break;
//070309 HSK山本 ADD-ED
                                }
                            }
                            break;
                            case OUTPUT_TYPE_CARNA:
// 2005/12/12 PVCS#1698 H.SAITO -ST-
                            //parent.EditDeviceName[i] = parent.OutputAliasCarna;
                            // C@Rna画像保管有効化キーが無効かつC@Rnaが出力対象として登録されている場合は
                            // ダイアログ表示
                            // C@Rna画像保管有効化キーが有効
                            if(CarnaStorage == CARNASTORAGE_ENABLE){
                                parent.EditDeviceName[i] = parent.OutputAliasCarna;
                            }
                            // C@Rna画像保管有効化キーが無効
                            else{
                                // C@Rna画像保管有効化キーが無効なので、詳細を画面表示しないようにする
                                parent.OutputDispHiddenFlag[i] = 1;
                                // C@Rnaが出力対象となっている場合はダイアログメッセージ表示
                                if(parent.EditOutputFlag[i] == FLAG_OUTPUT_USE){
                                    carnaDialogFlag = 1;
                                    parent.EditOutputFlag[i] = FLAG_OUTPUT_NOUSE; // 更新時は「出力しない」を設定 
                                }
                            }
// 2005/12/12 PVCS#1698 H.SAITO -ED-
                            break;
                            case OUTPUT_TYPE_FILE:
                            parent.EditDeviceName[i] = parent.OutputAliasFile;
                            break;
//070302 HSK山本 ADD-ST
                            case OUTPUT_TYPE_STORAGE:
                            for(k=0; k < parent.OutputAliasStorageNo.length; k++){
                                if(parent.OutputAliasStorageNo[k] == parent.EditDeviceCode[i]){
                                    parent.EditDeviceName[i] = parent.OutputAliasStorage[k];
                                    break;
                                }
                            }
                            break;
//070302 HSK山本 ADD-ED
                            case "":
                            parent.EditDeviceName[i] = "";
                            break;
                            default:
                            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
                            return;
                        }
// 2005/12/12 PVCS#1698 H.SAITO -ST-
                        //parent.OutputDispType[j] = parent.EditDeviceType[i];    // 2005/11/28
                        //parent.OutputDispArr[j]  = i;    // 2005/11/28 Update
                        //j++;
                        //arrayFlag = 1;
                        // 画面の非表示フラグが無効の場合のみデータを配列に入れる。 
                        if(parent.OutputDispHiddenFlag[i] == 0){
                            parent.OutputDispType[j] = parent.EditDeviceType[i];
                            parent.OutputDispArr[j]  = i;
                            j++;
                        }
                        arrayFlag = 1;
// 2005/12/12 PVCS#1698 H.SAITO -ED-
                    }
                }
                // オプションが有効だが情報が無い場合(一度作成したものはしない)
                // 2005/12/12 PVCS#1698 H.SAITO -ST-
                // 追記：登録時にオプションが無効で、あとからオプションを有効にした場合は
                // このパスを通る
                // 2005/12/12 PVCS#1698 H.SAITO -ED-
                if(arrayFlag == 0){
                    // 2005/12/12 PVCS#1698 H.SAITO -ST-
                    //parent.EditDeviceCode[counter]         = "";
                    //parent.EditDeviceType[counter]         = "";
                    //parent.EditOutputTiming[counter]       = "";
                    //parent.EditOutputReqClass[counter]     = "";
                    //parent.EditOutputDensity[counter]      = "";
                    //parent.EditOutputPicCompType[counter]     = ""; //画像圧縮タイプ 
                    //parent.EditOutputPicProcessType[counter]  = "";  //画像処理タイプ 
                    //parent.EditOutputPicProcessParam[counter] = ""; //画像処理パラメータ
                    //parent.EditOutputFlag[counter]            = "";
                    //parent.EditOutputStatus[counter]          = "";
                    //parent.EditDeviceName[counter]            = "";
                    //parent.OutputDispType[j] = AryDeviceName[t];    // 2005/11/28 Update
                    //parent.OutputDispArr[j]  = counter;    // 2005/11/28 Update
                    //j++;
                    //counter++;
                    // C@Rnaは画像保管フラグが無効の場合は何も出力しない。 
                    if(AryDeviceName[t] == OUTPUT_TYPE_CARNA && CarnaStorage != CARNASTORAGE_ENABLE){
                        // 何もしない(明細に出さない)
                    }else{
                        parent.EditDeviceCode[counter]            = "";
                        parent.EditDeviceType[counter]            = "";
                        parent.EditOutputTiming[counter]          = "";
                        parent.EditOutputReqClass[counter]        = "";
                        parent.EditOutputDensity[counter]         = "";
                        parent.EditOutputPicCompType[counter]     = ""; //画像圧縮タイプ 
                        parent.EditOutputPicProcessType[counter]  = ""; //画像処理タイプ 
                        parent.EditOutputPicProcessParam[counter] = ""; //画像処理パラメータ 
                        parent.EditOutputFlag[counter]            = "";
                        parent.EditOutputStatus[counter]          = "";
                        parent.EditDeviceName[counter]            = "";
                        parent.OutputDispType[j] = AryDeviceName[t];      // 2005/11/28 Update
                        parent.OutputDispArr[j]  = counter;                // 2005/11/28 Update
                        j++;
                        counter++;
                    }
                    // 2005/12/12 PVCS#1698 H.SAITO -ED-
                }
            }
// 2005/12/12 PVCS#1698 H.SAITO -ST-
            // オプションキーが無効の場合 
            else{
                for(i=0; i<parent.EditDeviceType.length; i++){
                    if(parent.EditDeviceType[i] == AryDeviceName[t]){
                        // 出力先名称
                        switch(parent.EditDeviceType[i]){
//070302 HSK山本 DEL-ST
//                            case OUTPUT_TYPE_MEDIA:
//                            break;
//                            case OUTPUT_TYPE_PRINTER:
//                            break;
//070302 HSK山本 DEL-ED
                            // オプションキーが無効の場合、かつC@Rna出力が有効になっていた場合は
                            // C@RnaStrageフラグに関係なくダイアログメッセージを表示する
                            case OUTPUT_TYPE_CARNA:
                            // C@Rnaが出力対象となっている場合はダイアログメッセージ表示
                            if(parent.EditOutputFlag[i] == FLAG_OUTPUT_USE){
                                carnaDialogFlag = 1;
                                parent.EditOutputFlag[i] = FLAG_OUTPUT_NOUSE; // 更新時は「出力しない」を設定 
                            }
                            break;
//070302 HSK山本 UPDATE-ST
                            //何もしない装置タイプ 
                            case OUTPUT_TYPE_MEDIA:
                            case OUTPUT_TYPE_PRINTER:
                            case OUTPUT_TYPE_FILE:
                            case OUTPUT_TYPE_STORAGE:
                            break;
//070302 HSK山本 UPDATE-ED
                        }        
                    }
                }      
            }
// 2005/12/12 PVCS#1698 H.SAITO -ED-
        }
        //画面表示数を設定 
        DisplayCount = j;
//2005/08/01--EN
   
        // 出力先情報を表示する
        Public_DisplayData();

        //メニューボタン活性化 
//070322 HSK古場 UPDATE-ST
//      Fn_ButtonEnable(1);
        if(parent.ImageKind == parent.IMAGEKIND_FCRIMAGE
          || parent.ImageKind == IMAGEKIND_FDXIMAGE){ //V2.2(B) FF奥野 新画像処理対応
            Fn_ButtonEnable(1);
        }else{
            Fn_ButtonEnable(2);
        }
//070322 HSK古場 UPDATE-ED

// 2005/12/12 PVCS#1698 H.SAITO -ST-
        // C@RnaオプションキーまたはC@Rna画像保管有効化キーが無効、かつC@Rnaが出力対象として登録されている場合は
        // ダイアログを表示して修正完了ボタンを押下してもらうように誘導する。 
        // メモ：検査登録時にC@RnaOptionと画像保管キーが有効で出力の有無が「出力する」のとき、 
        // 少なくともどちらかのキーを無効にしたあとで出力先の修正を実施しようとしたときにこのパスを通る。 
        // 後からオプションキーを変更されることはC@Rna以外にもいえることだが、今回の対応ではC@Rnaしか対応しない。 
        // 今後同様の機能を追加しようとするときは、複数条件にあてはまったときの
        // メッセージの内容について検討する必要がある。 
        if(carnaDialogFlag == 1){
              Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MESSAGE_ID_DISABLE_CARNA,""), top.DispFrame.Public_GetLangMsgTitle2(MESSAGE_ID_DISABLE_CARNA,""),top.DispFrame.Public_GetLangMsgString(MESSAGE_ID_DISABLE_CARNA,"Cannot Get Message."));
          return;
        }
// 2005/12/12 PVCS#1698 H.SAITO -ED-
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
    }
}

//070322 HSK古場 ADD-ST

//*****************************************************************************
// OV_IsAvailableDevice
//
// １．機能
//     利用可能なデバイスかどうかを判断する
// ２．戻り値
//     なし 
// ３．備考 
//*****************************************************************************	
function OV_IsAvailableDevice(deviceType){
  if(parent.ImageKind != parent.IMAGEKIND_FCRIMAGE
   && parent.ImageKind != IMAGEKIND_FDXIMAGE){ //V2.2(B) FF奥野 新画像処理対応ADD
    if((deviceType==OUTPUT_TYPE_PRINTER) || (deviceType==OUTPUT_TYPE_STORAGE)){
      return false;
    }
  }

  return true;
}

//070322 HSK古場 ADD-ED

//*****************************************************************************
// Public_DisplayData
//
// １．機能
//     データ取得後に画面を表示する
// ２．戻り値
//    なし 
// ３．備考 
//*****************************************************************************	
function Public_DisplayData(){		
  try{
//070406 HSK古場 ADD-ST
    if(OV_OutputInfos == null){
        OV_OutputInfos = new Array();
        var i;
        for(i=0; i<parent.OutputDispType.length; i++){
            OV_OutputInfos[i] = new OV_OutputItemInfo(i,parent.OutputDispType[i]);
        }
    }
//070406 HSK古場 ADD-ED

    if(!ExclusiveModeStudy || !ExclusiveModeStudyRelease){
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
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+20);
          break;
      }
    }

// 2005/08/01--ST
    var j=0;
    var arrayFlag = 0;
		var imgOutput       = "";
		var chkOutput       = "";
		var chkOutputStatus = "";
		var divOutputStatus = "";
		var divOutputDevice = "";
		var divOutputTiming = "";
		var divDetail_Btn   = "";
    var tableDetail_Btn = "";	
		var editindex = 0;

		for(t=0; t<parent.OutputDispArr.length; t++){ // 2005/11/28 Update
			i = parent.OutputDispArr[t];	// 2005/11/28
			imgOutput       = "imgOutput"+t;
			chkOutput       = "chkOutput"+t;
			chkOutputStatus = "chkOutputStatus"+t;
			divOutputStatus = "divOutputStatus"+t;
			divOutputDevice = "divOutputDevice"+t;
			divOutputTiming = "divOutputTiming"+t;
			divDetail       = "divDetail"+t;
			divDetail_Btn   = "divDetail_Btn"+t;
			tableDetail_Btn = "TABLE_DetailBtn"+t;

			// 装置アイコン
			document.getElementById(imgOutput).style.visibility    = "visible";
// 2005/08/08--ST
//070322 HSK古場 UPDATE-ST
//		document.getElementById(imgOutput).src			           = OUTPUTIMG[0];
//		for(j=0; j<AryDeviceName.length; j++){
//			if(AryDeviceName[j] == parent.OutputDispType[t]){	// 2005/11/28 Update
//				document.getElementById(imgOutput).src = OUTPUTIMG[j];
//				break;
//			}
//		}
//070322 HSK古場 UPDATE-ED
// 2005/08/08--EN
			// 出力有無
			// 2005/03/21 018 H.SAITO
			if(parent.EditOutputFlag[i] == FLAG_OUTPUT_USE){
				document.getElementById(chkOutput).checked          = true;
				document.getElementById(chkOutput).style.visibility = "visible";
				document.getElementById(chkOutput).disabled = false; 
			}else if(parent.EditOutputFlag[i] == FLAG_OUTPUT_NOUSE){
				document.getElementById(chkOutput).checked          = false;
				document.getElementById(chkOutput).style.visibility = "visible";
				document.getElementById(chkOutput).disabled = false; 
			}else{
				document.getElementById(chkOutput).checked          = false;    // データ無し時は非表示
				document.getElementById(chkOutput).style.visibility = "visible"; // データ無し時は表示
				document.getElementById(chkOutput).disabled = true; // データ無し時は不活性
			}
			// 出力状況 
			if(parent.EditOutputStatus[i] == FLAG_STATUS_OUTPUT){
				document.getElementById(chkOutputStatus).style.visibility = "visible";
				document.getElementById(chkOutputStatus).checked    = true;
				document.getElementById(divOutputStatus).style.visibility  = "visible";
				document.getElementById(divOutputStatus).innerText  = Status_Output;
			}else if(parent.EditOutputStatus[i] == FLAG_STATUS_NOOUTPUT){
				document.getElementById(chkOutputStatus).style.visibility = "visible";
				document.getElementById(chkOutputStatus).checked    = false;
				document.getElementById(divOutputStatus).style.visibility  = "visible";
				document.getElementById(divOutputStatus).innerText  = Status_NoOutput;
			}else{
				document.getElementById(chkOutputStatus).style.visibility = "visible";
				document.getElementById(divOutputStatus).innerText  = "";
				document.getElementById(divOutputStatus).style.visibility  = "visible";
				document.getElementById(divOutputStatus).innerText  = Status_Format;
			}
			// 出力先名称表示
			if(parent.EditDeviceName[i] != ""){
				document.getElementById(divOutputDevice).style.visibility  = "visible";
				document.getElementById(divOutputDevice).innerText  = parent.EditDeviceName[i];
			}else{
				document.getElementById(divOutputDevice).style.visibility  = "visible";
				document.getElementById(divOutputDevice).innerText  = Device_Format;
			}
			// 出力タイミング
			if(parent.EditOutputTiming[i] == FLAG_OUTPUT_DECISION){
				document.getElementById(divOutputTiming).style.visibility  = "visible";
				document.getElementById(divOutputTiming).innerText  = Timing_Decision;
			}else if(parent.EditOutputTiming[i] == FLAG_OUTPUT_CONFIRM){
				document.getElementById(divOutputTiming).style.visibility  = "visible";
				document.getElementById(divOutputTiming).innerText  = Timing_Confirm;
			}else if(parent.EditOutputTiming[i] == ""){
				document.getElementById(divOutputTiming).style.visibility  = "visible";
				document.getElementById(divOutputTiming).innerText  = Timing_Format;
			}
			//詳細ボタン表示
			document.getElementById(divDetail).innerText  = Label_Button_Detail;
			document.getElementById(divDetail_Btn).style.visibility    = "visible";
			document.getElementById(tableDetail_Btn).style.visibility  = "visible";
		}
    DisplayCount = parent.OutputDispArr.length;	// 2005/11/28 Update
// 2005/08/01--EN
    // 優先出力 
    if(parent.EditPrintPriority == OUTPUT_PROORITY_HIGH){
      parent.EditPrintPriority = OUTPUT_PROORITY_HIGH;
			document.getElementById("chkOutputHeight").checked = true;
		}else{
      parent.EditPrintPriority = OUTPUT_PROORITY_LOW;
			document.getElementById("chkOutputHeight").checked = false;
		}				
    //メニューボタン活性化 
//070322 HSK古場 UPDATE-ST
//  Fn_ButtonEnable(1);
    if(parent.ImageKind == parent.IMAGEKIND_FCRIMAGE
      || parent.ImageKind == IMAGEKIND_FDXIMAGE){ //V2.2(B) FF奥野 新画像処理対応
        Fn_ButtonEnable(1);
    }else{
        Fn_ButtonEnable(2);
    }
//070322 HSK古場 UPDATE-ED
    //ユーザガイダンス設定 
//070425 HSK山本 PVCS#2137 UPDATE-ST
//    parent.INFORMATION_VIEW.Public_SetUserGuidance(UserGuidanceString,1); 		　 //add #2045 Kurashiki    
    parent.INFORMATION_VIEW.Public_SetUserGuidance(UserGuidanceString,1); 		   //add #2045 Kurashiki    
//070425 HSK山本 PVCS#2137 UPDATE-ED
//====================================================================================
 }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
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
            Public_DisplayData();
        }else{
//070614 HSK山本 PVCS#2342 UPDATE-ST
//            Public_Init();
            //出力排他チェック
            OV_CheckOutputExclusive(OV_OutputExclusiveCheckedNotification);
//070614 HSK山本 PVCS#2342 UPDATE-ED
        }
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+27);
    }
}

//*****************************************************************************
// Fn_Init
//
// １．機能
//     変数を初期化する
// ２．戻り値
//     なし 
// ３．備考 
//*****************************************************************************
function Fn_Init(){
  try{
    //初期化 
    UpdateTimeOutId  = null;
    ExclusiveTimeOutId  = null;
    //編集用の出力先情報
    parent.EditPrintPriority         = ""           //優先出力 
    parent.EditOutputCopies          = "";          //プリント枚数
    parent.EditOutputFlag            = new Array(); //出力有無
    parent.EditOutputStatus          = new Array(); //出力状況 
    parent.EditDeviceCode            = new Array(); //出力先装置コード 
    parent.EditDeviceType            = new Array(); //出力先タイプ 
    parent.EditOutputTiming          = new Array(); //出力タイミング
    parent.EditOutputReqClass        = new Array(); //出力依頼区分 
    parent.EditOutputDensity         = new Array(); //画像密度
    parent.EditOutputPicCompType     = new Array(); //画像圧縮タイプ 
    parent.EditOutputPicProcessType  = new Array(); //画像処理タイプ 
    parent.EditOutputPicProcessParam = new Array(); //画像処理パラメータ
    parent.EditDeviceName            = new Array(); //装置名称  
    parent.EditOutputDataCount= 0;       //装置数
//2005/11/28--ST
    parent.OutputDispType            = new Array();	// 出力先設定(表示タイプ)
    parent.OutputDispArr             = new Array();	// 出力先設定(表示位置)
//2005/11/28--EN
    //2005/12/12 PVCS#1698 -ST-
    parent.OutputDispHiddenFlag      = new Array();
    //2005/12/12 PVCS#1698 -ED-
    ConfirmFlag = 0;
/*
	OutputAliasMedia     = "";		// メディア名称(単体)
	OutputAliasMediaNo   = "";		// メディア名称(単体)
	OutputAliasPrinter   = new Array();		// プリンタ名称(複数)
	OutputAliasPrinterNo = new Array();		// プリンタ名称(複数)
	OutputAliasCarna     = "";		// C@Rna名称(単体)
	OutputAliasFile      = "";		// 汎用ファイル名称(単体)
*/
   //患者情報表示/ユーザガイダンス表示初期化 
    parent.INFORMATION_VIEW.Public_ClearInformation();
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
  }
}
//*****************************************************************************
// Fn_OnButton
//
// １．機能
//     ・ボタン押下時の処理を行う
//
// ２．戻り値
//    なし 
//
// ３．備考 
//   なし 
//*****************************************************************************
function Fn_OnButton(tableNo){
    try{
        //2005/09/14--ST
        var mediaflg = 0;
        var printerflg = 0;
//070302 HSK山本 ADD-ST
        var storageflg = 0;
//070302 HSK山本 ADD-ED
        var i;
        //2005/09/14--EN
        var checkBoxId;
        switch(tableNo){
            //------------//
            // 出力の有無 //
            //------------//
            case 1:
            case 2:
            case 3:
            case 4:
//070302 HSK山本 ADD-ST
            case 5:
//070319 HSK山本 DEL-ST
//            case 6:
//070319 HSK山本 DEL-ED
//070302 HSK山本 ADD-ED
            // チェックボックスのＩＤを求める 
            checkBoxId = "chkOutput" + (tableNo - 1);

            if(document.getElementById(checkBoxId).checked){
                parent.EditOutputFlag[parent.OutputDispArr[tableNo - 1]] = FLAG_OUTPUT_USE;	// 2005/1/28 Update
            }else{
// CHANGE 2005/05/09===================
//070305 HSK山本 UPDATE-ST
//                //メディアとC@Rnaの場合確認ダイアログを表示 
//                if(parent.OutputDispType[tableNo - 1] == OUTPUT_TYPE_MEDIA || parent.OutputDispType[tableNo - 1] == OUTPUT_TYPE_CARNA){	// 2005/11/28 Update
                //メディアとC@RnaとDicomストレージの場合確認ダイアログを表示 
                var outType = parent.OutputDispType[tableNo - 1];
//070412 HSK古場 UPDATE-ST
//              if( outType == OUTPUT_TYPE_MEDIA || outType == OUTPUT_TYPE_CARNA || outType == OUTPUT_TYPE_STORAGE){
//071002 HSK山本 V3.0 出力必須解除 UPDATE-ST
//                if((parent.ImageKind == parent.IMAGEKIND_FCRIMAGE) && (outType == OUTPUT_TYPE_MEDIA || outType == OUTPUT_TYPE_CARNA || outType == OUTPUT_TYPE_STORAGE)){
//出力必須条件追加
                if((IndispensableOutputFlag == FLAG_OUTPUT_INDISPENSABLE) && 
                   (parent.ImageKind == parent.IMAGEKIND_FCRIMAGE
                     || parent.ImageKind == IMAGEKIND_FDXIMAGE) //V2.2(B) FF奥野 新画像処理対応
                   && (outType == OUTPUT_TYPE_MEDIA || outType == OUTPUT_TYPE_CARNA || outType == OUTPUT_TYPE_STORAGE)){
//071002 HSK山本 V3.0 出力必須解除 UPDATE-ED
//070412 HSK古場 UPDATE-ED
//070305 HSK山本 UPDATE-ED
                    document.getElementById(checkBoxId).checked = true;
                    ConfirmFlag = 2;
                    CheckCommand = tableNo;
                    document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_CHANGE_OUTPUTSETTING,"");
                    document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_CHANGE_OUTPUTSETTING,"");
                    document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_CHANGE_OUTPUTSETTING,"Cannt Get Message.");
                    Public_Confirm();
                }else{
                    parent.EditOutputFlag[parent.OutputDispArr[tableNo - 1]] = FLAG_OUTPUT_NOUSE;	// 2005/11/28
                }
//=====================================        
            }      
            // ログを出力する 
            if(document.getElementById(checkBoxId).checked){
                Fn_WriteLog(CTRL_OUTPUT_ON  + tableNo); 
            }
            else{
                Fn_WriteLog(CTRL_OUTPUT_OFF + tableNo);        
            }
            break;
            //----------//
            // 優先出力 //
            //----------//
//070302 HSK山本 UPDATE-ST
            //case 5:
            case 10:
//070302 HSK山本 UPDATE-ED
            // 編集出力先情報設定 
            if(parent.EditPrintPriority == OUTPUT_PROORITY_HIGH){
                document.getElementById("chkOutputHeight").checked = false;
                parent.EditPrintPriority = OUTPUT_PROORITY_LOW;
            }else{
                document.getElementById("chkOutputHeight").checked = true;
                parent.EditPrintPriority = OUTPUT_PROORITY_HIGH;
            }      
            // ログを出力する 
            if(document.getElementById("chkOutputHeight").checked){
                Fn_WriteLog(CTRL_FIRSTPRIORITY_ON); 
            }
            else{
                Fn_WriteLog(CTRL_FIRSTPRIORITY_OFF);        
            }
            break;
            //--------------//
            // 詳細ボタン１ //
            //--------------//
            case 21: // MOUSEDOWN
            document.getElementById("imgDetail0_Enable").src = IMG_DETAIL_DONW;
            break;
            case 22: // MOUSEUP,MOUSEOUT
            document.getElementById("imgDetail0_Enable").src = IMG_DETAIL_UP;
            break;
            //--------------//
            // 詳細ボタン２ //
            //--------------//
            case 31: // MOUSEDOWN
            document.getElementById("imgDetail1_Enable").src = IMG_DETAIL_DONW;
            break;
            case 32: // MOUSEUP,MOUSEOUT
            document.getElementById("imgDetail1_Enable").src = IMG_DETAIL_UP;
            break;
            //--------------//
            // 詳細ボタン３ //
            //--------------//
            case 41: // MOUSEDOWN
            document.getElementById("imgDetail2_Enable").src = IMG_DETAIL_DONW;
            break;
            case 42: // MOUSEUP,MOUSEOUT
            document.getElementById("imgDetail2_Enable").src = IMG_DETAIL_UP;
            break;
            //--------------//
            // 詳細ボタン４ //
            //--------------//
            case 51: // MOUSEDOWN
            document.getElementById("imgDetail3_Enable").src = IMG_DETAIL_DONW;
            break;
            case 52: // MOUSEUP,MOUSEOUT
            document.getElementById("imgDetail3_Enable").src = IMG_DETAIL_UP;
            break;
//070302 HSK山本 ADD-ST
            //--------------//
            // 詳細ボタン５ //
            //--------------//
            case 61: // MOUSEDOWN
            document.getElementById("imgDetail4_Enable").src = IMG_DETAIL_DONW;
            break;
            case 62: // MOUSEUP,MOUSEOUT
            document.getElementById("imgDetail4_Enable").src = IMG_DETAIL_UP;
            break;
//070319 HSK山本 DEL-ST
//            //--------------//
//            // 詳細ボタン６ //
//            //--------------//
//            case 71: // MOUSEDOWN
//            document.getElementById("imgDetail5_Enable").src = IMG_DETAIL_DONW;
//            break;
//            case 72: // MOUSEUP,MOUSEOUT
//            document.getElementById("imgDetail5_Enable").src = IMG_DETAIL_UP;
//            break;
//070319 HSK山本 DEL-ED
//070302 HSK山本 ADD-ED
            //----------//
            //戻るボタン//
            //----------//
            case 91: // CLICK 
            Fn_Init();
            parent.ModifyStatusFlag = 0;
            // 親への完了通知
            var notifyInfo = { "commandMode" : COMMAND_MODE_CANCEL, "commandParam" : "" };
            NotifyFrameFinished(notifyInfo);
            document.getElementById("IMG_CancelBtn").src = IMG_BACK_UP;
            break;
            case 92: // MOUSEDOWN
            document.getElementById("IMG_CancelBtn").src = IMG_BACK_DOWN;
            break;
            case 93: // MOUSEOUT
            document.getElementById("IMG_CancelBtn").src = IMG_BACK_UP;
            break;
            //--------//
            //修正完了//
            //--------//
            case 95: // CLICK
            //情報未取得の場合は不活性
            if(parent.EndGetDataFlag == FLAG_STUDY_NOGETDATA)return;
            //2005/09/14--ST
//070322 HSK古場 UPDATE-ST
//071002 HSK山本 V3.0 出力必須解除 UPDATE-ST
//            if(parent.ImageKind == parent.IMAGEKIND_FCRIMAGE){
            if((IndispensableOutputFlag == FLAG_OUTPUT_INDISPENSABLE) 
              && (parent.ImageKind == parent.IMAGEKIND_FCRIMAGE
                  || parent.ImageKind == IMAGEKIND_FDXIMAGE)){ //V2.2(B) FF奥野 新画像処理対応ADD
//071002 HSK山本 V3.0 出力必須解除 UPDATE-ED
                for(i=0; i<parent.EditDeviceType.length; i++){
                    if(parent.EditOutputFlag[i] == FLAG_OUTPUT_USE){
                        if(parent.EditDeviceType[i] == OUTPUT_TYPE_MEDIA ){
                            mediaflg = 1;
                        }
                        else if(parent.EditDeviceType[i] == OUTPUT_TYPE_PRINTER ){
                            printerflg = 1;
                        }
//070302 HSK山本 ADD-ST
                        else if(parent.EditDeviceType[i] == OUTPUT_TYPE_STORAGE ){
                            storageflg = 1;
                        }
//070302 HSK山本 ADD-ED
                    }
                }
//070302 HSK山本 UPDATE-ST
//                if(printerflg == 0 && mediaflg == 0){
                if(printerflg == 0 && mediaflg == 0 && storageflg == 0){
//070302 HSK山本 UPDATE-ED
                  // 2005/12/12 PVCS#1698 H.SAITO -ST-
                  //top.GetErrorMessage(RETRY_ERROR,MESSAGE_ID_NOSELECT,FILE_NAME,SPOT_CODE+26)
                  Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MESSAGE_ID_NOSELECT,""), top.DispFrame.Public_GetLangMsgTitle2(MESSAGE_ID_NOSELECT,""),top.DispFrame.Public_GetLangMsgString(MESSAGE_ID_NOSELECT,"Cannot Get Message."));
                  // 2005/12/12 PVCS#1698 H.SAITO -ED-
                  return;
                }
            }
//070322 HSK古場 UPDATE-ED
//070319 HSK山本 DEL-ST
////070302 HSK山本 ADD-ST
//            //重複しているタイプがないかチェック 
//            var duplicateType = OV_CheckDuplicateOutputType();
//            if(duplicateType != null){//重複している 
//                if(duplicateType != OUTPUT_TYPE_STORAGE){//DicomStorageじゃない 
//                    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+29);
//                }
//                Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MESSAGE_ID_DUPLICATE,""), top.DispFrame.Public_GetLangMsgTitle2(MESSAGE_ID_DUPLICATE,""),top.DispFrame.Public_GetLangMsgString(MESSAGE_ID_DUPLICATE,"Cannot Get Message."));
//                return;
//            }
////070302 HSK山本 ADD-ED
//070319 HSK山本 DEL-ED
//2005/09/14--EN
            // ログを出力する 
            Fn_WriteLog(CTRL_UPDATE);

            // 更新処理 
            Fn_Update();

            // 排他処理 
            document.getElementById("IMG_UpdateBtn_Enable").src = IMG_NEXT_UP;

            break;
            case 96: // MOUSEDOWN
                document.getElementById("IMG_UpdateBtn_Enable").src = IMG_NEXT_DOWN;
                break;
            case 97: // MOUSEOUT
                document.getElementById("IMG_UpdateBtn_Enable").src = IMG_NEXT_UP;
                break;
            case 100:// 続行可能エラー時のＯＫボタン
                Public_CloseMessage();
                Public_CloseError();     
                break;
            //----------------//
            // 確認ＯＫボタン //
            //----------------//
            case 111:  //ONCLICK
//CHANGE 2005/05/09====================			
            //確定時更新処理実行 
            if(ConfirmFlag == 1){
                // 確認処理実施
                Fn_UpdateExec();
            }
            //出力無設定実行 
            else if(ConfirmFlag == 2){
                // 出力無に設定 
                // チェックボックスのＩＤを求める 
                checkBoxId = "chkOutput" + (CheckCommand - 1);
                document.getElementById(checkBoxId).checked = false;
                parent.EditOutputFlag[parent.OutputDispArr[CheckCommand - 1]] = FLAG_OUTPUT_NOUSE;	// 2005/11/29 Update
                CheckCommand = -1;
            }
//=====================================
            // 確認ダイアログ非表示
            ConfirmFlag = 0;
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
            CheckCommand = -1;
            ConfirmFlag  = 0;
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
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
            break;
        }
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
    }
}
//*****************************************************************************
// Fn_Detail
//
// １．機能
//     ・ボタン押下時の処理を行う
//
// ２．戻り値
//  なし 
//
// ３．備考 
//    なし 
//*****************************************************************************
function Fn_Detail(No){
  try{
    var paramData = new Array();
    // ログを出力する 
    Fn_WriteLog(CTRL_OUTPUTDETAIL + (No + 1));
//CHANGE 2005/03/07==============================
    //選択した装置タイプが存在しない場合デフォルト値を設定 
    if(parent.OutputDispType[No] == ""){	// 2005/11/28 Update
      paramData[0] = AryDeviceDispType[No];
      paramData[1] = parent.OutputDispArr[No];	// 2005/11/28 Update
    }else{
      paramData[0] = parent.OutputDispType[No];	// 2005/11/28 Update
      paramData[1] = parent.OutputDispArr[No];	// 2005/11/28 Update
    }
    // 選択した装置の詳細画面を表示要求 
    var notifyInfo = { "commandMode" : COMMAND_MODE_DETAIL, "commandParam" : paramData };
    NotifyFrameFinished(notifyInfo);

//CHANGE=========================================== 
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
  }
}
//*****************************************************************************
// Fn_Update
//
// １．機能
//     出力先設定の更新処理を行う
// ２．戻り値
//     なし 
// ３．備考 
//     なし 
//*****************************************************************************
function Fn_Update(){
  try{
    var i; // ループカウンタ
    
//CHANGE hata 2005/02/28============================================
    //出力先情報比較 
    if(parent.EditPrintPriority != parent.PrintPriority)parent.OutputModifyFlag=1; 
    //2005/03/21 006 H.SAITO 
/*
    if(parent.EditOutputFlag.toString() != parent.OutputFlag.toString()){
      parent.OutputModifyFlag = 1;
    }
*/
    //出力有無の比較 
    if(parent.EditOutputFlag.length == parent.OutputFlag.length){
      for(j=0; j<parent.OutputFlag.length; j++){
        if(parent.EditOutputFlag[j] != parent.OutputFlag[j]){      
          parent.OutputModifyFlag = 1;
        }
      }
    }else{
      parent.OutputModifyFlag = 1;
    }

    if(parent.OutputModifyFlag == 0){
      //修正完了フラグを修正無しとする
      parent.ModifyStatusFlag = 0;
      Public_EndUpdate(); 
    }else{
      // 2005/06/17 010 H.SAITO PVCS:695 確定済み検査に対する修正時のメッセージを変更(出力画面では不要のため、削除)
      ////検査ステータスが確定の場合は確認ダイアログを表示する
      //if(parent.StudyStatus == STATE_VERIFIED){
      //　ConfirmFlag = 1;
      //  document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_CHANGE_VERIFIED,"");
      //  document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_CHANGE_VERIFIED,"");
      //  document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_CHANGE_VERIFIED,"Cannt Get Message.");
      //  Public_Confirm();
      //  return;    
      //}
    
/*
      pp.studySequence.value         = parent.StudySequence;
      pp.outputPriority.value        = parent.EditPrintPriority;         //優先出力 
      pp.outputCopies.value          = parent.EditOutputCopies;          //プリント枚数
      pp.deviceCode.value            = parent.EditDeviceCode;            //出力先装置コード 
      pp.deviceType.value            = parent.EditDeviceType;          //出力先タイプ 
      // 2005/03/21 002 H.SAITO
//      pp.outputTiming.value          = parent.EditOutputTiming;          //出力タイミング
      pp.outputReqClass.value        = parent.EditOutputReqClass;        //出力依頼区分 
      pp.outputDensity.value         = parent.EditOutputDensity;         //画像密度
      pp.outputPicCompType.value     = parent.EditOutputPicCompType;     //画像圧縮タイプ 
      pp.outputPicProcessType.value  = parent.EditOutputPicProcessType;  //画像処理タイプ 
      pp.outputPicProcessParam.value = parent.EditOutputPicProcessParam; //画像処理パラメータ
      pp.outputFlag.value            = parent.EditOutputFlag;            //出力有無
      pp.outputStatus.value          = parent.EditOutputStatus;          //出力状況 
      // 2005/03/21 018 H.SAITO
      // 出力の有無のチェック
      for(i = 0; i < parent.EditOutputFlag.length; i++){
        switch(parent.EditOutputFlag[i]){
          // 出力有無がオフの場合は出力タイミングを強制的に「出力しない」にする
          case FLAG_OUTPUT_NOUSE:
            parent.EditOutputTiming[i]    = FLAG_OUTPUT_NOOUT;                //出力タイミング
            break;
          // 出力有無がオンの場合,かつ,出力タイミングが「出力しない」の場合は
          // 出力タイミングを強制的に「確定時」にする
          case FLAG_OUTPUT_USE:     
            if(parent.EditOutputTiming[i] == FLAG_OUTPUT_NOOUT){
              parent.EditOutputTiming[i]  = FLAG_OUTPUT_DECISION;             //出力タイミング
            }
            break;
        }
      }
      pp.outputTiming.value          = parent.EditOutputTiming;          //出力タイミング

//ADD 2005/03/01====================================
      pp.studyStatus.value           = parent.StudyStatus;
      pp.loginUserId.value           = escape(top.LoginUserId);
//ADD ==============================================
      pp.submit();
      pp = null;
      //修正完了フラグを修正完了とする
      parent.ModifyStatusFlag = 1;
*/
      //修正処理実行 
      Fn_UpdateExec();
    }
//CHANGE EN=======================================================
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+11);
  }
}
//*****************************************************************************
// Public_EndUpdate
//
// １．機能 
//      更新処理成功後の処理を行う
// ２．戻り値
//      無し 
// ３．備考 
//*****************************************************************************
function Public_EndUpdate(){
  try{
    //タイマ予約解除
    clearTimeout(UpdateTimeOutId);
    //処理中表示
    Public_Message("DIALOG", ProcString);
   //排他の開放処理を行う
    Fn_Exclusive(COMMAND_MODE_UPDATE, "");
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+12);
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
//    なし 
//*****************************************************************************
function Fn_Exclusive(commandMode, commandParam){
  try{
    //終了モードとパラメータの退避
    CommandMode  = commandMode;
    CommandParam = commandParam;

    //----------------------------------------------------------//
    // 検査の開放を行わない場合はサーバアクセスしないようにする //
    //----------------------------------------------------------//
    if(ExclusiveModeStudyRelease == EXCLUSIVE_NOTHING){
      Public_EndExclusive(0 , 0);
    }
    else{
      //処理中表示
      Public_Message("DIALOG", ProcString);
      //タイマ予約 
      //2010/11/22 30501エラー改善対応 MOD ST
      ExclusiveTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS_EXCLUSIVE+",'"+FILE_NAME+"',"+ (SPOT_CODE+13) +")", UPDATE_TIMEOUT);
      //2010/11/22 30501エラー改善対応 MOD ED
      //排他開放処理 
      parent.EXCLUSIVE_PROC.Public_Exclusive(PROC_MODE, parent.StudySequence, "", ExclusiveModeStudyRelease);
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+14);
  }
}
//*****************************************************************************
// Public_EndExclusive
//
// １．機能 
//      排他処理後の処理 
// ２．戻り値
//      無し 
// ３．備考 
//*****************************************************************************
function Public_EndExclusive(returnCodeRu, returnCodeStudy){
  try{
    //タイマ予約解除
    clearTimeout(ExclusiveTimeOutId);

    //エラーのチェックを行う
    if(returnCodeStudy != 0){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+15);
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
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+16);
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
function Fn_WriteLog(ctrlCommand){
	try{
		parent.LOGGER_PROC.location.replace("Logger_Proc.aspx?" + "Display=" + PROC_MODE + "&Command=" + ctrlCommand + "&LoginUserId=" + top.LoginUserId + "&OpenMode=" + parent.OpenMode);
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+17);
	}
}

//070322 HSK古場 ADD-ST

//***************************************************************************
// Class OV_OutputItemInfo
//
// １．機能 
//      Fn_ButtonEnable()で活性・不活性化する詳細ボタンを構成するエレメント

//      群を一つのオブジェクトとして管理する

// ２．戻り値
//      生成されたオブジェクト(this)
// ３．備考 
//***************************************************************************

// Constructor
function OV_OutputItemInfo(index, devType) {
  // ID名を作成 
  this._index           = index;
  this._imgOutput       = "imgOutput" + index;
  this._chkOutput       = "chkOutput" + index;
  this._chkOutputStatus = "chkOutputStatus" + index;
  this._divOutputStatus = "divOutputStatus" + index;
  this._divOutputDevice = "divOutputDevice" + index;
  this._divOutputTiming = "divOutputTiming" + index;
  this._divDetail       = "divDetail" + index;
  this._divDetail_Btn   = "divDetail_Btn" + index;
  this._tableDetail_Btn = "TABLE_DetailBtn" + index;
  this._imgDetailE      = "imgDetail" + index + "_Enable";
  this._imgDetailD      = "imgDetail" + index + "_Disable";

  this._deviceType = devType;
  this._disableIcon = "";
  this._enableIcon = "";

  // アイコン設定 
  for (var i = 0; i < AryDeviceName.length; i++) {
    if (AryDeviceName[i] == this._deviceType) {
      this._enableIcon = OUTPUT_ENABLEIMG[i];   // 活性状態のアイコン 
      this._disableIcon = OUTPUT_DISABLEIMG[i]; // 不活性状態のアイコン 
      break;
    }
  }

  return this;
}

// Methods
with (OV_OutputItemInfo) {
//public:
  prototype.GetDeviceType = GetDeviceType_implementation;
  prototype.Enable = Enable_implementation;
  prototype.Disable = Disable_implementation;
  prototype.UpdateEnable = UpdateEnable_implementation;

//implementation:
  function GetDeviceType_implementation() {
    return this._deviceType;
  }

  function UpdateEnable_implementation(){
    if(OV_IsAvailableDevice(this._deviceType) == false){//無効出力タイプ 
        this.Disable();
    }else{
        // 出力イメージのアイコン
        var imgOutputElement = document.getElementById(this._imgOutput);
        imgOutputElement.style.visibility = "visible";
        imgOutputElement.src = this._enableIcon;

        // 出力有無 
        var i = parent.OutputDispArr[this._index];
        var chkOutputElement = document.getElementById(this._chkOutput) ;
        if(parent.EditOutputFlag[i] == FLAG_OUTPUT_USE){
            chkOutputElement.disabled = false; 
        }else if(parent.EditOutputFlag[i] == FLAG_OUTPUT_NOUSE){
            chkOutputElement.disabled = false; 
        }else{
            chkOutputElement.disabled = true; // データ無し時は不活性 
        }
        // 出力状況（チェックボックス）は、常に不活性という仕様 
        //文字列色だけ変更する 
        var divOutputStatusElement = document.getElementById(this._divOutputStatus);
        divOutputStatusElement.style.color = "black";

        // 出力先名称表示 
        var divOutputDeviceElement = document.getElementById(this._divOutputDevice);
        divOutputDeviceElement.disabled = false;

        // 出力タイミング 
        var divOutputTimingElement = document.getElementById(this._divOutputTiming);
        divOutputTimingElement.disabled = false;

        // 詳細ボタン表示 
        document.getElementById(this._tableDetail_Btn).style.visibility = "visible";
        document.getElementById(this._imgDetailE).style.visibility      = "visible";
        document.getElementById(this._imgDetailD).style.visibility      = "hidden";
        document.getElementById(this._divDetail).style.color            = "black";
    }
  }
  function Enable_implementation(isEnable) {
    if (isEnable == null) {
      isEnable = true;
    }

    // 出力イメージのアイコン 
    var imgOutputElement = document.getElementById(this._imgOutput);
    imgOutputElement.style.visibility = "visible";
    if (isEnable) {
      imgOutputElement.src = this._enableIcon;
    } else {
      imgOutputElement.src = this._disableIcon;
    }

    // 出力有無 
    var chkOutputElement = document.getElementById(this._chkOutput);
    chkOutputElement.style.visibility = "visible";
    chkOutputElement.disabled = !isEnable;

    // 出力状況 
    // 出力状況（チェックボックス）は、常に不活性 
    var chkOutputStatusElement = document.getElementById(this._chkOutputStatus);
    var divOutputStatusElement = document.getElementById(this._divOutputStatus);
    chkOutputStatusElement.style.visibility = "visible";
    divOutputStatusElement.style.visibility = "visible";
//    chkOutputStatusElement.disabled = !isEnable;
    //文字列色だけ変更 
    if (isEnable) {
      divOutputStatusElement.style.color = "black";
    } else {
      divOutputStatusElement.style.color = "gray";
    }

    // 出力先名称表示 
    var divOutputDeviceElement = document.getElementById(this._divOutputDevice);
    divOutputDeviceElement.style.visibility = "visible";
    divOutputDeviceElement.disabled = !isEnable;

    // 出力タイミング 
    var divOutputTimingElement = document.getElementById(this._divOutputTiming);
    divOutputTimingElement.style.visibility = "visible";
    divOutputTimingElement.disabled = !isEnable;

    // 詳細ボタン表示 
    if (isEnable) {
      document.getElementById(this._tableDetail_Btn).style.visibility = "visible";
      document.getElementById(this._imgDetailE).style.visibility      = "visible";
      document.getElementById(this._imgDetailD).style.visibility      = "hidden";
      document.getElementById(this._divDetail).style.color            = "black";
    } else {
      document.getElementById(this._tableDetail_Btn).style.visibility = "hidden";
      document.getElementById(this._imgDetailE).style.visibility      = "hidden";
      document.getElementById(this._imgDetailD).style.visibility      = "visible";
      document.getElementById(this._divDetail).style.color            = "gray";
    }
  }

  function Disable_implementation() {
    this.Enable(false);
  }
}

//070322 HSK古場 ADD-ED

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
 		var tableDetail  = "";
		var imgDetailE   = "";
		var imgDetailD   = "";
		var divDetail    = "";
	  switch(disp){
	    case 0:     //不活性
	      document.getElementById("TABLE_UpdateBtn").style.visibility       = "hidden";
	      document.getElementById("IMG_UpdateBtn_Enable").style.visibility  = "hidden";
	      document.getElementById("IMG_UpdateBtn_Disable").style.visibility = "visible";
	      document.getElementById("DIV_UpdateText").style.color             = "gray";
        // 2005/12/20 H.SAITO -ST-
        // データ取得前に押下されないようにする
	      document.getElementById("TABLE_CancelBtn").style.visibility       = "hidden";
	      document.getElementById("DIV_CancelText").style.color             = "gray";
        // 2005/12/20 H.SAITO -ED-

        //着目している出力装置に対応するボタン全てを不活性
        for(i=0; i<DisplayCount; i++){
//070322 HSK古場 UPDATE-ST
//	      tableDetail   = "TABLE_DetailBtn" + i;
//	      imgDetailE    = "imgDetail" + i + "_Enable";
//	      imgDetailD    = "imgDetail" + i + "_Disable";
//	      divDetail     = "divDetail"+i;
//        document.getElementById(tableDetail).style.visibility   = "hidden";
//        document.getElementById(imgDetailE).style.visibility    = "hidden";
//        document.getElementById(imgDetailD).style.visibility    = "visible";
//        document.getElementById(divDetail).style.color          = "gray";
          OV_OutputInfos[i].Disable();
//070322 HSK古場 UPDATE-ED
        }
	      break;
	    case 1:   //活性
	      document.getElementById("TABLE_UpdateBtn").style.visibility       = "visible";
	      document.getElementById("IMG_UpdateBtn_Enable").style.visibility  = "visible";
	      document.getElementById("IMG_UpdateBtn_Disable").style.visibility = "hidden";
	      document.getElementById("DIV_UpdateText").style.color     = "black";
        // 2005/12/20 H.SAITO -ST-
        // データ取得前に押下されないようにする
	      document.getElementById("TABLE_CancelBtn").style.visibility       = "visible";
	      document.getElementById("DIV_CancelText").style.color             = "black";
        // 2005/12/20 H.SAITO -ED-

        //着目している出力装置に対応するボタン全てを活性
        for(i=0; i<DisplayCount; i++){
//070322 HSK古場 UPDATE-ST
//	      tableDetail   = "TABLE_DetailBtn" + i;
//	      imgDetailE    = "imgDetail" + i + "_Enable";
//	      imgDetailD    = "imgDetail" + i + "_Disable";
//	      divDetail     = "divDetail"+i;
//        document.getElementById(tableDetail).style.visibility   = "visible";
//        document.getElementById(imgDetailE).style.visibility    = "visible";
//        document.getElementById(imgDetailD).style.visibility    = "hidden";
//        document.getElementById(divDetail).style.color          = "black";
//          OV_OutputInfos[i].Enable();
          OV_OutputInfos[i].UpdateEnable();
//070322 HSK古場 UPDATE-ED
        }
	      break;

//070322 HSK古場 ADD-ST
      case 2:   //活性（CR画像以外）

        document.getElementById("TABLE_UpdateBtn").style.visibility       = "visible";
        document.getElementById("IMG_UpdateBtn_Enable").style.visibility  = "visible";
        document.getElementById("IMG_UpdateBtn_Disable").style.visibility = "hidden";
        document.getElementById("DIV_UpdateText").style.color     = "black";
        // データ取得前に押下されないようにする
        document.getElementById("TABLE_CancelBtn").style.visibility       = "visible";
        document.getElementById("DIV_CancelText").style.color             = "black";
 
        //着目している出力装置に対応するボタン全てを活性
        for(i=0; i<DisplayCount; i++){
          var isAvailableDevice = OV_IsAvailableDevice(OV_OutputInfos[i].GetDeviceType());
//          OV_OutputInfos[i].Enable(isAvailableDevice);
          OV_OutputInfos[i].UpdateEnable();
        }
        break;
//070322 HSK古場 ADD-ED

	    default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+18);
	      break;
	  }
	}
	catch(e){
     Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+19);
	}
}

//*****************************************************************************
// Fn_UpdateExec
//
// １．機能 
//      修正を実施する
// ２．戻り値
//　　  無し 
// ３．備考 
//*****************************************************************************
function Fn_UpdateExec(){
  try{
    //処理中表示
    Public_Message("DIALOG", ProcString);
    //タイマ予約 
    UpdateTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+10) +")", UPDATE_TIMEOUT);

    if(parent.isModifyCtrlCE){
		  var pp = parent.FRAME_PROC.frmUpdate;
    }
    //(既存処理)
    else{
      var pp = parent.OUTPUT_UPDATE_PROC.frmUpdate;
    }
    var deviceCode = "";
    var deviceType = "";
    var deviceReqClass = "";
    var deviceDensity = "";
    var devicePicCompType = "";
    var devicePicProcessType = "";
    var devicePicProcessParam = "";
    var deviceFlag = "";
    var deviceStatus = "";
    var deviceTiming = "";

    for(i=0; i<parent.EditDeviceType.length; i++){
      switch(parent.EditOutputFlag[i]){
        // 出力有無がオフの場合は出力タイミングを強制的に「出力しない」にする
//070306 HSK山本 ADD-ST
        case FLAG_OUTPUT_EMPTY:
//070306 HSK山本 ADD-ED
        case FLAG_OUTPUT_NOUSE:
          parent.EditOutputTiming[i]    = FLAG_OUTPUT_NOOUT;                //出力タイミング
          break;
        // 出力有無がオンの場合,かつ,出力タイミングが「出力しない」の場合は
        // 出力タイミングを強制的に「確定時」にする
        case FLAG_OUTPUT_USE:     
          if(parent.EditOutputTiming[i] == FLAG_OUTPUT_NOOUT){
            parent.EditOutputTiming[i]  = FLAG_OUTPUT_DECISION;             //出力タイミング
          }
          break;
      }
      deviceCode            = deviceCode            + parent.EditDeviceCode[i];
      deviceType            = deviceType            + parent.EditDeviceType[i];
      deviceReqClass        = deviceReqClass        + parent.EditOutputReqClass[i];
      deviceDensity         = deviceDensity         + parent.EditOutputDensity[i];
      devicePicCompType     = devicePicCompType     + parent.EditOutputPicCompType[i];
      devicePicProcessType  = devicePicProcessType  + parent.EditOutputPicProcessType[i];
      devicePicProcessParam = devicePicProcessParam + parent.EditOutputPicProcessParam[i];
      deviceFlag            = deviceFlag            + parent.EditOutputFlag[i];
      deviceStatus          = deviceStatus          + parent.EditOutputStatus[i];
      deviceTiming          = deviceTiming          + parent.EditOutputTiming[i];

        deviceCode            = deviceCode            + ",";
        deviceType            = deviceType            + ",";
        deviceReqClass        = deviceReqClass        + ",";
        deviceDensity         = deviceDensity         + ",";
        devicePicCompType     = devicePicCompType     + ",";
        devicePicProcessType  = devicePicProcessType  + ",";
        devicePicProcessParam = devicePicProcessParam + ",";
        deviceFlag            = deviceFlag            + ",";
        deviceStatus          = deviceStatus          + ",";
        deviceTiming          = deviceTiming          + ",";
    }
    pp.studySequence.value         = parent.StudySequence;
    pp.outputPriority.value        = parent.EditPrintPriority;         //優先出力 
    pp.outputCopies.value          = parent.EditOutputCopies;          //プリント枚数
    pp.deviceCode.value            = deviceCode;            //出力先装置コード 
    pp.deviceType.value            = deviceType;          //出力先タイプ 
    pp.outputReqClass.value        = deviceReqClass;        //出力依頼区分 
    pp.outputDensity.value         = deviceDensity;         //画像密度
    pp.outputPicCompType.value     = devicePicCompType;     //画像圧縮タイプ 
    pp.outputPicProcessType.value  = devicePicProcessType;  //画像処理タイプ 
    pp.outputPicProcessParam.value = devicePicProcessParam; //画像処理パラメータ
    pp.outputFlag.value            = deviceFlag;            //出力有無
    pp.outputStatus.value          = deviceStatus;          //出力状況 
    pp.outputTiming.value          = deviceTiming;          //出力タイミング
    pp.studyStatus.value           = parent.StudyStatus;
//070607 HSK古場 PVCS#2281 UPDATE-ST
//    pp.loginUserId.value           = escape(top.LoginUserId);
    pp.loginUserId.value           = encodeURIComponent(top.LoginUserId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
    pp.loginTime.value             = top.LoginTime;
    pp.submit();
    pp = null;
    //修正完了フラグを修正完了とする
    parent.ModifyStatusFlag = 1;
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+20);
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_NOLOGIN,FILE_NAME,SPOT_CODE+21)
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_LOGOFF,FILE_NAME,SPOT_CODE+22)
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_DIFERENT,FILE_NAME,SPOT_CODE+23)
				return;
			//操作権限がない 
			case CHECK_AUTHORITY_ERROR_AUTHORITY:
                Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MESSAGE_ID_FORBIDDEN,""), top.DispFrame.Public_GetLangMsgTitle2(MESSAGE_ID_FORBIDDEN,""),top.DispFrame.Public_GetLangMsgString(MESSAGE_ID_FORBIDDEN,"Cannt Get Message.")); 
				return;
			default:
				Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+24);
				return;
		}
	}catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+25);
	}	
}
//20050609(PVCS#350)EN
//070319 HSK山本 DEL-ST
////070302 HSK山本 ADD-ST
///**
// *  @private
// *  @return 重複した装置タイプ（重複していない場合は、null） 
// *  重複しているタイプがないかチェックする 
// *  装置コードが重複しているが、タイプが異なる場合はFATAL_ERROR
// **/
//function OV_CheckDuplicateOutputType()
//{
//    var outputNum = parent.EditDeviceCode.length;
//    for(var i = 0;i < outputNum;i++){
//        for(var j = i+1 ;j < outputNum;j++){
//            if(parent.EditDeviceCode[i] != "" && parent.EditDeviceCode[i] == parent.EditDeviceCode[j]){//重複している 
//                //タイプをチェック（同じはず） 
//                if(parent.EditDeviceType[i] == parent.EditDeviceType[j]){
//                    return parent.EditDeviceType[i];
//                }else{
//                    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+28);
//                }
//            }
//        }
//    }
//    return null;
//}
////070302 HSK山本 ADD-ED
//070319 HSK山本 DEL-ED

//070614 HSK山本 PVCS#2342 ADD-ST
//*****************************************************************************
// OnClickErrorButton
//
// １．機能 
//      エラーダイアログボタン押下 
// ２．戻り値
//      無し 
// ３．備考 
//      無し

//*****************************************************************************
function OnClickErrorButton()
{
    try{
        Public_CloseError();
        if(OV_BackByError){
            OV_BackByError = false;
            //戻るボタン押下イベント実行 
            Fn_OnButton(91);
        }
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+30);
    }
}

//*****************************************************************************
// OV_CheckedOutputExclusiveNotification
//
// １．機能 
//      出力排他チェック完了通知 
// ２．戻り値 
//      無し 
// ３．備考 
//      出力排他チェックの結果を受け取る通知関数
//      OV_CheckOutputExclusiveにコールバック指定する

//*****************************************************************************
function OV_OutputExclusiveCheckedNotification(returnOutputStatus)
{
    try{
        //エラーのチェックを行う 
        if(returnOutputStatus == 1){    //出力中 
            OV_BackByError = true;//エラー後戻る

            Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_ID_OUTPUT_EXCL,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_ID_OUTPUT_EXCL,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_ID_OUTPUT_EXCL,"Cannt Get Message."));
        }else{
            Public_Init();
        }
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+32);
    }
}

//*****************************************************************************
// OV_CheckOutputExclusive
//
// １．機能 
//      出力排他チェック 
// ２．戻り値 
//      無し 
// ３．備考 
//      サーバ要求結果は、callback指定した関数に通知される。 
//*****************************************************************************
function OV_CheckOutputExclusive(callback)
{
    try{
        if(callback){
            OV_CheckOutputExclusiveCallback = callback;
        }
        Public_Message("DIALOG", ProcString);
        //タイマ予約 
        //2010/11/22 30501エラー改善対応 MOD ST
        OV_GetdateTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS_EXCLUSIVE+",'"+FILE_NAME+"',"+ (SPOT_CODE+31) +")", UPDATE_TIMEOUT);
        //2010/11/22 30501エラー改善対応 MOD ED
        if(parent.isModifyCtrlCE){
          Public_Message("NODIALOG", ""); 
        }
        parent.EXCLUSIVE_PROC.Public_OutputExclusive(PROC_MODE, parent.StudySequence, 1);
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+33);
    }
}

//*****************************************************************************
// Public_EndOutputExclusive
//
// １．機能 
//      出力排他チェック処理後の処理 
// ２．戻り値 
//      無し 
// ３．備考 
//      出力排他チェック完了後、サーバより指定される関数 
//*****************************************************************************
function Public_EndOutputExclusive(returnOutputStatus){
    try{
        //タイマ予約解除 
        clearTimeout(OV_GetdateTimeOutId);
        Public_CloseMessage();
        //出力排他チェックが終了したことを通知
        if(OV_CheckOutputExclusiveCallback){
            OV_CheckOutputExclusiveCallback(returnOutputStatus);
        }
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+34);
    }
}
//070614 HSK山本 PVCS#2342 ADD-ED
