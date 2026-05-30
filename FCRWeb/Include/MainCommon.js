/****************************************************************************

  @file MainCommon.js

  @brief Mainの共通関数


  @author YSK畑







  Copyright(C) 2004-2009 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/13  YSK畑       V1.0      新規作成
  @date  06/07/17  HSK平尾     V1.2      HobbitV1.3対応


  @date  06/11/28  YSK齋藤     V1.4      インジケータ開始・終了通知におけるハンドラの存在チェック(PVCS#1964,#1960,#1903)
  @date  07/03/19  HSK平尾     V2.0      内視鏡画像取込対応


  @date  07/03/19  HSK平尾     V2.0      IE7対応

  @date  07/04/05  HSK由比     V2.0       SST B#139対応

  @date  07/04/21  HSK平尾     V2.0      IE7対応追加修正

  @date  09/03/23  HSK廣井     V5.0      Vistaシャットダウン対応

  @date  09/03/31  HSK廣井     V5.0      PVCS#3275対策

  @date  10/01/20  FF 星野     V1.2(B)   起動形態対応

/****************************************************************************/

// ここから下にはMainに行わせる共通の関数を記述してください。





//[定数]
// フレームID
var FRAMEID_INDICATOR = "frmIndicator";		// インジケータフレーム
var FRAMEID_DISPFRAME = "DispFrame";		// 先読みフレーム
var FRAMEID_ENDFRAME  = "EndFrame"			// システム終了フレーム
var FRAMEID_MAINFRAME = "MainFrame"			// Functionフレーム

var FATAL_ERROR_MAIN = "FATAL_ERROR";    //致命的なエラー 
var RETRY_ERROR_MAIN = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE_MAIN = 0;                   //スポットコード




var FILE_NAME_MAIN = "MainCommon.js"  //ファイル名




var MESSAGE_ID_MAIN = 30500;              //メッセージID 
var MESSAGE_ID_ACCESS_MAIN = 30501;              //メッセージID 

//[変数]
var LoginUserId = "";       // 認証されたユーザID
var LoginTime   = "";       // 認証された時間


var ViewMode ="";//V1.2(B) 起動形態対応 星野 ADD


var NowTime = "";			// 現在時刻(YYYY/MM/DD HH:MM:SS)
var ViewFrame = "";			// 現在表示中のフレーム
// HOBBIT V5.0 PVCS#3275 Add Start
var MAINCLOSE_PROC	= "Main_Close_Proc.aspx";
var CLIENT_TYPE_SERVER  = 3;
// HOBBIT V5.0 PVCS#3275 Add End
//***************************************************************************
//  SetUserInfomation(userId : ログインユーザID loginTime : ログイン時間)		
//  1．機能
//      ユーザ情報の設定




//  2．戻り値  
//      なし




//  3．備考




//***************************************************************************
function SetUserInfomation(userId, loginTime)
{
	try{
		LoginUserId = userId;
		LoginTime   = loginTime;
		
	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR_MAIN,MESSAGE_ID_MAIN,FILE_NAME_MAIN,SPOT_CODE_MAIN+0)
//		Public_Error(FATAL_ERROR, "Public_Init Exception");
	}

}
//***************************************************************************
//  SetTime(Time)		
//
//  1．機能
//      インジケータからの現在時刻
//  2．戻り値  
//		  なし




//  3．備考




//***************************************************************************
function SetTime(Time)
{
	try{
		// 現在時刻設定




		NowTime = Time;
	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR_MAIN,MESSAGE_ID_MAIN,FILE_NAME_MAIN,SPOT_CODE_MAIN+1)
//		Public_Error(FATAL_ERROR, "DisplayScreen Exception");
	}
}

//***************************************************************************
//  SetCurrentView(viewMode : 画面(予約検査/検査/ユーザ認証)		
//  1．機能
//      インジケータに開いている画面通知
//  2．戻り値  
//		  なし




//  3．備考




//***************************************************************************
function SetCurrentView(viewMode)
{
	try{
		ViewMode = viewMode;//V1.2(B) 起動形態対応 星野 ADD
	  // インジケータに画面通知
// 20070319 HSK平尾 V2.0 内視鏡画像取り込み D Start
//	  frmIndicator.SetCurrentView(viewMode);
// 20070319 HSK平尾 V2.0 内視鏡画像取り込み D End
// 20070319 HSK平尾 V2.0 内視鏡画像取り込み A Start
      var frm = GetChildFrame(FRAMEID_INDICATOR)
      if(frm != null){
	    frm.SetCurrentView(viewMode);
      }
// 20070319 HSK平尾 V2.0 内視鏡画像取り込み A End
	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR_MAIN,MESSAGE_ID_MAIN,FILE_NAME_MAIN,SPOT_CODE_MAIN+2)
//		Public_Error(FATAL_ERROR, "SetCurrentView Exception");
	}
}
// Hobbit-V1.3 電カル連携対応 Hirao add Start
//***************************************************************************
//  SetCurrentView(viewMode : 画面(予約検査/検査/ユーザ認証)		
//  1．機能
//      インジケータに開いている画面通知
//  2．戻り値  
//		  なし





//  3．備考





//***************************************************************************
function SetViewFrame(FrmeId)
{
	try{
	  ViewFrame = FrmeId;
	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR_MAIN,MESSAGE_ID_MAIN,FILE_NAME_MAIN,SPOT_CODE_MAIN+5)
//		Public_Error(FATAL_ERROR, "SetCurrentView Exception");
	}
}
// Hobbit-V1.3 電カル連携対応 Hirao add End

//***************************************************************************
//  IndicatorUtilityOpen()		
//
//  1．機能
//      インジケータユーティリティ開始通知
//  2．戻り値  
//		  なし




//  3．備考




//     
//***************************************************************************
function IndicatorUtilityOpen()
{
	try{
	  // 表示中のフレームが先読みフレームの場合





      if(ViewFrame == FRAMEID_DISPFRAME){
		// 2006/11/28 PVCS#1964,#1960,#1903 H.SAITO -ST-
	    //DispFrame.IndicatorUtilityOpen();
		try{
			DispFrame.IndicatorUtilityOpen();
		}catch(e){
		}
		// 2006/11/28 PVCS#1964,#1960,#1903 H.SAITO -ED-
	  }
	  // 先読みフレーム以外は処理しない





	  else{
	    // Hobbit-V1.3 電カル連携対応 Hirao add Start
	    if(ViewFrame == FRAMEID_MAINFRAME ){
			// 2006/11/28 PVCS#1964,#1960,#1903 H.SAITO -ST-
	        //MainFrame.IndicatiorUtilityOpen();
	        try{
				MainFrame.IndicatiorUtilityOpen();
			}catch(e){
			}	
			// 2006/11/28 PVCS#1964,#1960,#1903 H.SAITO -ED-
	    }
	    // Hobbit-V1.3 電カル連携対応 Hirao add End
	  } 
	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR_MAIN,MESSAGE_ID_MAIN,FILE_NAME_MAIN,SPOT_CODE_MAIN+3)
//		Public_Error(FATAL_ERROR, "IndicatorUtilityOpen Exception");
	}
}
//***************************************************************************
//  IndicatorUtilityClose()		
//  1．機能
//      インジケータユーティリティ終了通知
//  2．戻り値  
//		  なし




//  3．備考




//***************************************************************************
function IndicatorUtilityClose()
{
	try{
	  // 表示中のフレームが先読みフレームの場合





      if(ViewFrame == FRAMEID_DISPFRAME){
		// 2006/11/28 PVCS#1964,#1960,#1903 H.SAITO -ST-
	    //DispFrame.IndicatorUtilityClose();
	    try{
			DispFrame.IndicatorUtilityClose();
		}catch(e){
		}	
		// 2006/11/28 PVCS#1964,#1960,#1903 H.SAITO -ED-
	  }
	  // 先読みフレーム以外は処理しない





	  else{
	    // Hobbit-V1.3 電カル連携対応 Hirao add Start
	    if(ViewFrame == FRAMEID_MAINFRAME ){
			// 2006/11/28 PVCS#1964,#1960,#1903 H.SAITO -ST-
	        //MainFrame.IndicatiorUtilityClose();
	        try{
				MainFrame.IndicatiorUtilityClose();
			}catch(e){
			}	
			// 2006/11/28 PVCS#1964,#1960,#1903 H.SAITO -ED-
	    }
	    // Hobbit-V1.3 電カル連携対応 Hirao add End
	  } 

	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR_MAIN,MESSAGE_ID_MAIN,FILE_NAME_MAIN,SPOT_CODE_MAIN+4)
//		Public_Error(FATAL_ERROR, "IndicatorUtilityClose Exception");
	}
}

//***************************************************************************
//  ShowMainWindow()		
//
//  1．機能
//      メインウインドウ表示
//  2．戻り値  
//
//***************************************************************************
function ShowMainWindow()
{
	var widthsize=800;
	var heightsize=600;
	var leftsize;
	var topsize;
	var sizebuff;
	leftsize=(window.screen.width-widthsize)/2;
	topsize=(window.screen.height-heightsize)/2;
	sizebuff="HEIGHT=" + heightsize + ",WIDTH=" + widthsize + ",RESIZABLE=YES,left=" + leftsize + ",top=" + topsize;
	window.focus();
	window.open( "./main.aspx","",sizebuff );
//	if( document.all ) window.opener=true;   // 20070421 HSK平尾 IE7対応 D
//  window.close();                    //20070320 HSK平尾 IE7対応 D
//    window.open('./Close.html','_self'); //20070320 HSK平尾 IE7対応 A	// 20070405 HSK由比 SST B#139 D //
// 20070413 HSK由比 WindowクローズAPI共通化対応 D Start //
//	(window.open('','_top').opener=top).close();						// 20070405 HSK由比 SST B#139 A //
// 20070413 HSK由比 WindowクローズAPI共通化対応 D End //
		WU_CloseWindow(window); // 20070413 HSK由比 WindowクローズAPI共通化対応 A //
}

// 20100624 FF奥野 CQ#385対応（自動ログインユーザー設定時にログアウトボタン押下でログイン画面が表示されない問題対策）
//***************************************************************************
//  ShowMainWindowWithQuery()		
//
//  1．機能
//      メインウインドウ表示（クエリ文字列付き）
//  2．戻り値  
//
//***************************************************************************
function ShowMainWindowWithQuery(queryString)
{
	var widthsize=800;
	var heightsize=600;
	var leftsize;
	var topsize;
	var sizebuff;
	//var queryStr = queryString;
	leftsize=(window.screen.width-widthsize)/2;
	topsize=(window.screen.height-heightsize)/2;
	sizebuff="HEIGHT=" + heightsize + ",WIDTH=" + widthsize + ",RESIZABLE=YES,left=" + leftsize + ",top=" + topsize;
	window.focus();
	window.open( "./main.aspx?" + queryString,"",sizebuff );
	WU_CloseWindow(window);
}

//***************************************************************************
//  GetQuerystring()		
//
//  1．機能
//      URL文字列からクエリキーに対応する値を取得する
//  2．戻り値  
//
//***************************************************************************
function GetQuerystring(url, key, default_)   
{   
   if (default_==null) default_="";   
   key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");   
   var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");   
   var qs = regex.exec(url);   
   if(qs == null)   
    return default_;   
   else  
    return qs[1];   
}

// 2005/06/21 057 H.SAITO 検査画面起動制御(Cookie保存箇所の共通化)
//***************************************************************************
//  SetCookie()		
//  1．機能
//      クッキーをセットする
//  2．戻り値  
//		  なし




//  3．備考




//***************************************************************************
function SetCookie(sName,sValue){
	var expire = new Date ("31,Dec 2199");
  var path   = "/";
  document.cookie = sName + "=" + sValue + "; expires=" + expire.toGMTString() + "; path=" + path;
}
//***************************************************************************
//  GetCookie()		
//  1．機能
//      クッキーの値を所得する





//  2．戻り値  
//		  ・値がある場合：対応するクッキーの値
//		  ・値がない場合：null
//  3．備考




//***************************************************************************
function GetCookie(sName){

  var lnumOfCookies = document.cookie.length;
  var sNameOfCookie = sName + "=";
  var lLength       = sNameOfCookie.length;
  var x = 0;

    while (x <= lnumOfCookies) {
        var y = (x + lLength);
        if (document.cookie.substring(x,y) == sNameOfCookie){
            return(ExtractCookieValue(y));
        }
        x = document.cookie.indexOf(" ",x) + 1;
        if (x == 0){
            break;
        }
    }
    return null;
}
//***************************************************************************
//  ExtractCookieValue()		
//  1．機能
//      クッキーの値を所得する





//  2．戻り値  
//		  ・値がある場合：対応するクッキーの値
//		  ・値がない場合：null
//  3．備考




//***************************************************************************
function ExtractCookieValue(lLocate){
    if ((lEndOfCookie =
         document.cookie.indexOf(";",lLocate)) == -1){
        lEndOfCookie = document.cookie.length;
    }
    return unescape(document.cookie.substring(lLocate,lEndOfCookie));
}
// 2005/06/29 112 H.SAITO PVCS#190,#205 検査排他の変更(Cookie)
//***************************************************************************
//  AddCookie()		
//  1．機能
//      クッキーに値を追加する
//  2．戻り値  
//		  なし




//  3．備考




//***************************************************************************
function AddCookie(sName,sValue){
	var expire = new Date ("31,Dec 2199");
  var path   = "/";
  var beforeValue;      // 既存のCookieデータ
  var beforeValueArray; // 既存のCookieデータ(配列) 
  var i;

  // 既存のクッキーデータに追加しようとするデータが存在するかチェックする
  if(CheckCookie(sName, sValue) != 1){
    // 既存のクッキーデータを取得





    beforeValue = GetCookie(sName);
    // nullチェック
    if(beforeValue){
      // 既存のクッキーデータをカンマを区切り文字として配列に格納





      beforeValueArray = beforeValue.split(",");         
    }else{
      beforeValueArray = new Array();
    }
    // データを追加
    beforeValueArray.push(sValue);
    document.cookie = sName + "=" + beforeValueArray.toString() + "; expires=" + expire.toGMTString() + "; path=" + path;
  }
}
//***************************************************************************
//  UnSetCookie()		
//  1．機能
//      クッキーから指定した値を取り除く





//  2．戻り値  
//      なし




//  3．備考




//***************************************************************************
function UnSetCookie(sName,sValue){
	var expire = new Date ("31,Dec 2199");
  var path   = "/";
  var beforeValue;      // 既存のCookieデータ
  var beforeValueArray; // 既存のCookieデータ(配列) 
  var AfterValueArray;  // 新規に保存するCookieデータ
  var i;

  // 既存のクッキーデータに削除しようとする値が存在するかチェック
  if(CheckCookie(sName,sValue) != 1){
    // 存在しなければ何もしない





    return;
  }

  // newArray
  AfterValueArray = new Array();

  // 既存のクッキーデータを取得





  beforeValue = GetCookie(sName);

  // 既存のクッキーデータをカンマを区切り文字として配列に格納





  beforeValueArray = beforeValue.split(",");

  // 既存のクッキーデータに削除しようとする値が存在するかチェック
  for(i = 0; i < beforeValueArray.length; i++){
    // 既存のCookieデータに存在しない場合のみ配列に追加する。すでに存在している場合は新たに追加しない





    if(beforeValueArray[i] != sValue){
      AfterValueArray.push(beforeValueArray[i]);
    } 
  }
  document.cookie = sName + "=" + AfterValueArray.toString() + "; expires=" + expire.toGMTString() + "; path=" + path;
}
//***************************************************************************
//  CheckCookie()		
//  1．機能
//      クッキーに値が存在するかチェックする
//  2．戻り値  
//		  1:存在する
//		  0:存在しない




//  3．備考




//***************************************************************************
function CheckCookie(sName,sValue){
  var path   = "/";
  var beforeValue;      // 既存のCookieデータ
  var beforeValueArray; // 既存のCookieデータ(配列) 
  var existFlag;        // 既存のCookieデータに存在するフラグ
  var i;

  // 既存のクッキーデータを取得





  beforeValue = GetCookie(sName);

  // nullチェック
  if(beforeValue){
    // 既存のクッキーデータをカンマを区切り文字として配列に格納





    beforeValueArray = beforeValue.split(",");
  }else{
    beforeValueArray = new Array();   
  }

  // 既存のクッキーデータに追加しようとする値が存在するかチェック
  for(i = 0; i < beforeValueArray.length; i++){
    if(beforeValueArray[i] == sValue){
      existFlag = 1;
      break;
    } 
  }
  if(existFlag != 1){
    return 0;
  }else{
    return 1;
  }
}
// 2005/08/19 Kanno ADD ST タイトルバーの文字列対応



//***************************************************************************
//  SetTitle()
//  1．機能
//      タイトルバーの文字列を設定する



//  2．戻り値
//      なし



//  3．備考



//***************************************************************************
function SetTitle(title){
  // タイトルを設定する



  document.title = title;
}
// 2005/08/19 Kanno ADD ED タイトルバーの文字列対応



// HOBBIT V5.0 Vistaシャットダウン対応 Add Start
//****************************************************************************
//  ShowSystemMenu()
//  機  能 : メインのシステムメニュー表示を要求する

//  戻り値 : なし

//  備  考 :
//****************************************************************************
// HOBBIT V5.0 PVCS#3275 Mod Start
function ShowSystemMenu(ClientMode)
// function ShowSystemMenu()
// HOBBIT V5.0 PVCS#3275 Mod End
{
	try
	{
		//V1.2(B) 起動形態対応 星野 ADD-ST
		var systemMenuDisplay = 0;
		if(ViewMode == "LOGIN")
		{
			systemMenuDisplay =1;
		}
		//V1.2(B) 起動形態対応 星野 ADD-ED
		// HOBBIT V5.0 PVCS#3275 Mod Start
		switch( ClientMode )
		{
			case CLIENT_TYPE_SERVER :
				var requestURL	= MAINCLOSE_PROC;
				//requestURL		+= "?ShowSystemMenu=1";				//V1.2(B) 起動形態対応 星野 DEL
				requestURL		+= "?ShowSystemMenu="+systemMenuDisplay;//V1.2(B) 起動形態対応 星野 ADD
				var topPos		= window.screenTop;
				var leftPos		= window.screenLeft;
				var dialogParam	= "scroll=no; toolbar=no; help=off; location=no; directories=no; status=no; menubar=no; resizable=no; dialogTop:" + topPos + "px;dialogLeft:" + leftPos + "px; dialogHeight:0px; dialogWidth:0px";
				// サーバへメインの終了処理を実施する画面を起動
				window.showModalDialog(requestURL, window, dialogParam);
				break;
		}
		//	location.replace(top.location.href + '?ShowSystemMenu=1');
		// HOBBIT V5.0 PVCS#3275 Mod End
	}
	catch(e)
	{
	}
}
// HOBBIT V5.0 Vistaシャットダウン対応 Add End


