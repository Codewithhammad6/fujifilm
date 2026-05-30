<%@ Page language="c#" Codebehind="Study_Notify_Proc.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.Study_Notify_Proc" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file Study_Notify_Proc.aspx

  @brief 検査画面選択／非選択通知処理フレーム

  @author YSK齋藤

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/11/10  YSK齋藤     V1.0　     新規作成
  @date  06/11/08　YSK齋藤  　 V1.4       PVCS#1962,#1666対応(ログインチェックの追加)

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
    <TITLE>検査画面選択／非選択通知</TITLE>
    <META NAME="GENERATOR"              CONTENT="Microsoft Visual Studio .NET 7.1">
    <META NAME="CODE_LANGUAGE"          CONTENT="C#">
    <META NAME="vs_defaultClientScript" CONTENT="JavaScript">
    <META NAME="vs_targetSchema"        CONTENT="http://schemas.microsoft.com/intellisense/ie5">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Study_Notify_Proc.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js"		 CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript">
    function Fn_OnLoad()
    {
    	<%=ClientScript%>;
    }
    </SCRIPT>
  </HEAD>
  <BODY onload="Fn_InitPage();Fn_OnLoad();">
    <FORM NAME="frmNotifyForm" METHOD="POST">
      <INPUT TYPE="hidden" ID="procMode"            NAME="procMode">      
      <INPUT TYPE="hidden" ID="studySequence"       NAME="studySequence">
      <INPUT TYPE="hidden" ID="imageSeq"            NAME="imageSeq">
      <INPUT TYPE="hidden" ID="loginUserId"         NAME="loginUserId">
      <% /* 2006/11/08 PVCS#1962,#1666 H.SAITO -ST- */%>
      <INPUT TYPE="hidden" ID="loginTime"           NAME="loginTime">
      <% /* 2006/11/08 PVCS#1962,#1666 H.SAITO -ED- */%>
    </FORM>
  </BODY>
</HTML>
