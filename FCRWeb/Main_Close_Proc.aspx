<%@ Page language="c#" Codebehind="Main_Close_Proc.aspx.cs" AutoEventWireup="false" Inherits="FCRWeb.Main_Close_Proc" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<%
/****************************************************************************

  @file Main_Close_Proc.aspx

  @brief 終了処理フレーム

  @author HSK廣井

  Copyright(C) 2009 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  09/03/31　HSK廣井 　  V5.0　     PVCS#3275対策(CrExam\Main_Close_Proc.aspxを流用)

/****************************************************************************/
%>
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
		<script language="javascript" src="./Include/WindowUtility.js" charset="UTF-8"></script>
		<% /* memo デフォルトで付加される"-- Web ページ ダイアログ..."の文言を隠すために、
	           フレーム横幅一杯になるよう目立たない半角文字を title に設定している。*/ %>
	<title>......................................................</title>
	</HEAD>
	<body onload="WU_CloseWindow(window)" style="FONT-SIZE: 0pt; MARGIN: 0px; OVERFLOW: hidden; BORDER-TOP-STYLE: none; TEXT-INDENT: 0pt; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BACKGROUND-COLOR: transparent; TEXT-DECORATION: none; BORDER-BOTTOM-STYLE: none">
	</body>
</HTML>
