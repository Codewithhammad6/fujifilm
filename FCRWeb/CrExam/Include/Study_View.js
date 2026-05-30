/****************************************************************************

  @file Study_View.js

  @brief Study_Viewのクライアントスクリプト

  @author YSK齋藤
  
        SpotCode MAX 81

  Copyright(C) 2004-2008 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/11/09  YSK齋藤     V1.0　     新規作成
  @date  05/12/17  YSK齋藤     V1.1　     検査終了操作時にRU読み取り可能状態が解除されない場合がある(PVCS#1713)
  @date  05/12/17  YSK齋藤     V1.1　     検査終了時の削除処理不正(PVCS#1712---PVCS#1713と同時修正のため#1713と記述の箇所あり)
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
  @date  06/11/08  YSK齋藤     V1.4　     PVCS#1962,#1666対応

  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応
  @date  06/11/21  YSK齋藤     V1.4　     PVCS#1770対応(インジケータからの起動／終了通知を受けても何もしないようにする)
  @data  07/03/08  FF 星野     V2.0       PVCS#2109対応(画像再送時、選択されているメニューが正しくない)
  @date  08/03/12  HSK山本     V3.2       RU End-Readエラー対応
  @date  08/04/24  HSK由比     V4.0       ガイダンス表示対応
  @date  08/08/27  HSK由比     V4.0       先行ST不具合指摘、撮影ガイダンスパス変更対応
  @date  09/06/12  FF 西川     V6.0       撮影画面最小化
  @date  09/07/13  FF 蔵敷     V6.0       MONI_V60_0713
  @date  09/08/21  FF 西川     V6.0       他検査終了待機対応
  @date  09/08/22  FF 西川     V6.0       ビューアー起動は患者起点画面コンテナから実施 NOTVIEW_V60_0822
  @date  09/09/10  FF 蔵敷     V6.0       MONI_V60_0910 ↑の不具合対応
  @date  09/09/14  FF 西川     V6.0       RESEND_V60_0914 再送になるエラーが簡易画像読取画面に通知されない不具合修正
  @date  09/09/15  FF 蔵敷     V6.0       MONI_V60_0915 0910修正不十分の修正
  @date  09/09/20  FF 西川     V6.0       PVCS#3427
  @date  09/09/20  FF 西川     V6.0       PVCS#3451
  @date  09/10/15  FF 星野     V6.0       CR検査画面で未撮影メニューが残った状態でビューアー起動出来ない件対応
  @date  09/12/01  FFS黒田     V1.1(B)    患者情報項目追加
  @date  10/01/04  FF 小林     V1.1(B)    文字列はみ出し対応
  @date	 10/10/19  NDD照屋     V2.0(B)    CQ#453 30501エラー改善対応
  @date  10/11/22  FFS生田     V2.0(B)    30501エラー改善対応
  @date  10/12/17  FF千葉      V2.1(B)    MWM,MPPS対応
  @date  12/04/18  FF千葉      V2.3B      DICOM受信性能改善
  @date  14/03/06  TYS沼       V3.0(B)    DR直結対応
  @date  14/04/14  TYS会田     V3.0(B)    DR直結-検査情報修正

*****************************************************************************/
//【定数】
var PROC_MODE                           = "STUDY_VIEW";
// 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ST-
var PROC_MODE_INIT                      = "STUDY_VIEW_INIT"; // StudyDataGetProcにて開始処理を実施する。
// 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ED-
var MAXMENU                             = 4;             // ページ内の最大メニュー数
var WATCHIMAGE_TIMEOUT                  = 15000;	         // 画像入力監視のタイムアウト値
var START_TIMEOUT                       = 30000;         // 検査開始/排他設定タイムアウト値
var NOTIFY_TIMEOUT                      = 10000;          // 選択通知タイムアウト値
var CHANGESTATE_TIMEOUT                 = 10000;         // 確認/確定/保留,排他開放タイムアウト値
// オープンモード



var OPEN_MODE_CE                        = 0;             // CEで開かれた場合



var OPEN_MODE_WINDOW                    = 1;             // ブラウザで開かれた場合



var OPEN_MODE_DIALOG                    = 2;             // ダイアログで開かれた場合



var TURNIMAGE_TIMEOUT                   = 10000;         // 回転・反転・元に戻すタイムアウト値
//処理コマンド

top.forceFrameProcMode                  = false;         // true:IFRAME通信 / false:Ajax通信

var COMMAND_MODE_MODIFY                 = "MODIFY";			 // 修正
var COMMAND_MODE_COMPLETED              = "COMPLETED";	 // 確認



var COMMAND_MODE_CONFIRM                = "CONFIRM";     // 確定



var COMMAND_MODE_SUSPEND                = "SUSPEND";		 // 保留
var COMMAND_MODE_VIEW                   = "VIEW";		     // 参照
var COMMAND_MODE_STUDY_DELETE           = "DELETE";      // 検査の削除
var COMMAND_MODE_UNSHOTMENU_DELETE      = "DELETEMENU";  // 未撮メニューの削除
//2005/07/13 002 H.SAITO 再送処理対応
// 2014/03/14 TYS沼 DR直結対応 ADD START ------------------------------------------------
var COMMAND_MODE_DRCHANGE                = "DRCHANGE";   // DR切替
// 2014/03/14 TYS沼 DR直結対応 ADD END --------------------------------------------------



var COMMAND_MODE_STUDY_CANCEL           = "CANCEL";			 // 検査のキャンセル(エラーが発生した画像がある検査をキャンセルした場合）




//入力方向



var TOP                                 = "TOP";         // 上



var BOTTOM                              = "BOTTOM";      // 下



var LEFT                                = "LEFT";        // 左
var RIGHT                               = "RIGHT";       // 右
//回転コマンド



var TURN_DEFAULT                        = "6";           // 元に戻す



var TURN_LEFT90                         = "1";           // 左90度回転(270度回転)
var TURN_RIGHT90                        = "3";           // 右90度回転
var TURN_180                            = "2";           // 180度回転 
var TURN_REVERSE                        = "5";           // 左右反転
//操作ログコマンド



var CTRL_TURN_DEFAULT                   = "TurnDefault"; // 元に戻す



var CTRL_TURN_LEFT90                    = "TurnLeft90";  // 左90度回転
var CTRL_TURN_RIGHT90                   = "TurnRight90"; // 右90度回転
var CTRL_TURN_180                       = "Turn180";     // 180度回転
var CTRL_TURN_REVERSE                   = "TurnReverse"; // 左右反転
var CTRL_MODIFY                         = "Modify";      // 修正
var CTRL_SUSPEND                        = "Suspend";     // 保留
var CTRL_VIEW                           = "View";        // 参照（ビューアーモード）
// 080424 HSK由比 ガイダンス表示対応 ADD-ST
var CTRL_SWITCH_GUIDANCE                = "SwitchGuidance"; // ガイダンス切り替え
// 080418 HSK由比 ガイダンス表示対応 ADD-ED
// 2014/03/14 TYS沼 DR直結対応 ADD START ------------------------------------------------
var CTRL_DRCHANGE                       = "DRChange";    // DR切替
// 2014/03/14 TYS沼 DR直結対応 ADD END --------------------------------------------------



var CTRL_COMPLETED                      = "Completed";   // 確認



//排他制御スイッチ
var EXCLUSIVE_NOTHING                   = -1;            // 排他制御(何もしない)
var EXCLUSIVE_DELL                      = 0;             // 排他制御(開放)
var EXCLUSIVE_SET                       = 1;             // 排他制御(設定)
//var EXCLUSIVE_CHECK                     = 2;             // 排他制御(チェック)
var EXCLUSIVE_DELL_STUDY                = 3;             // 排他制御(検査時開放)
var EXCLUSIVE_SET_STUDY                 = 4;             // 排他制御(検査時設定)
//var EXCLUSIVE_CHECK_STUDY               = 5;             // 排他制御(検査時チェック)
// 操作権限チェック 戻り値
var CHECK_AUTHORITY_ERROR_NOT_LOGGED_IN	= -1;            // ログインされていない




var CHECK_AUTHORITY_ERROR_LOGGED_OFF		= -2;            // ログオフされた
var CHECK_AUTHORITY_ERROR_DIFFERENT_ID	= -3;            // ユーザIDがアプリケーション変数と異なっている
var CHECK_AUTHORITY_ERROR_AUTHORITY			= -4;            // 操作権限がない




//画像のステータス
//var STATE_NORMAL					            = "NORMAL";      // 通常
var STATE_MISS_SHOT					            = "MISS";	       // 写損
var STATE_NOT_SHOT					            = "0";		       // 未撮ステータス
//画像,撮影メニューリスト表示領域の設定




var VIEW_HEIGHT                         = 454;           // 正方形にすること
var VIEW_WIDTH                          = 454;           // 正方形にすること
var THUMBNAIL_HEIGHT                    = 54;
var THUMBNAIL_WIDTH                     = 54;
var SELECTMENU_TOP                      = 17;
var SELECTMENU_TOP_REVICE               = 73;
var SELECTMENU_LEFT                     = 497;
var NEXTMENU_TOP                        = 30;
var NEXTMENU_TOP_REVICE                 = 73;
var NEXTMENU_LEFT                       = 518;
//エラー文字列
var FATAL_ERROR                         = "FATAL_ERROR"; //致命的なエラー 
var RETRY_ERROR                         = "RETRY_ERROR"; //再試行可能なエラー
var USER_NOTHING_ERROR                  = "USER_NOTHING_ERROR";    //ユーザチェックエラー
var SPOT_CODE                           = 0;             //スポットコード



var FILE_NAME                           = "Study_View.js";//ファイル名



var MESSAGE_ID                          = 30500;         //メッセージID 
var MESSAGE_ID_ACCESS                   = 30501;         //メッセージID 
//2010/11/16 30501エラー対応 ADD ST
var MESSAGE_ID_ACCESS_WATCH             = 40501;         //メッセージID
var MESSAGE_ID_ACCESS_TURNIMAGE         = 40502;         //メッセージID
var MESSAGE_ID_ACCESS_NOTIFY            = 40503;         //メッセージID
var MESSAGE_ID_ACCESS_STATECHANGE		= 40504;         //メッセージID
var MESSAGE_ID_ACCESS_EXCLUSIVE			= 40505;         //メッセージID
//2010/11/16 30501エラー対応 ADD ED
//警告メッセージ
var MESSAGE_ID_NOLOGIN                  = 31502;         //メッセージID 
var MESSAGE_ID_LOGOFF                   = 31503;         //メッセージID 
var MESSAGE_ID_DIFERENT                 = 31504;         //メッセージID 
var MESSAGE_ID_FORBIDDEN                = 31505;         //メッセージID 
// 2005/07/20 009 H.SAITO #903 メッセージレベル変更(31512～31526→34512～34526)
//var MSG_DELETE_UNSHOT                   = 31523;
//var MSG_DELETE_STUDY                    = 31524;
//var MSG_NOMOVE_VIEWMODE                 = 31525;
//var MSG_WARNING_ID_OUTPUT_EXCL          = 31512;         //出力中メッセージ
var MSG_DELETE_UNSHOT                   = 34523;
var MSG_DELETE_STUDY                    = 34524;
var MSG_NOMOVE_VIEWMODE                 = 34525;
var MSG_WARNING_ID_OUTPUT_EXCL          = 34512;         //出力中メッセージ
//2005/05/14 H.SAITO 002 削除ロック対応

var MSG_WARNING_ID_LOCK_EXCL            = 31529;         //削除ロック中メッセージ
//2005/07/13 H.SAITO 005 再送処理対応

var MSG_ERROR_INPUT_IMAGE               = 31533;         //画像入力中にエラーが発生しましたメッセージ
var MSG_ERROR_IMAGE_PROC                = 31534;         //画像処理中にエラーが発生しましたメッセージ
var MSG_ERROR_INPUT_IMAGE_AND_RESUME    = 31531;         //入力を中断した検査を再開しますメッセージ
var MSG_ERROR_INPUT_IMAGE_NOT_RESUME    = 31532;         //入力を中断した検査以外の検査を開始しますメッセージ
// 2005/08/01 003 H.SAITO #790 RUの自己排他エラーの対応

var MSG_WARNING_ID_SELFRU               = 31535;         //読み取り装置を自筐体が既に使用中ですメッセージ
var MSG_ERROR_SELFRU                    = 31507;         //読み取り装置を他筐体が既に使用中ですエラーメッセージ
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
var MSG_ERROR_EXCLUSIVE_STUDY           = 31506;         //他筐体が検査を実施中
var MSG_ERROR_EXCLUSIVE_RU              = 31507;         //他筐体がＲＵを使用中
var MSG_ERROR_COMPLETED                 = 31540;         //確認/確定済みの検査です

// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-
// 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ST-
var MSG_ERROR_NODATA                    = 31511;
// 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ED-

//2014.04.14 TYS会田 DR直結-CR撮影画面・画像確認モニタ対応 ADD-ST
var MSG_ERROR_NOT_CR                    = 31513;
//2014.04.14 TYS会田 DR直結-CR撮影画面・画像確認モニタ対応 ADD-ED
//サーバから取得する設定値
var OPEN_MODE;                                           // 画面を開くモード(0:CE画面 1:ブラウザ 2:ダイアログ)
var NORMAL_WAITTIME;                                     // だらだら入力の監視間隔



var INPUT_WAITTIME;                                      // だらだら入力中の監視間隔



var IMAGE_FILE_PATH;                                     // 処理済画像ファイルのパス名



var INPUT_IMAGE_FILE_PATH;                               // だらだら画像ファイルのパス名



var EXAMEND_STATUS;                                      // 確認ステータス
var FONT_NAME;                                           // フォント名
// 2005/06/22 007 H.SAITO デザイン変更対応(フォントサイズ）



//var FONT_SIZE;                                           // フォントサイズ
var FONT_SIZE_MENU;                                      // フォントサイズ(短冊内メニュー名称)
var FONT_SIZE_MENU_PAGE;                                 // フォントサイズ(短冊メニューページ数)
var FONT_SIZE_BUTTON;                                    // フォントサイズ(ボタン)
var FONT_SIZE_UPICON;                                    // フォントサイズ(ボタン(上部にアイコンを含む))
var FONT_SIZE_OTHER;                                     // フォントサイズ(その他)
var HOST_NAME;                                           // サーバのホスト名
//モード



var CE_MODE                             = 0;
var BROWSER_MODE                        = 1;
var DIALOG_MODE                         = 2;
//画像の入力ステータス
var STATE_UNSHOT                        = "0";           // 未撮
var STATE_INPUT_OFF                     = "1";           // 入力中(だらだら対象外)
var STATE_INPUT_ON                      = "2";           // 入力中(だらだら対象)
var STATE_COMPLETE                      = "3";           // 既撮
//確認・確定時の削除モード

//2009/06/12 Nishikawa Update-ST V6.0撮影画面最小化対応
var ENDST_SUSPEND                       = 0;
var ENDST_COMPLETE                      = 1;
var ENDST_VIEWER                        = 2;
//2009/06/12 Nishikawa Update-ED V6.0撮影画面最小化対応
// 2014/03/14 TYS沼 DR直結対応 ADD START ------------------------------------------------
var ENDST_DRCHANGE                      = 3;
// 2014/03/14 TYS沼 DR直結対応 ADD END --------------------------------------------------

var DELETE_NOMENU                       = "0";           // 未撮メニューなしのため,削除しない



var DELETE_UNSHOTMENU                   = "1";           // 未撮メニューを削除する
var DELETE_STUDY                        = "2";           // すべて未撮メニューのため,検査ごと削除する
//確認ステータス
var EXAMEND_STATUS_WITHCOMPLETED        = "0";           // 確認と同時に確定



//画像パス
//撮影メニューリスト↑ボタン
var IMG_MENULIST_PREV                   = "../Bmp/cmUpPageBtnU.gif";        //活性
var IMG_MENULIST_PREV_DISABLE           = "../Bmp/cmUpPageBtnX.gif";    //不活性
var IMG_MENULIST_PREV_DOWN              = "../Bmp/cmUpPageBtnD.gif";    //押下時
//撮影メニューリスト↓ボタン
var IMG_MENULIST_NEXT                   = "../Bmp/cmDownPageBtnU.gif";      //活性
var IMG_MENULIST_NEXT_DISABLE           = "../Bmp/cmDownPageBtnX.gif";  //不活性
var IMG_MENULIST_NEXT_DOWN              = "../Bmp/cmDownPageBtnD.gif";  //押下時
//元に戻すボタン
var IMG_DEFAULT                         = "../Bmp/crStudyUndoBtnU.gif"; //活性
var IMG_DEFAULT_DISABLE                 = "../Bmp/crStudyUndoBtnX.gif";//不活性
var IMG_DEFAULT_DOWN                    = "../Bmp/crStudyUndoBtnD.gif";//押下時
//左９０°回転ボタン
var IMG_TURN_LEFT90                     = "../Bmp/crLeftRollBtnU.gif"; //活性
var IMG_TURN_LEFT90_DISABLE             = "../Bmp/crLeftRollBtnX.gif";//不活性
var IMG_TURN_LEFT90_DOWN                = "../Bmp/crLeftRollBtnD.gif";//押下時
//右９０°回転ボタン
var IMG_TURN_RIGHT90                    = "../Bmp/crRightRollBtnU.gif"; //活性
var IMG_TURN_RIGHT90_DISABLE            = "../Bmp/crRightRollBtnX.gif";//不活性
var IMG_TURN_RIGHT90_DOWN               = "../Bmp/crRightRollBtnD.gif";//押下時
//１８０°回転ボタン
var IMG_TURN_180                        = "../Bmp/crUpDwonBtnU.gif"; //活性
var IMG_TURN_180_DISABLE                = "../Bmp/crUpDwonBtnX.gif";//不活性
var IMG_TURN_180_DOWN                   = "../Bmp/crUpDwonBtnD.gif";//押下時
//左右回転ボタン
var IMG_TURN_REVERSE                    = "../Bmp/crMirrorBtnU.gif"; //活性
var IMG_TURN_REVERSE_DISABLE            = "../Bmp/crMirrorBtnX.gif";//不活性
var IMG_TURN_REVERSE_DOWN               = "../Bmp/crMirrorBtnD.gif";//押下時
//修正ボタン
var IMG_MODIFY                          = "../Bmp/crStudyEditBtnU.gif";         //活性
var IMG_MODIFY_DISABLE                  = "../Bmp/crStudyEditBtnX.gif";        //不活性
var IMG_MODIFY_DOWN                     = "../Bmp/crStudyEditBtnD.gif";        //押下時
// 2014/03/06 TYS沼 DR直結対応 ADD START ------------------------------------------------
//DR切替ボタン
var IMG_DRCHANGE                        = "../Bmp/cmOvalAPaleLLBtnU.gif";    // 活性
var IMG_DRCHANGE_DISABLE                = "../Bmp/cmOvalAPaleLLBtnX.gif";    // 不活性
var IMG_DRCHANGE_DOWN                   = "../Bmp/cmOvalAPaleLLBtnD.gif";    // 押下時
// 2014/03/06 TYS沼 DR直結対応 ADD END ------------------------------------------------
//保留ボタン(ビューアーモード表示時)
var IMG_SUSPEND                         = "../Bmp/cmOvalAPaleSBtnU.gif";        //活性
var IMG_SUSPEND_DISABLE                 = "../Bmp/cmOvalAPaleSBtnX.gif";     //不活性
var IMG_SUSPEND_DOWN                    = "../Bmp/cmOvalAPaleSBtnD.gif";     //押下時
//保留ボタン(ビューアーモード非表示時)
var IMG_SUSPEND2                        = "../Bmp/cmOvalAPaleLBtnU.gif";        //活性
var IMG_SUSPEND2_DISABLE                = "../Bmp/cmOvalAPaleLBtnX.gif";     //不活性
var IMG_SUSPEND2_DOWN                   = "../Bmp/cmOvalAPaleLBtnD.gif";     //押下時

//2009/06/12 Nishikawa Update-ST V6.0撮影画面最小化対応
//簡易撮影画面ボタン
var IMG_SIMPLE                         = "../Bmp/cmOvalAPaleSBtnU.gif";        //活性
var IMG_SIMPLE_DISABLE                 = "../Bmp/cmOvalAPaleSBtnX.gif";     //不活性
var IMG_SIMPLE_DOWN                    = "../Bmp/cmOvalAPaleSBtnD.gif";     //押下時
//2009/06/12 Nishikawa Update-ED V6.0撮影画面最小化対応

//参照ボタン
var IMG_VIEW                            = "../Bmp/cmCirBblueBtnU.gif";           //活性
var IMG_VIEW_DISABLE                    = "../Bmp/cmCirBblueBtnX.gif";         //不活性
var IMG_VIEW_DOWN                       = "../Bmp/cmCirBblueBtnD.gif";         //押下時
//確認ボタン
var IMG_UPDATE                          = "../Bmp/cmCirBGreenBtnU.gif";          //活性
var IMG_UPDATE_DISABLE                  = "../Bmp/cmCirBGreenBtnX.gif";         //不活性
var IMG_UPDATE_DOWN                     = "../Bmp/cmCirBGreenBtnD.gif";         //押下時
//確認キャンセルボタン
var IMG_CONF_NG                         = "../Bmp/cmOvalAPaleLBtnU.GIF";         //活性
var IMG_CONF_NG_DOWN                    = "../Bmp/cmOvalAPaleLBtnD.GIF";     //押下時
//確認OKボタン
var IMG_CONF_OK                         = "../Bmp/cmOvalAGreenLBtnU.GIF";             //活性
var IMG_CONF_OK_DOWN                    = "../Bmp/cmOvalAGreenLBtnD.GIF";     //押下時
// 2005/07/21 005 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
//// 2005/05/14 002 H.SAITO 検査排他の変更(Cookie) 
//var COOKIE_NAME                         = "StudyViewLock";	// 検査画面起動中クッキー名


//// 2005/06/29 002 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
//var COOKIE_NAME_STUDY2                  = "StudyLock";	    // 検査排他中クッキー名

// 080424 HSK由比 ガイダンス表示対応 ADD-ST
var IMG_SHOW_IMAGE                      = "../Bmp/crGuidanceBtnU1.gif";         // 検査画像表示中
var IMG_SHOW_GUIDANCE                   = "../Bmp/crGuidanceBtnU2.gif";         // ガイダンス表示中
var IMG_SHOW_GUIDANCE_DISABLE           = "../Bmp/crGuidanceBtnX.gif";          // 不活性
var IMG_SHOW_GUIDANCE_DOWN              = "../Bmp/crGuidanceBtnD.gif";          // 押下時
// 080424 HSK由比 ガイダンス表示対応 ADD-ED



// 2005/08/01 002 H.SAITO #790 RUの自己排他エラーの対応


var COOKIE_STUDY_SEQ                    = "StudyingSequence"; // 検査中の検査シーケンスクッキー名


// 2005/07/13 005 H.SAITO 再送処理対応


var RESEND_MODE_ERROR_INPUT_IMAGE             = "ERROR_INPUT_IMAGE";            //画像入力中にエラーが発生した場合のモード


var RESEND_MODE_ERROR_IMAGE_PROC              = "ERROR_IMAGE_PROC";             //画像処理中にエラーが発生した場合のモード


var RESEND_MODE_ERROR_INPUT_IMAGE_AND_RESUME  = "ERROR_INPUT_IMAGE_AND_RESUME"; //入力を中断した検査を再開するモード


var RESEND_MODE_ERROR_INPUT_IMAGE_NOT_RESUME  = "ERROR_INPUT_IMAGE_NOT_RESUME"; //入力を中断した検査以外の検査を再開するモード


// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
var DIALOGPROCMODE_RU_ERROR                   = "DIALOGPROCMODE_RU_ERROR"; 
var DIALOGPROCMODE_STUDY_ERROR                = "DIALOGPROCMODE_STUDY_ERROR";
var DIALOGPROCMODE_COMPLETED_ERROR            = "DIALOGPROCMODE_COMPLETED_ERROR";
// 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-
var DIALOGPROCMODE_MPPS_ERROR                 = "DIALOGPROCMODE_MPPS_ERROR"; //10/12/17  FF千葉      V2.1(B)    MWM,MPPS対応 ADD
// 2005/12/17 PVCS#1713 H.SAITO -ST-
var NOTIFY_FUNCTION_SUSPEND                   = "FUNCTION_SUSPEND";   // 保留
var NOTIFY_FUNCTION_VIEW                      = "FUNCTION_VIEW";      // ビューワーモード

var NOTIFY_FUNCTION_COMPLETED                 = "FUNCTION_COMPLETED"; // 確認

var NOTIFY_FUNCTION_MODIFY                    = "FUNCTION_MODIFY";    // 修正
var NOTIFY_FUNCTION_INDICATOR                 = "FUNCTION_INDICATOR"; // インジケータ
var NOTIFY_FUNCTION_ENDINPUT                  = "FUNCTION_ENDINPUT";  // すべて入力完了(未撮無し)
// 2006/11/08 PVCS#1962,#1666 H.SAITO -ST-
//var NOTIFY_FUNCTION_ERROREND                  = "FUNCTION_ERROREND";  // エラー終了時
// 2006/11/08 PVCS#1962,#1666 H.SAITO -ED-
// 2005/12/17 PVCS#1713 H.SAITO -ED-
// 2005/12/17 PVCS#1713 H.SAITO -ST-
var REQUEST_NOTIFY                            = "REQUEST_NOTIFY";
var END_NOTIFY                                = "END_NOTIFY";
// 2005/12/17 PVCS#1713 H.SAITO -ED-
// 2014/03/14 TYS沼 DR直結対応 ADD START ------------------------------------------------
var NOTIFY_FUNCTION_DRCHANGE                  = "FUNCTION_DRCHANGE"; // DR切替
// 2014/03/14 TYS沼 DR直結対応 ADD END --------------------------------------------------

// 2005/12/17 PVCS#1713 H.SAITO -ST-
// 終了処理状況ステータス
//(終了処理のそれぞれのフェーズで発生するエラーで、ダイアログボックスのボタン押下時の再開/非再開の判断を行うために使用)
var ENDPROC_STATUS_NOTIFY                     = "ENDPROC_STATUS_NOTIFY";           // 非選択要求中
var ENDPROC_STATUS_CHECKDATA                  = "ENDPROC_STATUS_CHECKDATA";        // 未撮メニューチェック中
var ENDPROC_STATUS_ENDPROC                    = "ENDPROC_STATUS_ENDPROC";          // 終了処理中
var ENDPROC_STATUS_ERROR_NOTIMAGE             = "ENDPROC_STATUS_ERROR_NOTIMAGE";   // (再施行可能)すべて未撮のため、ビューアーモード起動できない

var ENDPROC_STATUS_ERROR_OUTPUT               = "ENDPROC_STATUS_ERROR_OUTPUT";     // (再施行可能)出力中エラー発生(検査削除時のみ発生)
var ENDPROC_STATUS_ERROR_DELETELOCK           = "ENDPROC_STATUS_ERROR_DELETELOCK"; // (再施行可能)削除ロック中エラー発生(検査削除時のみ発生)
var ENDPROC_STATUS_ERROR_PERMIT               = "ENDPROC_STATUS_ERROR_PERMIT";     // (再施行不可能) 権限無しエラー発生

// 080418 HSK由比 ガイダンス表示対応 ADD-ST
var GUIDANCE_PATH                            = "/PoGuide/main_miniguide.asp?menu01="; // 撮影ガイダンスのパス
var NOIMAGE_DISP                             = 0;                                     // 画像なし(黒画像)
var IMAGE_DISP                               = 1;                                     // CR画像
var GUIDANCE_DISP                            = 2;                                     // 撮影ガイダンス

var GUIDANCE_USE;

var INPUT_MODE_NORMAL                        = "NORMAL";
var INPUT_MODE_THUMBNAIL                     = "THUMBNAIL";
var INPUT_MODE_GUIDANCE                      = "GUIDANCE";

var GUIDANCE_HEIGHT                          = 454;           // 正方形にすること
var GUIDANCE_WIDTH                           = 454;           // 正方形にすること
// 080418 HSK由比 ガイダンス表示対応 ADD-ED


// 2005/12/17 PVCS#1713 H.SAITO -ED-
//【変数】
// 表示文字列
//メッセージ文字列
var SERVER_DOWN_STRING;                                  // サーバ未起動メッセージ
var TOTAL_PAGE_STRING;                                   // トータル文字



var PAGE_STRING;                                         // ページ文字



var MENU_STRING;                                         // メニュー文字



var ModifyText;                                          // 修正
// 080515 HSK由比 ガイダンス表示対応 DELETE-ST
//var UndoText;                                            // 元に戻す
//
//
//
//var TurnLeftText;                                        // 左90ﾟ回転
//var TurnRightText;                                       // 右90ﾟ回転
//var Turn180Text;                                         // 180ﾟ回転
//var ReverseText;                                         // 左右回転
// 080515 HSK由比 ガイダンス表示対応 DELETE-ST
// 2014/03/06 TYS沼 DR直結対応 ADD START ------------------------------------------------
var DrChangeText;                                        // DR切替
// 2014/03/06 TYS沼 DR直結対応 ADD END ------------------------------------------------
var SuspendText;                                         // 保留
var ViewText;                                            // ビューアーモード



var UpdateText;                                          // 確認



var ProcText;                                            // 処理中文字列
var ErrorText;                                           // 再試行してください
var ErrorButton;                                         // ＯＫ
var UpdateTimeOutString;                                 // 更新処理タイムアウト文字



var NotLogInString;                                      // ログインされていません文字



var LogOffString;                                        // ログオフされている文字



var DifferentIdString;                                   // ログイン時のＩＤと異なっている文字



var ForbiddenString;                                     // 操作権限がない文字



var UnshotMenuDeleteString;                              // 未撮の撮影メニュー削除確認文字



var StudyDeleteString;                                   // 検査の削除確認文字



var NotMoveViewString;                                   // ビューアーモードを実行できない文字



var ConfirmOkString;                                     // 確認ダイアログＯＫ
var ConfirmCancelString;                                 // 確認ダイアログキャンセル
var UserGuidanceString;                                  // ユーザガイダンス
// 2005/08/22 Kanno ADD ST タイトルバーの文字列設定



var TitleString;                                         // タイトル
// 2005/08/22 Kanno ADD ED タイトルバーの文字列設定



// その他変数
var MaxPage;								                             // 撮影メニューページの最大値
var SelectPageNo		                    = -1;		         // 撮影リストページ選択番号
var SelectMenuPage                      = -1;		         // 撮影メニュー選択ページ(1～)
var SelectMenuNo                        = -1;		         // 撮影メニュー選択番号(1～)
var SelectMenuTable                     = -1;            // 撮影メニュー選択テーブル(1～4)
var SelectNextPage;                                      // 撮影リスト次メニュー選択ページ(1～)
var SelectNextNo;                                        // 撮影リスト次メニュー選択番号(1～)
var SelectNextTable;				                             // 撮影リスト次メニューテーブル(1～4)
var SelectImageSeqence;                                  // 修正ボタン押下前に選択していた画像シーケンス
var DivViewCount;                                        // だらだら表示途中経過カウント



var ResendCount;                                         // 再送カウント



var DeleteModeAtConfirm;                                 // 確認/確定時の削除モード(0:削除なし,1:未撮メニュー削除,2:検査ごと削除)
var DeleteUnShotImageSequence;                           // 確認/確定時に削除対象となる未撮メニュー
var PushedButton;                                        // 確認ボタン/ビューアーモードボタンのどちらを押下したか（確認ダイアログ表示時に必要)
var PollingFlag;                                         // ポーリング中フラグ("OFF":ポーリングを継続しないこと)
// 2005/12/21 PVCS#1713 H.SAITO -ST-
var PollingProcFlag;                                     // ポーリング中フラグ(0:ポーリングしていない,1:ポーリング中のため再度のポーリング禁止) 
// 2005/12/21 PVCS#1713 H.SAITO -ED-
var StartProcTimeOutId;                                  // 検査開始/排他設定タイマのＩＤ
var WatchImageTimeOutId;                                 // ポーリング監視用タイマのＩＤ（サーバ,クライアント間の更新処理タイマ）



var WatchImageInputTimeOut;                              // ポーリング用タイマの間隔（ミリ秒）



var WatchImageInputId;                                   // ポーリング用タイマのＩＤ（関数ループ用）



var NotifyTimeOutId;                                     // 選択通知タイマのＩＤ
var NotifyLockFlagString;                                // 選択通知処理中フラグ(0:通知可能,1:処理中のため通知不可)
var NotifySelectIdString;                                // 選択通知対象画像シーケンス（スタック）
// 2005/12/17 PVCS#1713 H.SAITO -ST-
var NotifyFunctionString;                                // 非選択通知要求を発行した機能（スタック）
var NotifyFunctionProcString;                            // 非選択通知要求を発行した機能（実際にsubmitしたときの機能。処理完了後に呼ぶメソッドの切り分けに使う)
// 2005/12/17 PVCS#1713 H.SAITO -ED-
var NotifySelectIdStringBackup          = "";            // インジケータ・修正による一時停止のときに選択通知を送った画像シーケンス（バックアップ用）
var NotifyEndFlag                       = "";            // 非選択通知を送ったときに"1"を入れる(インジケータによるコール,修正画面への遷移は含まない) =すべて既撮
var ChangeStateTimeOutId;                                // 確認/確定/保留,排他開放タイマのＩＤ
var TurnImageTimeOutId;                                  // 回転・反転・元に戻すタイマのＩＤ
// 排他管理変数
var ExclusiveModeRu;                                     // ＲＵの排他の設定／チェック 
var ExclusiveModeRuRelease;                              // ＲＵの排他の開放 
var ExclusiveModeStudy;                                  // 検査の排他の設定／チェック 
var ExclusiveModeStudyRelease;                           // 検査の排他の開放 
var CommandMode;                                         // 終了コマンド



var CommandParam;                                        // 終了パラメタ
// 2005/07/14 002 H.SAITO 再送処理対応



var ReSendMode;                                          // 再送処理のモード(再送処理のダイアログボックスでの判定に使用する）




// 2006/11/21 PVCS#1770 H.SAITO -ST-
//var ReSendFromIndicatorCloseFlag;                        // インジケータを閉じた後のポーリングかどうかのフラグ
// 2006/11/21 PVCS#1770 H.SAITO -ED-
// 2005/07/15 002 H.SAITO 修正中にインジケータを開いた場合、閉じたときに選択通知を送ってしまう不具合対応




var ModifyingFlag;                                       // 修正中フラグ(0:検査中,1:修正中)
// 2005/08/01 002 H.SAITO #790 RUの自己排他エラーの対応



var DialogMode;                                          // 確認ダイアログのモード


//#1432 2005/09/17--ST
var ModifyDispFlag;
//#1432 2005/09/17--EN
// 2006/11/21 PVCS#1770 H.SAITO -ST-
//// 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ST-
//var ErrorDialogFlag;
//// 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ED-
// 2006/11/21 PVCS#1770 H.SAITO -ED-

// 2005/12/17 PVCS#1713 H.SAITO -ST-
var EndProcFlag;                                         // 終了処理中フラグ
var EndProcStatus;                                       // 終了処理状況ステータス

// 2005/12/17 PVCS#1713 H.SAITO -ED-

//2007/03/08 PVCS#2109 K.HOSHINO
var DiscontinueFlag = false;								//中断処理を行ったことをポーリングで判定するためのフラグ

var isMonitoring = 0;

var isView = 0; //09.10.15 FF 星野 CR検査画面で未撮影メニューが残った状態でビューアー起動出来ない件対応
// 2014/03/11 TYS沼 DR直結対応 ADD START ------------------------------------------------
var CONNECTINGDR_USE;                                    // ConnectingDRキー値
var CRImageShotOnce;                                     // CR撮影を一度でも実施したか
// 2014/03/11 TYS沼 DR直結対応 ADD END --------------------------------------------------


//*****************************************************************************
// Fn_InitPage
//
// １．機能 
//      ページが表示された時の初期処理を行う
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Fn_InitPage(){
	try{
        //画面遷移開始通知設定

        SetViewMovingNotification(ViewMovingNotification);

		//#1432 2005/09/17--ST
		ModifyDispFlag = 0;
		//#1432 2005/09/17--EN
		// 2014/03/14 TYS沼 DR直結対応 ADD START ------------------------------------------------
		CRImageShotOnce = 0;
		// 2014/03/14 TYS沼 DR直結対応 ADD END --------------------------------------------------
		
		//初画面表示
		document.getElementById("DIV_ModifyText").innerText        = ModifyText;
// 080515 HSK由比 ガイダンス表示対応 DELETE-ST
//		document.getElementById("DIV_UndoText").innerText          = UndoText;
//		document.getElementById("DIV_TurnLeftText").innerText      = TurnLeftText;
//		document.getElementById("DIV_TurnRightText").innerText     = TurnRightText;
//		document.getElementById("DIV_Turn180Text").innerText       = Turn180Text;
//		document.getElementById("DIV_ReverseText").innerText       = ReverseText;
// 080515 HSK由比 ガイダンス表示対応 DELETE-ED
		// 2014/03/06 TYS沼 DR直結対応 ADD START ------------------------------------------------
		document.getElementById("DIV_DrChangeText").innerText       = DrChangeText;
		// 2014/03/06 TYS沼 DR直結対応 ADD END ------------------------------------------------
		document.getElementById("DIV_SuspendText").innerText       = SuspendText;
		document.getElementById("DIV_SuspendText2").innerText      = SuspendText;

//2009/06/12 Nishikawa Update-ST V6.0撮影画面最小化対応
		document.getElementById("DIV_SimpleText").innerText        = SimpleText;
//2009/06/12 Nishikawa Update-ED V6.0撮影画面最小化対応
		
		document.getElementById("DIV_ViewText").innerText          = ViewText;
		document.getElementById("DIV_UpdateText").innerText        = UpdateText;
		document.getElementById("TD_ProcText").innerText           = ProcText;
		document.getElementById("TD_ErrorText").innerText          = ErrorText;
		document.getElementById("DIV_ErrorOkText").innerText       = ErrorButton; 
		document.getElementById("DIV_ConfirmCancelText").innerText = ConfirmCancelString; 
		document.getElementById("DIV_ConfirmOkText").innerText     = ConfirmOkString; 
    // 2005/07/13 003 H.SAITO 再送処理対応




		document.getElementById("DIV_ConfirmCancelText_ReSend").innerText = ConfirmCancelString; 
		document.getElementById("DIV_ConfirmOkText_ReSend").innerText     = ConfirmOkString; 

    //フォント名,フォントサイズの設定



    document.getElementById("BODY").style.fontFamily               = FONT_NAME;
    // 2005/06/22 002 H.SAITO デザイン変更対応（フォントサイズ）




    //document.getElementById("BODY").style.fontSize                 = FONT_SIZE + "px";
    for(i = 1; i <= MAXMENU; i++){
      document.getElementById("DIV_StudyText" + i).style.fontFamily = FONT_NAME;
      // 2005/06/22 003 H.SAITO デザイン変更対応（フォントサイズ）




      //document.getElementById("DIV_StudyText" + i).style.fontSize   = FONT_SIZE + "px";
      document.getElementById("DIV_StudyText" + i).style.fontSize   = FONT_SIZE_MENU;
    }
    // 2005/06/22 024 H.SAITO デザイン変更対応（フォントサイズ）




		document.getElementById("DIV_ModifyText").style.fontSize        = FONT_SIZE_UPICON;
// 080515 HSK由比 ガイダンス表示対応 DELETE-ST
//		document.getElementById("DIV_UndoText").style.fontSize          = FONT_SIZE_UPICON;
//		document.getElementById("DIV_TurnLeftText").style.fontSize      = FONT_SIZE_UPICON;
//		document.getElementById("DIV_TurnRightText").style.fontSize     = FONT_SIZE_UPICON;
//		document.getElementById("DIV_Turn180Text").style.fontSize       = FONT_SIZE_UPICON;
//		document.getElementById("DIV_ReverseText").style.fontSize       = FONT_SIZE_UPICON;
// 080515 HSK由比 ガイダンス表示対応 DELETE-ED
		// 2014/03/06 TYS沼 DR直結対応 ADD START ------------------------------------------------
		document.getElementById("DIV_DrChangeText").style.fontSize      = FONT_SIZE_BUTTON;
		// 2014/03/06 TYS沼 DR直結対応 ADD END --------------------------------------------------
		document.getElementById("DIV_SuspendText").style.fontSize       = FONT_SIZE_BUTTON;
		document.getElementById("DIV_SuspendText2").style.fontSize      = FONT_SIZE_BUTTON;
		document.getElementById("DIV_ViewText").style.fontSize          = FONT_SIZE_BUTTON;
		document.getElementById("DIV_UpdateText").style.fontSize        = FONT_SIZE_BUTTON;
		document.getElementById("TD_ProcText").style.fontSize           = FONT_SIZE_OTHER;
		document.getElementById("TD_ErrorText").style.fontSize          = FONT_SIZE_OTHER;
		document.getElementById("DIV_ErrorOkText").style.fontSize       = FONT_SIZE_BUTTON;
		document.getElementById("DIV_ConfirmCancelText").style.fontSize = FONT_SIZE_BUTTON;
		document.getElementById("DIV_ConfirmOkText").style.fontSize     = FONT_SIZE_BUTTON;
		document.getElementById("DIV_TextCnt").style.fontSize           = FONT_SIZE_MENU_PAGE;
		document.getElementById("DIV_SimpleText").style.fontSize        = FONT_SIZE_BUTTON; // 小林@100104
    document.getElementById("TD_ConfirmTitle1").style.fontSize      = FONT_SIZE_OTHER;
    document.getElementById("TD_ConfirmTitle2").style.fontSize      = FONT_SIZE_OTHER;
    document.getElementById("TD_ConfirmText").style.fontSize        = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorTitle1").style.fontSize        = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorTitle2").style.fontSize        = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorText").style.fontSize          = FONT_SIZE_OTHER;
    document.getElementById("TD_ErrorCode").style.fontSize          = FONT_SIZE_OTHER;
    //------------//
    // ボタン表示 //
    //------------//
    // 確認ボタン
		document.getElementById("TABLE_UpdateBtn").style.visibility         = "visible";
		document.getElementById("IMG_UpdateBtn_Enable").style.visibility    = "visible";
		document.getElementById("DIV_UpdateText").style.visibility          = "visible";
		document.getElementById("DIV_UpdateText").style.color               = "black";

		//ビューアーモードの表示/非表示 保留ボタンの位置調整
		if(OPEN_MODE == CE_MODE){	
			// 2014/03/06 TYS沼 DR直結対応 ADD START ------------------------------------------------
			// DR切替ボタン
			document.getElementById("TABLE_DRChangeBtn").style.visibility        = "hidden";
			document.getElementById("IMG_DRChangeBtn_Enable").style.visibility   = "hidden";
			document.getElementById("IMG_DRChangeBtn_Disable").style.visibility  = "hidden";
			document.getElementById("DIV_DrChangeText").style.visibility		 = "hidden";
			// 2014/03/06 TYS沼 DR直結対応 ADD END --------------------------------------------------
      // 保留ボタン
			document.getElementById("TABLE_SuspendBtn2").style.visibility        = "visible";
			document.getElementById("IMG_SuspendBtn2_Enable").style.visibility   = "visible";
			document.getElementById("IMG_SuspendBtn2_Disable").style.visibility  = "hidden";
			document.getElementById("DIV_SuspendText2").style.visibility         = "visible";
			document.getElementById("TABLE_SuspendBtn").style.visibility         = "hidden";
			document.getElementById("IMG_SuspendBtn_Enable").style.visibility    = "hidden";
			document.getElementById("IMG_SuspendBtn_Disable").style.visibility   = "hidden";
			document.getElementById("DIV_SuspendText").style.visibility          = "hidden";
      // ２連ボタン背景
			document.getElementById("IMG_DoubleBackBtn").style.visibility       = "visible";
		}
		else{
			// 2014/03/06 TYS沼 DR直結対応 ADD START ------------------------------------------------
			// DR切替ボタン
			if(CONNECTINGDR_USE == 1)
			{
    			document.getElementById("TABLE_DRChangeBtn").style.visibility        = "visible";
	    		document.getElementById("IMG_DRChangeBtn_Enable").style.visibility   = "visible";
		    	document.getElementById("IMG_DRChangeBtn_Disable").style.visibility  = "hidden";
			    document.getElementById("DIV_DrChangeText").style.visibility		 = "visible";
			}
			else
			{
    			document.getElementById("TABLE_DRChangeBtn").style.visibility        = "hidden";
	    		document.getElementById("IMG_DRChangeBtn_Enable").style.visibility   = "hidden";
		    	document.getElementById("IMG_DRChangeBtn_Disable").style.visibility  = "hidden";
			    document.getElementById("DIV_DrChangeText").style.visibility		 = "hidden";
			}
			// 2014/03/06 TYS沼 DR直結対応 ADD END --------------------------------------------------
      // 保留ボタン
			document.getElementById("TABLE_SuspendBtn").style.visibility         = "visible";
			document.getElementById("IMG_SuspendBtn_Enable").style.visibility    = "visible";
			document.getElementById("IMG_SuspendBtn_Disable").style.visibility   = "hidden";
			document.getElementById("DIV_SuspendText").style.visibility          = "visible";
			document.getElementById("TABLE_SuspendBtn2").style.visibility        = "hidden";
			document.getElementById("IMG_SuspendBtn2_Enable").style.visibility   = "hidden";
			document.getElementById("IMG_SuspendBtn2_Disable").style.visibility  = "hidden";
			document.getElementById("DIV_SuspendText2").style.visibility         = "hidden";
      // ビューアーモードボタン
			document.getElementById("TABLE_ViewBtn").style.visibility           = "visible";
			document.getElementById("IMG_ViewBtn_Enable").style.visibility			= "visible";
			document.getElementById("DIV_ViewText").style.visibility		        = "visible";
			document.getElementById("DIV_ViewText").style.color                 = "black";
      // ３連ボタン背景
			document.getElementById("IMG_TripleBackBtn").style.visibility       = "visible";
			
//2009/06/12 Nishikawa Update-ST V6.0撮影画面最小化対応
			document.getElementById("TABLE_SimpleBtn").style.visibility         = "visible";
			document.getElementById("IMG_SimpleBtn_Enable").style.visibility    = "visible";
			document.getElementById("IMG_SimpleBtn_Disable").style.visibility   = "hidden";
			document.getElementById("DIV_SimpleText").style.visibility          = "visible";
//2009/06/12 Nishikawa Update-ED V6.0撮影画面最小化対応

		}

// 080507 HSK由比 ガイダンス表示対応 ADD-ST
        // ガイダンス表示しない場合はガイダンス表示切替ボタンを表示しないようにする。
        if(GUIDANCE_USE == 0)
        {
            // ガイダンス表示切替ボタンを非表示化
            document.getElementById("TABLE_GuidanceToggleBtn").style.visibility       = "hidden";
            document.getElementById("IMG_GuidanceToggleBtn_Enable").style.visibility  = "hidden";
            document.getElementById("IMG_GuidanceToggleBtn_Disable").style.visibility = "hidden";
            // テキストの表示
//            document.getElementById("DIV_GuidanceToggleBtnText").style.visibility     = "hidden";
        }
// 080507 HSK由比 ガイダンス表示対応 ADD-ED

    //フィルタ解除
		Public_CloseMessage();
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
	}
}
//2010/11/16 30501エラー対応 MOD ST
//*****************************************************************************
// Fn_Init
//
// １．機能
//     変数を初期化する
// ２．戻り値
//　　  なし



// ３．備考



//*****************************************************************************
function Fn_Init(initMode){
	try{
		switch(initMode)
		{
			// 全変数の初期化
			case "ALL":
		    	//初期化
				clearTimeout(StartProcTimeOutId);                               //検査開始/排他設定タイマのＩＤ
				clearTimeout(WatchImageTimeOutId);                              //ポーリング監視用タイマのＩＤ（サーバ,クライアント間の更新処理タイマ）
				clearTimeout(WatchImageInputId);                                //ポーリング用タイマのＩＤ（関数をループさせる）

				clearTimeout(NotifyTimeOutId);                                  //選択通知タイマのＩＤ
				clearTimeout(ChangeStateTimeOutId);                             //確認/確定/保留,排他開放タイマのＩＤ
				clearTimeout(TurnImageTimeOutId);                               //回転・反転・元に戻すタイマのＩＤ
				MaxPage                     = 0;                                //撮影メニューページの最大値
				SelectPageNo		            = -1;		                            //撮影リストページ選択番号
				SelectMenuPage              = -1;		                            //撮影メニュー選択ページ(1～)
				SelectMenuNo                = -1;		                            //撮影メニュー選択番号(1～)
				SelectNextPage              = -1;                               //撮影リスト次メニュー選択ページ(1～)
				SelectNextNo                = -1;                               //撮影リスト次メニュー選択番号(1～)
				SelectNextTable             = -1;                               //撮影リスト次メニューテーブル(1～4)
				DivViewCount                = 0;                                //だらだら表示途中経過カウント

				ResendCount                 = 1;                                //再送カウント

				NotifyLockFlagString        = "0";                              //メニュー選択通知ロックフラグ
				NotifySelectIdString        = "";                               //メニュー選択通知中画像シーケンス
				NotifySelectIdStringBackup  = "";                               //インジケータ・修正による一時停止のときに選択通知を送った画像シーケンス（バックアップ用）
				// 2005/12/17 PVCS#1713 H.SAITO -ST-
				NotifyFunctionString        = "";                               // 非選択通知要求を発行した機能（スタック）
				NotifyFunctionProcString    = "";                               // 非選択通知要求を発行した機能（実際にsubmitしたときの機能。処理完了後に呼ぶメソッドの切り分けに使う)
				// 2005/12/17 PVCS#1713 H.SAITO -ED-
				NotifyEndFlag               = "";                               //非選択通知を送ったときに"1"を入れる(インジケータによるコール,修正画面への遷移は含まない)
				// 2005/12/17 PVCS#1713 H.SAITO -ST-
				EndProcFlag                 = 0;                                // 終了処理中フラグ
				EndProcStatus               = "";                               // 終了処理状況ステータス
				// 2005/12/17 PVCS#1713 H.SAITO -ED-

				WatchImageInputTimeOut      = NORMAL_WAITTIME;                  //だらだら監視間隔

				SelectImageSeqence          = "";                               //修正ボタン押下前に選択していた画像シーケンス
				DeleteModeAtConfirm         = "";                               //確認/確定時の削除モード(0:削除なし,1:未撮メニュー削除,2:検査ごと削除)
				DeleteUnShotImageSequence   = null;                             //確認/確定時に削除対象となる未撮メニュー
				PushedButton                = "";                               //確認ボタン/ビューアーモードボタンのどちらを押下したか（確認ダイアログ表示時に必要)
				PollingFlag                 = "";                               //ポーリング中フラグ
				CommandMode                 = "";                               //終了コマンド

				ExclusiveModeRu             = "";                               //ＲＵの排他の設定／チェック 
				ExclusiveModeRuRelease      = "";                               //ＲＵの排他の開放 
				ExclusiveModeStudy          = "";                               //検査の排他の設定／チェック 
				ExclusiveModeStudyRelease   = "";                               //検査の排他の開放 


				CommandParam                = "";                               //終了パラメタ
				// 2005/07/13 003 H.SAITO 再送処理対応

				ReSendMode                  = "";                               //再送処理モード

				// 2006/11/21 PVCS#1770 H.SAITO -ST-
				//ReSendFromIndicatorCloseFlag= 0;
				// 2006/11/21 PVCS#1770 H.SAITO -ED-
				// 2005/07/15 002 H.SAITO 修正中にインジケータを開いた場合、閉じたときに選択通知を送ってしまう不具合対応

				ModifyingFlag               = 0;                                //修正中フラグ(0:検査中,1:修正中)
				// 2005/08/01 002 H.SAITO #790 RUの自己排他エラーの対応
				DialogMode                  = "";                               //確認ダイアログのモード
				// 2006/11/21 PVCS#1770 H.SAITO -ST-
				//// 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ST-
				//ErrorDialogFlag             = 0;
				//// 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ED-
				// 2006/11/21 PVCS#1770 H.SAITO -ED-
				// 2005/12/21 PVCS#1713 H.SAITO -ST-
				PollingProcFlag             = 0;                                // ポーリング中フラグ(0:ポーリングしていない,1:ポーリング中のため再度のポーリング禁止) 
				// 2005/12/21 PVCS#1713 H.SAITO -ED-

				isView = 0;//09.10.15 FF 星野 CR検査画面で未撮影メニューが残った状態でビューアー起動出来ない件対応

				parent.INFORMATION_VIEW.Public_ClearInformation();              //患者情報表示領域のクリア
				Fn_SelectPageClear();                                           //撮影メニューリストのクリア
				document.getElementById("DIV_PatientFilmImage").innerHTML = ""; //処理済画像表示クリア
				// 080424 HSK由比 ガイダンス表示対応 ADD-ST
				document.getElementById("DIV_GuidanceImage").innerHTML      = ""; // ガイダンス表示画像クリア
				// 080424 HSK由比 ガイダンス表示対応 ADD-ED
        		break;

			// タイムアウト時の初期化
			case "TIMEOUT":
		    	//初期化
				clearTimeout(StartProcTimeOutId);                               //検査開始/排他設定タイマのＩＤ
				clearTimeout(WatchImageTimeOutId);                              //ポーリング監視用タイマのＩＤ（サーバ,クライアント間の更新処理タイマ）
				clearTimeout(WatchImageInputId);                                //ポーリング用タイマのＩＤ（関数をループさせる）

				clearTimeout(NotifyTimeOutId);                                  //選択通知タイマのＩＤ
				clearTimeout(ChangeStateTimeOutId);                             //確認/確定/保留,排他開放タイマのＩＤ
				clearTimeout(TurnImageTimeOutId);                               //回転・反転・元に戻すタイマのＩＤ
				MaxPage                     = 0;                                //撮影メニューページの最大値
				SelectPageNo		            = -1;		                            //撮影リストページ選択番号
				SelectMenuPage              = -1;		                            //撮影メニュー選択ページ(1～)
				SelectMenuNo                = -1;		                            //撮影メニュー選択番号(1～)
				SelectNextPage              = -1;                               //撮影リスト次メニュー選択ページ(1～)
				SelectNextNo                = -1;                               //撮影リスト次メニュー選択番号(1～)
				SelectNextTable             = -1;                               //撮影リスト次メニューテーブル(1～4)
				DivViewCount                = 0;                                //だらだら表示途中経過カウント

				ResendCount                 = 1;                                //再送カウント

				NotifyLockFlagString        = "0";                              //メニュー選択通知ロックフラグ
				NotifySelectIdString        = "";                               //メニュー選択通知中画像シーケンス
				NotifySelectIdStringBackup  = "";                               //インジケータ・修正による一時停止のときに選択通知を送った画像シーケンス（バックアップ用）
				// 2005/12/17 PVCS#1713 H.SAITO -ST-
				//NotifyFunctionString        = "";                               // 非選択通知要求を発行した機能（スタック）
				//NotifyFunctionProcString    = "";                               // 非選択通知要求を発行した機能（実際にsubmitしたときの機能。処理完了後に呼ぶメソッドの切り分けに使う)
				// 2005/12/17 PVCS#1713 H.SAITO -ED-
				NotifyEndFlag               = "";                               //非選択通知を送ったときに"1"を入れる(インジケータによるコール,修正画面への遷移は含まない)
				// 2005/12/17 PVCS#1713 H.SAITO -ST-
				EndProcFlag                 = 0;                                // 終了処理中フラグ
				EndProcStatus               = "";                               // 終了処理状況ステータス
				// 2005/12/17 PVCS#1713 H.SAITO -ED-

				WatchImageInputTimeOut      = NORMAL_WAITTIME;                  //だらだら監視間隔

				SelectImageSeqence          = "";                               //修正ボタン押下前に選択していた画像シーケンス
				//DeleteModeAtConfirm         = "";                               //確認/確定時の削除モード(0:削除なし,1:未撮メニュー削除,2:検査ごと削除)
				//DeleteUnShotImageSequence   = null;                             //確認/確定時に削除対象となる未撮メニュー
				PushedButton                = "";                               //確認ボタン/ビューアーモードボタンのどちらを押下したか（確認ダイアログ表示時に必要)
				PollingFlag                 = "";                               //ポーリング中フラグ
				CommandMode                 = "";                               //終了コマンド

				//ExclusiveModeRu             = "";                               //ＲＵの排他の設定／チェック 
				//ExclusiveModeRuRelease      = "";                               //ＲＵの排他の開放 
				//ExclusiveModeStudy          = "";                               //検査の排他の設定／チェック 
				//ExclusiveModeStudyRelease   = "";                               //検査の排他の開放 

				CommandParam                = "";                               //終了パラメタ
				// 2005/07/13 003 H.SAITO 再送処理対応
				ReSendMode                  = "";                               //再送処理モード

				// 2006/11/21 PVCS#1770 H.SAITO -ST-
				//ReSendFromIndicatorCloseFlag= 0;
				// 2006/11/21 PVCS#1770 H.SAITO -ED-
				// 2005/07/15 002 H.SAITO 修正中にインジケータを開いた場合、閉じたときに選択通知を送ってしまう不具合対応

				ModifyingFlag               = 0;                                //修正中フラグ(0:検査中,1:修正中)
				// 2005/08/01 002 H.SAITO #790 RUの自己排他エラーの対応
				DialogMode                  = "";                               //確認ダイアログのモード
				// 2006/11/21 PVCS#1770 H.SAITO -ST-
				//// 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ST-
				//ErrorDialogFlag             = 0;
				//// 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ED-
				// 2006/11/21 PVCS#1770 H.SAITO -ED-
				// 2005/12/21 PVCS#1713 H.SAITO -ST-
				PollingProcFlag             = 0;                                // ポーリング中フラグ(0:ポーリングしていない,1:ポーリング中のため再度のポーリング禁止) 
				// 2005/12/21 PVCS#1713 H.SAITO -ED-

				isView = 0;//09.10.15 FF 星野 CR検査画面で未撮影メニューが残った状態でビューアー起動出来ない件対応

				parent.INFORMATION_VIEW.Public_ClearInformation();              //患者情報表示領域のクリア
				Fn_SelectPageClear();                                           //撮影メニューリストのクリア
				document.getElementById("DIV_PatientFilmImage").innerHTML = ""; //処理済画像表示クリア
				// 080424 HSK由比 ガイダンス表示対応 ADD-ST
				document.getElementById("DIV_GuidanceImage").innerHTML      = ""; // ガイダンス表示画像クリア
				// 080424 HSK由比 ガイダンス表示対応 ADD-ED
        		break;

      		// 修正機能(修正完了)の戻り時の初期化
      		case "RETURN_FUNCTION":
				//初期化
				clearTimeout(StartProcTimeOutId);                               //検査開始/排他設定タイマのＩＤ
				clearTimeout(WatchImageTimeOutId);                              //ポーリング監視用タイマのＩＤ（サーバ,クライアント間の更新処理タイマ）
				clearTimeout(WatchImageInputId);                                //ポーリング用タイマのＩＤ（関数をループさせる）
				clearTimeout(NotifyTimeOutId);                                  //選択通知タイマのＩＤ
				clearTimeout(ChangeStateTimeOutId);                             //確認/確定/保留,排他開放タイマのＩＤ
				clearTimeout(TurnImageTimeOutId);                               //回転・反転・元に戻すタイマのＩＤ
				MaxPage                     = 0;                                //撮影メニューページの最大値
				SelectPageNo		            = -1;		                            //撮影リストページ選択番号
				SelectMenuPage              = -1;		                            //撮影メニュー選択ページ(1～)
				SelectMenuNo                = -1;		                            //撮影メニュー選択番号(1～)
				SelectNextPage              = -1;                               //撮影リスト次メニュー選択ページ(1～)
				SelectNextNo                = -1;                               //撮影リスト次メニュー選択番号(1～)
				SelectNextTable             = -1;                               //撮影リスト次メニューテーブル(1～4)
				DivViewCount                = 0;                                //だらだら表示途中経過カウント
				ResendCount                 = 1;                                //再送カウント
				NotifyLockFlagString        = "0";                              //メニュー選択通知ロックフラグ
				NotifySelectIdString        = "";                               //メニュー選択通知中画像シーケンス
				// 2005/12/17 PVCS#1713 H.SAITO -ST-
				NotifyFunctionString        = "";                               // 非選択通知要求を発行した機能（スタック）
				NotifyFunctionProcString    = "";                               // 非選択通知要求を発行した機能（実際にsubmitしたときの機能。処理完了後に呼ぶメソッドの切り分けに使う)
				// 2005/12/17 PVCS#1713 H.SAITO -ED-
				NotifyEndFlag               = "";                               //非選択通知を送ったときに"1"を入れる(インジケータによるコール,修正画面への遷移は含まない)
				parent.INFORMATION_VIEW.Public_ClearInformation();              //患者情報表示領域のクリア
				Fn_SelectPageClear();                                           //撮影メニューリストのクリア
				document.getElementById("DIV_PatientFilmImage").innerHTML = ""; //処理済画像表示クリア
				// 080424 HSK由比 ガイダンス表示対応 ADD-ST
				document.getElementById("DIV_GuidanceImage").innerHTML      = ""; // ガイダンス表示画像クリア
				// 080424 HSK由比 ガイダンス表示対応 ADD-ED
        		break;
    	}
	}
	catch(e){
		Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
	}
}
//2010/11/16 30501エラー対応 MOD ED
//*****************************************************************************
// Public_Init
//
// １．機能
//     画面を初期化する
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




    // 2005/07/13 003 H.SAITO 再送処理対応




    var i;
    var errorImageExistFlag = 0;

    // データ取得中はボタンを押下できないようにする
    Public_Message("NODIALOG", "");
    Fn_ButtonEnable(0);

    // 2005/07/15 003 H.SAITO 修正中にインジケータを開いた場合、閉じたときに選択通知を送ってしまう不具合対応




    // 検査画面に戻ってきたときはフラグを初期化する。




    ModifyingFlag           = 0; // 修正中フラグ(0:検査中,1:修正中)

    // 初起動か、修正完了か、キャンセルかを判断する
    switch(parent.ScreenStatus){
      // 初起動



      case parent.SCREEN_STATUS_INIT:	
		    //変数初期化  
		    Fn_Init("ALL");

        // 2005/06/29 006 H.SAITO 処理箇所変更 
        //// 2005/06/21 005 H.SAITO 検査排他の変更(Cookie) 保存箇所の共有化
        ////// 2005/05/14 003 H.SAITO 検査排他の変更(Cookie)
        ////// 検査画面起動中であることをクッキーに保存する(1:起動中,0:未起動)
        ////CreateCookie(COOKIE_NAME, 1);
        //top.SetCookie(COOKIE_NAME, 1);
        //----------------------------//
        //排他の管理スイッチを設定する//
        //----------------------------//
        ExclusiveModeRu           = EXCLUSIVE_SET;         // ＲＵの排他の設定／チェック 
        ExclusiveModeRuRelease    = EXCLUSIVE_DELL;        // ＲＵの排他の開放
        ExclusiveModeStudy        = EXCLUSIVE_SET_STUDY;   // 検査の排他の設定／チェック 
        ExclusiveModeStudyRelease = EXCLUSIVE_DELL_STUDY;  // 検査の排他の開放
        
        // 2005/12/20 PVCS#1711 H.SAITO -ST-
        ////検査開始通知のタイマ予約
        //StartProcTimeOutId = setTimeout("Fn_TimeOut('StartProc')", START_TIMEOUT);
        ////検査開始通知を行う
        //parent.STUDY_START_PROC.Public_StartProc(PROC_MODE, parent.StudySequence);
        // ProcModeをSTUDY_VIEW_INITとしてStudyDataGetProc内で検査の開始処理を実施する。
        if(parent.EndGetDataFlag != 1){
          parent.STUDYDATA_GET_PROC.Public_GetData(PROC_MODE_INIT, parent.StudySequence, ExclusiveModeRu, ExclusiveModeStudy);
        }
        else{
          Public_EndGetData();
        }
        // 2005/12/20 PVCS#1711 H.SAITO -ED-
        break;
      // 修正完了




      case parent.SCREEN_STATUS_MODIFY:
		    //変数初期化  
		    Fn_Init("RETURN_FUNCTION");
        //-----------------------------//
        //排他の管理スイッチを変更する //
        //-----------------------------//
        // すでに排他を取得しているためデータ取得時には排他を設定しない
        ExclusiveModeRu           = EXCLUSIVE_NOTHING;
        ExclusiveModeStudy        = EXCLUSIVE_NOTHING;

        // データの再取得
        parent.STUDYDATA_GET_PROC.Public_GetData(PROC_MODE, parent.StudySequence, ExclusiveModeRu, ExclusiveModeStudy);
        break;
      // 修正キャンセル
      case parent.SCREEN_STATUS_CANCEL:
        //不活性解除
        Fn_ButtonEnable(1);
        // 2005/06/25 005 H.SAITO PVCS:未登録 すべて既撮のとき、修正をキャンセルされると回転ボタンのみ活性化されないバグ修正
        if(parent.InputStatus[SelectMenuNo - 1] == STATE_COMPLETE){
          // 回転ボタン活性化
 		      Fn_RotateBtn_Enable(1);
        }
        // 選択通知とだらだら再開
        // 2005/12/17 PVCS#1713 H.SAITO -ST-
        //Public_OtherFunctionClose();
        Fn_Resume_After_OtherFunctionClose();
        // 2005/12/17 PVCS#1713 H.SAITO -ED-
        // ボタン押下禁止を解除
        Public_CloseMessage();
        break;
    }
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
	}
}
// 2005/12/20 PVCS#1711 H.SAITO -ST-
// StudyData_Get_Procの中で開始処理を実施するように変更したため削除
////*****************************************************************************
//// Public_EndStartProc
////
//// １．機能
////     検査開始通知後の処理
//// ２．戻り値
////　　  なし
//// ３．備考
////*****************************************************************************
//function Public_EndStartProc(){
//  try{
//    // タイマ予約解除
//    clearTimeout(StartProcTimeOutId);
//
//    // データ取得完了フラグが１以外ならばデータを取得する
//    if(parent.EndGetDataFlag != 1){
//	  // 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ST-
//      //parent.STUDYDATA_GET_PROC.Public_GetData(PROC_MODE, parent.StudySequence, ExclusiveModeRu, ExclusiveModeStudy);
//      // ProcModeをSTUDY_VIEW_INITとしてStudyDataGetProc内で検査の開始処理を実施する。
//      parent.STUDYDATA_GET_PROC.Public_GetData(PROC_MODE_INIT, parent.StudySequence, ExclusiveModeRu, ExclusiveModeStudy);
//	  // 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ED-
//    }
//    else{
//      Public_EndGetData();
//    }
//  }
//  catch(e){
//    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
//  }
//}
// 2005/12/20 PVCS#1711 H.SAITO -ED-
//*****************************************************************************
// Public_EndGetData
//
// １．機能
//     画面を表示する
// ２．戻り値
//　　  なし
// ３．備考
//*****************************************************************************
function Public_EndGetData(){
	try{
    var i;               // 添え字

    var cookieValue;     // クッキーの値
    var selectImageSeq;  // 最後に選択していた画像シーケンス
    var selectPage;      // 修正完了後に表示させるページ(1～

    var selectMenuNo;    // 修正完了後に表示させる番号(1～

    var selectMenuTable; // 修正完了後に表示させるページ内のテーブル番号(1～4)

// 080514 HSK由比 ガイダンス表示対応 ADD-ST
    var nextMenuShowGuidance = false;
// 080514 HSK由比 ガイダンス表示対応 ADD-ED
// 080519 HSK由比 ガイダンス表示対応 ADD-ST
    var nextMenuTopMenu = false;
// 080519 HSK由比 ガイダンス表示対応 ADD-ED
    // 2005/11/30 PVCS#1560 H.SAITO 排他エラーの見直し-ST-
    //// 2005/08/01 002 H.SAITO #790 RU排他の自己排他対応(RU自己排他エラー発生時はCookieチェックを行う)
    //var cookieCheckFlag = ""; // クッキー判定を実施するフラグ
    //// 2005/08/01 061 H.SAITO #790 RU排他の自己排他対応(RU自己排他エラー発生時はCookieチェックを行う)
    //// RU排他の自己排他エラー時はCookieによる判定処理を実施する(初画面表示時のみ)
    //if(parent.ScreenStatus == parent.SCREEN_STATUS_INIT){ // 初画面表示時は排他をセット
    //  // 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ST-
    //  // 対象となる検査が０件の場合
    //  if(parent.StudyExclusionErrorFlag == "2"){
    //    // 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ST-
    //    ErrorDialogFlag             = 1;
    //    // 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ED-
    //    Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_NODATA,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_NODATA,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_NODATA,"Cannt Get Message."), DIALOGPROCMODE_STUDY_ERROR);
    //    return;
    //  }
    //  // 2005/10/06 PVCS#1548 H.SAITO 排他を取るまでの間の処理で検査が削除された場合の不具合対応 -ED-
    //  // 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ST-
    //  if(parent.RuExclusionErrorFlag    == "1"){
    //    // 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ST-
    //    ErrorDialogFlag             = 1;
    //    // 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ED-
    //    Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_EXCLUSIVE_RU,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_EXCLUSIVE_RU,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_EXCLUSIVE_RU,"Cannt Get Message."), DIALOGPROCMODE_RU_ERROR); 
    //    return;
    //  }
    //  if(parent.StudyExclusionErrorFlag == "1"){
    //    // 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ST-
    //    ErrorDialogFlag             = 1;
    //    // 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ED-
    //    Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_EXCLUSIVE_STUDY,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_EXCLUSIVE_STUDY,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_EXCLUSIVE_STUDY,"Cannt Get Message."), DIALOGPROCMODE_STUDY_ERROR); 
    //    return;
    //  }
	  //  // 2005/10/27 PVCS#1571 H.SAITO CEのみ撮影終了/確定済みの検査は編集不可能とする -ST-
    //  //if(parent.CompletedErrorFlag      == "1"){
    //  if(parent.CompletedErrorFlag      == "1" && parent.OpenMode == OPEN_MODE_CE){
	  //  // 2005/10/27 PVCS#1571 H.SAITO CEのみ撮影終了/確定済みの検査は編集不可能とする -ED-
    //    // 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ST-
    //    ErrorDialogFlag             = 1;
    //    // 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ED-
    //    Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_COMPLETED,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_COMPLETED,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_COMPLETED,"Cannt Get Message."), DIALOGPROCMODE_COMPLETED_ERROR); 
    //    return;
    //  }
    //  // 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応 -ED-
    //  // ダイアログ表示前に排他取得状態をセットする      
    //  // RU,検査排他両方とも自己排他エラーがでていた場合は
    //  // 確認ダイアログのキャンセル時には排他の開放を実施しない
    //  if(parent.RuSelfExclusionErrorFlag   == "1" && parent.StudySelfExclusionErrorFlag == "1"){
    //    switch(parent.OpenMode){
    //      case OPEN_MODE_CE:
    //        top.ExclusiveState    = 0;
    //        break;
    //      case OPEN_MODE_WINDOW:
    //        parent.ExclusiveState = 0;
    //        break;      
    //    }
    //    // Cookieチェックを実施する
    //    cookieCheckFlag = 1;
    //  }
    //  // RUのみに自己排他エラーがでていた場合は
    //  // 確認ダイアログのキャンセル時には検査画面の排他のみ開放する
    //  if(parent.RuSelfExclusionErrorFlag   == "1" && parent.StudySelfExclusionErrorFlag == ""){
    //    switch(parent.OpenMode){
    //      case OPEN_MODE_CE:
    //        top.ExclusiveState    = 3;
    //        break;
    //      case OPEN_MODE_WINDOW:
    //        parent.ExclusiveState = 3;
    //        break;      
    //    }
    //    // Cookieチェックを実施する
    //    cookieCheckFlag = 1;
    //  }
    //}
    //// Cookieチェックを実施する
    //if(cookieCheckFlag){
    //  // Cookie情報取得
    //  cookieValue = top.GetCookie(COOKIE_STUDY_SEQ);
    //  // Cookieから取得した検査シーケンスによって処理を変える
    //  switch(cookieValue){
    //    // 検査中でない場合
    //    case null:
    //    case "":
    //      break;
    //    // 開始しようとした検査が検査中の検査と等しい場合
    //    case parent.StudySequence:
    //      // 確認メッセージ表示
    //      document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_ID_SELFRU,"");
    //      document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_ID_SELFRU,"");
    //      document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_WARNING_ID_SELFRU,"Cannt Get Message.");
    //      DialogMode = "DIALOG_SELFRU";
    //      Public_Confirm();
    //      return;      
    //    // 開始しようとした検査が検査中の検査と異なる場合(エラー)
    //    default:
    //      // エラーメッセージ表示
    //      DialogMode = "DIALOG_SELFRU";
    //      Fn_Error_SelfRu();
    //      return;     
    //  }
    //}
    //// 検査中の検査シーケンスをセットする
    //top.SetCookie(COOKIE_STUDY_SEQ, parent.StudySequence);
    if(parent.ScreenStatus == parent.SCREEN_STATUS_INIT){ // 初画面表示時は排他をセット
      //--------------------------//
      // ＲＵの排他エラーチェック //
      //--------------------------//
      //0000000000
      switch(parent.RuExclusionErrorFlag){
        case 0:
          break;
        //2009/08/21 Nishikawa Update-ST V6.0他検査終了待機対応
        //RUの自己排他は"3"
        case 3:
          if(parent.OpenMode == OPEN_MODE_CE){
            Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_EXCLUSIVE_RU,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_EXCLUSIVE_RU,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_EXCLUSIVE_RU,"Cannt Get Message."), DIALOGPROCMODE_RU_ERROR); 
            return;
          }
          break;
        //2009/08/21 Nishikawa Update-ED V6.0他検査終了待機対応
        case 4:
          // 2006/11/21 PVCS#1770 H.SAITO -ST-
          //ErrorDialogFlag             = 1;
          // 2006/11/21 PVCS#1770 H.SAITO -ED-
          Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_EXCLUSIVE_RU,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_EXCLUSIVE_RU,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_EXCLUSIVE_RU,"Cannt Get Message."), DIALOGPROCMODE_RU_ERROR); 
          return;
      }
      //--------------------------//
      // 検査の排他エラーチェック //
      //--------------------------//
      switch(parent.StudyExclusionErrorFlag){
        case 0:
          break;      
        case 3:
          break;
          //2009/08/21 Nishikawa Update-ST V6.0他検査終了待機対応
          //撮影画面フォームで検査の排他を取得するよう変更したため、自己排他制御は行わない
          //Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_EXCLUSIVE_STUDY,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_EXCLUSIVE_STUDY,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_EXCLUSIVE_STUDY,"Cannt Get Message."), DIALOGPROCMODE_STUDY_ERROR); 
          //return;
        case 4:
          // 2006/11/21 PVCS#1770 H.SAITO -ST-
          //ErrorDialogFlag             = 1;
          // 2006/11/21 PVCS#1770 H.SAITO -ED-
          //Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_EXCLUSIVE_STUDY,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_EXCLUSIVE_STUDY,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_EXCLUSIVE_STUDY,"Cannt Get Message."), DIALOGPROCMODE_STUDY_ERROR); 
          //return;
          if(parent.OpenMode == OPEN_MODE_CE){
            Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_EXCLUSIVE_STUDY,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_EXCLUSIVE_STUDY,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_EXCLUSIVE_STUDY,"Cannt Get Message."), DIALOGPROCMODE_STUDY_ERROR); 
            return;
          }
          break;
          //2009/08/21 Nishikawa Update-ED V6.0他検査終了待機対応
        // 対象となる検査が０件の場合
        case 5:
          // 2006/11/21 PVCS#1770 H.SAITO -ST-
          //ErrorDialogFlag             = 1;
          // 2006/11/21 PVCS#1770 H.SAITO -ED-
          Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_NODATA,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_NODATA,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_NODATA,"Cannt Get Message."), DIALOGPROCMODE_STUDY_ERROR);
          return;      
      }
      // ＣＥかつ確定ステータスの場合はエラーとする
      if(parent.CompletedErrorFlag == "1" && parent.OpenMode == OPEN_MODE_CE){
        // 2006/11/21 PVCS#1770 H.SAITO -ST-
        //ErrorDialogFlag             = 1;
        // 2006/11/21 PVCS#1770 H.SAITO -ED-
        Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_COMPLETED,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_COMPLETED,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_COMPLETED,"Cannt Get Message."), DIALOGPROCMODE_COMPLETED_ERROR); 
        return;
      }
      //2014.04.14 TYS会田 DR直結-CR撮影画面・画像確認モニタ対応 ADD-ST
      // ＣＥかつCR検査でない場合はエラーとする
      if(parent.CompletedErrorFlag == "2" && parent.OpenMode == OPEN_MODE_CE){
        Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_NOT_CR,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_NOT_CR,""),top.DispFrame.Public_GetLangMsgString(MSG_ERROR_NOT_CR,"Cannt Get Message."), DIALOGPROCMODE_COMPLETED_ERROR);
        return;
      }
      //2014.04.14 TYS会田 DR直結-CR撮影画面・画像確認モニタ対応 ADD-ED
    }
    // 2005/11/30 PVCS#1560 H.SAITO 排他エラーの見直し-ED-
    //2005/04/24 012 H.SAITO
    //排他取得状態(0:未取得,1:検査排他取得,2:検査,RU排他取得)
    if(ExclusiveModeStudy == EXCLUSIVE_SET_STUDY){
      switch(parent.OpenMode){
        case OPEN_MODE_CE:
          top.ExclusiveState    = 2;
          break;
        case OPEN_MODE_WINDOW:
          parent.ExclusiveState = 2;
          break;      
      }
      // 2005/07/21 006 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
      //// 2005/06/29 005 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
      //// 検査画面起動中であることをクッキーに保存する(1:起動中,0:未起動)
      //top.SetCookie(COOKIE_NAME, 1);
      //// 検査排他中であることをクッキーに保存する
      //top.AddCookie(COOKIE_NAME_STUDY2, parent.StudySequence);
    }

		//データ取得完了フラグをＯＮにする
    // 2005/12/19 PVCS#1713 H.SAITO -ST-
		//parent.EndGetData = 1;
		parent.EndGetDataFlag = 1;
    // 2005/12/19 PVCS#1713 H.SAITO -ED-

		//ユーザガイダンスの表示
//2005/05/24-ST==========
//		parent.INFORMATION_VIEW.Public_SetUserGuidance(UserGuidanceString); 
		parent.INFORMATION_VIEW.Public_SetUserGuidance(UserGuidanceString,0); 
//2005/05/24-EN==========
		//患者情報表示
		parent.INFORMATION_VIEW.Public_SetPatientId(parent.PatientId); 
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update Start
//		parent.INFORMATION_VIEW.Public_SetPatientSex(parent.PatientSex); 
		parent.INFORMATION_VIEW.Public_SetPatientSex(parent.PatientSex, parent.PatientsSexNeutred);
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update End
		parent.INFORMATION_VIEW.Public_SetPatientName(parent.PatientName, parent.PatientKanjiName);   
		parent.INFORMATION_VIEW.Public_SetPatientBirthDate(parent.PatientBirthDate);
		parent.INFORMATION_VIEW.Public_SetPatientAge(parent.PatientAge);

    //----------------//
    // データの初期化 //
    //----------------//
		for(i = 0; i < parent.DataCount; i++){
		  //画像の入力ステータスを初期化する
			if(parent.DataStatus[i] == STATE_NOT_SHOT){
				parent.InputStatus[i] = STATE_UNSHOT;
			}
			else{
				parent.InputStatus[i] = STATE_COMPLETE;
			}		
      //画像入力直後フラグを初期化する
      parent.ImageViewFlag[i] = 0;
    }

	//回転ボタン不活性化



	Fn_RotateBtn_Enable(2); 

    //修正ボタン活性化



    Fn_ModifyBtn_Enable(1);
    
    // 2014/03/06 TYS沼 DR直結対応 ADD START ------------------------------------------------
    // システム設定が有効の場合、処理を実施
    if(CONNECTINGDR_USE == 1)
    {
        // DR切替ボタン活性化
        for(i = 0; i < parent.DataCount; i++){
            //既撮の撮影メニューがあるか確認
            if(parent.InputStatus[i] == STATE_COMPLETE){
                Fn_DRChangeBtn_Enable(2);
                break;
            }
        }
    }
    // 2014/03/06 TYS沼 DR直結対応 ADD END ------------------------------------------------
    
    //撮影済画像数のカウントを更新
    //2009/06/12 Nishikawa Update-ST V6.0撮影画面最小化対応
    if(parent.OpenMode == OPEN_MODE_WINDOW){
      Fn_UpdateImgCount();
    }
    //2009/06/12 Nishikawa Update-ED V6.0撮影画面最小化対応

    //------------------------------------------//
    // 画面の表示モードによって処理を切り替える //
    //------------------------------------------//
    switch(parent.ScreenStatus){
      //--------------//
      // 初画面表示時 //
      //--------------//
      case parent.SCREEN_STATUS_INIT:    

        // 2005/07/13 030 H.SAITO 再送処理対応




        // 起動時に取得してきたエラー画像IDが"0"の場合:検査画面を開く




        // 起動時に取得してきたエラー画像IDが検査に存在する場合  ：入力を中断した検査を再開します - OK
        // 起動時に取得してきたエラー画像IDが検査に存在しない場合：入力を中断した検査と異なる検査を開始します - OK, キャンセル
        if(parent.InputErrorImageId != "0"){
          errorImageExistFlag = 0;
          // エラー画像IDが検査に存在するかを調べる




          for(var i = 0; i < parent.DataCount; i++){
            if(parent.ImageSeq[i] == parent.InputErrorImageId){
              errorImageExistFlag = 1;
            }
          }
          // 現在の検査にエラー画像IDが存在する
          if(errorImageExistFlag){
            ReSendMode = RESEND_MODE_ERROR_INPUT_IMAGE_AND_RESUME; //入力を中断した検査を再開するモード




            document.getElementById("TD_ConfirmTitle1_ReSend").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_INPUT_IMAGE_AND_RESUME,"");
            document.getElementById("TD_ConfirmTitle2_ReSend").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_INPUT_IMAGE_AND_RESUME,"");
            document.getElementById("TD_ConfirmText_ReSend").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_ERROR_INPUT_IMAGE_AND_RESUME,"Cannt Get Message.");
            Public_Confirm_ReSend();
            return;
          }
          // 現在の検査にエラー画像IDが存在しない




          else{
            ReSendMode = RESEND_MODE_ERROR_INPUT_IMAGE_NOT_RESUME; //入力を中断した検査以外の検査を再開するモード




            document.getElementById("TD_ConfirmTitle1_ReSend").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_INPUT_IMAGE_NOT_RESUME,"");
            document.getElementById("TD_ConfirmTitle2_ReSend").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_INPUT_IMAGE_NOT_RESUME,"");
            document.getElementById("TD_ConfirmText_ReSend").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_ERROR_INPUT_IMAGE_NOT_RESUME,"Cannt Get Message.");
            Public_Confirm_ReSend();
            return;
          }
        }
        // 2005/07/13 026 H.SAITO 再送処理対応 再送処理のダイアログ表示のため、以下の処理を別メソッドに置いて共通化する。




        ////先頭から未撮メニューを検索する
        //Fn_FindUnComp(0);
        // 
		    ////未撮メニューが存在するならば、該当の未撮メニューを選択し
		    ////画像取り込み状態監視（ポーリング）を開始する



		    //if(SelectNextTable > 0){  
			  //  SelectMenuPage  = SelectNextPage;
			  //  selectMenuTable = SelectNextTable;
		    //}
        ////未撮メニューが存在しない場合は先頭の既撮メニューを選択する



		    //else{
			  //  SelectMenuPage  = 1;
			  //  selectMenuTable = 1;
		    //}
		    //// ページを表示
		    //Fn_SelectPage(SelectMenuPage);	    
        //
        //// 撮影メニューの選択



        //Fn_OnSelectMenu(selectMenuTable);       
        //
    		////画像取り込み状態監視(ポーリング)スタート(Fn_OnSelectMenuの後に入れること!)
        //if(SelectNextTable > 0){
			  //  Fn_StartWatchImageInput();
        //}
        Fn_EndResendCheckProc();
        break;
      //------------//
      // 修正完了時 //
      //------------//
      case parent.SCREEN_STATUS_MODIFY:    
        // 表示するページの初期化





        selectPage      = 1;
        selectMenuNo    = -1;
        selectMenuTable = -1;

        // 修正前に撮影メニューを選択していた場合は
        // 選択していた撮影メニューを選択状態にする
        if(SelectImageSeqence){
          // 選択していた画像シーケンスを探す





          for(i = 0; i < parent.DataCount; i++){
            if(parent.ImageSeq[i] == SelectImageSeqence){
              // ページの計算





              selectPage      = Math.floor(i / MAXMENU) + 1;
              selectMenuNo    = i + 1;
              selectMenuTable = (i % MAXMENU) + 1;
            }
          }
        }
        //---------------------------------------------------//
        //先頭から未撮メニューを検索する(先頭から検索でＯＫ) //
        //---------------------------------------------------//
        Fn_FindUnComp(0);

        //選択している撮影メニューが存在する場合



        if(selectMenuTable != -1){
          //修正前に選択していたメニューを選択する



			    SelectMenuPage  = selectPage;
			    SelectMenuNo    = selectMenuNo;
			    SelectMenuTable = selectMenuTable;
          //未撮メニューがある場合は選択マークを表示し、ポーリングを開始する





          if(SelectNextTable > 0){
			      //画像取り込み状態監視(ポーリング)スタート





			      Fn_StartWatchImageInput();
          }
        }
        //選択している撮影メニューが存在していない場合





        else{
          //未撮メニューがある場合は
          //未撮メニューと同じものを表示
          if(SelectNextTable > 0){
			      SelectMenuPage  = SelectNextPage;
			      SelectMenuNo    = SelectNextNo;
			      SelectMenuTable = SelectNextTable;
			      //画像取り込み状態監視(ポーリング)スタート

// 080514 HSK由比 ガイダンス表示対応 ADD-ST
                  nextMenuShowGuidance = true;
// 080514 HSK由比 ガイダンス表示対応 ADD-ED



			      Fn_StartWatchImageInput();
          }
          //未撮メニューなしの場合は、





          //先頭のメニューを選択する         
          else{
			      SelectMenuPage  = 1;
			      SelectMenuNo    = 1;
			      SelectMenuTable = 1;
// 080519 HSK由比 ガイダンス表示対応 ADD-ST
                  nextMenuTopMenu = true;
// 080519 HSK由比 ガイダンス表示対応 ADD-ED
          }
        }
        // 選択画像表示位置の再計算





        document.getElementById("DIV_StudyMenu5").style.top  = SELECTMENU_TOP + SELECTMENU_TOP_REVICE * (SelectMenuTable - 1);
        document.getElementById("DIV_StudyMenu5").style.left = SELECTMENU_LEFT;

        // ページの表示
        Fn_SelectPage(SelectMenuPage);

        //----------------//
        // 処理済画像表示 //
        //----------------//
        // 選択中の撮影メニューが既撮ならば処理済画像を表示する
        //(次選択メニューが変わってしまうので、Fn_SelectMenu()は実施できないため。)
        if(parent.InputStatus[SelectMenuNo - 1] == STATE_COMPLETE){
          imageTagString = Fn_GetImageTag("NORMAL", SelectMenuNo);
          //画像表示
          document.getElementById("DIV_PatientFilmImage").innerHTML        = imageTagString;
// 080514 HSK由比 ガイダンス表示対応 ADD-ST
          // ガイダンス画像表示
          var guidanceTagString = Fn_GetImageTag(INPUT_MODE_GUIDANCE, SelectMenuNo);
          document.getElementById("DIV_GuidanceImage").innerHTML = guidanceTagString;
// 080514 HSK由比 ガイダンス表示対応 ADD-ED
// 080424 HSK由比 ガイダンス表示対応 UPDATE-ST
// 080514 HSK由比 ガイダンス表示対応 UPDATE-ST
//          Fn_ChangeDispMode(IMAGE_DISP);
// 080519 HSK由比 ガイダンス表示対応 ADD-ST
          // 先頭の既撮メニューが選択されたときはCR画像
          if(nextMenuTopMenu == true)
          {
            Fn_ChangeDispMode(IMAGE_DISP);
          }
          else
          {
            Fn_UpdateGuidanceToggleBtn();
            if(Fn_IsShowGuidance() == false)
            {
              if(parent.InputMode == "INPUT")
              {
                //回転ボタン不活性化
                Fn_RotateBtn_Enable(2);
              }
              else
              {
                //回転ボタン活性化
                Fn_RotateBtn_Enable(1);
              }
            }
            else
            {
              Fn_RotateBtn_Enable(2);
            }
          }
// 080519 HSK由比 ガイダンス表示対応 ADD-ED
// 080514 HSK由比 ガイダンス表示対応 UPDATE-ED
//          document.getElementById("DIV_PatientFilmImage").style.visibility = "visible";
//          //入力中でない場合のみ回転ボタンを活性化
//
//
//
//          if(parent.InputMode == "INPUT"){
//            //回転ボタン不活性化  
//            Fn_RotateBtn_Enable(2);
//          }
//          else{
//            //回転ボタン活性化    
//            Fn_RotateBtn_Enable(1);   
//          }
// 080424 HSK由比 ガイダンス表示対応 UPDATE-ST
        }
        //未撮の場合はボタンを不活性化





        else{
          //画像を非表示
          document.getElementById("DIV_PatientFilmImage").innerHTML  = "";
// 080827 HSK由比 ガイダンス表示対応 UPDATE-ST
          if(GUIDANCE_USE == 0)
          {
            document.getElementById("DIV_GuidanceImage").innerHTML = "";    // ガイダンス表示画像クリア

            Fn_ChangeDispMode(NOIMAGE_DISP);
          }
          else
          {
            // ガイダンス画像表示
            var guidanceTagString = Fn_GetImageTag(INPUT_MODE_GUIDANCE, SelectMenuNo);
            document.getElementById("DIV_GuidanceImage").innerHTML = guidanceTagString;

            if(nextMenuShowGuidance == true)
            {
              Fn_ChangeDispMode(GUIDANCE_DISP);
            }
            else
            {
              if(Fn_IsShowGuidance() == true)
              {
                Fn_ChangeDispMode(GUIDANCE_DISP);
              }
              else
              {
                Fn_ChangeDispMode(NOIMAGE_DISP);
              }
            }
          }
// 080514 HSK由比 ガイダンス表示対応 ADD-ST
//          // ガイダンス画像表示
//          var guidanceTagString = Fn_GetImageTag(INPUT_MODE_GUIDANCE, SelectMenuNo);
//          document.getElementById("DIV_GuidanceImage").innerHTML = guidanceTagString;
//// 080514 HSK由比 ガイダンス表示対応 ADD-ED
//// 080502 HSK由比 ガイダンス表示対応 UPDATE-ST
//// 080514 HSK由比 ガイダンス表示対応 UPDATE-ST
//          if(nextMenuShowGuidance == true)
//          {
//            Fn_ChangeDispMode(GUIDANCE_DISP);
//          }
//          else
//          {
//            if(Fn_IsShowGuidance() == true)
//            {
//              Fn_ChangeDispMode(GUIDANCE_DISP);
//            }
//            else
//            {
//              Fn_ChangeDispMode(NOIMAGE_DISP);
//            }
//          }
////          Fn_ChangeDispMode(NOIMAGE_DISP);
//// 080514 HSK由比 ガイダンス表示対応 UPDATE-ED
////          document.getElementById("DIV_PatientFilmImage").style.visibility = "hidden";
////
////          //回転ボタン不活性化
////
////
////
////
////
////          Fn_RotateBtn_Enable(2); 
//// 080502 HSK由比 ガイダンス表示対応 UPDATE-ED
// 080827 HSK由比 ガイダンス表示対応 UPDATE-ED
        }
        break;    
    }

    // ボタン押下禁止を解除
    Fn_ButtonEnable(1);
    Public_CloseMessage();
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
	}
}
// 2005/07/13 045 H.SAITO 再送処理対応




//*****************************************************************************
// Fn_EndResendCheckProc
//
// １．機能
//     画面を開いたときの再送処理判定の後に実施する処理



// ２．戻り値
//　　  なし



// ３．備考



//*****************************************************************************
function Fn_EndResendCheckProc(){
  try{
    //先頭から未撮メニューを検索する
    Fn_FindUnComp(0);

		//未撮メニューが存在するならば、該当の未撮メニューを選択し
		//画像取り込み状態監視（ポーリング）を開始する



		if(SelectNextTable > 0){  
			SelectMenuPage  = SelectNextPage;
			selectMenuTable = SelectNextTable;
		}
    //未撮メニューが存在しない場合は先頭の既撮メニューを選択する



		else{
			SelectMenuPage  = 1;
			selectMenuTable = 1;
		}
		// ページを表示
		Fn_SelectPage(SelectMenuPage);	    

    // 撮影メニューの選択



    Fn_OnSelectMenu(selectMenuTable);       

    //画像取り込み状態監視(ポーリング)スタート(Fn_OnSelectMenuの後に入れること!)
    if(SelectNextTable > 0){
			Fn_StartWatchImageInput();
    }

    // ボタン押下禁止を解除
    Fn_ButtonEnable(1);
    Public_CloseMessage();
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+58);
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
    var i;                     // 添え字



    // 2005/07/13 002 H.SAITO 再送処理対応




    var reSendMode;            // 再送処理モード退避用

		switch(tableNo){
			case 1: // 撮影メニュー①
			case 2: // 撮影メニュー②
			case 3: // 撮影メニュー③
			case 4: // 撮影メニュー④
				Fn_OnSelectMenu(tableNo);
				break;
			case 5: // 撮影メニュー⑤選択済みボタン(１～４)
				Fn_OnSelectMenu(SelectMenuTable);
				break;
			case 6: // 撮影メニュー⑥次取り込み画像(１～４)
				Fn_OnSelectMenu(SelectNextTable);
				break;
      //----------//
      // ↑ボタン //
      //----------//
			case 11: // CLICK
				Fn_SelectPage(SelectPageNo - 1);
        document.getElementById("IMG_UpBtn_Enable").src     = IMG_MENULIST_PREV;
        break;
      case 12: // MOUSEDOWN
        document.getElementById("IMG_UpBtn_Enable").src     = IMG_MENULIST_PREV_DOWN;
        break;
      case 13: // MOUSEOUT
        document.getElementById("IMG_UpBtn_Enable").src     = IMG_MENULIST_PREV;
        break;
      //----------//
      // ↓ボタン //
      //----------//
			case 15: // CLICK
				Fn_SelectPage(SelectPageNo + 1);
        document.getElementById("IMG_DownBtn_Enable").src   = IMG_MENULIST_NEXT;
				break;
      case 16: // MOUSEDOWN
        document.getElementById("IMG_DownBtn_Enable").src   = IMG_MENULIST_NEXT_DOWN;
        break;
      case 17: // MOUSEOUT
        document.getElementById("IMG_DownBtn_Enable").src   = IMG_MENULIST_NEXT;
        break;
	    //----------//
	    //修正ボタン//
	    //----------//
			case 21: // CLICK(排他の開放しない)
        //不活性時は何もしない
        if(document.getElementById("DIV_ModifyText").style.color != "black"){
          return;
        }
        //#1432 2005/09/17--ST
        if(ModifyDispFlag ==0 && OPEN_MODE != CE_MODE){
          return;
        }
        //#1432 2005/09/17--EN
        //入力中は何もしない
        if(parent.InputMode == "INPUT"){
          return;
        }
        // 操作ログ出力
        Fn_WriteLog(CTRL_MODIFY);

        //選択していた画像シーケンスを退避。
        //修正から戻ってきたときに、退避していた画像シーケンスを戻すが、
        //メニューが削除されている場合があるので、画像シーケンスがなければ次のやつを探しに行くこと
        SelectImageSeqence = parent.ImageSeq[SelectMenuNo - 1];
        // 2005/12/17 PVCS#1713 H.SAITO -ST-
        ////他機能呼び出し時の非選択通知
        //Public_OtherFunctionOpen();
        //修正機能呼び出し時の非選択通知
        Fn_ModifyFunctionOpen(REQUEST_NOTIFY);
        // 2005/12/17 PVCS#1713 H.SAITO -ED-
        // 2005/07/15 003 H.SAITO 修正中にインジケータを開いた場合、閉じたときに選択通知を送ってしまう不具合対応
        // 修正中フラグをONにする。
        ModifyingFlag           = 1; // 修正中フラグ(0:検査中,1:修正中)
        // 2005/12/17 PVCS#1713 H.SAITO -ST-
        //修正機能への遷移は非選択通知が完了した戻りを受けてから実施する。

				//parent.Public_End(PROC_MODE, COMMAND_MODE_MODIFY, "");
        // 2005/12/17 PVCS#1713 H.SAITO -ED-
		    document.getElementById("IMG_ModifyBtn_Enable").src = IMG_MODIFY;
				break;
      case 22: // MOUSEDOWN
		    document.getElementById("IMG_ModifyBtn_Enable").src = IMG_MODIFY_DOWN;
        break;
      case 23: // MOUSEOUT
		    document.getElementById("IMG_ModifyBtn_Enable").src = IMG_MODIFY;
        break;
      //----------//
      // 元に戻す //
      //----------//
			case 31: // CLICK
        //不活性時は何もしない
// 080516 HSK由比 ガイダンス表示対応 UPDATE-ST
        if(document.getElementById("IMG_UndoBtn_Enable").style.visibility != "visible"){
//        if(document.getElementById("DIV_UndoText").style.color != "black"){
// 080516 HSK由比 ガイダンス表示対応 UPDATE-ED
          return;
        }
        //入力中は何もしない
        if(parent.InputMode == "INPUT"){
          return;
        }
        //操作ログの出力
        Fn_WriteLog(CTRL_TURN_DEFAULT);
        //元に戻す
        Fn_TurnImage(TURN_DEFAULT);

		    document.getElementById("IMG_UndoBtn_Enable").src = IMG_DEFAULT;
				break;
      case 32: // MOUSEDOWN
		    document.getElementById("IMG_UndoBtn_Enable").src = IMG_DEFAULT_DOWN;
        break;
      case 33: // MOUSEOUT
		    document.getElementById("IMG_UndoBtn_Enable").src = IMG_DEFAULT;
        break;
      //--------------//
      // 左９０°回転 //
      //--------------//
			case 41: // CLICK
        //不活性時は何もしない
// 080516 HSK由比 ガイダンス表示対応 UPDATE-ST
        if(document.getElementById("IMG_TurnLeftBtn_Enable").style.visibility != "visible"){
//        if(document.getElementById("DIV_TurnLeftText").style.color != "black"){
// 080516 HSK由比 ガイダンス表示対応 UPDATE-ED
          return;
        }
        //入力中は何もしない
        if(parent.InputMode == "INPUT"){
          return;
        }
        //操作ログの出力
			  Fn_WriteLog(CTRL_TURN_LEFT90);
        //左９０°回転
        Fn_TurnImage(TURN_LEFT90);

		    document.getElementById("IMG_TurnLeftBtn_Enable").src = IMG_TURN_LEFT90;
				break;
      case 42: // MOUSEDOWN
		    document.getElementById("IMG_TurnLeftBtn_Enable").src = IMG_TURN_LEFT90_DOWN;
        break;
      case 43: // MOUSEOUT
		    document.getElementById("IMG_TurnLeftBtn_Enable").src = IMG_TURN_LEFT90;
        break;
      //--------------//
      // 右９０°回転 //
      //--------------//
			case 51: // CLICK
        //不活性時は何もしない
// 080516 HSK由比 ガイダンス表示対応 UPDATE-ST
        if(document.getElementById("IMG_TurnRightBtn_Enable").style.visibility != "visible"){
//        if(document.getElementById("DIV_TurnRightText").style.color != "black"){
// 080516 HSK由比 ガイダンス表示対応 UPDATE-ED
          return;
        }
        //入力中は何もしない
        if(parent.InputMode == "INPUT"){
          return;
        }
        //操作ログの出力
			  Fn_WriteLog(CTRL_TURN_RIGHT90);
        //右９０°回転
        Fn_TurnImage(TURN_RIGHT90);

		    document.getElementById("IMG_TurnRightBtn_Enable").src = IMG_TURN_RIGHT90;
				break;  
      case 52: // MOUSEDOWN
		    document.getElementById("IMG_TurnRightBtn_Enable").src = IMG_TURN_RIGHT90_DOWN;
        break;
      case 53: // MOUSEOUT
		    document.getElementById("IMG_TurnRightBtn_Enable").src = IMG_TURN_RIGHT90;
        break;
      //--------------//
      // １８０°回転 //
      //--------------//
			case 61:
        //不活性時は何もしない
// 080516 HSK由比 ガイダンス表示対応 UPDATE-ST
        if(document.getElementById("IMG_Turn180Btn_Enable").style.visibility != "visible"){
//        if(document.getElementById("DIV_Turn180Text").style.color != "black"){
// 080516 HSK由比 ガイダンス表示対応 UPDATE-ED
          return;
        }
        //入力中は何もしない
        if(parent.InputMode == "INPUT"){
          return;
        }
         
        //操作ログの出力
			  Fn_WriteLog(CTRL_TURN_180);
        //１８０°回転
        Fn_TurnImage(TURN_180);

		    document.getElementById("IMG_Turn180Btn_Enable").src = IMG_TURN_180;
				break;
      case 62: // MOUSEDOWN
		    document.getElementById("IMG_Turn180Btn_Enable").src = IMG_TURN_180_DOWN;
        break;
      case 63: // MOUSEOUT
		    document.getElementById("IMG_Turn180Btn_Enable").src = IMG_TURN_180;
        break;
      //----------//
      // 左右回転 //
      //----------//
			case 71: // CLICK
        //不活性時は何もしない
// 080516 HSK由比 ガイダンス表示対応 UPDATE-ST
        if(document.getElementById("IMG_ReverseBtn_Enable").style.visibility != "visible"){
//        if(document.getElementById("DIV_ReverseText").style.color != "black"){
// 080516 HSK由比 ガイダンス表示対応 UPDATE-ED
          return;
        }
        //入力中は何もしない
        if(parent.InputMode == "INPUT"){
          return;
        }

        //操作ログの出力
			  Fn_WriteLog(CTRL_TURN_REVERSE);
        //左右回転
        Fn_TurnImage(TURN_REVERSE);

		    document.getElementById("IMG_ReverseBtn_Enable").src = IMG_TURN_REVERSE;
				break;
      case 72: // MOUSEDOWN
		    document.getElementById("IMG_ReverseBtn_Enable").src = IMG_TURN_REVERSE_DOWN;
        break;
      case 73: // MOUSEOUT
		    document.getElementById("IMG_ReverseBtn_Enable").src = IMG_TURN_REVERSE;
        break;
      // 2014/03/06 TYS沼 DR直結対応 ADD START ------------------------------------------------
      //------------------------------//
      // DR切替                       //
      //------------------------------//
      case 78: // ONCLICK
        //不活性時は何もしない
        if(document.getElementById("IMG_DRChangeBtn_Enable").style.visibility != "visible"){
          return;
        }

        // 検査や未撮メニューの削除を行わないため、フラグ初期化
        DeleteModeAtConfirm       = DELETE_NOMENU;
        DeleteUnShotImageSequence = "";
        // 操作ログを出力
        Fn_WriteLog(CTRL_DRCHANGE);
        
        Fn_EndProc(COMMAND_MODE_DRCHANGE);

        document.getElementById("IMG_DRChangeBtn_Enable").src = IMG_DRCHANGE;
        break;
      case 79: // ONMOUSEDOWN
        document.getElementById("IMG_DRChangeBtn_Enable").src = IMG_DRCHANGE_DOWN;
        break;
      case 80: // ONMOUSEOUT
        document.getElementById("IMG_DRChangeBtn_Enable").src = IMG_DRCHANGE;
        break;
      // 2014/03/06 TYS沼 DR直結対応 ADD END ------------------------------------------------
     //------------------------------//
     // 保留 (ビューアーモード表示時)//
     //------------------------------//
			case 81: //ONCLICK

        // 検査や未撮メニューの削除を行わないため、フラグ初期化
        DeleteModeAtConfirm       = DELETE_NOMENU;
        DeleteUnShotImageSequence = ""; 
        // 操作ログを出力
			  Fn_WriteLog(CTRL_SUSPEND);
        // 2005/12/17 PVCS#1713 H.SAITO -ST-
				////保留実施⇒排他開放
        //Fn_StateChange(COMMAND_MODE_SUSPEND, "");
        // まず非選択通知を送り、完了してから次の処理を実施する。
        
        Fn_EndProc(COMMAND_MODE_SUSPEND);
        // 2005/12/17 PVCS#1713 H.SAITO -ED-
		    document.getElementById("IMG_SuspendBtn_Enable").src = IMG_SUSPEND;
				break;
      case 82: //ONMOUSEDOWN
		    document.getElementById("IMG_SuspendBtn_Enable").src = IMG_SUSPEND_DOWN;
        break;
      case 83: //ONMOUSEOUT
		    document.getElementById("IMG_SuspendBtn_Enable").src = IMG_SUSPEND;
        break;
     //--------------------------------//
     // 保留 (ビューアーモード非表示時)//
     //--------------------------------//
			case 85: //ONCLICK
        // 検査や未撮メニューの削除を行わないため、フラグ初期化
        DeleteModeAtConfirm       = DELETE_NOMENU;
        DeleteUnShotImageSequence = ""; 
        // 操作ログを出力
			  Fn_WriteLog(CTRL_SUSPEND);
        // 2005/12/17 PVCS#1713 H.SAITO -ST-
				////保留実施⇒排他開放
        //Fn_StateChange(COMMAND_MODE_SUSPEND, "");
        // まず非選択通知を送り、完了してから次の処理を実施する。

        Fn_EndProc(COMMAND_MODE_SUSPEND);
        // 2005/12/17 PVCS#1713 H.SAITO -ED-
		    document.getElementById("IMG_SuspendBtn2_Enable").src = IMG_SUSPEND2;
				break;
      case 86: //ONMOUSEDOWN
		    document.getElementById("IMG_SuspendBtn2_Enable").src = IMG_SUSPEND2_DOWN;
        break;
      case 87: //ONMOUSEOUT
		    document.getElementById("IMG_SuspendBtn2_Enable").src = IMG_SUSPEND2;
        break;
     //------------------//
     // ビューアーモード //
     //------------------//
			case 91: //ONCLICK
			
        //不活性時は何もしない
        if(document.getElementById("DIV_ViewText").style.color != "black"){
          return;
        }
        //入力中は何もしない
        if(parent.InputMode == "INPUT"){
          return;
        }
                
        document.getElementById("IMG_ViewBtn_Enable").src = IMG_VIEW;
        // 2005/12/17 PVCS#1713 H.SAITO -ST-
        // 操作ログを出力
  	    Fn_WriteLog(CTRL_VIEW);
        // 2005/12/17 PVCS#1713 H.SAITO -ED-
        
			  // ビューアーモードボタンが押下されたことを保持
        PushedButton = COMMAND_MODE_VIEW;   //NOTVIEW_V60_0822
        //PushedButton = COMMAND_MODE_COMPLETED;//NOTVIEW_V60_0822
        isView = 1; //09.10.15 FF 星野 CR検査画面で未撮影メニューが残った状態でビューアー起動出来ない件対応

        // 2005/12/17 PVCS#1713 H.SAITO -ST-
        ////----------------------------//
        //// 未撮の撮影メニューを数える //
        ////----------------------------//
        //DeleteUnShotImageSequence = new Array();
        //for(i = 0; i < parent.DataCount; i++){
        //  //未撮の撮影メニューがあれば送信データとして保持する
        //  if(parent.InputStatus[i] == STATE_UNSHOT){
        //    DeleteUnShotImageSequence.push(parent.ImageSeq[i]);
        //  }
        //}
        //// 未撮メニューの数によって未撮メニューの削除/削除しないを決める
        //switch(DeleteUnShotImageSequence.length){
        //  // すべて既撮のためビューアーモード実施
        //  case 0:
        //    DeleteModeAtConfirm = DELETE_NOMENU;
        //    // 2005/06/24 003 H.SAITO PVCS#350 権限、認証チェック箇所を変更
        //    //Fn_CheckCommand(COMMAND_MODE_VIEW, "");
        //    Fn_StateChange(COMMAND_MODE_VIEW, "");
        //    break;
        //  // すべて未撮のため、ビューアーモードに遷移できない
        //  case parent.DataCount:
////            Public_ErrorDisplay(RETRY_ERROR, 31520, FILE_NAME, 0);
        //		Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_NOMOVE_VIEWMODE,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_NOMOVE_VIEWMODE,""),top.DispFrame.Public_GetLangMsgString(MSG_NOMOVE_VIEWMODE,"Cannt Get Message.")); 
        //    break;
        //  // １つ以上の未撮を削除してからビューアーモード実施するため,確認ダイアログ表示
        //  default:
        //    DeleteModeAtConfirm = DELETE_UNSHOTMENU;
////            document.getElementById("TD_ConfirmText").innerHTML = UnshotMenuDeleteString;
        //    document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_DELETE_UNSHOT,"");
        //    document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_DELETE_UNSHOT,"");
        //    document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_DELETE_UNSHOT,"Cannt Get Message.");
        //    Public_Confirm();
        //    break;
        //}
        // まず非選択通知を送り、完了してから次の処理を実施する。
        
        Fn_EndProc(COMMAND_MODE_VIEW);   //NOTVIEW_V60_0822
        //Fn_EndProc(COMMAND_MODE_COMPLETED);//NOTVIEW_V60_0822
        // 2005/12/17 PVCS#1713 H.SAITO -ED-
				break;
      case 92: //ONMOUSEDOWN
        document.getElementById("IMG_ViewBtn_Enable").src = IMG_VIEW_DOWN;
        break;
      case 93: //ONMOUSEOUT
        document.getElementById("IMG_ViewBtn_Enable").src = IMG_VIEW;
        break;
     //------//
     // 確認 //
     //------//
			case 101: //ONCLICK
			
        //不活性時は何もしない
        if(document.getElementById("DIV_UpdateText").style.color != "black"){
          return;
        }
        //入力中は何もしない
        if(parent.InputMode == "INPUT"){
          return;
        }
                
        document.getElementById("IMG_UpdateBtn_Enable").src = IMG_UPDATE;
        
        // 2005/12/17 PVCS#1713 H.SAITO -ST-
        // 操作ログを出力
	      Fn_WriteLog(CTRL_COMPLETED);
        // 2005/12/17 PVCS#1713 H.SAITO -ED-

			  // 確認ボタンが押下されたことを保持
        PushedButton = COMMAND_MODE_COMPLETED;

        // 2005/12/17 PVCS#1713 H.SAITO -ST-
        ////----------------------------//
        //// 未撮の撮影メニューを数える //
        ////----------------------------//
        //DeleteUnShotImageSequence = new Array();
        //for(i = 0; i < parent.DataCount; i++){
        //  //未撮の撮影メニューがあれば送信データとして保持する
        //  if(parent.InputStatus[i] == STATE_UNSHOT){
        //    DeleteUnShotImageSequence.push(parent.ImageSeq[i]);
        //  }
        //}
        //// 未撮メニューの数によって検査削除/未撮メニューの削除/削除しないを決める
        //switch(DeleteUnShotImageSequence.length){
        //  // すべて既撮のため確認実施
        //  case 0:
        //    DeleteModeAtConfirm = DELETE_NOMENU;
        //    // 2005/06/24 003 H.SAITO PVCS#350 権限、認証チェック箇所を変更
        //    //Fn_CheckCommand(COMMAND_MODE_COMPLETED, "");
        //    Fn_StateChange(COMMAND_MODE_COMPLETED, "");
        //    break;
        //  // すべて未撮のため、検査ごと削除する確認を行う(検査の削除時は未撮メニューの画像シーケンスは不要のため送らない)
        //  case parent.DataCount:
        //    DeleteModeAtConfirm = DELETE_STUDY;
        //    DeleteUnShotImageSequence = "";
////            document.getElementById("TD_ConfirmText").innerHTML = StudyDeleteString;
        //    document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_DELETE_STUDY,"");
        //    document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_DELETE_STUDY,"");
        //    document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_DELETE_STUDY,"Cannt Get Message.");
        //    Public_Confirm();
        //    break;
        //  // １つ以上の未撮を削除する確認を行う
        //  default:
        //    DeleteModeAtConfirm = DELETE_UNSHOTMENU;
////            document.getElementById("TD_ConfirmText").innerHTML = UnshotMenuDeleteString;
        //    document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_DELETE_UNSHOT,"");
        //    document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_DELETE_UNSHOT,"");
        //    document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_DELETE_UNSHOT,"Cannt Get Message.");
        //    Public_Confirm();
        //    break;
        //}
        // まず非選択通知を送り、完了してから次の処理を実施する。

        Fn_EndProc(COMMAND_MODE_COMPLETED);
        // 2005/12/17 PVCS#1713 H.SAITO -ED-
				break;
			case 102: //ONMOUSEDOWN
        document.getElementById("IMG_UpdateBtn_Enable").src = IMG_UPDATE_DOWN;
				break;
			case 103: //ONMOUSEOUT
        document.getElementById("IMG_UpdateBtn_Enable").src = IMG_UPDATE;
				break;
      //----------------//
      // 確認ＯＫボタン //
      //----------------//
			case 111:  //ONCLICK
        // 確認ダイアログ非表示
        Public_CloseConfirm();
        // 2005/11/30 PVCS#1560 H.SAITO 排他エラーの見直し(自己排他エラーによる続行は不要のため削除) -ST-
        //// 2005/08/01 018 H.SAITO #790 RU自己排他エラー対応 
        ////// 押下されていたボタンの処理を実施
        ////// 2005/06/24 003 H.SAITO PVCS#350 権限、認証チェック箇所を変更
        //////Fn_CheckCommand(PushedButton, "");
        ////Fn_StateChange(PushedButton, "");
        //// モードに応じたダイアログ処理
        //switch(DialogMode){
        //  case "DIALOG_SELFRU":
        //    // RU,検査の排他エラーのフラグを初期化し、再びEndGetData()処理を実施する
        //    parent.RuSelfExclusionErrorFlag    = "";
        //    parent.StudySelfExclusionErrorFlag = "";
        //    DialogMode = "";
        //    Public_EndGetData();
        //    break;
        //  default:
        //    Fn_StateChange(PushedButton, "");
        //    break;
        //}
        Fn_StateChange(PushedButton, "");
        
        //09.10.15 FF 星野 CR検査画面で未撮影メニューが残った状態でビューアー起動出来ない件対応
        if(isView == 1)
        {
			isView = 0;
			window.external.IndicateEndStatus(ENDST_VIEWER);
        }
        
        // 2005/11/30 PVCS#1560 H.SAITO 排他エラーの見直し(自己排他エラーによる続行は不要のため削除) -ED-
        document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK;
				break;
			case 112:  //ONMOUSEDOWN
        document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK_DOWN;
				break;
			case 113: //ONMOUSEOUT
        document.getElementById("IMG_ConfirmOkButton").src = IMG_CONF_OK;
				break;
      //----------------------//
      // 確認キャンセルボタン //
      //----------------------//
			case 121: //ONCLICK
			
        // 確認キャンセル
        Public_CloseConfirm();
        isView = 0;//09.10.15 FF 星野 CR検査画面で未撮影メニューが残った状態でビューアー起動出来ない件対応
        // 2005/11/30 PVCS#1560 H.SAITO 排他エラーの見直し(自己排他エラーによる続行は不要のため削除) -ST-
        //// 2005/08/01 018 H.SAITO #790 RU自己排他エラー対応 
        //// モードに応じたダイアログ処理
        //switch(DialogMode){
        //  // RU,検査の排他エラーのフラグに応じた終了処理(排他開放)を実施する
        //  case "DIALOG_SELFRU":
        //    DialogMode = "";
        //    // RU,検査排他両方とも自己排他エラーがでていた場合は
        //    // 確認ダイアログのキャンセル時には排他の開放を実施しない
        //    if(parent.RuSelfExclusionErrorFlag   == "1" && parent.StudySelfExclusionErrorFlag == "1"){
        //      ExclusiveModeRuRelease    = EXCLUSIVE_NOTHING;
        //      ExclusiveModeStudyRelease = EXCLUSIVE_NOTHING;
        //    }
        //    // RUのみに自己排他エラーがでていた場合は
        //    // 確認ダイアログのキャンセル時には検査の排他のみ開放する
        //    if(parent.RuSelfExclusionErrorFlag   == "1" && parent.StudySelfExclusionErrorFlag == ""){
        //      ExclusiveModeRuRelease    = EXCLUSIVE_NOTHING;
        //      ExclusiveModeStudyRelease = EXCLUSIVE_DELL_STUDY;
        //    }
        //    //排他開放処理
        //    Fn_Exclusive(COMMAND_MODE_STUDY_CANCEL, "");
        //    break;
        //  default:
        //    break;
        //}
        // 2005/11/30 PVCS#1560 H.SAITO 排他エラーの見直し(自己排他エラーによる続行は不要のため削除) -ED-

        // 2005/12/17 PVCS#1713 H.SAITO -ST-
        // 終了処理で未撮データチェックでの確認キャンセル時は
        // 未撮メニューが必ず存在しているため、再開処理を実施する。
        switch(EndProcStatus){
          case ENDPROC_STATUS_CHECKDATA:
            // 処理中表示解除
            Public_CloseMessage();
            // 再開
            Fn_Resume_After_EndProcCancel();
            break;        
        }
        // 2005/12/17 PVCS#1713 H.SAITO -ED-
        document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG;
				break;
			case 122: //ONMOUSEDOWN
        document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG_DOWN;
				break;
			case 123: //ONMOUSEOUT
        document.getElementById("IMG_ConfirmCancelButton").src = IMG_CONF_NG;
				break;
      // 2005/07/13 056 H.SAITO 再送処理対応 再送処理ダイアログボックス専用
      //------------------------//
      // 確認ＯＫボタン(再送用) //
      //------------------------//
			case 131:  //ONCLICK
        reSendMode = ReSendMode; // 再送処理のモードをクリアするため、退避する。




        ReSendMode = "";         // 再送処理モードをクリアする
        // 確認ダイアログ非表示
        Public_CloseConfirm_ReSend();
        
        // 再送処理のモードによってOKボタン押下時の処理をわける



        switch(reSendMode){
          case RESEND_MODE_ERROR_INPUT_IMAGE:            //画像入力中にエラーが発生した場合のモード...OK
            // エラーが起こった画像IDを再選択



            Fn_ReSelect(parent.InputErrorImageId);
            break;
          case RESEND_MODE_ERROR_IMAGE_PROC:             //画像処理中にエラーが発生した場合のモード...OK
            // [暫定処置]OKボタン押下後、ダイアログを閉じて再選択をせずにそのままにする。


            Public_CloseConfirm_ReSend();
            break;
          case RESEND_MODE_ERROR_INPUT_IMAGE_AND_RESUME: //入力を中断した検査を再開するモード...OK
				//2007/03/08 PVCS#2109 K.HOSHINO 中断再開時に呼び出すメソッドを変更--START
				Fn_Discontinue(parent.InputErrorImageId);
				break;
				//2007/03/08 PVCS#2109 K.HOSHINO 中断再開時に呼び出すメソッドを変更--END
          case RESEND_MODE_ERROR_INPUT_IMAGE_NOT_RESUME: //入力を中断した検査以外の検査を再開するモード...OK,Cancel
            Fn_EndResendCheckProc();
            break;
          default:
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+59);
            break;
        }
        document.getElementById("IMG_ConfirmOkButton_ReSend").src = IMG_CONF_OK;
				break;
			case 132:  //ONMOUSEDOWN
        document.getElementById("IMG_ConfirmOkButton_ReSend").src = IMG_CONF_OK_DOWN;
				break;
			case 133: //ONMOUSEOUT
        document.getElementById("IMG_ConfirmOkButton_ReSend").src = IMG_CONF_OK;
				break;
      //------------------------------//
      // 確認キャンセルボタン(再送用) //
      //------------------------------//
			case 141: //ONCLICK
        // 確認キャンセル
        Public_CloseConfirm_ReSend();
        //入力を中断した検査以外の検査を再開するモードでのキャンセルのため、遷移元画面へ。
        //データの排他を開放してから遷移元画面へ。
        //排他開放処理
        Fn_Exclusive(COMMAND_MODE_STUDY_CANCEL, "");
        document.getElementById("IMG_ConfirmCancelButton_ReSend").src = IMG_CONF_NG;
				break;
			case 142: //ONMOUSEDOWN
        document.getElementById("IMG_ConfirmCancelButton_ReSend").src = IMG_CONF_NG_DOWN;
				break;
			case 143: //ONMOUSEOUT
        document.getElementById("IMG_ConfirmCancelButton_ReSend").src = IMG_CONF_NG;
				break;
		  // 2005/08/01 029 H.SAITO #790 RU自己排他エラー対応
      //--------------------------//
      // 自己排他エラーＯＫボタン //
      //--------------------------//
			case 151: //ONCLICK
        // モードに応じたダイアログ処理
        // 2005/11/30 PVCS#1560 H.SAITO 排他エラーの見直し(自己排他エラーによる続行は不要のため削除) -ST-
        //switch(DialogMode){
        //  // RU,検査の排他エラーのフラグに応じた終了処理(排他開放)を実施する
        //  case "DIALOG_SELFRU":
        //    Fn_CloseError_SelfRu();
        //    DialogMode = "";
        //    // RU,検査排他両方とも自己排他エラーがでていた場合は
        //    // 確認ダイアログのキャンセル時には排他の開放を実施しない
        //    if(parent.RuSelfExclusionErrorFlag   == "1" && parent.StudySelfExclusionErrorFlag == "1"){
        //      ExclusiveModeRuRelease    = EXCLUSIVE_NOTHING;
        //      ExclusiveModeStudyRelease = EXCLUSIVE_NOTHING;
        //    }
        //    // RUのみに自己排他エラーがでていた場合は
        //    // 確認ダイアログのキャンセル時には検査の排他のみ開放する
        //    if(parent.RuSelfExclusionErrorFlag   == "1" && parent.StudySelfExclusionErrorFlag == ""){
        //      ExclusiveModeRuRelease    = EXCLUSIVE_NOTHING;
        //      ExclusiveModeStudyRelease = EXCLUSIVE_DELL_STUDY;
        //    }
        //    //排他開放処理
        //    Fn_Exclusive(COMMAND_MODE_STUDY_CANCEL, "");
        //    break;
        //  default:
        //    break;
        //}
        // 2005/11/30 PVCS#1560 H.SAITO 排他エラーの見直し(自己排他エラーによる続行は不要のため削除) -ED-
		    document.getElementById("IMG_ErrorButton_SelfRu").src = "../Bmp/cmOvalAGreenLBtnU.gif";
				break;
			case 152: //ONMOUSEDOWN
		    document.getElementById("IMG_ErrorButton_SelfRu").src = "../Bmp/cmOvalAGreenLBtnD.gif";
				break;
			case 153: //ONMOUSEOUT
		    document.getElementById("IMG_ErrorButton_SelfRu").src = "../Bmp/cmOvalAGreenLBtnU.gif";
				break;
// 080424 HSK由比 ガイダンス表示対応 ADD-ST
      //--------------------//
      // ガイダンス表示切替 //
      //--------------------//
        case 161: // CLICK
          // 操作ログの出力
          Fn_WriteLog(CTRL_SWITCH_GUIDANCE);
          // ガイダンス表示切替
          Fn_SwitchGuidance();
          break;
        case 162: // MOUSEDOWN
          document.getElementById("IMG_GuidanceToggleBtn_Enable").src = IMG_SHOW_GUIDANCE_DOWN;
          break;
        case 163: // MOUSEOUT
          Fn_UpdateGuidanceToggleBtn();
          break;
// 080418 HSK由比 ガイダンス表示対応 ADD-ED

// 2009/06/12 Nishikawa Update-ST V6.0撮影画面最小化対応
    //------------------//
    // 簡易表示ボタン   //
    //------------------//
      case 171: //ONCLICK
        if(parent.OpenMode == OPEN_MODE_WINDOW){
          window.external.ShowSimpleMode();
        }
				document.getElementById("IMG_SimpleBtn_Enable").src = IMG_SIMPLE;
        break;
			case 172: // MOUSEDOWN
          document.getElementById("IMG_SimpleBtn_Enable").src = IMG_SIMPLE_DOWN;
          break;
      case 173: // MOUSEOUT
          document.getElementById("IMG_SimpleBtn_Enable").src = IMG_SIMPLE;
          break;
// 2009/06/12 Nishikawa Update-ED V6.0撮影画面最小化対応

      // 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応(ダイアログが使いづらいので、インタフェース見直し）-ST-
      //------------------//
      // エラーＯＫボタン //
      //------------------//
      case 201: //ONCLICK
        switch(DialogProcMode){
          case "":
            break;
          case DIALOGPROCMODE_RU_ERROR:
          case DIALOGPROCMODE_STUDY_ERROR:
          case DIALOGPROCMODE_COMPLETED_ERROR:
            //終了処理
            ExclusiveModeRuRelease    = EXCLUSIVE_NOTHING;
            ExclusiveModeStudyRelease = EXCLUSIVE_NOTHING;
            Fn_Exclusive(COMMAND_MODE_STUDY_CANCEL, "");
            break;
          //10/12/17  FF千葉      V2.1(B)    MWM,MPPS対応 ADD-ST
          case DIALOGPROCMODE_MPPS_ERROR:
	          // 検査の削除を実施した場合は,検査の排他が開放されているため,
	          // 検査の排他を開放しないようにする
	          // 2005/06/24 追記 RUの排他のみ実施する
	          if(DeleteModeAtConfirm == DELETE_STUDY){
	             ExclusiveModeStudyRelease = EXCLUSIVE_NOTHING; 
	          }
	          // 排他開放処理
	          Fn_Exclusive(CommandMode, CommandParam);
            break;
         //10/12/17  FF千葉      V2.1(B)    MWM,MPPS対応 ADD-ED
        }       

        // 2005/12/17 PVCS#1713 H.SAITO -ST-
        // 終了処理でのエラーＯＫボタン押下時に
        // EndProcStatusの値によって、再開処理を実施する/しないを切り分ける
        switch(EndProcStatus){
          case ENDPROC_STATUS_ERROR_NOTIMAGE:   // すべて未撮のため削除できない場合
          case ENDPROC_STATUS_ERROR_OUTPUT: 　  // 出力中エラーの場合
          case ENDPROC_STATUS_ERROR_DELETELOCK: // 削除ロックエラーの場合
            // 処理中表示解除
            Public_CloseMessage();
            // 未撮メニューが必ず存在しているため、再開処理を実施する。
            Fn_Resume_After_EndProcCancel();
            break;        
          case ENDPROC_STATUS_ERROR_PERMIT:     // 権限チェックエラーの場合
            // 処理中表示解除
            Public_CloseMessage();
            // 未撮メニューがある場合のみ再開処理を実施する。
            Fn_Resume_After_EndProcCancel();
            break;        
        }
        // 2005/12/17 PVCS#1713 H.SAITO -ED-
        Public_CloseError();
        DialogProcMode = "";
        break;
      // 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応(ダイアログが使いづらいので、インタフェース見直し）-ED-
	//
			default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
				break;
		}
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
	}
}
// 2005/12/17 PVCS#1713 H.SAITO -ST-
//***************************************************************************
//  Fn_EndProc()		
//  1．機能
//       CR検査終了処理(保留/ビューアーモード/確認 押下時)
//  2．戻り値  
//	     なし
//  3．備考
//       ここでは処理しない
//***************************************************************************
function Fn_EndProc(commandMode){
  try{
    // 終了処理中フラグONにしておき、インジケータのOPEN/CLOSEで
    // 選択/非選択通知の制御をしないようにする
    EndProcFlag = 1;

    isMonitoring = 0;    //MONI_V60_0915
    // 処理中表示
    Public_Message("DIALOG", ProcText);

    // だらだら停止
    Fn_StopWatchImageInput();
    
    // エラー発生時の選択通知再開に必要なため
    // 選択通知を送った画像シーケンスを退避してから非選択通知を送る
    // (入力完了時は退避/再開する必要なし）

    if(NotifyEndFlag != "1"){
      NotifySelectIdStringBackup = parent.ImageSeq[SelectNextNo - 1];    
    }

    // 終了処理状況ステータス(非選択要求)
    EndProcStatus = ENDPROC_STATUS_NOTIFY;

    // 押下されたボタンによって非選択通知の引数を変える
    switch(commandMode){
      // 確認
      case COMMAND_MODE_COMPLETED:
      
        isMonitoring = 1;    //MONI_V60_0915
        
        //2009/06/12 Nishikawa Update-ST V6.0撮影画面最小化対応
        if(parent.OpenMode == OPEN_MODE_WINDOW){
          window.external.IndicateEndStatus(ENDST_COMPLETE);
	      }
		    //2009/06/12 Nishikawa Update-ED V6.0撮影画面最小化対応      
      
        Fn_SetNotify(false, "0", NOTIFY_FUNCTION_COMPLETED);
        break;
      // ビューアーモード
      case COMMAND_MODE_VIEW:
      
        //2009/06/12 Nishikawa Update-ST V6.0撮影画面最小化対応
        if(parent.OpenMode == OPEN_MODE_WINDOW){
          if(NotifyEndFlag == 1){
            window.external.IndicateEndStatus(ENDST_VIEWER);
          }
          else{
            window.external.IndicateEndStatus(ENDST_COMPLETE);
          }  
			  }
		    //2009/06/12 Nishikawa Update-ED V6.0撮影画面最小化対応
     
        //Fn_SetNotify(false, "0", NOTIFY_FUNCTION_VIEW);      //V60_MONI_V0915
        Fn_SetNotify(false, "0", NOTIFY_FUNCTION_COMPLETED);   //V60_MONI_V0915
        break;      
      // 保留
      case COMMAND_MODE_SUSPEND:
      
		    //2009/06/12 Nishikawa Update-ST V6.0撮影画面最小化対応
	      if(parent.OpenMode == OPEN_MODE_WINDOW){
	        window.external.IndicateEndStatus(ENDST_SUSPEND);
	      }
	      //2009/06/12 Nishikawa Update-ED V6.0撮影画面最小化対応
	    
        Fn_SetNotify(false, "0", NOTIFY_FUNCTION_SUSPEND);
        break;
// 2014/03/14 TYS沼 DR直結対応 ADD START ------------------------------------------------
      // DR切替
      case COMMAND_MODE_DRCHANGE:
	    if(parent.OpenMode == OPEN_MODE_WINDOW){
	      window.external.IndicateEndStatus(ENDST_DRCHANGE);
	    }
	    
        Fn_SetNotify(false, "0", NOTIFY_FUNCTION_DRCHANGE);
        break;
// 2014/03/14 TYS沼 DR直結対応 ADD END --------------------------------------------------
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+70);
  }
}
// 2005/12/17 PVCS#1713 H.SAITO -ED-
// 2005/12/17 PVCS#1713 H.SAITO -ST-
//***************************************************************************
//  Fn_EndProcCheckData()		
//  1．機能
//       CR検査終了処理(保留/ビューアーモード/確認 非選択通知完了時)
//  2．戻り値  
//	     なし
//  3．備考
//       なし
//***************************************************************************
function Fn_EndProcCheckData(commandMode){
  try{
    // 終了処理状況ステータス(未撮データチェック中)
    EndProcStatus = ENDPROC_STATUS_CHECKDATA;

    // 押下されたボタンによってチェック処理を変える
    switch(commandMode){
      //------//
      // 確認 //
      //------//
      case COMMAND_MODE_COMPLETED:
			  // 確認ボタンが押下されたことを保持(確認ボタン押下時に使用)
        PushedButton = COMMAND_MODE_COMPLETED;
        //----------------------------//
        // 未撮の撮影メニューを数える //
        //----------------------------//
        DeleteUnShotImageSequence = new Array();
        for(i = 0; i < parent.DataCount; i++){
          //未撮の撮影メニューがあれば送信データとして保持する
          if(parent.InputStatus[i] == STATE_UNSHOT){
            DeleteUnShotImageSequence.push(parent.ImageSeq[i]);
          }
        }
        // 未撮メニューの数によって検査削除/未撮メニューの削除/削除しないを決める
        switch(DeleteUnShotImageSequence.length){
          // すべて既撮のため確認実施
          case 0:
            DeleteModeAtConfirm = DELETE_NOMENU;
            Fn_StateChange(COMMAND_MODE_COMPLETED, "");
            break;
          // すべて未撮のため、検査ごと削除する確認を行う(検査の削除時は未撮メニューの画像シーケンスは不要のため送らない)
          case parent.DataCount:
            DeleteModeAtConfirm = DELETE_STUDY;
            DeleteUnShotImageSequence = "";
            document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_DELETE_STUDY,"");
            document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_DELETE_STUDY,"");
            document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_DELETE_STUDY,"Cannt Get Message.");
            Public_Confirm();
            break;
          // １つ以上の未撮を削除する確認を行う
          default:
            DeleteModeAtConfirm = DELETE_UNSHOTMENU;
            document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_DELETE_UNSHOT,"");
            document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_DELETE_UNSHOT,"");
            document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_DELETE_UNSHOT,"Cannt Get Message.");
            Public_Confirm();
            break;
        }
        break;
      //------------------//
      // ビューアーモード //
      //------------------//
      case COMMAND_MODE_VIEW:
			  // ビューアーモードボタンが押下されたことを保持(確認ボタン押下時に使用)
        PushedButton = COMMAND_MODE_VIEW;
        //----------------------------//
        // 未撮の撮影メニューを数える //
        //----------------------------//
        DeleteUnShotImageSequence = new Array();
        for(i = 0; i < parent.DataCount; i++){
          //未撮の撮影メニューがあれば送信データとして保持する
          if(parent.InputStatus[i] == STATE_UNSHOT){
            DeleteUnShotImageSequence.push(parent.ImageSeq[i]);
          }
        }
        // 未撮メニューの数によって未撮メニューの削除/削除しないを決める
        switch(DeleteUnShotImageSequence.length){
          // すべて既撮のためビューアーモード実施
          case 0:
            DeleteModeAtConfirm = DELETE_NOMENU;
            Fn_StateChange(COMMAND_MODE_VIEW, "");
            break;
          // すべて未撮のため、ビューアーモードに遷移できない
          case parent.DataCount:
            // OKボタン押下後、再開処理を実施する。

            EndProcStatus = ENDPROC_STATUS_ERROR_NOTIMAGE;
            // メッセージ表示
        		Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_NOMOVE_VIEWMODE,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_NOMOVE_VIEWMODE,""),top.DispFrame.Public_GetLangMsgString(MSG_NOMOVE_VIEWMODE,"Cannt Get Message.")); 
            break;
          // １つ以上の未撮を削除してからビューアーモード実施するため,確認ダイアログ表示
          default:
            DeleteModeAtConfirm = DELETE_UNSHOTMENU;
            document.getElementById("TD_ConfirmTitle1").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_DELETE_UNSHOT,"");
            document.getElementById("TD_ConfirmTitle2").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_DELETE_UNSHOT,"");
            document.getElementById("TD_ConfirmText").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_DELETE_UNSHOT,"Cannt Get Message.");
            Public_Confirm();
            break;
        }
        break;      
      //------//
      // 保留 //
      //------//
      case COMMAND_MODE_SUSPEND:
				//保留実施⇒排他開放
        Fn_StateChange(COMMAND_MODE_SUSPEND, "");
        break;
      //--------//
      // DR切替 //
      //--------//
      case COMMAND_MODE_DRCHANGE:
        Fn_StateChange(COMMAND_MODE_DRCHANGE, "");
        break;
    }
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+71);
  }
}
// 2005/12/17 PVCS#1713 H.SAITO -ED-
// 2005/07/14 072 H.SAITO 再送処理対応
//*****************************************************************************
// Fn_ReSelect
//
// １．機能 
//      指定された画像IDのステータスをクリアし、再選択した後、ポーリングを再開する
// ２．戻り値
//　　  無し
// ３．備考
//*****************************************************************************
function Fn_ReSelect(imageId){
  try{
    var tableNo;  //再選択する画像IDの添え字
    // 再選択する画像IDの添え字を取得する
		tableNo = parent.AssosiateId[imageId];

    // ステータスをクリア(再度画像を入れなおすので、未撮状態にする）
    parent.InputStatus[tableNo] = STATE_UNSHOT;
		parent.DataStatus[tableNo]  = STATE_NOT_SHOT;

    // 入力中にエラーが発生した画像を選択していた場合(だらだら表示中)ならばだらだら画像をクリアする。
    if(SelectMenuNo - 1 == tableNo){
      // 画像を非表示
      document.getElementById("DIV_PatientFilmImage").innerHTML  = "";
// 080502 HSK由比 ガイダンス表示対応 UPDATE-ST
          Fn_ChangeDispMode(NOIMAGE_DISP);
//      document.getElementById("DIV_PatientFilmImage").style.visibility = "hidden";
// 080502 HSK由比 ガイダンス表示対応 UPDATE-ED
      //--------------------//
      // カウントをリセット //
      //--------------------//
      //だらだらカウントをリセット
      DivViewCount = 0;  
      //再送カウントをリセット
      ResendCount  = 1;
    }

    // 次取り込み対象をエラーが発生した画像IDにする
    SelectNextPage  = Math.ceil((tableNo + 1) / MAXMENU);
    SelectNextNo    = tableNo + 1;
    SelectNextTable = tableNo % MAXMENU + 1;

    // 現在表示しているページに次取り込みがあれば画像を表示
    if(SelectPageNo == SelectNextPage){
      document.getElementById("DIV_StudyFilm5").style.visibility = "visible";
      document.getElementById("DIV_StudyFilm5").style.top        = NEXTMENU_TOP + NEXTMENU_TOP_REVICE * (SelectNextTable - 1);
      document.getElementById("DIV_StudyFilm5").style.left       = NEXTMENU_LEFT;
    }
    else{
      document.getElementById("DIV_StudyFilm5").style.visibility = "hidden";
    }

    // すべて既撮になってしまうと終了のための非選択通知を送ったフラグがたってしまうので、クリアする。




    NotifyEndFlag  = "";

    // 選択通知
    // 2005/12/17 PVCS#1713 H.SAITO -ST-
    //Fn_SetNotify(true, imageId);
    Fn_SetNotify(true, imageId, "");
    // 2005/12/17 PVCS#1713 H.SAITO -ED-
    
    // ポーリング再開
    Fn_StartWatchImageInput();
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+63);
  }
}
//*****************************************************************************
// Fn_FindUnComp
//
// １．機能 
//      未撮メニューを探し、未撮メニューが存在していたら、次取り込みにする
//      (startMenuNo:0～)
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Fn_FindUnComp(startMenuNo){
  try{
    var i;          //ループカウンタの初期値
    var roopCount;  //実際にループを行った回数

    //--------------//
	  // 検索開始位置 //
    //--------------//
    // 最後の未撮メニューに画像が入ったときは最初から検索する
    if(startMenuNo == parent.DataCount){
      i = 0;    
    }
    else{
      i = startMenuNo;
    }
    //--------------------//
    // 未撮メニューの検索 //
    //--------------------//
    //途中からの選択番号のとき、最初に戻って検索する
    for(roopCount = 0; roopCount < parent.DataCount; i++){
      // 未撮で入力中でないものを次取り込み対象とする
      if(parent.InputStatus[i] == STATE_UNSHOT){
        //＜退避＞次取り込み対象とする
        SelectNextPage  = Math.ceil((i + 1) / MAXMENU);
        SelectNextNo    = i + 1;
        SelectNextTable = i % MAXMENU + 1;

        //現在表示しているページに次取り込みがあれば画像を表示
        if(SelectPageNo == SelectNextPage){
          document.getElementById("DIV_StudyFilm5").style.visibility = "visible";
          document.getElementById("DIV_StudyFilm5").style.top        = NEXTMENU_TOP + NEXTMENU_TOP_REVICE * (SelectNextTable - 1);
          document.getElementById("DIV_StudyFilm5").style.left       = NEXTMENU_LEFT;
        }
        else{
          document.getElementById("DIV_StudyFilm5").style.visibility = "hidden";
        }

        //＜設定＞選択通知
        // 2005/12/17 PVCS#1713 H.SAITO -ST-
        //Fn_SetNotify(true, parent.ImageSeq[SelectNextNo - 1]);
        Fn_SetNotify(true, parent.ImageSeq[SelectNextNo - 1], "");
        // 2005/12/17 PVCS#1713 H.SAITO -ED-

        //＜終了＞１つでも見つかったら終了



        return;
      } 

      //ループの添え字をチェックする
      if(i == (parent.DataCount - 1)){
        //添え字を０に戻して先頭から探す(あとでインクリメントするため-1にする)
        i = -1;
      }

      //ループした数をカウントする



      roopCount++;
    }
    //-----------------------------------//
    // すべて既撮状態/最後の１枚が入力中 //
    //-----------------------------------//
    //未撮メニューがないので非選択通知
    // 2005/12/17 PVCS#1713 H.SAITO -ST-
    //Fn_SetNotify(false, "0");
    Fn_SetNotify(false, "0", NOTIFY_FUNCTION_ENDINPUT);
    // 2005/12/17 PVCS#1713 H.SAITO -ED-

    //------------------------------------//
    //非選択通知を送ったのでフラグを立てる//
    //------------------------------------//
    NotifyEndFlag   = "1"; 

    //次選択情報を初期化
    SelectNextPage  = -1;
    SelectNextNo    = -1;
    SelectNextTable = -1;

    //次選択画像を隠す
    document.getElementById("DIV_StudyFilm5").style.visibility = "hidden";
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
  }
}
//************************************************
// Public_WatchImageInput
//
// １．機能 
//      画像取り込みの状態をチェックする
// ２．戻り値
//　　  特になし




// ３．備考




//************************************************
function Fn_WatchImageInput(){
  try{
		var i;											//ループカウンタ
		var selectImageSeq;					//選択中の画像ID
		var sendData = new Array();	//送信データ（配列）




		//未選択ならば終了



		if(SelectMenuNo < 0){
			return;
		}

		//現在選択中の画像IDを取得



		selectImageSeq = parent.ImageSeq[SelectMenuNo - 1];

		//----------------//
		//送信データの作成//
		//----------------//
		//未撮の画像IDの配列(ＩＤ,要求番号）を作成
		for(i = 0; i < parent.DataCount; i++){
			switch(parent.InputStatus[i]){
			  //------------//
			  // 未撮の場合 //
			  //------------//
				case STATE_UNSHOT:
					//未撮の画像ID/ステータスをセット
					sendData.push(parent.ImageSeq[i]);
					sendData.push(STATE_UNSHOT);
					break;
			  //------------------------//
			  // 入力中(だらだら対象外) //
			  //------------------------//
				case STATE_INPUT_OFF:
					sendData.push(parent.ImageSeq[i]);
					//選択中ならばだらだら情報を要求



					if(parent.ImageSeq[i] == selectImageSeq){
						sendData.push(STATE_INPUT_ON);
					}
					else{
					//非選択ならば入力完了/入力中情報を要求



						sendData.push(STATE_INPUT_OFF);
					}	
					break;
			  //----------------------//
			  // 入力中(だらだら対象) //
			  //----------------------//
				case STATE_INPUT_ON:
					sendData.push(parent.ImageSeq[i]);
					//選択中ならばだらだら情報を要求



					if(parent.ImageSeq[i] == selectImageSeq){
						sendData.push(STATE_INPUT_ON);
					}
					else{
					//非選択ならば入力完了/入力中情報を要求



						sendData.push(STATE_INPUT_OFF);
					}
					break;
			  //------------//
			  // 既撮の場合 //
			  //------------//
				case STATE_COMPLETE:
					break;
			}
		}
　　
　　//撮影済画像数のカウントを更新
    //2009/06/12 Nishikawa Update-ST V6.0撮影画面最小化対応
    if(parent.OpenMode == OPEN_MODE_WINDOW){
      Fn_UpdateImgCount();
    }
    //2009/06/12 Nishikawa Update-ED V6.0撮影画面最小化対応

    //-----------------------------------------------------------------//
    // チェックするデータがない場合はサーバに送信せずに,ポーリング終了 //
    //-----------------------------------------------------------------//
    if(!sendData.length){
      //だらだら停止
      Fn_StopWatchImageInput();
      return;    
    }
    // 2005/12/21 PVCS#1713 H.SAITO -ST-
    ////ポーリング監視タイマ
    //WatchImageTimeOutId = setTimeout("Fn_TimeOut('WatchImage')", WATCHIMAGE_TIMEOUT);
    ////選択中の画像IDと未撮の画像IDをサーバーに通知する
    ////(ポーリング開始)
    //parent.STUDY_WATCH_PROC.Public_GetData(PROC_MODE, selectImageSeq, sendData);
    // ポーリング実施中はSubmitしないようにする。
    // 連続した確認/確認キャンセルにてポーリング要求のON/OFFが連続されると、
    // ポーリング要求を複数実施しようとしてエラーが発生する。
    // この条件に合致しない場合はすでにポーリングが実施されているため、
    // 実施中のポーリングの戻り(Public_EndWatchImageInput)にて処理は続行されるので
    // 何もしない。
    if(!PollingProcFlag){
      //ポーリング実施中フラグを立てる
      PollingProcFlag     = 1;
      //ポーリング監視タイマ
      WatchImageTimeOutId = setTimeout("Fn_TimeOut('WatchImage')", WATCHIMAGE_TIMEOUT);
      //選択中の画像IDと未撮の画像IDをサーバーに通知する
      //(ポーリング開始)
      parent.STUDY_WATCH_PROC.Public_GetData(PROC_MODE, selectImageSeq, sendData);
    }
    // 2005/12/21 PVCS#1713 H.SAITO -ED-
  }
  catch(e){
    //エラーを書き出す
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
  }
}
//************************************************
// Public_EndWatchImageInput
//
// １．機能 
//      画像取り込みの状態チェックの戻り



// ２．戻り値
//　　  特になし



// ３．備考



//************************************************
function Public_EndWatchImageInput(){
  try{
	  var i;
    var tableNo; //画像IDの添え字




	  var pageNo;
	  var menuTableNo;

    // 2005/12/21 PVCS#1713 H.SAITO -ST-
    //ポーリング実施中フラグをOFFにする
    PollingProcFlag     = 0;
    // 2005/12/21 PVCS#1713 H.SAITO -ED-

    //タイマ予約の解除
    clearTimeout(WatchImageTimeOutId);
    //ポーリング間隔を初期化する
		WatchImageInputTimeOut = NORMAL_WAITTIME;

    //--------------------------------------//
    // 入力中ならば保留ボタン以外は不活性化 //
    //--------------------------------------//
    if(parent.InputMode == "INPUT"){
      //2007/03/08 PVCS#2109 K.HOSHINO
      DiscontinueFlag = false;
      // 修正ボタン不活性化



      Fn_ModifyBtn_Enable(2);      

      // 確認・参照ボタン不活性化



      Fn_ConfirmBtn_Enable(2);

      // 回転ボタン不活性化    
      Fn_RotateBtn_Enable(2);
      // 2014/03/06 TYS沼 DR直結対応 ADD START ------------------------------------------------
      // CR撮影を実施
      CRImageShotOnce = 1;
      // DR切替ボタン不活性化
      if(CONNECTINGDR_USE == 1)
      {
          Fn_DRChangeBtn_Enable(2);
      }
      // 2014/03/06 TYS沼 DR直結対応 ADD END ------------------------------------------------
    }
    else{
        //2007/03/08 PVCS#2109 K.HOSHINO--START
	    if(DiscontinueFlag){
			DiscontinueFlag = false;
			Fn_FindUnComp(SelectNextNo - 1);
		}
        //2007/03/08 PVCS#2109 K.HOSHINO--END
        
      // 修正ボタン活性化



      Fn_ModifyBtn_Enable(1);      

      // 確認・参照ボタン活性化



      Fn_ConfirmBtn_Enable(1);   

      // 回転ボタンは入力中以外かつ既撮メニューを選択中のみ活性化



// 080513 HSK由比 ガイダンス表示対応 UPDATE-ST
      // ガイダンス表示中は回転ボタンは不活性にするのでここではCR画像表示中のときのみ行う
      if(Fn_IsShowGuidance() == false && parent.InputStatus[SelectMenuNo - 1] == STATE_COMPLETE){
//      if(parent.InputStatus[SelectMenuNo - 1] == STATE_COMPLETE){
// 080513 HSK由比 ガイダンス表示対応 UPDATE-ST
        // 回転ボタン活性化    
        Fn_RotateBtn_Enable(1);      
      }
      // 2014/03/06 TYS沼 DR直結対応 ADD START ------------------------------------------------
      // オプションキーが有効の場合のみ処理を実施
      if(CONNECTINGDR_USE == 1 && CRImageShotOnce == 0)
      {
          // DR切替ボタンは既撮メニューがある場合、非活性
          for(i = 0; i < parent.DataCount; i++)
          {
              //既撮の撮影メニューがあるか確認
              if(parent.InputStatus[i] == STATE_COMPLETE)
              {
                  break;
              }
          }
          if(i < parent.DataCount)
          {
              Fn_DRChangeBtn_Enable(2);
          }
          else
          {
              Fn_DRChangeBtn_Enable(1);
          }
      }
      // 2014/03/06 TYS沼 DR直結対応 ADD END ------------------------------------------------
    }
	  //---------------------------//
    // 入力中（だらだら情報なし）//
	  //---------------------------//
	  if(parent.InputOffFlag == "ON"){
		  for(i = 0; i < parent.InputOffImageSeq.length; i++){	
			  //だらだら情報なし対象となっている画像IDの添え字を取得



			  tableNo = parent.AssosiateId[parent.InputOffImageSeq[i]];

			  //だらだら入力中のもの＝次取り込み対象の場合のみ、次取り込みを移動する



			  if(tableNo == SelectNextNo - 1){
				  //入力中になったら次の未撮メニューを探す



				  Fn_FindUnComp(tableNo + 1);
				  break;
			  }
		  }
		  //だらだら情報ありが１つもない場合は選択状態を移動する



		  if(parent.InputOnFlag != "ON"){
			  //------------------//
			  //選択状態を移動する//
			  //------------------//
			  //ページ番号を計算



			  pageNo = Math.floor(tableNo / MAXMENU) + 1; //切捨て
			  menuTableNo = tableNo % MAXMENU + 1;

        //違うページを開いていたら強制的にページを移動



			  if(SelectPageNo != pageNo){
				  Fn_SelectPage(pageNo);
			  } 

			  //選択状態を移動(後勝ち）



			  Fn_OnSelectMenu(menuTableNo);
		  }		
	  }
	  //---------------------------//
    // 入力中（だらだら情報あり）//
	  //---------------------------//
	  if(parent.InputOnFlag == "ON"){
		  //だらだら情報あり対象となっている画像IDの添え字を取得



		  tableNo = parent.AssosiateId[parent.InputOnImageSeq];
		  //-------------------------------------------------------------------------------//
		  //2004/12/23 だらだら入力中に別の撮影メニューの選択で、表示がおかしくなるバグ修正//
		  //-------------------------------------------------------------------------------//
		  //再度、現在選択中かを調べる



		  if( (SelectMenuNo - 1) == tableNo){
			  //だらだら表示中はポーリング間隔を短くする



			  WatchImageInputTimeOut = INPUT_WAITTIME;

			  //だらだら入力開始



			  ViewDivImg();

			  //画像を表示する（位置変更を検討）



// 080424 HSK由比 ガイダンス表示対応 UPDATE-ST
              Fn_ChangeDispMode(IMAGE_DISP);
//			  document.getElementById("DIV_PatientFilmImage").style.visibility = "visible";
// 080424 HSK由比 ガイダンス表示対応 UPDATE-ED
		  }
		  //だらだら情報ありなのに選択中でない場合はだらだら表示を行わない		
		  else{
			  WatchImageInputTimeOut = NORMAL_WAITTIME;    
		  }
	  }
    //--------------------------------------------------//
    // 入力完了になった処理済画像とサムネイルと表示する //
    //--------------------------------------------------//
    Fn_RefreshView();  

    // 2005/07/14 037 H.SAITO 再送処理対応



	// 2006/11/21 PVCS#1770 H.SAITO -ST-
    //if(ReSendFromIndicatorCloseFlag == 1){
    //  // インジケータを閉じたあとの最初のポーリングでは画面ロックを解除する
    //  Public_CloseMessage();
    //}
	// 2006/11/21 PVCS#1770 H.SAITO -ED-
	  // 画像入力/処理エラーがなければ続行, エラーがあればダイアログ表示
    switch(parent.InputErrorCode){
      // エラー無しなので続行




      case "":
		// 2006/11/21 PVCS#1770 H.SAITO -ST-
        //// インジケータを閉じたあとの最初のポーリングは戻り場所を変える。
        //if(ReSendFromIndicatorCloseFlag == 1){
        //  ReSendFromIndicatorCloseFlag  = 0;   // フラグをクリア
        //  Fn_Resume_After_OtherFunctionClose();
        //  return;
        //}
		// 2006/11/21 PVCS#1770 H.SAITO -ED-
        break;
      // 画像入力中にエラー
      case "RUERROR":
        // ポーリング停止
        Fn_StopWatchImageInput();
        ReSendMode   = RESEND_MODE_ERROR_INPUT_IMAGE; //画像入力中にエラーが発生した場合のモード




        document.getElementById("TD_ConfirmTitle1_ReSend").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_INPUT_IMAGE,"");
        document.getElementById("TD_ConfirmTitle2_ReSend").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_INPUT_IMAGE,"");
        document.getElementById("TD_ConfirmText_ReSend").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_ERROR_INPUT_IMAGE,"Cannt Get Message.");
        Public_Confirm_ReSend();
        return;
      // 画像処理中にエラー
      case "IMGERROR":
        // ポーリング停止
        Fn_StopWatchImageInput();
        ReSendMode   = RESEND_MODE_ERROR_IMAGE_PROC;  //画像処理中にエラーが発生した場合のモード




        document.getElementById("TD_ConfirmTitle1_ReSend").innerHTML = top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_IMAGE_PROC,"");
        document.getElementById("TD_ConfirmTitle2_ReSend").innerHTML = top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_IMAGE_PROC,"");
        document.getElementById("TD_ConfirmText_ReSend").innerHTML   = top.DispFrame.Public_GetLangMsgString(MSG_ERROR_IMAGE_PROC,"Cannt Get Message.");
        Public_Confirm_ReSend();
        return;
      default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+64);
        return;
    }

    // 2005/02/09 MT No.92 005 H.SAITO
    // ポーリング停止中ならば処理を抜け、ポーリングを継続しないようにする
    if(PollingFlag == "OFF"){
      return;
    }   

    //ポーリング継続



    WatchImageInputId = setTimeout("Fn_WatchImageInput()", WatchImageInputTimeOut);
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
  }
}
//******************************************************
// Fn_RefreshView
//
// １．機能 
//      入力完了直後の処理済画像とサムネイルの表示を行う
// ２．戻り値
//　　  特になし




// ３．備考




//******************************************************
function Fn_RefreshView(){
  try{
    var firstMenuTableNo;  // 表示更新のチェック開始位置(0～)
    var menuTableNo;       // 撮影メニュー作業用位置(1～∞)
    var i;                 // 添え字





    var imageTagString;    // ＩＭＧタグ
    //------------------------------------------------------------------//
    // サムネイル画像は入力完了直後かを該当のページに対してチェックする //
    //------------------------------------------------------------------//
    //現在表示中のページより,チェック開始位置を算出する
    firstMenuTableNo = (SelectPageNo - 1) * MAXMENU;
    //処理済画像の表示
    for(i = 1; i <= MAXMENU; i++){
      //メニューリストの位置(1～



      menuTableNo = firstMenuTableNo + i;
      if(parent.ImageViewFlag[menuTableNo - 1] == "1"){
        // サムネイルの表示
        imageTagString = Fn_GetImageTag("THUMBNAIL", menuTableNo);
        document.getElementById("DIV_StudyFilm" + i).innerHTML        = imageTagString;
        document.getElementById("DIV_StudyFilm" + i).style.visibility = "visible";
      }
//080312 HSK山本 RU End-Readエラー対応 ADD-ST
      //＜表示＞ステータス表示（写損）診療データ状態 0:NORMAL(通常) 2:MISS(写損) 
      if(parent.ImageStatus[menuTableNo - 1] == STATE_MISS_SHOT ){
        document.getElementById("IMG_DeleteImage" + i).style.visibility = "visible";         
      }
      else{
        document.getElementById("IMG_DeleteImage" + i).style.visibility = "hidden";         
      }
//080312 HSK山本 RU End-Readエラー対応 ADD-ED
    }
    //----------------------------------------------------------------//
    // 処理済画像は入力完了直後かをすべてのデータに対してチェックする //
    //----------------------------------------------------------------//
    firstMenuTableNo = 0;
    for(i = 1; i <= parent.DataCount; i++){
      //メニューリストの位置(1～





      menuTableNo = firstMenuTableNo + i;
      //入力直後で選択中ならば処理済画像を表示する
      if(parent.ImageViewFlag[menuTableNo - 1] == "1"){
        if(SelectMenuNo == menuTableNo){
          imageTagString =  Fn_GetImageTag("NORMAL", menuTableNo);
          //画像表示
          document.getElementById("DIV_PatientFilmImage").innerHTML  = imageTagString;
// 080424 HSK由比 ガイダンス表示対応 UPDATE-ST
          Fn_ChangeDispMode(IMAGE_DISP);
//          document.getElementById("DIV_PatientFilmImage").style.visibility = "visible";
// 080424 HSK由比 ガイダンス表示対応 UPDATE-ED
        }
        // 画像の入力直後フラグをリセットする
        parent.ImageViewFlag[menuTableNo - 1] = 0;         
      }    
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+10);
  }
}
//************************************************
// Fn_TimeOut
//
// １．機能 
//      タイムアウト時の処理




// ２．戻り値
//　　  特になし




// ３．備考



//2010/11/16 30501エラー対応 MOD ST
//************************************************
function Fn_TimeOut(timeOutPoint)
{
	try{
		switch(timeOutPoint){
			// 検査開始/排他設定処理のタイムアウト
			case "StartProc":
				Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID_ACCESS, FILE_NAME, SPOT_CODE+100);
				Fn_Init("ALL");
				break;
			// 画像入力監視のタイムアウト
			case "WatchImage":
				Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID_ACCESS_WATCH, FILE_NAME, SPOT_CODE+100);
				Fn_Init("TIMEOUT");
				break;
			// 選択通知タイムアウト
			case "Notify":
				Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID_ACCESS_NOTIFY, FILE_NAME, SPOT_CODE+102);
				Fn_Init("TIMEOUT");
				break;
			// 回転処理タイムアウト
			case "TurnImage":
				Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID_ACCESS_TURNIMAGE, FILE_NAME, SPOT_CODE+11);
				Fn_Init("TIMEOUT");
				break;
		}
	} catch(e) {
		Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+12);
	}
}
//2010/11/16 30501エラー対応 MOD ED
//*****************************************************************************
// Fn_SelectPageClear
//
// １．機能 
//      撮影メニューリストをクリアする
// ２．戻り値
//　　  無し





// ３．備考





//*****************************************************************************
function Fn_SelectPageClear(){
  try{
    var i;									//ループカウンタ
    for(i = 1;i <= MAXMENU;i++){
      document.getElementById("IMG_StudyMenu"  + i).style.visibility   = 'hidden';
      document.getElementById("DIV_StudyFilm"  + i).style.visibility   = 'hidden';
      document.getElementById("DIV_StudyText"  + i).style.visibility   = 'hidden';
      document.getElementById("DIV_StudyFilm"  + i).innerHTML          = "";
      //ステータス表示を不可視





      document.getElementById("IMG_DeleteImage"+ i).style.visibility   = 'hidden';
    }
    // 次取り込み画像の非表示
    document.getElementById("DIV_StudyFilm5").style.visibility = "hidden";         
    //選択状態ボタン非表示
    document.getElementById("DIV_StudyMenu5").style.visibility = "hidden"; 
    //------------------//
    // ページ数の非表示 //
    //------------------//
    document.getElementById("DIV_TextCnt").innerText = "";
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+13);
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
    var i;									//ループカウンタ
    var firstMenuTableNo;	  //一番上に表示するデータの場所
    var menuTableNo;        //撮影メニュー作業用位置(1～∞)
    var pageCountMessage;   //メニュー数／ページ数表示
    var imageTagString;     //サムネイル画像表示用タグ

    //＜計算＞総ページ数(小数点以下切り上げ)
    MaxPage     = Math.ceil(parent.DataCount / MAXMENU);

    //＜チェック＞指定されたページが有効範囲内か
    if((pageNo < 1 || pageNo > MaxPage) && MaxPage > 0){
      return;
    }
    //----------------------//
    // 次取り込み画像の表示 //
    //----------------------//  
    //＜表示＞現在のページが次取り込みの対象になっている場合





    if(pageNo == SelectNextPage){
      //＜計算＞次取り込み画像位置を計算する





      document.getElementById("DIV_StudyFilm5").style.top        = NEXTMENU_TOP + NEXTMENU_TOP_REVICE * (SelectNextTable - 1);
      document.getElementById("DIV_StudyFilm5").style.left       = NEXTMENU_LEFT;
      document.getElementById("DIV_StudyFilm5").style.visibility = "visible";         
    }
    else{
      document.getElementById("DIV_StudyFilm5").style.visibility = "hidden";         
    }
    //--------------------//
    // 撮影メニューの表示 //
    //--------------------//
    //＜計算＞一番上に表示するデータの位置
    firstMenuTableNo = (pageNo - 1) * MAXMENU;

    //＜表示＞撮影メニュー
    for(i = 1; i <= MAXMENU; i++){

      //＜計算＞メニュー選択位置
      menuTableNo = firstMenuTableNo + i;

      //＜チェック＞表示するデータが全件数を超えていないか
      if(menuTableNo > parent.DataCount){
	      break;
      }

      //＜表示＞テキストを表示    
      document.getElementById("DIV_StudyText" + i).style.visibility = "visible";

      //＜表示＞通常のメニューボタンを表示
      document.getElementById("IMG_StudyMenu" + i).style.visibility = "visible";

      //＜表示＞未撮の場合はサムネイル非表示
      if(parent.InputStatus[menuTableNo - 1] != STATE_COMPLETE &&
        parent.DataStatus[menuTableNo - 1] == STATE_NOT_SHOT){
        document.getElementById("DIV_StudyFilm" + i).innerHTML        = "";
        document.getElementById("DIV_StudyFilm" + i).style.visibility = "hidden";
      }
      //＜表示＞既撮の場合はサムネイル表示
      else{
        imageTagString =  Fn_GetImageTag("THUMBNAIL", menuTableNo);
        document.getElementById("DIV_StudyFilm" + i).innerHTML        = imageTagString;
        document.getElementById("DIV_StudyFilm" + i).style.visibility = "visible";
      }

      //＜表示＞撮影メニュータイトル
      document.getElementById("DIV_StudyText" + i).innerText=parent.MenuName[menuTableNo - 1];
      
      //＜表示＞ステータス表示（写損）診療データ状態 0:NORMAL(通常) 2:MISS(写損) 
      if(parent.ImageStatus[menuTableNo - 1] == STATE_MISS_SHOT ){
        document.getElementById("IMG_DeleteImage" + i).style.visibility = "visible";         
      }
      else{
        document.getElementById("IMG_DeleteImage" + i).style.visibility = "hidden";         
      }
    }
    //----------------------//
    // 選択状態ボタンの表示 //
    //----------------------//
    //＜表示＞メニュー表示をしなかった場合はメニューを不可視



    if(i <= MAXMENU){
      for(;i <= MAXMENU;i++){
        document.getElementById("IMG_StudyMenu"  + i).style.visibility = 'hidden';
        document.getElementById("DIV_StudyFilm"  + i).style.visibility = 'hidden';
        document.getElementById("DIV_StudyText"  + i).style.visibility = 'hidden';
        document.getElementById("DIV_StudyFilm"  + i).innerHTML        = "";
        //＜表示＞ステータス表示を不可視



        document.getElementById("IMG_DeleteImage"  + i).style.visibility = 'hidden';
      }
    }

    //＜表示＞選択状態ボタン表示
    //表示しているページに選択している撮影メニューがある場合





    if(pageNo == SelectMenuPage){
      document.getElementById("DIV_StudyMenu5").style.visibility = "visible";
    }
    //表示しているページに選択している撮影メニューがない場合





    else{
      document.getElementById("DIV_StudyMenu5").style.visibility = "hidden";
    }
    
    //----------------//
    // ページ数の表示 //
    //----------------//
    //＜表示＞総メニュー数　現ページ／総ページ数
    // 2005/06/23 005 H.SAITO デザイン変更対応(フォントサイズ)
    //pageCountMessage = TOTAL_PAGE_STRING + " "       + parent.DataCount + " " + MENU_STRING + " ";
    //pageCountMessage = pageCountMessage  + pageNo    + "/"  + MaxPage   + " " + PAGE_STRING;
    pageCountMessage = TOTAL_PAGE_STRING + " "       + parent.DataCount + MENU_STRING + "    ";
    pageCountMessage = pageCountMessage  + pageNo    + "/"  + MaxPage   + " " + PAGE_STRING;

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
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+14);
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
    var menuTableNo;    //撮影メニューのＮｏ(１～∞）



    var imageTagString; //画像表示時のタグ

    if(MaxPage <= 0){
      //何もしない




      return;
    }
    //＜計算＞選択された撮影メニューＮｏ




    menuTableNo = (SelectPageNo - 1) * MAXMENU + tableNo;

    //--------------//
    // 選択状態解除 //
    //--------------//
    //#2005/02/25 PVCS:1498 SST-27-0001 009 H.SAITO
    //既に選択されている場合は選択解除しない



//    if(menuTableNo == SelectMenuNo){
//      return;
//    }
    //既に選択されており、かつ次選択メニューの位置も選択された位置の場合は何もしない



    if(menuTableNo == SelectMenuNo && menuTableNo == SelectNextNo){
      return;
    }
    //#2005/03/07,03/12 005 H.SAITO
    //既に選択されており、未撮でないときは何もしない



    if(menuTableNo == SelectMenuNo && parent.InputStatus[menuTableNo - 1] != STATE_UNSHOT){
      return;
    }

    //--------------------//
    // カウントをリセット //
    //--------------------//
    //だらだらカウントをリセット
    DivViewCount = 0;  
    //再送カウントをリセット
    ResendCount  = 1;

    //--------------//
    // 選択情報設定 //
    //--------------//
    //＜退避＞選択情報設定



    //現在選択されているメニューの位置を保存



    SelectMenuPage  = SelectPageNo;
    SelectMenuTable = tableNo;
    SelectMenuNo    = menuTableNo;

    //--------------------//
    // 次取り込み状態設定 //
    //--------------------//
    //＜表示＞選択されていない場合かつ未撮は次取り込み状態を設定





    if(menuTableNo != SelectNextNo && 
      parent.InputStatus[menuTableNo - 1] == STATE_UNSHOT){

      //次取り込み画像を表示
      document.getElementById("DIV_StudyFilm5").style.visibility = "visible";
      document.getElementById("DIV_StudyFilm5").style.top        = NEXTMENU_TOP + NEXTMENU_TOP_REVICE * (tableNo - 1);
      document.getElementById("DIV_StudyFilm5").style.left       = NEXTMENU_LEFT;

      //＜退避＞次取り込み対象とする
      SelectNextPage  = SelectPageNo;	
      SelectNextNo    = menuTableNo;	
      SelectNextTable = tableNo;

      //＜設定＞選択通知
      // 2005/12/17 PVCS#1713 H.SAITO -ST-
      //Fn_SetNotify(true, parent.ImageSeq[SelectNextNo - 1]);
      Fn_SetNotify(true, parent.ImageSeq[SelectNextNo - 1], "");
      // 2005/12/17 PVCS#1713 H.SAITO -ED-
    }
    //--------------//
    // 選択状態設定 //
    //--------------//
    //選択画像にする
    document.getElementById("DIV_StudyMenu5").style.visibility = "visible";
    document.getElementById("DIV_StudyMenu5").style.top        = SELECTMENU_TOP + SELECTMENU_TOP_REVICE * (tableNo - 1);
    document.getElementById("DIV_StudyMenu5").style.left       = SELECTMENU_LEFT;

// 080424 HSK由比 ガイダンス表示対応 ADD-ST
    // ガイダンス画像を設定
    var guidanceTagString                                           = Fn_GetImageTag(INPUT_MODE_GUIDANCE, menuTableNo);
    document.getElementById("DIV_GuidanceImage").innerHTML          = guidanceTagString;
    document.getElementById("DIV_GuidanceImage").style.visibility   = "hidden";
// 080424 HSK由比 ガイダンス表示対応 ADD-ED

    //----------------//
    // 処理済画像表示 //
    //----------------//
    //規撮ならば画像を表示する
    if(parent.InputStatus[menuTableNo - 1] == STATE_COMPLETE){
      imageTagString =  Fn_GetImageTag("NORMAL", menuTableNo);
      //画像表示
      document.getElementById("DIV_PatientFilmImage").innerHTML  = imageTagString;
// 080424 HSK由比 ガイダンス表示対応 UPDATE-ST
      Fn_ChangeDispMode(IMAGE_DISP);
//      document.getElementById("DIV_PatientFilmImage").style.visibility = "visible";
//
//      //入力中でない場合のみ回転ボタンを活性化
//
//
//
//
//
//      if(parent.InputMode == "INPUT"){
//        //回転ボタン不活性化  
//        Fn_RotateBtn_Enable(2);
//      }
//      else{
//        //回転ボタン活性化    
//        Fn_RotateBtn_Enable(1);   
//      }
// 080424 HSK由比 ガイダンス表示対応 UPDATE-ED
    }
    //未撮の場合はボタンを不活性化





    else{
      //画像を非表示
      document.getElementById("DIV_PatientFilmImage").innerHTML  = "";
// 080424 HSK由比 ガイダンス表示対応 UPDATE-ST
      if(GUIDANCE_USE == 1)
      {
        Fn_ChangeDispMode(GUIDANCE_DISP);
      }
      else
      {
        Fn_ChangeDispMode(IMAGE_DISP);
      }
//      document.getElementById("DIV_PatientFilmImage").style.visibility = "hidden";
//
//      //回転ボタン不活性化
//
//
//
//
//
//      Fn_RotateBtn_Enable(2); 
// 080424 HSK由比 ガイダンス表示対応 UPDATE-ED
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+15);
  }
}
//************************************************
// ViewDivImg
//
// １．機能 
//      だらだら表示を画面に表示する
// ２．戻り値
//　　  特になし





// ３．備考





//************************************************
function ViewDivImg(){
  try{
    var i;                    //ループカウンタ
    var imageSeq;             //画像シーケンス
    var imageTableNo;         //だらだら対象となっている画像の添え字



    var inputDirection;       //表示開始方向



    var inputCount;           //だらだら表示数
	  var inputAllCount;        //だらだら画像総数
    var positionTop;          //画像表示開始位置上方向



    var positionLeft;         //画像表示開始位置左方向



    var positionWidth;        //画像幅



    var positionHeight;       //画像高さ
    var imageWidth;           //現画像の幅



    var imageHeight;          //現画像の高さ
    var divideSize;           //分割画像の高さ／幅




    var divTagString;         //画像挿入用のＤＩＶタグ
    var imageTagString;				//IMGタグ
    var imageTagIdString;     //IMGタグで使用するID
    var imageTagOnLoadString;	//IMGタグのOnLoadイベント




    var dateObject;						//現在の秒  
    var workPosition;		      //位置計算用ワーク
    var adjustSize;           //補正後の高さ/幅




    var imageStyleString;	    //画像の表示状態編集用文字列
    var viewFilePath;         //画像ファイルパス

		var	divSubTagString;	//DIVタグ編集用文字列（単体用）





    // 再送カウントが異なっていたら、再送カウントを更新し、だらだらカウントをリセットする
    if(ResendCount != parent.DivInfoResendCount){
      ResendCount   = parent.DivInfoResendCount;
      DivViewCount  = 0;
      
      //2009/06/12 Nishikawa Update-ST V6.0撮影画面最小化対応
      if(parent.OpenMode == OPEN_MODE_WINDOW){
        window.external.UpdateProgressBar(DivViewCount);
      }
      //2009/06/12 Nishikawa Update-ED V6.0撮影画面最小化対応
    }

	  //位置計算用ワーク領域を初期化
	  workPosition   = 0;
	  imageTagString = "";
	  //だらだら対象ＩＤ　だらだら対象となっている画像





	  imageSeq       = parent.InputOnImageSeq;
    //だらだら対象ＩＤの添え字 だらだら対象となっている画像の添え字





    imageTableNo   = parent.AssosiateId[imageSeq];
    //だらだら画像表示数
    inputCount     = parent.DivInfoDivCompcount - 0;
    //だらだら総数
    inputAllCount  = parent.DivInfoDivcount - 0;

	  //2009/06/12 Nishikawa Update-ST V6.0撮影画面最小化対応
	  if(parent.OpenMode == OPEN_MODE_WINDOW){
      window.external.SetProgressBarMaximum(inputAllCount);
    }
    //2009/06/12 Nishikawa Update-ED V6.0撮影画面最小化対応

    //だらだら方向(すべて大文字に変換する)
    inputDirection = parent.DivInfoDirection.toUpperCase();
    //現画像のサイズ
    imageWidth     = parent.DivInfoTotalImageWidth  - 0;
    imageHeight    = parent.DivInfoTotalImageHeight - 0;


		if( 0 == DivViewCount){

			divTagString="";
			
			//画像分割数分のDIVタグを書き出しておく
			for(i = 1; i <= inputAllCount; i++){
				divSubTagString+="<DIV ID='DIV_FilmImageSub"+ i +"'></DIV>";
			}

			//DIVタグを書き出し




		  document.getElementById("DIV_PatientFilmImage").innerHTML = divSubTagString;
    }

    //--------------------//
    // だらだら表示を行う //
    //--------------------//
    for(i = 1; i <= inputCount; i++){
    
      //--------------------------------------------------------------//     
      // 分割画像の高さ／幅,補正後全体サイズ計算（だらだら方向に依存）//
      //--------------------------------------------------------------//     
      switch(inputDirection){
        case BOTTOM:
        case TOP:
          //分割画像のサイズ(高さ)
          divideSize = parent.DivDataImageHeight[i - 1] - 0;
          //----------------------------------------//
          // サイズ計算（縦長／横長／正方形に依存） //
          //----------------------------------------//     
          //幅(長方形(縦長))
          if(imageWidth < imageHeight){
            //分割画像の全体サイズ(補正後の高さ:高さにあわせる)
            adjustSize     = VIEW_HEIGHT; 
            //分割画像のサイズ(補正後の高さ)
            positionHeight = adjustSize * divideSize / imageHeight;
            positionHeight = Math.floor(positionHeight, 0); //小数点以下切捨て
            //分割画像のサイズ(補正後の幅)
            positionWidth  = VIEW_HEIGHT * imageWidth / imageHeight;
            positionWidth  = Math.floor(positionWidth, 0);  //小数点以下切捨て
          }
          //幅(長方形(横長))
          else if(imageWidth > imageHeight){
            //分割画像の全体サイズ(補正後の高さ:幅にあわせる)
            adjustSize     = VIEW_WIDTH * imageHeight / imageWidth;
            adjustSize     = Math.floor(adjustSize, 0); // 小数点以下切捨て
            //分割画像のサイズ(補正後の高さ)
            positionHeight = adjustSize * divideSize / imageHeight;
            positionHeight = Math.floor(positionHeight, 0); //小数点以下切捨て
            //分割画像のサイズ(補正後の幅)
            positionWidth  = VIEW_WIDTH;
          }
          //幅(正方形)
          else{
            //分割画像の全体サイズ(補正後の高さ:幅にあわせる)
            adjustSize     = VIEW_WIDTH * imageHeight / imageWidth; 
            adjustSize     = Math.floor(adjustSize, 0); // 小数点以下切捨て
            //分割画像のサイズ(補正後の高さ)
            positionHeight = adjustSize * divideSize / imageHeight;
            positionHeight = Math.floor(positionHeight, 0); //小数点以下切捨て
            //分割画像のサイズ(補正後の幅)
            positionWidth  = VIEW_WIDTH;
          }
          break;
        case LEFT:
        case RIGHT:
          // 分割画像のサイズ(幅)
          divideSize = parent.DivDataImageWidth[i - 1] - 0;
          //----------------------------------------//     
          // サイズ計算（縦長／横長／正方形に依存） //
          //----------------------------------------//     
          //長方形(縦長)
          if(imageWidth < imageHeight){
            //分割画像の全体サイズ(補正後の幅:高さにあわせる)
            adjustSize     = VIEW_HEIGHT * imageWidth / imageHeight; 
            adjustSize     = Math.floor(adjustSize, 0); // 小数点以下切捨て
            //分割画像のサイズ(補正後の幅)
            positionWidth  = adjustSize * divideSize / imageWidth;
            positionWidth  = Math.floor(positionWidth, 0);  //小数点以下切捨て
            //分割画像のサイズ(補正後の高さ)
            positionHeight = VIEW_HEIGHT;
          }
          //長方形(横長)
          else if(imageWidth > imageHeight){
            //分割画像の全体サイズ(補正後の幅:幅にあわせる)
            adjustSize     = VIEW_WIDTH;
            //分割画像のサイズ(補正後の幅)
            positionWidth  = adjustSize * divideSize / imageWidth;
            positionWidth  = Math.floor(positionWidth, 0);  //小数点以下切捨て
            //分割画像のサイズ(補正後の高さ)
            positionHeight = (VIEW_WIDTH * imageHeight) / imageWidth;
            positionHeight = Math.floor(positionHeight, 0); //小数点以下切捨て
          }
          //正方形
          else{
            //分割画像の全体サイズ(補正後の幅:幅にあわせる)
            adjustSize     = VIEW_WIDTH;
            //分割画像のサイズ(補正後の幅)
            positionWidth  = adjustSize * divideSize / imageWidth;
            positionWidth  = Math.floor(positionWidth, 0);  //小数点以下切捨て
            //分割画像のサイズ(補正後の高さ)
            positionHeight = (VIEW_WIDTH * imageHeight) / imageWidth;
            positionHeight = Math.floor(positionHeight, 0); //小数点以下切捨て
          }
          break;
        default:
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+16);
          return;
      }
      //------------------------------------//     
      // 位置計算（だらだら方向と形に依存） //
      //------------------------------------//     
      switch(inputDirection){
        //------------//
        // 下から入力 //
        //------------//
        case BOTTOM:
          //長方形（縦長）




          if(imageWidth < imageHeight){
            positionLeft   = Math.floor((VIEW_WIDTH - positionWidth) / 2, 0);
            workPosition  += positionHeight;
            positionTop    = VIEW_HEIGHT - workPosition;
          }
          //長方形（横長）




          else if(imageWidth > imageHeight){
            positionLeft   = 0;
            workPosition  += positionHeight;
            positionTop    = VIEW_HEIGHT - Math.floor((VIEW_HEIGHT - adjustSize) / 2, 0) - workPosition;
          }
          //正方形
          else{
            positionLeft   = 0;
            workPosition  += positionHeight;
            positionTop    = VIEW_HEIGHT - workPosition;
          }
          break;
        //------------//
        // 上から入力 //
        //------------//
        case TOP:
          //長方形（縦長）




          if(imageWidth < imageHeight){
            positionLeft   = (VIEW_WIDTH - positionWidth) / 2;
            positionLeft   = Math.floor(positionLeft, 0);
            workPosition  += positionHeight;
            positionTop    = (0 - positionHeight) + workPosition;
          }
          //長方形（横長）




          else if(imageWidth > imageHeight){
            positionLeft   = 0;
            workPosition   += positionHeight;
            positionTop    = (0 - positionHeight) + Math.floor((VIEW_HEIGHT - adjustSize) / 2, 0) + workPosition;
          }
          //正方形
          else{
            positionLeft   = 0;
            workPosition   += positionHeight;
            positionTop    = (0 - positionHeight) + workPosition;
          }
          break;
        //------------//
        // 左から入力 //
        //------------//
        case LEFT:
          //長方形（縦長）




          if(imageWidth < imageHeight){
            positionTop    = 0;
            workPosition   += positionWidth;
            positionLeft   = (0 - positionWidth) + Math.floor((VIEW_WIDTH - adjustSize) / 2, 0) + workPosition;
          }
          //長方形（横長）




          else if(imageWidth > imageHeight){
            // 高さの中央位置を算出するために、positionHeightを使用する
            adjustSize     = positionHeight;
            positionTop    = Math.floor((VIEW_HEIGHT - adjustSize) / 2, 0);
            workPosition   += positionWidth;
            positionLeft   = (0 - positionWidth) + workPosition;
          }
          //正方形
          else{
            positionTop    = 0;
            workPosition   += positionWidth;
            positionLeft   = (0 - positionWidth) + workPosition;
          }
          break;
        //------------//
        // 右から入力 //
        //------------//
        case RIGHT:
          //長方形（縦長）




          if(imageWidth < imageHeight){
            positionTop    = 0;
            workPosition   += positionWidth;
            positionLeft   = VIEW_WIDTH - Math.floor((VIEW_WIDTH - adjustSize) / 2, 0) - workPosition;
          }
          //長方形（横長）




          else if(imageWidth > imageHeight){
            // 高さの中央位置を算出するために、positionHeightを使用する
            adjustSize     = positionHeight;
            positionTop    = Math.floor((VIEW_HEIGHT - adjustSize) / 2, 0);
            workPosition   += positionWidth;
            positionLeft   = VIEW_WIDTH - workPosition;
          }
          //正方形
          else{
            positionTop    = 0;
            workPosition   += positionWidth;
            positionLeft   = VIEW_WIDTH - workPosition;
          }
          break;
        //エラーを出力




        default:
          Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+17);
          return;
      }
      //-----------------//
      // ＩＭＧタグ作成  //
      //-----------------//
      //だらだら表示は前回表示の続きから行うため
      //すでに表示してある場合はループの添え字のカウントアップを行い,タグの作成を行わない





      if(i > DivViewCount){
        //スタイル作成
        imageStyleString = "Position:absolute;" + "Top:"     + positionTop    + "px;";
        imageStyleString = imageStyleString     + "Left:"    + positionLeft   + "px;";
        imageStyleString = imageStyleString     + "Width:"   + positionWidth  + "px;";
        imageStyleString = imageStyleString     + "Height:"  + positionHeight + "px;";
        imageStyleString = imageStyleString     + " visibility:hidden;"; //有効にすると何故かだらだらがでなくなる。要調査→IDの重複か？





        //日付オブジェクト生成



        dateObject       = new Date();
        //ファイルパス作成
        viewFilePath = INPUT_IMAGE_FILE_PATH + "/" + imageSeq + "/" + parent.DivDataFileName[i - 1] + "?" + dateObject.getTime();
        //タグ作成
        imageTagIdString     = "INPUT_IMG_" + (i - 1);
        imageTagOnLoadString = " ONLOAD=Public_ViewImage('" + imageTagIdString + "');";
//        imageTagString			 = imageTagString + "<IMG SRC='" + viewFilePath + "'" + " ID='" + imageTagIdString +  "'" + " STYLE='" + imageStyleString + "'" + imageTagOnLoadString + ">\n";
        imageTagString			 = "<IMG SRC='" + viewFilePath + "'" + " ID='" + imageTagIdString +  "'" + " STYLE='" + imageStyleString + "'" + imageTagOnLoadString + ">\n";


        divSubTagString="DIV_FilmImageSub" + i;
        document.getElementById(divSubTagString).innerHTML = imageTagString;


        //だらだら表示済みカウントアップ
        DivViewCount++;
        //2009/06/12 Nishikawa Update-ST V6.0撮影画面最小化対応
        if(parent.OpenMode == OPEN_MODE_WINDOW){
          window.external.UpdateProgressBar(DivViewCount);
        }
        //2009/06/12 Nishikawa Update-ED V6.0撮影画面最小化対応
      }
    }

//    //------------------------------------//
//    // 生成したタグがあればタグを追加する //
//    //------------------------------------//
//	  if(imageTagString){
//		  document.getElementById("DIV_PatientFilmImage").innerHTML += imageTagString;
//	  }
	  
   }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+18);
  }
}
//*****************************************************************************
// Public_ViewImage
//
// １．機能 
//      IMGタグのONLOAD時に画像をVISIBLEにする
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Public_ViewImage(divTagId){
  try{
  document.getElementById(divTagId).style.visibility = "visible";
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+19);
  }
}
//*****************************************************************************
// Fn_SetNotify
//
// １．機能 
//      選択／非選択通知を実行する（ロックの制御を行う）
//      選択／非選択通知を実施した際の機能によって、処理完了後にコールバックメソッド
//      を呼ぶようにする(PVCS#1713)
// ２．戻り値
//　　  無し
// ３．備考
//*****************************************************************************
// 2005/12/17 PVCS#1713 H.SAITO -ST-
//function Fn_SetNotify(notifyFlag, notifyImageSeq){
function Fn_SetNotify(notifyFlag, notifyImageSeq, notifyFunction){
// 2005/12/17 PVCS#1713 H.SAITO -ED-
  try{
    //すでに非選択通知を送っていれば,何もしない
    if(NotifyEndFlag == "1"){
      // 2005/12/19 PVCS#1713 H.SAITO -ST-
      //return;
      // すでに非選択を送っていた場合(すべて既撮の場合)に
      // 修正/保留/ビューアー/検査終了を押下された場合は
      // 非選択通知のコールバックを呼ぶようにするため、続行する必要がある。

      switch(notifyFunction){
        case NOTIFY_FUNCTION_SUSPEND:   // 保留
        case NOTIFY_FUNCTION_VIEW:      // ビューワーモード

        case NOTIFY_FUNCTION_COMPLETED: // 確認

        case NOTIFY_FUNCTION_MODIFY:    // 修正
        case NOTIFY_FUNCTION_MODIFY:    // 修正
// 2014/03/14 TYS沼 DR直結対応 ADD START ------------------------------------------------
        case NOTIFY_FUNCTION_DRCHANGE:  // DR切替
// 2014/03/14 TYS沼 DR直結対応 ADD END --------------------------------------------------
          // 続行

          break;
        default:
          return;      
      }
      // 2005/12/19 PVCS#1713 H.SAITO -ED-
    }

    //---------------------------------------------//
    // 選択通知は場合によっては何度も呼ばれるので、//
    // 取得が終わる前に要求をだされると落ちる      //
    //---------------------------------------------//
    //選択された画像IDをスタックに退避
    //★(選択/非選択通知をしている間に選択通知/非選択通知がある場合があるため)
    //★(すでにスタック内に"0"がある場合に選択通知しようとしても非選択を送るようにする)
    if(notifyFlag && NotifySelectIdString != "0"){
  //    NotifySelectIdString = parent.ImageSeq[SelectNextNo - 1];
      NotifySelectIdString = notifyImageSeq;
    }
    else{
      // 非選択通知用のＩＤをセットする
      NotifySelectIdString = "0";
    }
    // 2005/12/17 PVCS#1713 H.SAITO -ST-
    // 通知要求を発行した機能をスタックに退避
    NotifyFunctionString   = notifyFunction;
    // 2005/12/17 PVCS#1713 H.SAITO -ED-

    //ロックされていなければ選択／非選択通知を実施
    if(NotifyLockFlagString == "0"){
      //ロック
      NotifyLockFlagString = "1";
      // 2005/12/17 PVCS#1713 H.SAITO -ST-
      //Fn_SetNotifyStart(NotifySelectIdString);
      Fn_SetNotifyStart(NotifySelectIdString, NotifyFunctionString);
      // 2005/12/17 PVCS#1713 H.SAITO -ED-
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+20);
  }
}
//*****************************************************************************
// Fn_SetNotifyStart(notifyCompDataId "0":非選択通知 !="0":選択通知
// (notifyFunction 通知処理を実施した機能:PVCS#1713)
//
// １．機能 
//      選択／非選択通知を実行する
// ２．戻り値
//　　  無し
// ３．備考
//*****************************************************************************
// 2005/12/17 PVCS#1713 H.SAITO -ST-
//function Fn_SetNotifyStart(notifyCompDataId){
function Fn_SetNotifyStart(notifyCompDataId, notifyFunction){
// 2005/12/17 PVCS#1713 H.SAITO -ED-
	try{
		//スタックを空にする
		NotifySelectIdString = "";
		// 2005/12/17 PVCS#1713 H.SAITO -ST-
		NotifyFunctionString = "";
		// 2005/12/17 PVCS#1713 H.SAITO -ED-
		// 2005/12/17 PVCS#1713 H.SAITO -ST-
		// 通知処理を実施した機能を覚えておき、
		// 処理後にこの値でその後の処理を切り分ける。
		// 本メソッドは同時に複数実施されないため、上書きされる問題は発生しないと思われる。
		NotifyFunctionProcString = notifyFunction;
		// 2005/12/17 PVCS#1713 H.SAITO -ED-
		//タイマセット
		NotifyTimeOutId = setTimeout("Fn_TimeOut('Notify')", NOTIFY_TIMEOUT); 
		// 2006/11/08 PVCS#1962,#1666 H.SAITO -ST-
		////非選択通知
		//if(notifyCompDataId == "0"){
		//  parent.STUDY_NOTIFY_PROC.Public_SetNotify(PROC_MODE, parent.StudySequence, notifyCompDataId,"");
		//}
		////選択通知
		//else{
		//  parent.STUDY_NOTIFY_PROC.Public_SetNotify(PROC_MODE, parent.StudySequence, notifyCompDataId, escape(top.LoginUserId));
		//}
		// 処理フレームにてログイン情報を送信するためメソッドコールを共通化 
		parent.STUDY_NOTIFY_PROC.Public_SetNotify(PROC_MODE, parent.StudySequence, notifyCompDataId);
		// 2006/11/08 PVCS#1962,#1666 H.SAITO -ED-
	}
	catch(e){
		Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+21);
	}
}
//*****************************************************************************
// Fn_EndSetNotify
//
// １．機能 
//      選択／非選択通知終了時処理
// ２．戻り値
//　　  無し
// ３．備考
//*****************************************************************************
function Public_EndSetNotify(){
	try{
    // 2005/12/20 PVCS#1713 H.SAITO -ST-
    var notifyFunctionProcString;
    // 2005/12/20 PVCS#1713 H.SAITO -ED-

		//ロック解除
		NotifyLockFlagString = "0";

    //タイマ予約を解除
    clearTimeout(NotifyTimeOutId);

    // 2005/12/20 PVCS#1713 H.SAITO -ST-
    // スタック領域にデータが存在していた場合、

    // Fn_SetNotifyメソッドへの再突入を実施するため、

    // NotifyFunctionProcStringが上書きされないように
    // 本タイミングで退避する。

    notifyFunctionProcString = NotifyFunctionProcString;
    // 2005/12/20 PVCS#1713 H.SAITO -ED-

    //スタック領域を調べ、データがあれば次の選択通知を行う
    switch(NotifySelectIdString){
      //スタックにない場合は何もしないでロック解除
      case "":
        break;        
      //非選択通知
      case "0":
        // 2005/12/17 PVCS#1713 H.SAITO -ST-
        //Fn_SetNotify(false, "0");
        Fn_SetNotify(false, "0", NotifyFunctionString);
        // 2005/12/17 PVCS#1713 H.SAITO -ED-
        break;
      //再度選択通知
      default:               
        // 2005/12/17 PVCS#1713 H.SAITO -ST-
        //Fn_SetNotify(true, NotifySelectIdString);
        Fn_SetNotify(true, NotifySelectIdString, NotifyFunctionString);
        // 2005/12/17 PVCS#1713 H.SAITO -ED-
        break;
    }
    // 2005/12/17 PVCS#1713 H.SAITO -ST-
    // 引数をもとに、通知要求を実施した際の機能をチェックし
    // 引数の値に応じて非同期または同期処理かを切り分ける。
    // 同期処理の場合は次に呼び出すメソッドを実施する。
    switch(notifyFunctionProcString){
      case "":
        break;
      case NOTIFY_FUNCTION_SUSPEND:   // 保留
        Fn_EndProcCheckData(COMMAND_MODE_SUSPEND);
        break;
      case NOTIFY_FUNCTION_VIEW:      // ビューワーモード

        Fn_EndProcCheckData(COMMAND_MODE_VIEW);
        break;
      case NOTIFY_FUNCTION_COMPLETED: // 確認

        Fn_EndProcCheckData(COMMAND_MODE_COMPLETED);
        break;
      case NOTIFY_FUNCTION_MODIFY:    // 修正
        Fn_ModifyFunctionOpen(END_NOTIFY);
        break;
      case NOTIFY_FUNCTION_ENDINPUT:  // すべて入力完了(未撮無し)
        break;
      case NOTIFY_FUNCTION_INDICATOR: // インジケータ
        break;
    // 2006/11/08 PVCS#1962,#1666 H.SAITO -ST-
    //case NOTIFY_FUNCTION_ERROREND:  // エラー終了
    //break;
    // 2006/11/08 PVCS#1962,#1666 H.SAITO -ED-
// 2014/03/14 TYS沼 DR直結対応 ADD START ------------------------------------------------
      case NOTIFY_FUNCTION_DRCHANGE:  // DR切替
        Fn_EndProcCheckData(COMMAND_MODE_DRCHANGE);
        break;
// 2014/03/14 TYS沼 DR直結対応 ADD END --------------------------------------------------
      default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+72);
        break;
    }
    // 2005/12/17 PVCS#1713 H.SAITO -ED-
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+22);
	}
}
//*****************************************************************************
// Fn_RotateBtn_Enable
//
// １．機能 
//      回転ボタンの活性化・不活性化を切り替える
//     
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Fn_RotateBtn_Enable(intEnableSW){
  try{
    switch(intEnableSW){
      //回転ボタンを活性化





      case 1:
        document.getElementById("TABLE_UndoBtn").style.visibility            = "visible";   
        document.getElementById("TABLE_TurnLeftBtn").style.visibility        = "visible";   
        document.getElementById("TABLE_TurnRightBtn").style.visibility       = "visible";   
        document.getElementById("TABLE_Turn180Btn").style.visibility         = "visible";   
        document.getElementById("TABLE_ReverseBtn").style.visibility         = "visible";   

        document.getElementById("IMG_UndoBtn_Enable").style.visibility       = "visible";   
        document.getElementById("IMG_TurnLeftBtn_Enable").style.visibility   = "visible";   
        document.getElementById("IMG_TurnRightBtn_Enable").style.visibility  = "visible";   
        document.getElementById("IMG_Turn180Btn_Enable").style.visibility    = "visible";   
        document.getElementById("IMG_ReverseBtn_Enable").style.visibility    = "visible";    
        document.getElementById("IMG_UndoBtn_Disable").style.visibility      = "hidden";   
        document.getElementById("IMG_TurnLeftBtn_Disable").style.visibility  = "hidden";   
        document.getElementById("IMG_TurnRightBtn_Disable").style.visibility = "hidden";   
        document.getElementById("IMG_Turn180Btn_Disable").style.visibility   = "hidden";   
        document.getElementById("IMG_ReverseBtn_Disable").style.visibility   = "hidden";     
// 080516 HSK由比 ガイダンス表示対応 DELETE-ST
//        //テキストの色
//        document.getElementById("DIV_UndoText").style.color                  = "black";   
//        document.getElementById("DIV_TurnLeftText").style.color              = "black";   
//        document.getElementById("DIV_TurnRightText").style.color             = "black";   
//        document.getElementById("DIV_Turn180Text").style.color               = "black";   
//        document.getElementById("DIV_ReverseText").style.color               = "black";     
// 080516 HSK由比 ガイダンス表示対応 DELETE-ED
        break;
      case 2:
      //回転ボタンを不活性化




        document.getElementById("TABLE_UndoBtn").style.visibility            = "hidden";   
        document.getElementById("TABLE_TurnLeftBtn").style.visibility        = "hidden";   
        document.getElementById("TABLE_TurnRightBtn").style.visibility       = "hidden";   
        document.getElementById("TABLE_Turn180Btn").style.visibility         = "hidden";   
        document.getElementById("TABLE_ReverseBtn").style.visibility         = "hidden";   

        document.getElementById("IMG_UndoBtn_Disable").style.visibility      = "visible";   
        document.getElementById("IMG_TurnLeftBtn_Disable").style.visibility  = "visible";   
        document.getElementById("IMG_TurnRightBtn_Disable").style.visibility = "visible";   
        document.getElementById("IMG_Turn180Btn_Disable").style.visibility   = "visible";   
        document.getElementById("IMG_ReverseBtn_Disable").style.visibility   = "visible";    
        document.getElementById("IMG_UndoBtn_Enable").style.visibility       = "hidden";   
        document.getElementById("IMG_TurnLeftBtn_Enable").style.visibility   = "hidden";   
        document.getElementById("IMG_TurnRightBtn_Enable").style.visibility  = "hidden";   
        document.getElementById("IMG_Turn180Btn_Enable").style.visibility    = "hidden";   
        document.getElementById("IMG_ReverseBtn_Enable").style.visibility    = "hidden";
// 080516 HSK由比 ガイダンス表示対応 DELETE-ST
//        //テキストの色
//        document.getElementById("DIV_UndoText").style.color                  = "gray";   
//        document.getElementById("DIV_TurnLeftText").style.color              = "gray";   
//        document.getElementById("DIV_TurnRightText").style.color             = "gray";   
//        document.getElementById("DIV_Turn180Text").style.color               = "gray";   
//        document.getElementById("DIV_ReverseText").style.color               = "gray";     
// 080516 HSK由比 ガイダンス表示対応 DELETE-ED
        break;
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+23);
  }
}

// 080418 HSK由比 ガイダンス表示対応 ADD-ST
//*****************************************************************************
// Fn_GuidanceBtn_Enable
//
// １．機能 
//      ガイダンス表示切替ボタンの活性化・不活性化を切り替える
// ２．戻り値
//      無し
// ３．備考
//*****************************************************************************
function Fn_GuidanceBtn_Enable(intEnableSW)
{
  try
  {
    switch(intEnableSW)
    {
      // ガイダンス表示切替ボタンを活性化
      case 1:
        document.getElementById("TABLE_GuidanceToggleBtn").style.visibility       = "visible";
        document.getElementById("IMG_GuidanceToggleBtn_Enable").style.visibility  = "visible";
        document.getElementById("IMG_GuidanceToggleBtn_Disable").style.visibility = "hidden";
        // テキストの色
//        document.getElementById("DIV_GuidanceToggleBtnText").style.color          = "black";
        break;
      // ガイダンス表示切替ボタンを不活性化
      case 2:
        document.getElementById("TABLE_GuidanceToggleBtn").style.visibility         = "hidden";
        document.getElementById("IMG_GuidanceToggleBtn_Enable").style.visibility    = "hidden";
        document.getElementById("IMG_GuidanceToggleBtn_Disable").style.visibility   = "visible";
        // テキストの色
//        document.getElementById("DIV_GuidanceToggleBtnText").style.color            = "gray";
        break;
    }
  }
  catch(e)
  {
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE + 75);
  }
}
// 080418 HSK由比 ガイダンス表示対応 ADD-ED

//*****************************************************************************
// Fn_ModifyBtn_Enable
//
// １．機能 
//      修正ボタンの活性化・不活性化を切り替える
//     
// ２．戻り値
//　　  無し





// ３．備考





//*****************************************************************************
function Fn_ModifyBtn_Enable(intEnableSW){
  try{
    switch(intEnableSW){
      //修正ボタンを活性化



      case 1:
				//#1432 2005/09/17--ST
		    if(OPEN_MODE != CE_MODE && ModifyDispFlag == 0){
					return;
				}
				//#1432 2005/09/17--EN
        document.getElementById("TABLE_ModifyBtn").style.visibility          = "visible";   
        document.getElementById("IMG_ModifyBtn_Enable").style.visibility     = "visible";   
        document.getElementById("IMG_ModifyBtn_Disable").style.visibility    = "hidden";   
        //テキストの色
        document.getElementById("DIV_ModifyText").style.color                = "black";   
        break;
      case 2:
        document.getElementById("TABLE_ModifyBtn").style.visibility          = "hidden";   
        document.getElementById("IMG_ModifyBtn_Enable").style.visibility     = "hidden";   
        document.getElementById("IMG_ModifyBtn_Disable").style.visibility    = "visible";   
        //テキストの色
        document.getElementById("DIV_ModifyText").style.color                = "gray";   
        break;
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+24);
  }
}
// 2014/03/06 TYS沼 DR直結対応 ADD START ------------------------------------------------
//*****************************************************************************
// Fn_DRChangeBtn_Enable
//
// １．機能 
//      DR切替ボタンの活性化・不活性化を切り替える
//      ただし,ＣＥからの起動時にはDR切替ボタンは常に非表示
//     
// ２．戻り値
//　　  無し
// ３．備考
//*****************************************************************************
function Fn_DRChangeBtn_Enable(intEnableSW){
  try{
    switch(intEnableSW){
      case 1:
        if(OPEN_MODE != CE_MODE){
          // DR切替ボタン
          document.getElementById("IMG_DRChangeBtn_Enable").style.visibility     = "visible";   
          document.getElementById("IMG_DRChangeBtn_Disable").style.visibility    = "hidden";   
          document.getElementById("DIV_DrChangeText").style.color                = "black";   
        }
        break;
      case 2:
        if(OPEN_MODE != CE_MODE){
          // DR切替ボタン
          document.getElementById("IMG_DRChangeBtn_Enable").style.visibility     = "hidden";
          document.getElementById("IMG_DRChangeBtn_Disable").style.visibility    = "visible";
          document.getElementById("DIV_DrChangeText").style.color                = "gray";
        }
        break;
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+25);
  }
}
// 2014/03/06 TYS沼 DR直結対応 ADD END ------------------------------------------------
//*****************************************************************************
// Fn_ConfirmBtn_Enable
//
// １．機能 
//      確認,参照ボタンの活性化・不活性化を切り替える
//      ただし,ＣＥからの起動時には参照ボタンは常に非表示
//     
// ２．戻り値
//　　  無し




// ３．備考




//*****************************************************************************
function Fn_ConfirmBtn_Enable(intEnableSW){
  try{
    switch(intEnableSW){
      case 1:
        if(OPEN_MODE != CE_MODE){
          // ビューアーモードボタン
          document.getElementById("TABLE_ViewBtn").style.visibility          = "visible";   
          document.getElementById("IMG_ViewBtn_Enable").style.visibility     = "visible";   
          document.getElementById("IMG_ViewBtn_Disable").style.visibility    = "hidden";   
          document.getElementById("DIV_ViewText").style.color                = "black";   
        }
        // 確認ボタン
        document.getElementById("TABLE_UpdateBtn").style.visibility          = "visible";   
        document.getElementById("IMG_UpdateBtn_Enable").style.visibility     = "visible";
        document.getElementById("IMG_UpdateBtn_Disable").style.visibility    = "hidden";
        document.getElementById("DIV_UpdateText").style.color                = "black";   
        break;
      case 2:
        if(OPEN_MODE != CE_MODE){
          // ビューアーモードボタン
          document.getElementById("IMG_ViewBtn_Enable").style.visibility     = "hidden";
          document.getElementById("IMG_ViewBtn_Disable").style.visibility    = "visible";
          document.getElementById("DIV_ViewText").style.color                = "gray";
        }
        // 確認ボタン
        document.getElementById("IMG_UpdateBtn_Enable").style.visibility     = "hidden";   
        document.getElementById("IMG_UpdateBtn_Disable").style.visibility    = "visible";
        document.getElementById("DIV_UpdateText").style.color                = "gray";   
        break;
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+25);
  }
}  
//*****************************************************************************
// Fn_TurnImage
//
// １．機能 
//      回転・反転・元に戻す処理



//     
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Fn_TurnImage(turnAngle){
  try{
    // 回転・反転・元に戻す処理はすべてのボタン押下不可
    // 処理中表示
    Public_Message("DIALOG", ProcText);

    //画像取り込み状態監視(ポーリング)停止
// 2005/07/19 004 H.SAITO ボタン押下連打によってかなりシビアなタイミングで
// ページがないときにポーリングしようとしてしまうのでここはポーリング停止・開始しない。




// 回転ではポーリングの停止・開始は問題なし




//    Fn_StopWatchImageInput();

    // タイマ予約



    TurnImageTimeOutId = setTimeout("Fn_TimeOut('TurnImage')", TURNIMAGE_TIMEOUT);

    // 回転・反転・元に戻す処理    
    parent.STUDY_TURNIMAGE_PROC.Public_TurnImage(PROC_MODE, parent.StudySequence, parent.ImageSeq[SelectMenuNo - 1], turnAngle, parent.StudyStatus, parent.PatientId);
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+26);
  }
}
//*****************************************************************************
// Public_EndTurnImage
//
// １．機能 
//      回転・反転・元に戻す後の処理





//     
// ２．戻り値
//　　  無し





// ３．備考





//*****************************************************************************
function Public_EndTurnImage(){
  try{
    var imageTagString; // ＩＭＧタグ

    // タイマ予約解除
    clearTimeout(TurnImageTimeOutId);

    // 入力された画像とサムネイルを再表示する(仮置き);
    // 画像表示
    imageTagString =  Fn_GetImageTag("NORMAL", SelectMenuNo);
    document.getElementById("DIV_PatientFilmImage").innerHTML                    = imageTagString;
    document.getElementById("DIV_PatientFilmImage").style.visibility             = "visible";
    
    // サムネイル画像表示（メニューを選択中のページを表示していた場合のみ）



    if(SelectPageNo == SelectMenuPage){
      imageTagString =  Fn_GetImageTag("THUMBNAIL", SelectMenuNo);
      document.getElementById("DIV_StudyFilm" + SelectMenuTable).innerHTML         = imageTagString;
      document.getElementById("DIV_StudyFilm" + SelectMenuTable).style.visibility  = "visible";
    }

    //画像取り込み状態監視(ポーリング)開始



// 2005/07/19 004 H.SAITO ボタン押下連打によってかなりシビアなタイミングで
// ページがないときにポーリングしようとしてしまうのでここはポーリング停止・開始しない。




// 回転ではポーリングの停止・開始は問題なし




//    Fn_StartWatchImageInput();

    // 処理中表示解除
    Public_CloseMessage();
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+27);
  }
}
// 2005/06/27 H.SAITO PVCS#350 処理ＡＳＰにて権限、認証チェックを実施。以下のメソッド不要のため削除
////***************************************************************************
////  Fn_CheckCommand		
////  1．機能
////      操作権限チェック処理



////	2．戻り値  
////		  なし



////  3．備考



////     
////***************************************************************************
//function Fn_CheckCommand(commandMode, commandParam){
//  try{
//    var checkCommand; // チェックを実施するコマンド



//    //終了モードとパラメータの退避
//    CommandMode  = commandMode;
//    CommandParam = commandParam;
//
//    //チェックするコマンド(複数コマンドのチェックを行う場合もあるため、配列型にする)
//    checkCommand = new Array(); 
// 
//    // 押下されたボタンの操作ログを出力



//    switch(commandMode){
//      // 確認



//      case COMMAND_MODE_COMPLETED:
//        // 操作ログを出力



//	    Fn_WriteLog(CTRL_COMPLETED);
//        // 確認権限をチェック
//        checkCommand.push(commandMode);
//
//        // 確認と同時に確定の場合は確定権限もチェックする
//        if(EXAMEND_STATUS == EXAMEND_STATUS_WITHCOMPLETED){
//          checkCommand.push(COMMAND_MODE_CONFIRM);       
//        }
//        break;
//      // ビューアーモード



//      case COMMAND_MODE_VIEW:
//        // 操作ログを出力



//  	    Fn_WriteLog(CTRL_VIEW);
//
//        // 参照権限をチェック
//        checkCommand.push(commandMode);
//
//        // 確認権限をチェック
//        checkCommand.push(COMMAND_MODE_COMPLETED);
//
//        // 確認と同時に確定の場合は確定権限もチェックする
//        if(EXAMEND_STATUS == EXAMEND_STATUS_WITHCOMPLETED){
//          checkCommand.push(COMMAND_MODE_CONFIRM);       
//        }
//        break;      
//      default:
//        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+28);
//        return;
//    }
//    // 削除モードをチェック
//    switch(DeleteModeAtConfirm){
//      // 削除しない



//
//
//      case DELETE_NOMENU:
//        break;
//      // 未撮メニューを削除
//      case DELETE_UNSHOTMENU:
//        checkCommand.push(COMMAND_MODE_UNSHOTMENU_DELETE);
//        break;
//      // 検査を削除
//      case DELETE_STUDY:
//        checkCommand.push(COMMAND_MODE_STUDY_DELETE);
//        break;
//    }
//    //処理中表示
//    Public_Message("DIALOG", ProcText);
//    //タイマ予約



//    ChangeStateTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS+",'"+FILE_NAME+"',"+ (SPOT_CODE+29) +")", CHANGESTATE_TIMEOUT);
//
//    //操作権限チェック処理



//		parent.CHECKCOMMAND_PROC.Public_CheckCommand(PROC_MODE, checkCommand);
//  }
//  catch(e){ 
//    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+30);
//  }
//}
//***************************************************************************
//  Public_EndCheckCommand		
//	(returnCode：操作権限チェック結果, commandId：チェックを実施したコマンドID)	
//  1．機能
//      操作権限チェック後の処理 
//
//	2．戻り値  
//		  なし 
//
//  3．備考 
//	・PVCS#1962,#1666 認証エラー時のメニュー非選択は冗長なため削除
//	・PVCS#1962,#1666 認証エラー時に排他の取得情報をクリア
//
//     
//***************************************************************************
function Public_EndCheckCommand(returnCode, commandId){
	try{
    // タイマ予約解除
    clearTimeout(ChangeStateTimeOutId);

		//--------------------------//
		// 操作権限エラーを表示する //
		//--------------------------//
		if((returnCode != 0) && (parent.OpenMode == OPEN_MODE_WINDOW)){ //PVCS#3451
      window.external.IndicateError();                              //PVCS#3451
    }                                                               //PVCS#3451
    
		switch(returnCode){
		  case 0:
		    break;
//2005/05/27-ST======================
			//ログインされていない
			case CHECK_AUTHORITY_ERROR_NOT_LOGGED_IN:
				// 2006/11/08 PVCS#1962,#1666 H.SAITO -ST-
				//// 2005/12/17 PVCS#1713 H.SAITO -ST-
				//// エラーフラグを立て、インジケータOPEN/CLOSEによる選択/非選択通知制御をしないようにする
				//ErrorDialogFlag = 1;
				//  // 非選択通知を送る。
				//  Fn_SetNotify(false, "0", NOTIFY_FUNCTION_ERROREND);
				// 2005/12/17 PVCS#1713 H.SAITO -ED-
				switch(parent.OpenMode){
					case OPEN_MODE_CE:
						top.ExclusiveState    = 0;
						break;
					case OPEN_MODE_WINDOW:
						parent.ExclusiveState = 0;
						break;      
				}
				Fn_Init("ALL");
				// 2006/11/21 PVCS#1770 H.SAITO -ST-
				//// エラーフラグを立て、インジケータOPEN/CLOSEによる選択/非選択通知制御をしないようにする
				//ErrorDialogFlag = 1;
				// 2006/11/21 PVCS#1770 H.SAITO -ED-
				// 2006/11/08 PVCS#1962,#1666 H.SAITO -ED-
//        Public_ErrorDisplay(RETRY_ERROR, MESSAGE_ID_NOLOGIN, FILE_NAME, SPOT_CODE+32);
//    		Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MESSAGE_ID_NOLOGIN,""), top.DispFrame.Public_GetLangMsgTitle2(MESSAGE_ID_NOLOGIN,""),top.DispFrame.Public_GetLangMsgString(MESSAGE_ID_NOLOGIN,"Cannt Get Message.")); 
			top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_NOLOGIN,FILE_NAME,SPOT_CODE+52)
        //処理中表示解除
        Public_CloseMessage();
				return;
			//ログオフされた
			case CHECK_AUTHORITY_ERROR_LOGGED_OFF:
				// 2006/11/08 PVCS#1962,#1666 H.SAITO -ST-
				//// 2005/12/17 PVCS#1713 H.SAITO -ST-
				//// エラーフラグを立て、インジケータOPEN/CLOSEによる選択/非選択通知制御をしないようにする
				//ErrorDialogFlag = 1;
				//  // 非選択通知を送る。
				//  Fn_SetNotify(false, "0", NOTIFY_FUNCTION_ERROREND);
				// 2005/12/17 PVCS#1713 H.SAITO -ED-
				switch(parent.OpenMode){
					case OPEN_MODE_CE:
						top.ExclusiveState    = 0;
						break;
					case OPEN_MODE_WINDOW:
						parent.ExclusiveState = 0;
						break;      
				}
				Fn_Init("ALL");
				// 2006/11/21 PVCS#1770 H.SAITO -ST-
				//// エラーフラグを立て、インジケータOPEN/CLOSEによる選択/非選択通知制御をしないようにする
				//ErrorDialogFlag = 1;
				// 2006/11/21 PVCS#1770 H.SAITO -ED-
				// 2006/11/08 PVCS#1962,#1666 H.SAITO -ED-
//        Public_ErrorDisplay(RETRY_ERROR, MESSAGE_ID_LOGOFF, FILE_NAME, SPOT_CODE+33);
//    		Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MESSAGE_ID_LOGOFF,""), top.DispFrame.Public_GetLangMsgTitle2(MESSAGE_ID_LOGOFF,""),top.DispFrame.Public_GetLangMsgString(MESSAGE_ID_LOGOFF,"Cannt Get Message.")); 
			top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_LOGOFF,FILE_NAME,SPOT_CODE+53)
        //処理中表示解除
        Public_CloseMessage();
				return;
			//ユーザIDがアプリケーション変数と異なっている
			case CHECK_AUTHORITY_ERROR_DIFFERENT_ID:
				// 2006/11/08 PVCS#1962,#1666 H.SAITO -ST-
				//// 2005/12/17 PVCS#1713 H.SAITO -ST-
				//// エラーフラグを立て、インジケータOPEN/CLOSEによる選択/非選択通知制御をしないようにする
				//ErrorDialogFlag = 1;
				//  // 非選択通知を送る。
				//  Fn_SetNotify(false, "0", NOTIFY_FUNCTION_ERROREND);
				// 2005/12/17 PVCS#1713 H.SAITO -ED-
				switch(parent.OpenMode){
					case OPEN_MODE_CE:
						top.ExclusiveState    = 0;
						break;
					case OPEN_MODE_WINDOW:
						parent.ExclusiveState = 0;
						break;      
				}
				Fn_Init("ALL");
				// 2006/11/21 PVCS#1770 H.SAITO -ST-
				//// エラーフラグを立て、インジケータOPEN/CLOSEによる選択/非選択通知制御をしないようにする
				//ErrorDialogFlag = 1;
				// 2006/11/21 PVCS#1770 H.SAITO -ED-
				// 2006/11/08 PVCS#1962,#1666 H.SAITO -ED-
//        Public_ErrorDisplay(RETRY_ERROR, MESSAGE_ID_DIFERENT, FILE_NAME, SPOT_CODE+34);
//    		Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MESSAGE_ID_DIFERENT,""), top.DispFrame.Public_GetLangMsgTitle2(MESSAGE_ID_DIFERENT,""),top.DispFrame.Public_GetLangMsgString(MESSAGE_ID_DIFERENT,"Cannt Get Message.")); 
			top.GetErrorMessage(USER_NOTHING_ERROR,MESSAGE_ID_DIFERENT,FILE_NAME,SPOT_CODE+54)
        //処理中表示解除
        Public_CloseMessage();
				return;
//2005/05/27-EN======================
			//操作権限がない
			case CHECK_AUTHORITY_ERROR_AUTHORITY:
			  // 2005/12/17 PVCS#1713 H.SAITO -ST-
        // 終了処理ステータスを権限チェックエラーにする
        EndProcStatus = ENDPROC_STATUS_ERROR_PERMIT;
			  // 2005/12/17 PVCS#1713 H.SAITO -ED-
        //再試行可能エラー表示
//        Public_ErrorDisplay(RETRY_ERROR, MESSAGE_ID_FORBIDDEN, FILE_NAME, SPOT_CODE+35);
     		Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MESSAGE_ID_FORBIDDEN,""), top.DispFrame.Public_GetLangMsgTitle2(MESSAGE_ID_FORBIDDEN,""),top.DispFrame.Public_GetLangMsgString(MESSAGE_ID_FORBIDDEN,"Cannt Get Message.")); 
        //処理中表示解除
        Public_CloseMessage();
				return;
			default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+31);
				return;
		}
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+32);
	}	
}


//*****************************************************************************
// Public_StateChange
//
// １．機能 
//      確認/確定/保留処理
//     
// ２．戻り値
//　　  無し
// ３．備考
//*****************************************************************************
function Fn_StateChange(commandMode, commandParam){
  try{
    //終了モードとパラメータの退避
    CommandMode  = commandMode;
    CommandParam = commandParam;

    // 2005/12/17 PVCS#1713 H.SAITO -ST-
    // 終了処理状況ステータス(終了処理実施)
    EndProcStatus = ENDPROC_STATUS_ENDPROC;
    // 2005/12/17 PVCS#1713 H.SAITO -ED-

    // 2005/06/25 051 H.SAITO PVCS#350
    //実施するコマンド(複数コマンドのチェックを行う場合もあるため、配列型にする)
    var checkCommand = new Array(); 
 
    // 押下されたボタンの操作ログを出力
    switch(commandMode){
      // 確認
      case COMMAND_MODE_COMPLETED:
        // 2005/12/17 PVCS#1713 H.SAITO -ST-
        //// 操作ログを出力
	      //Fn_WriteLog(CTRL_COMPLETED);
        // 2005/12/17 PVCS#1713 H.SAITO -ED-
        // 確認操作
        checkCommand.push(commandMode);
        // 確認と同時に確定の場合は確定権限もチェックする
        if(EXAMEND_STATUS == EXAMEND_STATUS_WITHCOMPLETED){
          checkCommand.push(COMMAND_MODE_CONFIRM);       
        }
        break;
      // ビューアーモード
      case COMMAND_MODE_VIEW:
        // 2005/12/17 PVCS#1713 H.SAITO -ST-
        //// 操作ログを出力
  	    //Fn_WriteLog(CTRL_VIEW);
        // 2005/12/17 PVCS#1713 H.SAITO -ED-
        // 参照操作
        checkCommand.push(commandMode);
        // 確認操作
        checkCommand.push(COMMAND_MODE_COMPLETED);
        // 確認と同時に確定の場合は確定権限もチェックする
        if(EXAMEND_STATUS == EXAMEND_STATUS_WITHCOMPLETED){
          checkCommand.push(COMMAND_MODE_CONFIRM);       
        }
        break;      
      // 保留
      case COMMAND_MODE_SUSPEND:
        // 保留操作
        checkCommand.push(commandMode);
        break;
// 2014/03/14 TYS沼 DR直結対応 ADD START ------------------------------------------------
      // DR切替
      case COMMAND_MODE_DRCHANGE:
        // DR切替操作
        checkCommand.push(commandMode);
        break;
// 2014/03/14 TYS沼 DR直結対応 ADD END --------------------------------------------------
      default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+28);
        return;
    }
    // 削除モードをチェック
    switch(DeleteModeAtConfirm){
      // 削除しない
      case DELETE_NOMENU:
        break;
      // 未撮メニューを削除
      case DELETE_UNSHOTMENU:
        checkCommand.push(COMMAND_MODE_UNSHOTMENU_DELETE);
        break;
      // 検査を削除
      case DELETE_STUDY:
        checkCommand.push(COMMAND_MODE_STUDY_DELETE);
        break;
    }

    // 2005/12/17 PVCS#1713 H.SAITO -ST-
    // すでに前段で行うようにしたため削除
    ////未選択通知
    //Fn_SetNotify(false, "0");
    ////だらだら停止
    //Fn_StopWatchImageInput();
    ////処理中表示
    //Public_Message("DIALOG", ProcText);
    // 2005/12/17 PVCS#1713 H.SAITO -ED-

    //タイマ予約
	//2010/11/16 30501エラー対応 MOD ST
    ChangeStateTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS_STATECHANGE+",'"+FILE_NAME+"',"+ (SPOT_CODE+33) +")", CHANGESTATE_TIMEOUT);
	//2010/11/16 30501エラー対応 MOD ED
    //確認/確定/保留処理
    // 2005/06/24 003 H.SAITO PVCS#350 権限・認証チェック追加＆既存の権限チェック箇所変更
	  //parent.STUDY_STATECHANGE_PROC.Public_ChangeState(PROC_MODE, parent.StudySequence, commandMode, DeleteModeAtConfirm, DeleteUnShotImageSequence);
	  parent.STUDY_STATECHANGE_PROC.Public_ChangeState(PROC_MODE, parent.StudySequence, checkCommand, DeleteModeAtConfirm, DeleteUnShotImageSequence);
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+34);
  }
}
// 2010/12/17 FF千葉 MWM,MPPS対応 ADD-ST
//*****************************************************************************
// Public_EndStateChangeOnMppsErr
//
// １．機能 
//      確認/確定/保留後の処理（MPPS通信でエラーが生じた場合のもの）
//     
// ２．戻り値
//　　  無し
// ３．備考
//*****************************************************************************
function Public_EndStateChangeOnMppsErr(code){
  try{
    // タイマ予約解除
    clearTimeout(ChangeStateTimeOutId);

	　//エラーコードごとにメッセージ表示
    Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(code,""), top.DispFrame.Public_GetLangMsgTitle2(code,""),top.DispFrame.Public_GetLangMsgString(code,"Can not Get Message."), DIALOGPROCMODE_MPPS_ERROR); 
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+60);
  }
}
// 2010/12/17 FF千葉 MWM,MPPS対応 ADD-ED
//*****************************************************************************
// Public_EndStateChange
//
// １．機能 
//      確認/確定/保留後の処理
//     
// ２．戻り値
//　　  無し
// ３．備考
//*****************************************************************************
function Public_EndStateChange(){
  try{
    // タイマ予約解除
    clearTimeout(ChangeStateTimeOutId);

    // 検査の削除を実施した場合は,検査の排他が開放されているため,
    // 検査の排他を開放しないようにする
    // 2005/06/24 追記 RUの排他のみ実施する
    if(DeleteModeAtConfirm == DELETE_STUDY){
      ExclusiveModeStudyRelease = EXCLUSIVE_NOTHING; 
    }
    // 排他開放処理
    Fn_Exclusive(CommandMode, CommandParam);
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+35);
  }
}
//*****************************************************************************
// Public_EndStateChangeOutputError
//
// １．機能 
//      確認/確定時に検査の削除を実施するときに検査が出力中の場合の処理
//     
// ２．戻り値
//　　  無し
// ３．備考
//*****************************************************************************
function Public_EndStateChangeOutputError(){
  try{
    // タイマ予約解除
    clearTimeout(ChangeStateTimeOutId);
    // 2005/12/17 PVCS#1713 H.SAITO -ST-
    //// 処理中表示解除
    //Public_CloseMessage();
    // 出力中のため削除できないエラー
    EndProcStatus = ENDPROC_STATUS_ERROR_OUTPUT;
    // 2005/12/17 PVCS#1713 H.SAITO -ED-
    // 出力中のため削除できないメッセージ表示
    Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_ID_OUTPUT_EXCL,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_ID_OUTPUT_EXCL,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_ID_OUTPUT_EXCL,"Cannt Get Message.")); 
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+35);
  }
}
// 2005/05/14 H.SAITO 削除ロック対応
//*****************************************************************************
// Public_EndDeleteLockError
//
// １．機能 
//      確認/確定時に検査の削除を実施するときに検査が削除ロック中の場合の処理
// ２．戻り値
//　　  無し
// ３．備考
//*****************************************************************************
function Public_EndDeleteLockError(){
  try{
    // タイマ予約解除
    clearTimeout(ChangeStateTimeOutId);
    // 2005/12/17 PVCS#1713 H.SAITO -ST-
    //// 処理中表示解除
    //Public_CloseMessage();
    // 削除ロック中のため削除できないエラー
    EndProcStatus = ENDPROC_STATUS_ERROR_DELETELOCK;
    // 2005/12/17 PVCS#1713 H.SAITO -ED-
    // 削除ロック中のため削除できないメッセージ表示
    Public_Warning(RETRY_ERROR, top.DispFrame.Public_GetLangMsgTitle1(MSG_WARNING_ID_LOCK_EXCL,""), top.DispFrame.Public_GetLangMsgTitle2(MSG_WARNING_ID_LOCK_EXCL,""),top.DispFrame.Public_GetLangMsgString(MSG_WARNING_ID_LOCK_EXCL,"Cannt Get Message.")); 
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+51);
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

    //----------------------------------------------------------------//
    // ＲＵと検査の開放を行わない場合はサーバアクセスしないようにする //
    //----------------------------------------------------------------//
    if(ExclusiveModeRuRelease == EXCLUSIVE_NOTHING && ExclusiveModeStudyRelease == EXCLUSIVE_NOTHING){
      Public_EndExclusive(0 , 0);
    }
    else{
      //処理中表示
      Public_Message("DIALOG", ProcText);
      //タイマ予約

	  //2010/11/16 30501エラー対応 MOD ST
      ChangeStateTimeOutId = setTimeout("Public_ErrorDisplay('" + FATAL_ERROR + "',"+MESSAGE_ID_ACCESS_EXCLUSIVE+",'"+FILE_NAME+"',"+ (SPOT_CODE+36) +")", CHANGESTATE_TIMEOUT);
	  //2010/11/16 30501エラー対応 MOD ST
      //排他開放処理


      //parent.EXCLUSIVE_PROC.Public_Exclusive(PROC_MODE, parent.StudySequence, ExclusiveModeRuRelease, ExclusiveModeStudyRelease);
      parent.EXCLUSIVE_PROC.Public_Exclusive2(PROC_MODE, parent.StudySequence, ExclusiveModeRuRelease, ExclusiveModeStudyRelease,isMonitoring);    //MONI_V60_0713
    }
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+37);
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
    clearTimeout(ChangeStateTimeOutId);

    //ＲＵ排他開放エラーのチェックを行う
    if(returnCodeRu){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+38);
//      Public_Error(FATAL_ERROR, "Ru Exclusive Control was failed :"    +  returnCodeRu);
      return;
    }
    //検査排他開放エラーのチェックを行う
    if(returnCodeStudy){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+39);
//      Public_Error(FATAL_ERROR, "Study Exclusive Control was failed :" +  returnCodeStudy);
      return;
    }
    //2005/04/24 012 H.SAITO
    //排他取得状態(0:未取得,1:検査排他取得,2:検査,RU排他取得)
    if(ExclusiveModeStudyRelease == EXCLUSIVE_DELL_STUDY){
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
      //// 検査排他開放をクッキーに保存する



      //top.UnSetCookie(COOKIE_NAME_STUDY2, parent.StudySequence);
    }
    // 2005/06/25 012 H.SAITO 検査ごと削除する場合、Public_EndStateChangeにて
    // 排他開放フラグを変えているため、排他取得状態を未取得にするロジックが働かなくなり、排他開放を２回やってしまう不具合対応



    if(DeleteModeAtConfirm == DELETE_STUDY){
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
      //// 検査排他開放をクッキーに保存する



      //top.UnSetCookie(COOKIE_NAME_STUDY2, parent.StudySequence);
    }

	//2010/11/16 30501エラー対応 ADD ST
	if (top.ignoreFinish == true)
	{
		CommandMode = COMMAND_MODE_SUSPEND;
	}
	//2010/11/16 30501エラー対応 ADD ED

    // 2005/11/30 PVCS#1560 H.SAITO 排他エラーの見直し(自己排他エラーによる続行は不要のため削除) -ST-
    //// 2005/08/01 006 H.SAITO #790 ＲＵの自己排他エラー対応
    //// RUのCookieをクリアする。
    //// ただし、RUのCookieチェックの確認ダイアログにてキャンセル押下時はCookieをクリアしないで残す
    //if(parent.RuSelfExclusionErrorFlag != "1"){
    //  top.SetCookie(COOKIE_STUDY_SEQ, "");
    //}
    // 2005/11/30 PVCS#1560 H.SAITO 排他エラーの見直し(自己排他エラーによる続行は不要のため削除) -ED-
    
    //終了

    switch(CommandMode){
      // ビューアーモード時のみ別ブラウザを起動し、画面をクローズする
      case COMMAND_MODE_VIEW:
        // 2005/07/21 006 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
        //// 2005/06/21 005 H.SAITO 検査排他の変更(Cookie) 保存箇所の共有化
        ////// 2005/05/14 003 H.SAITO 検査排他の変更(Cookie)
        ////// クッキーを検査画面未起動にする
        ////CreateCookie(COOKIE_NAME, 0);
        //top.SetCookie(COOKIE_NAME, 0);
        // 画像参照への遷移
        
        window.open("http://" + HOST_NAME + "/FCRWeb/ImageView/Main.aspx?StudySeq=" + parent.StudySequence);
        top.Close(2);
        return;
      // ビューアーモード以外は上位に通知
      case COMMAND_MODE_COMPLETED:// 確認
      
        var notifyInfo = { "commandMode" : CommandMode, "commandParam" : CommandParam };	//MONI_V60_0713
        NotifyFrameFinished(notifyInfo);                                                                                    //MONI_V60_0713

        break;

      case COMMAND_MODE_SUSPEND:  // 保留
      // 2005/07/13 002 H.SAITO 再送処理対応
// 2014/03/14 TYS沼 DR直結対応 ADD START ------------------------------------------------
      case COMMAND_MODE_DRCHANGE:  // DR切替
// 2014/03/14 TYS沼 DR直結対応 ADD END --------------------------------------------------




      case COMMAND_MODE_STUDY_CANCEL: // 検査のキャンセル
        // 2005/07/21 006 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
        //// 2005/06/21 005 H.SAITO 検査排他の変更(Cookie) 
        ////// 2005/05/14 003 H.SAITO 検査排他の変更(Cookie)
        ////// クッキーを検査画面未起動にする
        ////CreateCookie(COOKIE_NAME, 0);
        //top.SetCookie(COOKIE_NAME, 0);
        
        // 親への完了通知
		//2010/11/16 30501エラー対応 MOD ST
        if (top.ignoreFinish != true)
        {
	        var notifyInfo = { "commandMode" : CommandMode, "commandParam" : CommandParam };
	        NotifyFrameFinished(notifyInfo);
        }
        top.ignoreFinish = false;
		//2010/11/16 30501エラー対応 MOD ED
        break;
      default:
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+40);
        break;
    
    
    }
    //処理中表示解除
    Public_CloseMessage();

    //変数初期化



    Fn_Init("ALL");
    
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+41);
  }
}
//************************************************
// Fn_GetImageTag
//
// １．機能 
//      ＩＭＧタグを生成する





// ２．戻り値
//　　  なし





// ３．備考





//************************************************
function Fn_GetImageTag(inputMode, menuTableNo){
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
    var urlString;          //ＵＲＬ

// 080507 HSK由比 ガイダンス表示対応 ADD-ST
    var tagName;                // タグ名
    var endTag;                 // 終了タグ
    var time;
    var scroll;                 // スクロールバーの指定
    var frameborder;            // 境界線の指定
// 080507 HSK由比 ガイダンス表示対応 ADD-ED

		//通常画像表示の場合



// 080502 HSK由比 ガイダンス表示対応 UPDATE-ST
        switch(inputMode)
        {
            case INPUT_MODE_NORMAL:
                //設定値を取得
                imageViewTop    = 0; //DIVからの相対位置のため0
                imageViewLeft   = 0; //DIVからの相対位置のため0
                imageViewHeight = VIEW_HEIGHT;
                imageViewWidth  = VIEW_WIDTH;
                imageHeight     = parent.ImageHeight[menuTableNo   - 1] - 0;
                imageWidth      = parent.ImageWidth[menuTableNo    - 1] - 0;
                imageFileName   = parent.ImageFileName[menuTableNo - 1];
                imageFilePath   = parent.ThumbnailFilePath[menuTableNo - 1];//** 2009/07/16 k.harada add
                break;
            case INPUT_MODE_THUMBNAIL:
                //設定値を取得
                imageViewTop    = 0; //DIVからの相対位置のため0
                imageViewLeft   = 0; //DIVからの相対位置のため0
                imageViewHeight = THUMBNAIL_HEIGHT;
                imageViewWidth  = THUMBNAIL_WIDTH;
                imageHeight     = parent.ThumbnailHeight[menuTableNo   - 1] - 0;
                imageWidth      = parent.ThumbnailWidth[menuTableNo    - 1] - 0;
                imageFileName   = parent.ThumbnailFileName[menuTableNo - 1];
                imageFilePath   = parent.ThumbnailFilePath[menuTableNo - 1];//** 2009/07/16 k.harada add
                break;
            case INPUT_MODE_GUIDANCE:
                //設定値を取得
                imageViewTop    = 0; //DIVからの相対位置のため0
                imageViewLeft   = 0; //DIVからの相対位置のため0
                imageHeight = imageViewHeight = GUIDANCE_HEIGHT;
                imageWidth  = imageViewWidth  = GUIDANCE_WIDTH;
                break;
            default:
                Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+80);
                break;
        }
//		if(inputMode == "NORMAL"){
//			//設定値を取得
//
//
//
//			imageViewTop    = 0; //DIVからの相対位置のため0
//			imageViewLeft   = 0; //DIVからの相対位置のため0
//			imageViewHeight = VIEW_HEIGHT;
//			imageViewWidth  = VIEW_WIDTH;
//			imageHeight     = parent.ImageHeight[menuTableNo   - 1] - 0;
//			imageWidth      = parent.ImageWidth[menuTableNo    - 1] - 0;
//			imageFileName   = parent.ImageFileName[menuTableNo - 1];
//		}
//		//サムネイル画像の場合
//
//
//
//		else{
//			//設定値を取得
//
//
//
//			imageViewTop    = 0; //DIVからの相対位置のため0
//			imageViewLeft   = 0; //DIVからの相対位置のため0
//			imageViewHeight = THUMBNAIL_HEIGHT;
//			imageViewWidth  = THUMBNAIL_WIDTH;
//			imageHeight     = parent.ThumbnailHeight[menuTableNo   - 1] - 0;
//			imageWidth      = parent.ThumbnailWidth[menuTableNo    - 1] - 0;
//			imageFileName   = parent.ThumbnailFileName[menuTableNo - 1];
//		}	
// 080502 HSK由比 ガイダンス表示対応 UPDATE-ED

    //画像の形状に合わせて表示領域＆位置を計算



    if(imageHeight > imageWidth){
      //長方形（縦長）



      imageWidth					= (imageWidth * imageViewHeight) / imageHeight;
      imageWidth					= Math.floor(imageWidth, 0);	//小数点以下切捨て
      imageHeight					= imageViewHeight;
      imageTopPosition    = imageViewTop;
      imageLeftPosition   = imageViewLeft + (imageViewWidth - imageWidth) / 2;
      imageLeftPosition   = Math.floor(imageLeftPosition, 0);	//小数点以下切捨て
    }
    else if(imageWidth > imageHeight){
      //長方形（横長）



      imageHeight					= (imageHeight * imageViewWidth) / imageWidth;
      imageHeight					= Math.floor(imageHeight, 0); //小数点以下切捨て
      imageWidth					= imageViewWidth;
      imageLeftPosition   = imageViewLeft;
      imageTopPosition    = imageViewTop + (imageViewHeight - imageHeight) / 2;
      imageTopPosition    = Math.floor(imageTopPosition, 0); //小数点以下切捨て
    }
    else{
      //正方形
      imageTopPosition    = imageViewTop;
      imageLeftPosition   = imageViewLeft;
      imageWidth          = imageViewWidth;
      imageHeight         = imageViewHeight;
    }
    //ファイルパス計算



// 080502 HSK由比 ガイダンス表示対応 UPDATE-ST
    if(inputMode == INPUT_MODE_GUIDANCE)
    {
        urlString = 'http://' + HOST_NAME + GUIDANCE_PATH + parent.MenuCode[menuTableNo - 1];
    }
    else
    {
        urlString = IMAGE_FILE_PATH + "/" + imageFileName;
    }
//    urlString = IMAGE_FILE_PATH + "/" + imageFileName;
// 080502 HSK由比 ガイダンス表示対応 UPDATE-ED
      
    //画像表示領域計算



    imageStyleString = "POSITION:absolute;";
    imageStyleString = imageStyleString + "TOP:"    + imageTopPosition    + "px;";
    imageStyleString = imageStyleString + "LEFT:"   + imageLeftPosition   + "px;";
    imageStyleString = imageStyleString + "WIDTH:"  + imageWidth					+ "px;";
    imageStyleString = imageStyleString + "HEIGHT:" + imageHeight					+ "px;";
    //IMGのONLOAD時にvisibleにする
    // 2005/02/08 004 H.SAITO 入力完了時にサムネイルが表示されなくなるため処理済画像のみ対応



// 080502 HSK由比 ガイダンス表示対応 UPDATE-ST
		if(inputMode == INPUT_MODE_NORMAL){
//		if(inputMode == "NORMAL"){
// 080502 HSK由比 ガイダンス表示対応 UPDATE-ED
      imageStyleString = imageStyleString + "visibility:hidden;";
		}
    //日付オブジェクト生成



    dateObject       = new Date();

    //画像タグ作成１



// 080507 HSK由比 ガイダンス表示対応 UPDATE-ST
    if(inputMode == INPUT_MODE_GUIDANCE)
    {
        imageTagId = "photo_guidance";
    }
    else
    {
        //通常サイズの画像はロードが終わったら表示する
        imageTagId   = "IMG_THUMBNAIL_" + menuTableNo;
    }
//		//通常サイズの画像はロードが終わったら表示する
//		imageTagId   = "IMG_THUMBNAIL_" + menuTableNo;
// 080507 HSK由比 ガイダンス表示対応 UPDATE-ED
// 2005/02/08 008 H.SAITO 入力完了時にサムネイルが表示されなくなるためコメントアウト



//    imageOnload  = "ONLOAD=Fn_ViewThumbNail('" + imageTagId + "');";
// 080502 HSK由比 ガイダンス表示対応 UPDATE-ST
		if(inputMode == INPUT_MODE_NORMAL){
//		if(inputMode == "NORMAL"){
// 080502 HSK由比 ガイダンス表示対応 UPDATE-ED
      imageOnload  = "ONLOAD=Fn_ViewThumbNail('" + imageTagId + "');";
		}
    else{
      imageOnload  = "";    
    }

    //画像タグ作成２



// 080502 HSK由比 ガイダンス表示対応 UPDATE-ST
    if(inputMode == INPUT_MODE_GUIDANCE)
    {
        tagName     = "IFRAME";
        time        = "";
        endTag      = "</IFRAME>";
        scroll      =  " SCROLLING='no'";
        frameborder = " FRAMEBORDER='0'";
    }
    else
    {
        tagName     = "IMG";
        time        = "?"+ dateObject.getTime();
        endTag      = "";
        scroll      = "";
        frameborder = "";
    }

//** 2009/07/16 k.harada add start
    switch(inputMode)
    {
    //2012/04/18 FF千葉 V2.3B DICOM受信性能改善 DEL-ST
    //    case INPUT_MODE_NORMAL:
    //        if(imageFilePath.indexOf("c:") == -1 && imageFilePath.indexOf("EMPTY") == -1)
    //        {
    //            var jpegFileName = imageFilePath.slice(0,imageFilePath.length - 5);//サムネイルファイル名からs.jpgをとる
    //            jpegFileName = jpegFileName + ".jpg";
    //           imageTagString = "<" + tagName + " SRC='" + jpegFileName + "'";
    //        }
    //        else
    //        {
    //            imageTagString = "<" + tagName + " SRC='" + urlString + time + "'";
    //        }
    //         break;
    //    case INPUT_MODE_THUMBNAIL:
    //        if(imageFilePath.indexOf("c:") == -1 && imageFilePath.indexOf("EMPTY") == -1)
    //        {
    //            imageTagString = "<" + tagName + " SRC='" + imageFilePath + "'";
    //        }
    //        else
    //        {
    //            imageTagString = "<" + tagName + " SRC='" + urlString + time + "'";
    //        }
    //        break;
    //2012/04/18 FF千葉 V2.3B DICOM受信性能改善 DEL-ED
    
	//2012/04/18 FF千葉 V2.3B DICOM受信性能改善 ADD-ST 
        case INPUT_MODE_NORMAL:
            var imageFilePathWithSubDir = "";
	        if(imageFilePath.indexOf("file:") > -1)
            {
                imageFilePathWithSubDir = imageFilePath.replace("file:", "");	//2012/04/18 FF千葉 V2.3B DICOM受信性能改善 ADD
            }
            if(imageFilePathWithSubDir.substr(0,2) == "//")
            {
                var jpegFileName = imageFilePath.slice(0,imageFilePath.length - 5);//サムネイルファイル名からs.jpgをとる
                jpegFileName = jpegFileName + ".jpg";
                imageTagString = "<" + tagName + " SRC='" + jpegFileName + "'";
            }
            else
            {
				imageFilePathWithSubDir = imageFilePathWithSubDir.replace("s.jpg", ".jpg");
				imageFilePathWithSubDir = imageFilePathWithSubDir.slice(imageFilePathWithSubDir.indexOf("/Image/"));
				imageFilePathWithSubDir = imageFilePathWithSubDir.replace("/Image/", "");	// Image/より後ろだけ取り出し。Sub/SubSub/FCRxxになる。
                imageTagString = "<" + tagName + " SRC='" + IMAGE_FILE_PATH + "/" + imageFilePathWithSubDir + time + "'";
            }
            break;
        case INPUT_MODE_THUMBNAIL:
            var imageFilePathWithSubDir = "";
            if(imageFilePath.indexOf("file:") > -1)
            {
                imageFilePathWithSubDir = imageFilePath.replace("file:", "");	//2012/04/18 FF千葉 V2.3B DICOM受信性能改善 ADD
            }
            if(imageFilePathWithSubDir.substr(0,2) == "//")
            {
                imageTagString = "<" + tagName + " SRC='" + imageFilePath + "'";
            }
            else
            {
				imageFilePathWithSubDir = imageFilePathWithSubDir.slice(imageFilePathWithSubDir.indexOf("/Image/"));
				imageFilePathWithSubDir = imageFilePathWithSubDir.replace("/Image/", "");	// Image/より後ろだけ取り出し。Sub/SubSub/FCRxxになる。
                imageTagString = "<" + tagName + " SRC='" + IMAGE_FILE_PATH + "/" + imageFilePathWithSubDir + time + "'";
            }
            break;
	//2012/04/18 FF千葉 V2.3B DICOM受信性能改善 ADD-ED
        case INPUT_MODE_GUIDANCE:
    imageTagString = "<" + tagName + " SRC='" + urlString + time + "'";
            break;
        default:
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+80);
            break;
    }
//** 2009/07/16 k.harada add end
//    imageTagString = "<" + tagName + " SRC='" + urlString + time + "'";  //** 2009/07/16 k.harada del
    imageTagString = imageTagString + " ID='" + imageTagId + "' " + imageOnload + scroll + frameborder + " STYLE='" + imageStyleString + "'>" + endTag;

//    imageTagString = "<IMG SRC='" + urlString + "?"+ dateObject.getTime() + "'";
//    imageTagString = imageTagString + " ID='" + imageTagId + "' " + imageOnload + " STYLE='" + imageStyleString + "'>";
// 080502 HSK由比 ガイダンス表示対応 UPDATE-ED
    return imageTagString;
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+42);
  }
}

// 080418 HSK由比 ガイダンス表示対応 ADD-ST
//************************************************
// Fn_IsShowGuidance
//
// １．機能 
//      撮影ガイダンスが表示されているか判定する
// ２．戻り値
//      true  : 撮影ガイダンス表示中
//      false : 撮影ガイダンス非表示(撮影画像)中
// ３．備考
//************************************************
function Fn_IsShowGuidance()
{
    return (document.getElementById("DIV_GuidanceImage").style.visibility == "visible");
}

//************************************************
// Fn_ShowMainImage
//
// １．機能 
//      メイン画像の表示を指定された内容に切り替える
// ２．戻り値
//      なし
// ３．備考
//     引数 mode              0:画像なし(黒画像)
//                            1:CR画像
//                            2:撮影ガイダンス画像
//************************************************
function Fn_ShowMainImage(mode)
{
  try
  {
    switch(mode)
    {
      case NOIMAGE_DISP:
        document.getElementById("DIV_PatientFilmImage").style.visibility        = "hidden";
        document.getElementById("DIV_GuidanceImage").style.visibility           = "hidden";
        break;
      case IMAGE_DISP:
        document.getElementById("DIV_PatientFilmImage").style.visibility        = "visible";
        document.getElementById("DIV_GuidanceImage").style.visibility           = "hidden";
        break;
      case GUIDANCE_DISP:
        document.getElementById("DIV_PatientFilmImage").style.visibility        = "hidden";
        document.getElementById("DIV_GuidanceImage").style.visibility           = "visible";
        break;
    }
  }
  catch(e)
  {
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+76);
  }
}

//************************************************
// Fn_UpdateGuidanceToggleBtn
//
// １．機能 
//      ガイダンス切り替えボタンの表示をメイン画像の表示に対応する内容に切り替える
// ２．戻り値
//      なし
// ３．備考
//************************************************
function Fn_UpdateGuidanceToggleBtn()
{
  try
  {
    if(Fn_IsShowGuidance())
    {
        document.getElementById("IMG_GuidanceToggleBtn_Enable").src = IMG_SHOW_GUIDANCE;
    }
    else
    {
        document.getElementById("IMG_GuidanceToggleBtn_Enable").src = IMG_SHOW_IMAGE;
    }
  }
  catch(e)
  {
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+77);
  }
}

//************************************************
// Fn_ChangeDispMode
//
// １．機能 
//      メイン画像、ガイダンス切り替えボタンの表示を指定された内容に切り替える
// ２．戻り値
//      なし
// ３．備考
//     引数 mode              0:画像なし(黒画像)
//                            1:CR画像
//                            2:撮影ガイダンス画像
//************************************************
function Fn_ChangeDispMode(mode)
{
  try
  {
    Fn_ShowMainImage(mode);
    Fn_UpdateGuidanceToggleBtn();

    if(mode == IMAGE_DISP)
    {
        // CR画像表示で選択中のメニューが既撮でだらだら表示以外のときは
        // 回転(元に戻すを含む)ボタンを活性にする
        if(parent.InputStatus[SelectMenuNo - 1] == STATE_COMPLETE && parent.InputMode != "INPUT")
        {
            Fn_RotateBtn_Enable(1);
        }
        else
        {
            Fn_RotateBtn_Enable(2);
        }
    }
    // CR以外のとき
    else
    {
        Fn_RotateBtn_Enable(2);
    }

  }
  catch(e)
  {
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+78);
  }
}

//************************************************
// Fn_SwitchGuidance
//
// １．機能 
//      メイン画像、ガイダンス切り替えボタンの表示切替(撮影画像⇔ガイダンス画像)を行う
// ２．戻り値
//      なし
// ３．備考
//************************************************
function Fn_SwitchGuidance()
{
  var mode;

  try
  {
    if(Fn_IsShowGuidance())
    {
        mode = IMAGE_DISP;
    }
    else
    {
        mode = GUIDANCE_DISP;
    }
    Fn_ChangeDispMode(mode);
  }
  catch(e)
  {
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+79);
  }
}

// 080418 HSK由比 ガイダンス表示対応 ADD-ED

//************************************************
// Fn_ViewThumNail
//
// １．機能 
//      IMGタグのOnLoad時に画像を表示する
// ２．戻り値
//　　  特になし



// ３．備考



//************************************************
function Fn_ViewThumbNail(imageTagId){
  try{
    document.getElementById(imageTagId).style.visibility = "visible";
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+43);
  }
}
// 2005/12/17 PVCS#1713 H.SAITO -ST-
//***************************************************************************
//  ModifyFunctionOpen()		
//  1．機能
//     CR検査修正画面開始
//  2．戻り値  
//		なし
//  3．備考
//      ここでは処理しない
//***************************************************************************
function Fn_ModifyFunctionOpen(openMode){
	try{
    switch(openMode){
      // 非選択通知を要求する

      case REQUEST_NOTIFY:
        // 処理中表示
        Public_Message("DIALOG", ProcText);
        // 選択通知を送った画像シーケンスを退避して非選択通知を送る
        NotifySelectIdStringBackup = parent.ImageSeq[SelectNextNo - 1];    
        Fn_SetNotify(false, "0", NOTIFY_FUNCTION_MODIFY);
        // だらだら停止
        Fn_StopWatchImageInput();
        break;
      // 修正ボタン押下して非選択通知が完了したあと
      case END_NOTIFY:
        // 処理中表示解除
        Public_CloseMessage();
        //修正機能への遷移
        // 親への完了通知
        var notifyInfo = { "commandMode" : COMMAND_MODE_MODIFY, "commandParam" : "" };
        NotifyFrameFinished(notifyInfo);

        break;
    }
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+73);
	}
}			
// 2005/12/17 PVCS#1713 H.SAITO -ED-
//***************************************************************************
//  OtherFunctionOpen()		
//  1．機能
//     2005/12/17 PVCS#1713 H.SAITO -ST-
//     //インジケータユーティリティ開始通知/修正画面開始
//     インジケータユーティリティ開始通知
//     2005/12/17 PVCS#1713 H.SAITO -ED-
//  2．戻り値  
//		なし
//  3．備考
//      本メソッドをインジケータが開始された場合のみ呼ばれるメソッドにする(PVCS#1713)
//***************************************************************************
function Public_OtherFunctionOpen(){
	try{
    // 2005/12/17 PVCS#1713 H.SAITO -ST-
    ////------------------------------------------//
    ////インジケータ開始通知/修正開始を受けた場合 //
    ////------------------------------------------//
    //---------------------------------//
    //インジケータ開始通知を受けた場合 //
    //---------------------------------//
    // 2005/12/17 PVCS#1713 H.SAITO -ED-
	// 2006/11/21 PVCS#1770 H.SAITO -ST-
	// インジケータからの通知は受けるが、画面では何もしないように変更
	//// 2005/07/15 005 H.SAITO 修正中にインジケータを開いた場合、閉じたときに選択通知を送ってしまう不具合対応
	//// 修正中フラグが修正中の場合は何もしない(0:検査中,1:修正中)
	//if(ModifyingFlag){
	//  return;
	//}
	//// 2005/08/01 005 H.SAITO #790 RU自己排他エラーの対応
	//// RU自己排他エラー時のCookieチェック確認ダイアログ表示中は何もしない
	//if(DialogMode == "DIALOG_SELFRU"){
	//  return;    
	//}
	//// 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ST-
	//if(ErrorDialogFlag){
	//  return;
	//}
	//// 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ED-
	//
	//// 2005/12/17 PVCS#1713 H.SAITO -ST-
	//// 終了処理中は何もしない
	//
	//if(EndProcFlag){
	//  return;
	//}
	//// 2005/12/17 PVCS#1713 H.SAITO -ED-
	//
	//// 2005/12/17 PVCS#1713 H.SAITO -ST-
	//// データ取得中は何もしない
	//
	//if(parent.EndGetDataFlag != 1){
	//  return;
	//}
	//// 2005/12/17 PVCS#1713 H.SAITO -ED-
	//
	//// 2005/10/06 H.SAITO -ST-
	////    // NotifySelectIdStringが空の場合は何もしない(起動時にエラーが発生した場合など)
	////    if(!NotifySelectIdString){
	////      return;
	////    }
	//// 2005/10/06 H.SAITO -ED-
	//// 選択通知を送った画像シーケンスを退避して非選択通知を送る
	//NotifySelectIdStringBackup = parent.ImageSeq[SelectNextNo - 1];    
	//// 2005/12/17 PVCS#1713 H.SAITO -ST-
	////Fn_SetNotify(false, "0");
	//Fn_SetNotify(false, "0", NOTIFY_FUNCTION_INDICATOR);
	//// 2005/12/17 PVCS#1713 H.SAITO -ED-
	//
	//// だらだら停止
	//Fn_StopWatchImageInput();
	// 2006/11/21 PVCS#1770 H.SAITO -ED-
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+44);
	}
}			
//***************************************************************************
//  OtherFunctionClose()		
//  1．機能
//     2005/12/17 PVCS#1713 H.SAITO -ST-
//     //インジケータユーティリティ終了通知/修正画面終了
//     インジケータユーティリティ終了通知
//     2005/12/17 PVCS#1713 H.SAITO -ED-
//  2．戻り値  
//		  なし
//  3．備考
//      本メソッドをインジケータが終了された場合のみ呼ばれるメソッドにする(PVCS#1713)
//***************************************************************************
function Public_OtherFunctionClose(){
	try{
    // 2005/12/17 PVCS#1713 H.SAITO -ST-
    ////-------------------------------------------------------//
    ////インジケータ終了通知/修正画面キャンセル終了を受けた場合//
    ////-------------------------------------------------------//
    //--------------------------------//
    //インジケータ終了通知を受けた場合//
    //--------------------------------//
    // 2005/12/17 PVCS#1713 H.SAITO -ED-

	// 2006/11/21 PVCS#1770 H.SAITO -ST-
	//// 2005/07/14 002 H.SAITO 再送処理対応
	//var sendData;
	//
	//// 2005/07/15 005 H.SAITO 修正中にインジケータを開いた場合、閉じたときに選択通知を送ってしまう不具合対応
	//// 修正中フラグが修正中の場合は何もしない(0:検査中,1:修正中)
	//if(ModifyingFlag){
	//	return;
	//}
	//// 2005/08/01 005 H.SAITO #790 RU自己排他エラーの対応
	//// RU自己排他エラー時のCookieチェック確認ダイアログ表示中は何もしない
	//if(DialogMode == "DIALOG_SELFRU"){
	//	return;    
	//}
	//// 2005/07/14 035 H.SAITO 再送処理対応
	//// 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ST-
	//if(ErrorDialogFlag){
	//	return;
	//}
	//// 2005/11/22 H.SAITO 検査情報取得直後のエラーダイアログ表示中にインジケータ操作によるRUステータスが変更する不具合対応 -ED-
	//
	//// 2005/12/17 PVCS#1713 H.SAITO -ST-
	//// 終了処理中は何もしない
	//
	//if(EndProcFlag){
	//	return;
	//}
	//// 2005/12/17 PVCS#1713 H.SAITO -ED-
	//
	//// 2005/12/17 PVCS#1713 H.SAITO -ST-
	//// データ取得中は何もしない
	//
	//if(parent.EndGetDataFlag != 1){
	//	return;
	//}
	//// 2005/12/17 PVCS#1713 H.SAITO -ED-
	//
	//// 再送処理のダイアログボックス表示中にインジケータをクリックしてインジケータを閉じた場合は何もしないようにする
	//if(ReSendMode != ""){
	//	return;
	//}
	//
	//// 2005/10/06 H.SAITO -ST-
	////    // NotifySelectIdStringが空の場合は何もしない(起動時にエラーが発生した場合など)
	////    if(!NotifySelectIdString){
	////      return;
	////    }
	//// 2005/10/06 H.SAITO -ED-
	//// すでに非選択通知を送っていた場合は、通常のポーリング処理へ
	//if(NotifyEndFlag == "1"){
	//	Fn_Resume_After_OtherFunctionClose();
	//	return;
	//}
	//else{
	//	NotifySelectIdString = NotifySelectIdStringBackup;
	//}
	//
	//// 入力中の場合は画像入力/画像処理エラーが発生している可能性があるため、
	//// エラーチェックを実施してから退避してある画像IDの選択通知を送る。(ただし、非入力中の場合は実施しない）
	//if(parent.InputMode == "INPUT"){
	//	// 画面をロック
	//	Public_Message("NODIALOG", "");     
	//	// ポーリングの戻り先を変えるため、フラグをセットする。
	//	ReSendFromIndicatorCloseFlag = 1;
	//	// ポーリングによるエラーチェック
	//	Fn_StartWatchImageInput();
	//	//      // タイマーセット
	//	//      WatchImageTimeOutId = setTimeout("Fn_TimeOut('WatchImage')", WATCHIMAGE_TIMEOUT);
	//	//			// チェック用のため、画像IDとチェック用ステータスをセット
	//	//      sendData = new Array();
	//	//			sendData.push(NotifySelectIdStringBackup);
	//	//			sendData.push(STATE_UNSHOT);
	//	//      // チェック
	//	//      parent.STUDY_WATCH_PROC.Public_GetData(PROC_MODE, NotifySelectIdStringBackup, sendData);
	//}
	//// 2005/12/17 PVCS#1713 H.SAITO -ST-
	////// 非入力時、修正画面キャンセル時は画像入力エラーは発生しないため、エラーチェックを実施しない。
	//// 非入力時は画像入力エラーは発生しないため、エラーチェックを実施しない。
	//// 2005/12/17 PVCS#1713 H.SAITO -ED-
	//else{
	//	Fn_Resume_After_OtherFunctionClose();
	//}
	////  2005/07/14 021 H.SAITO 再送処理対応(以下の処理を別メソッド[Fn_Resume_After_OtherFunctionClose()]にする）
	//////-------------------------------------------------------//
	//////インジケータ終了通知/修正画面キャンセル終了を受けた場合//
	//////-------------------------------------------------------//
	////// 選択通知を送信し、だらだらを再開する
	////// 退避していた画像シーケンスをもどして選択通知を送る
	////if(NotifyEndFlag != "1"){
	////  NotifySelectIdString = NotifySelectIdStringBackup;
	/////      Fn_SetNotify(true, NotifySelectIdString);     
	////  Fn_SetNotify(true, NotifySelectIdStringBackup);     
	////  Fn_StartWatchImageInput();
	////}
	////// 2005/02/09 MT No.91 009 H.SAITO
	////// すでに非選択通知を送っていた場合でも、
	////// 他機能(インジケータ)から戻ってきたときに、他機能を開いている間に入力完了した処理済画像が表示されないため
	////// 再度画像の入力をチェックし、画面で保持している入力ステータスを更新する
	////// 画像が入力完了していたならば、画面で保持している入力ステータス更新後、ポーリングは終了する
	////else{
	////// ポーリング再開
	////  Fn_StartWatchImageInput();
	////}
	// 2006/11/21 PVCS#1770 H.SAITO -ED-
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+45);
	}
}
// 2005/12/17 PVCS#1713 H.SAITO -ST-
//***************************************************************************
//  Fn_Resume_After_EndProcCancel()
//  1．機能
//      終了処理(保留/ビューアーモード/確認) のキャンセル/エラー後の検査再開処理
//  2．戻り値  
//		  なし
//  3．備考
//      なし
//***************************************************************************
function Fn_Resume_After_EndProcCancel(){
	try{
    // 終了処理中フラグを元に戻す

    EndProcFlag   = 0;
    // 終了処理状況ステータスを元に戻す

    EndProcStatus = "";

    // まだ入力完了でない場合は選択通知を送信し、だらだらを再開する
    // 退避していた画像シーケンスをもどして選択通知を送る
    if(NotifyEndFlag != "1"){
      NotifySelectIdString = NotifySelectIdStringBackup;
      Fn_SetNotify(true, NotifySelectIdStringBackup, "");     
      Fn_StartWatchImageInput();
    }
    // 既に入力完了していた場合は再開の必要は無いため何もしない

    else{
      //
    }
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+62);
	}
}
// 2005/12/17 PVCS#1713 H.SAITO -ED-
// 2005/07/14 032 H.SAITO 再送処理対応
//***************************************************************************
//  Fn_Resume_After_OtherFunctionClose()
//  1．機能
// 2006/11/21 PVCS#1770 H.SAITO -ST-
////      インジケータユーティリティ終了通知/修正画面終了後の検査再開処理
//      修正画面終了後の検査再開処理
// 2006/11/21 PVCS#1770 H.SAITO -ED-
//  2．戻り値  
//		  なし
//  3．備考
//      なし
//***************************************************************************
function Fn_Resume_After_OtherFunctionClose(){
	try{
    // 選択通知を送信し、だらだらを再開する
    // 退避していた画像シーケンスをもどして選択通知を送る
    if(NotifyEndFlag != "1"){
      NotifySelectIdString = NotifySelectIdStringBackup;
      // 2005/12/17 PVCS#1713 H.SAITO -ST-
      //Fn_SetNotify(true, NotifySelectIdStringBackup);     
      Fn_SetNotify(true, NotifySelectIdStringBackup, "");     
      // 2005/12/17 PVCS#1713 H.SAITO -ED-
      Fn_StartWatchImageInput();
    }
    // すでに非選択通知を送っていた場合でも、
    // 他機能(インジケータ)から戻ってきたときに、他機能を開いている間に入力完了した処理済画像が表示されないため
    // 再度画像の入力をチェックし、画面で保持している入力ステータスを更新する
    // 画像が入力完了していたならば、画面で保持している入力ステータス更新後、ポーリングは終了する
    else{
    // ポーリング再開
      Fn_StartWatchImageInput();
    }
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+62);
	}
}
//************************************************
// Fn_StartWatchImageInput
//
// １．機能 
//      画像取り込みの状態（だらだら入力）を開始する
// ２．戻り値
//　　  特になし
// ３．備考
//************************************************
function Fn_StartWatchImageInput(){
  try{
    // ポーリング中フラグをクリアして、ポーリングを継続するようにする
    PollingFlag = "";
    // ポーリング開始/再開
    Fn_WatchImageInput();
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+46);
  }
}
//************************************************
// Fn_StopWatchImageInput
//
// １．機能 
//      画像取り込みの状態（だらだら入力）を停止する
// ２．戻り値
//　　  特になし
// ３．備考
//************************************************
function Fn_StopWatchImageInput(){
  try{
    // ポーリング中フラグをＯＦＦにして、ポーリングを継続しないようにする
    PollingFlag = "OFF";
    // タイマをクリア
    clearTimeout(WatchImageTimeOutId);
	  clearTimeout(WatchImageInputId);
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+47);
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
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+48);
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
        //------------//
        // ボタン表示 //
        //------------//
        // 確認ボタン
		    document.getElementById("TABLE_UpdateBtn").style.visibility          = "hidden";
		    document.getElementById("IMG_UpdateBtn_Enable").style.visibility     = "hidden";
		    document.getElementById("IMG_UpdateBtn_Disable").style.visibility    = "visible";
		    document.getElementById("DIV_UpdateText").style.color                = "gray";
        // 修正ボタン
		    document.getElementById("TABLE_ModifyBtn").style.visibility          = "hidden";
		    document.getElementById("IMG_ModifyBtn_Enable").style.visibility     = "hidden";
		    document.getElementById("IMG_ModifyBtn_Disable").style.visibility    = "visible";
		    document.getElementById("DIV_ModifyText").style.color                = "gray";
        // 元に戻すボタン
		    document.getElementById("TABLE_UndoBtn").style.visibility            = "hidden";
		    document.getElementById("IMG_UndoBtn_Enable").style.visibility       = "hidden";
		    document.getElementById("IMG_UndoBtn_Disable").style.visibility      = "visible";
// 080516 HSK由比 ガイダンス表示対応 DELETE-ST
//		    document.getElementById("DIV_UndoText").style.color                  = "gray";
// 080516 HSK由比 ガイダンス表示対応 DELETE-ED
        // 左９０°ボタン
		    document.getElementById("TABLE_TurnLeftBtn").style.visibility        = "hidden";
		    document.getElementById("IMG_TurnLeftBtn_Enable").style.visibility   = "hidden";
		    document.getElementById("IMG_TurnLeftBtn_Disable").style.visibility  = "visible";
// 080516 HSK由比 ガイダンス表示対応 DELETE-ST
//		    document.getElementById("DIV_TurnLeftText").style.color              = "gray";
// 080516 HSK由比 ガイダンス表示対応 DELETE-ED
        // 右９０°ボタン
		    document.getElementById("TABLE_TurnRightBtn").style.visibility       = "hidden";
		    document.getElementById("IMG_TurnRightBtn_Enable").style.visibility  = "hidden";
		    document.getElementById("IMG_TurnRightBtn_Disable").style.visibility = "visible";
// 080516 HSK由比 ガイダンス表示対応 DELETE-ST
//		    document.getElementById("DIV_TurnRightText").style.color             = "gray";
// 080516 HSK由比 ガイダンス表示対応 DELETE-ED
        // １８０°ボタン
		    document.getElementById("TABLE_Turn180Btn").style.visibility         = "hidden";
		    document.getElementById("IMG_Turn180Btn_Enable").style.visibility    = "hidden";
		    document.getElementById("IMG_Turn180Btn_Disable").style.visibility   = "visible";
// 080516 HSK由比 ガイダンス表示対応 DELETE-ST
//		    document.getElementById("DIV_Turn180Text").style.color               = "gray";
// 080516 HSK由比 ガイダンス表示対応 DELETE-ED
        // 左右反転ボタン
		    document.getElementById("TABLE_ReverseBtn").style.visibility         = "hidden";
		    document.getElementById("IMG_ReverseBtn_Enable").style.visibility    = "hidden";
		    document.getElementById("IMG_ReverseBtn_Disable").style.visibility   = "visible";
// 080516 HSK由比 ガイダンス表示対応 DELETE-ST
//		    document.getElementById("DIV_ReverseText").style.color               = "gray";
// 080516 HSK由比 ガイダンス表示対応 DELETE-ED

		    //ビューアーモードの表示/非表示 保留ボタンの位置調整
		    if(OPEN_MODE == CE_MODE){	
          // 保留ボタン
			    document.getElementById("TABLE_SuspendBtn2").style.visibility        = "hidden";
			    document.getElementById("IMG_SuspendBtn2_Enable").style.visibility   = "hidden";
			    document.getElementById("IMG_SuspendBtn2_Disable").style.visibility  = "visible";
			    document.getElementById("DIV_SuspendText2").style.color              = "gray";
		    }
		    else{
                // 2014/03/06 TYS沼 DR直結対応 ADD START ------------------------------------------------
                // DR切替ボタン
                // キー値が有効の場合のみ処理を実施
                if(CONNECTINGDR_USE == 1)
                {
                    Fn_DRChangeBtn_Enable(2);
                }
                // 2014/03/06 TYS沼 DR直結対応 ADD END ------------------------------------------------
          // 保留ボタン
			    document.getElementById("TABLE_SuspendBtn").style.visibility        = "hidden";
			    document.getElementById("IMG_SuspendBtn_Enable").style.visibility   = "hidden";
			    document.getElementById("IMG_SuspendBtn_Disable").style.visibility  = "visible";
			    document.getElementById("DIV_SuspendText").style.color              = "gray";
          // ビューアーモードボタン
			    document.getElementById("TABLE_ViewBtn").style.visibility           = "hidden";
			    document.getElementById("IMG_ViewBtn_Enable").style.visibility			= "hidden";
			    document.getElementById("IMG_ViewBtn_Disable").style.visibility			= "visible";
			    document.getElementById("DIV_ViewText").style.color                 = "gray";
			    
//2009/06/12 Nishikawa Update-ST V6.0撮影画面最小化対応
			    document.getElementById("TABLE_SimpleBtn").style.visibility        = "hidden";
			    document.getElementById("IMG_SimpleBtn_Enable").style.visibility   = "hidden";
			    document.getElementById("IMG_SimpleBtn_Disable").style.visibility  = "visible";
			    document.getElementById("DIV_SimpleText").style.color              = "gray";
//2009/06/12 Nishikawa Update-ED V6.0撮影画面最小化対応
			    
		    }
// 080424 HSK由比 ガイダンス表示対応 ADD-ST
            if(GUIDANCE_USE == 1)
            {
                // ガイダンス表示切替ボタン
                Fn_GuidanceBtn_Enable(2);
            }
// 080424 HSK由比 ガイダンス表示対応 ADD-ED
	      break;
	    case 1:   //活性
        //------------//
        // ボタン表示 //
        //------------//
        // 確認ボタン
		    document.getElementById("TABLE_UpdateBtn").style.visibility         = "visible";
		    document.getElementById("IMG_UpdateBtn_Enable").style.visibility    = "visible";
		    document.getElementById("IMG_UpdateBtn_Disable").style.visibility   = "hidden";
		    document.getElementById("DIV_UpdateText").style.color               = "black";
        // 修正ボタン
				//#1432 2005/09/17--ST
		    if(OPEN_MODE == CE_MODE){
			    document.getElementById("TABLE_ModifyBtn").style.visibility         = "visible";
			    document.getElementById("IMG_ModifyBtn_Enable").style.visibility    = "visible";
			    document.getElementById("IMG_ModifyBtn_Disable").style.visibility   = "hidden";
			    document.getElementById("DIV_ModifyText").style.color               = "black";
				}else{
					if(ModifyDispFlag == 1){
				    document.getElementById("TABLE_ModifyBtn").style.visibility         = "visible";
				    document.getElementById("IMG_ModifyBtn_Enable").style.visibility    = "visible";
				    document.getElementById("IMG_ModifyBtn_Disable").style.visibility   = "hidden";
				    document.getElementById("DIV_ModifyText").style.color               = "black";
				   }
				}
				//#1432 2005/09/17--EN

		    //ビューアーモードの表示/非表示 保留ボタンの位置調整
		    if(OPEN_MODE == CE_MODE){	
          // 保留ボタン
			    document.getElementById("TABLE_SuspendBtn2").style.visibility        = "visible";
			    document.getElementById("IMG_SuspendBtn2_Enable").style.visibility   = "visible";
			    document.getElementById("IMG_SuspendBtn2_Disable").style.visibility  = "hidden";
			    document.getElementById("DIV_SuspendText2").style.color              = "black";
		    }
		    else{
                // 2014/03/06 TYS沼 DR直結対応 ADD START ------------------------------------------------
                // DR切替ボタン
                // キー値が有効の場合のみ処理を実施
                if(CONNECTINGDR_USE == 1 && CRImageShotOnce == 0)
                {
                    // DR切替ボタン活性化
                    for(i = 0; i < parent.DataCount; i++){
                        //既撮の撮影メニューがあるか確認
                        if(parent.InputStatus[i] == STATE_COMPLETE){
                            break;
                        }
                    }
                    if(i >= parent.DataCount ){
                        Fn_DRChangeBtn_Enable(1);
                    }
                }
                // 2014/03/06 TYS沼 DR直結対応 ADD END --------------------------------------------------
          // 保留ボタン
			    document.getElementById("TABLE_SuspendBtn").style.visibility        = "visible";
			    document.getElementById("IMG_SuspendBtn_Enable").style.visibility   = "visible";
			    document.getElementById("IMG_SuspendBtn_Disable").style.visibility  = "hidden";
			    document.getElementById("DIV_SuspendText").style.color              = "black";
          // ビューアーモードボタン
			    document.getElementById("TABLE_ViewBtn").style.visibility           = "visible";
			    document.getElementById("IMG_ViewBtn_Enable").style.visibility			= "visible";
			    document.getElementById("IMG_ViewBtn_Disable").style.visibility			= "hidden";
			    document.getElementById("DIV_ViewText").style.color                 = "black";
			    
//2009/06/12 Nishikawa Update-ST V6.0撮影画面最小化対応
			    document.getElementById("TABLE_SimpleBtn").style.visibility        = "visible";
			    document.getElementById("IMG_SimpleBtn_Enable").style.visibility   = "visible";
			    document.getElementById("IMG_SimpleBtn_Disable").style.visibility  = "hidden";
			    document.getElementById("DIV_SimpleText").style.color              = "black";
//2009/06/12 Nishikawa Update-ED V6.0撮影画面最小化対応
		    }
// 080507 HSK由比 ガイダンス表示対応 ADD-ST
            if(GUIDANCE_USE == 1)
            {
                // ガイダンス表示切替ボタン
                Fn_GuidanceBtn_Enable(1);
            }
// 080507 HSK由比 ガイダンス表示対応 ADD-ED
 	      break;
	    default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+49);
	      break;
	  }
	}
	catch(e){
     Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+50);
	}
}
// 2005/07/13 064 H.SAITO 再送処理対応 再送処理で入力を中断した検査を再開する場合のダイアログ
//*****************************************************************************
// Public_Confirm_ReSend
//
// １．機能 
//      確認ボックスの表示を行う(再送処理で入力を中断した検査を再開する場合のダイアログ)
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Public_Confirm_ReSend(){
  try{
    if(parent.OpenMode == OPEN_MODE_WINDOW){ //PVCS#3427
      window.external.IndicateError(); //RESEND_V60_0914
    }                                  //RESEND_V60_0914
    // 再送処理のモードによってOKボタンのみの表示、OK,キャンセルボタンの表示とをわける
    switch(ReSendMode){
      // Okボタンの表示,位置調整
      case RESEND_MODE_ERROR_INPUT_IMAGE:            //画像入力中にエラーが発生した場合のモード...OK
      case RESEND_MODE_ERROR_IMAGE_PROC:             //画像処理中にエラーが発生した場合のモード...OK
      case RESEND_MODE_ERROR_INPUT_IMAGE_AND_RESUME: //入力を中断した検査を再開するモード...OK
	      document.getElementById("IMG_ConfirmCancelButton_ReSend").style.visibility = "hidden";
	      document.getElementById("DIV_ConfirmCancelText_ReSend").style.visibility   = "hidden";
        document.getElementById("DIV_ConfirmOkText_ReSend").style.left             = "350px";
        document.getElementById("IMG_ConfirmOkButton_ReSend").style.left           = "350px";
        break;
      // Ok,Cancelボタンの表示,位置調整
      case RESEND_MODE_ERROR_INPUT_IMAGE_NOT_RESUME: //入力を中断した検査以外の検査を再開するモード...OK,Cancel
	      document.getElementById("IMG_ConfirmCancelButton_ReSend").style.visibility = "visible";
	      document.getElementById("DIV_ConfirmCancelText_ReSend").style.visibility   = "visible";
        document.getElementById("DIV_ConfirmOkText_ReSend").style.left             = "500px";
        document.getElementById("IMG_ConfirmOkButton_ReSend").style.left           = "500px";
        break;
      default:
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+57);
        break;
    }
	  document.getElementById("TABLE_ConfirmFrame").style.visibility         = "visible";
	  document.getElementById("TABLE_ConfirmBox_ReSend").style.visibility    = "visible";
	  document.getElementById("IMG_ConfirmOkButton_ReSend").style.visibility = "visible";
	  document.getElementById("DIV_ConfirmOkText_ReSend").style.visibility   = "visible";
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+55);
  }
}
//*****************************************************************************
// Public_CloseConfirm_ReSend
//
// １．機能 
//      確認ボックスを閉じる
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Public_CloseConfirm_ReSend(){
  try{
	  document.getElementById("TABLE_ConfirmFrame").style.visibility             = "hidden";
	  document.getElementById("TABLE_ConfirmBox_ReSend").style.visibility        = "hidden";
	  document.getElementById("IMG_ConfirmOkButton_ReSend").style.visibility     = "hidden";
	  document.getElementById("DIV_ConfirmOkText_ReSend").style.visibility       = "hidden";
	  document.getElementById("IMG_ConfirmCancelButton_ReSend").style.visibility = "hidden";
	  document.getElementById("DIV_ConfirmCancelText_ReSend").style.visibility   = "hidden";
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+56);
  }
}
// 2005/08/03 041 H.SAITO #790 RU自己排他エラー対応 排他エラーが発生した場合のエラーダイアログ
//*****************************************************************************
// Fn_Error_SelfRu
//
// １．機能 
//      エラーボックスの表示を行う(ＲＵの自己排他エラー後、Cookieチェックで検査シーケンスが異なる場合のダイアログ)
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Fn_Error_SelfRu(){
  try{
    if(parent.OpenMode == OPEN_MODE_WINDOW){ //PVCS#3427
      window.external.IndicateError(); //RESEND_V60_0914
    }                                  //RESEND_V60_0914
		document.getElementById("TD_ErrorTitle1_SelfRu").innerHTML          = top.DispFrame.Public_GetLangMsgTitle1(MSG_ERROR_SELFRU,"");
		document.getElementById("TD_ErrorTitle2_SelfRu").innerHTML          = top.DispFrame.Public_GetLangMsgTitle2(MSG_ERROR_SELFRU,"");
		document.getElementById("TD_ErrorText_SelfRu").innerHTML            = top.DispFrame.Public_GetLangMsgString(MSG_ERROR_SELFRU,"Cannt Get Message.");
    document.getElementById("DIV_ErrorOkText_SelfRu").innerText         = "OK";
    document.getElementById("TABLE_ErrorFrame_SelfRu").style.visibility = "visible";
    document.getElementById("DIV_ErrorButton_SelfRu").style.visibility  = "visible";
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+66);
  }
}
//*****************************************************************************
// Fn_CloseError_SelfRu
//
// １．機能 
//      エラーボックスを閉じる
// ２．戻り値
//　　  無し



// ３．備考



//*****************************************************************************
function Fn_CloseError_SelfRu(){
  try{
    //エラー表示を閉じる
    document.getElementById("TABLE_ErrorFrame_SelfRu").style.visibility = "hidden";
    document.getElementById("DIV_ErrorButton_SelfRu").style.visibility  = "hidden";
  }
  catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+67);
  }
}
//#1432 2005/09/17--ST
//***************************************************************************
//  Public_EndModify()
//  1．機能
//     修正機能読み込み完了通知
//  2．戻り値  
//		  なし



//  3．備考



//      
//***************************************************************************
function Public_EndModify(){
  try{
		 ModifyDispFlag = 1;
		 Fn_ModifyBtn_Enable(1);
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+68);
	}
}
//#1432 2005/09/17--EN

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
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+110);
    }
}

//2007/03/08 PVCS#2109 K.HOSHINO 中断再開時に呼び出されるメソッドを追加--START
//*****************************************************************************
// Fn_Discontinue
//
// １．機能 
//      画像入力中に電源が落とされた場合、入力中であったメニューを選択し、ポーリングを再開する
// ２．戻り値
//　　  無し
// ３．備考
//*****************************************************************************
function Fn_Discontinue(imageId)
{
  try{
    var tableNo;  //再選択する画像IDの添え字
    DiscontinueFlag = true;	//中断処理を行うのでtrueにする
	tableNo = parent.AssosiateId[imageId]; // 再選択する画像IDの添え字を取得する


    // 次取り込み対象メニューをエラーが発生した画像IDにする
    SelectNextPage  = Math.ceil((tableNo + 1) / MAXMENU);
    SelectNextNo    = tableNo + 1;
    SelectNextTable = tableNo % MAXMENU + 1;
    
    //次取り込み対象メニューと選択されているメニューは同一にする 
    SelectMenuPage  = SelectNextPage;
    SelectMenuNo    = SelectNextNo;		//だらだら画像表示をさせるためにだらだら情報ありメニューと選択中メニューを同一にする※EndWatchImageInputの実装参照
    SelectMenuTable = SelectNextTable;	
    
    //撮影画面のページ表示
    Fn_SelectPage(SelectMenuPage);
    
    //入力中の撮影メニューを選択状態にする
    document.getElementById("DIV_StudyMenu5").style.visibility = "visible";    
    document.getElementById("DIV_StudyMenu5").style.top        = SELECTMENU_TOP + SELECTMENU_TOP_REVICE * (SelectMenuTable - 1);    
    document.getElementById("DIV_StudyMenu5").style.left       = SELECTMENU_LEFT;
        
    //メニュー選択通知
    Fn_SetNotify(true, imageId, "");

	// ポーリング再開
    Fn_StartWatchImageInput(); 
    
    // ボタン押下禁止を解除
    Fn_ButtonEnable(1);
    Public_CloseMessage();
        
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+74);
  }
}
//2007/03/08 PVCS#2109 K.HOSHINO 中断再開時に呼び出されるメソッドを追加--END

//2009/06/12 Nishikawa Update-ST V6.0撮影画面最小化対応
//*****************************************************************************
// Fn_UpdateImgCount
//
// １．機能 
//      簡易撮影画面の撮影進捗カウンタを更新する
//      進捗カウンタでの完了を取得
// ２．戻り値
//　　  無し
// ３．備考
//*****************************************************************************
function Fn_UpdateImgCount()
{
  try{
    if(parent.OpenMode != OPEN_MODE_WINDOW){
      return;
    }

    var i;					//ループカウンタ
    var CompleteCount = 0;  //撮影済画像数

    for(i = 0; i < parent.DataCount; i++){
      if(parent.InputStatus[i] == STATE_COMPLETE){
      CompleteCount++;
      }
    }

    window.external.SetAllImageCount(parent.DataCount);
    window.external.SetCurrentImageCount(CompleteCount);
    
    if(CompleteCount == parent.DataCount){
      window.external.CompleteStudy();
    }
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+81);
  }
}
//2009/06/12 Nishikawa Update-ED V6.0撮影画面最小化対応