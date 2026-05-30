//*****************************************************************************
//  MediaList_View.js 
//
//     MediaList_Viewのクライアントスクリプト
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
  var g_ComboIndex    = -1;          // コンボボックスの選択された行

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
    document.body.style.fontFamily                    = top.FUNCTION_FRAME.FontFamily;

// 20070609 HSK由比 V2.0 PVCS#2313 A Start //
    // コントロールに対してフォントサイズを設定
    // リストのディスク名ヘッダ列
    document.getElementById("divMediaName").style.fontSize = top.FUNCTION_FRAME.FontSizeS;
    // リストの書込開始日ヘッダ列
    document.getElementById("divStart").style.fontSize     = top.FUNCTION_FRAME.FontSizeS;
    // リストの書込終了日ヘッダ列
    document.getElementById("divEnd").style.fontSize       = top.FUNCTION_FRAME.FontSizeS;
    // リストのステータスヘッダ列
    document.getElementById("divStatus").style.fontSize    = top.FUNCTION_FRAME.FontSizeS;
    // ページ表示 
    document.getElementById("divPage").style.fontSize      = top.FUNCTION_FRAME.FontSizeS;
// 20070609 HSK由比 V2.0 PVCS#2313 A End //

    // 文字列設定
    document.getElementById("divMediaName").innerText = top.FUNCTION_FRAME.Public_GetString(parent.KeyDiskName, parent.DefaultDiskName);
    document.getElementById("divStart").innerText     = top.FUNCTION_FRAME.Public_GetString(parent.KeyWriteStart, parent.DefaultWriteStart);
    document.getElementById("divEnd").innerText       = top.FUNCTION_FRAME.Public_GetString(parent.KeyWriteEnd, parent.DefaultWriteEnd);
    document.getElementById("divStatus").innerText    = top.FUNCTION_FRAME.Public_GetString(parent.KeyStatus, parent.DefaultStatus);
    document.getElementById("divPage").innerText      = "1 / 1";

    // ページ遷移ボタン表示切替 
    document.getElementById("imgPrevPage").style.visibility = "hidden";
    document.getElementById("imgNextPage").style.visibility = "hidden";

  }catch(ex){
    // 例外発生時の処理

    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_GetMediaList
//
// １．機能
//       保管用メディアリスト取得処理
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Public_GetMediaList(){
  try{
    // 取得ページ設定

    parent.g_intCurrentPage = 1;

    // 保管用メディアリスト取得

    parent.Public_GetMediaList();

  }catch(ex){
    // 例外発生時の処理

    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_GetPrevPage
//
// １．機能
//       前ページ遷移
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Public_GetPrevPage(){
  try{
    // 取得ページ設定

    parent.g_intCurrentPage -= 1;

    // 保管用メディアリスト取得

    parent.Public_GetMediaList();

  }catch(ex){
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_GetNextPage
//
// １．機能
//       次ページ遷移
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Public_GetNextPage(){
  try{
   // 表示しているページが最終ページなら取得をしない

    if(parent.g_intCurrentPage >= parent.g_intMaxPage){
      return;
    }

    // 取得ページを設定

    parent.g_intCurrentPage += 1;
    // 保管用メディアリスト取得

    parent.Public_GetMediaList();

  }catch(ex){
    // 例外発生時の処理

    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_EndGetMediaList
//
// １．機能
//       保管用メディアリスト取得後の処理
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Public_EndGetMediaList(){
  try{
    // ページ数表示
    if(!parent.g_intMaxPage){
      parent.g_intMaxPage     = 1;
      parent.g_intCurrentPage = 1;
    }
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

    // リスト作成
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
//     ・テーブルに出力キュー情報表示
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Fn_DrawTable(){
  try{
    // 保管用ディスク一覧に取得情報書き込み
    for(i = 0; i < parent.g_intResultRowCount; i++){
      // ディスク名
      divDiskNameTxt[i].innerText   = parent.g_strDiskName[i];
      // 書き込み開始日時
      divWriteStartTxt[i].innerHTML = parent.g_strOpenDateTime[i].replace(" ","<BR>");
      // 書き込み不可ディスクの場合
      if(parent.g_strMediaAttr[i] == "0"){
        // 書き込み終了日時
        divWriteEndTxt[i].innerHTML   = parent.g_strCloseDateTime[i].replace(" ","<BR>");
        // ステータス
        divStatusTxt[i].innerText     = top.FUNCTION_FRAME.Public_GetString(parent.KeyUnWritable, parent.DefaultUnWritable);
      // 書き込み可ディスクの場合
      }else{
        // 書き込み終了日時
        divWriteEndTxt[i].innerText   = "";
        // ステータス
        divStatusTxt[i].innerText     = top.FUNCTION_FRAME.Public_GetString(parent.KeyWritable, parent.DefaultWritable);
      }
    }

    // 取得件数が最大表示件数より少ない場合
    for(i = parent.g_intResultRowCount; i < top.FUNCTION_FRAME.MediaListMax; i++){
      divDiskNameTxt[i].innerText   = "";
      divWriteStartTxt[i].innerText = "";
      divWriteEndTxt[i].innerText   = "";
      divStatusTxt[i].innerText     = "";
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
