//*****************************************************************************
//  RUControl_View.js 
//
//     RUControl_Viewのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2004/12/03  菅野      -----        新規作成
//     2006/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
//
//*****************************************************************************

//*****************************************************************************
// Fn_InitPage
//
// １．機能
//     ・画面に表示する文字列の設定を行う
//
// ２．戻り値
//      なし//
// ３．備考//*****************************************************************************
function Fn_InitPage(){
  try{
    // BODYのフォントを指定    document.body.style.fontFamily = top.FUNCTION_FRAME.FontFamily;

    // 文字列設定    document.getElementById("divRUCleaning").innerText  = top.FUNCTION_FRAME.Public_GetString(parent.KeyScanerCleaning, parent.DefaultScanerCleaning);
    document.getElementById("divRUExecution").innerText = top.FUNCTION_FRAME.Public_GetString(parent.KeyExecute, parent.DefaultExecute);

  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_RUControl
//
// １．機能
//     RU操作//
// ２．戻り値
//      なし//
// ３．備考//      引数   Command  処理種別
//                     1 : スキャナクリーニング
//*****************************************************************************
function Fn_RUControl(Command){
  try{
    // RU使用可能状態の場合
    if(parent.RUControlFlag){
      // 操作ログ登録
      parent.Public_WriteLog("ScanerCleaning");

      // RU操作要求      parent.Public_RUControl(Command);

    // RU使用不可状態(RU未接続)の場合
    }else{
      // エラーダイアログを表示する
      strMessage = top.FUNCTION_FRAME.Public_GetString(parent.KeyRuConnectErr, parent.DefaultRuConnectErr);
      strButton  = top.FUNCTION_FRAME.Public_GetString(parent.KeyOK, parent.DefaultOK);
      parent.Public_ShowWarningMessage(strMessage, strButton, 0);
    }

  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}
