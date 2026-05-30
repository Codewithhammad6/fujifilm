<%@ Page language="c#" Codebehind="ChangeImg_Ctrl.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.ChangeImg_Ctrl" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file ChageImg_Ctrl.aspx

  @brief 画像入れ替え機能フレーム

  @author YSK齋藤

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/02  YSK齋藤     V1.0       新規作成
  @date  06/11/01  HSK山本     V1.4      CR検査部構造見直し[4]対応

/****************************************************************************/
%>
<%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
<HEAD>
<META NAME="GENERATOR" CONTENT="Microsoft Visual Studio .NET 7.1">
<META NAME="CODE_LANGUAGE" CONTENT="C#">
<META NAME="vs_defaultClientScript" CONTENT="JavaScript">
<META NAME="vs_targetSchema" CONTENT="http://schemas.microsoft.com/intellisense/ie5">
<LINK REL="stylesheet" TYPE="text/css" HREF="CSS/ChangeImg_Ctrl.css">
<SCRIPT LANGUAGE="JavaScript" SRC="Include/JSCommonFrameSize.js"    CHARSET="UTF-8"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"     CHARSET="UTF-8"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js"        CHARSET="UTF-8"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"   CHARSET="UTF-8"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js"        CHARSET="UTF-8"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" SRC="Include/ChangeImg_Ctrl.js"       CHARSET="UTF-8"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"            CHARSET="UTF-8"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript">
  try{
    var SPOT_CODE_ASPX = 0;                   //スポットコード
    var FILE_NAME_ASPX = "ChangeImg_Ctrl.aspx"  //ファイル名

	  // 画面オープンモード
	  var OpenMode = <%=OpenMode%>;
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
  }
</SCRIPT>
</HEAD>
<BODY ONLOAD="Fn_InitPage();">
  <IFRAME ID="CHANGEIMG_VIEW"				 SCROLLING="no" FRAMEBORDER="0"></IFRAME>  	
  <IFRAME ID="INFORMATION_VIEW"			 SCROLLING="no" FRAMEBORDER="0"></IFRAME>  	
  <IFRAME ID="CHANGEIMG_UPDATE_PROC" SCROLLING="no" FRAMEBORDER="0"></IFRAME>  	
  <IFRAME ID="EXCLUSIVE_PROC"        SCROLLING="no" FRAMEBORDER="0"></IFRAME>  	
  <IFRAME ID="STUDYDATA_GET_PROC"		 SCROLLING="no" FRAMEBORDER="0"></IFRAME>
  <IFRAME ID="LOGGER_PROC"		       SCROLLING="no" FRAMEBORDER="0"></IFRAME>
</BODY>
</HTML>