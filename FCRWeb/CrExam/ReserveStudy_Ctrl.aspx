<%@ Page language="c#" Codebehind="ReserveStudy_Ctrl.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.ReserveStudy_Ctrl" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file ReserveStudy_Ctrl.aspx

  @brief 予約検査機能フレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/21  YSK畑　　     V1.0       新規作成
  @date  06/11/01  HSK山本       V1.4      CR検査部構造見直し[4]対応

/****************************************************************************/
%>
<%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>main</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/ReserveStudy_Ctrl.css">
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/JSCommonFrameSize.js"    CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
        <script LANGUAGE="JavaScript" SRC="../Include/PageLoader.js"         CHARSET="UTF-8"></script>
        <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"     CHARSET="UTF-8"></SCRIPT>
		<script language="javascript" src="./Include/ReserveStudy_Ctrl.js"  charset="UTF-8"></script>
		<script language=javascript   src="./Include/MessageWindow.js"      charset="UTF-8"></script>
	</HEAD>
	<body onload="Fn_InitPage();">
		<iframe id="RESERVESTUDY_VIEW" frameborder=0 scrolling="no"></iframe>
		<iframe id="RESERVESTUDY_GET_PROC"></iframe>
		<iframe id="RESERVESTUDY_DELETE"></iframe>
		<iframe id="INFORMATION_VIEW" frameborder=0 scrolling="no"></iframe>
		<iframe id="LOGGER_PROC"></iframe>
		<iframe id="EXCLUSIVE_PROC"></iframe>
	  <iframe id="CHECKCOMMAND_PROC" frameborder=0 scrolling="no"></iframe>
	</body>
</HTML>
