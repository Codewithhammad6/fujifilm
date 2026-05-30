/****************************************************************************

  @file EditPatientMain_View.js

  @brief EditPatientMain_Viewのクライアントスクリプト

  @author YSK畑

        SpotCode MAX 6

  Copyright(c) 2004-2009 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/17  YSK畑       V1.0       新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応  @date  09/12/01  FFS黒田     V1.1(B)    患者情報項目追加


/****************************************************************************/
//[定数]
var PROC_MODE                      = "EDITPATIENTMAIN_VIEW";
var COMMAND_MODE_CANCEL            = "CANCEL";
var COMMAND_MODE_UPDATE            = "UPDATE";
var COMMAND_MODE_EDITPATIENTID     = "EDITPATIENTID";
var COMMAND_MODE_EDITPATIENTDETAIL = "EDITPATIENTDETAIL";
var COMMAND_MODE_CHANGEPATIENTID   = "CHANGEPATIENTID";
// オープンモード
var OPEN_MODE_CE     = 0;				// CEで開かれた場合
var OPEN_MODE_WINDOW = 1;				// ブラウザで開かれた場合
var OPEN_MODE_DIALOG = 2;				// ダイアログで開かれた場合
// 操作ログ出力コマンド
var CTRL_EDITPATIENTID             = "EditPatientId";     // 患者ＩＤ編集
var CTRL_EDITPATIENTDETAIL         = "EditPatientDetail"; // 患者詳細情報編集
var CTRL_CHANGEPATIENT             = "ChangePatient";     // 患者変更
var CTRL_CLOSE                     = "Close";             // 閉じる
//排他制御スイッチ
var EXCLUSIVE_NOTHING              = -1;                  // 排他制御(何もしない)
var EXCLUSIVE_DELL                 = 0;                   // 排他制御(開放)
var EXCLUSIVE_SET                  = 1;                   // 排他制御(設定)
var EXCLUSIVE_CHECK                = 2;                   // 排他制御(チェック)
//排他制御戻り値
var EXCLUSIVE_RET_OK               = 0;                   // 正常
var EXCLUSIVE_RET_EXCLUSIVE_ERR    = 3;                   // 排他エラー
// 検査取得フラグ
var FLAG_STUDY_GETDATA             = 1;
var FLAG_STUDY_NOGETDATA           = 0;
// 性別 
var SEX_MALE                       = 1;
var SEX_FEMALE                     = 2;
var SEX_OTHER                      = 3;
// 敬称表示フラグ 
var FLAG_HONORIFIC_USE             = 1;
var FLAG_HONORIFIC_NOUSE           = 0;
// マルチバイトフラグ 
var REGISTRY_MULTIBYTE             = 1;
var REGISTRY_SINGLEBYTE            = 0;
// エラーモード
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード

var FILE_NAME = "EditPatientMain_View.js"  //ファイル名

var MESSAGE_ID        = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS = 30501;              //メッセージID 
// 排他タイムアウト値
var UPDATE_TIMEOUT                 = 5000;
// 定数定義=======================================
// 画像パス
var IMG_PATIENT_ID_DOWN       = "../Bmp/crPatideditBtnD.gif";
var IMG_PATIENT_ID_UP         = "../Bmp/crPatideditBtnU.gif";
var IMG_PATIENT_DETAIL_DOWN   = "../Bmp/crPatinfoeditBtnD.GIF";
var IMG_PATIENT_DETAIL_UP     = "../Bmp/crPatinfoeditBtnU.GIF";
var IMG_PATIENT_DETAIL_DOWN_S = "../Bmp/crPatinfoedit2BtnD.GIF";
var IMG_PATIENT_DETAIL_UP_S   = "../Bmp/crPatinfoedit2BtnU.GIF";
var IMG_PATIENT_CHANGE_DOWN   = "../Bmp/crPatchgBtnD.GIF";
var IMG_PATIENT_CHANGE_UP     = "../Bmp/crPatchgBtnU.GIF";
var IMG_BACK_DOWN             = "../Bmp/cmOvalAPaleLBtnD.GIF";
var IMG_BACK_UP               = "../Bmp/cmOvalAPaleLBtnU.GIF";
//================================================
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
    
    Public_CloseMessage();
		// 文字列取得
		document.getElementById("divPatId_Value").innerText        = LabelPatientId;
		document.getElementById("divPatName_Value").innerText      = LablePatientName;
		document.getElementById("divPatKanjiName_Value").innerText = LabelPatientKanjiName;
		document.getElementById("divPatSex_Value").innerText       = LabelPatientSex;
		document.getElementById("divPatBirth_Value").innerText     = LabelPatientBirth;

		document.getElementById("divEditId_Value").innerText     = ButtonPatientEdit;
		document.getElementById("divEditDetail_Value").innerText = ButtonPatientEdit;
		document.getElementById("divChange_Value").innerText     = ButtonPatientChange;

		document.getElementById("divBack_Value").innerText  = ButtonBack;
//		document.getElementById("divStart_Value").innerText = ButtonNext;
    //フォント名,フォントサイズの設定
    document.getElementById("BODY").style.fontFamily           = FONT_NAME;
    // 2005/06/23 003 H.SAITO デザイン変更対応(フォントサイズ)
    //document.getElementById("BODY").style.fontSize             = FONT_SIZE + "px";
    //患者情報の表示高さ
    // 2005/06/23 031 H.SAITO デザイン変更対応(フォントサイズ)
    //document.getElementById("divPatInfo0").style.height        = parseInt(FONT_SIZE)+4 + "px";
    //document.getElementById("divPatInfo1").style.height        = parseInt(FONT_SIZE)+4 + "px";
    //document.getElementById("divPatInfo2").style.height        = parseInt(FONT_SIZE)+4 + "px";
    //document.getElementById("divPatInfo3").style.height        = parseInt(FONT_SIZE)+4 + "px";
    //document.getElementById("divPatInfo4").style.height        = parseInt(FONT_SIZE)+4 + "px";
    // ボックス
    document.getElementById("divPatInfo0").style.fontSize            = FONT_SIZE_INPUTBOX;
    document.getElementById("divPatInfo1").style.fontSize            = FONT_SIZE_INPUTBOX;
    document.getElementById("divPatInfo2").style.fontSize            = FONT_SIZE_INPUTBOX;
    document.getElementById("divPatInfo3").style.fontSize            = FONT_SIZE_INPUTBOX;
    document.getElementById("divPatInfo4").style.fontSize            = FONT_SIZE_INPUTBOX;
    // ラベル
		document.getElementById("divPatId_Value").style.fontSize         = FONT_SIZE_CAPTION;
		document.getElementById("divPatName_Value").style.fontSize       = FONT_SIZE_CAPTION;
		document.getElementById("divPatKanjiName_Value").style.fontSize  = FONT_SIZE_CAPTION;
		document.getElementById("divPatSex_Value").style.fontSize        = FONT_SIZE_CAPTION;
		document.getElementById("divPatBirth_Value").style.fontSize      = FONT_SIZE_CAPTION;	
    // ボタン
		document.getElementById("divEditId_Value").style.fontSize        = FONT_SIZE_BUTTON;
		document.getElementById("divEditDetail_Value").style.fontSize    = FONT_SIZE_BUTTON;
		document.getElementById("divChange_Value").style.fontSize        = FONT_SIZE_BUTTON;
		document.getElementById("divBack_Value").style.fontSize          = FONT_SIZE_BUTTON;
    // その他

		document.getElementById("TD_ProcText").style.fontSize            = FONT_SIZE_OTHER;
		document.getElementById("TD_ErrorText").style.fontSize           = FONT_SIZE_OTHER;
		document.getElementById("DIV_ErrorOkText").style.fontSize        = FONT_SIZE_BUTTON;
    document.getElementById("TD_ErrorTitle1").style.fontSize         = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorTitle2").style.fontSize         = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorText").style.fontSize           = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorCode").style.fontSize           = FONT_SIZE_OTHER;
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
		// 初期化

		Fn_Init();
		//検査取得済ならばデータを取得しない

		if(parent.EndGetDataFlag == FLAG_STUDY_GETDATA){
			Public_EndGetData();
		}
		else if(parent.EndGetDataFlag == FLAG_STUDY_NOGETDATA){
			parent.STUDYDATA_GET_PROC.Public_GetData(PROC_MODE, parent.StudySequence, "", "");
		}
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
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

		//データ取得完了フラグをＯＮにする
		parent.EndGetDataFlag = FLAG_STUDY_GETDATA;

		var pp = parent.INFORMATION_VIEW;
//2005/05/24-ST==========
//		pp.Public_SetUserGuidance(UserGuidanceString); 
		pp.Public_SetUserGuidance(UserGuidanceString,1); 
//2005/05/24-EN==========
		//患者情報表示
		pp.Public_SetPatientId(parent.PatientId); 
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update Start
//	  	pp.Public_SetPatientSex(parent.PatientSex);
		pp.Public_SetPatientSex(parent.PatientSex, parent.PatientsSexNeutred);
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update End
		pp.Public_SetPatientName(parent.PatientName, parent.PatientKanjiName);   
		pp.Public_SetPatientBirthDate(parent.PatientBirthDate);
		pp.Public_SetPatientAge(parent.PatientAge);
		//患者情報表示
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
		parent.PatientSex = parseInt(parent.PatientSex);
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
//CHANGE PVCS1378 2005/02/18===================================
		// 生年月日をSysConfigのフォーマットに合わせる
		birth = ChangeDateToScreenFormat(parent.PatientBirthDate, DateFormat);
		// 生年月日が異常値
		if(birth < 0 || birth == "" ) {
			document.getElementById("divPatInfo4").innerText = "";
		}else{
		  var age = GetAge(parent.PatientBirthDate);
      var ageStr = "("+ age + LabelAge +")";
			// 和暦の場合のみ1文字目を分割する
			document.getElementById("divPatInfo4").innerText = birth +" "+ ageStr;
		}			
//CHANGE=============================================
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
        Public_Init();
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
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
// ADD V1.0-1354 2005/02/06 hata=================================
		// ユーザガイダンス情報クリア
		parent.INFORMATION_VIEW.Public_ClearInformation();
// ADD EN======================================================
		// 患者情報初期化
		document.getElementById("divPatInfo0").innerText = "";
		document.getElementById("divPatInfo1").innerText = "";
		document.getElementById("divPatInfo2").innerText = "";
		document.getElementById("divPatInfo3").innerText = "";
		document.getElementById("divPatInfo4").innerText = "";	
			
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
	return;
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
		switch(tableNo){
    //============
    //患者ID編集ボタン
    //============
		case 1:  // 編集ボタン
      // 操作ログ出力
      Fn_WriteLog(CTRL_EDITPATIENTID);
			// 患者ID編集画面表示
            var notifyInfo = { "commandMode" : COMMAND_MODE_EDITPATIENTID, "commandParam" : "" };
            NotifyFrameFinished(notifyInfo);
			break;
		case 2:  // ONMOUSEDOWN
		  document.getElementById("imgEditId").src = IMG_PATIENT_ID_DOWN;
			break;
		case 3:  // ONMOUSEUP
		  document.getElementById("imgEditId").src = IMG_PATIENT_ID_UP;
			break;
    //============
    //患者詳細編集ボタン
    //============
		case 5:  // 編集ボタン
      // 操作ログ出力
      Fn_WriteLog(CTRL_EDITPATIENTDETAIL);
			// 患者詳細編集画面表示
            var notifyInfo = { "commandMode" : COMMAND_MODE_EDITPATIENTDETAIL, "commandParam" : "" };
            NotifyFrameFinished(notifyInfo);
			break;			
		case 6:  // ONMOUSEDOWN
		  document.getElementById("imgEditDetail").src = IMG_PATIENT_DETAIL_DOWN;
			break;
		case 7:  // ONMOUSEUP
		  document.getElementById("imgEditDetail").src = IMG_PATIENT_DETAIL_UP;
			break;
    //============
    //患者変更ボタン
    //============
		case 10:  // 患者変更ボタン
      // 操作ログ出力
      Fn_WriteLog(CTRL_CHANGEPATIENT);
			// 患者変更画面表示
            var notifyInfo = { "commandMode" : COMMAND_MODE_CHANGEPATIENTID, "commandParam" : "" };
            NotifyFrameFinished(notifyInfo);
			break;
		case 11:  // ONMOUSEDOWN
		  document.getElementById("imgChangePatient").src = IMG_PATIENT_CHANGE_DOWN;
			break;
		case 12:  // ONMOUSEUP
		  document.getElementById("imgChangePatient").src = IMG_PATIENT_CHANGE_UP;
			break;
    //============
    //戻るボタン
    //============
		case 90:// 戻るボタン
      // 閉じる場合のみ操作ログ出力
      if(OpenMode == OPEN_MODE_DIALOG){
        // 操作ログ出力
        Fn_WriteLog(CTRL_CLOSE);     
      }
			// 患者編集メイン画面表示
            var notifyInfo = { "commandMode" : COMMAND_MODE_CANCEL, "commandParam" : "" };
            NotifyFrameFinished(notifyInfo);
			break;
		case 91:  // ONMOUSEDOWN
		  document.getElementById("imgBack").src = IMG_BACK_DOWN;
			break;
		case 92:  // ONMOUSEUP
		  document.getElementById("imgBack").src = IMG_BACK_UP;
			break;
		case 99:// 修正完了ボタン
			break;
		case 100:// 続行可能エラー時のＯＫボタン
			Public_CloseMessage();
			Public_CloseError();     
			break;
		default:
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
			return;
		}
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
		return;
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
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
	}
}
