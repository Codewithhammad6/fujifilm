<%@ Page language="c#" Codebehind="RegAddMenu_Ctrl.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.RegAddMenu_Ctrl" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" > 
<%
/****************************************************************************

  @file RegAddMenu_Ctrl.aspx

  @brief メニュー追加機能フレーム

  @author YSK田中

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/10  YSK田中　     V1.0       新規作成
  @date  06/11/01  HSK山本     V1.4      CR検査部構造見直し[4]対応

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
    <TITLE></TITLE>
    <META NAME="GENERATOR" CONTENT="Microsoft Visual Studio .NET 7.1">
    <META NAME="CODE_LANGUAGE" CONTENT="C#">
    <META NAME="vs_defaultClientScript" CONTENT="JavaScript">
    <META NAME="vs_targetSchema" CONTENT="http://schemas.microsoft.com/intellisense/ie5">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/RegAddMenu_Ctrl.css">
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/JSCommonFrameSize.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js"				 CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"     CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/RegAddMenu_Ctrl.js"	 CHARSET="UTF-8"></SCRIPT>
	  <script language=javascript src="./Include/MessageWindow.js" charset="UTF-8"></script>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
	  <script language=javascript>
	  try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "RegAddMenu_Ctrl.aspx"  //ファイル名

		  // 画面オープンモード
		  var OpenMode = <%=OpenMode%>;
		  <%=ClientScript%>
		
	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
		</SCRIPT>
  </HEAD>
  <BODY ONLOAD="Fn_InitPage();">
    <IFRAME ID="ADDMENU_VIEW"         SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <IFRAME ID="INFORMATION_VIEW"     SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <IFRAME ID="ADDMENU_UPDATE_PROC"></IFRAME>
    <IFRAME ID="REGSTUDY_UPDATE_PROC"></IFRAME>
    <IFRAME ID="STUDYDATA_GET_PROC"></IFRAME>
    <IFRAME ID="LOGGER_PROC"></IFRAME>
    <IFRAME ID="EXCLUSIVE_PROC"></IFRAME>
  </BODY>
</HTML>
