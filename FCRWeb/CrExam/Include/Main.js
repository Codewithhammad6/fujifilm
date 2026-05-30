/****************************************************************************

  @file Main.js

  @brief Mainのクライアントスクリプト

  @author YSK畑

        SpotCode 14

  Copyright(C) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/17  YSK畑       V1.0       新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応 
  @date  06/11/21  YSK齋藤     V1.4　     PVCS#1770対応(機能遷移時のインジケータ押下に対応) 
  @date  07/04/03  HSK古場     V2.0       IE7対応 
  @date  14/03/28  TYK石井     V3.0(B)    DR装置画面追加
  
/****************************************************************************/
// ここから下にはMainに行わせる関数を記述してください。


// それぞれのサブメインフレームが行う画面の遷移方法です。

/*
//[定数]
// フレームID
var FRAMEID_INDICATOR = "frmIndicator";		// インジケータフレーム
var FRAMEID_DISPFRAME = "DispFrame";		// 先読みフレーム
var FRAMEID_MAINFRAME = "MainFrame"			// Functionフレーム

//[変数]
var NowTime = "";		// 現在時刻(YYYY/MM/DD HH:MM:SS)
var ViewFrame = "";		// 表示中のフレーム
*/
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード


var FILE_NAME = "Main.js"  //ファイル名


var MESSAGE_ID = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS = 30501;              //メッセージID 
// 2006/11/21 PVCS#1770 H.SAITO -ST-
var BROWSER_CLOSE		= "ON";
var BrowserCloseFlag	= "";				// ブラウザ終了フラグ("":Default, "ON":終了済み)
// 2006/11/21 PVCS#1770 H.SAITO -ED-
//***************************************************************************
//  Public_Init()		
//  1．機能
//      初期機能開始

//  2．戻り値  
//		  なし

//  3．備考

//***************************************************************************
function Public_Init()
{
    try{
        DispFrame.Public_Init();
        // コールバック関数の登録
        DispFrame.SetFrameFinishedNotification(DispFrameFinished, "");
        // 画面表示
        DisplayScreen(FRAMEID_DISPFRAME);
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
    }
}
//***************************************************************************
//  Exit()		
//  1．機能
//      画面を閉じる
//  2．戻り値  
//		  なし

//  3．備考

//***************************************************************************
function Exit()
{
	try{
	  var w;
	  w = window.open("","_top");
	  w.opener = window;
//070403 HSK古場 UPDATE-ST
//  w.close();
	  WU_CloseWindow(w);
//070403 HSK古場 UPDATE-ED
//		self.close();
		// 2006/11/21 PVCS#1770 H.SAITO -ST-
		Public_SetCloseFlag(BROWSER_CLOSE);
		// 2006/11/21 PVCS#1770 H.SAITO -ED-
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
	}

}
//***************************************************************************
//  Logout()		
//  1．機能
//      ログオフ

//  2．戻り値  
//		  なし

//  3．備考

//***************************************************************************
function Logout()
{
	try{
		//ログイン画面呼び出し


		MainFrame.location.replace("../UserAuth/Login.aspx?Url=../CrExam/Function.aspx&IsLogoff=1");
		// ページ表示
		DisplayScreen(FRAMEID_MAINFRAME);	
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
	}
}

//***************************************************************************
//  Start()		
//
//  1．機能
//      システム終了画面からユーザ認証画面に遷移
//  2．戻り値  
//		  なし

//  3．備考

//***************************************************************************
function Start()
{
	try{
	
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
	}
}

//***************************************************************************
//  End()		
//
//  1．機能
//      システム終了画面に遷移
//  2．戻り値  
//		  なし

//  3．備考

//***************************************************************************
function End()
{
	try{
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
	}
}

//***************************************************************************
//  Close(retVal  0:キャンセル 1:修正完了(未撮なし) 2:修正完了(未撮有))		
//
//  1．機能
//      画面を閉じる
//  2．戻り値  
//		  なし

//  3．備考

//     
//***************************************************************************
function Close(retVal)
{
    try{
        returnValue = retVal;
        // ブラウザ終了
        Exit();
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
    }
}
//***************************************************************************
//  FunctionReload()		
//
//  1．機能
//      機能フレームの再読み込み
//  2．戻り値  
//		  なし

//  3．備考

//     
//***************************************************************************
function FunctionReload()
{
	try{
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
	}
}
//***************************************************************************
//  ResizeTo		
//
//  1．機能
//      ブラウザのサイズを変更
//  2．戻り値  
//		  なし

//  3．備考

//     
//***************************************************************************
function ResizeTo(top,left)
{
	try{
	}
	catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
	}
}
//***************************************************************************
//  MoveTo(top,left)		
//
//  1．機能
//      ブラウザの表示位置を移動

//  2．戻り値  
//		  なし

//  3．備考

//     
//***************************************************************************
function MoveTo(top,left)
{
	try{
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
	}
}
/*
//***************************************************************************
//  SetTime(Time)		
//
//  1．機能
//      インジケータからの現在時刻
//  2．戻り値  
//		  なし

//  3．備考

//***************************************************************************
function SetTime(Time)
{
	try{
		// 現在時刻設定

		NowTime = Time;
	}
	catch(e){
		Public_Error(FATAL_ERROR, "DisplayScreen Exception");
	}
}

//***************************************************************************
//  SetCurrentView(viewMode : 画面(予約検査/検査/ユーザ認証)		
//  1．機能
//      インジケータに開いている画面通知
//  2．戻り値  
//		  なし

//  3．備考

//***************************************************************************
function SetCurrentView(viewMode)
{
	try{
	  // インジケータに画面通知
//DEBUG======================
//	  frmIndicator.SetCurrentView(viewMode);
//=====================
	}
	catch(e){
		Public_Error(FATAL_ERROR, "SetCurrentView Exception");
	}
}
//***************************************************************************
//  IndicatorUtilityOpen()		
//
//  1．機能
//      インジケータユーティリティ開始通知
//  2．戻り値  
//		  なし

//  3．備考

//     
//***************************************************************************
function IndicatorUtilityOpen()
{
	try{
	  // 表示中のフレームが先読みフレームの場合


      if(ViewFrame == FRAMEID_DISPFRAME){
	    DispFrame.IndicatorUtilityOpen();
	  }
	  // 先読みフレーム以外は処理しない


	  else{
	    ;
	  } 
	}
	catch(e){
		Public_Error(FATAL_ERROR, "IndicatorUtilityOpen Exception");
	}
}
//***************************************************************************
//  IndicatorUtilityClose()		
//  1．機能
//      インジケータユーティリティ終了通知
//  2．戻り値  
//		  なし

//  3．備考

//***************************************************************************
function IndicatorUtilityClose()
{
	try{
	  // 表示中のフレームが先読みフレームの場合


      if(ViewFrame == FRAMEID_DISPFRAME){
	    DispFrame.IndicatorUtilityClose();
	  }
	  // 先読みフレーム以外は処理しない


	  else{
	    ;
	  } 

	}
	catch(e){
		Public_Error(FATAL_ERROR, "IndicatorUtilityClose Exception");
	}
}
*/

//***************************************************************************
//  DisplayScreen()
//
//  1．機能
//      画面非表示
//
//  2．戻り値
//      なし
//
//  3．備考
//
//***************************************************************************
function DisplayScreen(screenId)
{
    try{
        HideAndShowFrameById(ViewFrame, screenId, IFRAME_CTRL_VISIBLE_WIDTH, IFRAME_CTRL_VISIBLE_HEIGHT);
        //インジケータ表示
        ShowFrameById(FRAMEID_INDICATOR, IFRAME_VIEW_INDICATOR_WIDTH, IFRAME_VIEW_INDICATOR_HEIGHT);
        // 表示したフレームを設定

        ViewFrame = screenId;
    }
    catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
    }
}

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
		//読み込むページを設定
    if(FrameUrl != "ErrorEnd.aspx"){
		//ページローダ生成
		var loader = new PageLoader();
		//ページ情報追加
		//2014.03.28 V3.0(B) TYK石井 DR装置画面追加 MOD Start
		//loader.AddLoadPage("frmIndicator","../Indicator/Indicator.aspx");
		loader.AddLoadPage("frmIndicator","../Indicator/Indicator.aspx?CurrentView=0");
		//2014.03.28 V3.0(B) TYK石井 DR装置画面追加 MOD End
		loader.AddLoadPage("DispFrame",FrameUrl);
		loader.AddLoadPage("MenuFrame","MenuInfo_Get_Proc.aspx");
		//コールバック設定

		loader.SetAllPageLoadedNotification(ChildPagesLoadedNotification);
		//ロード開始

		loader.Start();
    }else{
  		document.getElementById("DispFrame").src = FrameUrl;
        ShowFrameById("DispFrame", IFRAME_CTRL_VISIBLE_WIDTH, IFRAME_CTRL_VISIBLE_HEIGHT);
        //インジケータ表示・非表示
        ShowFrameById("frmIndicator", IFRAME_VIEW_INDICATOR_HIDDEN, IFRAME_VIEW_INDICATOR_HIDDEN);
	  }
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+10);
	}
}
//*****************************************************************************
// ChildPagesLoadedNotification
// １．機能
//      下位ページの読み込みが完了した通知



// ２．戻り値
//　　  なし


// ３．備考


//　　　なし


//*****************************************************************************
function ChildPagesLoadedNotification(){
	try{
		// 先読みが終了したらインジケータとファンクションフレーム呼び出し


		document.getElementById("MainFrame").src = "./Function.aspx";
		// 画面表示
		DisplayScreen(FRAMEID_MAINFRAME);
		
	}
	catch(exception){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+14);
	}
} 

//*****************************************************************************
// DispFrameFinished
// １．機能
//      DispFrameが終了した後に実行する、コールバック関数
//
// ２．戻り値
//　　  なし

//
// ３．備考

//　　　なし

//
//*****************************************************************************
function DispFrameFinished(id, param)
{
    try{
        Close(param);
    }
    catch(exception){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+11);
    }
}
// 2006/11/21 PVCS#1770 H.SAITO -ST-
//*****************************************************************************
// Public_SetCloseFlag
// １．機能
//      ブラウザ終了フラグに値をセットする
// ２．戻り値
//　　  なし
// ３．備考
//　　　なし
//*****************************************************************************
function Public_SetCloseFlag(value){
	try{
		BrowserCloseFlag = value;
	}catch(exception){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+12);
	}
} 
// 2006/11/21 PVCS#1770 H.SAITO -ED-
// 2006/11/21 PVCS#1770 H.SAITO -ST-
//*****************************************************************************
// Public_GetCloseFlag
// １．機能
//      ブラウザ終了フラグの値を取得する
// ２．戻り値
//　　  なし
// ３．備考
//　　　なし
//*****************************************************************************
function Public_GetCloseFlag(){
	try{
		return BrowserCloseFlag;
	}catch(exception){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+13);
	}
} 

// 2006/11/21 PVCS#1770 H.SAITO -ED-
