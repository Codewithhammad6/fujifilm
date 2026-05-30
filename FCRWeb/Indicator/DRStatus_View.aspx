<%@ Page language="c#" Codebehind="DRStatus_View.aspx.cs" AutoEventWireup="false" Inherits="Indicator.DRStatus_View" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<TITLE>DRStatus_View</TITLE>
		<%
/****************************************************************************

  @file DRStatus_View.aspx

  @brief RUユーティリティステータス表示用フレーム


  @author TYK石井

  Copyright(c) 2014 FUJI PHOTO FILM CO., LTD. All rights reseved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  14/03/11  TYK石井     3.0(B)     新規作成
  
/****************************************************************************/
%>
		<%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
		<META content="True" name="vs_snapToGrid">
		<META content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="CSS/DRStatus_View.css" type="text/css" charset="UTF-8" rel="stylesheet">
		<SCRIPT language="JavaScript" src="Include/ButtonChange.js" charset="UTF-8"></SCRIPT>
		<SCRIPT language="JavaScript" src="Include/DRStatus_View.js" charset="UTF-8"></SCRIPT>
		<SCRIPT language="JavaScript" src="Include/Control.js" charset="UTF-8"></SCRIPT>
	</HEAD>
	<BODY oncontextmenu="return false;" onselectstart="return false;" onload="Fn_InitPage()">
        <HR ID="hrBottom" SIZE="1">
		<!-- ヘッダ --><IMG id="imgHeader" ondrag="return false;" src="../Bmp/indMedeiaListBar.gif">
		<IMG id="imgHeader1" ondrag="return false;" src="../Bmp/indListBar_Line.gif"> <IMG id="imgHeader2" ondrag="return false;" src="../Bmp/indListBar_Line.gif">
		<IMG id="imgHeader3" ondrag="return false;" src="../Bmp/indListBar_Line.gif"> <IMG id="imgHeader4" ondrag="return false;" src="../Bmp/indListBar_Line.gif">
		<TABLE id="tblDeviceName">
			<TR>
				<TD>
					<DIV id="divDeviceName"></DIV>
				</TD>
			</TR>
		</TABLE>
		<TABLE id="tblMessage">
			<TR>
				<TD>
					<DIV id="divMessage"></DIV>
				</TD>
			</TR>
		</TABLE>
		<TABLE id="tblMessageNum">
			<TR>
				<TD>
					<DIV id="divMessageNum"></DIV>
				</TD>
			</TR>
		</TABLE>
		<TABLE id="tblDeviceStatus">
			<TR>
				<TD>
					<DIV id="divDeviceStatus"></DIV>
				</TD>
			</TR>
		</TABLE>
		<TABLE id="tblBatteryStatus">
			<TR>
				<TD>
					<DIV id="divBatteryStatus"></DIV>
				</TD>
			</TR>
		</TABLE>
		<TABLE id="tblConnectStatus">
			<TR>
				<TD>
					<DIV id="divConnectStatus"></DIV>
				</TD>
			</TR>
		</TABLE>
		<!-- エラー情報ラベル -->
		<TABLE id="tblAllErrorMessage">
			<TR>
				<TD>
					<DIV ID="divAllErrorMessage"></FONT></DIV>
				</TD>
			</TR>
		</TABLE>
		<!-- 接続装置情報リスト -->
		<DIV id="divQueueList">
			<TABLE id="table" cellSpacing="0" border="0">
				<SCRIPT language="javascript">
        <!--
          for(i = 0; i < 3; i++){
          if(i%2){
            BackColor = "White";
          }else{
            BackColor = "EBFFEB";
          }
          
          document.write("<TR ID='TR' bgColor='" + BackColor + "' ONCLICK='Fn_SelectLine(this," + i + ");'>\n");
          document.write("<TD ID='tdSpace'></TD>\n");
          document.write("<TD ID='tdDeviceColor' ALIGN=left><DIV ID='divDeviceColor'></DIV></TD>\n");
          document.write("<TD ID='tdDeviceName' ALIGN=left><DIV ID='divDeviceNameTxt'></DIV></TD>\n");
          document.write("<TD ID='tdMessage' ALIGN=left><DIV ID='divMessageTxt'></DIV></TD>\n");
          document.write("<TD ID='tdMessageNum' ALIGN=left><DIV ID='divMessageNumTxt'></DIV></TD>\n");
          document.write("<TD ID='tdDeviceStatus' ALIGN=left><IMG id='imgDeviceStatus' ondrag='return false;'></TD>\n");
          document.write("<TD ID='tdBatteryStatus' ALIGN=left><IMG id='imgBatteryStatus' ondrag='return false;'></TD>\n");
          document.write("<TD ID='tdBatteryStatusTxt' ALIGN=left><DIV ID='divBatteryStatusTxt'></DIV></TD>\n");
          document.write("<TD ID='tdConnectStatus' ALIGN=left><IMG id='imgConnectStatus' ondrag='return false;'></TD>\n");
          document.write("</TR>\n");
          }
        -->
				</SCRIPT>
			</TABLE>
		</DIV>
		<!-- エラーメッセージ一覧 -->
		<DIV id="divErrorList">
			<TABLE id="Errortable" cellSpacing="0" border="0">
				<SCRIPT language="javascript">
        <!--
          for(i = 0; i < 10; i++){
          BackColor = "White";
          
          document.write("<TR ID='TR' bgColor='" + BackColor + "' ONCLICK='Fn_SelectErrorLine(this," + i + ");'>\n");
          document.write("<TD ID='tdError' ALIGN=left><DIV ID='divErrorTxt'></DIV></TD>\n");
          document.write("</TR>\n");
          }
        -->
				</SCRIPT>
			</TABLE>
		</DIV>
	</BODY>
</HTML>
