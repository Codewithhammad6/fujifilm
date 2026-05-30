/*****************************************************************************

  @file StudyListMain.js

  @brief Main.aspxのクライアントスクリプト

  @author YSK森山

　Copyright(C) 2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/24  YSK森山     V1.0       新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応

  @date  07/03/20  HSK平尾     V2.0       IE7対応
  @date  07/04/05  HSK由比     V2.0       SST B#139対応


*****************************************************************************/

//****************************************************************************
//  Logout()
//  機  能 : ログアウト時に使用
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
		ErrorHandler( FATAL_ERROR, "Logout Exception" );
	}
}

//****************************************************************************
//  Exit()
//  機  能 : 画面クローズ時に使用
//  戻り値 : なし



//  備  考 :
//****************************************************************************
function Exit()
{
	try
	{
		// ウインドウクローズ
//		window.close();                    //20070320 HSK平尾 IE7対応 D
//        window.open('../Close.html','_self'); //20070320 HSK平尾 IE7対応 A	// 20070405 HSK由比 SST B#139 D //
// 20070413 HSK由比 WindowクローズAPI共通化対応 D Start //
//		(window.open('','_top').opener=top).close();							// 20070405 HSK由比 SST B#139 A //
// 20070413 HSK由比 WindowクローズAPI共通化対応 D End //
		WU_CloseWindow(window); // 20070413 HSK由比 WindowクローズAPI共通化対応 A //
	}
	catch(e)
	{
		ErrorHandler( FATAL_ERROR, "Exit Exception" );
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
		
		// ここに処理



		
	}
	catch(e)
	{
		ErrorHandler( FATAL_ERROR, "FunctionReload Exception" );
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
		
		// ここに処理



		
	}
	catch(e)
	{
		ErrorHandler( FATAL_ERROR, "ResizeTo Exception" );
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
		
		// ここに処理



		
	}
	catch(e)
	{
		ErrorHandler( FATAL_ERROR, "MoveTo Exception" );
	}
}

//****************************************************************************
//  SetTime()
//  機  能 : インジケータから時刻通知を受け取る



//  戻り値 : なし



//  備  考 :
//****************************************************************************
function SetTime( time )
{
	try
	{
		
		// ここに処理



//		document.getElementById("divTime").innerText = Time;
		
	}
	catch(e)
	{
		ErrorHandler( FATAL_ERROR, "SetTime Exception" );
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
		LoadPage("frmIndicator","./Indicator/Indicator.aspx",ChildPagesLoadedNotification);
	}
	catch(e){
		Public_Error(FATAL_ERROR, "Fn_InitPage Exception");
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



		document.getElementById("MainFrame").src = "./StudyList/Function.aspx";
		
	}
	catch(exception){
		Public_Error(FATAL_ERROR, "ChildPagesLoadedNotification Exception");
	}
} 

