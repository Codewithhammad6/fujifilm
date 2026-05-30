<%@ Page language="c#" Codebehind="DeleteMenu_View.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.DeleteMenu_View" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
<%
/****************************************************************************

  @file DeleteMenu_View.aspx

  @brief メニュー削除／画像無効化データ画面フレーム

  @author YSK齋藤

  Copyright(C) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/10/29  YSK齋藤     V1.0       新規作成
  @date  07/06/14  HSK山本     V2.0       PVCS#2209対応

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
  <META HTTP-EQUIV="Imagetoolbar" CONTENT="no">
  <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/DeleteMenu_View.css">
  <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/MessageWindow.css">
  <SCRIPT LANGUAGE="JavaScript" SRC="Include/DeleteMenu_View.js"        CHARSET="UTF-8"></SCRIPT>
  <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js"          CHARSET="UTF-8"></SCRIPT>
  <SCRIPT LANGUAGE="JavaScript" SRC="Include/ChangeDBDateFormat.js"     CHARSET="UTF-8"></SCRIPT>
  <SCRIPT LANGUAGE="JavaScript" SRC="Include/ChangeDateFormatDef.js"    CHARSET="UTF-8"></SCRIPT>
  <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"              CHARSET="UTF-8"></SCRIPT>
  <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"       CHARSET="UTF-8"></SCRIPT>
  <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"     CHARSET="UTF-8"></SCRIPT>
  <SCRIPT LANGUAGE="JavaScript" CHARSET="UTF-8">
		try{
      var SPOT_CODE_ASPX          = 0;                       //スポットコード
      var FILE_NAME_ASPX          = "DeleteMenu_View.aspx";  //ファイル名
			//(各変数は.jsにて宣言済み)
			//画像ファイルのパス名を取得
			var IMAGE_FILE_PATH					= "<%=ImageFilePath%>";
      //フォント名を取得
      FONT_NAME                   = "<%=FontName%>";
      // 2005/06/23 013 H.SAITO デザイン変更対応(フォントサイズ）
      ////フォントサイズを取得
      //FONT_SIZE                    = "<%=FontSize%>";
      // フォントサイズ(短冊内メニュー名称)
      FONT_SIZE_MENU               = "<%=FontSize_Menu%>";
      // フォントサイズ(短冊メニューページ数)
      FONT_SIZE_MENU_PAGE          = "<%=FontSize_Menu_Page%>";
      // フォントサイズ(ボタン)
      FONT_SIZE_BUTTON             = "<%=FontSize_Button%>";
      // フォントサイズ(ボタン(上部にアイコンを含む))
      FONT_SIZE_UPICON             = "<%=FontSize_Button_UpIcon%>";
      // フォントサイズ(その他)
      FONT_SIZE_OTHER              = "<%=FontSize_Other%>";

			// 画面オープンモード
			var OpenMode								= <%=OpenMode%>;
			// 文字列取得
			var DelText                 = top.DispFrame.Public_GetString(32633,"Delete");
			var DelCancelText           = top.DispFrame.Public_GetString(32634,"Cancel Delete");
			var ImgDisableText          = top.DispFrame.Public_GetString(32635,"Disable Delete");
			var ImgEnableText           = top.DispFrame.Public_GetString(32636,"Enable Delete");
			var ReshotText              = top.DispFrame.Public_GetString(32637,"ReShot");
			var CancelText              = "";
			if(OpenMode == OPEN_MODE_CE || OpenMode == OPEN_MODE_WINDOW){
				CancelText							= top.DispFrame.Public_GetString(32638,"Back");
			}else if(OpenMode == OPEN_MODE_DIALOG){
				CancelText							= top.DispFrame.Public_GetString(32639,"Close");
			}
			var UpdateText							= top.DispFrame.Public_GetString(32640,"Update");
			var TotalPageString					= top.DispFrame.Public_GetString(32630,"Total");
  		var PageString							= top.DispFrame.Public_GetString(32632,"Page");
  		var MenuString							= top.DispFrame.Public_GetString(32631,"Menu");
//070614 HSK山本 PVCS#2209 ADD-ST
        var ProcString                          = top.DispFrame.Public_GetString(32730,"Please wait...");
//070614 HSK山本 PVCS#2209 ADD-ED

			var UpdateString						= top.DispFrame.Public_GetString(32730,"Please wait...");
//		  var VoidDeleteAllMenuString	= top.DispFrame.Public_GetLangMsgString(31513,"The delection tha the taking a picture menu become 0 cannot be done");
			var UserGuidanceString	    = top.DispFrame.Public_GetString(32641,"UserGuidanceString");
      var ConfirmOkString         = top.DispFrame.Public_GetString(32731,"OK");     //"OK"
      var ConfirmCancelString     = top.DispFrame.Public_GetString(32732,"Cancel");
// 2005/08/22 Kanno ADD ST タイトルバーの文字列対応
      var TitleString             = top.DispFrame.Public_GetString(32642,"Delete Menu");    // タイトル
// 2005/08/22 Kanno ADD ED タイトルバーの文字列対応
		
			//サーバ処理後に実行されるクライアントスクリプト
			<%=ClientScript%>;
		}
	  catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
  </SCRIPT>
  </HEAD>
<BODY ID="BODY" ONLOAD="Fn_InitPage();" ONSELECTSTART="return false;" ONKEYDOWN="return false;" ONDRAG="return false;" oncontextmenu="return false;">
    <!-- ヘッダ -->
    <DIV ID="DIV_DeleteMenu_Header"></DIV> 
    <!-- リスト背景（灰） -->
    <DIV ID="DIV_BackGround_Gray"></DIV> 
<!-- 2005/05/24-ST //-->
    <!-- リスト縁左（黒）-->
<!--    <DIV ID="DIV_BackGround_Black"></DIV> -->
    <!-- リスト縁右（黒）-->
<!--    <DIV ID="DIV_BackGround_Black_Right"></DIV> -->
    <!-- リスト縁下（黒）-->
<!--    <DIV ID="DIV_BackGround_Black_Bottom"></DIV> -->
<!-- 2005/05/24-EN //-->
    <!-- リスト背景（ピンク）-->
    <DIV ID="DIV_BackGround_Pink"></DIV>
    <!-- リスト背景（紫）-->
    <DIV ID="DIV_BackGround_Purple"></DIV> 
<!-- 2005/05/24-ST //-->
    <!-- メッセージと主要画面の境界 -->
    <TABLE>
      <TR><TD ID="DIV_List_Border"></TD></TR>
    </TABLE> 
<!-- 2005/05/24-EN //-->
  <!-- 撮影メニュー１ -->
  <DIV ID="DIV_DeleteMenu1" ONMOUSEUP="Fn_OnButton(1);">
    <IMG   ID="IMG_DeleteMenu1"  SRC="../Bmp/crUnSelMenu2Plt.gif">
    <DIV   ID="DIV_DeleteFilm1"></DIV>
    <IMG   ID="IMG_DeleteImage1" SRC="../Bmp/crImageDelSim.gif">
    <IMG   ID="IMG_ReshotImage1" SRC="../Bmp/crImageCancelSim.gif">
    <INPUT ID="DIV_DeleteText1"  READONLY>
  </DIV>
  <!-- 撮影メニュー２ -->
  <DIV ID="DIV_DeleteMenu2" ONMOUSEUP="Fn_OnButton(2);">
    <IMG   ID="IMG_DeleteMenu2"  SRC="../Bmp/crUnSelMenu2Plt.gif">
    <DIV   ID="DIV_DeleteFilm2"></DIV>
    <IMG   ID="IMG_DeleteImage2" SRC="../Bmp/crImageDelSim.gif">
    <IMG   ID="IMG_ReshotImage2" SRC="../Bmp/crImageCancelSim.gif">
    <INPUT ID="DIV_DeleteText2"  READONLY>
  </DIV>
  <!-- 撮影メニュー３ -->
  <DIV ID="DIV_DeleteMenu3" ONMOUSEUP="Fn_OnButton(3);">
    <IMG   ID="IMG_DeleteMenu3"  SRC="../Bmp/crUnSelMenu2Plt.gif">
    <DIV   ID="DIV_DeleteFilm3"></DIV>
    <IMG   ID="IMG_DeleteImage3" SRC="../Bmp/crImageDelSim.gif">
    <IMG   ID="IMG_ReshotImage3" SRC="../Bmp/crImageCancelSim.gif">
    <INPUT ID="DIV_DeleteText3"  READONLY>
  </DIV>
  <!-- 撮影メニュー４ -->
  <DIV ID="DIV_DeleteMenu4" ONMOUSEUP="Fn_OnButton(4);">
    <IMG   ID="IMG_DeleteMenu4"  SRC="../Bmp/crUnSelMenu2Plt.gif">
    <DIV   ID="DIV_DeleteFilm4"></DIV>
    <IMG   ID="IMG_DeleteImage4" SRC="../Bmp/crImageDelSim.gif">
    <IMG   ID="IMG_ReshotImage4" SRC="../Bmp/crImageCancelSim.gif">
    <INPUT ID="DIV_DeleteText4"  READONLY>
  </DIV>
  <!-- 隠しボタン(選択ボタン) -->
  <DIV ID="DIV_DeleteMenu5" ONMOUSEUP="Fn_OnButton(5);">
    <IMG ID="IMG_DeleteMenu5" SRC="../Bmp/crSelMenu2Plt.gif">
  </DIV>
  <!-- 総数テキスト -->
  <DIV ID="DIV_TextCnt">
  </DIV>
  <!-- ↑ボタン -->
  <IMG ID="IMG_UpBtn_Enable"    SRC="../Bmp/cmUpPage2BtnU.gif"   ONCLICK="Fn_OnButton(11);" ONMOUSEDOWN="Fn_OnButton(12);" ONMOUSEOUT="Fn_OnButton(13);">
  <IMG ID="IMG_UpBtn_Disable"   SRC="../Bmp/cmUpPage2BtnX.gif">
  <!-- ↓ボタン -->
  <IMG ID="IMG_DownBtn_Enable"  SRC="../Bmp/cmDownPage2BtnU.gif" ONCLICK="Fn_OnButton(15);" ONMOUSEDOWN="Fn_OnButton(16);" ONMOUSEOUT="Fn_OnButton(17);">
  <IMG ID="IMG_DownBtn_Disable" SRC="../Bmp/cmDownPage2BtnX.gif">
  <!-- 削除ボタン -->
	<TABLE ID="TABLE_DelBtn"        ONCLICK="Fn_OnButton(21);" ONMOUSEDOWN="Fn_OnButton(22);" ONMOUSEOUT="Fn_OnButton(23);">
		<TR><TD></TD></TR>
	</TABLE>
	<IMG ID="IMG_DelBtn_Enable"  SRC="../Bmp/crStudyDelBtn2U.gif">
	<IMG ID="IMG_DelBtn_Disable" SRC="../Bmp/crStudyDelBtn2X.gif">
	<DIV ID="DIV_DelText"></DIV>
  <!-- 削除キャンセルボタン -->
	<TABLE ID="TABLE_DelCancelBtn"  ONCLICK="Fn_OnButton(31);" ONMOUSEDOWN="Fn_OnButton(32);" ONMOUSEOUT="Fn_OnButton(33);">
		<TR><TD></TD></TR>
	</TABLE>
  <IMG ID="IMG_DelCancelBtn_Enable"   SRC="../Bmp/crStudyCancelBtnU.gif">
  <IMG ID="IMG_DelCancelBtn_Disable"  SRC="../Bmp/crStudyCancelBtnX.gif">
  <DIV ID="DIV_DelCancelText"></DIV>
  <!-- 画像無効化ボタン -->
	<TABLE ID="TABLE_ImgDisableBtn" ONCLICK="Fn_OnButton(41);" ONMOUSEDOWN="Fn_OnButton(42);" ONMOUSEOUT="Fn_OnButton(43);">
		<TR><TD></TD></TR>
	</TABLE>
  <IMG ID="IMG_ImgDisableBtn_Enable"  SRC="../Bmp/crImageCancelBtnU.gif">
  <IMG ID="IMG_ImgDisableBtn_Disable" SRC="../Bmp/crImageCancelBtnX.gif">
  <DIV ID="DIV_ImgDisableText"></DIV>
  <!-- 画像有効化ボタン -->
	<TABLE ID="TABLE_ImgEnableBtn"  ONCLICK="Fn_OnButton(51);" ONMOUSEDOWN="Fn_OnButton(52);" ONMOUSEOUT="Fn_OnButton(53);">
		<TR><TD></TD></TR>
	</TABLE>
  <IMG ID="IMG_ImgEnableBtn_Enable"   SRC="../Bmp/crImageOKBtnU.gif">
  <IMG ID="IMG_ImgEnableBtn_Disable"  SRC="../Bmp/crImageOKBtnX.gif">
  <DIV ID="DIV_ImgEnableText"></DIV>
  <!-- 再撮影ボタン -->
	<TABLE ID="TABLE_ReshotBtn"     ONCLICK="Fn_OnButton(61);" ONMOUSEDOWN="Fn_OnButton(62);" ONMOUSEOUT="Fn_OnButton(63);">
		<TR><TD></TD></TR>
	</TABLE>
  <IMG ID="IMG_ReshotBtn_Enable"    SRC="../Bmp/crReImageBtnU.gif">
  <IMG ID="IMG_ReshotBtn_Disable"   SRC="../Bmp/crReImageBtnX.gif">
  <DIV ID="DIV_ReshotText"></DIV>
  <!-- コマンドボタン領域の色 -->  
  <DIV ID="DIV_CommandBackGround"></DIV>
  <!-- リストとコマンドボタンの境界 -->  
  <IMG ID="IMG_List-Command_Border" SRC="../Bmp/cmBorder.gif">
  <!-- 戻るボタン -->
	<IMG ID="IMG_Cancel_BackGround" SRC="../Bmp/crBtnBack6Plt.gif">
	<TABLE ID="TABLE_CancelBtn"     ONCLICK="Fn_OnButton(91);" ONMOUSEDOWN="Fn_OnButton(92);" ONMOUSEOUT="Fn_OnButton(93);">
		<TR><TD></TD></TR>
	</TABLE>
  <IMG ID="IMG_CancelBtn" SRC="../Bmp/cmOvalAPaleLBtnU.gif">
  <DIV ID="DIV_CancelText">
  </DIV>
  <!-- 修正完了ボタン -->
	<IMG ID="IMG_Update_BackGround" SRC="../Bmp/crBtnBack4Plt.gif">
	<TABLE ID="TABLE_UpdateBtn"     ONCLICK="Fn_OnButton(95);" ONMOUSEDOWN="Fn_OnButton(96);" ONMOUSEOUT="Fn_OnButton(97);">
		<TR><TD></TD></TR>
	</TABLE>
  <IMG ID="IMG_UpdateBtn_Enable"   SRC="../Bmp/cmCirBGreenBtnU.gif">
  <IMG ID="IMG_UpdateBtn_Disable"  SRC="../Bmp/cmCirBGreenBtnX.gif">
  <DIV ID="DIV_UpdateText">
  </DIV>
	<!-- 処理中フレーム -->
  <TABLE ID="TABLE_ProcFrame">
    <TR><TD>
        <!-- 処理中ボックス -->
        <TABLE ID="TABLE_ProcBox">
          <TR><TD ID="TD_ProcText"></TD></TR>
        </TABLE>
    </TD></TR>
	</TABLE>
      <!-- エラーフレーム -->
      <TABLE ID="TABLE_ErrorFrame">
        <TR><TD>
            <!-- 処理中ボックス -->
            <TABLE ID="TABLE_ErrorBox">
              <TR><TD id="TD_ErrorTitle1"><br></TD></TR>
              <TR><TD id="TD_ErrorTitle2"><br></TD></TR>
              <TR><TD id="TD_ErrorText"><br></TD></TR>
              <TR><TD id="TD_ErrorCode"><br></TD></TR>
              <TR><TD><br></TD></TR>
            </TABLE>
            <!-- ボタン -->
            <!-- 070614 HSK山本 PVCS#2209 UPDATE-ST -->
            <!-- <DIV id="DIV_ErrorButton" onmousedown="Public_OnButton(0)"	onmouseup="Public_OnButton(1)" onmouseout="Public_OnButton(1)" onclick="Public_CloseError()"> -->
            <DIV id="DIV_ErrorButton" onmousedown="Public_OnButton(0)"	onmouseup="Public_OnButton(1)" onmouseout="Public_OnButton(1)" onclick="OnClickErrorButton()">
            <!-- 070614 HSK山本 PVCS#2209 UPDATE-ED -->
              <DIV id="DIV_ErrorOkText"></DIV>
              <IMG id="IMG_ErrorButton" src="../Bmp/cmOvalAGreenLBtnU.gif">
            </DIV>
        </TD></TR>
      </TABLE>
    <!-- 確認ダイアログフレーム -->
    <TABLE ID="TABLE_ConfirmFrame">
      <TR><TD></TD></TR>
    </TABLE>
    <!-- ダイアログボックス -->
    <TABLE ID="TABLE_ConfirmBox">
      <TR><TD ID="TD_ConfirmTitle1"></TD></TR>
      <TR><TD ID="TD_ConfirmTitle2"></TD></TR>
      <TR><TD ID="TD_ConfirmText"></TD></TR>
      <TR><TD ID="TD_ConfirmCode"></TD></TR>
      <TR><TD><BR></TD></TR>
      <TR><TD><BR></TD></TR>
    </TABLE>
    <!-- キャンセルボタン -->
    <DIV ID="DIV_ConfirmCancelButton" ONCLICK="Fn_OnButton(121)" ONMOUSEDOWN="Fn_OnButton(122)" ONMOUSEOUT="Fn_OnButton(123)">
      <DIV ID="DIV_ConfirmCancelText"></DIV>
      <IMG ID="IMG_ConfirmCancelButton" SRC="../Bmp/cmOvalAPaleLBtnD.gif">
    </DIV>
    <!-- ＯＫボタン -->
    <DIV ID="DIV_ConfirmOkButton" ONCLICK="Fn_OnButton(111)" ONMOUSEDOWN="Fn_OnButton(112)" ONMOUSEOUT="Fn_OnButton(113)">
      <DIV ID="DIV_ConfirmOkText"></DIV>
      <IMG ID="IMG_ConfirmOkButton" SRC="../Bmp/cmOvalAGreenLBtnU.gif">
    </DIV>
</BODY>
</HTML>