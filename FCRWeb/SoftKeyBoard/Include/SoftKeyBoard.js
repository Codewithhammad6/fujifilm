/****************************************************************************

  @file SoftKeyBoard.js

  @brief ソフトキーボード処理クライアントスクリプト

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/01  YSK畑       V1.0       新規作成

/****************************************************************************/
var KEYBOARD_COUNT   = 3;	// キーボード最大数
var LINE_INPUT_COUNT = 5;	
var LINE_NUM_COUNT   = 4;	
//タブ選択IMAGE位置
var TAB_SELECT_LEFT   ="18px"; 
var TAB_SELECT_CENTER ="88px"; 
var TAB_SELECT_RIGHT  ="158px"; 
 //[定数]
var STRING_COUNT = 1000;		// 再帰関数のループ数
var FATAL_ERROR          = "FATAL_ERROR";     //致命的なエラー 
var RETRY_ERROR          = "RETRY_ERROR";     //再試行可能なエラー
var SPOT_CODE            = 0;                 //スポットコードvar FILE_NAME            = "SoftKeyBoard.js";//ファイル名var MESSAGE_ID           = 30500;             //メッセージID 
var MESSAGE_ID_ACCESS    = 30501;             //メッセージID 
var KEY_FONT_SIZE        = "125%";            //キーボードの相対フォントサイズ
//[変数]
var MaxCount;				// 最大インデックス
var MinCount;				// 最小インデックス
var MidCount;				// 検索インデックス
var Count=0;				// ループカウンタ
var KeyBoardDispFlag    = 0;     //表示キーボード(0:アルファベット 1:カナ 2:記号)
var KeyBoardDisableFlag = 1;     //キーボード不活性状態( 1:全キーボード不活性 2:全キーボード不活性(デフォルトボタンは活性) 3:カナ、記号キーボード不活性 4:カナキーボード不活性 5:全キーボード活性) 
 
//************************************************
// Fn_InitPage
// 
// １．機能 
//     ページ読み込み完了時の処理
// ２．戻り値
//     なし// ３．備考//     文字列設定//************************************************
function Fn_InitPage(){
	try{
		// 文字列設定		document.getElementById("LabelSpace").innerText     = CharacterSpace;
		document.getElementById("LabelDelete").innerText    = CharacterDelete;
		document.getElementById("LabelAllDelete").innerText = CharacterAllDelete;
    //フォント名,フォントサイズの設定    document.getElementById("BODY").style.fontFamily         = FONT_NAME;
    document.getElementById("BODY").style.fontSize           = FONT_SIZE_M;
    document.getElementById("KeyNum").style.fontFamily       = FONT_NAME;
    document.getElementById("KeyNum").style.fontSize         = FONT_SIZE_M;
    document.getElementById("KeyDef").style.fontFamily       = FONT_NAME;
    document.getElementById("KeyDef").style.fontSize         = FONT_SIZE_S;
		document.getElementById("LabelSpace").style.fontSize     = FONT_SIZE_S;
		document.getElementById("LabelDelete").style.fontSize    = FONT_SIZE_S;
		document.getElementById("LabelAllDelete").style.fontSize = FONT_SIZE_S;
    document.getElementById("KeyTab").style.fontFamily       = FONT_NAME;
    document.getElementById("KeyTab").style.fontSize         = FONT_SIZE_M;
	}catch(e){
		top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID, FILE_NAME, SPOT_CODE+0); 
	}
}

//************************************************
// Fn_Change(num : ソフトキーボード番号 0:アルファベット//                                      1:カナ//						                2:記号
// １．機能 
//     ページ読み込み完了時の処理// ２．戻り値
//     なし// ３．備考//     文字列設定//************************************************
function Fn_Change(num){
	try{
		var strHTML = "";
    var fontSize;

	  if(ScreenNo == 2 && ValueMulti == 1){
	    switch(num){
	      case 0:
          document.getElementById("IMG_Tab_Select").style.left = TAB_SELECT_LEFT;
	        break;
	      case 1:
          document.getElementById("IMG_Tab_Select").style.left = TAB_SELECT_CENTER;
	        break;
	      case 2:
          document.getElementById("IMG_Tab_Select").style.left = TAB_SELECT_RIGHT;
	        break;
	      default:
	        break;
	    }
	  }else{
	    switch(num){
	      case 0:
          document.getElementById("IMG_Tab_Select").style.left = TAB_SELECT_LEFT;
	        break;
	      case 2:
          document.getElementById("IMG_Tab_Select").style.left = TAB_SELECT_CENTER;
	        break;
	      default:
	        break;
	    }
	  }
    //表示キーボード設定
    KeyBoardDispFlag    = num;     //表示キーボード(0:アルファベット 1:カナ 2:記号)

		// キーボードのHTMLタグ作成		
		strHTML = strHTML+ "<TABLE CLASS='Board' BORDER=1 BORDERCOLORDARK='#6e7878' BORDERCOLORLIGHT='#000000' CELLSPACING=1	CELLPADDING=3 ID='KeyInput'>\n";
		for(l=0; l<COUNT_ROW; l++){
			strHTML = strHTML +"		<TR align='center7'>\n";
			for(m=0; m<COUNT_COL; m++){
				strHTML = strHTML + "			<TD CLASS='"+ top.KeyBoardClass[num][l][m] +"' onmousedown='SetMouseDownColor()' onmouseup='SetMouseUpColor()' onmouseout='SetMouseUpColor()' onClick=parent.InputChar(\""+ top.KeyBoardChar[num][l][m] + "\")>" + top.KeyBoardName[num][l][m] + "</TD>\n";
			}
			strHTML = strHTML + "		</TR>\n";
		}
		strHTML = strHTML + "</TABLE>\n";
		document.getElementById("divKeyChar").innerHTML      = strHTML;
    // フォント名,フォントサイズの設定
    document.getElementById("KeyInput").style.fontFamily = FONT_NAME;
    document.getElementById("KeyInput").style.fontSize   = FONT_SIZE_M;
    
    //キーボード不活性/活性状態設定
//    KeyBoardDisabled(KeyBoardDisableFlag);

	}catch(e){
		top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID, FILE_NAME, SPOT_CODE+1); 
	}
}
//************************************************
// Fn_Init
// 
// １．機能 
//     初期化(アルファベットキーボードに変換)
// ２．戻り値
//     なし
// ３．備考
//     文字列設定
//************************************************
function Fn_Init(){
	try{
 	  if(ScreenNo == 2 && ValueMulti == 1){
  		// カナキーボード表示
  		Fn_Change(1);
    }else{
  		// アルファベットキーボード表示
  		Fn_Change(0);
    }    
    
	}catch(e){
		top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID, FILE_NAME, SPOT_CODE+2); 
	}
}

//************************************************
// KeyBoardDisabled
// 
// １．機能 
//     ソフトキーボード活性／不活性
// ２．戻り値
//     なし// ３．備考//     FocusNum : 1 全キーボード不活性(デフォルトボタンも不活性)
//              : 2 全キーボード不活性(デフォルトボタンは活性)
//              : 3 カナ、記号キーボード不活性
//              : 4 カナキーボード不活性
//              : 5 全キーボード活性
//************************************************
function KeyBoardDisabled(FocusNum)
{
  try{
	
		var bInputDisable = false;
		var bNumDisable   = false;
		var bDefDisable   = false;

    KeyBoardDisableFlag = FocusNum;

  	switch(FocusNum){
  		case 1: //全不活性
  			bInputDisable = true;
  			bNumDisable   = true;
  			bDefDisable   = true;
        break;
  		case 2: //全不活性(削除、スペース活性)
  			bInputDisable = true;
  			bNumDisable   = true;
  			bDefDisable   = false;
        break;
   		case 3: //半角カナ、記号不活性
  	    switch(KeyBoardDispFlag){
  		    case 0: //アルファベットキーボード
  			    bInputDisable = false;
  			    bNumDisable   = false;
  			    bDefDisable   = false;
            break;
  		    case 1: //カナキーボード
   		    case 2: //記号キーボード
  			    bInputDisable = true;
  			    bNumDisable   = false;
  			    bDefDisable   = false;
            break;
          default:
          	top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID, FILE_NAME, SPOT_CODE+7); 
   		      return;
        }
        break;
   		case 4: //半角カナ不活性
  	    switch(KeyBoardDispFlag){
  		    case 0: //アルファベットキーボード
   		    case 2: //記号キーボード
  			    bInputDisable = false;
  			    bNumDisable   = false;
  			    bDefDisable   = false;
            break;
  		    case 1: //カナキーボード
  			    bInputDisable = true;
  			    bNumDisable   = false;
  			    bDefDisable   = false;
            break;
          default:
          	top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID, FILE_NAME, SPOT_CODE+8); 
            return;
        }
        break;
   		case 5: //全キーボード活性
  			bInputDisable = false;
  			bNumDisable   = false;
  			bDefDisable   = false;
        break;
      default:
    		top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID, FILE_NAME, SPOT_CODE+6); 
        return;
    }

		// キーボード文字列入力部
		for(j=0; j<LINE_INPUT_COUNT; j++)
		{
			obj = KeyInput.rows(j);
			k=0;
			while(obj.cells(k) != null)
			{
				obj.cells(k).disabled = bInputDisable;
				k++;
			}
		}
					
 		// キーボード数値入力部
		for(l=0; l<LINE_NUM_COUNT; l++)
		{
			obj = KeyNum.rows(l);
			m=0;
			while(obj.cells(m) != null)
			{
				obj.cells(m).disabled = bNumDisable;
				m++;
			}
		}			
		
		// キーボード削除部
		obj = KeyDef.rows(0);
		n=0;
		while(obj.cells(n) != null){
			obj.cells(n).disabled = bDefDisable;
			n++;
		}

	}catch(e){
   		top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID, FILE_NAME, SPOT_CODE+9); 
	}

}

//***************************************************************************
//  Public_ClearStirngCount(	
//
//  1．機能
//      検索インデックスス初期化//		
//  2．戻り値  
//		  なし//  3．備考//     
//***************************************************************************
function Public_ClearStirngCount(){
  try{
	  MaxCount = StringCount-1;
	  MinCount = 0;
	  MidCount;
	  Count=0;
  }catch(e){
  		top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID, FILE_NAME, SPOT_CODE+3); 
  }
}

//***************************************************************************
//  Public_GetString( stringKey        : 検索キー
//             defaultString    : デフォルト文字列
//              )
//  1．機能
//      文字検索
//		
//  2．戻り値  
//		  なし//  3．備考//***************************************************************************
function Public_GetString(stringKey, defaultString)
{
  try{
	  // 検索キー
	  MidCount = parseInt(MinCount +(MaxCount-MinCount)/2);

	  // キーが一致した場合
	  if(stringKey == CaptionId[MidCount]){
		  Public_ClearStirngCount();
		  return CaptionString[MidCount];

	  }
	  // キーが分岐点大なりの場合
	  else if(stringKey > CaptionId[MidCount]){
		  // 最大より大なりの場合デフォルト値を設定
		  if(stringKey > CaptionId[MaxCount]){
			  Public_ClearStirngCount();
			  return defaultString;
		  }
		  // 上記以外の場合再度検索
		  else{
			  // 最小値を検索した番号より1増加
			  MinCount = MidCount+1;
			  return Public_GetString(stringKey, defaultString);
		  }
	  }
	  // キーが分岐点小なりの場合
	  else if(stringKey < CaptionId[MidCount]){
		  // 最大より大なりの場合デフォルト値を設定
		  if(stringKey < CaptionId[MinCount]){
			  Public_ClearStirngCount();
			  return defaultString;
		  }
		  // 上記以外の場合再度検索
		  else{
			  // 最大値を検索した番号より1減少
			  MaxCount = MidCount-1;
			  return Public_GetString(stringKey, defaultString);
		  }
	  }
	  // 再帰関数が一定よりオーバーした場合
	  else if(Count > STRING_COUNT){
  		top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID, FILE_NAME, SPOT_CODE+4); 
		  Public_ClearStirngCount();
		  return defaultString;
	  }
	  Count++;
  }catch(e){
		top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID, FILE_NAME, SPOT_CODE+5); 
  }
}
