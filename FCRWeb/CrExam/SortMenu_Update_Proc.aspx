<%@ Page language="c#" Codebehind="SortMenu_Update_Proc.aspx.cs" EnableSessionState="false" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.SortMenu_Update_Proc" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file SortMenu_Update_Proc.aspx

  @brief 表示順並べ替え更新処理フレーム

  @author YSK齋藤

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/03  YSK齋藤     V1.0　     新規作成
  @date  06/03/22  YSK齋藤     V1.2       OnLoadイベントのハンドリング対応(PVCS#1742)
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
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/SortMenu_Update_Proc.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" CHARSET="UTF-8">
  // 2006/03/22 H.SAITO -ST-
  function Fn_OnLoad(){
  // 2006/03/22 H.SAITO -ED-
		try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "SortMenu_Update_Proc.aspx"  //ファイル名
        //データ取得完了時にメソッドを呼ぶ
        <%=ClientScript%>
	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
  // 2006/03/22 H.SAITO -ST-
  }
  // 2006/03/22 H.SAITO -ED-
    </SCRIPT>
  </HEAD>
<!-- 2006/03/22 H.SAITO -ST- -->
<!--
  <BODY ONLOAD="Fn_InitPage();">
-->
	<BODY ONLOAD="Fn_InitPage();Fn_OnLoad();">
<!-- 2006/03/22 H.SAITO -ED- -->
    <FORM NAME="frmUpdateForm" METHOD="post">
      <INPUT TYPE='hidden' ID='procMode'      NAME='procMode'>
      <INPUT TYPE='hidden' ID='studySequence' NAME='studySequence'>
      <INPUT TYPE="hidden" ID="studyStatus"	  NAME="studyStatus">
      <INPUT TYPE='hidden' ID="loginUserId"   NAME="loginUserId">
      <INPUT TYPE='hidden' ID="loginTime"     NAME='loginTime'>
      <INPUT TYPE='hidden' ID='imageSeq'       NAME='imageSeq'>
      <INPUT TYPE='hidden' ID='sequence'      NAME='sequence'>
    </FORM>
  </BODY>
</HTML>