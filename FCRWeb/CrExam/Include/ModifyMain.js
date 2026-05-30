/****************************************************************************

  @file ModifyMain.js

  @brief ModifyMainのクライアントスクリプト

  @author YSK畑 
        SpotCode MAX 33

  Copyright(C) 2004-2009 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/17  YSK畑       V1.0       新規作成
  @date  05/12/14  YSK齋藤     V1.1       ボタン押下連打の不具合対応(PVCS#1668)
  @date  06/06/16  YSK齋藤     V1.2       出力中に「お待ちください」が残る不具合対応(PVCS#1738)
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  06/11/08  YSK齋藤     V1.4　     PVCS#1962,#1666対応 
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応 
  @date  07/03/20  HSK古場     V2.0       内視鏡画像取り込み機能 
  @date  07/06/14  HSK山本     V2.0       PVCS#2342対応 
  @date  07/10/29  HSK山本     V3.0       PVCS#2481対応 
  @date  09/05/20  HSK山本     V5.1       心電図本対応 
  @date  09/12/01  FFS黒田     V1.1(B)    患者情報項目追加
  @date  10/11/22  FFS生田     V2.0(B)    30501エラー改善対応
  @date  14/04/14  TYS会田     V3.0(B)    DR直結-検査情報修正

/****************************************************************************/
//[定数]
var PROC_MODE                = "MODIFYMAIN_VIEW";
// 操作コマンド





var COMMAND_MODE_CANCEL      = "CANCEL";
var COMMAND_MODE_ADDMENU     = "ADDMENU";
var COMMAND_MODE_CHANGEMENU  = "CHANGEMENU";
var COMMAND_MODE_DELETEMENU  = "DELETEMENU";
var COMMAND_MODE_SORTMENU    = "SORTMENU";
var COMMAND_MODE_CHANGEIMG   = "CHANGEIMG";
var COMMAND_MODE_OUTPUT      = "OUTPUT";
var COMMAND_MODE_EDITPATIENT = "EDITPATIENT";
// 操作ログ出力コマンド





var CTRL_ADDMENU             = "AddMenu";     // メニュー追加
var CTRL_CHANGEMENU          = "ChangeMenu";  // メニュー変更
var CTRL_DELETEMENU          = "DeleteMenu";  // メニュー削除/画像無効化





var CTRL_CHANGEIMAGE         = "ChangeImage"; // 画像入れ替え





var CTRL_SORTMENU            = "SortMenu";    // 表示順並べ替え





var CTRL_OUTPUT              = "Output";      // 出力先設定





var CTRL_EDITPATIENT         = "EditPatient"; // 患者詳細情報編集





var UPDATE_TIMEOUT			     = 15000;					// 更新処理タイマー
// オープンモード





var OPEN_MODE_CE     = 0;				// CEで開かれた場合





var OPEN_MODE_WINDOW = 1;				// ブラウザで開かれた場合





var OPEN_MODE_DIALOG = 2;				// ダイアログで開かれた場合





// 検査取得フラグ
var FLAG_STUDY_GETDATA			 = 1;	// 検査取得





var FLAG_STUDY_NOGETDATA		 = 0;	// 検査未取得





// エラーモード





var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var USER_NOTHING_ERROR = "USER_NOTHING_ERROR";    //ユーザチェックエラー
var SPOT_CODE = 0;                   //スポットコード





var FILE_NAME = "ModifyMain.js"  //ファイル名





var MESSAGE_ID           = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS    = 30501;              //メッセージID 
//2010/11/16 30501エラー改善対応 ADD ST
var MESSAGE_ID_ACCESS_EXCLUSIVE = 40505;       //メッセージID
//2010/11/16 30501エラー改善対応 ADD ED
//警告メッセージ
var MESSAGE_ID_NOLOGIN   = 31502;              //メッセージID 
var MESSAGE_ID_LOGOFF    = 31503;              //メッセージID 
var MESSAGE_ID_DIFERENT  = 31504;              //メッセージID 
var MESSAGE_ID_FORBIDDEN = 31505;
// 2005/07/20 003 H.SAITO #903 メッセージレベル変更(31512～31526→34512～34526)
//var MSG_WARNING_ID_OUTPUT_EXCL = 31512;       //出力中メッセージ
//070614 HSK山本 PVCS#2342 DEL-ST
//var MSG_WARNING_ID_OUTPUT_EXCL = 34512;       //出力中メッセージ
//070614 HSK山本 PVCS#2342 DEL-ED
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
var MSG_ERROR_EXCLUSIVE_STUDY  = 31506;         //他筐体が検査を実施中
var MSG_ERROR_COMPLETED        = 31540;         //確認/確定済みの検査です
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-
// 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ST-
var MSG_ERROR_NODATA     = 31511;
// 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ED-
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
var DIALOGPROCMODE_STUDY_ERROR          = "DIALOGPROCMODE_STUDY_ERROR";
var DIALOGPROCMODE_COMPLETED_ERROR      = "DIALOGPROCMODE_COMPLETED_ERROR";
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-
// 操作権限チェック 戻り値
var RETURN_OK														=  0; //正常終了


var CHECK_AUTHORITY_ERROR_NOT_LOGGED_IN	= -1; //ログインされていない


var CHECK_AUTHORITY_ERROR_LOGGED_OFF		= -2; //ログオフされた
var CHECK_AUTHORITY_ERROR_DIFFERENT_ID	= -3; //ユーザIDがアプリケーション変数と異なっている
var CHECK_AUTHORITY_ERROR_AUTHORITY			= -4; //操作権限がない


//排他制御スイッチ
var EXCLUSIVE_NOTHING        = -1;            // 排他制御(何もしない)
var EXCLUSIVE_DELL           = 0;             // 排他制御(開放)
var EXCLUSIVE_SET            = 1;             // 排他制御(設定)
var EXCLUSIVE_CHECK          = 2;             // 排他制御(チェック)
// 2005/07/21 003 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
//// 2005/06/29 002 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
//var COOKIE_NAME_STUDY2       = "StudyLock";	  // 検査排他中クッキー名


// 定数定義=======================================
// 画像パス
var IMG_ADDMENU_DOWN      = "../Bmp/crStudyAddBtnD.gif";
var IMG_ADDMENU_UP        = "../Bmp/crStudyAddBtnU.GIF";
var IMG_CHANGEMENU_DOWN   = "../Bmp/crStudyChgBtnD.gif";
var IMG_CHANGEMENU_UP     = "../Bmp/crStudyChgBtnU.GIF";
var IMG_DELETEMENU_DOWN   = "../Bmp/crStudyDelBtnD.gif";
var IMG_DELETEMENU_UP     = "../Bmp/crStudyDelBtnU.GIF";
var IMG_SORTMENU_DOWN     = "../Bmp/crStudyNumBtnD.gif";
var IMG_SORTMENU_UP       = "../Bmp/crStudyNumBtnU.GIF";
var IMG_CHANGEIMG_DOWN    = "../Bmp/crImageChgBtnD.gif";
var IMG_CHANGEIMG_UP      = "../Bmp/crImageChgBtnU.GIF";
var IMG_OUTPUT_DOWN       = "../Bmp/crStudyPrintBtnD.gif";
var IMG_OUTPUT_UP         = "../Bmp/crStudyPrintBtnU.GIF";
var IMG_EDITPATIENT_DOWN  = "../Bmp/crPatientEditBtnD.gif";
var IMG_EDITPATIENT_UP    = "../Bmp/crPatientEditBtnU.GIF";
var IMG_BACK_DOWN         = "../Bmp/cmOvalAPaleLBtnD.GIF";
var IMG_BACK_UP           = "../Bmp/cmOvalAPaleLBtnU.GIF";
//================================================
var UpdateTimeOutId;			                    // 排他処理タイムアウトプロセスのＩＤ
//070614 HSK山本 PVCS#2342 DEL-ST
//var GetdateTimeOutId;			                    // 排他処理タイムアウトプロセスのＩＤ
//070614 HSK山本 PVCS#2342 DEL-ED
var ExclusiveModeStudy;                       // 検査の排他の設定／チェック 
var ExclusiveModeStudyRelease;                // 検査の排他の設定／チェック 
var CommandMode;                              // 終了コマンド





var CommandParam;                             // 終了パラメタ

//070320 HSK古場 ADD-ST
var BTNGROUP_ADDMENU     = "AddMenu";
var BTNGROUP_CHANGEMENU  = "ChangeMenu";
var BTNGROUP_DELETEMENU  = "DeleteMenu";
var BTNGROUP_SORTMENU    = "SortMenu";
var BTNGROUP_CHANGEIMG   = "ChangeImg";
var BTNGROUP_OUTPUT      = "Output";
var BTNGROUP_EDITPATIENT = "EditPatient";
var BTNGROUP_BACK        = "Back";

// newされたボタンオブジェクトを保持する連想配列
var MM_ButtonObjects = new Array();
//070320 HSK古場 ADD-ED

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
//070320 HSK古場 ADD-ST
    //
    //ボタンを構成するエレメント群
    //
    var ButtonElements = {
      groups:[
      { groupName           : BTNGROUP_ADDMENU,
        tableElementId      : 'TABLE_AddMenu',
        titleElementId      : 'divAddMenu_Title',
        valueElementId      : 'divAddMenu_Value',
        enableImgElementId  : 'imgAddMenu_Enable',
        disableImgElementId : 'imgAddMenu_Disable' },
      { groupName           : BTNGROUP_CHANGEMENU,
        tableElementId      : 'TABLE_ChangeMenu',
        titleElementId      : 'divChangeMenu_Title',
        valueElementId      : 'divChangeMenu_Value',
        enableImgElementId  : 'imgChangeMenu_Enable',
        disableImgElementId : 'imgChangeMenu_Disable' },
      { groupName           : BTNGROUP_DELETEMENU,
        tableElementId      : 'TABLE_DeleteMenu',
        titleElementId      : 'divDeleteMenu_Title',
        valueElementId      : 'divDeleteMenu_Value',
        enableImgElementId  : 'imgDeleteMenu_Enable',
        disableImgElementId : 'imgDeleteMenu_Disable' },
      { groupName           : BTNGROUP_SORTMENU,
        tableElementId      : 'TABLE_SortMenu',
        titleElementId      : 'divSortMenu_Title',
        valueElementId      : 'divSortMenu_Value',
        enableImgElementId  : 'imgSortMenu_Enable',
        disableImgElementId : 'imgSortMenu_Disable' },
      { groupName           : BTNGROUP_CHANGEIMG,
        tableElementId      : 'TABLE_ChangeImg',
        titleElementId      : 'divChangeImg_Title',
        valueElementId      : 'divChangeImg_Value',
        enableImgElementId  : 'imgChangeImg_Enable',
        disableImgElementId : 'imgChangeImg_Disable' },
      { groupName           : BTNGROUP_OUTPUT,
        tableElementId      : 'TABLE_Output',
        titleElementId      : 'divOutput_Title',
        valueElementId      : 'divOutput_Value',
        enableImgElementId  : 'imgOutput_Enable',
        disableImgElementId : 'imgOutput_Disable' },
      { groupName           : BTNGROUP_EDITPATIENT,
        tableElementId      : 'TABLE_EditPatient',
        titleElementId      : 'divEditPatient_Title',
        valueElementId      : 'divEditPatient_Value',
        enableImgElementId  : 'imgEditPatient_Enable',
        disableImgElementId : 'imgEditPatient_Disable' },
      { groupName           : BTNGROUP_BACK,
        tableElementId      : 'TABLE_Back',
        titleElementId      : '',
        valueElementId      : 'divBack_Value',
        enableImgElementId  : 'imgBack_Enable',
        disableImgElementId : 'imgBack_Disable' }
      ]
    };
//070320 HSK古場 ADD-ED

    //画面遷移開始通知設定

    SetViewMovingNotification(ViewMovingNotification);

	  // 文字列表示
	  document.getElementById("divAddMenu_Title").innerText     = LabelAddMenu;
	  document.getElementById("divChangeMenu_Title").innerText  = LabelChangeMenu;
	  document.getElementById("divDeleteMenu_Title").innerText  = LabelDeleteMenu;
	  document.getElementById("divSortMenu_Title").innerText    = LabelSortMenu;
	  document.getElementById("divChangeImg_Title").innerText   = LabelChangeImg;
	  document.getElementById("divOutput_Title").innerText      = LabelOutput;
	  document.getElementById("divEditPatient_Title").innerText = LabelEditPatient;
  	
	  document.getElementById("divAddMenu_Value").innerText     = LabelAddMenuExplan;
	  document.getElementById("divChangeMenu_Value").innerText  = LabelChangeMenuExplan;
	  document.getElementById("divDeleteMenu_Value").innerText  = LabelDeleteMenuExplan
	  document.getElementById("divSortMenu_Value").innerText    = LabelSortMenuExplan;
	  document.getElementById("divChangeImg_Value").innerText   = LabelChangeImgExplan;
	  document.getElementById("divOutput_Value").innerText      = LabelOutputExplan;
	  document.getElementById("divEditPatient_Value").innerText = LabelEditPatientExplan;
	  document.getElementById("divBack_Value").innerText = ButtonBack;
    //フォント名,フォントサイズの設定





    document.getElementById("BODY").style.fontFamily          = FONT_NAME;
    // 2005/06/23 025 H.SAITO デザイン変更対応（フォントサイズ）





    //document.getElementById("BODY").style.fontSize            = FONT_SIZE + "px";
    // 操作ボタン
		document.getElementById("divAddMenu_Title").style.fontSize      = FONT_SIZE_CTRLBUTTON_NAME;
		document.getElementById("divAddMenu_Value").style.fontSize      = FONT_SIZE_CTRLBUTTON_COMMENT;
		document.getElementById("divChangeMenu_Title").style.fontSize   = FONT_SIZE_CTRLBUTTON_NAME;
		document.getElementById("divChangeMenu_Value").style.fontSize   = FONT_SIZE_CTRLBUTTON_COMMENT;
		document.getElementById("divDeleteMenu_Title").style.fontSize   = FONT_SIZE_CTRLBUTTON_NAME;
		document.getElementById("divDeleteMenu_Value").style.fontSize   = FONT_SIZE_CTRLBUTTON_COMMENT;
		document.getElementById("divSortMenu_Title").style.fontSize     = FONT_SIZE_CTRLBUTTON_NAME;
		document.getElementById("divSortMenu_Value").style.fontSize     = FONT_SIZE_CTRLBUTTON_COMMENT;
		document.getElementById("divChangeImg_Title").style.fontSize    = FONT_SIZE_CTRLBUTTON_NAME;
		document.getElementById("divChangeImg_Value").style.fontSize    = FONT_SIZE_CTRLBUTTON_COMMENT;
		document.getElementById("divOutput_Title").style.fontSize       = FONT_SIZE_CTRLBUTTON_NAME;
		document.getElementById("divOutput_Value").style.fontSize       = FONT_SIZE_CTRLBUTTON_COMMENT;
		document.getElementById("divEditPatient_Title").style.fontSize  = FONT_SIZE_CTRLBUTTON_NAME;
		document.getElementById("divEditPatient_Value").style.fontSize  = FONT_SIZE_CTRLBUTTON_COMMENT;
		document.getElementById("divBack_Value").style.fontSize         = FONT_SIZE_BUTTON;
    // その他





		document.getElementById("TD_ProcText").style.fontSize           = FONT_SIZE_OTHER;
		document.getElementById("TD_ErrorText").style.fontSize          = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorTitle1").style.fontSize        = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorTitle2").style.fontSize        = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorCode").style.fontSize          = FONT_SIZE_OTHER;
		document.getElementById("DIV_ErrorOkText").style.fontSize       = FONT_SIZE_BUTTON;

//070320 HSK古場 ADD-ST
		//活性・不活性処理対象となるボタンを表現するオブジェクトの生成
		for (var i = 0; i < ButtonElements.groups.length; i++) {
			MM_ButtonObjects[ButtonElements.groups[i].groupName] = new MM_ButtonGroup(ButtonElements.groups[i]);
		}
//070320 HSK古場 ADD-ED

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
 
    //--------------------------------------------//
    //モードに応じて排他の管理スイッチを切り替える//
    //--------------------------------------------//
    switch(parent.ExclusiveMode){
      case parent.EXCLUSIVE_MODE1:
        ExclusiveModeStudy        = EXCLUSIVE_SET;       // 検査の排他の設定／チェック 
        ExclusiveModeStudyRelease = EXCLUSIVE_DELL;      // 検査の排他の開放
        break;
      case parent.EXCLUSIVE_MODE2:
        ExclusiveModeStudy        = EXCLUSIVE_NOTHING;   // 検査の排他の設定／チェック 
        ExclusiveModeStudyRelease = EXCLUSIVE_NOTHING;   // 検査の排他の開放
        break;
      default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
//        Public_Error(FATAL_ERROR, "UnExcepted parent.ExclusiveMode :" + parent.ExclusiveMode);       
        break;
    }

		//検査取得済ならばデータを取得しない





		if(parent.EndGetDataFlag == FLAG_STUDY_GETDATA){
			Public_EndGetData();
		}
		else if(parent.EndGetDataFlag == FLAG_STUDY_NOGETDATA){
			parent.STUDYDATA_GET_PROC.Public_GetData(PROC_MODE, parent.StudySequence, "", ExclusiveModeStudy);
		}

	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
		return;
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
        // 2005/11/30 PVCS#1560 H.SAITO -ST-
        //// 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ST-
        //// 対象となる検査が０件の場合
        //if(parent.StudyExclusionErrorFlag == "2"){
        //  parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
        //  Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_NODATA,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_NODATA,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_NODATA,"Cannt Get Message."), DIALOGPROCMODE_STUDY_ERROR); 
        //  return;
        //}
        //// 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ED-
        //// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
        //if(parent.StudyExclusionErrorFlag == "1"){
        //  parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
        //  Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_EXCLUSIVE_STUDY,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_EXCLUSIVE_STUDY,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_EXCLUSIVE_STUDY,"Cannt Get Message."), DIALOGPROCMODE_STUDY_ERROR); 
        //  return;
        //}
        //// 2005/10/27 PVCS#1571 H.SAITO CEのみ撮影終了/確定済みの検査は編集不可能とする -ST-
        ////if(parent.CompletedErrorFlag      == "1"){
        //if(parent.CompletedErrorFlag      == "1" && parent.OpenMode == OPEN_MODE_CE){
        //// 2005/10/27 PVCS#1571 H.SAITO CEのみ撮影終了/確定済みの検査は編集不可能とする -ED-
        //  parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
        //  Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_COMPLETED,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_COMPLETED,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_COMPLETED,"Cannt Get Message."), DIALOGPROCMODE_COMPLETED_ERROR); 
        //  return;
        //}
        //// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-
        //// 2005/11/28 PVCS#1560 H.SAITO -ST-
        //// 検査自己排他エラーが発生した場合はエラーメッセージを表示して終了する

        //if(parent.StudySelfExclusionErrorFlag == "1"){
        //  parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
        //  Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_EXCLUSIVE_STUDY_SELF,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_EXCLUSIVE_STUDY_SELF,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_EXCLUSIVE_STUDY_SELF,"Cannt Get Message."), DIALOGPROCMODE_STUDY_ERROR);
        //  return;
        //}
        //// 2005/11/28 PVCS#1560 H.SAITO -ED-
        //--------------------------//
        // 検査の排他エラーチェック //
        //--------------------------//
        switch(parent.StudyExclusionErrorFlag){
            case 0:
                break;      
            case 3:
            case 4:
                parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
                Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_EXCLUSIVE_STUDY,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_EXCLUSIVE_STUDY,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_EXCLUSIVE_STUDY,"Cannt Get Message."), DIALOGPROCMODE_STUDY_ERROR);
                return;      
            // 対象となる検査が０件の場合
            case 5:
                parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
                Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_NODATA,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_NODATA,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_NODATA,"Cannt Get Message."), DIALOGPROCMODE_STUDY_ERROR);
                return;      
        }
        // ＣＥかつ確定ステータスの場合はエラーとする
        if(parent.CompletedErrorFlag == "1" && parent.OpenMode == OPEN_MODE_CE){
            parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
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

        //データ取得完了フラグをＯＮにする
        parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
        
        var pp = parent.INFORMATION_VIEW;
        
//2005/05/24-ST==========
//	  pp.Public_SetUserGuidance(UserGuidanceString); 
        pp.Public_SetUserGuidance(UserGuidanceString,1); 
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

        //メニューボタン活性化

        // 2005/07/06 009 H.SAITO PVCS#870 メディアから取り込んだ検査
        //Fn_ButtonEnable(1);
//090520 HSK山本 心電図本対応 UPDATE-ST
        if(parent.ImageKind == parent.IMAGEKIND_NON_IMAGE)
        {
            Fn_ButtonEnable(4);
        }
        else
        {
            //メディアから取り込んだ検査の場合は患者情報,出力先設定のみ操作可能とする
            if(parent.MediaGetStatus == "1"){
                //#1346 2005/09/22--ST 管理外目的の場合は、患者編集のみ有効とする
                if(parent.PurPose == 1){
                    Fn_ButtonEnable(4);
                }else{
                    Fn_ButtonEnable(3);
                }
                //#1346 2005/09/22--EN
            }else{
//070320 HSK古場 UPDATE-ST
                if(parent.ImageKind == parent.IMAGEKIND_FCRIMAGE
                   || (parent.ImageKind == parent.IMAGEKIND_FDXIMAGE) && (parent.IsExistExMPMCode == 1)){	//2014.04.14 TYS会田 DR直結-検査情報修正 ADD
                    //FCR画像 
                    Fn_ButtonEnable(1);   
                }else{
                    //FCR画像以外 
//071029 HSK山本 V3.0 PVCS#2481 UPDATE-ST
                    if(parent.PurPose == 1){//管理外目的の場合は、患者編集のみ有効とする
                        Fn_ButtonEnable(4);
                    }else{
                        Fn_ButtonEnable(5);   
                    }
                }
//071029 HSK山本 V3.0 PVCS#2481 UPDATE-ED
//070320 HSK古場 UPDATE-ED
            }
        }
//090520 HSK山本 心電図本対応 UPDATE-ED
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
        return;
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
        Public_Init();
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+33);
    }
}

//***************************************************************************
//  Fn_OnButton(tableNo ： ボタン種類)		
//
//  1．機能
//      ボタン押下時の処理





//	2．戻り値  
//		  なし





//  3．備考





//     
//***************************************************************************
function Fn_OnButton(tableNo)
{
	try{
    //情報未取得の場合は不活性
    if(parent.EndGetDataFlag == FLAG_STUDY_NOGETDATA)return;
   
		// 操作ログの出力と操作の権限チェックを行う
		switch(tableNo){
      //============
      // メニュー追加ボタン
      //============
      case 10:
			  Fn_WriteLog(CTRL_ADDMENU);
        //2005/12/14 PVCS#1668 H.SAITO -ST-
        ////2005/04/24 005 H.SAITO ボタン押下連打でエラーが発生する不具合対応(CEのみ)
        ////遷移後に自分自身をLocationReplaceにて入れ替えるため解除は不要
        //if(parent.TargetDisplay){
        //  Public_Message("NODIALOG", ""); 
        //}
        //CE,PCとも画面のロックを実施する
        Public_Message("NODIALOG", ""); 
        //2005/12/14 PVCS#1668 H.SAITO -ED-
				parent.CHECKCOMMAND_PROC.Public_CheckCommand(PROC_MODE, COMMAND_MODE_ADDMENU);
			  //IMAGE変更
		    document.getElementById("imgAddMenu_Enable").src = IMG_ADDMENU_UP;
        break;
		  case 11:  // ONMOUSEDOWN
		    document.getElementById("imgAddMenu_Enable").src = IMG_ADDMENU_DOWN;
			  break;
		  case 12:  // ONMOUSEOUT
		    document.getElementById("imgAddMenu_Enable").src = IMG_ADDMENU_UP;
		    break;	    
      //============
      // メニュー変更ボタン
      //============
      case 20:
			  Fn_WriteLog(CTRL_CHANGEMENU);
        //2005/12/14 PVCS#1668 H.SAITO -ST-
        ////2005/04/24 005 H.SAITO ボタン押下連打でエラーが発生する不具合対応(CEのみ)
        ////遷移後に自分自身をLocationReplaceにて入れ替えるため解除は不要
        //if(parent.TargetDisplay){
        //  Public_Message("NODIALOG", ""); 
        //}
        //CE,PCとも画面のロックを実施する
        Public_Message("NODIALOG", ""); 
        //2005/12/14 PVCS#1668 H.SAITO -ED-
				parent.CHECKCOMMAND_PROC.Public_CheckCommand(PROC_MODE, COMMAND_MODE_CHANGEMENU);
			  //IMAGE変更
		    document.getElementById("imgChangeMenu_Enable").src = IMG_CHANGEMENU_UP;
        break;
		  case 21:  // ONMOUSEDOWN
		    document.getElementById("imgChangeMenu_Enable").src = IMG_CHANGEMENU_DOWN;
			  break;
		  case 22:  // ONMOUSEOUT
		    document.getElementById("imgChangeMenu_Enable").src = IMG_CHANGEMENU_UP;
		    break;
      //============
      // メニュー削除ボタン
      //============
      case 30:
			  Fn_WriteLog(CTRL_DELETEMENU);
        //2005/12/14 PVCS#1668 H.SAITO -ST-
        ////2005/04/24 005 H.SAITO ボタン押下連打でエラーが発生する不具合対応(CEのみ)
        ////遷移後に自分自身をLocationReplaceにて入れ替えるため解除は不要
        //if(parent.TargetDisplay){
        //  Public_Message("NODIALOG", ""); 
        //}
        //CE,PCとも画面のロックを実施する
        Public_Message("NODIALOG", ""); 
        //2005/12/14 PVCS#1668 H.SAITO -ED-
				parent.CHECKCOMMAND_PROC.Public_CheckCommand(PROC_MODE, COMMAND_MODE_DELETEMENU);
			  //IMAGE変更
		    document.getElementById("imgDeleteMenu_Enable").src = IMG_DELETEMENU_UP;
        break;
		  case 31:  // ONMOUSEDOWN
		    document.getElementById("imgDeleteMenu_Enable").src = IMG_DELETEMENU_DOWN;
			  break;
		  case 32:  // ONMOUSEOUT
		    document.getElementById("imgDeleteMenu_Enable").src = IMG_DELETEMENU_UP;
		    break;
      //============
      // メニュー並べ替えボタン
      //============
      case 40:
			  Fn_WriteLog(CTRL_SORTMENU);
        //2005/12/14 PVCS#1668 H.SAITO -ST-
        ////2005/04/24 005 H.SAITO ボタン押下連打でエラーが発生する不具合対応(CEのみ)
        ////遷移後に自分自身をLocationReplaceにて入れ替えるため解除は不要
        //if(parent.TargetDisplay){
        //  Public_Message("NODIALOG", ""); 
        //}
        //CE,PCとも画面のロックを実施する
        Public_Message("NODIALOG", ""); 
        //2005/12/14 PVCS#1668 H.SAITO -ED-
				parent.CHECKCOMMAND_PROC.Public_CheckCommand(PROC_MODE, COMMAND_MODE_SORTMENU);
			  //IMAGE変更
		    document.getElementById("imgSortMenu_Enable").src = IMG_SORTMENU_UP;
        break;
		  case 41:  // ONMOUSEDOWN
		    document.getElementById("imgSortMenu_Enable").src = IMG_SORTMENU_DOWN;
			  break;
		  case 42:  // ONMOUSEOUT
		    document.getElementById("imgSortMenu_Enable").src = IMG_SORTMENU_UP;
		    break;
      //============
      // 画像入れ替えボタン
      //============
      case 50:
			  Fn_WriteLog(CTRL_CHANGEIMAGE);
        //2005/12/14 PVCS#1668 H.SAITO -ST-
        ////2005/04/24 005 H.SAITO ボタン押下連打でエラーが発生する不具合対応(CEのみ)
        ////遷移後に自分自身をLocationReplaceにて入れ替えるため解除は不要
        //if(parent.TargetDisplay){
        //  Public_Message("NODIALOG", ""); 
        //}
        //CE,PCとも画面のロックを実施する
        Public_Message("NODIALOG", ""); 
        //2005/12/14 PVCS#1668 H.SAITO -ED-
				parent.CHECKCOMMAND_PROC.Public_CheckCommand(PROC_MODE, COMMAND_MODE_CHANGEIMG);
			  //IMAGE変更
		    document.getElementById("imgChangeImg_Enable").src = IMG_CHANGEIMG_UP;
        break;
		  case 51:  // ONMOUSEDOWN
		    document.getElementById("imgChangeImg_Enable").src = IMG_CHANGEIMG_DOWN;
			  break;
		  case 52:  // ONMOUSEOUT
		    document.getElementById("imgChangeImg_Enable").src = IMG_CHANGEIMG_UP;
		    break;
      //============
      // 出力先設定ボタン
      //============
      case 60:
//070614 HSK山本 PVCS#2342 UPDATE-ST
//出力排他チェック処理は出力画面(Output_View)で行う
//        //出力先設定画面に入る前に出力状況をチェック
//        //処理中表示
//        Public_Message("DIALOG", ProcString);
//        //タイマ予約
//        GetdateTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+17) +")", UPDATE_TIMEOUT);
//        //2005/04/24 005 H.SAITO ボタン押下連打でエラーが発生する不具合対応(CEのみ)
//        //遷移後に自分自身をLocationReplaceにて入れ替えるため解除は不要
//        if(parent.isModifyCtrlCE){
//          Public_Message("NODIALOG", ""); 
//        }
//        //出力状況をチェック
//        parent.EXCLUSIVE_PROC.Public_OutputExclusive(PROC_MODE, parent.StudySequence, 1);
            Fn_WriteLog(CTRL_OUTPUT);
            parent.CHECKCOMMAND_PROC.Public_CheckCommand(PROC_MODE, COMMAND_MODE_OUTPUT);
//070612 HSK山本 PVCS#2342 UPDATE-ED
			  //IMAGE変更
		    document.getElementById("imgOutput_Enable").src = IMG_OUTPUT_UP;
        break;
		  case 61:  // ONMOUSEDOWN
		    document.getElementById("imgOutput_Enable").src = IMG_OUTPUT_DOWN;
			  break;
		  case 62:  // ONMOUSEOUT
		    document.getElementById("imgOutput_Enable").src = IMG_OUTPUT_UP;
		    break;
      //============
      // 患者情報編集ボタン
      //============
      case 70:
			  Fn_WriteLog(CTRL_EDITPATIENT);
        //2005/12/14 PVCS#1668 H.SAITO -ST-
        ////2005/04/24 005 H.SAITO ボタン押下連打でエラーが発生する不具合対応(CEのみ)
        ////遷移後に自分自身をLocationReplaceにて入れ替えるため解除は不要
        //if(parent.TargetDisplay){
        //  Public_Message("NODIALOG", ""); 
        //}
        //CE,PCとも画面のロックを実施する
        Public_Message("NODIALOG", ""); 
        //2005/12/14 PVCS#1668 H.SAITO -ED-
				parent.CHECKCOMMAND_PROC.Public_CheckCommand(PROC_MODE, COMMAND_MODE_EDITPATIENT);
			  //IMAGE変更
		    document.getElementById("imgEditPatient_Enable").src = IMG_EDITPATIENT_UP;
        break;
		  case 71:  // ONMOUSEDOWN
		    document.getElementById("imgEditPatient_Enable").src = IMG_EDITPATIENT_DOWN;
			  break;
		  case 72:  // ONMOUSEOUT
		    document.getElementById("imgEditPatient_Enable").src = IMG_EDITPATIENT_UP;
		    break;
      //============
      // 戻るボタン
      //============
      case 90:
			  Fn_Exclusive(COMMAND_MODE_CANCEL, parent.ModifyStatusFlag);
			  //IMAGE変更
		    document.getElementById("imgBack_Enable").src = IMG_BACK_UP;
        break;
		  case 91:  // ONMOUSEDOWN
		    document.getElementById("imgBack_Enable").src = IMG_BACK_DOWN;
			  break;
		  case 92:  // ONMOUSEOUT
		    document.getElementById("imgBack_Enable").src = IMG_BACK_UP;
		    break;
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
            ExclusiveModeStudyRelease = EXCLUSIVE_NOTHING;
            Fn_Exclusive(COMMAND_MODE_CANCEL, parent.ModifyStatusFlag);
            // 2005/11/28 H.SAITO PVCS#1560の影響 -ST-
            // 排他エラーが発生したときに一度parent.EndGetDataFlagにセットされると
            // そのままそのフラグを持ち続けてしまう不具合修正
		        parent.EndGetDataFlag = FLAG_STUDY_NOGETDATA;
            // 2005/11/28 H.SAITO PVCS#1560の影響 -ED-
            break;        
        }        
        Public_CloseError();
        DialogProcMode = "";
        break;
      // 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応(ダイアログが使いづらいので、インタフェース見直し）-ED-
			default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
			  break;
		}
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
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
    if(ExclusiveModeStudyRelease == EXCLUSIVE_NOTHING){
      Public_EndExclusive(0 , 0);
    }
    else{
      //処理中表示
      Public_Message("DIALOG", ProcString);
      //タイマ予約





      //2010/11/16 30501エラー改善対応 MOD ST
      UpdateTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS_EXCLUSIVE+",'"+FILE_NAME+"',"+ (SPOT_CODE+6) +")", UPDATE_TIMEOUT);
      //2010/11/16 30501エラー改善対応 MOD ED
      //排他開放処理







      parent.EXCLUSIVE_PROC.Public_Exclusive(PROC_MODE, parent.StudySequence, "", ExclusiveModeStudyRelease);
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
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
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
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

    //初期化

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
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
  }
}
//070614 HSK山本 PVCS#2342 DEL-ST
//処理を出力設定画面(Output_Viewに移行)
////*****************************************************************************
//// Public_EndOutputExclusive
////
//// １．機能 
////      出力排他チェック処理後の処理 
//// ２．戻り値 
////　　  無し 
//// ３．備考 
////*****************************************************************************
//function Public_EndOutputExclusive(returnOutputStatus){
//  try{
//    //タイマ予約解除
//    clearTimeout(GetdateTimeOutId);
//    //2005/12/14 PVCS#1668 H.SAITO -ST-
//    // この後権限チェックを実施するため、処理中解除はしてはいけない 
//    ////処理中表示解除
//    //Public_CloseMessage();
//    //2005/12/14 PVCS#1668 H.SAITO -ED-
//    //エラーのチェックを行う
//    if(returnOutputStatus == 1){    //出力中
////DEBUG=========================  
//      Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_ID_OUTPUT_EXCL,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_ID_OUTPUT_EXCL,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_ID_OUTPUT_EXCL,"Cannt Get Message."));
//// 2006/06/16 PVCS#1738 H.SAITO -ST-
//      Public_CloseMessage();
//// 2006/06/16 PVCS#1738 H.SAITO -ED-
//      return;
////==============================
//    }else{
// 			  Fn_WriteLog(CTRL_OUTPUT);
//				parent.CHECKCOMMAND_PROC.Public_CheckCommand(PROC_MODE, COMMAND_MODE_OUTPUT);
//    }
//  }
//  catch(e){
//    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+16);
//  }
//}
//070614 HSK山本 PVCS#2342 DEL-ED
// 2005/06/25 046 H.SAITO PVCS#350
//***************************************************************************
//  Public_ErrorCheckCommand
//	(returnCode：操作権限チェック結果)	
//
//  1．機能
//      サーバ側での認証チェックで失敗した後の処理





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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_NOLOGIN,FILE_NAME,SPOT_CODE+19)
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_LOGOFF,FILE_NAME,SPOT_CODE+20)
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_DIFERENT,FILE_NAME,SPOT_CODE+21)
				return;
			//操作権限がない





			case CHECK_AUTHORITY_ERROR_AUTHORITY:
                Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MESSAGE_ID_FORBIDDEN,""), top.DispFrame.Public_GetLangMsgTitle2(MESSAGE_ID_FORBIDDEN,""),top.DispFrame.Public_GetLangMsgString(MESSAGE_ID_FORBIDDEN,"Cannt Get Message.")); 
				return;
			default:
				Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+22);
				return;
		}
	}catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+32);
	}	
}
//***************************************************************************
//  Public_EndCheckCommand
//	(returnCode：操作権限チェック結果, commandId：チェックを実施したコマンドID)	
//
//  1．機能
//      操作権限チェック後の処理




//	2．戻り値  
//		  なし




//  3．備考




//     
//***************************************************************************
function Public_EndCheckCommand(returnCode, commandMode){
	try{
		// 2005/09/12--ST
		//タイマ予約解除
		clearTimeout(UpdateTimeOutId);
		//処理中表示解除
		Public_CloseMessage();
		// 2005/09/12--EN
		//------------------------------//
		// 操作権限チェック結果を調べる //
		//------------------------------//
		switch(returnCode){
			//正常終了
			case RETURN_OK:
				break;
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_NOLOGIN,FILE_NAME,SPOT_CODE+10)
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_LOGOFF,FILE_NAME,SPOT_CODE+11)
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_DIFERENT,FILE_NAME,SPOT_CODE+12)
				return;
			//操作権限がない
			case CHECK_AUTHORITY_ERROR_AUTHORITY:
        		Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MESSAGE_ID_FORBIDDEN,""), top.DispFrame.Public_GetLangMsgTitle2(MESSAGE_ID_FORBIDDEN,""),top.DispFrame.Public_GetLangMsgString(MESSAGE_ID_FORBIDDEN,"Cannt Get Message.")); 
				return;
			default:
				Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+13);
				return;
		}

		//-----------------//
		// 画面の遷移を行う//
		//-----------------//
        // 親への完了通知
        var notifyInfo = { "commandMode" : commandMode, "commandParam" : "" };
        NotifyFrameFinished(notifyInfo);

	}catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+14);
	}	
}
//*****************************************************************************
// Fn_Init()
//
// １．機能 
//      画面初期化






// ２．戻り値
//　　  無し






// ３．備考






//*****************************************************************************
function Fn_Init(){
  try{
// ADD V1.0-1354 2005/02/06 hata=================================
		// ユーザガイダンス情報クリア
		parent.INFORMATION_VIEW.Public_ClearInformation();
// ADD EN======================================================

  }
  catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+15);
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
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+16);
	}
}

//070320 HSK古場 ADD-ST

//***************************************************************************
// Class MM_ButtonGroup
//
// １．機能 
//      Fn_ButtonEnable()で活性・不活性化するボタンを構成するエレメント群を

//      一つのオブジェクトとして管理する

// ２．戻り値
//      生成されたオブジェクト(this)
// ３．備考 
//***************************************************************************

// Constructor
function MM_ButtonGroup(groupData) {
  this._groupName           = groupData.groupName;
  this._tableElementId      = groupData.tableElementId;
  this._titleElementId      = groupData.titleElementId;
  this._valueElementId      = groupData.valueElementId;
  this._enableImgElementId  = groupData.enableImgElementId;
  this._disableImgElementId = groupData.disableImgElementId;
  return this;
}

// Methods
with (MM_ButtonGroup) {
//public:
  prototype.Enable = Enable_implementation;
  prototype.Disable = Disable_implementation;

//implementation:
  function Enable_implementation() {
    if (this._tableElementId != "") {
      document.getElementById(this._tableElementId).style.visibility = "visible";
    }
    if (this._titleElementId != "") {
      document.getElementById(this._titleElementId).style.color = "#000033";
    }
    if (this._valueElementId != "") {
     if (this._groupName != "Back") {
        document.getElementById(this._valueElementId).style.color = "#3366cc";
      } else {
        // 戻るボタンだけ黒

        document.getElementById(this._valueElementId).style.color = "black";
      }
    }
    if (this._enableImgElementId != "") {
      document.getElementById(this._enableImgElementId).style.visibility = "visible";
    }
    if (this._disableImgElementId != "") {
      document.getElementById(this._disableImgElementId).style.visibility = "hidden";
    }
  }

  function Disable_implementation() {
    if (this._tableElementId != "") {
      document.getElementById(this._tableElementId).style.visibility = "hidden";
    }
    if (this._titleElementId != "") {
      document.getElementById(this._titleElementId).style.color = "gray";
    }
    if (this._valueElementId != "") {
      document.getElementById(this._valueElementId).style.color = "gray";
    }
    if (this._enableImgElementId != "") {
      document.getElementById(this._enableImgElementId).style.visibility = "hidden";
    }
    if (this._disableImgElementId != "") {
      document.getElementById(this._disableImgElementId).style.visibility = "visible";
    }
  }
}

//070320 HSK古場 ADD-ED

//*****************************************************************************
// Fn_ButtonEnable(disp  0:不活性  1:活性  
//                       3:出力設定,患者情報設定活性  4:患者情報設定のみ活性
//                       5:メニュー変更、メニュー追加、画像入れ替え不活性
// １．機能
//     メニューボタンを活性・不活性化する 
// ２．戻り値
//　　  なし 
// ３．備考 
//*****************************************************************************
function Fn_ButtonEnable(disp){
  try{
//070320 HSK古場 ADD-ST
    var addMenuBtn     = MM_ButtonObjects[BTNGROUP_ADDMENU];
    var changeMenuBtn  = MM_ButtonObjects[BTNGROUP_CHANGEMENU];
    var deleteMenuBtn  = MM_ButtonObjects[BTNGROUP_DELETEMENU];
    var sortMenuBtn    = MM_ButtonObjects[BTNGROUP_SORTMENU];
    var changeImgBtn   = MM_ButtonObjects[BTNGROUP_CHANGEIMG];
    var outputBtn      = MM_ButtonObjects[BTNGROUP_OUTPUT];
    var editPatientBtn = MM_ButtonObjects[BTNGROUP_EDITPATIENT];
    var backBtn        = MM_ButtonObjects[BTNGROUP_BACK];
//070320 HSK古場 ADD-ED

	  switch(disp){
	    case 0:     //不活性
//070320 HSK古場 UPDATE-ST
        addMenuBtn.Disable();
        changeMenuBtn.Disable();
        deleteMenuBtn.Disable();
        sortMenuBtn.Disable();
        changeImgBtn.Disable();
        outputBtn.Disable();
        editPatientBtn.Disable();
        backBtn.Disable();
//070320 HSK古場 UPDATE-ED
	      break;

	    case 1:   //活性
//070320 HSK古場 UPDATE-ST
        addMenuBtn.Enable();
        changeMenuBtn.Enable();
        deleteMenuBtn.Enable();
        sortMenuBtn.Enable();
        changeImgBtn.Enable();
        outputBtn.Enable();
        editPatientBtn.Enable();
        backBtn.Enable();
//070320 HSK古場 UPDATE-ED
	      break;

      // 2005/07/06 002 H.SAITO PVCS#870 メディアから取り込んだ検査
      // メディアから取り込んだ検査の場合は、患者情報の編集,出力先設定,戻るボタンのみ活性化とする。




      case 3:
//070320 HSK古場 UPDATE-ST
        addMenuBtn.Disable();
        changeMenuBtn.Disable();
        deleteMenuBtn.Disable();
        sortMenuBtn.Disable();
        changeImgBtn.Disable();
        outputBtn.Enable();
        editPatientBtn.Enable();
        backBtn.Enable();
//070320 HSK古場 UPDATE-ED
        break;

    //#1346 2005/09/22--ST 管理外目的の場合は、患者編集のみ有効とする
      case 4:
//070320 HSK古場 UPDATE-ST
        addMenuBtn.Disable();
        changeMenuBtn.Disable();
        deleteMenuBtn.Disable();
        sortMenuBtn.Disable();
        changeImgBtn.Disable();
        outputBtn.Disable();
        editPatientBtn.Enable();
        backBtn.Enable();
//070320 HSK古場 UPDATE-ED
        break;
    //#1346 2005/09/22--EN

//070320 HSK古場 UPDATE-ST
    //内視鏡画像取り込みの場合は、メニュー追加、メニュー変更、画像入れ替えを不活性とする
      case 5:
        addMenuBtn.Disable();
        changeMenuBtn.Disable();
        deleteMenuBtn.Enable();
        sortMenuBtn.Enable();
        changeImgBtn.Disable();
        outputBtn.Enable();
        editPatientBtn.Enable();
        backBtn.Enable();
        break;
//070320 HSK古場 UPDATE-ED

	    default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+17);
	      break;
	  }
	}
	catch(e){
     Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+18);
	}
}
