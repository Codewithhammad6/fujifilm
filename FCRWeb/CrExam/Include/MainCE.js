/****************************************************************************

  @file Main.js

  @brief Mainのクライアントスクリプト

  @author YSK畑

        SpotCode MAX 12

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/17  YSK畑       V1.0       新規作成
  @date  06/11/21  HSK古場     V1.4       CR検査部構造見直し[4]対応
  @date  06/11/30  HSK酒井     V1.4       CR検査部構造見直し[2]対応
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
*/
var FRAMEID_ENDFRAME = "EndFrame";      //システム終了フレーム

/*
//[変数]
var NowTime = "";		// 現在時刻(YYYY/MM/DD HH:MM:SS)
var ViewFrame = "";		// 表示中のフレーム
*/
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード


var FILE_NAME = "MainCE.js"  //ファイル名


var MESSAGE_ID = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS = 30501;              //メッセージID 

var DispFrame = "";     // 表示中サブメインフレーム
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
		window.close();
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
	  top.location.replace("./MainCE.aspx");
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
    // インジケータポーリングストップ

	  frmIndicator.Public_StopTimer();
	  // システム終了画面に遷移
	  EndFrame.location.replace("./SystemEnd.aspx");
	 	// ページ表示
		DisplayScreen(FRAMEID_ENDFRAME);	
 
	
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
	}
}
//***************************************************************************
//  ErrorEnd()		
//
//  1．機能
//      エラーの場合システム終了画面に遷移
//  2．戻り値  
//		  なし

//  3．備考

//***************************************************************************
function ErrorEnd()
{
	try{
    // インジケータポーリングストップ

	  frmIndicator.Public_StopTimer();
	  // システム終了画面に遷移
	  EndFrame.location.replace("./SystemEnd.aspx");
	 	// ページ表示
		DisplayScreen("EndFrame");	

	}
	catch(e){
		Public_Error(FATAL_ERROR, "End Exception");
	}
}

//***************************************************************************
//  Close(retVal  0:キャンセル 1:修正完了 2:修正なし)		
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
		if(retVal==1){
			returnValue = 1;
		}else{
			returnValue = 0;
		}
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
//alert(viewMode);
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
//		  なし
//  3．備考
//     
//***************************************************************************
function DisplayScreen(screenId)
{
    try{

        HideAndShowFrameById(ViewFrame, screenId, IFRAME_CTRL_VISIBLE_WIDTH, IFRAME_CTRL_VISIBLE_HEIGHT);
        //インジケータ表示・非表示
        if(screenId == FRAMEID_ENDFRAME){
            HideFrameById(FRAMEID_INDICATOR);
        }else{
            ShowFrameById(FRAMEID_INDICATOR, IFRAME_VIEW_INDICATOR_WIDTH, IFRAME_VIEW_INDICATOR_HEIGHT);
        }

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

		DisplayScreen("DispFrame");
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
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+10);
	}
}
//*****************************************************************************
// ChildPagesLoadedNotification
// １．機能
//      下位ページの読み込みが完了した後、上位に読み込み完了を通知する。



// ２．戻り値
//　　  なし


// ３．備考


//　　　なし


//*****************************************************************************
function ChildPagesLoadedNotification(){
	try{
		// 先読みが終了したらインジケータとファンクションフレーム呼び出し


//		document.getElementById("frmIndicator").src = "../Indicator/Indicator.aspx";
		document.getElementById("MainFrame").src = "./Function.aspx";
		document.getElementById("EndFrame").src = "./SystemEnd.aspx";
		// 画面表示
		DisplayScreen(FRAMEID_MAINFRAME);
		
	}
	catch(exception){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+11);
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
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+12);
    }
}
