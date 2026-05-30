<%@ Page language="c#" Codebehind="Study_TurnImage_Proc.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.Study_TurnImage_Proc" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file Study_TrunImage_Proc.aspx

  @brief 回転・反転・元に戻す処理フレーム

  @author YSK齋藤

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/18  YSK齋藤     V1.0　     新規作成
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
    <META NAME="GENERATOR"						CONTENT="Microsoft Visual Studio .NET 7.1">
    <META NAME="CODE_LANGUAGE"				CONTENT="C#">
    <META NAME=vs_defaultClientScript CONTENT="JavaScript">
    <META NAME=vs_targetSchema				CONTENT="http://schemas.microsoft.com/intellisense/ie5">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Study_TurnImage_Proc.js"	CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js"				CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript">
  // 2006/03/22 H.SAITO -ST-
  function Fn_OnLoad(){
  // 2006/03/22 H.SAITO -ED-
		try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "Study_turnImage_Proc.aspx"  //ファイル名
        var i;
        // 回転・反転・元に戻す操作後の画像情報を取得する
        <% if(ImageSequence != "") {%>       
          i = parent.AssosiateId["<%=ImageSequence%>"];           // 画像シーケンス⇒添え字
          parent.ImageFileName[i]     = "<%=ImageFileName%>";     //処理済画像ファイル名
          parent.ImageHeight[i]       = "<%=ImageHeight%>";       //処理済画像高さ
          parent.ImageWidth[i]        = "<%=ImageWidth%>";        //処理済画像幅
          parent.ThumbnailFileName[i] = "<%=ThumbnailFileName%>"; //サムネイル画像ファイル名
          parent.ThumbnailHeight[i]   = "<%=ThumbnailHeight%>";   //サムネイル画像高さ
          parent.ThumbnailWidth[i]    = "<%=ThumbnailWidth%>";    //サムネイル画像幅
        <%}%>
        // 2006/03/22 H.SAITO -ST-
        <%=ClientScript%>
        // 2006/03/22 H.SAITO -ED-
	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
  // 2006/03/22 H.SAITO -ST-
  }
  // 2006/03/22 H.SAITO -ED-
    </SCRIPT>
  </HEAD>
<!-- 2006/03/22 H.SAITO -ST- -->
<!--
  <BODY ONLOAD="Fn_InitPage();<%=ClientScript%>">
-->
	<BODY ONLOAD="Fn_InitPage();Fn_OnLoad();">
<!-- 2006/03/22 H.SAITO -ED- -->
    <FORM NAME="frmTurnForm" METHOD="POST">
      <INPUT TYPE="hidden" ID="procMode"			NAME="procMode">      
      <INPUT TYPE="hidden" ID="studySequence" NAME="studySequence">
      <INPUT TYPE="hidden" ID="imageSequence"	NAME="imageSequence">
      <INPUT TYPE="hidden" ID="imageAngle"	  NAME="imageAngle">
      <INPUT TYPE="hidden" ID="studyStatus"	  NAME="studyStatus">
      <INPUT TYPE="hidden" ID="patientId"	    NAME="patientId">
      <INPUT TYPE="hidden" ID="loginUserId"	  NAME="loginUserId">
      <!-- 2005/06/27 002 H.SAITO PVCS#350 権限、認証チェック対応 -->
      <INPUT TYPE="hidden" ID="loginTime"	    NAME="loginTime">
    </FORM>
	</BODY>
</HTML>