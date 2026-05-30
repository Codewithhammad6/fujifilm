/****************************************************************************

  @file Login_Pass.js

  @brief Login_Passのクライアントスクリプト

  @author YSK宮滝 


  Copyright(C) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/28  YSK宮滝     V1.0　     新規作成
  @date  06/12/11  HSK藤川     V1.4       Hobbit V1.4版 ログイン履歴重複出力修正(PVCS#2008)
  @date  07/04/17  HSK山本     V2.0       PVCS#1671
  @date  07/06/01  HSK山本     V2.0       PVCS#2296対応

/****************************************************************************/
//変数
var SoftKeyBoardFlag = 0;     //ソフトキーボード表示フラグ
//070419 HSK古場 (PCVS#2092対応) ADD-ST
var LP_userConfirm = userConfirm;
//070419 HSK古場 (PCVS#2092対応) ADD-ED

//*****************************************************************************
// userConfirm()
// １．機能
//      ユーザ認証処理を行う 
// ２．戻り値 
//      なし 
// ３．備考 
//      Login_Procの処理を呼び出す 
//*****************************************************************************
function userConfirm()
{
//070419 HSK古場 (PCVS#2092対応) ADD-ST
	userConfirm = blockClick;
//070419 HSK古場 (PCVS#2092対応) ADD-ED
	//20061211  HSK藤川 V1.4 ログイン履歴重複出力修正(PVCS#2008) A Start //
	if (document.getElementById('imgLogin').onclick == null)
	{
		return;
	}
	document.getElementById('imgLogin').onclick = null;
	//20061211  HSK藤川 V1.4 ログイン履歴重複出力修正(PVCS#2008) A End //

	
	if (document.getElementById('txtUserID').value == "Service Engineer")
	{
		parent.pageNum = parent.frameList.pageNo;
	}
	parent.focus();
	parent.frameProc.location.replace('./Login_Proc.aspx?Reload=1');
	parent.frameProc.document.all.txtFunction.value = "0";
	parent.frameProc.document.all.txtUserID.value = document.getElementById('txtUserID').value;
	var buf = document.getElementById('txtPassword').value.replace(/</,'&lt;');
	var password = buf.replace(/>/,'&gt;');
	parent.frameProc.document.all.txtPassword.value = password;
	parent.frameProc.document.all.txtStartURL.value = url;
	parent.frameProc.frmLoginProc.submit();
}

//070419 HSK古場 (PCVS#2092対応) ADD-ST
function blockClick()
{
	parent.focus();
	return false;
}

function restoreUserConfirm()
{
	userConfirm = LP_userConfirm;
}
//070419 HSK古場 (PCVS#2092対応) ADD-ED

//*****************************************************************************
// checkReturn()
// １．機能
//      キーボードからの入力をチェックして、Enterキーが押された場合無効にする 
// ２．戻り値 
//      なし 
// ３．備考 
//      なし 
//*****************************************************************************
function checkReturn()
{
	//document.getElementById('txtPassword').focus();
//	document.all('txtPassword').focus();
	if (event.keyCode == 13) {
		return false;
	}
}

//*****************************************************************************
// btnBack_Click()
// １．機能
//      戻るボタンを押下したときの処理 
// ２．戻り値 
//      なし 
// ３．備考 
//      なし 
//*****************************************************************************
function btnBack_Click()
{
	document.getElementById('txtPassword').value = '';
	if (parent.pageNum == 0 || parent.pageNum == 'undefined' || parent.pageNum == '')
	{
		parent.pageNum = 1;
	}
	parent.frameList.requestUserInfo(0);
	parent.DisplayUserSelect();
}

////20050614(PVCS#709)ST
/*
//*****************************************************************************
// getkeycode()
// １．機能 
//      押下されたキーのチェックを行う 
// ２．戻り値 
//      許可されたキー       :true
//      許可されていないキー :false
// ３．備考 
//      なし 
//*****************************************************************************
function getkeycode(code)
{
//	document.all('txtPassword').focus();

	if(code == 13) {
		event.keyCode = 0;
		return false;
	}
	
	if(112 <= code & code <= 123)
	{
		event.keyCode = 0;
		return false;
	}
	else if(event.ctrlKey)
	{
		event.keyCode = 0;
		return false;
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
	{
		return true;
	}
}
*/
//20050614(PVCS#709)EN
//070417 HSK山本 PVCS#1671 ADD-ST
//*****************************************************************************
// OnFontSetting()
// １．機能 
//      レジストリより取得したフォントを部品に設定する 
// ２．戻り値 
//      なし 
// ３．備考 
//      なし 
//*****************************************************************************
function OnFontSetting()
{
    var regFont=parent.fontName;
    var targetElementIds = new Array("lblUserName","lblUserComment");
    for(i=0 ; i< targetElementIds.length ; i++){
        var target = document.getElementById(targetElementIds[i]);
        target.style.fontFamily=regFontName;
//070601 HSK山本 PVCS#2296 ADD-ST
//フォントサイズを設定 
        switch(targetElementIds[i])
        {
            case "lblUserName":
            target.style.fontSize = regFontSizeM;
            break;
            case "lblUserComment":
            target.style.fontSize = regFontSizeSS;
            break;
        }
//070601 HSK山本 PVCS#2296 ADD-ED
    }
}
//070417 HSK山本 PVCS#1671 ADD-ED

