<%@ Page language="c#" Codebehind="MediaList_Get_Proc.aspx.cs" AutoEventWireup="false" Inherits="Indicator.MediaList_Get_Proc" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file MediaList_Get_Proc.aspx

  @brief 保管用ディスク一覧取得用フレーム


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
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
    <TITLE>MediaList_Get_Proc</TITLE>
    <META NAME="GENERATOR" CONTENT="Microsoft Visual Studio .NET 7.1">
    <META NAME="CODE_LANGUAGE" CONTENT="C#">
    <META NAME="vs_defaultClientScript" CONTENT="JavaScript">
    <META NAME="vs_targetSchema" CONTENT="http://schemas.microsoft.com/intellisense/ie5">
    <SCRIPT LANGUAGE="JavaScript">
    <!--
    // 2006/03/22 H.SAITO -ST-
    function Fn_OnLoad(){
    // 2006/03/22 H.SAITO -ED-
      <% if(intRet == 0 && lRet == 0){ %>
        parent.g_intResultRowCount = <%=intResultRowCount%>;
        parent.g_intMaxPage = <%=intMaxPage%>;
        <% for(int i = 0; i < intResultRowCount; i++){ %>
          parent.g_strDiskName[<%=i%>]     = "<%=strLabelName[i]%>";
          parent.g_strOpenDateTime[<%=i%>]  = "<%=strOpenDateTime[i]%>";
          parent.g_strCloseDateTime[<%=i%>] = "<%=strCloseDateTime[i]%>";
          parent.g_strMediaAttr[<%=i%>]     = "<%=strMediaAttr[i]%>";
        <% } %>
      <% } %>
      <%=strEndGetMediaList%>
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
