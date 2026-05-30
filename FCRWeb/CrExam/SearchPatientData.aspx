<%@ Page language="c#" Codebehind="SearchPatientData.aspx.cs" EnableSessionState="false" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.SearchPatientData" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title></title>
		<%
/****************************************************************************

  @file SearchPatientData.aspx

  @brief 患者検索処理フレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/20  YSK畑       V1.0　     新規作成
  @date  06/03/22  YSK齋藤     V1.2       OnLoadイベントのハンドリング対応(PVCS#1742)
  @date  06/11/01  HSK山本     V1.4       CR検査部構造見直し[4]対応
  @date  09/12/24  TYS松岡     V6.1       CQ#61対応
  @date  10/04/19  TYS園木     V2.0(B)    責任者マルチバイト対応
/****************************************************************************/
%>
		<%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<SCRIPT language="JavaScript" src="Include/SearchPatientData.js" charset="UTF-8"></SCRIPT>
		<SCRIPT language="JavaScript" src="Include/MessageWindow.js" charset="UTF-8"></SCRIPT>
		<script language="javascript">
  // 2006/03/22 H.SAITO -ST-
  function Fn_OnLoad(){
  // 2006/03/22 H.SAITO -ED-
		try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "SearchPatientData.aspx"  //ファイル名

		if("<%=CommandMode%>" == "INPUT"){
				// 患者情報設定
				parent.PatientFlag = <%=Patientflag%>;
				// 検索処理モード
				parent.EDITPATIENTID_VIEW.SearchMode = <%=SearchMode%>;

				if(parent.PatientFlag == 1){
					parent.PatientId        = "<%=PatientId%>";					// 患者ID
					parent.PatientName      = "<%=PatientName_S%>";				// 患者名(半角)
					parent.PatientKanjiName = "<%=PatientName_D%>";				// 患者名(全角)
					parent.PatientSex       = <%=PatientSex%>;					// 性別
					parent.PatientBirthDate = "<%=PatientBirthDate%>";			// 生年月日
					// 2009/12/24 ADD TYS松岡 CQ#61対応 Start ---------------------------
					parent.PatientsSize		= "<%=PatientsSize%>";				// 身長
					parent.PatientsWeight	= "<%=PatientsWeight%>";			// 体重
					parent.PatientSpeciesDescription = "<%=PatientSpeciesDescription%>";// 種族
					parent.PatientBreedDescription = "<%=PatientBreedDescription%>";// 品種
					parent.ResponsiblePerson = "<%=ResponsiblePerson%>";		// 責任者(個人)
					// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ---------------------------
					parent.ResponsiblePersonIdoGraphic = "<%=ResponsiblePersonIdoGraphic%>";		// 責任者(個人)：全角
					// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ---------------------------
					parent.ResponsibleOrganization = "<%=ResponsibleOrganization%>";// 責任者(組織)
					parent.PatientsSexNeutred = <%=PatientsSexNeutred%>;		// 避妊処置
					parent.PatientComment	= "<%=PatientComment%>";			// 患者コメント
					// 2009/12/24 ADD TYS松岡 CQ#61対応 End   ---------------------------
					parent.GetDate  	    = "<%=GetDate%>";					// 取得時間
					
				}
			}else if("<%=CommandMode%>" == "CHANGE"){
				parent.EditPatientName      = "<%=PatientName_S%>";				// 患者名(半角)
				parent.EditPatientKanjiName = "<%=PatientName_D%>";				// 患者名(全角)
				parent.EditPatientSex       = <%=PatientSex%>;					// 性別
				parent.EditPatientBirthDate = "<%=PatientBirthDate%>";			// 生年月日
				// 2009/12/24 ADD TYS松岡 CQ#61対応 Start ---------------------------
				parent.EditPatientsSize		= "<%=PatientsSize%>";				// 身長
				parent.EditPatientsWeight	= "<%=PatientsWeight%>";			// 体重
				parent.EditPatientSpeciesDescription = "<%=PatientSpeciesDescription%>";// 種族
				parent.EditPatientBreedDescription = "<%=PatientBreedDescription%>";// 品種
				parent.EditResponsiblePerson = "<%=ResponsiblePerson%>";		// 責任者(個人)
				// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 Start ---------------------------
				parent.EditResponsiblePersonIdoGraphic = "<%=ResponsiblePersonIdoGraphic%>";		// 責任者(個人)：全角
				// 2010/04/19 ADD TYS園木 責任者マルチバイト対応 End   ---------------------------
				parent.EditResponsibleOrganization = "<%=ResponsibleOrganization%>";// 責任者(組織)
				parent.EditPatientsSexNeutred = <%=PatientsSexNeutred%>;		// 避妊処置
				parent.EditPatientComment	= "<%=PatientComment%>";			// 患者コメント
				// 2009/12/24 ADD TYS松岡 CQ#61対応 End   ---------------------------
				parent.GetDate  	    = "<%=GetDate%>";					// 取得時間
 
        // 画像確認モニタの場合
        if(parent.isModifyCtrlCE){
	  			// 検索処理モード
  				parent.FRAME_VIEW.SearchMode = <%=SearchMode%>;
        }
        // 画像確認モニタ以外(既存処理)
        else{
	  			// 検索処理モード
  				parent.CHANGEPATIENTID_VIEW.SearchMode = <%=SearchMode%>;
        }
			}
			// 検索終了通知
			<%=ClientScript%>

	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
  // 2006/03/22 H.SAITO -ST-
  }
  // 2006/03/22 H.SAITO -ED-
function Fn_Initialize(){
  try{
    if("<%=ClientScript%>" == ""){
      Fn_InitPage();
    }

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+1);
	}

}		

		</script>
		<!-- 2006/03/22 H.SAITO -ST- -->
		<!--
	<body onload="Fn_Initialize()">
-->
	</HEAD>
	<body onload="Fn_Initialize();Fn_OnLoad();">
		<!-- 2006/03/22 H.SAITO -ED- -->
		<FORM name="frmSearchForm" action="SearchPatientData.aspx" method="post">
			<INPUT type="text" name="txtId"> <INPUT type="text" name="txtMode"> <INPUT type="text" name="txtSearchMode">
			<INPUT type="hidden" name="loginUserId"> <INPUT type="hidden" name="loginTime">
		</FORM>
	</body>
</HTML>
