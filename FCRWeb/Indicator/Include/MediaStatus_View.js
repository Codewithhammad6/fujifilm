//*****************************************************************************
//  MediaStatus_View.js 
//
//     MediaStatus_Viewのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2004/12/03  菅野      -----        新規作成
//     2006/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応

//     2007/06/09  HSK由比     V2.0       PVCS#2313
//     2007/10/04  HSK由比     V3.0       C/S向け(ディスク操作)仕様変更
//     2008/01/25  FF星野      V3.1       DVDメディアイジェクト対応
//     2009/05/29  FF蔵敷　　　 V6.0      NAS対応 V60_NAS
//     2011/01/20  FF星野　　　V2.1(B)    保管用NAS対応
//*****************************************************************************

  var g_ComboBoxWidth = 472;         // コンボボックスの幅

  var g_ComboBoxTop   = 32;          // コンボボックスのTOP
  var g_ComboBoxLeft  = 192;         // コンボボックスのLEFT
//var g_Color         = "blue";      // 選択された項目の背景
  var g_Color         = "#8FFFBD";   // 2005/05/24
  var g_ComboIndex    = 0;          // コンボボックスの選択された行


//*****************************************************************************
// Fn_InitPage
//
// １．機能
//     ・画面に表示する文字列の設定を行う
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_InitPage(){
  try{
    // BODYのフォントを指定
    document.body.style.fontFamily = top.FUNCTION_FRAME.FontFamily;
    
// 20070609 HSK由比 V2.0 PVCS#2313 A Start //
    // コントロールに対してフォントサイズを設定
    // 取り出しボタン
    document.getElementById("divMediaEject").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
    // 入れ替えボタン
    document.getElementById("divMediaChange").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
    // クライアントUTLボタン
    document.getElementById("divUtility").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
    // 装置名称ラベル
    document.getElementById("divDeviceName").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
    // 装置名称コンボボックス
    document.getElementById("divHead").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
    // 装置状態ラベル
    document.getElementById("divDeviceStatus").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
    // 装置状態テキスト
    document.getElementById("divDeviceStatusTxt").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
    // 用途ラベル
    document.getElementById("divUseType").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
    // 用途テキスト
    document.getElementById("divUseTypeTxt").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
    // 書込設定ラベル
    document.getElementById("divWritable").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
    // 書込設定テキスト
    document.getElementById("divWritableTxt").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
// 20070609 HSK由比 V2.0 PVCS#2313 A End //

    // メディアボタンの表示/非表示切替
//    switch(top.FUNCTION_FRAME.SystemType){
      // 確認モニタ
//      case 1:
//2008.01.25 DVDメディアイジェクト対応 DEL_START 星野      
//// 20071004 HSK由比 V3.0 C/S向け(ディスク操作)仕様変更 A Start //
//      // デスクトップ
//
//      case 2:
//// 20071004 HSK由比 V3.0 C/S向け(ディスク操作)仕様変更 A End //
//2008.01.25 DVDメディアイジェクト対応 DEL_END 星野
        // 取り出しボタン
//        document.getElementById("imgMediaEject").style.visibility         = "hidden";
//        document.getElementById("tblMediaEject").style.visibility         = "hidden";
//        document.getElementById("imgMediaEjectDisable").style.visibility  = "hidden";
//        document.getElementById("divMediaEject").style.color              = "black";
        // 入れ替えボタン
//        document.getElementById("imgMediaChange").style.visibility        = "hidden";
//        document.getElementById("tblMediaChange").style.visibility        = "hidden";
//        document.getElementById("imgMediaChangeDisable").style.visibility = "hidden";
//        document.getElementById("divMediaChange").style.color             = "black";
        // ユーティリティボタン
//        document.getElementById("imgUtility").style.visibility            = "hidden";
//        document.getElementById("tblUtility").style.visibility            = "hidden";
//        document.getElementById("imgUtilityDisable").style.visibility     = "hidden";
//        document.getElementById("divUtility").style.color                 = "black";
//        break;

      // デスクトップ
//2008.01.25 DVDメディアイジェクト対応 ADD_START 星野  
//      case 2:
          // 取り出しボタン
//        document.getElementById("imgMediaEject").style.visibility         = "visible";
//        document.getElementById("tblMediaEject").style.visibility         = "visible";
//        document.getElementById("imgMediaEjectDisable").style.visibility  = "hidden";
//        document.getElementById("divMediaEject").style.color              = "black";
        // 入れ替えボタン
//        document.getElementById("imgMediaChange").style.visibility        = "visible";
//        document.getElementById("tblMediaChange").style.visibility        = "visible";
//        document.getElementById("imgMediaChangeDisable").style.visibility = "hidden";
//        document.getElementById("divMediaChange").style.color             = "black";
        // ユーティリティボタン
//        document.getElementById("imgUtility").style.visibility            = "hidden";
//        document.getElementById("tblUtility").style.visibility            = "hidden";
//        document.getElementById("imgUtilityDisable").style.visibility     = "hidden";
//        document.getElementById("divUtility").style.color                 = "black";
//        break;    
//2008.01.25 DVDメディアイジェクト対応 ADD_END 星野  
// 20071004 HSK由比 V3.0 C/S向け(ディスク操作)仕様変更 D Start //
//      case 2:
//        // 取り出しボタン
//        document.getElementById("imgMediaEject").style.visibility         = "visible";
//        document.getElementById("tblMediaEject").style.visibility         = "visible";
//        document.getElementById("imgMediaEjectDisable").style.visibility  = "hidden";
//        document.getElementById("divMediaEject").style.color              = "black";
//        // 入れ替えボタン
//        document.getElementById("tblMediaChange").style.visibility        = "visible";
//        document.getElementById("imgMediaChangeDisable").style.visibility = "visible";
//        document.getElementById("divMediaChange").style.color             = "gray";
//        // ユーティリティボタン
//        document.getElementById("imgUtility").style.visibility            = "visible";
//        document.getElementById("tblUtility").style.visibility            = "visible";
//        document.getElementById("imgUtilityDisable").style.visibility     = "hidden";
//        document.getElementById("divUtility").style.color                 = "black";
//        break;
// 20071004 HSK由比 V3.0 C/S向け(ディスク操作)仕様変更 D End //

      // サーバ

//      case 3:
        // 取り出しボタン
//        document.getElementById("imgMediaEject").style.visibility         = "visible";
//        document.getElementById("tblMediaEject").style.visibility         = "visible";
//        document.getElementById("imgMediaEjectDisable").style.visibility  = "hidden";
//        document.getElementById("divMediaEject").style.color              = "black";
        // 入れ替えボタン
//        document.getElementById("imgMediaChange").style.visibility        = "visible";
//        document.getElementById("tblMediaChange").style.visibility        = "visible";
//        document.getElementById("imgMediaChangeDisable").style.visibility = "hidden";
//        document.getElementById("divMediaChange").style.color             = "black";
        // ユーティリティボタン
//        document.getElementById("imgUtility").style.visibility            = "visible";
//        document.getElementById("tblUtility").style.visibility            = "visible";
//        document.getElementById("imgUtilityDisable").style.visibility     = "hidden";
//        document.getElementById("divUtility").style.color                 = "black";
//        break;
//
//      default:
//        // 取り出しボタン
//        document.getElementById("imgMediaEject").style.visibility  = "hidden";
//       document.getElementById("tblMediaEject").style.visibility  = "hidden";
//        // 入れ替えボタン
//        document.getElementById("imgMediaChange").style.visibility = "hidden";
//        document.getElementById("tblMediaChange").style.visibility = "hidden";
//       // ユーティリティボタン
//      document.getElementById("imgUtility").style.visibility     = "hidden";
//      document.getElementById("tblUtility").style.visibility     = "hidden";
//  }

    // 文字列設定

    document.getElementById("divDeviceName").innerText   = top.FUNCTION_FRAME.Public_GetString(parent.KeyDeviceName, parent.DefaultDeviceName);
    document.getElementById("divDeviceStatus").innerText = top.FUNCTION_FRAME.Public_GetString(parent.KeyDeviceStatus, parent.DefaultDeviceStatus);
    document.getElementById("divUseType").innerText      = top.FUNCTION_FRAME.Public_GetString(parent.KeyUseType, parent.DefaultUseType);
    document.getElementById("divWritable").innerText     = top.FUNCTION_FRAME.Public_GetString(parent.KeyWriteSetup, parent.DefaultWriteSetup);
    document.getElementById("divMediaChange").innerText  = top.FUNCTION_FRAME.Public_GetString(parent.KeyDVDChange, parent.DefaultDVDChange);
    document.getElementById("divMediaEject").innerText   = top.FUNCTION_FRAME.Public_GetString(parent.KeyDVDEject, parent.DefaultDVDEject);
    document.getElementById("divUtility").innerText      = top.FUNCTION_FRAME.Public_GetString(parent.KeyUtility, parent.DefaultUtility);

    // コンボボックスのサイズ設定

    document.getElementById("tblHead").style.width = g_ComboBoxWidth;
    document.getElementById("tblHead").style.top   = g_ComboBoxTop;
    document.getElementById("tblHead").style.left  = g_ComboBoxLeft;
    document.getElementById("divHead").style.width = g_ComboBoxWidth-8;
    document.getElementById("imgPull").style.top   = g_ComboBoxTop + 3;
    document.getElementById("imgPull").style.left  = g_ComboBoxLeft + g_ComboBoxWidth - 38;
  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}
//*****************************************************************************
//Private_SetGUI4HDD
//
//*****************************************************************************
function Private_SetGUI4HDD()
{
        document.getElementById("imgMediaEject").style.visibility         = "hidden";
        document.getElementById("tblMediaEject").style.visibility         = "hidden";
        document.getElementById("imgMediaEjectDisable").style.visibility  = "hidden";
        document.getElementById("divMediaEject").style.color              = "black";
        // 入れ替えボタン
        document.getElementById("imgMediaChange").style.visibility        = "hidden";
        document.getElementById("tblMediaChange").style.visibility        = "hidden";
        document.getElementById("imgMediaChangeDisable").style.visibility = "hidden";
        document.getElementById("divMediaChange").style.color             = "black";
        // ユーティリティボタン
        document.getElementById("imgUtility").style.visibility            = "hidden";
        document.getElementById("tblUtility").style.visibility            = "hidden";
        document.getElementById("imgUtilityDisable").style.visibility     = "hidden";
        document.getElementById("divUtility").style.color                 = "black";
        
        document.getElementById("tblUseTypeTxt").style.visibility = "hidden";
        document.getElementById("tblUseType").style.visibility = "hidden";
}
//*****************************************************************************
//Private_SetGUI4DVD
//
//*****************************************************************************
function Private_SetGUI4DVD()
{
    switch(top.FUNCTION_FRAME.SystemType){
    // 確認モニタ
      case 1:
       // 取り出しボタン
        document.getElementById("imgMediaEject").style.visibility         = "hidden";
        document.getElementById("tblMediaEject").style.visibility         = "hidden";
        document.getElementById("imgMediaEjectDisable").style.visibility  = "hidden";
        document.getElementById("divMediaEject").style.color              = "black";
        // 入れ替えボタン
        document.getElementById("imgMediaChange").style.visibility        = "hidden";
        document.getElementById("tblMediaChange").style.visibility        = "hidden";
        document.getElementById("imgMediaChangeDisable").style.visibility = "hidden";
        document.getElementById("divMediaChange").style.color             = "black";
        // ユーティリティボタン
        document.getElementById("imgUtility").style.visibility            = "hidden";
        document.getElementById("tblUtility").style.visibility            = "hidden";
        document.getElementById("imgUtilityDisable").style.visibility     = "hidden";
        document.getElementById("divUtility").style.color                 = "black";
        break;

      // デスクトップ
      case 2:
          // 取り出しボタン
        document.getElementById("imgMediaEject").style.visibility         = "visible";
        document.getElementById("tblMediaEject").style.visibility         = "visible";
        document.getElementById("imgMediaEjectDisable").style.visibility  = "hidden";
        document.getElementById("divMediaEject").style.color              = "black";
        // 入れ替えボタン
        document.getElementById("imgMediaChange").style.visibility        = "visible";
        document.getElementById("tblMediaChange").style.visibility        = "visible";
        document.getElementById("imgMediaChangeDisable").style.visibility = "hidden";
        document.getElementById("divMediaChange").style.color             = "black";
        // ユーティリティボタン
        document.getElementById("imgUtility").style.visibility            = "hidden";
        document.getElementById("tblUtility").style.visibility            = "hidden";
        document.getElementById("imgUtilityDisable").style.visibility     = "hidden";
        document.getElementById("divUtility").style.color                 = "black";
        break;    
     // サーバ
     case 3:
        // 取り出しボタン
        document.getElementById("imgMediaEject").style.visibility         = "visible";
        document.getElementById("tblMediaEject").style.visibility         = "visible";
        document.getElementById("imgMediaEjectDisable").style.visibility  = "hidden";
        document.getElementById("divMediaEject").style.color              = "black";
        // 入れ替えボタン
        document.getElementById("imgMediaChange").style.visibility        = "visible";
        document.getElementById("tblMediaChange").style.visibility        = "visible";
        document.getElementById("imgMediaChangeDisable").style.visibility = "hidden";
        document.getElementById("divMediaChange").style.color             = "black";
        // ユーティリティボタン
        document.getElementById("imgUtility").style.visibility            = "visible";
        document.getElementById("tblUtility").style.visibility            = "visible";
        document.getElementById("imgUtilityDisable").style.visibility     = "hidden";
        document.getElementById("divUtility").style.color                 = "black";
        break;

      default:
        // 取り出しボタン
        document.getElementById("imgMediaEject").style.visibility  = "hidden";
        document.getElementById("tblMediaEject").style.visibility  = "hidden";
        // 入れ替えボタン
        document.getElementById("imgMediaChange").style.visibility = "hidden";
        document.getElementById("tblMediaChange").style.visibility = "hidden";
       // ユーティリティボタン
      document.getElementById("imgUtility").style.visibility     = "hidden";
      document.getElementById("tblUtility").style.visibility     = "hidden";
  }
  document.getElementById("tblUseTypeTxt").style.visibility = "visible";
  document.getElementById("tblUseType").style.visibility = "visible";
}

//*****************************************************************************
// Public_EndGetStatus
//
// １．機能
//     メディア装置状態情報の表示
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_EndGetStatus(){
  try{
    var i;
    var ComboCount = 0;    // コンボボックスの項目数

    // コンボボックス作成
    var strHTML = "";
    strHTML = "<TABLE ID='ComboBox' BORDER='0' CELLSPACING='0'>";
    for(i=0; i<parent.g_strDeviceName.length ; i++){
      if(parent.g_strDeviceName[i] != "" && parent.g_strDeviceName[i] != null){
        strHTML += "<TR>";
// 20050604 YSK)Kanno UPDATE プルダウン項目が１件のとき、初期表示で項目が選択されない不具合対応(PVCS#721) START
//        strHTML += "<TD ID='tdOption' ONMOUSEOVER='Fn_ComboBoxSet(this);' ONMOUSEUP='Fn_Select(" + i + ");' BORDER=0 CELLSPACING='0'>";
        strHTML += "<TD ID='tdOption" + i + "' ONMOUSEOVER='Fn_ComboBoxSet(this);' ONMOUSEUP='Fn_Select(" + i + ");' BORDER=0 CELLSPACING='0'>";
// 20050604 YSK)Kanno UPDATE (PVCS#721) END
        strHTML += "<DIV ID='divOption' NOWRAP STYLE='OVERFLOW:hidden;'>" + parent.g_strDeviceName[i] + "</DIV>";
        strHTML += "</TD></TR>";
        ++ComboCount;
      }
    }
    strHTML += "</TABLE>";
    parent.document.getElementById("divComboBox").innerHTML = strHTML;

    // コンボボックスの位置設定

    parent.document.getElementById("ComboBox").style.width  = g_ComboBoxWidth;
    parent.document.getElementById("ComboBox").style.top    = g_ComboBoxTop + 141;
    parent.document.getElementById("ComboBox").style.left   = g_ComboBoxLeft;

    if(ComboCount > 0){
      parent.document.getElementById("divOption").style.width = g_ComboBoxWidth-4;
      
      if((parent.g_intWritingHDDIndex != 0) && (top.FUNCTION_FRAME.UtilityKind =="HDD"))		//V60_NAS
      {
         Public_Select(parent.g_intWritingHDDIndex);																//V60_NAS
      }
      else
      {
         Public_Select(g_ComboIndex);																					//V60_NAS
      }
    // 取得結果が0件の場合
    }else{
      parent.document.getElementById("ComboBox").style.height = 50;

      // 画面をクリアする
      document.getElementById("divHead").innerText            = "";
      document.getElementById("divDeviceStatusTxt").innerHTML = "";
      document.getElementById("divUseTypeTxt").innerHTML      = "";
      document.getElementById("divWritableTxt").innerHTML     = "";

// 20071004 HSK由比 V3.0 B#144 A Start //
      // クライアントPCのときはメディア操作ボタンが非表示になっているので変更せず
      // クライアントPC以外のときにメディア操作ボタンを不活性にする
      if(top.FUNCTION_FRAME.SystemType != 2)
      {
        document.getElementById("imgMediaEjectDisable").style.visibility  = "visible";
        document.getElementById("divMediaEject").style.color              = "gray";
        document.getElementById("imgMediaChangeDisable").style.visibility = "visible";
        document.getElementById("divMediaChange").style.color             = "gray";
        document.getElementById("imgUtilityDisable").style.visibility     = "visible";
        document.getElementById("divUtility").style.color                 = "gray";
      }
// 20071004 HSK由比 V3.0 B#144 A End //
// 20071004 HSK由比 V3.0 B#144 D Start //
//      document.getElementById("imgMediaEjectDisable").style.visibility  = "visible";
//      document.getElementById("divMediaEject").style.color              = "gray";
//      document.getElementById("imgMediaChangeDisable").style.visibility = "visible";
//      document.getElementById("divMediaChange").style.color             = "gray";
//      document.getElementById("imgUtilityDisable").style.visibility     = "visible";
//      document.getElementById("divUtility").style.color                 = "gray";
// 20071004 HSK由比 V3.0 B#144 D End //
    }

    // 保管用メディアリストの取得


    parent.Public_GetMediaList();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_EndSetStatus
//
// １．機能
//     メディア装置状態情報の表示
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_EndSetStatus(){
  try{
    parent.Public_GetMediaList();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_Select
//
// １．機能
//     選択されたドライブの装置状態を表示する
//
// ２．戻り値
//      なし

//
// ３．備考

//      引数    Index    選択されたインデックス
//*****************************************************************************
function Public_Select(Index){
  try{
    // 右クリックの場合は操作を無効にする
    if (parent.event){
      if(parent.event.type == "mouseup" && parent.event.button == 2){
        return;
      }
    }
  //V60_NAS
    if(parent.g_intDeviceType[Index] == 1 || parent.g_intDeviceType[Index] == 3 || parent.g_intDeviceType[Index] == 4)//2010.12.21 FF星野 V2.1(B) 保管用NAS対応 UPD //2013.04.09 FFS星野 V2.4(B) USBメモリ対応 UPD
    {    
         Private_SetGUI4HDD();
    }else
    {
         Private_SetGUI4DVD();
    }
    
    // 装置状態を表示
    document.getElementById("divHead").innerText            = parent.g_strDeviceName[Index];
    document.getElementById("divDeviceStatusTxt").innerHTML = parent.g_strLabelName[Index];
    document.getElementById("divUseTypeTxt").innerHTML      = parent.g_strMediaKind[Index];
    document.getElementById("divWritableTxt").innerHTML     = parent.g_strWritable[Index];

// 20071004 HSK由比 V3.0 B#144 D Start //
//    // 自筐体がデスクトップの場合、メディアボタンの活性/非活性を切り替える
//    if(top.FUNCTION_FRAME.SystemType == 2){
//      switch(parent.g_strDeviceAttr[Index]){
//        // 対象メディアが自筐体の場合

//        case "0":
//          document.getElementById("imgMediaEjectDisable").style.visibility  = "hidden";
//          document.getElementById("divMediaEject").style.color   = "black";
//          break;
//        // 対象メディアがサーバの場合

//        case "1":
//          document.getElementById("imgMediaEjectDisable").style.visibility  = "visible";
//          document.getElementById("divMediaEject").style.color   = "gray";
//          break;
//      }
//    }
// 20071004 HSK由比 V3.0 B#144 D End //
    g_ComboIndex = Index;

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_ShowDrop
//
// １．機能
//     ・コンボボックスを表示する
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_ShowDrop() {
  try{
    // 右クリックの場合はコンボボックスを表示しない


    if (event.button == 2){
      return;
    }

    // 取得件数が0件の場合はコンボボックスを表示しない


    if(parent.g_strDeviceName.length <= 0){
      return;
    }

    // コンボボックスを表示する
    parent.document.getElementById("ComboBoxFrame").style.visibility = "visible";
    parent.document.getElementById("ComboBox").style.visibility      = "visible";

// 20050604 YSK)Kanno UPDATE プルダウン項目が１件のとき、初期表示で項目が選択されない不具合対応(PVCS#721) START
//    // 項目が複数件ある場合

//    if(parent.g_strDeviceName.length > 1){
//      // 背景を設定する

//      for(i=0; i<parent.g_strDeviceName.length; i++){
//        parent.tdOption[i].bgColor = "";
//          parent.document.getElementById("tdOption" + i).bgColor = "";
//      }
//      if(g_ComboIndex >= 0){
//        parent.tdOption[g_ComboIndex].bgColor=g_Color;
//          parent.document.getElementById("tdOption" + g_ComboIndex).bgColor = g_Color;
//      }
//    }
    // 背景を設定する

    for(i=0; i<parent.g_strDeviceName.length; i++){
        parent.document.getElementById("tdOption" + i).bgColor = "";
    }
    if(g_ComboIndex >= 0){
        parent.document.getElementById("tdOption" + g_ComboIndex).bgColor = g_Color;
    }
// 20050604 YSK)Kanno UPDATE プルダウン項目が１件のとき、初期表示で項目が選択されない不具合対応 END

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_DiskChange
//
// １．機能
//     ディスク入れ替え操作

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_DiskChange(){
  try{
    parent.Public_DiskChange();
  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_MediaControl
//
// １．機能
//     メディア操作

//
// ２．戻り値
//      なし

//
// ３．備考

//       引数      Control    0 : 入れ替え

//                            1 : 取り出し

//                            2 : クライアントユーティリティ
//*****************************************************************************
function Fn_MediaControl(Control){
  try{
    var objClientUtl;
    var chgflg    = 0;
    var DeviceId  = parent.g_intDeviceID[g_ComboIndex];
// 2005/09/12 Kanno UPDATE ST PVCS#799
//    var IpAddress = parent.g_strIpAddress;
    var HostName = parent.g_strHostName;
// 2005/09/12 Kanno UPDATE ST PVCS#799
    var LoginId   = top.FUNCTION_FRAME.LoginUserId;
    var LoginTime = top.FUNCTION_FRAME.LoginTime;

    switch(Control){
      // 入れ替え

      case 0:
        if(document.getElementById("imgMediaChangeDisable").style.visibility == "hidden"){
          parent.Public_WriteLog("Change");

          objClientUtl = new ActiveXObject("ClientUtility.Media.Media");
// 2005/09/12 Kanno UPDATE ST PVCS#799
//// 2005/08/09 Kanno UPDATE ST PVCS#1046
////          objClientUtl.MediaExchange(DeviceId, IpAddress);
//          objClientUtl.MediaExchange(LoginId, LoginTime, DeviceId, IpAddress);
//// 2005/08/09 Kanno UPDATE ED PVCS#1046
          objClientUtl.MediaExchange(LoginId, LoginTime, DeviceId, HostName);
// 2005/09/12 Kanno UPDATE ED PVCS#799
        }
        break;

      // 取り出し

      case 1:
        if(document.getElementById("imgMediaEjectDisable").style.visibility == "hidden"){
          parent.Public_WriteLog("Eject");

          objClientUtl = new ActiveXObject("ClientUtility.Media.Media");
// 2005/09/12 Kanno UPDATE ST PVCS#799
//          objClientUtl.MediaEject(DeviceId, IpAddress);
          objClientUtl.MediaEject(DeviceId, HostName);
// 2005/09/12 Kanno UPDATE ED PVCS#799
        }
        break;

      // クライアントユーティリティ
      case 2:
        if(document.getElementById("imgUtilityDisable").style.visibility == "hidden"){
          // 操作ログ登録
          parent.Public_WriteLog("Utility");

          objClientUtl = new ActiveXObject("ClientUtility.Main.ClientUtility");
// 2005/09/12 Kanno UPDATE ST PVCS#799
//          objClientUtl.OpenMediaDialog(LoginId, LoginTime, IpAddress, chgflg);
          objClientUtl.OpenMediaDialog(LoginId, LoginTime, HostName, chgflg);
// 2005/09/12 Kanno UPDATE ED PVCS#799
        }
        break;
    }

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}
