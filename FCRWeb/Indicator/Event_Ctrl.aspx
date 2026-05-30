<%@ Page language="c#" Codebehind="Event_Ctrl.aspx.cs" AutoEventWireup="false" Inherits="Indicator.Event_Ctrl" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
    <TITLE>Event_Ctrl</TITLE> 
<%
/****************************************************************************

  @file Event_Ctrl.aspx

  @brief イベント情報ユーティリティメインフレーム


  @author YSK菅野

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reseved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/22  YSK菅野     XX-XX      新規作成
  @date  06/11/01  HSK山本     V1.4       CR検査部構造見直し[4]対応

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
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/Event_Ctrl.css" CHARSET="UTF-8">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/ButtonChange.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Event_Ctrl.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/DefineLangStr.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Control.js" CHARSET="UTF-8"></SCRIPT>
</HEAD>
  <BODY ONSELECTSTART="return false;" ONLOAD="Fn_InitPage();" ONCONTEXTMENU="return false;">
    <!-- OKボタン -->
    <!-- 2005/05/24 blue→Green -->
    <IMG ID="imgOKBtnBack" SRC="../Bmp/indBtnBack1Plt.gif">
    <IMG ID="imgOK" ONCLICK="top.Exit();"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/cmCirBGreenBtnU.gif');" 
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/cmCirBGreenBtnD.gif');"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/cmCirBGreenBtnU.gif');"
          ONDRAG="return false;"
          SRC="../Bmp/cmCirBGreenBtnU.gif">
    <DIV ID="divOK" ONCLICK="document.getElementById('imgOK').onclick();"
          ONMOUSEUP="document.getElementById('imgOK').onmouseup();"
          ONMOUSEDOWN="document.getElementById('imgOK').onmousedown();"
          ONMOUSEOUT="document.getElementById('imgOK').onmouseout();"></DIV>
    <!-- リフレッシュボタン -->
    <IMG ID="imgRefreshBtnBack" SRC="../Bmp/indBtnBack1Plt.gif">
    <IMG ID="imgRefresh" ONCLICK="Fn_Refresh();"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/cmCirBblueBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/cmCirBblueBtnD.gif');"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/cmCirBblueBtnU.gif');"
          ONDRAG="return false;"
          SRC="../Bmp/cmCirBblueBtnU.gif">
    <DIV ID="divRefresh" ONCLICK="document.getElementById('imgRefresh').onclick();"
          ONMOUSEUP="document.getElementById('imgRefresh').onmouseup();" 
          ONMOUSEDOWN="document.getElementById('imgRefresh').onmousedown();"
          ONMOUSEOUT="document.getElementById('imgRefresh').onmouseout();"></DIV>
    <!-- イベント情報表示用フレーム -->
    <IFRAME ID="EVENT_VIEW" FRAMEBORDER="no" ALLOWTRANSPARENCY></IFRAME>
    <!-- イベント情報取得用フレーム -->
    <IFRAME ID="EVENT_GET_PROC"></IFRAME>
    <!-- イベント操作用フレーム -->
    <IFRAME ID="EVENT_CONTROL_PROC"></IFRAME>
    <!-- コンボボックス -->
    <!-- コンボボックス下部 -->
    <DIV ID="divComboBox"></DIV>
    <!-- クリックイベント取得用フレーム -->
    <TABLE ID="ComboBoxFrame" ONCLICK="Fn_HideDrop();">
      <TR><TD><FONT 
  FACE="MS UI Gothic"></FONT></TD></TD></TR>
    </TABLE>
    <!-- エラー詳細画面 -->
    <TABLE ID="tblDetailDispFrame" BORDERCOLOR="#000000" ALIGN="center">
      <TR><TD>
        <TABLE ID="tblDetailDisp">
          <TR><TD>
            <TABLE ID="tblErrorLevel"><TR><TD>
              <DIV ID="divErrorLevel"></DIV>
            </TD></TR></TABLE>
            <TABLE ID="tblErrorCode"><TR><TD>
              <DIV ID="divErrorCode"></DIV>
            </TD></TR></TABLE>
            <TABLE ID="tblDateTime"><TR><TD>
              <DIV ID="divDateTime"></DIV>
            </TD></TR></TABLE>
            <TABLE ID="tblKind"><TR><TD>
              <DIV ID="divKind"></DIV>
            </TD></TR></TABLE>
            <TABLE ID="tblErrorInformation"><TR><TD>
              <DIV ID="divErrorInformation"></DIV>
            </TD></TR></TABLE>
            <TABLE ID="tblErrorDetail"><TR><TD>
              <DIV ID="divErrorDetail"></DIV>
            </TD></TR></TABLE>
            <TABLE ID="tblErrorLevelTxt"><TR><TD>
              <DIV ID="divErrorLevelTxt"></DIV>
            </TD></TR></TABLE>
            <TABLE ID="tblErrorCodeTxt"><TR><TD>
              <DIV ID="divErrorCodeTxt"></DIV>
            </TD></TR></TABLE>
            <TABLE ID="tblDateTimeTxt"><TR><TD>
              <DIV ID="divDateTimeTxt"></DIV>
            </TD></TR></TABLE>
            <TABLE ID="tblKindTxt"><TR><TD>
              <DIV ID="divKindTxt"></DIV>
            </TD></TR></TABLE>
            <DIV ID="divErrorInfoTxt"></DIV>
            <DIV ID="divErrorDetailTxt"></DIV>
            <!-- 閉じるボタン -->
            <IMG ID="imgClose" SRC="../Bmp/cmOvalAGreenLBtnU.gif">
            <TABLE ID="tblClose" ONCLICK="Fn_CloseDialog();"
                   ONMOUSEDOWN="SetImageUrl(document.getElementById('imgClose'),'../Bmp/cmOvalAGreenLBtnD.gif');"
                   ONMOUSEUP="SetImageUrl(document.getElementById('imgClose'),'../Bmp/cmOvalAGreenLBtnU.gif');"
                   ONMOUSEOUT="SetImageUrl(document.getElementById('imgClose'),'../Bmp/cmOvalAGreenLBtnU.gif');"><TR><TD>
              <DIV ID="divClose"></DIV>
            </TD></TR></TABLE>
          </TD></TR>
        </TABLE>
      </TD></TR>
    </TABLE>
    <!-- 背景  -->
    <DIV ID="divFooter"></DIV>
    <IMG ID="imgFooter" SRC="../Bmp/cmBorder.gif">
    <DIV ID="divBackGround"></DIV>
    <!-- ログ出力用フレーム -->
    <IFRAME ID="LOGGER_PROC"></IFRAME>
  </BODY>
</HTML>
