/****************************************************************************

  @file ReserveStudy_Ctrl.js

  @brief ReserveStudy_Ctrlのクライアントスクリプト

  @author YSK畑
        SpotCode MAX 13

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/13  YSK畑       V1.0       新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応　@date  14/02/27  FFS星野     V2.4(B)HF0007 CQ#2393対応

/****************************************************************************/
//[定数]
var PROC_MODE     = "RESERVESTUDY_CTRL";

var COMMAND_MODE_CANCEL   = "CANCEL";
var COMMAND_MODE_REGISTER = "REGISTER";
var COMMAND_MODE_STUDY    = "STUDY";

var VIEW_MODE_INFOMATION   = "INFORMATION_VIEW";
var VIEW_MODE_VIEW         = "RESERVESTUDY_VIEW";
var VIEW_MODE_GETPROC      = "RESERVESTUDY_GET_PROC";
var VIEW_MODE_DELETE       = "RESERVESTUDY_DELETE";
var VIEW_MODE_EXCLUSIVE    = "EXCLUSIVE_PROC";

// 排他モード
var EXCLUSIVE_MODE1 = 1;
var EXCLUSIVE_MODE2 = 2;
var EXCLUSIVE_MODE3 = 3;

// 性別 
var SEX_MALE            = 1;					// 男性
var SEX_FEMALE          = 2;					// 女性
var SEX_OTHER           = 3;					// その他

// エラーモード
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード

var FILE_NAME = "ReserveStudy_Ctrl.js"  //ファイル名

var MESSAGE_ID = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS   = 30501;              //メッセージID 

//変数仮定義(検査登録単位で保持しておく情報)===========================
var ExclusiveMode = "";		// 排他モード


var PatientId         = "";
var PatientName       = "";
var PatientKanjiName  = "";
var PatientSex        = SEX_OTHER;
var PatientBirthDate  = "";
var GetDate;

var StudySequence = "";			// 検査シーケンス
var StudyStateFlag = 0;			// 検査ステータス
var TransStateFlag = 0;			// 遷移ステータス
var ReservePage    = 1;
var ReserveMaxPage = 1;

var MenuNameInfoArray  = new Array();		// メニュー名称
var MenuStateInfoArray = new Array();		// 未撮/既撮情報
var MenuImageInfoArray = new Array();		// 写損情報
var g_MenuDate = "";

var OpenMode       = 0;     // オープンモード(CE:0)

var DeleteButtonEnable = 0;// 14/02/27 FFS星野 V2.4(B)HF0007 CQ#2393対応 ADD

//=====================================================================
//*****************************************************************************
// Fn_InitPage
// １．機能
//      ページロード時の処理
// ２．戻り値
//　　  なし
// ３．備考
//　　　なし
//*****************************************************************************
function Fn_InitPage(){
	try{

		//ページローダ生成
		var loader = new PageLoader();
		//ページ情報追加
		loader.AddLoadPage(VIEW_MODE_VIEW,"./ReserveStudy_View.aspx");  
		loader.AddLoadPage(VIEW_MODE_GETPROC,"./ReserveStudy_Get_Proc.aspx");  
		loader.AddLoadPage(VIEW_MODE_DELETE,"./ReserveStudy_Delete.aspx");  
		loader.AddLoadPage(VIEW_MODE_INFOMATION,"./Information_View.aspx");  
		loader.AddLoadPage(VIEW_MODE_EXCLUSIVE,"./Exclusive_Proc.aspx");
		loader.AddLoadPage("CHECKCOMMAND_PROC","./CheckCommand_Proc.aspx");
		//ロード開始
		loader.Start();

	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
	}

}

//***************************************************************************
//  Public_Init
//  1．機能
//      予約検査初期表示
//
//  2．戻り値  
//      なし
//
//  3．備考
//
//***************************************************************************
function Public_Init()
{
    try{
        // 排他モード設定
        ExclusiveMode = EXCLUSIVE_MODE1;
        // インジケータ画面通知
        top.SetCurrentView("RESERVESTUDY");
        //初期画面（予約検査画面）遷移処理
        var moveViewInfo = new MoveViewInfo(VIEW_MODE_VIEW);
        // コールバック関数の登録
        moveViewInfo.SetFinishedNotification(ViewFinished);
        //画面遷移実行
        MoveView(moveViewInfo);
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
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
        switch(viewId){
        // 予約検査機能
        case VIEW_MODE_VIEW:
            if(viewInfo.commandMode == COMMAND_MODE_CANCEL){
                ReserveStudy_Logoff();
            }
            else if(viewInfo.commandMode == COMMAND_MODE_REGISTER){
                ReserveStudy_RegistStudy();
            }
            else if(viewInfo.commandMode == COMMAND_MODE_STUDY){
                ReserveStudy_Study();
            }
            break;
        default:
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
            return;
        }
        // 画面フレームIDを設定
        ViewId = viewId;
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
    }
}
//***************************************************************************
//  ReserveStudy_Display()
//
//  1．機能
//       予約機能呼び出し要求(修正メイン画面から遷移)
//
//  2．戻り値  
//       なし
//  3．備考
//
//***************************************************************************
function ReserveStudy_Display()
{
    try{
        // 予約検査画面遷移
        var moveViewInfo = new MoveViewInfo(VIEW_MODE_VIEW);
        //ページ遷移（更新）
        moveViewInfo.SetMovingMode(FC_MOVING_MODE_UPDATE);
        //画面遷移処理実行
        MoveView(moveViewInfo);
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
    }
}

//***************************************************************************
//  ReserveStudy_Study()
//
//  1．機能
//      検査機能呼び出し要求(サブメインフレームに要求)
//
//  2．戻り値
//     なし
//
//  3．備考
//
//***************************************************************************
function ReserveStudy_Study()
{
    try{
        // インジケータ画面通知
        top.SetCurrentView("");
        // 親への完了通知
        var notifyInfo = { "commandMode" : COMMAND_MODE_STUDY };
        NotifyFrameFinished(notifyInfo);
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
    }
}
//***************************************************************************
//  RegistStudy_ReserveStudy()
//
//  1．機能
//      検査登録機能呼び出し要求(サブメインフレームに要求)
//
//  2．戻り値  
//     なし
//
//  3．備考
//
//***************************************************************************
function ReserveStudy_RegistStudy()
{
    try{
        // インジケータ画面通知
        top.SetCurrentView("");
        // 親への完了通知
        var notifyInfo = { "commandMode" : COMMAND_MODE_REGISTER };
        NotifyFrameFinished(notifyInfo);
        // 予約検査機能のデータをクリア
        Fn_Init();
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
    }
}
//***************************************************************************
//  ReserveStudy_Logoff()
//
//  1．機能
//      ログオフ( CEメイン機能に処理要求を行う)
//
//  2．戻り値
//      なし
//
//  3．備考
//
//***************************************************************************
function ReserveStudy_Logoff()
{
    try{
        // インジケータ画面通知
        top.SetCurrentView("LOGIN");
        // 親への完了通知
        var notifyInfo = { "commandMode" : COMMAND_MODE_CANCEL };
        NotifyFrameFinished(notifyInfo);
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
    }
}

//***************************************************************************
//  Public_View_Modify(viewId : 画面フレームID)
//
//  1．機能
//      修正機能の呼び出し
//
//  2．戻り値  
//      なし
//
//  3．備考
//
//***************************************************************************
function Public_View_Modify(viewId)
{
    try{
        // 修正機能呼び出し
        parent.Public_View_Modify(viewId);
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
    }
}

//***************************************************************************
//  IndicatorUtilityOpen()
//  1．機能
//      インジケータユーティリティ開始通知
//
//  2．戻り値  
//      なし
//
//  3．備考
//
//***************************************************************************
function IndicatorUtilityOpen(){
    try{
        RESERVESTUDY_VIEW.IndicatorUtilityOpen();
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+10);
    }
}

//***************************************************************************
//  IndicatorUtilityClose()
//  1．機能
//      インジケータユーティリティ開始通知
//  2．戻り値  
//      なし

//  3．備考

//***************************************************************************
function IndicatorUtilityClose(){
    try{
        RESERVESTUDY_VIEW.IndicatorUtilityClose();
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+11);
    }
}

//***************************************************************************
//  Fn_Init()
//
//  1．機能
//      予約検査情報初期化
//
//  2．戻り値  
//      なし
//
//  3．備考
//
//***************************************************************************
function Fn_Init()
{
    try{
        // 情報初期化
        PatientId        = "";
        PatientName      = "";
        PatientKanjiName = "";
        PatientSex       = SEX_OTHER;
        PatientBirthDate = "";
        StudySequence    = "";
        StudyStateFlag = 0;
        MenuNameInfoArray = new Array();
        MenuStateInfoArray = new Array();
        MenuImageInfoArray = new Array();
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+12);
    }
}
