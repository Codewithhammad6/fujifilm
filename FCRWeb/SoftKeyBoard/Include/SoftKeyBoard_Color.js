/****************************************************************************

  @file SoftKeyBoard_Color.js

  @brief ソフトキーボード押下時の色変換

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/17  YSK畑       V1.0       新規作成

/****************************************************************************/

var FATAL_ERROR_KEYCOLOR    = "FATAL_ERROR";     //致命的なエラー 
var RETRY_ERROR_KEYCOLOR    = "RETRY_ERROR";     //再試行可能なエラー
var SPOT_CODE_KEYCOLOR      = 0;                 //スポットコードvar FILE_NAME_KEYCOLOR      = "SoftKeyBoard_Color.js";//ファイル名var MESSAGE_ID_KEYCOLOR     = 30500;             //メッセージID 

    var MOUSEDOWN_BORDERDARK  = "#000000";  // ソフトキーボードボタンクリック時ボーダ色
    var MOUSEDOWN_BORDERLIGHT = "#6E7878";  // ソフトキーボードボタンクリック時ボーダ色
    var MOUSEUP_BORDERDARK    = "#6E7878";  // ソフトキーボードボタリース時ボーダ色
    var MOUSEUP_BORDERLIGHT   = "#000000";  // ソフトキーボードボタンリリース時ボーダ色

    var CLASS_KEYALPH_A = "KeyAlphA";
    var CLASS_KEYALPH_B = "KeyAlphB";
    var CLASS_KEYKANA_A = "KeyKanaA";
    var CLASS_KEYKANA_B = "KeyKanaB";
    var CLASS_KEYOTHER  = "KeyOther";

    var BTN_KEY_A_DOWN    = '../Bmp/crKeyaBtnD.gif';
    var BTN_KEY_A_UP      = '../Bmp/crKeyaBtnU.gif';
    var BTN_KEY_B_DOWN    = '../Bmp/crKeybBtnD.gif';
    var BTN_KEY_B_UP      = '../Bmp/crKeybBtnU.gif';
    var BTN_KEYSPACE_DOWN = '../Bmp/crSpaceBtnD.gif';
    var BTN_KEYSPACE_UP   = '../Bmp/crSpaceBtnU.gif';
    
/*
function CheckDisplay()
{
	gDispFlag = 1;
}
*/
// ソフトキーボードボタンクリック時のボーダ色設定
function SetMouseDownColor()
{
  try{
	  var Obj = window.event.srcElement;
 	  if(Obj.innerText=="")return;
      if(Obj.disabled==true)return;
      
    switch(Obj.className){
      case CLASS_KEYALPH_A:
      case CLASS_KEYKANA_A:
        Obj.style.backgroundImage = "url('../Bmp/crKeyaBtnD.gif')";
        break;
      case CLASS_KEYALPH_B:
      case CLASS_KEYKANA_B:
        Obj.style.backgroundImage = "url('../Bmp/crKeybBtnD.gif')";
        break;
      case CLASS_KEYOTHER:
        Obj.style.backgroundImage = "url('../Bmp/crSpaceBtnD.gif')";
        break;
      default:
  		  top.GetErrorMessage(FATAL_ERROR_KEYCOLOR,MESSAGE_ID_KEYCOLOR, FILE_NAME_KEYCOLOR, SPOT_CODE_KEYCOLOR+0); 
    }            

	  Obj.borderColorDark  = MOUSEDOWN_BORDERDARK;
	  Obj.borderColorLight = MOUSEDOWN_BORDERLIGHT;
	  
  }catch(e){
	  top.GetErrorMessage(FATAL_ERROR_KEYCOLOR,MESSAGE_ID_KEYCOLOR, FILE_NAME_KEYCOLOR, SPOT_CODE_KEYCOLOR+1); 
  }
}

// ソフトキーボードボタリース時のボーダー色設定
function SetMouseUpColor()
{
  try{
	  var Obj = window.event.srcElement
 	  if(Obj.innerText=="")return;
      if(Obj.disabled==true)return;

    switch(Obj.className){
      case CLASS_KEYALPH_A:
      case CLASS_KEYKANA_A:
        Obj.style.backgroundImage = "url('../Bmp/crKeyaBtnU.gif')";
        break;
      case CLASS_KEYALPH_B:
      case CLASS_KEYKANA_B:
        Obj.style.backgroundImage = "url('../Bmp/crKeybBtnU.gif')";
        break;
      case CLASS_KEYOTHER:
        Obj.style.backgroundImage = "url('../Bmp/crSpaceBtnU.gif')";
        break;
      default:
  		  top.GetErrorMessage(FATAL_ERROR_KEYCOLOR,MESSAGE_ID_KEYCOLOR, FILE_NAME_KEYCOLOR, SPOT_CODE_KEYCOLOR+2); 
    }            

	  Obj.borderColorDark  = MOUSEUP_BORDERDARK;
	  Obj.borderColorLight = MOUSEUP_BORDERLIGHT;
	  
  }catch(e){
	  top.GetErrorMessage(FATAL_ERROR_KEYCOLOR,MESSAGE_ID_KEYCOLOR, FILE_NAME_KEYCOLOR, SPOT_CODE_KEYCOLOR+3); 
  }
}
