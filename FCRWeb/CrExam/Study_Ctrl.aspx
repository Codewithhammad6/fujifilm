<%@ Page CodeBehind="Study_Ctrl.aspx.cs" Language="c#" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.Study_Ctrl" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file Study_Ctrl.aspx

  @brief 検査機能フレーム

  @author YSK齋藤

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/11/09  YSK齋藤     V1.0　     新規作成
  @date  06/11/01  HSK山本     V1.4       CR検査部構造見直し[4]対応

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
    <TITLE>検査画面</TITLE>
    <META NAME="GENERATOR"              CONTENT="Microsoft Visual Studio .NET 7.1">
    <META NAME="CODE_LANGUAGE"          CONTENT="C#">
    <META NAME="vs_defaultClientScript" CONTENT="JavaScript">
    <META NAME="vs_targetSchema"        CONTENT="http://schemas.microsoft.com/intellisense/ie5">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/Study_Ctrl.css">
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/JSCommonFrameSize.js" CHARSET="UTF-8"></SCRIPT>
	<SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js"     CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"     CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js"		 CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Study_Ctrl.js"				 CHARSET="UTF-8"></SCRIPT>
    <!-- 2005/05/14 002 H.SAITO 検査排他の変更(Cookie) -->
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Cookie.js"				     CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript">
		try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "Study_Ctrl.aspx"  //ファイル名
			// 画面オープンモード(.jsで宣言済み)
			OpenMode = <%=OpenMode%>;
	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
		</SCRIPT>
  </HEAD>
  <BODY ONLOAD="Fn_InitPage();" ONBEFOREUNLOAD="Public_Unload();">
    <IFRAME ID="STUDYDATA_GET_PROC"     SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <IFRAME ID="STUDY_START_PROC"       SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <IFRAME ID="STUDY_TURNIMAGE_PROC"   SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <IFRAME ID="STUDY_STATECHANGE_PROC" SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <IFRAME ID="STUDY_NOTIFY_PROC"      SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <IFRAME ID="STUDY_WATCH_PROC"       SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <IFRAME ID="STUDY_VIEW"				      SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <IFRAME ID="INFORMATION_VIEW"       SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <IFRAME ID="LOGGER_PROC"            SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <IFRAME ID="EXCLUSIVE_PROC"         SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <!-- 2005/06/27 002 H.SAITO PVCS#350 認証、権限チェック対応(実施箇所変更のため,専用フレーム不要)
	  <!-- <IFRAME ID="CHECKCOMMAND_PROC"	    SCROLLING="no" FRAMEBORDER="0"></IFRAME> -->
    <!-- 2005/05/14 002 H.SAITO ×ボタン押下時の解放をダイアログ→処理ＡＳＰを呼ぶに変更-->
	  <IFRAME ID="ERROREND_PROC"	        SCROLLING="no" FRAMEBORDER=0 ></IFRAME>
  </BODY>
</HTML>