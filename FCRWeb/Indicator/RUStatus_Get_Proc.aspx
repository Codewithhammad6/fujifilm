<%@ Page language="c#" Codebehind="RUStatus_Get_Proc.aspx.cs" AutoEventWireup="false" Inherits="Indicator.RUStatus_Get_Proc" ASPCOMPAT="true" %>
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
    // 2006/03/22 H.SAITO -ST-
    function Fn_OnLoad(){
    // 2006/03/22 H.SAITO -ED-
			parent.g_strDeviceID     = "<%=strDeviceID%>";
			parent.g_strDeviceName   = "<%=strDeviceName%>";
			parent.g_intRUInfo       = "<%=RUInfo%>";
			parent.g_strDeviceStatus = "<%=strDeviceStatus%>";
			parent.g_strDetail       = "<%=strDetail%>";
			parent.g_intSeq          = "<%=Seq%>";
			parent.g_strRUButton1    = "<%=strRUButton1%>";
			parent.g_strRUButton2    = "<%=strRUButton2%>";
			parent.g_strRUButton3    = "<%=strRUButton3%>";
			parent.g_strRUButton4    = "<%=strRUButton4%>";
			<%=strEndGetStatus%>
    // 2006/03/22 H.SAITO -ST-
    }
    // 2006/03/22 H.SAITO -ED-
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
