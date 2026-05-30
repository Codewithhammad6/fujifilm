<%@ Page language="c#" Codebehind="Sub_Output.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.Sub_Output" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file Sub_Output.aspx

  @brief 出力先設定サブメインフレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/10　YSK畑  　   V1.0　     新規作成
  @date  06/11/01  HSK山本     V1.4       CR検査部構造見直し[4]対応

/****************************************************************************/
%>
<%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" > 

<html>
  <head>
    <title>Sub_Output</title>
    <meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
    <meta name="CODE_LANGUAGE" Content="C#">
    <meta name=vs_defaultClientScript content="JavaScript">
    <meta name=vs_targetSchema content="http://schemas.microsoft.com/intellisense/ie5">
<LINK REL="stylesheet" TYPE="text/css" HREF="CSS/Sub_Output.css">
<SCRIPT LANGUAGE="JavaScript" SRC="Include/JSCommonFrameSize.js" CHARSET="UTF-8"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js" CHARSET="UTF-8"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"   CHARSET="UTF-8"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" SRC="Include/Sub_Output.js" CHARSET="UTF-8"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" SRC="Include/GetString.js" CHARSET="UTF-8"></SCRIPT>
<script language="javascript" src="./Include/MessageWindow.js" charset="UTF-8"></script>
<script language="javascript">
		try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "Sub_Output.aspx"  //ファイル名
		// 文字列数
		var StringCount   = <%=StringCount%> + <%=StringCommonCount%>;			// 文字列数
		var CaptionString = new Array();				// 文字列配列
		var CaptionId     = new Array();				// 文字列キー配列
// 文字列配列作成
<%
int i;
 for(i=0; i<StringCount; i++){
%>
		
		CaptionString.push("<%=CaptionString[i]%>");
		CaptionId.push(<%=CaptionId[i]%>);
		
<%
}
%>
<%
int j;
 for(j=0; j<StringCommonCount; j++){
%>
		
		CaptionString.push("<%=CaptionCommonString[j]%>");
		CaptionId.push(<%=CaptionCommonId[j]%>);
		
<%
}
%>
		//メッセージ
		var LangMsgStringCount   = <%=LangMsgCount%>;			// 文字列数
		var LangMsgTitle1 = new Array();				// メッセージTitle1配列
		var LangMsgTitle2 = new Array();				// メッセージTitle2配列
		var LangMsgMessage = new Array();				// メッセージ配列
		var LangMsgId     = new Array();				// メッセージキー配列
// 文字列配列作成
<%
int x;
 for(x=0; x<LangMsgCount; x++){
%>
		
		LangMsgTitle1.push("<%=LangMsgTitle1[x]%>");
		LangMsgTitle2.push("<%=LangMsgTitle2[x]%>");
		LangMsgMessage.push("<%=LangMsgMessage[x]%>");
		LangMsgId.push(<%=LangMsgId[x]%>);
		
<%
}
%>
	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }


</script>
</HEAD>
<BODY ONLOAD="Public_ClearStirngCount();Public_ClearLangMsgStirngCount();Fn_InitPage();">
  <IFRAME ID="OUTPUT_CTRL" SCROLLING="no" FRAMEBORDER="0">
  </IFRAME>
</BODY>
  </body>
</html>
