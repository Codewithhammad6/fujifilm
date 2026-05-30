/****************************************************************************

  @file Main.js

  @brief Mainのクライアントスクリプト

  @author YSK畑




  Copyright(C) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/17  YSK畑       V1.0       新規作成
  @date  06/04/18  YSK齋藤     V1.1(HotFix) インジケータのタイマ制御不良対応(PVCS#1743)
  @date  06/11/09  HSK酒井     V1.4       CR検査部構造見直し[2]対応


  @date  06/11/21  HSK古場     V1.4       CR検査部構造見直し[4]対応

  @date  07/03/20  HSK平尾     V2.0       IE7対応

  @date  07/04/05  HSK由比     V2.0       SST B#139対応
  @date  14/03/28  TYK石井     V3.0(B)    DR装置画面追加



/****************************************************************************/
// ここから下にはMainに行わせる関数を記述してください。



var MESSAGE_ID  = "30500";
var FILE_NAME   = "FCRWeb.MainCE.js";
var SPOT_CODE   = 0;
var FATAL_ERROR = "FATAL_ERROR";

//2005/04/24 003 H.SAITO
//排他取得状態(0:未取得,1:検査排他取得,2:検査,RU排他取得)
var ExclusiveState = 0;
// 2005/09/22 #1467 H.SAITO FunctionはPageLoaderに対応していないため、読み込み場所を変更 -ST-
var LogoutAuthorityFlag = 0; // EndLoad後のFunction読み込みをスイッチするために使用
// 2005/09/22 #1467 H.SAITO FunctionはPageLoaderに対応していないため、読み込み場所を変更 -ED-
//***************************************************************************
//  Public_Init()		
//  1．機能
//      初期機能開始


//  2．戻り値  
//		  なし


//  3．備考


//***************************************************************************
function Public_Init()
{
	try{
		DispFrame.Public_Init();
		// 画面表示
		DisplayScreen(FRAMEID_DISPFRAME);
	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID,FILE_NAME,SPOT_CODE+0);
	}

}
//***************************************************************************
//  Exit()		
//  1．機能
//      画面を閉じる
//  2．戻り値  
//		  なし


//  3．備考


//***************************************************************************
function Exit()
{
	try{
//		window.close();                    //20070320 HSK平尾 IE7対応 D
//        window.open('../Close.html','_self'); //20070320 HSK平尾 IE7対応 A	// 20070405 HSK由比 SST B#139 D //
		(window.open('','_top').opener=top).close();							// 20070405 HSK由比 SST B#139 A //
	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID,FILE_NAME,SPOT_CODE+1);
	}

}
//***************************************************************************
//  Logout()		
//  1．機能
//      ログオフ


//  2．戻り値  
//		  なし


//  3．備考


//***************************************************************************
function Logout()
{
	try{
		//ログイン画面呼び出し


		MainFrame.location.replace("../UserAuth/Login.aspx?Url=../CrExam/Function.aspx&IsLogoff=1");
		// ページ表示
		DisplayScreen(FRAMEID_MAINFRAME);	
	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID,FILE_NAME,SPOT_CODE+2);
	}
}
//***************************************************************************
//  LogoutAuthority()		
//  1．機能
//      ログオフ(ログインユーザチェックエラー時のログオフ)
//  2．戻り値  
//		  なし


//  3．備考


//***************************************************************************
function LogoutAuthority()
{
	try{
	  // 排他取得状態と検査シーケンスの初期化


	  ExclusiveState = 0;
	  StudySequence  = 0;
// 2005/09/12 #1428 H.SAITO -ST-
//	  //画像確認モニタ初期表示
//	  DispFrame.location.replace(FrameUrl);
//	  //ログイン画面呼び出し(ログオフ)
//	  MainFrame.location.replace("./UserAuth/Login.aspx?Url=../CrExam/Function.aspx&IsLogoff=1");
//	  Public_DisplayScreen(FRAMEID_MAINFRAME);	
	  //画像確認モニタ初期表示
	  DisplayScreen(FRAMEID_MAINFRAME);	

// 2005/09/22 #1467 H.SAITO FunctionはPageLoaderに対応していないため、読み込み場所を変更 -ST-
    //EndLoad後のFunction読み込み時にLogoffを実施するため、フラグを立てる



    LogoutAuthorityFlag = 1;
    LoadPage("DispFrame",FrameUrl,ChildPagesLoadedNotification);
	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID,FILE_NAME,SPOT_CODE+3);
	}
}

//***************************************************************************
//  Start()		
//
//  1．機能
//      システム終了画面からユーザ認証画面に遷移
//  2．戻り値  
//		  なし


//  3．備考


//***************************************************************************
function Start()
{
	try{
    //2005/04/24 004 H.SAITO
    // 排他取得状態と検査シーケンスの初期化


    ExclusiveState = 0;
    StudySequence  = 0;
	  top.location.replace("../MainCE.aspx");
	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID,FILE_NAME,SPOT_CODE+4);
	}
}

//***************************************************************************
//  End()		
//
//  1．機能
//      システム終了画面に遷移
//  2．戻り値  
//		  なし


//  3．備考


//***************************************************************************
function End()
{
	try{
//2006/04/18 H.SAITO PVCS#1743 -ST-
//    // インジケータポーリングストップ


//	  frmIndicator.Public_StopTimer();
      document.getElementById("frmIndicator").src = "";
      document.getElementById("MenuFrame").src    = "";
      document.getElementById("MainFrame").src    = "";
//2006/04/18 H.SAITO PVCS#1743 -ED-

	  // システム終了画面に遷移
	  EndFrame.location.replace("../CrExam/SystemEnd.aspx");
	 	// ページ表示
		DisplayScreen("EndFrame");	
	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID,FILE_NAME,SPOT_CODE+5);
	}
}

//***************************************************************************
//  ErrorEnd()		
//
//  1．機能
//      エラーの場合システム終了画面に遷移
//  2．戻り値  
//		  なし


//  3．備考


//***************************************************************************
function ErrorEnd()
{
	try{
//2006/04/18 H.SAITO PVCS#1743 -ST-
//    // インジケータポーリングストップ


//	  frmIndicator.Public_StopTimer();
      document.getElementById("frmIndicator").src = "";
      document.getElementById("MenuFrame").src    = "";
      document.getElementById("MainFrame").src    = "";
//2006/04/18 H.SAITO PVCS#1743 -ED-
	  // システム終了画面に遷移
//2005/04/24 003 H.SAITO
//	  EndFrame.location.replace("./CrExam/SystemEnd.aspx");
	  EndFrame.location.replace("./CrExam/SystemEnd.aspx?ExclusiveState=" + ExclusiveState + "&StudySequence=" + StudySequence);
	 	// ページ表示
		DisplayScreen("EndFrame");	

	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID,FILE_NAME,SPOT_CODE+6);
	}
}

//***************************************************************************
//  Close(retVal  0:キャンセル 1:修正完了 2:修正なし)		
//
//  1．機能
//      画面を閉じる
//  2．戻り値  
//		  なし


//  3．備考


//     
//***************************************************************************
function Close(retVal)
{
	try{
		if(retVal==1){
			returnValue = 1;
		}else{
			returnValue = 0;
		}
		// ブラウザ終了



		Exit();
	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID,FILE_NAME,SPOT_CODE+7);
	}

}
//***************************************************************************
//  FunctionReload()		
//
//  1．機能
//      機能フレームの再読み込み
//  2．戻り値  
//		  なし


//  3．備考


//     
//***************************************************************************
function FunctionReload()
{
	try{
	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID,FILE_NAME,SPOT_CODE+8);
	}
}
//***************************************************************************
//  ResizeTo		
//
//  1．機能
//      ブラウザのサイズを変更
//  2．戻り値  
//		  なし


//  3．備考


//     
//***************************************************************************
function ResizeTo(top,left)
{
	try{
	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID,FILE_NAME,SPOT_CODE+9);
	}
}
//***************************************************************************
//  MoveTo(top,left)		
//
//  1．機能
//      ブラウザの表示位置を移動


//  2．戻り値  
//		  なし


//  3．備考


//     
//***************************************************************************
function MoveTo(top,left)
{
	try{
	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID,FILE_NAME,SPOT_CODE+10);
	}
}
//***************************************************************************
//  DisplayScreen()		
//
//  1．機能
//      画面非表示
//		
//  2．戻り値  
//		  なし


//  3．備考


//     
//***************************************************************************
function DisplayScreen(screenId)
    {
    try{

        // screenNoでFunctionと先読みを切り替え


        frmNum = document.getElementsByTagName("iframe").length

        // 画面非表示
        for(i=0; i<frmNum; i++){
            document.getElementsByTagName("iframe")[i].style.width =IFRAME_CTRL_HIDDEN_WIDTH;
            document.getElementsByTagName("iframe")[i].style.height =IFRAME_CTRL_HIDDEN_HEIGHT;
        }

        // 指定したフレームを表示
        ShowFrameById(screenId, IFRAME_CTRL_VISIBLE_WIDTH, IFRAME_CTRL_VISIBLE_HEIGHT);

        //インジケータ表示・非表示
        if(screenId == FRAMEID_ENDFRAME){
			HideFrameById(FRAMEID_INDICATOR);
        }else{
            ShowFrameById(FRAMEID_INDICATOR, IFRAME_VIEW_INDICATOR_WIDTH, IFRAME_VIEW_INDICATOR_HEIGHT);
        }

        // 表示したフレームを設定


        ViewFrame = screenId;
    }
    catch(e){
        top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID,FILE_NAME,SPOT_CODE+11);
    }
}
//*****************************************************************************
// Fn_InitPage
// １．機能
//      ページロード時に、上位に対して読み込み完了を通知する
// ２．戻り値
//　　  なし



// ３．備考



//　　　なし



//*****************************************************************************
function Fn_InitPage(){
	try{
		//読み込むページを設定


		//ページローダ生成
		var loader = new PageLoader();
		//ページ情報追加
		//2014.03.28 V3.0(B) TYK石井 DR装置画面追加 MOD Start
		//loader.AddLoadPage("frmIndicator","./Indicator/Indicator.aspx");
		loader.AddLoadPage("frmIndicator","./Indicator/Indicator.aspx?CurrentView=0");
		//2014.03.28 V3.0(B) TYK石井 DR装置画面追加 MOD End
		loader.AddLoadPage("DispFrame",FrameUrl);
		loader.AddLoadPage("MenuFrame","./CrExam/MenuInfo_Get_Proc.aspx");
		//コールバック設定


		loader.SetAllPageLoadedNotification(ChildPagesLoadedNotification);
		//
		loader.Start();
	}
	catch(e){
    top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID,FILE_NAME,SPOT_CODE+12);
	}
}
//*****************************************************************************
// ChildPagesLoadedNotification
// １．機能
//      下位ページの読み込みが完了した通知



// ２．戻り値
//　　  なし



// ３．備考



//　　　なし



//*****************************************************************************
function ChildPagesLoadedNotification(){
	try{
		// 先読みが終了したらインジケータとファンクションフレーム呼び出し


// 2005/09/22 #1467 H.SAITO FunctionはPageLoaderに対応していないため、読み込み場所を変更 -ST-
////		document.getElementById("frmIndicator").src = "./Indicator/Indicator.aspx";
//		document.getElementById("MainFrame").src = "./CrExam/Function.aspx";
//		document.getElementById("EndFrame").src = "./CrExam/SystemEnd.aspx";
    if(LogoutAuthorityFlag == 1){
		  document.getElementById("MainFrame").src = "./UserAuth/Login.aspx?Url=../CrExam/Function.aspx&IsLogoff=1";
      LogoutAuthorityFlag = 0;
    }else{
		  document.getElementById("MainFrame").src = "./CrExam/Function.aspx";
		  document.getElementById("EndFrame").src  = "./CrExam/SystemEnd.aspx";
    }
// 2005/09/22 #1467 H.SAITO FunctionはPageLoaderに対応していないため、読み込み場所を変更 -ST-
		// 画面表示
		DisplayScreen(FRAMEID_MAINFRAME);
	}
	catch(exception){
    top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID,FILE_NAME,SPOT_CODE+13);
	}
} 
