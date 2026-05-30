<%@ Page language="c#" Codebehind="Logger_Proc.aspx.cs" AutoEventWireup="false" Inherits="Indicator.Logger_Proc" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file Logger_Proc.aspx

  @brief イベントログ登録用フレーム


  @author YSK菅野

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reseved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/22  YSK菅野     XX-XX      新規作成

/****************************************************************************/
%>
<%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
<HTML>
  <HEAD>
    <TITLE>Logger_Proc</TITLE>
    <META NAME="GENERATOR" CONTENT="Microsoft Visual Studio .NET 7.1">
    <META NAME="CODE_LANGUAGE" CONTENT="C#">
    <META NAME="vs_defaultClientScript" CONTENT="JavaScript">
    <META NAME="vs_targetSchema" CONTENT="http://schemas.microsoft.com/intellisense/ie5">
  </HEAD>
  <BODY>
  </BODY>
</HTML>
