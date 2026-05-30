<%@ Page language="c#" Codebehind="Function.aspx.cs" AutoEventWireup="false" Inherits="Indicator.Function" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file Function.aspx

  @brief ファンクションフレーム


  @author YSK菅野

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reseved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/22  YSK菅野     XX-XX      新規作成
  @date  06/07/28  YSK齋藤     V1.3       自動ログオフ後に操作できなくなる不具合対応(PVCS#1805)
  @date  07/06/09  HSK由比     V2.0       PVCS#2313対応
  @date  08/03/07  HSK山本     V3.2       PVCS#2767対応
  @date  08/07/16  S1 神立     V4.0       クライアント5台対応, 連打禁止用の透明フレームを追加
  @date  09/05/29  FF蔵敷        V6.0      NAS対応 V60_NAS
  @date  14/03/11  TYK石井     V3.0       DR装置画面対応
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
    <TITLE>Function</TITLE>
    <META NAME="GENERATOR" CONTENT="Microsoft Visual Studio .NET 7.1">
    <META NAME="CODE_LANGUAGE" CONTENT="C#">
    <META NAME="vs_defaultClientScript" CONTENT="JavaScript">
    <META NAME="vs_targetSchema" CONTENT="http://schemas.microsoft.com/intellisense/ie5">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/Function.css" CHARSET="UTF-8">
    <LINK REL="stylesheet" TYPE="text/css" HREF="../CSS/MessageWindow.css">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/ButtonChange.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Function.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/DefineLangStr.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Control.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript">
    <!--
      QueRefreshInt = <%=QueRefreshInt%>;
      QueListMax    = <%=QueListMax%>;
      EvtListMax    = <%=EvtListMax%>;
      MediaListMax  = <%=MediaListMax%>;
      RUWatchInt    = <%=RUWatchInt%>;
      MultiByte     = <%=MultiByte%>;
      UtilityKind   = "<%=UtilityKind%>";
      OriginDisplay = "<%=OriginDisplay%>";
      LoginUserId   = "<%=LoginUserId%>";
      LoginTime     = "<%=LoginTime%>";
      DcmOptionKey  = <%=DcmOptionKey%>;
      FontSize      = "<%=FontSize%>";
      FontSizeS     = "<%=FontSizeS%>";
      FontFamily    = "<%=FontFamily%>";
      SystemType    = <%=SystemType%>;
      ConnectingRU  = <%=ConnectingRU%>;
      IsNASEffective            = <%=IsNASEffective%>;
      ConnectingDR              = <%=ConnectingDR%>;		    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD
      SeDeviceRefreshInterval   = <%=SeDeviceRefreshInterval%>; //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD
      BatteryWarningCapacity    = <%=BatteryWarningCapacity%>;	//2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD
      BatteryMaxTime            = <%=BatteryMaxTime%>;		    //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD
      <% if(stringTable != null){ %>
        <% for(int i = 0; i < stringTable.Count; i++){ %>
          LangStrArray[<%=i%>] = "<%=stringTable[intFromStringID + i]%>";
        <% } %>
      <% } %>
      //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD Start
      LangSEArrayNum = <%=stringSETable.Count%>;
      <% if(stringSETable != null){ %>
        <% for(int i = 0; i < stringSETable.Count; i++){ %>
          LangSEStrArray[<%=i%>] = "<%=stringSEMessage[i]%>";
          LangSEIntArray[<%=i%>] = "<%=intSEMessage[i]%>";
        <% } %>
      <% } %>
      //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD End
    -->
    </SCRIPT>
  </HEAD>
<!--  2006/07/28 PVCS#1805 H.SAITO -ST- -->
<!--  2005/07/29 003 H.SAITO #709 ALT+HOMEキー押下時に画面をロックする -->
<!-- <BODY ONLOAD="Fn_InitPage()" ONSELECTSTART="return false;" ONCONTEXTMENU="return false;"> -->
<!--  <BODY ONLOAD="Fn_InitPage()" ONSELECTSTART="return false;" ONCONTEXTMENU="return false;" ONBEFOREUNLOAD="top.Public_Dialog();"> -->
  <BODY ONLOAD="Fn_InitPage()" ONSELECTSTART="return false;" ONCONTEXTMENU="return false;">
<!--  2006/07/28 PVCS#1805 H.SAITO -ED- -->
    <!-- タブ表示用フレーム -->
    <IFRAME ID="TUB_FRAME" FRAMEBORDER="0" SCROLLING=no></IFRAME>
    <!-- 画面表示用フレーム -->
    <IFRAME ID="VIEW_FRAME" FRAMEBORDER="0" SCROLLING=no></IFRAME>
    <!-- 確認ダイアログ -->
    <TABLE ID="tblConfirm"><TR><TD>
      <!-- 確認ダイアログボックス -->
      <TABLE ID="tblConfirmBox">
        <TR ID="trConfirmTextLine"><TD ID="tdConformText"></TD></TR>
        <TR ID="trButtonLine"><TD></TD></TR>
      </TABLE>
      <!-- OKボタン -->
      <TABLE ID="tblYesButton"
             ONCLICK="Fn_CloseConfirmDialog(1);"
             ONMOUSEDOWN="SetImageUrl(document.getElementById('imgYesButton'),'../Bmp/cmOvalAGreenLBtnD.gif');"
             ONMOUSEUP="SetImageUrl(document.getElementById('imgYesButton'),'../Bmp/cmOvalAGreenLBtnU.gif');"
             ONMOUSEOUT="SetImageUrl(document.getElementById('imgYesButton'),'../Bmp/cmOvalAGreenLBtnU.gif');"><TR><TD>
        <DIV ID="divYesText"></DIV>
      </TD></TR></TABLE>
      <IMG ID="imgYesButton" SRC="../Bmp/cmOvalAGreenLBtnU.gif">
      <!-- NOボタン -->
      <!-- 2005/05/24 Green→Pale -->
      <TABLE ID="tblNoButton"
             ONCLICK="Fn_CloseConfirmDialog(0);"
             ONMOUSEDOWN="SetImageUrl(document.getElementById('imgNoButton'),'../Bmp/cmOvalAPaleLBtnD.gif');"
             ONMOUSEUP="SetImageUrl(document.getElementById('imgNoButton'),'../Bmp/cmOvalAPaleLBtnU.gif');"
             ONMOUSEOUT="SetImageUrl(document.getElementById('imgNoButton'),'../Bmp/cmOvalAPaleLBtnU.gif');"><TR><TD>
        <DIV ID="divNoText"></DIV>
      </TD></TR></TABLE>
      <IMG ID="imgNoButton" SRC="../Bmp/cmOvalAPaleLBtnU.gif">
    </TD></TR></TABLE>
    <!-- エラーフレーム -->
    <TABLE ID="TABLE_MainErrorFrame">
	    <TR><TD>
			  <!-- エラーボックス -->
			  <TABLE ID="TABLE_MainErrorBox">
				  <TR><TD ID="TD_MainErrorTitle1"><BR></TD></TR>
				  <TR><TD ID="TD_MainErrorTitle2"><BR></TD></TR>
				  <TR><TD ID="TD_MainErrorText"><BR></TD></TR>
				  <TR><TD ID="TD_MainErrorCode"><BR></TD></TR>
				  <TR><TD><BR></TD></TR>
			  </TABLE>
			  <!-- ボタン -->
			  <DIV ID="DIV_MainErrorButton"
			       ONMOUSEUP="Fn_CloseWarningDialog()"
                   ONMOUSEDOWN="SetImageUrl(document.getElementById('IMG_MainErrorButton'),'../Bmp/cmOvalAGreenLBtnD.gif');"
                   ONMOUSEUP="SetImageUrl(document.getElementById('IMG_MainErrorButton'),'../Bmp/cmOvalAGreenLBtnU.gif');"
                   ONMOUSEOUT="SetImageUrl(document.getElementById('IMG_MainErrorButton'),'../Bmp/cmOvalAGreenLBtnU.gif');">
				  <DIV ID="DIV_MainErrorOkText"></DIV>
				  <IMG ID="IMG_MainErrorButton" SRC="../Bmp/cmOvalAGreenLBtnU.gif" ONDRAG="return false;">
			  </DIV>
		  </TD></TR>
    </TABLE>
    <!-- 処理中ダイアログ -->
    <TABLE ID="tblProcessing"><TR><TD>
      <!-- 処理中ダイアログボックス -->
      <TABLE ID="tblProcessingBox"><TR>
        <TD ID="tdProcessingText"></TD>
      </TR></TABLE>
    </TD></TR></TABLE>
    <!-- 連打禁止用の透明フレーム -->
    <TABLE ID="tblTransparentBox"><TR><TD></TD></TR></TABLE>
  </BODY>
</HTML>
