//*****************************************************************************
//  Control.js 
//
//  	ショートカットキー制御機能
//    ※ALTキーは基本的に制御不可
//　　　(ALT+Home,ツールバーのショートカット(ALT+F,ALT+Cなど))
//    ※一部のFunctionキー制御不可
//      (F1 ただし、BODYタグにonhelp="return false;"を組み込むことで制御可能)
//
//     更新履歴    担当       Ver.        内容
//     2003/11/07  畑        -----       新規作成
//
//   Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.
//
//*****************************************************************************
// マウスカーソルをI形にしない！
var ie = !!document.all;
var n4 = !!document.layers;
var gk = (navigator.userAgent.match(/Gecko/i)!=null);



// ------------------------------------------------------------------ //
//  キーボードでのショートカット抑制
// ------------------------------------------------------------------ //
function keydown() {
    if (ie) {
				//ESC(中断)
        if (event.keyCode == 27) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
        // CTRL+E(検索)
        if (event.ctrlKey && event.keyCode == 69) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
        // CTRL+F(ページ内検索)
        if (event.ctrlKey && event.keyCode == 70) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
        // CTRL+H(履歴)
        if (event.ctrlKey && event.keyCode == 72) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
        // CTRL+I(お気に入り)
        if (event.ctrlKey && event.keyCode == 73) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
        // CTRL+N(新しいウィンドウを開く)
        if (event.ctrlKey && event.keyCode == 78) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
        // CTRL+O(開く)
        if (event.ctrlKey && event.keyCode == 79) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
				// CTRL+L(開く)
        if (event.ctrlKey && event.keyCode == 76) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
        // CTRL+P(印刷)
        if (event.ctrlKey && event.keyCode == 80) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
        // CTRL+R(再読込)
        if (event.ctrlKey && event.keyCode == 82) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
        // CTRL+W(ウィンドウを閉じる)
        if (event.ctrlKey && event.keyCode == 87) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
        // CTRL+D(お気に入り登録)
        if (event.ctrlKey && event.keyCode == 68) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
        // CTRL+B(お気に入りダイアログボックス表示)
        if (event.ctrlKey && event.keyCode == 66) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
        // F3(検索)
        if (event.keyCode == 114) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
        // F4(アドレスバー一覧表示)
				if (event.keyCode == 115) {
						event.keyCode = 0;
						window.event.returnValue = false;
				}
        // F5(リロード)
        if (event.keyCode == 116) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
        // F6(ファンクションキー制御)
        if (event.keyCode == 117) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
        // F11(最大化)
        if (event.keyCode == 122) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
        // MENU(右クリックメニュー)
        if (event.keyCode == 93) {
          if(event.srcElement.tagName != "INPUT"){
            event.keyCode = 0;
            window.event.returnValue = false;
          }
        }
        // SHIFT+F10(右クリックメニュー)
        if (event.shiftKey && event.keyCode == 121) {
          if(event.srcElement.tagName != "INPUT"){
            event.keyCode = 0;
            window.event.returnValue = false;
          }
        }
        // BS(戻る)
        if (event.keyCode == 8) {
          if(event.srcElement.tagName != "INPUT"){
            event.keyCode = 0;
            window.event.returnValue = false;
          }
        }
        // window(戻る)
        if (event.keyCode == 91) {
            event.keyCode = 0;
            window.event.returnValue = false;
        }
        // TAB(タブ)
        if (event.keyCode == 9) {
          if(event.srcElement.tagName != "INPUT"){
            event.keyCode = 0;
            window.event.returnValue = false;
          }
        }
        // ALT(キーイベントを無効にできないため関数自体をFALSEとする)
        // ALT+←、ALT+→(BackSpace)を制御
        if (event.altKey) {
					return false;
        }
    }

}

// ------------------------------------------------------------------ //
//  各種イベントのキャプチャ
// ------------------------------------------------------------------ //
if (n4) {
    document.captureEvents(Event.MOUSEDOWN)
}
document.onkeydown   = keydown;
