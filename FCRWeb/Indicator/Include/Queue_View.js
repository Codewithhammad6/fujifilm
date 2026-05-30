//*****************************************************************************
//  Queue_View.js 
//
//     Queue_Veiwのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2004/12/03  菅野      -----        新規作成
//     2006/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
//     2007/03/16  HSK平尾     V2.0       内視鏡画像取込対応/DICOM出力対応
//     2007/06/09  HSK由比     V2.0       PVCS#2313
//
//*****************************************************************************

  //---- 選択行 ----//
  var g_SelectedObj      = "";       // 選択された行のオブジェクト
  var g_SelectedObjColor = "";       // 選択された行の背景色
  var g_Index            = -1;       // 選択された行のインデックス

  //---- コンボボックス ----//
  var arrayDisplay    = new Array(); // コンボボックスのDisplay
  var arrayValue      = new Array(); // コンボボックスのValue
  var g_ComboBoxWidth = 448;         // コンボボックスの幅
  var g_ComboBoxTop   = 28;          // コンボボックスのTOP
  var g_ComboBoxLeft  = 208;         // コンボボックスのLEFT
//var g_Color         = "blue";      // 選択された項目の背景
  var g_Color         = "#8FFFBD";   // 2005/05/24
  var g_ComboIndex    = -1;          // コンボボックスの選択された行

  var TimerID         = "";       // タイマID

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
    document.body.style.fontFamily                        = top.FUNCTION_FRAME.FontFamily;

// 20070609 HSK由比 V2.0 PVCS#2313 A Start //
    // コントロールに対してフォントサイズを設定
    // フィルタ条件ラベル
    document.getElementById("divFilter").style.fontSize        = top.FUNCTION_FRAME.FontSizeS;
    // リストの患者IDヘッダ列
    document.getElementById("divPatientID").style.fontSize     = top.FUNCTION_FRAME.FontSizeS;
    // リストの患者名ヘッダ列
    document.getElementById("divPatientName").style.fontSize   = top.FUNCTION_FRAME.FontSizeS;
    // リストの検査日時ヘッダ列
    document.getElementById("divStudyDateTime").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
    // リストの出力先ヘッダ列
    document.getElementById("divAliasName").style.fontSize     = top.FUNCTION_FRAME.FontSizeS;
    // リストのモダリティヘッダ列
    document.getElementById("divModality").style.fontSize      = top.FUNCTION_FRAME.FontSizeS;
    // リストの発生元ヘッダ列
    document.getElementById("divKind").style.fontSize          = top.FUNCTION_FRAME.FontSizeS;
    // リストのステータスヘッダ列
    document.getElementById("divStatus").style.fontSize        = top.FUNCTION_FRAME.FontSizeS;
// 20070609 HSK由比 V2.0 PVCS#2313 A End //

    // 文字列設定
    document.getElementById("divFilter").innerText        = top.FUNCTION_FRAME.Public_GetString(parent.KeyFilter, parent.DefaultFilter);
    document.getElementById("divPatientID").innerText     = top.FUNCTION_FRAME.Public_GetString(parent.KeyPatientID, parent.DefaultPatientID);
    document.getElementById("divPatientName").innerText   = top.FUNCTION_FRAME.Public_GetString(parent.KeyPatientName, parent.DefaultPatientName);
    document.getElementById("divStudyDateTime").innerText = top.FUNCTION_FRAME.Public_GetString(parent.KeyStudyDateTime, parent.DefaultStudyDateTime);
    document.getElementById("divAliasName").innerText     = top.FUNCTION_FRAME.Public_GetString(parent.KeyTransmission, parent.DefaultTransmission);
    // 20070316 HSK平尾 V2.0 内視鏡対応 A Start
    document.getElementById("divModality").innerText      = top.FUNCTION_FRAME.Public_GetString(parent.KeyModality, parent.DefaultModality);
    // 20070316 HSK平尾 V2.0 内視鏡対応 A End
    document.getElementById("divKind").innerText          = top.FUNCTION_FRAME.Public_GetString(parent.KeyKind, parent.DefaultKind);
    document.getElementById("divStatus").innerText        = top.FUNCTION_FRAME.Public_GetString(parent.KeyStatus, parent.DefaultStatus);
    document.getElementById("divDelete").innerText        = top.FUNCTION_FRAME.Public_GetString(parent.KeyDelete, parent.DefaultDelete);
    document.getElementById("divOutForce").innerText      = top.FUNCTION_FRAME.Public_GetString(parent.KeyForceOutput, parent.DefaultForceOutput);
    document.getElementById("divPage").innerText          = "1 / 1";

    // ページ遷移ボタン表示切替 
    document.getElementById("imgPrevPage").style.visibility = "hidden";
    document.getElementById("imgNextPage").style.visibility = "hidden";

    // コンボボックスの値設定
    arrayDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyAll, parent.DefaultAll));
    arrayDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyFilm, parent.DefaultFilm));
    arrayDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyDisk, parent.DefaultDisk));
    arrayDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyCaRna, parent.DefaultCaRna));
    arrayDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyGeneral, parent.DefaultGeneral));
    // 20070316 HSK平尾 V2.0 DICOM出力対応 A Start
    arrayDisplay.push(top.FUNCTION_FRAME.Public_GetString(parent.KeyDicom, parent.DefaultDicom));
    // 20070316 HSK平尾 V2.0 DICOM出力対応 A End
    arrayValue.push(0);
    arrayValue.push(3);
    arrayValue.push(6);
    arrayValue.push(8);
    arrayValue.push(7);
    // 20070316 HSK平尾 V2.0 DICOM出力対応 A Start
    arrayValue.push(4);
    // 20070316 HSK平尾 V2.0 DICOM出力対応 A End

    //----コンボボックス----//
    // コンボボックスのサイズ設定
    document.getElementById("tblHead").style.width   = g_ComboBoxWidth;
    document.getElementById("tblHead").style.top     = g_ComboBoxTop;
    document.getElementById("tblHead").style.left    = g_ComboBoxLeft;
    document.getElementById("divHeader").style.width = g_ComboBoxWidth-8;
    document.getElementById("imgPull").style.top     = g_ComboBoxTop + 3;
    document.getElementById("imgPull").style.left    = g_ComboBoxLeft + g_ComboBoxWidth - 38;
    // コンボボックス作成
    var strHTML = "";
    strHTML = "<TABLE ID='ComboBox' BORDER='0' CELLSPACING='0'>";
    for(i=0; i<arrayValue.length ; i++){
      strHTML += "<TR>";
      strHTML += "<TD ID='option1' ONMOUSEOVER='Fn_ComboBoxSet(this);' ONMOUSEUP='Fn_Select(this," + i + ");' BORDER=0 CELLSPACING='0'>";
      strHTML += "<DIV ID='divOption' NOWRAP STYLE='OVERFLOW:hidden;'>" + arrayDisplay[i] + "</DIV>";
      strHTML += "</TD></TR>";
    }
    strHTML += "</TABLE>";
    parent.document.getElementById("divComboBox").innerHTML = strHTML;

    // クッキーの値取得
    myCookie = "Queue_Filter=";
    myValue = null;
    myStr = document.cookie + ";" ;
    myOfst = myStr.indexOf(myCookie);
    if (myOfst != -1){
      myStart = myOfst + myCookie.length;
      myEnd   = myStr.indexOf(";" , myStart);
      Index = unescape(myStr.substring(myStart,myEnd));
      document.getElementById("divheader").innerText = parent.option1[Index].innerText;
      parent.g_intFilter = arrayValue[Index];
      g_ComboIndex = Index;
    // クッキーに値がない場合

    }else{
      document.cookie = "Queue_Filter = 0;0";
      document.getElementById("divheader").innerText = parent.option1[0].innerText;
      g_ComboIndex = 0;
    }

  }catch(ex){
    // 例外発生時の処理

    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_GetQueue
//
// １．機能
//     ・出力キュー情報を取得する
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Public_GetQueue(){
  try{
    // 選択状態の行を非選択状態に戻す
    if(g_SelectedObj){
      g_SelectedObj.bgColor = g_SelectedObjColor;
    }
    g_SelectedObj      = "";
    g_SelectedObjColor = "";
    g_Index            = -1;

    // 出力キュー情報取得
    parent.Public_GetQueue();

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
    // タイマ停止
    if(TimerID){
      clearTimeout(TimerID);
    }

    // 取得ページ設定

    parent.g_intCurrentPage -= 1;

    // 出力キュー情報取得
    Public_GetQueue();

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

     // タイマ停止
    if(TimerID){
      clearTimeout(TimerID);
    }

    // 取得ページ数設定

    parent.g_intCurrentPage += 1;

    // 出力キュー情報取得
    Public_GetQueue();

  }catch(ex){
    // 例外発生時の処理

    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_EndGetQueue
//
// １．機能
//     ・出力キュー情報を表示する
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Public_EndGetQueue(){
  try{
    // ページ数表示
    if(!parent.g_intMaxPage){
      parent.g_intCurrentPage = 1;
      parent.g_intMaxPage     = 1;
    }
// 2005/09/11 Kanno ADD ST PVCS#1431
    if(parent.g_intCurrentPage > parent.g_intMaxPage){
      // 表示ページが最大ページより大きい場合

      parent.g_intCurrentPage = parent.g_intMaxPage;
    }
// 2005/09/11 Kanno ADD ED PVCS#1431

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

    // 出力キューリスト更新タイマ起動
    if(top.FUNCTION_FRAME.QueRefreshInt){
      TimerID = setTimeout("Public_GetQueue();",top.FUNCTION_FRAME.QueRefreshInt);
    }

  }catch(ex){
    // 例外発生時の処理

    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_DrawTable
//
// １．機能
//     ・テーブルに出力キュー情報表示
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Fn_DrawTable(){
  try{
    // 出力キュー情報リストに取得情報書き込み
    for(i = 0; i < parent.g_intResultRowCount; i++){
      divPatientIDTxt[i].innerText     = parent.g_strPatientID[i];
      divPatientNameTxt[i].innerText   = parent.g_strPatientName[i];
      divStudyDateTimeTxt[i].innerHTML = parent.g_strStudyDateTime[i].replace(" ","<BR>");
      divAliasNameTxt[i].innerText     = parent.g_strAliasName[i];
      // 20070316 HSK平尾 V2.0 内視鏡対応 A Start
      divModalityTxt[i].innerText      = parent.g_strModality[i];
      // 20070316 HSK平尾 V2.0 内視鏡対応 A End
      divKindTxt[i].innerText          = parent.g_strKind[i];
      divStatusTxt[i].innerText        = parent.g_strStatus[i];
    }

    // 取得件数が最大表示件数より少ない場合
    for(i = parent.g_intResultRowCount; i < top.FUNCTION_FRAME.QueListMax; i++){
      divPatientIDTxt[i].innerText     = "";
      divPatientNameTxt[i].innerText   = "";
      divStudyDateTimeTxt[i].innerText = "";
      divAliasNameTxt[i].innerText     = "";
      // 20070316 HSK平尾 V2.0 内視鏡対応 A Start
      divModalityTxt[i].innerText      = "";
      // 20070316 HSK平尾 V2.0 内視鏡対応 A End
      divKindTxt[i].innerText          = "";
      divStatusTxt[i].innerText        = "";
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
    // 行を非選択状態にする
    if(i < parent.g_intResultRowCount){
      if(g_SelectedObj){
        g_SelectedObj.bgColor = g_SelectedObjColor;
      }
      
      // 選択された行の背景色を変え、選択状態にする
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
// Public_ControlQueue
//
// １．機能
//     ・出力キュー情報操作(削除、強制出力)を行う
//
// ２．戻り値
//      なし
//
// ３．備考
//     引数    intCommand    :操作種別(0:削除, 1:強制出力)
//*****************************************************************************
function Public_ControlQueue(intCommand){
  try{
    var intQueueSeq;      // シーケンス

    switch(intCommand){
    // 削除
    case 0:
      // 選択されている行のシーケンスを取得

      intQueueSeq = parent.g_strOutputID[g_Index];
      // 出力操作要求

      parent.Public_ControlQueue(intQueueSeq, 0);
      break;

    // 強制出力
    case 1:
      // 操作ログ登録
      parent.Public_WriteLog("FoeceOutput");

      // 情報が選択されている場合

      if(g_Index != -1){
        // 選択されている行のシーケンスを取得

        intQueueSeq = parent.g_strOutputID[g_Index];
        // 出力操作要求

        parent.Public_ControlQueue(intQueueSeq, 1);

      // 情報が選択されていない場合

      }else{
        // ダイアログで通知する
        strMessage = top.FUNCTION_FRAME.Public_GetString(parent.KeySelectOutput, parent.DefaultSelectOutput);
        strButton  = top.FUNCTION_FRAME.Public_GetString(parent.KeyOK, parent.DefaultOK);
        parent.Public_ShowWarningMessage(strMessage, strButton, 0);
      }
      break;
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
//*****************************************************************************
function Fn_ShowDeleteConfirm(){
  try{
    // 操作ログ登録
    parent.Public_WriteLog("Delete");

    // 情報が選択されている場合
    if(g_Index != -1){
      // タイマ停止
      if(TimerID){
        clearTimeout(TimerID);
      }
      
      // 削除確認ダイアログを表示する
      strMessage = top.FUNCTION_FRAME.Public_GetString(parent.KeyOutputDelMsg, parent.DefaultOutputDelMsg);
      strButton1 = top.FUNCTION_FRAME.Public_GetString(parent.KeyOKButton, parent.DefaultOKButton);
      strButton2 = top.FUNCTION_FRAME.Public_GetString(parent.KeyCancelButton, parent.DefaultCancelButton);
      parent.Public_ShowConfirmDialog(strMessage, strButton1, strButton2, 1);

    // 情報が選択されていない場合
    }else{
      // 選択されていないことを通知する
      strMessage = top.FUNCTION_FRAME.Public_GetString(parent.KeySelectOutput, parent.DefaultSelectOutput);
      strButton  = top.FUNCTION_FRAME.Public_GetString(parent.KeyOK, parent.DefaultOK);
      parent.Public_ShowWarningMessage(strMessage, strButton, 0);
    }

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

    // コンボボックスを表示する
    parent.document.getElementById("ComboBoxFrame").style.visibility = "visible";
    parent.document.getElementById("ComboBox").style.visibility      = "visible";

    // 選択行を設定する

    for(i=0; i<arrayDisplay.length; i++){
      parent.option1[i].bgColor = "";
    }
    if(g_ComboIndex >= 0){
      parent.option1[g_ComboIndex].bgColor=g_Color;
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
//     引数    obj     選択された行
//             index  選択された行番号
//*****************************************************************************
function Public_Select(obj,index){
  try{
    // 右クリックの場合は操作を無効にする
    if (parent.event){
      if(parent.event.type == "mouseup" && parent.event.button == 2){
        return;
      }
    }

    // タイマ停止
    if(TimerID){
      clearTimeout(TimerID);
    }

    // クッキーに保存する

    document.cookie = "Queue_Filter = " + index + ";0";
    // コンボボックスに選択された項目を表示する
    document.getElementById("divheader").innerText = obj.innerText;
    g_ComboIndex = index;
    parent.g_intFilter = arrayValue[index];

    // 出力キュー情報取得
    Public_GetQueue();

  }catch(ex){
    // 例外発生時の処理

    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_SetTimer
//
// １．機能
//     ・画面の自動更新を行う
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Public_SetTimer(){
  TimerID = setTimeout("Public_GetQueue();",top.FUNCTION_FRAME.QueRefreshInt);
}
