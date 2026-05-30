/****************************************************************************

  @file Login_List.js

  @brief Login_Listのクライアントスクリプト

  @author YSK宮滝 


  Copyright(C) 2004-2009 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/28  YSK宮滝     V1.0　     新規作成
  @date  07/04/17  HSK山本     V2.0       PVCS#1671
  @date  07/06/01  HSK山本     V2.0       PVCS#2296対応  @date  09/03/10  HSK山本     V5.0       PVCS#3167対応

/****************************************************************************/

var timerId;            // タイマーID(setTimeOutで利用) 
var userStripNo;        // クリックされたユーザ短冊の番号 

var NumOfClick;		      // クリック回数 
pxArray = new Array(4);	// クリックされた座標(X座標) 
pyArray = new Array(4);	// クリックされた座標(Y座標) 

var seuserSelectScript; // サービスエンジニアユーザ選択スクリプト 
var pageNo;

var SE_USER_ID    = "medicalservice";  // サービスエンジニアのユーザID 
//var SE_USER_IMAGE = "../Bmp/ucDefuserPic.jpg";

//*****************************************************************************
// endUserAuth()
// １．機能
//      ユーザ認証の終了処理を行う 
// ２．戻り値 
//      なし 
// ３．備考 
//      なし 
//*****************************************************************************
function endUserAuth() {
	if (clientType == 1)
	{
		top.End();
	}
	else if (clientType == 2 || clientType == 3)
	{
		top.Exit();
	}
	else
	{
		top.Exit();
	}
}

//20050614(PVCS#709)ST
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
	if(code == 13) {
		event.keyCode = 0;
		return false;
	}
	
	if(code == 70)
	{
		event.keyCode = 0;
		return false;
	}
	else if(112 <= code & code <= 123)
	{
		event.keyCode = 0;
		return false;
	}
	else if(event.ctrlKey)
	{
		event.keyCode = 0;
		return false;
	}
	{
		return true;
	}
}
*/
//20050614(PVCS#709)EN

//070417 HSK山本 PVCS#1671 ADD-ST
//*****************************************************************************
// OnStyleSetting()
// １．機能 
//      部品のスタイルを設定する
// ２．戻り値 
//      なし 
// ３．備考 
//      なし 
//*****************************************************************************
function OnStyleSetting()
{
    var targetElementIds = new Array("txtUserName1","txtUserComment1","txtUserName2","txtUserComment2","txtUserName3","txtUserComment3",
                                     "txtUserName4","txtUserComment4","txtUserName5","txtUserComment5","txtUserName6","txtUserComment6",
                                     "txtPageNum");
    for(i=0 ; i< targetElementIds.length ; i++){
        var target = document.getElementById(targetElementIds[i]);
        target.style.fontFamily=regFontName;

//070601 HSK山本 PVCS#2296 ADD-ST
//フォントサイズを設定 
        switch(targetElementIds[i])
        {
            case "txtUserName1":
            case "txtUserName2":
            case "txtUserName3":
            case "txtUserName4":
            case "txtUserName5":
            case "txtUserName6":
            target.style.fontSize = regFontSizeM;
            break;
            case "txtUserComment1":
            case "txtUserComment2":
            case "txtUserComment3":
            case "txtUserComment4":
            case "txtUserComment5":
            case "txtUserComment6":
            target.style.fontSize = regFontSizeSS;
            break;
            case "txtPageNum":
            target.style.fontSize = regFontSizeL;
            break;
        }
//070601 HSK山本 PVCS#2296 ADD-ED

    }
    
//090310 HSK山本 PVCS#3166 ADD-ST
//終了ボタンの文字位置をボタン中央にする 

    var imgEndButton = document.getElementById("imgEnd");
    var lblEndButton = document.getElementById("lblEnd");
    
    var lblEndPosX = imgEndButton.offsetLeft + (imgEndButton.clientWidth - lblEndButton.clientWidth) / 2;
    lblEndButton.style.left = lblEndPosX + "px";
//090310 HSK山本 PVCS#3166 ADD-ED
}
//070417 HSK山本 PVCS#1671 ADD-ED
