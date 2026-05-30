<%@ Page language="c#" Codebehind="Indicator_View.aspx.cs" AutoEventWireup="false" Inherits="Indicator.Indicator_View" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<TITLE>Indicator_View</TITLE>
		<%
/****************************************************************************

  @file Indicator_View.aspx

  @brief インジケータアイコン表示用フレーム


  @author YSK菅野

  Copyright(c) 2004-2008 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/22  YSK菅野     XX-XX      新規作成
  @date  08/02/28  HSK由比     V3.2       RU非接続時のRUアイコンとタブ非表示対応
  @date  09/05/29  FF蔵敷　　　 V6.0         NAS対応　V60_NAS
  @date  09/08/31  FF 星野     V6.0       インジケーター切り離し対応
  @date  14/03/20  TYK 石井    V3.0    　 DR装置画面対応
/****************************************************************************/
%>
		<%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
		<META content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="CSS/Indicator_View.css" type="text/css" charset="UTF-8" rel="stylesheet">
		<SCRIPT language="JavaScript" src="Include/Indicator_View.js" charset="UTF-8"></SCRIPT>
		<SCRIPT language="JavaScript" src="Include/Control.js" charset="UTF-8"></SCRIPT>
	</HEAD>
	<BODY oncontextmenu="return false;" onload="Fn_InitPage();" ms_positioning="GridLayout">
		<IMG id="imgRuIcon" ondrag="return false;" onclick="parent.Public_Check(1);"> <IMG id="imgRUIconHidden" ondrag="return false;">
        <!-- 2014.03.11 V3.0(B) TYK石井 DR装置画面追加 DEL DR装置タブを追加のため削除 Start
	        <IMG id="imgMediaIcon" ondrag="return false;" onclick="parent.Public_Check(2);">
		<IMG id="imgPrinterIcon" ondrag="return false;" style="LEFT: 114px; TOP: 0px" onclick="parent.Public_Check(3);">
		<IMG id="imgPrinterIconHidden" ondrag="return false;" style="LEFT: 114px; TOP: 0px">
		<IMG id="imgOutputIcon" ondrag="return false;" style="LEFT: 152px; TOP: 0px" onclick="parent.Public_Check(4);">
		<IMG id="imgEventIcon" ondrag="return false;" style="LEFT: 190px; TOP: 0px" onclick="parent.Public_Check(5);">
		<!-- 2005/08/26 Kanno ADD ST デザイン修正 -->
		<!-- 2009/08/31 FF 星野 インジケーター切り離し対応 DEL
			<IMG id="imgBack" ondrag="return false;" style="LEFT: 0px; WIDTH: 229px; TOP: 0px; HEIGHT: 40px"
			src="../Bmp/indBtnBackPlt.gif" height="40" width="224"> 
		 -->
        <!-- 2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD DR装置タブを追加 Start-->
        <IMG id="imgDrIcon" ondrag="return false;" onclick="parent.Public_Check(7);"> <IMG id="imgDrIconHidden" ondrag="return false;">
		<IMG id="imgMediaIcon" ondrag="return false;" onclick="parent.Public_Check(2);">
		<IMG id="imgPrinterIcon" ondrag="return false;" style="LEFT: 152px; TOP: 0px" onclick="parent.Public_Check(3);">
		<IMG id="imgPrinterIconHidden" ondrag="return false;" style="LEFT: 152px; TOP: 0px">
		<IMG id="imgOutputIcon" ondrag="return false;" style="LEFT: 190px; TOP: 0px" onclick="parent.Public_Check(4);">
		<IMG id="imgEventIcon" ondrag="return false;" style="LEFT: 228px; TOP: 0px" onclick="parent.Public_Check(5);">
		<!-- 2005/08/26 Kanno ADD ED デザイン修正 -->
        <!--V60_NAS-->
        <!-- 2014.03.11 V3.0(B) TYK石井 DR装置画面追加 DEL DR装置タブを追加のため削除 Start
		<IMG id="imgStorageIcon" ondrag="return false;" style="Z-INDEX: 100; LEFT: 76px; WIDTH: 38px; POSITION: absolute; TOP: 0px; HEIGHT: 38px"onclick="parent.Public_Check(6);">
		<IMG id="imgStorageIconHidden" ondrag="return false;" style="Z-INDEX: 110; LEFT: 76px; WIDTH: 38px; POSITION: absolute; TOP: 0px; HEIGHT: 38px">
        -->
        <!-- 2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD DR装置タブを追加 Start-->
        <IMG id="imgStorageIcon" ondrag="return false;" style="Z-INDEX: 100; LEFT: 114px; WIDTH: 38px; POSITION: absolute; TOP: 0px; HEIGHT: 38px"onclick="parent.Public_Check(6);">
		<IMG id="imgStorageIconHidden" ondrag="return false;" style="Z-INDEX: 110; LEFT: 114px; WIDTH: 38px; POSITION: absolute; TOP: 0px; HEIGHT: 38px">
	</BODY>
</HTML>
