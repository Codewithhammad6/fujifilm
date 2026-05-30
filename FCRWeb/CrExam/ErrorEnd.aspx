<%@ Page language="c#" Codebehind="ErrorEnd.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.ErrorEnd" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file ErrorEnd.aspx

  @brief エラー時の終了画面

  @author YSK畑

  Copyright(C) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/03/30　YSK畑   　   V1.0　     新規作成
  @date  06/10/23　HSK山本   　 V1.4　     CR検査部構造見直し[4]対応
  @date  07/04/03　HSK古場   　 V2.0　     IE7対応

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
<META NAME="GENERATOR" CONTENT="Microsoft Visual Studio .NET 7.1">
<META NAME="CODE_LANGUAGE" CONTENT="C#">
<META NAME="vs_defaultClientScript" CONTENT="JavaScript">
<META NAME="vs_targetSchema" CONTENT="http://schemas.microsoft.com/intellisense/ie5">
<LINK REL="stylesheet" TYPE="text/css" HREF="CSS/ErrorEnd.css">
<SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js" CHARSET="UTF-8"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" SRC="Include/Sub_SortMenu.js"  CHARSET="UTF-8"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" SRC="./Include/GetString.js"   CHARSET="UTF-8"></script>
<SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js" CHARSET="UTF-8"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript">
  //ダイアログに渡されたパラメータ(DialogParam[0]:排他設定状態,DialogParam[1]:検査シーケンス)
  var DialogParam = dialogArguments;
  var DialogTime = "";      //タイマー

  var ProcString			 = dialogArguments[2];

function Fn_InitPage(){
  //文字表示
  document.getElementById("TD_ProcText").innerHTML = ProcString;

  document.getElementById("ERROREND_PROC").src = "./ErrorEnd_Proc.aspx?DialogParam=" + DialogParam;

  //タイマーを設定
  DialogTime = setInterval("Fn_DialogClose()",3000);

}
function Fn_DialogClose(){
//070403 HSK古場 UPDATE-ST
//window.close();
  WU_CloseWindow(window);
//070403 HSK古場 UPDATE-ED
}
</script>
</HEAD>
<BODY ONLOAD="Fn_InitPage()" BGCOLOR="#FFE79F">
  <!-- 処理ASPX -->
  <IFRAME ID="ERROREND_PROC" SCROLLING="no"></IFRAME>
  <!-- 処理中ボックス -->
  <TABLE ID="TABLE_ProcBox">
    <TR><TD ID="TD_ProcText"></TD></TR>
  </TABLE>
</BODY>
</HTML>