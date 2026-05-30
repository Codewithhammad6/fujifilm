<%@ Page language="c#" Codebehind="MainEtc.aspx.cs" AutoEventWireup="false" Inherits="FCRWeb.MainEtc" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
<!-- 2005/08/31 Kanno UPDATE ST PVCS#434 -->
<!--    <title>FUJIFILM</title> -->
    <title>Now Loading...</title>
<!-- 2005/08/31 Kanno UPDATE ED PVCS#434 -->
<%
/****************************************************************************

  @file Main.aspx

  @brief FCRWebメインASPX

  @author YSK宮滝

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/20  YSK宮滝     V1.0       新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
  @date  09/05/27  FF蔵敷		          NAS対応 インジケータアイコンの追加　検索キー　20090527_ICON

/****************************************************************************/
%>
<%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
    <meta content="Microsoft Visual Studio .NET 7.1" name=GENERATOR>
    <meta content=C# name=CODE_LANGUAGE>
    <meta content=JavaScript name=vs_defaultClientScript>
    <meta content=http://schemas.microsoft.com/intellisense/ie5 name=vs_targetSchema>
    <META HTTP-EQUIV="Imagetoolbar" CONTENT="no">
    <LINK REL="stylesheet" TYPE="text/css" HREF="./CSS/MessageWindow.css">
	<style>
		#layer1 { POSITION : absolute; TOP : 9px; LEFT : 600px; Z-INDEX : 10; }
		#layer2 { POSITION : absolute; TOP : 0px; LEFT : 0px; HEIGHT : 100%; WIDTH : 100%; z-index: 0; visibility: visible }
	</style>
    <SCRIPT LANGUAGE="javascript" SRC="./Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="javascript" SRC="./Include/PageLoader.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="javascript" SRC="./Include/MessageWindow.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="javascript" SRC="./Include/MainCommon.js" CHARSET="UTF-8"></SCRIPT>
	<script language="javascript" charset="UTF-8">
	<!--
var FATAL_ERROR = "FATAL_ERROR";		// 致命的エラー
var RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var SPOT_CODE   = 0;                //スポットコード
var FILE_NAME   = "MainEtc.aspx"    //ファイル名
var MESSAGE_ID  = 30500;            //メッセージID 

function Fn_InitPage()
{
	try
	{
		LoadPage("frmIndicator","./Indicator/Indicator.aspx",ChildPagesLoadedNotification);
	}
	catch(e)
	{
    top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID,FILE_NAME,SPOT_CODE+0);
	}
}

function ChildPagesLoadedNotification()
{
	try
	{
		// 先読みが終了したらファンクションフレーム呼び出し
		document.getElementById("MainFrame").src = "./Function.aspx";
	}
	catch(e)
	{
    top.GetErrorMessage(FATAL_ERROR,MESSAGE_ID,FILE_NAME,SPOT_CODE+1);
	}
} 

function startFix()
{
	//fixedLAYER( 'Layer1', -193, 1 )   //20090527_ICON
	fixedLAYER( 'Layer1', -231, 1 )     //20090527_ICON
}
function fixedLAYER( layName, offSetX, offSetY )
{
	window.onscroll = window.onresize = startFix 
	offSetX = parseInt(offSetX,10)
	offSetY = parseInt(offSetY,10)

	offLeft = document.body.clientWidth   + offSetX
	offTop  = offSetY

	offLeft = parseInt( offLeft, 10 )
	offTop  = parseInt( offTop, 10 )

	var mx = document.body.scrollLeft + offLeft
	var my = document.body.scrollTop  + offTop

	document.getElementById( layName ).style.left = mx
	document.getElementById( layName ).style.top  = my
}

	//-->
	</script>
</HEAD>
	<body bgColor="#f5e7dd" onload="Fn_InitPage();startFix()" style="margin:0; overflow:hidden" oncontextmenu="return false;" onselectstart="return false;" ondrag="return false;">
		<div id="Layer1" style="TEXT-ALIGN:right; Z-INDEX: 101; WIDTH: 230px; POSITION: absolute; TOP: 2px; HEIGHT: 38px">
  		<IFRAME ID="frmIndicator" STYLE="TOP: 2px; WIDTH: 230px; BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; HEIGHT: 38px; BORDER-BOTTOM-STYLE: none" SRC="" FRAMEBORDER="no" SCROLLING="no"></IFRAME>
		</div>
		<div id="Layer2">
			<IFRAME id="MainFrame" width=100% height=100% style="Z-INDEX: 102; LEFT: 0px;  BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; TOP: 0px; BORDER-BOTTOM-STYLE: none" src="" frameBorder="0" scrolling="no"></IFRAME>
		</div>
		<IFRAME id="GetErrorFrame" frameBorder="0" scrolling="no"></IFRAME>
		<!-- エラーフレーム -->
		<TABLE ID="TABLE_MainErrorFrame">
			<TR>
				<TD>
					<!-- 処理中ボックス -->
					<TABLE ID="TABLE_MainErrorBox">
						<TR>
							<TD id="TD_MainErrorTitle1"><br></TD>
						</TR>
						<TR>
							<TD id="TD_MainErrorTitle2"><br></TD>
						</TR>
						<TR>
							<TD id="TD_MainErrorText"><br></TD>
						</TR>
						<TR>
							<TD id="TD_MainErrorCode"><br></TD>
						</TR>
						<TR>
							<TD><br></TD>
						</TR>
					</TABLE>
					<!-- ボタン -->
					<DIV ID="DIV_MainErrorButton" ONCLICK="Public_OnButton_Main(0,'./Bmp/cmOvalAGreenLBtnU.gif')" ONMOUSEDOWN="Public_OnButton_Main(1,'./Bmp/cmOvalAGreenLBtnD.gif')" ONMOUSEOUT="Public_OnButton_Main(2,'./Bmp/cmOvalAGreenLBtnU.gif')">
						<DIV ID="DIV_MainErrorOkText"></DIV>
						<IMG ID="IMG_MainErrorButton" SRC="./Bmp/cmOvalAGreenLBtnU.gif">
					</DIV>
				</TD>
			</TR>
		</TABLE>
  </body>
</HTML>
