<%@ Page language="c#" Codebehind="Media_Ctrl.aspx.cs" AutoEventWireup="false" Inherits="Indicator.Media_Ctrl" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file Main.aspx

  @brief メディアユーティリティ制御用フレーム


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
    <TITLE>Media_Ctrl</TITLE>
    <META CONTENT="Microsoft Visual Studio .NET 7.1" NAME="GENERATOR">
    <META CONTENT="C#" NAME="CODE_LANGUAGE">
    <META CONTENT="JavaScript" NAME="vs_defaultClientScript">
    <META CONTENT="http://schemas.microsoft.com/intellisense/ie5" NAME="vs_targetSchema">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/Media_Ctrl.css" CHARSET="UTF-8">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Media_Ctrl.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/ButtonChange.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/DefineLangStr.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Control.js" CHARSET="UTF-8"></SCRIPT>
  </HEAD>
  <BODY ONSELECTSTART="return false" ONLOAD="Fn_InitPage();" ONCONTEXTMENU="return false;">
    <!-- OKボタン -->
    <!-- 2005/05/24 blue→Green -->
    <IMG ID="imgOKBtnBack" SRC="../Bmp/indBtnBack1Plt.gif">
    <IMG ID="imgOK" SRC="../Bmp/cmCirBGreenBtnU.gif"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/cmCirBGreenBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/cmCirBGreenBtnD.gif');"
          ONDRAG="return false;" ONCLICK="top.Exit();"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/cmCirBGreenBtnU.gif');">
    <DIV ID="divOK" ALIGN="center"
          ONMOUSEUP="document.getElementById('imgOK').onmouseup();"
          ONMOUSEDOWN="document.getElementById('imgOK').onmousedown();"
          ONCLICK="document.getElementById('imgOK').onclick();"
          ONMOUSEOUT="document.getElementById('imgOK').onmouseout();"></DIV>
    <!-- リフレッシュボタン -->
    <IMG ID="imgRefreshBtnBack" SRC="../Bmp/indBtnBack1Plt.gif">
    <IMG ID="imgRefresh" SRC="../Bmp/cmCirBblueBtnU.gif"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/cmCirBblueBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/cmCirBblueBtnD.gif');"
          ONDRAG="return false;"
          ONCLICK="Fn_Refresh();"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/cmCirBblueBtnU.gif');">
    <DIV ID="divRefresh"
          ONMOUSEUP="document.getElementById('imgRefresh').onmouseup();"
          ONMOUSEDOWN="document.getElementById('imgRefresh').onmousedown();"
          ONCLICK="document.getElementById('imgRefresh').click();"
          ONMOUSEOUT="document.getElementById('imgRefresh').onmouseout();"></DIV>
    <!-- メディアステータス表示用フレーム -->
    <IFRAME ID="MEDIASTATUS_VIEW" FRAMEBORDER="no" ALLOWTRANSPARENCY></IFRAME>
    <!-- 保管用ディスク一覧表示用フレーム -->
    <IFRAME ID="MEDIALIST_VIEW" FRAMEBORDER="no" ALLOWTRANSPARENCY></IFRAME>
    <!-- メディアステータス取得用フレーム -->
    <IFRAME ID="MEDIASTATUS_GET_PROC"></IFRAME>
    <!-- 保管用ディスク一覧取得用フレーム -->
    <IFRAME ID="MEDIALIST_GET_PROC"></IFRAME>
    <!-- メディアステータス表示ボタン -->
    <TABLE ID="tblMediaStatus"
            ONCLICK="ChangeDisplay(1);"
            ONMOUSEDOWN="SetImageUrl(document.getElementById('imgMediaStatus'),'../Bmp/cmSquare3BtnD.gif');"
            ONMOUSEOUT="MouseOutMediaButton(document.getElementById('imgMediaStatus'), 1);">
      <TR><TD>
        <DIV ID="divMediaStatus"></DIV>
      </TD></TR>
    </TABLE>
    <IMG ID="imgMediaStatus" SRC="../Bmp/cmSquare3BtnU.gif">
    <!-- 保管用ディスク一覧表示ボタン -->
    <TABLE ID="tblMediaList"
            ONCLICK="ChangeDisplay(2);"
            ONMOUSEDOWN="SetImageUrl(document.getElementById('imgMediaList'),'../Bmp/cmSquare3BtnD.gif');"
            ONMOUSEOUT="MouseOutMediaButton(document.getElementById('imgMediaList'), 2);">
      <TR><TD>
        <DIV ID="divMediaList"></DIV>
      </TD></TR>
    </TABLE>
    <IMG ID="imgMediaList" SRC="../Bmp/cmSquare3BtnU.gif">
    <HR>
    <!-- 背景  -->
    <DIV ID="divFooter"></DIV>
    <IMG ID="imgFooter" SRC="../Bmp/cmBorder.gif">
    <DIV ID="divBackGround"></DIV>
    <!-- コンボボックス -->
    <!-- 表示下部 -->
    <DIV ID="divComboBox"></DIV>
    <!-- クリックイベント取得用フレーム -->
    <TABLE ID="ComboBoxFrame" ONCLICK="Fn_HideDrop();">
      <TR><TD></TD></TR>
    </TABLE>
    <!-- ログ出力用フレーム -->
    <IFRAME ID="LOGGER_PROC"></IFRAME>
  </BODY>
</HTML>
