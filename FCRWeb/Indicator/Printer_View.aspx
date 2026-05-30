<%@ Page language="c#" Codebehind="Printer_View.aspx.cs" AutoEventWireup="false" Inherits="Indicator.Printer_View" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file Printer_View.aspx

  @brief プリンタユーティリティ表示用フレーム


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
    <TITLE>Printer_View</TITLE>
    <META CONTENT="Microsoft Visual Studio .NET 7.1" NAME="GENERATOR">
    <META CONTENT="C#" NAME="CODE_LANGUAGE">
    <META CONTENT="JavaScript" NAME="vs_defaultClientScript">
    <META CONTENT="http://schemas.microsoft.com/intellisense/ie5" NAME="vs_targetSchema">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/Printer_View.css">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Printer_View.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/ButtonChange.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Control.js" CHARSET="UTF-8"></SCRIPT>
  </HEAD>
  <BODY ONSELECTSTART="return false;" ONLOAD="Fn_InitPage();" ONCONTEXTMENU="return false;">
    <!-- 装置名称ラベル -->
    <TABLE ID="tblDeviceName"><TR><TD>
      <DIV ID="divDeviceName"></DIV>
    </TD></TR></TABLE>
    <!-- 装置状態ラベル -->
    <TABLE ID="tblDeviceStatus"><TR><TD>
      <DIV ID="divDeviceStatus"></DIV>
    </TD></TR></TABLE>
    <!-- 詳細情報ラベル -->
    <TABLE ID="tblDetail"><TR><TD>
      <DIV ID="divDetail"></DIV>
    </TD></TR></TABLE>
    <!-- デバイス状態テキスト -->
    <TABLE ID="tblDeviceStatusTxt"><TR><TD>
      <DIV ID="divDeviceStatusTxt"></DIV>
    </TD></TR></TABLE>
    <!-- 詳細情報テキスト -->
    <DIV ID="divDetailTxt"></DIV>
    <!-- コンボボックス -->
    <!-- 表示上部 -->
    <TABLE ID="tblHead" BORDER="0" CELLSPACING="0">
      <TR><TD ID="tdHead" ONMOUSEDOWN="Fn_ShowDrop();">
        <DIV ID="divHead" NOWRAP></DIV>
      </TD></TR>
    </TABLE>
    <!-- ボタン -->
    <IMG ID="imgPull" SRC="../Bmp/cmPullDownBtnU.gif"
         ONMOUSEDOWN="this.src='../Bmp/cmPullDownBtnD.gif';Fn_ShowDrop();"
         ONMOUSEUP="this.src='../Bmp/cmPullDownBtnU.gif';"
         ONMOUSEOUT="this.src='../Bmp/cmPullDownBtnU.gif';"
         ONDRAG="return false;">
  </BODY>
</HTML>
