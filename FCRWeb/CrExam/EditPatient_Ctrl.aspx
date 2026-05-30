<%@ Page language="c#" Codebehind="EditPatient_Ctrl.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.EditPatient_Ctrl" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file EditPatient_Ctrl.aspx

  @brief 患者編集機能フレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/21　YSK畑  　   V1.0　     新規作成
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
		<title>EditPatient_Frame</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK REL="stylesheet" TYPE="text/css" HREF="CSS/EditPatient_Ctrl.css">
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/JSCommonFrameSize.js" CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"			CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js" CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"   CHARSET="UTF-8"></SCRIPT>
		<script language="javascript" src="./Include/MessageWindow.js" charset="UTF-8"></script>
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/EditPatient_Ctrl.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
		<script language="javascript">
    try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "EditPatient_Ctrl.aspx"  //ファイル名
			// 画面オープンモード
			var OpenMode = <%=OpenMode%>;
	  }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
		</script>
	</HEAD>
	<BODY ID="EDITPATIENT_CTRL" onload="Fn_InitPage();">
		<IFRAME ID="INFORMATION_VIEW"              SCROLLING="no" FRAMEBORDER="0"></IFRAME>
		<IFRAME ID="EDITPATIENTMAIN_VIEW"          SCROLLING="no" FRAMEBORDER="0"></IFRAME>
    <DIV id="DivEditId"></DIV>
    <DIV id="DivEditDetail"></DIV>
    <DIV id="DivChangeId"></DIV>
    <DIV id="DivChangeDetail"></DIV>
		<IFRAME ID="STUDYDATA_GET_PROC"            SCROLLING="no" FRAMEBORDER="0"></IFRAME>
		<IFRAME ID="EDITPATIENTID_UPDATE_PROC"     SCROLLING="no" FRAMEBORDER="0"></IFRAME>
		<IFRAME ID="EDITPATIENTDETAIL_UPDATE_PROC" SCROLLING="no" FRAMEBORDER="0"></IFRAME>
		<IFRAME ID="SEARCHPATIENTDATA"             SCROLLING="no" FRAMEBORDER="0"></IFRAME>
		<IFRAME ID="EKARTEDATA_GET_PROC"           SCROLLING="no" FRAMEBORDER="0"></IFRAME>
		<IFRAME ID="LOGGER_PROC"                   SCROLLING="no" FRAMEBORDER="0"></IFRAME>
		<IFRAME ID="EXCLUSIVE_PROC"                SCROLLING="no" FRAMEBORDER="0"></IFRAME>
	</BODY>
</HTML>
