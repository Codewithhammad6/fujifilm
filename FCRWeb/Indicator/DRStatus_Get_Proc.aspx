<%@ Page language="c#" Codebehind="DRStatus_Get_Proc.aspx.cs" AutoEventWireup="false" Inherits="Indicator.DRStatus_Get_Proc" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file RUStatus_Get_Proc.aspx

  @brief RU装置状態情報取得用フレーム


  @author YSK菅野

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reseved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/22  YSK菅野     XX-XX      新規作成
  @date  06/03/22  YSK齋藤     V1.2       OnLoadイベントのハンドリング対応(PVCS#1742)

/****************************************************************************/
%>
<%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
<HTML>
  <HEAD>
    <TITLE>RUStatus_Get_Proc</TITLE>
    <META CONTENT="Microsoft Visual Studio .NET 7.1" NAME="GENERATOR">
    <META CONTENT="C#" NAME="CODE_LANGUAGE">
    <META CONTENT="JavaScript" NAME="vs_defaultClientScript">
    <META CONTENT="http://schemas.microsoft.com/intellisense/ie5" NAME="vs_targetSchema">
    <SCRIPT LANGUAGE="JavaScript">
    <!--
    function Fn_OnLoad(){
      parent.g_nRecordCount = "<%=nRecordCount%>";
      <% for(int i = 0; i < nRecordCount; i++){ %>
        parent.g_nNO[<%=i%>]			= "<%=nNO[i]%>";
	parent.g_strName[<%=i%>]		= "<%=strName[i]%>";
	parent.g_strColor[<%=i%>]		= "<%=strColor[i]%>";
	parent.g_nConnect[<%=i%>]		= "<%=nConnect[i]%>";
	parent.g_nShotReady[<%=i%>]		= "<%=nShotReady[i]%>";
	parent.g_nBatteryStatus[<%=i%>]		= "<%=nBatteryStatus[i]%>";
	parent.g_nBatteryTimeRemain[<%=i%>]	= "<%=nBatteryTimeRemain[i]%>";
	parent.g_nEmagencyMode[<%=i%>]		= "<%=nEmagencyMode[i]%>";
	parent.g_nAutoCalib_Status[<%=i%>]	= "<%=nAutoCalib_Status[i]%>";
	parent.g_nOtherStatus1[<%=i%>]		= "<%=nOtherStatus1[i]%>";
	parent.g_nOtherStatus2[<%=i%>]		= "<%=nOtherStatus2[i]%>";
	parent.g_nOtherStatus3[<%=i%>]		= "<%=nOtherStatus3[i]%>";
	parent.g_nOtherStatus4[<%=i%>]		= "<%=nOtherStatus4[i]%>";
	parent.g_nOtherStatus5[<%=i%>]		= "<%=nOtherStatus5[i]%>";
	parent.g_nOtherStatus6[<%=i%>]		= "<%=nOtherStatus6[i]%>";
	parent.g_nOtherStatus7[<%=i%>]		= "<%=nOtherStatus7[i]%>";
	parent.g_nOtherStatus8[<%=i%>]		= "<%=nOtherStatus8[i]%>";
	parent.g_nOtherStatus9[<%=i%>]		= "<%=nOtherStatus9[i]%>";
	parent.g_nOtherStatus10[<%=i%>]		= "<%=nOtherStatus10[i]%>";
	parent.g_nEnable[<%=i%>]		    = "<%=nEnable[i]%>";
        <% } %>
        <%=strEndGetStatus%>
    }
	  -->
    </SCRIPT>
  </HEAD>
<!-- 2006/03/22 H.SAITO -ST- -->
<!--
  <BODY>
-->
  <BODY ONLOAD="Fn_OnLoad();">
<!-- 2006/03/22 H.SAITO -ED- -->
  </BODY>
</HTML>
