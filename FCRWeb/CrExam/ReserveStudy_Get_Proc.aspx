<%@ Page language="c#" Codebehind="ReserveStudy_Get_Proc.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.ReserveStudy_Get_Proc" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file ReserveStudy_Get_Proc.aspx

  @brief 予約検査削除取得処理フレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/21  YSK畑　　     V1.0       新規作成
  @date  06/03/22  YSK齋藤       V1.2       OnLoadイベントのハンドリング対応(PVCS#1742)
  @date  14/02/27  FFS星野     V2.4(B)HF0007 CQ#2393対応
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
		<title>ReserveStudy_Get_Proc</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<script language="javascript" src="./Include/ReserveStudy_Get_Proc.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/MessageWindow.js" charset="UTF-8"></script>
  <!--// 2006/03/22 H.SAITO -ST- -->
  <!--
	  <script language=javascript src="./Include/MessageWindow.js" charset="UTF-8"></script>
  -->
  <!-- // 2006/03/22 H.SAITO -ED- -->

	  <script language=javascript>
  // 2006/03/22 H.SAITO -ST-
  function Fn_OnLoad(){
  // 2006/03/22 H.SAITO -ED-
	  try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "ReserveStudy_Get_Proc.aspx"  //ファイル名
			//患者情報取得
			parent.PatientId        = "<%=PatientId%>";
			parent.PatientName      = "<%=PatientName%>";
			parent.PatientKanjiName = "<%=PatientKanjiName%>";
			parent.PatientSex       = <%=PatientSex%>;
			parent.PatientBirthDate = "<%=PatientBirth%>";
			parent.StudySequence    = "<%=StudySqc%>";
			top.StudySequence       = "<%=StudySqc%>";
			
			// 検査ステータス
			parent.StudyStateFlag = <%=StudyStateFlag%>;
			// 遷移ステータス
			parent.TransStateFlag = <%=TransStateFlag%>;
			
			// 予約検査ページ情報
			parent.ReservePage    = <%=ReservePage%>;
			parent.ReserveMaxPage = <%=ReserveMaxPage%>;
			
			// 14/02/27 FFS星野 V2.4(B)HF0007 CQ#2393対応 ADD
			parent.DeleteButtonEnable = <%=DeleteButtonEnable%>;
			
			//メニュー情報
			var Count = <%=ReserveMenuCount%>;
<%
int i;
 for(i=0; i<ReserveMenuCount;i++){
%>
		
		parent.MenuNameInfoArray.push("<%=MenuNameInfo[i]%>");
		parent.MenuStateInfoArray.push(<%=MenuStateInfo[i]%>);
		parent.MenuImageInfoArray.push(<%=MenuStateImage[i]%>);
<%
}
%>
    // 2006/03/22 H.SAITO -ST-
	  // 検索終了通知
		<%=ClientScript%>;
    // 2006/03/22 H.SAITO -ED-
	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
  // 2006/03/22 H.SAITO -ST-
  }
  // 2006/03/22 H.SAITO -ED-
// 2006/03/22 H.SAITO -ST-
//function Fn_Initialize(){
//    try{
//			// 検索終了通知
//			<%=ClientScript%>;
//	  }catch(e){
//      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+1);
//	  }
//}
// 2006/03/22 H.SAITO -ED-
		</script>
	</HEAD>
<!-- 2006/03/22 H.SAITO -ST- -->
<!--
	<body onload="Fn_InitPage();Fn_Initialize();">
-->
	<body onload="Fn_InitPage();Fn_OnLoad();">
<!-- 2006/03/22 H.SAITO -ED- -->
		<form id="frmUpdate" method="post">
			<INPUT TYPE='hidden' NAME='reservePage'>
			<INPUT TYPE='hidden' NAME='studySequence'>
      <!-- 2005/06/27 003 H.SAITO PVCS#350 権限、認証チェック対応 -->
      <INPUT TYPE="hidden" ID="loginUserId"	  NAME="loginUserId">
      <INPUT TYPE="hidden" ID="loginTime"	    NAME="loginTime">
		</form>
	</body>
</HTML>
