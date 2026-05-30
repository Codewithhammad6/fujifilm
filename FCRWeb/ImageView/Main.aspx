<%@ Page Language="vb" AutoEventWireup="false" Codebehind="Main.aspx.vb" Inherits="ImageView.ImageView.Main" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
<!-- 2005/08/22 Kanno UPDATE ST タイトルバーの文字列対応 -->
<!--		<title>FUJI FILM</title>  -->
		<title><%=strTitle%></title>
<!-- 2005/08/22 Kanno UPDATE ED タイトルバーの文字列対応 -->
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Expires" content="-1">
		<meta http-equiv="Content-Type" content="text/html; charset=Shift_JIS">
		<LINK REL="stylesheet" TYPE="text/css" HREF="../CSS/MessageWindow.css">
		<style> #layer1 { POSITION : absolute; TOP : 9px; LEFT : 600px; Z-INDEX : 10; }
	#layer2 { POSITION : absolute; TOP : 0px; LEFT : 0px; HEIGHT : 100%; WIDTH : 100%; z-index: 0; visibility: visible }
		</style>
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js"></SCRIPT>
		<SCRIPT language="JavaScript" src="../Include/MainCommon.js"></SCRIPT>
		<script language="javascript" src="../SoftKeyBoard/Include/SoftKeyBoardCharactor.js"></script>
		<script language="javascript" src="../Include/MessageWindow.js"></script>
		<SCRIPT LANGUAGE="JavaScript" SRC="./ImageViewMain/Information/Include/Information_View.js"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="ImageViewMain/Information/Include/Control.js"></SCRIPT>
		<!-- //****************************************************************************//-->
		<!-- //                                                                            //-->
		<!-- //  @file Main.aspx                                                           //-->
		<!-- //                                                                            //-->
		<!-- //  @brief 画像参照画面メイン                                                 //-->
		<!-- //                                                                            //-->
		<!-- //  @author HSK山本                                                           //-->
		<!-- //                                                                            //-->
		<!-- //  Copyright(C) 2004-2007 FUJIFILM Corporation All rights reserved.          //-->
		<!-- //                                                                            //-->
		<!-- //         更新履歴  担当        Ver.       内容                              //-->
		<!-- //  -----  --------  ----------  --------   -------------------------------   //-->
		<!-- //  @date  06/10/23  HSK山本     1.4        CR検査部構造見直し[4]対応         //-->
		<!-- //  @date  07/04/13  HSK平尾     2.0        IE7対応                           //-->
		<!-- //  @date  07/04/21  HSK平尾     2.0        IE7対応追加修正                   //-->
		<!-- //  @date  07/05/23  HSK黒田     2.0        PVCS#2137                         //-->
		<!-- //  @date  09/07/27  FF 星野     V6.0       インジケーター切り離し対応        //-->
		<!-- //                                                                            //-->
		<!-- //****************************************************************************//-->
		<!-- ///////////////////////////////////////-->
		<!--  ブラウザ制御スクリプト              //-->
		<!-- ///////////////////////////////////////-->
		<SCRIPT TYPE="text/javascript">
		<!--
			//parent.document.all('frmIndicator').style.visibility='hidden';
			//parent.document.all('frmIndicator').src = 'about:blank';
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

			document.onkeydown=key_down;
			document.onkeypress=key_down;
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
			function Fn_InitPage(){
				try{
					LoadPage("frmIndicator","../Indicator/Indicator.aspx",ChildPagesLoadedNotification);
				}
				catch(C){
				}
			}
			function ChildPagesLoadedNotification(){
				try{
					document.getElementById("IVMainProc").src = "<% ServerNextProc() %>";
					
				}
				catch(exception){
				}
			} 
			function Exit()
			{
				try
				{
					// 確認ダイアログの表示を防ぐ

					// 20070421 HSK平尾 V2.0 IE7対応 D Start 
					// if( document.all )
					// {
					// 	window.opener = true;
					// }
					// 20070421 HSK平尾 V2.0 IE7対応 D Start 
					// ブラウザを閉じる
					// window.close();
					// 20070413 HSK平尾 V2.0 IE7対応 D End 
					// 20070413 HSK平尾 V2.0 IE7対応 A Start
					WU_CloseWindow(window);
					// 20070413 HSK平尾 V2.0 IE7対応 A End 
				}
				catch(e)
				{
					Public_Error( FATAL_ERROR, "Exit Exception" );
				}
			}

		//-->
		</SCRIPT>
	</HEAD>
	<!-- 2009.07.27 FF 星野 インジケーター切り離し対応 DEL
	<body topmargin="0" leftmargin="0" background="#333333" MS_POSITIONING="GridLayout" style="OVERFLOW: hidden"
		onload="Fn_InitPage();ResizeFunc();" oncontextmenu="return false" onHelp="return false"
		onKeyDown="return getkeycode(event.keyCode)">
		<form id="Form1">
			<iframe id="IVMainProc" style="Z-INDEX: 101; LEFT: 0px; WIDTH: 100%; POSITION: absolute; TOP: 0px; HEIGHT: 100%"
				src="" scrolling="no"></iframe><iframe id="frmIndicator" style="PADDING-RIGHT: 0px; PADDING-LEFT: 0px; Z-INDEX: 102; LEFT: 610px; VISIBILITY: visible; PADDING-BOTTOM: 0px; WIDTH: 190px; PADDING-TOP: 0px; POSITION: absolute; TOP: 9px; HEIGHT: 37px"
				frameBorder="0" src="" scrolling="no"></iframe><IFRAME id="GetErrorFrame" frameBorder="0" scrolling="no">
			</IFRAME>
	-->	
	<!-- 2009.07.27 FF 星野 インジケーター切り離し対応 ADD -->
	<body topmargin="0" leftmargin="0" background="#333333" MS_POSITIONING="GridLayout" style="OVERFLOW: hidden"
		onload="ChildPagesLoadedNotification();ResizeFunc();" oncontextmenu="return false" onHelp="return false"
		onKeyDown="return getkeycode(event.keyCode)">
		<form id="Form1">
			<iframe id="IVMainProc" style="Z-INDEX: 101; LEFT: 0px; WIDTH: 100%; POSITION: absolute; TOP: 0px; HEIGHT: 100%"
				src="" scrolling="no"></iframe><IFRAME id="GetErrorFrame" frameBorder="0" scrolling="no">
			</IFRAME>
			<!-- エラーフレーム -->
			<TABLE ID="TABLE_MainErrorFrame">
				<TR>
					<TD>
						<!-- 処理中ボックス -->
						<TABLE ID="TABLE_MainErrorBox">
							<TR>
								<TD id="TD_MainErrorTitle1"><br>
								</TD>
							</TR>
							<TR>
								<TD id="TD_MainErrorTitle2"><br>
								</TD>
							</TR>
							<TR>
								<TD id="TD_MainErrorText"><br>
								</TD>
							</TR>
							<TR>
								<TD id="TD_MainErrorCode"><br>
								</TD>
							</TR>
							<TR>
								<TD><br>
								</TD>
							</TR>
						</TABLE>
						<!-- ボタン -->
						<DIV ID="DIV_MainErrorButton" ONCLICK="Public_OnButton_Main(0,'../Bmp/cmOvalAGreenLBtnU.gif')"
							ONMOUSEDOWN="Public_OnButton_Main(1,'../Bmp/cmOvalAGreenLBtnD.gif')" ONMOUSEOUT="Public_OnButton_Main(2,'../Bmp/cmOvalAGreenLBtnU.gif')">
							<DIV id="DIV_MainErrorOkText"></DIV>
							<IMG id="IMG_MainErrorButton" src="../Bmp/cmOvalAGreenLBtnU.gif">
						</DIV>
					</TD>
				</TR>
			</TABLE>
		</form>
		<!-- ///////////////////////////////////////-->
		<!--  ブラウザリサイズ/終了制御スクリプト //-->
		<!-- ///////////////////////////////////////-->
		<script language="Javascript">
		<!--
		    window.onresize = ResizeFunc; // リサイズが行われたとき呼び出す
			resizeToWIN(800,600);

		    function ResizeFunc()
		    {
				if(document.all)
				{
					// 横幅・縦幅のウィンドウサイズの1/4を取得
					document.all("IVMainProc").style.width = document.body.clientWidth;
					document.all("IVMainProc").style.height = document.body.clientHeight;
					/*2009.07.27 FF 星野 インジケーター切り離し対応 DEL
					if (document.body.clientWidth <= 800)
					{
					  document.all("frmIndicator").style.left = document.body.clientWidth - 190;
					}
					else
					{
					  document.all("frmIndicator").style.left = document.body.clientWidth - 190 - (document.body.clientWidth/2 - 400);
					}
					*/
				}
				else if(document.getElementById)
				{
					// 横幅・縦幅のウィンドウサイズの1/4を取得
					document.getElementById("IVMainProc").style.width = window.innerWidth;
					document.getElementById("IVMainProc").style.height = window.innerHeight;
				}
		    }

			function WakeUpStartedUp()
			{
				try
				{
					// 20070421 HSK平尾 V2.0 IE7対応 D Start 
					// window.opener=true;
					// 20070421 HSK平尾 V2.0 IE7対応 D Start 
					// 20070413 HSK平尾 V2.0 IE7対応 D Start 
					// ブラウザを閉じる
					// window.close();
					// 20070413 HSK平尾 V2.0 IE7対応 D End 
					// 20070413 HSK平尾 V2.0 IE7対応 A Start
					WU_CloseWindow(window);
					// 20070413 HSK平尾 V2.0 IE7対応 A End 
				}
				catch(e)
				{
				}
			}

			function resizeToWIN(width,height)
			{
				//--リサイズしてみて内寸取得
				resizeTo(width,height);
				var w = document.body.clientWidth;
				var h = document.body.clientHeight;
				//resizeToの結果内寸が 正しければ、そのまま。
				//                     違うなら、差分を加算。
				if(width!=w||height!=h)
				{
					resizeBy((width-w),(height-h));
				}
			}
		//-->
		</script>
	</body>
</HTML>
