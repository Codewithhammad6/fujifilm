<%@ Page language="c#" Codebehind="Queue_View.aspx.cs" AutoEventWireup="false" Inherits="Indicator.Queue_View" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file Queue_View.aspx

  @brief 出力キューユーティリティメインフレーム


  @author YSK菅野

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reseved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/22  YSK菅野     XX-XX      新規作成
  @date  07/03/16  HSK平尾     V2.0       内視鏡画像取込対応

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
    <TITLE>Queue_View</TITLE>
    <META CONTENT="True" NAME="vs_snapToGrid">
    <META CONTENT="Microsoft Visual Studio .NET 7.1" NAME="GENERATOR">
    <META CONTENT="C#" NAME="CODE_LANGUAGE">
    <META CONTENT="JavaScript" NAME="vs_defaultClientScript">
    <META CONTENT="http://schemas.microsoft.com/intellisense/ie5" NAME="vs_targetSchema">
    <LINK HREF="CSS/Queue_View.css" TYPE="text/css" CHARSET="UTF-8" REL="stylesheet">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/ButtonChange.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Queue_View.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Control.js" CHARSET="UTF-8"></SCRIPT>
  </HEAD>
  <BODY ONLOAD="Fn_InitPage()" ONCONTEXTMENU="return false;" ONSELECTSTART="return false;">
    <HR ID="hrTop" SIZE="1">
    <HR ID="hrBottom" SIZE="1">
    <!-- ヘッダ -->
    <IMG ID="imgHeader" SRC="../Bmp/indMedeiaListBar.gif" ONDRAG="return false;">
    <!-- 2005/05/24 ================================================================ -->
    <IMG ID="imgHeader1" SRC="../Bmp/indListBar_Line.gif" ONDRAG="return false;">
    <IMG ID="imgHeader2" SRC="../Bmp/indListBar_Line.gif" ONDRAG="return false;">
    <IMG ID="imgHeader3" SRC="../Bmp/indListBar_Line.gif" ONDRAG="return false;">
    <IMG ID="imgHeader4" SRC="../Bmp/indListBar_Line.gif" ONDRAG="return false;">
    <IMG ID="imgHeader5" SRC="../Bmp/indListBar_Line.gif" ONDRAG="return false;">
    <%-- 20070316 HSK平尾 V2.0 内視鏡画像取込対応 A Start --%>
    <IMG ID="imgHeader6" SRC="../Bmp/indListBar_Line.gif" ONDRAG="return false;">
    <%-- 20070316 HSK平尾 V2.0 内視鏡画像取込対応 A End --%>
    <!-- =========================================================================== -->
    <TABLE ID="tblPatientID"><TR><TD>
      <DIV ID="divPatientID"></DIV>
    </TD></TR></TABLE>
    <TABLE ID="tblPatientName"><TR><TD>
      <DIV ID="divPatientName"></DIV>
    </TD></TR></TABLE>
    <TABLE ID="tblStudyDateTime"><TR><TD>
      <DIV ID="divStudyDateTime"></DIV>
    </TD></TR></TABLE>
    <TABLE ID="tblAliasName"><TR><TD>
      <DIV ID="divAliasName"></DIV>
    </TD></TR></TABLE>
    <%-- 20070316 HSK平尾 V2.0 内視鏡画像取込対応 A Start --%>
    <TABLE ID="tblModality"><TR><TD>
      <DIV ID="divModality"></DIV>
    </TD></TR></TABLE>
    <%-- 20070316 HSK平尾 V2.0 内視鏡画像取込対応 A End --%>
    <TABLE ID="tblKind"><TR><TD>
      <DIV ID="divKind"></DIV>
    </TD></TR></TABLE>
    <TABLE ID="tblStatus"><TR><TD>
      <DIV ID="divStatus"></DIV>
    </TD></TR></TABLE>
    <!-- 削除ボタン -->
    <IMG ID="imgDelete" SRC="../Bmp/indQueueDelBtnU.gif"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/indQueueDelBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/indQueueDelBtnD.gif');"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/indQueueDelBtnU.gif');"
          ONCLICK="Fn_ShowDeleteConfirm();" ONDRAG="return false;">
    <DIV ID="divDelete" ALIGN="center"
          ONMOUSEUP="document.getElementById('imgDelete').onmouseup();"
          ONMOUSEDOWN="document.getElementById('imgDelete').onmousedown();"
          ONMOUSEOUT="document.getElementById('imgDelete').onmouseout();"
          ONCLICK="document.getElementById('imgDelete').onclick();"></DIV>
    <!-- 強制出力ボタン -->
    <IMG ID="imgOutForce" SRC="../Bmp/indQueueCompBtnU.gif"
          ONCLICK="Public_ControlQueue(1);"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/indQueueCompBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/indQueueCompBtnD.gif');"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/indQueueCompBtnU.gif');"
          ONDRAG="return false;">
    <DIV ID="divOutForce" ALIGN="center"
          ONCLICK="document.getElementById('imgOutForce').onclick();"
          ONMOUSEUP="document.getElementById('imgOutForce').onmouseup();"
          ONMOUSEDOWN="document.getElementById('imgOutForce').onmousedown();"
          ONMOUSEOUT="document.getElementById('imgOutForce').onmouseout();"></DIV>
    <!-- 前ページボタン -->
    <IMG ID="imgPrevPage" SRC="../Bmp/cmBeforeLBtnU.gif" 
          ONCLICK="Fn_GetPrevPage();" 
          ONMOUSEUP="SetImageUrl(this,'../Bmp/cmBeforeLBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/cmBeforeLBtnD.gif');"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/cmBeforeLBtnU.gif');"
          ONDRAG="return false;">
    <IMG ID="imgPrevPageDisable" SRC="../Bmp/cmBeforeLBtnX.gif"
          ONDRAG="return false;"> 
    <!-- 次ページボタン -->
    <IMG ID="imgNextPage" SRC="../Bmp/cmNextLBtnU.gif"
          ONCLICK="Fn_GetNextPage();"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/cmNextLBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/cmNextLBtnD.gif');"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/cmNextLBtnU.gif');"
          ONDRAG="return false;">
    <IMG ID="imgNextPageDisable" SRC="../Bmp/cmNextLBtnX.gif"
          ONDRAG="return false;"> 
    <!-- ページ表示 -->
    <DIV ID="divPage" ALIGN="center"></DIV>
    <!-- コンボボックス -->
    <TABLE ID="tblFilter"><TR><TD>
      <DIV ID="divFilter"></DIV>
    </TD></TR></TABLE>
    <!-- 表示上部 -->
    <TABLE ID="tblHead" BORDER="0" CELLSPACING="0">
      <TR><TD ID="head" ONMOUSEDOWN="Fn_ShowDrop();">
        <DIV ID="divHeader" NOWRAP></DIV>
      </TD></TR>
    </TABLE>
    <!-- ボタン -->
    <IMG ID="imgPull" SRC="../Bmp/cmPullDownBtnU.gif"
          ONMOUSEDOWN="this.src='../Bmp/cmPullDownBtnD.gif';Fn_ShowDrop();"
          ONMOUSEUP="this.src='../Bmp/cmPullDownBtnU.gif';"
          ONMOUSEOUT="this.src='../Bmp/cmPullDownBtnU.gif';"
          ONDRAG="return false;">
    <!-- 出力キュー情報リスト -->
    <DIV ID="divQueueList">
      <TABLE ID="table" BORDER="0" CELLSPACING="0">
        <SCRIPT LANGUAGE="javascript">
        <!--
          for(i = 0; i < top.FUNCTION_FRAME.QueListMax; i++){
          if(i%2){
            BackColor = "White";
          }else{
            BackColor = "EBFFEB";
          }
          
          document.write("<TR ID='TR' bgColor='" + BackColor + "' ONCLICK='Fn_SelectLine(this," + i + ");'>\n");
          document.write("<TD ID='tdSpace'></TD>\n");
          document.write("<TD ID='tdPatientID' ALIGN=left><DIV ID='divPatientIDTxt'></DIV></TD>\n");
          document.write("<TD ID='tdPatientName' ALIGN=left><DIV ID='divPatientNameTxt'></DIV></TD>\n");
          document.write("<TD ID='tdStudyDateTime' ALIGN=left><DIV ID='divStudyDateTimeTxt'></DIV></TD>\n");
          document.write("<TD ID='tdAliasName' ALIGN=left><DIV ID='divAliasNameTxt'></DIV></TD>\n");
          <%-- 20070316 HSK平尾 V2.0 内視鏡画像取込対応 A Start --%>
          document.write("<TD ID='tdModality' ALIGN=left><DIV ID='divModalityTxt'></DIV></TD>\n");
          <%-- 20070316 HSK平尾 V2.0 内視鏡画像取込対応 A End --%>
          document.write("<TD ID='tdKind' ALIGN=left><DIV ID='divKindTxt'></DIV></TD>\n");
          document.write("<TD ID='tdStatus' ALIGN=left><DIV ID='divStatusTxt'></DIV></TD>\n");
          document.write("</TR>\n");
          }
        -->
        </SCRIPT>
      </TABLE>
    </DIV>
  </BODY>
</HTML>
