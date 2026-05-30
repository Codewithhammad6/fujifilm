<%@ Page language="c#" Codebehind="EditPatientId_Update_Proc.aspx.cs" EnableSessionState="false" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.EditPatientId_Update_Proc" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file EditPatientId_Update_Proc.aspx

  @brief 患者ID情報更新処理フレーム

  @author YSK畑

  Copyright(c) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/21  YSK畑　     V1.0       新規作成
  @date  06/03/22  YSK齋藤     V1.2       OnLoadイベントのハンドリング対応(PVCS#1742)
  @date  07/05/16  HSK古場     V2.0       (HSK)B票#403の不具合修正
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
    <title>EditPatientId_Update_Proc</title>
    <meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
    <meta name="CODE_LANGUAGE" Content="C#">
    <meta name=vs_defaultClientScript content="JavaScript">
    <meta name=vs_targetSchema content="http://schemas.microsoft.com/intellisense/ie5">
	<SCRIPT LANGUAGE="JavaScript" SRC="Include/EditPatientId_Update_Proc.js" CHARSET="UTF-8"></SCRIPT>
	<SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js" CHARSET="UTF-8"></SCRIPT>
  <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
    <script language=javascript>
  // 2006/03/22 H.SAITO -ST-
  function Fn_OnLoad(){
  // 2006/03/22 H.SAITO -ED-
		try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "EditPatientId_Update_Proc.aspx"  //ファイル名
			// 検索終了通知
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
  <body  onload="Fn_InitPage()">
-->
  <body  onload="Fn_InitPage();Fn_OnLoad();">
<!-- 2006/03/22 H.SAITO -ED- -->
	 <form name="frmUpdate" method="post">
        <INPUT TYPE='hidden' NAME='txtMode'>
        <INPUT TYPE='hidden' NAME='commandId'>
        <INPUT TYPE='hidden' NAME='studySequence'>
        <INPUT TYPE='hidden' NAME='patientId'>
        <INPUT TYPE='hidden' NAME='patientName'>
        <INPUT TYPE='hidden' NAME='patientKanjiName'>
        <INPUT TYPE='hidden' NAME='patientSex'>
        <INPUT TYPE='hidden' NAME='patientBirth'>
        <INPUT TYPE='hidden' NAME='studyStatus'>
        <INPUT TYPE='hidden' NAME='loginUserId'>
        <INPUT TYPE='hidden' NAME='loginTime'>
        <INPUT TYPE='hidden' NAME='updateFlag'>
     </form>
  </body>
</html>
