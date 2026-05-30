/****************************************************************************

  @file ChangeImg_View.js

  @brief ChangeImg_Viewのクライアントスクリプト

  @author YSK齋藤
  
        SpotCode MAX 28

  Copyright(c) 2004-2009 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/11/30  YSK齋藤     V1.0       新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
  @date  06/11/08  YSK齋藤     V1.4　     PVCS#1962,#1666対応  
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応
  @date  09/07/16  原田憲      V6.0       NAS対応 
  @date  09/12/01  FFS黒田     V1.1(B)    患者情報項目追加
  @date  10/02/01  FF 西川     V1.2(B)    検査修正を通知 UPDSTUDY_12B
  @date  10/11/22  FFS生田     V2.0(B)    30501エラー改善対応
  @date  12/04/18  FF千葉      V2.3(B)    DICOM受信性能改善

****************************************************************************/
//[定数]
var PROC_MODE						 = "CHANGEIMG_VIEW";
var MAXMENU							 = 4;							    // １ページ最大４件表示
var THUMBNAIL_HEIGHT		 = 54;
var THUMBNAIL_WIDTH			 = 54;
var MAX_SELECTMENU			 = 2;							    // 選択メニュー最大数
var UPDATE_TIMEOUT			 = 60000;					    // 更新処理タイムアウト時間       
var COMMAND_MODE_UPDATE  = "UPDATE";			    // 更新文字


var COMMAND_MODE_CANCEL  = "CANCEL";			    // キャンセル文字


var FATAL_ERROR          = "FATAL_ERROR";     // 致命的なエラー 
var RETRY_ERROR          = "RETRY_ERROR";     // 再試行可能なエラー
var USER_NOTHING_ERROR   = "USER_NOTHING_ERROR";	//ユーザチェックエラー
var SPOT_CODE            = 0;                 // スポットコード


var FILE_NAME            = "ChangeImg_View.js";//ファイル名


var MESSAGE_ID           = 30500;             // メッセージID 
var MESSAGE_ID_ACCESS    = 30501;             // メッセージID 
//2010/11/22 30501エラー改善対応 ADD ST
var MESSAGE_ID_ACCESS_EXCLUSIVE = 40505;      // メッセージID
//2010/11/22 30501エラー改善対応 ADD ED
//警告メッセージ
// 2005/07/20 005 H.SAITO #903 メッセージレベル変更(31512～31526→34512～34526)
//var MSG_IMAGE_CHANGE     = 31522;
//var MSG_CHANGE_VERIFIED  = 31526;             // 確定した検査に対する修正確認

var MSG_IMAGE_CHANGE     = 34522;
var MSG_CHANGE_VERIFIED  = 34526;             // 確定した検査に対する修正確認

//20050609(PVCS#350)ST
var MESSAGE_ID_NOLOGIN   = 31502;              //メッセージID 
var MESSAGE_ID_LOGOFF    = 31503;              //メッセージID 
var MESSAGE_ID_DIFERENT  = 31504;              //メッセージID 
var MESSAGE_ID_FORBIDDEN = 31505;

// 操作権限チェック 戻り値
var RETURN_OK														=  0; //正常終了


var CHECK_AUTHORITY_ERROR_NOT_LOGGED_IN	= -1; //ログインされていない


var CHECK_AUTHORITY_ERROR_LOGGED_OFF		= -2; //ログオフされた
var CHECK_AUTHORITY_ERROR_DIFFERENT_ID	= -3; //ユーザIDがアプリケーション変数と異なっている
var CHECK_AUTHORITY_ERROR_AUTHORITY			= -4; //操作権限がない


//20050609(PVCS#350)EN


//排他制御スイッチ
var EXCLUSIVE_NOTHING    = -1;                // 排他制御(何もしない)
var EXCLUSIVE_DELL       = 0;                 // 排他制御(開放)
var EXCLUSIVE_SET        = 1;                 // 排他制御(設定)
var EXCLUSIVE_CHECK      = 2;                 // 排他制御(チェック)
// オープンモード


var OPEN_MODE_CE         = 0;                 // CEで開かれた場合


var OPEN_MODE_WINDOW     = 1;                 // ブラウザで開かれた場合


var OPEN_MODE_DIALOG     = 2;                 // ダイアログで開かれた場合


//操作ログコマンド


var CTRL_CHANGEIMAGE		 = "ChangeImage";     // 画像入れ替え


//選択中フラグ
var SELECT_ON						 = "1";               // 選択中フラグ
var SELECT_OFF					 = "0";               // 非選択フラグ
//ステータス
var STATE_MISS_SHOT			 = "MISS";				    // 写損ステータス
var STATE_NOT_SHOT			 = "0";						    // 未撮ステータス
//検査取得フラグ
var FLAG_STUDY_GETDATA   = 1;					        // 検査取得


var FLAG_STUDY_NOGETDATA = 0;					        // 検査未取得


//画像パス
var IMG_BACK_DOWN         = "../Bmp/cmOvalAPaleLBtnD.GIF";
var IMG_BACK_UP           = "../Bmp/cmOvalAPaleLBtnU.GIF";
var IMG_BACK_DISABLE      = "../Bmp/cmOvalAPaleLBtnX.GIF";
var IMG_NEXT_DOWN         = "../Bmp/cmCirBGreenBtnD.GIF";
var IMG_NEXT_UP           = "../Bmp/cmCirBGreenBtnU.GIF";
var IMG_NEXT_DISABLE      = "../Bmp/cmCirBGreenBtnX.GIF";
var IMG_MENU_NEXT_DOWN    = "../Bmp/cmDownPage2BtnD.GIF";
var IMG_MENU_NEXT_UP      = "../Bmp/cmDownPage2BtnU.GIF";
var IMG_MENU_NEXT_DISABLE = "../Bmp/cmDownPage2BtnX.GIF";
var IMG_MENU_PREV_DOWN    = "../Bmp/cmUpPage2BtnD.GIF";
var IMG_MENU_PREV_UP      = "../Bmp/cmUpPage2BtnU.GIF";
var IMG_MENU_PREV_DISABLE = "../Bmp/cmUpPage2BtnX.GIF";
var IMG_CHANGEIMG_DOWN    = "../Bmp/crImageChgBtn2D.GIF";
var IMG_CHANGEIMG_UP      = "../Bmp/crImageChgBtn2U.GIF";
var IMG_CHANGEIMG_DISABLE = "../Bmp/crImageChgBtn2X.GIF";
var IMG_CONF_NG_DOWN      = "../Bmp/cmOvalAPaleLBtnD.GIF";
var IMG_CONF_NG_UP        = "../Bmp/cmOvalAPaleLBtnU.GIF";
var IMG_CONF_OK_DOWN      = "../Bmp/cmOvalAGreenLBtnD.GIF";
var IMG_CONF_OK_UP        = "../Bmp/cmOvalAGreenLBtnU.GIF";
//検査ステータス
var STATE_VERIFIED        = "VERIFIED";       // 検査ステータス(確定)
// 2005/07/21 003 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
//// 2005/06/29 002 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
//var COOKIE_NAME_STUDY2    = "StudyLock";	    // 検査排他中クッキー名

//サーバから取得する設定値
var IMAGE_FILE_PATH;			                    // 画像ファイルのパス名

var FONT_NAME;                                // フォント名
// 2005/06/23 007 H.SAITO デザイン変更対応(フォントサイズ）


//var FONT_SIZE;                                // フォントサイズ
var FONT_SIZE_MENU;                           // フォントサイズ(短冊内メニュー名称)
var FONT_SIZE_MENU_PAGE;                      // フォントサイズ(短冊メニューページ数)
var FONT_SIZE_BUTTON;                         // フォントサイズ(ボタン)
var FONT_SIZE_UPICON;                         // フォントサイズ(ボタン(上部にアイコンを含む))
var FONT_SIZE_OTHER;                          // フォントサイズ(その他)
var TotalPageString;                          // トータル文字

var PageString;                               // ページ文字

var MenuString;                               // メニュー文字

var UpdateString;                             // 更新中文字

var RetryString;                              // 再試行文字

var UpdateTimeOutString;                      // 更新処理タイムアウト文字

var UserGuidanceString;                       // ユーザガイダンス文字

var MaxPage;	                                // 撮影メニューページの最大値
var SelectPageNo;                             // 撮影リストページ選択番号
var SelectMenuCount;                          // 選択メニュー数
var MenuSelectStatus;                         // メニューの選択状態(非選択:0/undef ,選択中:1)
var UpdateTimeOutId;                          // ChangeImgUpdateタイムアウトプロセスのＩＤ
var ExclusiveModeStudy;                       // 検査の排他の設定／チェック 
var ExclusiveModeStudyRelease;                // 検査の排他の設定／チェック 
var CommandMode;                              // 終了コマンド


var CommandParam;                             // 終了パラメタ
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
  
    var i;
    //文字列設定

    document.getElementById("DIV_ChangeText").innerText              = ChangeText;
    document.getElementById("DIV_CancelText").innerText              = CancelText;
    document.getElementById("DIV_UpdateText").innerText              = UpdateText;
		document.getElementById("DIV_ConfirmCancelText").innerText       = ConfirmCancelString; 
		document.getElementById("DIV_ConfirmOkText").innerText           = ConfirmOkString; 
    //フォント名,フォントサイズの設定


    document.getElementById("BODY").style.fontFamily                 = FONT_NAME;
    // 2005/06/23 002 H.SAITO デザイン変更対応(フォントサイズ）


    //document.getElementById("BODY").style.fontSize                   = FONT_SIZE + "px";
    for(i = 1; i <= MAXMENU; i++){
      document.getElementById("DIV_ChangeText" + i).style.fontFamily = FONT_NAME;
      // 2005/06/23 003 H.SAITO デザイン変更対応(フォントサイズ）


      //document.getElementById("DIV_ChangeText" + i).style.fontSize   = FONT_SIZE + "px";
      document.getElementById("DIV_ChangeText" + i).style.fontSize   = FONT_SIZE_MENU;
    }
    // 2005/06/23 018 H.SAITO デザイン変更対応(フォントサイズ）


    // ボタン
    document.getElementById("DIV_ChangeText").style.fontSize         = FONT_SIZE_BUTTON;
    document.getElementById("DIV_CancelText").style.fontSize         = FONT_SIZE_BUTTON;
    document.getElementById("DIV_UpdateText").style.fontSize         = FONT_SIZE_BUTTON;
    // その他


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
		//初期化 
		Fn_Init();

		//データ取得完了フラグが１以外ならばデータを取得する 
		if(parent.EndGetDataFlag != FLAG_STUDY_GETDATA){
			// 検査情報要求 
			parent.STUDYDATA_GET_PROC.Public_GetData(PROC_MODE, parent.StudySequence, "", ExclusiveModeStudy);
		}
		else{
			Public_EndGetData();
		}
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
		var returnValue;
		//データ取得完了フラグをＯＮにする
		parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
    //ユーザガイダンス
//2005/05/24-ST==========
//    parent.INFORMATION_VIEW.Public_SetUserGuidance(UserGuidanceString); 
    parent.INFORMATION_VIEW.Public_SetUserGuidance(UserGuidanceString,1); 
//2005/05/24-EN==========
    //患者情報表示
    parent.INFORMATION_VIEW.Public_SetPatientId(parent.PatientId); 
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update Start
//    parent.INFORMATION_VIEW.Public_SetPatientSex(parent.PatientSex);
    parent.INFORMATION_VIEW.Public_SetPatientSex(parent.PatientSex, parent.PatientsSexNeutred);
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update End
    parent.INFORMATION_VIEW.Public_SetPatientName(parent.PatientName, parent.PatientKanjiName);   
    parent.INFORMATION_VIEW.Public_SetPatientBirthDate(parent.PatientBirthDate);
    parent.INFORMATION_VIEW.Public_SetPatientAge(parent.PatientAge);

    //画像入れ替えボタンを不活性化 
    Fn_ChangeImgBtn_Enable(2);  
    //１ページ目を表示する
    Fn_SelectPage(1);

    //メニューボタン活性化 
    Fn_ButtonEnable(1);

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
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+28);
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
    MaxPage          = 0;	 //検査メニューページの最大値
    SelectPageNo     = -1; //検査リストページ選択番号
    UpdateTimeOutId  = null;
    //メニューの選択状態を初期化 
    MenuSelectStatus = new Array();
    //メニューの選択数を初期化
    SelectMenuCount = 0;
    //患者情報表示/ユーザガイダンス表示初期化 
    parent.INFORMATION_VIEW.Public_ClearInformation();

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
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
        break;
    }

  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
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
      case 1:  // 撮影メニュー１ 
      case 2:  // 撮影メニュー２ 
      case 3:  // 撮影メニュー３ 
      case 4:  // 撮影メニュー４ 

        Fn_OnSelectMenu(tableNo);
        break;
 			//----------//
      // ↑ボタン //    
			//----------//
     case 11: // CLICK
        Fn_SelectPage(SelectPageNo - 1);
        document.getElementById("IMG_UpBtn_Enable").src   = IMG_MENU_PREV_UP;
        break;
      case 12: // MOUSEDOWN
        document.getElementById("IMG_UpBtn_Enable").src   = IMG_MENU_PREV_DOWN;
        break;
      case 13: // MOUSEOUT
        document.getElementById("IMG_UpBtn_Enable").src   = IMG_MENU_PREV_UP;
        break;
			//----------//
      // ↓ボタン //
			//----------//
      case 15: // CLICK
        Fn_SelectPage(SelectPageNo + 1);
        document.getElementById("IMG_DownBtn_Enable").src = IMG_MENU_NEXT_UP;
        break;
      case 16: // MOUSEDOWN
        document.getElementById("IMG_DownBtn_Enable").src = IMG_MENU_NEXT_DOWN;
        break;
      case 17: // MOUSEOUT
        document.getElementById("IMG_DownBtn_Enable").src = IMG_MENU_NEXT_UP;
        break;
			//--------------------//
      // 画像入れ替えボタン //
			//--------------------//
      case 21: // CLICK
        Fn_OnChangeImgBtn();
        document.getElementById("IMG_ChangeImgBtn_Enable").src = IMG_CHANGEIMG_UP;
        break;
      case 22: // MOUSEDOWN
        document.getElementById("IMG_ChangeImgBtn_Enable").src = IMG_CHANGEIMG_DOWN;
        break;
      case 23: // MOUSEOUT
        document.getElementById("IMG_ChangeImgBtn_Enable").src = IMG_CHANGEIMG_UP;
        break;
			//------------//
      // 戻るボタン //
			//------------//
     case 91:// 戻るボタン
        // 戻る/閉じる場合は排他の開放を行わない 
        ExclusiveModeStudyRelease = EXCLUSIVE_NOTHING;

        // 排他の開放処理 
        Fn_Exclusive(COMMAND_MODE_CANCEL, "");

        document.getElementById("IMG_CancelBtn").src = IMG_BACK_UP;
        break;
      case 92: // MOUSEDOWN
        document.getElementById("IMG_CancelBtn").src = IMG_BACK_DOWN;
        break;
      case 93: // MOUSEOUT
        document.getElementById("IMG_CancelBtn").src = IMG_BACK_UP;
        break;
//      case 98:// 戻るボタン
//        // 戻る/閉じる場合は排他の開放を行わない


//        ExclusiveModeStudyRelease = EXCLUSIVE_NOTHING;
//        // 排他の開放処理


//        Fn_Exclusive(COMMAND_MODE_CANCEL, "");
//				break;
			//----------------//
      // 修正完了ボタン //
			//----------------//
      case 95: // CLICK
        //情報未取得の場合は不活性
        if(parent.EndGetDataFlag == FLAG_STUDY_NOGETDATA)return;
        // 排他の開放処理


        Fn_Exclusive(COMMAND_MODE_UPDATE, "");

        document.getElementById("IMG_UpdateBtn_Enable").src = IMG_NEXT_UP;
        break;
      case 96: // MOUSEDOWN
        //情報未取得の場合は不活性
        if(parent.EndGetDataFlag == FLAG_STUDY_NOGETDATA)return;
        document.getElementById("IMG_UpdateBtn_Enable").src = IMG_NEXT_DOWN;
        break;
      case 97: // MOUSEOUT
        //情報未取得の場合は不活性
        if(parent.EndGetDataFlag == FLAG_STUDY_NOGETDATA)return;
        document.getElementById("IMG_UpdateBtn_Enable").src = IMG_NEXT_UP;
        break;
//      case 99:// 修正完了ボタン
//        //情報未取得の場合は不活性
//        if(parent.EndGetDataFlag == FLAG_STUDY_NOGETDATA)return;
//        // 排他の開放処理


//        Fn_Exclusive(COMMAND_MODE_UPDATE, "");
//        break;
      //------------------------------//
      // 続行可能エラー時のＯＫボタン //
      //------------------------------//
      case 100:
        Public_CloseMessage();
        Public_CloseError();     
        break;
      //----------------//
      // 確認ＯＫボタン //
      //----------------//
			case 111:  //ONCLICK
        // 入れ替え処理実施
        Fn_OnChangeImgExec();
        // 確認ダイアログ非表示
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
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
        break;
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
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
      //更新中表示
      Public_Message("DIALOG",UpdateString);
      //タイマ予約


      //2010/11/22 30501エラー改善対応 MOD ED
      UpdateTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS_EXCLUSIVE+",'"+FILE_NAME+"',"+ (SPOT_CODE+7) +")", UPDATE_TIMEOUT);
      //2010/11/22 30501エラー改善対応 MOD ED
      //排他開放処理




      parent.EXCLUSIVE_PROC.Public_Exclusive(PROC_MODE, parent.StudySequence, "", ExclusiveModeStudyRelease);
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
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
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
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
    //2011/01/17 30501エラー改善対応 MOD ED
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+10);
  }
}
//*****************************************************************************
// Fn_SelectPage
//
// １．機能 
//      指定されたページで撮影メニューリストを表示する
// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Fn_SelectPage(pageNo){
  try{
    var i;     //ループカウンタ
    var firstmenuTableNo;	//一番上に表示するデータの場所
    var menuTableNo;     //撮影メニュー作業用位置(1～∞)
    var pageCountMessage;     //メニュー数／ページ数表示
    var imageTagString;      //サムネイル表示ＩＭＧタグ

    //＜計算＞総ページ数(小数点以下切り上げ)
    MaxPage     = Math.ceil(parent.DataCount / MAXMENU);

    //＜チェック＞指定されたページが有効範囲内か
    if(pageNo < 1 || pageNo > MaxPage){
      return;
    }
    //--------------------//
    // 撮影メニューの表示 //
    //--------------------//
    //＜計算＞一番上に表示するデータの位置
    firstmenuTableNo = (pageNo - 1) * MAXMENU;

    //＜表示＞撮影メニュー
    for(i = 1; i <= MAXMENU; i++){

      //＜計算＞メニュー選択位置
      menuTableNo = firstmenuTableNo + i;

      //＜チェック＞表示するデータが全件数を超えていないか
      if(menuTableNo > parent.DataCount){
	      break;
      }
      
      //＜表示＞テキストを表示    
      document.getElementById("DIV_ChangeText" + i).style.visibility = "visible";

      //＜表示＞通常のメニューボタンを表示
      document.getElementById("IMG_ChangeImg" + i).style.visibility = "visible";

      //＜表示＞未撮の場合はサムネイル非表示
      if(parent.DataStatus[menuTableNo - 1] == STATE_NOT_SHOT){
        document.getElementById("DIV_ChangeFilm" + i).innerHTML        = "";
        document.getElementById("DIV_ChangeFilm" + i).style.visibility = "hidden";
      }
      //＜表示＞既撮の場合はサムネイル表示
      else{
        imageTagString =  Fn_GetImageTag(menuTableNo);
        document.getElementById("DIV_ChangeFilm" + i).innerHTML        = imageTagString;
        document.getElementById("DIV_ChangeFilm" + i).style.visibility = "visible";
      }

      //＜表示＞撮影メニュータイトル
      document.getElementById("DIV_ChangeText" + i).innerText=parent.MenuName[menuTableNo - 1];
        
      //＜表示＞ステータス表示（写損）画像データ状態 0:NORMAL(通常) 2:MISS(写損) 
      if(parent.ImageStatus[menuTableNo - 1] == STATE_MISS_SHOT ){
        document.getElementById("IMG_DeleteImage" + i).style.visibility = "visible";         
      }
      else{
        document.getElementById("IMG_DeleteImage" + i).style.visibility = "hidden";         
      }
      //＜表示＞選択ボタン 0/Undef:非選択 1:選択




      if(MenuSelectStatus[menuTableNo - 1] == SELECT_ON){
        document.getElementById("IMG_SelectMenu" + i).style.visibility = "visible";
      }
      else{
        document.getElementById("IMG_SelectMenu" + i).style.visibility = "hidden";
      }
    }
    //----------------------//
    // 選択状態ボタンの表示 //
    //----------------------//
    //＜表示＞メニュー表示をしなかった場合はメニューを不可視



    if(i <= MAXMENU){
      for(;i <= MAXMENU;i++){
        document.getElementById("IMG_ChangeImg"   + i).style.visibility  = 'hidden';
        document.getElementById("DIV_ChangeFilm"  + i).style.visibility  = 'hidden';
        document.getElementById("DIV_ChangeText"  + i).style.visibility  = 'hidden';
        document.getElementById("DIV_ChangeFilm"  + i).innerHTML         = "";
        document.getElementById("IMG_SelectMenu"  + i).style.visibility  = 'hidden';
        //＜表示＞ステータス表示を不可視



        document.getElementById("IMG_DeleteImage"  + i).style.visibility = 'hidden';
      }
    }  
    //----------------//
    // ページ数の表示 //
    //----------------//
    //＜表示＞総メニュー数　現ページ／総ページ数
    // 2005/06/23 005 H.SAITO デザイン変更対応(フォントサイズ）


    //pageCountMessage = TotalPageString  + parent.DataCount + MenuString;
    //pageCountMessage = pageCountMessage  + pageNo         + "/"  + MaxPage + PageString;
    pageCountMessage = TotalPageString   + " "    + parent.DataCount + MenuString;
    pageCountMessage = pageCountMessage  + "    " + pageNo         + "/"  + MaxPage + PageString;

    document.getElementById("DIV_TextCnt").innerText = pageCountMessage;

    //＜退避＞選択されているページ番号を保存

    if(MaxPage <= 0){
      SelectPageNo = 0;
    }
    else{
      SelectPageNo = pageNo;
    }
    //------------------------//
    // 前頁・次頁ボタンの表示 //
    //------------------------//
    if(pageNo <= 1){
      //＜表示＞前ページボタンを不活性化


      document.getElementById("IMG_UpBtn_Enable").style.visibility  = "hidden";
      document.getElementById("IMG_UpBtn_Disable").style.visibility = "visible";
    }
    else{
      //＜表示＞前ページボタンを活性化


      document.getElementById("IMG_UpBtn_Enable").style.visibility  = "visible";
      document.getElementById("IMG_UpBtn_Disable").style.visibility = "hidden";
    }
    if(pageNo >= MaxPage){
      //＜表示＞次ページボタンを不活性化


      document.getElementById("IMG_DownBtn_Enable").style.visibility  = "hidden";
      document.getElementById("IMG_DownBtn_Disable").style.visibility = "visible";
    }
    else{
      //＜表示＞次ページボタンを活性化


      document.getElementById("IMG_DownBtn_Enable").style.visibility  = "visible";
      document.getElementById("IMG_DownBtn_Disable").style.visibility = "hidden";
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+11);
  }
}
//*****************************************************************************
// Fn_OnSelectMenu
//
// １．機能 
//      メニューが選択された時の処理を行う
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Fn_OnSelectMenu(tableNoTableNo){
  try{
    var menuTableNo;   //撮影メニューのＮｏ(１～∞）




    if(MaxPage <= 0){
      //何もしない


      return;
    } 
    menuTableNo = (SelectPageNo - 1) * MAXMENU + tableNoTableNo;  
    //-------------------//
    // 選択状態 設定/解除//
    //-------------------//
    //＜表示＞既に選択されている場合は選択解除
    if(MenuSelectStatus[menuTableNo - 1] == SELECT_ON){
      //＜表示＞非選択画像にする
      document.getElementById("IMG_SelectMenu" + tableNoTableNo).style.visibility = "hidden";
      MenuSelectStatus[menuTableNo - 1] = SELECT_OFF;
      //選択数デクリメント


      SelectMenuCount--;
    }

    //選択されていない場合、最大選択数未満であれば選択状態にする
    else if(SelectMenuCount < MAX_SELECTMENU){
      //＜表示＞選択画像にする
      document.getElementById("IMG_SelectMenu" + tableNoTableNo).style.visibility = "visible";
      MenuSelectStatus[menuTableNo - 1] = SELECT_ON;
      //選択数インクリメント


      SelectMenuCount++;
    }
    //------------------------//
    // 画像入れ替えボタン表示 //
    //------------------------//
    //２つ選択されている場合


    if(SelectMenuCount == MAX_SELECTMENU ){
      //＜表示＞画像入れ替えボタンを活性化


      Fn_ChangeImgBtn_Enable(1);
    }
    else{
      Fn_ChangeImgBtn_Enable(2);  
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+12);
  }
}
//*****************************************************************************
// Fn_OnChangeImgBtn
//
// １．機能 
//      画像入れ替えボタンが選択された時の処理を行う
// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Fn_OnChangeImgBtn(){
  try{
    var  i;             //ループカウンタ
    var  imageSeq;      //画像シーケンス
    var  tableNo;       //配列の添え字


    var  sendImageSeq;  //送信データ
    var  dataCheckFlag; //データチェック用フラグ

    //初期化  
    sendImageSeq   = new Array();
    dataCheckFlag  = "0";

    //最大選択数以外は何もしない


    if(SelectMenuCount != MAX_SELECTMENU){
      return;
    }

    //ログの出力


    Fn_WriteLog(CTRL_CHANGEIMAGE);

    //送信データを作成
    for(i = 0; i < parent.DataCount; i++){
      if(MenuSelectStatus[i] == SELECT_ON){
        sendImageSeq.push(parent.ImageSeq[i]);
        //すでに最大選択数作成した場合は次の処理へ
        if(sendImageSeq.length == MAX_SELECTMENU){
          break;
        }
      }
    }

    //送信データのチェック（すべて未撮はエラー）


    for(i = 0; i < MAX_SELECTMENU; i++){
      imageSeq = sendImageSeq[i];
      tableNo      = parent.AssosiateId[imageSeq];
      //1つでも既撮のものがあれば次の処理へ
      if(parent.DataStatus[tableNo] != SELECT_OFF){
        dataCheckFlag = "1";
        break;    
      }   
    }

    //すべて未撮の場合は画像の入れ替えはできない  
    if(dataCheckFlag != "1" ){
      //再試行可能エラー
//      Public_ErrorDisplay(RETRY_ERROR, 31514, FILE_NAME, 0);
				Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_IMAGE_CHANGE,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_IMAGE_CHANGE,""),top.DispFrame.Public_GetLangMsgString(MSG_IMAGE_CHANGE,"Cannot get Message.")); 
      return;
    }

    //検査ステータスが確定の場合は確認ダイアログを表示する
    if(parent.StudyStatus == STATE_VERIFIED){
      document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_CHANGE_VERIFIED,"");
      document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_CHANGE_VERIFIED,"");
      document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_CHANGE_VERIFIED,"Cannt Get Message.");
      Public_Confirm();
      return;
    }

    //入れ替え処理を実施する
    Fn_OnChangeImgExec();
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+14);
  }
}

//*****************************************************************************
// Fn_OnChangeImgExec
//
// １．機能 
//      画像入れ替え処理を実施する
// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Fn_OnChangeImgExec(){
  try{
    var  i;             //ループカウンタ
    var  imageSeq;      //画像シーケンス
    var  tableNo;       //配列の添え字


    var  sendImageSeq;  //送信データ
    var  dataCheckFlag; //データチェック用フラグ

    //更新中表示
    Public_Message("DIALOG",UpdateString);

    //初期化  
    sendImageSeq   = new Array();

    //送信データを作成
    for(i = 0; i < parent.DataCount; i++){
      if(MenuSelectStatus[i] == SELECT_ON){
        sendImageSeq.push(parent.ImageSeq[i]);
        //すでに最大選択数作成した場合は次の処理へ
        if(sendImageSeq.length == MAX_SELECTMENU){
          break;
        }
      }
    }
    //--------//
    //更新要求//
    //--------//
    //修正完了状況フラグを修正完了とする
    parent.ModifyStatusFlag = 1;
    //タイマ予約


    UpdateTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE + 13) +")", UPDATE_TIMEOUT);
    //更新要求


//2005/04/23 008 H.SAITO
//    parent.CHANGEIMG_UPDATE_PROC.Public_Update(PROC_MODE, parent.StudySequence, sendImageSeq, parent.StudyStatus, parent.PatientId);
    //ページローダを使用しないで読み込み完了を通知
    if(parent.isModifyCtrlCE){
      parent.FRAME_PROC.Public_Update(PROC_MODE, parent.StudySequence, sendImageSeq, parent.StudyStatus, parent.PatientId);
    }
    else{
      parent.CHANGEIMG_UPDATE_PROC.Public_Update(PROC_MODE, parent.StudySequence, sendImageSeq, parent.StudyStatus, parent.PatientId);
    }

    if((parent.OpenMode == OPEN_MODE_DIALOG) && 
      ('function' === typeof window.external.ValidateModifyStudyFlag)){       //UPDSTUDY_12B
        window.external.ValidateModifyStudyFlag(); //UPDSTUDY_12B
    }                                              //UPDSTUDY_12B

  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+15);
  }
}
//*****************************************************************************
// Public_EndUpdate
//
// １．機能 
//      画像入れ替え成功終了時に表示を更新する
// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Public_EndUpdate(){
  try{
    //タイマ予約解除
    clearTimeout(UpdateTimeOutId);
    //選択解除
    SelectMenuCount  = 0;
    MenuSelectStatus = new Array();
		//入れ替えボタン不活性
		Fn_ChangeImgBtn_Enable(2);
    //ページ再表示
    Fn_SelectPage(SelectPageNo);
    //処理中表示解除
    Public_CloseMessage();
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+16);
  }
}
//*****************************************************************************
// Fn_ChangeBtn_Enable
//
// １．機能 
//      画像入れ替えボタンの
//      活性化・不活性化を切り替える
//     
// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Fn_ChangeImgBtn_Enable(enableFlag){
  try{
    switch(enableFlag){
      //画像の入れ替えボタンを活性化/
      case 1:
        document.getElementById("TABLE_ChangeImgBtn").style.visibility        = "visible";
        document.getElementById("IMG_ChangeImgBtn_Enable").style.visibility   = "visible";
        document.getElementById("IMG_ChangeImgBtn_Disable").style.visibility  = "hidden";
        document.getElementById("DIV_ChangeText").style.color                 = "black";
        break;
      //画像の入れ替えボタンを不活性化



      case 2:
        document.getElementById("TABLE_ChangeImgBtn").style.visibility        = "hidden";
        document.getElementById("IMG_ChangeImgBtn_Enable").style.visibility   = "hidden";
        document.getElementById("IMG_ChangeImgBtn_Disable").style.visibility  = "visible";
        document.getElementById("DIV_ChangeText").style.color                 = "gray";
        break;
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+17);
  }
}
//************************************************
// Fn_GetImageTag
//
// １．機能 
//      ＩＭＧタグを生成する


// ２．戻り値
//　　  特になし


// ３．備考


//************************************************
function Fn_GetImageTag(menuTableNo){
  try{
    var imageTagString;	    //IMGタグ文字列
    var imageStyleString;	  //IMGタグスタイル
    var imageTagId;         //IMGタグのID
    var imageOnload;        //IMGタグのOnloadイベント


    var imageFileName;      //画像のファイル名
    var imageFilePath;      //画像ファイルのフルパス//** 2009/07/16 k.harada add


    var imageTopPosition;		//表示する画像の上位置
    var imageLeftPosition;  //表示する画像の左位置
    var imageViewTop;				//DIVからの相対位置のため0
    var imageViewLeft;			//DIVからの相対位置のため0
    var imageViewHeight;		//画像の高さ(相対位置)
    var imageViewWidth;			//画像の幅(相対位置)	
    var imageHeight;	      //表示する画像の高さ
    var imageWidth;	        //表示する画像の幅


    var dateObject;         //現在時刻
		var urlString;					//画像のパス

    //設定値を取得


    imageViewTop    = 0; //DIVからの相対位置のため0
    imageViewLeft   = 0; //DIVからの相対位置のため0
    imageViewHeight = THUMBNAIL_HEIGHT;
    imageViewWidth  = THUMBNAIL_WIDTH;
    imageHeight     = parent.ThumbnailHeight[menuTableNo   - 1] - 0;
    imageWidth      = parent.ThumbnailWidth[menuTableNo    - 1] - 0;
    imageFileName   = parent.ThumbnailFileName[menuTableNo - 1];
    imageFilePath   = parent.ThumbnailFilePath[menuTableNo - 1];//** 2009/07/16 k.harada add

    //画像の形状に合わせて表示領域＆位置を計算



    if(imageHeight > imageWidth){
      //長方形（縦長）


      imageWidth  = (imageWidth * imageViewHeight) / imageHeight;
      imageWidth  = Math.floor(imageWidth,0);//小数点以下切捨て
      imageHeight = imageViewHeight;
      imageTopPosition    = imageViewTop;
      imageLeftPosition   = imageViewLeft + (imageViewWidth - imageWidth) / 2;
      imageLeftPosition   = Math.floor(imageLeftPosition,0);//小数点以下切捨て
    }
    else if(imageWidth > imageHeight){
      //長方形（横長）


      imageHeight = (imageHeight * imageViewWidth) / imageWidth;
      imageHeight = Math.floor(imageHeight,0);//小数点以下切捨て
      imageWidth  = imageViewWidth;
      imageLeftPosition   = imageViewLeft;
      imageTopPosition    = imageViewTop + (imageViewHeight - imageHeight) / 2;
      imageTopPosition    = Math.floor(imageTopPosition,0);//小数点以下切捨て
    }
    else{
      //正方形
      imageTopPosition    = imageViewTop;
      imageLeftPosition   = imageViewLeft;
      imageWidth  = imageViewWidth;
      imageHeight = imageViewHeight;
    }
    //ファイルパス計算


    urlString = IMAGE_FILE_PATH + "/" + imageFileName;
      
    //画像表示領域計算


    imageStyleString = "POSITION:absolute;";
    imageStyleString = imageStyleString + "TOP:"    + imageTopPosition    + "px;";
    imageStyleString = imageStyleString + "LEFT:"   + imageLeftPosition   + "px;";
    imageStyleString = imageStyleString + "WIDTH:"  + imageWidth  + "px;";
    imageStyleString = imageStyleString + "HEIGHT:" + imageHeight + "px;";
    //IMGのONLOAD時にvisibleにする
    imageStyleString = imageStyleString + "visibility:hidden;";
    //日付オブジェクト生成


    dateObject       = new Date();

    //画像タグ作成１


    //通常サイズの画像はロードが終わったら表示する
    imageTagId   = "IMG_THUMBNAIL_" + menuTableNo;    
    imageOnload  = "ONLOAD=Fn_ViewThumbNail('" + imageTagId + "');";

    //画像タグ作成２
//2012/04/18 FF千葉 V2.3B DICOM受信性能改善 DEL-ST
////** 2009/07/16 k.harada add start
//    if(imageFilePath.indexOf("c:") != -1)
//    {
//    imageTagString = "<IMG SRC='" + urlString + "?"+ dateObject.getTime() + "'";
//    }
//    else
//    {
//        imageTagString = "<IMG SRC='" + imageFilePath + "'";
//    }
////** 2009/07/16 k.harada add end 
//2012/04/18 FF千葉 V2.3B DICOM受信性能改善 DEL-ED
//2012/04/18 FF千葉 V2.3B DICOM受信性能改善 ADD-ST
	var imageFilePathWithSubDir = imageFilePath.replace("file:", "");
	if(imageFilePathWithSubDir.substr(0,2) == "//")
	{
		//拡張NAS内データ
		imageTagString = "<IMG SRC='" + imageFilePath + "'";
	}
	else
	{
		//HDD内データ
		imageFilePathWithSubDir = imageFilePathWithSubDir.slice(imageFilePathWithSubDir.indexOf("/Image/"));
		imageFilePathWithSubDir = imageFilePathWithSubDir.replace("/Image/", "");	// Image/より後ろだけ取り出し。Sub/SubSub/FCRxxになる。
		imageTagString = "<IMG SRC='" + IMAGE_FILE_PATH + "/" + imageFilePathWithSubDir + "?"+ dateObject.getTime() + "'";
	}
//2012/04/18 FF千葉 V2.3B DICOM受信性能改善 ADD-ED
	
//    imageTagString = "<IMG SRC='" + urlString + "?"+ dateObject.getTime() + "'";  //** 2009/07/16 k.harada del
    imageTagString = imageTagString + " ID='" + imageTagId + "' " + imageOnload + " STYLE='" + imageStyleString + "'>";

    return imageTagString;
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+18);
  }
}
//************************************************
// Fn_ViewThumNail
//
// １．機能 
//      ＩＭＧタグを生成する



// ２．戻り値
//　　  特になし



// ３．備考



//************************************************
function Fn_ViewThumbNail(imageTagId){
  try{
    document.getElementById(imageTagId).style.visibility = "visible";
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+19);
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
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+20);
	}
}
//*****************************************************************************
// Fn_ButtonEnable(disp  0:不活性  1:活性
// １．機能
//     メニューボタンを活性・不活性化する


// ２．戻り値
//　　  なし


// ３．備考


//*****************************************************************************
function Fn_ButtonEnable(disp){
	try{
	  switch(disp){
	    case 0:     //不活性
	      document.getElementById("DIV_UpdateText").style.color       = "gray";
        document.getElementById("TABLE_UpdateBtn").style.visibility = "hidden";
        document.getElementById("IMG_UpdateBtn_Enable").style.visibility  = "hidden";
        document.getElementById("IMG_UpdateBtn_Disable").style.visibility = "visible";
	      break;
	    case 1:   //活性
	      document.getElementById("DIV_UpdateText").style.color       = "black";
        document.getElementById("TABLE_UpdateBtn").style.visibility = "visible";
        document.getElementById("IMG_UpdateBtn_Enable").style.visibility  = "visible";
        document.getElementById("IMG_UpdateBtn_Disable").style.visibility = "hidden";
	      break;
	    default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+21);
	      break;
	  }
	}
	catch(e){
     Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+22);
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_NOLOGIN,FILE_NAME,SPOT_CODE+23)
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_LOGOFF,FILE_NAME,SPOT_CODE+24)
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_DIFERENT,FILE_NAME,SPOT_CODE+25)
				return;
			//操作権限がない

			case CHECK_AUTHORITY_ERROR_AUTHORITY:
    			Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MESSAGE_ID_FORBIDDEN,""), top.DispFrame.Public_GetLangMsgTitle2(MESSAGE_ID_FORBIDDEN,""),top.DispFrame.Public_GetLangMsgString(MESSAGE_ID_FORBIDDEN,"Cannt Get Message.")); 
				return;
			default:
				Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+26);
				return;
		}
	}catch(e){
		Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+27);
	}	
}
//20050609(PVCS#350)EN
