<%@ Page language="c#" Codebehind="RUStatus_View.aspx.cs" AutoEventWireup="false" Inherits="Indicator.RUStatus_View" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
    <TITLE>RUStatus_View</TITLE>
<%
/****************************************************************************

  @file RUStatus_View.aspx

  @brief RUユーティリティステータス表示用フレーム


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
    <META CONTENT="Microsoft Visual Studio .NET 7.1" NAME="GENERATOR">
    <META CONTENT="C#" NAME="CODE_LANGUAGE">
    <META CONTENT="JavaScript" NAME="vs_defaultClientScript">
    <META CONTENT="http://schemas.microsoft.com/intellisense/ie5" NAME="vs_targetSchema">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/RUStatus_View.css" CHARSET="UTF-8">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/RUStatus_View.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/ButtonChange.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Control.js" CHARSET="UTF-8"></SCRIPT>
</HEAD>
  <BODY ONSELECTSTART="return false;" ONLOAD="Fn_InitPage();" ONCONTEXTMENU="return false;">
    <!-- 装置状態 -->
    <TABLE ID="tblRuStatus"><TR><TD>
      <DIV ID="divRuStatus"></DIV>
    </TD></TR></TABLE>
      <DIV ID="divStatus"></DIV>
    <!-- 詳細情報 -->
    <TABLE ID="tblRuDetail"><TR><TD>
      <DIV ID="divRuDetail"></DIV>
    </TD></TR></TABLE>
    <DIV ID="divDetail"></DIV>
    <!-- RU操作ボタン1 -->
    <IMG ID="imgRUButton1" SRC="../Bmp/cmSquare4BtnU.gif">
    <TABLE ID="tblRUButton1"
          ONCLICK="Fn_WindowRequest(1);"
          ONMOUSEDOWN="SetImageUrl(document.getElementById('imgRUButton1'),'../Bmp/cmSquare4BtnU.gif');"
          ONMOUSEUP="SetImageUrl(document.getElementById('imgRUButton1'),'../Bmp/cmSquare4BtnD.gif');"
          ONMOUSEOUT="SetImageUrl(document.getElementById('imgRUButton1'),'../Bmp/cmSquare4BtnU.gif');"><TR><TD>
      <DIV ID="divRUButton1"></DIV>
    </TD></TR></TABLE>
    <!-- RU操作ボタン2 -->
    <IMG ID="imgRUButton2" SRC="../Bmp/cmSquare4BtnU.gif">
    <TABLE ID="tblRUButton2"
          ONCLICK="Fn_WindowRequest(2);"
          ONMOUSEDOWN="SetImageUrl(document.getElementById('imgRUButton2'),'../Bmp/cmSquare4BtnU.gif');"
          ONMOUSEUP="SetImageUrl(document.getElementById('imgRUButton2'),'../Bmp/cmSquare4BtnD.gif');"
          ONMOUSEOUT="SetImageUrl(document.getElementById('imgRUButton2'),'../Bmp/cmSquare4BtnU.gif');"><TR><TD>
      <DIV ID="divRUButton2"></DIV>
    </TD></TR></TABLE>
    <!-- RU操作ボタン3 -->
    <IMG ID="imgRUButton3" SRC="../Bmp/cmSquare4BtnU.gif">
    <TABLE ID="tblRUButton3"
          ONCLICK="Fn_WindowRequest(3);"
          ONMOUSEDOWN="SetImageUrl(document.getElementById('imgRUButton3'),'../Bmp/cmSquare4BtnD.gif');"
          ONMOUSEUP="SetImageUrl(document.getElementById('imgRUButton3'),'../Bmp/cmSquare4BtnU.gif');"
          ONMOUSEOUT="SetImageUrl(document.getElementById('imgRUButton3'),'../Bmp/cmSquare4BtnU.gif');"><TR><TD>
      <DIV ID="divRUButton3"></DIV>
    </TD></TR></TABLE>
    <!-- RU操作ボタン4 -->
    <IMG ID="imgRUButton4" SRC="../Bmp/cmSquare4BtnU.gif">
    <TABLE ID="tblRUButton4"
          ONCLICK="Fn_WindowRequest(4);"
          ONMOUSEDOWN="SetImageUrl(document.getElementById('imgRUButton4'),'../Bmp/cmSquare4BtnD.gif');"
          ONMOUSEUP="SetImageUrl(document.getElementById('imgRUButton4'),'../Bmp/cmSquare4BtnU.gif');"
          ONMOUSEOUT="SetImageUrl(document.getElementById('imgRUButton4'),'../Bmp/cmSquare4BtnU.gif');"><TR><TD>
      <DIV ID="divRUButton4"></DIV>
    </TD></TR></TABLE>
  </BODY>
</HTML>
