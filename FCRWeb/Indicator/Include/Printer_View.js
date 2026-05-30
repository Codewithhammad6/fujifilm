//*****************************************************************************
//  Printer_View.js 
//
//     Printer_Viewのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2004/12/03  菅野      -----        新規作成
//     2006/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
//     2007/06/09  HSK由比     V2.0       PVCS#2313
//
//*****************************************************************************

  // コンボボックス
  var g_ComboBoxWidth = 448;         // コンボボックスの幅
  var g_ComboBoxTop   = 64;          // コンボボックスのTOP
  var g_ComboBoxLeft  = 200;         // コンボボックスのLEFT
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
    // 装置名称ラベル
    document.getElementById("divDeviceName").style.fontSize      = top.FUNCTION_FRAME.FontSizeS;
    // 装置状態ラベル
    document.getElementById("divDeviceStatus").style.fontSize    = top.FUNCTION_FRAME.FontSizeS;
    // 装置状態テキスト
    document.getElementById("divDeviceStatusTxt").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
    // 詳細情報ラベル
    document.getElementById("divDetail").style.fontSize          = top.FUNCTION_FRAME.FontSizeS;
    // 詳細情報テキスト
    document.getElementById("divDetailTxt").style.fontSize       = top.FUNCTION_FRAME.FontSizeS;
// 20070609 HSK由比 V2.0 PVCS#2313 A End //

    // 文字列設定
    document.getElementById("divDeviceName").innerText   = top.FUNCTION_FRAME.Public_GetString(parent.KeyDeviceName, parent.DefaultDeviceName);
    document.getElementById("divDeviceStatus").innerText = top.FUNCTION_FRAME.Public_GetString(parent.KeyDeviceStatus, parent.DefaultDeviceStatus);
    document.getElementById("divDetail").innerText       = top.FUNCTION_FRAME.Public_GetString(parent.KeyDetailInfo, parent.DefaultDetailInfo);

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
// Public_EndGetStatus
//
// １．機能
//     プリンタ装置状態情報の表示
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Public_EndGetStatus(){
  try{
    var i;

    // コンボボックス作成
    var strHTML = "";
    strHTML = "<TABLE ID='ComboBox' BORDER='0' CELLSPACING='0'>";
    for(i=0; i<parent.strDeviceName.length ; i++){
      strHTML += "<TR>";
// 20050604 YSK)Kanno UPDATE プルダウン項目が１件のとき、初期表示で項目が選択されない不具合対応(PVCS#721) START
//      strHTML += "<TD ID='tdOption' ONMOUSEOVER='Fn_ComboBoxSet(this);' ONMOUSEUP='Fn_Select(" + i + ");' BORDER=0 CELLSPACING='0'>";
      strHTML += "<TD ID='tdOption" + i + "' ONMOUSEOVER='Fn_ComboBoxSet(this);' ONMOUSEUP='Fn_Select(" + i + ");' BORDER=0 CELLSPACING='0'>";
// 20050604 YSK)Kanno UPDATE プルダウン項目が１件のとき、初期表示で項目が選択されない不具合対応 END
      strHTML += "<DIV ID='divOption' NOWRAP STYLE='OVERFLOW:hidden;'>" + parent.strDeviceName[i] + "</DIV>";
      strHTML += "</TD></TR>";
    }
    strHTML += "</TABLE>";
    parent.document.getElementById("divComboBox").innerHTML = strHTML;

    // コンボボックスの位置設定
    parent.document.getElementById("ComboBox").style.width  = g_ComboBoxWidth;
    parent.document.getElementById("ComboBox").style.top    = g_ComboBoxTop + 41;
    parent.document.getElementById("ComboBox").style.left   = g_ComboBoxLeft;
    if(parent.strDeviceName.length > 0){
      parent.document.getElementById("divOption").style.width = g_ComboBoxWidth-4;
      Public_Select(g_ComboIndex);
    }else{
      parent.document.getElementById("ComboBox").style.height = 50;
      document.getElementById("divDeviceStatusTxt").innerHTML = "";
      document.getElementById("divDetailTxt").innerHTML       = "";
      document.getElementById("divHead").innerText            = "";
    }

    // 初期表示時は表示用フレームを表示する
    if(parent.parent.document.getElementById("VIEW_FRAME").style.visibility == "hidden"){
      parent.parent.document.getElementById("VIEW_FRAME").style.visibility = "visible";
    }

  }catch(ex){
    // 例外発生時の処理

    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_Select
//
// １．機能
//     選択されたプリンタの装置状態を表示
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_Select(Index){
  try{
    // 右クリックの場合は操作を無効にする
    if (parent.event){
      if(parent.event.type == "mouseup" && parent.event.button == 2){
        return;
      }
    }

    // 装置状態を表示
    document.getElementById("divDeviceStatusTxt").innerHTML = parent.strStatus[Index];
    document.getElementById("divDetailTxt").innerHTML       = parent.strDetail[Index];
    document.getElementById("divHead").innerText            = parent.strDeviceName[Index];
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

    parent.document.getElementById("ComboBoxFrame").style.visibility = "visible";
    parent.document.getElementById("ComboBox").style.visibility      = "visible";

    // 取得件数が0件の場合は処理を終了する    if(parent.strDeviceName.length <= 0){
      return;
    }

// 20050604 YSK)Kanno UPDATE プルダウン項目が１件のとき、初期表示で項目が選択されない不具合対応 start
//    // 全行を非選択状態にする
//    if(parent.strDeviceName.length > 1){
//      for(i=0; i<parent.strDeviceName.length; i++){
//        parent.tdOption[i].bgColor = "";
//      }
//    }else{
//      parent.tdOption.bgColor = "";
//    }
//    // 選択されている項目の行を選択状態にする
//    if(parent.strDeviceName.length > 1){
//      if(g_ComboIndex >= 0){
//        parent.tdOption[g_ComboIndex].bgColor = g_Color;
//      }
//    }else{
//        parent.tdOption.bgColor = g_Color;
//    }
    // 背景を設定する
    for(i=0; i<parent.strDeviceName.length; i++){
        parent.document.getElementById("tdOption" + i).bgColor = "";
    }
    if(g_ComboIndex >= 0){
        parent.document.getElementById("tdOption" + g_ComboIndex).bgColor = g_Color;
    }
// 20050604 YSK)Kanno UPDATE プルダウン項目が１件のとき、初期表示で項目が選択されない不具合対応 end

  }catch(ex){
    // 例外発生時の処理

    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

