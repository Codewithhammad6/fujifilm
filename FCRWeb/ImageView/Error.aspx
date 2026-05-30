<%@ Page Language="vb" AutoEventWireup="false" Codebehind="Error.aspx.vb" Inherits="ImageView.ImageView._Error" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>FUJI FILM</title>
		<meta name="GENERATOR" content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" content="Visual Basic .NET 7.1">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Expires" content="-1">
		<meta http-equiv="Content-Type" content="text/html; charset=Shift_JIS">
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js"></SCRIPT>
		<SCRIPT language="JavaScript" src="../Include/Main.js"></SCRIPT>
		<SCRIPT language="JavaScript" src="../Include/MainCommon.js"></SCRIPT>
		<script language="javascript" src="../Include/MessageWindow.js"></script>
		<SCRIPT LANGUAGE="JavaScript" SRC="ImageViewMain/Information/Include/Control.js"></SCRIPT>
		<LINK REL="stylesheet" TYPE="text/css" HREF="../CSS/MessageWindow.css">
		<style> #layer1 { POSITION : absolute; TOP : 9px; LEFT : 600px; Z-INDEX : 10; }
	#layer2 { POSITION : absolute; TOP : 0px; LEFT : 0px; HEIGHT : 100%; WIDTH : 100%; z-index: 0; visibility: visible }
		</style>
		<!-- //****************************************************************************//-->
		<!-- //                                                                            //-->
		<!-- //  @file Error.aspx                                                           //-->
		<!-- //                                                                            //-->
		<!-- //  @brief エラー画面                                                         //-->
		<!-- //                                                                            //-->
		<!-- //  @author HSK山本                                                           //-->
		<!-- //                                                                            //-->
		<!-- //  Copyright(c)  2004-2007 FUJIFILM Corporation All rights reserved.         //-->
		<!-- //                                                                            //-->
		<!-- //         更新履歴  担当        Ver.       内容                              //-->
		<!-- //  -----  --------  ----------  --------   -------------------------------   //-->
		<!-- //  @date  06/11/01  HSK山本     1.4        CR検査部構造見直し[4]対応         //-->
		<!-- //  @date  07/04/13  HSK平尾     2.0        IE7対応                           //-->
		<!-- //  @date  07/04/21  HSK平尾     2.0        IE7対応追加修正                   //-->
		<!-- //  @date  07/05/23  HSK黒田     2.0        PVCS#2137                         //-->
		<!-- //                                                                            //-->
		<!-- //****************************************************************************//-->
		<!-- ///////////////////////////////////////-->
		<!--  ブラウザ制御スクリプト              //-->
		<!-- ///////////////////////////////////////-->
		<SCRIPT TYPE="text/javascript">
		<!--
			// インジケータを非表示にする
			parent.document.all('frmIndicator').style.visibility='hidden';
			parent.document.all('frmIndicator').src = 'about:blank';

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
			function Exit()
			{
				try
				{
					// 確認ダイアログの表示を防ぐ

					// 20070421 HSK平尾 V2.0 IE7対応 D End 
					// if( document.all )
					// {
					// 	window.opener = true;
					// }
					// 20070421 HSK平尾 V2.0 IE7対応 D End 
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
					Public_Error( FATAL_ERROR, "Exit Exception" );
				}
			}
		//-->
		</SCRIPT>
	</HEAD>
	<body Onload ="<%AccessError()%>;AccessErr()" bgcolor="#f7f1e6" topmargin="0" leftmargin="0" MS_POSITIONING="GridLayout" oncontextmenu="return false">
		<form id="Form1">
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
		<SCRIPT TYPE="text/javascript">
		<!--
			function AccessErr()
			{
				//▼▼▼HBT-V1.0-0000-20050901 PVCS #1253 DEL ST ------------------------------------
				//top.parent.Public_ErrorDialog('<%=ClientScriptMsg01 %>','<%=ClientScriptMsg02 %>','<%=ClientScriptMsg03 %>','<%=ClientScriptMsg04 %>','<%=ClientScriptMsg05 %>','<%=ClientScriptMsg06 %>','<%=ClientScriptMsg07 %>');
				//▲▲▲HBT-V1.0-0000-20050901 PVCS #1253 DEL ED ------------------------------------

				//▼▼▼HBT-V1.0-0000-20050901 PVCS #1253 ADD ST ------------------------------------
				top.parent.Public_ErrorDialog("<%=ClientScriptMsg01 %>","<%=ClientScriptMsg02 %>","<%=ClientScriptMsg03 %>","<%=ClientScriptMsg04 %>","<%=ClientScriptMsg05 %>","<%=ClientScriptMsg06 %>","<%=ClientScriptMsg07 %>");
				//▲▲▲HBT-V1.0-0000-20050901 PVCS #1253 ADD ED ------------------------------------
			}
		//-->
		</SCRIPT>
	</body>
</HTML>
