<%@ Page Language="vb" AutoEventWireup="false" Codebehind="WakeUp.aspx.vb" Inherits="ImageView.ImageView.WakeUp" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title></title>
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Expires" content="-1">
		<meta http-equiv="Content-Type" content="text/html; charset=Shift_JIS">
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"></SCRIPT>
		<SCRIPT language="JavaScript" src="../Include/PageLoader.js"></SCRIPT>
		<SCRIPT language="JavaScript" src="../Include/Main.js"></SCRIPT>
		<SCRIPT language="JavaScript" src="../Include/MainCommon.js"></SCRIPT>
		<SCRIPT language="JavaScript" src="ImageViewMain/Information/Include/Information_View.js"></SCRIPT>
		<script language="javascript" src="../Include/MessageWindow.js"></script>
		<SCRIPT language="JavaScript" src="ImageViewMain/Information/Include/Control.js"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/FixToKB912945.js" CHARSET="UTF-8"></SCRIPT>
		<!-- //****************************************************************************//-->
		<!-- //                                                                            //-->
		<!-- //  @file WakeUp.aspx                                                         //-->
		<!-- //                                                                            //-->
		<!-- //  @brief 画像参照制御クライントスクリプト(JavaScript)                       //-->
		<!-- //                                                                            //-->
		<!-- //         (1) 画像参照制御コントロールを使用して画像参照本体ブラウザの起動   //-->
		<!-- //             表示要求を管理するコントロール。                               //-->
		<!-- //                                                                            //-->
		<!-- //  @author YSK鈴野                                                           //-->
		<!-- //                                                                            //-->
		<!-- //  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.     //-->
		<!-- //                                                                            //-->
		<!-- //         更新履歴  担当        Ver.       内容                              //-->
		<!-- //  -----  --------  ----------  --------   -------------------------------   //-->
		<!-- //  @date  05/07/07  YSK鈴野     00-01      新規作成                          //-->
		<!-- //  @date  05/07/12  YSK鈴野     00-02      MT不具合対応 (ErrorHandling対応)  //-->
		<!-- //  @date  06/11/01  HSK山本     1.4        CR検査部構造見直し[4]対応         //-->
		<!-- //  @date  07/05/23  HSK黒田     2.0        PVCS#2137                         //-->
		<!-- //  @date  08/10/22  HSK菅原     5.0        V5.0プリセット対応                //-->
		<!-- //  @date  09/07/27  FF 星野     V6.0       インジケーター切り離し対応        //-->
		<!-- //  @date  09/09/02  FF 奥野     V6.0       画像参照部ロック機能対応          //-->
		<!-- //  @date  09/09/08  FF 奥野     V6.0       画像参照部のログアウト時最小化対応//-->
        <!-- //                                                                            //-->                                                                
		<!-- //****************************************************************************//-->
		<SCRIPT type="text/javascript">
		<!--
			var status = " " ; // 20070523 HSK黒田 PVCS#2137 全角スペースを半角スペースに変更
			var dotti = 0 ;

			var strErrLevel     = "" ;
			var strErrSrc       = "" ;
			var intErrSpotCode  = 0  ;
			var strErrInfo      = "" ;
			var strErrMsg       = "" ;
			var strErrMsg2      = "" ;
			var strErrCmd       = "" ;

			var strErrSrc        ="ImageView/WakeUp.aspx";
			//************************************
			//リサイズが行われたとき呼び出すメソッドの定義
			//************************************
		    window.onresize = ResizeFunc;

			//************************************
			//インジケータを非表示にする
			//************************************
			//2009.07.27 FF 星野 インジケーター切り離し対応 DEL
			//parent.document.all('frmIndicator').src = 'about:blank';

			//************************************
			//マウスダウンイベントの登録
			//************************************
			if(document.all || document.getElementById)
			{
				document.onmousedown = RightClick;
			}
			else if(document.layers)
			{
				window.captureEvents(Event.MOUSEDOWN);
				window.onmousedown = RightClick;
			}

			//************************************
			// マウスダウンイベント処理
			//************************************
			function RightClick(e)
			{
				if(document.all || document.getElementById)
				{
					if(event.button & 2)
					{
						return(false);
					}
				}
				else if(document.layers)
				{
					if(e.which == 3)
					{
						return(false);
					}
				}
			}

			//************************************
			// キーダウンイベント処理
			//************************************
			function key_down(e)
			{
				event.returnValue = false;
				if(navigator.platform.indexOf("Win")!=-1)
				{
					if((document.layers) && (e.which==3 || e.which==0))
					{
						dotti=1;
					}
					else if((document.getElementById) && (!document.all))
					{
						if(e.which==3 || e.which==0)
						{
							dotti=1;
						}
					}
					else if(document.all)
					{
						if(event.button==2 || event.button==21 || event.button==85)
						{
							dotti=1;
						}
						else if((event.ctrlKey) || (event.shiftKey))
						{
							dotti=1;
						}
					}
					if(dotti==1)
					{
						dotti=0;
					}
				}
				return(false);
			}

			if(document.layers)
			{
				document.captureEvents(Event.KEYDOWN,Event.KEYPRESS,Event.MOUSEDOWN);
			}

			document.onkeydown=key_down;
			document.onkeypress=key_down;
			document.onmousedown=key_down;

			//************************************
			// 入力キーコード無効化処理
			//************************************
			function getkeycode(code)
			{
				if(112 <= code & code <= 123)
				{
					event.keyCode = 0;
					return false;
				}
				else
				{
					return true;
				}
			}

			//************************************
			// インジケータiフレームの表示
			//************************************
			function ViewIndicator()
			{
				// インジケータを表示にする
				parent.document.all('frmIndicator').style.visibility='visible';
			}

			//************************************
			// ブラウザリサイズ処理
			//************************************
		    function ResizeFunc()
		    {
				var width;
				var height;

				if(document.all)
				{
					// 横幅・縦幅のウィンドウサイズの1/4を取得
					width = document.all("vwWakeUpGUI").style.width = document.body.clientWidth;
					height = document.all("vwWakeUpGUI").style.height = document.body.clientHeight;
				}
				else if(document.getElementById)
				{
					// 横幅・縦幅のウィンドウサイズの1/4を取得
					width = document.getElementById("vwWakeUpGUI").style.width = window.innerWidth;
					height = document.getElementById("vwWakeUpGUI").style.height = window.innerHeight;
				}
		    }

			//************************************************************
			//OnBodyLoad（ロード時のハンドラ）
			//
			//１．機能
			//　　画像参照呼び出しaspxのロード時のハンドラ。
			//
			//２．引数    なし
			//
			//３．戻り値  (long) 0:正常 , 0以外:異常
			//
			//４．備考
			//************************************************************
			function OnBodyLoad(type)
			{
				try
				{
// 2007-11-07 MOD 1LINE PVCS#2517対応 変数名変更
//					var lBrowserMini;
					var lWakeUpStartType

//HBT-V1.2-0000-20060307-DEL-START-PVCS-#1733
					//var strQueryText;
					//var lBrowserClose;
//HBT-V1.2-0000-20060307-DEL-END  -PVCS-#1733

					//*** リサイズ設定を行う。
					ResizeFunc();

					//*** 画像参照制御コントロールの初期化処理を呼び出す。
					//*** 返却値 0:正常 , 0以外:異常
// 2007-11-07 MOD 1LINE PVCS#2517対応 変数名変更
//					lBrowserMini = 0;
					lWakeUpStartType = 0;
					lBrowserClose = 0;
					if ( type == "VIEW" )
					{
// 2007-11-07 MOD 1LINE PVCS#2517対応 変数名変更
//						lBrowserMini = 1;
						lWakeUpStartType = 1;
					}
// 2007-11-07 ADD START PVCS#2517対応
					//*** 初期起動の場合lWakeUpStartTypeに２(文字列取得を行わない)を設定する。
					else
					if ( type == "NONE" )
					{
						lWakeUpStartType = 2;
					}
// 2007-11-07 ADD END   PVCS#2517対応

// 2007-11-07 MOD 1LINE PVCS#2517対応
//					if (Initialize(lBrowserMini) != 0 )
					if (Initialize(lWakeUpStartType) != 0 )
					{
						//*** ErrorHandling
						//*** 初期化エラー
						strErrLevel      ="<%= m_strInitErrLevel %>";
						intErrSpotCode   = 1000 ;
						strErrInfo       ="<%= m_strInitErrInfo %>";
						strErrMsg        ="<%= m_strInitErrMsg %>";
						strErrMsg2       ="<%= m_strInitErrMsg2 %>";
						strErrCmd        ="<%= m_strInitErrCmd %>";
						top.parent.Public_ErrorDialog(strErrLevel,strErrSrc,intErrSpotCode,strErrInfo,strErrMsg,strErrMsg2,strErrCmd);
						return -1;
					}

					if( type == "VIEW" )
					{
						//*** 画像表示要求メソッドの呼び出しを行う。
						//*** 引数には、サーバからクエリ文字列として設定されている
						//*** 文字列をそのまま設定する。
						//*** m_UserID      : ログインID
						//*** m_UserTime    : ログイン時間
						//*** m_QueryString : クエリ情報
						ViewImages(	"<%= m_UserID %>",
									"<%= m_UserTime %>",
									"<%= m_QueryString %>" ) ;
//HBT-V1.2-0000-20060307-DEL-START-PVCS-#1733
						//strQueryText = "<%= m_QueryString %>" ;
						//lBrowserClose = strQueryText.indexOf("&LoginID=", 0 );
						//if (lBrowserClose != -1 )
						//{
						//	lBrowserClose  = 0 ;
						//	//*** 自分自身のブラウザを閉じる。
						//	parent.top.WakeUpStartedUp();
						//}
//HBT-V1.2-0000-20060307-DEL-END  -PVCS-#1733
					}
					else
					if( type == "WAKEUP" )
					{
						//*** 画像参照本体の起動
						if (WakeUp() != 0 )
						{
							//*** ErrorHandling
							//*** 初期化エラー
							strErrLevel      ="<%= m_strInitErrLevel %>";
							intErrSpotCode   = 1001 ;
							strErrInfo       ="<%= m_strInitErrInfo %>";
							strErrMsg        ="<%= m_strInitErrMsg %>";
							strErrMsg2       ="<%= m_strInitErrMsg2 %>";
							strErrCmd        ="<%= m_strInitErrCmd %>";
							top.parent.Public_ErrorDialog(strErrLevel,strErrSrc,intErrSpotCode,strErrInfo,strErrMsg,strErrMsg2,strErrCmd);
							return -1;
						}
					}
					else
					{
						//*** なにもしない。
						return 0;
					}

//HBT-V.0-0000-20050831 PVCS #1324 DEL ST -----------------------------------------
//					//*** 自分自身のブラウザを閉じる。
//					parent.top.WakeUpStartedUp();
//HBT-V.0-0000-20050831 PVCS #1324 DEL ED -----------------------------------------

					return 0;

				}
				catch( e )
				{
					//*** ErrorHandling
					//*** 例外エラー
					strErrLevel      ="<%= m_strExceptionErrLevel %>";
					intErrSpotCode   = 1002 ;
					strErrInfo       ="<%= m_strExceptionErrInfo %>";
					strErrMsg        ="<%= m_strExceptionErrMsg %>";
					strErrMsg2       ="<%= m_strExceptionErrMsg2 %>";
					strErrCmd        ="<%= m_strExceptionErrCmd %>";
					top.parent.Public_ErrorDialog(strErrLevel,strErrSrc,intErrSpotCode,strErrInfo,strErrMsg,strErrMsg2,strErrCmd);
					return -1;
				}
			}

			//************************************************************
			//Initialize（画像参照制御コントロール初期化）
			//
			//１．機能
			//    画像参照制御コントロール初期化を行う。
			//
			//２．引数
			//            2007-11-07 PVCS#2517対応
			//            [変更前]lBrowserMini : ブラウザ最小化On/Off(0:Off,1:On)
			//            [変更後]lWakeUpStartType : WakeUp.aspx の起動タイプ(0: WAKEUP、1: VIEW、2: NONE)
			//
			//３．戻り値  (long) 0:正常 , 0以外:異常
			//
			//４．備考
			//************************************************************
// 2007-11-07 MOD 1LINE PVCS#2517対応
//			function Initialize(lBrowserMini)
			function Initialize(lWakeUpStartType)
			{
				try
				{

					//↓HBT-V1.0-0000-20050727 ADD -------------------------------------------
					// 直接URL/CR検査からの初期化要求時
					//*** 画像参照制御コントロールにユーザIDの設定（プロパティ）
					if ( "<%= m_UserID %>" != "" )
					{
						vwWakeUpGUI.SetUserID( "<%= m_UserID %>" );
					}

					//*** 画像参照制御コントロールにログイン時間の設定（プロパティ）
					if ( "<%= m_UserTime %>" != "" )
					{
						vwWakeUpGUI.SetLoginTime( "<%= m_UserTime %>" );
					}
					//↑HBT-V1.0-0000-20050727 ADD -------------------------------------------

					//*** 画像参照制御コントロールにサーバ側で取得したWebサービス接続URL
					//*** を設定する。
					vwWakeUpGUI.SetWebServiceURL(	"<%= m_strDBAccessBase %>", 
													"<%= m_strDeliveryService %>", 
													"<%= m_strGeneralService %>", 
													"<%= m_strMasterInfoService %>", 
													"<%= m_strMediaService %>", 
													"<%= m_strStudyInfoService %>", 
													"<%= m_strTransferFileService %>", 
													"<%= m_strCertificationService %>",
													"<%= m_strPresetService %>" );		// HBT-V5.0-0000-20081022 HSK菅原 ADD

					//*** 画像参照制御コントロールの初期化処理を呼び出す。
					//*** 返却値 0:正常 , 0以外:異常
// 2007-11-07 MOD 1LINE PVCS#2517対応
//					return vwWakeUpGUI.Initialize(lBrowserMini);
					return vwWakeUpGUI.Initialize(lWakeUpStartType);

				}
				catch( e )
				{
					//*** ErrorHandling
					//*** 例外エラー
					strErrLevel      ="<%= m_strExceptionErrLevel %>";
					intErrSpotCode   = 1010 ;
					strErrInfo       ="<%= m_strExceptionErrInfo %>";
					strErrMsg        ="<%= m_strExceptionErrMsg %>";
					strErrMsg2       ="<%= m_strExceptionErrMsg2 %>";
					strErrCmd        ="<%= m_strExceptionErrCmd %>";
					top.parent.Public_ErrorDialog(strErrLevel,strErrSrc,intErrSpotCode,strErrInfo,strErrMsg,strErrMsg2,strErrCmd);
					return -1;
				}
			}

			//************************************************************
			//WakeUp（画像参照画面本体の起動）
			//
			//１．機能
			//　　画像参照画面本体の起動を行う。
			//
			//２．引数    なし
			//
			//３．戻り値  なし
			//
			//４．備考
			//************************************************************
			function WakeUp()
			{
				var lRet ; //HBT-V1.0-0000-20050722-ADD-END-PVCS-#866
				try
				{
                    //HBT-V1.0-0000-20050722-ADD-START-PVCS-#866
					// return vwWakeUpGUI.WakeUpAsync();

					//*** 画像参照画面本体の起動を行う。
					lRet = vwWakeUpGUI.WakeUpAsync();
     			    window.focus(); // 上に表示するようにする。
					return lRet;
                    //HBT-V1.0-0000-20050722-ADD-END-PVCS-#866

				}
				catch( e )
				{
					//*** ErrorHandling
					//*** 例外エラー
					strErrLevel      ="<%= m_strExceptionErrLevel %>";
					intErrSpotCode   = 1020 ;
					strErrInfo       ="<%= m_strExceptionErrInfo %>";
					strErrMsg        ="<%= m_strExceptionErrMsg %>";
					strErrMsg2       ="<%= m_strExceptionErrMsg2 %>";
					strErrCmd        ="<%= m_strExceptionErrCmd %>";
					top.parent.Public_ErrorDialog(strErrLevel,strErrSrc,intErrSpotCode,strErrInfo,strErrMsg,strErrMsg2,strErrCmd);
					return -1;
				}
			}

			//************************************************************
			//Shutdown（画像参照画面本体の終了）
			//
			//１．機能
			//　　画像参照画面本体の終了を行う。
			//
			//２．引数    なし
			//
			//３．戻り値  なし
			//
			//４．備考
			//************************************************************
			function Shutdown()
			{
				try
				{
					//*** 画像参照画面本体の終了を行う。
					return vwWakeUpGUI.Shutdown();

				}
				catch( e )
				{
					//*** ErrorHandling
					//*** 例外エラー
					strErrLevel      ="<%= m_strExceptionErrLevel %>";
					intErrSpotCode   = 1030 ;
					strErrInfo       ="<%= m_strExceptionErrInfo %>";
					strErrMsg        ="<%= m_strExceptionErrMsg %>";
					strErrMsg2       ="<%= m_strExceptionErrMsg2 %>";
					strErrCmd        ="<%= m_strExceptionErrCmd %>";
					top.parent.Public_ErrorDialog(strErrLevel,strErrSrc,intErrSpotCode,strErrInfo,strErrMsg,strErrMsg2,strErrCmd);
					return -1;
				}
			}

			//************************************************************
			//ViewImages（画像参照画面本体への表示要求）
			//
			//１．機能
			//　　画像参照画面本体に表示要求を行う。
			//
			//２．引数    Userid      : ユーザID文字列
			//            Usertime    : ログイン時間文字列
			//            Querystring : クエリ文字列
			//
			//３．戻り値  なし
			//
			//４．備考    なし
			//************************************************************
			function ViewImages(Userid , Usertime , Querystring)
			{
				try
				{
					//*** 画像参照画面本体に表示要求を行う。
					return vwWakeUpGUI.ViewImages(Userid , Usertime , Querystring);

				}
				catch( e )
				{
					//*** ErrorHandling
					//*** 例外エラー
					strErrLevel      ="<%= m_strExceptionErrLevel %>";
					intErrSpotCode   = 1040 ;
					strErrInfo       ="<%= m_strExceptionErrInfo %>";
					strErrMsg        ="<%= m_strExceptionErrMsg %>";
					strErrMsg2       ="<%= m_strExceptionErrMsg2 %>";
					strErrCmd        ="<%= m_strExceptionErrCmd %>";
					top.parent.Public_ErrorDialog(strErrLevel,strErrSrc,intErrSpotCode,strErrInfo,strErrMsg,strErrMsg2,strErrCmd);
					return -1;
				}
			}

			//電子カルテ連携（画像クリア機能）S1生田 20060721 UPDATE START -----------------------------------------------------
			//************************************************************
			//ClearImages（画像参照画面本体への表示消去要求）
			//
			//１．機能
			//　　画像参照画面本体に表示消去要求を行う。
			//
			//２．引数    Userid      : ユーザID文字列
			//            Usertime    : ログイン時間文字列
			//
			//３．戻り値  なし
			//
			//４．備考    なし
			//************************************************************
			function ClearImages(Userid , Usertime)
			{
				try
				{
					//*** 画像参照画面本体に表示消去要求を行う。
					return vwWakeUpGUI.ClearImages(Userid , Usertime);

				}
				catch( e )
				{
					//*** ErrorHandling
					//*** 例外エラー
					strErrLevel      ="<%= m_strExceptionErrLevel %>";
					intErrSpotCode   = 1080 ;
					strErrInfo       ="<%= m_strExceptionErrInfo %>";
					strErrMsg        ="<%= m_strExceptionErrMsg %>";
					strErrMsg2       ="<%= m_strExceptionErrMsg2 %>";
					strErrCmd        ="<%= m_strExceptionErrCmd %>";
					top.parent.Public_ErrorDialog(strErrLevel,strErrSrc,intErrSpotCode,strErrInfo,strErrMsg,strErrMsg2,strErrCmd);
					return -1;
				}
			}
			//電子カルテ連携（画像クリア機能）S1生田 20060721 UPDATE END   -----------------------------------------------------

			//************************************************************
			//ImageViewInit（初期化要求－検査リストからの呼び出し）
			//
			//１．機能
			//　　初期化要求。
			//
			//２．引数    Userid      : ユーザID文字列
			//            Usertime    : ログイン時間文字列
			//
			//３．戻り値  なし
			//
			//４．備考    検査リストからの呼び出しで使用される。
			//************************************************************
			function ImageViewInit(userId, loginTime)
			{
				try
				{
					//*** インジケータの表示指示。
					//2009.07.27 FF 星野 インジケーター切り離し対応 DEL
					//ViewIndicator() ;

					//↓HBT-V1.0-0000-20050727 ADD -------------------------------------------
					// 検査リストからの初期化要求時
					//*** 画像参照制御コントロールにユーザIDの設定（プロパティ）
					vwWakeUpGUI.SetUserID( userId );

					//*** 画像参照制御コントロールにログイン時間の設定（プロパティ）
					vwWakeUpGUI.SetLoginTime( loginTime );
					//↑HBT-V1.0-0000-20050727 ADD -------------------------------------------

					//*** 画像参照本体の起動
					return WakeUp();

				}
				catch( e )
				{
					//*** ErrorHandling
					//*** 例外エラー
					strErrLevel      ="<%= m_strExceptionErrLevel %>";
					intErrSpotCode   = 1050 ;
					strErrInfo       ="<%= m_strExceptionErrInfo %>";
					strErrMsg        ="<%= m_strExceptionErrMsg %>";
					strErrMsg2       ="<%= m_strExceptionErrMsg2 %>";
					strErrCmd        ="<%= m_strExceptionErrCmd %>";
					top.parent.Public_ErrorDialog(strErrLevel,strErrSrc,intErrSpotCode,strErrInfo,strErrMsg,strErrMsg2,strErrCmd);
					return -1;
				}
			}

			//************************************************************
			//ImageViewRequest（画像表示要求－検査リストからの呼び出し）
			//
			//１．機能
			//　　画像表示要求。
			//
			//２．引数    Userid      : ユーザID文字列
			//            Usertime    : ログイン時間文字列
			//            Querystring : クエリ文字列
			//
			//３．戻り値  なし
			//
			//４．備考    検査リストからの呼び出しで使用される。
			//************************************************************
			function ImageViewRequest(Userid , Usertime , Querystring)
			{
				try
				{
					//*** 画像参照画面本体に表示要求を行う。
					return ViewImages(Userid , Usertime , Querystring);

				}
				catch( e )
				{
					//*** ErrorHandling
					//*** 例外エラー
					strErrLevel      ="<%= m_strExceptionErrLevel %>";
					intErrSpotCode   = 1060 ;
					strErrInfo       ="<%= m_strExceptionErrInfo %>";
					strErrMsg        ="<%= m_strExceptionErrMsg %>";
					strErrMsg2       ="<%= m_strExceptionErrMsg2 %>";
					strErrCmd        ="<%= m_strExceptionErrCmd %>";
					top.parent.Public_ErrorDialog(strErrLevel,strErrSrc,intErrSpotCode,strErrInfo,strErrMsg,strErrMsg2,strErrCmd);
					return -1;
				}
			}

			//電子カルテ連携（画像クリア機能）S1生田 2006/07/21 UPDATE START -------------------------------------------------------
			//************************************************************
			//ImageClearRequest（画像消去要求－検査リストからの呼び出し）
			//
			//１．機能
			//　　画像表示要求。
			//
			//２．引数    Userid      : ユーザID文字列
			//            Usertime    : ログイン時間文字列
			//
			//３．戻り値  なし
			//
			//４．備考    検査リストからの呼び出しで使用される。
			//************************************************************
			function ImageClearRequest(Userid , Usertime)
			{
				try
				{
					//*** 画像参照画面本体に表示要求を行う。
					return ClearImages(Userid , Usertime);

				}
				catch( e )
				{
					//*** ErrorHandling
					//*** 例外エラー
					strErrLevel      ="<%= m_strExceptionErrLevel %>";
					intErrSpotCode   = 1090 ;
					strErrInfo       ="<%= m_strExceptionErrInfo %>";
					strErrMsg        ="<%= m_strExceptionErrMsg %>";
					strErrMsg2       ="<%= m_strExceptionErrMsg2 %>";
					strErrCmd        ="<%= m_strExceptionErrCmd %>";
					top.parent.Public_ErrorDialog(strErrLevel,strErrSrc,intErrSpotCode,strErrInfo,strErrMsg,strErrMsg2,strErrCmd);
					return -1;
				}
			}
			//電子カルテ連携（画像クリア機能）S1生田 2006/07/21 UPDATE END   -------------------------------------------------------

			//************************************************************
			//ImageViewExit（画像参照終了要求－検査リストからの呼び出し）
			//
			//１．機能
			//　　画像参照終了要求。
			//
			//２．引数    なし
			//
			//３．戻り値  なし
			//
			//４．備考    検査リストからの呼び出しで使用される。
			//************************************************************
			function ImageViewExit()
			{
				try
				{
					//*** 画像参照画面本体の終了を行う。
					return Shutdown();

				}
				catch( e )
				{
					//*** ErrorHandling
					//*** 例外エラー
					strErrLevel      ="<%= m_strExceptionErrLevel %>";
					intErrSpotCode   = 1070 ;
					strErrInfo       ="<%= m_strExceptionErrInfo %>";
					strErrMsg        ="<%= m_strExceptionErrMsg %>";
					strErrMsg2       ="<%= m_strExceptionErrMsg2 %>";
					strErrCmd        ="<%= m_strExceptionErrCmd %>";
					top.parent.Public_ErrorDialog(strErrLevel,strErrSrc,intErrSpotCode,strErrInfo,strErrMsg,strErrMsg2,strErrCmd);
					return -1;
				}
			}
			//V6.0 画像参照部表示ロック機能対応 FF奥野 20090902 ADD START -----------------------------------------------------
			//************************************************************
			//LockImageView（画像参照画面本体への表示ロック要求）
			//
			//１．機能
			//　　画像参照画面本体に表示ロック要求を行う。
			//
			//２．引数    Userid      : ユーザID文字列
			//            Usertime    : ログイン時間文字列
			//            Command     : 画面操作識別用のID
			//
			//３．戻り値  なし
			//
			//４．備考    なし
			//************************************************************
			function LockImageView(Userid , Usertime, Command)
			{
				//alert("LockImageView");
				try
				{
					//*** 画像参照画面本体に表示消去要求を行う。
					return vwWakeUpGUI.LockImageView(Userid , Usertime, String(Command));

				}
				catch( e )
				{
					//*** ErrorHandling
					//*** 例外エラー
					strErrLevel      ="<%= m_strExceptionErrLevel %>";
					intErrSpotCode   = 1081 ;
					strErrInfo       ="<%= m_strExceptionErrInfo %>";
					strErrMsg        ="<%= m_strExceptionErrMsg %>";
					strErrMsg2       ="<%= m_strExceptionErrMsg2 %>";
					strErrCmd        ="<%= m_strExceptionErrCmd %>";
					top.parent.Public_ErrorDialog(strErrLevel,strErrSrc,intErrSpotCode,strErrInfo,strErrMsg,strErrMsg2,strErrCmd);
					return -1;
				}
			}
			//************************************************************
			//UnlockImageView（画像参照画面本体への表示ロック要求）
			//
			//１．機能
			//　　画像参照画面本体に表示ロック要求を行う。
			//
			//２．引数    Userid      : ユーザID文字列
			//            Usertime    : ログイン時間文字列
			//
			//３．戻り値  なし
			//
			//４．備考    なし
			//************************************************************
			function UnlockImageView(Userid , Usertime)
			{
				//alert("UnlockImageView");
				try
				{
					//*** 画像参照画面本体に表示消去要求を行う。
					return vwWakeUpGUI.UnlockImageView(Userid , Usertime);

				}
				catch( e )
				{
					//*** ErrorHandling
					//*** 例外エラー
					strErrLevel      ="<%= m_strExceptionErrLevel %>";
					intErrSpotCode   = 1082 ;
					strErrInfo       ="<%= m_strExceptionErrInfo %>";
					strErrMsg        ="<%= m_strExceptionErrMsg %>";
					strErrMsg2       ="<%= m_strExceptionErrMsg2 %>";
					strErrCmd        ="<%= m_strExceptionErrCmd %>";
					top.parent.Public_ErrorDialog(strErrLevel,strErrSrc,intErrSpotCode,strErrInfo,strErrMsg,strErrMsg2,strErrCmd);
					return -1;
				}
			}
			//V6.0 画像参照部表示ロック機能対応 FF奥野 20090902 ADD END -----------------------------------------------------
			//V6.0 画像参照部のログアウト時最小化対応 FF奥野 20090908 ADD START ---------------------------------------------
			//************************************************************
			//MinimizationView（画像参照画面本体への最小化要求）
			//
			//１．機能
			//　　画像参照画面本体に最小化要求を行う。
			//
			//２．引数    Userid      : ユーザID文字列
			//            Usertime    : ログイン時間文字列
			//
			//３．戻り値  なし
			//
			//４．備考    なし
			//************************************************************
			function MinimizationView(Userid , Usertime)
			{
				//alert("MinimizationView");
				try
				{
					//*** 画像参照画面本体に最小化要求を行う。
					return vwWakeUpGUI.MinimizationView(Userid , Usertime);

				}
				catch( e )
				{
					//*** ErrorHandling
					//*** 例外エラー
					strErrLevel      ="<%= m_strExceptionErrLevel %>";
					intErrSpotCode   = 1083 ;
					strErrInfo       ="<%= m_strExceptionErrInfo %>";
					strErrMsg        ="<%= m_strExceptionErrMsg %>";
					strErrMsg2       ="<%= m_strExceptionErrMsg2 %>";
					strErrCmd        ="<%= m_strExceptionErrCmd %>";
					top.parent.Public_ErrorDialog(strErrLevel,strErrSrc,intErrSpotCode,strErrInfo,strErrMsg,strErrMsg2,strErrCmd);
					return -1;
				}
			}
			//************************************************************
			//NormalizationView（画像参照画面本体へのウインドウ標準化要求）
			//
			//１．機能
			//　　画像参照画面本体にウインドウ標準化要求を行う。
			//
			//２．引数    Userid      : ユーザID文字列
			//            Usertime    : ログイン時間文字列
			//
			//３．戻り値  なし
			//
			//４．備考    なし
			//************************************************************
			function NormalizationView(Userid , Usertime)
			{
				try
				{
					//*** 画像参照画面本体に最小化要求を行う。
					return vwWakeUpGUI.NormalizationView(Userid , Usertime);

				}
				catch( e )
				{
					//*** ErrorHandling
					//*** 例外エラー
					strErrLevel      ="<%= m_strExceptionErrLevel %>";
					intErrSpotCode   = 1084 ;
					strErrInfo       ="<%= m_strExceptionErrInfo %>";
					strErrMsg        ="<%= m_strExceptionErrMsg %>";
					strErrMsg2       ="<%= m_strExceptionErrMsg2 %>";
					strErrCmd        ="<%= m_strExceptionErrCmd %>";
					top.parent.Public_ErrorDialog(strErrLevel,strErrSrc,intErrSpotCode,strErrInfo,strErrMsg,strErrMsg2,strErrCmd);
					return -1;
				}
			}
			//V6.0 画像参照部のログアウト時最小化対応 FF奥野 20090908 ADD END ---------------------------------------------
		//-->
		</SCRIPT>
	</HEAD>
	<body oncontextmenu="return false" onkeydown="return getkeycode(event.keyCode)" 
onhelp="return false" leftMargin=0 background=#333333 topMargin=0 
onload="OnBodyLoad('<%= StartUpType %>')" 
MS_POSITIONING="GridLayout">
		<!-- ///////////////////////////////////////-->
		<!--  画像参照起動コンポオブジェクト定義  //-->
		<!-- ///////////////////////////////////////-->

		<!-- PVCS#1796 -->
		<!-- ActiveX更新プログラムKB912945対応 -->
		<SCRIPT LANGUAGE="javascript">
		<!--
		WriteToDocument(
		'<OBJECT id="vwWakeUpGUI" style="Z-INDEX: 101; LEFT: 0px; WIDTH: 384px; POSITION: absolute; TOP: 0px; HEIGHT: 224px"',
			'classid="clsid:D88D1636-0B9F-4686-835B-0641796F7BC9" VIEWASTEXT>',
			'<PARAM NAME="_ExtentX" VALUE="10160">',
			'<PARAM NAME="_ExtentY" VALUE="5927">',
		'</OBJECT>'
		);
		//-->
		</SCRIPT>

		<!-- HBT-V.0-0000-20050831 PVCS #1324 DEL ST ----------------------------------------- -->
		<script language="javascript" charset="UTF-8">
		<!--
//HBT-V1.2-0000-20060307-DEL-START-PVCS-#1733
			//function vwWakeUpGUI::OnWakeUpStartedUp()
			//{
			//	//*** 自分自身のブラウザを閉じる。
			//	parent.top.WakeUpStartedUp();
			//}
//HBT-V1.2-0000-20060307-DEL-END  -PVCS-#1733

//HBT-V1.2-0000-20060307-ADD-START-PVCS-#1733
			function vwWakeUpGUI::OnRecvInitEnd()
			{
				StartedUpProc("WAKEUP")
			}

			function vwWakeUpGUI::OnRecvImageViewRes()
			{
				StartedUpProc("VIEW")
			}

			function vwWakeUpGUI::OnRecvImageViewClose()
			{
				StartedUpProc("VIEW")
			}

			//電子カルテ連携（画像クリア機能）HSK國友 2006/07/24 UPDATE START -----------------------------------------------------
			function vwWakeUpGUI::OnRecvImageClearRes()
			{
                // nothing to do
			}
			//電子カルテ連携（画像クリア機能）HSK國友 2006/07/24 UPDATE END   -----------------------------------------------------
			
			function StartedUpProc(type)
			{
				var CurrentType = "<%= StartUpType %>";

				if( CurrentType == type )
				{
					//*** StartedUp完了
					parent.top.WakeUpStartedUp();
				}
			}
//HBT-V1.2-0000-20060307-ADD-END  -PVCS-#1733
		-->
		</script>
		<!-- HBT-V.0-0000-20050831 PVCS #1324 DEL ED ----------------------------------------- -->
		<form id="Form1" method="post" runat="server">
			<FONT face="MS UI Gothic"></FONT>
		</form>
	</body>
</HTML>
