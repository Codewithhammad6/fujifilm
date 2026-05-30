//*****************************************************************************
//  Main.js 
//
//     Mainのクライアントスクリプト
//
// 　Copyright(C) 2007 FUJIFILM Corporation All rights reserved.
//
//     更新履歴    担当       Ver.        内容
//     2004/12/16  菅野      -----        新規作成
//     2006/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応

//     07/03/19  HSK平尾     V2.0      IE7対応

//     07/04/05    HSK由比   V2.0         SST B#171対応
//     07/04/21  HSK平尾     V2.0      IE7対応追加修正

//
//
//*****************************************************************************

  var strUtilityKind  = "";      // 選択されているユーティリティ画面
  var strOriginDisp   = "";      // 呼び出し元画面
// 2005/09/09 Kanno ADD ST PVCS#1332
  var errFlg          = 0;       // 起動時のログインチェックでNGの場合に1になる



// 2005/09/09 Kanno ADD ED PVCS#1332

//[変数]
var LoginUserId = "";       // 認証されたユーザID
var LoginTime   = "";       // 認証された時間


var NowTime = "";			// 現在時刻(YYYY/MM/DD HH:MM:SS)

//20050614(PVCS#781)ST
//****************************************************************************
//  Fn_InitPage()
//  機  能 : ページロード時の処理


//  戻り値 : なし


//  備  考 :
//****************************************************************************
function Fn_InitPage()
{
// 2005/09/09 Kanno ADD ST PVCS#1332
  if (errFlg != 0)
  {
    // ログインチェックでNGとなった場合は処理終了



    return;
  }
	LoadPage("frmIndicator","./Indicator.aspx",ChildPagesLoadedNotification);
}

//****************************************************************************
//  ChildPagesLoadedNotification()
//  機  能 : 下位ページの読み込みが完了した後、上位に読み込み完了を通知する。



//  戻り値 : なし



//  備  考 :
//****************************************************************************
function ChildPagesLoadedNotification()
{
  // ファンクションフレームの位置を設定する


  var LeftPosition = (document.documentElement.offsetWidth-800)/2;
  document.getElementById("FUNCTION_FRAME").style.left=LeftPosition + "px";

  // ファンクションフレームを読み込む
  var url;
  url =  "Function.aspx?UtilityKind=";
  url += strUtilityKind;
  url += "&OriginDisplay=";
  url += strOriginDisplay;
  document.getElementById("FUNCTION_FRAME").src = url;

} 
//****************************************************************************
//  Fn_DisplayIndIcon(0:hidden 1:visible)
//  機  能 : イベント表示時にインジケータアイコンを隠す



//  戻り値 : なし



//  備  考 :
//****************************************************************************
function Fn_DisplayIndIcon(dispFlag)
{
	if(dispFlag == 1){
		//インジケータアイコンフレームを表示
		document.getElementById("frmIndicator").style.visibility = "visible";
	}else{
		//インジケータアイコンフレームを隠す



		document.getElementById("frmIndicator").style.visibility = "hidden";
	}
}

/*
//*****************************************************************************
// Fn_InitPage
//
// １．機能
//   ・初期処理


//
// ２．戻り値
//      なし


//
// ３．備考


//*****************************************************************************
function Fn_InitPage(){
  // ファンクションフレームの位置を設定する



  var LeftPosition = (document.documentElement.offsetWidth-800)/2;
  document.getElementById("FUNCTION_FRAME").style.left=LeftPosition + "px";

  // ファンクションフレームを読み込む
  var url;
  url =  "Function.aspx?UtilityKind=";
  url += strUtilityKind;
  url += "&OriginDisplay=";
  url += strOriginDisplay;
  document.getElementById("FUNCTION_FRAME").src = url;
}
*/
//20050614(PVCS#781)EN
//*****************************************************************************
// Fn_Resize
//
// １．機能
//   ・画面リサイズ時の処理


//
// ２．戻り値
//      なし


//
// ３．備考


//*****************************************************************************
function Fn_Resize(){
  try{
    // ファンクションフレームを画面中央に表示する
    var LeftPosition = (document.documentElement.offsetWidth-800)/2;
    if(LeftPosition > 0){
      document.getElementById("FUNCTION_FRAME").style.left=LeftPosition + "px";
    }else{
      document.getElementById("FUNCTION_FRAME").style.left="0px";
    }

  }catch(ex){
    // 例外発生時の処理



    top.Public_ExceptionMessage(ex);
  }
}
      
//*****************************************************************************
// Exit
//
// １．機能
//   ・インジケータユーティリティ画面を閉じる
//
// ２．戻り値
//      なし


//
// ３．備考


//*****************************************************************************
function Exit(){
  try{
    // 確認ダイアログの表示を防ぐ



//    if (document.all) {             //20070421 HSK平尾 IE7対応追加修正 D
//      window.opener = true;         //20070421 HSK平尾 IE7対応追加修正 D
//    }                               //20070421 HSK平尾 IE7対応追加修正 D

    // ブラウザを閉じる
//	window.close();                    //20070320 HSK平尾 IE7対応 D
//    window.open('../Close.html','_self'); //20070320 HSK平尾 IE7対応 A
//上記方法に変更したがうまくいかないひとまず元に戻す。

//	window.close();                    //20070320 HSK平尾 IE7対応 A 	// 20070405 HSK由比 SST B#171 D //
// 20070413 HSK由比 WindowクローズAPI共通化対応 D Start //
//	(window.open('','_top').opener=top).close();						// 20070405 HSK由比 SST B#171 A //
// 20070413 HSK由比 WindowクローズAPI共通化対応 D End //
	WU_CloseWindow(window); // 20070413 HSK由比 WindowクローズAPI共通化対応 A //

  }catch(ex){
    // 例外発生時の処理



    top.Public_ExceptionMessage(ex);
  }
}

//20050614(PVCS#781)ST
//***************************************************************************
//  SetUserInfomation(userId : ログインユーザID loginTime : ログイン時間)		
//  1．機能
//      ユーザ情報の設定


//  2．戻り値  
//      なし


//  3．備考


//***************************************************************************
function SetUserInfomation(userId, loginTime)
{
		LoginUserId = userId;
		LoginTime   = loginTime;
		
}
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
		// 現在時刻設定


		NowTime = Time;
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
	  // インジケータに画面通知
	  frmIndicator.SetCurrentView(viewMode);
	  //ログイン画面時のみインジケータアイコン表示
	  if(viewMode == "LOGIN"){
		  Fn_DisplayIndIcon(1);
		}
}
//20050614(PVCS#781)EN

// 2005/08/31 Kanno ADD ST PVCS#1327
//*****************************************************************************
// SetTitle()
// １．機能
//      タイトルバーのキャプション設定関数
//      画面遷移時に呼ばれる
// ２．戻り値
//      なし



// ３．備考



//      インジケータは画面遷移時にキャプションの切り替えを行わず、ユーザ認証画面表示中も



//      文字列DBから取得した「インジケータ」の文字列を表示する
//      そのため本関数では処理を行わない



//      ユーザ認証画面から呼ばれるダミーの関数
//*****************************************************************************
function SetTitle(title)
{
}
// 2005/08/31 Kanno ADD ED PVCS#1327

