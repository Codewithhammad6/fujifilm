<%@ Page language="c#" Codebehind="RU_Ctrl.aspx.cs" AutoEventWireup="false" Inherits="Indicator.RU_Ctrl" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file RU_Ctrl.aspx

  @brief RUユーティリティメインフレーム


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
    <TITLE>RU_Ctrl</TITLE>
    <META CONTENT="Microsoft Visual Studio .NET 7.1" NAME="GENERATOR">
    <META CONTENT="C#" NAME="CODE_LANGUAGE">
    <META CONTENT="JavaScript" NAME="vs_defaultClientScript">
    <META CONTENT="http://schemas.microsoft.com/intellisense/ie5" NAME="vs_targetSchema">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/RU_Ctrl.css" CHARSET="UTF-8">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/RU_Ctrl.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/ButtonChange.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/DefineLangStr.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Control.js" CHARSET="UTF-8"></SCRIPT>
  </HEAD>
  <BODY ONSELECTSTART="return false" ONLOAD="Fn_InitPage();">
    <!-- RUステータス表示用フレーム -->
    <IFRAME ID="RUSTATUS_VIEW" FRAMEBORDER="no" ALLOWTRANSPARENCY></IFRAME>
    <!-- RU操作画面表示用フレーム -->
    <IFRAME ID="RUCONTROL_VIEW" FRAMEBORDER="no" ALLOWTRANSPARENCY></IFRAME>
    <!-- RUステータス取得用フレーム -->
    <IFRAME ID="RUSTATUS_GET_PROC"></IFRAME>
    <!-- RU操作用フレーム -->
    <IFRAME ID="RU_CONTROL_PROC"></IFRAME>
    <!-- Window表示要求用フレーム -->
    <IFRAME ID="RU_WINREQ_PROC"></IFRAME>
    <!-- RU操作監視用フレーム -->
    <IFRAME ID="RU_WATCH_PROC"></IFRAME>
    <HR>
    <!-- RUステータスタブ -->
    <TABLE ID="tblRUStatus"
           ONCLICK="ChangeDisplay(1);"
           ONMOUSEDOWN="SetImageUrl(document.getElementById('imgRUStatus'),'../Bmp/cmSquare3BtnD.gif');"
           ONMOUSEOUT="MouseOutRuButton(document.getElementById('imgRUStatus'), 1);"
           ONCONTEXTMENU="return false;">
			<TR><TD>
        <DIV ID="divRUStatus"></DIV>
			</TD></TR>
		</TABLE>
    <IMG ID="imgRUStatus" SRC="../Bmp/cmSquare3BtnU.gif">
    <!-- RU操作タブ -->
    <TABLE ID="tblRUControl"
           ONCLICK="ChangeDisplay(2);"
           ONMOUSEDOWN="SetImageUrl(document.getElementById('imgRUControl'),'../Bmp/cmSquare3BtnD.gif');"
           ONMOUSEOUT="MouseOutRuButton(document.getElementById('imgRUControl'), 2);"
           ONCONTEXTMENU="return false;">
			<TR><TD>
        <DIV ID="divRUControl"></DIV>
			</TD></TR>
		</TABLE>
    <IMG ID="imgRUControl" SRC="../Bmp/cmSquare3BtnD.gif">
    <!-- OKボタン -->
    <!-- 2005/05/24 blue→Green -->
    <IMG ID="imgOKBtnBack" SRC="../Bmp/indBtnBack1Plt.gif">
    <IMG ID="imgOK" SRC="../Bmp/cmCirBGreenBtnU.gif"
         ONMOUSEUP="SetImageUrl(this,'../Bmp/cmCirBGreenBtnU.gif');"
         ONMOUSEDOWN="SetImageUrl(this,'../Bmp/cmCirBGreenBtnD.gif');"
         ONCLICK="top.Exit();"
         ONMOUSEOUT="SetImageUrl(this,'../Bmp/cmCirBGreenBtnU.gif');"
         ONDRAG="return false;"
         ONCONTEXTMENU="return false;">
    <DIV ID="divOK"
         ONMOUSEUP="document.getElementById('imgOK').onmouseup();"
         ONMOUSEDOWN="document.getElementById('imgOK').onmousedown();"
         ONCLICK="document.getElementById('imgOK').click();"
         ONMOUSEOUT="document.getElementById('imgOK').onmouseout();"></DIV>
    <!-- リフレッシュボタン -->
    <IMG ID="imgRefreshBtnBack" SRC="../Bmp/indBtnBack1Plt.gif">
    <IMG ID="imgRefresh" SRC="../Bmp/cmCirBblueBtnU.gif"
         ONMOUSEUP="SetImageUrl(this,'../Bmp/cmCirBblueBtnU.gif');"
         ONMOUSEDOWN="SetImageUrl(this,'../Bmp/cmCirBblueBtnD.gif');"
         ONCLICK="Fn_Refresh()"
         ONMOUSEOUT="SetImageUrl(this,'../Bmp/cmCirBblueBtnU.gif');"
         ONDRAG="return false;"
         ONCONTEXTMENU="return false;">
    <DIV ID="divRefresh"
         ONMOUSEUP="document.getElementById('imgRefresh').onmouseup();"
         ONMOUSEDOWN="document.getElementById('imgRefresh').onmousedown();"
         ONCLICK="document.getElementById('imgRefresh').click();"
         ONMOUSEOUT="document.getElementById('imgRefresh').onmouseout();"></DIV>
    <!-- 背景  -->
    <DIV ID="divFooter"></DIV>
    <IMG ID="imgFooter" SRC="../Bmp/cmBorder.gif">
    <DIV ID="divBackGround"></DIV>
    <!-- ログ出力用フレーム -->
    <IFRAME ID="LOGGER_PROC"></IFRAME>
  </BODY>
</HTML>
