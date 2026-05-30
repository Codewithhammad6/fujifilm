<%@ Page language="c#" Codebehind="RUControl_View.aspx.cs" AutoEventWireup="false" Inherits="Indicator.RUControl_View" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file RUControl_View.aspx

  @brief RU操作画面表示用フレーム


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
    <TITLE>RUControl_View</TITLE>
    <META NAME="GENERATOR" CONTENT="Microsoft Visual Studio .NET 7.1">
    <META NAME="CODE_LANGUAGE" CONTENT="C#">
    <META NAME="vs_defaultClientScript" CONTENT="JavaScript">
    <META NAME="vs_targetSchema" CONTENT="http://schemas.microsoft.com/intellisense/ie5">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/RUControl_View.css" CHARSET="UTF-8">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/RUControl_View.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/ButtonChange.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Control.js" CHARSET="UTF-8"></SCRIPT>
  </HEAD>
  <BODY ONSELECTSTART="return false" ONLOAD="Fn_InitPage()" ONCONTEXTMENU="return false;">
    <!-- スキャナクリーニングラベル -->
    <TABLE ID="tblRUCleaning"><TR><TD>
      <DIV ID="divRUCleaning"></DIV>
    </TD></TR></TABLE>
    <!-- スキャナクリーニングボタン -->
    <IMG ID="imgRUExecution" SRC="../Bmp/cmSquare5BtnU.gif">
    <TABLE ID="tblRUExecution"
            ONCLICK="Fn_RUControl(1);"
            ONMOUSEDOWN="SetImageUrl(document.getElementById('imgRUExecution'),'../Bmp/cmSquare5BtnD.gif');"
            ONMOUSEUP="SetImageUrl(document.getElementById('imgRUExecution'),'../Bmp/cmSquare5BtnU.gif');"
            ONMOUSEOUT="SetImageUrl(document.getElementById('imgRUExecution'),'../Bmp/cmSquare5BtnU.gif');">
      <TR><TD>
        <DIV ID="divRUExecution"></DIV>
      </TD></TR>
    </TABLE>
  </BODY>
</HTML>
