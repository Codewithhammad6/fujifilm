//*****************************************************************************
//  Event_View.js 
//
//     Event_Viewのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2004/12/21  菅野      -----        新規作成
//     2006/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
//     2007/03/16  HSK平尾     V2.0       内視鏡画像取込/DICOM出力対応
//     2007/06/09  HSK由比     V2.0       PVCS#2313
//
//     2009/07/27  FF星野      V6.0       インジケーター切り離し対応
//
//     2010/04/05  FF星野      V2.0(B)    インジケーター全削除対応
//     2014/05/19  FFS星野     V3.0(B)    DR入力対応
//*****************************************************************************
 
  //---- イベント情報リストの選択行 ----//
  var g_SelectedObj         = "";          // 選択された行のオブジェクト

  var g_SelectedObjColor    = "";          // 選択された行の背景色
  var g_Index               = -1;          // 選択された行のインデックス

  //---- コンボボックス ----//
  var arrayKindDisplay      = new Array(); // 種別コンボボックスのDisplay
  var arrayKindValue        = new Array(); // 種別コンボボックスのValue
  var g_KindComboBoxWidth   = 240;         // 種別コンボボックスの幅

  var g_KindComboBoxTop     = 28;          // 種別コンボボックスのTOP
  var g_KindComboBoxLeft    = 155;         // 種別コンボボックスのLEFT
  var g_KindComboIndex      = -1;          // 種別コンボボックスの選択された行

  var arrayStatusDisplay    = new Array(); // ステータスコンボボックスのDisplay
  var arrayStatusValue      = new Array(); // ステータスコンボボックスのValue
  var g_StatusComboBoxWidth = 240;         // ステータスコンボボックスの幅

  var g_StatusComboBoxTop   = 28;          // ステータスコンボボックスのTOP
  var g_StatusComboBoxLeft  = 535;         // ステータスコンボボックスのLEFT
  var g_StatusComboIndex    = -1;          // ステータスコンボボックスの選択された行

//var g_Color               = "blue";      // 選択された項目の背景
  var g_Color               = "#8FFFBD";   // 2005/05/24

  //---- 文字の色 ----//
  var g_ListColor_Unconfirm = "red";       // 未確認情報
  var g_ListColor_Confirm   = "black";     // 確認済み情報

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

    document.body.style.fontFamily                       = top.FUNCTION_FRAME.FontFamily;

// 20070609 HSK由比 V2.0 PVCS#2313 A Start //
    // コントロールに対してフォントサイズを設定
    // 発生ラベル
    document.getElementById("divKindFilter").style.fontSize   = top.FUNCTION_FRAME.FontSizeS;
    // ステータスラベル
    document.getElementById("divStatusFilter").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
    // リストの種類ヘッダ列
    document.getElementById("divErrLevel").style.fontSize     = top.FUNCTION_FRAME.FontSizeS;
    // リストのコードヘッダ列
    document.getElementById("divErrCode").style.fontSize      = top.FUNCTION_FRAME.FontSizeS;
    // リストの発生日時ヘッダ列
    document.getElementById("divIncDateTime").style.fontSize  = top.FUNCTION_FRAME.FontSizeS;
    // リストの発生元ヘッダ列
    document.getElementById("divErrKind").style.fontSize      = top.FUNCTION_FRAME.FontSizeS;
    // リストの内容ヘッダ列
    document.getElementById("divErrInfo").style.fontSize      = top.FUNCTION_FRAME.FontSizeS;
    // ページ数表示
    document.getElementById("divPage").style.fontSize         = top.FUNCTION_FRAME.FontSizeS;
// 20070609 HSK由比 V2.0 PVCS#2313 A End //

    // 文字列設定

    document.getElementById("divKindFilter").innerText   = top.FUNCTION_FRAME.Public_GetString(parent.KeyKind, parent.DefaultKind);
    document.getElementById("divStatusFilter").innerText = top.FUNCTION_FRAME.Public_GetString(parent.KeyStatus, parent.DefaultStatus);
    document.getElementById("divDetail").innerText       = top.FUNCTION_FRAME.Public_GetString(parent.KeyDetail, parent.DefaultDetail);
    document.getElementById("divDelete").innerText       = top.FUNCTION_FRAME.Public_GetString(parent.KeyDelete, parent.DefaultDelete);
    document.getElementById("divAllDelete").innerText    = top.FUNCTION_FRAME.Public_GetString(parent.KeyAllDelete, parent.DefaultAllDelete);//2010.04.05 FF 星野 インジケーター全削除対応 ADD
    document.getElementById("divConfirm").innerText      = top.FUNCTION_FRAME.Public_GetString(parent.KeyConfirm, parent.DefaultConfirm);
    document.getElementById("divConfirmAll").innerText   = top.FUNCTION_FRAME.Public_GetString(parent.KeyAllConfirm, parent.DefaultAllConfirm);
    document.getElementById("divConfirmAllPage").innerText= top.FUNCTION_FRAME.Public_GetString(parent.KeyAllConfirmPage, parent.DefaultAllConfirmPage);//2009.07.27 FF 星野 インジケーター切り離し対応 ADD
    document.getElementById("divErrLevel").innerText     = top.FUNCTION_FRAME.Public_GetString(parent.KeyErrorLevel, parent.DefaultErrorLevel);
    document.getElementById("divErrCode").innerText      = top.FUNCTION_FRAME.Public_GetString(parent.KeyErrorCode, parent.DefaultErrorCode);
    document.getElementById("divIncDateTime").innerText  = top.FUNCTION_FRAME.Public_GetString(parent.KeyIncDateTime, parent.DefaultIncDateTime);
    document.getElementById("divErrKind").innerText      = top.FUNCTION_FRAME.Public_GetString(parent.KeyKind, parent.DefaultKind);
    document.getElementById("divErrInfo").innerText      = top.FUNCTION_FRAME.Public_GetString(parent.KeyErrorInfo, parent.DefaultErrorInfo);
    document.getElementById("divPage").innerText         = "1 / 1";

    // ページ遷移ボタン設定


    document.getElementById("imgPrevPage").style.visibility = "hidden";
    document.getElementById("imgNextPage").style.visibility = "hidden";

    //----コンボボックスに値設定----//
    // 種別コンボボックス
    arrayKindDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyAll, parent.DefaultAll));
    arrayKindDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyPrinter, parent.DefaultPrinter));
    arrayKindDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyDisk, parent.DefaultDisk));
    arrayKindDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyCaRnaData, parent.DefaultCaRnaData));
    // 20070316 HSK平尾 V2.0 内視鏡画像取込/DICOM出力対応 A Start
    arrayKindDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyDicomStorage, parent.DefaultDicomStorage));
    // 20070316 HSK平尾 V2.0 内視鏡画像取込/DICOM出力対応 A End
    arrayKindDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyRU, parent.DefaultRU));
    arrayKindDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyDRReadUnit, parent.DefaultDRUnit));//2014.05.19 FFS 星野 DR入力対応 ADD

    // 20070316 HSK平尾 V2.0 内視鏡画像取込/DICOM出力対応 A Start
    arrayKindDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyInputEsImage, parent.DefaultInputEsImage));
    // 20070316 HSK平尾 V2.0 内視鏡画像取込/DICOM出力対応 A End
    arrayKindDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyStudyRegist, parent.DefaultStudyRegist));
    arrayKindDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyImageRef, parent.DefaultImageRef));
    arrayKindDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyCommon, parent.DefaultCommon));
    arrayKindDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyOther, parent.DefaultOther));
    
    
    arrayKindValue.push(0);
    arrayKindValue.push(1);
    arrayKindValue.push(2);
    arrayKindValue.push(3);
    // 20070316 HSK平尾 V2.0 内視鏡画像取込/DICOM出力対応 A Start
    arrayKindValue.push(9);
    // 20070316 HSK平尾 V2.0 内視鏡画像取込/DICOM出力対応 A End
    arrayKindValue.push(4);
    arrayKindValue.push(11);//2014.05.19 FFS 星野 DR入力対応 ADD
    // 20070316 HSK平尾 V2.0 内視鏡画像取込/DICOM出力対応 A Start
    arrayKindValue.push(10);
    // 20070316 HSK平尾 V2.0 内視鏡画像取込/DICOM出力対応 A End
    arrayKindValue.push(5);
    arrayKindValue.push(6);
    arrayKindValue.push(7);
    arrayKindValue.push(8);

    

    // ステータスコンボボックス
    arrayStatusDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyAll, parent.DefaultAll));
    arrayStatusDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyUnconfirmed, parent.DefaultUnconfirmed));
    arrayStatusDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyConfirmed, parent.DefaultConfirmed));
    arrayStatusValue.push(2);
    arrayStatusValue.push(0);
    arrayStatusValue.push(1);

    //----コンボボックスのサイズ設定----//
    // 種別コンボボックス
    document.getElementById("tblKindHead").style.width = g_KindComboBoxWidth;
    document.getElementById("tblKindHead").style.top   = g_KindComboBoxTop;
    document.getElementById("tblKindHead").style.left  = g_KindComboBoxLeft;
    document.getElementById("divKindHead").style.width = g_KindComboBoxWidth-8;
    document.getElementById("imgKindPull").style.top   = g_KindComboBoxTop + 3;
    document.getElementById("imgKindPull").style.left  = g_KindComboBoxLeft + g_KindComboBoxWidth - 38;
    // ステータスコンボボックス
    document.getElementById("tblStatusHead").style.width = g_StatusComboBoxWidth;
    document.getElementById("tblStatusHead").style.top   = g_StatusComboBoxTop;
    document.getElementById("tblStatusHead").style.left  = g_StatusComboBoxLeft;
    document.getElementById("divStatusHead").style.width = g_StatusComboBoxWidth-8;
    document.getElementById("imgStatusPull").style.top   = g_StatusComboBoxTop + 3;
    document.getElementById("imgStatusPull").style.left  = g_StatusComboBoxLeft + g_StatusComboBoxWidth - 38;

    //----コンボボックス作成----//
    var strHTML = "";
    // 種別コンボボックス
    strHTML = "<TABLE ID='tblKindComboBox' BORDER='0' CELLSPACING='0'>";
    for(i = 0; i < arrayKindValue.length; i++){
      strHTML += "<TR>";
      strHTML += "<TD ID='tdKindOption' ONMOUSEOVER='Fn_ComboBoxSet(this, 0);' ONMOUSEUP='Fn_Select(this," + i + ",0);' BORDER=0 CELLSPACING='0'>";
      strHTML += "<DIV ID='divKindOption' NOWRAP STYLE='OVERFLOW:hidden;'>" + arrayKindDisplay[i] + "</DIV>";
      strHTML += "</TD></TR>";
    }
    strHTML += "</TABLE>";
    // ステータスコンボボックス
    strHTML += "<TABLE ID='tblStatusComboBox' BORDER='0' CELLSPACING='0'>";
    for(i = 0; i < arrayStatusValue.length; i++){
      strHTML += "<TR>";
      strHTML += "<TD ID='tdStatusOption' ONMOUSEOVER='Fn_ComboBoxSet(this, 1);' ONMOUSEUP='Fn_Select(this," + i + ",1);' BORDER=0 CELLSPACING='0'>";
      strHTML += "<DIV ID='divStatusOption' NOWRAP STYLE='OVERFLOW:hidden;'>" + arrayStatusDisplay[i] + "</DIV>";
      strHTML += "</TD></TR>";
    }
    strHTML += "</TABLE>";
    parent.document.getElementById("divComboBox").innerHTML = strHTML;

    //---- クッキーの値取得 ----//
    // 種別コンボボックス
    myCookie = "Event_Kind=";
    myValue = null;
    myStr = document.cookie + ";" ;
    myOfst = myStr.indexOf(myCookie);
    if (myOfst != -1){
      myStart = myOfst + myCookie.length;
      myEnd   = myStr.indexOf(";" , myStart);
      Index = unescape(myStr.substring(myStart,myEnd));
      document.getElementById("divKindHead").innerText = parent.divKindOption[Index].innerText;
      parent.g_intKindFilter = arrayKindValue[Index];
      g_KindComboIndex = Index;
    // クッキーに値がない場合


    }else{
      document.cookie = "Event_Kind = 0;0";
      document.getElementById("divKindHead").innerText = parent.divKindOption[0].innerText;
      g_KindComboIndex = 0;
    }
    // ステータスコンボボックス
    myCookie = "Event_Status=";
    myValue = null;
    myStr = document.cookie + ";" ;
    myOfst = myStr.indexOf(myCookie);
    if (myOfst != -1){
      myStart = myOfst + myCookie.length;
      myEnd   = myStr.indexOf(";" , myStart);
      Index = unescape(myStr.substring(myStart,myEnd));
      document.getElementById("divStatusHead").innerText = parent.divStatusOption[Index].innerText;
      parent.g_intStatusFilter = arrayStatusValue[Index];
      g_StatusComboIndex = Index;
    // クッキーに値がない場合

    }else{
      document.cookie = "Event_Status = 0;0";
      document.getElementById("divStatusHead").innerText = parent.divStatusOption[0].innerText;
      g_StatusComboIndex = 0;
    }


  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_GetPrevPage
//
// １．機能
//     ・前ページの情報を取得する

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_GetPrevPage(){
  try{
    parent.g_intCurrentPage -= 1;

    // イベント情報取得

    Public_GetEvent();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_GetNextPage
//
// １．機能
//     ・次ページの情報を取得する

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_GetNextPage(){
  try{
    // 表示しているページが最終ページなら取得をしない


    if(parent.g_intCurrentPage >= parent.g_intMaxPage){
      return;
    }

    parent.g_intCurrentPage += 1;

    // イベント情報取得

    Public_GetEvent();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_GetEvent
//
// １．機能
//     ・イベント情報を取得する

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_GetEvent(){
  try{
    // 選択状態の行を非選択状態に戻す

    if(g_SelectedObj){
      g_SelectedObj.bgColor = g_SelectedObjColor;
    }
    g_SelectedObj = "";
    g_SelectedObjColor = "";
    g_Index = -1;

    // イベント情報取得

    parent.Public_GetEvent();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_EndGetEvent
//
// １．機能
//     ・イベント情報を表示する
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_EndGetEvent(){
  try{
    // 0件の場合は"1/1"を表示
    if(!parent.g_intMaxPage){
      parent.g_intMaxPage     = 1;
      parent.g_intCurrentPage = 1;
    }
    // 指定ページがない(最終ページよりも大きいページを指定した)場合は最終ページを表示
    if(parent.g_intCurrentPage > parent.g_intMaxPage){
      parent.g_intCurrentPage = parent.g_intMaxPage;
    }

    // ページ数表示
    document.getElementById("divPage").innerText = parent.g_intCurrentPage + " / " + parent.g_intMaxPage;

    // 前ページボタン切替
    if(parent.g_intCurrentPage <= 1){
      document.getElementById("imgPrevPage").style.visibility = "hidden";
    }else{
      document.getElementById("imgPrevPage").style.visibility = "visible";
    }

    // 次ページボタン切替
    if(parent.g_intCurrentPage >= parent.g_intMaxPage){
      document.getElementById("imgNextPage").style.visibility = "hidden";
    }else{
      document.getElementById("imgNextPage").style.visibility = "visible";
    }
    Fn_DrawTable();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_DrawTable
//
// １．機能
//     ・テーブルにイベント情報表示
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_DrawTable(){
  try{
    //---- イベント情報リストに取得情報書き込み ----//
    for(i=0;i<parent.g_intResultRowCount;i++){
      // 未確認の情報は赤字にする
      switch(parseInt(parent.g_strErrStatus[i])){
        case 0:
          divErrStatusTxt[i].style.color   = g_ListColor_Unconfirm;
          divErrLevelTxt[i].style.color    = g_ListColor_Unconfirm;
          divErrCodeTxt[i].style.color     = g_ListColor_Unconfirm;
          divIncDateTimeTxt[i].style.color = g_ListColor_Unconfirm;
          divErrKindTxt[i].style.color     = g_ListColor_Unconfirm;
          divErrInfoTxt[i].style.color     = g_ListColor_Unconfirm;
          break;
        default:
          divErrStatusTxt[i].style.color   = g_ListColor_Confirm;
          divErrLevelTxt[i].style.color    = g_ListColor_Confirm;
          divErrCodeTxt[i].style.color     = g_ListColor_Confirm;
          divIncDateTimeTxt[i].style.color = g_ListColor_Confirm;
          divErrKindTxt[i].style.color     = g_ListColor_Confirm;
          divErrInfoTxt[i].style.color     = g_ListColor_Confirm;
          break;
      }

      // 未確認の情報はステータスの列に"*"を表示する
      switch(parseInt(parent.g_strErrStatus[i])){
        case 0:
          divErrStatusTxt[i].innerText   = "*";
          break;
        case 1:
          divErrStatusTxt[i].innerText   = "";
          break;
      }
      divErrLevelTxt[i].innerText    = parent.g_strErrLevel[i];
      divErrCodeTxt[i].innerText     = parent.g_strErrCode[i];
      divIncDateTimeTxt[i].innerHTML = parent.g_strIncDateTime[i].replace(" ","<BR>");
      divErrKindTxt[i].innerText     = parent.g_strErrKind[i];
      divErrInfoTxt[i].innerHTML     = parent.g_strErrInfo[i];
    }

    // 取得件数が最大表示件数より少ない場合

    for(i = parent.g_intResultRowCount; i < top.FUNCTION_FRAME.EvtListMax; i++){
      divErrLevelTxt[i].innerText    = "";
      divErrCodeTxt[i].innerText     = "";
      divIncDateTimeTxt[i].innerHTML = "";
      divErrKindTxt[i].innerText     = "";
      divErrStatusTxt[i].innerText   = "";
      divErrInfoTxt[i].innerHTML     = "";
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
// Fn_SelectLine
//
// １．機能
//     ・行を選択する

//
// ２．戻り値
//      なし

//
// ３．備考

//    引数    obj    選択された行のオブジェクト

//            i      選択された行番号
//*****************************************************************************
function Fn_SelectLine(obj,i){
  try{
    // 情報が表示されていない行が選択されても何もしない


    if(i < parent.g_intResultRowCount){
      // 既に選択されている行があれば、非選択状態に戻す


      if(g_SelectedObj){
        g_SelectedObj.bgColor = g_SelectedObjColor;
      }

      // 行を選択状態にする
      g_SelectedObj = obj;
      g_SelectedObjColor = obj.bgColor;
      obj.bgColor = "8FFFBD";
      g_Index = i;
    }

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_OpenDialog
//
// １．機能
//     ・エラー詳細ダイアログを表示する
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_OpenDialog(){
  try{
    // 操作ログ書込み
    parent.Public_WriteLog("Detail");

    // 選択されている行がある場合


    if(g_Index != -1){
      // 詳細ダイアログを表示する
      parent.Public_OpenDialog(g_Index);

    // 選択されている行がない場合


    }else{
      // 行が選択されていないことを通知するダイアログを表示する
      strMessage = top.FUNCTION_FRAME.Public_GetString(parent.KeySelectEvent, parent.DefaultSelectEvent);
      strButton  = top.FUNCTION_FRAME.Public_GetString(parent.KeyOK, parent.DefaultOK);
      parent.Public_ShowWarningMessage(strMessage, strButton, 0);
    }

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_ShowDeleteConfirm
//
// １．機能
//     ・削除確認ダイアログを表示する
//
// ２．戻り値
//      なし

//
// ３．備考

//     引数    
//*****************************************************************************
function Fn_ShowDeleteConfirm(){
  try{
    // 操作ログ書込み
    parent.Public_WriteLog("Delete");

    // 選択されている行がある場合


    if(g_Index != -1){
      strMessage = top.FUNCTION_FRAME.Public_GetString(parent.KeyEventDelMsg, parent.DefaultEventDelMsg);
      strButton1 = top.FUNCTION_FRAME.Public_GetString(parent.KeyOKButton, parent.DefaultOKButton);
      strButton2 = top.FUNCTION_FRAME.Public_GetString(parent.KeyCancelButton, parent.DefaultCancelButton);
      parent.Public_ShowDeleteConfirm(strMessage, strButton1, strButton2);

    // 選択されている行がない場合


    }else{
      strMessage = top.FUNCTION_FRAME.Public_GetString(parent.KeySelectEvent, parent.DefaultSelectEvent);
      strButton  = top.FUNCTION_FRAME.Public_GetString(parent.KeyOK, parent.DefaultOK);
      parent.Public_ShowWarningMessage(strMessage, strButton, 0);
    }

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//2010.04.05 FF 星野 インジケーター全削除対応 ADD-START
//*****************************************************************************
// Fn_ShowAllDeleteConfirm
//
// １．機能
//     ・削除確認ダイアログを表示する
//
// ２．戻り値
//      なし

//
// ３．備考

//     引数    
//*****************************************************************************
function Fn_ShowAllDeleteConfirm(){
  try{
    // 操作ログ書込み
    parent.Public_WriteLog("AllDelete");

    strMessage = top.FUNCTION_FRAME.Public_GetString(parent.KeyEventDelMsg, parent.DefaultEventDelMsg);
    strButton1 = top.FUNCTION_FRAME.Public_GetString(parent.KeyOKButton, parent.DefaultOKButton);
    strButton2 = top.FUNCTION_FRAME.Public_GetString(parent.KeyCancelButton, parent.DefaultCancelButton);
    parent.Public_ShowAllDeleteConfirm(strMessage, strButton1, strButton2);

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}
//2010.04.05 FF 星野 インジケーター全削除対応 ADD-END

//*****************************************************************************
// Public_ControlEvent
//
// １．機能
//     ・イベント情報操作(削除、確認、全確認)を行う
//
// ２．戻り値
//      なし

//
// ３．備考

//     引数    intCommand    :操作種別(0:全確認, 1:確認 ,2:削除,3:全頁確認,4:全削除)
//*****************************************************************************
function Public_ControlEvent(intCommand){
  try{
    var EventSeq = new Array();

    // 全確認

    switch(intCommand){
    case 0:
      // 操作ログ書込み
      parent.Public_WriteLog("ConfirmAll");

      // リストに情報が表示されている場合のみ処理を行う
      if(parent.g_intResultRowCount > 0){
        // シーケンス番号の配列作成
        for(i = 0; i < parent.g_intResultRowCount; i++){
          EventSeq[i] = parent.g_strEventSeq[i];
        }
        parent.Public_ControlEvent(EventSeq, 1);
      }
      break;

    // 確認

    case 1:
      // 操作ログ書込み
      parent.Public_WriteLog("Confirm");

      // 選択チェック
      if(g_Index != -1){
        EventSeq[0] = parent.g_strEventSeq[g_Index];
        parent.Public_ControlEvent(EventSeq, 1);
      }else{
        strMessage = top.FUNCTION_FRAME.Public_GetString(parent.KeySelectEvent, parent.DefaultSelectEvent);
        strButton  = top.FUNCTION_FRAME.Public_GetString(parent.KeyOK, parent.DefaultOK);
        parent.Public_ShowWarningMessage(strMessage, strButton, 0);
      }
      break;

    // 削除
    case 2:
      EventSeq[0] = parent.g_strEventSeq[g_Index];
      parent.Public_ControlEvent(EventSeq, 2);
      break;
    //2009.07.27 FF 星野 インジケーター切り離し対応 ADD-START
    //全頁確認
    case 3:
      // 操作ログ書込み
      parent.Public_WriteLog("All");

      // リストに情報が表示されている場合のみ処理を行う
      if(parent.g_intResultRowCount > 0){
        parent.Public_ControlEvent(EventSeq, 3);
      }
      break;      
    //2010.04.05 FF 星野 インジケーター全削除対応 ADD-START
    //全削除
    case 4:
      // 操作ログ書込み
      parent.Public_WriteLog("AllDelete");

      // リストに情報が表示されている場合のみ処理を行う
      if(parent.g_intResultRowCount > 0){
        parent.Public_ControlEvent(EventSeq, 4);
      }
      break;      
    //2010.04.05 FF 星野 インジケーター全削除対応 ADD-END
    }
    //2009.07.27 FF 星野 インジケーター切り離し対応 ADD-END


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

//       引数    ComboNo    表示するコンボボックス
//                          0 : 種別
//                          1 : ステータス
//*****************************************************************************
function Fn_ShowDrop(ComboNo) {
  try{
    // 右クリックの場合はコンボボックスを表示しない


    if (event.button == 2){
      return;
    }

    parent.document.getElementById("ComboBoxFrame").style.visibility = "visible";

    switch(ComboNo){
    // 種別コンボボックス
      case 0:
        parent.document.getElementById("tblKindComboBox").style.visibility = "visible";
        for(i=0; i<arrayKindDisplay.length; i++){
          parent.tdKindOption[i].bgColor = "";
        }
        if(g_KindComboIndex >= 0){
          parent.tdKindOption[g_KindComboIndex].bgColor=g_Color;
        }
        break;

    // ステータスコンボボックス
      case 1:
        parent.document.getElementById("tblStatusComboBox").style.visibility = "visible";
        for(i=0; i<arrayStatusDisplay.length; i++){
          parent.tdStatusOption[i].bgColor = "";
        }
        if(g_StatusComboIndex >= 0){
          parent.tdStatusOption[g_StatusComboIndex].bgColor=g_Color;
        }
        break;
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
//     ・コンボボックスからメニューを選択する

//
// ２．戻り値
//      なし

//
// ３．備考

//     引数    obj        選択された行

//             index      選択された行番号
//             ComboNo    コンボボックス番号
//*****************************************************************************
function Public_Select(obj,index,ComboNo){
  try{
    // 右クリックの場合は操作を無効にする
    if (parent.event){
      if(parent.event.type == "mouseup" && parent.event.button == 2){
        return;
      }
    }

    switch(ComboNo){
      // 種別コンボボックス
      case 0:
        // クッキーに選択された項目を保存する


        document.cookie = "Event_Kind = " + index + ";0";
        // 選択された項目を表示する
        document.getElementById("divKindHead").innerText = obj.innerText;
        // 選択された項目を取得する


        g_KindComboIndex = index;
        parent.g_intKindFilter = arrayKindValue[index];
        break;

      // ステータスコンボボックス
      case 1:
        // クッキーに選択された項目を保存する


        document.cookie = "Event_Status = " + index + ";0";
        // 選択された項目を表示する
        document.getElementById("divStatusHead").innerText = obj.innerText;
        // 選択された項目を取得する


        g_StatusComboIndex = index;
        parent.g_intStatusFilter = arrayStatusValue[index];
        break;
    }

    // 1ページ目を表示する
    parent.g_intCurrentPage = 1;

    // イベント情報取得

    Public_GetEvent();

  }catch(ex){
    // 例外発生時の処理


    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}
