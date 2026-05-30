/****************************************************************************

  @file ReserveStudy_View.js

  @brief ReserveStudy_Viewのクライアントスクリプト

  @author YSK畑
        SpotCode MAX 33

  Copyright(c) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/13  YSK畑       V1.0       新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  07/06/07  HSK古場     V2.0       PVCS#2281対応 
  @date  14/02/27  FFS星野     V2.4(B)HF0007 CQ#2393対応
 ****************************************************************************/
var PROC_MODE                           = "RESERVESTUDY_VIEW";
var COMMAND_MODE_CANCEL                 = "CANCEL";
var COMMAND_MODE_REGISTER               = "REGISTER";
var COMMAND_MODE_STUDY                  = "STUDY";
var COMMAND_MODE_DELETE                 = "DELETE";
var COMMAND_MODE_DELETE_CHECK           = "DELETECHECK";
var COMMAND_MODE_EDITPATIENTID          = "EDITPATIENTID";
var COMMAND_MODE_EDITPATIENTDETAIL      = "EDITPATIENTDETAIL";
var COMMAND_MODE_CHANGEPATIENT          = "CHANGEPATIENT";
var COMMAND_MODE_DELETE_ERROR           = "DELETEERROR";
var VIEW_MODE_EDITPATIENTID             = "EDITPATIENTID_VIEW";
var VIEW_MODE_EDITPATIENTDETAIL         = "EDITPATIENTDETAIL_VIEW";
var VIEW_MODE_CHANGEPATIENTID           = "CHANGEPATIENTID_VIEW";
var VIEW_MODE_MODIFYMAIN                = "MODIFYMAIN_VIEW";
// 操作ログ出力コマンドvar CTRL_EDITPATIENTID                  = "EditPatientId";     // 患者ＩＤ編集var CTRL_EDITPATIENTDETAIL              = "EditPatientDetail"; // 患者詳細情報編集var CTRL_MODIFY                         = "Modify";            // 修正
var CTRL_DELETE                         = "Delete";            // 削除
var CTRL_LOGOFF                         = "Logoff";            // ログオフvar CTRL_REFRESH                        = "Refresh";           // 更新
var CTRL_CHANGEPATIENT                  = "ChangePatient";     // 患者変更
var CTRL_STUDY                          = "Study";             // 検査開始var CTRL_REGIST_NEW                     = "RegistNew";         // 新規登録
// 操作権限チェック 戻り値
var CHECK_AUTHORITY_ERROR_NOT_LOGGED_IN	= -1; //ログインされていないvar CHECK_AUTHORITY_ERROR_LOGGED_OFF		= -2; //ログオフされた
var CHECK_AUTHORITY_ERROR_DIFFERENT_ID	= -3; //ユーザIDがアプリケーション変数と異なっている
var CHECK_AUTHORITY_ERROR_AUTHORITY			= -4; //操作権限がない// メニュー表示数
var MAXMENU                             = 4;
// 性別 
var SEX_MALE                            = 1;					// 男性
var SEX_FEMALE                          = 2;					// 女性
var SEX_OTHER                           = 3;					// その他// 敬称表示フラグ 
var FLAG_HONORIFIC_USE                  = 1;					// 敬称表示可
var FLAG_HONORIFIC_NOUSE                = 0;					// 敬称表示不可
// マルチバイトフラグ 
var REGISTRY_MULTIBYTE   = 1;					// マルチバイトvar REGISTRY_SINGLEBYTE  = 0;					// シングルバイト//ステータス(DB格納値との比較に使用)
var STATE_MISS_SHOT      = 2;					// 写損ステータス
var STATE_DELETE	     = 1;					// 削除ステータス
var STATE_NORMAL         = 0;					// 通常ステータス
// 保留中フラグ 
var FLAG_RESERVE_TRANS   = 2;		// 保留中ステータス(自動遷移不可)
var TIME_UPDATE          = 10000;			// 時刻設タイマー間隔
var UPDATE_TIMEOUT       = 30000;     // 削除/排他実施時のタイムアウト値
// エラーモードvar FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var USER_NOTHING_ERROR = "USER_NOTHING_ERROR";    //ユーザチェックエラー
var SPOT_CODE = 0;                   //スポットコードvar FILE_NAME = "ReserveStudy_View.js";  //ファイル名var MESSAGE_ID           = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS    = 30501;              //メッセージID 
//警告メッセージ
var MESSAGE_ID_NOLOGIN   = 31502;              //メッセージID 
var MESSAGE_ID_LOGOFF    = 31503;              //メッセージID 
var MESSAGE_ID_DIFERENT  = 31504;              //メッセージID 
var MESSAGE_ID_FORBIDDEN = 31505;
var MSG_EXCLUSIVE_RU     = 31507;
var MSG_EXCLUSIVE_STUDY  = 31506;
// 2005/07/20 003 H.SAITO #903 メッセージレベル変更(31512～31526→34512～34526)
//var MSG_WARNING_ID_OUTPUT_EXCL = 31512;        //出力中メッセージ
var MSG_WARNING_ID_OUTPUT_EXCL = 34512;        //出力中メッセージ
//2005/05/14 H.SAITO 削除ロック対応var MSG_WARNING_ID_LOCK_EXCL   = 31529;   //削除ロック中メッセージ
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
var MSG_ERROR_COMPLETED        = 31540;         //確認/確定済みの検査です// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-
// 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ST-
var MSG_ERROR_NODATA     = 31511;
// 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ED-
//排他制御スイッチ
var EXCLUSIVE_NOTHING    = -1;            // 排他制御(何もしない)
var EXCLUSIVE_DELL       = 0;             // 排他制御(開放)
var EXCLUSIVE_SET        = 1;             // 排他制御(設定)
var EXCLUSIVE_CHECK      = 2;             // 排他制御(チェック)
var EXCLUSIVE_CHECK_STUDY= 5;             // 排他制御(検査時チェック)
// 画像パス
var IMG_LOGOFF_DOWN           = "../Bmp/cmOvalAPaleLBtnD.GIF";
var IMG_LOGOFF_UP             = "../Bmp/cmOvalAPaleLBtnU.GIF";
var IMG_LOGOFF_DISABLE        = "../Bmp/cmOvalAPaleLBtnX.GIF";
var IMG_RENEWAL_DOWN          = "../Bmp/cmCirBblueBtnD.GIF";
var IMG_RENEWAL_UP            = "../Bmp/cmCirBblueBtnU.GIF";
var IMG_RENEWAL_DISABLE       = "../Bmp/cmCirBblueBtnX.GIF";
var IMG_REGIST_DOWN           = "../Bmp/cmCirBblueBtnD.GIF";
var IMG_REGIST_UP             = "../Bmp/cmCirBblueBtnU.GIF";
var IMG_REGIST_DISABLE        = "../Bmp/cmCirBblueBtnX.GIF";
var IMG_ENTRY_STUDY_DOWN      = "../Bmp/cmCirBGreenBtnD.GIF";
var IMG_ENTRY_STUDY_UP        = "../Bmp/cmCirBGreenBtnU.GIF";
var IMG_ENTRY_STUDY_DISABLE   = "../Bmp/cmCirBGreenBtnX.GIF";

var IMG_PATIENT_ID_DOWN       = "../Bmp/crPatideditBtnD.gif";
var IMG_PATIENT_ID_UP         = "../Bmp/crPatideditBtnU.gif";
var IMG_PATIENT_DETAIL_DOWN   = "../Bmp/crPatinfoeditBtnD.GIF";
var IMG_PATIENT_DETAIL_UP     = "../Bmp/crPatinfoeditBtnU.GIF";
var IMG_PATIENT_DETAIL_DOWN_S = "../Bmp/crPatinfoedit2BtnD.GIF";
var IMG_PATIENT_DETAIL_UP_S   = "../Bmp/crPatinfoedit2BtnU.GIF";
var IMG_PATIENT_CHANGE_DOWN   = "../Bmp/crPatchgBtnD.GIF";
var IMG_PATIENT_CHANGE_UP     = "../Bmp/crPatchgBtnU.GIF";
var IMG_MENU_NEXT_DOWN        = "../Bmp/cmDownPage4BtnD.GIF";
var IMG_MENU_NEXT_UP          = "../Bmp/cmDownPage4BtnU.GIF";
var IMG_MENU_NEXT_DISABLE     = "../Bmp/cmDownPage4BtnX.GIF";
var IMG_MENU_PREV_DOWN        = "../Bmp/cmUpPage4BtnD.GIF";
var IMG_MENU_PREV_UP          = "../Bmp/cmUpPage4BtnU.GIF";
var IMG_MENU_PREV_DISABLE     = "../Bmp/cmUpPage4BtnX.GIF";

var IMG_STUDY_FIRST_DOWN      = "../Bmp/cmTopBtnD.GIF";
var IMG_STUDY_FIRST_UP        = "../Bmp/cmTopBtnU.GIF";
var IMG_STUDY_FIRST_DISABLE   = "../Bmp/cmTopBtnX.GIF";
var IMG_STUDY_PREV_DOWN       = "../Bmp/cmBeforeSBtnD.GIF";
var IMG_STUDY_PREV_UP         = "../Bmp/cmBeforeSBtnU.GIF";
var IMG_STUDY_PREV_DISABLE    = "../Bmp/cmBeforeSBtnX.GIF";
var IMG_STUDY_NEXT_DOWN       = "../Bmp/cmNextSBtnD.GIF";
var IMG_STUDY_NEXT_UP         = "../Bmp/cmNextSBtnU.GIF";
var IMG_STUDY_NEXT_DISABLE    = "../Bmp/cmNextSBtnX.GIF";
var IMG_STUDY_END_DOWN        = "../Bmp/cmBottomBtnD.GIF";
var IMG_STUDY_END_UP          = "../Bmp/cmBottomBtnU.GIF";
var IMG_STUDY_END_DISABLE     = "../Bmp/cmBottomBtnX.GIF";

var IMG_MODIFY_DOWN           = "../Bmp/crStudyEditBtnD.GIF";
var IMG_MODIFY_UP             = "../Bmp/crStudyEditBtnU.GIF";
var IMG_MODIFY_DISABLE        = "../Bmp/crStudyEditBtnX.GIF";
var IMG_DELETE_DOWN           = "../Bmp/crStudyDelBtn2D.GIF";
var IMG_DELETE_UP             = "../Bmp/crStudyDelBtn2U.GIF";
var IMG_DELETE_DISABLE        = "../Bmp/crStudyDelBtn2X.GIF";

var IMG_CONF_OK_DOWN          = "../Bmp/cmOvalAGreenLBtnD.gif";
var IMG_CONF_OK_UP            = "../Bmp/cmOvalAGreenLBtnU.gif";
var IMG_CONF_NG_DOWN          = "../Bmp/cmOvalAPaleLBtnD.gif";
var IMG_CONF_NG_UP            = "../Bmp/cmOvalAPaleLBtnU.gif";
// 2005/07/21 005 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
//// 2005/05/14 002 H.SAITO 検査排他の変更(Cookie) 
//var COOKIE_NAME               = "StudyViewLock";	// 検査画面起動中クッキー名//// 2005/06/29 002 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
//var COOKIE_NAME_STUDY2        = "StudyLock";	  // 検査排他中クッキー名// 活性･不活性フラグ(0:不活性 1:活性
var ReserveNextFlag      = 0;	// 予約検査後var ReserveBackFlag      = 0;	// 予約検査前var MenuNextFlag         = 0;	// メニューリスト後var MenuBackFlag         = 0;	// メニューリスト前
var ReserveFlag          = 0;	// 予約検査
var SetTimeId            = 0;	// タイマー
var CommandMode;                            // 終了コマンドvar CommandParam;                           // 終了パラメタ
var UpdateTimeOutId;                        // 削除/排他実施時のタイマＩＤ
//*****************************************************************************
// Fn_InitPage
// １．機能
//      ページロード時の処理
// ２．戻り値
//　　  なし// ３．備考//　　　なし//*****************************************************************************
function Fn_InitPage(){
	try{
        //画面遷移開始通知設定
        SetViewMovingNotification(ViewMovingNotification);

	    var i;
	
		// 文字列表示
		document.getElementById("divPatId_Value").innerText        = LabelPatientId	;
		document.getElementById("divPatName_Value").innerText      = LabelPatientName;	
		document.getElementById("divPatKanjiName_Value").innerText = LabelPatientKanjiName;	
		document.getElementById("divPatSex_Value").innerText       = LabelPatientSex;	
		document.getElementById("divPatBirth_Value").innerText     = LabelPatientBirth;	
		document.getElementById("divEditId_Value").innerText       = ButtonPatEdit;
		document.getElementById("divEditDetail_Value").innerText   = ButtonPatDetailEdit;
		document.getElementById("divChange_Value").innerText       = ButtonPatChange;
		document.getElementById("divModify_Value").innerText       = ButtonModify;
		document.getElementById("divDelete_Value").innerText       = ButtonDelete;
		document.getElementById("divLogoff_Value").innerText       = ButtonLogoff;
		document.getElementById("divRenew_Value").innerText        = ButtonRenew;
		document.getElementById("divRegist_Value").innerText       = ButtonRegist;
		document.getElementById("divStart_Value").innerText        = ButtonStart;
		document.getElementById("divReserve").innerText            = LabelReserve;
		// 確認ボックス
		document.getElementById("DIV_ConfirmOkText").innerText			  = ConfirmOkString;
		document.getElementById("DIV_ConfirmCancelText").innerText	  = ConfirmCancelString;

    //フォント名,フォントサイズの設定    document.getElementById("BODY").style.fontFamily              = FONT_NAME;
    // 2005/06/23 002 H.SAITO デザイン変更対応(フォントサイズ）
    //document.getElementById("BODY").style.fontSize                = FONT_SIZE + "px";
    for(i = 0; i < MAXMENU; i++){
      document.getElementById("divMenuInfo" + i).style.fontFamily = FONT_NAME;
      // 2005/06/23 003 H.SAITO デザイン変更対応(フォントサイズ）
      //document.getElementById("divMenuInfo" + i).style.fontSize   = FONT_SIZE + "px";
      document.getElementById("divMenuInfo" + i).style.fontSize   = FONT_SIZE_MENU;
    }
    // 2005/06/23 039 H.SAITO デザイン変更対応(フォントサイズ）
    // 患者情報ラベル
    document.getElementById("divPatId_Value").style.fontSize        = FONT_SIZE_CAPTION;
    document.getElementById("divPatName_Value").style.fontSize      = FONT_SIZE_CAPTION;
    document.getElementById("divPatKanjiName_Value").style.fontSize = FONT_SIZE_CAPTION;
    document.getElementById("divPatSex_Value").style.fontSize       = FONT_SIZE_CAPTION;
    document.getElementById("divPatBirth_Value").style.fontSize     = FONT_SIZE_CAPTION;
    // 患者情報
    document.getElementById("divPatInfo0").style.fontSize           = FONT_SIZE_INPUTBOX;
    document.getElementById("divPatInfo1").style.fontSize           = FONT_SIZE_INPUTBOX;
    document.getElementById("divPatInfo2").style.fontSize           = FONT_SIZE_INPUTBOX;
    document.getElementById("divPatInfo3").style.fontSize           = FONT_SIZE_INPUTBOX;
    document.getElementById("divPatInfo4").style.fontSize           = FONT_SIZE_INPUTBOX;
    // 操作ボタン
    document.getElementById("divEditId_Value").style.fontSize       = FONT_SIZE_BUTTON;
    document.getElementById("divEditDetail_Value").style.fontSize   = FONT_SIZE_BUTTON;
    document.getElementById("divChange_Value").style.fontSize       = FONT_SIZE_BUTTON;
    document.getElementById("divModify_Value").style.fontSize       = FONT_SIZE_BUTTON;
    document.getElementById("divDelete_Value").style.fontSize       = FONT_SIZE_BUTTON;
    document.getElementById("divLogoff_Value").style.fontSize       = FONT_SIZE_BUTTON;
    document.getElementById("divRenew_Value").style.fontSize        = FONT_SIZE_BUTTON;
    document.getElementById("divRegist_Value").style.fontSize       = FONT_SIZE_BUTTON;
    document.getElementById("divStart_Value").style.fontSize        = FONT_SIZE_BUTTON;
    // メニューカウント
    document.getElementById("divMenuCount").style.fontSize          = FONT_SIZE_MENU_PAGE;
    // 予約検査件数
    document.getElementById("divReservePage").style.fontSize        = FONT_SIZE_MENU_PAGE;
    document.getElementById("divReserve").style.fontSize            = FONT_SIZE_MENU_PAGE; // 保留中　
    // その他
		document.getElementById("TD_NoReserveText").style.fontSize      = FONT_SIZE_OTHER;
		document.getElementById("TD_ProcText").style.fontSize           = FONT_SIZE_OTHER;
		document.getElementById("TD_ErrorText").style.fontSize          = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorTitle1").style.fontSize        = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorTitle2").style.fontSize        = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorCode").style.fontSize          = FONT_SIZE_OTHER;
		document.getElementById("DIV_ErrorOkText").style.fontSize       = FONT_SIZE_BUTTON;
		document.getElementById("DIV_ConfirmCancelText").style.fontSize = FONT_SIZE_BUTTON;
		document.getElementById("DIV_ConfirmOkText").style.fontSize     = FONT_SIZE_BUTTON;
    document.getElementById("TD_ConfirmText").style.fontSize        = FONT_SIZE_OTHER;

    //フィルタ解除
		Public_CloseMessage();

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
	}	
}


	
//***************************************************************************
//  Public_Init()		
//
//  1．機能
//      OnLoad時のメソッド
//		・文字列配置
//  2．戻り値  
//		  なし//  3．備考//     
//***************************************************************************
function Public_Init(){
	try{
		// 予約検査1番目取得		PageSet(1);
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
	}	
}

//**********************************************
//  PageSet(nPage : ページ数)		
//
//  1．機能
//       ページ遷移
//  2．戻り値  
//       なし//  3．備考//
//***********************************************
function PageSet(nPage){
	try{
		// 処理中ユーザのボタン操作を無効
		Public_Message("NODIALOG", "");

		// 最大ページが1より小さい場合		if(parent.ReserveMaxPage < 1){
			parent.ReserveMaxPage = 1;
			nPage = 1;
		}	
		// 指定したのページが1より小さい場合
		if(nPage < 1){
			nPage = 1;
		}	
		// 現在のページが最大ページより大きい場合
		else if(nPage > parent.ReserveMaxPage){
			nPage=parent.ReserveMaxPage;
		}

		// 予約検査情報データ削除
		parent.Fn_Init();
		
		// 予約検査情報取得
		var pp = parent.RESERVESTUDY_GET_PROC.frmUpdate;
		pp.reservePage.value   = nPage;
		pp.studySequence.value = "";
    // 2005/06/27 003 H.SAITO PVCS#350 認証、権限チェック対応
//070607 HSK古場 PVCS#2281 UPDATE-ST
//    pp.loginUserId.value   = escape(top.LoginUserId);
    pp.loginUserId.value   = encodeURIComponent(top.LoginUserId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
    pp.loginTime.value     = top.LoginTime;
		pp.submit();
		pp = null;

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
	}	
	
}
//**********************************************
//  StudySequenceSet(nPage : ページ数)		
//
//  1．機能
//       ページ遷移
//  2．戻り値  
//       なし//  3．備考//
//***********************************************
function StudySequenceSet(studySeq){
	try{
		// 処理中ユーザのボタン操作を無効
		Public_Message("NODIALOG", "");

		// 予約検査情報データ削除
		parent.Fn_Init();
		// 予約検査情報取得		var pp = parent.RESERVESTUDY_GET_PROC.frmUpdate;
		pp.reservePage.value   = "";
		pp.studySequence.value = studySeq;
    // 2005/06/27 003 H.SAITO PVCS#350 認証、権限チェック対応
//070607 HSK古場 PVCS#2281 UPDATE-ST
//    pp.loginUserId.value   = escape(top.LoginUserId);
    pp.loginUserId.value   = encodeURIComponent(top.LoginUserId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
    pp.loginTime.value     = top.LoginTime;
		pp.submit();
		pp = null;

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
	}	
	
}
//**********************************************
//  ReserveNoDisplay()		
//
//  1．機能
//       予約検査がないことを通知する。//       
//  2．戻り値  
//       なし//  3．備考//
//***********************************************
function ReserveNoDisplay(){
	try{
		// 時刻設定タイマー解除
		clearInterval(SetTimeId);

		//患者情報表示
		parent.INFORMATION_VIEW.Public_ClearInformation();
		// ユーザガイダンス表示
//2005/05/24-ST==========
//		parent.INFORMATION_VIEW.Public_SetUserGuidance(UserGuideReserveString); 
		parent.INFORMATION_VIEW.Public_SetUserGuidance(UserGuideReserveString,0); 
//2005/05/24-EN==========
		// 現在時刻の表示
		parent.INFORMATION_VIEW.Public_SetDateTime(top.NowTime);
		// 時刻設定を一定間隔で行う
		SetTimeId = setInterval("parent.INFORMATION_VIEW.Public_SetDateTime(top.NowTime)", TIME_UPDATE);

		// 予約検査なしダイアログ表示
		document.getElementById("TABLE_NoReserveFrame").style.visibility = "visible";
		document.getElementById("TD_NoReserveText").innerText = NoReserveString;
    document.getElementById("TD_NoReserveText").style.fontFamily  = FONT_NAME;
    // 2005/06/23 003 H.SAITO デザイン変更対応(フォントサイズ）
    //document.getElementById("TABLE_NoReserveBox").style.fontSize  = parseInt(FONT_SIZE)+5 + "px";
    document.getElementById("TABLE_NoReserveBox").style.fontSize  = FONT_SIZE_OTHER;

		parent.ReservePage = 0;
    //保留中非表示
		document.getElementById("divReserve").style.visibility = "hidden";
		document.getElementById("imgReserve").style.visibility = "hidden";
		// ボタンの不活性
		ButtonSet();
		// 処理中ユーザのボタン操作有効
		Public_CloseMessage();
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
	}
}
//**********************************************
//  ReserveDisplay()		
//
//  1．機能
//       テーブルに患者情報を設定//       メニュー表示／ボタン表示の呼び出し//  2．戻り値  
//       なし//  3．備考//
//***********************************************
function ReserveDisplay(){
	try	{
		// 時刻設定タイマー解除
		clearInterval(SetTimeId);

		//患者情報表示
		parent.INFORMATION_VIEW.Public_ClearInformation();
		// ユーザガイダンス表示
//2005/05/24-ST==========
//		parent.INFORMATION_VIEW.Public_SetUserGuidance(UserGuideReserveString); 
		parent.INFORMATION_VIEW.Public_SetUserGuidance(UserGuideReserveString,0); 
//2005/05/24-EN==========
		// 現在時刻の表示
		parent.INFORMATION_VIEW.Public_SetDateTime(top.NowTime);
		// 時刻設定を一定間隔で行う
		SetTimeId = setInterval("parent.INFORMATION_VIEW.Public_SetDateTime(top.NowTime)", TIME_UPDATE);


		// 予約検査なしダイアログ非表示
		document.getElementById("TABLE_NoReserveFrame").style.visibility = "hidden";

		var birthDate = "";
		aryMenuNameInfo   = parent.MenuNameInfoArray;
		aryMenuStateInfo  = parent.MenuStateInfoArray;
		aryMenuImageInfo  = parent.MenuImageInfoArray;
		
		// 保留中表示/非表示
		if(parent.TransStateFlag == FLAG_RESERVE_TRANS){
			document.getElementById("divReserve").style.visibility = "visible";
			document.getElementById("imgReserve").style.visibility = "visible";
		}else{	
			document.getElementById("divReserve").style.visibility = "hidden";
			document.getElementById("imgReserve").style.visibility = "hidden";
		}
		
		// 患者情報表示
		document.getElementById("divPatInfo0").innerText = parent.PatientId;

		var patientKanjiName = parent.PatientKanjiName;
		var patientName      = parent.PatientName;
		// 敬称表示による患者名の表示
		if(HonorificFlag == FLAG_HONORIFIC_USE){
			if(patientKanjiName != ""){
				patientKanjiName = patientKanjiName + HonorificTitle;
			}
			
			if(patientName != ""){
				patientName      = patientName + HonorificTitle;
			}
		}	
		document.getElementById("divPatInfo1").innerText = patientKanjiName;
		document.getElementById("divPatInfo2").innerText = patientName;
		
		// 性別表示
		switch (parent.PatientSex){
			case SEX_MALE:
			document.getElementById("divPatInfo3").innerText = LabelSexMale;
			break;
			case SEX_FEMALE:
			document.getElementById("divPatInfo3").innerText = LabelSexFemale;
			break;
			case SEX_OTHER:
			document.getElementById("divPatInfo3").innerText = LabelSexOther;
			break;
			default:
			document.getElementById("divPatInfo3").innerText = "";
			break;
		}
//CHANGE PVCS1440 2005/02/18===================================
		// 生年月日をSysConfigのフォーマットに合わせる
		birthDate = ChangeDateToScreenFormat(parent.PatientBirthDate, DateFormat);
		// 生年月日が異常値
		if(birthDate < 0 || birthDate == "" ) {
			document.getElementById("divPatInfo4").innerText = "";
		}else{
		  var age = GetAge(parent.PatientBirthDate);
      var ageStr = "("+ age + LabelAge +")";
			// 和暦の場合のみ1文字目を分割する
			document.getElementById("divPatInfo4").innerText = birthDate +" "+ ageStr;
		}			
//CHANGE=============================================

		// メニューページ数の初期化		gListMaxCount = 0;
		gListMaxPage = 1;
		gListPage = 1;
		// メニュー数を取得・表示
		gListMaxCount = aryMenuNameInfo.length;
		// メニュー表示
		ListDisplay();

		// ボタンの活性/不活性
		ButtonSet();
		// 処理中ユーザのボタン操作有効
		Public_CloseMessage();
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
	}	
	
}

//**********************************************
//  ListDisplay()		
//
//  1．機能
//       メニューリスト表示
//  2．戻り値  
//       なし
//  3．備考
//
//***********************************************
function ListDisplay(){
	try{
		// ページボタンのチェック
		ListButtonSet();

		// メニューの表示
		for (ListCnt=gListNo,i=0; ListCnt<gListNo+MAXMENU; ListCnt++,i++){
			divNo = "divMenuInfo" + i;
			imgNo = "imgMenuInfo" + i;
			imgDisp = "imgDeleteMenu" + i;
			// メニューが存在している場合
			if(ListCnt < gListMaxCount){
				document.getElementById(divNo).innerText        = aryMenuNameInfo[ListCnt];
				document.getElementById(divNo).style.visibility = "visible";
				document.getElementById(imgNo).style.visibility = "visible";
//写損の表示===================
				if(aryMenuImageInfo[ListCnt] == STATE_MISS_SHOT){
					document.getElementById(imgDisp).style.visibility = "visible";
				}else{
					document.getElementById(imgDisp).style.visibility = "hidden";
				}
//====================
			}
			// メニューが存在しない場合
			else{
				document.getElementById(divNo).innerText = "";
				document.getElementById(divNo).style.visibility   = "hidden";
				document.getElementById(imgNo).style.visibility   = "hidden";
				document.getElementById(imgDisp).style.visibility = "hidden";
			}
		}
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
	}	

}
//**********************************************
//  ButtonSet()		
//
//  1．機能
//       予約検査ページを設定
//  2．戻り値  
//       なし
//  3．備考
//
//***********************************************
function ButtonSet(){
	try{
		// 予約件数目を表示
		document.getElementById("divReservePage").innerText = parent.ReservePage + "/" + parent.ReserveMaxPage;

		// 修正ボタン/削除ボタンの活性/不活性
		if(parent.ReserveMaxPage < 1){
	    document.getElementById("imgModify_Enable").style.visibility  = "hidden";
	    document.getElementById("imgModify_Disable").style.visibility = "visible";
	    document.getElementById("divModify_Value").style.color        = "gray";

	    document.getElementById("imgDelete_Enable").style.visibility  = "hidden";
	    document.getElementById("imgDelete_Disable").style.visibility = "visible";
	    document.getElementById("divDelete_Value").style.color        = "gray";

	    document.getElementById("divStart_Value").style.color        = "gray";
	    document.getElementById("imgStart_Enable").style.visibility  = "hidden";
	    document.getElementById("imgStart_Disable").style.visibility = "visible";
			ReserveFlag  = 0;
		}
		else{
	    document.getElementById("imgModify_Enable").style.visibility  = "visible";
	    document.getElementById("imgModify_Disable").style.visibility = "hidden";
	    document.getElementById("divModify_Value").style.color        = "black";

	    document.getElementById("imgDelete_Enable").style.visibility  = "visible";
	    document.getElementById("imgDelete_Disable").style.visibility = "hidden";
	    document.getElementById("divDelete_Value").style.color        = "black";

	    document.getElementById("divStart_Value").style.color        = "black";
	    document.getElementById("imgStart_Enable").style.visibility  = "visible";
	    document.getElementById("imgStart_Disable").style.visibility = "hidden";
			ReserveFlag  = 1;
		}
		
		// 14/02/27 FFS星野 V2.4(B)HF0007 CQ#2393対応 ADD-ST
		//システム設定で削除ボタンオフの場合は強制でオフにする。
		if(parent.DeleteButtonEnable == 0)
		{
			document.getElementById("imgDelete_Enable").style.visibility  = "hidden";
			document.getElementById("imgDelete_Disable").style.visibility = "visible";
		}
		// 14/02/27 FFS星野 V2.4(B)HF0007 CQ#2393対応 ADD-ED
		
		// ページボタンの活性/不活性
		if(parent.ReservePage <= 1){
	    document.getElementById("imgFirst_Enable").style.visibility  = "hidden";
	    document.getElementById("imgFirst_Disable").style.visibility = "visible";
	    document.getElementById("imgBack_Enable").style.visibility   = "hidden";
	    document.getElementById("imgBack_Disable").style.visibility   = "visible";
			ReserveBackFlag  = 0;
		}
		else{
	    document.getElementById("imgFirst_Enable").style.visibility  = "visible";
	    document.getElementById("imgFirst_Disable").style.visibility = "hidden";
	    document.getElementById("imgBack_Enable").style.visibility   = "visible";
	    document.getElementById("imgBack_Disable").style.visibility   = "hidden";
			ReserveBackFlag  = 1;
		}

		if(parent.ReservePage >= parent.ReserveMaxPage){
	    document.getElementById("imgNext_Enable").style.visibility  = "hidden";
	    document.getElementById("imgNext_Disable").style.visibility = "visible";
	    document.getElementById("imgEnd_Enable").style.visibility   = "hidden";
	    document.getElementById("imgEnd_Disable").style.visibility   = "visible";
			ReserveNextFlag  = 0;
		}
		else{
	    document.getElementById("imgNext_Enable").style.visibility  = "visible";
	    document.getElementById("imgNext_Disable").style.visibility = "hidden";
	    document.getElementById("imgEnd_Enable").style.visibility   = "visible";
	    document.getElementById("imgEnd_Disable").style.visibility   = "hidden";
			ReserveNextFlag  = 1;
		}
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
	}	

}

//**********************************************
//  ListPageSet(nPage : 遷移するページ数)		
//
//  1．機能
//       メニューリストのページ遷移
//  2．戻り値  
//       なし
//  3．備考
//
//***********************************************
function ListPageSet(nPage){
	try{
		gListPage = nPage;
		// リストを更新をよびだす
		ListDisplay();
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
	}	
	
}
//**********************************************
//  ListButtonSet()		
//
//  1．機能
//       メニューリストページを設定//  2．戻り値  
//       なし//  3．備考//
//***********************************************
function ListButtonSet(){
	try{
		// リスト最大ページ数を取得		gListMaxPage = Math.ceil(gListMaxCount / MAXMENU);

		// 最大ページが1より小さい場合
		if(gListMaxPage < 1){
			gListMaxPage = 1;
		}	
		// 現在のページが1より小さい場合
		if(gListPage < 1){
			gListPage = 1;
		}	
		// 現在のページが最大ページより大きい場合
		else if(gListPage > gListMaxPage){
			gListPage=gListMaxPage;
		}

		// リスト番号を設定
		gListNo = MAXMENU * (gListPage - 1)  ;

		// リストページボタンの活性不活性
		if(gListPage <= 1){
			document.getElementById("imgUp_Enable").style.visibility  = "hidden";
			document.getElementById("imgUp_Disable").style.visibility = "visible";
			MenuBackFlag = 0;
		}
		else{
			document.getElementById("imgUp_Enable").style.visibility  = "visible";
			document.getElementById("imgUp_Disable").style.visibility = "hidden";
			MenuBackFlag = 1;
		}

		if(gListPage >= gListMaxPage){
			document.getElementById("imgDown_Enable").style.visibility  = "hidden";
			document.getElementById("imgDown_Disable").style.visibility = "visible";
			MenuNextFlag = 0;
		}
		else{
			document.getElementById("imgDown_Enable").style.visibility  = "visible";
			document.getElementById("imgDown_Disable").style.visibility = "hidden";
			MenuNextFlag = 1;
		}
		
		// メニューページ数の表示
    // 2005/06/23 003 H.SAITO デザイン変更対応(フォントサイズ)
		//var strMenuPage = LabelMenuTotal + gListMaxCount + LabelMenuCount +"   " + gListPage + "/" + gListMaxPage + LabelMenuPage;
		var strMenuPage = LabelMenuTotal + " " + gListMaxCount + LabelMenuCount +"   " + gListPage + "/" + gListMaxPage + LabelMenuPage;
		document.getElementById("divMenuCount").innerText = strMenuPage;	
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
	}	
	
}
//***************************************************************************
//  IndicatorUtilityOpen()		
//  1．機能
//     インジケータユーティリティ開始通知
//  2．戻り値  
//		  なし//  3．備考//***************************************************************************
function IndicatorUtilityOpen(){
	try{
		// 時刻設定タイマー解除
		clearInterval(SetTimeId);
		// 現在時刻の非表示
		top.NowTime = "";
		parent.INFORMATION_VIEW.Public_SetDateTime("");

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+10);
	}
}		
//***************************************************************************
//  IndicatorUtilityClose()		
//  1．機能
//     インジケータユーティリティ開始通知
//  2．戻り値  
//		  なし//  3．備考//***************************************************************************
function IndicatorUtilityClose(){
	try{
		// 時刻設定タイマー解除
		clearInterval(SetTimeId);
		// 時刻設定を一定間隔で行う
		SetTimeId = setInterval("parent.INFORMATION_VIEW.Public_SetDateTime(top.NowTime)", TIME_UPDATE);

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+11);
	}
}
//***************************************************************************
//  Fn_OnButton(tableNo ： ボタン種類)		
//
//  1．機能
//      画面遷移ボタン押下時の処理//	2．戻り値  
//		  なし//  3．備考//     
//***************************************************************************
function Fn_OnButton(tableNo){
	try{
		switch(tableNo){
    //============
    // 患者ID編集ボタン
    //============
    case 1:
      // 操作ログ出力      Fn_WriteLog(CTRL_EDITPATIENTID);
			// 操作権限チェック
      Fn_CheckCommand(COMMAND_MODE_EDITPATIENTID);
			//IMAGE変更
		  document.getElementById("imgEditId").src = IMG_PATIENT_ID_UP;
      break;
		case 2:  // ONMOUSEDOWN
		  document.getElementById("imgEditId").src = IMG_PATIENT_ID_DOWN;
			break;
		case 3:  // ONMOUSEOUT
		  document.getElementById("imgEditId").src = IMG_PATIENT_ID_UP;
		  break;
    //============
    // 患者詳細編集ボタン
    //============
    case 5:
      // 操作ログ出力      Fn_WriteLog(CTRL_EDITPATIENTDETAIL);
			// 操作権限チェック
      Fn_CheckCommand(COMMAND_MODE_EDITPATIENTDETAIL);
			//IMAGE変更
		  document.getElementById("imgEditDetail").src = IMG_PATIENT_DETAIL_UP;
      break;
		case 6:  // ONMOUSEDOWN
		  document.getElementById("imgEditDetail").src = IMG_PATIENT_DETAIL_DOWN;
			break;
		case 7:  // ONMOUSEOUT
		  document.getElementById("imgEditDetail").src = IMG_PATIENT_DETAIL_UP;
		  break;
    //============
    // 患者変更ボタン
    //============
    case 10:
      // 操作ログ出力      Fn_WriteLog(CTRL_CHANGEPATIENT);
			// 操作権限チェック
      Fn_CheckCommand(COMMAND_MODE_CHANGEPATIENT);
			//IMAGE変更
		  document.getElementById("imgChangePatient").src = IMG_PATIENT_CHANGE_UP;
      break;
		case 11:  // ONMOUSEDOWN
		  document.getElementById("imgChangePatient").src = IMG_PATIENT_CHANGE_DOWN;
			break;
		case 12:  // ONMOUSEOUT
		  document.getElementById("imgChangePatient").src = IMG_PATIENT_CHANGE_UP;
		  break;
    //============
    // 修正ボタン
    //============
    case 15:
			if(ReserveFlag == 1){
        // 操作ログ出力        Fn_WriteLog(CTRL_MODIFY);
				// 排他管理⇒修正メイン画面表示
				Fn_Exclusive(VIEW_MODE_MODIFYMAIN,"");
			}
			//IMAGE変更
		  document.getElementById("imgModify_Enable").src = IMG_MODIFY_UP;
      break;
		case 16:  // ONMOUSEDOWN
		  document.getElementById("imgModify_Enable").src = IMG_MODIFY_DOWN;
			break;
		case 17:  // ONMOUSEOUT
		  document.getElementById("imgModify_Enable").src = IMG_MODIFY_UP;
		  break;
    //============
    // 削除ボタン
    //============
    case 20:
    		// 14/02/27 FFS星野 V2.4(B)HF0007 CQ#2393対応 ADD-ST
    		if(parent.DeleteButtonEnable == 0)
			{
				//削除ボタンOFFの場合は処理しない
				break;
			}
			// 14/02/27 FFS星野 V2.4(B)HF0007 CQ#2393対応 ADD-ED
			if(ReserveFlag == 1){
				document.getElementById("TD_ConfirmText").innerText = ConfirmDeleteString;
				Public_Confirm();
			}
			//IMAGE変更
		  document.getElementById("imgDelete_Enable").src = IMG_DELETE_UP;
      break;
		case 21:  // ONMOUSEDOWN
    		// 14/02/27 FFS星野 V2.4(B)HF0007 CQ#2393対応 ADD-ST
    		if(parent.DeleteButtonEnable == 0)
			{
				//削除ボタンOFFの場合は処理しない
				break;
			}
			// 14/02/27 FFS星野 V2.4(B)HF0007 CQ#2393対応 ADD-ED
		  document.getElementById("imgDelete_Enable").src = IMG_DELETE_DOWN;
			break;
		case 22:  // ONMOUSEOUT
    		// 14/02/27 FFS星野 V2.4(B)HF0007 CQ#2393対応 ADD-ST
    		if(parent.DeleteButtonEnable == 0)
			{
				//削除ボタンOFFの場合は処理しない
				break;
			}
			// 14/02/27 FFS星野 V2.4(B)HF0007 CQ#2393対応 ADD-ED
		  document.getElementById("imgDelete_Enable").src = IMG_DELETE_UP;
		  break;
    //============
    // 削除OKボタン
    //============
    case 25:
      // 操作ログ出力      Fn_WriteLog(CTRL_DELETE);
			// 操作権限チェック
      Fn_CheckCommand(COMMAND_MODE_DELETE);
			//IMAGE変更
		  document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_UP;
      break;
		case 26:  // ONMOUSEDOWN
		  document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_DOWN;
			break;
		case 27:  // ONMOUSEOUT
		  document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_UP;
		  break;
    //============
    // 削除キャンセルボタン
    //============
    case 35:
			// 確認ボックスを閉じる
			Public_CloseConfirm();
			//IMAGE変更
		  document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_UP;
      break;
		case 36:  // ONMOUSEDOWN
		  document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_DOWN;
			break;
		case 37:  // ONMOUSEOUT
		  document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_UP;
		  break;
    //============
    // 更新ボタン
    //============
    case 50:
      // 操作ログ出力      Fn_WriteLog(CTRL_REFRESH);
			// 更新処理開始			PageSet(1);
		  document.getElementById("imgRenew").src = IMG_RENEWAL_UP;
      break;
		case 51:  // ONMOUSEDOWN
		  document.getElementById("imgRenew").src = IMG_RENEWAL_DOWN;
			break;
		case 52:  // ONMOUSEOUT
		  document.getElementById("imgRenew").src = IMG_RENEWAL_UP;
		  break;
    //============
    // ↑ボタン(メニュー)
    //============
    case 60:
			// 不活性の場合未処理			if(MenuBackFlag == 1){
				ListPageSet(gListPage-1);
			}
			//IMAGE変更
		  document.getElementById("imgUp_Enable").src = IMG_MENU_PREV_UP;
      break;
		case 61:  // ONMOUSEDOWN
		  document.getElementById("imgUp_Enable").src = IMG_MENU_PREV_DOWN;
			break;
		case 62:  // ONMOUSEOUT
		  document.getElementById("imgUp_Enable").src = IMG_MENU_PREV_UP;
		  break;
    //============
    // ↓ボタン(メニュー)
    //============
    case 65:
			// 不活性の場合未処理			if(MenuNextFlag == 1){
				ListPageSet(gListPage+1);
			}
			//IMAGE変更
		  document.getElementById("imgDown_Enable").src = IMG_MENU_NEXT_UP;
      break;
		case 66:  // ONMOUSEDOWN
		  document.getElementById("imgDown_Enable").src = IMG_MENU_NEXT_DOWN;
			break;
		case 67:  // ONMOUSEOUT
		  document.getElementById("imgDown_Enable").src = IMG_MENU_NEXT_UP;
		  break;
    //============
    // 検査先頭ボタン
    //============
    case 70:
			// 不活性の場合未処理//			if(MenuNextFlag == 1){
//				ListPageSet(gListPage+1);
//			}
			if(ReserveBackFlag == 1){
				PageSet(1);
			}
			//IMAGE変更
		  document.getElementById("imgFirst_Enable").src = IMG_STUDY_FIRST_UP;
      break;
		case 71:  // ONMOUSEDOWN
		  document.getElementById("imgFirst_Enable").src = IMG_STUDY_FIRST_DOWN;
			break;
		case 72:  // ONMOUSEOUT
		  document.getElementById("imgFirst_Enable").src = IMG_STUDY_FIRST_UP;
		  break;
    //============
    // 検査前へボタン
    //============
    case 75:
			// 不活性の場合未処理			if(ReserveBackFlag == 1){
				PageSet(parent.ReservePage-1);
			}
			//IMAGE変更
		  document.getElementById("imgBack_Enable").src = IMG_STUDY_PREV_UP;
      break;
		case 76:  // ONMOUSEDOWN
		  document.getElementById("imgBack_Enable").src = IMG_STUDY_PREV_DOWN;
			break;
		case 77:  // ONMOUSEOUT
		  document.getElementById("imgBack_Enable").src = IMG_STUDY_PREV_UP;
		  break;
    //============
    // 検査次へボタン
    //============
    case 80:
			// 不活性の場合未処理			if(ReserveNextFlag == 1){
				PageSet(parent.ReservePage+1);
			}
			//IMAGE変更
		  document.getElementById("imgNext_Enable").src = IMG_STUDY_NEXT_UP;
      break;
		case 81:  // ONMOUSEDOWN
		  document.getElementById("imgNext_Enable").src = IMG_STUDY_NEXT_DOWN;
			break;
		case 82: // ONMOUSEOUT
		  document.getElementById("imgNext_Enable").src = IMG_STUDY_NEXT_UP;
		  break;
    //============
    // 検査最後へボタン
    //============
    case 85:
			// 不活性の場合未処理			if(ReserveNextFlag == 1){
				PageSet(parent.ReserveMaxPage);
			}
			//IMAGE変更
		  document.getElementById("imgEnd_Enable").src = IMG_STUDY_END_UP;
      break;
		case 86:  // ONMOUSEDOWN
		  document.getElementById("imgEnd_Enable").src = IMG_STUDY_END_DOWN;
			break;
		case 87:  // ONMOUSEOUT
		  document.getElementById("imgEnd_Enable").src = IMG_STUDY_END_UP;
		  break;
    //============
    // ログオフボタン
    //============
    case 90:
      // 操作ログ出力      Fn_WriteLog(CTRL_LOGOFF);
        // ログオフ 			
        var notifyInfo = { "commandMode" : COMMAND_MODE_CANCEL, "commandParam" : "" };
        NotifyFrameFinished(notifyInfo);
			//IMAGE変更
		  document.getElementById("imgLogoff").src = IMG_LOGOFF_UP;
      break;
		case 91:  // ONMOUSEDOWN
		  document.getElementById("imgLogoff").src = IMG_LOGOFF_DOWN;
			break;
		case 92:  // ONMOUSEOUT
		  document.getElementById("imgLogoff").src = IMG_LOGOFF_UP;
		  break;
    //============
    // 新規登録ボタン
    //============
    case 93:
      // 操作ログ出力      Fn_WriteLog(CTRL_REGIST_NEW);
			// 検査登録画面(患者ID)表示
            // 親への完了通知
            var notifyInfo = { "commandMode" : COMMAND_MODE_REGISTER, "commandParam" : "" };
            NotifyFrameFinished(notifyInfo);
			//IMAGE変更
		  document.getElementById("imgRegist").src = IMG_REGIST_UP;
			break;
		case 94:  // ONMOUSEDOWN
		  document.getElementById("imgRegist").src = IMG_REGIST_DOWN;
			break;
		case 95:  // ONMOUSEOUT
		  document.getElementById("imgRegist").src = IMG_REGIST_UP;
		  break;
    //============
    // 検査開始ボタン
    //============
    case 96:
			if(ReserveFlag == 1){
        // 操作ログ出力        Fn_WriteLog(CTRL_STUDY);
        // 2005/07/21 011 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
        //// 2005/05/14 008 H.SAITO 検査排他の変更(Cookie)
        //// 検査画面の起動をチェックする(1:起動中,0:未起動)
        //// 2005/06/21 003 H.SAITO 検査排他の変更(Cookie) 保存箇所の共有        ////readCookieBuff = sReadCookie(COOKIE_NAME);
        //readCookieBuff = top.GetCookie(COOKIE_NAME);
        //// 起動中は２重起動できない        //if(readCookieBuff == 1){
    		//  Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_EXCLUSIVE_RU,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_EXCLUSIVE_RU,""),top.DispFrame.Public_GetLangMsgString(MSG_EXCLUSIVE_RU,"Cannt Get Message."));
        //  return;
        //}
				// 排他管理⇒検査画面表示
        Fn_Exclusive(COMMAND_MODE_STUDY, "");
			}
			//IMAGE変更
		  document.getElementById("imgStart_Enable").src = IMG_ENTRY_STUDY_UP;
			break;
		case 97:  // ONMOUSEDOWN
		  document.getElementById("imgStart_Enable").src = IMG_ENTRY_STUDY_DOWN;
			break;
		case 98:  // ONMOUSEOUT
		  document.getElementById("imgStart_Enable").src = IMG_ENTRY_STUDY_UP;
		  break;
		case 100:// 続行可能エラー時のＯＫボタン
			Public_CloseMessage();
			Public_CloseError();     
			break;
		default:
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+12);
			break;
		}
		
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+13);
	}	
}
//***************************************************************************
//  Fn_CheckCommand
//
//  1．機能
//      操作権限チェック処理//	2．戻り値  
//		  なし//  3．備考//     
//***************************************************************************
function Fn_CheckCommand(commandMode){
  try{

   	// 処理中ユーザのボタン操作を無効
		Public_Message("DIALOG", ProcString);   
    
		// 確認ボックスを閉じる
		Public_CloseConfirm();

    //タイマ予約    UpdateTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+14) +")", UPDATE_TIMEOUT);

    // 操作権限チェック
    parent.CHECKCOMMAND_PROC.Public_CheckCommand(PROC_MODE, commandMode);

  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+15);
  }
}
// 2005/06/27 015 H.SAITO PVCS#350 検査開始での認証、権限チェックエラー時の処理(Exclusive_Procより呼ばれる)
//***************************************************************************
//  Public_ErrorCheckCommand
//	(returnCode：操作権限チェック結果)	
//
//  1．機能
//      操作権限チェック後の処理//	2．戻り値  
//		  なし//  3．備考//     
//***************************************************************************
function Public_ErrorCheckCommand(returnCode){
  Public_EndCheckCommand(returnCode, "");
}
//***************************************************************************
//  Public_EndCheckCommand
//	(returnCode：操作権限チェック結果, commandId：チェックを実施したコマンドID)	
//
//  1．機能
//      操作権限チェック後の処理//	2．戻り値  
//		  なし//  3．備考//     
//***************************************************************************
function Public_EndCheckCommand(returnCode, commandMode){
	try{
    //タイマ予約解除
    clearTimeout(UpdateTimeOutId);

		//--------------------------//
		// 操作権限エラーを表示する //
		//--------------------------//
		switch(returnCode){
		  //正常
		  case 0:
        break;
//2005/05/27-ST======================
			//ログインされていない			case CHECK_AUTHORITY_ERROR_NOT_LOGGED_IN:
			top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_NOLOGIN,FILE_NAME,SPOT_CODE+16)
        //処理中表示解除
        Public_CloseMessage();
				return;
			//ログオフされた
			case CHECK_AUTHORITY_ERROR_LOGGED_OFF:
			top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_LOGOFF,FILE_NAME,SPOT_CODE+17)
        //処理中表示解除
        Public_CloseMessage();
				return;
			//ユーザIDがアプリケーション変数と異なっている
			case CHECK_AUTHORITY_ERROR_DIFFERENT_ID:
			top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_DIFERENT,FILE_NAME,SPOT_CODE+18)
        //処理中表示解除
        Public_CloseMessage();
				return;
//2005/05/27-EN======================
			//操作権限がない			case CHECK_AUTHORITY_ERROR_AUTHORITY:
    		Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MESSAGE_ID_FORBIDDEN,""), top.DispFrame.Public_GetLangMsgTitle2(MESSAGE_ID_FORBIDDEN,""),top.DispFrame.Public_GetLangMsgString(MESSAGE_ID_FORBIDDEN,"Cannt Get Message.")); 
        // 2005/02/15 UT No.25-0083 003 H.SAITO
        //処理中表示解除
        Public_CloseMessage();
				return;
			default:
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+19);
				return;
		}
    // 操作権限チェックＯＫならば排他処理を実施する
    switch(commandMode){
      // 患者ＩＤ編集
      case COMMAND_MODE_EDITPATIENTID:
			  // 排他管理⇒患者ID編集画面表示
        Fn_Exclusive(VIEW_MODE_EDITPATIENTID, "");
        break;
      // 患者詳細情報編集
      case COMMAND_MODE_EDITPATIENTDETAIL:
			  // 排他管理⇒患者詳細編集画面表示
        Fn_Exclusive(VIEW_MODE_EDITPATIENTDETAIL, "");
        break;
      // 患者変更
      case COMMAND_MODE_CHANGEPATIENT:
			  // 排他管理⇒患者変更画面表示
        Fn_Exclusive(VIEW_MODE_CHANGEPATIENTID, "");
        break;
      // 削除
      case COMMAND_MODE_DELETE:
        // 排他チェック⇒排他確保⇒削除実施
        Fn_Exclusive(COMMAND_MODE_DELETE_CHECK, "");
        break;
      default:
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+20);
        return;    
    }
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+21);
	}	
}
//*****************************************************************************
// Fn_Exclusive
//
// １．機能
//     排他処理を行う
// ２．戻り値
//　　  なし// ３．備考//　　　なし//*****************************************************************************
function Fn_Exclusive(commandMode, commandParam){
  try{
    var exclusiveModeStudy = ""; //検査の排他    var exclusiveModeRu    = ""; //ＲＵの排他  
    //コマンドとパラメータの退避
    CommandMode  = commandMode;
    CommandParam = commandParam;

   	// 処理中ユーザのボタン操作を無効
		Public_Message("DIALOG", ProcString);   
    
    //----------------------------------//
    //コマンドによって排他管理を設定する//
    //----------------------------------//
    switch(commandMode){
      //検査開始      case COMMAND_MODE_STUDY:  
        // 2005/11/30 PVCS#1560 H.SAITO ここでの排他チェックは冗長のため削除 -ST-
        //exclusiveModeStudy        = EXCLUSIVE_CHECK_STUDY;
        //exclusiveModeRu           = EXCLUSIVE_CHECK;
        exclusiveModeStudy        = EXCLUSIVE_NOTHING;
        exclusiveModeRu           = EXCLUSIVE_NOTHING;
        // 2005/11/30 PVCS#1560 H.SAITO ここでの排他チェックは冗長のため削除 -ED-
        break;
      //削除時の排他確認  
      case COMMAND_MODE_DELETE_CHECK:
        // 2005/11/30 PVCS#1560 H.SAITO ここでの排他チェックは冗長のため削除 -ST-
        //exclusiveModeStudy        = EXCLUSIVE_CHECK;
        exclusiveModeStudy        = EXCLUSIVE_NOTHING;
        // 2005/11/30 PVCS#1560 H.SAITO ここでの排他チェックは冗長のため削除 -ED-
        break;
      //検査削除
      case COMMAND_MODE_DELETE:
        exclusiveModeStudy        = EXCLUSIVE_SET;
        break;
      //編集,修正
      case VIEW_MODE_EDITPATIENTID:
      case VIEW_MODE_EDITPATIENTDETAIL:
      case VIEW_MODE_CHANGEPATIENTID:
      case VIEW_MODE_MODIFYMAIN:
        // 2005/11/30 PVCS#1560 H.SAITO ここでの排他チェックは冗長のため削除 -ST-
        //exclusiveModeStudy        = EXCLUSIVE_CHECK;
        exclusiveModeStudy        = EXCLUSIVE_NOTHING;
        // 2005/11/30 PVCS#1560 H.SAITO ここでの排他チェックは冗長のため削除 -ED-
        break;
      //検査削除時に検査が出力中の場合      case COMMAND_MODE_DELETE_ERROR:
        exclusiveModeStudy        = EXCLUSIVE_DELL;
        break;
      //エラー
      default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+22);
        break;
    }
    //-----------------------------------------------------------------------//
    // ＲＵ,検査のいずれの排他管理も行わない場合はサーバアクセスしないようにする //
    //-----------------------------------------------------------------------//
    if(exclusiveModeStudy == EXCLUSIVE_NOTHING && exclusiveModeRu == EXCLUSIVE_NOTHING){
      Public_EndExclusive(0 , 0);
    }
    else{
      //タイマ予約      UpdateTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+23) +")", UPDATE_TIMEOUT);
      //排他を実施する
      parent.EXCLUSIVE_PROC.Public_Exclusive(PROC_MODE, parent.StudySequence, exclusiveModeRu, exclusiveModeStudy);
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+24);
  }
}
//*****************************************************************************
// Public_EndExclusive
//
// １．機能 
//      排他処理後の処理// ２．戻り値
//　　  無し// ３．備考//*****************************************************************************
function Public_EndExclusive(returnCodeRu, returnCodeStudy){
  try{
    //タイマ予約解除
    clearTimeout(UpdateTimeOutId);

    // 2005/11/30 PVCS#1560 H.SAITO ここでの排他チェックは冗長のため削除 -ST-
    ////---------------------------------//
    ////ＲＵ排他のエラーのチェックを行う //
    ////---------------------------------//
    //switch(returnCodeRu){
      //case 0:
      //  break;
      //// 2005/07/19 013 H.SAITO #190 RU排他チェック時の自己排他エラーはさらにCookieチェックを実施する
      //case 4:
      //  // 2005/07/21 011 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
      //  //readCookieBuff = top.GetCookie(COOKIE_NAME_STUDY);
      //  //// 起動中は２重起動できない      //  //if(readCookieBuff == 1){
      //  //  //ワーニングメッセージ
      //  //  document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_EXCLUSIVE_RU,"");
      //  //  document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_EXCLUSIVE_RU,"");
      //  //  document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_EXCLUSIVE_RU,"Cannt Get Message.");
      //  //  Public_Confirm();
      //  //  return;
      //  //}
      //  break;
      //case 3:
      //// 2005/07/19 002 H.SAITO #190 RU排他チェック時の自己排他エラーはさらにCookieチェックを実施する
      ////case 4:
      //case 5:
      //  //処理中表示解除
      //  Public_CloseMessage();
      //  //続行可能なエラー
////        Public_ErrorDisplay(RETRY_ERROR, 31517, FILE_NAME, 0);
    	//	Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_EXCLUSIVE_RU,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_EXCLUSIVE_RU,""),top.DispFrame.Public_GetLangMsgString(MSG_EXCLUSIVE_RU,"Cannt Get Message.")); 
      //  return;
    //}
    // 2005/11/30 PVCS#1560 H.SAITO ここでの排他チェックは冗長のため削除 -ED-

    //-----------------------------------//
    //検査の排他のエラーのチェックを行う //
    //-----------------------------------//
    // 処理によって排他エラー時の振舞いを変更する
    switch(returnCodeStudy){
      case 0:
        break;
      // 検査排他情報登録済(他機能)エラー  
      case 3: 
// 2005/11/30 PVCS#1560 H.SAITO チェックは冗長のため削除 -ST-
//// 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ST-
////      // 2005/05/28 003 H.SAITO 排他チェックの変更(排他チェックにて検査排他情報登録済み(自機能)の場合はそのまま続行)
////      //// 検査排他情報登録済(自機能)エラー
////      //case 4:
////        // 排他の確認時のエラーは再試行可能とする
////        if(CommandMode != COMMAND_MODE_DELETE){
////          //処理中表示解除
////          Public_CloseMessage();
////          //続行可能なエラー
//////          Public_ErrorDisplay(RETRY_ERROR, 31504, FILE_NAME, 0);
////    		Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_EXCLUSIVE_STUDY,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_EXCLUSIVE_STUDY,""),top.DispFrame.Public_GetLangMsgString(MSG_EXCLUSIVE_STUDY,"Cannt Get Message.")); 
////          return;
////        }
////        // 削除実施時は排他を設定するため、致命的なエラーとする
////        else{
////          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+25);
//////          Public_Error(FATAL_ERROR, "Exclusive Control was failed :" +  returnCodeStudy);
////          return;
////        }
////        break;
//        // 排他チェック時、セット時とも他機能による排他エラーが発生した場合は再施行可能エラーとする
//        //処理中表示解除
//        Public_CloseMessage();
//        //続行可能なエラー
//    	  Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_EXCLUSIVE_STUDY,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_EXCLUSIVE_STUDY,""),top.DispFrame.Public_GetLangMsgString(MSG_EXCLUSIVE_STUDY,"Cannt Get Message.")); 
//        return;
//	  // 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ED-
        // 検査削除時（排他セット時）のみエラーダイアログを表示する。
        // チェック時は何もせず、遷移先画面にて処理を実施する
        switch(CommandMode){
          case COMMAND_MODE_DELETE:
            //処理中表示解除
            Public_CloseMessage();
            //続行可能なエラー
        	  Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_EXCLUSIVE_STUDY,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_EXCLUSIVE_STUDY,""),top.DispFrame.Public_GetLangMsgString(MSG_EXCLUSIVE_STUDY,"Cannt Get Message.")); 
            return;
        }
        break;
// 2005/11/30 PVCS#1560 H.SAITO チェックは冗長のため削除 -ED-

      // 2005/05/28 018 H.SAITO 排他チェックの変更(排他チェックにて検査排他情報登録済み(自機能)の場合はそのまま続行)
      // 検査排他情報登録済(自機能)エラー(チェック時)
      case 4:
        //検査排他情報登録済(自機能)エラーでの続行は排他チェックした場合のみとする
        switch(CommandMode){
          // 2005/11/30 PVCS#1560 H.SAITO ここでの排他チェックは冗長のため削除 -ST-
          //case COMMAND_MODE_STUDY:  
          //case COMMAND_MODE_DELETE_CHECK:
          //case VIEW_MODE_EDITPATIENTID:
          //case VIEW_MODE_EDITPATIENTDETAIL:
          //case VIEW_MODE_CHANGEPATIENTID:
          //case VIEW_MODE_MODIFYMAIN:
          //  // 2005/07/21 009 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
          //  //// 2005/06/29 008 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
          //  //// 検査の排他をチェックする
          //  //readCookieBuff = top.GetCookie(COOKIE_NAME_STUDY2, parent.StudySequence);
          //  //// 検査がすでに排他中ならば検査,修正できない          //  //if(readCookieBuff == 1){
    		  //  //  Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_EXCLUSIVE_STUDY,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_EXCLUSIVE_STUDY,""),top.DispFrame.Public_GetLangMsgString(MSG_EXCLUSIVE_STUDY,"Cannt Get Message.")); 
          //  //  return;
          //  //}
          //  break;
          // 2005/11/30 PVCS#1560 H.SAITO ここでの排他チェックは冗長のため削除 -ED-
          // 2005/11/30 PVCS#1560 H.SAITO -ST-
          case COMMAND_MODE_DELETE:
            // 検査排他情報登録済(自機能)エラー(セット時)
            //処理中表示解除
            Public_CloseMessage();
            //続行可能なエラー
      	    Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_EXCLUSIVE_STUDY,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_EXCLUSIVE_STUDY,""),top.DispFrame.Public_GetLangMsgString(MSG_EXCLUSIVE_STUDY,"Cannt Get Message."));
            return;
          // 2005/11/30 PVCS#1560 H.SAITO -ED-
          // チェック以外の排他処理でのエラーは致命的なエラーとする
          default:
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+26);
            return;
        }
        break;
      // 検査なしエラー
      // 2005/11/30 PVCS#1560 H.SAITO -ST-
      //case -4:
      case 5:
      // 2005/11/30 PVCS#1560 H.SAITO -ED-
	    // 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ST-
//        // 排他の確認時のエラーは再試行可能とする
//        if(CommandMode != COMMAND_MODE_DELETE){
//          //処理中表示解除
//          Public_CloseMessage();
//          //続行可能なエラー
////          Public_ErrorDisplay(RETRY_ERROR, 31504, FILE_NAME, 0);
//      		Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_EXCLUSIVE_STUDY,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_EXCLUSIVE_STUDY,""),top.DispFrame.Public_GetLangMsgString(MSG_EXCLUSIVE_STUDY,"Cannt Get Message.")); 
//          return;
//        }
//        // 削除実施時は排他を設定するため、致命的なエラーとする
//        else{
//          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+27);
////          Public_Error(FATAL_ERROR, "Exclusive Control was failed :" +  returnCodeStudy);
//          return;
//        }
//        break;
        //排他操作(チェック、セット)を実施しようとしたが、すでに削除されていた場合は再施行可能なエラーとする。 
        //処理中表示解除
        Public_CloseMessage();
        //続行可能なエラー
      	Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_NODATA,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_NODATA,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_NODATA,"Cannt Get Message.")); 
	    // 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ED-
        return;
      // エラー
      default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+28);
        return;        
    }
    //-------------------------------------------------------------------//
    //コマンドに応じた処理を行う（削除/削除終了後の場合は遷移を行わない）//  
    //-------------------------------------------------------------------//
    switch(CommandMode){
      //-----------------//
      // 削除時 排他確認 //
      //-----------------//
      // 排他チェックＯＫのため、排他を削除実施する
      case COMMAND_MODE_DELETE_CHECK:
        Fn_Exclusive(COMMAND_MODE_DELETE, CommandParam);
        break;
      //------//
      // 削除 //  
      //------//
      case COMMAND_MODE_DELETE:
        // 更新タイマ予約        UpdateTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+29) +")", UPDATE_TIMEOUT);
			  // 削除処理実施
			  parent.RESERVESTUDY_DELETE.frmDelete.studySequence.value = parent.StudySequence;
//070607 HSK古場 PVCS#2281 UPDATE-ST
//			  parent.RESERVESTUDY_DELETE.frmDelete.loginUserId.value   = escape(top.LoginUserId);
			  parent.RESERVESTUDY_DELETE.frmDelete.loginUserId.value   = encodeURIComponent(top.LoginUserId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
			  parent.RESERVESTUDY_DELETE.frmDelete.loginTime.value     = top.LoginTime;
			  parent.RESERVESTUDY_DELETE.frmDelete.submit();
        break;
      //-----------------------------//
      // 削除時 出力中のため削除不可 //  
      //-----------------------------//
      case COMMAND_MODE_DELETE_ERROR:
        //処理中表示解除
        Public_CloseMessage();
        break;
      //----------//
      // 検査開始 // 
      //----------//
      case COMMAND_MODE_STUDY:
        //処理中表示解除
        Public_CloseMessage();
        //画面の遷移
        // 親への完了通知
        var notifyInfo = { "commandMode" : CommandMode, "commandParam" : CommandParam };
        NotifyFrameFinished(notifyInfo);
        break;
      //--------------------//
      // 修正/編集/患者変更 // 
      //--------------------//
      default:
        //処理中表示解除
        Public_CloseMessage();
        //画面の遷移
        parent.Public_View_Modify(CommandMode);
        break;
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+30);
  }
}
//*****************************************************************************
// Public_EndDelete
//
// １．機能 
//      削除処理後の処理// ２．戻り値
//　　  無し// ３．備考//*****************************************************************************
function Public_EndDelete(){
  try{
    // タイマ予約解除
    clearTimeout(UpdateTimeOutId);
    // 処理中表示解除
    Public_CloseMessage();
    // １ページ目を表示
    PageSet(1);
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+31);
  }
}
//*****************************************************************************
// Public_EndDeleteOutputError
//
// １．機能 
//      削除処理対象の検査が「出力中」の場合の処理// ２．戻り値
//　　  無し// ３．備考//*****************************************************************************
function Public_EndDeleteOutputError(){
  try{
    // タイマ予約解除
    clearTimeout(UpdateTimeOutId);
    // 処理中表示解除
    Public_CloseMessage();
    // 出力中のため削除できないメッセージ表示
    Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_ID_OUTPUT_EXCL,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_ID_OUTPUT_EXCL,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_ID_OUTPUT_EXCL,"Cannt Get Message.")); 
    // 排他の開放
    Fn_Exclusive(COMMAND_MODE_DELETE_ERROR, "");    
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+32);
  }
}
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
//*****************************************************************************
// Public_EndDeleteCompletedError
//
// １．機能 
//      削除処理対象の検査が「確認/確定」の場合の処理// ２．戻り値
//　　  無し// ３．備考//*****************************************************************************
function Public_EndDeleteCompletedError(){
  try{
    // タイマ予約解除
    clearTimeout(UpdateTimeOutId);
    // 処理中表示解除
    Public_CloseMessage();
    // 出力中のため削除できないメッセージ表示
    Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_COMPLETED,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_COMPLETED,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_COMPLETED,"Cannt Get Message.")); 
    // 排他の開放
    Fn_Exclusive(COMMAND_MODE_DELETE_ERROR, "");    
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+33);
  }
}
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-

// 2005/05/14 025 H.SAITO 削除ロック対応//*****************************************************************************
// Public_EndDeleteLockError
//
// １．機能 
//      削除処理対象の検査が「削除ロック中」の場合の処理// ２．戻り値
//　　  無し// ３．備考//*****************************************************************************
function Public_EndDeleteLockError(){
  try{
    // タイマ予約解除
    clearTimeout(UpdateTimeOutId);
    // 処理中表示解除
    Public_CloseMessage();
    // 出力中のため削除できないメッセージ表示
    Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_ID_LOCK_EXCL,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_ID_LOCK_EXCL,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_ID_LOCK_EXCL,"Cannt Get Message.")); 
    // 排他の開放
    Fn_Exclusive(COMMAND_MODE_DELETE_ERROR, "");    
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+34);
  }
}
//************************************************
// Fn_WriteLog
//
// １．機能 
//      ログを出力する// ２．戻り値
//　　  特になし// ３．備考//************************************************
function Fn_WriteLog(ctrlCommand){
	try{
		parent.LOGGER_PROC.location.replace("Logger_Proc.aspx?" + "Display=" + PROC_MODE + "&Command=" + ctrlCommand + "&LoginUserId=" + top.LoginUserId + "&OpenMode=" + parent.OpenMode);
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+35);
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
        if(initMode == FC_MOVING_MODE_UPDATE){
            StudySequenceSet();
        }else{
            Public_Init();
        }
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+36);
    }
}
