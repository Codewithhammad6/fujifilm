/****************************************************************************

  @file MessageWindow.js

  @brief エラー、処理時のメッセージボックス表示クライアントスクリプト

  @author YSK齋藤

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/05  YSK齋藤     V1.0       新規作成
  @date  06/10/13  S1神立      V1.4       操作性向上(キーボード操作)
  @date  12/07/06  NDD北村     V2.3(B)    CQ#1384

/****************************************************************************/
//エラー
var FATAL_ERROR        = "FATAL_ERROR";		// 致命的エラー
var RETRY_ERROR		   = "RETRY_ERROR";		// 再試行可能エラー
var USER_NOTHING_ERROR = "USER_NOTHING_ERROR";		// ユーザなしエラー(セッションタイムアウト)
// 2005/09/09 Kanno ADD ST PVCS#1332
var CLOSE_ERROR        = "CLOSE_ERROR";		// メッセージクローズ後、画面を閉じる
// 2005/09/09 Kanno ADD ED PVCS#1332

var FILE_NAME_ERROR   = "MessageWindow.js" 
var SPOT_CODE_ERROR   = 0;
var MESSAGE_ID_ERROR  = 30500;
var GET_TIME = 5000;

var CLIENT_TYPE_NONE    = "0";
var CLIENT_TYPE_MINI    = "1";
var CLIENT_TYPE_DESKTOP = "2";
var CLIENT_TYPE_SERVER  = "3";

//変数
var ErrorCommand  = "";	//エラー処理モード

var ErrorDispFlag = 0;  // エラー表示中フラグ

var ErrorMsgId    = 0;	//エラーメッセージID
var ErrorFileName = "";	//エラーファイル名

var ErrorSpotCode = 0;	//エラースポットコード


var TimeId = "" //タイマー

var ClientMode = CLIENT_TYPE_NONE;    //クライアント筐体

//***************************************************************************
//  GetErrorMessage(errorInfo (errorCommand:エラー処理モード
//                             errorMsgId  :エラーメッセージID
//                             erroFile    :エラー発生ファイル名
//                             errorSpot   :エラースポットコード)		
//  1．機能
//      エラーメッセージ取得
//  2．戻り値  
//		  なし
//  3．備考
//***************************************************************************
function GetErrorMessage(errorCommand,errorMsgId,errorFile,errorSpot)
{
  try{
 	  strURL = "../ErrorMsg_Get_Proc.aspx?MsgId="+errorMsgId+"&Command="+errorCommand+"&FileName="+errorFile+"&SpotCode="+errorSpot;
	  GetErrorFrame.location.replace(strURL);

	  // 一定時間後に返却されない場合はデフォルトエラーメッセージ表示
	  // 2012/07/06 NDD北村 CQ#1384 UPD Start
	  //TimeId = setTimeout("Public_ErrorDialog('FATAL_ERROR', 'MessageWindow.js','','ERROR', 'It was not able to access the server.','*Please rectivate.','OK')",GET_TIME);
	  // 2012/07/06 NDD北村 CQ#1384 UPD
	  // デフォルトメッセージの文言を修正
	  TimeId = setTimeout("Public_ErrorDialog('FATAL_ERROR', 'MessageWindow.js','','ERROR', 'It was not able to access the server.','*Please activate the Client device again.','OK')",GET_TIME);
	  // 2012/07/06 NDD北村 CQ#1384 UPD End
	}catch(e){
    GetErrorMessage2(FATAL_ERROR, MESSAGE_ID_ERROR, FILE_NAME_ERROR, SPOT_CODE_ERROR+0);
		return;
	}	
}

function GetErrorMessage2(errorCommand,errorMsgId,errorFile,errorSpot)
{
  try{
 	  strURL = "ErrorMsg_Get_Proc.aspx?MsgId="+errorMsgId+"&Command="+errorCommand+"&FileName="+errorFile+"&SpotCode="+errorSpot;
	  GetErrorFrame.location.replace(strURL);
	  // 一定時間後に返却されない場合はデフォルトエラーメッセージ表示
	  // 2012/07/06 NDD北村 CQ#1384 UPD Start
	  //TimeId = setTimeout("Public_ErrorDialog('FATAL_ERROR', 'MessageWindow.js','','ERROR', 'It was not able to access the server.','*Please rectivate.','OK')",GET_TIME);
	  // 2012/07/06 NDD北村 CQ#1384 UPD
	  // デフォルトメッセージの文言を修正
	  TimeId = setTimeout("Public_ErrorDialog('FATAL_ERROR', 'MessageWindow.js','','ERROR', 'It was not able to access the server.','*Please activate the Client device again.','OK')",GET_TIME);
	  // 2012/07/06 NDD北村 CQ#1384 UPD End
	}catch(e){
    GetErrorMessage2(FATAL_ERROR, MESSAGE_ID_ERROR, FILE_NAME_ERROR, SPOT_CODE_ERROR+0);
		return;
	}	
}

//***************************************************************************
//  Public_ErrorDialog(MessageString:表示メッセージ)		
//  1．機能
//      エラー画面表示
//  2．戻り値  
//      なし
//  3．備考//      06/10/13  S1神立      V1.4      キー操作可能な画面では、
//                                      エラー表示時にOKボタンにフォーカスする

//***************************************************************************
function Public_ErrorDialog(errorCommand,errorFileName,errorSpot,errorTitle1,errorTitle2,errorMessage,buttonString){
    try{
        clearTimeout(TimeId);
        // エラーダイアログ表示中は次のエラーを表示しない        if(ErrorDispFlag != 1){
            var errorTitle = "";
            //2005/05/27(PVCS#350)-ST========================
            //      if(errorCommand != RETRY_ERROR){
            //          errorTitle = errorTitle1+ "    FileName:" + errorFileName + "  SpotCode:"+ errorSpot;     
            //        }else{
            //          errorTitle = errorTitle1;     
            //      }
            switch(errorCommand){
            case FATAL_ERROR:
            case USER_NOTHING_ERROR:
                errorTitle = errorTitle1+ "    FileName:" + errorFileName + "  SpotCode:"+ errorSpot;
            case RETRY_ERROR:
            // 2005/09/09 Kanno ADD ST PVCS#1332
            case CLOSE_ERROR:
            // 2005/09/09 Kanno ADD ED PVCS#1332
                errorTitle = errorTitle1;     
                break;
            default:
                GetErrorMessage2(FATAL_ERROR, MESSAGE_ID_ERROR, FILE_NAME_ERROR, SPOT_CODE_ERROR+1);
                return;
            }
            //2005/05/27(PVCS#350)-EN=======================        
            
            // エラーメッセージ表示
            document.getElementById("TABLE_MainErrorFrame").style.visibility  = "visible";
            document.getElementById("TD_MainErrorTitle1").innerHTML           = errorTitle;
            document.getElementById("TD_MainErrorTitle2").innerHTML           = errorTitle2;
            document.getElementById("TD_MainErrorText").innerHTML             = errorMessage;
            document.getElementById("DIV_MainErrorOkText").innerText          = buttonString;
            ErrorCommand = errorCommand;
            ErrorDispFlag = 1;
            // 061012 神立 >>>
            if(document.getElementById("TABLE_MainErrorFrame").keyControlable == true){
                document.getElementById("DIV_MainErrorButton").focus();
            }
            // <<<
        }
    }catch(e){
        GetErrorMessage2(FATAL_ERROR, MESSAGE_ID_ERROR, FILE_NAME_ERROR, SPOT_CODE_ERROR+2);
        return;
    }    
}
//***************************************************************************
//  Public_CloseDialog(command:表示ID)		
//  1．機能
//      の処理
//  2．戻り値  
//		  なし
//  3．備考
//***************************************************************************
function Public_CloseDialog(command){
  try{
    document.getElementById("TD_MainErrorText").innerText             = "";
    document.getElementById("DIV_MainErrorOkText").innerText           = "";
    document.getElementById("TABLE_MainErrorFrame").style.visibility  = "hidden";

//2005/05/27(PVCS#350)-ST=======================	    
    switch(ErrorCommand){
		// 致命的なエラーの場合

		case FATAL_ERROR:
			switch(ClientMode){
				//クライアントタイプが画像確認モニタ以外

				case CLIENT_TYPE_SERVER:
				case CLIENT_TYPE_DESKTOP:
				case CLIENT_TYPE_NONE:
					Exit();
					break;
				case CLIENT_TYPE_MINI:
					ErrorEnd();
					break;
				default:
					Exit();
//					GetErrorMessage2(FATAL_ERROR, MESSAGE_ID_ERROR, FILE_NAME_ERROR, SPOT_CODE_ERROR+3);
					break;
			}
			break;
		case USER_NOTHING_ERROR:
			switch(ClientMode){
				//クライアントタイプが画像確認モニタ以外はブラウザ終了

				case CLIENT_TYPE_SERVER:
				case CLIENT_TYPE_DESKTOP:
				case CLIENT_TYPE_NONE:
					Exit();
					break;
				//画像確認モニタの場合はログイン画面に戻る

				case CLIENT_TYPE_MINI:
					LogoutAuthority();
					break;
				default:
					Exit();
//					GetErrorMessage2(FATAL_ERROR, MESSAGE_ID_ERROR, FILE_NAME_ERROR, SPOT_CODE_ERROR+4);
					break;
			}
			break;
		case RETRY_ERROR:
			break;
// 2005/09/09 Kanno ADD ST PVCS#1332
		case CLOSE_ERROR:
			Exit();
			break;
// 2005/09/09 Kanno ADD ED PVCS#1332
		default:
			GetErrorMessage2(FATAL_ERROR, MESSAGE_ID_ERROR, FILE_NAME_ERROR, SPOT_CODE_ERROR+5);
			return;
    }
//2005/05/27(PVCS#350)-EN=======================	    

    // エラーダイアログ表示フラグを非表示に設定
    ErrorDispFlag = 0;
	}catch(e){
    GetErrorMessage2(FATAL_ERROR, MESSAGE_ID_ERROR, FILE_NAME_ERROR, SPOT_CODE_ERROR+6);
		return;
	}	
}
//***************************************************************************
//  Public_OnButton_Main(tableNo ： ボタン種類)        
//
//  1．機能
//      ボタン押下時の処理
//    2．戻り値  
//          なし
//  3．備考
//     
//***************************************************************************
function Public_OnButton_Main(tableNo, fileName)
{
    try{
        switch(tableNo){
        //============
        //OKボタン
        //============
        case 0:  // ONCLICK
        // システム開始
            Public_CloseDialog(1);
            document.getElementById("IMG_MainErrorButton").src = fileName;
            break;
        case 1:  // ONMOUSEDOWN
            document.getElementById("IMG_MainErrorButton").src = fileName;            
            break;
        case 2:  // ONMOUSEOUT
            document.getElementById("IMG_MainErrorButton").src = fileName;
            break;
        default:
            GetErrorMessage2(FATAL_ERROR, MESSAGE_ID_ERROR, FILE_NAME_ERROR, SPOT_CODE_ERROR+7);
            return;
        }
    }catch(e){
        GetErrorMessage2(FATAL_ERROR, MESSAGE_ID_ERROR, FILE_NAME_ERROR, SPOT_CODE_ERROR+8);
        return;
    }
}
// 2005/07/29 021 H.SAITO #709 ALT+HOMEキー押下時に画面をロックする
//***************************************************************************
//  Public_Dialog()		
//
//  1．機能
//      透明なDIVを張る
//	2．戻り値  
//		  なし
//  3．備考
//      ALT+HOMEキー押下時の対策
//***************************************************************************
function Public_Dialog(){
  try{
      document.getElementById("TABLE_MainErrorFrame").style.visibility  = "visible";
      document.getElementById("TABLE_MainErrorBox").style.visibility    = "hidden";
      document.getElementById("IMG_MainErrorButton").style.visibility   = "hidden";
      // #709 alt+home --ST
      //document.getElementById("DIV_MainErrorOkText").innerText          = "";
      document.getElementById("DIV_MainErrorButton").style.visibility   = "hidden";
      // #709 alt+home --EN
  }catch(e){
    GetErrorMessage2(FATAL_ERROR, MESSAGE_ID_ERROR, FILE_NAME_ERROR, SPOT_CODE_ERROR+9);
  }
}
