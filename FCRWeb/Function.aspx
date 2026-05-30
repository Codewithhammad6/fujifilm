<%@ Page language="c#" Codebehind="Function.aspx.cs" AutoEventWireup="false" Inherits="FCRWeb.Function" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" > 

<html>
  <head>
    <title>Function</title>
    <meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
    <meta name="CODE_LANGUAGE" Content="C#">
    <meta name=vs_defaultClientScript content="JavaScript">
    <meta name=vs_targetSchema content="http://schemas.microsoft.com/intellisense/ie5">
    <script language="javascript" src="./Include/Control.js" CHARSET="UTF-8"></script>
    <script language=javascript>
      var InitialDisplay = "<%=initialDisplay%>";
      
      function LoadPage()
      {
        top.MainFrame.location.replace(InitialDisplay);
      }
    </script>
  </head>
  <body bgColor="#f5e7dd" onload="LoadPage();">
	
    <form id="Form1" method="post" runat="server">

     </form>
	
  </body>
</html>
