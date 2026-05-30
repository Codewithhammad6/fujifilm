/*****************************************************************************

  @file StudyListCommon.js

  @brief 検査リスト用共通

  @author YSK森山

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/24  YSK森山     V1.0       新規作成

*****************************************************************************/

var FATAL_ERROR		= "FATAL_ERROR";	// 致命的エラー
var RETRY_ERROR		= "RETRY_ERROR";	// 再試行可能エラー

//****************************************************************************
//  ErrorHandler()
//  機  能 : エラー処理
//  戻り値 : なし
//  備  考 :
//****************************************************************************
function ErrorHandler( errorKind, messageString )
{
	try
	{
		switch( errorKind )
		{
			case FATAL_ERROR:	// 致命的エラー
				alert("FATAL_ERROR");
				
				// ここに処理
				
				break;
			case RETRY_ERROR:	// 再試行可能エラー
				
				// ここに処理
				
				break;
			default:
				break;
		}
	}
	catch(e)
	{
		// 何もしない
	}
}






