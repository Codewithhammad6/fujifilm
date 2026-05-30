<%@ Page language="c#" Codebehind="MenuInfo_Get_Proc.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.MenuInfo_Get_Proc" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" > 
<%
/****************************************************************************

  @file MenuInfo_Get_Proc.aspx

  @brief 撮影メニュー取得処理フレーム

  @author YSK

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  --/--/--  YSK         V1.0       新規作成
  @date  06/03/22  YSK齋藤     V1.2       OnLoadイベントのハンドリング対応(PVCS#1742)
  @date  06/10/23  HSK山本     V1.3       CR検査部構造見直し[4]対応
/****************************************************************************/
%>
<html>
  <head>
    <title>MenuInfo_Get_Proc</title>
    <meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
    <meta name="CODE_LANGUAGE" Content="C#">
    <meta name=vs_defaultClientScript content="JavaScript">
    <meta name=vs_targetSchema content="http://schemas.microsoft.com/intellisense/ie5">
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
<!-- 2006/03/22 H.SAITO -ST- -->
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js" CHARSET="UTF-8"></SCRIPT>
<!-- 2006/03/22 H.SAITO -ED- -->
		<SCRIPT LANGUAGE="JavaScript">
  // 2006/03/22 H.SAITO -ST-
  function Fn_OnLoad(){
  // 2006/03/22 H.SAITO -ED-
		try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "MenuInfo_Get_Proc.aspx"  //ファイル名
  if("<%=ClientScript%>" != ""){ 
	  // 撮影メニューデータをセット
      var i;
      var j;
      var firstDimention;   //配列数(一次元) 
      var secondDimention;  //配列数(二次元)
      secondDimention      = <%=MenuCount%>;
      var groupCount = <%=GroupDispNo%>;
      parent.DispFrame.aryMenuPosition[groupCount]   = new Array(secondDimention);
      parent.DispFrame.aryMenuExamCheck[groupCount]  = new Array(secondDimention);
      parent.DispFrame.aryMenuCode[groupCount]       = new Array(secondDimention);
      parent.DispFrame.aryMenuNameSbcs[groupCount]   = new Array(secondDimention);
      parent.DispFrame.aryMenuColor[groupCount]      = new Array(secondDimention);
      parent.DispFrame.aryMenuMpmCode[groupCount]    = new Array(secondDimention);
      parent.DispFrame.aryMenuRegionCode[groupCount] = new Array(secondDimention);
			<% for(int j = 0; j < MenuCount; j++){%>
        j = <%=j%>;
        parent.DispFrame.aryMenuPosition[groupCount][j]   = <%=DisplayPosAry[j]%>;
        parent.DispFrame.aryMenuExamCheck[groupCount][j]  = "<%=ExamMenuAry[j]%>";
        parent.DispFrame.aryMenuCode[groupCount][j]       = "<%=MenuCodeAry[j]%>";
        parent.DispFrame.aryMenuNameSbcs[groupCount][j]   = "<%=MenuNameSBCSAry[j]%>";
        parent.DispFrame.aryMenuColor[groupCount][j]      = "<%=MenuColorAry[j]%>";
        parent.DispFrame.aryMenuMpmCode[groupCount][j]    = "<%=MpmCodeAry[j]%>";
        parent.DispFrame.aryMenuRegionCode[groupCount][j] = <%=RegionCodeAry[j]%>;
			<%}%>
  // 2006/03/22 H.SAITO -ST-
	    <%=ClientScript%>
    }
	}catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
  }
  // 2006/03/22 H.SAITO -ED-
  }

	</SCRIPT>
  </HEAD>
  <body MS_POSITIONING="GridLayout" onload="Fn_OnLoad();">
    <form name="frmGetMenu" method="post">
    <input type="text" name="txtGroupCode">
    <input type="text" name="txtGroupDispNo">
    <input type="text" name="txtNextId">
    <!-- 2005/06/27 003 H.SAITO PVCS#350 権限、認証チェック対応 -->
    <INPUT TYPE="hidden" ID="loginUserId"	  NAME="loginUserId">
    <INPUT TYPE="hidden" ID="loginTime"	    NAME="loginTime">
    </form>
  </body>
</HTML>
