<%@ Page language="c#" Codebehind="EditPatientDetail_Update_Proc.aspx.cs" EnableSessionState="false" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.EditPatientDetail_Update_Proc" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file EditPatientDetail_Update_Proc.aspx

  @brief 患者詳細情報更新処理フレーム

  @author YSK畑

  Copyright(c) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/21  YSK畑　     V1.0       新規作成
  @date  06/03/22  YSK齋藤     V1.2       OnLoadイベントのハンドリング対応(PVCS#1742)
  @date  07/05/16  HSK古場     V2.0       (HSK)B票#403の不具合修正
  @date  09/12/01  FF 星野     V1.1(B)    1.1(B)対応 
  @date  09/12/26  TYS松岡     V1.1(B)    CQ#61対応
  @date  10/04/19  TYS園木     V2.0(B)    責任者マルチバイト対応

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
    <title>EditPatientDetail_Update_Proc</title>
    <meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
    <meta name="CODE_LANGUAGE" Content="C#">
    <meta name=vs_defaultClientScript content="JavaScript">
    <meta name=vs_targetSchema content="http://schemas.microsoft.com/intellisense/ie5">
	  <SCRIPT LANGUAGE="JavaScript" SRC="Include/EditPatientDetail_Update_Proc.js" CHARSET="UTF-8"></SCRIPT>
   <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
   <script language=javascript>
  // 2006/03/22 H.SAITO -ST-
  function Fn_OnLoad(){
  // 2006/03/22 H.SAITO -ED-
		try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "EditPatientDetail_Updat_Proc.aspx"  //ファイル名
      
      		//2009.12.01 1.1(B)対応 FF星野 ADD-ST
			var searchMode = "<%=SearchMode%>";
			if(searchMode == "1")
			{
			// 2009/12/26 ADD TYS松岡 CQ#61対応 Start ---------------------------
				//患者ＩＤ
				parent.EditPatientId        = "<%=PatientId%>";
				//患者名
				parent.EditPatientName      = "<%=PatientName_S%>";
				//漢字患者名
				parent.EditPatientKanjiName = "<%=PatientName_D%>";
				//性別      
				parent.EditPatientSex       = "<%=PatientSex%>";
				//生年月日
				parent.EditPatientBirthDate = "<%=PatientBirthDate%>";
				//年齢
				parent.EditPatientAge		= "<%=PatientAge%>";				
				//患者コメント
				parent.EditPatientComment	= "<%=PatientComment%>";
				//身長
				parent.EditPatientsSize		= "<%=PatientsSize%>";
				//体重
				parent.EditPatientsWeight	= "<%=PatientsWeight%>";
				//去勢避妊
				parent.EditPatientsSexNeutred= "<%=NeuteredSex%>";
				//種別
				parent.EditPatientSpeciesDescription= "<%=SpeciesDescription%>";
				//品種
				parent.EditPatientBreedDescription= "<%=BreedDescription%>";
				//責任者
				parent.EditResponsiblePerson= "<%=ResponsiblePerson%>";
				// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ------------------------------------
				//責任者(全角)
				parent.EditResponsiblePersonIdoGraphic= "<%=ResponsiblePersonIdoGraphic%>";
				// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ------------------------------------
				//所属先
				parent.EditResponsibleOrganization= "<%=ResponsibleOrganization%>";
				// 2009/12/26 ADD TYS松岡 CQ#61対応 End   ---------------------------
				// 2009/12/26 DEL TYS松岡 CQ#61対応 Start ---------------------------
				////患者ＩＤ
				//parent.PatientId        = "<%=PatientId%>";
				////患者名
				//parent.PatientName      = "<%=PatientName_S%>";
				////漢字患者名
				//parent.PatientKanjiName = "<%=PatientName_D%>";
				////性別      
				//parent.PatientSex       = "<%=PatientSex%>";
				////生年月日
				//parent.PatientBirthDate = "<%=PatientBirthDate%>";
				////年齢
				//parent.PatientAge		= "<%=PatientAge%>";				
				////患者コメント
				//parent.PatientComment	= "<%=PatientComment%>";
				////身長
				//parent.PatientsSize		= "<%=PatientsSize%>";
				////体重
				//parent.PatientsWeight	= "<%=PatientsWeight%>";
				////去勢避妊
				//parent.PatientsSexNeutred= "<%=NeuteredSex%>";
				////種別
				//parent.PatientSpeciesDescription= "<%=SpeciesDescription%>";
				////品種
				//parent.PatientBreedDescription= "<%=BreedDescription%>";
				////責任者
				//parent.ResponsiblePerson= "<%=ResponsiblePerson%>";
				////所属先
				//parent.ResponsibleOrganization= "<%=ResponsibleOrganization%>";
			// 2009/12/26 DEL TYS松岡 CQ#61対応 End   ---------------------------
			}
			//2009.12.01 1.1(B)対応 FF星野 ADD-ED

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
  <body onload="Fn_InitPage()">
-->
	<body onload="Fn_InitPage();Fn_OnLoad();">
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
        <INPUT TYPE='hidden' NAME='loginUserId'>
        <INPUT TYPE='hidden' NAME='loginTime'>
        <INPUT TYPE='hidden' NAME='studyStatus'>
        <INPUT TYPE='hidden' NAME='updateFlag'>
		<!--//2009.12.01 V1.1(B)対応 FF星野 ADD-ST-->
		<INPUT TYPE='hidden' NAME='patientComment'> <INPUT TYPE='hidden' NAME='patientsSize'>
		<INPUT TYPE='hidden' NAME='patientsWeight'> <INPUT TYPE='hidden' NAME='speciesDescription'>
		<INPUT TYPE='hidden' NAME='breedDescription'> <INPUT TYPE='hidden' NAME='responsiblePerson'>
		<INPUT TYPE='hidden' NAME='responsibleOrganization'> <INPUT TYPE='hidden' NAME='neuteredSex'>
		<INPUT TYPE='hidden' NAME='searchMode'> 
		<!--//2009.12.01 V1.1(B)対応 FF星野 ADD-ED-->
     </form>
  </body>
</html>
