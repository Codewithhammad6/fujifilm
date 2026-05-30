//*****************************************************************************
//  Tub.js 
//
//     Tubのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2004/11/12  菅野      -----        新規作成
//     2008/02/28  HSK由比   V3.2         RU非接続時のRUアイコンとタブ非表示対応
//     2009/05/29  FF 蔵敷　　V6.0         NAS対応 V60_NAS
//     2014/03/11  TYK石井   V3.0         DR装置画面対応
//*****************************************************************************

  // 現在表示中のユーティリティ画面
  var intCurrentUtilityNumber = 0;

  // プログラム名


  var PROC_MODE = "IndicatorTub";

//*****************************************************************************
// Fn_InitPage
//
// １．機能
//     ・画面に表示する文字列の設定を行う
//     ・初期表示するユーティリティ画面の設定を行う
//
// ２．戻り値
//      なし


//
// ３．備考


//     引数 strQueryString  1:RUユーティリティ画面
//                          2:メディアユーティリティ画面
//                          3:プリンタユーティリティ画面
//                          4:出力キューユーティリティ画面
//                          5:イベント情報ユーティリティ画面
//*****************************************************************************
function Fn_InitPage(strQueryString){
  try{
    // BODYのフォントを指定


    document.body.style.fontFamily                           = top.FUNCTION_FRAME.FontFamily;

    // 文字列設定


    //document.getElementById("divRUTubText").innerText        = parent.Public_GetString(KeyReadUnit, DefaultReadUnit); //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 DEL
    document.getElementById("divDeviceTubText").innerText    = parent.Public_GetString(KeyReadUnit, DefaultReadUnit);   //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD
    document.getElementById("divMediaTubText").innerText     = parent.Public_GetString(KeyDVD, DefaultDVD);
    document.getElementById("divPrinterTubText").innerText   = parent.Public_GetString(KeyPrinter, DefaultPrinter);
    document.getElementById("divQueueTubText").innerText     = parent.Public_GetString(KeyOutput, DefaultOutput);
    document.getElementById("divEventTubText").innerText     = parent.Public_GetString(KeyEvent, DefaultEvent);

    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD Start
    //// RUタブ表示の切替
    //if(top.FUNCTION_FRAME.ConnectingRU == 1){
    //  document.getElementById("imgRUTubHidden").style.visibility = "hidden";
    //}
    // 装置タブ表示の切替
    if (top.FUNCTION_FRAME.SystemType == 1) {
        //画像確認モニター
        if(top.FUNCTION_FRAME.ConnectingRU == 1){
            document.getElementById("imgDeviceTubHidden").style.visibility = "hidden";
        }
    }
    else {
        if ((top.FUNCTION_FRAME.ConnectingRU == 1) || (top.FUNCTION_FRAME.ConnectingDR == 1)) {
            document.getElementById("imgDeviceTubHidden").style.visibility = "hidden";
        }
    }
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD End

    // プリンタタブ表示の切替
    if(top.FUNCTION_FRAME.DcmOptionKey){
      document.getElementById("imgPrinterTubHidden").style.visibility = "hidden";
    }

    // 初期表示ユーティリティ画面の設定


    var intUtilityNumber = 0;
    switch(strQueryString){
      case "RU":
        intUtilityNumber = 1;
        break;
      case "Media":
        intUtilityNumber = 2;
        break;
      case "Printer":
        intUtilityNumber = 3;
        break;
      case "Output":
        intUtilityNumber = 4;
        break;
      case "Event":
        intUtilityNumber = 5;
        break;
      case "Direct":
        intUtilityNumber = 5;
        break;
      //V60_NAS
      case "HDD":
        intUtilityNumber = 6;
        break;  
      //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD Start
      case "DR":
        intUtilityNumber = 7;
        break;
      //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD End
      default:
        intUtilityNumber = 1;
        break;
    }
    
    // タブフレームを表示する
    parent.document.getElementById("TUB_FRAME").style.visibility = "visible";  

    // ユーティリティ画面を設定する


    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD 呼び出し元を設定 Start
    //ChangeUtility(intUtilityNumber);
    ChangeTubUtility(intUtilityNumber,0);
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD 呼び出し元を設定 End

  }catch(ex){
    // 例外発生時の処理



    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// ChangeUtility
//
// １．機能
//     ・ユーティリティの切替を行う
//
// ２．戻り値
//     なし


//
// ３．備考


//     引数 intUtilityNumber  1:RUユーティリティ画面
//                            2:メディアユーティリティ画面
//                            3:プリンタユーティリティ画面
//                            4:出力キューユーティリティ画面
//                            5:イベント情報ユーティリティ画面
//                            6:HDDユーティリティ画面
//                            7:DRユーティリティ画面
//*****************************************************************************
function ChangeUtility(intUtilityNumber){
  try{
    // 表示中画面のタブがクリックされたら何もしない


    if(intCurrentUtilityNumber == intUtilityNumber){
      return false;
    }

    // 画面表示用フレームを非表示にする
    parent.document.getElementById("VIEW_FRAME").style.visibility = "hidden";
    
    switch(intUtilityNumber){
      // 装置ユーティリティ画面
      //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD Start
      /*case 1:
        strCommand = "RU";
        imgRUTub.src = "../Bmp/indTabRUTabS.gif";
        ChangeTubVisibility(intCurrentUtilityNumber);
        parent.VIEW_FRAME.location.replace("RU_Ctrl.aspx");
        break;*/
      case 1:
        strCommand = "RU";
        imgDeviceTub.src = "../Bmp/Tab_Radiography_ON.gif";
        ChangeTubVisibility(intCurrentUtilityNumber);
        parent.VIEW_FRAME.location.replace("DeviceTub.aspx");
        break;
      //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD End

      // メディアユーティリティ画面
      case 2:
        strCommand = "Media";
        imgMediaTub.src = "../Bmp/indMediaRUTabS.gif";
        ChangeTubVisibility(intCurrentUtilityNumber);
        parent.VIEW_FRAME.location.replace("Media_Ctrl.aspx");
        break;

      // プリンタユーティリティ画面
      case 3:
        strCommand = "Printer";
        imgPrinterTub.src = "../Bmp/indPrinterRUTabS.gif";
        ChangeTubVisibility(intCurrentUtilityNumber);
        parent.VIEW_FRAME.location.replace("Printer_Ctrl.aspx");
        break;

      // 出力キューユーティリティ画面
      case 4:
        strCommand = "Output";
        imgQueueTub.src = "../Bmp/indQueueRUTabS.gif";
        ChangeTubVisibility(intCurrentUtilityNumber);
        parent.VIEW_FRAME.location.replace("Queue_Ctrl.aspx");
        break;

      // イベント情報ユーティリティ画面
      case 5:
        strCommand = "Event";
        imgEventTub.src = "../Bmp/indEventRUTabS.gif";
        ChangeTubVisibility(intCurrentUtilityNumber);
        parent.VIEW_FRAME.location.replace("Event_Ctrl.aspx");
        break;
　　
　　//  HDD画面ユーティリティ   V60_NAS
　　case 6:
        strCommand = "HDD";
        imgMediaTub.src = "../Bmp/indMediaRUTabS.gif";
        ChangeTubVisibility(intCurrentUtilityNumber);
        parent.VIEW_FRAME.location.replace("Media_Ctrl.aspx");
        break;

    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD Start
    case 7:
        strCommand = "DR";
        imgDeviceTub.src = "../Bmp/Tab_Radiography_ON.gif";
        ChangeTubVisibility(intCurrentUtilityNumber);
        parent.VIEW_FRAME.location.replace("DeviceTub.aspx");
        break;
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD End

      // 例外


      default:
        return false;
    }

    // 初期表示時以外は操作ログ書込み
    if(intCurrentUtilityNumber){
      Public_WriteLog(strCommand);
    }

    // 現在表示中ページを設定する



    intCurrentUtilityNumber = intUtilityNumber;

  }catch(ex){
    // 例外発生時の処理



    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD Start
//*****************************************************************************
// ChangeTubUtility
//
// １．機能
//     ・ユーティリティの切替を行う
//
// ２．戻り値
//     なし


//
// ３．備考


//     引数 intUtilityNumber  1:RUユーティリティ画面
//                            2:メディアユーティリティ画面
//                            3:プリンタユーティリティ画面
//                            4:出力キューユーティリティ画面
//                            5:イベント情報ユーティリティ画面
//                            6:HDDユーティリティ画面
//                            7:DRユーティリティ画面
//          intTubMode        呼び出し元(0:フローティングインジケータ 1:タブ押下)
//*****************************************************************************
function ChangeTubUtility(intUtilityNumber,intTubMode){
  try{
    // 表示中画面のタブがクリックされたら何もしない


    if(intCurrentUtilityNumber == intUtilityNumber){
      return false;
    }

    // 画面表示用フレームを非表示にする
    parent.document.getElementById("VIEW_FRAME").style.visibility = "hidden";
    
    switch(intUtilityNumber){
      // 装置ユーティリティ画面
      case 1:
        strCommand = "RU";
        imgDeviceTub.src = "../Bmp/Tab_Radiography_ON.gif";
        ChangeTubVisibility(intCurrentUtilityNumber);
        parent.VIEW_FRAME.location.replace("DeviceTub.aspx?TubView=" + intTubMode + "&UtilityNumber=1");
        break;

      // メディアユーティリティ画面
      case 2:
        strCommand = "Media";
        imgMediaTub.src = "../Bmp/indMediaRUTabS.gif";
        ChangeTubVisibility(intCurrentUtilityNumber);
        parent.VIEW_FRAME.location.replace("Media_Ctrl.aspx");
        break;

      // プリンタユーティリティ画面
      case 3:
        strCommand = "Printer";
        imgPrinterTub.src = "../Bmp/indPrinterRUTabS.gif";
        ChangeTubVisibility(intCurrentUtilityNumber);
        parent.VIEW_FRAME.location.replace("Printer_Ctrl.aspx");
        break;

      // 出力キューユーティリティ画面
      case 4:
        strCommand = "Output";
        imgQueueTub.src = "../Bmp/indQueueRUTabS.gif";
        ChangeTubVisibility(intCurrentUtilityNumber);
        parent.VIEW_FRAME.location.replace("Queue_Ctrl.aspx");
        break;

      // イベント情報ユーティリティ画面
      case 5:
        strCommand = "Event";
        imgEventTub.src = "../Bmp/indEventRUTabS.gif";
        ChangeTubVisibility(intCurrentUtilityNumber);
        parent.VIEW_FRAME.location.replace("Event_Ctrl.aspx");
        break;
　　
　　//  HDD画面ユーティリティ   V60_NAS
　　case 6:
        strCommand = "HDD";
        imgMediaTub.src = "../Bmp/indMediaRUTabS.gif";
        ChangeTubVisibility(intCurrentUtilityNumber);
        parent.VIEW_FRAME.location.replace("Media_Ctrl.aspx");
        break;
        
    case 7:
        strCommand = "DR";
        imgDeviceTub.src = "../Bmp/Tab_Radiography_ON.gif";
        ChangeTubVisibility(intCurrentUtilityNumber);
        parent.VIEW_FRAME.location.replace("DeviceTub.aspx?TubView=" + intTubMode + "&UtilityNumber=7");
        break;

      // 例外


      default:
        return false;
    }

    // 初期表示時以外は操作ログ書込み
    if(intCurrentUtilityNumber){
      Public_WriteLog(strCommand);
    }

    // 現在表示中ページを設定する



    intCurrentUtilityNumber = intUtilityNumber;

  }catch(ex){
    // 例外発生時の処理



    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}
//2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD End

//*****************************************************************************
// ChangeTubVisibility
//
// １．機能
//     ・タブの活性/非活性の切替を行う
//
// ２．戻り値
//     なし


//
// ３．備考


//     引数 intUtilityNumber  1:RUタブ


//                            2:メディアタブ


//                            3:プリンタタブ


//                            4:出力キュータブ


//                            5:イベント情報タブ


//*****************************************************************************
function ChangeTubVisibility(intUtilityNumber){
  try{
    switch(intUtilityNumber){

      // 初期表示時


      case 0:
        break;
    
      // 装置タブ

      //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD Start
      //case 1:
      //  // タブ画像切替
      //  document.getElementById("imgRUTub").src   = "../Bmp/indTabRUTabN.gif";
      //  break;
      case 1:
      case 7:
        // タブ画像切替
        document.getElementById("imgDeviceTub").src   = "../Bmp/Tab_Radiography_OFF.gif";
        break;
      //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD End

      // メディアタブ


      case 2:
        // タブ画像切替
        document.getElementById("imgMediaTub").src   = "../Bmp/indMediaRUTabN.gif";
        break;

      // プリンタタブ


      case 3:
        // タブ画像切替
        document.getElementById("imgPrinterTub").src   = "../Bmp/indPrinterRUTabN.gif";
        break;

      // 出力キュータブ


      case 4:
        // タブ画像切替
        document.getElementById("imgQueueTub").src   = "../Bmp/indQueueRUTabN.gif";
        break;

      // イベント情報タブ


      case 5:
        // タブ画像切替
        document.getElementById("imgEventTub").src   = "../Bmp/indEventRUTabN.gif";
        break;
     //V60_NAS   
      case 6:
        // タブ画像切替
        document.getElementById("imgMediaTub").src   = "../Bmp/indMediaRUTabN.gif";
        break;
      // 例外


      default:
        break;
    }
  }catch(ex){
    // 例外発生時の処理



    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//************************************************
// Public_WriteLog
//
// １．機能 
//      操作ログを出力する


//
// ２．戻り値
//　　  特になし


//
// ３．備考


//       引数      ctrlCommand    操作名
//************************************************
function Public_WriteLog(ctrlCommand){
  try{
    var strURL = "";
    strURL =  "Logger_Proc.aspx?";
    strURL += "Display=" + PROC_MODE;
    strURL += "&Command=" + ctrlCommand;
    strURL += "&LoginId=" + top.FUNCTION_FRAME.LoginUserId;
    strURL += "&LoginTime=" + top.FUNCTION_FRAME.LoginTime;
    LOGGER_PROC.location.replace(strURL);

  }catch(ex){
    // 例外発生時の処理



    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}