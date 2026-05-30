<%@ Page language="c#" Codebehind="Main_Close_Proc.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.Main_Close_Proc" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
    <%
/****************************************************************************

  @file Main_Close_Proc.aspx

  @brief 終了処理フレーム

  @author YSK齋藤

  Copyright(C) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/10/27　YSK齋藤  　  V1.0　    新規作成(ErrorEnd_Proc.aspxを改名した)
  @date  07/04/03　HSK古場  　  V2.0　    IE7対応

/****************************************************************************/
%>
<%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
    <META NAME="GENERATOR" CONTENT="Microsoft Visual Studio .NET 7.1">
    <META NAME="CODE_LANGUAGE" CONTENT="C#">
    <META NAME="vs_defaultClientScript" CONTENT="JavaScript">
    <META NAME="vs_targetSchema" CONTENT="http://schemas.microsoft.com/intellisense/ie5">
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
  <TITLE></TITLE>
  </HEAD>
<!-- 2007/04/03 HSK古場 -UPDATE-ST- -->
  <BODY ONLOAD="WU_CloseWindow(window);">
<!-- 2007/04/03 HSK古場 -UPDATE-ED- -->
  </BODY>
</HTML>
