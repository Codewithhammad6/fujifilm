/****************************************************************************

  @file DeleteMenu_View.js

  @brief DeleteMenu_Viewのクライアントスクリプト

  @author YSK齋藤

        SpotCode MAX 34

  Copyright(C) 2004-2009 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/11/05  YSK齋藤     V1.0       新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  06/11/08  YSK齋藤     V1.4　     PVCS#1962,#1666対応 
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応 
  @date  07/03/22  HSK古場     V2.0       内視鏡画像取り込み機能 
  @date  07/06/14  HSK山本     V2.0       PVCS#2209対応 
  @date  09/07/16  原田憲      V6.0       NAS対応 
  @date  09/12/01  FFS黒田     V1.1(B)    患者情報項目追加
  @date  10/02/01  FF 西川     V1.2(B)    検査修正を通知 UPDSTUDY_12B
  @date  10/11/22  FFS生田     V2.0(B)    30501エラー改善対応
  @date  14/04/14  TYS会田     V3.0(B)    DR直結-検査情報修正

/****************************************************************************/
//[定数]
var PROC_MODE            = "DELETEMENU_VIEW";   // 処理モード


var MAXMENU              = 4;                   // １ページ最大４件表示
var THUMBNAIL_HEIGHT     = 54;                  // サムネイル高さ
var THUMBNAIL_WIDTH      = 54;                  // サムネイル幅


var SELECTMENU_TOP       = 35;                  // メニューボタン上位置
var SELECTMENU_REVICE    = 75;                  // メニューボタン上位置補正値
var SELECTMENU_LEFT      = 184;                 // メニューボタン左位置
var UPDATE_TIMEOUT       = 60000;               // 更新処理タイムアウト時間(1分)
//排他制御スイッチ
var EXCLUSIVE_NOTHING    = -1;                  // 排他制御(何もしない)
var EXCLUSIVE_DELL       = 0;                   // 排他制御(開放)
var EXCLUSIVE_SET        = 1;                   // 排他制御(設定)
var EXCLUSIVE_CHECK      = 2;                   // 排他制御(チェック)
//操作ログコマンド

var CTRL_DELETE					 = "Delete";            // 削除
var CTRL_DELETECANCEL		 = "DeleteCancel";      // 削除キャンセル
var CTRL_ENABLE					 = "Enable";            // 画像有効化

var CTRL_DISABLE				 = "Disable";           // 画像無効化

var CTRL_RESHOT					 = "Reshot";            // 再撮影
var CTRL_UPDATE					 = "Update";            // 修正完了


// オープンモード

var OPEN_MODE_CE     = 0;				// CEで開かれた場合

var OPEN_MODE_WINDOW = 1;				// ブラウザで開かれた場合

var OPEN_MODE_DIALOG = 2;				// ダイアログで開かれた場合


//サーバから取得する設定値
var IMAGE_FILE_PATH;						                // 画像ファイルのパス名


//ステータス(DB格納値との比較に使用)
var STATE_MISS_SHOT      = "MISS";              // 写損ステータス
var STATE_NOT_SHOT       = "0";		              // 未撮ステータス
//フラグ(内部のフラグとして使用)
var FLAG_NORMAL          = "0";                 // 通常フラグ
var FLAG_DELETE          = "1";                 // 削除フラグ
var FLAG_MISS_SHOT			 = "2";	                // 写損フラグ
var FLAG_RESHOT          = "3";                 // 再撮フラグ
//送信データの要求番号
var SEND_DELETE          = "0";                 // 送信データ（削除要求）


var SEND_MISS_SHOT       = "1";                 // 送信データ（写損要求） 
var SEND_UNSET_MISS_SHOT = "2";                 // 送信データ（写損解除要求）


var SEND_RESHOT          = "3";                 // 送信データ（再撮要求）


// 検査取得フラグ
var FLAG_STUDY_GETDATA   = 1;		                // 検査取得


var FLAG_STUDY_NOGETDATA = 0;		                // 検査未取得


// エラー
var FATAL_ERROR          = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR          = "RETRY_ERROR";    //再試行可能なエラー
var USER_NOTHING_ERROR   = "USER_NOTHING_ERROR";	//ユーザチェックエラー
var SPOT_CODE            = 0;                   //スポットコード


var FILE_NAME            = "DeleteMenu_View.js";  //ファイル名


var MESSAGE_ID           = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS    = 30501;              //メッセージID 
//2010/11/22 30501エラー改善対応 ADD ST
var MESSAGE_ID_ACCESS_EXCLUSIVE = 40505;       //メッセージID
//2010/11/22 30501エラー改善対応 ADD ED
//警告メッセージ
// 2005/07/20 005 H.SAITO #903 メッセージレベル変更(31512～31526→34512～34526)
//var MSG_DELETE_MENUINFO  = 31521;
//var MSG_CHANGE_VERIFIED  = 31526;               // 確定した検査に対する修正確認

var MSG_DELETE_MENUINFO  = 34521;
var MSG_CHANGE_VERIFIED  = 34526;               // 確定した検査に対する修正確認

// 2005/06/17 002 H.SAITO PVCS:695 確定済み検査に対する修正時のメッセージを追加
var MSG_CHANGE_VERIFIED_R= 31530;               // 確定した検査に対する修正確認(再撮時)
//20050609(PVCS#350)ST
var MESSAGE_ID_NOLOGIN   = 31502;              //メッセージID 
var MESSAGE_ID_LOGOFF    = 31503;              //メッセージID 
var MESSAGE_ID_DIFERENT  = 31504;              //メッセージID 
var MESSAGE_ID_FORBIDDEN = 31505;

//070614 HSK山本 PVCS#2209 ADD-ST
var MSG_WARNING_ID_OUTPUT_EXCL = 34512;       //出力中メッセージ
//070614 HSK山本 PVCS#2209 ADD-ED

// 操作権限チェック 戻り値
var RETURN_OK														=  0; //正常終了


var CHECK_AUTHORITY_ERROR_NOT_LOGGED_IN	= -1; //ログインされていない


var CHECK_AUTHORITY_ERROR_LOGGED_OFF		= -2; //ログオフされた
var CHECK_AUTHORITY_ERROR_DIFFERENT_ID	= -3; //ユーザIDがアプリケーション変数と異なっている
var CHECK_AUTHORITY_ERROR_AUTHORITY			= -4; //操作権限がない

//070614 HSK山本 PVCS#2209 ADD-ST
var STATE_MEDIA_OUTPUT_NOT      = "0";
var STATE_MEDIA_OUTPUT_COMPLETE = "1";
//070614 HSK山本 PVCS#2209 ADD-ED
//20050609(PVCS#350)EN
// 終了文字

var COMMAND_MODE_UPDATE  = "UPDATE";            // 更新終了

var COMMAND_MODE_CANCEL  = "CANCEL";            // キャンセル終了

// フォント

var FONT_NAME;
// 2005/06/23 007 H.SAITO デザイン変更対応(フォントサイズ）


//var FONT_SIZE;                                // フォントサイズ
var FONT_SIZE_MENU;                           // フォントサイズ(短冊内メニュー名称)
var FONT_SIZE_MENU_PAGE;                      // フォントサイズ(短冊メニューページ数)
var FONT_SIZE_BUTTON;                         // フォントサイズ(ボタン)
var FONT_SIZE_UPICON;                         // フォントサイズ(ボタン(上部にアイコンを含む))
var FONT_SIZE_OTHER;                          // フォントサイズ(その他)
//画像パス
var IMG_MENULIST_PREV_DOWN    = "../Bmp/cmUpPage2BtnD.gif"
var IMG_MENULIST_PREV_UP      = "../Bmp/cmUpPage2BtnU.gif"
var IMG_MENULIST_PREV_DISABLE = "../Bmp/cmUpPage2BtnX.gif"
var IMG_MENULIST_NEXT_DOWN    = "../Bmp/cmDownPage2BtnD.gif"
var IMG_MENULIST_NEXT_UP      = "../Bmp/cmDownPage2BtnU.gif"
var IMG_MENULIST_NEXT_DISABLE = "../Bmp/cmDownPage2BtnX.gif"
var IMG_DELETE_DOWN           = "../Bmp/crStudyDelBtn2D.gif"
var IMG_DELETE_UP             = "../Bmp/crStudyDelBtn2U.gif"
var IMG_DELETE_DISABLE        = "../Bmp/crStudyDelBtn2X.gif"
var IMG_DELETE_CANCEL_DOWN    = "../Bmp/crStudyCancelBtnD.gif"
var IMG_DELETE_CANCEL_UP      = "../Bmp/crStudyCancelBtnU.gif"
var IMG_DELETE_CANCEL_DISABLE = "../Bmp/crStudyCancelBtnX.gif"
var IMG_IMGDISABLE_DOWN       = "../Bmp/crImageCancelBtnD.gif"
var IMG_IMGDISABLE_UP         = "../Bmp/crImageCancelBtnU.gif"
var IMG_IMGDISABLE_DISABLE    = "../Bmp/crImageCancelBtnX.gif"
var IMG_IMGENABLE_DOWN        = "../Bmp/crImageOkBtnD.gif"
var IMG_IMGENABLE_UP          = "../Bmp/crImageOkBtnU.gif"
var IMG_IMGENABLE_DISABLE     = "../Bmp/crImageOkBtnX.gif"
var IMG_IMGRESHOT_DOWN        = "../Bmp/crReImageBtnD.gif"
var IMG_IMGRESHOT_UP          = "../Bmp/crReImageBtnU.gif"
var IMG_IMGRESHOT_DISABLE     = "../Bmp/crReImageBtnX.gif"
var IMG_BACK_DOWN             = "../Bmp/cmOvalAPaleLBtnD.gif"
var IMG_BACK_UP               = "../Bmp/cmOvalAPaleLBtnU.gif"
var IMG_BACK_DISABLE          = "../Bmp/cmOvalAPaleLBtnX.gif"
var IMG_NEXT_DOWN             = "../Bmp/cmCirBGreenBtnD.gif"
var IMG_NEXT_UP               = "../Bmp/cmCirBGreenBtnU.gif"
var IMG_NEXT_DISABLE          = "../Bmp/cmCirBGreenBtnX.gif"
var IMG_CONF_NG_DOWN          = "../Bmp/cmOvalAPaleLBtnD.GIF";
var IMG_CONF_NG_UP            = "../Bmp/cmOvalAPaleLBtnU.GIF";
var IMG_CONF_OK_DOWN          = "../Bmp/cmOvalAGreenLBtnD.GIF";
var IMG_CONF_OK_UP            = "../Bmp/cmOvalAGreenLBtnU.GIF";
//検査ステータス
var STATE_VERIFIED            = "VERIFIED";     // 検査ステータス(確定)
// 2005/07/21 003 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
//// 2005/06/29 002 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
//var COOKIE_NAME_STUDY2        = "StudyLock";	  // 検査排他中クッキー名

//[変数]
var OpenMode;									                  // オープンモード


var TotalPageString;					                  // トータル文字


var PageString;								                  // ページ文字


var MenuString;								                  // メニュー文字


var UpdateString;							                  // 処理中です文字


var UpdateTimeOutString;			                  // 更新処理タイムアウト文字


var VoidDeleteAllMenuString;	                  // すべての撮影メニューを削除できない文字


var UserGuidanceString;                         // ユーザがインダンス文字列
var MaxPage;									                  // 検査メニューページの最大値
var SelectPageNo;							                  // 検査リストページ選択番号
var SelectMenuPage;						                  // 検査メニュー選択ページ(1～)
var SelectMenuNo;							                  // 検査メニュー選択番号(1～)
var SelectMenuTable;					                  // 検査メニュー選択テーブル(1～4)
var MenuKindFlag;							                  // 再撮フラグ(配列)
//070614 HSK山本 PVCS#2209 ADD-ST
var MediaOutputFlag;                                        //メディア出力済みフラグ
//070614 HSK山本 PVCS#2209 ADD-ED
var FirstImageStatus;					                  // 初期の写損状態(配列)
var UpdateTimeOutId;					                  // UpdateタイムアウトプロセスのＩＤ
//070614 HSK山本 PVCS#2209 ADD-ST
var DM_GetdateTimeOutId;                                  //GetdateタイムアウトプロセスのＩＤ
var DM_NeedUpdateStudyData = true;                                //検査情報更新要求フラグ
var DM_CheckOutputExclusiveCallback = null;                         //出力排他確認後実行コールバック
var DM_BackByError = false;
//070614 HSK山本 PVCS#2209 ADD-ED

var ExclusiveModeStudy;                         // 検査の排他の設定／チェック 
var ExclusiveModeStudyRelease;                  // 検査の排他の設定／チェック 
var CommandMode;                                // 終了コマンド


var CommandParam;                               // 終了パラメタ
//*****************************************************************************
// Fn_InitPage
//
// １．機能
//     ・ページロード時の処理
//     ・ボタン名の初期表示を行う
// ２．戻り値
//　　  なし



// ３．備考



//*****************************************************************************
function Fn_InitPage(){
  try{

    //画面遷移開始通知設定

    SetViewMovingNotification(ViewMovingNotification);

    //初画面表示
    document.getElementById("DIV_DelText").innerText                 = DelText;
    document.getElementById("DIV_DelCancelText").innerText           = DelCancelText;
    document.getElementById("DIV_ImgDisableText").innerText          = ImgDisableText;
    document.getElementById("DIV_ImgEnableText").innerText           = ImgEnableText;
    document.getElementById("DIV_ReshotText").innerText              = ReshotText;
    document.getElementById("DIV_CancelText").innerText              = CancelText;
    document.getElementById("DIV_UpdateText").innerText              = UpdateText;
		document.getElementById("DIV_ConfirmCancelText").innerText       = ConfirmCancelString; 
		document.getElementById("DIV_ConfirmOkText").innerText           = ConfirmOkString;
    //フォント名,フォントサイズの設定


    document.getElementById("BODY").style.fontFamily                 = FONT_NAME;
    // 2005/06/23 002 H.SAITO デザイン変更対応(フォントサイズ）


    //document.getElementById("BODY").style.fontSize                   = FONT_SIZE;
    for(i = 1; i <= MAXMENU; i++){
      document.getElementById("DIV_DeleteText" + i).style.fontFamily = FONT_NAME;
      // 2005/06/23 003 H.SAITO デザイン変更対応(フォントサイズ）


      //document.getElementById("DIV_DeleteText" + i).style.fontSize   = FONT_SIZE;
      document.getElementById("DIV_DeleteText" + i).style.fontSize   = FONT_SIZE_MENU;
    }
    // 2005/06/23 022 H.SAITO デザイン変更対応(フォントサイズ）


    // ボタン
    document.getElementById("DIV_DelText").style.fontSize            = FONT_SIZE_BUTTON;
    document.getElementById("DIV_DelCancelText").style.fontSize      = FONT_SIZE_BUTTON;
    document.getElementById("DIV_ImgDisableText").style.fontSize     = FONT_SIZE_BUTTON;
    document.getElementById("DIV_ImgEnableText").style.fontSize      = FONT_SIZE_BUTTON;
    document.getElementById("DIV_ReshotText").style.fontSize         = FONT_SIZE_BUTTON;
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
//     画面を開く 
// ２．戻り値
//　　  なし 
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

    //変数初期化 

    Fn_Init();

		//データ取得完了フラグが１以外ならばデータを取得する 


		if(parent.EndGetDataFlag != FLAG_STUDY_GETDATA){
			parent.STUDYDATA_GET_PROC.Public_GetData(PROC_MODE, parent.StudySequence, "", ExclusiveModeStudy);
		}
		else{
//070614 HSK山本 PVCS#2209 UPDATE-ST
            if(DM_NeedUpdateStudyData){
                //排他は掛けずデータ再取得 
                parent.STUDYDATA_GET_PROC.Public_GetData(PROC_MODE, parent.StudySequence, "", "");
            }else{
                Public_EndGetData();
            }
//070614 HSK山本 PVCS#2209 UPDATE-ED
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
    var i;						//ループカウンタ
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

		//内部フラグの初期化



    for(i = 0; i < parent.DataCount; i++){
			//内部フラグに初期値をセットする
			//写損状態のみフラグに反映し、以外は通常フラグをセットする
			if(parent.ImageStatus[i] == STATE_MISS_SHOT){
				MenuKindFlag[i] = FLAG_MISS_SHOT;
			}
			else{
				MenuKindFlag[i] = FLAG_NORMAL;
			}
			//画像データ状態は初期の画像データ状態を退避（更新時使用）
//070614 HSK山本 PVCS#2209 ADD-ST
            MediaOutputFlag[i] = parent.MediaOutStatus[i]
//070614 HSK山本 PVCS#2209 ADD-ED


      FirstImageStatus[i] = MenuKindFlag[i];
    }
    //削除・削除キャンセルボタンを不活性化



    Fn_DeleteButton_Enable(3);
    //画像無効化・有効化ボタンを不活性化  
    Fn_ImageDisableButton_Enable(3);
    //再撮ボタンを不活性化



    Fn_ReshotButton_Enable(2);
    //１ページ目を表示
    Fn_SelectPage(1); 
     //メニューボタン活性化


    Fn_ButtonEnable(1);

//070614 HSK山本 PVCS#2209 ADD-ST
    //情報取得完了

    DM_NeedUpdateStudyData = false;
//070614 HSK山本 PVCS#2209 ADD-ED
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
//070614 HSK山本 PVCS#2209 UPDATE-ST
//        Public_Init();
        //出力排他チェック 
        DM_CheckOutputExclusive(DM_CheckedOutputExclusiveNotification);
//070614 HSK山本 PVCS#2209 UPDATE-ED
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
    //初期化



    MaxPage          = 0;		//検査メニューページの最大値
    SelectPageNo     = -1;	//検査リストページ選択番号
    SelectMenuPage   = -1;	//検査メニュー選択ページ(1～)
    SelectMenuNo     = -1;	//検査メニュー選択番号(1～)
    SelectMenuTable  = -1;	//検査メニュー選択テーブル(1～4)
    UpdateTimeOutId  = null;//更新タイマのＩＤ
    //内部フラグ、画像データステータス退避エリアを初期化
    MenuKindFlag     = new Array();
//070614 HSK山本 PVCS#2209 ADD-ST
    MediaOutputFlag  = new Array(); //メディア出力済みフラグ
//070614 HSK山本 PVCS#2209 ADD-ED
    FirstImageStatus = new Array();
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
// ２．戻り値
//　　  なし



// ３．備考



//　　　なし



//*****************************************************************************
function Fn_OnButton(targetTableNo){
  try{
    switch(targetTableNo){
      case 1: // 検査メニュー①
      case 2: // 検査メニュー②
      case 3: // 検査メニュー③
      case 4: // 検査メニュー④
        Fn_OnSelectMenu(targetTableNo);
        break;
      case 5: // 検査メニュー⑤選択済みボタン(１～４)
        Fn_OnSelectMenu(SelectMenuTable);
        break;
			//----------//
      // ↑ボタン //    
			//----------//
      case 11: // CLICK
        Fn_SelectPage(SelectPageNo - 1);
        document.getElementById("IMG_UpBtn_Enable").src   = IMG_MENULIST_PREV_UP;
        break;
      case 12: // MOUSEDOWN
        document.getElementById("IMG_UpBtn_Enable").src   = IMG_MENULIST_PREV_DOWN;
        break;
      case 13: // MOUSEOUT
        document.getElementById("IMG_UpBtn_Enable").src   = IMG_MENULIST_PREV_UP;
        break;
			//----------//
      // ↓ボタン //
			//----------//
      case 15: // CLICK
        Fn_SelectPage(SelectPageNo + 1);
        document.getElementById("IMG_DownBtn_Enable").src = IMG_MENULIST_NEXT_UP;
        break;
      case 16: // MOUSEDOWN
        document.getElementById("IMG_DownBtn_Enable").src = IMG_MENULIST_NEXT_DOWN;
        break;
      case 17: // MOUSEOUT
        document.getElementById("IMG_DownBtn_Enable").src = IMG_MENULIST_NEXT_UP;
        break;
			//------------//
      // 削除ボタン //
			//------------//
      case 21: // CLICK
        Fn_OnDeleteBtn();
        document.getElementById("IMG_DelBtn_Enable").src = IMG_DELETE_UP;
        break;
      case 22: // MOUSEDOWN
        document.getElementById("IMG_DelBtn_Enable").src = IMG_DELETE_DOWN;
        break;
      case 23: // MOUSEOUT
        document.getElementById("IMG_DelBtn_Enable").src = IMG_DELETE_UP
        break;
			//----------------------//
      // 削除キャンセルボタン //
			//----------------------//
      case 31: // CLICK
        Fn_OnDeleteCancelBtn();
        document.getElementById("IMG_DelCancelBtn_Enable").src = IMG_DELETE_CANCEL_UP;
        break;
      case 32: // MOUSEDOWN
        document.getElementById("IMG_DelCancelBtn_Enable").src = IMG_DELETE_CANCEL_DOWN;
        break;
      case 33: // MOUSEOUT
        document.getElementById("IMG_DelCancelBtn_Enable").src = IMG_DELETE_CANCEL_UP;
        break;
			//------------------//
      // 画像無効化ボタン //
			//------------------//
      case 41: // CLICK
        Fn_OnImgDisableBtn();
        document.getElementById("IMG_ImgDisableBtn_Enable").src = IMG_IMGDISABLE_UP;
        break;
      case 42: // MOUSEDOWN
        document.getElementById("IMG_ImgDisableBtn_Enable").src = IMG_IMGDISABLE_DOWN;
        break;
      case 43: // MOUSEOUT
        document.getElementById("IMG_ImgDisableBtn_Enable").src = IMG_IMGDISABLE_UP;
        break;
			//------------------//
      // 画像有効化ボタン //
			//------------------//
      case 51: // CLICK
        Fn_OnImgEnableBtn(); 
        document.getElementById("IMG_ImgEnableBtn_Enable").src = IMG_IMGENABLE_UP;
        break;
      case 52: // MOUSEDOWN
        document.getElementById("IMG_ImgEnableBtn_Enable").src = IMG_IMGENABLE_DOWN;
        break;
      case 53: // MOUSEOUT
        document.getElementById("IMG_ImgEnableBtn_Enable").src = IMG_IMGENABLE_UP;
        break;
			//--------------//
      // 再撮影ボタン //
			//--------------//
      case 61: // CLICK
        Fn_OnReshotBtn();
        document.getElementById("IMG_ReshotBtn_Enable").src = IMG_IMGRESHOT_UP;
        break;
      case 62: // MOUSEDOWN
        document.getElementById("IMG_ReshotBtn_Enable").src = IMG_IMGRESHOT_DOWN;
        break;
      case 63: // MOUSEOUT
        document.getElementById("IMG_ReshotBtn_Enable").src = IMG_IMGRESHOT_UP;
        break;
			//------------//
      // 戻るボタン //
			//------------//
      case 91:// 戻るボタン
        document.getElementById("IMG_CancelBtn").src = IMG_BACK_UP;
        // 戻る/閉じる場合は排他の開放を行わない


        ExclusiveModeStudyRelease = EXCLUSIVE_NOTHING;
        // 排他の開放処理


        Fn_Exclusive(COMMAND_MODE_CANCEL, "");
        break;
      case 92: // MOUSEDOWN
        document.getElementById("IMG_CancelBtn").src = IMG_BACK_DOWN;
        break;
      case 93: // MOUSEOUT
        document.getElementById("IMG_CancelBtn").src = IMG_BACK_UP;
        break;
			//----------------//
      // 修正完了ボタン //
			//----------------//
      case 95: // CLICK
        //情報未取得の場合は不活性
        if(parent.EndGetDataFlag == FLAG_STUDY_NOGETDATA)return;
        document.getElementById("IMG_UpdateBtn_Enable").src = IMG_NEXT_UP;
        // 更新
        Fn_Update();
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
      //------------------------------//
      // 続行可能エラー時のＯＫボタン //
      //------------------------------//
      case 100:// 続行可能エラー時のＯＫボタン
        Public_CloseMessage();
        Public_CloseError();     
        break;
      //----------------//
      // 確認ＯＫボタン //
      //----------------//
			case 111:  //ONCLICK
        // 確認処理実施
        Fn_UpdateExec();
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
//        Public_Error(FATAL_ERROR, "Unexcpted Buttom was Pushed");
        break;
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
  }
}
//*****************************************************************************
// Fn_SelectPage
//
// １．機能 
//      指定されたページで検査メニューリストを表示する
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Fn_SelectPage(pageNo){
  try{
    var i; //ループカウンタ
    var firstMenuTableNo;	 //一番上に表示するデータの場所
    var menuTableNo;       //検査メニュー作業用位置(1～∞)
    var pageCountMessage;  //メニュー数／ページ数表示
    var imageTagString;    //サムネイル表示ＩＭＧタグ

    //＜計算＞総ページ数(小数点以下切り上げ)
    MaxPage     = Math.ceil(parent.DataCount / MAXMENU);
    //＜チェック＞指定されたページが有効範囲内か
    if(pageNo < 1 || pageNo > MaxPage){
      return;
    }
    //--------------------//
    // 検査メニューの表示 //
    //--------------------//
    //＜計算＞一番上に表示するデータの位置
    firstMenuTableNo = (pageNo - 1) * MAXMENU;

    //＜表示＞検査メニュー
    for(i = 1; i <= MAXMENU; i++){
      //＜計算＞メニュー選択位置
      menuTableNo = firstMenuTableNo + i;

      //＜チェック＞表示するデータが全件数を超えていないか
      if(menuTableNo > parent.DataCount){
	      break;
      }

      //＜表示＞テキストを表示    
      document.getElementById("DIV_DeleteText" + i).style.visibility = "visible";

      //＜表示＞通常のメニューボタンを表示
      document.getElementById("IMG_DeleteMenu" + i).style.visibility = "visible";

      //＜表示＞未撮の場合はサムネイル非表示
      if(parent.DataStatus[menuTableNo - 1] == STATE_NOT_SHOT){
        document.getElementById("DIV_DeleteFilm" + i).innerHTML        = "";
        document.getElementById("DIV_DeleteFilm" + i).style.visibility = "hidden";
      }
      //＜表示＞既撮の場合はサムネイル表示
      else{
        imageTagString =  Fn_GetImageTag(menuTableNo);
        document.getElementById("DIV_DeleteFilm" + i).innerHTML        = imageTagString;
        document.getElementById("DIV_DeleteFilm" + i).style.visibility = "visible";
      }

      //＜表示＞検査メニュータイトル
      document.getElementById("DIV_DeleteText" + i).innerText=parent.MenuName[menuTableNo - 1];
      
      //＜表示＞ステータス表示（通常,削除,写損,再撮）



      //内部フラグをチェック NORMAL(通常),DELETE(削除),MISS_SHOT(写損),RESHOT(再撮)
      switch(MenuKindFlag[menuTableNo - 1]){
        case FLAG_NORMAL:
          document.getElementById("IMG_ReshotImage" + i).style.visibility = "hidden";         
					document.getElementById("IMG_DeleteImage" + i).style.visibility = "hidden";         
          break;
				case FLAG_DELETE:
          document.getElementById("IMG_ReshotImage" + i).style.visibility = "hidden";         
					document.getElementById("IMG_DeleteImage" + i).style.visibility = "visible";         
					break;
				case FLAG_MISS_SHOT:
          document.getElementById("IMG_ReshotImage" + i).style.visibility = "hidden";         
					document.getElementById("IMG_DeleteImage" + i).style.visibility = "visible";         
					break;
        case FLAG_RESHOT:
          document.getElementById("IMG_ReshotImage" + i).style.visibility = "visible";         
					document.getElementById("IMG_DeleteImage" + i).style.visibility = "hidden";         
          break;
        default:
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
//          Public_Error(FATAL_ERROR, "UnExcepted MenuKindFlag Flag");
          break;
      }   
    }
    //----------------------//
    // 選択状態ボタンの表示 //
    //----------------------//
    //＜表示＞メニュー表示をしなかった場合はメニューを不可視



    if(i <= MAXMENU){
      for(;i <= MAXMENU;i++){
        document.getElementById("IMG_DeleteMenu"  + i).style.visibility = 'hidden';
        document.getElementById("DIV_DeleteFilm"  + i).style.visibility = 'hidden';
        document.getElementById("DIV_DeleteText"  + i).style.visibility = 'hidden';
        document.getElementById("DIV_DeleteFilm"  + i).innerHTML        = "";
        //＜表示＞ステータス表示を不可視



        document.getElementById("IMG_DeleteImage" + i).style.visibility = 'hidden';
        document.getElementById("IMG_ReshotImage" + i).style.visibility = 'hidden';
      }
    }
    //＜表示＞選択状態ボタン表示
    //表示しているページに選択している検査メニューがある場合




    if(pageNo == SelectMenuPage){
      document.getElementById("DIV_DeleteMenu5").style.visibility = "visible";
    }
    //表示しているページに選択している検査メニューがない場合




    else{
      document.getElementById("DIV_DeleteMenu5").style.visibility = "hidden";
    }
    //----------------//
    // ページ数の表示 //
    //----------------//
    //＜表示＞総メニュー数　現ページ／総ページ数
    // 2005/06/23 003 H.SAITO デザイン変更対応(フォントサイズ）


    //pageCountMessage = TotalPageString + parent.DataCount + MenuString + pageNo + "/" + MaxPage + PageString;
    pageCountMessage = TotalPageString + " " + parent.DataCount + MenuString + "    " + pageNo + "/" + MaxPage + PageString;
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
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
//    Public_Error(FATAL_ERROR, "SelectPage Exception");
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
function Fn_OnSelectMenu(tableNo){
    try{
        var menuTableNo;   //検査メニューのＮｏ(１～∞） 
        var divTag;				 //撮影メニューのＤＩＶタグ 
        //総ページ数が0件のとき何もしない 
        if(MaxPage <= 0){
            return;
        }
        //非表示のとき何もしない 
        divTag = "IMG_DeleteMenu" + tableNo;
        if(document.getElementById(divTag).style.visibility == "hidden"){
            return;
        }

        //＜計算＞選択された検査メニューＮｏ 
        menuTableNo = (SelectPageNo - 1) * MAXMENU + tableNo;
        //--------------//
        // 選択状態解除 //
        //--------------//
        //＜表示＞既に選択されている場合は選択解除 
        if(menuTableNo == SelectMenuNo){
          //＜表示＞非選択画像にする 
          document.getElementById("DIV_DeleteMenu5").style.visibility = "hidden";
          //＜表示＞通常のメニューボタンを表示する 
          document.getElementById("IMG_DeleteMenu" + tableNo).style.visibility = "visible";
          //＜表示＞削除・削除キャンセルボタンを不活性化 
          Fn_DeleteButton_Enable(3);
          //＜表示＞画像無効化・有効化ボタンを不活性化 
          Fn_ImageDisableButton_Enable(3);
          //＜表示＞再撮ボタンを不活性化 
          Fn_ReshotButton_Enable(2);

          //＜退避＞選択情報初期化 
          SelectMenuNo    = -1;	//検査メニュー選択番号
          SelectMenuPage  = -1;	//検査メニュー選択ページ
          SelectMenuTable = -1;	//検査メニュー選択テーブル
          return;
        }

        //--------------//
        // 選択状態設定 //
        //--------------//
        //選択画像にする
        document.getElementById("DIV_DeleteMenu5").style.visibility = "visible";
        document.getElementById("DIV_DeleteMenu5").style.top        = SELECTMENU_TOP + SELECTMENU_REVICE * (tableNo - 1);
        document.getElementById("DIV_DeleteMenu5").style.left       = SELECTMENU_LEFT;

        //--------------------------------------//
        // 削除・無効化・有効化・再撮ボタン表示 //
        //--------------------------------------//
        //未撮の場合 
        if(parent.DataStatus[menuTableNo - 1] == STATE_NOT_SHOT){
            switch(MenuKindFlag[menuTableNo - 1]){
                case FLAG_NORMAL:
                //＜表示＞削除ボタン活性化・削除キャンセルボタンを不活性化 
                Fn_DeleteButton_Enable(1);
                break;
                case FLAG_DELETE:
                //＜表示＞削除ボタン不活性化・削除キャンセルボタンを活性化 
                Fn_DeleteButton_Enable(2);
                break;	
                default:
                Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
//					Public_Error(FATAL_ERROR, "UnExcepted MenuKindFlag");
                break;
            }
            //＜表示＞画像無効化・有効化・再撮ボタンを不活性化  
            Fn_ImageDisableButton_Enable(3);
            Fn_ReshotButton_Enable(2);
        }
        //既撮の場合 
        else{
            switch(MenuKindFlag[menuTableNo - 1]){
                case FLAG_NORMAL:
//070614 HSK山本 PVCS#2209 UPDATE-ST
                if(MediaOutputFlag[menuTableNo - 1] == STATE_MEDIA_OUTPUT_COMPLETE){
                    //メディア出力済みの場合、写損＆再撮禁止
                    Fn_ImageDisableButton_Enable(3);
                    Fn_ReshotButton_Enable(2);

                }else{
                    //＜表示＞画像無効化を活性化・有効化を不活性化  
                    Fn_ImageDisableButton_Enable(1);
//070322 HSK古場 UPDATE-ST
                    if(parent.ImageKind == parent.IMAGEKIND_FCRIMAGE
                       || (parent.ImageKind == parent.IMAGEKIND_FDXIMAGE) && (parent.IsExistExMPMCode == 1)){	//2014.04.14 TYS会田 DR直結-検査情報修正 ADD
                        //＜表示＞再撮ボタンを活性化 
                        Fn_ReshotButton_Enable(1);
                    }
                    else{
                        // ＜表示＞CR画像以外は、再撮ボタンを不活性化 
                        Fn_ReshotButton_Enable(2);
                    }
//070322 HSK古場 UPDATE-ED
                }
//070614 HSK山本 PVCS#2209 UPDATE-ED
                break;
                case FLAG_MISS_SHOT:
                //＜表示＞画像無効化を不活性化・有効化を活性化  
                Fn_ImageDisableButton_Enable(2);
                //＜表示＞再撮ボタンを不活性化 
                Fn_ReshotButton_Enable(2);
                break;	
                case FLAG_RESHOT:
                //＜表示＞画像無効化を不活性化・有効化を活性化  
                Fn_ImageDisableButton_Enable(2);
                //＜表示＞再撮ボタンを不活性化 
                Fn_ReshotButton_Enable(2);
                break;				
                default:
                Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+10);
//					Public_Error(FATAL_ERROR, "UnExcepted MenuKindFlag");
					break;
            }
            //＜表示＞削除ボタン・削除キャンセルボタンを不活性化 
            Fn_DeleteButton_Enable(3);
        }
        //--------------//
        // 選択情報設定 //
        //--------------//
        //＜退避＞選択情報設定 
        //現在選択されているメニューの位置を保存 
        SelectMenuPage  = SelectPageNo;
        SelectMenuTable = tableNo;
        SelectMenuNo    = menuTableNo;
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+11);
//    Public_Error(FATAL_ERROR, "OnSelectMenu Exception");
    }
}
//*****************************************************************************
// Fn_OnDeleteBtn
//
// １．機能 
//      削除ボタンが選択された時の処理を行う
// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Fn_OnDeleteBtn(){
  try{
    //＜チェック＞削除ボタンが不活性の場合は終了



    if(document.getElementById("IMG_DelBtn_Enable").style.visibility == "hidden"){
      return;
    }
    //ログ出力



    Fn_WriteLog(CTRL_DELETE);

    //＜計算＞内部フラグを削除にする
		MenuKindFlag[SelectMenuNo - 1] = FLAG_DELETE;

    //＜表示＞画像の削除ボタンを不活性化・削除キャンセルボタンを活性化



    Fn_DeleteButton_Enable(2);

    //＜表示＞選択している検査メニューが現在表示しているページの場合のみ
    //削除ステータス画像を表示する
    if(SelectMenuPage == SelectPageNo){
      document.getElementById("IMG_DeleteImage" + SelectMenuTable).style.visibility = "visible"; 
    } 
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+12);
  }
}
//*****************************************************************************
// Fn_OnDeleteCancelBtn
//
// １．機能 
//      削除キャンセルボタンが選択された時の処理を行う
// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Fn_OnDeleteCancelBtn(){
  try{
    //＜チェック＞削除キャンセルボタンが不活性の場合は終了


    if(document.getElementById("IMG_DelCancelBtn_Enable").style.visibility == "hidden"){
      return;
    }
    //ログ出力


    Fn_WriteLog(CTRL_DELETECANCEL);       
    
    //＜計算＞内部フラグを通常にする
		MenuKindFlag[SelectMenuNo - 1] = FLAG_NORMAL;

    //＜表示＞画像の削除ボタンを活性化・削除キャンセルボタンを不活性化


    Fn_DeleteButton_Enable(1);

    //＜表示＞選択している検査メニューが現在表示しているページの場合のみ
    //削除ステータス画像を非表示にする
    if(SelectMenuPage == SelectPageNo){
      document.getElementById("IMG_DeleteImage" + SelectMenuTable).style.visibility = "hidden"; 
    } 
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+13);
//    Public_Error(FATAL_ERROR, "OnDeleteCancelBtn Exception");
  }
}
//*****************************************************************************
// Fn_OnImgDisableBtn
//
// １．機能 
//      画像無効化ボタンが選択された時の処理を行う
// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Fn_OnImgDisableBtn(){
  try{
    //＜チェック＞画像無効化ボタンが不活性の場合は終了



    if(document.getElementById("IMG_ImgDisableBtn_Enable").style.visibility == "hidden"){
      return;
    }
    //ログ出力




    Fn_WriteLog(CTRL_DISABLE);       

    //＜計算＞内部フラグを写損にする
		MenuKindFlag[SelectMenuNo - 1] = FLAG_MISS_SHOT;

    //＜表示＞画像無効化ボタンを不活性化・画像有効化ボタンを活性化



    Fn_ImageDisableButton_Enable(2);

  	//＜表示＞再撮ボタンを不活性化



		Fn_ReshotButton_Enable(2);

    //＜表示＞選択している検査メニューが現在表示しているページの場合のみ
    //削除ステータス画像を表示にする
    if(SelectMenuPage == SelectPageNo){
      document.getElementById("IMG_DeleteImage" + SelectMenuTable).style.visibility = "visible"; 
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+14);
//    Public_Error(FATAL_ERROR, "OnImgDisableBtn Exception");
  }
}
//*****************************************************************************
// Fn_OnImgEnableBtn
//
// １．機能 
//      画像有効化ボタンが選択された時の処理を行う
//			(有効化＋再撮解除の効果)
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Fn_OnImgEnableBtn(){
  try{
    //＜チェック＞画像有効化ボタンが不活性の場合は終了



    if(document.getElementById("IMG_ImgEnableBtn_Enable").style.visibility == "hidden"){
      return;
    }
    //ログ出力




    Fn_WriteLog(CTRL_ENABLE);       

    //＜計算＞内部フラグを通常にする
		MenuKindFlag[SelectMenuNo - 1] = FLAG_NORMAL;

    //＜表示＞画像無効化ボタンを活性化・画像有効化ボタンを不活性化



    Fn_ImageDisableButton_Enable(1);
		
//070322 HSK古場 UPDATE-ST
    if(parent.ImageKind == parent.IMAGEKIND_FCRIMAGE
       || (parent.ImageKind == parent.IMAGEKIND_FDXIMAGE) && (parent.IsExistExMPMCode == 1)){	//2014.04.14 TYS会田 DR直結-検査情報修正 ADD)
      //＜表示＞再撮ボタンを活性化 
      Fn_ReshotButton_Enable(1);
    }
    else{
      // ＜表示＞CR画像以外は、再撮ボタンを不活性化

      Fn_ReshotButton_Enable(2);
    }
//070322 HSK古場 UPDATE-ED

    //＜表示＞選択している検査メニューが現在表示しているページの場合のみ
    //写損/再撮画像を非表示にする
    if(SelectMenuPage == SelectPageNo){
      document.getElementById("IMG_DeleteImage" + SelectMenuTable).style.visibility = "hidden"; 
      document.getElementById("IMG_ReshotImage" + SelectMenuTable).style.visibility = "hidden"; 
    } 
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+15);
//    Public_Error(FATAL_ERROR, "OnImgEnableBtn Exception");
  }
}
//*****************************************************************************
// Fn_OnReshotBtn
//
// １．機能 
//      再撮ボタンが選択された時の処理を行う
// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Fn_OnReshotBtn(){
  try{
    //＜チェック＞再撮ボタンが不活性の場合は終了


    if(document.getElementById("IMG_ReshotBtn_Enable").style.visibility == "hidden"){
      return;
    }

    //ログ出力


    Fn_WriteLog(CTRL_RESHOT);       

    //＜計算＞内部フラグを再撮にする
    MenuKindFlag[SelectMenuNo - 1] = FLAG_RESHOT;

  	//＜表示＞再撮ボタンを不活性化


		Fn_ReshotButton_Enable(2);

		//＜表示＞画像無効化ボタンを不活性化・画像有効化ボタンを活性化


		Fn_ImageDisableButton_Enable(2);

    //＜表示＞選択している検査メニューが現在表示しているページの場合のみ
    //再撮ステータス画像を表示にする
    if(SelectMenuPage == SelectPageNo){
      document.getElementById("IMG_ReshotImage" + SelectMenuTable).style.visibility = "visible"; 
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+16);
//    Public_Error(FATAL_ERROR, "OnReshotBtn Exception");
  }
}
//*****************************************************************************
// Fn_Update
//
// １．機能 
//      修正完了ボタンが選択された時の処理を行う
// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Fn_Update(){
  try{
    var i;  //ループカウンタ
    var sendImageSeq = new Array(); //送信データ（画像シーケンス）


    var sendMenuNo   = new Array(); //送信データ（0:削除 1:写損 2:写損解除 3:再撮)
		var deleteCount  = 0;					  //削除する撮影メニュー数
//ADD 2005/03/06=========
    var modifyFlag   = 0;           //未撮メニュー有フラグ
//ADD======================
    //ログ出力


    Fn_WriteLog(CTRL_UPDATE);

    //送信データを生成する


    for(i = 0; i < parent.DataCount; i++){
			switch(MenuKindFlag[i]){
				//削除の場合


				case FLAG_DELETE:
					sendImageSeq.push(parent.ImageSeq[i]);
					sendMenuNo.push(SEND_DELETE);
					deleteCount++;
					break;
				//再撮の場合


				case FLAG_RESHOT:
					sendImageSeq.push(parent.ImageSeq[i]);
					sendMenuNo.push(SEND_RESHOT);
          modifyFlag = 1;       //未撮メニュー有フラグ
					break;
				//通常の場合


				case FLAG_NORMAL:
					//初期状態が通常でなければ写損解除
					if(FirstImageStatus[i] != FLAG_NORMAL){
					  sendImageSeq.push(parent.ImageSeq[i]);
            sendMenuNo.push(SEND_UNSET_MISS_SHOT);          
					}
					break;
				//写損の場合


				case FLAG_MISS_SHOT:
					//初期状態が写損でなければ写損
					if(FirstImageStatus[i] != FLAG_MISS_SHOT){
            sendImageSeq.push(parent.ImageSeq[i]);
            sendMenuNo.push(SEND_MISS_SHOT);
					}
					break;
        default:         
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+17);
//         Public_Error(FATAL_ERROR, "UnExcepted ImageStatus Flag");
          return;
			}
		}

    //撮影メニューをすべて削除することはできない


    //再試行可能なエラー
    if(deleteCount == parent.DataCount){
//      Public_ErrorDisplay(RETRY_ERROR, 31513, FILE_NAME, 0);
				Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_DELETE_MENUINFO,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_DELETE_MENUINFO,""),top.DispFrame.Public_GetLangMsgString(MSG_DELETE_MENUINFO,"Cannot Get Message.")); 
			return;
    }

    //送信データが１つもなければ更新処理せずに次画面へ
    if(!sendImageSeq.length){
      Public_EndUpdate();
      return;
    }

    //送信データの長さをチェックする
    if(sendImageSeq.length != sendMenuNo.length){
      //データ長が違う（致命的なエラー)
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+18);
//      Public_Error(FATAL_ERROR, "Unexcepted Data Length");  
      return;
    }

    //検査ステータスが確定,かつ,再撮を実施する場合は確認ダイアログを表示する
    if(parent.StudyStatus == STATE_VERIFIED && modifyFlag == 1){
      // 2005/06/17 002 H.SAITO PVCS:695 確定済み検査に対する修正時のメッセージを変更
      //document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_CHANGE_VERIFIED,"");
      //document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_CHANGE_VERIFIED,"");
      //document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_CHANGE_VERIFIED,"Cannt Get Message.");
      document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_CHANGE_VERIFIED_R,"");
      document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_CHANGE_VERIFIED_R,"");
      document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_CHANGE_VERIFIED_R,"Cannt Get Message.");
      Public_Confirm();
      return;    
    }
    // 2005/06/17 010 H.SAITO PVCS:695 確定済み検査に対する修正時のメッセージを追加
    //検査ステータスが確定,かつ,再撮以外(削除/無効化/有効化を実施する場合)は確認ダイアログを表示する
    //再撮や無効化などが両方含まれていても再撮メッセージを優先して表示する。


    if(parent.StudyStatus == STATE_VERIFIED){
      document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_CHANGE_VERIFIED,"");
      document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_CHANGE_VERIFIED,"");
      document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_CHANGE_VERIFIED,"Cannt Get Message.");
      Public_Confirm();
      return;    
    }

    //修正を実施する
    Fn_UpdateExec();
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+19);
//    Public_Error(FATAL_ERROR, "Do_Update Exception");
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
    var i;  //ループカウンタ
    var sendImageSeq = new Array(); //送信データ（画像シーケンス）


    var sendMenuNo   = new Array(); //送信データ（0:削除 1:写損 2:写損解除 3:再撮)
		var deleteCount  = 0;					  //削除する撮影メニュー数
    var modifyFlag   = 0;           //未撮メニュー有フラグ

    //更新中表示
    Public_Message("DIALOG",UpdateString);

    //送信データを生成する


    for(i = 0; i < parent.DataCount; i++){
			switch(MenuKindFlag[i]){
				//削除の場合


				case FLAG_DELETE:
					sendImageSeq.push(parent.ImageSeq[i]);
					sendMenuNo.push(SEND_DELETE);
					deleteCount++;
					break;
				//再撮の場合


				case FLAG_RESHOT:
					sendImageSeq.push(parent.ImageSeq[i]);
					sendMenuNo.push(SEND_RESHOT);
          modifyFlag = 1;       //未撮メニュー有フラグ
					break;
				//通常の場合


				case FLAG_NORMAL:
					//初期状態が通常でなければ写損解除
					if(FirstImageStatus[i] != FLAG_NORMAL){
					  sendImageSeq.push(parent.ImageSeq[i]);
            sendMenuNo.push(SEND_UNSET_MISS_SHOT);          
					}
					break;
				//写損の場合


				case FLAG_MISS_SHOT:
					//初期状態が写損でなければ写損
					if(FirstImageStatus[i] != FLAG_MISS_SHOT){
            sendImageSeq.push(parent.ImageSeq[i]);
            sendMenuNo.push(SEND_MISS_SHOT);
					}
					break;
			}
		}
    //--------//
    //更新要求//
    //--------//
    //修正完了状況フラグを修正完了とする
    if(modifyFlag == 1){
      parent.ModifyStatusFlag = 2;
    }else{
      parent.ModifyStatusFlag = 1;
    }
    //タイマ予約


    UpdateTimeOutId = setTimeout("Public_Error('" + FATAL_ERROR + "','" + UpdateTimeOutString + "')", UPDATE_TIMEOUT);
    //＜更新＞処理ＡＳＰに更新を依頼する
//2005/04/23 008 H.SAITO
//    parent.DELETEMENU_UPDATE_PROC.Public_Update(PROC_MODE, parent.StudySequence, sendImageSeq, sendMenuNo, parent.StudyStatus, parent.PatientId);
      if(parent.isModifyCtrlCE){
        parent.FRAME_PROC.Public_Update(PROC_MODE, parent.StudySequence, sendImageSeq, sendMenuNo, parent.StudyStatus, parent.PatientId);
      }
      else{
        parent.DELETEMENU_UPDATE_PROC.Public_Update(PROC_MODE, parent.StudySequence, sendImageSeq, sendMenuNo, parent.StudyStatus, parent.PatientId);
      }

    if((parent.OpenMode == OPEN_MODE_DIALOG) && 
      ('function' === typeof window.external.ValidateModifyStudyFlag)){       //UPDSTUDY_12B
        window.external.ValidateModifyStudyFlag(); //UPDSTUDY_12B
    }                                              //UPDSTUDY_12B

  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+20);
  }
}
//*****************************************************************************
// Public_EndUpdate
//
// １．機能 
//      更新処理成功後の処理を行う
// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Public_EndUpdate(){
  try{
    //タイマ予約解除
    clearTimeout(UpdateTimeOutId);

    //更新中表示
    Public_Message("DIALOG",UpdateString);

    //排他の開放処理を行う
    Fn_Exclusive(COMMAND_MODE_UPDATE, "");
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+21);
//    Public_Error(FATAL_ERROR, "EndUpdate Exception");
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
      //タイマ予約

      //2010/11/22 30501エラー改善対応 ADD ST
      UpdateTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS_EXCLUSIVE+",'"+FILE_NAME+"',"+ (SPOT_CODE+22) +")", UPDATE_TIMEOUT);
      //2010/11/22 30501エラー改善対応 ADD ED
      parent.EXCLUSIVE_PROC.Public_Exclusive(PROC_MODE, parent.StudySequence, "", ExclusiveModeStudyRelease);
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+23);
//    Public_Error(FATAL_ERROR, "Fn_Exclusive Exception");
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
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+24);
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
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+25);
//    Public_Error(FATAL_ERROR, "EndUpdate Exception");
  }
}
//*****************************************************************************
// Fn_DeleteButton_Enable
//
// １．機能 
//      削除ボタン、削除キャンセルボタンの
//      活性化・不活性化を切り替える
//     
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Fn_DeleteButton_Enable(enableFlag){
  try{
    switch(enableFlag){
      //画像の削除ボタンを活性化/削除キャンセルボタンを不活性化



      case 1:
        document.getElementById("TABLE_DelBtn").style.visibility             = "visible";
        document.getElementById("IMG_DelBtn_Enable").style.visibility        = "visible";
        document.getElementById("IMG_DelBtn_Disable").style.visibility       = "hidden";
        document.getElementById("DIV_DelText").style.color                   = "black";
        document.getElementById("TABLE_DelCancelBtn").style.visibility       = "hidden";
        document.getElementById("IMG_DelCancelBtn_Enable").style.visibility  = "hidden";
        document.getElementById("IMG_DelCancelBtn_Disable").style.visibility = "visible";
        document.getElementById("DIV_DelCancelText").style.color             = "gray";
        break;
      //画像の削除ボタンを不活性化/削除キャンセルボタンを活性化



      case 2:
        document.getElementById("TABLE_DelBtn").style.visibility             = "hidden";
        document.getElementById("IMG_DelBtn_Enable").style.visibility        = "hidden";
        document.getElementById("IMG_DelBtn_Disable").style.visibility       = "visible";
        document.getElementById("DIV_DelText").style.color                   = "gray";
        document.getElementById("TABLE_DelCancelBtn").style.visibility       = "visible";
        document.getElementById("IMG_DelCancelBtn_Enable").style.visibility  = "visible";
        document.getElementById("IMG_DelCancelBtn_Disable").style.visibility = "hidden";
        document.getElementById("DIV_DelCancelText").style.color             = "black";
        break;
      //画像の削除ボタンを不活性化/削除キャンセルボタンを活性化



      case 3:
        document.getElementById("TABLE_DelBtn").style.visibility             = "hidden";
        document.getElementById("IMG_DelBtn_Enable").style.visibility        = "hidden";
        document.getElementById("IMG_DelBtn_Disable").style.visibility       = "visible";
        document.getElementById("DIV_DelText").style.color                   = "gray";
        document.getElementById("TABLE_DelCancelBtn").style.visibility       = "hidden";
        document.getElementById("IMG_DelCancelBtn_Enable").style.visibility  = "hidden";
        document.getElementById("IMG_DelCancelBtn_Disable").style.visibility = "visible";
        document.getElementById("DIV_DelCancelText").style.color             = "gray";
        break;
    }
  }
  catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+26);
//    Public_Error(FATAL_ERROR, "DeleteButton_Enable Exception");
  }
}
//*****************************************************************************
// Fn_ImageDisableButton_Enable
//
// １．機能 
//      画像無効化ボタン、画像有効化ボタンの
//      活性化・不活性化を切り替える
//     
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Fn_ImageDisableButton_Enable(enableFlag){
  try{
    switch(enableFlag){
      //画像無効化ボタンを活性化/画像有効化ボタンを不活性化



      case 1:
        document.getElementById("TABLE_ImgDisableBtn").style.visibility       = "visible";
        document.getElementById("IMG_ImgDisableBtn_Enable").style.visibility  = "visible";
        document.getElementById("IMG_ImgDisableBtn_Disable").style.visibility = "hidden";
        document.getElementById("DIV_ImgDisableText").style.color             = "black";
        document.getElementById("TABLE_ImgEnableBtn").style.visibility        = "hidden";
        document.getElementById("IMG_ImgEnableBtn_Enable").style.visibility   = "hidden";
        document.getElementById("IMG_ImgEnableBtn_Disable").style.visibility  = "visible";
        document.getElementById("DIV_ImgEnableText").style.color              = "gray";
        break;
      //画像無効化ボタンを不活性化/画像有効化ボタンを活性化



			case 2:
        document.getElementById("TABLE_ImgDisableBtn").style.visibility       = "hidden";
        document.getElementById("IMG_ImgDisableBtn_Enable").style.visibility  = "hidden";
        document.getElementById("IMG_ImgDisableBtn_Disable").style.visibility = "visible";
        document.getElementById("DIV_ImgDisableText").style.color             = "gray";
        document.getElementById("TABLE_ImgEnableBtn").style.visibility        = "visible";
        document.getElementById("IMG_ImgEnableBtn_Enable").style.visibility   = "visible";
        document.getElementById("IMG_ImgEnableBtn_Disable").style.visibility  = "hidden";
        document.getElementById("DIV_ImgEnableText").style.color              = "black";
        break;
      //画像無効化ボタン・画像有効化ボタンを不活性化



      case 3:
        document.getElementById("TABLE_ImgDisableBtn").style.visibility       = "hidden";
        document.getElementById("IMG_ImgDisableBtn_Enable").style.visibility  = "hidden";
        document.getElementById("IMG_ImgDisableBtn_Disable").style.visibility = "visible";
        document.getElementById("DIV_ImgDisableText").style.color             = "gray";
        document.getElementById("TABLE_ImgEnableBtn").style.visibility        = "hidden";
        document.getElementById("IMG_ImgEnableBtn_Enable").style.visibility   = "hidden";
        document.getElementById("IMG_ImgEnableBtn_Disable").style.visibility  = "visible";
        document.getElementById("DIV_ImgEnableText").style.color              = "gray";
        break;
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+27);
//    Public_Error(FATAL_ERROR, "ImageDisableButton_Enable Exception");
  }
}
//*****************************************************************************
// Fn_ReshotButton_Enable
//
// １．機能 
//      再撮ボタンの活性化・不活性化を切り替える
//     
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Fn_ReshotButton_Enable(enableFlag){
  try{
    switch(enableFlag){
      //再撮ボタンを活性化



      case 1:
        document.getElementById("TABLE_ReshotBtn").style.visibility       = "visible";
        document.getElementById("IMG_ReshotBtn_Enable").style.visibility  = "visible";
        document.getElementById("IMG_ReshotBtn_Disable").style.visibility = "hidden";
        document.getElementById("DIV_ReshotText").style.color             = "black";
        break;
      case 2:
      //再撮ボタンを不活性化


        document.getElementById("TABLE_ReshotBtn").style.visibility       = "hidden";
        document.getElementById("IMG_ReshotBtn_Enable").style.visibility  = "hidden";
        document.getElementById("IMG_ReshotBtn_Disable").style.visibility = "visible";
        document.getElementById("DIV_ReshotText").style.color             = "gray";
        break;
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+28);
//    Public_Error(FATAL_ERROR, "ReshotButton_Enable Exception");
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
    var imageFilePath;      //画像ファイルのフルパス  //** 2009/07/16 k.harada add



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
    imageFilePath   = parent.ThumbnailFilePath[menuTableNo - 1];  //** 2009/07/16 k.harada add

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
//** 2009/07/16 k.harada add end
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
     Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+29);
//   Public_Error(FATAL_ERROR, "GetImageTag Exception");
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
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+30);
//    Public_Error(FATAL_ERROR, "ViewThumbNail Exception");
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
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+31);
//    Public_Error(FATAL_ERROR, "Fn_WriteLog Exception");
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
	      document.getElementById("TABLE_UpdateBtn").style.visibility       = "hidden";
	      document.getElementById("IMG_UpdateBtn_Enable").style.visibility  = "hidden";
	      document.getElementById("IMG_UpdateBtn_Disable").style.visibility = "visible";
	      document.getElementById("DIV_UpdateText").style.color             = "gray";
	      break;
	    case 1:   //活性
	      document.getElementById("TABLE_UpdateBtn").style.visibility       = "visible";
	      document.getElementById("IMG_UpdateBtn_Enable").style.visibility  = "visible";
	      document.getElementById("IMG_UpdateBtn_Disable").style.visibility = "hidden";
	      document.getElementById("DIV_UpdateText").style.color     = "black";
	      break;
	    default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+32);
	      break;
	  }
	}
	catch(e){
     Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+33);
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
//070614 HSK山本 PVCS#2209 ADD-ST
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
        if(DM_BackByError){
            DM_BackByError = false;
            //戻る 
            Fn_OnButton(91);
        }
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+34);
    }
}

//*****************************************************************************
// DM_CheckedOutputExclusiveNotification
//
// １．機能 
//      出力排他チェック完了通知 
// ２．戻り値 
//      無し 
// ３．備考 
//      出力排他チェックの結果を受け取る通知関数
//      DM_CheckOutputExclusiveにコールバック指定する

//*****************************************************************************
function DM_CheckedOutputExclusiveNotification(returnOutputStatus)
{
    try{
        //エラーのチェックを行う 
        if(returnOutputStatus == 1){    //出力中 
            DM_BackByError = true;//エラー後戻る

            Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_ID_OUTPUT_EXCL,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_ID_OUTPUT_EXCL,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_ID_OUTPUT_EXCL,"Cannt Get Message."));
        }else{
            Public_Init();
        }
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+35);
    }
}

//*****************************************************************************
// DM_CheckOutputExclusive
//
// １．機能 
//      出力排他チェック 
// ２．戻り値
//      無し 
// ３．備考 
//      サーバ要求結果は、callback指定した関数に通知される。 
//*****************************************************************************
function DM_CheckOutputExclusive(callback)
{
    try{
        if(callback){
            DM_CheckOutputExclusiveCallback = callback;
        }
        Public_Message("DIALOG", ProcString);
        //タイマ予約 
        DM_GetdateTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+36) +")", UPDATE_TIMEOUT);
        if(parent.isModifyCtrlCE){
          Public_Message("NODIALOG", ""); 
        }
        parent.EXCLUSIVE_PROC.Public_OutputExclusive(PROC_MODE, parent.StudySequence, 1);
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+37);
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
        clearTimeout(DM_GetdateTimeOutId);
        Public_CloseMessage();
        //出力排他チェックが終了したことを通知
        if(DM_CheckOutputExclusiveCallback){
            DM_CheckOutputExclusiveCallback(returnOutputStatus);
        }
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+38);
    }
}

//070614 HSK山本 PVCS#2209 ADD-ED
