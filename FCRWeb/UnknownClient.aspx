<%@ Page language="c#" Codebehind="UnknownClient.aspx.cs" AutoEventWireup="false" Inherits="FCRWeb.UnknownClient" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
		<title>UnknownClient</title>
		<meta HTTP-EQUIV="Pragma" content="no-cache">
		<meta HTTP-EQUIV="Cache-Control" content="no-cache">
		<meta HTTP-EQUIV="Expires" content="Thu, 01 Dec 1994 16:00:00 GMT">
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
<!-- 2005/08/31 Kanno ADD ST PVCS#434 -->
		<SCRIPT LANGUAGE="JavaScript">
		<!--
			top.SetTitle("<%=title%>");
		//-->
		</SCRIPT>
<!-- 2005/08/31 Kanno ADD ED PVCS#434 -->
	</HEAD>
	<body bgColor="#F7F1E6" MS_POSITIONING="GridLayout" onload = "top.SetCurrentView('UNKNOWNCLT');" onunload="top.SetCurrentView('');">
		<form id="Form1" method="post" runat="server">
      <DIV id="lblErrMessage" style="DISPLAY: inline; Z-INDEX: 101; LEFT: 200px; WIDTH: 400px; POSITION: absolute; TOP: 60px; HEIGHT: 60px" ms_positioning="FlowLayout"><%=Label_Error_Message%></DIV><FONT face="MS UI Gothic"></FONT>
    </form>
	</body>
</HTML>
