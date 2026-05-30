<%@ Page language="c#" Codebehind="RegChangeMenu_Update_Proc.aspx.cs" EnableSessionState="false" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.RegChangeMenu_Update_Proc" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file RegChangeMenu_Update_Proc.aspx

  @brief メニュー変更更新処理フレーム

  @author YSK田中

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/18  YSK田中　     V1.0       新規作成
  @date  06/03/22  YSK齋藤       V1.2       OnLoadイベントのハンドリング対応(PVCS#1742)
  @date  07/07/24  YSK齋藤       V3.0       同時押し対応(ASPCOMPAT=trueの追加)(PVCS#1737)
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
    <TITLE>RegChangeMenu_Update_Proc</TITLE>
    <meta name="GENERATOR"            Content="Microsoft Visual Studio .NET 7.1">
    <meta name="CODE_LANGUAGE"        Content="C#">
    <meta name=vs_defaultClientScript Content="JavaScript">
    <meta name=vs_targetSchema        Content="http://schemas.microsoft.com/intellisense/ie5">
    <SCRIPT LANGUAGE="JavaScript"     SRC="Include/RegChangeMenu_Update_Proc.js" CHARSET="UTF-8"></SCRIPT>
	  <script language=javascript src="./Include/MessageWindow.js" charset="UTF-8"></script>
	  <script language=javascript>
  // 2006/03/22 H.SAITO -ST-
  function Fn_OnLoad(){
  // 2006/03/22 H.SAITO -ED-
	  try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "RegChangeMenu_Update_Proc.aspx"  //ファイル名
		  // 処理完了通知
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

    <FORM ID="frmUpdateForm" METHOD="post">
			<INPUT TYPE='hidden' NAME="studySequence">
			<INPUT TYPE='hidden' NAME="imageSequence">
			<INPUT TYPE='hidden' NAME="menuCode">
			<INPUT TYPE='hidden' NAME="studyStatus">
			<INPUT TYPE='hidden' NAME="patientId">
			<INPUT TYPE='hidden' NAME="loginUserId">
      <INPUT TYPE='hidden' NAME='loginTime'>
    </FORM>
  </BODY>
</HTML>
