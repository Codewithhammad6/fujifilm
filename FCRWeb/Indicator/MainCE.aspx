<%@ Page language="c#" Codebehind="MainCE.aspx.cs" AutoEventWireup="false" Inherits="Indicator.MainCE" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" > 
<%
/****************************************************************************

  @file MainCE.aspx

  @brief インジケータユーティリティメインフレーム(確認モニタ筐体用)


  @author YSK菅野

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reseved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/22  YSK菅野     XX-XX      新規作成
  @date  06/11/21  HSK古場     V1.4       CR検査部構造見直し[4]対応

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
    <TITLE><%=strTitle%></TITLE>
    <META NAME="vs_showGrid" CONTENT="False">
    <META NAME="GENERATOR" CONTENT="Microsoft Visual Studio .NET 7.1">
    <META NAME="CODE_LANGUAGE" CONTENT="C#">
    <META NAME="vs_defaultClientScript" CONTENT="JavaScript">
    <META NAME="vs_targetSchema" CONTENT="http://schemas.microsoft.com/intellisense/ie5">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/MainCE.css" CHARSET="UTF-8">
    <LINK REL="stylesheet" TYPE="text/css" HREF="../CSS/MessageWindow.css">
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
    <script language="javascript" src="../Include/PageLoader.js" charset="UTF-8"></script>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Main.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../SoftKeyBoard/Include/SoftKeyBoardCharactor.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/MessageWindow.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript">
    <!--
      strUtilityKind   = "<%=strUtilityKind%>";
      strOriginDisplay = "<%=strOriginDisplay%>";
    -->
    </SCRIPT>
  </HEAD>
  <BODY ONCONTEXTMENU="return false;" ONLOAD="Fn_InitPage();" ONRESIZE="Fn_Resize();">
		<!-- インジケータアイコンフレーム//-->
		<IFRAME id="frmIndicator"  src="" frameBorder="no" scrolling="no"></IFRAME>
    <!-- FUNCTIONフレーム -->
    <IFRAME ID="FUNCTION_FRAME" NAME="FUNCTION_FRAME" FRAMEBORDER="0" SCROLLING="no"></IFRAME>
    <!-- エラーメッセージ取得用フレーム -->
    <IFRAME ID="GetErrorFrame" FRAMEBORDER="0" SCROLLING="no"></IFRAME>
    <!-- エラーフレーム -->
    <TABLE ID="TABLE_MainErrorFrame"><TR><TD>
      <!-- 処理中ボックス -->
      <TABLE ID="TABLE_MainErrorBox">
        <TR><TD ID="TD_MainErrorTitle1"><BR></TD></TR>
        <TR><TD ID="TD_MainErrorTitle2"><BR></TD></TR>
        <TR><TD ID="TD_MainErrorText"><BR></TD></TR>
        <TR><TD ID="TD_MainErrorCode"><BR></TD></TR>
        <TR><TD><BR></TD></TR>
      </TABLE>
      <!-- ボタン -->
      <DIV ID="DIV_MainErrorButton" ONCLICK="Public_OnButton_Main(0,'../Bmp/cmOvalAGreenLBtnU.gif')" ONMOUSEDOWN="Public_OnButton_Main(1,'../Bmp/cmOvalAGreenLBtnD.gif')" ONMOUSEOUT="Public_OnButton_Main(2,'../Bmp/cmOvalAGreenLBtnU.gif')">
        <DIV ID="DIV_MainErrorOkText"></DIV>
        <IMG ID="IMG_MainErrorButton" SRC="../Bmp/cmOvalAGreenLBtnU.gif">
      </DIV>
    </TD></TR></TABLE>
<%-- 2005/09/15 Kanno ADD ST PVCS#1332 --%>
    <SCRIPT LANGUAGE="JavaScript">
    <!--
      <% if (strEndScript != ""){ %>
        errFlg = 1;
        <%=strEndScript%>
      <% } %>
    -->
    </SCRIPT>
<%-- 2005/09/15 Kanno ADD ED PVCS#1332 --%>
  </BODY>
</HTML>
