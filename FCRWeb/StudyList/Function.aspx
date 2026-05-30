<%@ Page language="c#" Codebehind="Function.aspx.cs" AutoEventWireup="false" Inherits="StudyList.Function" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file StudyList/Function.aspx

  @brief 患者起点画面（旧検査リスト）


  @author FF奥野

　Copyright(C) 2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  09/08/17  FF奥野      V6.0       患者起点画面対応
  @date  09/09/02  FF奥野      V6.0       画像参照部ロック機能対応
  @date  09/09/02  FF奥野      V6.0       画像参照部のログアウト時最小化対応
  @date  09/09/24  FF奥野      V6.0       画像参照部のログアウト時最小化対応のデグレード対応（#3468）
  @date  10/01/20  FF星野      V1.2(B)    起動形態対応
/****************************************************************************/
%>
<HTML>
	<HEAD>
		<title>検査リスト</title>
		<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
		<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
		<META HTTP-EQUIV="Expires" CONTENT="Thu, 01 Dec 1994 16:00:00 GMT">
		<meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<script language="javascript" src="./Include/StudyListCommon.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/StudyListFunction.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/Control.js" charset="UTF-8"></script>
		<script language="javascript" src="./../CrExam/Include/ChangeDateFormatDef.js" charset="UTF-8"></script>
		<script language="javascript" src="./../CrExam/Include/ChangeDBDateFormat.js" charset="UTF-8"></script>
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/FixToKB912945.js" CHARSET="UTF-8"></SCRIPT>
		<script language="javascript" charset="UTF-8">
		<!--
// 2005/08/20 Kanno ADD ST タイトルバーの文字列対応
		// タイトル設定
		top.SetTitle("<%=title%>");
// 2005/08/20 Kanno ADD ED タイトルバーの文字列対応
		function SetDateTime()
		{
			try
			{
				dateTime = top.NowTime;

				if( dateTime!="" )
				{
					// 日付と時刻を分割
					aryDateTime = dateTime.split(" ");

					//------------------------------------------
					// 日付フォーマット変更
					//------------------------------------------
					var aryDate = aryDateTime[0].split("/");

					var date = "";
					for( i=0; i<aryDate.length; i++ )
					{
						date = date + aryDate[i];
					}
																// 日付を設定形式へ変換
					returnValue = ChangeDateToScreenFormat( date, <% GetDateFormat(); %> );
					if( returnValue==-1 )
					{
						return;
					}

					//------------------------------------------
					// 時刻フォーマット変更(秒数は省略)
					//------------------------------------------
					var aryTime = aryDateTime[1].split(":");
					var time = "";
					var timeFlag = 0;

					for( j=0; j<aryTime.length-1; j++ )
					{
						// 時間をフォーマットに変更
						if( j==0 )
						{
																// 0:12タイムテーブル(HH:MM SS)/1:24タイムテーブル(HH:MM)
							if( <% GetTimeFormat(); %>==0 )
							{
								if( aryTime[j]>=12 )
								{
									aryTime[j] = aryTime[j] - 12;
									timeFlag = 1;
								}
							}
						}
					}
					time = aryTime[0] + ":" + aryTime[1]; 

					if( <% GetTimeFormat(); %>==0 )
					{
						if( timeFlag==1 )
						{
							time = time + " PM";
						}
						else
						{
							time = time + " AM";
						}
					}

					// 日付と時間を連結
					dateTime = returnValue + " " + time;

					//------------------------------------------
					// 検査リストメインコントロールへセット
					//------------------------------------------
					StudyListCtrl.SetServerDateTime( dateTime );
				}
				// 2006/11/27 PVCS#1770 H.SAITO -ST-
				else{
					StudyListCtrl.SetServerDateTime( "" );
				}
				// 2006/11/27 PVCS#1770 H.SAITO -ED-
			}
			catch( e )
			{
				ErrorHandler( FATAL_ERROR, "SetDateTime Exception" );
			}
		}
// StudyListSize 20050810 ADD START
		// onBeforeUnload(検査リストを閉じる)時に呼ばれる
		// 129行目にBODYの記述に｢onBeforeUnload="ExitSaveStudyListSize()"｣を追加されていること。
		function ExitSaveStudyListSize()
		{
			try
			{
				// Cookieに検査リストのサイズを設定
				SetCookie(top.document.body.clientWidth,top.document.body.clientHeight,top.window.screenLeft,top.window.screenTop);
			}
			catch(e)
			{
				ErrorHandler( FATAL_ERROR, "ExitSaveStudyListSize Exception" );
			}
		}
// StudyListSize 20050810 ADD END 		
// ↓PVCS-1130 追加開始
		// 検査リストコントロールのサイズの更新
		// 検査リストコントロールのサイズを body のサイズと同じにする。
		function UpdateStudyListCtrlSize()
		{
			StudyListCtrl.style.height = document.body.clientHeight;
			StudyListCtrl.style.width = document.body.clientWidth;
		}
// ↑PVCS-1130 追加終了
		function CreateMutex()
		{
			MutexCtrlLib.CreateMutex( "StudyList" );
		}
		//Hobbit-V1.3 電カル連携対応 Hirao add Start
		function IndicatiorUtilityOpen()
		{
			StudyListCtrl.IndicatiorUtilityOpen();
		}
		function IndicatiorUtilityClose()
		{
			StudyListCtrl.IndicatiorUtilityClose();
		}
		//Hobbit-V1.3 電カル連携対応 Hirao add End
		-->
		</script>
	</HEAD>
		<!--V1.2(B) 起動形態対応 星野 ADD -->
		<BODY bgcolor="#F4F2E4" onBeforeUnload="ExitSaveStudyListSize()" ms_positioning="GridLayout" style="margin:0" onload='top.SetCurrentView("STUDYLIST");top.SetViewFrame("MainFrame");window.top.Exit();' unonload='top.SetViewFrame("");' onresize='UpdateStudyListCtrlSize()'>
		<!--V1.2(B) 起動形態対応 星野 DEL -->
		<!-- <BODY bgcolor="#F4F2E4" onBeforeUnload="ExitSaveStudyListSize()" ms_positioning="GridLayout" style="margin:0" onload='WindowResize();UpdateStudyListCtrlSize();CreateMutex();top.SetCurrentView("STUDYLIST");top.SetViewFrame("MainFrame");' unonload='top.SetViewFrame("");' onresize='UpdateStudyListCtrlSize()'>-->


		<!-- PVCS#1796 -->
		<!-- ActiveX更新プログラムKB912945対応 -->
		<SCRIPT LANGUAGE="javascript">
		<!--
		WriteToDocument(
		'<OBJECT id="MutexCtrlLib" classid="clsid:52BBC902-CD96-4401-8107-20FF66103625" style="margin:0,0,0,0; POSITION:absolute; top:0; left:0; PADDING:0,0,0,0;" VIEWASTEXT>',
		'</OBJECT>'
		);
		//-->
		</SCRIPT>

		<script language="javascript" charset="UTF-8">
		<!--
		function MutexCtrlLib::FirstStarting()
		{
			try
			{
				top.initImageView("<% Response.Write( LoginUserID ); %>","<% Response.Write( LoginTime ); %>");
				// V6.0 #3468 20090924 FF奥野 画像参照部のログアウト時最小化デグレード対応 Start //
				top.normalizationView( "<% Response.Write( LoginUserID ); %>", "<% Response.Write( LoginTime ); %>" );
				// V6.0 #3468 20090924 FF奥野 画像参照部のログアウト時最小化デグレード対応 End //
			}
			catch(e)
			{
				alert("MutexCtrlLib::FirstStarting() ... "+e.message);
			}
		}
		function MutexCtrlLib::MultiplexStarting()
		{
			try
			{
				// トップウインドウへクローズ要求
				window.top.Exit2();
			}
			catch(e)
			{
				alert("MutexCtrlLib::MultiplexStarting() ... "+e.message);
			}
		}
		-->
		</script>

		<!-- PVCS#1796 -->
		<!-- ActiveX更新プログラムKB912945対応 -->
		<!-- PVCS#2312 -->
		<script language="javascript">
		<!--
		WriteToDocument(
		'<OBJECT id="StudyListCtrl" height="100%" width="100%" classid="http:PatientPortalStater.dll#PatientPortal.Main.MainStarter" style="margin:0,0,0,0; POSITION:absolute; top:0; left:0; PADDING:0,0,0,0;" VIEWASTEXT>',
			"<param name=\"WebServiceHostName\" value=\"<% Response.Write( HostName ); %>\" />",
			"<param name=\"UserID\" value=\"<% Response.Write( LoginUserID ); %>\" />",
			"<param name=\"LoginTime\" value=\"<% Response.Write( LoginTime ); %>\" />",
			"<param name=\"CurrentQueryKey\" value=\"<% Response.Write( queryKeyName ); %>\" />",
			"<param name=\"FormTitlename\" value=\"<% Response.Write( title ); %>\" />",
		'</OBJECT>'
		);
		//-->
		</script>

		<script language="javascript" charset="UTF-8">
		<!--
		SetLoginInfo();
		function SetLoginInfo()
		{
			try
			{
				window.top.SetUserInfomation( "<% Response.Write( LoginUserID ); %>", "<% Response.Write( LoginTime ); %>" );
			}
			catch(e)
			{
				ErrorHandler( FATAL_ERROR, "SetLoginInfo Exception" );
			}
		}
		function StudyListCtrl::RequestFinish()
		{
			// 画面終了要求イベント
			try
			{
				window.top.Exit();
			}
			catch(e)
			{
				ErrorHandler( FATAL_ERROR, "RequestFinish Exception" );
			}
		}
		-->
		</script>
	</BODY>
</HTML>
