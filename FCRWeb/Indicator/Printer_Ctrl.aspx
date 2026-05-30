<%@ Page language="c#" Codebehind="Printer_Ctrl.aspx.cs" AutoEventWireup="false" Inherits="Indicator.Printer_Ctrl" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" > 
<%
/****************************************************************************

  @file Printer_Ctrl.aspx

  @brief プリンタユーティリティメインフレーム


  @author YSK菅野

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reseved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/22  YSK菅野     XX-XX      新規作成
  @date  06/11/01  HSK山本     V1.4      CR検査部構造見直し[4]対応

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
    <TITLE>Printer_Ctrl</TITLE>
    <META NAME="GENERATOR" CONTENT="Microsoft Visual Studio .NET 7.1">
    <META NAME="CODE_LANGUAGE" CONTENT="C#">
    <META NAME="vs_defaultClientScript" CONTENT="JavaScript">
    <META NAME="vs_targetSchema" CONTENT="http://schemas.microsoft.com/intellisense/ie5">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/Printer_Ctrl.css">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/ButtonChange.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Printer_Ctrl.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/DefineLangStr.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Control.js" CHARSET="UTF-8"></SCRIPT>
  </HEAD>
  <BODY ONLOAD="Fn_InitPage();" ONSELECTSTART="return false;" ONCONTEXTMENU="return false;">
    <!-- 2005/05/24 blue→Green -->
    <IMG ID="imgOKBtnBack" SRC="../Bmp/indBtnBack1Plt.gif">
    <IMG ID="imgOK" SRC="../Bmp/cmCirBGreenBtnU.gif"
          ONCLICK="top.Exit();" 
          ONMOUSEUP="SetImageUrl(this,'../Bmp/cmCirBGreenBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/cmCirBGreenBtnD.gif');"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/cmCirBGreenBtnU.gif');"
          ONDRAG="return false;">
    <DIV ID="divOK"
          ONCLICK="document.getElementById('imgOK').onclick();" 
          ONMOUSEUP="document.getElementById('imgOK').onmouseup();"
          ONMOUSEDOWN="document.getElementById('imgOK').onmousedown();"
          ONMOUSEOUT="document.getElementById('imgOK').onmouseout();"></DIV>
    <!-- リフレッシュボタン -->
    <IMG ID="imgRefreshBtnBack" SRC="../Bmp/indBtnBack1Plt.gif">
    <IMG ID="imgRefresh" SRC="../Bmp/cmCirBblueBtnU.gif"
          ONCLICK="Fn_Refresh();" 
          ONMOUSEUP="SetImageUrl(this,'../Bmp/cmCirBblueBtnU.gif');" 
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/cmCirBblueBtnD.gif');"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/cmCirBblueBtnU.gif');"
          ONDRAG="return false;">
    <DIV ID="divRefresh"
          ONCLICK="document.getElementById('imgRefresh').onclick();" 
          ONMOUSEUP="document.getElementById('imgRefresh').onmouseup();" 
          ONMOUSEDOWN="document.getElementById('imgRefresh').onmousedown();"
          ONMOUSEOUT="document.getElementById('imgRefresh').onmouseout();"></DIV>
    <!-- プリンタ画面表示フレーム -->
    <IFRAME ID="PRINTER_VIEW" FRAMEBORDER="no" ALLOWTRANSPARENCY></IFRAME>
    <!-- プリンタ情報取得フレーム -->
    <IFRAME ID="PRINTER_GET_PROC"></IFRAME>
    <!-- コンボボックス -->
    <!-- 表示下部 -->
    <DIV ID="divComboBox"></DIV>
    <!-- クリックイベント取得用フレーム -->
    <TABLE ID="ComboBoxFrame" ONCLICK="Fn_HideDrop();">
      <TR><TD></TD></TR>
    </TABLE>
    <!-- 背景  -->
    <DIV ID="divFooter"></DIV>
    <IMG ID="imgFooter" SRC="../Bmp/cmBorder.gif">
    <DIV ID="divBackGround"></DIV>
    <!-- ログ出力用フレーム -->
    <IFRAME ID="LOGGER_PROC"></IFRAME>
  </BODY>
</HTML>
