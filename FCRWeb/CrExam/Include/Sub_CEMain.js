/****************************************************************************

  @file Sub_CEMain.js

  @brief Sub_CEMainのクライアントスクリプト

  @author YSK畑
        SPotCode MAX 14

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/21  YSK畑       V1.0　     新規作成
  @date  06/08/09  HSK酒井     V1.4       CR検査部構造見直し[8]対応
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応

*****************************************************************************/

//[定数]
var PROC_MODE_RESERVE      = "RESERVESTUDY_CTRL";
var PROC_MODE_REGIST       = "REGISTSTUDY_CTRL";
var PROC_MODE_STUDY        = "STUDY_CTRL";
var PROC_MODE_MODIFY       = "MODIFY_CTRL";

var COMMAND_MODE_CANCEL    = "CANCEL";
var COMMAND_MODE_UPDATE    = "UPDATE";
var COMMAND_MODE_REGISTER  = "REGISTER";
var COMMAND_MODE_STUDY     = "STUDY";
var COMMAND_MODE_ENTRY     = "ENTRY";
var COMMAND_MODE_SUSPEND   = "SUSPEND";
var COMMAND_MODE_COMPLETED = "COMPLETED";
// 2005/07/13 H.SAITO 002 再送処理対応
var COMMAND_MODE_STUDY_CANCEL = "CANCEL";	// 検査のキャンセル(エラーが発生した画像がある検査をキャンセルした場合）

// 検査画面状況フラグ
var SCREEN_STATUS_INIT   = 0;	// 初期
var SCREEN_STATUS_MODIFY = 1;	// 修正完了

var SCREEN_STATUS_CANCEL = 2;	// 修正キャンセル

// エラーモード
var FATAL_ERROR         = "FATAL_ERROR";            //致命的なエラー 
var RETRY_ERROR         = "RETRY_ERROR";            //再試行可能なエラー
var SPOT_CODE           = 0;                        //スポットコード

var FILE_NAME           = "Sub_CEMain.js";           //ファイル名

var MESSAGE_ID          = 30500;                    //メッセージID 
var MESSAGE_ID_ACCESS   = 30501;                    //メッセージID 

//[変数]
// 機能フレーム
var ProcId = "";
var ScreenStatus = SCREEN_STATUS_INIT;	//検査画面状況フラグ(0:初期 1:修正完了 2:修正キャンセル) 

//*****************************************************************************
// Fn_InitPage
//
// １．機能
//      ページロード時の処理

// ２．戻り値
//　　  なし// ３．備考
//　　　なし
//*****************************************************************************
function Fn_InitPage(){
	try{
		//ページローダ生成
		var loader = new PageLoader();
		//ページ情報追加
		loader.AddLoadPage(PROC_MODE_RESERVE,"./ReserveStudy_Ctrl.aspx?OpenMode=0");
		loader.AddLoadPage(PROC_MODE_REGIST,"./RegistStudy_Ctrl.aspx?OpenMode=0");
		loader.AddLoadPage(PROC_MODE_STUDY,"./Study_Ctrl.aspx?OpenMode=0");
		loader.AddLoadPage(PROC_MODE_MODIFY,"./Modify_Ctrl.aspx?OpenMode=0");
		//ロード開始
		loader.Start();
	}catch(e){
  Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
	}

}

//***************************************************************************
//  Public_Init()
//
//  1．機能
//      CE機能の初期化//
//  2．戻り値  
//      なし//  3．備考//     
//***************************************************************************
function Public_Init(){
	try{
		// 初期化(予約検査画面表示
		SubCEMain_ReserveStudy();
		
		
	}catch(e){
  Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
	}
}

//***************************************************************************
//  CtrlFinished
//  1．機能
//      機能フレーム終了時のハンドラ
//
//  2．戻り値
//
//  3．備考
//
//***************************************************************************
function CtrlFinished(procId, procInfo){
    try{
        switch(procId){
        // 予約検査機能
        case PROC_MODE_RESERVE:
            // ログオフボタン押下
            if(procInfo.commandMode == COMMAND_MODE_CANCEL){
                SubCEMain_Logoff();
            }
            // 新規登録ボタン押下
            else if(procInfo.commandMode == COMMAND_MODE_REGISTER){
                SubCEMain_RegistStudy();
            }
            // 検査開始ボタン押下
            else if(procInfo.commandMode == COMMAND_MODE_STUDY){
                SubCEMain_Study();
            }
            break;
        // 検査登録機能
        case PROC_MODE_REGIST:
            // 検査登録戻るボタン押下
            if(procInfo.commandMode == COMMAND_MODE_CANCEL){
                SubCEMain_ReserveStudy();
            }
            // 登録ボタン押下
            else if(procInfo.commandMode == COMMAND_MODE_ENTRY){
                SubCEMain_ReserveStudy();
            }
            // 検査開始ボタン押下
            else if(procInfo.commandMode == COMMAND_MODE_STUDY){
                SubCEMain_Study();
            }
            break;
        // 検査機能
        case PROC_MODE_STUDY:
            // 保留ボタン押下
            if(procInfo.commandMode == COMMAND_MODE_SUSPEND){
                SubCEMain_ReserveStudy();
            }
            // 確定ボタン押下
            else if(procInfo.commandMode == COMMAND_MODE_COMPLETED){
                SubCEMain_ReserveStudy();
            }
            // 検査キャンセル(エラーが発生した画像がある検査をキャンセルした場合）
            else if(procInfo.commandMode == COMMAND_MODE_STUDY_CANCEL){
                SubCEMain_ReserveStudy();
            }
            break;
        // 修正機能
        case PROC_MODE_MODIFY:
            // 戻るボタン押下
            if(procInfo.commandMode == COMMAND_MODE_CANCEL){
                Public_Hidden_Modify(procInfo.modifyFlag);
            }
            // 修正完了ボタン押下
            else if(procInfo.commandMode == COMMAND_MODE_UPDATE){
                Public_Hidden_Modify(procInfo.modifyFlag);
            }
            break;
        default:
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
            break;
        }
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
    }
}
//***************************************************************************
//  Public_View_Modify
//
//  1．機能
//      
//  2．戻り値
//      なし//
//  3．備考// 
//***************************************************************************
function Public_View_Modify(viewId){
    try{
        // 修正機能の初期化
        MODIFY_CTRL.Public_Init(viewId);
        // コールバック関数の登録
        MODIFY_CTRL.SetFrameFinishedNotification(CtrlFinished, PROC_MODE_MODIFY);
        // 修正機能の表示
        ShowFrameById(PROC_MODE_MODIFY, IFRAME_CTRL_VISIBLE_WIDTH, IFRAME_CTRL_VISIBLE_HEIGHT);
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
    }
}
//***************************************************************************
//  Public_Hidden_Modify(retValue : 処理結果(0:キャンセル 1:修正完了)
//
//  1．機能
//
//  2．戻り値
//      なし//
//  3．備考// 
//***************************************************************************
function Public_Hidden_Modify(retValue){
    try{
        // 呼び出し元の機能初期化
        switch(ProcId){
        case PROC_MODE_RESERVE:
            // 修正完了の場合
            if(retValue == 1 || retValue == 2){
                RESERVESTUDY_CTRL.ReserveStudy_Display();
            }
            break;
        case PROC_MODE_STUDY:
            // 修正完了の場合
            if(retValue == 1 || retValue == 2){
                // 画面状況設定(修正完了)
                ScreenStatus = SCREEN_STATUS_MODIFY; //検査画面状況フラグ(0:初期 1:修正完了 2:修正キャンセル) 
            // 修正キャンセル
            }else{
                // 画面状況設定(修正キャンセル)
                ScreenStatus = SCREEN_STATUS_CANCEL; //検査画面状況フラグ(0:初期 1:修正完了 2:修正キャンセル) 
            }
            STUDY_CTRL.Public_Init();
            // コールバック関数の登録
            STUDY_CTRL.SetFrameFinishedNotification(CtrlFinished, PROC_MODE_STUDY);
            break;
        default:
            Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
            break;
        }
        // 修正機能の表示
        HideFrameById(PROC_MODE_MODIFY);
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
    }
}

//***************************************************************************
//  SubCEMain_ReserveStudy()
//
//  1．機能
//      予約検査機能の呼び出し//
//  2．戻り値  
//      なし//
//  3．備考//
//***************************************************************************
function SubCEMain_ReserveStudy(){
    try{
        // フレーム領域表示
        HideAndShowFrameById(ProcId, PROC_MODE_RESERVE, IFRAME_CTRL_VISIBLE_WIDTH, IFRAME_CTRL_VISIBLE_HEIGHT);
        ProcId = PROC_MODE_RESERVE;
        // CE機能の初期化(予約検査画面初期化呼び出し)
        RESERVESTUDY_CTRL.Public_Init();
        // コールバック関数の登録
        RESERVESTUDY_CTRL.SetFrameFinishedNotification(CtrlFinished, PROC_MODE_RESERVE);
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
    }
}
//***************************************************************************
//  SubCEMain_RegistStudy()
//
//  1．機能
//      検査登録機能の呼び出し//
//  2．戻り値  
//      なし//
//  3．備考//
//***************************************************************************
function SubCEMain_RegistStudy(){
    try{
        // 検査登録フレーム領域表示
        HideAndShowFrameById(ProcId, PROC_MODE_REGIST, IFRAME_CTRL_VISIBLE_WIDTH, IFRAME_CTRL_VISIBLE_HEIGHT);
        ProcId = PROC_MODE_REGIST;
        // 検査登録機能初期化呼び出し
        REGISTSTUDY_CTRL.Public_Init();
        // コールバック関数の登録
        REGISTSTUDY_CTRL.SetFrameFinishedNotification(CtrlFinished, PROC_MODE_REGIST);
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
    }
}
//***************************************************************************
//  SubCEMain_Study()
//
//  1．機能
//     検査機能呼び出し//
//  2．戻り値  
//     なし//
//  3．備考//
//***************************************************************************
function SubCEMain_Study(){
    try{
        // 画面状況設定(初期)
        ScreenStatus = SCREEN_STATUS_INIT; //検査画面状況フラグ(0:初期 1:修正完了 2:修正キャンセル) 
        // フレームの表示／非表示
        HideAndShowFrameById(ProcId, PROC_MODE_STUDY, IFRAME_CTRL_VISIBLE_WIDTH, IFRAME_CTRL_VISIBLE_HEIGHT);
        ProcId = PROC_MODE_STUDY;
        // 検査機能初期化呼び出し
        STUDY_CTRL.Public_Init();
        // コールバック関数の登録
        STUDY_CTRL.SetFrameFinishedNotification(CtrlFinished, PROC_MODE_STUDY);
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+10);
    }
}
//***************************************************************************
//  SubCEMain_Logoff()
//
//  1．機能
//     ログオフ(メインにログオフ機能を要求する)
//
//  2．戻り値  
//     なし//
//  3．備考//
//***************************************************************************
function SubCEMain_Logoff(){
    try{
        // ログオフ要求
        parent.Logout();
        // フレームの表示／非表示
        HideAndShowFrameById(ProcId, PROC_MODE_RESERVE, IFRAME_CTRL_VISIBLE_WIDTH, IFRAME_CTRL_VISIBLE_HEIGHT);
        ProcId = PROC_MODE_RESERVE;
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+11);
    }
}

//***************************************************************************
//  IndicatorUtilityOpen()		
//  1．機能
//     インジケータユーティリティ開始通知
//  2．戻り値  
//		  なし
//  3．備考
//***************************************************************************
function IndicatorUtilityOpen(){
	try{
		// 表示フレームが予約検査の場合

		if(ProcId == PROC_MODE_RESERVE){
			RESERVESTUDY_CTRL.IndicatorUtilityOpen();
		}
		// 表示フレームが検査の場合

		else if(ProcId == PROC_MODE_STUDY){
			STUDY_CTRL.IndicatorUtilityOpen();
		}
		// その他

	}catch(e){
  Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+12);
	}
}		
//***************************************************************************
//  IndicatorUtilityClose()		
//  1．機能
//     インジケータユーティリティ開始通知
//  2．戻り値  
//		  なし
//  3．備考
//***************************************************************************
function IndicatorUtilityClose(){
	try{
		// 表示フレームが予約検査の場合

		if(ProcId == PROC_MODE_RESERVE){
			RESERVESTUDY_CTRL.IndicatorUtilityClose();
		}
		// 表示フレームが検査の場合

		else if(ProcId == PROC_MODE_STUDY){
			STUDY_CTRL.IndicatorUtilityClose();
		}
		// その他

	}catch(e){
  Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+13);
	}
}
