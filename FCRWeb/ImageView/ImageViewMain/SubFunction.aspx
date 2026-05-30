<%@ Page Language="vb" AutoEventWireup="false" Codebehind="SubFunction.aspx.vb" Inherits="ImageView.ImageViewMain.SubFunction" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title></title>
		<meta name="GENERATOR" content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" content="Visual Basic .NET 7.1">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<META http-equiv="Content-Type" content="text/html; charset=shift_jis">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Expires" content="-1">
		<meta http-equiv="Cache-Control" content="no-cache">
		<SCRIPT LANGUAGE="JavaScript" SRC="Information/Include/Information_View.js"></SCRIPT>
	    <SCRIPT LANGUAGE="JavaScript" SRC="../../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="../../Include/PageLoader.js"></SCRIPT>
		<SCRIPT language="JavaScript" src="../../Include/Main.js"></SCRIPT>
		<SCRIPT language="JavaScript" src="../../Include/MainCommon.js"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="Information/Include/Control.js"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="../../Include/FixToKB912945.js" CHARSET="UTF-8"></SCRIPT>
		<!-- //****************************************************************************//-->
		<!-- //                                                                            //-->
		<!-- //  @file SubFunction.aspx                                                    //-->
		<!-- //                                                                            //-->
		<!-- //  @brief SubFunction                                                        //-->
		<!-- //                                                                            //-->
		<!-- //  @author HSK山本                                                           //-->
		<!-- //                                                                            //-->
		<!-- //  Copyright(C) 2004-2007 FUJIFILM Corporation All rights reserved.          //-->
		<!-- //                                                                            //-->
		<!-- //         更新履歴  担当        Ver.       内容                              //-->
		<!-- //  -----  --------  ----------  --------   -------------------------------   //-->
		<!-- //  @date  06/11/01  HSK山本     1.4        CR検査部構造見直し[4]対応         //-->
		<!-- //  @date  07/04/13  HSK平尾     2.0        IE7対応                           //-->
		<!-- //  @date  07/05/23  HSK黒田     2.0        PVCS#2137                         //-->
		<!-- //  @date  08/11/19  HSK高橋     5.0        PVCS#2972                         //-->
		<!-- //  @date  09/07/27  FF 星野     V6.0       インジケーター切り離し対応        //-->
		<!-- //  @date  09/08/19  FF 奥野     V6.0       初回起動時Normal化対応            //-->
		<!-- //  @date  09/11/20  FF 星野     V1.1(B)    動物対応                          //-->
		<!-- //  @date  10/10/13  FF 小林     V2.1(B)    Dimpl→CIP対応                    //-->
		<!-- //                                                                            //-->		
		<!-- //****************************************************************************//-->
		<!-- ///////////////////////////////////////-->
		<!--  ブラウザ制御スクリプト              //-->
		<!-- ///////////////////////////////////////-->
		<SCRIPT TYPE="text/javascript">
		<!--
			var win = 0; // 説明文ウインドウハンドル
			//ユーザ認証　ユーザ認証画面ブラウザウインドウ


			//説明文利用　ブラウザウインドウアクティブ処理
			function WinTextInfoView()
			{
					// 既に説明文ウインドウが開いているとき
	                if (win != 0)
					{
						win.focus();
					}
			}

			//説明文利用　ブラウザウインドウ
			function WinTextInfoClose(strValue)
			{
				// 既に説明文ウインドウが開いているときは、閉じる
		                if (win != 0)
				{
					// 20070413 HSK平尾 V2.0 IE7対応 D Start 
					// win.close();
					// 20070413 HSK平尾 V2.0 IE7対応 D End 
					// 20070413 HSK平尾 V2.0 IE7対応 A Start
					WU_CloseWindow(win);
					// 20070413 HSK平尾 V2.0 IE7対応 A End 
					win=0;
				}
			}

			function WinOpen(strValue)
			{
				window.open(strValue,'NewIvWin','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=800,height=600');
			}

			//説明文利用　ブラウザウインドウ
			function WinOpen2(strValue)
			{
				// 既に説明文ウインドウが開いているときは、一度閉じてから開く
				if (win != 0)
				{
					// 20070413 HSK平尾 V2.0 IE7対応 D Start 
					// win.close();
					// 20070413 HSK平尾 V2.0 IE7対応 D End 
					// 20070413 HSK平尾 V2.0 IE7対応 A Start
					WU_CloseWindow(win);
					// 20070413 HSK平尾 V2.0 IE7対応 A End 
					win=0;
				}
				win=window.open(strValue,'NewIvWin2','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=590,height=200');
				win.focus(); // 説明文ウインドウは最初、上に表示するようにする。
			}

			//インジケータ情報設定
			function SetUserInfo(strValueUserID,strValueLoginTime)
			{
				top.SetUserInfomation( strValueUserID, strValueLoginTime );
			}

			//画像参照メインブラウザタイトル設定
			function WinTitle(strValue)
			{
				top.document.title = strValue;
			}

			if(document.all || document.getElementById)
			{
				document.onmousedown = RightClick;
			}
			else if(document.layers)
			{
				window.captureEvents(Event.MOUSEDOWN);
				window.onmousedown = RightClick;
			}
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
			status=" "; // 20070523 HSK黒田 PVCS#2137 全角スペースを半角スペースに変更
			dore="";
			dotti=0;
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

			//document.onkeydown=true;
			//document.onkeydown=key_down;
			//document.onkeypress=true;
			//document.onkeypress=key_down;
			document.onmousedown=key_down;

			function getkeycode(code)
			{
				if(event.ctrlKey && event.keyCode == 79)
				{
					event.keyCode = 0;
					return false;
				}
				if(event.ctrlKey && event.keyCode == 80)
				{
					event.keyCode = 0;
					return false;
				}
				if(event.ctrlKey && event.keyCode == 70)
				{
					event.keyCode = 0;
					return false;
				}
				//if(code == 70)
				//{
				//	event.keyCode = 0;
				//	return false;
				//}
				else if(112 <= code & code <= 123)
				{
					event.keyCode = 0;
					return false;
				}
				else
				{
					return true;
				}
			}
			function ExitImageView()
			{
				try
				{
					// 確認ダイアログの表示を防ぐ

					if( document.all )
					{
						window.opener = true;
					}
					// ブラウザを閉じる
					//window.close();
					parent.Exit();
				}
				catch(e)
				{
					Public_Error( FATAL_ERROR, "Exit Exception" );
				}
			}

		//-->
		</SCRIPT>
	</HEAD>
	<!--2009.07.27 FF 星野 インジケーター切り離し対応 DEL
	<body topmargin="0" leftmargin="0" background ="#333333" MS_POSITIONING="GridLayout" onload="SetLoginInfo();<% IVMainInit() %>;Initialize()" oncontextmenu="return false" onHelp="return false" onKeyDown="return getkeycode(event.keyCode)">
	-->
	<body topmargin="0" leftmargin="0" background ="#333333" MS_POSITIONING="GridLayout" onload="<% IVMainInit() %>;Initialize()" oncontextmenu="return false" onHelp="return false" onKeyDown="return getkeycode(event.keyCode)">

		<!-- PVCS#1796 -->
		<!-- ActiveX更新プログラムKB912945対応 -->
		<SCRIPT LANGUAGE="javascript">
		<!--
		WriteToDocument(
		'<OBJECT CLASSID = "clsid:5220cb21-c88d-11cf-b347-00aa00a28331">',
		    '<PARAM NAME="LPKPath" VALUE="../ImageView.lpk">',
		'</OBJECT>'
		);
		//-->
		</SCRIPT>

		<!-- ///////////////////////////////////////-->
		<!--  画像参照本体コンポオブジェクト定義  //-->
		<!-- ///////////////////////////////////////-->

		<!-- PVCS#1796 -->
		<!-- ActiveX更新プログラムKB912945対応 -->
		<%-- 20101013 Dimpl→CIP 
		<SCRIPT LANGUAGE="javascript">
		<!--
		WriteToDocument(
		'<OBJECT id="IVMainCtrl" style="Z-INDEX: 101; LEFT: 0px; WIDTH: 300px; POSITION: absolute; TOP: 0px; HEIGHT: 300px"',
			'classid="clsid:1AB2C215-08D3-4D39-9721-CC586B68C595" VIEWASTEXT>',
			'<PARAM NAME="_ExtentX" VALUE="7938">',
			'<PARAM NAME="_ExtentY" VALUE="7938">',
		'</OBJECT>'
		);
		//-->
		</SCRIPT>
		--%>

		<!-- ///////////////////////////////////////-->
		<!--  画像参照本体コンポ制御スクリプト    //-->
		<!-- ///////////////////////////////////////-->
		<SCRIPT language="vbs">
			Dim gm_UserID
			Dim gm_LoginTime
			Dim gm_ChangeImage
			'************************************************************
			'画像参照コンポーネントI/F(メソッド)
			' SetProcID ： プロセスID設定　プロパティ
			'------------------------------------------------------------
			' [機能概要]
			'   画像参照コンポーネントに対してプロセスIDの設定を行う
			'
			' [パラメータ]
			' strProcID As string	[in]	プロセスIDアプリケーション変数
			'
			' [戻り値]
			'   なし
			'
			' [備考]
			'
			'************************************************************
			Sub SetProcID (strProcID)
				IVMainCtrl.ProcID = strProcID
			End Sub

			'************************************************************
			'画像参照コンポーネントI/F(メソッド)
			' Initialize ： 画像参照コンポ初期化処理
			'------------------------------------------------------------
			' [機能概要]
			'   画像参照コンポーネントに対して初期化処理指示を行う
			'
			' [パラメータ]
			'
			' [戻り値]
			'   なし
			'
			' [備考]
			'
			'************************************************************
			Sub Initialize
				Dim strProcessID
				Dim strSrcInfo
				
				strProcessID = <%= Session.Contents("ProcID") %>

				call SetProcID(strProcessID)

				IVMainCtrl.InitPipeCreate
				'--------------------------------------------
				' 画像参照コントロールが初期化（プロセス間通信コンポ生成)完了のため
				' アプリケーション変数IVMainCallを0に設定する
				'--------------------------------------------
				<% Application.Lock %>
				<% Application.Contents("IVMainCall") = "0" %>
				<% Application.UnLock %>

				' 200704 HSK平尾 V2.0 IE7対応 D Start
				' IVMainCtrl.ResizeControl
				' 200704 HSK平尾 V2.0 IE7対応 D End
				' 200704 HSK平尾 V2.0 IE7対応 A Start
				 IVMainCtrl.ResizeControl document.body.clientWidth, document.body.clientHeight
				' 200704 HSK平尾 V2.0 IE7対応 D Start

				'▼▼▼HBT-V1.0-0000-20050901 ブラウザサイズをタイトルバーもしくはそれ以下にすると表示が行われない不具合対応 DEL ST ------------------------------------
				'IVMainCtrl.BrowserMinimization
				'▲▲▲HBT-V1.0-0000-20050901 ブラウザサイズをタイトルバーもしくはそれ以下にすると表示が行われない不具合対応 DEL ED ------------------------------------

'HBT-V1.2-0000-20060307-UPDATE START FFPVCS #1733 -----------------------
				'IVMainCtrl.Initialize

				' セッション変数より送信元情報を取得し、Initialize2()の引数に渡す
				strSrcInfo = "<%= Session.Contents("WakeUpOfImageView") %>"
				call IVMainCtrl.Initialize2(strSrcInfo)
'HBT-V1.2-0000-20060307-UPDATE END   FFPVCS #1733 -----------------------

				'▼▼▼HBT-V1.0-0000-20050901 ブラウザサイズをタイトルバーもしくはそれ以下にすると表示が行われない不具合対応 ADD ST ------------------------------------
				'▼▼▼HBT-V6.0 EDT ST 2009/08/19 okuno------------------------------------
				'IVMainCtrl.BrowserMinimization
				IVMainCtrl.BrowserNormalization
				'▲▲▲HBT-V6.0 EDT ED 2009/08/19 okuno------------------------------------
				'▲▲▲HBT-V1.0-0000-20050901 ブラウザサイズをタイトルバーもしくはそれ以下にすると表示が行われない不具合対応 ADD ED ------------------------------------

				<% Application.Lock() %>
				<% Application.Contents("IVRunCall") = "1" %>
				<% Application.UnLock() %>

                gm_ChangeImage = 0

			End Sub

			'************************************************************
			'画像参照コンポーネントI/F(メソッド)
			' DispMini ： 画像参照本体ブラウザ最小化指示
			'------------------------------------------------------------
			' [機能概要]
			'   画像参照本体ブラウザ最小化指示
			'
			' [パラメータ]
			'
			' [戻り値]
			'   なし
			'
			' [備考]
			'
			'************************************************************
			Sub DispMini
				IVMainCtrl.BrowserMinimization
			End SUb

			'************************************************************
			'画像参照コンポーネントI/F(メソッド)
			' ReSize ： 画像参照本体リサイズ指示
			'------------------------------------------------------------
			' [機能概要]
			'   画像参照本体リサイズ指示
			'
			' [パラメータ]
			'
			' [戻り値]
			'   なし
			'
			' [備考]
			'
			'************************************************************
			Sub ReSize

				' 200704 HSK平尾 V2.0 IE7対応 D Start
				' IVMainCtrl.ResizeControl
				' 200704 HSK平尾 V2.0 IE7対応 D End
				' 200704 HSK平尾 V2.0 IE7対応 A Start
				''20081119 HSK高橋 V4.0 PVCS#2972対応 UPDATE-ST
				' IVMainCtrl.ResizeControl document.body.clientWidth, document.body.clientHeight
				'' 200704 HSK平尾 V2.0 IE7対応 D Start
				 IVMainCtrl.ResizeControl
				''20081119 HSK高橋 V4.0 PVCS#2972対応 UPDATE-ED
			End SUb

			'************************************************************
			'画像参照コンポーネントI/F(メソッド)
			' SaveWndSize ： 画像参照本体ウインドウサイズ指示
			'------------------------------------------------------------
			' [機能概要]
			'   画像参照本体ウインドウサイズ指示
			'
			' [パラメータ]
			' top    As string	[in]	Top
			' left   As string	[in]	Left
			' width  As string	[in]	Width
			' height As string	[in]	Height
			'
			' [戻り値]
			'   なし
			'
			' [備考]
			'
			'************************************************************
			Sub SaveWndSize(top, left  , width  , height )
				Dim strMsg
			End Sub

			'************************************************************
			'画像参照コンポーネントI/F(メソッド)
			' ReSize2 ： 画像参照本体リサイズ指示
			'------------------------------------------------------------
			' [機能概要]
			'   画像参照本体リサイズ指示
			'
			' [パラメータ]
			' width = 横
			' height= 縦
			' [戻り値]
			'   なし
			'
			' [備考]
			'
			'************************************************************
			Sub ReSize2(width,height)
					call IVMainCtrl.ResizeControl2(CLng(width),CLng(height))
			End SUb

			'************************************************************
			'画像参照コンポーネントI/F(メソッド)
			' NoticeResult ： 他機能（CR検査/C@Rna)からの実行結果を通知
			'------------------------------------------------------------
			' [機能概要]
			'   画像参照コンポーネントに他機能（CR検査)からの実行
			'   結果を通知を行う
			'
			' [パラメータ]
			'  LFunction As Long	[in]	通知する機能
			'  lResult As Long		[in]	結果  
			'
			' [戻り値]
			'   なし
			'
			' [備考]
			'
			'************************************************************
			Sub NoticeResult(lFunction , lResult)
				call IVMainCtrl.NoticeResult( Clng(lFunction), Clng(lResult))
			End SUb

			'************************************************************
			'画像参照コンポーネントI/F(イベント）
			' IVMainCtrl_OnGeneralReq ： 画像参照コンポからのイベント処理
			'------------------------------------------------------------
			' [機能概要]
			'   画像参照コンポーネント通知されたイベントに対しての処理を行う
			'
			' [パラメータ]
			'  LFunction As Long	[in]	要求する機能
			'  strValue As String	[in]	結果  
			'
			' [戻り値]
			'   なし
			'
			' [備考]
			'
			'************************************************************
			Sub IVMainCtrl_OnGeneralReq(lFunction , strValue)
				dim  nRet

	            Select Case lFunction
					Case 1
						'--------------------------------------------
						' 画像参照コントロールが初期化（プロセス間通信コンポ生成)完了のため
						' アプリケーション変数IVMainCallを0に設定する
						'--------------------------------------------
						<% Application.Lock %>
						<% Application.Contents("IVMainCall") = "0" %>
						<% Application.UnLock %>
					Case 2
						'--------------------------------------------
						' 画像参照本体ASPX最小化処理
						'--------------------------------------------
						Call DispMini()
					Case 4
						Call ReSize()
					Case 300,301,302,303,304,305
						'--------------------------------------------
						'300 「撮影メニュー変更」機能実施要求
						'301 「写損／再撮指示」機能実施要求
						'302 「追加撮影」機能実施要求
						'303 「画像入れ替え」機能実施要求
						'304 「患者情報編集」機能実施要求
						'305 「出力先設定」機能実施要求
						'--------------------------------------------
						nRet = 0
						gm_ChangeImage = 0
'HBT-V1.0-0000-20050629-DEL START FFPVCS #904 -----------------------
'						nRet = Window.showModalDialog (strValue,"NewCRWin","toolbar=no;location=no;directories=no;help=no;status=no;menubar=no;scrollbars=no;resizable=yes;dialogWidth=800px;dialogHeight=640px")
'HBT-V1.0-0000-20050629-DEL END FFPVCS #904 -------------------------
'HBT-V1.0-0000-20050629-ADD START FFPVCS #904 -----------------------
						nRet = Window.showModalDialog (strValue,"NewCRWin","toolbar=no;location=no;directories=no;help=no;status=no;menubar=no;scrollbars=no;resizable=yes;dialogWidth=808px;dialogHeight=634px")
'HBT-V1.0-0000-20050629-ADD END FFPVCS #904 -------------------------
						if gm_ChangeImage = 1 then
							nRet = 0
							gm_ChangeImage = 0
						End if

						Call NoticeResult(lFunction , CInt(nRet))
					Case 400
		                '画像参照　患者情報更新イベント
						parent.InformationProc.PatientEditID.PatientID = strValue
					Case 401
		                '画像参照　患者情報更新イベント
						parent.InformationProc.PatientEditID. PatientName = strValue
					Case 402
		                '画像参照　患者情報更新イベント
						parent.InformationProc.PatientEditID.PatientNameKanji = strValue
					Case 403
		                '画像参照　患者情報更新イベント
						parent.InformationProc.PatientEditID.PatientSex = strValue
					Case 404
		                '画像参照　患者情報更新イベント
						parent.InformationProc.PatientEditID.PatientBirthDate = strValue
					Case 405
		                '画像参照　患者情報更新イベント
						parent.InformationProc.PatientEditID.Refresh
					Case 406
		                '画像参照　患者情報更新イベント
						parent.InformationProc.PatientEditID.Clear

                        gm_ChangeImage = 1
                    'V1.1(B) 動物対応　2009.11.20 FF星野 ADD-ST
					Case 407
		                '画像参照　患者情報更新イベント
						parent.InformationProc.PatientEditID.PatientsSexNeutered = strValue
					'V1.1(B) 動物対応　2009.11.20 FF星野 ADD-ED
					case 500
		                '画像参照　ユーザ認証画面表示
						Call parent.IVMainProc.WinOpen(strValue)
					case 501
		                '画像参照　説明文利用表示
						Call parent.IVMainProc.WinOpen2(strValue)
					case 502
		                '画像参照　説明文利用表示を閉じる
						Call parent.IVMainProc.WinTextInfoClose()
					case 600
		                '画像参照　本体タイトル変更
						Call parent.IVMainProc.WinTitle(strValue)
					case 601
		                '画像参照　ユーザ認証　ユーザID定義
						gm_UserID = CStr(strValue)
					case 602
		                '画像参照　ユーザ認証　ユーザログイン時間定義
						gm_LoginTime = CStr(strValue)
					case 603
		                '画像参照　インジケータ情報設定
						Call parent.IVMainProc.SetUserInfo( gm_UserID, gm_LoginTime )
					case 700
		                '画像参照　ブラウザ終了
						Call parent.IVMainProc.ExitImageView()

					case 999
						<% Application.Lock %>
						<% Application.Contents("IVMainCall") = "0" %>
						<% Application.UnLock %>
						<% Application.Lock %>
						<% Application.Contents("IVRunCall") = "0" %>
						<% Application.UnLock %>
				End Select
			End Sub
		</SCRIPT>
		<form id="Form1" method="post" runat="server">
			<FONT face="MS UI Gothic"></FONT>
		</form>
		<!-- ///////////////////////////////////////-->
		<!--  ブラウザリサイズ制御スクリプト      //-->
		<!-- ///////////////////////////////////////-->
		<script language="Javascript">
		<!--
		    window.onresize = ResizeFunc; // リサイズが行われたとき呼び出す

		    function ResizeFunc()
		    {
				var width;
				var height;

				if(document.all)
				{
					// 横幅・縦幅のウィンドウサイズの1/4を取得
					width =  document.body.clientWidth;
					height = document.body.clientHeight;
				}
				else if(document.getElementById)
				{
					// 横幅・縦幅のウィンドウサイズの1/4を取得
					width = window.innerWidth;
					height = window.innerHeight;
				}
				ReSize();
		    }

		    //インジケータ情報設定
			function SetLoginInfo()
			{
				var UserID    = "<%=loginUserId %>";
				var LoginTime = "<%=loginTime %>";
				top.SetUserInfomation( UserID, LoginTime );
			}
		//-->
		</script>
	</body>
</HTML>
