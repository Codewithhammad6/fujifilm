/****************************************************************************

  @file Login.js

  @brief Loginのクライアントスクリプト

  @author YSK宮滝


  Copyright(c) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/28  YSK宮滝     V1.0　     新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応 
  @date  07/05/10  HSK山本     V2.0       PVCS#2194対応 

/****************************************************************************/
var userNameDispSE;
var userCommentSE;
var userImageSE; // 20050227 ADD
// 2005/07/21 005 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
//// 2005/06/22 002 H.SAITO 検査排他の変更(Cookie)
//var COOKIE_NAME_STUDY = "StudyViewLock";	// 検査画面起動中クッキー名
//// 2005/06/29 002 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
//var COOKIE_NAME_STUDY2= "StudyLock";	  // 検査排他中クッキー名
//*****************************************************************************
// DisplayUserSelect()
// １．機能
//      ユーザ選択画面を表示する
// ２．戻り値
//　　  なし

// ３．備考

//　　　なし

//*****************************************************************************
function DisplayUserSelect() {
//070510 HSK山本 PVCS#2194 ADD-ST
//フォーカス状態解除(連打防止)
    var frameListElement = document.getElementById("frameList");
    if(frameListElement){
        frameListElement.focus();
        frameListElement.blur();
    }
//070510 HSK山本 PVCS#2194 ADD-ED
	LoginFrameset_row.rows = "100,0,0,0";
}

//*****************************************************************************
// DisplayPassInput()
// １．機能
//      パスワード入力画面を表示する
// ２．戻り値
//　　  なし

// ３．備考

//　　　なし

//*****************************************************************************
function DisplayPassInput() {
	LoginFrameset_row.rows = "0,100,0,0";
	framePass.frmPass.txtPassword.focus();
// 2005/09/15 Kanno ADD ST PVCS#1469
	// カーソル位置を設定
	framePass.InitCurPosition();
// 2005/09/15 Kanno ADD ED PVCS#1469
}

//*****************************************************************************
// DisplayNullPage()
// １．機能
//      画面の表示を消す
// ２．戻り値
//　　  なし 
// ３．備考 
//　　　なし 
//*****************************************************************************
function DisplayNullPage() {
//070510 HSK山本 PVCS#2194 ADD-ST
//フォーカス状態解除(連打防止)
    var frameNullElement = document.getElementById("frameNull");
    if(frameNullElement){
        frameNullElement.focus();
        frameNullElement.blur();
    }
//070510 HSK山本 PVCS#2194 ADD-ED
	LoginFrameset_row.rows = "0,0,100,0";
}

//*****************************************************************************
// initPage()
// １．機能
//      安全なページの先読み処理を行う
// ２．戻り値
//　　  なし

// ３．備考

//　　　なし

//*****************************************************************************
function initPage() {
	var query = location.search;
	//ページローダ生成
	var loader = new PageLoader();
	//ページ情報追加
	loader.AddLoadPage("frameList","Login_List.aspx" + query);
	loader.AddLoadPage("framePass","Login_Pass.aspx" + query);
	if (query != "")
	{
		loader.AddLoadPage("frameProc","Login_Proc.aspx" + query + "&PageNo=1");
	}
	else
	{
		loader.AddLoadPage("frameProc","Login_Proc.aspx" + "?PageNo=1");
	}
	//コールバック設定
	loader.SetAllPageLoadedNotification(ChildPagesLoadedNotification);
	//ロード開始
	loader.Start();
}

//*****************************************************************************
// ChildPagesLoadedNotification()
// １．機能
//      すべてのページが読み込み終わった時の処理

// ２．戻り値
//      なし

// ３．備考

//      PageLoader.jsより呼び出される

//*****************************************************************************
function ChildPagesLoadedNotification() {
	DisplayUserSelect();
	// インジケータ関連(ユーザ認証開始を通知)
	top.SetCurrentView('LOGIN');
}

//*****************************************************************************
// resizeToWIN()
// １．機能
//      指定されたサイズでブラウザのリサイズを行う
// ２．戻り値
//      なし

// ３．備考

//      なし

//*****************************************************************************
function resizeToWIN(width,height)
{
	//リサイズしてみて内寸取得

	top.resizeTo(width,height);
	var w = top.document.body.clientWidth;
	var h = top.document.body.clientHeight;
	var leftsize;
	var topsize;

	//resizeToの結果内寸が 正しければ、そのまま。

	//                     違うなら、差分を加算。

	if(width!=w||height!=h)
	{
		top.resizeBy((width-w),(height-h));
	}
		// 画面をセンターに移動する。

	leftsize=(window.screen.width-width)/2;
	topsize=(window.screen.height-height)/2;
	top.moveTo(leftsize,topsize);

}
// 2005/07/21 007 H.SAITO #190 検査の排他にCookieは使用しない。RUは別途考慮
//// 2005/06/22 004 H.SAITO PVCS #190,#205 ログイン時にクッキーを初期化（検査画面起動中フラグをOFFにする)
//function SetCookie(){
//  top.SetCookie(COOKIE_NAME_STUDY, 0);
//  // 2005/06/29 002 H.SAITO PVCS #190,#205 ログイン時にクッキーを初期化（検査排他中として保存している検査シーケンスをすべてクリアする)
//  top.SetCookie(COOKIE_NAME_STUDY2, 0);
//}