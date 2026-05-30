<%@ Page language="c#" Codebehind="MediaStatus_Get_Proc.aspx.cs" AutoEventWireup="false" Inherits="Indicator.MediaStatus_Get_Proc" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 TRANSITIONAL//EN" >
<%
/****************************************************************************

  @file MediaStatus_Get_Proc.aspx

  @brief メディア装置状態情報取得用フレーム


  @author YSK菅野

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reseved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/22  YSK菅野     XX-XX      新規作成
  @date  06/03/22  YSK齋藤     V1.2       OnLoadイベントのハンドリング対応(PVCS#1742)
  @date  09/06/08  FF 蔵敷　　　V6.0       NAS対応　V60_NAS
  @date  11/02/03  FF 星野　　　V2.1(B)    保管用NAS対応

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
    <TITLE>MediaStatus_Get_Proc</TITLE>
    <META NAME="GENERATOR" CONTENT="Microsoft Visual Studio .NET 7.1">
    <META NAME="CODE_LANGUAGE" CONTENT="C#">
    <META NAME="vs_defaultClientScript" CONTENT="JavaScript">
    <META NAME="vs_targetSchema" CONTENT="http://schemas.microsoft.com/intellisense/ie5">
    <SCRIPT LANGUAGE="JavaScript">
    <!--
    // 2006/03/22 H.SAITO -ST-
    function Fn_OnLoad(){
    // 2006/03/22 H.SAITO -ED-
      switch(<%=intProcCode%>){
        <!-- ステータス取得時 -->
        case 0:
          parent.g_intDeviceID   = new Array();
          parent.g_strDeviceName = new Array();
          parent.g_strDeviceAttr = new Array();
          parent.g_strLabelName  = new Array();
          parent.g_strMediaKind  = new Array();
          parent.g_strWritable   = new Array();
          parent.g_intDeviceType = new Array();
          parent.intMaxCount     = <%=intMaxCount%>;
<%-- 2005/09/12 Kanno UPDATE ST PVCS#799 --%>
<%--          parent.g_strIpAddress  = "<%=strLocalIP%>";  --%>
          parent.g_strHostName  = "<%=strHostName%>";
<%-- 2005/09/12 Kanno UPDATE ED PVCS#799 --%>
          <% for(int i = 0; i < intMaxCount; i++){ %>
            parent.g_intDeviceID[<%=i%>]   = <%=intDeviceID[i]%>;
            parent.g_strDeviceName[<%=i%>] = "<%=strDeviceName[i]%>";
            parent.g_strDeviceAttr[<%=i%>] = "<%=strDeviceAttr[i]%>";
            parent.g_intDeviceType[<%=i%>]= "<%=intDeviceType[i]%>";

            <!-- メディア未挿入(アンマウント時) -->
            <% if( (strMountStatus[i] == "0") && (intDeviceType[i] != 3) && (intDeviceType[i] != 4)){ %>
              parent.g_strLabelName[<%=i%>]  = "";
              parent.g_strMediaKind[<%=i%>]  = "";
              parent.g_strWritable[<%=i%>]   = "";
            <!-- メディア挿入(マウント時) -->
            <% } else { %>
              parent.g_strLabelName[<%=i%>] = "<%=strLabelName[i]%>" + " / " + "<%=strFreeRate[i]%>" + "%";
              <% if(strWritable[i] == "1"){ %>
                parent.g_strWritable[<%=i%>] = top.FUNCTION_FRAME.Public_GetString(parent.KeyWritable, parent.DefaultWritable);
              <% }else if(strWritable[i] == "2"){ %>
                parent.g_strWritable[<%=i%>] = top.FUNCTION_FRAME.Public_GetString(parent.KeyUsing, parent.DefaultUsing);
                parent.g_intWritingHDDIndex =[<%=i%>];
              <% }else{ %>
                parent.g_strWritable[<%=i%>] = top.FUNCTION_FRAME.Public_GetString(parent.KeyUnWritable, parent.DefaultUnWritable);
              <% } %>
              <!-- 保管用ディスク -->
              <% if(strMediaKind[i] == "1"){ %>
                parent.g_strMediaKind[<%=i%>] = top.FUNCTION_FRAME.Public_GetString(parent.KeyForStrage, parent.DefaultForStrage);
              <!-- 作業用ディスク -->
              <% }else{ %>
                parent.g_strMediaKind[<%=i%>] = top.FUNCTION_FRAME.Public_GetString(parent.KeyForWork, parent.DefaultForWork);
              <% } %>
            <% } %>
          <% } %>
          break;
        <!-- ディスクの入れ替え時 -->
        case 1:
          break;
      }
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
