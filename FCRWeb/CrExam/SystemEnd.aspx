<%@ Page language="c#" Codebehind="SystemEnd.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.SystemEnd" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" > 
<%
/****************************************************************************

  @file SystemEnd.aspx

  @brief CE終了画面

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/12　YSK畑  　   V1.0　     新規作成
  @date  06/11/01  HSK山本     V1.4      CR検査部構造見直し[4]対応

/****************************************************************************/
%>
<%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>

<html>
  <head>
    <title>SystemEnd</title>
    <meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
    <meta name="CODE_LANGUAGE" Content="C#">
    <meta name=vs_defaultClientScript content="JavaScript">
    <meta name=vs_targetSchema content="http://schemas.microsoft.com/intellisense/ie5">
    <META HTTP-EQUIV="Imagetoolbar" CONTENT="no">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/SystemEnd.css">
  	<SCRIPT LANGUAGE="JavaScript" SRC="Include/JSCommonFrameSize.js" CHARSET="UTF-8"></SCRIPT>
	  <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
	  <SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js" CHARSET="UTF-8"></SCRIPT>
	  <script language=javascript src="./Include/MessageWindow.js" charset="UTF-8"></script>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/SystemEnd.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
    <script language=javascript>
		try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "SystemEnd.aspx"  //ファイル名

      var MessageString = top.DispFrame.Public_GetString(32301,"System down")//"電源を落としてください";
      var StartButton   = top.DispFrame.Public_GetString(32300,"Start")//"開始";
 	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
    </script>
   </head>
  <body onload="Fn_InitPage();" ONSELECTSTART="return false;" ONKEYDOWN="return false;" ONDRAG="return false;" oncontextmenu="return false;">
	<!-- メッセージ表示//-->
	<div id="divMessage">
	</div>	
	<!-- ボタン表示//-->
	<div id="divStart_Btn" onclick="Fn_OnButton(0)" onmousedown="Fn_OnButton(1)" ONMOUSEOUT="Fn_OnButton(2)">
		<DIV id="divStart"></DIV>
		
		<IMG id="imgStart" src="../Bmp/cmSquare2BtnU.gif">
	</div>
	
  </body>
</html>
