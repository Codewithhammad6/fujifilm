<%@ Page language="c#" Codebehind="Login_List.aspx.cs" AutoEventWireup="false" Inherits="UserAuth.Login_List" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file UserAuth\Login_List.aspx

  @brief LoginList

  @author HSK山本

  Copyright(C) 2004-2009 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
  @date  07/04/17  HSK山本     V2.0       PVCS#1671
  @date  07/06/01  HSK山本     V2.0       PVCS#2296対応
  @date  09/03/10  HSK小椋     V5.0       PVCS#3167対応
  @date  11/02/07  TYS岸本     V7.1       CQ#444対応

/****************************************************************************/
%>
<HTML>
	<HEAD>
		<title>ユーザリスト画面</title>
		<%
/* キャッシュ制御を停止 */
Response.CacheControl = "no-cache";
Response.AddHeader("Pragma","no-cache");
Response.Expires = -1;
%>
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Expires" content="Thu, 01 Dec 1994 16:00:00 GMT">
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<link rel="stylesheet" type="text/css" href="CSS/UserAuth.css">
		<script language="javascript" src="./Include/Login_List.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/GetUserInfo.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/SelectUser.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/SelectSE.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/ImageButton.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/Control.js" charset="UTF-8"></script>
		<script language="javascript">
	<!--
//070417 HSK山本 PVCS#1671 ADD-ST
        var regFontName = "<%=regFontName%>";
//070417 HSK山本 PVCS#1671 ADD-ED
//070601 HSK山本 PVCS#2296 ADD-ST
        var regFontSizeSS = "<%=regFontSizeSS%>"+"pt";
        var regFontSizeS = "<%=regFontSizeS%>"+"pt";
        var regFontSizeM = "<%=regFontSizeM%>"+"pt";
        var regFontSizeL = "<%=regFontSizeL%>"+"pt";
//070601 HSK山本 PVCS#2296 ADD-ED
		var queryURL        = "<%=queryURL%>";
		var queryIsLogoff   = "<%=queryIsLogoff%>";
		var honorificTitle  = "<%=honorificTitle%>";
		var serverHostName  = "<%=serverHostName%>";
		var userImagePath   = "<%=userImagePath%>";
		var clientType      = "<%=clientType%>";
	// -->
		</script>
	</HEAD>
    <!-- 070417 HSK山本 PVCS#1671 UPDATE -->
    <!-- <body bgColor="#f5e7dd" topMargin="0" leftMargin="0" scroll="no" onload="fnGetMousePos();" -->
    <body bgColor="#f5e7dd" topMargin="0" leftMargin="0" scroll="no" onload="OnStyleSetting();fnGetMousePos();"
		onclick="fnClicked();" oncontextmenu="return false;"
		onselectstart="return false;" onHelp="return false;" ondrag="return false;">
		<form id="frmList" method="post" runat="server">
			<table id="UserAll" width="800" height="600" cellSpacing="0" cellPadding="0" border="0"
				align="center">
				<% // 取得値設定エリア %>
				<tr height="48" bgcolor="#f7f1e6">
					<td width="50">
						<div style="VISIBILITY: hidden">
							<asp:button id="btnCheckSE" runat="server" Visible="False" Width="0px" Height="0px" Text=""></asp:button>
						</div>
					</td>
					<td colSpan="2">
						<div style="VISIBILITY: hidden">
							<input id="txtSoftKeyBoardFlag" name="txtSoftKeyBoardFlag" style="WIDTH: 22px; HEIGHT: 22px"
								type="hidden" size="1" runat="server"> <input id="txtUserImagePath" name="txtUserImagePath" style="WIDTH: 22px; HEIGHT: 22px"
								type="hidden" size="1" runat="server"> <input id="txtPageNumNow" name="txtPageNumNow" style="WIDTH: 22px; HEIGHT: 22px" type="hidden"
								size="1" runat="server"> <input id="txtPageNumMax" name="txtPageNumMax" style="WIDTH: 22px; HEIGHT: 22px" type="hidden"
								size="1" runat="server"> <input id="txtMultiByteFlag" name="txtMultiByteFlag" style="WIDTH: 22px; HEIGHT: 22px"
								type="hidden" size="1" runat="server"> <input id="txtClientType" name="txtClientType" style="WIDTH: 22px; HEIGHT: 22px" type="hidden"
								size="1" runat="server"> <input id="txtHonorificFlag" name="txtHonorificFlag" style="WIDTH: 22px; HEIGHT: 22px"
								type="hidden" size="1" runat="server"> <input id="txtHonorificTitle" name="txtHonorificTitle" style="WIDTH: 22px; HEIGHT: 22px"
								type="hidden" size="1" runat="server"> <input id="txtMousePosition" name="txtMousePosition" style="WIDTH:  0px; HEIGHT:  0px"
								size="1" runat="server">
						</div>
					</td>
					<td colSpan="3"></td>
					<td width="300" colSpan="2"></td>
					<td></td>
				</tr>
				<% // ユーザガイダンス表示エリア %>
				<tr height="30">
					<td bgColor="#001b59" colSpan="9">
						&nbsp;&nbsp;&nbsp;
						<asp:label id="lblUserGuidance" runat="server" Font-Bold="True" ForeColor="White">ユーザガイダンス表示部</asp:label>
					</td>
				</tr>
				<tr height="1" bgcolor="#ffffff">
					<td height="1" colspan="9"></td>
				</tr>
				<tr height="3" bgcolor="#eec1aa">
					<td height="3" colspan="9"></td>
				</tr>
				<tr height="30">
					<td width="62"></td>
					<td width="120"></td>
					<td width="180"></td>
					<td width="27"></td>
					<td width="27"></td>
					<td width="27"></td>
					<td width="180"></td>
					<td width="120"></td>
<% // 110207 TYS岸本 CQ#444 ADD-ST %>
					<td width="57"></td>
<% // 110207 TYS岸本 CQ#444 ADD-ED %>
<% // 110207 TYS岸本 CQ#444 DEL-ST %>
					<% //<td></td> %>
<% // 110207 TYS岸本 CQ#444 DEL-ED %>
				</tr>
				<% // ユーザ短冊表示エリア %>
				<tr height="88">
					<td></td>
					<td id="tdUserStrip1" colSpan="3" onclick="UserStrip_Click(1);">
						<div style="WIDTH: 326px; POSITION: relative; HEIGHT: 85px" ms_positioning="GridLayout">
							<img id="imgUserStripS1" style="Z-INDEX: 101; LEFT: 2px; WIDTH: 324px; POSITION: absolute; TOP: 2px; HEIGHT: 82px"
								src="../Bmp/ucUserStripPltS.gif"> <img id="imgUserStripN1" style="Z-INDEX: 102; LEFT: 2px; WIDTH: 324px; POSITION: absolute; TOP: 2px; HEIGHT: 82px"
								src="../Bmp/ucUserStripPltN.gif"> <input id="txtUserName1" name="txtUserName1" style="BORDER-RIGHT: 0px solid; BORDER-TOP: 0px solid; FONT-WEIGHT: bold; Z-INDEX: 103; LEFT: 88px; BORDER-LEFT: 0px solid; WIDTH: 217px; BORDER-BOTTOM: 0px solid; POSITION: absolute; TOP: 8px; HEIGHT: 22px"
								type="text" size="31" readOnly> <textarea id="txtUserComment1" name="txtUserComment1" style="OVERFLOW-Y: hidden; Z-INDEX: 104; LEFT: 86px; WIDTH: 230px; BORDER-TOP-STYLE: none; FONT-FAMILY: 'MS UI Gothic'; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; POSITION: absolute; TOP: 40px; HEIGHT: 28px; BACKGROUND-COLOR: transparent; BORDER-BOTTOM-STYLE: none"
								rows="2" cols="26" wrap="hard" readOnly></textarea>
							<div style="Z-INDEX: 105; LEFT: 7px; WIDTH: 70px; POSITION: absolute; TOP: 7px; HEIGHT: 70px"
								ms_positioning="GridLayout">
								<img id="imgUserImage1h" style="Z-INDEX: 101; LEFT: 0px; POSITION: absolute; TOP: 0px"
									src="" height="70"> <img id="imgUserImage1w" style="Z-INDEX: 101; LEFT: 0px; POSITION: absolute; TOP: 0px"
									src="" width="70">
							</div>
						</div>
					</td>
					<td></td>
					<td id="tdUserStrip4" colSpan="3" onclick="UserStrip_Click(4);">
						<div style="WIDTH: 326px; POSITION: relative; HEIGHT: 85px" ms_positioning="GridLayout">
							<img id="imgUserStripS4" style="Z-INDEX: 101; LEFT: 2px; WIDTH: 324px; POSITION: absolute; TOP: 2px; HEIGHT: 82px"
								src="../Bmp/ucUserStripPltS.gif"> <img id="imgUserStripN4" style="Z-INDEX: 102; LEFT: 2px; WIDTH: 324px; POSITION: absolute; TOP: 2px; HEIGHT: 82px"
								src="../Bmp/ucUserStripPltN.gif"> <input id="txtUserName4" name="txtUserName4" style="BORDER-RIGHT: 0px solid; BORDER-TOP: 0px solid; FONT-WEIGHT: bold; Z-INDEX: 103; LEFT: 88px; BORDER-LEFT: 0px solid; WIDTH: 217px; BORDER-BOTTOM: 0px solid; POSITION: absolute; TOP: 8px; HEIGHT: 22px"
								type="text" size="31" readOnly> <textarea id="txtUserComment4" name="txtUserComment4" style="OVERFLOW-Y: hidden; Z-INDEX: 104; LEFT: 86px; WIDTH: 230px; BORDER-TOP-STYLE: none; FONT-FAMILY: 'MS UI Gothic'; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; POSITION: absolute; TOP: 40px; HEIGHT: 28px; BACKGROUND-COLOR: transparent; BORDER-BOTTOM-STYLE: none"
								rows="2" cols="26" wrap="hard" readOnly></textarea>
							<div style="Z-INDEX: 105; LEFT: 7px; WIDTH: 70px; POSITION: absolute; TOP: 7px; HEIGHT: 70px"
								ms_positioning="GridLayout">
								<img id="imgUserImage4h" style="Z-INDEX: 101; LEFT: 0px; POSITION: absolute; TOP: 0px"
									src="" height="70"> <img id="imgUserImage4w" style="Z-INDEX: 101; LEFT: 0px; POSITION: absolute; TOP: 0px"
									src="" width="70">
							</div>
						</div>
					</td>
					<td></td>
				</tr>
				<tr height="17">
					<td rowSpan="3"></td>
					<td colSpan="2"></td>
					<td></td>
					<td></td>
					<td></td>
					<td colSpan="2"></td>
					<td rowSpan="3"></td>
				</tr>
				<tr height="88">
					<td id="tdUserStrip2" colSpan="3" onclick="UserStrip_Click(2);">
						<div style="WIDTH: 326px; POSITION: relative; HEIGHT: 85px" ms_positioning="GridLayout">
							<img id="imgUserStripS2" style="Z-INDEX: 101; LEFT: 2px; WIDTH: 324px; POSITION: absolute; TOP: 2px; HEIGHT: 82px"
								src="../Bmp/ucUserStripPltS.gif"> <img id="imgUserStripN2" style="Z-INDEX: 102; LEFT: 2px; WIDTH: 324px; POSITION: absolute; TOP: 2px; HEIGHT: 82px"
								src="../Bmp/ucUserStripPltN.gif"> <input id="txtUserName2" name="txtUserName2" style="BORDER-RIGHT: 0px solid; BORDER-TOP: 0px solid; FONT-WEIGHT: bold; Z-INDEX: 103; LEFT: 88px; BORDER-LEFT: 0px solid; WIDTH: 217px; BORDER-BOTTOM: 0px solid; POSITION: absolute; TOP: 8px; HEIGHT: 22px"
								type="text" size="31" readOnly> <textarea id="txtUserComment2" name="txtUserComment2" style="OVERFLOW-Y: hidden; Z-INDEX: 104; LEFT: 86px; WIDTH: 230px; BORDER-TOP-STYLE: none; FONT-FAMILY: 'MS UI Gothic'; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; POSITION: absolute; TOP: 40px; HEIGHT: 28px; BACKGROUND-COLOR: transparent; BORDER-BOTTOM-STYLE: none"
								rows="2" cols="26" wrap="hard" readOnly></textarea>
							<div style="Z-INDEX: 105; LEFT: 7px; WIDTH: 70px; POSITION: absolute; TOP: 7px; HEIGHT: 70px"
								ms_positioning="GridLayout">
								<img id="imgUserImage2h" style="Z-INDEX: 101; LEFT: 0px; POSITION: absolute; TOP: 0px"
									src="" height="70"> <img id="imgUserImage2w" style="Z-INDEX: 101; LEFT: 0px; POSITION: absolute; TOP: 0px"
									src="" width="70">
							</div>
						</div>
					</td>
					<td></td>
					<td id="tdUserStrip5" colSpan="3" onclick="UserStrip_Click(5);">
						<div style="WIDTH: 326px; POSITION: relative; HEIGHT: 85px" ms_positioning="GridLayout">
							<img id="imgUserStripS5" style="Z-INDEX: 101; LEFT: 2px; WIDTH: 324px; POSITION: absolute; TOP: 2px; HEIGHT: 82px"
								src="../Bmp/ucUserStripPltS.gif"> <img id="imgUserStripN5" style="Z-INDEX: 102; LEFT: 2px; WIDTH: 324px; POSITION: absolute; TOP: 2px; HEIGHT: 82px"
								src="../Bmp/ucUserStripPltN.gif"> <input id="txtUserName5" name="txtUserName5" style="BORDER-RIGHT: 0px solid; BORDER-TOP: 0px solid; FONT-WEIGHT: bold; Z-INDEX: 103; LEFT: 88px; BORDER-LEFT: 0px solid; WIDTH: 217px; BORDER-BOTTOM: 0px solid; POSITION: absolute; TOP: 8px; HEIGHT: 22px"
								type="text" size="31" readOnly> <textarea id="txtUserComment5" name="txtUserComment5" style="OVERFLOW-Y: hidden; Z-INDEX: 104; LEFT: 86px; WIDTH: 230px; BORDER-TOP-STYLE: none; FONT-FAMILY: 'MS UI Gothic'; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; POSITION: absolute; TOP: 40px; HEIGHT: 28px; BACKGROUND-COLOR: transparent; BORDER-BOTTOM-STYLE: none"
								rows="2" cols="26" wrap="hard" readOnly></textarea>
							<div style="Z-INDEX: 105; LEFT: 7px; WIDTH: 70px; POSITION: absolute; TOP: 7px; HEIGHT: 70px"
								ms_positioning="GridLayout">
								<img id="imgUserImage5h" style="Z-INDEX: 101; LEFT: 0px; POSITION: absolute; TOP: 0px"
									src="" height="70"> <img id="imgUserImage5w" style="Z-INDEX: 101; LEFT: 0px; POSITION: absolute; TOP: 0px"
									src="" width="70">
							</div>
						</div>
					</td>
				</tr>
				<tr height="17">
					<td colSpan="2"></td>
					<td></td>
					<td></td>
					<td></td>
					<td colSpan="2"></td>
				</tr>
				<tr height="88">
					<td></td>
					<td id="tdUserStrip3" colSpan="3" onclick="UserStrip_Click(3);">
						<div style="WIDTH: 326px; POSITION: relative; HEIGHT: 85px" ms_positioning="GridLayout">
							<img id="imgUserStripS3" style="Z-INDEX: 101; LEFT: 2px; WIDTH: 324px; POSITION: absolute; TOP: 2px; HEIGHT: 82px"
								src="../Bmp/ucUserStripPltS.gif"> <img id="imgUserStripN3" style="Z-INDEX: 102; LEFT: 2px; WIDTH: 324px; POSITION: absolute; TOP: 2px; HEIGHT: 82px"
								src="../Bmp/ucUserStripPltN.gif"> <input id="txtUserName3" name="txtUserName3" style="BORDER-RIGHT: 0px solid; BORDER-TOP: 0px solid; FONT-WEIGHT: bold; Z-INDEX: 103; LEFT: 88px; BORDER-LEFT: 0px solid; WIDTH: 217px; BORDER-BOTTOM: 0px solid; POSITION: absolute; TOP: 8px; HEIGHT: 22px"
								type="text" size="31" readOnly> <textarea id="txtUserComment3" name="txtUserComment3" style="OVERFLOW-Y: hidden; Z-INDEX: 104; LEFT: 86px; WIDTH: 230px; BORDER-TOP-STYLE: none; FONT-FAMILY: 'MS UI Gothic'; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; POSITION: absolute; TOP: 40px; HEIGHT: 28px; BACKGROUND-COLOR: transparent; BORDER-BOTTOM-STYLE: none"
								rows="2" cols="26" wrap="hard" readOnly></textarea>
							<div style="Z-INDEX: 105; LEFT: 7px; WIDTH: 70px; POSITION: absolute; TOP: 7px; HEIGHT: 70px"
								ms_positioning="GridLayout">
								<img id="imgUserImage3h" style="Z-INDEX: 101; LEFT: 0px; POSITION: absolute; TOP: 0px"
									src="" height="70"> <img id="imgUserImage3w" style="Z-INDEX: 101; LEFT: 0px; POSITION: absolute; TOP: 0px"
									src="" width="70">
							</div>
						</div>
					</td>
					<td></td>
					<td id="tdUserStrip6" colSpan="3" onclick="UserStrip_Click(6);">
						<div style="WIDTH: 326px; POSITION: relative; HEIGHT: 85px" ms_positioning="GridLayout">
							<img id="imgUserStripS6" style="Z-INDEX: 101; LEFT: 2px; WIDTH: 324px; POSITION: absolute; TOP: 2px; HEIGHT: 82px"
								src="../Bmp/ucUserStripPltS.gif"> <img id="imgUserStripN6" style="Z-INDEX: 102; LEFT: 2px; WIDTH: 324px; POSITION: absolute; TOP: 2px; HEIGHT: 82px"
								src="../Bmp/ucUserStripPltN.gif"> <input id="txtUserName6" name="txtUserName6" style="BORDER-RIGHT: 0px solid; BORDER-TOP: 0px solid; FONT-WEIGHT: bold; Z-INDEX: 103; LEFT: 88px; BORDER-LEFT: 0px solid; WIDTH: 217px; BORDER-BOTTOM: 0px solid; POSITION: absolute; TOP: 8px; HEIGHT: 22px"
								type="text" size="31" readOnly> <textarea id="txtUserComment6" name="txtUserComment6" style="OVERFLOW-Y: hidden; Z-INDEX: 104; LEFT: 86px; WIDTH: 230px; BORDER-TOP-STYLE: none; FONT-FAMILY: 'MS UI Gothic'; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; POSITION: absolute; TOP: 40px; HEIGHT: 28px; BACKGROUND-COLOR: transparent; BORDER-BOTTOM-STYLE: none"
								rows="2" cols="26" wrap="hard" readOnly></textarea>
							<div style="Z-INDEX: 105; LEFT: 7px; WIDTH: 70px; POSITION: absolute; TOP: 7px; HEIGHT: 70px"
								ms_positioning="GridLayout">
								<img id="imgUserImage6h" style="Z-INDEX: 101; LEFT: 0px; POSITION: absolute; TOP: 0px"
									src="" height="70"> <img id="imgUserImage6w" style="Z-INDEX: 101; LEFT: 0px; POSITION: absolute; TOP: 0px"
									src="" width="70">
							</div>
						</div>
					</td>
					<td></td>
				</tr>
				<tr height="29">
					<td></td>
					<td colSpan="2"></td>
					<td></td>
					<td></td>
					<td></td>
					<td colSpan="2"></td>
					<td></td>
				</tr>
				<tr height="1" bgcolor="#864542">
					<td height="1" colspan="9"></td>
					<% // ページ切り替えボタン表示エリア %>
				<tr bgColor="#f7f1e6" height="40">
					<td>
						<div style="VISIBILITY: hidden">
							<asp:button id="btnPrev" runat="server" Width="0px" Height="0px"></asp:button>
						</div>
					</td>
					<td bgColor="#f7f1e6" width="120">
						<div style="LEFT: -40px; WIDTH: 118px; POSITION: relative; TOP: 0px; HEIGHT: 40px" ms_positioning="GridLayout">
							<img id="imgBeforeButtonX" style="Z-INDEX: 101; LEFT: 0px; POSITION: absolute; TOP: 0px"
								src="../Bmp/cmBeforeLBtnX.gif" width="118" height="40">
							<img id="imgBeforeButtonUD" style="Z-INDEX: 102; LEFT: 0px; POSITION: absolute; TOP: 0px"
								src="../Bmp/cmBeforeLBtnU.gif" width="118" height="40" onmouseup="javascript:SetImageUrl(this,'../Bmp/cmBeforeLBtnU.gif');" onmousedown="javascript:SetImageUrl(this,'../Bmp/cmBeforeLBtnD.gif');"
								onclick="requestUserInfo(-1);" onmouseout="javascript:SetImageUrl(this,'../Bmp/cmBeforeLBtnU.gif');">
						</div>
					</td>
					<td bgColor="#f7f1e6" align="center" colSpan="5">
						<input id="txtPageNum" style="WIDTH: 326px; BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; HEIGHT: 29px; BACKGROUND-COLOR: transparent; TEXT-ALIGN: center; BORDER-BOTTOM-STYLE: none"
							type="text" size="49" value="1/1" readOnly>
					</td>
					<td bgColor="#f7f1e6">
						<div style="LEFT: 40px; WIDTH: 118px; POSITION: relative; TOP: 0px; HEIGHT: 40px" ms_positioning="GridLayout">
							<img id="imgNextButtonX" style="Z-INDEX: 101; LEFT: 0px; POSITION: absolute; TOP: 0px"
								width="118" height="40" src="../Bmp/cmNextLBtnX.gif">
							<img id="imgNextButtonUD" style="Z-INDEX: 102; LEFT: 0px; POSITION: absolute; TOP: 0px"
								width="118" height="40" src="../Bmp/cmNextLBtnU.gif" onmouseup="javascript:SetImageUrl(this,'../Bmp/cmNextLBtnU.gif');" onmousedown="javascript:SetImageUrl(this,'../Bmp/cmNextLBtnD.gif');"
								onclick="requestUserInfo(1);" onmouseout="javascript:SetImageUrl(this,'../Bmp/cmNextLBtnU.gif');">
						</div>
					</td>
					<td bgColor="#f7f1e6">
						<div style="VISIBILITY: hidden">
							<asp:button id="btnNext" runat="server" Width="0px" Height="0px"></asp:button>
						</div>
					</td>
				</tr>
				<tr height="1" bgcolor="#864542">
					<td height="1" colspan="9"></td>
				</tr>
				<tr height="1" bgcolor="#a97d4f">
					<td height="1" colspan="9"></td>
				</tr>
				<tr height="1" bgcolor="#e3cdb4">
					<td height="1" colspan="9"></td>
				</tr>
				<tr>
					<td style="HEIGHT: 14px" colSpan="9"></td>
				</tr>
				<tr height="4" bgcolor="#eec1aa">
					<td height="4" colspan="9"></td>
				</tr>
				<tr height="1" bgcolor="#f5e7dd">
					<td height="1" colspan="9"></td>
				</tr>
				<tr height="1" bgcolor="#6c6a65">
					<td height="1" colspan="9"></td>
				</tr>
				<tr height="1" bgcolor="#c9c4bb">
					<td height="1" colspan="9"></td>
				</tr>
				<% // 終了ボタン表示エリア %>
				<tr bgColor="#f7f1e6" height="72">
					<td align="left" colSpan="9">
						<br>
						<br>
						<div style="LEFT: 10px; WIDTH: 121px; POSITION: relative; HEIGHT: 48px" ms_positioning="GridLayout">
							<asp:label id="lblEnd" style="Z-INDEX: 102; LEFT: 50px; POSITION: absolute; TOP: 15px" runat="server"
								Font-Bold="True" ForeColor="Black" BackColor="Transparent"></asp:label>
							<asp:image id="imgEnd" style="Z-INDEX: 101; LEFT: 10px; POSITION: absolute; TOP: 0px" runat="server"
								Width="115px" Height="42px" ImageUrl="../Bmp/cmOvalBPaleLBtnU.gif"></asp:image>
						</div>
						<div style="VISIBILITY: hidden">
							<asp:button id="btnEnd" Width="0px" Height="0px" runat="server"></asp:button>
						</div>
					</td>
				</tr>
			</table>
		</form>
	</body>
</HTML>
