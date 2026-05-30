<%@ Page language="c#" Inherits="StudyList.StudyListWeb" ASPCOMPAT="true" CodeFile="Main.aspx.cs" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file StudyList/Main.aspx

  @brief メイン画面


  @author HSK山本

　Copyright(C) 2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  06/11/01  HSK山本     V1.4      CR検査部構造見直し[4]対応
  @date  07/03/19  HSK平尾     V2.0      IE7対応
  @date  07/04/05  HSK由比     V2.0       SST B#139対応
  @date  09/05/27  FF蔵敷		         NAS対応 インジケータアイコンの追加　検索キー　20090527_ICON
  @date  09/07/27  FF 星野     V6.0      インジケーター切り離し対応
  
/****************************************************************************/
%>
<HTML>
	<HEAD>
		<title>検査リスト</title>
		<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
		<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
		<META HTTP-EQUIV="Expires" CONTENT="Thu, 01 Dec 1994 16:00:00 GMT">
		<META content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK REL="stylesheet" TYPE="text/css" HREF="./CSS/MessageWindow.css">
		<style>
			#layer1 { POSITION : absolute; TOP : 9px; LEFT : 600px; Z-INDEX : 10; }
			#layer2 { POSITION : absolute; TOP : 0px; LEFT : 0px; HEIGHT : 100%; WIDTH : 100%; z-index: 0; visibility: visible }
		</style>
		<script language="javascript" src="../Include/MainCommon.js" CHARSET="UTF-8"></script>
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
		<script language="javascript" src="../Include/PageLoader.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/MessageWindow.js" charset=UTF-8></script>
		<script language="javascript" src="../SoftKeyBoard/Include/SoftKeyBoardCharactor.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/StudyListCommon.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/StudyListMain.js" charset="UTF-8"></script>
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/FixToKB912945.js" CHARSET="UTF-8"></SCRIPT>

		<script language="javascript" charset="UTF-8">
		<!--
		function startFix()
		{
			//fixedLAYER( 'Layer1', -193, 1 )  //20090527_ICON
			fixedLAYER( 'Layer1', -231, 1 )    //20090527_ICON
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
	<!--2009.07.27 FF 星野 インジケーター切り離し対応 DEL
	<BODY MS_POSITIONING="GridLayout" onload="startFix()" style="margin:0; overflow:hidden">
		<div id="Layer1" style="TEXT-ALIGN:right; Z-INDEX: 101; WIDTH: 192px; POSITION: absolute; TOP: 2px; HEIGHT: 38px">
			<FONT face="MS UI Gothic">
				<IFRAME id="frmIndicator" style="TOP: 2px; WIDTH: 192px; BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; HEIGHT: 38px; BORDER-BOTTOM-STYLE: none"
						src="../Indicator/Indicator.aspx" frameBorder="no" scrolling="no">
				</IFRAME>
				<DIV id="divTime" style="DISPLAY: inline; WIDTH: 232px; HEIGHT: 30px" ms_positioning="FlowLayout"></DIV>
			</FONT>
		</div>
	-->
	<BODY MS_POSITIONING="GridLayout" style="margin:0; overflow:hidden">	
		<div id="Layer2">
			<IFRAME id="MainFrame" width=100% height=100% style="Z-INDEX: 102; LEFT: 0px;  BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; TOP: 0px; BORDER-BOTTOM-STYLE: none"
				src="Function.aspx" frameBorder="0" scrolling="no">
			</IFRAME>
		</div>

		<!-- PVCS#1796 -->
		<!-- ActiveX更新プログラムKB912945対応 -->
		<SCRIPT LANGUAGE="javascript">
		<!--
		WriteToDocument(
		'<OBJECT id="MutexCtrl" height="10%" width="10%" classid="MutexCtrlLib.dll#MutexCtrlLib.MutexCtrl"',
			'VIEWASTEXT>',
			'<param name="MutexName" value="StudyList">',
		'</OBJECT>'
		);
		//-->
		</SCRIPT>

		<SCRIPT LANGUAGE="JScript">
			function MutexCtrl::MultiplexStarting()
			{
//<%		      window.close();                     20070320 HSK平尾 IE7対応 D %>
//              window.open("../Close.html","_self"); <%-- 20070320 HSK平尾 IE7対応 A --%>	// 20070405 HSK由比 SST B#139 A //
// 20070413 HSK由比 WindowクローズAPI共通化対応 D Start //
//				(window.open('','_top').opener=top).close();								// 20070405 HSK由比 SST B#139 A //
// 20070413 HSK由比 WindowクローズAPI共通化対応 D End //
				WU_CloseWindow(window); // 20070413 HSK由比 WindowクローズAPI共通化対応 A //
			}
		</SCRIPT>
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
					<DIV id="DIV_MainErrorButton" ONMOUSEUP="Public_CloseDialog(1)">
						<DIV id="DIV_MainErrorOkText"></DIV>
						<IMG id="IMG_MainErrorButton" src="./Bmp/Error_OK.gif">
					</DIV>
				</TD>
			</TR>
		</TABLE>
	</BODY>
</HTML>
