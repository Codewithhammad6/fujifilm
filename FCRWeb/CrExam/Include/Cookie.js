/****************************************************************************

  @file Cookie.js

  @brief 患者情報の入力文字数、禁則文字数チェック

  @author YSK田中

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/15  YSK田中     V1.0       新規作成

/****************************************************************************/
///////////////////////////////////////////////////////
//
//	関数名	：CreateCookie
//
//	処理概要：クッキーへの書きこみを行う
//
//	引数	：sName    クッキー名
//                sValue   値
//
//	戻り値	：なし
//
///////////////////////////////////////////////////////
function CreateCookie(sName,sValue){
  // 2005/06/22 003 H.SAITO PVCS #190 #205 Cookie有効期限を永久化
	//var expire = new Date ("31,Dec 2030");
	var expire = new Date ("31,Dec 2199");
	
    document.cookie = sName + "=" + sValue + "; expires=" + expire.toGMTString();

}


///////////////////////////////////////////////////////
//
//	関数名	：sReadCookie
//
//	処理概要：クッキーの読み込み値を返す
//
//	引数	：sName    クッキー名
//
//	戻り値	：対応するクッキーの値
//                null     値無し
//
///////////////////////////////////////////////////////
function sReadCookie(sName){

  var lnumOfCookies = document.cookie.length;
  var sNameOfCookie = sName + "=";
  var lLength       = sNameOfCookie.length;
  var x = 0;

    while (x <= lnumOfCookies) {
        var y = (x + lLength);
        if (document.cookie.substring(x,y) == sNameOfCookie){
            return(sExtractCookieValue(y));
        }
        x = document.cookie.indexOf(" ",x) + 1;
        if (x == 0){
            break;
        }
    }
    return null;
}
///////////////////////////////////////////////////////
//
//	関数名	：sExtractCookieValue
//
//	処理概要：クッキーの値を所得する
//
//	引数	：lLocate  クッキー名
//
//	戻り値	：対応するクッキーの値
//                Null     値無し
//
///////////////////////////////////////////////////////
function sExtractCookieValue(lLocate){

    if ((lEndOfCookie =
         document.cookie.indexOf(";",lLocate)) == -1){
        lEndOfCookie = document.cookie.length;
    }

    return unescape(document.cookie.substring(lLocate,lEndOfCookie));

}
