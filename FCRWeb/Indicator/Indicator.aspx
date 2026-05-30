<%@ Page language="c#" Codebehind="Indicator.aspx.cs" AutoEventWireup="false" Inherits="Indicator.Indicator" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" > 
<%
/****************************************************************************

  @file Indicator.aspx

  @brief インジケータアイコン制御用フレーム


  @author YSK菅野

  Copyright(c) 2004-2008 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/22  YSK菅野     XX-XX      新規作成
  @date  06/11/01  HSK山本     V1.4      CR検査部構造見直し[4]対応
  @date  08/02/28  HSK由比     V3.2       RU非接続時のRUアイコンとタブ非表示対応
  @date  09/05/29  FF蔵敷　　　 V6.0       NAS対応 V60_NAS
  @date  11/01/20  FF星野　　　V2.1(B)    保管用NAS対応
  @date  12/12/27  FFS星野　　 V2.4(B)    USBメモリ対応
  @date  14/03/11  TYK石井　　 V3.0(B)    DR装置画面対応
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
    <LINK HREF="CSS/Indicator.css" TYPE="text/css" CHARSET="UTF-8" REL="stylesheet">
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Indicator.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript">
    <!--
      IndicatorUpdateInt = <%=IndicatorUpdateInt%>;
      DcmOptionKey       = <%=DcmOptionKey%>;
      // 2005/07/25 006 H.SAITO Net断対応 
      IndicatorWatchInt  = <%=IndicatorWatchInt%>;
      ErrorTitle1        = "<%=ErrorTitle1%>";
      ErrorTitle2        = "<%=ErrorTitle2%>";
      ErrorMessage       = "<%=ErrorMessage%>";
      ButtonString       = "<%=ButtonString%>";
      ConnectingRU       = <%=ConnectingRU%>;
      IsNASEffective   =<%=IsNASEffective%>;
      IsNASBackupEffective   =<%=IsNASBackupEffective%>;//2010.12.21 FF星野 V2.1(B) 保管用NAS対応 ADD
      USBMemoryOutputSetting =<%=USBMemoryOutputSetting%>;//2012.12.26 FFS星野 V2.4(B) USBメモリ対応 ADD
      ConnectingDR       = <%=ConnectingDR%>;//2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD
      CurrentView        = <%=CurrentView%>;//2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD

    -->
    </SCRIPT>
  </HEAD>
  <BODY ONCONTEXTMENU="return false;" ONLOAD="Fn_InitPage(0);">
    <!-- 表示用フレーム -->
    <IFRAME ID="INDICATOR_VIEW" FRAMEBORDER="no" SCROLLING="no"></IFRAME>
    <!-- ステータス取得用フレーム -->
    <IFRAME ID="INDICATOR_GET_PROC" FRAMEBORDER="no" SCROLLING="no"></IFRAME>
    <!-- ログ出力用フレーム -->
    <IFRAME ID="LOGGER_PROC"></IFRAME>
  </BODY>
</HTML>
