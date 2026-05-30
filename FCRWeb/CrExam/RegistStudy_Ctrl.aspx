<%@ Page language="c#" Codebehind="RegistStudy_Ctrl.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.RegistStudy_Ctrl" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file RegistStudy_Ctrl.aspx

  @brief 検査登録機能フレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/21  YSK畑　　     V1.0       新規作成
  @date  06/08/09  HSK酒井       V1.4       CR検査部構造見直し[8]対応
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
		<title>WebForm1</title>
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/JSCommonFrameSize.js" CHARSET="UTF-8"></SCRIPT>
	    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
	    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js" CHARSET="UTF-8"></SCRIPT>
	    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js" CHARSET="UTF-8"></SCRIPT>
	    <SCRIPT LANGUAGE="JavaScript" SRC="Include/RegistStudy_Ctrl.js" CHARSET="UTF-8"></SCRIPT>
	    <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js" CHARSET="UTF-8"></SCRIPT>
<%=hScript%>
		<script language="javascript" src="../Include/SystemEnvironment.js" CHARSET="UTF-8"></script>
    <!-- 2005/05/14 002 H.SAITO 検査排他の変更(Cookie) -->
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Cookie.js"				     CHARSET="UTF-8"></SCRIPT>
      
		<LINK REL="stylesheet" TYPE="text/css" HREF="CSS/RegistStudy_Ctrl.css">
	  <script language=javascript>
	  try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "RegistStudy_Ctrl.aspx"  //ファイル名
		  // 画面オープンモード
		  var OpenMode = <%=OpenMode%>;
	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
		</script>
  </HEAD>
 <%=hBody%>
</HTML>
