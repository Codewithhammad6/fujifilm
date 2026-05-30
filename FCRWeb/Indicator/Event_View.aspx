<%@ Page language="c#" Codebehind="Event_View.aspx.cs" AutoEventWireup="false" Inherits="Indicator.Event_View" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 TRANSITIONAL//EN" > 
<%
/****************************************************************************

  @file Main.aspx

  @brief インジケータユーティリティメインフレーム


  @author YSK菅野

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reseved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/22  YSK菅野     XX-XX      新規作成
  @date  09/07/27  FF 星野     V6.0       インジケーター切り離し対応
  @date  10/04/05  FF 星野     V2.0(B)    インジケーター全削除対応

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
    <TITLE>Event_View</TITLE>
    <META NAME="vs_showGrid" CONTENT="False">
    <META CONTENT="Microsoft Visual Studio .NET 7.1" NAME="GENERATOR">
    <META CONTENT="C#" NAME="CODE_LANGUAGE">
    <META CONTENT="JavaScript" NAME="vs_defaultClientScript">
    <META CONTENT="http://schemas.microsoft.com/intellisense/ie5" NAME="vs_targetSchema">
    <LINK HREF="CSS/Event_View.css" TYPE="text/css" CHARSET="UTF-8" REL="stylesheet">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/ButtonChange.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Event_View.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Control.js" CHARSET="UTF-8"></SCRIPT>
  </HEAD>
  <BODY ONLOAD="Fn_InitPage();" ONSELECTSTART="return false;" ONCONTEXTMENU="return false;">
    <!-- 前ページボタン -->
    <IMG ID="imgPrevPage" SRC="../Bmp/cmBeforeLBtnU.gif" ONDRAG="return false;"
          ONCLICK="Fn_GetPrevPage();"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/cmBeforeLBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/cmBeforeLBtnD.gif');"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/cmBeforeLBtnU.gif');">
    <IMG ID="imgPrevPageDisable" SRC="../Bmp/cmBeforeLBtnX.gif" ONDRAG="return false;">
    <!-- 次ページボタン-->
    <IMG ID="imgNextPage" SRC="../Bmp/cmNextLBtnU.gif" ONDRAG="return false;"
          ONCLICK="Fn_GetNextPage()"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/cmNextLBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/cmNextLBtnD.gif');"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/cmNextLBtnU.gif');">
    <IMG ID="imgNextPageDisable" SRC="../Bmp/cmNextLBtnX.gif" ONDRAG="return false;">
    <!-- 詳細ボタン-->
    <IMG ID="imgDetail" SRC="../Bmp/indEventDetailBtnU.gif" ONDRAG="return false;"
          ONCLICK="Fn_OpenDialog();"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/indEventDetailBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/indEventDetailBtnD.gif');"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/indEventDetailBtnU.gif');">
    <DIV ID="divDetail" ALIGN="center"
          ONCLICK="document.getElementById('imgDetail').onclick();"
          ONMOUSEUP="document.getElementById('imgDetail').onmouseup();"
          ONMOUSEDOWN="document.getElementById('imgDetail').onmousedown();"
          ONMOUSEOUT="document.getElementById('imgDetail').onmouseout();"></DIV>
    <!-- 削除ボタン-->
    <IMG ID="imgDelete" SRC="../Bmp/indQueueDelBtnU.gif"
          ONCLICK="Fn_ShowDeleteConfirm();"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/indQueueDelBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/indQueueDelBtnD.gif');"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/indQueueDelBtnU.gif');"
          ONDRAG="return false;">
    <DIV ID="divDelete" ONCLICK="document.getElementById('imgDelete').onclick();"
          ONMOUSEUP="document.getElementById('imgDelete').onmouseup();"
          ONMOUSEDOWN="document.getElementById('imgDelete').onmousedown();"
          ONMOUSEOUT="document.getElementById('imgDelete').onmouseout();"
          ALIGN="center"></DIV>
    <!--2010.04.05 FF 星野 インジケーター全削除対応 ADD-->          
    <!-- 全削除ボタン-->
    <IMG ID="imgAllDelete" SRC="../Bmp/XALL_U.gif"
          ONCLICK="Fn_ShowAllDeleteConfirm();"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/XALL_U.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/XALL_D.gif');"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/XALL_U.gif');"
          ONDRAG="return false;">
    <DIV ID="divAllDelete" ONCLICK="document.getElementById('imgAllDelete').onclick();"
          ONMOUSEUP="document.getElementById('imgAllDelete').onmouseup();"
          ONMOUSEDOWN="document.getElementById('imgAllDelete').onmousedown();"
          ONMOUSEOUT="document.getElementById('imgAllDelete').onmouseout();"
          ALIGN="center"></DIV>
    <!--2010.04.05 FF 星野 インジケーター全削除対応 ADD-->                    
    <!-- 確認ボタン-->
    <IMG ID="imgConfirm" ONCLICK="Public_ControlEvent(1);"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/indEventConfBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/indEventConfBtnD.gif');"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/indEventConfBtnU.gif');"
          SRC="../Bmp/indEventConfBtnU.gif"
          ONDRAG="return false;">
    <DIV ID="divConfirm" ONCLICK="document.getElementById('imgConfirm').onclick();"
          ONMOUSEUP="document.getElementById('imgConfirm').onmouseup();"
          ONMOUSEDOWN="document.getElementById('imgConfirm').onmousedown();"
          ONMOUSEOUT="document.getElementById('imgConfirm').onmouseout();" 
          ALIGN="center"></DIV>
    <!-- 頁確認ボタン -->
    <IMG ID="imgConfirmAll" ONCLICK="Public_ControlEvent(0);"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/indAllEventConfBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/indAllEventConfBtnD.gif');"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/indAllEventConfBtnU.gif');"
          SRC="../Bmp/indAllEventConfBtnU.gif" ONDRAG="return false;">
    <DIV ID="divConfirmAll" ALIGN="center"
          ONCLICK="document.getElementById('imgConfirmAll').onclick();"
          ONMOUSEUP="document.getElementById('imgConfirmAll').onmouseup();"
          ONMOUSEDOWN="document.getElementById('imgConfirmAll').onmousedown();"
          ONMOUSEOUT="document.getElementById('imgConfirmAll').onmouseout();"></DIV>
    <!--2009.07.27 FF 星野 インジケーター切り離し対応 ADD-->
    <!--全確認ボタン-->
    <IMG ID="imgConfirmAllPage" ONCLICK="Public_ControlEvent(3);"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/indSelectAllBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/indSelectAllBtnD.gif');"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/indSelectAllBtnU.gif');"
          SRC="../Bmp/indSelectAllBtnU.gif" ONDRAG="return false;">
    <DIV ID="divConfirmAllPage" ALIGN="center"
          ONCLICK="document.getElementById('imgConfirmAllPage').onclick();"
          ONMOUSEUP="document.getElementById('imgConfirmAllPage').onmouseup();"
          ONMOUSEDOWN="document.getElementById('imgConfirmAllPage').onmousedown();"
          ONMOUSEOUT="document.getElementById('imgConfirmAllPage').onmouseout();"></DIV>
    <!-- ヘッダ -->
    <IMG ID="imgHeader" SRC="../Bmp/indMedeiaListBar.gif" ONDRAG="return false;">
    <!-- 2005/05/24 ================================================================ -->
    <IMG ID="imgHeader1" SRC="../Bmp/indListBar_Line.gif" ONDRAG="return false;">
    <IMG ID="imgHeader2" SRC="../Bmp/indListBar_Line.gif" ONDRAG="return false;">
    <IMG ID="imgHeader3" SRC="../Bmp/indListBar_Line.gif" ONDRAG="return false;">
    <IMG ID="imgHeader4" SRC="../Bmp/indListBar_Line.gif" ONDRAG="return false;">
    <!-- =========================================================================== -->
    <TABLE ID="tblErrLevel"><TR><TD>
      <DIV ID="divErrLevel"></DIV>
    </TD></TR></TABLE>
    <TABLE ID="tblErrCode"><TR><TD>
      <DIV ID="divErrCode"></DIV>
    </TD></TR></TABLE>
    <TABLE ID="tblIncDateTime"><TR><TD>
      <DIV ID="divIncDateTime"></DIV>
    </TD></TR></TABLE>
    <TABLE ID="tblErrKind"><TR><TD>
      <DIV ID="divErrKind"></DIV>
    </TD></TR></TABLE>
    <TABLE ID="tblErrStatus"><TR><TD>
      <DIV ID="divErrStatus"></DIV>
    </TD></TR></TABLE>
    <TABLE ID="tblErrInfo"><TR><TD>
      <DIV ID="divErrInfo"></DIV>
    </TD></TR></TABLE>
    <HR ID="hrTop" SIZE="1">
    <HR ID="hrBottom" SIZE="1">
    <!-- ページ数表示 -->
    <TABLE ID="tblPage"><TR><TD>
      <DIV ID="divPage"></DIV>
    </TD></TR></TABLE>
    <!-- 種別コンボボックス -->
    <TABLE ID="tblKindFilter"><TR><TD>
      <DIV ID="divKindFilter"></DIV>
    </TD></TR></TABLE>
    <!-- 表示上部 -->
    <TABLE ID="tblKindHead" BORDER="0" CELLSPACING="0">
      <TR><TD ID="tdKindHead" ONMOUSEDOWN="Fn_ShowDrop(0);">
        <DIV ID="divKindHead" NOWRAP></DIV>
      </TD></TR>
    </TABLE>
    <!-- ボタン -->
    <IMG ID="imgKindPull" SRC="../Bmp/cmPullDownBtnU.gif"
          ONMOUSEDOWN="this.src='../Bmp/cmPullDownBtnD.gif';Fn_ShowDrop(0);"
          ONMOUSEUP="this.src='../Bmp/cmPullDownBtnU.gif';"
          ONMOUSEOUT="this.src='../Bmp/cmPullDownBtnU.gif';"
          ONDRAG="return false;">
    <!-- ステータスコンボボックス -->
    <TABLE ID="tblStatusFilter"><TR><TD>
      <DIV ID="divStatusFilter"></DIV>
    </TD></TR></TABLE>
    <!-- 表示上部 -->
    <TABLE ID="tblStatusHead" BORDER="0" CELLSPACING="0">
      <TR><TD ID="tdStatusHead" ONMOUSEDOWN="Fn_ShowDrop(1);">
        <DIV ID="divStatusHead" NOWRAP></DIV>
      </TD></TR>
    </TABLE>
    <!-- ボタン -->
    <IMG ID="imgStatusPull" SRC="../Bmp/cmPullDownBtnU.gif"
          ONMOUSEDOWN="this.src='../Bmp/cmPullDownBtnD.gif';Fn_ShowDrop(1);"
          ONMOUSEUP="this.src='../Bmp/cmPullDownBtnU.gif';"
          ONMOUSEOUT="this.src='../Bmp/cmPullDownBtnU.gif';"
          ONDRAG="return false;">
    <!-- イベント情報リスト　-->
    <DIV ID="divList">
      <TABLE ID="table" BORDER="0" CELLSPACING="0">
        <SCRIPT LANGUAGE="javascript">
        <!--
          for(i = 0; i < top.FUNCTION_FRAME.EvtListMax; i++){
            if(i%2){
              BackColor = "White";
            }else{
              BackColor = "EBFFEB";
            }
            document.write("<TR ID='TR' BGCOLOR='" + BackColor + "' ONCLICK='Fn_SelectLine(this," + i + ");'>\n");
            document.write("<TD ID='tdSpace'></TD>\n");
            document.write("<TD ID='tdErrStatus' ALIGN=left><DIV ID='divErrStatusTxt'></DIV></TD>\n");
            document.write("<TD ID='tdErrLevel' ALIGN=left><DIV ID='divErrLevelTxt'></DIV></TD>\n");
            document.write("<TD ID='tdErrCode' ALIGN=left><DIV ID='divErrCodeTxt'></DIV></TD>\n");
            document.write("<TD ID='tdIncDateTime' ALIGN=left><DIV ID='divIncDateTimeTxt'></DIV></TD>\n");
            document.write("<TD ID='tdErrKind' ALIGN=left><DIV ID='divErrKindTxt'></DIV></TD>\n");
            document.write("<TD ID='tdErrInfo' ALIGN=left>\n");
            document.write("<DIV ID='divErrInfoTxt'></DIV>\n");
            document.write("</TD></TR>\n");
          }
        -->
        </SCRIPT>
      </TABLE>
    </DIV>
  </BODY>
</HTML>
