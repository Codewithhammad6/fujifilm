/****************************************************************************

  @file GetString.js

  @brief 文字列取得
  @author YSK畑
        SpotCode MAX 9

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/19  YSK畑       V1.0       新規作成

/****************************************************************************/
 //[定数]
var STRING_COUNT = 1000;		// 再帰関数のループ数

var FATAL_ERROR_STRING = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR_STRING = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE_STRING = 0;                   //スポットコード

var FILE_NAME_STRING = "GetString.js"  //ファイル名

var MESSAGE_ID_STRING        = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS_STRING = 30501;              //メッセージID 

//[変数]
var MaxCount;				// 最大インデックス
var MinCount;				// 最小インデックス
var MidCount;				// 検索インデックス
var Count=0;				// ループカウンタ

var MaxLangMsgCount;				// 最大インデックス
var MinLangMsgCount;				// 最小インデックス
var MidLangMsgCount;				// 検索インデックス
var LangMsgCount=0;				// ループカウンタ
//***************************************************************************
//  Public_ClearStirngCount(	
//
//  1．機能
//      検索インデックスス初期化//  2．戻り値  
//		  なし//  3．備考//***************************************************************************
function Public_ClearStirngCount(){
  try{
	  MaxCount = StringCount-1;
	  MinCount = 0;
	  MidCount;
	  Count=0;
  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR_STRING, MESSAGE_ID_STRING, FILE_NAME_STRING, SPOT_CODE_STRING+0);
  }
  
}

//***************************************************************************
//  Public_GetString( stringKey        : 検索キー
//             defaultString    : デフォルト文字列
//              )
//  1．機能
//      文字検索
//  2．戻り値  
//		  なし//  3．備考//***************************************************************************
function Public_GetString(stringKey, defaultString)
{
  try{
	  // 検索キー
	  MidCount = parseInt(MinCount +(MaxCount-MinCount)/2);
//dbg
//alert("stringKey = " + stringKey + ",MidCount = " + MidCount + "\n" + 
//"CaptionID[MidCount] =" + CaptionId[MidCount] + "\n" + 
//"CaptionId[MaxCount] =" + CaptionId[MaxCount] + ",CaptionId =" + CaptionId.toString());
	  // キーが一致した場合	  if(stringKey == CaptionId[MidCount]){
		  Public_ClearStirngCount();
		  return CaptionString[MidCount];

	  }
	  // キーが分岐点大なりの場合	  else if(stringKey > CaptionId[MidCount]){
		  // 最大より大なりの場合デフォルト値を設定		  if(stringKey > CaptionId[MaxCount]){
			  Public_ClearStirngCount();
			  return defaultString;
		  }
		  // 上記以外の場合再度検索
		  else{
			  // 最小値を検索した番号より1増加
			  MinCount = MidCount+1;
			  return Public_GetString(stringKey, defaultString);
		  }
	  }
	  // キーが分岐点小なりの場合	  else if(stringKey < CaptionId[MidCount]){
		  // 最大より大なりの場合デフォルト値を設定		  if(stringKey < CaptionId[MinCount]){
			  Public_ClearStirngCount();
			  return defaultString;
		  }
		  // 上記以外の場合再度検索
		  else{
			  // 最大値を検索した番号より1減少			  MaxCount = MidCount-1;
			  return Public_GetString(stringKey, defaultString);
		  }
	  }
	  // 再帰関数が一定よりオーバーした場合	  else if(Count > STRING_COUNT){
      Public_ErrorDisplay(FATAL_ERROR_STRING, MESSAGE_ID_STRING, FILE_NAME_STRING, SPOT_CODE_STRING+1);
		  Public_ClearStirngCount();
		  return defaultString;
	  }
	  Count++;
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR_STRING, MESSAGE_ID_STRING, FILE_NAME_STRING, SPOT_CODE_STRING+2);
  }
}

//***************************************************************************
//  Public_ClearLangMsgStirngCount(	
//
//  1．機能
//      メッセージ検索インデックスス初期化//  2．戻り値  
//		  なし//  3．備考//***************************************************************************
function Public_ClearLangMsgStirngCount(){
  try{
	  MaxLangMsgCount = LangMsgStringCount-1;
	  MinLangMsgCount = 0;
	  MidLangMsgCount;
	  LangMsgCount=0;
  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR_STRING, MESSAGE_ID_STRING, FILE_NAME_STRING, SPOT_CODE_STRING+3);
  }
  
}

//***************************************************************************
//  Public_GetLangMsgString( stringKey        : 検索キー
//             defaultString    : デフォルト文字列
//              )
//  1．機能
//      メッセージ検索
//  2．戻り値  
//		  なし//  3．備考//***************************************************************************
function Public_GetLangMsgString(stringKey, defaultString)
{
  try{
	  // 検索キー
	  MidLangMsgCount = parseInt(MinLangMsgCount +(MaxLangMsgCount-MinLangMsgCount)/2);
	  // キーが一致した場合	  if(stringKey == LangMsgId[MidLangMsgCount]){
		  Public_ClearLangMsgStirngCount();
		  return LangMsgMessage[MidLangMsgCount];

	  }
	  // キーが分岐点大なりの場合	  else if(stringKey > LangMsgId[MidLangMsgCount]){
		  // 最大より大なりの場合デフォルト値を設定		  if(stringKey > LangMsgId[MaxLangMsgCount]){
			  Public_ClearLangMsgStirngCount();
			  return defaultString;
		  }
		  // 上記以外の場合再度検索
		  else{
			  // 最小値を検索した番号より1増加
			  MinLangMsgCount = MidLangMsgCount+1;
			  return Public_GetLangMsgString(stringKey, defaultString);
		  }
	  }
	  // キーが分岐点小なりの場合	  else if(stringKey < LangMsgId[MidLangMsgCount]){
		  // 最大より大なりの場合デフォルト値を設定		  if(stringKey < LangMsgId[MinLangMsgCount]){
			  Public_ClearLangMsgStirngCount();
			  return defaultString;
		  }
		  // 上記以外の場合再度検索
		  else{
			  // 最大値を検索した番号より1減少			  MaxLangMsgCount = MidLangMsgCount-1;
			  return Public_GetLangMsgString(stringKey, defaultString);
		  }
	  }
	  // 再帰関数が一定よりオーバーした場合
	  else if(LangMsgCount > STRING_COUNT){
      Public_ErrorDisplay(FATAL_ERROR_STRING, MESSAGE_ID_STRING, FILE_NAME_STRING, SPOT_CODE_STRING+4);
		  Public_ClearLangMsgStirngCount();
		  return defaultString;
	  }
	  LangMsgCount++;
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR_STRING, MESSAGE_ID_STRING, FILE_NAME_STRING, SPOT_CODE_STRING+5);
  }
}
//***************************************************************************
//  Public_GetLangMsgString( stringKey        : 検索キー
//             defaultString    : デフォルト文字列
//              )
//  1．機能
//      メッセージ検索
//  2．戻り値  
//		  なし//  3．備考//***************************************************************************
function Public_GetLangMsgTitle1(stringKey, defaultString)
{
  try{
	  // 検索キー
	  MidLangMsgCount = parseInt(MinLangMsgCount +(MaxLangMsgCount-MinLangMsgCount)/2);
	  // キーが一致した場合	  if(stringKey == LangMsgId[MidLangMsgCount]){
		  Public_ClearLangMsgStirngCount();
		  return LangMsgTitle1[MidLangMsgCount];

	  }
	  // キーが分岐点大なりの場合	  else if(stringKey > LangMsgId[MidLangMsgCount]){
		  // 最大より大なりの場合デフォルト値を設定		  if(stringKey > LangMsgId[MaxLangMsgCount]){
			  Public_ClearLangMsgStirngCount();
			  return defaultString;
		  }
		  // 上記以外の場合再度検索
		  else{
			  // 最小値を検索した番号より1増加
			  MinLangMsgCount = MidLangMsgCount+1;
			  return Public_GetLangMsgTitle1(stringKey, defaultString);
		  }
	  }
	  // キーが分岐点小なりの場合	  else if(stringKey < LangMsgId[MidLangMsgCount]){
		  // 最大より大なりの場合デフォルト値を設定		  if(stringKey < LangMsgId[MinLangMsgCount]){
			  Public_ClearLangMsgStirngCount();
			  return defaultString;
		  }
		  // 上記以外の場合再度検索
		  else{
			  // 最大値を検索した番号より1減少			  MaxLangMsgCount = MidLangMsgCount-1;
			  return Public_GetLangMsgTitle1(stringKey, defaultString);
		  }
	  }
	  // 再帰関数が一定よりオーバーした場合
	  else if(LangMsgCount > STRING_COUNT){
      Public_ErrorDisplay(FATAL_ERROR_STRING, MESSAGE_ID_STRING, FILE_NAME_STRING, SPOT_CODE_STRING+6);
		  Public_ClearLangMsgStirngCount();
		  return defaultString;
	  }
	  LangMsgCount++;
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR_STRING, MESSAGE_ID_STRING, FILE_NAME_STRING, SPOT_CODE_STRING+7);
  }
}
//***************************************************************************
//  Public_GetLangMsgString( stringKey        : 検索キー
//             defaultString    : デフォルト文字列
//              )
//  1．機能
//      メッセージ検索
//  2．戻り値  
//		  なし//  3．備考//***************************************************************************
function Public_GetLangMsgTitle2(stringKey, defaultString)
{
  try{
	  // 検索キー
	  MidLangMsgCount = parseInt(MinLangMsgCount +(MaxLangMsgCount-MinLangMsgCount)/2);
	  // キーが一致した場合	  if(stringKey == LangMsgId[MidLangMsgCount]){
		  Public_ClearLangMsgStirngCount();
		  return LangMsgTitle2[MidLangMsgCount];

	  }
	  // キーが分岐点大なりの場合	  else if(stringKey > LangMsgId[MidLangMsgCount]){
		  // 最大より大なりの場合デフォルト値を設定		  if(stringKey > LangMsgId[MaxLangMsgCount]){
			  Public_ClearLangMsgStirngCount();
			  return defaultString;
		  }
		  // 上記以外の場合再度検索
		  else{
			  // 最小値を検索した番号より1増加
			  MinLangMsgCount = MidLangMsgCount+1;
			  return Public_GetLangMsgTitle2(stringKey, defaultString);
		  }
	  }
	  // キーが分岐点小なりの場合	  else if(stringKey < LangMsgId[MidLangMsgCount]){
		  // 最大より大なりの場合デフォルト値を設定		  if(stringKey < LangMsgId[MinLangMsgCount]){
			  Public_ClearLangMsgStirngCount();
			  return defaultString;
		  }
		  // 上記以外の場合再度検索
		  else{
			  // 最大値を検索した番号より1減少			  MaxLangMsgCount = MidLangMsgCount-1;
			  return Public_GetLangMsgTitle2(stringKey, defaultString);
		  }
	  }
	  // 再帰関数が一定よりオーバーした場合
	  else if(LangMsgCount > STRING_COUNT){
      Public_ErrorDisplay(FATAL_ERROR_STRING, MESSAGE_ID_STRING, FILE_NAME_STRING, SPOT_CODE_STRING+8);
		  Public_ClearLangMsgStirngCount();
		  return defaultString;
	  }
	  LangMsgCount++;
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR_STRING, MESSAGE_ID_STRING, FILE_NAME_STRING, SPOT_CODE_STRING+9);
  }
}
