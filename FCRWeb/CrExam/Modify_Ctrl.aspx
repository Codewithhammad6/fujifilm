<%@ Page language="c#" Codebehind="Modify_Ctrl.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.Modify_Ctrl" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>Modify_Ctrl</title>
		<%
/****************************************************************************

  @file Modify_Ctrl.aspx

  @brief 修正機能フレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/21　YSK畑  　   V1.0　     新規作成
  @date  06/08/09  HSK酒井     V1.4       CR検査部構造見直し[8]対応
  @date  06/11/01  HSK山本     V1.4      CR検査部構造見直し[4]対応
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
<%=hLink%>
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/JSCommonFrameSize.js" CHARSET="UTF-8"></SCRIPT>
		<script language="javascript" charset="UTF-8" src="../Include/FrameController.js"></script>
		<script language="javascript" charset="UTF-8" src="../Include/WindowUtility.js"></script>
		<script language="javascript" charset="UTF-8" src="../Include/PageLoader.js"></script>
<%=hScript%>
		<script language="javascript" src="./Include/MessageWindow.js" charset="UTF-8"></script>
		<SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js" CHARSET="UTF-8"></SCRIPT>
		<script language="javascript">
	  try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "Modify_Ctrl.aspx"  //ファイル名

		  // 画面オープンモード
		  var OpenMode = <%=OpenMode%>;
		  <%=ClientScript%>
		
	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
		</script>
	</HEAD>
<%=hBody%>
</HTML>
