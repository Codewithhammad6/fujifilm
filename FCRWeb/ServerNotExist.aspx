<%@ Page language="c#" Codebehind="ServerNotExist.aspx.cs" AutoEventWireup="false" Inherits="FCRWeb.ServerNotExist" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
		<title>ServerNotExist</title>
<%
/* キャッシュ制御を停止 */
Response.CacheControl = "no-cache";
Response.AddHeader("Pragma","no-cache");
Response.Expires = -1;
%>
		<meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
        <script language="javascript" src="./Include/SystemEnvironment.js" charset="UTF-8"></script>

		<SCRIPT LANGUAGE="JavaScript">
		<!--
//071026 HSK山本 V3.0 PVCS#2457 UPDATE
//          常にリトライ処理をするわけではないので名称を変更 
//			function retry()
            function onBodyLoad()
			{
// 090709 HSK齋藤誠 V5.1 PC版画像確認モニタ対応 UPDATE-ST
//071026 HSK山本 V3.0 PVCS#2457 ADD-ST
                //if(isWindowsCE()){
                if(isClientTypeMini()){
//071026 HSK山本 V3.0 PVCS#2457 ADD-ED
// 090709 HSK齋藤誠 V5.1 PC版画像確認モニタ対応 UPDATE-ED

// 2005/09/14 Kanno UPDATE ST PVCS#1253
//				setTimeout("top.SetCurrentView('');location.replace('<%=query%>');",1000*15);
                    setTimeout("btnRetryClick();",1000*15);
// 2005/09/14 Kanno UPDATE ED PVCS#1253
//071026 HSK山本 V3.0 PVCS#2457 ADD-ST
                }
//071026 HSK山本 V3.0 PVCS#2457 ADD-ED
			}
			
			function btnRetryClick()
			{
			  top.SetCurrentView('');
			  location.replace("<%=query%>");
			}
		//-->
// 2005/08/31 Kanno ADD ST PVCS#434
			top.SetTitle("<%=title%>");
// 2005/08/31 Kanno ADD ED PVCS#434
		</SCRIPT>
</HEAD>
<!-- 071026 HSK山本 V3.0 PVCS#2457 UPDATE -->
<!--	<body bgColor="#F7F1E6" MS_POSITIONING="GridLayout" onload="top.SetCurrentView('SVNOTEXIST');retry()"> -->
	<body bgColor="#F7F1E6" MS_POSITIONING="GridLayout" onload="top.SetCurrentView('SVNOTEXIST');onBodyLoad()"> 
		<form id="frmServerNotExist" method="post" runat="server">

<!-- 071026 HSK山本 V3.0 PVCS#2457 UPDATE -->
<!--			<INPUT id="btnRetry" style="Z-INDEX: 100; LEFT: 300px; WIDTH: 200px; POSITION: absolute; TOP: 140px; HEIGHT: 30px" type="button" value="<%=LabelBtnRetry%>" onclick="btnRetryClick();"> -->
<script language="javascript">

// 090709 HSK齋藤誠 V5.1 PC版画像確認モニタ対応 UPDATE-ST
        //if(isWindowsCE()){
        if(isClientTypeMini()){
// 090709 HSK齋藤誠 V5.1 PC版画像確認モニタ対応 UPDATE-ED
            document.write('<INPUT id="btnRetry" style="Z-INDEX: 100; LEFT: 300px; WIDTH: 200px; POSITION: absolute; TOP: 140px; HEIGHT: 30px" type="button" value="<%=LabelBtnRetry%>" onclick="btnRetryClick();"> ');
        }
</script>
      <DIV id="lblErrMessage" style="DISPLAY: inline; Z-INDEX: 101; LEFT: 200px; WIDTH: 400px; POSITION: absolute; TOP: 60px; HEIGHT: 60px" ms_positioning="FlowLayout"><%=LabelErrorMessage%></DIV>
		</form>
	</body>
</HTML>
