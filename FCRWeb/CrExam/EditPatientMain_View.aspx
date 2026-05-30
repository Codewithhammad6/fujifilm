<%@ Page language="c#" Codebehind="EditPatientMain_View.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.EditPatientMain_View" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
		<title>EditPatient_View</title>
<%
/****************************************************************************

  @file EditPatientMain_View.aspx

  @brief 患者情報表示画面フレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/20  YSK畑　     V1.0       新規作成

/****************************************************************************/
%>
<%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
        <meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
        <meta name="CODE_LANGUAGE" Content="C#">
        <meta name="vs_defaultClientScript" content="JavaScript">
        <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
        <META HTTP-EQUIV="Imagetoolbar" CONTENT="no">
        <script language=javascript src="./Include/ChangeDateFormatDef.js" charset="UTF-8"></script>
        <script language=javascript src="./Include/ChangeDBDateFormat.js" charset="UTF-8"></script>
        <script language=javascript src="./Include/ImageButton_Color.js" charset="UTF-8"></script>
        <script language=javascript src="./Include/EditPatientMain_View.js" charset="UTF-8"></script>
        <script language=javascript src="./Include/MessageWindow.js" charset="UTF-8"></script>
        <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"     CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"   CHARSET="UTF-8"></SCRIPT>
        <script language=javascript>
        try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "EditPatientMain_View.aspx"  //ファイル名

      var ValueMulti            = <%=ValueMulti%>;			// マルチバイト
      var DateFormat            = <%=DateFormat%>;			// 日付フォーマット
      var HonorificFlag         = <%=HonorificFlag%>;		// 敬称表示フラグ
      var HonorificTitle        = "<%=HonorificTitle%>";// 敬称表示文字列
      var OpenMode              = <%=OpenMode%>;				// 画面オープンモード
      var FONT_NAME             = "<%=FontName%>";      //フォント名を取得
      // 2005/06/23 006 H.SAITO デザイン変更対応（フォントサイズ）
      //var FONT_SIZE             = "<%=FontSize%>";         //フォントサイズを取得
      var FONT_SIZE_INPUTBOX    = "<%=FontSize_InputBox%>";  //フォントサイズ(入力ボックス(患者情報))
      var FONT_SIZE_CAPTION     = "<%=FontSize_Caption%>";   //フォントサイズ(キャプション(入力ボックス横))
      var FONT_SIZE_BUTTON      = "<%=FontSize_Button%>";    //フォントサイズ(ボタン)
      var FONT_SIZE_OTHER       = "<%=FontSize_Other%>";     //フォントサイズ(その他)
      // 文字列取得
      var LabelPatientId        = top.DispFrame.Public_GetString(32500,"PatientId");
      var LablePatientName      = top.DispFrame.Public_GetString(32502,"PatientName");
      var LabelPatientKanjiName = top.DispFrame.Public_GetString(32501,"PatientKanjiName");
      var LabelPatientSex       = top.DispFrame.Public_GetString(32503,"Sex");
      var LabelPatientBirth     = top.DispFrame.Public_GetString(32504,"BirthDate");
      var LabelSexMale          = top.DispFrame.Public_GetString(32511,"Male");
      var LabelSexFemale        = top.DispFrame.Public_GetString(32512,"Female");
      var LabelSexOther         = top.DispFrame.Public_GetString(32513,"Other");
      var LabelAge              = top.DispFrame.Public_GetString(32736,"Age");
      var ButtonPatientEdit     = top.DispFrame.Public_GetString(32505,"Edit");
      var ButtonPatientChange   = top.DispFrame.Public_GetString(32506,"Change Patient");
      var ButtonBack=""
      if(OpenMode == OPEN_MODE_CE || OpenMode == OPEN_MODE_WINDOW){
        ButtonBack            = top.DispFrame.Public_GetString(32507,"Back");
	    }else if(OpenMode == OPEN_MODE_DIALOG){
          ButtonBack            = top.DispFrame.Public_GetString(32508,"Close");
	    }
      var ButtonNext            = top.DispFrame.Public_GetString(32509,"");
      var UserGuidanceString    = top.DispFrame.Public_GetString(32510,"UserGuidance1");
// 2005/08/22 Kanno ADD ST タイトルバーの文字列対応
      var TitleString           = top.DispFrame.Public_GetString(32514,"Edit Patient Information");
// 2005/08/22 Kanno ADD ED タイトルバーの文字列対応
      //データ取得完了時にメソッドを呼ぶ      
      <%=ClientScript%>
		}catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
		}
		</script>
<script language=javascript>
// スタイルシート設定
if(ValueMulti == REGISTRY_MULTIBYTE){
	document.write('	    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/EditPatientMain_View.css">\n');
}else{
	document.write('	    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/EditPatientMain_View_Single.css">\n');
}
</script>
	    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/MessageWindow.css">
  </HEAD>
	<body ID="BODY" onload="Fn_InitPage()" onselectstart="return false;" ondrag="return false;" oncontextmenu="return false;">
<!-- 2005/05/24-ST //-->
    <!-- メッセージと主要画面の境界 -->
    <TABLE>
      <TR><TD ID="DIV_List_Border"></TD></TR>
    </TABLE> 
<!-- 2005/05/24-EN //-->
    <!--患者情報背景//-->
    <DIV ID="DIV_Back_Black"></DIV>
		<!-- 患者ラベルIMG表示//-->
		<!-- 患者背景表示//-->
		<IMG ID="Img_Patient" SRC="../Bmp/crPatinetPlt.gif"> 
		<IMG ID="Img_Patient2" SRC="../Bmp/crPatient2Plt.gif"> 
		<IMG ID="Img_Patient3" SRC="../Bmp/crPatient3Plt.gif"> 
		<IMG ID="Img_Patient4" SRC="../Bmp/crPatient4Plt.gif"> 
		<!-- 患者ラベル表示//-->
		<DIV id="divPatId_Value"></DIV>
		<DIV id="divPatKanjiName_Value"></DIV>
		<DIV id="divPatName_Value"></DIV>
		<DIV id="divPatSex_Value"></DIV>
		<DIV id="divPatBirth_Value"></DIV>
		<!--患者情報表示枠組み//-->
		<DIV ID="divPatInfo0_Frame"></DIV>
		<DIV ID="divPatInfo1_Frame"></DIV>
		<DIV ID="divPatInfo2_Frame"></DIV>
		<DIV ID="divPatInfo3_Frame"></DIV>
		<DIV ID="divPatInfo4_Frame"></DIV>
		<!--患者情報領域//-->
		<DIV id="divPatInfo0"></DIV>
		<DIV id="divPatInfo1"></DIV>
		<DIV id="divPatInfo2"></DIV>
		<DIV id="divPatInfo3"></DIV>
		<DIV id="divPatInfo4"></DIV>
		<!-- 患者編集ボタン表示//-->
		<DIV id="divEdit"  onmousedown="Fn_OnButton(2)"	onmouseup="Fn_OnButton(3)" onmouseout="Fn_OnButton(3)" onclick="Fn_OnButton(1)">
		  <IMG id="imgEditId" src="../Bmp/crPatideditBtnU.gif">
		  <DIV id="divEditId_Value"></DIV>
    </DIV>
		<!-- 患者編集ボタン表示//-->
		<DIV id="divEditDetail"  onmousedown="Fn_OnButton(6)"	onmouseup="Fn_OnButton(7)" onmouseout="Fn_OnButton(7)" onclick="Fn_OnButton(5)">
		  <IMG id="imgEditDetail" src="../Bmp/crPatinfoeditBtnU.GIF">
		  <DIV id="divEditDetail_Value"></DIV>
		</DIV>
		<!-- 患者変更ボタン//-->
		<DIV id="divChange"  onmousedown="Fn_OnButton(11)"	onmouseup="Fn_OnButton(12)" onmouseout="Fn_OnButton(12)" onclick="Fn_OnButton(10)">
		  <IMG id="imgChangePatient" src="../Bmp/crPatchgBtnU.GIF">
		  <DIV id="divChange_Value"></DIV>
		</DIV>
    <!-- コマンドボタン領域の色 -->  
    <DIV ID="DIV_CommandBackGround"></DIV>
    <!-- リストとコマンドボタンの境界 -->  
    <IMG SRC="../Bmp/cmBorder.gif" ID="IMG_List-Command_Border">
		<!--画面遷移ボタン表示//-->
		<!--戻るボタン//-->
    <IMG SRC="../Bmp/crBtnBack6Plt.gif" ID="IMG_Back_BackGround">
		<DIV id="divBack"  onmousedown="Fn_OnButton(91)"	onmouseup="Fn_OnButton(92)" onmouseout="Fn_OnButton(92)" onclick="Fn_OnButton(90)">
		  <DIV id="divBack_Value"></DIV>
		  <IMG id="imgBack" src="../Bmp/cmOvalAPaleLBtnU.GIF">
		</DIV>
		<!--次へボタン//-->
<!-- ボタン削除
		<DIV id="divStart_Value" onmousedown="document.getElementById('imgNext').onmousedown();" onmouseup="document.getElementById('imgNext').onmouseup();"
			onmouseout="document.getElementById('imgNext').onmouseout();" onclick="document.getElementById('imgNext').click();"
			onselectstart="return false;"></DIV>
		<IMG id="imgNext" src="../Bmp/OKButton.GIF" onmousedown="SetImageUrl(this,'../Bmp/SubButton.GIF')"
			onmouseup="SetImageUrl(this,'../Bmp/OKButton.GIF')" onmouseout="SetImageUrl(this,'../Bmp/OKButton.GIF')"
			onclick="Fn_OnButton(99);">
//-->			
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
            <DIV id="DIV_ErrorButton" onmousedown="Public_OnButton(0)"	onmouseup="Public_OnButton(1)" onmouseout="Public_OnButton(1)" onclick="Public_CloseError()">
              <DIV id="DIV_ErrorOkText"></DIV>
              <IMG id="IMG_ErrorButton" src="../Bmp/cmOvalAGreenLBtnU.gif">
            </DIV>
          </TD>
        </TR>
      </TABLE>
	</body>
</HTML>
