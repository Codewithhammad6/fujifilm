/******************************************************************************
  
  @file KeyControlMainError.js

  @brief Main.aspxのエラー画面をキーボード操作を可能にする為のメソッド定義

  @author S1神立

  Copyright(c) 2006 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  06/10/31  S1神立      V1.4       新規作成
  @date  07/01/10  HSK古場     V1.4       メモリリーク対策
  @date  07/01/11  HSK古場     V1.4       メモリリーク対策時の修正ミスのFIX

******************************************************************************/

//******************************************************************************
//  InitMainErrKeyCtl(
//      mainErrFrameName,       // 対象のエラーフレーム文字列
//      SetFocusBackMethod,     // エラー画面Close時にフォーカスを戻すメソッド
//      bmpPath                 // bmpフォルダのパス
//  )
//
//  1．機能
//      Main.aspxのエラー画面をキー操作可能にする。
//
//  2．戻り値
//      なし
//
//  3．備考
//      Password入力画面で呼び出された時はFCRWeb/Main.aspx,MainCE.aspx,
//      患者ID・患者情報入力画面で呼び出された時はFCRWeb/CRExam/Main.aspx,MainCE.aspx,
//      をキー操作可能にする。
//
//      エラーフレームが別ページ上に存在するので、本関数を呼び出すページ上の
//      onunloadイベントハンドラでdetachEventEvent()を実施しても、メモリリー
//      クは解消されない。本関数は、DOM 要素を JScript変数として何一つ持たな
//      い形で実装する必要がある。
//
//      [事前条件]
//      KeyControl.jsのメソッドを使うので、KeyControl.jsも読み込まれていること。
//
//       更新履歴    担当        Ver.       内容
//      --------  ----------  --------   -------------------------------
//      06/10/26  S1神立      V1.4       新規作成
//      07/01/10  HSK古場     V1.4       メモリリーク対策
//      07/01/11  HSK古場     V1.4       メモリリーク対策時の修正ミスのFIX
//
//******************************************************************************
var KEYCONTROLMAINERROR_JS = "KeyControlMainError.js";
var FILE_ERROR_OK_IMG_F = "cmOvalAGreenLBtnF.gif";
var FILE_ERROR_OK_IMG_U = "cmOvalAGreenLBtnU.gif";

function InitMainErrKeyCtl(mainErrFrameName, SetFocusBackMethod){
    // ボタンイメージのパス
    var bmpPath = "http://" + window.location.hostname + "/FCRWeb/bmp/";
    var pathOkImgF = bmpPath + FILE_ERROR_OK_IMG_F ;
    var pathOkImgU = bmpPath + FILE_ERROR_OK_IMG_U ;

    try{
        // イベントハンドラを追加する -----------------------------------
        top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").attachEvent("onfocus"    , FocusOkBtn);
        top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").attachEvent("onblur"     , BlurOkBtn);
        top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").attachEvent("onmouseout" , MouseoutokBtn);
        top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").attachEvent("onmousedown", function(){top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").pressed = true});
        top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").attachEvent("onmouseup"  , function(){top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").pressed = false});
        top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").attachEvent("onmouseout" , function(){top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").pressed = false});
        top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").attachEvent("onclick"    , SetFocusBackMethod);
        top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").attachEvent("onkeydown"  , KeydownErrorOk);

        // プロパティを持たせる -----------------------------------------
        top.document.getElementById(mainErrFrameName).keyControlable = true ;  // キー操作可能かどうか
        top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").focused               = false;  // フォーカスされているかどうか
        top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").pressed               = false;  // 押されているかどうか
        top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").display               = top.document.getElementById(mainErrFrameName).document.getElementById("IMG_MainErrorButton");   // ボタンの表示部分

        // ボタンの中（文字、イメージ）をクリックしたときにも ----------
        // フォーカスが外れないようにする。
        EnableKeepFocus(top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton"));
    }catch(exception){
        WriteIISLog(KEYCONTROLMAINERROR_JS, 10);
    }
    
    // イベントハンドラ定義 -----------------------------------
    // フォーカス時の処理プロパティとイメージを変更する
    function FocusOkBtn(){
        try{
            top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").focused = true;
            if(top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").pressed != true){
                top.document.getElementById(mainErrFrameName).document.getElementById("IMG_MainErrorButton").src = pathOkImgF;
            }
        }catch(exception){
            WriteIISLog(KEYCONTROLMAINERROR_JS, 11);
        }
    }
    // フォーカスが離れたときの処理 プロパティとイメージを変更する
    function BlurOkBtn(){
        try{
            top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").focused = false;
            if(top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").pressed != true){
                top.document.getElementById(mainErrFrameName).document.getElementById("IMG_MainErrorButton").src = pathOkImgU;
            }
        }catch(exception){
            WriteIISLog(KEYCONTROLMAINERROR_JS, 12);
        }
    }
    // マウスポインタが離れた時の処理
    function MouseoutokBtn(){
        try{
            if(top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").focused == true){
                top.document.getElementById(mainErrFrameName).document.getElementById("IMG_MainErrorButton").src = pathOkImgF;
            }else{
                top.document.getElementById(mainErrFrameName).document.getElementById("IMG_MainErrorButton").src = pathOkImgU;
            }
        }catch(exception){
            WriteIISLog(KEYCONTROLMAINERROR_JS, 13);
        }
    }
    // Space, Enter でClickイベントを起こす
    function KeydownErrorOk(){
        try{
            if(top.event.keyCode == VK_SPACE || top.event.keyCode == VK_ENTER ){
                top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").fireEvent("onclick");
                return false;
            }
        }catch(exception){
            WriteIISLog(KEYCONTROLMAINERROR_JS, 14);
        }
    }

}

//******************************************************************************
//  CleanupMainErrKeyCtl(
//      mainErrFrameName,       // 対象のエラーフレーム文字列
//  )
//
//  1．機能
//      InitMainErrKeyCtl()で登録されたイベントハンドラを解除する。
//
//  2．戻り値
//      なし
//
//  3．備考
//      本関数は、InitMainErrKeyCtl()のメモリリーク対策のためのものである。
//
//      [事前条件]
//      KeyControl.jsのメソッドを使うので、KeyControl.jsも読み込まれていること。
//
//      更新履歴  担当        Ver.       内容
//      --------  ----------  --------   -------------------------------
//      07/01/09  HSK古場     V1.4       新規作成
//
//******************************************************************************

function CleanupMainErrKeyCtl(mainErrFrameName){
    try{
        // プロパティの参照リンクを、念のため切る -----------------------
        top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton").display = null;

        // EnableKeepFocus()のメモリリーク対策 --------------------------
        DisableKeepFocus(top.document.getElementById(mainErrFrameName).document.getElementById("DIV_MainErrorButton"));

    }catch(exception){
        WriteIISLog(KEYCONTROLMAINERROR_JS, 15);
    }
}
