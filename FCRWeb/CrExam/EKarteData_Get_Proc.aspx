<%@ Page language="c#" Codebehind="EKarteData_Get_Proc.aspx.cs" EnableSessionState="false" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.EKarteData_Get_Proc" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file EKarteData_Get_Proc.aspx

  @brief 電子カルテ情報取得処理フレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/04  YSK畑　     V1.0       新規作成
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
		<title>EKarteData_Get_Proc</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/EKarteData_Get_Proc.js" CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
		<script language="javascript">
  // 2006/03/22 H.SAITO -ST-
  function Fn_OnLoad(){
  // 2006/03/22 H.SAITO -ED-
		try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "EKarteData_Get_Proc.aspx"  //ファイル名

			PatientId        = "<%=PatientId%>";					// 患者ID

			// 検索終了通知
			<%=ClientScript%>;

		}catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
		}
  // 2006/03/22 H.SAITO -ST-
  }
  // 2006/03/22 H.SAITO -ED-
		</script>
	</HEAD>
<!-- 2006/03/22 H.SAITO -ST- -->
<!--
  <body  onload="Fn_InitPage()">
-->
  <body  onload="Fn_InitPage();Fn_OnLoad();">
<!-- 2006/03/22 H.SAITO -ED- -->
		<form id="frmGetData" method="post" runat="server">
			<INPUT name="EKarteIpAddress" type="text">
			<INPUT name="EKartePipeName" type="text">
			<INPUT name="EKarteTimeOut" type="text">
			<INPUT name="ViewMode" type="text">
      <INPUT TYPE='hidden' NAME='loginUserId'>
      <INPUT TYPE='hidden' NAME='loginTime'>
		</form>
	</body>
</HTML>
