<%@ Page language="c#" Codebehind="SortMenu_View.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.SortMenu_View" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file SortMenu_View.aspx

  @brief 表示順並べ替え画面フレーム

  @author YSK齋藤

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/02  YSK齋藤     V1.0　     新規作成

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
    <META content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
    <META content="C#" name="CODE_LANGUAGE">
    <META content="JavaScript" name="vs_defaultClientScript">
    <META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <META HTTP-EQUIV="Imagetoolbar" CONTENT="no">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/SortMenu_View.css">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/MessageWindow.css">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/SortMenu_View.js"				CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js"				CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"     CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"   CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" CHARSET="UTF-8">
		try{
      var SPOT_CODE_ASPX = 0;                    //スポットコード
      var FILE_NAME_ASPX = "SortMenu_View.aspx"; //ファイル名
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
		  var OpenMode       = <%=OpenMode%>;				// 画面オープンモード
			// 文字列取得
			var CancelText          = "";
			if(OpenMode == OPEN_MODE_CE || OpenMode == OPEN_MODE_WINDOW){
			  CancelText          = top.DispFrame.Public_GetString(32708,"Back")
			}else if(OpenMode == OPEN_MODE_DIALOG){
			  CancelText          = top.DispFrame.Public_GetString(32709,"Close")
			}
			var TopMenuText         = top.DispFrame.Public_GetString(32704,"First");
			var UpMenuText          = top.DispFrame.Public_GetString(32705,"Up");
			var DownMenuText        = top.DispFrame.Public_GetString(32706,"Down");
			var LastMenuText        = top.DispFrame.Public_GetString(32707,"Last");
			var UpdateText          = top.DispFrame.Public_GetString(32710,"Update");
			var ProcString          = top.DispFrame.Public_GetString(32730,"Please Wait...");
			var TotalPageString     = top.DispFrame.Public_GetString(32701,"Total");
			var PageString          = top.DispFrame.Public_GetString(32703,"Page");      
			var MenuString          = top.DispFrame.Public_GetString(32702,"Menu");
			var UserGuidanceString  = top.DispFrame.Public_GetString(32711,"UserGuidance");
      var ConfirmOkString     = top.DispFrame.Public_GetString(32731,"OK");     //"OK"
      var ConfirmCancelString = top.DispFrame.Public_GetString(32732,"Cancel");
// 2005/08/22 Kanno ADD ST タイトルバーの文字列対応
      var TitleString         = top.DispFrame.Public_GetString(32712,"Sort");
// 2005/08/22 Kanno ADD ED タイトルバーの文字列対応
			//サーバ処理後に実行されるクライアントスクリプト
			<%=ClientScript%>;
	  }catch(e){
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
    <DIV ID="DIV_SortMenu1" ONMOUSEUP="Fn_OnButton(1);">
      <IMG   ID="IMG_SortMenu1"    SRC="../Bmp/crUnSelMenu2Plt.gif">
      <DIV   ID="DIV_SortFilm1"></DIV>
      <IMG   ID="IMG_DeleteImage1" SRC="../Bmp/crImageDelSim.gif">
      <INPUT ID="DIV_SortText1" READONLY>
    </DIV>
    <!-- 撮影メニュー２ -->
    <DIV ID="DIV_SortMenu2" ONMOUSEUP="Fn_OnButton(2);">
      <IMG   ID="IMG_SortMenu2"    SRC="../Bmp/crUnSelMenu2Plt.gif">
      <DIV   ID="DIV_SortFilm2"></DIV>
      <IMG   ID="IMG_DeleteImage2" SRC="../Bmp/crImageDelSim.gif">
      <INPUT ID="DIV_SortText2" READONLY>
    </DIV>
    <!-- 撮影メニュー３ -->
    <DIV ID="DIV_SortMenu3" ONMOUSEUP="Fn_OnButton(3);">
      <IMG   ID="IMG_SortMenu3"    SRC="../Bmp/crUnSelMenu2Plt.gif">
      <DIV   ID="DIV_SortFilm3"></DIV>
      <IMG   ID="IMG_DeleteImage3" SRC="../Bmp/crImageDelSim.gif">
      <INPUT ID="DIV_SortText3" READONLY>
    </DIV>
    <!-- 撮影メニュー４ -->
    <DIV ID="DIV_SortMenu4" ONMOUSEUP="Fn_OnButton(4);">
      <IMG   ID="IMG_SortMenu4"    SRC="../Bmp/crUnSelMenu2Plt.gif">
      <DIV   ID="DIV_SortFilm4"></DIV>
      <IMG   ID="IMG_DeleteImage4" SRC="../Bmp/crImageDelSim.gif">
      <INPUT ID="DIV_SortText4" READONLY>
    </DIV>
    <!-- 隠しボタン(選択ボタン) -->
    <DIV ID="DIV_SortMenu5" ONMOUSEUP="Fn_OnButton(5);">
      <IMG ID="IMG_SortMenu5"    SRC="../Bmp/crSelMenu2Plt.gif">
    </DIV>
    <!-- 総数テキスト -->
    <DIV ID="DIV_TextCnt"></DIV>
		<!-- ↑ボタン -->
		<IMG ID="IMG_UpBtn_Enable"    SRC="../Bmp/cmUpPage2BtnU.gif"   ONCLICK="Fn_OnButton(11);" ONMOUSEDOWN="Fn_OnButton(12);" ONMOUSEOUT="Fn_OnButton(13);">
		<IMG ID="IMG_UpBtn_Disable"   SRC="../Bmp/cmUpPage2BtnX.gif">
		<!-- ↓ボタン -->
		<IMG ID="IMG_DownBtn_Enable"  SRC="../Bmp/cmDownPage2BtnU.gif" ONCLICK="Fn_OnButton(15);" ONMOUSEDOWN="Fn_OnButton(16);" ONMOUSEOUT="Fn_OnButton(17);">
		<IMG ID="IMG_DownBtn_Disable" SRC="../Bmp/cmDownPage2BtnX.gif">
    <!-- 先頭へボタン -->
		<TABLE ID="TABLE_TopMenuBtn"  ONCLICK="Fn_OnButton(21);" ONMOUSEDOWN="Fn_OnButton(22);" ONMOUSEOUT="Fn_OnButton(23);">
			<TR><TD></TD></TR>
		</TABLE>
    <IMG SRC="../Bmp/crTopImageBtnU.gif"  ID="IMG_TopMenuBtn_Enable">
    <IMG SRC="../Bmp/crTopImageBtnX.gif" ID="IMG_TopMenuBtn_Disable">
    <DIV ID="DIV_TopMenuText"></DIV>
    <!-- 上へボタン -->
		<TABLE ID="TABLE_UpMenuBtn"   ONCLICK="Fn_OnButton(31);" ONMOUSEDOWN="Fn_OnButton(32);" ONMOUSEOUT="Fn_OnButton(33);">
			<TR><TD></TD></TR>
		</TABLE>
    <IMG SRC="../Bmp/crUpImageBtnU.gif"  ID="IMG_UpMenuBtn_Enable">
    <IMG SRC="../Bmp/crUpImageBtnX.gif" ID="IMG_UpMenuBtn_Disable">
    <DIV ID="DIV_UpMenuText"></DIV>
    <!-- 下へボタン -->
		<TABLE ID="TABLE_DownMenuBtn" ONCLICK="Fn_OnButton(41);" ONMOUSEDOWN="Fn_OnButton(42);" ONMOUSEOUT="Fn_OnButton(43);">
			<TR><TD></TD></TR>
		</TABLE>
    <IMG SRC="../Bmp/crDownImageBtnU.gif"  ID="IMG_DownMenuBtn_Enable">
    <IMG SRC="../Bmp/crDownImageBtnX.gif" ID="IMG_DownMenuBtn_Disable">
    <DIV ID="DIV_DownMenuText"></DIV>
    <!-- 最後へボタン -->
		<TABLE ID="TABLE_LastMenuBtn" ONCLICK="Fn_OnButton(51);" ONMOUSEDOWN="Fn_OnButton(52);" ONMOUSEOUT="Fn_OnButton(53);">
			<TR><TD></TD></TR>
		</TABLE>
    <IMG SRC="../Bmp/crBottomImageBtnU.gif"  ID="IMG_LastMenuBtn_Enable">
    <IMG SRC="../Bmp/crBottomImageBtnX.gif" ID="IMG_LastMenuBtn_Disable">
    <DIV ID="DIV_LastMenuText"></DIV>

		<!-- コマンドボタン領域の色 -->  
		<DIV ID="DIV_CommandBackGround"></DIV>    
    <!-- リストとコマンドボタンの境界 -->  
    <IMG SRC="../Bmp/cmBorder.gif" ID="IMG_List-Command_Border">
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
		<TABLE ID="TABLE_UpdateBtn" ONCLICK="Fn_OnButton(95);" ONMOUSEDOWN="Fn_OnButton(96);" ONMOUSEOUT="Fn_OnButton(97);">
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
