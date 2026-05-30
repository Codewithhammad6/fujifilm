/****************************************************************************

  @file RegAddMenuMenu_View.js

  @brief RegAddMenuMenu_Viewのクライアントスクリプト

  @author YSK田中
  
        SpotCode MAX 59

  Copyright(c) 2004-2009 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/11  YSK田中       V1.0       新規作成
  @date  06/08/08  YSK齋藤       V1.3       拡張メニューコードの区切り文字変更(PVCS#1804)
  @date  06/10/23  HSK山本       V1.4       CR検査部構造見直し[4]対応 
  @date  06/11/08  YSK齋藤       V1.4　     PVCS#1962,#1666対応 
  @date  06/11/09  HSK酒井       V1.4       CR検査部構造見直し[2]対応 
  @date  07/06/07  HSK古場       V2.0       PVCS#2281対応 
  @date  09/07/16  原田憲      V6.0       NAS対応 
  @date  09/12/01  FFS黒田     V1.1(B)    患者情報項目追加
  @date  10/02/01  FF 西川     V1.2(B)    検査修正を通知 UPDSTUDY_12B
  @date  10/06/01  FF 星野     V2.0(B)    CQ#219対応
  @date  10/11/22  FFS生田     V2.0(B)    30501エラー改善対応
  @date  14/06/25  TYS会田     V3.0(B)    JIRA#2483対応(メニュー追加時の撮影メニュー数制限)
*****************************************************************************/
//[定数]
var PROC_MODE						          = "";
var PROC_MODE_REGIST		          = 0;                 // 登録モード


var PROC_MODE_ADD				          = 1;                 // 追加モード


var PROC_MODE_CHANGE		          = 2;                 // 変更モード


var COMMAND_MODE_CANCEL = "CANCEL";
var COMMAND_MODE_ENTRY  = "ENTRY";

var PROC_MODE_REGISTSTUDY         = "REGADDMENU_VIEW"; // 検査登録画面として使用
var PROC_MODE_ADDMENU             = "ADDMENU_VIEW";    // メニュー追加画面として使用
var PROC_MODE_CHANGEMENU          = "CHANGEMENU_VIEW"; // メニュー変更画面として使用
// 処理コマンド


var COMMAND_STUDY                 = 1;                 // 検査開始要求


var COMMAND_REGIST                = 2;                 // 検査登録要求


//20050609(PVCS#350)ST
//操作権限コマンド



var COMMAND_MODE_ADDMENU			 = "ADDMENU";
var COMMAND_MODE_CHANGEMENU		 = "CHANGEMENU";
var COMMAND_MODE_STUDY_REGIST  = "REGISTSTUDY";
//20050609(PVCS#350)EN

// 操作ログ出力コマンド


var CTRL_STUDY                    = "Study";           // 検査開始


var CTRL_REGIST                   = "Regist";          // 登録
// オープンモード


var OPEN_MODE_CE                  = 0;				         // CEで開かれた場合


var OPEN_MODE_WINDOW              = 1;				         // ブラウザで開かれた場合


var OPEN_MODE_DIALOG              = 2;				         // ダイアログで開かれた場合



var CTRL_UPDATE                   = "Update";          // 修正完了



// 検査取得フラグ
var FLAG_STUDY_GETDATA       = 1;   
var FLAG_STUDY_NOGETDATA     = 0;
//排他制御スイッチ
var EXCLUSIVE_NOTHING             = -1;       // 排他制御(何もしない)
var EXCLUSIVE_DELL                = 0;        // 排他制御(開放)
var EXCLUSIVE_SET                 = 1;        // 排他制御(設定)
var EXCLUSIVE_CHECK               = 2;        // 排他制御(チェック)
var EXCLUSIVE_CHECK_STUDY         = 5;        // 排他制御(検査時チェック)
// エラー定数
var FATAL_ERROR         = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR         = "RETRY_ERROR";    //再試行可能なエラー
var USER_NOTHING_ERROR  = "USER_NOTHING_ERROR";	//ユーザチェックエラー
var SPOT_CODE           = 0;                   //スポットコード



var FILE_NAME           = "RegAddMenu_View.js";  //ファイル名



var MESSAGE_ID          = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS   = 30501;              //メッセージID 
//2010/11/16 30501エラー改善対応 ADD ST
var MESSAGE_ID_ACCESS_EXCLUSIVE = 40505;      //メッセージID
//2010/11/16 30501エラー改善対応 ADD ED
//20050609(PVCS#350)ST
var MESSAGE_ID_NOLOGIN   = 31502;              //メッセージID 
var MESSAGE_ID_LOGOFF    = 31503;              //メッセージID 
var MESSAGE_ID_DIFERENT  = 31504;              //メッセージID 
var MESSAGE_ID_FORBIDDEN = 31505;
//20050609(PVCS#350)EN
//警告メッセージ
var MSG_EXCLUSIVE_RU     = 31509;
var MSG_EXCLUSIVE_STUDY  = 31508;
// 2005/06/17 003 H.SAITO PVCS:695 確定済み検査に対する修正時のメッセージを変更
//var MSG_CHANGE_VERIFIED  = 31526;    // 確定した検査に対する修正確認

var MSG_CHANGE_VERIFIED  = 31530;    // 確定した検査に対する修正確認

// 2005/10/05 H.SAITO PVCS:1545 確定済み検査に対するメニュー変更時のメッセージ -ST-
var MSG_CHANGE_VERIFIED_C= 34526;    // 確定した検査に対する修正確認

// 2005/10/05 H.SAITO PVCS:1545 確定済み検査に対するメニュー変更時のメッセージ -ED-

//2014.06.25 TYS会田 JIRA#2483対応 ADD-ST
var MESSAGE_ID_MENUCOUNT_OVER = 31514;   // 撮影メニュー数が上限を超えた場合のメッセージID
var MAX_MENU_COUNT = 32;                 // 1検査の撮影メニュー数の上限
//2014.06.25 TYS会田 JIRA#2483対応 ADD-ED

// 操作権限チェック 戻り値
var RETURN_OK														=  0; //正常終了


var CHECK_AUTHORITY_ERROR_NOT_LOGGED_IN	= -1; //ログインされていない


var CHECK_AUTHORITY_ERROR_LOGGED_OFF		= -2; //ログオフされた
var CHECK_AUTHORITY_ERROR_DIFFERENT_ID	= -3; //ユーザIDがアプリケーション変数と異なっている
var CHECK_AUTHORITY_ERROR_AUTHORITY			= -4; //操作権限がない



//画像のステータス
var STATE_MISS_SHOT					      = "MISS";	  // 写損
var STATE_NOT_SHOT					      = "0";		  // 未撮ステータス
// 
var THUMBNAIL_HEIGHT		          = 54;	      // メニューリストのサムネイル表示IMGのHEIGHT
var THUMBNAIL_WIDTH			          = 54;	      // メニューリストのサムネイル表示IMGのWIDTH
var IMAGE_FILE_PATH;						              // 画像ファイルパス
var COOKIE_NAME                   = "GroupSelectPosition";	// グループの選択位置保存クッキー名


// 2005/07/21 005 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
//// 2005/05/14 002 H.SAITO 検査排他の変更(Cookie)
//var COOKIE_NAME_STUDY             = "StudyViewLock";	// 検査画面起動中クッキー名


//// 2005/06/29 002 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
//var COOKIE_NAME_STUDY2            = "StudyLock";	    // 検査排他中クッキー名


var PARTMENU_MAX                  = 8;        //グループメニュー総数(COL * ROW)
var PARTMENU_COL                  = 4;        //グループメニューCOL数	
var PARTMENU_ROW                  = 2;        //グループメニューROW数
var PARTMENU_TOP                  = 0;        //グループメニューボタンＴＯＰ開始位置
var PARTMENU_TOP_REVICE	          = 42;       //グループメニューボタンＴＯＰ増加値
var PARTMENU_LEFT				          = 8;        //グループメニューボタンＬＥＦＴ開始位置
var PARTMENU_LEFT_REVICE          = 122;      //グループメニューボタンＬＥＦＴ増加値
var FILMMENU_MAX                  = 24;       //撮影メニュー総数(COL * ROW)
var FILMMENU_COL                  = 3;        //撮影メニューCOL数
var FILMMENU_ROW                  = 8;        //撮影メニューROW数
var MAX_MENU                      = 4;        //メニューリスト表示件数
var UPDATE_TIMEOUT                = 180000;   // 更新処理タイムアウト値(３分)
//フォント


var FONT_NAME;
// 2005/06/23 009 H.SAITO デザイン変更対応(フォントサイズ）



//var FONT_SIZE;                                // フォントサイズ
var FONT_SIZE_GROUP;                          // フォントサイズ(表示グループ)
var FONT_SIZE_GROUP_LIST;                     // フォントサイズ(メニュー選択時のメニュー一覧)
var FONT_SIZE_MENU;                           // フォントサイズ(短冊内メニュー名称)
var FONT_SIZE_MENU_PAGE;                      // フォントサイズ(短冊メニューページ数)
var FONT_SIZE_BUTTON;                         // フォントサイズ(ボタン)
var FONT_SIZE_UPICON;                         // フォントサイズ(ボタン(上部にアイコンを含む))
var FONT_SIZE_OTHER;                          // フォントサイズ(その他)
// 画像パス
var IMG_REGIST_BACK_DOWN      = "../Bmp/cmOvalAPaleSBtnD.gif";
var IMG_REGIST_BACK_UP        = "../Bmp/cmOvalAPaleSBtnU.gif";
var IMG_REGIST_BACK_DISABLE   = "../Bmp/cmOvalAPaleSBtnX.gif";
var IMG_REGIST_NEXT_DOWN      = "../Bmp/cmCirBGreenBtnD.GIF";
var IMG_REGIST_NEXT_UP        = "../Bmp/cmCirBGreenBtnU.GIF";
var IMG_REGIST_NEXT_DISABLE   = "../Bmp/cmCirBGreenBtnX.GIF";
var IMG_REGIST_START_DOWN     = "../Bmp/cmCirBblueBtnD.gif";
var IMG_REGIST_START_UP       = "../Bmp/cmCirBblueBtnU.gif";
var IMG_REGIST_START_DISABLE  = "../Bmp/cmCirBblueBtnX.gif";
var IMG_MODIFY_BACK_DOWN      = "../Bmp/cmOvalAPaleLBtnD.gif";
var IMG_MODIFY_BACK_UP        = "../Bmp/cmOvalAPaleLBtnU.gif";
var IMG_MODIFY_BACK_DISABLE   = "../Bmp/cmOvalAPaleLBtnX.gif";
var IMG_MODIFY_NEXT_DOWN      = "../Bmp/cmCirBGreenBtnD.GIF";
var IMG_MODIFY_NEXT_UP        = "../Bmp/cmCirBGreenBtnU.GIF";
var IMG_MODIFY_NEXT_DISABLE   = "../Bmp/cmCirBGreenBtnX.gif";
var IMG_PART_NEXT_DOWN        = "../Bmp/cmDownPageBtnD.GIF";
var IMG_PART_NEXT_UP          = "../Bmp/cmDownPageBtnU.GIF";
var IMG_PART_NEXT_DISABLE     = "../Bmp/cmDownPageBtnX.GIF";
var IMG_PART_PREV_DOWN        = "../Bmp/cmUpPageBtnD.GIF";
var IMG_PART_PREV_UP          = "../Bmp/cmUpPageBtnU.GIF";
var IMG_PART_PREV_DISABLE     = "../Bmp/cmUpPageBtnX.GIF";
var IMG_MENU_NEXT_DOWN        = "../Bmp/cmDownPageBtnD.GIF";
var IMG_MENU_NEXT_UP          = "../Bmp/cmDownPageBtnU.gif";
var IMG_MENU_NEXT_DISABLE     = "../Bmp/cmDownPageBtnX.gif";
var IMG_MENU_PREV_DOWN        = "../Bmp/cmUpPageBtnD.GIF";
var IMG_MENU_PREV_UP          = "../Bmp/cmUpPageBtnU.GIF";
var IMG_MENU_PREV_DISABLE     = "../Bmp/cmUpPageBtnX.GIF";
var IMG_MENULIST_NEXT_DOWN    = "../Bmp/cmDownPageBtnD.gif";
var IMG_MENULIST_NEXT_UP      = "../Bmp/cmDownPageBtnU.gif";
var IMG_MENULIST_NEXT_DISABLE = "../Bmp/cmDownPageBtnX.gif";
var IMG_MENULIST_PREV_DOWN    = "../Bmp/cmUpPageBtnD.gif";
var IMG_MENULIST_PREV_UP      = "../Bmp/cmUpPageBtnU.gif";
var IMG_MENULIST_PREV_DISABLE = "../Bmp/cmUpPageBtnX.gif";
var IMG_DELETE_DOWN           = "../Bmp/crUndoBtnD.gif";
var IMG_DELETE_UP             = "../Bmp/crUndoBtnU.gif";
var IMG_DELETE_DISABLE        = "../Bmp/crUndoBtnX.gif";
var IMG_CONF_OK_DOWN          = "../Bmp/cmOvalAGreenLBtnD.gif";
var IMG_CONF_OK_UP            = "../Bmp/cmOvalAGreenLBtnU.gif";
var IMG_CONF_NG_DOWN          = "../Bmp/cmOvalAPaleLBtnD.gif";
var IMG_CONF_NG_UP            = "../Bmp/cmOvalAPaleLBtnU.gif";

var IMG_MENULIST_SELECT       = "../Bmp/crSelMenuPlt.gif";
var IMG_MENULIST_UNSELECT     = "../Bmp/crUnSelMenuPlt.gif";
var IMG_MENU_BUTTON_DOWN      = "../Bmp/crShotMenuBtnD.gif";
var IMG_MENU_BUTTON_UP        = "../Bmp/crShotMenuBtnU.gif";
// 検査ステータス
var STATE_VERIFIED            = "VERIFIED";     // 検査ステータス(確定)
// 2006/08/08 PVCS#1804 H.SAITO -ST-
var SPLIT_STRING_MENUDATA     = "\\";
// 2006/08/08 PVCS#1804 H.SAITO -ED-
//[変数]
var MenuListMaxIndexCount;                    // メニューリストのMAXメニュー数（追加されたメニューの配列の数）


var MenuListDispPageNo;                       // メニューリストに表示しているページNo
var d = document;
var PartNo;                                   // 部位No
var PartPage;                                 // 部位ページ数
var PartMaxPage;                              // 部位総ページ数
var PartSelectPage;                           // 選択状態の部位ページ番号
var MenuPage;                                 // 撮影メニューページ数
var MenuMaxPage;                              // 撮影メニュー総ページ数
var MenuMaxCount;                             // 撮影メニュー総数（歯抜けを含んだ数）



var MenuSelectPage;                           // 選択状態の撮影メニューページ番号
var UpdateTimeoutId = null;                          // 更新タイマＩＤ
var CheckTimeoutId = null;
var ProcMode;                                 // 現在の処理モード(0:登録,1:追加,2:変更)
// 部位情報の配列
var aryPartNo;	                              // 部位No配列
var aryPartName;                              // 部位名配列
// メニュー情報の配列
var aryMenuPosition;
var aryMenuExamCheck;
var aryMenuCode;
var aryMenuNameSbcs;
var aryMenuColor;
var aryMenuMpmCode;
var aryMenuRegionCode;
var gPartSelectPoint;                          // メニューをクリックした場所（0～7）



var gPartSelectIndex;                          // クリックされたメニューのインデックス番号(0～)
var FilmMenuSelectNoForChange;                 // 撮影メニューリスト内で選択状態の撮影メニューのインデックス番号(0～)
var FilmMenuSelectPageNoForChange;
// 登録追加された撮影メニューの配列
var aryEntryMenuCode;
var aryEntryDispMenu;
var aryEntryDispNo;
var aryDataStatus;
var aryEntryExamFlag;
var aryEntryThumbnailFileName;
var aryEntryThumbnailHeight;
var aryEntryThumbnailWidth;
// 変更された撮影メニューの配列
var aryChangeImageSeq;                          // 変更する画像シーケンス
var aryChangeMenuCode;                          // 変更後のメニューコード


var aryChangeExamFlag;                          // 検査フラグ
// 排他管理情報
var ExclusiveModeRu           = "";             // 画面ＯＰＥＮ時のＲＵの排他処理


var ExclusiveModeRuEnd        = "";             // 画面終了時のＲＵの排他処理


var ExclusiveModeStudy;                         // 画面ＯＰＥＮ時の検査の排他処理


var ExclusiveModeStudyEnd;                      // 画面終了時の検査の排他処理


var CommandMode;                                // 排他時の処理モード


var CommandParam;                               // 排他時の処理パラメータ
//スタック領域
var StacFlag = 0;
var StacPartCode = "";
var ParamRegisterMode = -1;											// 登録／修正完了の引数
//*****************************************************************************
// Fn_InitPage
//
// １．機能
//     ・ページ読み込み完了通知
// ２．戻り値
//　　  なし



// ３．備考



//　　　なし



//*****************************************************************************
function Fn_InitPage(){
	try{
    //画面遷移開始通知設定

    SetViewMovingNotification(ViewMovingNotification);

    var i;

		//文字列設定・削除ボタン表示/非表示
    document.getElementById("DIV_ConfirmCancelText").innerText          = ConfirmCancelString; 
    document.getElementById("DIV_ConfirmOkText").innerText              = ConfirmOkString; 

		switch(ProcMode){
			//検査登録
			case PROC_MODE_REGIST:
				document.getElementById("divRegistBack_Value").innerText				= ButtonBack;
				document.getElementById("divRegistStart_Value").innerText				= ButtonStudy;
				document.getElementById("divRegistNext_Value").innerText				= ButtonRegist;
				document.getElementById("divDelete").innerText									= ButtonDelete;
				document.getElementById("divDelete").style.visibility						= "visible";
				document.getElementById("MenuDelete_Disable").style.visibility  = "visible";
        // 2005/06/23 004 H.SAITO デザイン変更対応(フォントサイズ）



		    document.getElementById("divRegistBack_Value").style.fontSize   = FONT_SIZE_BUTTON;
		    document.getElementById("divRegistStart_Value").style.fontSize  = FONT_SIZE_BUTTON;
		    document.getElementById("divRegistNext_Value").style.fontSize   = FONT_SIZE_BUTTON;
				break;
			//メニュー追加
			case PROC_MODE_ADD:
				document.getElementById("divModifyBack_Value").innerText				= ButtonBack;
				document.getElementById("divModifyNext_Value").innerText				= ButtonNext;
				document.getElementById("divDelete").innerText									= ButtonDelete;
				document.getElementById("divDelete").style.visibility						= "visible";
				document.getElementById("MenuDelete_Disable").style.visibility  = "visible";
        // 2005/06/23 003 H.SAITO デザイン変更対応(フォントサイズ）



        document.getElementById("divModifyBack_Value").style.fontSize   = FONT_SIZE_BUTTON;
        document.getElementById("divModifyNext_Value").style.fontSize   = FONT_SIZE_BUTTON;
				break;
			//メニュー変更
			case PROC_MODE_CHANGE:
				document.getElementById("divModifyBack_Value").innerText        = ButtonBack;
				document.getElementById("divModifyNext_Value").innerText        = ButtonNext;
				document.getElementById("divDelete").style.visibility           = "hidden";
        // 2005/06/23 003 H.SAITO デザイン変更対応(フォントサイズ）



        document.getElementById("divModifyBack_Value").style.fontSize   = FONT_SIZE_BUTTON;
        document.getElementById("divModifyNext_Value").style.fontSize   = FONT_SIZE_BUTTON;
				break;
      //エラー
      default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
        return;
		}
    //フォント名,フォントサイズの設定


    document.getElementById("BODY").style.fontFamily              = FONT_NAME;
    // 2005/06/23 002 H.SAITO デザイン変更対応(フォントサイズ）



    //document.getElementById("BODY").style.fontSize                = FONT_SIZE + "px";
    for(i = 0; i < MAX_MENU; i++){
      document.getElementById("DIV_AddText" + i).style.fontFamily = FONT_NAME;
      // 2005/06/23 003 H.SAITO デザイン変更対応(フォントサイズ）



      //document.getElementById("DIV_AddText" + i).style.fontSize   = FONT_SIZE + "px";
      document.getElementById("DIV_AddText" + i).style.fontSize   = FONT_SIZE_MENU;
    }
    // 2005/06/23 004 H.SAITO デザイン変更対応(フォントサイズ）



    for(i = 0; i < PARTMENU_MAX; i++){
      document.getElementById("divPart" + i).style.fontSize      =  FONT_SIZE_GROUP;
    }
    //ＣＥで最初に表示したときにメニューが垂直方向に中央揃えにならない不具合を修正
    for(i = 0; i < FILMMENU_MAX; i++){
      document.getElementById("divMenu" + i).style.verticalAlign = "MIDDLE";
      // 2005/06/23 002 H.SAITO デザイン変更対応(フォントサイズ）



      document.getElementById("divMenu" + i).style.fontSize      =  FONT_SIZE_GROUP_LIST;
    }

    // 2005/06/23 016 H.SAITO デザイン変更対応(フォントサイズ）



		document.getElementById("divDelete").style.fontSize						  = FONT_SIZE_UPICON;
		document.getElementById("TD_ProcText").style.fontSize           = FONT_SIZE_OTHER;
		document.getElementById("TD_ErrorText").style.fontSize          = FONT_SIZE_OTHER;
		document.getElementById("DIV_ErrorOkText").style.fontSize       = FONT_SIZE_BUTTON;
		document.getElementById("DIV_ConfirmCancelText").style.fontSize = FONT_SIZE_BUTTON;
		document.getElementById("DIV_ConfirmOkText").style.fontSize     = FONT_SIZE_BUTTON;
		document.getElementById("divMaxList").style.fontSize            = FONT_SIZE_MENU_PAGE;
		document.getElementById("divMaxMenuCount").style.fontSize       = FONT_SIZE_MENU_PAGE;
    document.getElementById("TD_ConfirmTitle1").style.fontSize      = FONT_SIZE_OTHER;
    document.getElementById("TD_ConfirmTitle2").style.fontSize      = FONT_SIZE_OTHER;
    document.getElementById("TD_ConfirmText").style.fontSize        = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorTitle1").style.fontSize        = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorTitle2").style.fontSize        = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorText").style.fontSize          = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorCode").style.fontSize          = FONT_SIZE_OTHER;
    //フィルタ解除
		Public_CloseMessage();

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
	}
}
//*****************************************************************************
// Public_Init
//
// １．機能
//     ・メニュー追加,メニュー変更画面を呼び出す際の入り口
// ２．戻り値
//　　  なし



// ３．備考



//　　 ・メニュー登録画面は別の入り口
//*****************************************************************************
function Public_Init(){
	try{
	  //処理モードが編集と変更の場合、修正完了不活性
	  if(ProcMode == PROC_MODE_ADD || ProcMode == PROC_MODE_CHANGE){
	    Fn_ButtonEnable(0);  
	  }

		//処理モード(画面ＩＤ)の設定




		switch(ProcMode){
			// メニュー追加
			case PROC_MODE_ADD:
				PROC_MODE = PROC_MODE_ADDMENU;
// 2005/08/22 Kanno ADD ST タイトルバーの文字列対応


				// タイトル設定


				top.SetTitle(TitleStringAdd);
// 2005/08/22 Kanno ADD ED タイトルバーの文字列対応


				break;
			// メニュー変更
			case PROC_MODE_CHANGE:
				PROC_MODE = PROC_MODE_CHANGEMENU;
// 2005/08/22 Kanno ADD ST タイトルバーの文字列対応


				// タイトル設定


				top.SetTitle(TitleStringChange);
// 2005/08/22 Kanno ADD ED タイトルバーの文字列対応


				break;
			// エラー
			default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
				return;
		}

    //--------------------------------------------//
    //モードに応じて排他の管理スイッチを切り替える//
    //--------------------------------------------//
    switch(parent.ExclusiveMode){
      // モード１



      case parent.EXCLUSIVE_MODE1:
        ExclusiveModeStudy        = EXCLUSIVE_NOTHING;
        ExclusiveModeStudyEnd     = EXCLUSIVE_DELL;
        break;
      // モード２



      case parent.EXCLUSIVE_MODE2:
        ExclusiveModeStudy        = EXCLUSIVE_NOTHING;
        ExclusiveModeStudyEnd     = EXCLUSIVE_NOTHING;
        break;
      default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
//				Public_Error(FATAL_ERROR, "UnExcepted parent.ExclusiveMode" + parent.ExclusiveMode);
        return;
    }
    // ＲＵ排他処理の初期化




    ExclusiveModeRuEnd = EXCLUSIVE_NOTHING;

		//データ取得完了フラグが１以外ならばデータを取得する




		if(parent.EndGetDataFlag != FLAG_STUDY_GETDATA){
			parent.STUDYDATA_GET_PROC.Public_GetData(PROC_MODE, parent.StudySequence, "", ExclusiveModeStudy);
		}
		else{
			Public_EndGetData();
		}
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
	}
}
//*****************************************************************************
// Init
//
// １．機能
//     ・メニュー登録画面を呼び出す際の入り口
// ２．戻り値
//　　  なし




// ３．備考




//　　 ・データの取得を行わないため、メニュー追加,メニュー変更とは別の入り口
//*****************************************************************************
function Init(){
	try{
		//処理モード(画面ＩＤ)の設定




    switch(ProcMode){
			// メニュー登録
			case PROC_MODE_REGIST:		
		    PROC_MODE = PROC_MODE_REGISTSTUDY;
				break;
			// エラー
			default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
				return;
    }
    //------------------------//
    // 管理スイッチを設定する //
    //------------------------//
    ExclusiveModeRuEnd      = EXCLUSIVE_NOTHING;  // ＲＵの排他のチェック(検査開始ボタン押下時にはチェックに変更する) 
    ExclusiveModeStudyEnd   = EXCLUSIVE_NOTHING;  // 検査の排他のチェック(検査開始ボタン押下時にはチェックに変更する) 

    // 次の処理




		Public_EndGetData();
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
	}
}

//*****************************************************************************
// Fn_Init
//
// １．機能
//     ・処理モードに応じて変数の初期化を行う
// ２．戻り値
//　　  なし



// ３．備考



//　　　なし



//*****************************************************************************
function Fn_Init(){
  try{
    var i;        //添え字




    var imageTag; //IMGタグ
    //--------------------------------------------//
    // 処理モード共通で使用する変数・配列の初期化 //
    //--------------------------------------------//
    // 変数
    MenuListMaxIndexCount		      = 0;            // メニューリストのMAXメニュー数（追加されたメニューの配列の数）



    MenuListDispPageNo			      = 0;            // メニューリストに表示しているページNo
    PartNo                        = 0;            // 部位No
    PartPage                      = 1;            // 部位ページ数
    PartMaxPage                   = 1;            // 部位総ページ数
    PartSelectPage                = 1;            // 選択状態の部位ページ番号
    MenuPage                      = 0;            // 撮影メニューページ数
    MenuMaxPage                   = 0;            // 撮影メニュー総ページ数
    MenuMaxCount                  = 0;            // 撮影メニュー総数（歯抜けを含んだ数）



    MenuSelectPage		            = -1;           // 選択状態の撮影メニューページ番号
    UpdateTimeoutId               = null;         // 更新タイマＩＤ
    gPartSelectPoint              = -1;           // メニューをクリックした場所（0～7）



    gPartSelectIndex              = -1;           // クリックされたメニューのインデックス番号(0～)
    FilmMenuSelectNoForChange		  = -1;
    FilmMenuSelectPageNoForChange = 0;

    // 選択したまま画面を終了し、再度画面を表示させたときに選択画像が表示されてしまうバグを修正
    for(i = 0; i < MAX_MENU; i++){
      imageTag = "IMG_AddMenu" + i;
      if(document.getElementById(imageTag).src != IMG_MENULIST_UNSELECT){
        document.getElementById(imageTag).src = IMG_MENULIST_UNSELECT      
      }
    }

    // 部位情報の配列
    aryPartNo                     = new Array();	// 部位No配列
    aryPartName				            = new Array();  // 部位名配列
    // メニュー情報の配列
    aryMenuPosition               = new Array();
    aryMenuExamCheck              = new Array();
    aryMenuCode                   = new Array();
    aryMenuNameSbcs               = new Array();
    aryMenuColor                  = new Array();
    aryMenuMpmCode                = new Array();
    aryMenuRegionCode             = new Array();
    // 撮影メニューリストの配列
	  aryEntryMenuCode					    = new Array();
	  aryEntryDispMenu					    = new Array();
	  aryEntryDispNo						    = new Array();
	  aryDataStatus							    = new Array();
	  aryEntryThumbnailFileName     = new Array();
	  aryEntryThumbnailHeight	      = new Array();
	  aryEntryThumbnailWidth		    = new Array();		
    //------------------------------------//
    // 各処理モードで使用する配列の初期化 //
    //------------------------------------//
    switch(ProcMode){
      // 検査登録/メニュー追加
      case PROC_MODE_REGIST:
      case PROC_MODE_ADD:
		    aryEntryExamFlag					    = new Array();
        break;
      // メニュー変更
      case PROC_MODE_CHANGE:
        aryChangeImageSeq             = new Array();
        aryChangeMenuCode				      = new Array();
        aryChangeExamFlag				      = new Array();
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
// Public_EndGetData
//
// １．機能
//     ・Public_EndGetData
// ２．戻り値
//　　  なし



// ３．備考



//　　　なし



//*****************************************************************************
function Public_EndGetData(){
	var i;							// 添え字




	var readCookieBuff; // クッキーの値
	var cookieFlag;			// クッキーの値が現在のデータに存在したかのチェックフラグ
	var aryPartNoLen;		// 部位データ数
	var partPageNo;			// 部位ページ数
  var ctrlFrame;      // 機能フレームの参照
  var subMainFrame;   // サブメインフレームの参照
	try{
    // 変数の初期化




    Fn_Init();
	
		//---------------------------------------------------//
		// サブメインフレームからメニュー情報を取得する      //
		//---------------------------------------------------//
		subMainFrame = parent.parent;
		aryPartNoLen = subMainFrame.aryPartNo.length;

		for(i = 0;i < aryPartNoLen; i++){
			aryPartNo.push(subMainFrame.aryPartNo[i]);                  // 部位Ｎｏ



			aryPartName.push(subMainFrame.aryPartName[i]);              // 部位名
			aryMenuPosition.push(subMainFrame.aryMenuPosition[i]);      // メニュー位置
			aryMenuExamCheck.push(subMainFrame.aryMenuExamCheck[i]);    // 検査メニューフラグ
			aryMenuCode.push(subMainFrame.aryMenuCode[i]);              // メニューコード



			aryMenuNameSbcs.push(subMainFrame.aryMenuNameSbcs[i]);      // メニュー名



			aryMenuColor.push(subMainFrame.aryMenuColor[i]);            // メニュー色
			aryMenuMpmCode.push(subMainFrame.aryMenuMpmCode[i]);        // メニューＭＰＭコード



			aryMenuRegionCode.push(subMainFrame.aryMenuRegionCode[i]);  // メニューリージョンコード



		}
		subMainFrame = null;
    //---------------------------------------------------//
		// メニュー変更時は,機能フレームからデータを取得する //
    //---------------------------------------------------//
		if(ProcMode == PROC_MODE_CHANGE){
			for(i = 0; i < parent.DataCount; i++){
//				aryEntryMenuCode.push(parent.ImageSeq[i]);
				aryEntryDispMenu.push(parent.MenuName[i]);
				aryEntryDispNo.push(i);
				aryDataStatus.push(parent.DataStatus[i]);
				aryEntryThumbnailFileName.push(parent.ThumbnailFileName[i]);
				aryEntryThumbnailHeight.push(parent.ThumbnailHeight[i]);
				aryEntryThumbnailWidth.push(parent.ThumbnailWidth[i]);
			}		
		}

		// 撮影メニューリストを表示する
		Fn_DispMenu();

    //----------------------//
		// ユーザガイダンス表示 //
    //----------------------//
		ctrlFrame = parent.INFORMATION_VIEW;

		// ユーザガイダンス初期化




		ctrlFrame.Public_ClearInformation();

		switch(ProcMode){
			// メニュー登録
			case PROC_MODE_REGIST:
//2005/05/24-ST==========
//				ctrlFrame.Public_SetUserGuidance(UserGuidanceStringRegist); 
				ctrlFrame.Public_SetUserGuidance(UserGuidanceStringRegist,0); 
//2005/05/24-EN==========
				break;
			// メニュー追加
			case PROC_MODE_ADD:
        parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
//2005/05/24-ST==========
//				ctrlFrame.Public_SetUserGuidance(UserGuidanceStringAdd); 
				ctrlFrame.Public_SetUserGuidance(UserGuidanceStringAdd,1); 
//2005/05/24-EN==========
				break;
			// メニュー変更
			case PROC_MODE_CHANGE:		
        parent.EndGetDataFlag = FLAG_STUDY_GETDATA;
//2005/05/24-ST==========
//				ctrlFrame.Public_SetUserGuidance(UserGuidanceStringChange); 
				ctrlFrame.Public_SetUserGuidance(UserGuidanceStringChange,1); 
//2005/05/24-EN==========
				break;
      // エラー
		  default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
        return;
		}
		// 患者情報表示
		ctrlFrame.Public_SetPatientId(parent.PatientId); 
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update Start
//		ctrlFrame.Public_SetPatientSex(parent.PatientSex);
		ctrlFrame.Public_SetPatientSex(parent.PatientSex, parent.PatientsSexNeutred);
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update End
		ctrlFrame.Public_SetPatientName(parent.PatientName, parent.PatientKanjiName);   
		ctrlFrame.Public_SetPatientBirthDate(parent.PatientBirthDate);
		ctrlFrame.Public_SetPatientAge(parent.PatientAge);
		ctrlFrame = null;		

		//----------------//
		// 部位を表示する //
		//----------------//
		// 部位最大ページ数を取得




		PartMaxPage = Math.ceil(parent.parent.gPartMaxCount / PARTMENU_MAX);

		// 部位表示
		fnPartDisplay();

		//------------------------------------------------//
		// クッキーから部位メニューの前回選択値を取得する //
		//------------------------------------------------//
		readCookieBuff = sReadCookie(COOKIE_NAME);

		// 取得した値をチェックする
		if(!readCookieBuff){
			readCookieBuff = 0;
		}
		else{
			cookieFlag	 = 0;

			// 取得した値が現在の部位に存在するかをチェックする
			for(i = 0;i < aryPartNoLen; i++){
				if(aryPartNo[i] == readCookieBuff){
					// ページ番号と選択インデックス（0～7）計算




					PartSelectPage = Math.floor(i / PARTMENU_MAX);
					readCookieBuff = i % PARTMENU_MAX;
          // 部位選択中のページに移動




					fnPartPageSet(PartSelectPage);
					cookieFlag		 = 1;
					break;
				}
			}
			// 前回の部位が選択できない場合




			if(!cookieFlag){
				readCookieBuff = 0;
			}
		}
		//------------------------------//
		// 部位メニューを選択状態にする //
		//------------------------------//
		// 部位を選択する




		fnChangeMenu(readCookieBuff);

	  //処理モードが編集と変更の場合、修正完了活性
	  if(ProcMode == PROC_MODE_ADD || ProcMode == PROC_MODE_CHANGE){
	    Fn_ButtonEnable(1);  
	  }

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+10);
	}
}
//**********************************************
//  fnPartDisplay()		
//
//  1．機能
//       部位を表示
//  2．戻り値  
//       なし



//  3．備考



//
//***********************************************
function fnPartDisplay(){
	var divPartName;		// 部位名表示ＤＩＶのＩＤ名




	var startPosition;  // 表示開始位置
	var i;							// 添え字




	
	try{
		// 表示開始位置を計算




		startPosition = (PartPage - 1) * PARTMENU_MAX;

		// 部位データを表示する
		for (i = 0; i < PARTMENU_MAX; i++){
			divPartName = "divPart" + i;

			// 部位データがあれば表示する
			if(i < parent.parent.gPartMaxCount && aryPartName[startPosition + i]){
				d.getElementById(divPartName).innerText = aryPartName[startPosition + i];
			}
			else{
				d.getElementById(divPartName).innerText = "";		
			}
		}
		// 部位ページ↑ボタンの活性/不活性
		if(PartPage <= 1){
			d.getElementById("imgPartUp_Enable").style.visibility    = "hidden";
			d.getElementById("imgPartUp_Disable").style.visibility	 = "visible";
		}
		else{
			d.getElementById("imgPartUp_Enable").style.visibility		 = "visible";
			d.getElementById("imgPartUp_Disable").style.visibility	 = "hidden";
		}
		// 部位ページ↓ボタンの活性/不活性
		if(PartPage >= PartMaxPage){
			d.getElementById("imgPartDown_Enable").style.visibility  = "hidden";
			d.getElementById("imgPartDown_Disable").style.visibility = "visible";
		}
		else{
			d.getElementById("imgPartDown_Enable").style.visibility  = "visible";
			d.getElementById("imgPartDown_Disable").style.visibility = "hidden";
		}
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+11);
	}
}
// ADD 2005/03/02====================================
//**********************************************
//  fnFilmMenuSet()		
//
//  1．機能
//       撮影メニューをセット
//  2．戻り値  
//       なし



//  3．備考



//
//***********************************************
function fnFilmMenuSet(){
  try{  
		    aryMenuPosition[PartNo]   = parent.parent.aryMenuPosition[PartNo];    // メニュー位置
		    aryMenuExamCheck[PartNo]  = parent.parent.aryMenuExamCheck[PartNo];    // 検査メニューフラグ
		    aryMenuCode[PartNo]       = parent.parent.aryMenuCode[PartNo];    // メニューコード



		    aryMenuNameSbcs[PartNo]   = parent.parent.aryMenuNameSbcs[PartNo];    // メニュー名



		    aryMenuColor[PartNo]      = parent.parent.aryMenuColor[PartNo];    // メニュー色
		    aryMenuMpmCode[PartNo]    = parent.parent.aryMenuMpmCode[PartNo];    // メニューＭＰＭコード



		    aryMenuRegionCode[PartNo] = parent.parent.aryMenuRegionCode[PartNo];    // メニューリージョンコード



        if(StacPartCode != ""){
          //情報取得



          fnChangeMenu(StacPartCode);
          StacPartCode = "";
          return;
        }else{
          fnFilmMenuDisplay();
        }
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+12);
  }
}
//ADD =============================================================

//**********************************************
//  fnFilmMenuDisplay()		
//
//  1．機能
//       撮影メニューを表示
//  2．戻り値  
//       なし



//  3．備考



//
//***********************************************
function fnFilmMenuDisplay(){
	var i;						     // ＤＩＶの添え字




	var j;						     // データの添え字




	var divMenuName;	     // メニュー名称表示テキストのＤＩＶＩＤ
	var startPosition;     // 表示開始位置
	var startDataPosition; // 表示開始位置(データの添え字)
	var menuNameBuffer;    // = new Array();;

	try{
    //--------------------//
		// 表示開始位置を設定 //
    //--------------------//
		startPosition = (MenuPage - 1) * FILMMENU_MAX;

    //--------------------------------------//
    // 表示開始位置の添え字をデータから探す //
    //--------------------------------------//
    for(i = 0;i < aryMenuPosition[PartNo].length; i++){
      if(aryMenuPosition[PartNo][i] >= startPosition){
        startDataPosition = i;     
        break;
      }
    }
    
		// データの添え字を初期化



		j = 0;
    //--------------------------------------------------------//
		// 各撮影メニュー表示領域に対しデータの表示／非表示を行う //
    //--------------------------------------------------------//
		for(i = 0;i < FILMMENU_MAX ; i++){
			divMenuName = "divMenu" + i;
			// 撮影メニューがあるＤＩＶの場合



			if(aryMenuPosition[PartNo][startDataPosition + j] == startPosition + i){
        //------------------------//
				// 撮影メニュー名称を取得 //
        //------------------------//
				// 2006/08/08 PVCS#1804 H.SAITO -ST-
				//menuNameBuffer  = aryMenuNameSbcs[PartNo][startDataPosition + j].split("*");
				menuNameBuffer  = aryMenuNameSbcs[PartNo][startDataPosition + j].split(SPLIT_STRING_MENUDATA);
				// 2006/08/08 PVCS#1804 H.SAITO -ED-

				document.getElementById(divMenuName).innerText = menuNameBuffer[0];
        //--------------------------------//
        // 撮影メニューの表示色を変更する //
        //--------------------------------//
        switch(ProcMode){
				  // メニュー変更の場合は検査メニューはグレーにする
          case PROC_MODE_CHANGE:
            if(aryMenuExamCheck[PartNo][startDataPosition + j] == "True"){
              document.getElementById(divMenuName).style.color = "gray";
            }
					  else{
						  document.getElementById(divMenuName).style.color = aryMenuColor[PartNo][startDataPosition + j];
					  }
            break;
				  // メニュー変更以外の場合




          case PROC_MODE_REGIST:
          case PROC_MODE_ADD:
					  document.getElementById(divMenuName).style.color   = aryMenuColor[PartNo][startDataPosition + j];
            break;
        }
				// データの添え字をインクリメント




				j++;
			}
			// 撮影メニューがないＤＩＶの場合




			else{
				document.getElementById(divMenuName).innerText = "";
			}
		}

		// 撮影メニューのページ／総ページ数を計算




		MenuMaxCount = fnGetMenuMaxCount(PartNo);
    // MenuMaxCount がNaNの場合





    if(!MenuMaxCount){
      MenuMaxCount = 1;    
    }
		MenuMaxPage  = Math.ceil(MenuMaxCount / FILMMENU_MAX);   
		if(MenuPage < 1){
			MenuPage = 1;
		}

		// 撮影メニューのページ／総ページ数を表示	
		d.getElementById("divMaxMenuCount").innerText = MenuPage + " / " + MenuMaxPage;

		// 撮影メニューページ↑ボタンの不活性
		if(MenuPage <= 1){
			d.getElementById("imgMenuUp_Enable").style.visibility		 = "hidden";
			d.getElementById("imgMenuUp_Disable").style.visibility	 = "visible";
		}
		// 撮影メニューページ↑ボタンの活性
		else{
			d.getElementById("imgMenuUp_Enable").style.visibility		 = "visible";
			d.getElementById("imgMenuUp_Disable").style.visibility	 = "hidden";
		}
		// 撮影メニューページ↓ボタンの不活性
		if(MenuPage >= MenuMaxPage){
			d.getElementById("imgMenuDown_Enable").style.visibility  = "hidden";
			d.getElementById("imgMenuDown_Disable").style.visibility = "visible";
		}
		// 撮影メニューページ↓ボタンの活性
		else{
			d.getElementById("imgMenuDown_Enable").style.visibility  = "visible";
			d.getElementById("imgMenuDown_Disable").style.visibility = "hidden";
		}
//ADD 2005/03/01================================
   Public_CloseMessage();
//ADD =========================================
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+13);
	}
}
//**********************************************
//  fnChangeMenuBtn
//
//  1．機能
//       部位メニュー選択中の部位を再度選択した時の処理



//  2．戻り値  
//       なし



//  3．備考



//
//***********************************************
function fnChangeMenuBtn(){
	fnChangeMenu(gPartSelectPoint);
}
//**********************************************
//  fnChangeMenu
//
//  1．機能
//       部位メニュー選択時の処理



//  2．戻り値  
//       なし



//  3．備考



//
//***********************************************
function fnChangeMenu(SelectPoint){
	try{
		var divPartName;
		var selectPartIndex;   // 選択された部位のインデックス番号
		var partMenuTopIndex;  // 部位の上からの順番
		var partMenuLeftIndex; // 部位の左からの順番

		divPartName = "divPart" + SelectPoint;

		// 部位がない場合



		if(!document.getElementById(divPartName).innerText){
			return false;
		}
//ADD 2005/03/02============================
    Public_Message("NODIALOG","");
//ADD ==============================
		// すでに選択中（同一部位かつ撮影メニューの１ページ目を開いている場合は何もしない）



    //(考慮中)
		//----------------------//
		// 部位を選択状態にする //
		//----------------------//
		gPartSelectPoint = SelectPoint;
		gPartSelectIndex = ((PartSelectPage - 1) * PARTMENU_MAX) + SelectPoint;

		// 上からの位置を求める




		partMenuTopIndex  = Math.floor(gPartSelectPoint / PARTMENU_COL);

		// 左からの位置を求める




		partMenuLeftIndex = gPartSelectPoint % PARTMENU_COL;

		// 選択された部位を選択状態にする
		document.getElementById("imgPartBtn").style.visibility = "visible";
		document.getElementById("imgPartBtn").style.top				 = PARTMENU_TOP  + partMenuTopIndex  * PARTMENU_TOP_REVICE;
		document.getElementById("imgPartBtn").style.left			 = PARTMENU_LEFT + partMenuLeftIndex * PARTMENU_LEFT_REVICE;

		// 選択状態の部位の情報を設定




		PartSelectPage = PartPage;
		PartNo = ((PartSelectPage - 1) * PARTMENU_MAX + SelectPoint);

		// 選択された部位をクッキーに保存する




		CreateCookie(COOKIE_NAME, aryPartNo[PartNo]);
		//----------------------------------------//
		// 部位の選択時に撮影メニューを再表示する //
		//----------------------------------------//
		// 撮影メニューの１ページ目を表示
		MenuPage = 1;

//ADD 2005/03/02=================================================
/*
if(StacFlag == 1){
document.getElementById("divButtonRegist").innerText= SelectPoint+"40";
  StacPartCode = SelectPoint;
  return;
}else{
*/
  if(parent.parent.aryMenuNameSbcs[PartNo].length < 1){
//      StacFlag = 1;
    top.MenuFrame.frmGetMenu.txtGroupCode.value = aryPartNo[PartNo];
    top.MenuFrame.frmGetMenu.txtGroupDispNo.value = PartNo;
    // 戻りクライアント位置を設定



    switch(ProcMode){
      case PROC_MODE_REGIST:  //メニュー登録
        top.MenuFrame.frmGetMenu.txtNextId.value = "REGISTMENU";
        break;
      case PROC_MODE_ADD:     //メニュー追加
        if(OpenMode == OPEN_MODE_CE || OpenMode == OPEN_MODE_WINDOW){
          top.MenuFrame.frmGetMenu.txtNextId.value = "ADDMENU";
        }else if(OpenMode == OPEN_MODE_DIALOG){
          top.MenuFrame.frmGetMenu.txtNextId.value = "ADDMENU_DIALOG";
        }else{
//          ;
        }
        break;
      case PROC_MODE_CHANGE:  //メニュー変更
        if(OpenMode == OPEN_MODE_CE || OpenMode == OPEN_MODE_WINDOW){
          top.MenuFrame.frmGetMenu.txtNextId.value = "CHANGEMENU";
        }else if(OpenMode == OPEN_MODE_DIALOG){
          top.MenuFrame.frmGetMenu.txtNextId.value = "CHANGEMENU_DIALOG";
        }else{
//          ;
        }
        break;
      default:
        break;
    }        
    // 2005/06/27 003 H.SAITO PVCS#350 認証、権限チェック対応



//070607 HSK古場 PVCS#2281 UPDATE-ST
//    top.MenuFrame.frmGetMenu.loginUserId.value   = escape(top.LoginUserId);
    top.MenuFrame.frmGetMenu.loginUserId.value   = encodeURIComponent(top.LoginUserId);
//070607 HSK古場 PVCS#2281 UPDATE-ED
    top.MenuFrame.frmGetMenu.loginTime.value     = top.LoginTime;
    top.MenuFrame.frmGetMenu.submit();
    return;
  }
//}
//ADD ================================================
		// 撮影メニュー表示
		fnFilmMenuDisplay();

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+14);
	}
}
//**********************************************
//  fnClickFilmMenu
//
//  1．機能
//       撮影メニュー選択時の処理



//  2．戻り値  
//       なし



//  3．備考



//***********************************************
function fnClickFilmMenu(selectedNo){
	var divMenuName;
	var selectFilmMenuNo; // 選択された撮影メニューの位置(0～



	var splitBuff;
  var l;  
  var i;
  var j;
  var changeMenuExist;
  
	divMenuName = "divMenu" + selectedNo;

	try{
    // 撮影メニューがない場合は何もしない




		if(!document.getElementById(divMenuName).innerText){
			return;
		}
    // 撮影メニューが不活性の場合は何もしない




    if(document.getElementById(divMenuName).style.color == "gray"){
      return;
    }

		// 選択された撮影メニューの位置を計算(0～




		selectFilmMenuNo = (MenuPage - 1) * FILMMENU_MAX + selectedNo;

    // 選択された撮影メニューの情報を内部データから探す




		for(l = 0; l < aryMenuPosition[PartNo].length; l++){
      // 内部データにヒットした場合




      if(aryMenuPosition[PartNo][l] == selectFilmMenuNo){
        // 内部データにヒットした場合はループを抜ける




        break;
      }
		}
		// 見つからない場合はおかしいので致命的エラー
    if(l == aryMenuPosition[PartNo].length){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+15);
//      Public_Error(FATAL_ERROR,"aryMenuPosition NotFound Exception");     
    }

    // 検査/撮影メニューを取り出す




		// 2006/08/08 PVCS#1804 H.SAITO -ST-
		//splitBuff = aryMenuNameSbcs[PartNo][l].split("*");
		splitBuff = aryMenuNameSbcs[PartNo][l].split(SPLIT_STRING_MENUDATA);
		// 2006/08/08 PVCS#1804 H.SAITO -ED-

    // 選択された撮影メニュー情報の追加/変更
    switch(ProcMode){
      //---------------------------//
      // メニュー登録/メニュー追加 //
      //---------------------------//
      case PROC_MODE_REGIST:
      case PROC_MODE_ADD:
        // 撮影メニューコードを配列に追加
				aryEntryMenuCode.push(aryMenuCode[PartNo][l]);        // MenuCode
				aryEntryExamFlag.push(aryMenuExamCheck[PartNo][l]);   // ExamFlag

        // 検査メニューの場合は構成する撮影メニューを取り出す


				if(splitBuff.length > 1){
					splitBuff.shift();
        }
        // 登録された撮影メニューの配列に追加
        for(i = 0; i < splitBuff.length; i++){
          aryEntryDispMenu.push(splitBuff[i]);
          aryEntryDispNo.push(aryEntryMenuCode.length - 1);
        }
        break;
      //--------------//
      // メニュー変更 //
      //--------------//
      case PROC_MODE_CHANGE:
        // 選択状態でなければ何もしない




				if(FilmMenuSelectNoForChange == -1){
					return;
				}
        // 画面表示用の撮影メニュー名を更新する
				aryEntryDispMenu[FilmMenuSelectNoForChange]   =  splitBuff;

        // 変更配列に存在しているかのフラグを初期化する
        changeMenuExist = false;            

        // 既に変更配列に登録されているかどうかをチェックする
        for(j = 0; j < aryChangeImageSeq.length; j++){
          // 既に同一画像Seqが変更配列に登録されている場合は変更後のメニューコードを入れ替え、追加はしない


          if(aryChangeImageSeq[j] == parent.ImageSeq[FilmMenuSelectNoForChange]){
						aryChangeMenuCode[j]  =  aryMenuCode[PartNo][l];                      // 変更後のメニューコード


            changeMenuExist       =  true;
          }
        }

        // 変更配列に存在しない場合のみ配列に追加する
        if(!changeMenuExist){
          aryChangeImageSeq.push(parent.ImageSeq[FilmMenuSelectNoForChange]);     // 画像シーケンス
					aryChangeMenuCode.push(aryMenuCode[PartNo][l]);                         // 変更後のメニューコード


        }
        break;
    }
    
    // 変更モードの場合には最後のページを表示するのではなく、現在のページを表示する
		if(ProcMode != PROC_MODE_CHANGE){
			MenuListDispPageNo = Math.ceil(aryEntryDispMenu.length / 4) - 1;
		}else{
			IMG_AddMenuClick(FilmMenuSelectNoForChange, 1);
		}

    // 撮影メニューリストを更新する
		Fn_DispMenu();

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+16);
	}
}
//**********************************************
//  IMG_AddMenuClick
//
//  1．機能
//       撮影メニューリスト内の撮影メニュー選択時の処理



//  2．戻り値  
//       なし



//  3．備考



//***********************************************
function IMG_AddMenuClick(IndexNo,iMode){
	var IMG_AddMenu = "";
	var Amari       = 0;

	try{
	  // 変更モード以外はリスト内の撮影メニューを選択できない




		if(ProcMode != PROC_MODE_CHANGE){
			return;
		}
    // モードが０の場合




		if(!iMode){
			if(FilmMenuSelectNoForChange == MenuListDispPageNo * MAX_MENU + IndexNo){
				FilmMenuSelectNoForChange         = -1;
				IMG_AddMenu                       = "IMG_AddMenu"  + IndexNo;
				d.getElementById(IMG_AddMenu).src = IMG_MENULIST_UNSELECT;
				return;
			}
			// 選択されたインデックスNoを取得する




			FilmMenuSelectNoForChange = MenuListDispPageNo * MAX_MENU + IndexNo;
		}
		// 初期化




		for(i = 0; i < MAX_MENU; i++){
      IMG_AddMenu = "IMG_AddMenu" + i;
      d.getElementById(IMG_AddMenu).src   = IMG_MENULIST_UNSELECT;
    }
    // 選択された場所の画像を入れ替える
    if(FilmMenuSelectNoForChange >= (MenuListDispPageNo * MAX_MENU) && FilmMenuSelectNoForChange <= ((MenuListDispPageNo) * MAX_MENU + 3)){
      Amari       = FilmMenuSelectNoForChange % MAX_MENU;
      IMG_AddMenu = "IMG_AddMenu" + Amari;
      d.getElementById(IMG_AddMenu).src = IMG_MENULIST_SELECT;
		}
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+17);
	}
}

function ChangeMenuCodeArray(){
	try{
		// 変更された撮影メニューの配列に入れる
		aryChangeMenuCode.push(aryEntryMenuCode[FilmMenuSelectNoForChange]);
		aryChangeExamFlag.push(aryEntryExamFlag[FilmMenuSelectNoForChange]);
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+18);
	}
}
//*****************************************************************************
// Fn_DispMenu
//
// １．機能 
//      撮影メニューリストを表示する
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Fn_DispMenu(){
	try{
	  var dispNo; //データ開始位置(0～




		// 撮影メニューリストの件数
		MenuListMaxIndexCount = aryEntryDispMenu.length;

		// データ開始位置を計算




		dispNo = MenuListDispPageNo * MAX_MENU;
		//------------------------------//
		// 撮影メニューリストを表示する //
		//------------------------------//
		for(i = 0; i < MAX_MENU; i++){
			// 表示するデータがあれば表示する
			if(dispNo + i	<	MenuListMaxIndexCount && aryEntryDispMenu[(dispNo + i)]){
				d.getElementById("IMG_AddMenu" + i).style.visibility = "visible";
				d.getElementById("DIV_AddText" + i).style.visibility = "visible";
				d.getElementById("DIV_AddText" + i).innerText				 = aryEntryDispMenu[(dispNo + i)];
				switch(ProcMode){
					// 検査登録,メニュー追加では,最後に追加されたメニューを選択状態にする
					case PROC_MODE_REGIST:
					case PROC_MODE_ADD:
						if(aryEntryMenuCode.length - 1 == aryEntryDispNo[(dispNo + i)]){
							d.getElementById("IMG_AddMenu" + i).src = IMG_MENULIST_SELECT;
						}
						else{
							d.getElementById("IMG_AddMenu" + i).src = IMG_MENULIST_UNSELECT;
						}
						break;
					// メニュー変更では,既撮はサムネイル画像を表示する
					case PROC_MODE_CHANGE:
            // 未撮の場合はサムネイル非表示
            if(aryDataStatus[dispNo + i] == STATE_NOT_SHOT){
              d.getElementById("DIV_AddFilm" + i).innerHTML        = "";
              d.getElementById("DIV_AddFilm" + i).style.visibility = "hidden";
            }
            // 既撮の場合はサムネイル表示
            else{
              imageTagString =  Fn_GetImageTag(dispNo + i);
              d.getElementById("DIV_AddFilm" + i).innerHTML        = imageTagString;
              d.getElementById("DIV_AddFilm" + i).style.visibility = "visible";
            }
            // ステータス表示（写損）画像データ状態 0:NORMAL(通常) 2:MISS(写損)
            if(parent.ImageStatus[dispNo + i] == STATE_MISS_SHOT ){
              d.getElementById("IMG_DeleteImage" + i).style.visibility = "visible";
            }
            else{
              d.getElementById("IMG_DeleteImage" + i).style.visibility = "hidden";         
            }
						break;				
				}
			}
			// 表示するデータがなければメニューを非表示にする
			else{
        d.getElementById("DIV_AddText"		 + i).innerText				 = "";
        d.getElementById("DIV_AddText"		 + i).style.visibility = "hidden";
        d.getElementById("DIV_AddFilm"     + i).innerHTML        = "";
        d.getElementById("DIV_AddFilm"		 + i).style.visibility = "hidden";
        d.getElementById("IMG_AddMenu"		 + i).style.visibility = "hidden";
        d.getElementById("IMG_DeleteImage" + i).style.visibility = "hidden";
			}
		}
    //----------------------------------------------//
    // メニューリストに撮影メニューが１件もない場合 //
    //----------------------------------------------//
		// 撮影メニュー取り消しボタン,登録,検査開始ボタンの活性/不活性
		switch(ProcMode){
			// メニュー登録時は,取り消しボタン,登録,検査開始ボタンの活性/不活性を行う
			case PROC_MODE_REGIST:
        // 活性化



				if(MenuListMaxIndexCount){
          // 削除ボタン
          d.getElementById("TABLE_Delete").style.visibility       = "visible";
          d.getElementById("MenuDelete_Enable").style.visibility  = "visible";
					d.getElementById("MenuDelete_Disable").style.visibility = "hidden";
          d.getElementById("divDelete").style.color               = "black";
          // 登録/検査開始ボタン
          d.getElementById("TABLE_RegistStart").style.visibility        = "visible";
          d.getElementById("divRegistStart_Value").style.color          = "black";
          d.getElementById("imgRegistStart_Enable").style.visibility    = "visible";
          d.getElementById("imgRegistStart_Disable").style.visibility   = "hidden";
					d.getElementById("TABLE_RegistNext").style.visibility         = "visible";
          d.getElementById("divRegistNext_Value").style.color           = "black";
          d.getElementById("imgRegistNext_Enable").style.visibility     = "visible";
          d.getElementById("imgRegistNext_Disable").style.visibility    = "hidden";
				}
        // 不活性化



				else{
          // 削除ボタン
          d.getElementById("TABLE_Delete").style.visibility       = "hidden";
          d.getElementById("MenuDelete_Enable").style.visibility  = "hidden";
          d.getElementById("MenuDelete_Disable").style.visibility = "visible";		
          d.getElementById("divDelete").style.color               = "gray";
          // 登録/検査開始ボタン
          d.getElementById("TABLE_RegistStart").style.visibility        = "hidden";
          d.getElementById("divRegistStart_Value").style.color          = "gray";
          d.getElementById("imgRegistStart_Enable").style.visibility    = "hidden";
          d.getElementById("imgRegistStart_Disable").style.visibility   = "visible";
          d.getElementById("TABLE_RegistNext").style.visibility         = "hidden";
          d.getElementById("divRegistNext_Value").style.color           = "gray";
          d.getElementById("imgRegistNext_Enable").style.visibility     = "hidden";
          d.getElementById("imgRegistNext_Disable").style.visibility    = "visible";
				}
        break;
			// メニュー追加時は,取り消しボタンボタンの活性/不活性を行う
			case PROC_MODE_ADD:
        // 活性化



				if(MenuListMaxIndexCount){
          d.getElementById("TABLE_Delete").style.visibility       = "visible";
          d.getElementById("MenuDelete_Enable").style.visibility  = "visible";
          d.getElementById("MenuDelete_Disable").style.visibility = "hidden";
          d.getElementById("divDelete").style.color               = "black";
				}
        // 不活性化



				else{
          d.getElementById("TABLE_Delete").style.visibility       = "hidden";
          d.getElementById("MenuDelete_Enable").style.visibility  = "hidden";
          d.getElementById("MenuDelete_Disable").style.visibility = "visible";		
          d.getElementById("divDelete").style.color               = "gray";
				}
				break;			
			case PROC_MODE_CHANGE:
				break;		
		}	
    //----------------------------------------//
    // 撮影メニューリストのページ数を表示する //
    //----------------------------------------//
    if(MenuListMaxIndexCount){
      // 2005/06/23 003 H.SAITO デザイン変更対応(フォントサイズ変更)
		  //d.getElementById("divMaxList").innerText = TotalString + MenuListMaxIndexCount + MenuString + (MenuListDispPageNo + 1) + "/" + (Math.ceil(MenuListMaxIndexCount / MAX_MENU)) + PageString;
		  d.getElementById("divMaxList").innerText = TotalString + " " + MenuListMaxIndexCount + MenuString + "   " + (MenuListDispPageNo + 1) + "/" + (Math.ceil(MenuListMaxIndexCount / MAX_MENU)) + PageString;
    }
    // 撮影メニュー数が０件の場合はページ数,総ページ数も０にする
    else{
      // 2005/06/23 003 H.SAITO デザイン変更対応(フォントサイズ変更)
		  //d.getElementById("divMaxList").innerText = TotalString + "0" + MenuString + "0" + "/" + "0" + PageString;    
		  d.getElementById("divMaxList").innerText = TotalString + " " + "0" + MenuString + "   " + "0" + "/" + "0" + PageString;    
    }
    //----------------------------------//
    // 撮影メニューリストの↑ボタン活性 //
    //----------------------------------//
		if(MenuListDispPageNo > 0){
			d.getElementById("MenuListUp_Enable").style.visibility		= "visible";
			d.getElementById("MenuListUp_Disable").style.visibility		= "hidden";
		}
    //------------------------------------//
    // 撮影メニューリストの↑ボタン不活性 //
    //------------------------------------//
		else{
			d.getElementById("MenuListUp_Enable").style.visibility		= "hidden";
			d.getElementById("MenuListUp_Disable").style.visibility		= "visible";
  	}
    //----------------------------------//
    // 撮影メニューリストの↓ボタン活性 //
    //----------------------------------//
		if(dispNo + MAX_MENU < MenuListMaxIndexCount){
			d.getElementById("MenuListDown_Enable").style.visibility	= "visible";
			d.getElementById("MenuListDown_Disable").style.visibility = "hidden";
		}
    //------------------------------------//
    // 撮影メニューリストの↓ボタン不活性 //
    //------------------------------------//
		else{
			d.getElementById("MenuListDown_Enable").style.visibility	= "hidden";
			d.getElementById("MenuListDown_Disable").style.visibility = "visible";
		}
	}catch(Err){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+19);
	}
}
//*****************************************************************************
// OnMenuListUPClick
//
// １．機能
//     ・メニューリストUPボタン押下時の処理を行う
// ２．戻り値
//　　  なし




// ３．備考




//　　　なし




//*****************************************************************************
function OnMenuListUPClick(){
	try{
		// 前ページがない場合は何もしない





		if(MenuListDispPageNo <= 0){
			return false;
		} 
		MenuListDispPageNo--;

		// 撮影メニューを再表示する
		Fn_DispMenu();

		if(ProcMode == PROC_MODE_CHANGE){
			IMG_AddMenuClick(FilmMenuSelectNoForChange,1);	
		}
	}
	catch(Err){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+20);
	}
}
//*****************************************************************************
// OnMenuListDownClick
//
// １．機能
//     ・メニューリストDOWNボタン押下時の処理を行う
// ２．戻り値
//　　  なし




// ３．備考




//　　　なし




//*****************************************************************************
function OnMenuListDownClick(){
	try{
		if((MenuListDispPageNo * 4 + 4) > (MenuListMaxIndexCount-1)){
			return false;
		} 
		MenuListDispPageNo++;
		Fn_DispMenu();

		if(ProcMode == PROC_MODE_CHANGE){
			IMG_AddMenuClick(FilmMenuSelectNoForChange,1);
		}
	}catch(Err){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+21);
	}
}
//*****************************************************************************
// DeleteMenu
//
// １．機能
//     ・メニューリストからメニューを削除する
// ２．戻り値
//　　  なし




// ３．備考




//　　　なし




//*****************************************************************************
function DeleteMenu(){
	var EntryMenuCodeLength = 0;
	var DeleteIndex					= 0;
	var EntryDispMenuLength = 0;

	try{
		// 登録された撮影メニューが無い場合は処理しない




		if(!aryEntryDispMenu[0]){
			return;
    }
    // 変更モードの場合には処理しない




		if(ProcMode == PROC_MODE_CHANGE){
			return false;	
		}
		
		EntryMenuCodeLength = aryEntryMenuCode.length;
		DeleteIndex					= aryEntryMenuCode.length-1;
		EntryDispMenuLength = aryEntryDispNo.length-1;
		
		aryEntryMenuCode.pop();
		aryEntryExamFlag.pop();

		for(i = EntryDispMenuLength; i >= 0; i--){
			if(aryEntryDispNo[i] == DeleteIndex){
				aryEntryDispMenu.pop();
				aryEntryDispNo.pop();
			}
		}

		MenuListDispPageNo = Math.ceil(aryEntryDispMenu.length / 4)-1;
    
		Fn_DispMenu();

	}catch(Err){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+22);
	}

}
//*****************************************************************************
// fnGetMenuMaxCount
//
// １．機能
//     ・撮影メニューの歯抜けも合わせたメニュー数を取得する




// ２．戻り値
//　　  なし




// ３．備考




//　　　なし




//*****************************************************************************
function fnGetMenuMaxCount(MenuNo){
	try{
		var Pos;
		var aryLen;

		// 撮影メニュー数を取得




		aryLen = parent.parent.aryMenuPosition[MenuNo].length;
		// 最後の撮影メニューのMenuPosition + 1 が歯抜けも合わせたメニュー数
		Pos = parent.parent.aryMenuPosition[MenuNo][aryLen - 1] + 1;

		return Pos;
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+23);
	}
}
//*****************************************************************************
//  fnPartPageSet(nPage：ページ数)		
//
//  1．機能
//       部位ページ遷移
//  2．戻り値  
//       なし




//  3．備考




//
//*****************************************************************************
function fnPartPageSet(nPage){
	try{
		// 表示ページ設定




		PartPage = PartPage + nPage;

		// 部位の選択状態のチェック
		if(PartSelectPage == PartPage){
			document.getElementById("imgPartBtn").style.visibility = "visible";			
		}
		else{
			document.getElementById("imgPartBtn").style.visibility = "hidden";			
		}

		// 部位テーブル表示
		fnPartDisplay();

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+24);
	}
}
//*****************************************************************************
//  fnMenuPageSet(nPage：ページ数
//                BuiNo：部位No)		
//  1．機能
//       撮影メニューのページ遷移
//  2．戻り値  
//       なし




//  3．備考




//
//*****************************************************************************
function fnMenuPageSet(nPage){
	try{
		// 表示ページ設定




		MenuPage = parseInt(MenuPage) + parseInt(nPage);
		if(MenuPage < 1){
			MenuPage++;
			return;	
		}else if(MenuPage>MenuMaxPage){
			MenuPage--;
			return;		
		}
		// メニュー表示
		fnFilmMenuDisplay();

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+25);
	}
}
//*****************************************************************************
// EntryStudy(command) command 1:検査開始 2:登録 3:修正完了



//
// １．機能
//     ・処理フレームに情報を送信し、検査登録/メニュー追加/メニュー変更を行う
// ２．戻り値
//　　  なし



// ３．備考



//　　　なし



//*****************************************************************************
function EntryStudy(command){
	try{
	// 処理フレームに情報設定		
	switch(ProcMode){
		//---------------//
		// 検査開始/登録 //
		//---------------//
		case PROC_MODE_REGIST:
			//--------------------------//
			// 更新するデータのチェック //
			//--------------------------//
			// 更新データがなければ何もしない(ボタンを不活性にしておく)
			if(!aryEntryMenuCode.length){
				return;
			}
      // 操作ログ出力




      switch(command){
        case COMMAND_STUDY:
          Fn_WriteLog(CTRL_STUDY);
          break;
        case COMMAND_REGIST:
          Fn_WriteLog(CTRL_REGIST);
          break;
        default:
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+26);
          return;
      }

			// 処理中表示
			Public_Message("DIALOG", ProcString);
			// タイマセット
			UpdateTimeoutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+27) +")", UPDATE_TIMEOUT);
			// データ更新	
			//2010.06.01 CQ#219対応 FF星野 ADD-ST		
			//parent.REGSTUDY_UPDATE_PROC.Public_Update(command, parent.PatientId, parent.PatientName, parent.PatientKanjiName, parent.PatientSex, parent.PatientBirthDate, aryEntryMenuCode, aryEntryExamFlag);
			parent.REGSTUDY_UPDATE_PROC.Public_Update(command, parent.PatientId, parent.PatientName, parent.PatientKanjiName, parent.PatientSex, parent.PatientBirthDate, aryEntryMenuCode, aryEntryExamFlag
			,parent.PatientComment,parent.PatientsSize,parent.PatientsWeight,parent.PatientSpeciesDescription,parent.PatientBreedDescription,parent.ResponsiblePerson,parent.ResponsiblePersonIdoGraphic,parent.ResponsibleOrganization,parent.PatientsSexNeutred);
			//2010.06.01 CQ#219対応 FF星野 ADD-ED
			break;
		//--------------//
		// メニュー追加 //
		//--------------//
		case PROC_MODE_ADD:
      //情報未取得の場合は不活性
      if(parent.EndGetDataFlag == FLAG_STUDY_NOGETDATA)return;

			//--------------------------//
			// 更新するデータのチェック //
			//--------------------------//
			// 更新データがなければサブミットしない



			if(!aryEntryMenuCode.length){
				runNext();
				return;
			}
			// 操作ログ出力



      Fn_WriteLog(CTRL_UPDATE);		

//      // 修正完了状況フラグを修正完了とする(未撮)
//      parent.ModifyStatusFlag = 2;
////      parent.ModifyStatusFlag = 1;
//			// 処理中表示
//			Public_Message("DIALOG", ProcString);
//			// タイマセット
//			UpdateTimeoutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+28) +")", UPDATE_TIMEOUT);
//			// データ更新
//			parent.ADDMENU_UPDATE_PROC.Public_Update(parent.StudySequence, aryEntryMenuCode, aryEntryExamFlag, parent.StudyStatus, parent.PatientId);

      //2014.06.25 TYS会田 JIRA#2483対応 ADD-ST
      // 追加元の撮影メニュー数と、追加する撮影メニュー数の合計を取得
      var totalMenuCount = parent.DataCount + MenuListMaxIndexCount;
      if(MAX_MENU_COUNT < totalMenuCount)
      {
        // 追加後の撮影メニュー数が上限を超えている場合、メッセージを表示し、メニュー追加処理をせずに戻る。
        Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MESSAGE_ID_MENUCOUNT_OVER ,""), (top.DispFrame.Public_GetLangMsgTitle2(MESSAGE_ID_MENUCOUNT_OVER ,"")).replace("%s", MAX_MENU_COUNT),top.DispFrame.Public_GetLangMsgString(MESSAGE_ID_MENUCOUNT_OVER ,"Cannt Get Message."));
        return;
      }
      //2014.06.25 TYS会田 JIRA#2483対応 ADD-ED

      //検査ステータスが確定の場合は確認ダイアログを表示する
      if(parent.StudyStatus == STATE_VERIFIED){
        document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_CHANGE_VERIFIED,"");
        document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_CHANGE_VERIFIED,"");
        document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_CHANGE_VERIFIED,"Cannt Get Message.");
        Public_Confirm();
      }
      else{
        EntryStudyExec();
      }
			break;
		//--------------//
		// メニュー変更 //
		//--------------//
		case PROC_MODE_CHANGE:
      //情報未取得の場合は不活性
      if(parent.EndGetDataFlag == FLAG_STUDY_NOGETDATA)return;

			//--------------------------//
			// 変更されたデータのチェック //
			//--------------------------//
      // 一度も変更操作を行なっていなければサーバ処理を行なわない。



      // (同じ撮影メニュー同士の変更でも、回転方向がデフォルトに戻るためサーバ処理を行なうことに注意する)
			if(!aryChangeMenuCode.length){
				runNext();
				return;
			}
			// 操作ログ出力



      Fn_WriteLog(CTRL_UPDATE);

//      // 修正完了状況フラグを修正完了とする
//      parent.ModifyStatusFlag = 1;
//			// 処理中表示
//			Public_Message("DIALOG", ProcString);
//			// タイマセット
//			UpdateTimeoutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+29) +")", UPDATE_TIMEOUT);
//			// データ更新
//			parent.CHANGEMENU_UPDATE_PROC.Public_Update(parent.StudySequence, aryChangeImageSeq, aryChangeMenuCode, parent.StudyStatus, parent.PatientId);

      //検査ステータスが確定の場合は確認ダイアログを表示する
      if(parent.StudyStatus == STATE_VERIFIED){
// 2005/10/05 H.SAITO PVCS:1545 確定済み検査に対するメニュー変更時のメッセージ -ST-
//        document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_CHANGE_VERIFIED,"");
//        document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_CHANGE_VERIFIED,"");
//        document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_CHANGE_VERIFIED,"Cannt Get Message.");
        document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_CHANGE_VERIFIED_C,"");
        document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_CHANGE_VERIFIED_C,"");
        document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_CHANGE_VERIFIED_C,"Cannt Get Message.");
// 2005/10/05 H.SAITO PVCS:1545 確定済み検査に対するメニュー変更時のメッセージ -ED-

        Public_Confirm();
      }
      else{
        EntryStudyExec();
      }
			break;	
		}
	}catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+28);
	}
}
//*****************************************************************************
// EntryStudyExec()
//
// １．機能
//     ・メニュー追加/メニュー変更を行う
// ２．戻り値
//　　  なし



// ３．備考



//　　　なし



//*****************************************************************************
function EntryStudyExec(){
	try{
	// 更新処理



	switch(ProcMode){
		//--------------//
		// メニュー追加 //
		//--------------//
		case PROC_MODE_ADD:
      // 修正完了状況フラグを修正完了とする(未撮)
      parent.ModifyStatusFlag = 2;
			// 処理中表示
			Public_Message("DIALOG", ProcString);
			// タイマセット
			UpdateTimeoutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+29) +")", UPDATE_TIMEOUT);
			// データ更新
//2005/04/23 008 H.SAITO
//			parent.ADDMENU_UPDATE_PROC.Public_Update(parent.StudySequence, aryEntryMenuCode, aryEntryExamFlag, parent.StudyStatus, parent.PatientId);
      if(parent.isModifyCtrlCE){
        parent.FRAME_PROC.Public_Update(parent.StudySequence, aryEntryMenuCode, aryEntryExamFlag, parent.StudyStatus, parent.PatientId);
      }
      else{
        parent.ADDMENU_UPDATE_PROC.Public_Update(parent.StudySequence, aryEntryMenuCode, aryEntryExamFlag, parent.StudyStatus, parent.PatientId);
      }
			break;
		//--------------//
		// メニュー変更 //
		//--------------//
		case PROC_MODE_CHANGE:
      // 修正完了状況フラグを修正完了とする
      parent.ModifyStatusFlag = 1;
			// 処理中表示
			Public_Message("DIALOG", ProcString);
			// タイマセット
			UpdateTimeoutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+30) +")", UPDATE_TIMEOUT);
			// データ更新
//2005/04/23 008 H.SAITO
//			parent.CHANGEMENU_UPDATE_PROC.Public_Update(parent.StudySequence, aryChangeImageSeq, aryChangeMenuCode, parent.StudyStatus, parent.PatientId);
      if(parent.isModifyCtrlCE){
        parent.FRAME_PROC.Public_Update(parent.StudySequence, aryChangeImageSeq, aryChangeMenuCode, parent.StudyStatus, parent.PatientId);
      }
      else{
        parent.CHANGEMENU_UPDATE_PROC.Public_Update(parent.StudySequence, aryChangeImageSeq, aryChangeMenuCode, parent.StudyStatus, parent.PatientId);
      }
			break;
		}

    if((parent.OpenMode == OPEN_MODE_DIALOG) && 
      ('function' === typeof window.external.ValidateModifyStudyFlag)){       //UPDSTUDY_12B
        window.external.ValidateModifyStudyFlag(); //UPDSTUDY_12B
    }                                              //UPDSTUDY_12B

	}catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+31);
	}
}
//*****************************************************************************
// runBack
//
// １．機能
//     ・戻るボタンクリック時処理



// ２．戻り値
//　　  なし



// ３．備考



//　　　なし



//*****************************************************************************
function runBack(){
	try{
    // 戻る場合は常に排他の制御を行わない
    // 親への完了通知
    var notifyInfo = { "commandMode" : COMMAND_MODE_CANCEL, "commandParam" : "" };
    NotifyFrameFinished(notifyInfo);
	}catch(e){
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+32);
	}
}
//*****************************************************************************
// runNext
//
// １．機能
//     ・修正完了ボタンクリック時処理




// ２．戻り値
//　　  なし




// ３．備考




//　　　なし




//*****************************************************************************
function runNext(){
	try{
		// タイマ予約解除
		clearTimeout(UpdateTimeoutId);
    // 排他処理



    Fn_Exclusive('UPDATE', "");
	}catch(e){
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+33);
	}
}
//*****************************************************************************
// runStudy
//
// １．機能
//     ・検査登録後の処理(検査開始ボタン押下)
// ２．戻り値
//　　  なし



// ３．備考



//　　　なし



//*****************************************************************************
function runStudy(studySequence){
	try{
		// タイマ予約解除
		clearTimeout(UpdateTimeoutId);

	  // 排他管理の変更(検査開始時はチェックする）



    ExclusiveModeRuEnd      = EXCLUSIVE_CHECK;        // ＲＵの排他のチェック
    ExclusiveModeStudyEnd   = EXCLUSIVE_CHECK_STUDY;  // 検査の排他のチェック

    // 2005/07/19 031 H.SAITO #190,#205 Cookieチェック位置変更。Public_EndExclusiveにてチェックする      
    //// 2005/05/14 014 H.SAITO 検査排他の変更(Cookie)
    //// 検査画面の起動をチェックする(1:起動中,0:未起動)
    //// 2005/06/21 003 H.SAITO 検査排他の変更(Cookie) Cookieの保存箇所を共有化する
    ////readCookieBuff = sReadCookie(COOKIE_NAME_STUDY);
    //readCookieBuff = top.GetCookie(COOKIE_NAME_STUDY);
    //// 起動中は２重起動できない


    //if(readCookieBuff == 1){
    //  //終了モードとパラメータの退避してワーニングメッセージ
    //  CommandMode  = "STUDY";
    //  CommandParam = studySequence;
    //  document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_EXCLUSIVE_RU,"");
    //  document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_EXCLUSIVE_RU,"");
    //  document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_EXCLUSIVE_RU,"Cannt Get Message.");
    //  Public_Confirm();
    //  return;
    //}
    //// 2005/06/29 014 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
    //// 検査の排他をチェックする
    //readCookieBuff = top.CheckCookie(COOKIE_NAME_STUDY2, studySequence);
    //// 検査がすでに排他中ならば検査できない


    //if(readCookieBuff == 1){
    ////  //終了モードとパラメータの退避してワーニングメッセージ
    //  CommandMode  = "STUDY";
    //  CommandParam = studySequence;
    //  document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_EXCLUSIVE_STUDY,"");
    //  document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_EXCLUSIVE_STUDY,"");
    //  document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_EXCLUSIVE_STUDY,"Cannt Get Message.");
    //  Public_Confirm();
    //  return;
    //}
    // 排他処理


    Fn_Exclusive('STUDY', studySequence);

	}catch(e){
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+34);
	}
}
//*****************************************************************************
// runEntry
//
// １．機能
//     ・検査登録後の処理(登録ボタン押下)
// ２．戻り値
//　　  なし



// ３．備考



//　　　なし



//*****************************************************************************
function runEntry(){
	try{
		// タイマ予約解除
		clearTimeout(UpdateTimeoutId);
        // 処理中表示解除
		Public_CloseMessage();
        // 呼び出し元に遷移
        // 親への完了通知
        var notifyInfo = { "commandMode" : COMMAND_MODE_ENTRY, "commandParam" : "" };
        NotifyFrameFinished(notifyInfo);
	}catch(e){
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+35);
	}
}
//*****************************************************************************
// Fn_OnErrorButton
//
// １．機能
//     ・エラーダイアログのOKボタンクリック時処理




// ２．戻り値
//　　  なし




// ３．備考




//　　　なし




//*****************************************************************************
function Fn_OnErrorButton(){
	try{
		Public_CloseMessage();
		Public_CloseError();     
	}catch(e){
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+36);
	}
}
//*****************************************************************************
// MenuImageChangeDown
//
// １．機能
//     ・撮影メニューのIMGのmousedown時の処理



// ２．戻り値
//　　  なし



// ３．備考



//　　　なし



//*****************************************************************************
function MenuImageChangeDown(Pos){
	var ImgMenu;
	var DivMenu;
	try{
	  ImgMenu = "imgMenu" + Pos;
	  DivMenu = "divMenu" + Pos;
	
		// 撮影メニューが非表示の場合は何もしない




		if(!d.getElementById(DivMenu).innerText){
			return false;
		}
		// メニュー変更時は、検査メニューは何もしない




		if(ProcMode == PROC_MODE_CHANGE){
			if(d.getElementById(DivMenu).style.color == "gray"){
				return false;
			}
		}
		// ボタン押下イメージを表示する
		d.getElementById(ImgMenu).src = IMG_MENU_BUTTON_DOWN;
	}catch(e){
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+37);
	}
}
//*****************************************************************************
// MenuImageChangeUp
//
// １．機能
//     ・撮影メニューのIMGのmouseup時の処理




// ２．戻り値
//　　  なし




// ３．備考




//　　　なし




//*****************************************************************************
function MenuImageChangeUp(Pos){
	var ImgMenu;
	var DivMenu;
	
	try{
		ImgMenu = "imgMenu" + Pos;
		DivMenu = "divMenu" + Pos;
		// 撮影メニューが非表示の場合は何もしない




		if(!d.getElementById(DivMenu).innerText){
			return false;
		}	
		// 通常のボタンイメージをを表示する
		d.getElementById(ImgMenu).src = IMG_MENU_BUTTON_UP;

	}catch(e){
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+38);
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




//      menuTableNo:0～





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
    imageHeight     = parent.ThumbnailHeight[menuTableNo] - 0;
    imageWidth      = parent.ThumbnailWidth[menuTableNo] - 0;
    imageFileName   = parent.ThumbnailFileName[menuTableNo];
    imageFilePath   = parent.ThumbnailFilePath[menuTableNo];  //** 2009/07/16 k.harada add

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
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+39);
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
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+40);
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
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+41);
	}
}
//*****************************************************************************
// Fn_Exclusive
//
// １．機能
//     排他処理を行う
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

    //---------------------------------------------------------------//
    // ＲＵ,検査の開放を行わない場合はサーバアクセスしないようにする //
    //---------------------------------------------------------------//
    if(ExclusiveModeRuEnd == EXCLUSIVE_NOTHING && ExclusiveModeStudyEnd == EXCLUSIVE_NOTHING){
      Public_EndExclusive(0 , 0);
    }
    else{
      //処理中表示
      Public_Message("DIALOG", ProcString);         

      //タイマ予約

      //2010/11/16 30501エラー改善対応 MOD ST
      UpdateTimeoutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS_EXCLUSIVE+",'"+FILE_NAME+"',"+ (SPOT_CODE+42) +")", UPDATE_TIMEOUT);
      //2010/11/16 30501エラー改善対応 MOD ED

      //------------------------------------------------//
      // モードによって使用する検査シーケンスを変更する //
      //------------------------------------------------//
      switch(PROC_MODE){
        // 検査登録時はサーバから帰ってきた検査シーケンスを使用する
        case PROC_MODE_REGISTSTUDY:
          //排他処理


          parent.EXCLUSIVE_PROC.Public_Exclusive(PROC_MODE, commandParam, ExclusiveModeRuEnd, ExclusiveModeStudyEnd);
          break; 
        case PROC_MODE_ADDMENU:
        case PROC_MODE_CHANGEMENU:
          //排他処理


          parent.EXCLUSIVE_PROC.Public_Exclusive(PROC_MODE, parent.StudySequence, "", ExclusiveModeStudyEnd);
          break;      
      }
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+43);
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
    clearTimeout(UpdateTimeoutId);

    //ＲＵの排他エラーのチェックを行う
    switch(returnCodeRu){
      case 0:
        break;
      // 2005/11/30 PVCS#1560 H.SAITO -ST-
      //// 2005/07/19 013 H.SAITO #190 RU排他チェック時の自己排他エラーはさらにCookieチェックを実施する
      //case 4:
      //  // 2005/07/21 011 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
      //  //readCookieBuff = top.GetCookie(COOKIE_NAME_STUDY);
      //  //// 起動中は２重起動できない
      //  //if(readCookieBuff == 1){
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
      case 4: // 自己排他エラー
      case 5: // 他排他エラー
      // 2005/11/30 PVCS#1560 H.SAITO -ED-
        //----------------------------------------------------------------------//
        //--モードによって開放とチェックが混在していて                          //
        //--なおかつリタンコードが同一のため                                    //
        //--開放でのエラーかチェックでのエラーかによって処理を分ける必要がある。//
        //----------------------------------------------------------------------//
        switch(ExclusiveModeRuEnd){
          // チェックエラーはダイアログを表示する
          case EXCLUSIVE_CHECK: 
//            document.getElementById("TD_ConfirmText").innerHTML = ExclusiveRuError;
            document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_EXCLUSIVE_RU,"");
            document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_EXCLUSIVE_RU,"");
            document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_EXCLUSIVE_RU,"Cannt Get Message.");
            Public_Confirm();
            break;
          default: 
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+44);
//            Public_Error(FATAL_ERROR, "Exclusive Control was failed :" +  returnCodeRu);
            break;
        }
        return;
      default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+45);
        return;     
    }

    //検査の排他エラーのチェックを行う
    switch(returnCodeStudy){
      case 0:
        //2005/04/24 012 H.SAITO
        //排他取得状態(0:未取得,1:検査排他取得,2:検査,RU排他取得)
        if(ExclusiveModeStudyEnd == EXCLUSIVE_DELL){
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
        break;
      case 3:
      // 2005/05/29 002 H.SAITO 排他チェックの変更(排他チェックにて検査排他情報登録済み(自機能)の場合はそのまま続行)
      //case 4:
        //----------------------------------------------------------------------//
        //--モードによって開放とチェックが混在していて                          //
        //--なおかつリタンコードが同一のため                                    //
        //--開放でのエラーかチェックでのエラーかによって処理を分ける必要がある。//
        //----------------------------------------------------------------------//
        switch(ExclusiveModeStudyEnd){
          // チェックエラーはダイアログを表示する
          case EXCLUSIVE_CHECK: 
          case EXCLUSIVE_CHECK_STUDY: 
//            document.getElementById("TD_ConfirmText").innerHTML = ExclusiveStudyError;
            document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_EXCLUSIVE_STUDY,"");
            document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_EXCLUSIVE_STUDY,"");
            document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_EXCLUSIVE_STUDY,"Cannt Get Message.");
            Public_Confirm();
            break;
          default: 
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+46);
//            Public_Error(FATAL_ERROR, "Exclusive Control was failed :" +  returnCodeStudy);
            break;
        }
        return;
      // 2005/05/29 012 H.SAITO 排他チェックの変更(排他チェックにて検査排他情報登録済み(自機能)の場合はそのまま続行)
      case 4:
        switch(ExclusiveModeStudyEnd){
          // 排他エラー(自機能)の場合は処理続行
          case EXCLUSIVE_CHECK: 
          case EXCLUSIVE_CHECK_STUDY: 
            // 2005/07/21 012 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
            //// 2005/06/29 011 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
            //// 検査の排他をチェックする
            //readCookieBuff = top.CheckCookie(COOKIE_NAME_STUDY2, parent.StudySequence);
            //// 検査がすでに排他中ならば検査できない
            //if(readCookieBuff == 1){
            //  document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_EXCLUSIVE_STUDY,"");
            //  document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_EXCLUSIVE_STUDY,"");
            //  document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_EXCLUSIVE_STUDY,"Cannt Get Message.");
            //  Public_Confirm();
            //  return;
            //}
            break;
          default: 
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+53);
            break;
        }
		break;
      default:    
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+47);
//        Public_Error(FATAL_ERROR, "Exclusive Control was failed :" +  returnCodeStudy);
        return;   
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
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+48);
  }
}
//*****************************************************************************
// Fn_OnButton
//
// １．機能 
//      ＯＫ,キャンセルボタンの処理


// ２．戻り値
//　　  無し


// ３．備考


//*****************************************************************************
function Fn_OnButton(tableNo){
  try{

    switch(tableNo){
      //============
      //取り消しボタン
      //============
		  case 0:// ONCLICK
        DeleteMenu();
		    document.getElementById("MenuDelete_Enable").src = IMG_DELETE_UP;
			  break;
		  case 1:  // ONMOUSEDOWN
		    document.getElementById("MenuDelete_Enable").src = IMG_DELETE_DOWN;
			  break;
		  case 2:  // ONMOUSEUP
		    document.getElementById("MenuDelete_Enable").src = IMG_DELETE_UP;
			  break;
      //============
      // ＯＫボタン
      //============
      // ＯＫボタン
      case 25:
        //検査登録
        if(ProcMode == PROC_MODE_REGIST){
          // 確認ダイアログ解除
          Public_CloseConfirm();
          // 再試行を行う
          // 2005/07/19 024 H.SAITO #190 自己排他チェックを実施する箇所を変更。Public_EndExclusiveにて実施する          
          //// 2005/05/14 011 H.SAITO 検査排他の変更(Cookie)
          //// 検査画面の起動をチェックする(1:起動中,0:未起動)
          //// 2005/06/21 003 H.SAITO 検査排他の変更(Cookie) 保存箇所の共有化 
          ////readCookieBuff = sReadCookie(COOKIE_NAME_STUDY);
          //readCookieBuff = top.GetCookie(COOKIE_NAME_STUDY);
          //// 起動中は２重起動できない


          //if(readCookieBuff == 1){
          //  document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_EXCLUSIVE_RU,"");
          //  document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_EXCLUSIVE_RU,"");
          //  document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_EXCLUSIVE_RU,"Cannt Get Message.");
          //  Public_Confirm();
          //  return;
          //}
          //// 2005/06/29 011 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
          //// 検査の排他をチェックする
          //readCookieBuff = top.CheckCookie(COOKIE_NAME_STUDY2, parent.StudySequence);
          //// 検査がすでに排他中ならば検査できない


          //if(readCookieBuff == 1){
          //  document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_EXCLUSIVE_STUDY,"");
          //  document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_EXCLUSIVE_STUDY,"");
          //  document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_EXCLUSIVE_STUDY,"Cannt Get Message.");
          //  Public_Confirm();
          //  return;
          //}
          Fn_Exclusive(CommandMode, CommandParam);
        }
        //追加/変更
        else{
          // 更新処理実施
          EntryStudyExec();
          // 確認ダイアログ解除
          Public_CloseConfirm();
        }
        break;
		  case 26:  // ONMOUSEDOWN
		    document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_DOWN;
			  break;
		  case 27:  // ONMOUSEOUT
		    document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_UP;
		    break;
      //============
      // キャンセルボタン
      //============
      case 35:
//        // 確認ダイアログ解除
//        Public_CloseConfirm();
//        // 呼び出し元画面へ遷移する
//        runEntry();   
        //検査登録
        if(ProcMode == PROC_MODE_REGIST){
          // 確認ダイアログ解除
          Public_CloseConfirm();
          // 呼び出し元画面へ遷移する
          runEntry();   
        }
        //追加/変更
        else{
          // 確認ダイアログ解除
          Public_CloseConfirm();
        }
        break;
		  case 36:  // ONMOUSEDOWN
		    document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_DOWN;
			  break;
		  case 37:  // ONMOUSEOUT
		    document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_UP;
		    break;
      //============
      //↑ボタン(グループメニュー)
      //============
		  case 40:// ONCLICK
        fnPartPageSet(-1);
		    document.getElementById("imgPartUp_Enable").src = IMG_PART_PREV_UP;
			  break;
		  case 41:  // ONMOUSEDOWN
		    document.getElementById("imgPartUp_Enable").src = IMG_PART_PREV_DOWN;
			  break;
		  case 42:  // ONMOUSEUP
		    document.getElementById("imgPartUp_Enable").src = IMG_PART_PREV_UP;
			  break;
      //============
      //↓ボタン(グループメニュー)
      //============
		  case 45:// ONCLICK
        fnPartPageSet(1);
		    document.getElementById("imgPartDown_Enable").src = IMG_PART_NEXT_UP;
			  break;
		  case 46:  // ONMOUSEDOWN
		    document.getElementById("imgPartDown_Enable").src = IMG_PART_NEXT_DOWN;
			  break;
		  case 47:  // ONMOUSEUP
		    document.getElementById("imgPartDown_Enable").src = IMG_PART_NEXT_UP;
			  break;
      //============
      //↑ボタン(撮影メニュー)
      //============
		  case 50:// ONCLICK
        fnMenuPageSet(-1);
		    document.getElementById("imgMenuUp_Enable").src = IMG_MENU_PREV_UP;
			  break;
		  case 51:  // ONMOUSEDOWN
		    document.getElementById("imgMenuUp_Enable").src = IMG_MENU_PREV_DOWN;
			  break;
		  case 52:  // ONMOUSEUP
		    document.getElementById("imgMenuUp_Enable").src = IMG_MENU_PREV_UP;
			  break;
      //============
      //↓ボタン(撮影メニュー)
      //============
		  case 55:// ONCLICK
        fnMenuPageSet(1);
		    document.getElementById("imgMenuDown_Enable").src = IMG_MENU_NEXT_UP;
			  break;
		  case 56:  // ONMOUSEDOWN
		    document.getElementById("imgMenuDown_Enable").src = IMG_MENU_NEXT_DOWN;
			  break;
		  case 57:  // ONMOUSEUP
		    document.getElementById("imgMenuDown_Enable").src = IMG_MENU_NEXT_UP;
			  break;
      //============
      //↑ボタン(メニューリスト)
      //============
		  case 60:// ONCLICK
        OnMenuListUPClick();
		    document.getElementById("MenuListUp_Enable").src = IMG_MENULIST_PREV_UP;
			  break;
		  case 61:  // ONMOUSEDOWN
		    document.getElementById("MenuListUp_Enable").src = IMG_MENULIST_PREV_DOWN;
			  break;
		  case 62:  // ONMOUSEUP
		    document.getElementById("MenuListUp_Enable").src = IMG_MENULIST_PREV_UP;
			  break;
      //============
      //↓ボタン(メニューリスト)
      //============
		  case 65:// ONCLICK
        OnMenuListDownClick();
		    document.getElementById("MenuListDown_Enable").src = IMG_MENULIST_NEXT_UP;
			  break;
		  case 66:  // ONMOUSEDOWN
		    document.getElementById("MenuListDown_Enable").src = IMG_MENULIST_NEXT_DOWN;
			  break;
		  case 67:  // ONMOUSEUP
		    document.getElementById("MenuListDown_Enable").src = IMG_MENULIST_NEXT_UP;
			  break;
      //============
      //戻るボタン
      //============
		  case 75:// ONCLICK
        runBack();
		    document.getElementById("imgRegistBack").src = IMG_REGIST_BACK_UP;
			  break;
		  case 76:  // ONMOUSEDOWN
		    document.getElementById("imgRegistBack").src = IMG_REGIST_BACK_DOWN;
			  break;
		  case 77:  // ONMOUSEUP
		    document.getElementById("imgRegistBack").src = IMG_REGIST_BACK_UP;
			  break;
      //============
      //検査開始ボタン
      //============
		  case 80:// ONCLICK
        EntryStudy(1); 
		    document.getElementById("imgRegistStart_Enable").src = IMG_REGIST_START_UP;
			  break;
		  case 81:  // ONMOUSEDOWN
		    document.getElementById("imgRegistStart_Enable").src = IMG_REGIST_START_DOWN;
			  break;
		  case 82:  // ONMOUSEUP
		    document.getElementById("imgRegistStart_Enable").src = IMG_REGIST_START_UP;
			  break;
      //============
      //登録ボタン
      //============
		  case 85:// ONCLICK
        EntryStudy(2); 
		    document.getElementById("imgRegistNext_Enable").src = IMG_REGIST_NEXT_UP;
			  break;
		  case 86:  // ONMOUSEDOWN
		    document.getElementById("imgRegistNext_Enable").src = IMG_REGIST_NEXT_DOWN;
			  break;
		  case 87:  // ONMOUSEUP
		    document.getElementById("imgRegistNext_Enable").src = IMG_REGIST_NEXT_UP;
			  break;
      //============
      //戻るボタン
      //============
		  case 90:// ONCLICK
        runBack();
		    document.getElementById("imgModifyBack").src = IMG_MODIFY_BACK_UP;
			  break;
		  case 91:  // ONMOUSEDOWN
		    document.getElementById("imgModifyBack").src = IMG_MODIFY_BACK_DOWN;
			  break;
		  case 92:  // ONMOUSEUP
		    document.getElementById("imgModifyBack").src = IMG_MODIFY_BACK_UP;
			  break;
      //============
      //修正完了ボタン
      //============
		  case 95:// ONCLICK
        EntryStudy(3); 
		    document.getElementById("imgModifyNext_Enable").src = IMG_MODIFY_NEXT_UP;
			  break;
		  case 96:  // ONMOUSEDOWN
		    document.getElementById("imgModifyNext_Enable").src = IMG_MODIFY_NEXT_DOWN;
			  break;
		  case 97:  // ONMOUSEUP
		    document.getElementById("imgModifyNext_Enable").src = IMG_MODIFY_NEXT_UP;
			  break;

      // エラー  
      default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+49);
        return;
    }
  }
  catch(e){
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+50);
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
	      document.getElementById("TABLE_ModifyNext").style.visibility      = "hidden";
	      document.getElementById("divModifyNext_Value").style.color        = "gray";
		    document.getElementById("imgModifyNext_Enable").style.visibility  = "hidden";
		    document.getElementById("imgModifyNext_Disable").style.visibility = "visible";
	      break;
	    case 1:   //活性
	      document.getElementById("TABLE_ModifyNext").style.visibility      = "visible";
	      document.getElementById("divModifyNext_Value").style.color        = "black";
		    document.getElementById("imgModifyNext_Enable").style.visibility  = "visible";
		    document.getElementById("imgModifyNext_Disable").style.visibility = "hidden";
	      break;
	    default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+51);
	      break;
	  }
	}
	catch(e){
     Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+52);
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
		clearTimeout(UpdateTimeoutId);
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_NOLOGIN,FILE_NAME,SPOT_CODE+54)
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_LOGOFF,FILE_NAME,SPOT_CODE+55)
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
				top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_DIFERENT,FILE_NAME,SPOT_CODE+56)
				return;
			//操作権限がない



			case CHECK_AUTHORITY_ERROR_AUTHORITY:
				Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MESSAGE_ID_FORBIDDEN,""), top.DispFrame.Public_GetLangMsgTitle2(MESSAGE_ID_FORBIDDEN,""),top.DispFrame.Public_GetLangMsgString(MESSAGE_ID_FORBIDDEN,"Cannt Get Message.")); 
				return;
			default:
				Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+57);
				return;
		}
	}catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+58);
	}	
}
//20050609(PVCS#350)EN

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
        if(initMode == FC_MOVING_MODE_CLEAR){//空表示
            Init();
        }else{
            Public_Init();
        }
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+59);
    }
}
