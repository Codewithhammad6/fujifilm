<%@ Page Language="vb" AutoEventWireup="false" Codebehind="Function.aspx.vb" Inherits="ImageView.ImageView._Function" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title></title>
		<meta name="GENERATOR" content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" content="Visual Basic .NET 7.1">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Expires" content="-1">
		<meta http-equiv="Content-Type" content="text/html; charset=Shift_JIS">
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js"></SCRIPT>
		<SCRIPT language="JavaScript" src="../Include/Main.js"></SCRIPT>
		<SCRIPT language="JavaScript" src="../Include/MainCommon.js"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="ImageViewMain/Information/Include/Control.js"></SCRIPT>
		<!-- //****************************************************************************//-->
		<!-- //                                                                            //-->
		<!-- //  @file Function.aspx                                                       //-->
		<!-- //                                                                            //-->
		<!-- //  @brief Function                                                           //-->
		<!-- //                                                                            //-->
		<!-- //  @author HSK山本                                                           //-->
		<!-- //                                                                            //-->
		<!-- //  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.     //-->
		<!-- //                                                                            //-->
		<!-- //         更新履歴  担当        Ver.       内容                              //-->
		<!-- //  -----  --------  ----------  --------   -------------------------------   //-->
		<!-- //  @date  06/11/01  HSK山本     1.4        CR検査部構造見直し[4]対応         //-->
		<!-- //  @date  07/05/23  HSK黒田     2.0        PVCS#2137                         //-->
		<!-- //                                                                            //-->
		<!-- //****************************************************************************//-->
		<!-- ///////////////////////////////////////-->
		<!--  ブラウザ制御スクリプト              //-->
		<!-- ///////////////////////////////////////-->
		<SCRIPT TYPE="text/javascript">
		<!--
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

		//-->
		</SCRIPT>
	</HEAD>
	<body onload="SetLoginInfo();" topmargin="0" leftmargin="0" background="#333333" MS_POSITIONING="GridLayout"
		oncontextmenu="return false" onHelp="return false" onKeyDown="return getkeycode(event.keyCode)">
		<script language="javascript">
		<!--
			function SetLoginInfo()
			{
				var UserID    = "<%=loginUserId %>";
				var LoginTime = "<%=loginTime %>";
				top.SetUserInfomation( UserID, LoginTime );
			}
		//-->
		</script>
		<form id="Form1" method="post" runat="server">
			<FONT face="MS UI Gothic"></FONT>
		</form>
	</body>
</HTML>
