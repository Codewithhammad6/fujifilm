<%@ Page language="c#" Codebehind="Queue_Get_Proc.aspx.cs" AutoEventWireup="false" Inherits="Indicator.Queue_Get_Proc" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file Queue_Get_Proc.aspx

  @brief 出力キュー情報取得用フレーム


  @author YSK菅野

  Copyright(C) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/22  YSK菅野     XX-XX      新規作成
  @date  06/03/22  YSK齋藤     V1.2       OnLoadイベントのハンドリング対応(PVCS#1742)
  @date  07/03/16  HSK平尾     V2.0       内視鏡画像取込/DICOM出力対応

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
    <TITLE>Queue_Get_Proc</TITLE>
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
          <!-- OutputID -->
          parent.g_strOutputID[<%=i%>]      = "<%=strOutputID[i]%>";
          <!-- 患者ID -->
          parent.g_strPatientID[<%=i%>]     = "<%=strPatientID[i]%>";
          <!-- 患者名 -->
          parent.g_strPatientName[<%=i%>]   = "<%=strPatientName[i]%>";
          <!-- 検査日時 -->
          parent.g_strStudyDateTime[<%=i%>] = "<%=strStudyDateTime[i]%>";
          <!-- エイリアス名 -->
          parent.g_strAliasName[<%=i%>]     = "<%=strDeviceName[i]%>";
          <%-- 20070316 HSK平尾 V2.0 内視鏡対応 A Start --%>
          <!-- モダリティ -->
          parent.g_strModality[<%=i%>]     = "<%=strModality[i]%>";
          <%-- 20070316 HSK平尾 V2.0 内視鏡対応 A End --%>
          <!-- 種別 -->
          switch("<%=strUnitType[i]%>"){
            case "3":
              parent.g_strKind[<%=i%>] = top.FUNCTION_FRAME.Public_GetString(parent.KeyFilm, parent.DefaultFilm);
              break;
            case "6":
              parent.g_strKind[<%=i%>] = top.FUNCTION_FRAME.Public_GetString(parent.KeyDisk, parent.DefaultDisk);
              break;
            case "7":
              parent.g_strKind[<%=i%>] = top.FUNCTION_FRAME.Public_GetString(parent.KeyGeneral, parent.DefaultGeneral);
              break;
            case "8":
              parent.g_strKind[<%=i%>] = top.FUNCTION_FRAME.Public_GetString(parent.KeyCaRna, parent.DefaultCaRna);
              break;
              // 20070316 HSK平尾 V2.0 DICOM出力対応 A Start
            case "4":
              parent.g_strKind[<%=i%>] = top.FUNCTION_FRAME.Public_GetString(parent.KeyDicom, parent.DefaultDicom);
              break;
              // 20070316 HSK平尾 V2.0 DICOM出力対応 A End
            default:
              parent.g_strKind[<%=i%>] = "";
          }
          <!-- ステータス -->
          Status:
          for(j = 0; j < 21; j++){
            if( (parent.QueueStatus[j] & parseInt("<%=strJobStatus[i]%>")) != 0 ){
              parent.g_strStatus[<%=i%>] = parent.strQueueStatus[j]
              break Status;
            }
          }
        <% } %>
      <% } %>
      <%=strEndGetQueue%>
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
