<%@ Page language="c#" Codebehind="Exclusive_Proc.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.Exclusive_Proc" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
    <TITLE>Exclusive_Proc</TITLE>
    <META name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
    <META name="CODE_LANGUAGE" Content="C#">
    <META name="vs_defaultClientScript" content="JavaScript">
    <META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Exclusive_Proc.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js"  CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
	</HEAD>
  <BODY ONLOAD="Fn_InitPage();<%=ClientScript%>">
    <FORM NAME="frmExclusiveForm" METHOD="POST">
			<INPUT TYPE='hidden' ID="procMode"            NAME="procMode">
			<INPUT TYPE='hidden' ID="studySequence"       NAME="studySequence">
			<INPUT TYPE='hidden' ID="exclusiveModeRu"     NAME="exclusiveModeRu">
			<INPUT TYPE='hidden' ID="exclusiveModeStudy"  NAME="exclusiveModeStudy">
			<INPUT TYPE='hidden' ID="exclusiveModeOutput" NAME="exclusiveModeOutput">
			<INPUT TYPE='hidden' ID="loginUserId"         NAME="loginUserId">
      <!-- 2005/06/25 002 H.SAITO PVCS#350 -->
			<INPUT TYPE='hidden' ID="loginTime"           NAME="loginTime">
			<!-- MONI_V60_0713-->
			<INPUT TYPE='hidden' ID="isMonitoring"           NAME="isMonitoring">
						
    </FORM>
  </BODY>
</HTML>