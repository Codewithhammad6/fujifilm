<%@ Page language="c#" Codebehind="DeviceTub.aspx.cs" AutoEventWireup="false" Inherits="Indicator.DeviceTub" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file DeviceTub.aspx

  @brief タブフレーム


  @author TYK石井

  Copyright(c) 2014 FUJIFILM Corporation All rights reserved.

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
    <TITLE>DeviceTub</TITLE>
    <META CONTENT="Microsoft Visual Studio .NET 7.1" NAME="GENERATOR">
    <META CONTENT="C#" NAME="CODE_LANGUAGE">
    <META CONTENT="JavaScript" NAME="vs_defaultClientScript">
    <META CONTENT="http://schemas.microsoft.com/intellisense/ie5" NAME="vs_targetSchema">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/DeviceTub.css" CHARSET="UTF-8">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/DeviceTub.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/DefineLangStr.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Control.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript">
    <!--
    function Fn_OnLoad(){
      g_TubView = <%=nTubView%>;
      g_UtilityNumber = <%=nUtilityNumber%>;
    }
    -->
    </SCRIPT>
  </HEAD>
  <BODY ONSELECTSTART="return false" ONLOAD="Fn_OnLoad();Fn_InitPage(top.UtilityKind);">
    <!-- 装置表示用フレーム -->
    <IFRAME ID="DEVICE_VIEW" FRAMEBORDER="no" ALLOWTRANSPARENCY></IFRAME>
    <!-- RUタブ -->
    <DIV ID="divRUTub" ONCLICK="ChangeDeviceTub(1);">
      <IMG ID="imgRUTub" ONDRAG="return false;" SRC="../Bmp/Tab_CR_OFF.gif">
      <DIV ID="divRUTubText" ALIGN="left"></DIV>
    </DIV>
    <IMG ID="imgRUTubHidden" ONDRAG="return false;" SRC="../Bmp/indRUTub3.gif">
    <!-- DRタブ -->
    <DIV ID="divDRTub" ONCLICK="ChangeDeviceTub(2);">
      <IMG ID="imgDRTub" ONDRAG="return false;" SRC="../Bmp/Tab_DR_OFF.gif">
      <DIV ID="divDRTubText" ALIGN="left"></DIV>
    </DIV>
    <IMG ID="imgDRTubHidden" ONDRAG="return false;" SRC="../Bmp/indRUTub3.gif">
    <IMG ID="imgDummyTubHidden1" ONDRAG="return false;" SRC="../Bmp/indRUTub3.gif">
    <IMG ID="imgDummyTubHidden2" ONDRAG="return false;" SRC="../Bmp/indRUTub3.gif">
    <IMG ID="imgDummyTubHidden3" ONDRAG="return false;" SRC="../Bmp/indRUTub3.gif">
    <!-- タブ操作制御用テーブル -->
    <TABLE ID="tblTubDisable">
      <TR><TD></TD></TR>
    </TABLE>
    <!-- 背景  -->
    <DIV ID="divFooter"></DIV>
    <IMG ID="imgFooter" SRC="../Bmp/cmBorder.gif">
    <!-- ログ出力用フレーム -->
    <IFRAME ID="LOGGER_PROC"></IFRAME>
  </BODY>
</HTML>
