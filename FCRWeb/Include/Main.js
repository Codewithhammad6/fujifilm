/*****************************************************************************

  @file Main.js

  @brief Main.aspxのクライアントスクリプト

  @author YSK森山

  Copyright(C) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/24  YSK森山     V1.0       新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応


  @date  07/03/19  HSK平尾     V2.0       IE7対応
  @date  07/04/05  HSK由比     V2.0       SST B#139対応
  @date  07/04/21  HSK平尾     V2.0       IE7対応追加修正




*****************************************************************************/

var FATAL_ERROR = "FATAL_ERROR";	//致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";	//再試行可能なエラー
var SPOT_CODE = 0;					//スポットコード



var FILE_NAME = "Main.js"			//ファイル名



var MESSAGE_ID = 30500;				//メッセージID 
var MESSAGE_ID_ACCESS = 30501;		//メッセージID 

var EXIT_IMAGE_VIEW = 1;			// 画面クローズ時に画像参照終了要求を行うか否か(PVCS#1387)

//****************************************************************************
//  Logout()
//  機  能 : ログアウトを行いログイン画面へ遷移する
//  戻り値 : なし


//  備  考 :
//****************************************************************************
function Logout( queryString )
{
	try
	{
		// ログイン画面呼び出し


		MainFrame.location.replace( "../UserAuth/Login.aspx?" + queryString );
	}
	catch(e)
	{
		top.GetErrorMessage( FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0 );
	}
}

//****************************************************************************
//  Exit()
//  機  能 : 画面のクローズを行う
//  戻り値 : なし


//  備  考 : アンロードイベントにて画像参照の終了要求を行う
//****************************************************************************
function Exit()
{
	try
	{
		EXIT_IMAGE_VIEW = 1;

// 20070421 HSK平尾 IE7対応追加修正 D Start //
//		if( document.all )
//		{
//			// 確認ダイアログの表示を防ぐ
//
//
//			window.opener = true;
//		}
// 20070421 HSK平尾 IE7対応追加修正 D End //

		// ブラウザを閉じる
//		window.close();                    //20070320 HSK平尾 IE7対応 D
//         window.open('../Close.html','_self'); //20070320 HSK平尾 IE7対応 A	// 20070405 HSK由比 SST B#139 D //
// 20070413 HSK由比 WindowクローズAPI共通化対応 D Start //
//		(window.open('','_top').opener=top).close();							// 20070405 HSK由比 SST B#139 A //  
// 20070413 HSK由比 WindowクローズAPI共通化対応 D End //
		WU_CloseWindow(window);   // 20070413 HSK由比 WindowクローズAPI共通化対応 A //
	}
	catch(e)
	{
		top.GetErrorMessage( FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1 );
	}
}

//****************************************************************************
//  Exit2()
//  機  能 : 画面のクローズを行う
//  戻り値 : なし


//  備  考 : アンロードイベントにて画像参照の終了要求を行わない



//****************************************************************************
function Exit2()
{
	try
	{
		EXIT_IMAGE_VIEW = 0;
	
// 20070421 HSK平尾 IE7対応追加修正 D Start //
//		if( document.all )
//		{
//			// 確認ダイアログの表示を防ぐ
//
//
//			window.opener = true;
//		}
// 20070421 HSK平尾 IE7対応追加修正 D End //

		// ブラウザを閉じる
//		window.close();                    //20070320 HSK平尾 IE7対応 D
//        window.open('../Close.html','_self'); //20070320 HSK平尾 IE7対応 A	// 20070405 HSK由比 SST B#139 D //
// 20070413 HSK由比 WindowクローズAPI共通化対応 D Start //
//		(window.open('','_top').opener=top).close();							// 20070405 HSK由比 SST B#139 A //
// 20070413 HSK由比 WindowクローズAPI共通化対応 D End //
		WU_CloseWindow(window); // 20070413 HSK由比 WindowクローズAPI共通化対応 A //
	}
	catch(e)
	{
		top.GetErrorMessage( FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1 );
	}
}

//****************************************************************************
//  FunctionReload()
//  機  能 : 機能フレームの再読み込み時に使用
//  戻り値 : なし


//  備  考 :
//****************************************************************************
function FunctionReload()
{
	try
	{
		
	}
	catch(e)
	{
		top.GetErrorMessage( FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2 );
	}
}

//****************************************************************************
//  ResizeTo()
//  機  能 : ブラウザのサイズ変更時に使用
//  戻り値 : なし


//  備  考 :
//****************************************************************************
function ResizeTo( width, height )
{
	try
	{
		
	}
	catch(e)
	{
		top.GetErrorMessage( FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3 );
	}
}

//****************************************************************************
//  MoveTo()
//  機  能 : ブラウザの表示位置変更時に使用
//  戻り値 : なし


//  備  考 :
//****************************************************************************
function MoveTo( top, left )
{
	try
	{
		
	}
	catch(e)
	{
		top.GetErrorMessage( FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4 );
	}
}

//****************************************************************************
//  Fn_InitPage()
//  機  能 : ページロード時の処理



//  戻り値 : なし


//  備  考 :
//****************************************************************************
function Fn_InitPage()
{
	try
	{
		LoadPage("frmIndicator","./Indicator/Indicator.aspx",ChildPagesLoadedNotification);
	}
	catch(e)
	{
		top.GetErrorMessage( FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5 );
	}
}

//****************************************************************************
//  ChildPagesLoadedNotification()
//  機  能 : 下位ページの読み込みが完了した通知
//  戻り値 : なし


//  備  考 :
//****************************************************************************
function ChildPagesLoadedNotification()
{
	try
	{
		// 先読みが終了したらインジケータとファンクションフレーム呼び出し


		document.getElementById("MainFrame").src = "./Function.aspx" + location.search;
	}
	catch(e)
	{
		top.GetErrorMessage( FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6 );
	}
} 

