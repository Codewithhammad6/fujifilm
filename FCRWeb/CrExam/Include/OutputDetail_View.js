/****************************************************************************

  @file OutputDetail_View.js

  @brief OutputDetail_Viewのクライアントスクリプト

  @author YSK畑 
        SpotCode MAX 26

  Copyright(C) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/10  YSK畑       V1.0       新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応 
  @date  07/03/06  HSK山本     V2.0       DicomStorage機能 
  @date  07/03/19  HSK山本     V2.0       DicomStorage機能 装置台数６→５対応 
  @date  07/03/22  HSK古場     V2.0       内視鏡画像取り込み機能 
  @date  07/11/05  HSK山本     V3.0       PVCS#2519対応 
  @date  09/12/01  FFS黒田     V1.1(B)    患者情報項目追加
  @date  11/10/25  FF奥野      V2.2(B)    新画像処理対応

*****************************************************************************/
//[定数]
var PROC_MODE            = "OUTPUTDETAIL_VIEW";
var UPDATE_TIMEOUT       = 5000;					//更新処理タイムアウト時間       
var COMMAND_MODE_UPDATE  = "UPDATE";			//更新文字 
var COMMAND_MODE_CANCEL  = "CANCEL";			//キャンセル文字 

// 出力タイプ 
var OUTPUT_TYPE_MEDIA   = "MEDIA";			// メディア
var OUTPUT_TYPE_PRINTER = "PRINTER";		// プリンタ
var OUTPUT_TYPE_CARNA   = "CARNA";			// C@Rna
var OUTPUT_TYPE_FILE    = "KARTE";			// 汎用ファイル
//070306 HSK山本 ADD-ST
var OUTPUT_TYPE_STORAGE    = "STORAGE";		// DicomStorage
//070306 HSK山本 ADD-ED
// オプションキーフラグ
var OPTION_USE   = 1;			//オプション有 
var OPTION_NOUSE = 0;			//オプション無 
// 出力有無
var FLAG_OUTPUT_USE = 1;
//070306 HSK山本 ADD-ST
var FLAG_OUTPUT_EMPTY = -1;
//070306 HSK山本 ADD-ED
// 出力状況 
var FLAG_STATUS_OUTPUT = 1;
// 出力タイミング
//2005/03/21 006 H.SAITO
//var FLAG_OUTPUT_DECISION = 1;
//var FLAG_OUTPUT_CONFIRM  = 0;
var FLAG_OUTPUT_NOOUT    = "0"; // 出力しない 
var FLAG_OUTPUT_CONFIRM  = "1"; // 確認時
var FLAG_OUTPUT_DECISION = "2"; // 確定時
// 出力密度
var OUTPUT_DENSITY_HIGH     = "HQ";
var OUTPUT_DENSITY_STANDERD = "ST";
//出力区分 
var FLAG_REQCLASS_ADMIN = 1;
var FLAG_REQCLASS_WORK  = 0;
// 出力枚数
var COUNT_OUTPUT_MAX = 9;
var COUNT_OUTPUT_MIN = 1;
// 出力先表示数
var DISPLAY_COUNT = 4;
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード 
var FILE_NAME = "OutputDetail_View.js";  //ファイル名 
var MESSAGE_ID = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS   = 30501;              //メッセージID 
// 操作ログ
var CTRL_OUTPUT_DISTINATION		= "OutputDistination"; // 出力先
var CTRL_AT_DECIDE						= "AtDecide";          // 確定時に出力 
var CTRL_AT_CONFIRM						= "AtConfirm";         // 確認時に出力 
var CTRL_NORMALQUALITY				= "NormalQuality";     // 通密 
var CTRL_HIGHQUALITY					= "HighQuality";       // 高密 
var CTRL_COUNTUP							= "CountUp";           // 出力枚数↑ 
var CTRL_COUNTDOWN						= "CountDown";         // 出力枚数↓ 
var CTRL_UPDATE								= "Update";            // 設定 
// 検査取得フラグ
var FLAG_STUDY_GETDATA   = 1;					// 検査取得 
var FLAG_STUDY_NOGETDATA = 0;					// 検査未取得 
//画像パス
var IMG_COMBOBOX_DOWN           = "../Bmp/cmPullDownBtnD.gif";
var IMG_COMBOBOX_UP             = "../Bmp/cmPullDownBtnU.gif";
// 2005/08/10 Kanno UPDATE ST デザイン修正
//var IMG_OUTPUT_CONFIRM_DOWN     = "../Bmp/cmSquare2BtnD.gif";
//var IMG_OUTPUT_CONFIRM_UP       = "../Bmp/cmSquare2BtnU.gif";
//var IMG_OUTPUT_CONFIRM_DISABLE  = "../Bmp/cmSquare2BtnX.gif";
//var IMG_OUTPUT_DECISION_DOWN    = "../Bmp/cmSquare2BtnD.gif";
//var IMG_OUTPUT_DECISION_UP      = "../Bmp/cmSquare2BtnU.gif";
//var IMG_OUTPUT_DECISION_DISABLE = "../Bmp/cmSquare2BtnX.gif";
var IMG_OUTPUT_CONFIRM_DOWN     = "../Bmp/cmSquare7BtnD.gif";
var IMG_OUTPUT_CONFIRM_UP       = "../Bmp/cmSquare7BtnU.gif";
var IMG_OUTPUT_CONFIRM_DISABLE  = "../Bmp/cmSquare7BtnX.gif";
var IMG_OUTPUT_DECISION_DOWN    = "../Bmp/cmSquare7BtnD.gif";
var IMG_OUTPUT_DECISION_UP      = "../Bmp/cmSquare7BtnU.gif";
var IMG_OUTPUT_DECISION_DISABLE = "../Bmp/cmSquare7BtnX.gif";
// 2005/08/10 Kanno UPDATE ED デザイン修正
// 2005/07/04 009 H.SAITO HQオプション対応に伴うデザイン変更
//var IMG_DENSITY_HIGH_DOWN       = "../Bmp/cmSquare2BtnD.gif";
//var IMG_DENSITY_HIGH_UP         = "../Bmp/cmSquare2BtnU.gif";
//var IMG_DENSITY_MID_DOWN        = "../Bmp/cmSquare2BtnD.gif"
//var IMG_DENSITY_MID_UP          = "../Bmp/cmSquare2BtnU.gif"
var IMG_DENSITY_HIGH_DOWN       = "../Bmp/cmSquare6BtnD.gif";
var IMG_DENSITY_HIGH_UP         = "../Bmp/cmSquare6BtnU.gif";
var IMG_DENSITY_MID_DOWN        = "../Bmp/cmSquare6BtnD.gif"
var IMG_DENSITY_MID_UP          = "../Bmp/cmSquare6BtnU.gif"
var IMG_COUNTUP_DOWN            = "../Bmp/cmUpPage3BtnD.gif";
var IMG_COUNTUP_UP              = "../Bmp/cmUpPage3BtnU.gif";
var IMG_COUNTUP_DISABLE         = "../Bmp/cmUpPage3BtnX.gif";
var IMG_COUNTDOWN_DOWN          = "../Bmp/cmDownPage3BtnD.gif";
var IMG_COUNTDOWN_UP            = "../Bmp/cmDownPage3BtnU.gif";
var IMG_COUNTDOWN_DISABLE       = "../Bmp/cmDownPage3BtnX.gif";
var IMG_BACK_DOWN               = "../Bmp/cmOvalAPaleLBtnD.gif"
var IMG_BACK_UP                 = "../Bmp/cmOvalAPaleLBtnU.gif"
var IMG_BACK_DISABLE            = "../Bmp/cmOvalAPaleLBtnX.gif"
var IMG_NEXT_DOWN               = "../Bmp/cmCirBGreenBtnD.gif"
var IMG_NEXT_UP                 = "../Bmp/cmCirBGreenBtnU.gif"
var IMG_NEXT_DISABLE            = "../Bmp/cmCirBGreenBtnX.gif"

//ImageKind
var IMAGEKIND_FDXIMAGE     = "2";	// FDX画像 V2.2(B) FF奥野 新画像処理対応ADD
//[変数]
var UpdateTimeOutId;      //ChangeImgUpdateタイムアウトプロセスのＩＤ
var Index = 0;            // 選択されている項目のインデックス
var ListBackColor = "CCFFCC";       // 選択された項目の背景
var SizeComboBoxWidth = 345;  // コンボボックスの幅 
var SizeComboBoxTop  = 30;    // コンボボックスのTOP
var SizeComboBoxLeft = 250;   // コンボボックスのLEFT
//070306 HSK山本 UPDATE-ST
//var ArrayDisplay     = new Array();  // コンボボックスのDisplay
//var ArrayValue       = new Array();  // コンボボックスのValue
var ArrayDeviceInfo    = new Array();  // コンボボックスの装置情報
//070306 HSK山本 UPDATE-ED
var DeviceName  = "";       //装置名称
var DeviceCode  = "";       //装置コード 
var TimingFlag  = FLAG_OUTPUT_DECISION;   //出力タイミング
var DensityFlag = OUTPUT_DENSITY_STANDERD;//出力密度
var ReqClass    = FLAG_REQCLASS_ADMIN;  //出力区分 
var OutputCount = 0;
var ViewMode    = "";		// 詳細画面表示出力タイプ 
var OutputArr   = ""; 
//070306 HSK山本 ADD-ST
//var PrinterCount = 0;   //プリンタ装置数
var DeviceCount = 0;   //コンボボックスに表示する装置数
//070306 HSK山本 ADD-ED
//*****************************************************************************
// Fn_InitPage
//
// １．機能
//     ・ページロード時の処理 
//     ・ボタン名の初期表示を行う
//
// ２．戻り値
//　　  なし 
//
// ３．備考 
//*****************************************************************************
function Fn_InitPage(){
	try{
        //画面遷移開始通知設定 
        SetViewMovingNotification(ViewMovingNotification);

		//文字列表示
		document.getElementById("divOutputDevice0").innerText = Label_OutputDevice;
		document.getElementById("divOutputDevice1").innerText = Label_OutputTiming;
		document.getElementById("divOutputDevice2").innerText = Label_OutputCount;
		document.getElementById("divOutputDevice3").innerText = Label_OutputDeDensity;
		document.getElementById("DIV_ConfirmText").innerText  = Timing_Confirm;
		document.getElementById("DIV_DecisionText").innerText = Timing_Decision;

		document.getElementById("DIV_HighText").innerText = Density_High;
		document.getElementById("DIV_MidText").innerText  = Density_Mid;

		document.getElementById("DIV_UpdateText").innerText = Label_Button_Next;
		document.getElementById("DIV_CancelText").innerText = Label_Button_Back;
    //フォント名,フォントサイズの設定 
    document.getElementById("BODY").style.fontFamily    = FONT_NAME;
    // 2005/06/24 022 H.SAITO デザイン変更対応（フォントサイズ） 
    //document.getElementById("BODY").style.fontSize      = FONT_SIZE + "px";
		document.getElementById("divOutputDevice0").style.fontSize = FONT_SIZE_CAPTION;
		document.getElementById("divOutputDevice1").style.fontSize = FONT_SIZE_CAPTION;
		document.getElementById("divOutputDevice2").style.fontSize = FONT_SIZE_CAPTION;
		document.getElementById("divOutputDevice3").style.fontSize = FONT_SIZE_CAPTION;
		document.getElementById("divOutputCount").style.fontSize   = FONT_SIZE_INPUTBOX;
    // ボタン
		document.getElementById("DIV_ConfirmText").style.fontSize  = FONT_SIZE_BUTTON;
		document.getElementById("DIV_DecisionText").style.fontSize = FONT_SIZE_BUTTON;
		document.getElementById("DIV_HighText").style.fontSize     = FONT_SIZE_BUTTON;
		document.getElementById("DIV_MidText").style.fontSize      = FONT_SIZE_BUTTON;
		document.getElementById("DIV_UpdateText").style.fontSize   = FONT_SIZE_BUTTON;
		document.getElementById("DIV_CancelText").style.fontSize   = FONT_SIZE_BUTTON;
    // その他 
		document.getElementById("TD_ProcText").style.fontSize      = FONT_SIZE_OTHER;
		document.getElementById("divheader").style.fontSize        = FONT_SIZE_INPUTBOX; // コンボボックス選択行    
		document.getElementById("TD_ErrorText").style.fontSize     = FONT_SIZE_OTHER;
		document.getElementById("DIV_ErrorOkText").style.fontSize  = FONT_SIZE_BUTTON;
    document.getElementById("TD_ErrorTitle1").style.fontSize   = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorTitle2").style.fontSize   = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorText").style.fontSize     = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorCode").style.fontSize     = FONT_SIZE_OTHER;


    //フィルタ解除
		Public_CloseMessage();
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
	}
}
//*****************************************************************************
// Public_Init(paramData : 画面表示タイプ)
//
// １．機能
//     画面を表示する
//
// ２．戻り値
//　　  なし 
//
// ３．備考 
//*****************************************************************************
function Public_Init(paramData){
	try{
		//初期化 
		Fn_Init();

	  //表示タイプ 
		ViewMode = paramData[0];
		//編集する出力装置配列
		OutputArr = paramData[1];
		Public_EndGetData();

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

 		var pp = parent.INFORMATION_VIEW;
//2005/05/24-ST==========
//		pp.Public_SetUserGuidance(UserGuidanceString); 
		pp.Public_SetUserGuidance(UserGuidanceString,1); 
//2005/05/24-EN==========
		//患者情報表示
		pp.Public_SetPatientId(parent.PatientId); 
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update Start
//		pp.Public_SetPatientSex(parent.PatientSex);
		pp.Public_SetPatientSex(parent.PatientSex, parent.PatientsSexNeutred);
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update End
		pp.Public_SetPatientName(parent.PatientName, parent.PatientKanjiName);   
		pp.Public_SetPatientBirthDate(parent.PatientBirthDate);
		pp.Public_SetPatientAge(parent.PatientAge);
		pp = null;

		// 出力先画面作成
		InitScreenDisp();

		// 出力先情報を表示
		InitInfoDisp();
 }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
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
        Public_Init(notifyInfo.paramData);
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
    }
}

//070327 HSK古場 ADD-ST
//*****************************************************************************
// ODV_DensityDisable
//
// １．機能
//     ・出力密度を設定する項目一式を不活性にする
//
// ２．戻り値
//     なし 
//
// ３．備考 
//*****************************************************************************
function ODV_DensityDisable(){
    document.getElementById("divOutputDevice3").style.color = "gray";
    document.getElementById("divOutputDevice3").disabled = true;
    document.getElementById("IMG_HighBtn").src = IMG_DENSITY_HIGH_UP;
    document.getElementById("IMG_MidBtn").src  = IMG_DENSITY_MID_UP;
    document.getElementById("DIV_DensityHighBtn").disabled = true;
    document.getElementById("DIV_DensityMidBtn").disabled = true;
}
//070327 HSK古場 ADD-ED

//*****************************************************************************
// InitScreenDisp
//
// １．機能
//     ・ページロード時に出力先画面を作成
//
// ２．戻り値
//　　  なし 
//
// ３．備考 
//*****************************************************************************
function InitScreenDisp(){
    try{
        // コンボボックスのサイズ、位置設定 
        document.getElementById("tblHead").style.width   = SizeComboBoxWidth;
        document.getElementById("divHeader").style.width = SizeComboBoxWidth-8;
        document.getElementById("tblHead").style.top     = SizeComboBoxTop;
        document.getElementById("tblHead").style.left    = SizeComboBoxLeft;

        // コンボボックスボタン非表示
        document.getElementById("pull").style.visibility = "hidden";	
        // 出力枚数非表示
        document.getElementById("divOutputDevice2").style.visibility = "hidden";
        document.getElementById("tblOutputCount").style.visibility   = "hidden";
        document.getElementById("IMG_UpBtn_Enable").style.visibility    = "hidden";
        document.getElementById("IMG_UpBtn_Disable").style.visibility   = "hidden";
        document.getElementById("IMG_DownBtn_Enable").style.visibility  = "hidden";
        document.getElementById("IMG_DownBtn_Disable").style.visibility = "hidden";
        // 出力密度非表示
        document.getElementById("divOutputDevice3").style.visibility   = "hidden";
        document.getElementById("DIV_DensityHighBtn").style.visibility = "hidden";
        document.getElementById("DIV_DensityMidBtn").style.visibility  = "hidden";

        switch(ViewMode){
            case OUTPUT_TYPE_MEDIA:// メディアの場合 
            // 出力密度表示
            if(OptionHQ == OPTION_USE){
//070322 HSK古場 ADD-ST
                if(parent.ImageKind != parent.IMAGEKIND_FCRIMAGE
                 && parent.ImageKind != IMAGEKIND_FDXIMAGE){ //V2.2(B) FF奥野 新画像処理対応ADD
                    //CR画像以外の場合は、出力密度を設定する項目一式を不活性にする
                    ODV_DensityDisable();
                }
//070322 HSK古場 ADD-ED
                document.getElementById("divOutputDevice3").style.visibility   = "visible";
                document.getElementById("DIV_DensityHighBtn").style.visibility = "visible";
                document.getElementById("DIV_DensityMidBtn").style.visibility  = "visible";
            }
            //確認ボタン不活性
            Fn_TimingEnable(0);       
            break;
            case OUTPUT_TYPE_PRINTER: 	// プリンタの場合 
//  		  PrinterCount = parent.OUTPUT_VIEW.OutputAliasPrinter.length;
//070306 HSK山本 UPDATE-ST
//処理を関数化(性能維持のため前コードは削除) 
            //コンボボックス生成 
            ODV_CreateDeviceComboBox(ViewMode);
//070306 HSK山本 UPDATE-ED
			  // 出力密度表示
//			  document.getElementById("divOutputDevice3").style.visibility   = "visible";
//			  document.getElementById("DIV_DensityHighBtn").style.visibility = "visible";
//			  document.getElementById("DIV_DensityMidBtn").style.visibility  = "visible";
            // 出力枚数表示
            document.getElementById("divOutputDevice2").style.visibility = "visible";
            document.getElementById("tblOutputCount").style.visibility   = "visible";
            //確認ボタン活性
            Fn_TimingEnable(1);
            break;       
            case OUTPUT_TYPE_CARNA: //C@Rna
            //確認ボタン不活性
            Fn_TimingEnable(0);       
            break;
            case OUTPUT_TYPE_FILE: //汎用ファイル
            //確認ボタン活性
//070322 HSK古場 UPDATE-ST
//          Fn_TimingEnable(1);       
            if(parent.ImageKind == parent.IMAGEKIND_FCRIMAGE
              || parent.ImageKind == IMAGEKIND_FDXIMAGE){ //V2.2(B) FF奥野 新画像処理対応ADD
              Fn_TimingEnable(1);
            }else{
              Fn_TimingEnable(0);
            }
//070322 HSK古場 UPDATE-ED
            break;
//070306 HSK山本 ADD-ST
            case OUTPUT_TYPE_STORAGE://Storage
            //コンボボックス生成 
            ODV_CreateDeviceComboBox(ViewMode);
            // 出力密度表示
            if(OptionHQ == OPTION_USE){
//070322 HSK古場 ADD-ST
                if(parent.ImageKind != parent.IMAGEKIND_FCRIMAGE
                 && parent.ImageKind != IMAGEKIND_FDXIMAGE){ //V2.2(B) FF奥野 新画像処理対応ADD
                    //CR画像以外の場合は、出力密度を設定する項目一式を不活性にする
                    ODV_DensityDisable();
                }
//070322 HSK古場 ADD-ED
                document.getElementById("divOutputDevice3").style.visibility   = "visible";
                document.getElementById("DIV_DensityHighBtn").style.visibility = "visible";
                document.getElementById("DIV_DensityMidBtn").style.visibility  = "visible";
            }
            //確認ボタン不活性
            Fn_TimingEnable(0);       
            break;
//070306 HSK山本 ADD-ED
            default:                
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
            break;  
        }
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
    }
}
//*****************************************************************************
// InitInfoDisp
//
// １．機能
//     ・出力先の情報を表示
//
// ２．戻り値
//　　  なし 
//
// ３．備考 
//*****************************************************************************
function InitInfoDisp(){
    try{
        var typeFlag = 0; //情報取得フラグ

        switch(ViewMode){
            case OUTPUT_TYPE_MEDIA: //メディア
            if(parent.EditDeviceType[OutputArr] == OUTPUT_TYPE_MEDIA){
                DeviceName  = parent.EditDeviceName[OutputArr];
                DeviceCode  = parent.EditDeviceCode[OutputArr];
                TimingFlag  = parent.EditOutputTiming[OutputArr];
                DensityFlag = parent.EditOutputDensity[OutputArr];
                ReqClass    = parent.EditOutputReqClass[OutputArr];
                typeFlag = 1;
            }
            //情報未取得の場合 
            if(typeFlag == 0){
//			    DeviceName　= parent.OUTPUT_VIEW.OutputAliasMediaDefName;
//			    DeviceCode  = parent.OUTPUT_VIEW.OutputAliasMediaDefNo;
                DeviceName  = parent.OutputAliasMedia;
                DeviceCode  = parent.OutputAliasMediaNo;
                ReqClass    = FLAG_REQCLASS_ADMIN;  //出力区分 
            }
            //装置名称表示
            document.getElementById("divHeader").innerText = DeviceName;
            // 出力タイミング表示
            SelectTiming(TimingFlag);
            //出力密度表示
            SelectDensity(DensityFlag);
            break;
            case OUTPUT_TYPE_PRINTER: //プリンタ
//070306 HSK山本 DEL-ST
//            var selectPrint = 0;
//070306 HSK山本 DEL-ED
            // 現在選択されている装置を表示
            if(parent.EditDeviceType[OutputArr] == OUTPUT_TYPE_PRINTER){
                DeviceName  = parent.EditDeviceName[OutputArr];
                DeviceCode  = parent.EditDeviceCode[OutputArr];
                TimingFlag  = parent.EditOutputTiming[OutputArr];
                DensityFlag = parent.EditOutputDensity[OutputArr];
                ReqClass    = parent.EditOutputReqClass[OutputArr];
                typeFlag = 1;
            }
            //情報未取得の場合 
            if(typeFlag == 0){
//			    DeviceName　= parent.OUTPUT_VIEW.OutputAliasPrinterDefName;
//			    DeviceCode  = parent.OUTPUT_VIEW.OutputAliasPrinterDefNo;
                //コンボボックスで選択できるため、未取得時は先頭のプリンタをデフォルトとする
                if(parent.OutputAliasPrinter.length > 0){
                    DeviceName  = parent.OutputAliasPrinter[0];
                    DeviceCode  = parent.OutputAliasPrinterNo[0];
                }
                else{
                    DeviceName  = "";
                    DeviceCode  = "";
                }
                ReqClass    = FLAG_REQCLASS_ADMIN;  //出力区分 
            }
//070306 HSK山本 UPDATE-ST
//処理関数化(性能維持のため前コード削除) 
            //装置名称表示(コンボボックス選択) 
            ODV_SelectDeviceComboBoxWithCode(DeviceCode);
//070306 HSK山本 UPDATE-ED
            // 出力タイミング表示
            SelectTiming(TimingFlag);
            //出力密度表示
            SelectDensity(DensityFlag);
            //出力枚数
            OutputCount = parent.EditOutputCopies;
            // 出力枚数ボタン活性・不活性
            SetOutputCountBtn();
            document.getElementById("divOutputCount").innerText = OutputCount;
            break;
            case OUTPUT_TYPE_CARNA: //C@Rna
            if(parent.EditDeviceType[OutputArr] == OUTPUT_TYPE_CARNA){
                DeviceName  = parent.EditDeviceName[OutputArr];
                DeviceCode  = parent.EditDeviceCode[OutputArr];
                TimingFlag  = parent.EditOutputTiming[OutputArr];
//070327 HSK山本 ADD-ST
                DensityFlag = parent.EditOutputDensity[OutputArr];
//070327 HSK山本 ADD-ED
                ReqClass    = parent.EditOutputReqClass[OutputArr];
                typeFlag    = 1;
            }
            //情報未取得の場合 
            if(typeFlag == 0){
//			    DeviceName　= parent.OUTPUT_VIEW.OutputAliasCarna;
                DeviceName  = parent.OutputAliasCarna;
                DeviceCode  = OUTPUT_TYPE_CARNA;
                ReqClass    = FLAG_REQCLASS_ADMIN;  //出力区分 
            }
            // 装置名表示
            document.getElementById("divHeader").innerText = DeviceName;
            // 出力タイミング表示
            SelectTiming(TimingFlag);
//070327 HSK山本 ADD-ST
            //出力密度表示
            SelectDensity(DensityFlag);
//070327 HSK山本 ADD-ED
            break;
            case OUTPUT_TYPE_FILE:  //汎用ファイル
            if(parent.EditDeviceType[OutputArr] == OUTPUT_TYPE_FILE){
                DeviceName  = parent.EditDeviceName[OutputArr];
                DeviceCode  = parent.EditDeviceCode[OutputArr];
                TimingFlag  = parent.EditOutputTiming[OutputArr];
                ReqClass    = parent.EditOutputReqClass[OutputArr];
                typeFlag = 1;
            }
            //情報未取得の場合 
            if(typeFlag == 0){
//			    DeviceName　= parent.OUTPUT_VIEW.OutputAliasFile;
                DeviceName  = parent.OutputAliasFile;
                DeviceCode  = OUTPUT_TYPE_FILE;
                ReqClass    = FLAG_REQCLASS_ADMIN;  //出力区分 
            }
            // 装置名表示
            document.getElementById("divHeader").innerText = DeviceName;
            // 出力タイミング表示
            SelectTiming(TimingFlag);
            break;
//070306 HSK山本 ADD-ST
            case OUTPUT_TYPE_STORAGE:  //DicomStorage
            // 現在選択されている装置を表示
            if(parent.EditDeviceType[OutputArr] == OUTPUT_TYPE_STORAGE){
                DeviceName  = parent.EditDeviceName[OutputArr];
                DeviceCode  = parent.EditDeviceCode[OutputArr];
                TimingFlag  = parent.EditOutputTiming[OutputArr];
                DensityFlag = parent.EditOutputDensity[OutputArr];
                ReqClass    = parent.EditOutputReqClass[OutputArr];
                typeFlag = 1;
            }
            //情報未取得の場合 
            if(typeFlag == 0){
                //コンボボックスで選択できるため、未取得時は先頭の装置をデフォルトとする 
                if(parent.OutputAliasStorage.length > 0){
                    DeviceName  = parent.OutputAliasStorage[0];
                    DeviceCode  = parent.OutputAliasStorageNo[0];
                }
                else{
                    DeviceName  = "";
                    DeviceCode  = "";
                }
                ReqClass    = FLAG_REQCLASS_ADMIN;  //出力区分 
//070327 HSK山本 ADD-ST
//SelectDensity()で、オプションの有無より決定する 
                DensityFlag = "";
//070327 HSK山本 ADD-ED
            }
            //コンボボックス選択 
            ODV_SelectDeviceComboBoxWithCode(DeviceCode);
            // 出力タイミング表示
            SelectTiming(TimingFlag);
            //出力密度表示
            SelectDensity(DensityFlag);
            break;
//070306 HSK山本 ADD-ED
            default:
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
            break;
        }     
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
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
        //初期化 
        UpdateTimeOutId  = null;

        document.getElementById("divComboBox").innerHTML = "";
//070306 HSK山本 UPDATE-ST
//        ArrayDisplay = new Array();  // コンボボックスのDisplay
//        ArrayValue   = new Array();  // コンボボックスのValue
        ArrayDeviceInfo   = new Array();  // コンボボックスの表示情報
//070306 HSK山本 UPDATE-ED

        DeviceName  = "";
        DeviceCode  = "";
        TimingFlag  = FLAG_OUTPUT_DECISION;
        DensityFlag = OUTPUT_DENSITY_STANDERD;
        ReqClass    = FLAG_REQCLASS_ADMIN;  //出力区分 
        OutputCount = COUNT_OUTPUT_MIN;
        ViewMode    = "";		// 詳細画面表示出力タイプ 
        OutputArr   = "";

//070306 HSK山本 UPDATE-ST
//    PrinterCount = 0;   //プリンタ装置数
        DeviceCount = 0;   //コンボボックスに表示する装置数
//070306 HSK山本 UPDATE-ST
   
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
    }
}

//*****************************************************************************
// ShowDrop(index : )
//
// １．機能
//     ・コンボボックススのリストを表示
//     ・選択されているIndexを色変更
//
// ２．戻り値
//　　  なし 
//
// ３．備考 
//*****************************************************************************
function ShowDrop(index) {
    try{
        //出力先がプリンタかつ装置数が1以上の場合 
//070306 HSK山本 UPDATE-ST
//        if(ViewMode == OUTPUT_TYPE_PRINTER && PrinterCount > 0){
        if((ViewMode == OUTPUT_TYPE_PRINTER || ViewMode == OUTPUT_TYPE_STORAGE) && DeviceCount > 0){
//070306 HSK山本 UPDATE-ED
            document.getElementById("ComboBoxFrame").style.visibility = "visible";
            document.getElementById("ComboBox").style.visibility      = "visible";
//070306 HSK山本 UPDATE-ST
//            for(i=0; i<ArrayDisplay.length; i++){
            for(i=0; i<ArrayDeviceInfo.length; i++){
//070306 HSK山本 UPDATE-ED
// 2005/03/22 008 H.SAITO
//              option1[i].bgColor = "";
//070306 HSK山本 UPDATE-ST
//                if(PrinterCount == 1){
                if(DeviceCount == 1){
//070306 HSK山本 UPDATE-ED
                    option1.bgColor = "";
                }
                else{
                    option1[i].bgColor = "";
                }
            }
            // 2005/03/22 008 H.SAITO
//          option1[Index].bgColor=ListBackColor;
//070306 HSK山本 UPDATE-ST
//            if(PrinterCount == 1){
            if(DeviceCount == 1){
//070306 HSK山本 UPDATE-ED
                option1.bgColor=ListBackColor;
            }
            else{
                option1[Index].bgColor=ListBackColor;
            }
        }
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
    }
}

//*****************************************************************************
// HideDrop( )
//
// １．機能
//     ・コンボボックススのリストを非表示
//
// ２．戻り値
//　　  なし 
//
// ３．備考 
//*****************************************************************************
function HideDrop() {
    try{
//070306 HSK山本 UPDATE-ST
//        if(ViewMode == OUTPUT_TYPE_PRINTER && PrinterCount > 0){
        if((ViewMode == OUTPUT_TYPE_PRINTER || ViewMode == OUTPUT_TYPE_STORAGE)&& DeviceCount > 0){
//070306 HSK山本 UPDATE-ED
            document.getElementById("ComboBoxFrame").style.visibility = "hidden";
            document.getElementById("ComboBox").style.visibility = "hidden";
        }
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+10);
    }
}

//*****************************************************************************
// SelectIndex( )
//
// １．機能
//     ・コンボボックススのリストを非表示要求 
//     ・選択されているIndexを選択、表示
//
// ２．戻り値
//　　  なし 
//
// ３．備考 
//*****************************************************************************
function SelectIndex(obj,index){
    try{
//070306 HSK山本 UPDATE-ST
//        if(ViewMode == OUTPUT_TYPE_PRINTER && PrinterCount > 0){
        if((ViewMode == OUTPUT_TYPE_PRINTER || ViewMode == OUTPUT_TYPE_STORAGE)&& DeviceCount > 0){
//070306 HSK山本 UPDATE-ED
            // 操作ログ出力 
            Fn_WriteLog(CTRL_OUTPUT_DISTINATION);
            //装置コード、装置名称を設定 
//070306 HSK山本 UPDATE-ST
//            DeviceCode = ArrayValue[index];
//            DeviceName = ArrayDisplay[index];     
            var deviceInfo = ArrayDeviceInfo[index];
            DeviceCode = deviceInfo.code;
            DeviceName = deviceInfo.name;
//070306 HSK山本 UPDATE-ED
            document.getElementById("divheader").innerText = DeviceName;
            Index = index;
            HideDrop();

        }
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+11);
    }
}

//*****************************************************************************
// SetIndexColor( )
//
// １．機能
//     ・フォーカスのあたったIndexの色変換
//
// ２．戻り値
//　　  なし 
//
// ３．備考 
//*****************************************************************************
function SetIndexColor(obj){
    try{
//070306 HSK山本 UPDATE-ST
//        if(ViewMode == OUTPUT_TYPE_PRINTER && PrinterCount > 0){
//            for(i=0; i<ArrayDisplay.length; i++){
// 2005/03/22 008 H.SAITO
//			  option1[i].bgColor = "";
//        if(PrinterCount == 1){
        if((ViewMode == OUTPUT_TYPE_PRINTER || ViewMode == OUTPUT_TYPE_STORAGE)&& DeviceCount > 0){
            for(i=0; i<ArrayDeviceInfo.length; i++){
                if(DeviceCount == 1){
//070306 HSK山本 UPDATE-ED
                    option1.bgColor = "";
                }
                else{
                    option1[i].bgColor = "";
                }
            }
            obj.bgColor = ListBackColor;
        }
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+12);
    }
}

//************************************************
// SelectTiming  (num : 出力タイミング   "1":確認    "2":確定 
//                            
// １．機能 
//     ・クリックした出力タイミングの色を変更する
//  2．戻り値  
//		なし 
//  3．備考 
//       
//************************************************
function SelectTiming(num){
	try{
		// 両方ともUp時のImage
// 2005/03/21 039 H.SAITO
//		// 確定時
//		if(num ==  FLAG_OUTPUT_DECISION){ 
//			document.getElementById("IMG_DecisionBtn").src = "../Bmp/PartMenu_Down.gif";
//			TimingFlag = num;
//		}
//		//確認時
//		else{
//		  //メディアとC@Rnaは確認はなし 
//		  if(ViewMode == OUTPUT_TYPE_MEDIA || ViewMode == OUTPUT_TYPE_CARNA){
//  			document.getElementById("IMG_DecisionBtn").src = "../Bmp/PartMenu_Down.gif";
//        TimingFlag = FLAG_OUTPUT_DECISION;
//		  }else{
//			  document.getElementById("IMG_ConfirmBtn").src = "../Bmp/PartMenu_Down.gif";
//			  TimingFlag = num;
//     }
//		}
    
//070330 HSK山本 UPDATE-ST
    //デフォルト値 
    if(num == null || num == ""){//未設定 
        num = FLAG_OUTPUT_DECISION;
    }
//070330 HSK山本 UPDATE-ED
    
    switch(num){
      // 確定時
      case FLAG_OUTPUT_DECISION:
    		document.getElementById("IMG_ConfirmBtn_Enable").src  = IMG_OUTPUT_CONFIRM_UP;
        document.getElementById("IMG_DecisionBtn").src = IMG_OUTPUT_DECISION_DOWN;
        TimingFlag = num;
        break;
      // 確認時
      case FLAG_OUTPUT_CONFIRM:
        //CR以外：全出力装置タイプ　CR：メディア,C@Rna,DicomStorage は確認はなし 
//070412 HSK山本 UPDATE-ST
//        if(ViewMode == OUTPUT_TYPE_MEDIA || ViewMode == OUTPUT_TYPE_CARNA){
        if((parent.ImageKind != parent.IMAGEKIND_FCRIMAGE && parent.ImageKind != IMAGEKIND_FDXIMAGE) //V2.2(B) FF奥野 新画像処理対応
          || ViewMode == OUTPUT_TYPE_MEDIA || ViewMode == OUTPUT_TYPE_CARNA || ViewMode == OUTPUT_TYPE_STORAGE){
//070412 HSK山本 UPDATE-ED
          document.getElementById("IMG_DecisionBtn").src = IMG_OUTPUT_DECISION_DOWN;
          TimingFlag = FLAG_OUTPUT_DECISION;
        }else{
          document.getElementById("IMG_ConfirmBtn_Enable").src  = IMG_OUTPUT_CONFIRM_DOWN;
      		document.getElementById("IMG_DecisionBtn").src = IMG_OUTPUT_DECISION_UP;
          TimingFlag = num;
        }
        break;
    }
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+13);
	}
}

//************************************************
// SelectDensity  (Flag : 出力密度  "ST":通密    "HQ":高密 
//                            
// １．機能 
//     ・クリックした出力タイミングの色を変更する
//  2．戻り値  
//		なし 
//  3．備考 
//       
//************************************************
function SelectDensity(Flag){
	try{
		// 両方ともUp時のImage
		document.getElementById("IMG_HighBtn").src = IMG_DENSITY_HIGH_UP;
		document.getElementById("IMG_MidBtn").src  = IMG_DENSITY_MID_UP;
//070327 HSK古場 UPDATE-ST
		if(parent.ImageKind == parent.IMAGEKIND_FCRIMAGE
		  || parent.ImageKind == IMAGEKIND_FDXIMAGE ){ //V2.2(B) FF奥野 新画像処理対応ADD
			// 高密時
			if(Flag == OUTPUT_DENSITY_HIGH){ 
				document.getElementById("IMG_HighBtn").src = IMG_DENSITY_HIGH_DOWN;
				DensityFlag = OUTPUT_DENSITY_HIGH;
			}
			else if(Flag == OUTPUT_DENSITY_STANDERD){
				document.getElementById("IMG_MidBtn").src = IMG_DENSITY_MID_DOWN;
				DensityFlag = OUTPUT_DENSITY_STANDERD;
			}
			else{
			  if(OptionHQ == OPTION_USE){
				  document.getElementById("IMG_HighBtn").src = IMG_DENSITY_HIGH_DOWN;
				  DensityFlag = OUTPUT_DENSITY_HIGH;
			  }else{
				  document.getElementById("IMG_MidBtn").src = IMG_DENSITY_MID_DOWN;
				  DensityFlag = OUTPUT_DENSITY_STANDERD;
			  }
			}
		}
//070327 HSK古場 UPDATE-ED
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+14);
	}
}
//************************************************
// ChangeOutputCount (num : +1：カウント上げる -1：カウント下げる 
//                            
// １．機能 
//     ・押下したタイミングで出力枚数変更
//  2．戻り値  
//		なし 
//  3．備考 
//       
//************************************************
function ChangeOutputCount(num){
	try{
		if(OutputCount >= COUNT_OUTPUT_MAX){
			OutputCount = COUNT_OUTPUT_MAX;
			if(num == 1) return;
		}else if(OutputCount <= COUNT_OUTPUT_MIN){
			OutputCount = COUNT_OUTPUT_MIN;
			if(num == -1) return;
		}

    // 操作ログ出力 
    if(num > 0){
      Fn_WriteLog(CTRL_COUNTUP);
    }else{
      Fn_WriteLog(CTRL_COUNTDOWN);   
    }

		OutputCount = parseInt(OutputCount,10) + parseInt(num,10);

		document.getElementById("divOutputCount").innerText = OutputCount;
		// ボタン活性・不活性
		SetOutputCountBtn();

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+15);
	}
}
//************************************************
// SetOutputCountBtn 
//                            
// １．機能 
//     ・出力枚数ボタン活性・不活性
//  2．戻り値  
//		なし 
//  3．備考 
//       
//************************************************
function SetOutputCountBtn(){
	try{

		// 最大値チェック
		if(OutputCount >= COUNT_OUTPUT_MAX){
		  OutputCount = COUNT_OUTPUT_MAX;
			document.getElementById("IMG_UpBtn_Enable").style.visibility  = "hidden";
			document.getElementById("IMG_UpBtn_Disable").style.visibility = "visible";
		}else{
			document.getElementById("IMG_UpBtn_Enable").style.visibility  = "visible";
			document.getElementById("IMG_UpBtn_Disable").style.visibility = "hidden";
		}
		// 最小値チェック
		if(OutputCount <= COUNT_OUTPUT_MIN){
		  OutputCount = COUNT_OUTPUT_MIN;
			document.getElementById("IMG_DownBtn_Enable").style.visibility   = "hidden";
			document.getElementById("IMG_DownBtn_Disable").style.visibility  = "visible";
		}else{
			document.getElementById("IMG_DownBtn_Enable").style.visibility   = "visible";
			document.getElementById("IMG_DownBtn_Disable").style.visibility  = "hidden";
		}
		
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+16);
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
      //------------------//
      // コンボボックス   //
      //------------------//
      case 1: // ONCLICK
        ShowDrop(0);
        document.getElementById("pull").src   = IMG_COMBOBOX_UP;
        break;
      case 2: // ONMOUSEDOWN
        document.getElementById("pull").src   = IMG_COMBOBOX_DOWN;
        break;
      case 3: // ONMOUSEOUT
        document.getElementById("pull").src   = IMG_COMBOBOX_UP;
        break;
      //------------------//
      // 出力枚数↑ボタン //
      //------------------//
      case 11: // ONCLICK
        ChangeOutputCount(1);
        document.getElementById("IMG_UpBtn_Enable").src   = IMG_COUNTUP_UP;
        break;
      case 12: // ONMOUSEDOWN
        document.getElementById("IMG_UpBtn_Enable").src   = IMG_COUNTUP_DOWN;
        break;
      case 13: // ONMOUSEOUT
        document.getElementById("IMG_UpBtn_Enable").src   = IMG_COUNTUP_UP;
        break;
      //------------------//
      // 出力枚数↓ボタン //
      //------------------//
      case 21: // ONCLICK
        ChangeOutputCount(-1);
        document.getElementById("IMG_DownBtn_Enable").src   = IMG_COUNTDOWN_UP;
        break;
      case 22: // ONMOUSEDOWN
        document.getElementById("IMG_DownBtn_Enable").src   = IMG_COUNTDOWN_DOWN;
        break;
      case 23: // ONMOUSEOUT
        document.getElementById("IMG_DownBtn_Enable").src   = IMG_COUNTDOWN_UP;
        break;
      //------------------//
      // キャンセルボタン // 
      //------------------//
      case 91: // ONCLICK
        // 親への完了通知
        var notifyInfo = { "commandMode" : COMMAND_MODE_CANCEL, "commandParam" : "" };
        NotifyFrameFinished(notifyInfo);
        Fn_Init();
        break;
      case 92: // ONMOUSEDOWN
        document.getElementById("IMG_CancelBtn").src  = IMG_BACK_DOWN;
        break;
      case 93: // ONMOUSEUP,ONMOUSEOUT
        document.getElementById("IMG_CancelBtn").src  = IMG_BACK_UP;
        break;
      //------------//
      // 設定ボタン // 
      //------------//
      case 95:// 設定ボタン
        // 操作ログ出力        Fn_WriteLog(CTRL_UPDATE);
        // データセット
        SetOutputData();
        // 親への完了通知
        var notifyInfo = { "commandMode" : COMMAND_MODE_UPDATE, "commandParam" : "" };
        NotifyFrameFinished(notifyInfo);
        Fn_Init();
        break;
      case 96: // ONMOUSEDOWN
        document.getElementById("IMG_UpdateBtn_Enable").src  = IMG_NEXT_DOWN;
        break;
      case 97: // ONMOUSEUP,ONMOUSEOUT
        document.getElementById("IMG_UpdateBtn_Enable").src  = IMG_NEXT_UP;
        break;
      case 100:// 続行可能エラー時のＯＫボタン
        Public_CloseMessage();
        Public_CloseError();     
        break;
      default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+17);
        break;
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+18);
  }
}
//*****************************************************************************
// SetOutputData
//
// １．機能
//     ・変更した内容を設定する 
// ２．戻り値
//　　  なし 
//
// ３．備考 
//　　　なし 
//*****************************************************************************
function SetOutputData(){
    try{
        //出力先変更フラグON
        parent.OutputModifyFlag = 1;

//070306 HSK山本 UPDATE-ST
//クローンコード削除(性能維持のため前コード削除) 
        if(ViewMode == OUTPUT_TYPE_MEDIA || ViewMode == OUTPUT_TYPE_PRINTER || 
           ViewMode == OUTPUT_TYPE_CARNA || ViewMode == OUTPUT_TYPE_FILE || 
           ViewMode == OUTPUT_TYPE_STORAGE){
            ///共通設定///
            parent.EditDeviceType[OutputArr]     = ViewMode;
            parent.EditDeviceCode[OutputArr]     = DeviceCode;
            parent.EditDeviceName[OutputArr]     = DeviceName;
            if(DeviceCode == null || DeviceCode == ""){//装置コード未設定 
                parent.EditOutputTiming[OutputArr]   = "";
            }else{
                parent.EditOutputTiming[OutputArr]   = TimingFlag;
            }
            parent.EditOutputReqClass[OutputArr] = ReqClass;
//071105 HSK山本 PVCS#2519 DEL-ST
//            parent.EditOutputCopies    = OutputCount;
//071105 HSK山本 PVCS#2519 DEL-ED
            //出力有無 
            if(DeviceCode == null || DeviceCode == ""){//装置コード未設定 
                parent.EditOutputFlag[OutputArr] = FLAG_OUTPUT_EMPTY;
            }else if(parent.EditOutputFlag[OutputArr] == "" || parent.EditOutputFlag[OutputArr] == FLAG_OUTPUT_EMPTY){
                parent.EditOutputFlag[OutputArr] = FLAG_OUTPUT_USE;
            }
            ///固有設定///

//071105 HSK山本 PVCS#2519 ADD-ST
            //出力枚数 
            if(ViewMode == OUTPUT_TYPE_PRINTER){
                parent.EditOutputCopies    = OutputCount;
            }
//071105 HSK山本 PVCS#2519 ADD-ED

            //出力画像密度
//070327 HSK山本 DEL-ST
//            switch(ViewMode){
//                case OUTPUT_TYPE_MEDIA:
//                case OUTPUT_TYPE_PRINTER:
//                case OUTPUT_TYPE_STORAGE:
//                case OUTPUT_TYPE_CARNA:
//                if(parent.EditOutputDensity[OutputArr] == ""){
//                    //高密オプション有ならば高密、無ならば通密を設定 
//                    if(OptionHQ == OPTION_USE){
//                        DensityFlag = OUTPUT_DENSITY_HIGH;
//                    }else{
//                        DensityFlag = OUTPUT_DENSITY_STANDERD;
//                    }
//                }
//                break;
//                case OUTPUT_TYPE_FILE:
//                DensityFlag = OUTPUT_DENSITY_STANDERD;
//                break;
//            }
//070327 HSK山本 DEL-ED
            parent.EditOutputDensity[OutputArr] = DensityFlag;
            
            //出力先状況 
            var oStauts = null;
            switch(ViewMode)
            {
                case OUTPUT_TYPE_MEDIA:
                oStauts = parent.OutputAliasMediaStatus;
                break;
                case OUTPUT_TYPE_PRINTER:
                //プリンタは配列 
                oStauts = parent.OutputAliasPrinterStatus[Index];
                break;
                case OUTPUT_TYPE_CARNA:
                oStauts = parent.OutputAliasCarnaStatus;
                break;
                case OUTPUT_TYPE_FILE:
                oStauts = parent.OutputAliasFileStatus;
                break;
                case OUTPUT_TYPE_STORAGE:
                //DicomStorageは配列 
                oStauts = parent.OutputAliasStorageStatus[Index];
                break;
            }
            parent.EditOutputStatus[OutputArr]   = oStauts;
            
        }else{//未対応装置
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+19);
        }
//070306 HSK山本 UPDATE-ED

    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+20);
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
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+21);
    }
}

//*****************************************************************************
// Fn_TimingEnable
//
// １．機能
//     ・確認ボタンの活性・不活性
// ２．戻り値
//　　  なし 
// ３．備考 
//　　　なし 
//*****************************************************************************
function Fn_TimingEnable(num){
    try{
        //確定時は常に活性
        document.getElementById("IMG_DecisionBtn").style.visibility   = "visible";
        switch(num){
            case 0: // 不活性
            document.getElementById("DIV_ConfirmText").style.color  = "gray";
            document.getElementById("IMG_ConfirmBtn_Enable").style.visibility   = "hidden";
            document.getElementById("IMG_ConfirmBtn_Disable").style.visibility  = "visible";
            TimingFlag = FLAG_OUTPUT_CONFIRM;
            break;
            case 1:// 活性
            document.getElementById("DIV_ConfirmText").style.color  = "black";
            document.getElementById("IMG_ConfirmBtn_Enable").style.visibility   = "visible";
            document.getElementById("IMG_ConfirmBtn_Disable").style.visibility  = "hidden";
            break;
            default:
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+22);
            break;
        }
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+23);
    }
}

//070306 HSK山本 ADD-ST
/**
 *  プリンタリスト取得 
 *  @return {Array}printerList プリンタリスト 
 *
 **/
function ODV_GetPrinterList()
{
    //デバイス情報リスト 
    var printerList = new Array();
    
    if(parent.OutputAliasPrinter.length > 0){
        var printerCount = parent.OutputAliasPrinter.length;
        // プリンタの配列作成 
        for(i=0; i<printerCount; i++){
            var devInfo = {"code":parent.OutputAliasPrinterNo[i],"name":parent.OutputAliasPrinter[i]};
            printerList.push(devInfo);
        }
    }
    return printerList;
}

/**
 *  DicomStorage装置リスト取得 
 *  @return {Array}storageList DicomStorage装置リスト 
 *
 **/
function ODV_GetStorageList()
{
    //デバイス情報リスト 
    var storageList = new Array();
    
    if(parent.OutputAliasStorage.length > 0){

//070319 HSK山本 UPDATE-ST
//        var storageCount = parent.OutputAliasStorage.length + 1;//"未設定"欄の分、増加
        var storageCount = parent.OutputAliasStorage.length
//070319 HSK山本 UPDATE-ED

        // Dicomストレージの配列作成 
        for(i=0; i<storageCount; i++){
            var devInfo;
//070319 HSK山本 UPDATE-ST
//            if(i == 0){//"未設定"
//                devInfo = {"code":"","name":""};
//            }else{//i > 0
//                devInfo = {"code":parent.OutputAliasStorageNo[i-1],"name":parent.OutputAliasStorage[i-1]};
//            }
            devInfo = {"code":parent.OutputAliasStorageNo[i],"name":parent.OutputAliasStorage[i]};
//070319 HSK山本 UPDATE-ED
            storageList.push(devInfo);
        }
    }
    return storageList;
}


/**
 *  装置名コンボボックス生成 
 *  @param {string}deviceType 装置タイプ 
 **/
function ODV_CreateDeviceComboBox(deviceType)
{
    try{
        ArrayDeviceInfo = null;
        DeviceCount = 0;
        
        switch(deviceType)
        {
            case OUTPUT_TYPE_PRINTER://プリント 
            ArrayDeviceInfo = ODV_GetPrinterList();
            break;
            case OUTPUT_TYPE_STORAGE://DicomStorage
            ArrayDeviceInfo = ODV_GetStorageList();
        }
        
        if(ArrayDeviceInfo){
            DeviceCount = ArrayDeviceInfo.length;

            //サイズ設定 
            document.getElementById("tblHead").style.width   = SizeComboBoxWidth;
            document.getElementById("divHeader").style.width = SizeComboBoxWidth-8;
            document.getElementById("tblHead").style.top     = SizeComboBoxTop;
            document.getElementById("tblHead").style.left    = SizeComboBoxLeft;

            var deviceName = "";
            
            if(ArrayDeviceInfo != null && ArrayDeviceInfo.length > 0){//コンボボックス 
                var strHTML = "";
                strHTML = "<table id='ComboBox' border='0' cellspacing='0'>";
                for(i=0; i<ArrayDeviceInfo.length ; i++){
                    strHTML += "<tr>";
                    strHTML += "<td id='option1' onmouseover='SetIndexColor(this);' onmouseup='SelectIndex(this," + i + ");' border=0 cellspacing='0'><div id='divOption' nowrap style='OVERFLOW:hidden;'>" + ArrayDeviceInfo[i].name + "</div></td>";
                    strHTML += "</tr>";
                }
                strHTML += "</table>";
                document.getElementById("divComboBox").innerHTML = strHTML;

                // コンボボックスリスト 
                document.getElementById("ComboBox").style.width  = SizeComboBoxWidth;
                document.getElementById("divOption").style.width = SizeComboBoxWidth-4;
                document.getElementById("ComboBox").style.top    = SizeComboBoxTop + 41;
                document.getElementById("ComboBox").style.left   = SizeComboBoxLeft;
                document.getElementById("ComboBox").style.fontSize   = FONT_SIZE_INPUTBOX;

                // コンボボックス表示 
                document.getElementById("pull").style.visibility = "visible";	
                document.getElementById("pull").style.left = SizeComboBoxLeft + SizeComboBoxWidth - 38;
                
            }
        }
    }catch(e)
    {
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+24);
    }
}


/**
 *  コンボボックス選択(装置コード指定) 
 *  @param {string}devCode 装置コード 
 **/
function ODV_SelectDeviceComboBoxWithCode(devCode)
{
    try{
        var infoLen = ArrayDeviceInfo.length;
        var idx = -1;
        if(devCode != null && devCode != ""){
            for(idx=0; idx < infoLen; idx++){
                var devInfo = ArrayDeviceInfo[idx];
                if(devCode == devInfo.code)break;
            }
        }
        ODV_SelectDeviceComboBoxAtIndex(idx);
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+25);
    }
}

/**
 *  コンボボックス選択（インデックス指定） 
 *  @param {number}index インデックス（0以下のの場合は空を設定） 
 **/
function ODV_SelectDeviceComboBoxAtIndex(index)
{
    try{
        var devName = "";
        if(index >= 0){
            var infoLen = ArrayDeviceInfo.length;
            if(infoLen == 1){
                option1.onmouseup();
            }else{
                option1[index].onmouseup();
            }
            devName = ArrayDeviceInfo[index].name;
        }
        document.getElementById("divHeader").innerText = devName;
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+26);
    }
}
//070306 HSK山本 ADD-ED
