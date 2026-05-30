/****************************************************************************

  @file ChangeDateFormat.js

  @brief Dicom/DB書式に変換

  @author YSK

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04//  YSK     V1.0       新規作成
  @date  06/04/06  YSK齋藤     V1.1(HotFix)生年月日エラーチェック対応(PVCS#1730)
  @date  06/04/14  YSK齋藤     V1.1(HotFix)生年月日エラーチェック対応(PVCS#1730)

/****************************************************************************/
/*//////////////////////////////////////////////////////////////////////////////////////

	[関数名]				ChangeDateToDicomFormat

	[in]					strDate		画面から取得した生年月日文字列
							nFormat		システムDBから取得したDate Format

	[ret]					strRetDate	フォーマットを変換した生年月日文字列
									    変換失敗時はエラーコード( < 0)

	[内容]					患者情報コントロールが画面から取得した生年月日を

							DICOM書式に変換、戻り値として返す.
							変換に失敗した場合はエラーコード( < 0 )を返す

							0. Japanese Date			S62.10.07		Yyy.mm.dd
							1. Ansi Long Date			1987.OCT.07		yyyy.MON.dd
							2. Ansi Short Date			1987.10.07		yyyy.mm.dd
							3. American Long Date		OCT.07.1987		MON.dd.yyyy
							4. American Short Date		10.07.1987		mm.dd.yyyy
							5. Europian Long Date		07.OCT.1987		dd.MON.yyyy
							6. Europian Short Date		07.10.1987		dd.mm.yyyy

///////////////////////////////////////////////////////////////////////////////////////////////*/
function ChangeDateToDicomFormat(strDate, nFormat)
{

	var TOKEN_SEPARATOR = new Array(4);
	TOKEN_SEPARATOR[0] = " ";
	TOKEN_SEPARATOR[1] = ",";
	TOKEN_SEPARATOR[2] = ".";
	TOKEN_SEPARATOR[3] = "-";
	TOKEN_SEPARATOR[4] = "/";

	var m_nErrorCode = 0;										//. 初期化


	var nRetCode;
	var strRetDate = "";

	if( "" == strDate )											//. アドレスがない場合

	{
		return 1;
	}

//. A.まず初めに split を用いて生年月日文字列を3つ（年、月、日）に分ける************************************

	var strSeps;											//.トークンのセパレータ
	var strTokenData;										//.トークンで区切られた文字列配列
// 2006/04/06 PVCS#1730 -ST-
  var strTokenDataWork;							// 分割処理用ワーク
	var sepUseFlag;										// 区切り文字使用済みフラグ
	strTokenDataWork = "";
  sepUseFlag = 0;
// 2006/04/06 PVCS#1730 -ED-

	for(i = 0; i < TOKEN_SEPARATOR.length; i++)
	{
		strSeps = TOKEN_SEPARATOR[i];
		strTokenData = strDate.split(strSeps);					//.トークンで区切られた文字列を格納


// 2006/04/06 PVCS#1730 -ST-
//		if(strTokenData.length == 3)							//. ３つに分けることができたら終了

//		{
//			break;
//		}
		// 文字区切り後の要素数チェック
		switch(strTokenData.length){
			// 区切り文字該当しない

			case 1:
				break;
			// 区切り文字正常使用
			case 3:
				// 複数種類の区切り文字使用をチェック
				if(sepUseFlag == 1){
					return -1;
				}
				sepUseFlag = 1;
				strTokenDataWork = strTokenData;
				break;
			// 区切り文字不正使用(要素数が異常)
			default:
				return -1;
				break;
    		}
// 2006/04/06 PVCS#1730 -ED-
	}
// 2006/04/06 PVCS#1730 -ST-
	// 退避しておいたチェック後文字列を戻す

	strTokenData = strTokenDataWork;
// 2006/04/06 PVCS#1730 -ED-

	if(strTokenData.length != 3)
	{
		return -1;
	}
//. B. それぞれの書式の年月日を 統一する*******************************************************

	var nYear;													//. 西暦に変換した年
	var nMonth;													//. 数字に変換した月

	var sYear;													//. 年（西暦に変換した年）

	var sMonth;													//. 月（数字に変換した月）

	var sDay;													//. 日

	switch (parseInt(nFormat, 10))
	{
	case 0:					//. 0. Japanese Date			S62.10.07		Yyy.mm.dd
		//. 元号を西暦に変換
		nYear = TranslateFromJapaneseStyle( strTokenData[0], strTokenData[1], strTokenData[2] );
		if( -1 == nYear )
		{
			return -1;	//-2;
		}

		sYear  = nYear;
		sMonth = strTokenData[1];
		sDay   = strTokenData[2];
		
		break;

	case 1:					//.  1. Ansi Long Date			1987.OCT.07		yyyy.MON.dd
		//. 月の英字文字列を数字に変換
		nMonth = TranslateFromLongStyle( strTokenData[1] );
		if( -1 == nMonth )
		{
			return -1;	//-3;
		}

		sMonth = nMonth;
		sYear  = strTokenData[0];
		sDay   = strTokenData[2];

		break;

	case 2:					//.  2. Ansi Short Date			1987.10.07		yyyy.mm.dd
		sYear  = strTokenData[0];
		sMonth = strTokenData[1];
		sDay   = strTokenData[2];

		break;

	case 3:					//.  3. American Long Date		OCT.07.1987		MON.dd.yyyy

		//. 月の英字文字列を数字に変換
		nMonth = TranslateFromLongStyle( strTokenData[0] );
		if( -1 == nMonth )
		{
			return -1	//-4;
		}

		sMonth = nMonth;
		sYear = strTokenData[2];
		sDay  = strTokenData[1];

		break;

	case 4:					//.  4. American Short Date		10.07.1987		mm.dd.yyyy

		sYear  = strTokenData[2];
		sMonth = strTokenData[0];
		sDay   = strTokenData[1];

		break;

	case 5:					//.  5. Europian Long Date		07.OCT.1987		dd.MON.yyyy

		//. 月の英字文字列を数字に変換
		nMonth = TranslateFromLongStyle( strTokenData[1] );
		if( -1 == nMonth )
		{
			return -1	//-5;
		}

		sMonth = nMonth;
		sYear = strTokenData[2];
		sDay  = strTokenData[0];

		break;

	case 6:					//.  6. Europian Short Date		07.10.1987		dd.mm.yyyy

		sYear  = strTokenData[2];
		sMonth = strTokenData[1];
		sDay   = strTokenData[0];

		break;

	default:
		return -1	//-6;
		break;

	}

//. C. 生年月日のチェック ＆ yyyymmdd に変換*******************************************************
	//. 生年月日の最終チェック
// 2006/04/14 PVCS#1730 H.SAITO -ST-
//// 2006/04/06 PVCS#1730 H.SAITO -ST-
////	if(isNaN(sYear) || isNaN(sMonth) || isNaN(sDay))
//	if(sYear.toString().match(/[\D]/g) || sMonth.toString().match(/[\D]/g) || sDay.toString().match(/[\D]/g))
//// 2006/04/06 PVCS#1730 H.SAITO -ED-
	if(isNaN(sYear) || isNaN(sMonth) || isNaN(sDay) || 
	   sYear.toString().match(/[\D]/g) || sMonth.toString().match(/[\D]/g) || sDay.toString().match(/[\D]/g))
// 2006/04/14 PVCS#1730 H.SAITO -ED-
	{
		nRetCode = -1;
	}
	else
	{
		nRetCode = CheckDate( sYear, sMonth, sDay );
	}
	
	if( nRetCode == RETURN_OK ){
		while(sYear.toString().length < 4)
		{
			sYear = "0" + sYear;
		}
		while(sMonth.toString().length < 2)
		{
			sMonth = "0" + sMonth;
		}
		while(sDay.toString().length < 2)
		{
			sDay = "0" + sDay;
		}
		strRetDate = sYear + sMonth + sDay;
	}
	else
	{
		strRetDate = "-1";
	}

	// 本日の日付と比較

	if(parseInt(GetToday(), 10) < parseInt(strRetDate, 10))
	{
		strRetDate = -1;
	}
	

	return strRetDate;

}


/*//////////////////////////////////////////////////////////////////////////////////////

	[関数名]				TranslateFromJapaneseStyle

	[引数]					sYear : 年（生年月日）元号で取得



							sMonth: 月



							sDay  : 日

	[戻り値]				nYear :西暦に変換した年


	[内容]					JapaneseStyle の生年月日の元号を西暦に変換
							元号の開始日以降か、もしくは、終了日以前かを判定



							変換失敗、もしくはエラーの場合は -1 を返す

///////////////////////////////////////////////////////////////////////////////////////////////*/
function TranslateFromJapaneseStyle(sYear, sMonth, sDay)
{

	var nYear  = parseInt(-1, 10);						//. 西暦に直した年
	var nMonth = parseInt(sMonth, 10);
	var nDay   = parseInt(sDay, 10);
	var nEra   = sYear.substr(1);			//. 元号の年
// 2006/04/14 PVCS#1730 H.SAITO -ST-
//// 2006/04/06 PVCS#1730 H.SAITO -ST-
////	if(isNaN(nEra))
//	if(nEra.toString().match(/[\D]/g))
//// 2006/04/06 PVCS#1730 H.SAITO -ED-
	if(isNaN(nEra) ||
	   nEra.toString().match(/[\D]/g))
// 2006/04/14 PVCS#1730 H.SAITO -ED-
	{
		return -1;
	}
  nEra   = parseInt(sYear.substr(1),10);

	var sFirst = 0;										//. 元号のイニシャル
	sFirst = sYear.charAt(0).toUpperCase();				//.元号のイニシャルが小文字だったら大文字に変換

	if( MEIJI_INITIAL_LARGE == sFirst ) //.明治ならば*************************
	{

		nYear = MEIJI_YEAR_OFFSET + nEra;			//.西暦に変換
		if( MEIJI_START_YEAR > nYear || MEIJI_END_YEAR < nYear )
		{
			m_nErrorCode = ERROR_MISSED_YEAR;
			return -1;
		}

		//. 明治開始年月日の判定



		if( MEIJI_START_YEAR == nYear)
		{
			if ( ( MEIJI_START_MONTH > nMonth ) || (( MEIJI_START_MONTH == nMonth ) && ( MEIJI_START_DAY > nDay )) )
			{
				m_nErrorCode = ERROR_BEFORE_ERA_START;
				return -1;
			}
		}
		
		//.	和暦の境目判断を緩和する



		//. 明治終了年月日の判定



		if( MEIJI_END_YEAR == nYear)
		{
			if ( ( MEIJI_END_MONTH < nMonth ) || (( MEIJI_END_MONTH == nMonth ) && ( MEIJI_END_DAY < nDay )) )
			{
				m_nErrorCode = ERROR_AFTER_ERA_END;
				return -1;
			}
		}

	}
	else if( TAISHO_INITIAL_LARGE == sFirst )	//.大正ならば**********************
	{
		nYear = TAISHO_YEAR_OFFSET + nEra;			//.西暦に変換
		if( TAISHO_START_YEAR > nYear || TAISHO_END_YEAR < nYear )
		{
			m_nErrorCode = ERROR_MISSED_YEAR;
			return -1;
		}

		//. 大正開始年月日の判定



		if( TAISHO_START_YEAR == nYear)
		{
			if ( ( TAISHO_START_MONTH > nMonth ) || (( TAISHO_START_MONTH == nMonth ) && ( TAISHO_START_DAY > nDay )) )
			{
				m_nErrorCode = ERROR_BEFORE_ERA_START;
				return -1;
			}
		}
		
		//< A08 2002.02.01 FFS H.Chiba
		//.	和暦の境目判断を緩和する(S15.12.25を有効とする)
		//. 大正終了年月日の判定



		if( TAISHO_END_YEAR == nYear)
		{
			if ( ( TAISHO_END_MONTH <nMonth ) || (( TAISHO_END_MONTH == nMonth ) && ( TAISHO_END_DAY < nDay )) )
			{
				m_nErrorCode = ERROR_AFTER_ERA_END;
				return -1;
			}
		}
	}
	else if( SHOWA_INITIAL_LARGE == sFirst )	//.昭和ならば **********************
	{
		nYear = SHOWA_YEAR_OFFSET + nEra;			//.西暦に変換
		if( SHOWA_START_YEAR > nYear || SHOWA_END_YEAR < nYear )
		{
			m_nErrorCode = ERROR_MISSED_YEAR;
			return -1;
		}

		//. 昭和開始年月日の判定



		if( SHOWA_START_YEAR == nYear)
		{
			if ( ( SHOWA_START_MONTH >nMonth ) || (( SHOWA_START_MONTH == nMonth ) && ( SHOWA_START_DAY > nDay )) )
			{
				m_nErrorCode = ERROR_BEFORE_ERA_START;
				return -1;
			}
		}
		
		//< A08 2002.02.01 FFS H.Chiba
		//.	和暦の境目判断を緩和する(S64.01.08を有効とする)
		//. 昭和終了年月日の判定



		if( SHOWA_END_YEAR == nYear)
		{
			if ( ( SHOWA_END_MONTH < nMonth ) || (( SHOWA_END_MONTH == nMonth ) && ( SHOWA_END_DAY < nDay )) )
			{
				m_nErrorCode = ERROR_AFTER_ERA_END;
				return -1;
			}

		}
	}
	else if( HEISEI_INITIAL_LARGE == sFirst ) //. 平成ならば **********************
	{
		nYear = HEISEI_YEAR_OFFSET + nEra;			//.西暦に変換
		if( HEISEI_START_YEAR > nYear  )
		{
			m_nErrorCode = ERROR_MISSED_YEAR;
			return -1;
		}
		//. 平成開始年月日の判定



		if( HEISEI_START_YEAR == nYear)
		{
			if ( ( HEISEI_START_MONTH > nMonth ) || (( HEISEI_START_MONTH == nMonth ) && ( HEISEI_START_DAY > nDay )) )
			{
				m_nErrorCode = ERROR_BEFORE_ERA_START;
				return -1;
			}
		}
		
	}
	else
	{

		m_nErrorCode = ERROR_MISSED_YEAR;
		return -1;
	}

	return nYear;

}

/*//////////////////////////////////////////////////////////////////////////////////////

	[関数名]				CheckDate

	[引数]					sYear : 年（生年月日）西暦で取得



							sMonth: 月			 
							sDay  : 日

	[戻り値]				lpszReturn :DICOM書式の生年月日

	[概要]					年、月、日の最終判定を行ない DICOM 書式の生年月日文字列に変換
							失敗、エラー時には NULLを返す
							関数呼出し後、必要なくなった時点でlpszReturn のメモリの解放を行なう



							NULL を返した場合はメモリの解放は不要



///////////////////////////////////////////////////////////////////////////////////////////////*/
function CheckDate( sYear, sMonth, sDay )
{
	var nYear = 0;
	var nMonth = 0;
	var nDay = 0;
	//. 1ヶ月の日数
	var nDaysMonth = new Array(DAYS_OF_JAN, DAYS_OF_FEB, DAYS_OF_MAR, DAYS_OF_APR,
							   DAYS_OF_MAY, DAYS_OF_JUN, DAYS_OF_JUL, DAYS_OF_AUG,
							   DAYS_OF_SEP, DAYS_OF_OCT, DAYS_OF_NOV, DAYS_OF_DEC);
	nYear	= parseInt( sYear, 10 );
	nMonth	= parseInt( sMonth, 10 );
	nDay	= parseInt( sDay, 10 );

// 2006/04/14 PVCS#1730 H.SAITO -ST-
//// 2006/04/06 PVCS#1730 H.SAITO -ST-
////	if(isNaN(sYear) || isNaN(sMonth) || isNaN(sDay))
//	if(sYear.toString().match(/[\D]/g) || sMonth.toString().match(/[\D]/g) || sDay.toString().match(/[\D]/g))
//// 2006/04/06 PVCS#1730 H.SAITO -ED-
	if(isNaN(nYear) || isNaN(nMonth) || isNaN(nDay) || 
	   sYear.toString().match(/[\D]/g) || sMonth.toString().match(/[\D]/g) || sDay.toString().match(/[\D]/g))
// 2006/04/14 PVCS#1730 H.SAITO -ED-
	{
		m_nErrorCode = ERROR_MISSED_YEAR;
		return ERROR_MISSED_YEAR;
	}
	if( 1800 > nYear || 10000 < nYear )						//.年の判定



	{
		m_nErrorCode = ERROR_MISSED_YEAR;
		return ERROR_MISSED_YEAR;
	}

	if( 1 > nMonth || 12 < nMonth )							//.月の判定



	{
		m_nErrorCode = ERROR_MISSED_MONTH;
		return ERROR_MISSED_MONTH;
	}

	if( 1 > nDay || nDaysMonth[nMonth-1] < nDay )			//.日にちの判定



	{
		m_nErrorCode = ERROR_MISSED_DAY;
		return ERROR_MISSED_DAY;
	}

	//. 閏年の判定



	if( ( 29 == nDay ) && ( 2 == nMonth ) )
	{
		if( 0 != ( nYear % 4 ) )
		{
			m_nErrorCode = ERROR_NOT_LEAP_YEAR;
			return ERROR_NOT_LEAP_YEAR;
		}
		else if( ( 0 == ( nYear % 100 ) ) && ( 0 != (nYear % 400 ) ) )
		{
			m_nErrorCode = ERROR_NOT_LEAP_YEAR;
			return ERROR_NOT_LEAP_YEAR;
		}
	}
	
	return RETURN_OK;

}

/*//////////////////////////////////////////////////////////////////////////////////////

	[関数名]				TranslateFromLongStyle

	[引数]					lpszlongMonth	: 月（アルファベットで取得）




	[戻り値]				nMonth			:数字に変換した月




	[内容]					Ansi、American、EuropianのLong Styleのアルファベットで
							得られた月を数字に変換する
							変換に失敗、もしくはエラーの場合は -1 を返す

///////////////////////////////////////////////////////////////////////////////////////////////*/
function TranslateFromLongStyle(sLongMonth)
{
	var nMonth = 0;
	var nLoop;
	//. 月を表す英字文字列
	var sMonthAlpha = new Array(STRING_MONTH_JAN, STRING_MONTH_FEB, STRING_MONTH_MAR, STRING_MONTH_APR,
								STRING_MONTH_MAY, STRING_MONTH_JUN, STRING_MONTH_JUL, STRING_MONTH_AUG,
								STRING_MONTH_SEP, STRING_MONTH_OCT, STRING_MONTH_NOV, STRING_MONTH_DEC);
	sLongMonth = sLongMonth.toUpperCase();
	
	for( nLoop = 0; nLoop < 12; nLoop++ )
	{
		//. 大文字小文字関係なく判定



		if( sLongMonth == sMonthAlpha[nLoop] )
		{
			nMonth = nLoop + 1;
			m_nErrorCode = RETURN_OK;
			break;
		}
		else
		{
			nMonth = -1;
			m_nErrorCode = ERROR_MISSED_MONTH;
		}
	
	}

	return nMonth;
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

	[関数名]				GetLastDate

	[引数]					Month : 戻る月数
							Day   : 戻る週数

	[戻り値]				strLastDate			: 日付




	[内容]					日付を取得する。




///////////////////////////////////////////////////////////////////////////////////////////////*/
function GetLastDate( sMonth, sDay ){
	var dDate, strLastDate,yy,mm,dd
	dDate = new Date();
	var nDaysMonth = new Array(DAYS_OF_JAN, DAYS_OF_FEB, DAYS_OF_MAR, DAYS_OF_APR,
							   DAYS_OF_MAY, DAYS_OF_JUN, DAYS_OF_JUL, DAYS_OF_AUG,
							   DAYS_OF_SEP, DAYS_OF_OCT, DAYS_OF_NOV, DAYS_OF_DEC);

	yy = dDate.getFullYear();
	mm = dDate.getMonth() + 1;
	dd = dDate.getDate();

	// うるう年以外は2月の日にちを28日に設定



	if( 0 != ( yy % 4 ) )
	{
		nDaysMonth[1] = 28;
	}
	else if( ( 0 == ( yy % 100 ) ) && ( 0 != (yy % 400 ) ) )
	{
		nDaysMonth[1] = 28;
	}

	dd = dd - 7*sDay;
	mm = mm - sMonth
	// 日にちチェック
	if(dd <= 0) {
		mm = mm - 1;
		if(mm > 0)	dd = nDaysMonth[mm - 1] + dd;
	}
	// 月チェック
	if(mm <= 0) {
		yy = yy - 1;
		mm = 12 + mm;
// 変更 Hbt-Ver00-0056 UP-ST（開始）



		if(dd <= 0) dd = nDaysMonth[mm - 1] + dd;
// Hbt-Ver00-0056 UP-ED（終了)
	}
	// 月の日にちチェック
	if(nDaysMonth[mm - 1] < dd)
	{
		dd = nDaysMonth[mm - 1];
	}
	if (mm < 10) { mm = "0" + mm; }
	if (dd < 10) { dd = "0" + dd; }
	strLastDate = yy.toString();
	strLastDate += mm.toString();
	strLastDate += dd.toString();

	return(strLastDate);
}

