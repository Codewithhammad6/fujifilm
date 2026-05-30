/*****************************************************************************

  @file ImportImageCommon.js

  @brief 各種医用画像取込用共通
  @author HSK朴
  
  @requires なし

  Copyright(C) 2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  07/02/09  HSK朴     　V1.0       新規作成

*****************************************************************************/

/**
 * @private
 * プライベート変数
 **/
 
var FATAL_ERROR		= "FATAL_ERROR";	// 致命的エラー
var RETRY_ERROR		= "RETRY_ERROR";	// 再試行可能エラー

/**
 * @param {string}errorKind エラー種別
 * @param {string}messageString エラーメッセージ
 * エラー処理
 **/
function ErrorHandler( errorKind, messageString )
{
	
	// エラーメッセージ表示
	alert(errorKind + ' ' + messageString)
}






