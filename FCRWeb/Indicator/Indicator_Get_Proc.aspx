<%@ Page language="c#" Codebehind="Indicator_Get_Proc.aspx.cs" AutoEventWireup="false" Inherits="Indicator.Indicator_Get_Proc" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file Indicator_Get_Proc.aspx

  @brief インジケータステータス取得用フレーム


  @author YSK菅野

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reseved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/22  YSK菅野     XX-XX      新規作成
  @date  06/03/22  YSK齋藤     V1.2       OnLoadイベントのハンドリング対応(PVCS#1742)
  @date  09/06/02  FF 蔵敷      V6.0       NAS対応 V60_NAS
  @date  14/03/11  TYK石井　　 V3.0(B)    DR装置画面対応
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
    <TITLE>Indicator_Get_Proc</TITLE>
    <META NAME="GENERATOR" CONTENT="Microsoft Visual Studio .NET 7.1">
    <META NAME="CODE_LANGUAGE" CONTENT="C#">
    <META NAME="vs_defaultClientScript" CONTENT="JavaScript">
    <META NAME="vs_targetSchema" CONTENT="http://schemas.microsoft.com/intellisense/ie5">
    <SCRIPT LANGUAGE="JavaScript">
    <!--
  // 2006/03/22 H.SAITO -ST-
  function Fn_OnLoad(){
  // 2006/03/22 H.SAITO -ED-
		try
		{
<%-- 2005/09/09 Kanno DELETE ST #1332 --%>
<%--		      <% if(intProcFlag == 0){ %> --%>
<%-- 2005/09/09 Kanno DELETE ED #1332 --%>
		        parent.intRUStatus     = <%=intRUStatus%>;
		        parent.intMediaStatus  = <%=intMediaStatus%>;
		        parent.intPrtStatus    = <%=intPrinterStatus%>;
		        parent.intOutputStatus = <%=intQueueStatus%>;
		        parent.intEventStatus  = <%=intEventStatus%>;
		        parent.ServerTime      = "<%=strServerTime%>";
		        parent.intHDDStatus = <%=intHDDStatus%>;
                parent.intDRStatus     = <%=intDRStatus%>;  //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD

<%-- 2005/09/09 Kanno DELETE ST #1332 --%>
<%--		      <% } %> --%>
<%-- 2005/09/09 Kanno DELETE ED #1332 --%>
		      <%=strEndGetStatus%>
		}
		catch(e)
		{
		}
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
