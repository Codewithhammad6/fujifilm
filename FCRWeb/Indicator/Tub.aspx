<%@ Page language="c#" Codebehind="Tub.aspx.cs" AutoEventWireup="false" Inherits="Indicator.Tub" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file Tub.aspx

  @brief タブフレーム


  @author YSK菅野

  Copyright(c) 2004-2014 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/22  YSK菅野     XX-XX      新規作成
  @date  08/02/28  HSK由比     V3.2       RU非接続時のRUアイコンとタブ非表示対応
  @date  14/03/11  TYK石井     V3.0(B)    DR装置画面対応

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
    <TITLE>Tub</TITLE>
    <META CONTENT="Microsoft Visual Studio .NET 7.1" NAME="GENERATOR">
    <META CONTENT="C#" NAME="CODE_LANGUAGE">
    <META CONTENT="JavaScript" NAME="vs_defaultClientScript">
    <META CONTENT="http://schemas.microsoft.com/intellisense/ie5" NAME="vs_targetSchema">
    <LINK HREF="CSS/Tub.css" TYPE="text/css" REL="stylesheet">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Tub.js" CHARSET="UTF-8">
    </SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/DefineLangStr.js" CHARSET="UTF-8">
    </SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Control.js" CHARSET="UTF-8"></SCRIPT>
  </HEAD>
  <BODY ONSELECTSTART="return false" ONLOAD="Fn_InitPage(parent.UtilityKind);" ONCONTEXTMENU="return false;">
    <!--2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD RUタブ→装置へ変更 -->
    <!-- RUタブ -->
    <!--<DIV ID="divRUTub" ONCLICK="ChangeUtility(1);">
      <IMG ID="imgRUTub" ONDRAG="return false;" SRC="../Bmp/indTabRUTabN.gif">
      <DIV ID="divRUTubText" ALIGN="left"></DIV>
    </DIV>
    <IMG ID="imgRUTubHidden" ONDRAG="return false;" SRC="../Bmp/indRUTub3.gif">
    -->
    <!--2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD RUタブ→装置へ変更 -->
    <!-- 装置タブ -->
    <DIV ID="divDeviceTub" ONCLICK="ChangeTubUtility(1,1);">
      <IMG ID="imgDeviceTub" ONDRAG="return false;" SRC="../Bmp/Tab_Radiography_OFF.gif">
      <DIV ID="divDeviceTubText" ALIGN="left"></DIV>
    </DIV>
    <IMG ID="imgDeviceTubHidden" ONDRAG="return false;" SRC="../Bmp/indRUTub3.gif">
    <!-- メディアタブ -->
    <!--2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD 呼び出し元を設定 -->
    <DIV ID="divMediaTub" ONCLICK="ChangeTubUtility(2,1);">
      <IMG ID="imgMediaTub" ONDRAG="return false;" SRC="../Bmp/indMediaRUTabN.gif">
      <DIV ID="divMediaTubText" ALIGN="left"></DIV>
    </DIV>
    <!-- プリンタタブ -->
    <!--2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD 呼び出し元を設定 -->
    <DIV ID="divPrinterTub" ONCLICK="ChangeTubUtility(3,1);">
      <IMG ID="imgPrinterTub" ONDRAG="return false;" SRC="../Bmp/indPrinterRUTabN.gif">
      <DIV ID="divPrinterTubText" ALIGN="left"></DIV>
    </DIV>
    <IMG ID="imgPrinterTubHidden" ONDRAG="return false;" SRC="../Bmp/indPrtTub3.gif">
    <!-- 出力キュータブ -->
    <!--2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD 呼び出し元を設定 -->
    <DIV ID="divQueueTub" ONCLICK="ChangeTubUtility(4,1);">
      <IMG ID="imgQueueTub" ONDRAG="return false;" SRC="../Bmp/indQueueRUTabN.gif">
      <DIV ID="divQueueTubText" ALIGN="left"></DIV>
    </DIV>
    <!-- イベント情報タブ -->
    <!--2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD 呼び出し元を設定 -->
    <DIV ID="divEventTub" ONCLICK="ChangeTubUtility(5,1);">
      <IMG ID="imgEventTub" ONDRAG="return false;" SRC="../Bmp/indEventRUTabN.gif">
      <DIV ID="divEventTubText" ALIGN="left"></DIV>
    </DIV>
    <!-- タブ操作制御用テーブル -->
    <TABLE ID="tblTubDisable">
      <TR><TD></TD></TR>
    </TABLE>
    <!-- 背景 -->
    <DIV ID="divBackGround"></DIV>
    <!-- ログ出力用フレーム -->
    <IFRAME ID="LOGGER_PROC"></IFRAME>
  </BODY>
</HTML>
