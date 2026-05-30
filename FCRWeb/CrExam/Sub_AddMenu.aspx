<%@ Page language="c#" Codebehind="Sub_AddMenu.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.Sub_AddMenu" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file Sub_AddMenu.aspx

  @brief メニュー追加サブメインフレーム

  @author YSK田中

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/10  YSK田中     V1.0　     新規作成
  @date  06/11/01  HSK山本     V1.4       CR検査部構造見直し[4]対応
  @date  06/11/09　HSK酒井　   V1.4       CR検査部構造見直し[2]対応

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
		<LINK REL="stylesheet" TYPE="text/css" HREF="./CSS/Sub_RegAddMenu.css">
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/JSCommonFrameSize.js" CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js"        CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/Sub_RegAddMenu.js"    CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/GetString.js"    CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js"		CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js" CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript">
		<!--
		try{
      var SPOT_CODE_ASPX = 0;               //スポットコード
      var FILE_NAME_ASPX = "Sub_AddMenu.aspx"  //ファイル名
	// 文字列数
	var StringCount   = <%=StringCount%> + <%=StringCommonCount%>;			// 文字列数
	var CaptionString = new Array();			// 文字列配列
	var CaptionId = new Array();				// 文字列キー配列
// 文字列配列作成
<%
int s;
 for(s=0; s<StringCount; s++){
%>
		CaptionString.push("<%=CaptionString[s]%>");
		CaptionId.push(<%=CaptionId[s]%>);
		
<%
}
%>
<%
int t;
 for(t=0; t<StringCommonCount; t++){
%>
		
		CaptionString.push("<%=CaptionCommonString[t]%>");
		CaptionId.push(<%=CaptionCommonId[t]%>);
		
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
	  var aryMenuPosition;
	  var aryMenuExamCheck;
	  var aryMenuCode;
	  var aryMenuNameSbcs;
	  var aryMenuColor;
	  var aryMenuMpmCode;
	  var aryMenuRegionCode;
    var aryPartNo;          // 部位No配列
	  var aryPartName;        // 部位名配列
	  // メニュー情報の配列
	  var gPartMaxCount = 0;                 // 部位最大数
	//***************************************************************************
	//  GroupMenuDataSet()		
	//
	//  1．機能
	//      グループデータをセットする
	//		
	//  2．戻り値  
	//		  なし
	//  3．備考
	//     
	//***************************************************************************
	function GroupMenuDataSet(){
		try{
		  var i;                       // 添え字
      aryPartNo    = new Array();  // 部位No配列
	    aryPartName  = new Array();  // 部位名配列    
      // 部位のセット
	    <% for(int i = 0;i < GroupMenuAry.Length; i++){ %>
        i = <%=i%>;
			  aryPartName[i] = "<%=GroupMenuAry[i]%>";
			  aryPartNo[i]   = "<%=GroupCodeAry[i]%>";
	    <% }%>
      // メニュー配列を作成
      firstDimention    = <%=GroupMenuAry.Length%>;
			aryMenuPosition   = new Array(firstDimention);
			aryMenuExamCheck  = new Array(firstDimention);
			aryMenuCode       = new Array(firstDimention);
			aryMenuNameSbcs   = new Array(firstDimention);
			aryMenuColor      = new Array(firstDimention);
			aryMenuMpmCode    = new Array(firstDimention);
			aryMenuRegionCode = new Array(firstDimention);

			for(i=0; i<gPartMaxCount;i++){
			  aryMenuPosition[i]   = "";
			  aryMenuExamCheck[i]  = "";
			  aryMenuCode[i]       = "";
			  aryMenuNameSbcs[i]   = "";
			  aryMenuColor[i]      = "";
			  aryMenuMpmCode[i]    = "";
			  aryMenuRegionCode[i] = "";
      }
		}catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
		}
	}
	// グループデータをセット
	gPartMaxCount   = <%=GroupMenuCount%>;
	GroupMenuDataSet();
	//エラー処理関数を呼び出す      
	<%=ClientScript%>

	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+2);
	  }
	//-->
	</script>
	</HEAD>
	<BODY ONLOAD="Public_ClearStirngCount();Public_ClearLangMsgStirngCount();Fn_InitPage();">
		<IFRAME ID="REGADDMENU_CTRL" SCROLLING="no" FRAMEBORDER="0"></IFRAME>
	</BODY>
</HTML>
