<%@ Page language="c#" Codebehind="Main.aspx.cs" AutoEventWireup="false" Inherits="FCRWeb.Main" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
<!-- 2005/08/19 Kanno UPDATE ST タイトルバーの文字列対応 -->
<!--    <title>FUJIFILM</title> -->
    <title>Now Loading...</title>
<!-- 2005/08/19 Kanno UPDATE ED タイトルバーの文字列対応 -->
<%
/****************************************************************************

  @file Main.aspx

  @brief FCRWebメインASPX

  @author YSK宮滝

  Copyright(c) 2004-2009 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/20  YSK宮滝     V1.0       新規作成
  @date  06/07/17  HSK平尾     V1.2      HobbitV1.3対応
  @date  06/11/01  HSK山本     V1.4      CR検査部構造見直し[4]対応
  @date  09/03/19  HSK廣井     V5.0      Vistaシャットダウン対応
  @date  09/03/31  HSK廣井     V5.0      PVCS#3275対策
  @date  09/05/27  FF蔵敷		              NAS対応 インジケータアイコンの追加　検索キー　V60_NAS
                                                          Frameサイズ WIDTH変更
  @date  09/07/27  FF 星野     V6.0      インジケーター切り離し対応
  @date  09/09/02  FF 奥野     V6.0      画像参照部表示ロック機能対応
  @date  09/09/08  FF 奥野     V6.0      画像参照部のログアウト時最小化対応

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
    <script language="javascript" src="./Include/WindowUtility.js" charset="UTF-8"></script>
    <script language="javascript" src="./Include/PageLoader.js" charset="UTF-8"></script>
    <script language="javascript" src="./Include/MessageWindow.js" charset="UTF-8"></script>
    <script language="javascript" src="./Include/MainCommon.js" CHARSET="UTF-8"></script>
    <script language="javascript" src="./Include/Main.js" CHARSET="UTF-8"></script>
    <script language="javascript" src="./Include/Control.js" CHARSET="UTF-8"></script>
    <script language="javascript" src="./SoftKeyBoard/Include/SoftKeyBoardCharactor.js" CHARSET="UTF-8"></script>
	<script language="javascript" charset="UTF-8">
	<!--
	function initImageView(userId, loginTime)
	{
		// 画像参照初期化要求
		frmImageView.ImageViewInit( userId, loginTime);
	}
	function dispImageView( userId, loginTime, studySeq )
	{
		// 画像参照表示要求
		frmImageView.ImageViewRequest( userId, loginTime, studySeq );
	}
	//Hobbit-V1.3 電カル連携対応 Hirao add Start
	function clearImageView( userId, loginTime )
	{
		// 画像参照クリア要求
		frmImageView.ImageClearRequest( userId, loginTime );
	}
	//Hobbit-V1.3 電カル連携対応 Hirao add End
	//Hobbit-6.0 画像参照部表示ロック機能対応 FF奥野 ADD START
	function lockImageView( userId, loginTime, Command )
	{
		// 画像参照表示ロック要求
		frmImageView.LockImageView( userId, loginTime, Command );
	}
	function unlockImageView( userId, loginTime )
	{
		// 画像参照表示アンロック要求
		frmImageView.UnlockImageView( userId, loginTime);
	}
	//Hobbit-6.0 画像参照部表示ロック機能対応 FF奥野 ADD END
	//Hobbit-6.0 画像参照部のログアウト時最小化対応 FF奥野 ADD START
	function minimizationView( userId, loginTime )
	{
		//最小化表示要求
		frmImageView.MinimizationView( userId, loginTime );
	}
	function normalizationView( userId, loginTime )
	{
		//標準表示要求
		frmImageView.NormalizationView( userId, loginTime );
	}
	//Hobbit-6.0 画像参照部のログアウト時最小化対応 FF奥野 ADD END
	//Hobbit-V1.3 電カル連携対応 Hirao add End	
	function ExitImageView()
	{
		// 画像参照終了要求
		//HBT-V1.0-0000-20050714 不具合対応 EDIT -----------------------
		//try～catchを入れることでHobbitサーバ未起動時のExitでエラー
		//になるのを防ぐ。
		try
		{
			if( EXIT_IMAGE_VIEW==1 )
			{
				frmImageView.ImageViewExit();
			}
		}
		catch(e)
		{
		}
	}
	function WakeUpStartedUp()
	{
		// 画像参照終了Nop
	}
	function startFix()
	{
		//fixedLAYER( 'Layer1', -193, 1 )	//V60_NAS
		//CSSでできないか？
		fixedLAYER( 'Layer1', -231, 1 )
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
	<body bgColor="#f5e7dd" onBeforeUnload="ExitImageView();ShowSystemMenu(<%=ClientMode%>)" onload="Fn_InitPage();startFix()" style="margin:0; overflow:hidden" oncontextmenu="return false;" onselectstart="return false;" ondrag="return false;">
		<div id="Layer1" style="TEXT-ALIGN:right; Z-INDEX: 101; WIDTH: 230px; POSITION: absolute; TOP: 2px; HEIGHT: 38px">
			<FONT face="MS UI Gothic">
				<IFRAME id="frmIndicator" style="TOP: 2px; WIDTH: 230px; BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; HEIGHT: 38px; BORDER-BOTTOM-STYLE: none" src="" frameBorder="no" scrolling="no"></IFRAME>
			</FONT>
		</div>
	-->
	<!--2009.07.27 FF 星野 インジケーター切り離し対応 ADD -->
	<body bgColor="#f5e7dd" onBeforeUnload="ExitImageView();ShowSystemMenu(<%=ClientMode%>)" onload="ChildPagesLoadedNotification();" style="margin:0; overflow:hidden" oncontextmenu="return false;" onselectstart="return false;" ondrag="return false;">
		<div id="Layer2">
			<IFRAME id="MainFrame" width=100% height=100% style="Z-INDEX: 102; LEFT: 0px;  BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; TOP: 0px; BORDER-BOTTOM-STYLE: none" src="" frameBorder="0" scrolling="no"></IFRAME>
		</div>
		<IFRAME id="GetErrorFrame" frameBorder="0" scrolling="no" style="Z-INDEX:103;"></IFRAME>
		<IFRAME id="frmImageView" frameBorder="0" scrolling="no" src="./ImageView/WakeUp.aspx?None" style="Z-INDEX:104;"></IFRAME>
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
