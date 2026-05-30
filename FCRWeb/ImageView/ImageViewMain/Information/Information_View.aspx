<%@ Page Language="vb" AutoEventWireup="false" Codebehind="Information_View.aspx.vb" Inherits="ImageView.Information_View2" buffer="False" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title></title>
		<meta name="vs_showGrid" content="True">
		<meta name="GENERATOR" content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" content="Visual Basic .NET 7.1">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<META HTTP-EQUIV="Imagetoolbar" CONTENT="no">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Expires" content="-1">
		<meta http-equiv="Content-Type" content="text/html; charset=Shift_JIS">
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/Information_View.js"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/Control.js"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="../../../Include/FixToKB912945.js" CHARSET="UTF-8"></SCRIPT>

		<!-- ///////////////////////////////////////-->
		<!--  ブラウザ制御スクリプト              //-->
		<!-- ///////////////////////////////////////-->
		<SCRIPT LANGUAGE="javascript">
		<!--
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
		//-->
		</SCRIPT>

	</HEAD>
	<BODY onselectstart="return false;" onkeydown="return getkeycode(event.keyCode)" ondrag="return false;"
		onhelp="return false" background="#333333" onload="Fn_InitPage();PEdit_Initialize()">
		
		<!-- PVCS#1796 -->
		<!-- ActiveX更新プログラムKB912945対応 -->
		<SCRIPT LANGUAGE="javascript">
		<!--
		WriteToDocument(
		'<OBJECT CLASSID = "clsid:5220cb21-c88d-11cf-b347-00aa00a28331">',
		    '<PARAM NAME="LPKPath" VALUE="../../ImageView.lpk">',
		'</OBJECT>'
		);
		//-->
		</SCRIPT>
		
		<!-- ///////////////////////////////////////-->
		<!--  患者情報編集コンポオブジェクト定義  //-->
		<!-- ///////////////////////////////////////-->

		<!-- PVCS#1796 -->
		<!-- ActiveX更新プログラムKB912945対応 -->
		<SCRIPT LANGUAGE="javascript">
		<!--
		WriteToDocument(
		'<OBJECT id="PatientEditID" style="Z-INDEX: 101; LEFT: 0px; WIDTH: 100%; POSITION: absolute; TOP: 0px; HEIGHT: 48px"',
			'classid="clsid:CC2D4BDD-3A37-4150-B777-69C9B252AC33" >',
			'<PARAM NAME="_ExtentX" VALUE="30506">',
			'<PARAM NAME="_ExtentY" VALUE="1032">',
			'<PARAM NAME="PatientID" VALUE="">',
			'<PARAM NAME="PatientName" VALUE="">',
			'<PARAM NAME="PatientNameKanji" VALUE="">',
			'<PARAM NAME="PatientSex" VALUE="">',
			'<PARAM NAME="PatientBirthDate" VALUE="">',
			'<PARAM NAME="PatientsSexNeutered" VALUE="">',
		'</OBJECT>'
		);
		//-->
		</SCRIPT>

		<form id="Form1" method="post" runat="server">
			<!-- ///////////////////////////////////////-->
			<!--  患者情報編集コンポ制御スクリプト    //-->
			<!-- ///////////////////////////////////////-->
			<SCRIPT language="vbs">
			'************************************************************
			'患者情報コンポーネントI/F(メソッド)
			' PEdit_Initialize ：
			'------------------------------------------------------------
			' [機能概要]
			'   患者情報コンポーネントに対して初期化を行う
			'
			' [パラメータ]
			'   なし
			'
			' [戻り値]
			'   なし
			'
			' [備考]
			'
			'************************************************************
			Sub PEdit_Initialize ()
				PatientEditID.Initialize
			End Sub
			
			'************************************************************
			'患者情報コンポーネントI/F(メソッド)
			' PatientEditID_OnPatientEditClick ：
			'------------------------------------------------------------
			' [機能概要]
			'   患者情報コンポーネントからのイベント通知処理を行う
			'
			' [パラメータ]
			'   なし
			'
			' [戻り値]
			'   なし
			'
			' [備考]
			'
			'************************************************************
			Sub PatientEditID_OnPatientEditClick
				top.parent.IVMainProc.NoticeResult CInt(306) , CInt(0)
			End Sub
			</SCRIPT>
		</form>
	</BODY>
</HTML>
