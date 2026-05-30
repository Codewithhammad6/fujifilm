<%@ Page Language="vb" AutoEventWireup="false" Codebehind="Main.aspx.vb" Inherits="ImageView.ImageViewMain.Main" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
<!-- 2005/08/22 Kanno UPDATE ST タイトルバーの文字列対応 -->
<!--		<title>FUJI FILM</title>  -->
		<title><%=strTitle%></title>
<!-- 2005/08/22 Kanno UPDATE ED タイトルバーの文字列対応 -->
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<meta http-equiv="Content-Type" content="text/html; charset=shift_jis">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Expires" content="-1">
		<LINK REL="stylesheet" TYPE="text/css" HREF="../../CSS/MessageWindow.css">
		<SCRIPT LANGUAGE="JavaScript" SRC="../../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
		<SCRIPT language="JavaScript" src="../../Include/PageLoader.js"></SCRIPT>
		<SCRIPT language="JavaScript" src="../../Include/MainCommon.js"></SCRIPT>
		<script language="javascript" src="../../Include/MessageWindow.js"></script>
		<SCRIPT LANGUAGE="JavaScript" SRC="Information/Include/Control.js"></SCRIPT>
		<!-- //****************************************************************************//-->
		<!-- //                                                                            //-->
		<!-- //  @file Main.aspx                                                           //-->
		<!-- //                                                                            //-->
		<!-- //  @brief 画像参照画面メイン                                                 //-->
		<!-- //                                                                            //-->
		<!-- //  @author HSK山本                                                           //-->
		<!-- //                                                                            //-->
		<!-- //  Copyright(C) 2004-2007 FUJIFILM Corporation All rights reserved.          //-->
		<!-- //                                                                            //-->
		<!-- //         更新履歴  担当        Ver.       内容                              //-->
		<!-- //  -----  --------  ----------  --------   -------------------------------   //-->
		<!-- //  @date  06/10/23  HSK山本     1.4        CR検査部構造見直し[4]対応         //-->
		<!-- //  @date  07/04/13  HSK平尾     2.0        IE7対応                           //-->
		<!-- //  @date  07/04/21  HSK平尾     2.0        IE7対応追加修正                   //-->
		<!-- //  @date  07/04/21  HSK平尾     2.0        #321対応                          //-->
		<!-- //  @date  07/05/23  HSK黒田     2.0        PVCS#2137                         //-->
		<!-- //  @date  09/03/11  HSK小椋     5.0        PVCS#3200                         //-->
		<!-- //  @date  09/07/27  FF 星野     V6.0       インジケーター切り離し対応        //-->
		<!-- //                                                                            //-->
		<!-- //****************************************************************************//-->
		<SCRIPT type="text/vbscript">
		<!--
			window.onbeforeunload = GetRef("subClose")

			Sub subClose
				Window.Event.ReturnValue="画像参照画面を終了します。" & vbCrLf & "よろしいですか？"
			End Sub
		-->
		</SCRIPT>
		<SCRIPT type="text/javascript">
		<!--
            // 20070421 HSK平尾 V2.0 #321対応 D Start
			// var width;
			// var height;
			// var top;
			// var left;
			// var ivactive;

			// window.onresize = ResizeFunc; // リサイズが行われたとき呼び出す

            // 20070421 HSK平尾 V2.0 #321対応 D End
	
			function InfoTextViewCheck()
			{
				if (document.hasFocus())
				{
					if (ivactive == 0)
					{
						IVMainProc.WinTextInfoView();
					}
					ivactive = 1;
				}
				else
				{
					ivactive = 0;
				}
			}	


			if(document.all || document.getElementById)
			{
				document.onmousedown = RightClick;
			}
			else if(document.layers)
			{
				window.captureEvents(Event.MOUSEDOWN);
				window.onmousedown = RightClick;
			}
			function RightClick(e)
			{
				if(document.all || document.getElementById)
				{
					if(event.button & 2)
					{
						return(false);
					}
				}
				else if(document.layers)
				{
					if(e.which == 3)
					{
						return(false);
					}
				}
			}
			status=" "; // 20070523 HSK黒田 PVCS#2137 全角スペースを半角スペースに変更
			dore="";
			dotti=0;
			function key_down(e)
			{
				event.returnValue = false;
				if(navigator.platform.indexOf("Win")!=-1)
				{
					if((document.layers) && (e.which==3 || e.which==0))
					{
						dotti=1;
					}
					else if((document.getElementById) && (!document.all))
					{
						if(e.which==3 || e.which==0)
						{
							dotti=1;
						}
					}
					else if(document.all)
					{
						if(event.button==2 || event.button==21 || event.button==85)
						{
							dotti=1;
						}
						else if((event.ctrlKey) || (event.shiftKey))
						{
							dotti=1;
						}
					}
					if(dotti==1)
					{
						dotti=0;
					}
				}
				return(false);
			}

			if(document.layers)
			{
				document.captureEvents(Event.KEYDOWN,Event.KEYPRESS,Event.MOUSEDOWN);
			}

			document.onkeydown=key_down;
			document.onkeypress=key_down;
			document.onmousedown=key_down;

			function getkeycode(code)
			{
				if(event.ctrlKey && event.keyCode == 79)
				{
					event.keyCode = 0;
					return false;
				}
				if(event.ctrlKey && event.keyCode == 80)
				{
					event.keyCode = 0;
					return false;
				}
				if(event.ctrlKey && event.keyCode == 70)
				{
					event.keyCode = 0;
					return false;
				}
				//if(code == 70)
				//{
				//	event.keyCode = 0;
				//	return false;
				//}
				else if(112 <= code & code <= 123)
				{
					event.keyCode = 0;
					return false;
				}
				else
				{
					return true;
				}
			}

			function viClose()
			{
				<% Application.Lock %>
				<% Application.Contents("IVMainCall") = "0" %>
				<% Application.UnLock %>
				<% Application.Lock %>
				<% Application.Contents("IVRunCall") = "0" %>
				<% Application.UnLock %>
			}

            // 20070421 HSK平尾 V2.0 #321対応 D Start
		    // function ResizeFunc()
		    // {
			//	if(document.all)
			//	{
			//		//横幅・縦幅のウィンドウサイズの1/4を取得
			//		width = document.body.clientWidth;
			//		height = document.body.clientHeight;
			//		top = document.body.clientTop ;
			//		left = document.body.clientLeft ;
			//	}
			//	else if(document.getElementById)
			//	{
			//		//横幅・縦幅のウィンドウサイズの1/4を取得
			//		width =  window.innerWidth;
			//		height = window.innerHeight;
			//		top = window.innerTop;
			//		left = window.innerLeft;
			//	}
		    // }
            // 20070421 HSK平尾 V2.0 #321対応 D End

			function Fn_InitPage(){
				try{
					LoadPage("frmIndicator","../../Indicator/IndicatorForImageView.aspx",ChildPagesLoadedNotification);
				}
				catch(e){
				}
			}
			function ChildPagesLoadedNotification(){
				try{
					document.getElementById("IVMainProc").src = "SubFunction.aspx";
					document.getElementById("InformationProc").src = "Information/Information_View.aspx";		// 2009/03/12 HSK小椋 PVCS#3200対応
					SetCurrentView('ImageView');
				}
				catch(exception){
				}
			} 
			function Exit()
			{
				try
				{
					// 確認ダイアログの表示を防ぐ

					// 20070421 HSK平尾 V2.0 IE7対応 D Start 
					// if( document.all )
					// {
					// 	window.opener = true;
					// }
					// 20070421 HSK平尾 V2.0 IE7対応 D End 
					// 20070413 HSK平尾 V2.0 IE7対応 D Start 
					// ブラウザを閉じる
					// window.close();
					// 20070413 HSK平尾 V2.0 IE7対応 D End 
					// 20070413 HSK平尾 V2.0 IE7対応 A Start
					WU_CloseWindow(window);
					// 20070413 HSK平尾 V2.0 IE7対応 A End 

				}
				catch(e)
				{
					Public_Error( FATAL_ERROR, "Exit Exception" );
				}
			}
 			function Public_BeforeUnload(){
				try{
					parent.IVMainProc.ReSize();
					SetCurrentView('');
				}
				catch(exception){
				}
			} 

		//-->
		</SCRIPT>
	</HEAD>
	<!-- 2009.07.27 FF 星野 インジケーター切り離し対応 DEL
	<body scroll ="no" oncontextmenu="return false" onkeydown="return getkeycode(event.keyCode)" 
		onhelp="return false" leftMargin=0 background=#333333 topMargin=0 
		onload="Fn_InitPage();<%=m_strStartupScript %> <% IVMainCheck() %>" onbeforeunload="Public_BeforeUnload();" MS_POSITIONING="GridLayout" style="margin:0; overflow:hidden">
	-->
	<!-- 2009.07.27 FF 星野 インジケーター切り離し対応 ADD -->
	<body scroll ="no" oncontextmenu="return false" onkeydown="return getkeycode(event.keyCode)" 
		onhelp="return false" leftMargin=0 background=#333333 topMargin=0 
		onload="ChildPagesLoadedNotification();<%=m_strStartupScript %> <% IVMainCheck() %>" onbeforeunload="Public_BeforeUnload();" MS_POSITIONING="GridLayout" style="margin:0; overflow:hidden">
		<!-- 20050809-V1.0-0000-FFPVCS#1138 Zオーダーが定義されていなかったため定義を行う。インジケータがエラーフレームより前に来るように変更 -->
		<div id="Layer1" style='Z-INDEX: 101'>
		<TABLE cellSpacing="0" cellPadding="0" width="100%" border="0" style='Z-INDEX: 102'>
			<TR>
				<TD>
					<!--2009/03/12 HSK小椋 PVCS#3200対応 Start -->
					<!--
					<IFRAME id="InformationProc" style="WIDTH: 100%; TOP: 0px; HEIGHT: 48px" name="Information"
						marginWidth="0" marginHeight="0" src="Information/Information_View.aspx" frameBorder="0"
						scrolling="no"></IFRAME>
					-->
					<IFRAME id="InformationProc" style="WIDTH: 100%; TOP: 0px; HEIGHT: 48px" name="Information"
						marginWidth="0" marginHeight="0" src="" frameBorder="0"
						scrolling="no"></IFRAME>
					<!--2009/03/12 HSK小椋 PVCS#3200対応 End -->
				</TD>
				<!--
				<TD width="200">
					<IFRAME NAME="IndicatorName" id="frmIndicator" style="WIDTH: 200px; TOP: 0px; HEIGHT: 48px"
						marginWidth="0" marginHeight="0" src="" frameBorder="0" scrolling="no" align="middle">
					</IFRAME>
				</TD>
				-->
			</TR>
		</TABLE>
		<IFRAME id="IVMainProc" style="WIDTH:100%;HEIGHT:100%" name="IVMain" marginWidth="0" marginHeight="0"
			src="" frameBorder="0" scrolling="no">
		</IFRAME>
		</div>

		<!-- エラーフレーム -->
		<!-- 実際にはこのエラーフレームは使用されていないが、インジケータの共通定義として（空）定義を行う。 -->
		<TABLE ID="TABLE_MainErrorFrame" style='Z-INDEX: -1' >
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
						<IMG id="IMG_MainErrorButton" src="../../Bmp/Error_OK.gif">
					</DIV>
				</TD>
			</TR>
		</TABLE>

	</BODY>
</HTML>
