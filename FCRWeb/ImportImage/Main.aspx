<%@ Page language="c#" Codebehind="Main.aspx.cs" AutoEventWireup="false" Inherits="ImportImage.Main" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title><%= titleString %></title>
		<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
		<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
		<META HTTP-EQUIV="Expires" CONTENT="Thu, 01 Dec 1994 16:00:00 GMT">
		<META content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK REL="stylesheet" TYPE="text/css" HREF="./CSS/MessageWindow.css">
		<style> 
			#layer1 { POSITION : absolute; TOP : 0px; LEFT : 0px; HEIGHT : 100%; WIDTH : 100%; z-index: 0; visibility: visible }
		</style>
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/MainCommon.js" CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/MessageWindow.js" CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="../SoftKeyBoard/Include/SoftKeyBoardCharactor.js" CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="./Include/ImportImageCommon.js" CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" CHARSET="UTF-8">
		<!--
		/**
		* @private
		* ページロード時の処理
		**/
		function Fn_InitPage(){
//070918 HSK山本 V3.0 HSK内部B#7対応 ADD-ST
//モーダル化にあたりロードタイミングを変更
            document.getElementById("MainFrame").src="Function.aspx?type=<%= queryType %>";
//070918 HSK山本 V3.0 HSK内部B#7対応 ADD-ED
		}
		//-->
		</SCRIPT>
	</HEAD>
    <!-- 070914 HSK山本 V3.0 HSK内部B#7対応 UPDATE-->
	<!-- <BODY MS_POSITIONING="GridLayout" style="MARGIN:0px; OVERFLOW:hidden"> -->
	<BODY onload="Fn_InitPage()" MS_POSITIONING="GridLayout" style="MARGIN:0px; OVERFLOW:hidden">
		<div id="Layer1">
			<!-- 070914 HSK山本 汎用画像取込機能 UPDATE-->
			<IFRAME id="MainFrame" width="100%" height="100%" style="Z-INDEX: 102; LEFT: 0px; BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; TOP: 0px; BORDER-BOTTOM-STYLE: none"
				frameBorder="0" scrolling="no"></IFRAME>
		</div>
		<!-- エラーフレーム -->
		<TABLE ID="TABLE_MainErrorFrame">
			<TR>
				<TD>
					<!-- 処理中ボックス -->
					<TABLE ID="TABLE_MainErrorBox">
						<TR>
							<TD id="TD_MainErrorTitle1"><br>
							</TD>
						</TR>
						<TR>
							<TD id="TD_MainErrorTitle2"><br>
							</TD>
						</TR>
						<TR>
							<TD id="TD_MainErrorText"><br>
							</TD>
						</TR>
						<TR>
							<TD id="TD_MainErrorCode"><br>
							</TD>
						</TR>
						<TR>
							<TD><br>
							</TD>
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
