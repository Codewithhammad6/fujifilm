//*****************************************************************************
//  Indicator_View.js 
//
//     Indicator_Viewのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2004/12/16  菅野      -----        新規作成
//     2006/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応

//     2008/02/28  HSK由比   V3.2         RU非接続時のRUアイコンとタブ非表示対応
//     2009/05/27  FF蔵敷	　　　　　　　　 NAS  検索キー　V60_NAS
//     2009/09/01  FF星野    V6.0          インジケーター切り離し対応
//     2011/01/20  FF星野    V2.1(B)      保管用NAS対応
//     2012/12/27  FFS星野　 V2.4(B)      USBメモリ対応
//     2014/03/11  TYK石井   V3.0(B)      DR装置画面対応
//*****************************************************************************

  var RUBlinkFlag      = 0;      // RUアイコン点滅フラグ
  var PrinterBlinkFlag = 0;      // プリンタアイコン点滅フラグ
  var EventBlinkFlag   = 0;      // イベント情報点滅フラグ
  var HDDBlinkFlag = 0;			 //HDDアイコン点滅フラグ　//V60_NAS
  var DRBatteryBlinkFlag = 0;      // DRバッテリーアイコン点滅フラグ //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD
  var DRErrorBlinkFlag   = 0;      // DRエラーアイコン点滅フラグ //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD
  
  var CurrentView_Etc = 0;              //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD
  var CurrentView_FloatIndicator = 1;   //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD
  
  var PanelStatusDisable = 0;			//切断        2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD
  var PanelStatusComplete = 1;			//起動完了    2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD
  var PanelStatusEmergency = 2;			//緊急モード          2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD
  var PanelStatusCalib = 3;			    //キャリブレーション  2014.06.10 V3.0(B) TYK石井 DR装置画面追加 ADD
  var PanelStatusBattery = 4;			//バッテリー          2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD
  var PanelStatusError = 5;				//エラー              2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD
  
  var ON = 1;							//DR装置有効      2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD
  var OFF = 0;							//DR装置無効      2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD

//*****************************************************************************
// Fn_InitPage
//
// １．機能
//       初期処理




//
// ２．戻り値
//      なし




//
// ３．備考




//*****************************************************************************
function Fn_InitPage(){
  //---- 初期アイコン表示 ----//
  
  //2014.04.02 V3.0(B) TYK石井 DR装置画面追加 ADD Start
  //アイコンの位置を調整する
  InitIconPosition();
  //2014.04.02 V3.0(B) TYK石井 DR装置画面追加 ADD End
  
  switch(parent.ColorType){
    // 画像参照以外の場合



    case 0:
      // RUアイコン
//      document.getElementById("imgRuIcon").src = "../Bmp/indRUBtn3.gif";                // 20080228 HSK由比 V3.2対応 D //
// 20080228 HSK由比 V3.2対応 A Start //
      if(parent.ConnectingRU == 1)
      {
        document.getElementById("imgRuIcon").src = "../Bmp/indRUBtn3.gif";
      }
      else
      {
        document.getElementById("imgRuIconHidden").src = "../Bmp/indRUHide.gif";
      }
// 20080228 HSK由比 V3.2対応 A End //
      
      // メディアアイコン
      if(parent.USBMemoryOutputSetting)
      {
		document.getElementById("imgMediaIcon").src = "../Bmp/indMediaUsbBtn2.gif"; //2012.12.27 FFS星野 V2.4(B) USBメモリ対応 ADD
      }
      else
      {
        document.getElementById("imgMediaIcon").src = "../Bmp/indMediaBtn2.gif";
      }
      // プリンタアイコン表示の切替
      if(parent.DcmOptionKey){
        document.getElementById("imgPrinterIcon").src = "../Bmp/indPrinterBtn2.gif";
      }else{
        document.getElementById("imgPrinterIconHidden").src = "../Bmp/indPrtHide.gif";
      }

      // 出力キューアイコン
      document.getElementById("imgOutputIcon").src = "../Bmp/indQueueBtn2.gif";

      // イベント情報アイコン
      document.getElementById("imgEventIcon").src = "../Bmp/indEventBtn1.gif";
    
//  V60_NAS
	  if(parent.IsNASEffective){
         document.getElementById("imgStorageIcon").src = "../Bmp/indStorageBtn2.gif";
      }else{
         document.getElementById("imgStorageIconHidden").src = "../Bmp/indStorageIconHidden.gif";
      }
      
      //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD Start
      // DRアイコン
      if((parent.ConnectingDR == ON) && (parent.CurrentView == CurrentView_FloatIndicator))
      {
        document.getElementById("imgDrIcon").src = "../Bmp/DRPanelStatus-gray-dis.png";
      }
      else
      {
        document.getElementById("imgDrIconHidden").src = "../Bmp/indRUHide.gif";
      }
      //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD End
    break;
    
    // 画像参照用
    case 1:
      // 2005/08/02 037 H.SAITO デザイン変更
      //// RUアイコン
      //document.getElementById("imgRuIcon").src = "../Bmp/indRuOff_ImageView.gif";
      //
      //// メディアアイコン
      //document.getElementById("imgMediaIcon").src = "../Bmp/indMediaOff_ImageView.gif";
      //
      //// プリンタアイコン表示の切替
      //if(parent.DcmOptionKey){
      //  document.getElementById("imgPrinterIcon").src = "../Bmp/indPrtOff_ImageView.gif";
      //}else{
      //  document.getElementById("imgPrinterIconHidden").src = "../Bmp/indPrtHide_ImageView.gif";
      //}
      //
      //// 出力キューアイコン
      //document.getElementById("imgOutputIcon").src = "../Bmp/indEzOff_ImageView.gif";
      //
      //// イベント情報アイコン
      //document.getElementById("imgEventIcon").src = "../Bmp/indEvtOff_ImageView.gif";
      // RUアイコン
//      document.getElementById("imgRuIcon").src = "../Bmp/indRUBtn_View3.gif";         // 20080228 HSK由比 V3.2対応 D //
// 20080228 HSK由比 V3.2対応 A Start //
      if(parent.ConnectingRU == 1)
      {
        document.getElementById("imgRuIcon").src = "../Bmp/indRUBtn_View3.gif";
      }
      else
      {
        document.getElementById("imgRuIconHidden").src = "../Bmp/indRUHide_ImageView.gif";
      }
// 20080228 HSK由比 V3.2対応 A End //

      // メディアアイコン
      document.getElementById("imgMediaIcon").src = "../Bmp/indMediaBtn_View2.gif";

      // プリンタアイコン表示の切替
      if(parent.DcmOptionKey){
        document.getElementById("imgPrinterIcon").src = "../Bmp/indPrinterBtn_View2.gif";
      }else{
        document.getElementById("imgPrinterIconHidden").src = "../Bmp/indPrtHide_ImageView.gif";
      }

      // 出力キューアイコン
      document.getElementById("imgOutputIcon").src = "../Bmp/indQueueBtn_View2.gif";

      // イベント情報アイコン
      document.getElementById("imgEventIcon").src = "../Bmp/indEventBtn_View1.gif";
      
//  V60_NAS
	  if(parent.IsNASEffective){
         document.getElementById("imgStorageIcon").src = "../Bmp/indStorageBtn2.gif";
      }else{
         document.getElementById("imgStorageIconHidden").src = "../Bmp/indStorageIconHidden.gif";
      }      
      
    break;
  }

  // 画像を表示する
//  document.getElementById("imgRuIcon").style.visibility = "visible";                  // 20080228 HSK由比 V3.2対応 D //
// 20080228 HSK由比 V3.2対応 A Start //
  if(parent.ConnectingRU == 1)
  {
    document.getElementById("imgRUIconHidden").style.visibility = "hidden";
    document.getElementById("imgRUIcon").style.visibility = "visible";
  }
  else
  {
    //document.getElementById("imgRUIconHidden").style.visibility = "visible";//2009.09.01 FF 星野 インジケーター切り離し対応
  }
// 20080228 HSK由比 V3.2対応 A End //
  document.getElementById("imgMediaIcon").style.visibility = "visible";
  if(parent.DcmOptionKey){
    document.getElementById("imgPrinterIconHidden").style.visibility = "hidden";
    document.getElementById("imgPrinterIcon").style.visibility = "visible";
  }else{
    //document.getElementById("imgPrinterIconHidden").style.visibility = "visible";//2009.09.01 FF 星野 インジケーター切り離し対応
  }
  document.getElementById("imgOutputIcon").style.visibility = "visible";
  document.getElementById("imgEventIcon").style.visibility = "visible";

  //  V60_NAS
	if(parent.IsNASEffective){
		document.getElementById("imgStorageIcon").style.visibility = "visible";
		document.getElementById("imgStorageIconHidden").style.visibility = "hidden";
	}else{
		//document.getElementById("imgStorageIconHidden").style.visibility = "visible";//2009.09.01 FF 星野 インジケーター切り離し対応
	}
  //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD Start
  // DRアイコン
  if((parent.ColorType == 0) && (parent.CurrentView == CurrentView_FloatIndicator))
  {
    if(parent.ConnectingDR == ON)
    {
      document.getElementById("imgDrIconHidden").style.visibility = "hidden";
      document.getElementById("imgDrIcon").style.visibility = "visible";
    }
  }
  //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD End
}

//*****************************************************************************
// Public_EndGetStatus
//
// １．機能
//     アイコンステータス取得後の処理



//     アイコンの切替を行う
//
// ２．戻り値
//      なし



//
// ３．備考



//*****************************************************************************
function Public_EndGetStatus(){
  switch(parent.ColorType){
    case 0:
      Public_ExchangeIcon();
      break;
    case 1:
      Public_ExchangeIconForImageView();
      break;
  }
}

//*****************************************************************************
// Public_ExchangeIcon
//
// １．機能
//     インジケータアイコンの切替
//
// ２．戻り値
//      なし



//
// ３．備考



//     ステータスが変化していない場合も切替を行う
//     ただし、点滅→点滅の切替は行わない



//*****************************************************************************
function Public_ExchangeIcon(){
  //RUアイコン切替
  switch(parent.intRUStatus){
    case 0:
      document.getElementById("imgRuIcon").src = "../Bmp/indRUBtn3.gif";
      RUBlinkFlag = 0;
      break;
    case 1:
      document.getElementById("imgRuIcon").src = "../Bmp/indRUBtn2.gif";
      RUBlinkFlag = 0;
      break;
    case 2:
      document.getElementById("imgRuIcon").src = "../Bmp/indRUBtn1.gif";
      RUBlinkFlag = 0;
      break;
    case 3:
      if(!RUBlinkFlag){
        document.getElementById("imgRuIcon").src = "../Bmp/indRUBtn4.gif";
        RUBlinkFlag = 1;
      }
      break;
  }
  
  //メディアアイコン切替
  //2012.12.27 FFS星野 V2.4(B) USBメモリ対応 ADD-ST
  if(parent.USBMemoryOutputSetting)
  {
	switch(parent.intMediaStatus)
	{
		case 0://消灯
		document.getElementById("imgMediaIcon").src = "../Bmp/indMediaUsbBtn2.gif";
		break;
		case 1://点灯
		document.getElementById("imgMediaIcon").src = "../Bmp/indMediaUsbBtn1.gif";
		break;
		case 3://点滅
		document.getElementById("imgMediaIcon").src = "../Bmp/indMediaUsbBtn3.gif";
		break;
	}
  }
  //2012.12.27 FFS星野 V2.4(B) USBメモリ対応 ADD-ED
  //2010.12.21 FF星野 V2.1(B) 保管用NAS対応 ADD-ST
  else if(parent.IsNASBackupEffective)
  {  
    switch(parent.intMediaStatus)
    {
    case 0:
      document.getElementById("imgMediaIcon").src = "../Bmp/indMediaBtn2.gif";
      break;
    case 1:
      document.getElementById("imgMediaIcon").src = "../Bmp/indMediaBtn1.gif";
      break;
    case 2:
      document.getElementById("imgMediaIcon").src = "../Bmp/indMediaBtn3.gif";
      break;
    case 3:
      document.getElementById("imgMediaIcon").src = "../Bmp/indMediaBtn4.gif";
      break;
    }
  }
  //2010.12.21 FF星野 V2.1(B) 保管用NAS対応 ADD-ED
  else
  {
	switch(parent.intMediaStatus)
	{
		case 0:
		document.getElementById("imgMediaIcon").src = "../Bmp/indMediaBtn2.gif";
		break;
		case 1:
		document.getElementById("imgMediaIcon").src = "../Bmp/indMediaBtn1.gif";
		break;
	}
  }
  
  //プリンタアイコン切替
  switch(parent.intPrtStatus){
    case 0:
      document.getElementById("imgPrinterIcon").src = "../Bmp/indPrinterBtn2.gif";
      PrinterBlinkFlag = 0;
      break;
    case 1:
      document.getElementById("imgPrinterIcon").src = "../Bmp/indPrinterBtn1.gif";
      PrinterBlinkFlag = 0;
      break;
    case 2:
      if(!PrinterBlinkFlag){
        document.getElementById("imgPrinterIcon").src = "../Bmp/indPrinterBtn3.gif";
        PrinterBlinkFlag = 1;
      }
      break;
  }

  //出力キューアイコン切替
  switch(parent.intOutputStatus){
    case 0:
      document.getElementById("imgOutputIcon").src = "../Bmp/indQueueBtn2.gif";
      break;
    case 1:
      document.getElementById("imgOutputIcon").src = "../Bmp/indQueueBtn1.gif";
      break;
  }

  //イベントアイコン切替
  switch(parent.intEventStatus){
    case 0:
      document.getElementById("imgEventIcon").src = "../Bmp/indEventBtn1.gif";
      EventBlinkFlag = 0;
      break;
    case 1:
      if(!EventBlinkFlag){
        document.getElementById("imgEventIcon").src = "../Bmp/indEventBtn3.gif";
        EventBlinkFlag = 1;
      }
      break;
  }
  
  //  V60_NAS
    switch(parent.intHDDStatus){
    case 0:
      document.getElementById("imgStorageIcon").src = "../Bmp/indStorageBtn2.gif";
      HDDBlinkFlag = 0;
      break;
    case 1:
      document.getElementById("imgStorageIcon").src = "../Bmp/indStorageBtn1.gif";
      HDDBlinkFlag = 0;
      break;
    case 2:
      document.getElementById("imgStorageIcon").src = "../Bmp/indStorageBtn3.gif";
      HDDBlinkFlag = 0;
      break;
    case 3:
      if(!RUBlinkFlag){
        document.getElementById("imgStorageIcon").src = "../Bmp/indStorageBtn4.gif";
        HDDBlinkFlag = 1;
      }
      break;
  }

  //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD Start
  //DRアイコン切替
  switch(parent.intDRStatus){
    case PanelStatusDisable:
      document.getElementById("imgDrIcon").src = "../Bmp/DRPanelStatus-gray-dis.png";
      DRErrorBlinkFlag = 0;
      DRBatteryBlinkFlag = 0;
      break;
    case PanelStatusComplete:
      document.getElementById("imgDrIcon").src = "../Bmp/DRPanelStatus-gray.png";
      DRErrorBlinkFlag = 0;
      DRBatteryBlinkFlag = 0;
      break;
    case PanelStatusCalib:
      document.getElementById("imgDrIcon").src = "../Bmp/DRPanelStatus-yellow_C.png";
      DRErrorBlinkFlag = 0;
      DRBatteryBlinkFlag = 0;
      break;
    case PanelStatusEmergency:
      document.getElementById("imgDrIcon").src = "../Bmp/DRPanelStatus-yellow.png";
      DRErrorBlinkFlag = 0;
      DRBatteryBlinkFlag = 0;
      break;
    case PanelStatusBattery:
      if(!DRBatteryBlinkFlag){
        document.getElementById("imgDrIcon").src = "../Bmp/DRPanelStatus_error_battery.gif";
        DRErrorBlinkFlag = 0;
        DRBatteryBlinkFlag = 1;
      }
      break;
    case PanelStatusError:
      if(!DRErrorBlinkFlag){
        document.getElementById("imgDrIcon").src = "../Bmp/DRPanelStatus_error.gif";
        DRErrorBlinkFlag = 1;
        DRBatteryBlinkFlag = 0;
      }
      break;
  }
  //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD End
}

//*****************************************************************************
// Public_ExchangeIconForImageView
//
// １．機能
//     インジケータアイコンの切替(画像参照用)
//
// ２．戻り値
//      なし



//
// ３．備考



//     ステータスが変化していない場合も切替を行う
//     ただし、点滅→点滅の切替は行わない



//*****************************************************************************
function Public_ExchangeIconForImageView(){
    // 2005/08/02 141 H.SAITO デザイン変更
    ////RUアイコン切替
    //switch(parent.intRUStatus){
    //case 0:
    //  document.getElementById("imgRuIcon").src = "../Bmp/indRuOff_ImageView.gif";
    //  RUBlinkFlag = 0;
    //  break;
    //case 1:
    //  document.getElementById("imgRuIcon").src = "../Bmp/indRuOn1_ImageView.gif";
    //  RUBlinkFlag = 0;
    //  break;
    //case 2:
    //  document.getElementById("imgRuIcon").src = "../Bmp/indRuOn2_ImageView.gif";
    //  RUBlinkFlag = 0;
    //  break;
    //case 3:
    //  if(!RUBlinkFlag){
    //    document.getElementById("imgRuIcon").src = "../Bmp/indRuBlink_ImageView.gif";
    //    RUBlinkFlag = 1;
    //  }
    //  break;
    //}
    ////メディアアイコン切替
    //switch(parent.intMediaStatus){
    //  case 0:
    //    document.getElementById("imgMediaIcon").src = "../Bmp/indMediaOff_ImageView.gif";
    //    break;
    //  case 1:
    //    document.getElementById("imgMediaIcon").src = "../Bmp/indMediaOn_ImageView.gif";
    //    break;
    //}
    //
    ////プリンタアイコン切替
    //switch(parent.intPrtStatus){
    //  case 0:
    //    document.getElementById("imgPrinterIcon").src = "../Bmp/indPrtOff_ImageView.gif";
    //    PrinterBlinkFlag = 0;
    //    break;
    //  case 1:
    //    document.getElementById("imgPrinterIcon").src = "../Bmp/indPrtOn_ImageView.gif";
    //    PrinterBlinkFlag = 0;
    //    break;
    //  case 2:
    //    if(!PrinterBlinkFlag){
    //      document.getElementById("imgPrinterIcon").src = "../Bmp/indPrtblink_ImageView.gif";
    //      PrinterBlinkFlag = 1;
    //    }
    //    break;
    //}
    ////出力キューアイコン切替
    //switch(parent.intOutputStatus){
    //  case 0:
    //    document.getElementById("imgOutputIcon").src = "../Bmp/indEzOff_ImageView.gif";
    //    break;
    //  case 1:
    //    document.getElementById("imgOutputIcon").src = "../Bmp/indEzOn_ImageView.gif";
    //    break;
    //}
    ////イベントアイコン切替
    //switch(parent.intEventStatus){
    //  case 0:
    //    document.getElementById("imgEventIcon").src = "../Bmp/indEvtOff_ImageView.gif";
    //    EventBlinkFlag = 0;
    //    break;
    //  case 1:
    //    if(!EventBlinkFlag){
    //      document.getElementById("imgEventIcon").src = "../Bmp/indEvtBlink_ImageView.gif";
    //      EventBlinkFlag = 1;
    //    }
    //    break;
    //}
    //RUアイコン切替
    switch(parent.intRUStatus){
      case 0:
        document.getElementById("imgRuIcon").src = "../Bmp/indRUBtn_View3.gif";
        RUBlinkFlag = 0;
        break;
      case 1:
        document.getElementById("imgRuIcon").src = "../Bmp/indRUBtn_View2.gif";
        RUBlinkFlag = 0;
        break;
      case 2:
        document.getElementById("imgRuIcon").src = "../Bmp/indRUBtn_View1.gif";
        RUBlinkFlag = 0;
        break;
      case 3:
        if(!RUBlinkFlag){
          document.getElementById("imgRuIcon").src = "../Bmp/indRUBtn_View4.gif";
          RUBlinkFlag = 1;
        }
        break;
    }
    //メディアアイコン切替
    switch(parent.intMediaStatus){
      case 0:
        document.getElementById("imgMediaIcon").src = "../Bmp/indMediaBtn_View2.gif";
        break;
      case 1:
        document.getElementById("imgMediaIcon").src = "../Bmp/indMediaBtn_View1.gif";
        break;
    }

    //プリンタアイコン切替
    switch(parent.intPrtStatus){
      case 0:
        document.getElementById("imgPrinterIcon").src = "../Bmp/indPrinterBtn_View2.gif";
        PrinterBlinkFlag = 0;
        break;
      case 1:
        document.getElementById("imgPrinterIcon").src = "../Bmp/indPrinterBtn_View1.gif";
        PrinterBlinkFlag = 0;
        break;
      case 2:
        if(!PrinterBlinkFlag){
          document.getElementById("imgPrinterIcon").src = "../Bmp/indPrinterBtn_View3.gif";
          PrinterBlinkFlag = 1;
        }
        break;
    }
    //出力キューアイコン切替
    switch(parent.intOutputStatus){
      case 0:
        document.getElementById("imgOutputIcon").src = "../Bmp/indQueueBtn_View2.gif";
        break;
      case 1:
        document.getElementById("imgOutputIcon").src = "../Bmp/indQueueBtn_View1.gif";
        break;
    }
    //イベントアイコン切替
    switch(parent.intEventStatus){
      case 0:
        document.getElementById("imgEventIcon").src = "../Bmp/indEventBtn_View1.gif";
        EventBlinkFlag = 0;
        break;
      case 1:
        if(!EventBlinkFlag){
          document.getElementById("imgEventIcon").src = "../Bmp/indEventBtn_View3.gif";
          EventBlinkFlag = 1;
        }
        break;
    }
    //  V60_NAS
    //RUアイコン切替
    switch(parent.intHDDStatus){
      case 0:
        document.getElementById("imgStorageIcon").src = "../Bmp/indStorageBtn2.gif";
        HDDBlinkFlag = 0;
        break;
      case 1:
        document.getElementById("imgStorageIcon").src = "../Bmp/indStorageBtn1.gif";
        HDDBlinkFlag = 0;
        break;
      case 2:
        document.getElementById("imgStorageIcon").src = "../Bmp/indStorageBtn3.gif";
        HDDBlinkFlag = 0;
        break;
      case 3:
        if(!HDDBlinkFlag){
          document.getElementById("imgStorageIcon").src = "../Bmp/indStorageBtn4.gif";
          HDDBlinkFlag = 1;
        }
        break;
    }
}

//*****************************************************************************
// PollingError
//
// １．機能
//   ・ポーリング監視でエラーが起きた場合の処理



//
// ２．戻り値
//      なし



//
// ３．備考



//*****************************************************************************
function PollingError(){
  switch(parent.ColorType){
    // 画像参照以外の場合
    case 0:
      document.getElementById("imgRuIcon").src      = "../Bmp/indRUBtn3.gif";
      document.getElementById("imgMediaIcon").src   = "../Bmp/indMediaBtn2.gif";
      document.getElementById("imgPrinterIcon").src = "../Bmp/indPrinterBtn2.gif";
      document.getElementById("imgOutputIcon").src  = "../Bmp/indQueueBtn2.gif";
      document.getElementById("imgEventIcon").src   = "../Bmp/indEventBtn1.gif";
  //  V60_NAS
      document.getElementById("imgStorageIcon").src = "../Bmp/indStorageBtn2.gif";

      //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD Start
      document.getElementById("imgDrIcon").src      = "../Bmp/DRPanelStatus-gray-dis.png";
      //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD End

      break;

    // 画像参照の場合
    case 1:
      // 2005/08/02 011 H.SAITO デザイン変更
      //document.getElementById("imgRuIcon").src      = "../Bmp/indRuOff_ImageView.gif";
      //document.getElementById("imgMediaIcon").src   = "../Bmp/indMediaOff_ImageView.gif";
      //document.getElementById("imgPrinterIcon").src = "../Bmp/indPrtOff_ImageView.gif";
      //document.getElementById("imgOutputIcon").src  = "../Bmp/indEzOff_ImageView.gif";
      //document.getElementById("imgEventIcon").src   = "../Bmp/indEvtOff_ImageView.gif";
      document.getElementById("imgRuIcon").src      = "../Bmp/indRUBtn_View3.gif";
      document.getElementById("imgMediaIcon").src   = "../Bmp/indMediaBtn_View2.gif";
      document.getElementById("imgPrinterIcon").src = "../Bmp/indPrinterBtn_View2.gif";
      document.getElementById("imgOutputIcon").src  = "../Bmp/indQueueBtn_View2.gif";
      document.getElementById("imgEventIcon").src   = "../Bmp/indEventBtn_View1.gif";
      
        //  V60_NAS
      document.getElementById("imgStorageIcon").src = "../Bmp/indStorageBtn2.gif";
      break;
  }
}

//2014.04.02 V3.0(B) TYK石井 DR装置画面追加 ADD Start
//*****************************************************************************
// Fn_InitPage
//
// １．機能
//       アイコンの位置を調整する




//
// ２．戻り値
//      なし




//
// ３．備考




//*****************************************************************************
function InitIconPosition(){
  
  //フローティングインジケータ以外はDR装置アイコンを表示させない。
  if(parent.CurrentView == CurrentView_Etc)
  {
    document.getElementById("imgDrIcon").style.visibility = "hidden";
    document.getElementById("imgDrIconHidden").style.visibility = "hidden";
    document.getElementById("imgDrIcon").style.zIndex = 0;
    document.getElementById("imgDrIconHidden").style.zIndex = 0;
    
    document.getElementById("imgRuIcon").style.left = "0px";
    document.getElementById("imgRuIconHidden").style.left = "0px";
    
    document.getElementById("imgMediaIcon").style.left = "38px";
    
    document.getElementById("imgPrinterIcon").style.left = "114px";
    document.getElementById("imgPrinterIconHidden").style.left = "114px";
    
    document.getElementById("imgOutputIcon").style.left = "152px";
    
    document.getElementById("imgEventIcon").style.left = "190px";
    
    document.getElementById("imgStorageIcon").style.left = "76px";
    document.getElementById("imgStorageIconHidden").style.left = "76px";
    
  }
}
//2014.04.02 V3.0(B) TYK石井 DR装置画面追加 ADD End
