<%@ Page language="c#" Codebehind="Main.aspx.cs" AutoEventWireup="false" Inherits="FloatIndicator.Main" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>Main</title>
<%
/****************************************************************************

  @file Main.aspx

  @brief IndicatorメインASPX

  @author FF星野

  Copyright(c) 2004-2009 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  09/07/27  FF 星野     V6.0      インジケーター切り離し対応
  @date  14/03/20  TYK 石井    V3.0       DR装置画面対応

/****************************************************************************/
%>
<%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
		<META content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<META http-equiv="Imagetoolbar" content="no">
		<SCRIPT language="javascript" src="../Include/MainCommon.js" charset="UTF-8"></SCRIPT>
		<SCRIPT language="javascript" src="../Include/Main.js" charset="UTF-8"></SCRIPT>
		<SCRIPT language="javascript" src="../Include/Control.js" charset="UTF-8"></SCRIPT>
		<SCRIPT language="javascript" src="./../CrExam/Include/ChangeDateFormatDef.js" charset="UTF-8"></SCRIPT>
		<SCRIPT language="javascript" src="./../CrExam/Include/ChangeDBDateFormat.js" charset="UTF-8"></SCRIPT>
		<SCRIPT language="javascript" charset="UTF-8">
		<!--
			SetLoginInfo();
			function SetLoginInfo()
			{
				try
				{
					//サーバーから情報を取得
					window.top.SetUserInfomation( "<% Response.Write( LoginUserID ); %>", "<% Response.Write( LoginTime ); %>" );
				}
				catch(e)
				{
					ErrorHandler( FATAL_ERROR, "SetLoginInfo Exception" );
				}
			}
			
			function SetDateTime()
			{
				dateTime = top.NowTime;
				if(dateTime != "")
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
					returnValue = ChangeDateToScreenFormat( date,  <% GetDateFormat(); %>  );
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
							if( <% GetTimeFormat(); %> ==0 )
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

					if( <% GetTimeFormat(); %> ==0 )
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
					FloatIndicatorTimeLabeCtrl.SetServerTime(dateTime);
				}
			}	
		-->
		</SCRIPT>
	</HEAD>
	<BODY oncontextmenu="return false;" onselectstart="return false;" ondrag="return false;" style="MARGIN: 0px; OVERFLOW: hidden" bgColor=#f5f5fc onload='setInterval("SetDateTime()",10000);'>	
                <!-- //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD Start
		<DIV id="Layer1" style="Z-INDEX: 101; LEFT: 0px; WIDTH: 230; POSITION: absolute; TOP: 0px; HEIGHT: 38px; TEXT-ALIGN: right">
			<FONT face="MS UI Gothic">
				<IFRAME id="frmIndicator" style="WIDTH: 230px; BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; TOP: 0px; HEIGHT: 38px; BORDER-BOTTOM-STYLE: none"
					src="./../Indicator/Indicator.aspx" frameBorder="no" scrolling="no">
				</IFRAME>
			</FONT>
		</DIV>
                -->
                <DIV id="Layer1" style="Z-INDEX: 101; LEFT: 0px; WIDTH: 268px; POSITION: absolute; TOP: 0px; HEIGHT: 38px; TEXT-ALIGN: right">
			<FONT face="MS UI Gothic">
				<IFRAME id="frmIndicator" style="WIDTH: 268px; BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; TOP: 0px; HEIGHT: 38px; BORDER-BOTTOM-STYLE: none"
					src="./../Indicator/Indicator.aspx?CurrentView=1" frameBorder="no" scrolling="no">
				</IFRAME>
			</FONT>
		</DIV>
                <!-- //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 MOD End-->
		<DIV id="Layer2" style="Z-INDEX: 101; LEFT: 268px; WIDTH: 230px; POSITION: absolute; TOP: 0px; HEIGHT: 38px; TEXT-ALIGN: right">
			<OBJECT id="FloatIndicatorTimeLabeCtrl" height="100%" width="100%"
		 	classid="http:FloatIndicatorTimeLabel.dll#FloatIndicatorTimeLabel.FloatIndicatorTimeLabelCtrl" VIEWASTEXT>
			</OBJECT>
		</DIV>	
	</BODY>
</HTML>
