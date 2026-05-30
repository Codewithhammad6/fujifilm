//*****************************************************************************
//  DeviceTub.js 
//
//     DeviceTubのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2014/03/11  TYK石井    3.0(B)      新規作成
//*****************************************************************************

// 現在表示中のユーティリティ画面
var intCurrentUtilityNumber = 0;

var g_TubView;       //押下状態(0:インジケータ　1:タブ)
var g_UtilityNumber; //インジケータの種類


// プログラム名
var PROC_MODE = "DeviceTub";

//装置の有効/無効
var ON = 1;
var OFF= 0;

//*****************************************************************************
// Fn_InitPage
//
// １．機能
//      初期処理

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_InitPage(strQueryString){
    ChildPagesLoadedDeviceTub();
}

//*****************************************************************************
// ChangeDeviceTub
//
// １．機能
//     ・ユーティリティの切替を行う
//
// ２．戻り値
//     なし


//
// ３．備考


//     引数 intUtilityNumber  1:RUユーティリティ画面
//                            2:DRユーティリティ画面
//*****************************************************************************
function ChangeDeviceTub(intUtilityNumber){
  try{
    // 表示中画面のタブがクリックされたら何もしない

    if(intCurrentUtilityNumber == intUtilityNumber){
      return false;
    }  
    
    document.getElementById("DEVICE_VIEW").style.visibility = "hidden";
    
    switch(intUtilityNumber){
      // RUユーティリティ画面

      case 1:
        strCommand = "RU";
        //DR & CRが有効の場合のみ、タブを表示
        if ((top.FUNCTION_FRAME.ConnectingRU == ON) && (top.FUNCTION_FRAME.ConnectingDR == ON) && (top.FUNCTION_FRAME.SystemType != 1)) {
          imgRUTub.src = "../Bmp/Tab_CR_ON.gif";
          imgDRTub.src = "../Bmp/Tab_DR_OFF.gif";
        }
        
        DEVICE_VIEW.location.replace("RU_Ctrl.aspx");
        
        //document.getElementById("DEVICE_RU_VIEW").style.visibility  = "visible";
        //document.getElementById("DEVICE_DR_VIEW").style.visibility = "hidden";
        break;

      // DRユーティリティ画面

      case 2:
        strCommand = "DR";
        //DR & CRが有効の場合のみ、タブを表示
        if ((top.FUNCTION_FRAME.ConnectingRU == ON) && (top.FUNCTION_FRAME.ConnectingDR == ON) && (top.FUNCTION_FRAME.SystemType != 1)) {
          imgRUTub.src = "../Bmp/Tab_CR_OFF.gif";
          imgDRTub.src = "../Bmp/Tab_DR_ON.gif";
        }
        
        DEVICE_VIEW.location.replace("DR_Ctrl.aspx");
        
        //document.getElementById("DEVICE_RU_VIEW").style.visibility  = "hidden";
        //document.getElementById("DEVICE_DR_VIEW").style.visibility = "visible";
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

    // クッキーに保存
    document.cookie = "DR_Display = " + intUtilityNumber + ";0";

  }catch(ex){
    // 例外発生時の処理
    
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}


//*****************************************************************************
// ChildPagesLoadedDeviceTub
//
// １．機能
//     ・画面に表示する文字列の設定を行う
//     ・初期表示するユーティリティ画面の設定を行う
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function ChildPagesLoadedDeviceTub(){
  try{
    
    //ボタン活性
    document.getElementById("divRUTubText").style.visibility = "visible";
    document.getElementById("divDRTubText").style.visibility = "visible";
    document.getElementById("imgDummyTubHidden1").style.visibility = "visible";
    document.getElementById("imgDummyTubHidden2").style.visibility = "visible";
    document.getElementById("imgDummyTubHidden3").style.visibility = "visible";
    document.getElementById("imgFooter").style.visibility = "visible";
    
    // BODYのフォントを指定
    document.body.style.fontFamily = top.FUNCTION_FRAME.FontFamily;

    // 文字列設定
    document.getElementById("divRUTubText").innerText        = parent.Public_GetString(KeyRUDevice, DefaultRUDevice);
    document.getElementById("divDRTubText").innerText        = parent.Public_GetString(KeyDRDevice, DefaultDRDevice);    

    //DR & CRが有効の場合のみ、タブを表示
    if ((top.FUNCTION_FRAME.ConnectingRU == ON) && (top.FUNCTION_FRAME.ConnectingDR == ON) && (top.FUNCTION_FRAME.SystemType != 1)) {
      // RUタブ表示
      document.getElementById("imgRUTubHidden").style.visibility = "hidden";
      document.getElementById("imgRUTub").style.visibility = "visible";
      document.getElementById("divRUTub").style.visibility = "visible";
      
      // DRタブ表示
      document.getElementById("imgDRTubHidden").style.visibility = "hidden";
      document.getElementById("imgDRTub").style.visibility = "visible";
      document.getElementById("divDRTub").style.visibility = "visible";
    }
    else{
      // RUタブ非表示
      document.getElementById("imgRUTubHidden").style.visibility = "visible";
      document.getElementById("imgRUTub").style.visibility = "hidden";
      document.getElementById("divRUTub").style.visibility = "hidden";
      
      // DRタブ非表示
      document.getElementById("imgDRTubHidden").style.visibility = "visible";
      document.getElementById("imgDRTub").style.visibility = "hidden";
      document.getElementById("divDRTub").style.visibility = "hidden";
    }

    // 初期表示ユーティリティ画面の設定

    var intUtilityNumber = 0;
    if(g_TubView == 1)
    {
      // 読取装置タブ押下イベントならCookieで保持した値を使用する
      
      //---- クッキーの値取得 ----//
      myCookie = "DR_Display=";
      myValue = null;
      myStr = document.cookie + ";" ;
      myOfst = myStr.indexOf(myCookie);
      if (myOfst != -1){
        myStart = myOfst + myCookie.length;
        myEnd   = myStr.indexOf(";" , myStart);
        intUtilityNumber   = Number(unescape(myStr.substring(myStart,myEnd)));
      }
      else{
        // クッキーに値がない場合
        document.cookie = "DR_Display = 1;0";
        intUtilityNumber = 1;
      }
    }
    else{
      switch(g_UtilityNumber){
        case 1:
          intUtilityNumber = 1;
          break;
        case 7:
          intUtilityNumber = 2;
          break;
        default:
          intUtilityNumber = 1;
          break;
      }
    }
    
    ChangeDeviceTub(intUtilityNumber)
    
    //top.FUNCTION_FRAME.document.getElementById("VIEW_FRAME").style.visibility == "visible";

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

// ２．戻り値
//　　  特になし

// ３．備考

//       引数      ctrlCommand    操作名
//************************************************
function Public_WriteLog(ctrlCommand){
  try{
    // 操作ログ出力


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

//*****************************************************************************
// Public_Refresh
//
// １．機能
//     画面をリフレッシュする
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Public_Refresh(){
  DEVICE_VIEW.Public_Refresh();
}

//*****************************************************************************
// Public_EndGetNoStatus
//
// １．機能
//      RUステータス取得後の処理(取得に失敗した場合)
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_EndGetNoStatus(){
  DEVICE_VIEW.Public_EndGetNoStatus();
}
