<%@ Page language="c#" Codebehind="RegAddMenu_View.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.RegAddMenu_View" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file RegAddMenu_View.aspx

  @brief 撮影メニュー画面フレーム

  @author YSK田中

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/18  YSK田中　     V1.0       新規作成

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
		<TITLE></TITLE>
		<META CONTENT="Microsoft Visual Studio .NET 7.1" NAME="GENERATOR">
		<META CONTENT="C#" NAME="CODE_LANGUAGE">
		<META CONTENT="JavaScript" NAME="vs_defaultClientScript">
		<META CONTENT="http://schemas.microsoft.com/intellisense/ie5" NAME="vs_targetSchema">
		<LINK HREF="./CSS/AddMenu_View.css"  TYPE="text/css" REL="stylesheet">
		<LINK HREF="./CSS/MessageWindow.css" TYPE="text/css" REL="stylesheet">
		<SCRIPT LANGUAGE="JavaScript" SRC="./Include/Cookie.js"          CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="./Include/RegAddMenu_View.js" CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="./Include/MessageWindow.js"   CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"     CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"   CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript">
		<!--
		try{
      var SPOT_CODE_ASPX = 0;               //スポットコード
      var FILE_NAME_ASPX = "RegAddMenu_View.aspx"  //ファイル名

			ProcMode                     = <%=Mode%>;
			IMAGE_FILE_PATH	             = "<%=ImageFilePath%>";		//画像ファイルのパス
      //フォント名を取得
      FONT_NAME                    = "<%=FontName%>";
      // 2005/06/23 017 H.SAITO デザイン変更対応(フォントサイズ）
      ////フォントサイズを取得
      //FONT_SIZE                    = "<%=FontSize%>";
      // フォントサイズ(表示グループ)
      FONT_SIZE_GROUP              = "<%=FontSize_Group%>";
      // フォントサイズ(メニュー選択時のメニュー一覧)
      FONT_SIZE_GROUP_LIST         = "<%=FontSize_Group_List%>";
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
			// 画面オープンモード取得
			var OpenMode                 = <%=OpenMode%>;

			// 文字列取得
			if(ProcMode == PROC_MODE_REGIST)
			{
				var ButtonBack             = top.DispFrame.Public_GetString(32604,"Back");
				var ButtonStudy            = top.DispFrame.Public_GetString(32606,"Start Study");
				var ButtonRegist           = top.DispFrame.Public_GetString(32607,"Register");
        // 2005/07/20 003 H.SAITO 不要のため削除
			  //var ExclusiveRuError       = top.DispFrame.Public_GetLangMsgString(31522,"");//"他の画面で検査実施中です。\n再施行しますか。";
			  //var ExclusiveStudyError    = top.DispFrame.Public_GetLangMsgString(31521,"");//"他の画面で 検査/修正 操作実施中です。\n再施行しますか。";
			}
			else{
        if(OpenMode == OPEN_MODE_CE || OpenMode == OPEN_MODE_WINDOW){
  				var ButtonBack             = top.DispFrame.Public_GetString(32604,"Back");
        }else{
  				var ButtonBack             = top.DispFrame.Public_GetString(32605,"Close");
        }
				var ButtonNext             = top.DispFrame.Public_GetString(32608,"Update");
			}
			var TotalString              = top.DispFrame.Public_GetString(32600,"Total");//"ﾄｰﾀﾙ";
			var PageString               = top.DispFrame.Public_GetString(32602,"Page");//"ﾍﾟｰｼﾞ";      
			var MenuString               = top.DispFrame.Public_GetString(32601,"Menu");//"ﾒﾆｭｰ";

			var ProcString               = top.DispFrame.Public_GetString(32730,"Please wait...");//"お待ちください...";
			var ButtonDelete             = top.DispFrame.Public_GetString(32603,"Delete");//"取り消し";

			var UserGuidanceStringRegist = top.DispFrame.Public_GetString(32609,'Please register the menu of which it takes a picture and push "Registry" button.');//"撮影するメニューを登録し「登録」ボタンを押してください。";
			var UserGuidanceStringAdd    = top.DispFrame.Public_GetString(32610,'Please register the added menu and push "Update"');//"追加するメニューを登録し「登録」ボタンを押してください。";
			var UserGuidanceStringChange = top.DispFrame.Public_GetString(32611,'Please select the reserved taking a picture menu and select the taking a picture menu that wants to change.');//"予約済みの撮影メニューを選択し、変更したい撮影メニューを選択してください。";
      var ConfirmOkString          = top.DispFrame.Public_GetString(32731,"OK");//"OK"
      var ConfirmCancelString      = top.DispFrame.Public_GetString(32732,"Cancel");//"Cancel";
// 2005/08/22 Kanno ADD ST タイトルバーの文字列対応
      var TitleStringAdd           = top.DispFrame.Public_GetString(32612,"Add Menu");//"メニュー追加のタイトル";
      var TitleStringChange        = top.DispFrame.Public_GetString(32613,"Change Menu");//""メニュー変更のタイトル";
// 2005/08/22 Kanno ADD ED タイトルバーの文字列対応
			//エラー処理関数を呼び出す      
			<%=ClientScript%>
	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
		//-->
		</SCRIPT>
	</HEAD>
	<BODY ID="BODY" ONLOAD="Fn_InitPage();" ONSELECTSTART="return false;" ONDRAG="return false;" oncontextmenu="return false;">
<!-- 2005/05/24-ST //-->
    <!-- ヘッダ -->
    <DIV ID="DIV_AddMenu_Header"></DIV> 
    <!-- リスト縁左（灰）-->
    <DIV ID="DIV_BackGround_1"></DIV> 
    <!-- リスト縁左（灰）-->
    <DIV ID="DIV_BackGround_2"></DIV> 
    <!-- リスト縁左（灰）-->
    <DIV ID="DIV_BackGround_3"></DIV> 
    <!-- リスト縁左（灰）-->
    <DIV ID="DIV_BackGround_4"></DIV> 
    <!-- リスト縁左（灰）-->
    <DIV ID="DIV_BackGround_5"></DIV> 
    <!-- リスト縁左（灰）-->
    <DIV ID="DIV_BackGround_6"></DIV> 
    <!-- リスト縁左（灰）-->
    <DIV ID="DIV_BackGround_7"></DIV> 
<!-- 2005/05/24-ED //-->
		<!-- グループメニュー(８件) -->
		<% for(int i = 0; i < 8; i++){ %>				
			<DIV ID="divPart<%=i%>" ONMOUSEDOWN="fnChangeMenu(<%=i%>);"></DIV>
			<IMG ID="imgPart<%=i%>" ONMOUSEDOWN="fnChangeMenu(<%=i%>);" SRC="../Bmp/crBuiMenuBtnU.gif">
		<%}%>
		<!-- グループメニュー選択ボタン（隠しボタン）-->
		<IMG ID="imgPartBtn"			    SRC="../Bmp/crBuiMenuBtnD.gif"   ONMOUSEDOWN="fnChangeMenuBtn();" >

		<!-- ↑ボタン(グループメニュー) -->
		<IMG ID="imgPartUp_Enable"		SRC="../Bmp/cmUpPageBtnU.gif"		ONCLICK="Fn_OnButton(40)" ONMOUSEDOWN="Fn_OnButton(41);" ONMOUSEOUT="Fn_OnButton(42);">
		<IMG ID="imgPartUp_Disable"		SRC="../Bmp/cmUpPageBtnX.gif">

		<!-- ↓ボタン(グループメニュー) -->
		<IMG ID="imgPartDown_Enable"  SRC="../Bmp/cmDownPageBtnU.gif"	ONCLICK="Fn_OnButton(45)" ONMOUSEDOWN="Fn_OnButton(46);" ONMOUSEOUT="Fn_OnButton(47);">
		<IMG ID="imgPartDown_Disable" SRC="../Bmp/cmDownPageBtnX.gif">

		<!-- 撮影メニュー(２４件) -->
		<% for(int i = 0; i < 24; i++){%>
		<TABLE ID="TABLE_MenuImageBtn<%=i%>" ONCLICK="fnClickFilmMenu(<%=i%>);" ONMOUSEDOWN="MenuImageChangeDown(<%=i%>);" ONMOUSEOUT="MenuImageChangeUp(<%=i%>);" ONMOUSEUP="MenuImageChangeUp(<%=i%>);">
			<TR><TD></TD></TR>
		</TABLE>
		<TABLE ID="TABLE_MenuImage<%=i%>">
			<TR VALIGN="MIDDLE">
			  <TD ID="divMenu<%=i%>" STYLE="FONT-SIZE:<%=FontSize%>;"></TD>
			</TR>
		</TABLE>
		<IMG ID="imgMenu<%=i%>" SRC="../Bmp/crShotMenuBtnU.gif">
		<%}%>
		<!-- 撮影メニューページ数 -->
		<DIV ID="divMaxMenu"></DIV>
		<DIV ID="divMaxMenuCount"></DIV>
		<!-- ↑ボタン(撮影メニュー) -->
		<IMG ID="imgMenuUp_Enable"		SRC="../Bmp/cmUpPageBtnU.gif"   ONCLICK="Fn_OnButton(50);" ONMOUSEDOWN="Fn_OnButton(51);" ONMOUSEOUT="Fn_OnButton(52);">
		<IMG ID="imgMenuUp_Disable"		SRC="../Bmp/cmUpPageBtnX.gif">
		<!-- ↓ボタン(撮影メニュー) -->
		<IMG ID="imgMenuDown_Enable"	SRC="../Bmp/cmDownPageBtnU.gif" ONCLICK="Fn_OnButton(55);" ONMOUSEDOWN="Fn_OnButton(56);" ONMOUSEOUT="Fn_OnButton(57);">
		<IMG ID="imgMenuDown_Disable" SRC="../Bmp/cmDownPageBtnX.gif">

		<!-- 撮影メニューリスト背景 -->
		<DIV ID="DIV_AddMenu_BackGround"></DIV>

		<!-- 撮影メニューリスト１ -->
		<DIV ID="DIV_AddMenu0" ONMOUSEUP="IMG_AddMenuClick(0,0);">
			<IMG   ID="IMG_AddMenu0"		 SRC="../Bmp/crUnSelMenuPlt.gif">
			<DIV   ID="DIV_AddFilm0"></DIV>
			<IMG   ID="IMG_DeleteImage0" SRC="../Bmp/crImageDelSim.gif">
			<INPUT ID="DIV_AddText0" READONLY>
		</DIV>
		<!-- 撮影メニューリスト２ -->
		<DIV ID="DIV_AddMenu1" ONMOUSEUP="IMG_AddMenuClick(1,0);">
			<IMG   ID="IMG_AddMenu1"		 SRC="../Bmp/crUnSelMenuPlt.jpg">
			<DIV   ID="DIV_AddFilm1"></DIV>
			<IMG   ID="IMG_DeleteImage1" SRC="../Bmp/crImageDelSim.gif">
			<INPUT ID="DIV_AddText1" READONLY>
		</DIV>
		<!-- 撮影メニューリスト３ -->
		<DIV ID="DIV_AddMenu2" ONMOUSEUP="IMG_AddMenuClick(2,0);">
			<IMG   ID="IMG_AddMenu2"		 SRC="../Bmp/crUnSelMenuPlt.jpg">
			<DIV   ID="DIV_AddFilm2"></DIV>
			<IMG   ID="IMG_DeleteImage2" SRC="../Bmp/crImageDelSim.gif">
			<INPUT ID="DIV_AddText2" READONLY>
		</DIV>
		<!-- 撮影メニューリスト４ -->
		<DIV ID="DIV_AddMenu3" ONMOUSEUP="IMG_AddMenuClick(3,0);">
			<IMG   ID="IMG_AddMenu3"		 SRC="../Bmp/crUnSelMenuPlt.jpg">
			<DIV   ID="DIV_AddFilm3"></DIV>
			<IMG   ID="IMG_DeleteImage3" SRC="../Bmp/crImageDelSim.gif">
			<INPUT ID="DIV_AddText3" READONLY>
		</DIV>

		<!-- メニューリストページ数 -->
    <!-- 2005/06/23 002 H.SAITO デザイン変更対応(フォントサイズ)[メニューリストページ数の背景追加] -->
		<DIV ID="divMaxListBg"></DIV>
		<DIV ID="divMaxList"></DIV>
		<!-- ↑ボタン(メニューリスト) -->
		<IMG ID="MenuListUp_Enable"	   SRC="../Bmp/cmUpPageBtnU.gif"		ONCLICK="Fn_OnButton(60);" ONMOUSEDOWN="Fn_OnButton(61);" ONMOUSEOUT="Fn_OnButton(62);">
		<IMG ID="MenuListUp_Disable"	 SRC="../Bmp/cmUpPageBtnX.gif">
		<!-- ↓ボタン(メニューリスト) -->
		<IMG ID="MenuListDown_Enable"  SRC="../Bmp/cmDownPageBtnU.gif" ONCLICK="Fn_OnButton(65);" ONMOUSEDOWN="Fn_OnButton(66);" ONMOUSEOUT="Fn_OnButton(67);">
		<IMG ID="MenuListDown_Disable" SRC="../Bmp/cmDownPageBtnX.gif">
		<!-- 取消ボタン -->
		<TABLE ID="TABLE_Delete" ONCLICK="Fn_OnButton(0);" ONMOUSEDOWN="Fn_OnButton(1);" ONMOUSEOUT="Fn_OnButton(2);">
			<TR><TD></TD></TR>
		</TABLE>
		<DIV ID="divDelete"></DIV>
		<IMG ID="MenuDelete_Enable"  SRC="../Bmp/crUndoBtnU.gif">
		<IMG ID="MenuDelete_Disable" SRC="../Bmp/crUndoBtnX.gif">
			<!-- 修正時のボタン遷移//-->
			<!-- 登録時のボタン遷移//-->
			<!-- デフォルトエリア -->
    <SCRIPT LANGUAGE="JavaScript">
    <!--			
    // 処理モードでボタン変更
    //登録モードの場合
    if(ProcMode == PROC_MODE_REGIST){
      //背景
 	    document.write("  <IMG id='imgRegist' src='../Bmp/crBtnBackPlt.gif'>\n");
      //戻るボタン
	    document.write("<div id='divRegistBack' onclick='Fn_OnButton(75)' onmousedown='Fn_OnButton(76)' onmouseout='Fn_OnButton(77)'>\n");
	    document.write("  <IMG id='imgRegistBack' src='../Bmp/cmOvalAPaleSBtnU.gif'>\n");
	    document.write("  <div id='divRegistBack_Value'></div>\n");
	    document.write("</div>\n");
      //検査開始ボタン
	    document.write("<TABLE id='TABLE_RegistStart' onclick='Fn_OnButton(80)' onmousedown='Fn_OnButton(81)' onmouseout='Fn_OnButton(82)'><TR><TD></TD></TR></TABLE>\n");
	    document.write("  <IMG id='imgRegistStart_Enable' src='../Bmp/cmCirBblueBtnU.gif'>\n");
	    document.write("  <IMG id='imgRegistStart_Disable' src='../Bmp/cmCirBblueBtnX.gif'>\n");
	    document.write("  <div id='divRegistStart_Value'></div>\n");
      //登録ボタン
	    document.write("<TABLE id='TABLE_RegistNext' onclick='Fn_OnButton(85)' onmousedown='Fn_OnButton(86)' onmouseout='Fn_OnButton(87)'><TR><TD></TD></TR></TABLE>\n");
	    document.write("  <IMG id='imgRegistNext_Enable' src='../Bmp/cmCirBGreenBtnU.gif'>\n");
	    document.write("  <IMG id='imgRegistNext_Disable' src='../Bmp/cmCirBGreenBtnX.gif'>\n");
	    document.write("  <div id='divRegistNext_Value'></div>\n");
    }
    else{
	    document.write("<IMG id='imgModify' src='../Bmp/crBtnBack2Plt.gif'>\n");
      //戻るボタン
	    document.write("<div id='divModifyBack' onclick='Fn_OnButton(90)' onmousedown='Fn_OnButton(91)' onmouseout='Fn_OnButton(92)'>\n");
      document.write("  <IMG id='imgModifyBack' src='../Bmp/cmOvalAPaleLBtnU.gif'>\n");
	    document.write("  <div id='divModifyBack_Value'></div>\n");
	    document.write("</div>\n");
      //修正完了ボタン
	    document.write("<TABLE id='TABLE_ModifyNext' onclick='Fn_OnButton(95)' onmousedown='Fn_OnButton(96)' onmouseout='Fn_OnButton(97)'><TR><TD></TD></TR></TABLE>\n");
    	document.write("  <IMG id='imgModifyNext_Enable' src='../Bmp/cmCirBGreenBtnU.gif'>\n");
    	document.write("  <IMG id='imgModifyNext_Disable' src='../Bmp/cmCirBGreenBtnX.gif'>\n");
	    document.write("  <div id='divModifyNext_Value'></div>\n");
    }
    //-->
    </SCRIPT>
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
    <DIV ID="DIV_ConfirmCancelButton" ONCLICK="Fn_OnButton(35)" ONMOUSEDOWN="Fn_OnButton(36)" ONMOUSEOUT="Fn_OnButton(37)">
      <DIV ID="DIV_ConfirmCancelText"></DIV>
      <IMG ID="IMG_ConfirmCancelButton" SRC="../Bmp/cmOvalAPaleLBtnU.gif">
    </DIV>
    <!-- ＯＫボタン -->
    <DIV ID="DIV_ConfirmOkButton" ONCLICK="Fn_OnButton(25)" ONMOUSEDOWN="Fn_OnButton(26)" ONMOUSEOUT="Fn_OnButton(27)">
      <DIV ID="DIV_ConfirmOkText"></DIV>
      <IMG ID="IMG_ConfirmOkButton" SRC="../Bmp/cmOvalAGreenLBtnU.gif">
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
	</BODY>
</HTML>
