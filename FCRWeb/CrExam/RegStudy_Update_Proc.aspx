<%@ Page language="c#" Codebehind="RegStudy_Update_Proc.aspx.cs" EnableSessionState="false" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.RegStudy_Update_Proc" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file RegStudyUpdate_Proc.aspx

  @brief 検査登録処理フレーム

  @author YSK齋藤

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/28  YSK齋藤　　     V1.0       新規作成
  @date  06/03/22  YSK齋藤         V1.2       OnLoadイベントのハンドリング対応(PVCS#1742)
  @date  07/07/24  YSK齋藤         V3.0       同時押し対応(ASPCOMPAT=trueの追加)(PVCS#1737)
  @data  10/06/01  FF 星野      V2.0(B)    CQ#219対応
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
		<TITLE>RegStudyUpdate_Proc</TITLE>
		<meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/RegStudy_Update_Proc.js" CHARSET="UTF-8"></SCRIPT>
	  <script language=javascript src="./Include/MessageWindow.js" charset="UTF-8"></script>
	  <script language=javascript>
  // 2006/03/22 H.SAITO -ST-
  function Fn_OnLoad(){
  // 2006/03/22 H.SAITO -ED-
	  try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "RegStudy_Update_Proc.aspx"  //ファイル名
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
		<FORM NAME="frmUpdate" METHOD="post">
			<INPUT TYPE='hidden' NAME="commandType">
			<INPUT TYPE='hidden' NAME="patientId">
			<INPUT TYPE='hidden' NAME="patientNameSbcs">
			<INPUT TYPE='hidden' NAME="patientNameDbcs">
			<INPUT TYPE='hidden' NAME="patientSex">
			<INPUT TYPE='hidden' NAME="patientBirthDate">
			<INPUT TYPE='hidden' NAME="entryMenuCode">
			<INPUT TYPE='hidden' NAME="entryExamFlag">
			<INPUT TYPE='hidden' NAME='loginUserId'>
			<INPUT TYPE='hidden' NAME='loginTime'>
		<!--CQ#219対応 -->
		<INPUT TYPE='hidden' NAME='patientComment'> <INPUT TYPE='hidden' NAME='patientsSize'>
		<INPUT TYPE='hidden' NAME='patientsWeight'> <INPUT TYPE='hidden' NAME='speciesDescription'>
		<INPUT TYPE='hidden' NAME='breedDescription'> <INPUT TYPE='hidden' NAME='responsiblePerson'>
		<INPUT TYPE='hidden' NAME='responsiblePersonIdoGraphic'>
		<INPUT TYPE='hidden' NAME='responsibleOrganization'> <INPUT TYPE='hidden' NAME='neuteredSex'>			
			
		</FORM>
  </BODY>
</HTML>
