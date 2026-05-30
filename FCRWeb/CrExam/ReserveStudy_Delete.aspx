<%@ Page language="c#" Codebehind="ReserveStudy_Delete.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.ReserveStudy_Delete" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file ReserveStudy_Delete.aspx

  @brief 予約検査削除削除処理フレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/21  YSK畑　　     V1.0       新規作成
  @date  06/03/22  YSK齋藤       V1.2       OnLoadイベントのハンドリング対応(PVCS#1742)
/****************************************************************************/
%>
<%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" > 

<html>
  <head>
    <title>ReserveStudy_Delete</title>
    <meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
    <meta name="CODE_LANGUAGE" Content="C#">
    <meta name=vs_defaultClientScript content="JavaScript">
    <meta name=vs_targetSchema content="http://schemas.microsoft.com/intellisense/ie5">
	<script language=javascript src="./Include/ReserveStudy_Get_Proc.js" charset="UTF-8"></script>
	<script language=javascript src="./Include/MessageWindow.js" charset="UTF-8"></script>
	  <script language=javascript>
  // 2006/03/22 H.SAITO -ST-
  function Fn_OnLoad(){
  // 2006/03/22 H.SAITO -ED-
	  try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "ReserveStudy_Delete.aspx"  //ファイル名

		  // 検査削除終了通知
		  <%=ClientScript%>;

	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
  // 2006/03/22 H.SAITO -ST-
  }
  // 2006/03/22 H.SAITO -ED-
	</script>
  </head>
<!-- 2006/03/22 H.SAITO -ST- -->
<!--
  <body onload="Fn_InitPage()">
-->
  <body  onload="Fn_InitPage();Fn_OnLoad();">
<!-- 2006/03/22 H.SAITO -ED- -->
		<form id="frmDelete" method="post">
			<INPUT TYPE='hidden' NAME='studySequence'>
			<INPUT TYPE='hidden' NAME='loginUserId'>
			<INPUT TYPE='hidden' NAME='loginTime'>
		</form>
  </body>
</html>
