<%@ Page language="c#" Codebehind="Output_Ctrl.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.Output_Ctrl" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
    <title>Output_Ctrl</title>
    <%
/****************************************************************************

  @file Output_Ctrl.aspx

  @brief 出力先設定機能フレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/10  YSK畑　     V1.0       新規作成
  @date  06/11/01  HSK山本     V1.4      CR検査部構造見直し[4]対応

/****************************************************************************/
%>
    <%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
    <meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
    <meta name="CODE_LANGUAGE" Content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/Output_Ctrl.css">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/JSCommonFrameSize.js" CHARSET="UTF-8"></SCRIPT>
    <script language="javascript" charset="UTF-8" src="../Include/FrameController.js"></script>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Output_Ctrl.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript">
	  try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "Modify_Ctrl.aspx"  //ファイル名

		  // 画面オープンモード
		  var OpenMode = <%=OpenMode%>;
		  <%=ClientScript%>
		
	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
    </SCRIPT>
  </HEAD>
  <BODY ONLOAD="Fn_InitPage();">
    <IFRAME ID="OUTPUT_VIEW" SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <DIV ID="DivDetail"></DIV>
    <IFRAME ID="OUTPUT_UPDATE_PROC" SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <IFRAME ID="STUDYDATA_GET_PROC" SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <IFRAME ID="INFORMATION_VIEW" SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <IFRAME ID="LOGGER_PROC" SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <IFRAME ID="EXCLUSIVE_PROC" SCROLLING="no" FRAMEBORDER="0"></IFRAME>
  </BODY>
</HTML>
