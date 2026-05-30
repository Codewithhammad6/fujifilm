//*****************************************************************************
//  RUStatus_View.js 
//
//     RUStatus_Viewのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2004/11/12  菅野      -----        新規作成
//     2006/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応

//     2007/06/09  HSK由比     V2.0       PVCS#2313
//     2014/03/11  TYK石井     V3.0(B)    DR装置画面追加
//*****************************************************************************

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
    document.body.style.fontFamily                   = top.FUNCTION_FRAME.FontFamily;
    document.getElementById("divRuStatus").style.fontFamily = top.FUNCTION_FRAME.FontFamily;

// 20070609 HSK由比 V2.0 PVCS#2313 A Start //
    // コントロールに対してフォントサイズを設定
    // 装置状態ラベル
    document.getElementById("divRuStatus").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
    // 装置状態テキスト
    document.getElementById("divStatus").style.fontSize   = top.FUNCTION_FRAME.FontSizeS;
    // 詳細情報ラベル
    document.getElementById("divRuDetail").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
    // 詳細情報テキスト
    document.getElementById("divDetail").style.fontSize   = top.FUNCTION_FRAME.FontSizeS;
// 20070609 HSK由比 V2.0 PVCS#2313 A End //

    // 文字列設定
    document.getElementById("divRuStatus").innerText = top.FUNCTION_FRAME.Public_GetString(parent.KeyDeviceStatus, parent.DefaultDeviceStatus);
    document.getElementById("divRuDetail").innerText = top.FUNCTION_FRAME.Public_GetString(parent.KeyDetailInfo, parent.DefaultDetailInfo);

  }catch(ex){
    // 例外発生時の処理

    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_SetStatus
//
// １．機能
//     RU装置状態情報の表示
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Public_SetStatus(){
  try{
    // RU装置状態情報
    document.getElementById("divStatus").innerHTML = parent.g_strDeviceStatus;
    document.getElementById("divDetail").innerHTML = parent.g_strDetail;

    // RU操作ボタン1
    if(parent.g_strRUButton1){
      document.getElementById("divRUButton1").innerHTML = parent.g_strRUButton1;
      document.getElementById("imgRUButton1").style.visibility = "visible";
      document.getElementById("tblRUButton1").style.visibility = "visible";
    }else{
      document.getElementById("imgRUButton1").style.visibility = "hidden";
      document.getElementById("tblRUButton1").style.visibility = "hidden";
      document.getElementById("divRUButton1").innerText = "";
    }

    // RU操作ボタン2
    if(parent.g_strRUButton2){
      document.getElementById("divRUButton2").innerHTML = parent.g_strRUButton2;
      document.getElementById("imgRUButton2").style.visibility = "visible";
      document.getElementById("tblRUButton2").style.visibility = "visible";
    }else{
      document.getElementById("imgRUButton2").style.visibility = "hidden";
      document.getElementById("tblRUButton2").style.visibility = "hidden";
      document.getElementById("divRUButton2").innerText = "";
    }

    // RU操作ボタン3
    if(parent.g_strRUButton3){
      document.getElementById("divRUButton3").innerHTML = parent.g_strRUButton3;
      document.getElementById("imgRUButton3").style.visibility = "visible";
      document.getElementById("tblRUButton3").style.visibility = "visible";
    }else{
      document.getElementById("tblRUButton3").style.visibility = "hidden";
      document.getElementById("imgRUButton3").style.visibility = "hidden";
      document.getElementById("divRUButton3").innerText = "";
    }

    // RU操作ボタン4
    if(parent.g_strRUButton4){
      document.getElementById("divRUButton4").innerHTML = parent.g_strRUButton4;
      document.getElementById("imgRUButton4").style.visibility = "visible";
      document.getElementById("tblRUButton4").style.visibility = "visible";
    }else{
      document.getElementById("imgRUButton4").style.visibility = "hidden";
      document.getElementById("tblRUButton4").style.visibility = "hidden";
      document.getElementById("divRUButton4").innerText = "";
    }

    // 初期表示時は表示用フレームを表示する
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD Start
    //if(parent.parent.document.getElementById("VIEW_FRAME").style.visibility == "hidden"){
    //  parent.parent.document.getElementById("VIEW_FRAME").style.visibility = "visible";
    //}
    if(parent.parent.document.getElementById("DEVICE_VIEW").style.visibility == "hidden"){
      parent.parent.document.getElementById("DEVICE_VIEW").style.visibility = "visible";
    }
    
    if(parent.parent.parent.document.getElementById("VIEW_FRAME").style.visibility == "hidden"){
      parent.parent.parent.document.getElementById("VIEW_FRAME").style.visibility = "visible";
    }
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD End

  }catch(ex){
    // 例外発生時の処理

    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_EndGetNoStatus
//
// １．機能
//     RU装置状態情報の表示(結果が0件の場合)
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Public_EndGetNoStatus(){
  try{
    // RU装置状態情報
    document.getElementById("divStatus").innerHTML = "";
    document.getElementById("divDetail").innerHTML = "";

    // RU操作ボタン1
    document.getElementById("imgRUButton1").style.visibility = "hidden";
    document.getElementById("tblRUButton1").style.visibility = "hidden";
    document.getElementById("divRUButton1").innerHTML = "";

    // RU操作ボタン2
    document.getElementById("imgRUButton2").style.visibility = "hidden";
    document.getElementById("tblRUButton2").style.visibility = "hidden";
    document.getElementById("divRUButton2").innerText = "";

    // RU操作ボタン3
    document.getElementById("imgRUButton3").style.visibility = "hidden";
    document.getElementById("tblRUButton3").style.visibility = "hidden";
    document.getElementById("divRUButton3").innerText = "";

    // RU操作ボタン4
    document.getElementById("imgRUButton4").style.visibility = "hidden";
    document.getElementById("tblRUButton4").style.visibility = "hidden";
    document.getElementById("divRUButton4").innerText = "";


    // 初期表示時は表示用フレームを表示する
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD Start
    //if(parent.parent.document.getElementById("VIEW_FRAME").style.visibility == "hidden"){
    //  parent.parent.document.getElementById("VIEW_FRAME").style.visibility = "visible";
    //}
    if(parent.parent.document.getElementById("DEVICE_VIEW").style.visibility == "hidden"){
      parent.parent.document.getElementById("DEVICE_VIEW").style.visibility = "visible";
    }
    
    if(parent.parent.parent.document.getElementById("VIEW_FRAME").style.visibility == "hidden"){
      parent.parent.parent.document.getElementById("VIEW_FRAME").style.visibility = "visible";
    }
    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD End

  }catch(ex){
    // 例外発生時の処理

    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_WindowRequest
//
// １．機能
//     Window表示要求に対する操作
//
// ２．戻り値
//      なし
//
// ３．備考
//      引数   ButtonNo  Window表示要求に対して実行されたボタン
//*****************************************************************************
function Fn_WindowRequest(ButtonNo){
  try{
    // 操作ログ登録
    strCommand = "Button" + ButtonNo;
    parent.Public_WriteLog(strCommand);
    
    // Window表示要求応答
    parent.Public_WindowRequest(ButtonNo);

  }catch(ex){
    // 例外発生時の処理

    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}
