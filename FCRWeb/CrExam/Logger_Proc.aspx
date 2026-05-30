<%@ Page language="c#" Codebehind="Logger_Proc.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.Logger_Proc" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file LoggerProc.aspx

  @brief 操作ログ出力処理フレーム

  @author YSK齋藤

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/10  YSK齋藤     V1.0       新規作成
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
    <TITLE></TITLE>
    <META NAME="GENERATOR"              CONTENT="Microsoft Visual Studio .NET 7.1">
    <META NAME="CODE_LANGUAGE"          CONTENT="C#">
    <META NAME="vs_defaultClientScript" CONTENT="JavaScript">
    <META NAME="vs_targetSchema"        CONTENT="http://schemas.microsoft.com/intellisense/ie5">
  <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js"       CHARSET="UTF-8"></SCRIPT>
  <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
  <SCRIPT LANGUAGE="JavaScript">
  // 2006/03/22 H.SAITO -ST-
  function Fn_OnLoad(){
  // 2006/03/22 H.SAITO -ED-
  try{
    var FATAL_ERROR    = "FATAL_ERROR";
    var MESSAGE_ID     = 31500; 
    var SPOT_CODE_ASPX = 0;               //スポットコード
    var FILE_NAME_ASPX = "Function.aspx"  //ファイル名
		// エラー時のクライアントスクリプト
		<%=ClientScript%>

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
  <BODY>
-->
  <BODY ONLOAD="Fn_OnLoad();">
<!-- 2006/03/22 H.SAITO -ED- -->
  </BODY>
</HTML>
