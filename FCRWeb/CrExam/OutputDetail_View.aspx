<%@ Page language="c#" Codebehind="OutputDetail_View.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.OutputDetail_View" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file OutputDetail_View.aspx

  @brief 出力先設定詳細情報画面フレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/10  YSK畑　     V1.0       新規作成

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
        <title>OutputDetail_View</title>
        <meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
        <meta content="C#" name="CODE_LANGUAGE">
        <meta content="JavaScript" name="vs_defaultClientScript">
        <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
        <META HTTP-EQUIV="Imagetoolbar" CONTENT="no">
        <LINK href="CSS/OutputDetail_View.css" type="text/css" rel="stylesheet">
        <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/MessageWindow.css">
        <SCRIPT LANGUAGE="JavaScript" SRC="Include/Output_View.js" CHARSET="UTF-8"></SCRIPT>
        <script language="javascript" src="./Include/ImageButton_Color.js" charset="UTF-8"></script>
        <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js" CHARSET="UTF-8"></SCRIPT>
        <SCRIPT language="JavaScript" src="Include/OutputDetail_View.js" charset="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"     CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"   CHARSET="UTF-8"></SCRIPT>
		<script language="javascript">
    try{
      var SPOT_CODE_ASPX = 0;               //スポットコード
      var FILE_NAME_ASPX = "OutputDetail_View.aspx"  //ファイル名
      
      //サーバのエラー表示
      <%=ClientScript%>

	    // 画面オープンモード
	    var OpenMode  = <%=OpenMode%>;
      //フォント名を取得
      var FONT_NAME = "<%=FontName%>";
      // 2005/06/24 007 H.SAITO デザイン変更対応（フォントサイズ）
      ////フォントサイズを取得
      //var FONT_SIZE = "<%=FontSize%>";
      // フォントサイズ(キャプション(横))
      var FONT_SIZE_CAPTION     = "<%=FontSize_Caption%>";
      // フォントサイズ(入力ボックス)
      var FONT_SIZE_INPUTBOX    = "<%=FontSize_InputBox%>";
      // フォントサイズ(ボタン)
      var FONT_SIZE_BUTTON      = "<%=FontSize_Button%>";
      // フォントサイズ(その他)
      var FONT_SIZE_OTHER       = "<%=FontSize_Other%>";
      var OptionHQ = <%=OptionHQ%>;
	    // 文字列取得
	    var Label_OutputDevice    = top.DispFrame.Public_GetString(32460,"OutputAlias");//"出力先";
	    var Label_OutputTiming    = top.DispFrame.Public_GetString(32461,"OutputTiming");//"出力タイミング";
	    var Label_OutputCount     = top.DispFrame.Public_GetString(32464,"Print");
	    var Label_OutputDeDensity = top.DispFrame.Public_GetString(32465,"Output");//"出力密度";
    	
	    var Label_Button_Next   = top.DispFrame.Public_GetString(32469,"Set");
	    var Label_Button_Back   = top.DispFrame.Public_GetString(32468,"Back");
    	
	    var Density_High = top.DispFrame.Public_GetString(32466,"High");
	    var Density_Mid  = top.DispFrame.Public_GetString(32467,"Mid");
    	
	    var Timing_Confirm  = top.DispFrame.Public_GetString(32462,"Confirm");
	    var Timing_Decision = top.DispFrame.Public_GetString(32463,"Decision");

	    var UserGuidanceString = top.DispFrame.Public_GetString(32470,"Userguidance");		
	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
		</script>
	</HEAD>
	<body id="BODY" onload="Fn_InitPage()" onselectstart="return false;" ondrag="return false;" oncontextmenu="return false;">
<!-- 2005/05/24-ST //-->
          <!-- メッセージと主要画面の境界 -->
          <TABLE>
            <TR><TD ID="DIV_List_Border"></TD></TR>
          </TABLE> 
<!-- 2005/05/24-EN //-->
		<!--出力先のヘッダ//-->
		<DIV id="divOutputDevice0"></DIV>
		<DIV id="divOutputDevice1"></DIV>
		<DIV id="divOutputDevice2"></DIV>
		<DIV id="divOutputDevice3"></DIV>
		<!-- コンボボックス表示時のフィルタ//-->
		<table id="ComboBoxFrame" onclick="HideDrop();">
			<tr>
				<td></td>
			</tr>
		</table>
		<!-- コンボボックス内容//-->
		<div id="divComboBox"></div>
		<!-- コンボボックスリスト//-->
		<table id="tblHead" cellSpacing="0" border="0">
			<tr>
				<td onmousedown="ShowDrop(0);" id="head">
					<div id="divHeader" noWrap></div>
				</td>
			</tr>
		</table>
		<!-- コンボボックスボタン//-->
		<IMG onclick="Fn_OnButton(1)" onmousedown="Fn_OnButton(2)" ONMOUSEOUT="Fn_OnButton(3)" id="pull" ondrag="return false;" style="LEFT: 416px; TOP: 32px"
			src="../Bmp/cmPullDownBtnU.gif">&nbsp; 
		<!-- 出力タイミング選択ボタン//-->
		<DIV ID="DIV_TimingConfirmBtn" ONMOUSEDOWN="SelectTiming('1'),Fn_WriteLog(CTRL_AT_CONFIRM);">
<!-- 2005/08/10 Kanno UPDATE ST デザイン修正 -->
<!--			<IMG id="IMG_ConfirmBtn_Enable" src="../Bmp/cmSquare2BtnU.gif"> -->
			<IMG id="IMG_ConfirmBtn_Enable" src="../Bmp/cmSquare7BtnU.gif">
<!-- 2005/08/10 Kanno UPDATE ED デザイン修正 -->
			<DIV id="DIV_ConfirmText"></DIV>
		</DIV>
<!-- 2005/08/10 Kanno UPDATE ST デザイン修正 -->
<!--		<IMG ID="IMG_ConfirmBtn_Disable" SRC="../Bmp/cmSquare2BtnX.gif"> -->
		<IMG ID="IMG_ConfirmBtn_Disable" SRC="../Bmp/cmSquare7BtnX.gif">
<!-- 2005/08/10 Kanno UPDATE ED デザイン修正 -->
		<DIV ID="DIV_TimingDecisionBtn" ONMOUSEDOWN="SelectTiming('2'),Fn_WriteLog(CTRL_AT_DECIDE);">
<!-- 2005/08/10 Kanno UPDATE ST デザイン修正 -->
<!--			<IMG id="IMG_DecisionBtn" src="../Bmp/cmSquare2BtnU.gif"> -->
			<IMG id="IMG_DecisionBtn" src="../Bmp/cmSquare7BtnU.gif">
<!-- 2005/08/10 Kanno UPDATE ED デザイン修正 -->
			<DIV id="DIV_DecisionText"></DIV>
		</DIV>
		<!-- 出力枚数テキストボックス//-->
		<table id="tblOutputCount" cellSpacing="0" border="0">
			<tr>
				<td id="tdCount">
					<div id="divOutputCount" noWrap></div>
				</td>
			</tr>
		</table>
		<!-- 出力枚数上ボタン//-->
		<IMG id="IMG_UpBtn_Enable" src="../Bmp/cmUpPage3BtnU.gif" ONCLICK="Fn_OnButton(11)"  ONMOUSEDOWN="Fn_OnButton(12);" ONMOUSEOUT="Fn_OnButton(13);">
		<IMG ID="IMG_UpBtn_Disable" SRC="../Bmp/cmUpPage3BtnX.gif">
		<!-- 出力枚数下ボタン//-->
		<IMG id="IMG_DownBtn_Enable" src="../Bmp/cmDownPage3BtnU.gif" ONCLICK="Fn_OnButton(21)" ONMOUSEDOWN="Fn_OnButton(22);" ONMOUSEOUT="Fn_OnButton(23);">
		<IMG ID="IMG_DownBtn_Disable" SRC="../Bmp/cmDownPage3BtnX.gif">
		<!-- 出力密度選択ボタン//-->
		<DIV ID="DIV_DensityMidBtn"  ONMOUSEDOWN="SelectDensity(OUTPUT_DENSITY_STANDERD),Fn_WriteLog(CTRL_NORMALQUALITY);">
      <!-- 2005/07/04 003 H.SAITO HQオプション対応に伴うデザイン変更 -->
			<!--<IMG id="IMG_MidBtn" src="../Bmp/cmSquare2BtnU.gif">-->
			<IMG id="IMG_MidBtn" src="../Bmp/cmSquare6BtnU.gif">
			<DIV id="DIV_MidText"></DIV>
		</DIV>
		<DIV ID="DIV_DensityHighBtn" ONMOUSEDOWN="SelectDensity(OUTPUT_DENSITY_HIGH),Fn_WriteLog(CTRL_HIGHQUALITY);">
      <!-- 2005/07/04 003 H.SAITO HQオプション対応に伴うデザイン変更 -->
			<!--<IMG id="IMG_HighBtn" src="../Bmp/cmSquare2BtnU.gif">-->
			<IMG id="IMG_HighBtn" src="../Bmp/cmSquare6BtnU.gif">
			<DIV id="DIV_HighText"></DIV>
		</DIV>
    <!-- コマンドボタン領域の色 -->  
    <DIV ID="DIV_CommandBackGround"></DIV>
		<!-- リストとコマンドボタンの境界 -->
		<IMG id="IMG_List-Command_Border" src="../Bmp/cmBorder.gif">
    <!-- 戻るボタン -->
  	<IMG ID="IMG_Cancel_BackGround" SRC="../Bmp/crBtnBack6Plt.gif">
		<TABLE ID="TABLE_CancelBtn" ONCLICK="Fn_OnButton(91);" ONMOUSEDOWN="Fn_OnButton(92);" ONMOUSEOUT="Fn_OnButton(93);">
			<TR><TD></TD></TR>
		</TABLE>
    <DIV ID="DIV_CancelBtn">
      <IMG ID="IMG_CancelBtn" SRC="../Bmp/cmOvalAPaleLBtnU.gif">
      <DIV ID="DIV_CancelText"></DIV>
    </DIV>
    <!-- 修正完了ボタン -->
  	<IMG ID="IMG_Update_BackGround" SRC="../Bmp/crBtnBack4Plt.gif">
		<TABLE ID="TABLE_UpdateBtn" ONCLICK="Fn_OnButton(95);" ONMOUSEDOWN="Fn_OnButton(96);" ONMOUSEOUT="Fn_OnButton(97);">
			<TR><TD></TD></TR>
		</TABLE>
    <DIV ID="DIV_UpdateBtn">
      <IMG ID="IMG_UpdateBtn_Enable" SRC="../Bmp/cmCirBGreenBtnU.gif">
      <DIV ID="DIV_UpdateText"></DIV>
    </DIV>
		<!-- 処理中フレーム -->
		<TABLE ID="TABLE_ProcFrame">
			<TR>
				<TD>
					<!-- 処理中ボックス -->
					<TABLE ID="TABLE_ProcBox">
						<TR>
							<TD ID="TD_ProcText"></TD>
						</TR>
					</TABLE>
				</TD>
			</TR>
		</TABLE>
      <!-- エラーフレーム -->
      <TABLE ID="TABLE_ErrorFrame">
        <TR>
          <TD>
            <!-- 処理中ボックス -->
            <TABLE ID="TABLE_ErrorBox">
              <TR>
                <TD id="TD_ErrorTitle1"><br>
                </TD>
              </TR>
              <TR>
                <TD id="TD_ErrorTitle2"><br>
                </TD>
              </TR>
              <TR>
                <TD id="TD_ErrorText"><br>
                </TD>
              </TR>
              <TR>
                <TD id="TD_ErrorCode"><br>
                </TD>
              </TR>
              <TR>
                <TD><br>
                </TD>
              </TR>
            </TABLE>
            <!-- ボタン -->
            <DIV ID="DIV_ErrorButton" ONMOUSEDOWN="Public_OnButton(0)"	ONMOUSEUP="Public_OnButton(1)" ONMOUSEOUT="Public_OnButton(1)" ONCLICK="Public_CloseError()">
              <DIV id="DIV_ErrorOkText"></DIV>
              <IMG id="IMG_ErrorButton" src="../Bmp/cmOvalAGreenLBtnU.gif">
            </DIV>
          </TD>
        </TR>
      </TABLE>

	</body>
</HTML>
