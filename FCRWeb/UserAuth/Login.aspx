<%@ Page CodeBehind="Login.aspx.cs" Language="c#" AutoEventWireup="false" Inherits="UserAuth.Login" ASPCOMPAT="true" %>
<%
/* キャッシュ制御を停止 */
Response.CacheControl = "no-cache";
Response.AddHeader("Pragma","no-cache");
Response.Expires = -1;
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN">
<%
/****************************************************************************

  @file Login.aspx

  @brief ログイン


  @author HSK山本

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reseved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  06/11/01  HSK山本     V1.4      CR検査部構造見直し[4]対応

/****************************************************************************/
%>
<HTML>
	<HEAD>
		<TITLE>ログイン画面</TITLE>
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Expires" content="Thu, 01 Dec 1994 16:00:00 GMT">
		<META http-equiv="Content-Type" content="text/html; charset=shift_jis">
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
		<script language="javascript" src="../Include/PageLoader.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/Login.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/Control.js" charset="UTF-8"></script>
		<script language="javascript">
		<!--
// 2005/08/19 Kanno ADD ST タイトルバーの文字列対応
		  top.SetTitle("<%=title%>");
// 2005/08/19 Kanno ADD ED タイトルバーの文字列対応
		  var userId = new Array(<%=MAX_USER_NUM%>);
		  var userName = new Array(<%=MAX_USER_NUM%>);
		  var userComment = new Array(<%=MAX_USER_NUM%>);
		  var userImage = new Array(<%=MAX_USER_NUM%>);
		  var sizeofImage = new Array(<%=MAX_USER_NUM%>);
		  var pageNum = 1;
		  var pageNumMax;
		//-->
		</script>
	</HEAD>
	<frameset id="LoginFrameset_row" border="0" frameSpacing="0" rows="0,0,100,0" frameBorder="0"
		onload="pageNum = 1;resizeToWIN(800, 600);initPage();">
		<frame id="frameList" name="frameList" src="" noResize width="800">
		<frame id="framePass" name="framePass" src="" noResize width="800">
		<frame id="frameNull" name="frameNull" src="Login_Blank.html" noResize width="800">
		<frame id="frameProc" name="frameProc" src="" noResize width="800">
		<noframes>
			<p id="p1">
				この HTML フレームセットは、複数の Web ページを表示します。このフレームセットを表示するには、 HTML 4.0 以降のバージョンをサポートする 
				Web ブラウザを使用してください。
			</p>
		</noframes>
	</frameset>
</HTML>
