<%@ Page language="c#" Codebehind="MediaList_View.aspx.cs" AutoEventWireup="false" Inherits="Indicator.MediaList_View" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file MediaList_View.aspx

  @brief 保管用ディスク一覧表示用フレーム


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
    <TITLE>MediaList_View</TITLE>
    <META CONTENT="True" NAME="vs_snapToGrid">
    <META CONTENT="Microsoft Visual Studio .NET 7.1" NAME="GENERATOR">
    <META CONTENT="C#" NAME="CODE_LANGUAGE">
    <META CONTENT="JavaScript" NAME="vs_defaultClientScript">
    <META CONTENT="http://schemas.microsoft.com/intellisense/ie5" NAME="vs_targetSchema">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/MediaList_View.css" CHARSET="UTF-8">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/MediaList_View.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/ButtonChange.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Control.js" CHARSET="UTF-8"></SCRIPT>
  </HEAD>
  <BODY ONSELECTSTART="return false" ONLOAD="Fn_InitPage()" ONCONTEXTMENU="return false;">
    <!-- ヘッダ -->
    <IMG ID="imgHeader" SRC="../Bmp/indMedeiaListBar.gif" ONDRAG="return false;">
    <!-- 2005/05/24 ================================================================ -->
    <IMG ID="imgHeader1" SRC="../Bmp/indListBar_Line.gif" ONDRAG="return false;">
    <IMG ID="imgHeader2" SRC="../Bmp/indListBar_Line.gif" ONDRAG="return false;">
    <IMG ID="imgHeader3" SRC="../Bmp/indListBar_Line.gif" ONDRAG="return false;">
    <!-- =========================================================================== -->
    <TABLE ID="tblMediaName"><TR><TD>
      <DIV ID="divMediaName"></DIV>
    </TD></TR></TABLE>
    <TABLE ID="tblStart"><TR><TD>
      <DIV ID="divStart"></DIV>
    </TD></TR></TABLE>
    <TABLE ID="tblEnd"><TR><TD>
      <DIV ID="divEnd"></DIV>
    </TD></TR></TABLE>
    <TABLE ID="tblStatus"><TR><TD>
      <DIV ID="divStatus"></DIV>
    </TD></TR></TABLE>
    <!-- ページ表示 -->
    <TABLE ID="tblPage"><TR><TD>
      <DIV ID="divPage"></DIV>
    </TD></TR></TABLE>
    <!-- 前ページボタン -->
    <IMG ID="imgPrevPage" SRC="../Bmp/cmBeforeLBtnU.gif"
          ONDRAG="return false;"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/cmBeforeLBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/cmBeforeLBtnD.gif');"
          ONCLICK="Public_GetPrevPage()"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/cmBeforeLBtnU.gif');">
    <IMG ID="imgPrevPageDisable" SRC="../Bmp/cmBeforeLBtnX.gif"
          ONDRAG="return false;">
    <!-- 次ページボタン -->
    <IMG ID="imgNextPage" SRC="../Bmp/cmNextLBtnU.gif"
          ONDRAG="return false;"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/cmNextLBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/cmNextLBtnD.gif');"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/cmNextLBtnU.gif');"
          ONCLICK="Public_GetNextPage()">
    <IMG ID="imgNextPageDisable" SRC="../Bmp/cmNextLBtnX.gif"
          ONDRAG="return false;">
    <!-- 保管用ディスクリスト　-->
    <DIV ID="divMediaList">
      <TABLE ID="table" CELLSPACING="0" CELLPADDING="0">
        <SCRIPT LANGUAGE="javascript">
        <!--
        for(i = 0; i < top.FUNCTION_FRAME.MediaListMax; i++){
          if(i%2){
            BackColor = "White";
          }else{
            BackColor = "EBFFEB";
          }
          document.write("<TR ID='TR' BGCOLOR='" + BackColor + "'>\n");
          document.write("<TD ID='tdSpace'></TD>\n");
          document.write("<TD ID='tdDiskName'><DIV ID='divDiskNameTxt'></DIV></TD>\n");
          document.write("<TD ID='tdWriteStart'><DIV ID='divWriteStartTxt'></DIV></TD>\n");
          document.write("<TD ID='tdWriteEnd'><DIV ID='divWriteEndTxt'></DIV></TD>\n");
          document.write("<TD ID='tdStatus'><DIV ID='divStatusTxt'></DIV></TD>\n");
          document.write("</TR>\n");
        }
        -->
        </SCRIPT>
      </TABLE>
    </DIV>
    <HR ID="hrTop" COLOR="#000000" SIZE="1">
    <HR ID="hrBottom" COLOR="#000000" SIZE="1">
  </BODY>
</HTML>
