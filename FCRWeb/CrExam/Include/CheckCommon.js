/****************************************************************************

  @file CheckCommon.js

  @brief 患者情報の入力文字数、禁則文字数チェック

  @author YSK田中

      SpotCode MAX 6
  
  Copyright(c) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/01  YSK田中     V1.0       新規作成 
  @date  07/06/07  HSK古場     V2.0       PVCS#2281対応 
  @date  07/08/10  HSK古場     V3.0       PVCS#2321対応 
  @date  08/12/08  HSK山本     V5.0       多国語対応 
  @date  09/12/01  FF 星野     V1.1(B)    1.1(B)対応
  @date  12/06/22  FF 高松     V2.3(B)    ルーマニアとギリシャ語対応

/****************************************************************************/
var FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE = 0;                   //スポットコード 
var FILE_NAME = "CheckCommon.js"  //ファイル名 
var MESSAGE_ID = 30500;              //メッセージID 

var STRING_PATIENTID   = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?\"#$%&'()=~|\\`[]{}:;<>,./_-+*@ ^";
var STRING_PATIENTNAME = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?\"#$%&'()=~|\\`[]{}:;<>,./_-+*@ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｬｭｮｯｰ､｡｢｣ﾞﾟ ^";
var STRING_PATIENTKANJINAME_NO = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｬｭｮｯｰ､｡｢｣ﾞﾟ";
//070607 HSK古場 PVCS#2281 ADD-ST
var ISO_8859_1_HIGH_CHAR_START = 0x00a0;
var ISO_8859_1_HIGH_CHAR_END   = 0x00ff;
//070607 HSK古場 PVCS#2281 ADD-ED
//081208 HSK山本 V5.0多国語対応 ADD-ST
var CYRILLIC_CHAR_START = 0x0400;
var CYRILLIC_CHAR_END   = 0x04ff;
var LATIN_EX_A_CHAR_START = 0x0100;
var LATIN_EX_A_CHAR_END   = 0x017F;

//081208 HSK山本 V5.0多国語対応 ADD-ED
//120622 FF高松 V2.3B ギリシャ語対応 ADD-ST
var GREEK_CHAR_START = 0x0370;
var GREEK_CHAR_END   = 0x03ff;
//120622 FF高松 V2.3B ギリシャ語対応 ADD-ED

///////////////////////////////////////////////////////
//
//      関数名  ：chkPatientID
//
//      処理概要：患者IDの妥当性をチェックする。
//
//      引数    ：sVal    調べたい任意の文字列
//              ：lenLimit  入力制限文字数
//
//      戻り値  ：NG：FALSE　OK：TRUE
//
///////////////////////////////////////////////////////
function chkPatientID(data,lenLimit,ngString){
	try{
//070607 HSK古場 PVCS#2281 UPDATE-ST
//		var numStr = STRING_PATIENTID
//081208 HSK山本 V5.0多国語対応 UPDATE-ST
//		var numStr = STRING_PATIENTID + CreateUnicodeRangeStr(ISO_8859_1_HIGH_CHAR_START, ISO_8859_1_HIGH_CHAR_END);
		var numStr = STRING_PATIENTID + CreateUnicodeRangeStr(ISO_8859_1_HIGH_CHAR_START, ISO_8859_1_HIGH_CHAR_END) 
		            + CreateUnicodeRangeStr(CYRILLIC_CHAR_START, CYRILLIC_CHAR_END) 
		            + CreateUnicodeRangeStr(LATIN_EX_A_CHAR_START, LATIN_EX_A_CHAR_END)
		            + CreateUnicodeRangeStr(GREEK_CHAR_START, GREEK_CHAR_END); //120622 FF高松 V2.3B ギリシャ語対応
//081208 HSK山本 V5.0多国語対応 UPDATE-ED
//070607 HSK古場 PVCS#2281 UPDATE-ED
		// 文字チェック
		if(!isAlphaNumeric(data, numStr, ngString)) return -1;
		// 入力文字チェック
		if(data.length>lenLimit) return -2;
		// スペースチェック
		if(!chkSpace(data) || data.length<=0) return -3;
//070810 HSK古場 PVCS#2321 ADD-ST
		// 0チェック
		if(data=="0") return -4;
//070810 HSK古場 PVCS#2321 ADD-ED

		return 0;
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
	}

}
///////////////////////////////////////////////////////
//
//      関数名  ：chkPatientName
//
//      処理概要：患者名の妥当性をチェックする。


//
//      引数    ：sVal    調べたい任意の文字列
//              ：lenLimit  入力制限文字数
//
//      戻り値  ：NG：FALSE　OK：TRUE
//
///////////////////////////////////////////////////////
function chkPatientName(data,lenLimit,ngString){
	try{
//070607 HSK古場 PVCS#2281 UPDATE-ST
//		var numStr = STRING_PATIENTNAME;
//081208 HSK山本 V5.0多国語対応 UPDATE-ST
//		var numStr = STRING_PATIENTNAME + CreateUnicodeRangeStr(ISO_8859_1_HIGH_CHAR_START, ISO_8859_1_HIGH_CHAR_END);
		var numStr = STRING_PATIENTNAME + CreateUnicodeRangeStr(ISO_8859_1_HIGH_CHAR_START, ISO_8859_1_HIGH_CHAR_END) 
		            + CreateUnicodeRangeStr(CYRILLIC_CHAR_START, CYRILLIC_CHAR_END) 
		            + CreateUnicodeRangeStr(LATIN_EX_A_CHAR_START, LATIN_EX_A_CHAR_END)
		             + CreateUnicodeRangeStr(GREEK_CHAR_START, GREEK_CHAR_END);;
//081208 HSK山本 V5.0多国語対応 UPDATE-ED
//070607 HSK古場 PVCS#2281 UPDATE-ED

		// 文字チェック
		if(!isAlphaNumeric(data, numStr,ngString)) return -1;
		// 入力文字数チェック
		if(data.length<0 || data.length>lenLimit) return -2;

		return 0;
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
	}

}
///////////////////////////////////////////////////////
//
//      関数名  ：chkKanjiPatientName
//
//      処理概要：漢字患者名の妥当性をチェックする。
//
//      引数    ：sVal    調べたい任意の文字列
//              ：lenLimit  入力制限文字数
//
//      戻り値  ：NG：FALSE　OK：TRUE
//
///////////////////////////////////////////////////////
function chkKanjiPatientName(data,lenLimit,ngString){
	try{
		count = 0;
		var str = "";

		// 文字チェック
		for (i = 0; i < data.length; i++)
		{
			str = data.charAt(i);
			// シングルバイトチェック
			if (IsSingleByteChar(str) == true) count++;
			// 禁則文字列チェック
			if (ngString.indexOf(str) != -1) count++;
// ADD V1.0-1360 2005/02/06 hata====================
			// 半角カタカナチェック
			if(STRING_PATIENTKANJINAME_NO.indexOf(str) >= 0) count ++;
// ADD EN=========================================-
		}
		if(count>0) return -1;
		
		// 入力文字数チェック
		if(data.length<0 || data.length>lenLimit) return -2;

		return 0;
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
	}

}
///////////////////////////////////////////////////////
//
//      関数名  ：isAlphaNumeric
//
//      処理概要：半角英数字（大文字小文字）以外のキャラクターを含む
//                文字列かどうか判定する。ハイフン、アンダースコアを 
//                含む特殊文字も全て禁則とする。 
//
//      引数    ：data    調べたい任意の文字列
//
//      戻り値  ：半角英数字以外のキャラクターを含まない場合true、含む場合false
//
///////////////////////////////////////////////////////
function isAlphaNumeric(data,numStr,ngString){
	try{
	  var counter = 0 ;
      for (var i=0 ; i < data.length ; i++){
		  // 入力すべき値チェック
          if (numStr.indexOf(data.charAt(i)) == -1){
              counter++ ;
		  // 禁則文字列チェック
          }else if(ngString.indexOf(data.charAt(i)) != -1){
			  counter++ ;
		  }
      }
      if (counter == 0){
         return true;
      }else{
          return false;
      }
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
	}
}


///////////////////////////////////////////////////////
//
//      関数名  ：ChkDblByte
//
//      処理概要：文字列に2バイト文字が含まれるかチェックする。 
//
//      引数    ：sVal    調べたい任意の文字列
//
//      戻り値  ：2バイト文字あり：FALSE　なし：TRUE
//
///////////////////////////////////////////////////////
function ChkDblByte(sVal){
	try{

		var lResult;
		var lLength;
		var lLenCount=0;
		var sStr;

		sStr = new String();
		sStr = sVal
		lLength = sStr.length;
		
		for (i=0;i<lLength;i++){
			lResult=sStr.charCodeAt(i);
			if (lResult >= 256){
				return false
			}
		}
		return true;
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
	}
}

///////////////////////////////////////////////////////
//
//      関数名  ：IsSingleByteChar
//
//      処理概要：文字列に1バイト文字が含まれるかチェックする。 
//
//      引数    ：Char    調べたい任意の文字列
//
//      戻り値  ：1バイト文字あり：FALSE　なし：TRUE
//
///////////////////////////////////////////////////////
function IsSingleByteChar(Char) {
	try{
		var S = escape(Char);
		if (S == Char) return true;
		else if (S.length == 3)
		{
		code = S.charAt(1) + S.charAt(2);
		nm = parseInt(code, 16);
		if (nm > 0 && nm < 127) return true;
		}
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
	}
}
///////////////////////////////////////////////////////
//
//      関数名  ：chkSpace
//
//      処理概要：文字列が全て文字列かチェックする。 
//
//      引数    ：Char    調べたい任意の文字列
//
//      戻り値  ：全てスペース：FALSE　スペース以外の文字が存在：TRUE
//
///////////////////////////////////////////////////////
function chkSpace(data)
{
	try{
		numStr = " ";
		var counter = 0 ;
		for (var i=0 ; i < data.length ; i++){
			if (numStr.indexOf(data.charAt(i)) == -1){
				counter++ ;
			}
		}
		// 全てスペースの場合false
		if(counter == 0){
			return false;
		}else{
			return true;
		}
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
	}
}

//070607 HSK古場 PVCS#2281 ADD-ST
///////////////////////////////////////////////////////
//
//      関数名  ：CreateUnicodeRangeStr
//
//      処理概要：指定された範囲でコードが連続する Unicode文字列を生成する。 
//
//      引数    ：startCode   文字列を生成開始する Unicode文字コード
//                endCode     文字列を生成終了する Unicode文字コード
//
//      戻り値  ：Unicode文字列
//
///////////////////////////////////////////////////////
function CreateUnicodeRangeStr(startCode, endCode)
{
    try{
        var unicodeStr = "";
        for (var code = startCode; code <= endCode; code++) {
            unicodeStr += String.fromCharCode(code);
        }
        return unicodeStr;
    }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
    }
}
//070607 HSK古場 PVCS#2281 ADD-ED

//2009.12.01 V1.1(B)対応 FF星野 ADD-ST
///////////////////////////////////////////////////////
//
//      関数名  ：isProhibit
//
//      処理概要：禁則文字列のみチェックする
//
//      引数    ：data    調べたい任意の文字列
//
//      戻り値  ：禁則文字を含まない場合true、含む場合false
//
///////////////////////////////////////////////////////
function isProhibit(data,ngString){
	try{
	  var counter = 0 ;
      for (var i=0 ; i < data.length ; i++){
		  // 禁則文字列チェック
          if(ngString.indexOf(data.charAt(i)) != -1){
			  counter++ ;
		  }
      }
      if (counter == 0){
         return true;
      }else{
          return false;
      }
	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
	}
}
//2009.12.01 V1.1(B)対応 FF星野 ADD-ED
