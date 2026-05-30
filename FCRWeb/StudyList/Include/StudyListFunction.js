/*****************************************************************************

  @file StudyListFunction.js

  @brief Function.aspxのクライアントスクリプト

  @author YSK森山

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/24  YSK森山     V1.0       新規作成
  @date  08/11/21  FF 蔵敷     V4.0       PVCS 2972
  @date  08/12/09  HSK小椋     V5.0       Vista対応  @date  09/03/24  FF 蔵敷     V5.0       PVCS 3024
  @date  09/08/28  FF 奥野     V6.0       患者起点画面化による初期画面サイズの変更
*****************************************************************************/
var SCREEN_LEFTMAX = -10000;
var PATIENTPORTAL_WINDOW_WIDTH = 400; //FF 奥野 ADD 2009/08/28 V6.0 患者起点対応
var PATIENTPORTAL_WINDOW_TOP = 0;      //FF 奥野 ADD 2009/09/02 V6.0 患者起点対応

//****************************************************************************
//  OnBeforeUnload()
//
//  機  能 : ブラウザ終了時イベント

//
//  戻り値 : なし

//
//  備  考 :
//****************************************************************************
function OnBeforeUnload()
{
	try
	{

	}
	catch(e)
	{
		ErrorHandler( FATAL_ERROR, "OnBeforeUnload Exception" );
	}
}

//****************************************************************************
//  SetCookie(Setwidth, Setheight)
//
//  機  能 : クッキーに書き込み
//
//  戻り値 : なし


//
//  備  考 :
//          PVCS 3024対応　Kurashiki Add
//****************************************************************************
function SetCookie(Setwidth, Setheight, SetLeft, SetTop)
{
	var theName = "SutydListIESize";
	var expire = new Date ("31,Dec 2030");
	
//	Setwidth = eval(Setwidth);
//	Setheight = eval(Setheight);
    if(SetLeft > SCREEN_LEFTMAX){    //PVCS 3024
	// クッキーに書き込み
		document.cookie = theName + "=" + Setwidth + "=" + Setheight + "=" + SetLeft + "=" + SetTop + "=1" + ";expires=Fri, 31-Dec-2030 23:59:59";
    }
}

//HSK 小椋 Add Start 2008/12/09 V5.0 Vista対応
//****************************************************************************
//  SetBarCookie()
//
//  機  能 : ブラウザのバーの情報をクッキーに書き込む
//
//  戻り値 : なし
//
//  備  考 :
//****************************************************************************
function SetBarInfoInCookie()
{
	var theName = "StudylistBarSize";
	
	//ウィンドウの幅・高さ・x座標・y座標
	var WindowBarWidth;
	var WindowBarHeight;
	var WindowBarLeft;
	var WindowBarTop;
	
	//WindowBarWidth = screen.width - top.document.body.clientWidth; //FF 奥野 DEL 2009/08/28 V6.0 患者起点対応
	WindowBarWidth = PATIENTPORTAL_WINDOW_WIDTH - top.document.body.clientWidth; //FF 奥野 ADD 2009/08/28 V6.0 患者起点対応
	//WindowBarHeight = screen.height - top.document.body.clientHeight; //FF 奥野 DEL 2009/08/28 V6.0 患者起点対応
	WindowBarHeight = screen.height - top.document.body.clientHeight - PATIENTPORTAL_WINDOW_TOP; //FF 奥野 ADD 2009/08/28 V6.0 患者起点対応
	WindowBarLeft = top.window.screenLeft;
	//WindowBarTop = top.window.screenTop; //FF 奥野 DEL 2009/08/28 V6.0 患者起点対応
	WindowBarTop = top.window.screenTop - PATIENTPORTAL_WINDOW_TOP; //FF 奥野 ADD 2009/08/28 V6.0 患者起点対応
	
	// クッキーに書き込み	
	document.cookie = theName + "=" + WindowBarWidth + "=" + WindowBarHeight + "=" + WindowBarLeft + "=" + WindowBarTop + "=1" + ";expires=Fri, 31-Dec-2029 23:59:59";
}
//HSK 小椋 Add End 2008/12/09 V5.0 Vista対応

//HSK 小椋 Delete Start 2008/12/09 V5.0 Vista対応
//****************************************************************************
//  GetCookie(theName)
//
//  機  能 : クッキーから読込み
//
//  戻り値 : クッキーの内容


//
//  備  考 :
//****************************************************************************
//function GetCookie(theName)
//{
//	var start;
//	
//	theName += "=";
//	theCookie = document.cookie + ";";
//	
//	// 指定された名前を検索
//	start = theCookie.indexOf(theName);
//	
//	if(start != 1)
//	{
//		end = theCookie.indexOf(";",start);
//		return unescape(theCookie.substring(start + theName.Lenght,end));
//	}
//		
//}
//HSK 小椋 Delete End 2008/12/09 V5.0 Vista対応

//HSK 小椋 Add Start 2008/12/09 V5.0 Vista対応
function GetCookie(theName)
{
	var start;
	
	theName += "=";
	theCookie = document.cookie + ";";
	
	// キー名を検索
	start = theCookie.indexOf(theName);
	
	if(start != -1)
	{
		//キー名が存在した場合
		end = theCookie.indexOf(";",start);
		return unescape(theCookie.substring(start,end));
	}
	else
	{
		//キー名が存在しない場合
		return -1;
	}		
}
//HSK 小椋 Add End 2008/11/07 V5.0 Vista対応


//****************************************************************************
//  WindowResize()
//
//  機  能 : ブラウザサイズ変更
//
//  戻り値 : なし




//
//  備  考 :
//****************************************************************************
//HSK 小椋 Delete Start 2008/12/09 V5.0 Vista対応
//function WindowResize()
//{
//	try
//	{
//		var spStr;
//		var getValue;
//		
//		// クッキーの中身取得
//
//
//		getValue = GetCookie("SutydListIESize");
//		
//		spStr = getValue.split("=");
//		
//		if (spStr[5] == 1)
//		{
//// StudyListSize 20050810 ADD START
//			//--------------------------------------------------------
//			// 位置変更
//			// 尚、この位置変更は画面デザインのWindowsXPスタイルのみ
//			// 有効です。Windowsクラシックスタイルは対応していません。
//
//			//--------------------------------------------------------
//			var iTop = eval(spStr[4])-30;
//			var iLeft = eval(spStr[3])-4;
//// PVCS 2972 20091121 delete Kurashiki start
//			// LFET,TOPの値チェック
////			if ( (iLeft < 0) && (iTop < 0) ) 
////			{
//				// LEFT,TOPの値が共にマイナスの場合
//
////				top.moveTo(0, 0);
////			}
////			else if (iLeft < 0) 
////			{
//				// LEFTの値がマイナスの場合、0を設定
//
////				iLeft = 0;
////				top.moveTo(0, iTop);
////			}
////			else if (iTop < 0)
////			{
//				// TOPの値がマイナスの場合、0を設定
//
////				iTop = 0;
////				top.moveTo(iLeft, 0);
////			}
////			else
////			{
//// PVCS 2972 20091121 delete Kurashiki end
//				top.moveTo(iLeft, iTop);
////			}	// PVCS 2972 20091121 delete Kurashiki
//// StudyListSize 20050810 ADD END
//// StudyListSize 20050810 DEL START
////			top.moveTo(eval(spStr[3])-4, eval(spStr[4])-30);
//// StudyListSize 20050810 DEL END
//		
//			// リサイズ		
//			top.window.resizeTo( eval(spStr[1])+12, eval(spStr[2])+38 );
//		}
//		else
//		{
//			// 初回時用
//			
//			top.moveTo(0.0);
//			top.window.resizeTo( screen.width,screen.height );
//		}
//	}
//	catch(e)
//	{
//		ErrorHandler( "WindowResize Exception" );
//	}
//}
//HSK 小椋 Delete End 2008/12/09 V5.0 Vista対応

//HSK 小椋 Add Start 2008/12/09 V5.0 Vista対応
function WindowResize()
{
	try
	{
		var getWindowValue;
		var getWindowBarValue;
		var spGetWindowValue;
		var spGetWindowBarValue;

		// クッキー情報の取得				
		getWindowValue = GetCookie("SutydListIESize");
		getWindowBarValue = GetCookie("StudylistBarSize");
		
		if (getWindowValue != -1 && getWindowBarValue != -1)
		{
			// クッキーにWebブラウズの情報が存在する場合
			spGetWindowValue = getWindowValue .split("=");
			spGetWindowBarValue = getWindowBarValue .split("=");				
			
			var iLeft = eval(spGetWindowValue[3]) - eval(spGetWindowBarValue[3]);
			var iTop = eval(spGetWindowValue[4]) - eval(spGetWindowBarValue[4]);
			// 移動
			top.moveTo(iLeft, iTop);
			// リサイズ		
			top.window.resizeTo( eval(spGetWindowValue[1]) + eval(spGetWindowBarValue[1]), eval(spGetWindowValue[2]) + eval(spGetWindowBarValue[2]));
		}
		else
		{
			//クッキーにWebブラウズの情報が存在しない場合、
			//top.moveTo(0.0);//FF 奥野 DEL 2009/09/02 V6.0 患者起点対応
			//top.window.resizeTo( screen.width,screen.height ); //FF 奥野 DEL 2009/08/28 V6.0 患者起点対応
			top.moveTo(0, PATIENTPORTAL_WINDOW_TOP);  //FF 奥野 ADD 2009/08/28 V6.0 患者起点対応
			top.window.resizeTo( PATIENTPORTAL_WINDOW_WIDTH, screen.height - PATIENTPORTAL_WINDOW_TOP);  //FF 奥野 ADD 2009/08/28 V6.0 患者起点対応
			
			//ウィンドウバーの情報をクッキーに書き込む
			SetBarInfoInCookie();		
		}
	}
	catch(e)
	{
		ErrorHandler( "WindowResize Exception" );
	}
}
//HSK 小椋 Add End 2008/12/09 V5.0 Vista対応
