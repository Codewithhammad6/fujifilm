<%@ Page language="c#" Codebehind="Output_Update_Proc.aspx.cs" EnableSessionState="false" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.Output_Update_Proc" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
    <title>Output_Update_Proc</title>
    <%
/****************************************************************************

  @file Output_Update_Proc.aspx

  @brief 出力先設定更新処理フレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/0      YSK畑　     V1.0       新規作成
  @date  06/03/22  YSK齋藤     V1.2       OnLoadイベントのハンドリング対応(PVCS#1742)
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
/****************************************************************************/
%>
    <%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
    <meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
    <meta name="CODE_LANGUAGE" Content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <script language="javascript" src="./Include/MessageWindow.js" charset="UTF-8"></script>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
    <script language="javascript">
  // 2006/03/22 H.SAITO -ST-
  function Fn_OnLoad(){
  // 2006/03/22 H.SAITO -ED-
		try{
      var FATAL_ERROR    = "FATAL_ERROR";
      var MESSAGE_ID     = 31500; 
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "Output_Update_Proc.aspx";  //ファイル名

		  // クライアントスクリプト
		  <%=ClientScript%>
		
	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
  // 2006/03/22 H.SAITO -ST-
  }
  // 2006/03/22 H.SAITO -ED-
		
    //*****************************************************************************
    // Fn_InitPage
    // １．機能
    //      ページロード時の処理
    // ２．戻り値
    //　　  なし
    // ３．備考
    //　　　なし
    //*****************************************************************************
    function Fn_InitPage(){
    }
    </script>
  </HEAD>
<!-- 2006/03/22 H.SAITO -ST- -->
<!--
  <body onload="Fn_InitPage()">
-->
  <body  onload="Fn_InitPage();Fn_OnLoad();">
<!-- 2006/03/22 H.SAITO -ED- -->
    <form name="frmUpdate" method="post">
      <INPUT TYPE='hidden' NAME='studySequence'>
      <INPUT TYPE='hidden' NAME='outputPriority'>
      <INPUT TYPE='hidden' NAME='deviceCode'> 
      <INPUT TYPE='hidden' NAME='deviceType'> 
      <INPUT TYPE='hidden' NAME='outputTiming'>
      <INPUT TYPE='hidden' NAME='outputReqClass'> 
      <INPUT TYPE='hidden' NAME='outputDensity'>
      <INPUT TYPE='hidden' NAME='outputPicCompType'> 
      <INPUT TYPE='hidden' NAME='outputPicProcessType'>
      <INPUT TYPE='hidden' NAME='outputPicProcessParam'> 
      <INPUT TYPE='hidden' NAME='outputCopies'>
      <INPUT TYPE='hidden' NAME='outputFlag'> 
      <INPUT TYPE='hidden' NAME='outputStatus'>
      <INPUT TYPE='hidden' NAME='studyStatus'>
      <INPUT TYPE='hidden' NAME='loginUserId'>
      <INPUT TYPE='hidden' NAME='loginTime'>
    </form>
  </body>
</HTML>
