<%@ Page language="c#" Codebehind="ChangeImg_View.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.ChangeImg_View" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
<%
/****************************************************************************

  @file ChangeImg_View.aspx

  @brief 画像入れ替え画面フレーム

  @author YSK齋藤

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/01  YSK齋藤     V1.0       新規作成

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
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/ChangeImg_View.css">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/MessageWindow.css">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/ChangeImg_View.js"       CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js"        CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/ChangeDBDateFormat.js"   CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/ChangeDateFormatDef.js"  CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"            CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"     CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"   CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" CHARSET="UTF-8">
		try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "ChangeImg_View.aspx"  //ファイル名
			//各変数は.jsにて宣言済み
			//画像ファイルのパス名を取得
			IMAGE_FILE_PATH    = "<%=ImageFilePath%>";
      //フォント名を取得
      FONT_NAME          = "<%=FontName%>";
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
			var OpenMode       = <%=OpenMode%>;
			// 文字列取得
			var CancelText="";
			if(OpenMode == OPEN_MODE_CE || OpenMode == OPEN_MODE_WINDOW){
				CancelText = top.DispFrame.Public_GetString(32664,"Back");
			}else if(OpenMode == OPEN_MODE_DIALOG){
				CancelText = top.DispFrame.Public_GetString(32665,"Close");
			} 
			var ChangeText          = top.DispFrame.Public_GetString(32663,"Change Image");
			var UpdateText          = top.DispFrame.Public_GetString(32666,"Update");
			var UserGuidanceString  = top.DispFrame.Public_GetString(32667,"Please select 2 taking a picture menus thareplace the image,and push the image replacement buton.");
			var TotalPageString     = top.DispFrame.Public_GetString(32660,"Total");
			var PageString          = top.DispFrame.Public_GetString(32662,"Page");      
			var MenuString          = top.DispFrame.Public_GetString(32661,"Menu");
			var UpdateString        = top.DispFrame.Public_GetString(32730,"Please wait...");
      var ConfirmOkString     = top.DispFrame.Public_GetString(32731,"OK");     //"OK"
      var ConfirmCancelString = top.DispFrame.Public_GetString(32732,"Cancel");
//			var RetryString         = top.DispFrame.Public_GetLangMsgString(31514,"UnTo cannnot be replaced mutually.");
// 2005/08/22 Kanno ADD ST タイトルバーの文字列対応
			var TitleString         = top.DispFrame.Public_GetString(32668,"Change Image");    // タイトル
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
    <DIV ID="DIV_ChangeImg1" ONMOUSEUP="Fn_OnButton(1);">
      <IMG SRC="../Bmp/crStudyUnSelPlt.gif" ID="IMG_ChangeImg1">
      <IMG SRC="../Bmp/crStudySelPlt.gif"   ID="IMG_SelectMenu1">
      <IMG SRC="../Bmp/crImageDelSim.gif"   ID="IMG_DeleteImage1">
      <DIV   ID="DIV_ChangeFilm1"></DIV>
      <INPUT ID="DIV_ChangeText1" READONLY>
    </DIV>
    <!-- 撮影メニュー２ -->
    <DIV ID="DIV_ChangeImg2" ONMOUSEUP="Fn_OnButton(2);">
      <IMG SRC="../Bmp/crStudyUnSelPlt.gif" ID="IMG_ChangeImg2">
      <IMG SRC="../Bmp/crStudySelPlt.gif"   ID="IMG_SelectMenu2">
      <IMG SRC="../Bmp/crImageDelSim.gif"   ID="IMG_DeleteImage2">
      <DIV   ID="DIV_ChangeFilm2"></DIV>
      <INPUT ID="DIV_ChangeText2" READONLY>
    </DIV>
    <!-- 撮影メニュー３ -->
    <DIV ID="DIV_ChangeImg3" ONMOUSEUP="Fn_OnButton(3);">
      <IMG SRC="../Bmp/crStudyUnSelPlt.gif" ID="IMG_ChangeImg3">
      <IMG SRC="../Bmp/crStudySelPlt.gif"   ID="IMG_SelectMenu3">
      <IMG SRC="../Bmp/crImageDelSim.gif"   ID="IMG_DeleteImage3">
      <DIV   ID="DIV_ChangeFilm3"></DIV>
      <INPUT ID="DIV_ChangeText3" READONLY>
    </DIV>
    <!-- 撮影メニュー４ -->
    <DIV ID="DIV_ChangeImg4" ONMOUSEUP="Fn_OnButton(4);">
      <IMG SRC="../Bmp/crStudyUnSelPlt.gif" ID="IMG_ChangeImg4">
      <IMG SRC="../Bmp/crStudySelPlt.gif"   ID="IMG_SelectMenu4">
      <IMG SRC="../Bmp/crImageDelSim.gif"   ID="IMG_DeleteImage4">
      <DIV ID="DIV_ChangeFilm4"></DIV>
      <INPUT ID="DIV_ChangeText4" READONLY>
    </DIV>
    <!-- 総数テキスト -->
    <DIV ID="DIV_TextCnt">
    </DIV>
    <!-- ↑ボタン -->
    <DIV ID="DIV_UpBtn">
      <IMG SRC="../Bmp/cmUpPage2BtnU.gif" ID="IMG_UpBtn_Enable" ONMOUSEUP="Fn_OnButton(11);" ONMOUSEDOWN="Fn_OnButton(12);" ONMOUSEOUT="Fn_OnButton(13);">
      <IMG SRC="../Bmp/cmUpPage2BtnX.gif" ID="IMG_UpBtn_Disable">
    </DIV>
    <!-- ↓ボタン -->
    <DIV ID="DIV_DownBtn">
      <IMG SRC="../Bmp/cmDownPage2BtnU.gif" ID="IMG_DownBtn_Enable" ONMOUSEUP="Fn_OnButton(15);" ONMOUSEDOWN="Fn_OnButton(16);" ONMOUSEOUT="Fn_OnButton(17);">
      <IMG SRC="../Bmp/cmDownPage2BtnX.gif" ID="IMG_DownBtn_Disable">
    </DIV>
    <!-- 画像入れ替えボタン -->
	  <TABLE ID="TABLE_ChangeImgBtn" ONCLICK="Fn_OnButton(21);" ONMOUSEDOWN="Fn_OnButton(22);" ONMOUSEOUT="Fn_OnButton(23);">
		  <TR><TD></TD></TR>
	  </TABLE>
      <IMG SRC="../Bmp/crImageChgBtn2U.gif"  ID="IMG_ChangeImgBtn_Enable">
      <IMG SRC="../Bmp/crImageChgBtn2X.gif" ID="IMG_ChangeImgBtn_Disable">
      <DIV ID="DIV_ChangeText">
      </DIV>
		<!-- コマンドボタン領域の色 -->  
		<DIV ID="DIV_CommandBackGround"></DIV>    
    <!-- リストとコマンドボタンの境界 -->  
    <IMG SRC="../Bmp/cmBorder.gif" ID="IMG_List-Command_Border">
    <!-- 戻るボタン -->
  	<IMG ID="IMG_Cancel_BackGround" SRC="../Bmp/crBtnBack6Plt.gif">
    <DIV ID="DIV_CancelBtn"  ONCLICK="Fn_OnButton(91);" ONMOUSEDOWN="Fn_OnButton(92);" ONMOUSEOUT="Fn_OnButton(93);">
      <IMG SRC="../Bmp/cmOvalAPaleLBtnU.gif" ID="IMG_CancelBtn">
      <DIV ID="DIV_CancelText">
      </DIV>
    </DIV>
    <!-- 修正完了ボタン -->
  	<IMG ID="IMG_Update_BackGround" SRC="../Bmp/crBtnBack4Plt.gif">
	  <TABLE ID="TABLE_UpdateBtn" ONCLICK="Fn_OnButton(95);" ONMOUSEDOWN="Fn_OnButton(96);" ONMOUSEOUT="Fn_OnButton(97);">
		  <TR><TD></TD></TR>
	  </TABLE>
    <IMG ID="IMG_UpdateBtn_Enable"  SRC="../Bmp/cmCirBGreenBtnU.gif">
    <IMG ID="IMG_UpdateBtn_Disable" SRC="../Bmp/cmCirBGreenBtnX.gif">
    <DIV ID="DIV_UpdateText"></DIV>
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
            <!-- エラーボックス -->
            <TABLE ID="TABLE_ErrorBox">
              <TR><TD id="TD_ErrorTitle1"><br></TD></TR>
              <TR><TD id="TD_ErrorTitle2"><br></TD></TR>
              <TR><TD id="TD_ErrorText"><br></TD></TR>
              <TR><TD id="TD_ErrorCode"><br></TD></TR>
              <TR><TD><br></TD></TR>
            </TABLE>
            <!-- ボタン -->
            <DIV id="DIV_ErrorButton" onmousedown="Public_OnButton(0)"	onmouseup="Public_OnButton(1)" onmouseout="Public_OnButton(1)" onclick="Public_CloseError()">
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
      <IMG ID="IMG_ConfirmCancelButton" SRC="../Bmp/cmOvalAPaleLBtnU.gif">
    </DIV>
    <!-- ＯＫボタン -->
    <DIV ID="DIV_ConfirmOkButton" ONCLICK="Fn_OnButton(111)" ONMOUSEDOWN="Fn_OnButton(112)" ONMOUSEOUT="Fn_OnButton(113)">
      <DIV ID="DIV_ConfirmOkText"></DIV>
      <IMG ID="IMG_ConfirmOkButton" SRC="../Bmp/cmOvalAGreenLBtnU.gif">
    </DIV>
  </BODY>
</HTML>
