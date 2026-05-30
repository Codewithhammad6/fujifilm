<%@ Page language="c#" Codebehind="Event_Get_Proc.aspx.cs" AutoEventWireup="false" Inherits="Indicator.Event_Get_Proc" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file Event_Get_Proc.aspx

  @brief イベント情報取得用フレーム


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
    <TITLE>Event_Get_Proc</TITLE>
    <META CONTENT="Microsoft Visual Studio .NET 7.1" NAME="GENERATOR">
    <META CONTENT="C#" NAME="CODE_LANGUAGE">
    <META CONTENT="JavaScript" NAME="vs_defaultClientScript">
    <META CONTENT="http://schemas.microsoft.com/intellisense/ie5" NAME="vs_targetSchema">
    <SCRIPT LANGUAGE="JavaScript">
    <!--
    // 2006/03/22 H.SAITO -ST-
    function Fn_OnLoad(){
    // 2006/03/22 H.SAITO -ED-
      <% if(intRet == 0 && lRet == 0){ %>
        parent.g_intResultRowCount = <%=intResultRowCount%>;
        parent.g_intMaxPage = <%=intMaxPage%>;
        <% for(int i = 0; i < intResultRowCount; i++){ %>
          parent.g_strEventSeq[<%=i%>]    = "<%=strEventSeq[i]%>";
          parent.g_strErrCode[<%=i%>]     = "<%=strErrCode[i]%>";
          parent.g_strIncDateTime[<%=i%>] = "<%=strIncDateTime[i]%>";
          parent.g_strErrKind[<%=i%>]     = "<%=strErrKind[i]%>";
          parent.g_strErrLevel[<%=i%>]    = "<%=strErrLevel[i]%>";
          parent.g_strErrStatus[<%=i%>]   = "<%=strErrStatus[i]%>";
          parent.g_strErrInfo[<%=i%>]     = "<%=strErrInfo[i]%>";
          parent.g_strErrDetail[<%=i%>]   = "<%=strErrDetail[i]%>";
        <% } %>
      <% } %>
      <%=strEndGetEvent%>
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
