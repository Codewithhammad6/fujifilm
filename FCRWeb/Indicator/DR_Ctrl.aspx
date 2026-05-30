<%@ Page language="c#" Codebehind="DR_Ctrl.aspx.cs" AutoEventWireup="false" Inherits="Indicator.DR_Ctrl" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file DR_Ctrl.aspx

  @brief DRユーティリティメインフレーム


  @author TYK石井

  Copyright(c) 2014 FUJI PHOTO FILM CO., LTD. All rights reseved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  14/03/11  TYK石井     V3.0(B)    新規作成

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
    <TITLE>DR_Ctrl</TITLE>
    <META NAME="GENERATOR" CONTENT="Microsoft Visual Studio .NET 7.1">
    <META NAME="CODE_LANGUAGE" CONTENT="C#">
    <META NAME="vs_defaultClientScript" CONTENT="JavaScript">
    <META NAME="vs_targetSchema" CONTENT="http://schemas.microsoft.com/intellisense/ie5">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/DR_Ctrl.css" CHARSET="UTF-8">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/DR_Ctrl.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/ButtonChange.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/DefineLangStr.js" CHARSET="UTF-8"> </SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Control.js" CHARSET="UTF-8"></SCRIPT>
  </HEAD>
  <BODY ONSELECTSTART="return false;" ONLOAD="Fn_InitPage();" ONCONTEXTMENU="return false;">
    <IMG ID="imgOKBtnBack" SRC="../Bmp/indBtnBack1Plt.gif">
    <IMG ID="imgOK" SRC="../Bmp/cmCirBGreenBtnU.gif"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/cmCirBGreenBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/cmCirBGreenBtnD.gif');"
          ONCLICK="top.Exit();"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/cmCirBGreenBtnU.gif');"
          ONDRAG="return false;">
    <DIV ID="divOK"
          ONMOUSEUP="document.getElementById('imgOK').onmouseup();"
          ONMOUSEDOWN="document.getElementById('imgOK').onmousedown();"
          ONCLICK="document.getElementById('imgOK').onclick();"
          ONMOUSEOUT="document.getElementById('imgOK').onmouseout();"></DIV>
    <!-- リフレッシュボタン -->
    <IMG ID="imgRefreshBtnBack" SRC="../Bmp/indBtnBack1Plt.gif">
    <IMG ID="imgRefresh" SRC="../Bmp/cmCirBblueBtnU.gif"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/cmCirBblueBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/cmCirBblueBtnD.gif');"
          ONCLICK="Fn_Refresh();"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/cmCirBblueBtnU.gif');"
          ONDRAG="return false;">
    <DIV ID="divRefresh"
          ONMOUSEUP="document.getElementById('imgRefresh').onmouseup();"
          ONMOUSEDOWN="document.getElementById('imgRefresh').onmousedown();"
          ONCLICK="document.getElementById('imgRefresh').click();"
          ONMOUSEOUT="document.getElementById('imgRefresh').onmouseout();">
    </DIV>
	<!-- DRステータス表示用フレーム -->
	<IFRAME ID="DRSTATUS_VIEW" FRAMEBORDER="no" ALLOWTRANSPARENCY></IFRAME>
	<!-- DRステータス取得用フレーム -->
	<IFRAME ID="DRSTATUS_GET_PROC"></IFRAME>
	<!-- DR操作監視用フレーム -->
	<IFRAME ID="DR_WATCH_PROC"></IFRAME>
    <!-- 背景 -->
    <DIV ID="divFooter"></DIV>
    <IMG ID="imgFooter" SRC="../Bmp/cmBorder.gif">
    <DIV ID="divBackGround"></DIV>
    <!-- ログ出力用フレーム -->
    <IFRAME ID="LOGGER_PROC"></IFRAME>
  </BODY>
</HTML>
