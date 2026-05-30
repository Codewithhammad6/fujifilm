<%@ Page language="c#" Codebehind="MainCE.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.MainCE" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file MainCE.aspx

  @brief CR検査メインASPX

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/03  YSK畑　     V1.0       新規作成
  @date  05/11/21  HSK古場     V1.4       CR検査部構造見直し[4]対応

/****************************************************************************/
%>
<%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>Hobbitクライアント</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <META HTTP-EQUIV="Imagetoolbar" CONTENT="no">
		<LINK REL="stylesheet" TYPE="text/css" HREF="CSS/MainCE.css">
		<LINK REL="stylesheet" TYPE="text/css" HREF="../CSS/MessageWindow.css">
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/JSCommonFrameSize.js" CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js" CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="../Include/PageLoader.js" CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"   CHARSET="UTF-8"></SCRIPT>
		<script language="javascript" src="../Include/MessageWindow.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/MessageWindow.js" charset="UTF-8"></script>
		<SCRIPT LANGUAGE="JavaScript" SRC="./Include/MainCE.js" CHARSET="UTF-8"></SCRIPT>
    <script language="javascript" src="../Include/MainCommon.js" CHARSET="UTF-8"></script>
    <SCRIPT LANGUAGE="JavaScript" SRC="../SoftKeyBoard/Include/SoftKeyBoardCharactor.js" CHARSET="UTF-8"></SCRIPT>
		<script language="javascript">
		try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "MainCE.aspx"  //ファイル名

      var StudySequence = "<%=StudySequence%>";		// 検査シーケンス
      var PatientId     = "<%=PatientId%>";			// 患者ID
 
      // 先読みサブメインフレームURL
      var FrameUrl = "<%=FrameUrl%>";
      
      var ClientMode = "<%=ClientMode%>";
function Fn_Initialize(){
     <%=ClientScript%>
}
   	}catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
		}
		</script>
	</HEAD>
	<body scroll="no" onload="Fn_InitPage();Fn_Initialize();" oncontextmenu="return false;" onselectstart="return false;" ondrag="return false;">
		<form id="Form1" method="post" runat="server">
			<DIV>Now Loading･･･
			</DIV>
      <IFRAME id="frmIndicator" frameBorder="0" scrolling="no"></IFRAME>
      <IFRAME id="DispFrame" frameborder="0" scrolling="no"></IFRAME>
      <IFRAME id="MainFrame" frameBorder="0" scrolling="no"></IFRAME>
      <IFRAME id="GetErrorFrame" frameBorder="0" scrolling="no"></IFRAME>
      <IFRAME id="MenuFrame" frameBorder="0" scrolling="no"></IFRAME>
			<IFRAME id="EndFrame" frameBorder="0" scrolling="no"></IFRAME>
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
						<DIV ID="DIV_MainErrorButton" ONCLICK="Public_OnButton_Main(0,'../Bmp/cmOvalAGreenLBtnU.gif')" ONMOUSEDOWN="Public_OnButton_Main(1,'../Bmp/cmOvalAGreenLBtnD.gif')" ONMOUSEOUT="Public_OnButton_Main(2,'../Bmp/cmOvalAGreenLBtnU.gif')">
							<DIV ID="DIV_MainErrorOkText"></DIV>
							<IMG ID="IMG_MainErrorButton" SRC="../Bmp/cmOvalAGreenLBtnU.gif">
						</DIV>
          </TD>
        </TR>
      </TABLE>
		</form>
	</body>
</HTML>
