/////  ChangeDateFormatDef.js   ////////////////////////////
/****************************************************************************

  @file ChangeDateFormatDef.js

  @brief ChangeDateFormat クラスの定数、変数に関する定義

  @author YSK

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04//  YSK     V1.0       新規作成

/****************************************************************************/

//. 各時代の開始年月日と終了年月日 
var MEIJI_START_YEAR			= parseInt(1868, 10);		//. 明治の開始年
var MEIJI_START_MONTH			= parseInt(9, 10); 			//. 明治の開始月
//>#define MEIJI_START_DAY				( 4 )				//. 明治の開始日	//< A00 2000.02.02 FFS H.Nozaki
var MEIJI_START_DAY				= parseInt(8, 10); 			//. 明治の開始日		//< A00 2000.02.02 FFS H.Nozaki
var MEIJI_END_YEAR				= parseInt(1912, 10);		//. 明治の終了年
var MEIJI_END_MONTH				= parseInt(7, 10); 			//. 明治の終了月
var MEIJI_END_DAY				= parseInt(29, 10); 		//. 明治の終了日

var TAISHO_START_YEAR			= MEIJI_END_YEAR; 			//. 大正の開始年
var TAISHO_START_MONTH			= MEIJI_END_MONTH; 			//. 大正の開始月
var TAISHO_START_DAY			= MEIJI_END_DAY + 1; 		//. 大正の開始日
var TAISHO_END_YEAR				= parseInt(1926, 10); 		//. 大正の終了年
var TAISHO_END_MONTH			= parseInt(12, 10); 		//. 大正の終了月
var TAISHO_END_DAY				= parseInt(24, 10); 		//. 大正の終了日

var SHOWA_START_YEAR			= TAISHO_END_YEAR; 			//. 昭和の開始年
var SHOWA_START_MONTH			= TAISHO_END_MONTH; 		//. 昭和の開始月
var SHOWA_START_DAY				= TAISHO_END_DAY + 1; 		//. 昭和の開始日
var SHOWA_END_YEAR				= parseInt(1989, 10); 		//. 昭和の終了年
var SHOWA_END_MONTH				= parseInt(1, 10); 			//. 昭和の終了月
var SHOWA_END_DAY				= parseInt(7, 10);			//. 昭和の終了日

var HEISEI_START_YEAR			= SHOWA_END_YEAR; 			//. 平成の開始年
var HEISEI_START_MONTH			= SHOWA_END_MONTH; 			//. 平成の開始月
var HEISEI_START_DAY			= SHOWA_END_DAY + 1; 		//. 平成の開始日


//. 西暦年に換算するためのオフセット 
var MEIJI_YEAR_OFFSET			= MEIJI_START_YEAR - 1; 	//. 明治
var TAISHO_YEAR_OFFSET			= TAISHO_START_YEAR - 1; 	//. 大正
var SHOWA_YEAR_OFFSET			= SHOWA_START_YEAR - 1; 	//. 昭和
var HEISEI_YEAR_OFFSET			= HEISEI_START_YEAR - 1; 	//. 平成


//. 元号のイニシャル 
var MEIJI_INITIAL_LARGE			= "M";
var TAISHO_INITIAL_LARGE		= "T";
var SHOWA_INITIAL_LARGE			= "S";
var HEISEI_INITIAL_LARGE		= "H";

//. 月の文字列
var STRING_MONTH_JAN			= "JAN";
var STRING_MONTH_FEB			= "FEB";
var STRING_MONTH_MAR			= "MAR";
var STRING_MONTH_APR			= "APR";
var STRING_MONTH_MAY			= "MAY";
var STRING_MONTH_JUN			= "JUN";
var STRING_MONTH_JUL			= "JUL";
var STRING_MONTH_AUG			= "AUG";
var STRING_MONTH_SEP			= "SEP";
var STRING_MONTH_OCT			= "OCT";
var STRING_MONTH_NOV			= "NOV";
var STRING_MONTH_DEC			= "DEC";

//. 1ヶ月の日数
var DAYS_OF_JAN					= parseInt(31, 10);
var DAYS_OF_FEB 				= parseInt(29, 10);
var DAYS_OF_MAR					= parseInt(31, 10);
var DAYS_OF_APR					= parseInt(30, 10);
var DAYS_OF_MAY					= parseInt(31, 10);
var DAYS_OF_JUN					= parseInt(30, 10);
var DAYS_OF_JUL					= parseInt(31, 10);
var DAYS_OF_AUG					= parseInt(31, 10);
var DAYS_OF_SEP					= parseInt(30, 10);
var DAYS_OF_OCT					= parseInt(31, 10);
var DAYS_OF_NOV					= parseInt(30, 10);
var DAYS_OF_DEC					= parseInt(31, 10);

//. エラーコード
var RETURN_OK						= "0";
var ERROR_NOT_LEAP_YEAR				= "10010";			//. 閏年ではありません
var ERROR_CANNNOT_DISTINGUISHED		= "10020";			//. 年・月・日の区別がつきません
var ERROR_MISSED_YEAR				= "10030";			//. 年が間違っています
var ERROR_MISSED_MONTH				= "10040";			//. 月が間違っています
var ERROR_MISSED_DAY				= "10050";			//. 日が間違っています
var ERROR_BEFORE_ERA_START			= "10060";			//. 元号開始日以前の月日になっています
var ERROR_AFTER_ERA_END				= "10070";			//. 元号終了日以降の月日になっています
var ERROR_CANNOT_MEMORY_ALLOCATED	= "10080";			//. メモリー領域を割り当てることができませんでした
var ERROR_MISSED_FORMAT				= "10090";			//. 引数の書式が間違っています

