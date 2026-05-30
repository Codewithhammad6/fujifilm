/****************************************************************************

  @file ChangeDBDateFormat.js

  @brief 表示書式に変換

  @author YSK

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04//  YSK     V1.0       新規作成

/****************************************************************************/
/*//////////////////////////////////////////////////////////////////////////////////////

	[関数名]				ChangeDateToScreenFormat

	[in]					strDate		DBやDICOMから取得した生年月日文字列
							nFormat		システムDBから取得したDate Format

	[ret]					strRetDate	フォーマットを変換した生年月日文字列
									    変換失敗時はエラーコード( < 0)

	[内容]					DBもしくはDICOMから取得した文字列を
							フォーマット書式に変換、戻り値として返す.
							変換に失敗した場合はエラーコード( < 0 )を返す

							0. Japanese Date			S62.10.07		Yyy.mm.dd
							1. Ansi Long Date			1987.OCT.07		yyyy.MON.dd
							2. Ansi Short Date			1987.10.07		yyyy.mm.dd
							3. American Long Date		OCT.07.1987		MON.dd.yyyy
							4. American Short Date		10.07.1987		mm.dd.yyyy
							5. Europian Long Date		07.OCT.1987		dd.MON.yyyy
							6. Europian Short Date		07.10.1987		dd.mm.yyyy

///////////////////////////////////////////////////////////////////////////////////////////////*/
function ChangeDateToScreenFormat(strDate, nFormat)
{


	var m_nErrorCode = 0;										//. 初期化
	var nRetCode;
	var strRetDate = "";

	if( "" == strDate )											//. アドレスがない場合
	{
		return strDate;
	}
	
	// 文字列数チェック
	if(strDate.length != 8){
		return strDate;
	}
	// 数値チェック
	if(isNaN(strDate)){
		return strDate;
	}

//. 書式の表示にあわせる*******************************************************

	var nYear;													//. 西暦に変換した年
	var nMonth;													//. 数字に変換した月	var nDay;													//. 日

	nYear  = strDate.substring( 0 , 4 );
	nMonth = strDate.substring( 4 , 6 );
	nDay   = strDate.substring( 6 , 8 );
	switch (parseInt(nFormat, 10))
	{
	case 0:					//. 0. Japanese Date			S62.10.07		Yyy.mm.dd
		//. 元号を西暦に変換
		nYear = TranslateToJapaneseStyle( strDate, nYear );
		if( -1 == nYear )
		{
			return strDate;	//-2;
		}

		strRetDate = nYear + "." + nMonth + "." + nDay;
				
		break;

	case 1:					//.  1. Ansi Long Date			1987.OCT.07		yyyy.MON.dd

		//. 月の英字文字列を数字に変換
		nMonth = TranslateToLongStyle( nMonth );
		if( -1 == nMonth )
		{
			return strDate;	//-3;
		}

		strRetDate = nYear + "." + nMonth + "." + nDay;

		break;

	case 2:					//.  2. Ansi Short Date			1987.10.07		yyyy.mm.dd

		strRetDate = nYear + "." + nMonth + "." + nDay;

		break;

	case 3:					//.  3. American Long Date		OCT.07.1987		MON.dd.yyyy

		//. 月の英字文字列を数字に変換
		nMonth = TranslateToLongStyle( nMonth );
		if( -1 == nMonth )
		{
			return strDate	//-4;
		}

		strRetDate = nMonth + "." + nDay + "."  +nYear ;

		break;

	case 4:					//.  4. American Short Date		10.07.1987		mm.dd.yyyy

		strRetDate = nMonth + "." + nDay + "."  +nYear ;

		break;

	case 5:					//.  5. Europian Long Date		07.OCT.1987		dd.MON.yyyy

		//. 月の英字文字列を数字に変換
		nMonth = TranslateToLongStyle( nMonth );
		if( -1 == nMonth )
		{
			return strDate	//-5;
		}

		strRetDate = nDay + "." + nMonth + "."  +nYear ;

		break;

	case 6:					//.  6. Europian Short Date		07.10.1987		dd.mm.yyyy

		strRetDate = nDay + "." + nMonth + "."  +nYear ;

		break;

	default:
		return strDate	//-6;
		break;

	}

	// 本日の日付と比較	if(parseInt(GetToday(), 10) < parseInt(strRetDate, 10))
	{
		strRetDate = -1;
	}
	return strRetDate;

}


/*//////////////////////////////////////////////////////////////////////////////////////

	[関数名]				TranslateToJapaneseStyle

	[引数]					strDate : DB登録の生年月日（例;19870803)
							sYear 	: 年（生年月日）

	[戻り値]				nYear :元号に変換した年


	[内容]					西暦をJapaneseStyle の生年月日の元号に変換
							元号の開始日以降か、もしくは、終了日以前かを判定
							変換失敗、もしくはエラーの場合は -1 を返す

///////////////////////////////////////////////////////////////////////////////////////////////*/
function TranslateToJapaneseStyle( strDate, sYear )
{

	var nYear  = parseInt(-1, 10);						//. 西暦に直した年

	MEIJI_START  = MEIJI_START_YEAR + "0" + MEIJI_START_MONTH + "0" + MEIJI_START_DAY;
	TAISHO_START = TAISHO_START_YEAR + "0" + TAISHO_START_MONTH + "" + TAISHO_START_DAY;
	SHOWA_START  = SHOWA_START_YEAR + "" + SHOWA_START_MONTH + "" + SHOWA_START_DAY;
	HEISEI_START = HEISEI_START_YEAR + "0" + HEISEI_START_MONTH + "0" + HEISEI_START_DAY;
	
	if( parseInt(strDate, 10) < parseInt(MEIJI_START, 10))
	{
		nYear = -1;
	}
	else if( parseInt(strDate, 10) < parseInt(TAISHO_START, 10))
	{
		nYear = sYear - 1867;

		while(nYear.toString().length < 2)
		{
			nYear = "0" + nYear;
		}

		nYear = MEIJI_INITIAL_LARGE + "" + nYear;
		
	}
	else if( parseInt(strDate, 10) < parseInt(SHOWA_START, 10))
	{
		nYear = sYear - 1911;

		while(nYear.toString().length < 2)
		{
			nYear = "0" + nYear;
		}

		nYear = TAISHO_INITIAL_LARGE + "" + nYear;
	}
	else if( parseInt(strDate, 10) < parseInt(HEISEI_START, 10))
	{
		nYear = sYear - 1925;

		while(nYear.toString().length < 2)
		{
			nYear = "0" + nYear;
		}

		nYear = SHOWA_INITIAL_LARGE + "" + nYear;
	}
//CHANGE 2005/02/18============================
//	else if( parseInt(strDate, 10) <= parseInt(GetToday(), 10))
	else if( parseInt(strDate, 10) >= parseInt(HEISEI_START, 10))
	{
		nYear = sYear - 1988;
		while(nYear.toString().length < 2)
		{
			nYear = "0" + nYear;
		}

		nYear = HEISEI_INITIAL_LARGE + "" + nYear;
	}
	else{
	  return -1;
	}
//CHANGE EN====================================
	return nYear;
}


/*//////////////////////////////////////////////////////////////////////////////////////

	[関数名]				TranslateToLongStyle

	[引数]					lpszlongMonth	: 月（数字で取得）


	[戻り値]				nLongMonth			:アルファベットに変換した月


	[内容]					Ansi、American、EuropianのLong Styleのアルファベットで
							得られた月を数字に変換する
							変換に失敗、もしくはエラーの場合は -1 を返す

///////////////////////////////////////////////////////////////////////////////////////////////*/
function TranslateToLongStyle(sMonth)
{
	var nLongMonth = 0;
	sMonth = parseInt(sMonth, 10)
	//. 月を表す英字文字列
	var sMonthAlpha = new Array(STRING_MONTH_JAN, STRING_MONTH_FEB, STRING_MONTH_MAR, STRING_MONTH_APR,
								STRING_MONTH_MAY, STRING_MONTH_JUN, STRING_MONTH_JUL, STRING_MONTH_AUG,
								STRING_MONTH_SEP, STRING_MONTH_OCT, STRING_MONTH_NOV, STRING_MONTH_DEC);
	
	if ((sMonth > 0) && (sMonth < 13))
	{
		nLongMonth = sMonthAlpha[sMonth-1]
	}
	return nLongMonth;
}
/*//////////////////////////////////////////////////////////////////////////////////////

	[関数名]				GetToday

	[引数]					なし


	[戻り値]				strToday			:本日の日付


	[内容]					本日の日付を取得する。


///////////////////////////////////////////////////////////////////////////////////////////////*/
function GetToday(){
	var dDate, strToday,mm,dd
	dDate = new Date();

	mm = dDate.getMonth() + 1;
	dd = dDate.getDate();
	if (mm < 10) { mm = "0" + mm; }
	if (dd < 10) { dd = "0" + dd; }

	strToday = dDate.getFullYear().toString();
	strToday += mm.toString();
	strToday += dd.toString();

	return(strToday);
}
/*//////////////////////////////////////////////////////////////////////////////////////

	[関数名]				GetAge

	[引数]					birthDate : 生年月日

	[戻り値]				ageStr			: 現在の年齢

	[内容]					現在の年齢を取得する。

///////////////////////////////////////////////////////////////////////////////////////////////*/
function GetAge(birthDate){
  var ageStr = 0;

  var ageDate = parseInt(GetToday(), 10) - parseInt(birthDate, 10);

  // 生年月日が未来の場合
  if(ageDate < 0)
	{
    ageStr = 0;
  }
  
  else
  {
		ageDate = new String(ageDate)
    // 8桁表示とする
		if(ageDate.length < 8){
			count = 8-ageDate.length;
			for(i=0; i<count; i++){	
				ageDate = "0"+ ageDate;
			}
		}
		// 年数のみ取得
    ageStr = ageDate.slice(0,4);
    // 数値で返却する
		ageStr = parseInt(ageStr, 10)
  }
  return ageStr;
}
