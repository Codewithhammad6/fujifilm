<%@ Page language="c#" Codebehind="IndicatorForImageView.aspx.cs" AutoEventWireup="false" Inherits="Indicator.IndicatorForImageView" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" > 
<%
/****************************************************************************

  @file IndicatorForImageView.aspx

  @brief インジケータアイコン制御用フレーム（画像参照用）


  @author YSK菅野

  Copyright(c) 2004-2008 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/03/12  YSK菅野     XX-XX      新規作成
  @date  06/11/01  HSK山本     V1.4      CR検査部構造見直し[4]対応
  @date  08/02/28  HSK由比     V3.2       RU非接続時のRUアイコンとタブ非表示対応

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
    <TITLE>Indicator</TITLE>
    <META CONTENT="Microsoft Visual Studio .NET 7.1" NAME="GENERATOR">
    <META CONTENT="C#" NAME="CODE_LANGUAGE">
    <META CONTENT="JavaScript" NAME="vs_defaultClientScript">
    <META CONTENT="http://schemas.microsoft.com/intellisense/ie5" NAME="vs_targetSchema">
    <LINK HREF="CSS/IndicatorForImageView.css" TYPE="text/css" CHARSET="UTF-8" REL="stylesheet">
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Indicator.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript">
    <!--
      IndicatorUpdateInt = <%=IndicatorUpdateInt%>;
      DcmOptionKey       = <%=DcmOptionKey%>;
      ConnectingRU       = <%=ConnectingRU%>;
    -->
    </SCRIPT>
  </HEAD>
  <BODY ONCONTEXTMENU="return false;" ONLOAD="Fn_InitPage(1);">
    <!-- 表示用フレーム -->
    <IFRAME ID="INDICATOR_VIEW" FRAMEBORDER="no" SCROLLING="no"></IFRAME>
    <!-- ステータス取得用フレーム -->
    <IFRAME ID="INDICATOR_GET_PROC" FRAMEBORDER="no" SCROLLING="no"></IFRAME>
    <!-- ログ出力用フレーム -->
    <IFRAME ID="LOGGER_PROC"></IFRAME>
  </BODY>
</HTML>
