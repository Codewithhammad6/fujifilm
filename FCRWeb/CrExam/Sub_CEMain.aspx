<%@ Page language="c#" Codebehind="Sub_CEMain.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.Sub_CEMain" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file Sub_CEmain.aspx

  @brief CE画面サブメインフレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/21  YSK畑    　 V1.0　     新規作成
  @date  06/11/01  HSK山本     V1.4      CR検査部構造見直し[4]対応

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
    <title>main</title>
    <meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
    <meta name="CODE_LANGUAGE" Content="C#">
    <meta name=vs_defaultClientScript content="JavaScript">
    <meta name=vs_targetSchema content="http://schemas.microsoft.com/intellisense/ie5">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/Sub_CEmain.css">
	<SCRIPT LANGUAGE="JavaScript" SRC="Include/JSCommonFrameSize.js" CHARSET="UTF-8"></SCRIPT>
	<SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
	<script language=javascript src="../Include/PageLoader.js" charset="UTF-8"></script>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"   CHARSET="UTF-8"></SCRIPT>
	<script language=javascript src="./Include/MessageWindow.js" charset="UTF-8"></script>
	<SCRIPT LANGUAGE="JavaScript" SRC="Include/Sub_CEMain.js" CHARSET="UTF-8"></SCRIPT>
	<SCRIPT LANGUAGE="JavaScript" SRC="Include/GetString.js" CHARSET="UTF-8"></SCRIPT>
    <script language=javascript>
		try{
      var SPOT_CODE_ASPX = 0;               //スポットコード
      var FILE_NAME_ASPX = "Sub_CEMain.aspx"  //ファイル名
   	var aryPartNo   = new Array();						 				// 部位No配列
	  var aryPartName = new Array();                    	 				// 部位名配列
	  // メニュー情報の配列
	  var aryMenuPosition   = new Array();
	  var aryMenuExamCheck  = new Array();
	  var aryMenuCode       = new Array();
	  var aryMenuNameSbcs   = new Array();
	  var aryMenuColor      = new Array();
	  var aryMenuMpmCode    = new Array();
	  var aryMenuRegionCode = new Array();
	  var gPartMaxCount = 0;								// 部位最大数

	  // 文字列数
	  var StringCount   = <%=StringCount%>;			// 文字列数
	  var CaptionString = new Array();			// 文字列配列
	  var CaptionId     = new Array();				// 文字列キー配列
// 文字列配列作成
<%
int t;
 for(t=0; t<StringCount; t++){
%>
		CaptionString.push("<%=CaptionString[t]%>");
		CaptionId.push(<%=CaptionId[t]%>);
		
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

  </script>
  </head>
  <body onload="Public_ClearStirngCount();Public_ClearLangMsgStirngCount();Fn_InitPage();">
		<!-- 予約検査機能フレーム //-->
		<IFRAME ID="RESERVESTUDY_CTRL" FRAMEBORDER=0 SCROLLING="no"></IFRAME>
		<!-- 検査登録機能フレーム //-->
		<IFRAME ID="REGISTSTUDY_CTRL"  FRAMEBORDER=0 SCROLLING="no"></IFRAME>
		<!-- 検査機能フレーム //-->
		<IFRAME ID="STUDY_CTRL"				 FRAMEBORDER=0 SCROLLING="no"></IFRAME>
		<!-- 修正機能フレーム //-->
		<IFRAME ID="MODIFY_CTRL"			 FRAMEBORDER=0 SCROLLING="no"></IFRAME>
  </body>
</html>
