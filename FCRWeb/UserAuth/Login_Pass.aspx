<%@ Page language="c#" Codebehind="Login_Pass.aspx.cs" AutoEventWireup="false" Inherits="UserAuth.Login_Pass" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file UserAuth\Login_Pass.aspx

  @brief Login_Pass

  @author HSK山本

  Copyright(C) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応
  @date  07/01/09  HSK古場     V1.4       操作性向上メモリリーク対策
  @date  07/04/17  HSK山本     V2.0       PVCS#1671
  @date  07/06/01  HSK山本     V2.0       PVCS#2296対応

/****************************************************************************/
%>
<HTML>
  <HEAD>
    <TITLE>パスワード入力画面</TITLE>
    <%
/* キャッシュ制御を停止 */
Response.CacheControl = "no-cache";
Response.AddHeader("Pragma","no-cache");
Response.Expires = -1;
%>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="Thu, 01 Dec 1994 16:00:00 GMT">
    <META CONTENT="Microsoft Visual Studio .NET 7.1" NAME="GENERATOR">
    <META CONTENT="C#" NAME="CODE_LANGUAGE">
    <META CONTENT="JavaScript" NAME="vs_defaultClientScript">
    <META CONTENT="http://schemas.microsoft.com/intellisense/ie5" NAME="vs_targetSchema">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/UserAuth.css">
    <SCRIPT LANGUAGE="javascript" SRC="./Include/Login_Pass.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="javascript" SRC="./Include/ImageButton.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="javascript" SRC="../SoftKeyBoard/Include/KeyBoardInputtext.js" CHARSET="UTF-8"></SCRIPT>
    <script language="javascript" src="./Include/Control.js" charset="UTF-8"></script>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/KeyControl.js" CHARSET="UTF-8"></SCRIPT> <%-- 061002 Kandachi --%>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/KeyControlMainError.js" CHARSET="UTF-8"></SCRIPT> <%-- 061002 Kandachi --%>
    <SCRIPT LANGUAGE="javascript">
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
		var url = "<%=url%>";
		
        //**********************************************************************
        //  CR検査操作性向上(キーボード操作)に必要なページロード時の処理をする 
        //  061002 S1 神立  V1.4
        //**********************************************************************
        function InitKeyControl(){
            try{
                // 変数宣言 ====================================================
                // ログ用の変数
                var LOGIN_PASS_ASPX = "Login_Pass.aspx"; // ログ用のファイル名
                var MSG_ID_BASE     = 10300;             // ユーザー認証部は1x300番台のイベントID
                
                // Login_Pass.aspx内のコントロール -----------------------
                // ボタンイメージのパス
                var PATH_LOGIN_BTN_F = "../Bmp/cmCirBGreenBtnF.gif";
                var PATH_LOGIN_BTN_U = "../Bmp/cmCirBGreenBtnU.gif";
                var PATH_BACK_BTN_F  = "../Bmp/cmOvalAPaleLBtnF.gif";
                var PATH_BACK_BTN_U  = "../Bmp/cmOvalAPaleLBtnU.gif";
                // テキストボックス
                var txtBox      = document.getElementById("txtPassword");
                // ログインボタン
                var loginBtn    = document.getElementById("btnLogin");
                var loginBtnImg = document.getElementById("imgLogin");
                var loginBtnLbl = document.getElementById("lblLogin");
                // 戻るボタン
                var backBtn     = document.getElementById("btnBack");
                var backBtnImg  = document.getElementById("imgBack");
                var backBtnLbl  = document.getElementById("lblBack");
                // Main.aspxのエラー画面
                var mainErrorFrameName  = "TABLE_MainErrorFrame";
                
                // グローバル変数を初期化 =======================================
                groupHolder = [];
                msgIdBase   = MSG_ID_BASE; 

                // Login_Pass.aspx内のプロパティ・イベント定義===================
                // キーボード操作でクリックできるようにする ----------------
                EnableClick(loginBtn);
                EnableClick(backBtn);
                
                // テキストボックスでEnterを押した時の処理 -----------------
                // → この画面はもともとEnter押下で次の画面に進むので不要

                // フォーカス制御  -----------------------------------------
                // ①フォーカスが当たった時・離れた時のイベントハンドラを追加する。 
                // ②プロパティを持たせる
                // ③ボタン上の文字などをクリックした時にもフォーカスが外れないようにする。

                // テキストボックス
                // ① 
                EnableTxtLeave(txtBox);
                // ②
                txtBox.display = txtBox;

                // [ログイン]ボタン
                // ① 
                function FocusLogin(){
                    SetImageUrl(loginBtnImg, PATH_LOGIN_BTN_F);
                }
                function BlurLogin(){
                    SetImageUrl(loginBtnImg, PATH_LOGIN_BTN_U);
                }
                loginBtn.LP_onfocusFunction = FocusLogin;
                loginBtn.LP_onblurFunction  = BlurLogin;
                loginBtn.attachEvent("onfocus" , FocusLogin);
                loginBtn.attachEvent("onblur"  , BlurLogin);
                loginBtn.onclick  = loginBtnImg.onclick; 
                // ②
                loginBtn.focused  = false;
                loginBtn.pressed  = false;
                loginBtn.display  = loginBtnImg;
                // ③ 
                loginBtnLbl.onfocus = function(){loginBtn.focus()};
                loginBtnImg.onfocus = function(){loginBtn.focus()};

                // [戻る]ボタン
                // ①
                function FocusBack(){
                    SetImageUrl(backBtnImg, PATH_BACK_BTN_F);
                }
                function BlurBack(){
                    SetImageUrl(backBtnImg, PATH_BACK_BTN_U);
                }
                backBtn.LP_onfocusFunction = FocusBack;
                backBtn.LP_onblurFunction  = BlurBack;
                backBtn.attachEvent("onfocus" , FocusBack);
                backBtn.attachEvent("onblur"  , BlurBack);
                backBtn.onclick  = backBtnImg.onclick; 
                // ②
                backBtn.focused  = false;
                backBtn.pressed  = false;
                backBtn.display  = backBtnImg;
                // ③ 
                backBtnLbl.onfocus = function(){backBtn.focus()};
                backBtnImg.onfocus = function(){backBtn.focus()};

                // フォーカス対象の１グループをを設定する
                CreateFocusGroup([txtBox.id, loginBtn.id, backBtn.id]);
                
//070419 HSK古場 (PVCS#2092対応) UPDATE-ST
//              InitMainErrKeyCtl(mainErrorFrameName, PositFocus);
                InitMainErrKeyCtl(mainErrorFrameName, OnOKCallback);
//070419 HSK古場 (PVCS#2092対応) UPDATE-ED
                
                function PositFocus(){
                    txtBox.focus();
                }
                
//070419 HSK古場 (PVCS#2092対応) ADD-ST
                function OnOKCallback(){
                    PositFocus();
                    restoreUserConfirm();
                    document.getElementById("imgLogin").onclick = userConfirm;
                }
//070419 HSK古場 (PVCS#2092対応) ADD-ED
                
                // フォーカスの初期位置を設定する =================================            
                // → もともとテキストボックスにフォーカスされるので対応不要
            }catch(exception){
                WriteIISLog(LOGIN_PASS_ASPX, 0);
            }
        }

        //**********************************************************************
        //  CR検査操作性向上のメモリリーク対策	070105 古場
        //**********************************************************************
        function CleanupKeyControl(){
            try{
                // 変数宣言 ====================================================

                // Login_Pass.aspx内のコントロール -----------------------
                // テキストボックス
                var txtBox      = document.getElementById("txtPassword");
                // ログインボタン
                var loginBtn    = document.getElementById("btnLogin");
                var loginBtnImg = document.getElementById("imgLogin");
                var loginBtnLbl = document.getElementById("lblLogin");
                // 戻るボタン
                var backBtn     = document.getElementById("btnBack");
                var backBtnImg  = document.getElementById("imgBack");
                var backBtnLbl  = document.getElementById("lblBack");
                // Main.aspxのエラー画面
                var mainErrorFrameName  = "TABLE_MainErrorFrame";

                // グローバル変数を解放 ========================================
                CleanupGroupHolder();

                // EnableClick()のメモリリーク対策 =============================
                DisableClick(loginBtn);
                DisableClick(backBtn);
                
                // フォーカス制御のメモリリーク対策 ============================

                // テキストボックス
                DisableTxtLeave(txtBox);
                txtBox.display = null;

                // [ログイン]ボタン
                loginBtn.detachEvent("onfocus" , loginBtn.LP_onfocusFunction);
                loginBtn.detachEvent("onblur"  , loginBtn.LP_onblurFunction);
                loginBtn.LP_onfocusFunction = null;
                loginBtn.LP_onblurFunction  = null;
                loginBtn.onclick  = null; 
                loginBtn.display  = null;
                loginBtnLbl.onfocus = null;
                loginBtnImg.onfocus = null;

                // [戻る]ボタン
                backBtn.detachEvent("onfocus" , backBtn.LP_onfocusFunction);
                backBtn.detachEvent("onblur"  , backBtn.LP_onblurFunction);
                backBtn.LP_onfocusFunction = null;
                backBtn.LP_onblurFunction  = null;
                backBtn.onclick  = null; 
                backBtn.display  = null;
                backBtnLbl.onfocus = null;
                backBtnImg.onfocus = null;

                // KeyControlMainError.jsのメモリリーク対策 ====================
                CleanupMainErrKeyCtl(mainErrorFrameName);

            }catch(exception){
                WriteIISLog(LOGIN_PASS_ASPX, 1);
            }
        }

	// -->
    </SCRIPT>
  </HEAD>
  <!-- 070417 HSK山本 PVCS#1671 UPDATE -->
  <!-- <BODY BGCOLOR="#f5e7dd" TOPMARGIN="0" LEFTMARGIN="0" SCROLL="no" ONLOAD="InitKeyControl();" ONUNLOAD="CleanupKeyControl();" -->
  <BODY BGCOLOR="#f5e7dd" TOPMARGIN="0" LEFTMARGIN="0" SCROLL="no" ONLOAD="OnFontSetting();InitKeyControl();" ONUNLOAD="CleanupKeyControl();"
    ONRESIZE="CurPositionClr()" ONFOCUS="CurPositionClr()" ONCONTEXTMENU="return false;"
    ONSELECTSTART="return false;" ONHELP="return false;" ONDRAG="return false;">
    <FORM ID="frmPass" METHOD="post" RUNAT="server" ONFOCUS="CurPositionClr()">
      <TABLE ID="TablePass" WIDTH="800" HEIGHT="600" CELLSPACING="0" CELLPADDING="0" BORDER="0"
        align="center" ONFOCUS="CurPositionClr()">
        <% // 取得値設定エリア %>
        <TR BGCOLOR="#f7f1e6" HEIGHT="48" ONFOCUS="CurPositionClr()">
          <TD WIDTH="22" ONFOCUS="CurPositionClr()">
            <ASP:BUTTON ID="btnDisplay" RUNAT="server" WIDTH="0px" HEIGHT="0px" BORDERSTYLE="None" BACKCOLOR="Transparent"></ASP:BUTTON>
          </TD>
          <TD WIDTH="60" ONFOCUS="CurPositionClr()"></TD>
          <TD WIDTH="488" ONFOCUS="CurPositionClr()">
            <DIV STYLE="VISIBILITY: hidden" ONFOCUS="CurPositionClr()">
              <INPUT ID="txtSoftKeyBoardFlag" NAME="txtSoftKeyBoardFlag" STYLE="WIDTH: 22px; HEIGHT: 22px"
                TYPE="hidden" SIZE="1" RUNAT="server"> <INPUT ID="txtUserID" NAME="txtUserID" STYLE="WIDTH: 22px; HEIGHT: 22px" TYPE="hidden"
                SIZE="1" RUNAT="server"> <INPUT ID="txtStartURL" NAME="txtStartURL" STYLE="WIDTH: 22px; HEIGHT: 22px" TYPE="hidden"
                SIZE="1" RUNAT="server"> <INPUT ID="txtUserName" NAME="txtUserName" STYLE="WIDTH: 22px; HEIGHT: 22px" TYPE="hidden"
                SIZE="1" RUNAT="server"> <INPUT ID="txtUserComment" NAME="txtUserComment" STYLE="WIDTH: 22px; HEIGHT: 22px" TYPE="hidden"
                SIZE="1" RUNAT="server"> <INPUT ID="txtUserImagePath" NAME="txtUserImagePath" STYLE="WIDTH: 22px; HEIGHT: 22px"
                TYPE="hidden" SIZE="1" RUNAT="server"> <INPUT ID="txtInitDisp" NAME="txtInitDisp" STYLE="WIDTH: 22px; HEIGHT: 22px" TYPE="hidden"
                SIZE="1" RUNAT="server">
            </DIV>
          </TD>
          <TD WIDTH="126" ONFOCUS="CurPositionClr()"></TD>
          <TD WIDTH="82" ONFOCUS="CurPositionClr()"></TD>
          <TD WIDTH="22" ONFOCUS="CurPositionClr()"></TD>
        </TR>
        <% // ユーザガイダンス表示エリア %>
        <TR HEIGHT="30" ONFOCUS="CurPositionClr()">
          <TD BGCOLOR="#001b59" COLSPAN="6" ONFOCUS="CurPositionClr()">
            &nbsp;&nbsp;&nbsp;
            <ASP:LABEL ID="lblUserGuidance" RUNAT="server" FONT-BOLD="True" FORECOLOR="White" >ユーザガイダンス表示部</ASP:LABEL>
          </TD>
        </TR>
        <TR BGCOLOR="#ffffff" HEIGHT="1" ONFOCUS="CurPositionClr()">
          <TD COLSPAN="6" HEIGHT="1" ONFOCUS="CurPositionClr()"></TD>
        </TR>
        <TR BGCOLOR="#eec1aa" HEIGHT="3" ONFOCUS="CurPositionClr()">
          <TD COLSPAN="6" HEIGHT="3" ONFOCUS="CurPositionClr()"></TD>
        </TR>
        <TR HEIGHT="10" ONFOCUS="CurPositionClr()">
          <TD COLSPAN="6"></TD>
        </TR>
        <% // ユーザ情報表示エリア %>
        <TR HEIGHT="60" ONFOCUS="CurPositionClr()">
          <TD STYLE="HEIGHT: 103px" ONFOCUS="CurPositionClr()"></TD>
          <TD STYLE="HEIGHT: 103px" ONFOCUS="CurPositionClr()"><FONT face="MS UI Gothic"></FONT>
          </TD>
          <TD STYLE="HEIGHT: 103px" COLSPAN="3" ONFOCUS="CurPositionClr()">
            <div style="WIDTH: 326px; POSITION: relative; HEIGHT: 85px" ms_positioning="GridLayout">
              <img id="imgUserStripS1" style="Z-INDEX: 101; LEFT: 2px; WIDTH: 324px; POSITION: absolute; TOP: 2px; HEIGHT: 82px"
                src="../Bmp/ucUserStripPltS.gif"> <img id="imgUserStripN1" style="Z-INDEX: 102; LEFT: 2px; WIDTH: 324px; POSITION: absolute; TOP: 2px; HEIGHT: 82px"
                src="../Bmp/ucUserStripPltN.gif">&nbsp; <textarea id="lblUserName" name="lblUserName" style="OVERFLOW-Y: hidden; FONT-WEIGHT: bold; Z-INDEX: 104; LEFT: 88px; WIDTH: 219px; BORDER-TOP-STYLE: none; FONT-FAMILY: 'MS UI Gothic'; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; POSITION: absolute; TOP: 8px; HEIGHT: 20px; BACKGROUND-COLOR: transparent; BORDER-BOTTOM-STYLE: none"
                rows="2" cols="26" wrap="hard" readOnly></textarea><textarea id="lblUserComment" name="lblUserComment" style="OVERFLOW-Y: hidden; Z-INDEX: 104; LEFT: 86px; WIDTH: 230px; BORDER-TOP-STYLE: none; FONT-FAMILY: 'MS UI Gothic'; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; POSITION: absolute; TOP: 40px; HEIGHT: 28px; BACKGROUND-COLOR: transparent; BORDER-BOTTOM-STYLE: none"
                rows="2" cols="26" wrap="hard" readOnly></textarea>
              <div style="Z-INDEX: 105; LEFT: 7px; WIDTH: 70px; POSITION: absolute; TOP: 7px; HEIGHT: 70px"
                ms_positioning="GridLayout">
                <ASP:IMAGE ID="imgUserImage" STYLE="Z-INDEX: 101; LEFT: 0px; POSITION: absolute; TOP: 0px"
                  RUNAT="server" HEIGHT="70px" WIDTH="70px"></ASP:IMAGE>
                <ASP:IMAGE ID="imgUserImageW" STYLE="Z-INDEX: 102; LEFT: 0px; POSITION: absolute; TOP: 0px"
                  RUNAT="server" WIDTH="70px"></ASP:IMAGE>
                <ASP:IMAGE ID="imgUserImageH" STYLE="Z-INDEX: 103; LEFT: 0px; POSITION: absolute; TOP: 0px"
                  RUNAT="server" HEIGHT="70px"></ASP:IMAGE>
              </div>
            </div>
          </TD>
          <TD STYLE="HEIGHT: 103px"></TD>
        </TR>
        <TR HEIGHT="10" ONFOCUS="CurPositionClr()">
          <TD COLSPAN="6"></TD>
        </TR>
        <% // パスワード入力テキストボックス表示エリア %>
        <TR HEIGHT="36" ONFOCUS="CurPositionClr()">
          <TD></TD>
          <TD></TD>
          <TD COLSPAN="3" ONFOCUS="CurPositionClr()">
            <ASP:LABEL ID="lblPassword" RUNAT="server" HEIGHT="27px" FONT-BOLD="True">PASSWORD : </ASP:LABEL>
            &nbsp;&nbsp; <INPUT ID="txtPassword" NAME="txtPassword" STYLE="FONT-SIZE: large; WIDTH: 532px; HEIGHT: 32px"
              SIZE="48" TYPE="password" RUNAT="server" ONMOUSEUP="CurPosition();" ONKEYUP="CurPosition();" ONFOCUS="SelectText(document.getElementById('txtPassword'));">
          </TD>
          <TD></TD>
        </TR>
        <TR HEIGHT="10">
          <TD COLSPAN="6"></TD>
        </TR>
        <% // ソフトウェアキーボード・戻るボタン・ログインボタン表示エリア %>
        <TR HEIGHT="277" ONFOCUS="CurPositionClr()">
          <TD COLSPAN="6" ONFOCUS="CurPositionClr()">
            <DIV STYLE="WIDTH: 798px; POSITION: relative; HEIGHT: 277px" MS_POSITIONING="GridLayout"
              ONFOCUS="CurPositionClr()">
              <IFRAME ID="frmSoftKeyBoard" NAME="frmSoftKeyBoard" STYLE="Z-INDEX: 101; LEFT: 0px; VISIBILITY: hidden; WIDTH: 800px; POSITION: absolute; TOP: 24px; HEIGHT: 313px; BACKGROUND-COLOR: transparent"
                FRAMEBORDER="0" SCROLLING="no" SRC="../SoftKeyBoard/SoftKeyBoard.aspx?KeyNo=1"></IFRAME>
              <ASP:BUTTON ID="btnBack" STYLE="Z-INDEX: 102; LEFT: 12px; POSITION: absolute; TOP: 345px" RUNAT="server"
                HEIGHT="0px" WIDTH="0px"></ASP:BUTTON>
              <ASP:BUTTON ID="btnLogin" STYLE="Z-INDEX: 103; LEFT: 79px; POSITION: absolute; TOP: 345px" RUNAT="server"
                HEIGHT="0px" WIDTH="0px"></ASP:BUTTON>
              <ASP:IMAGE ID="imgBtnBack" STYLE="Z-INDEX: 100; LEFT: 587px; POSITION: absolute; TOP: 224px"
                RUNAT="server" HEIGHT="110px" WIDTH="210px" IMAGEURL="../Bmp/ucLoginPassBak.gif"></ASP:IMAGE>
              <%-- 次へ、戻るボタンのイメージのTabindexを-1にする 061012 Kandachi--%>
              <ASP:IMAGE ID="imgLogin" STYLE="Z-INDEX: 109; LEFT: 702px; POSITION: absolute; TOP: 240px" TABINDEX="-1"
                RUNAT="server" HEIGHT="90px" WIDTH="90px" IMAGEURL="../Bmp/cmCirBGreenBtnU.gif"></ASP:IMAGE>
              <ASP:IMAGE ID="imgBack" STYLE="Z-INDEX: 110; LEFT: 593px; POSITION: absolute; TOP: 296px" RUNAT="server" TABINDEX="-1"
                WIDTH="102px" HEIGHT="32px" IMAGEURL="../Bmp/cmOvalAPaleLBtnU.gif"></ASP:IMAGE>
              <ASP:LABEL ID="lblBack" STYLE="Z-INDEX: 111; LEFT: 598px; POSITION: absolute; TOP: 304px; TEXT-ALIGN: center"
                RUNAT="server" BACKCOLOR="Transparent" FORECOLOR="Black" FONT-BOLD="True" Width="93px"></ASP:LABEL>
              <ASP:LABEL ID="lblLogin" STYLE="Z-INDEX: 112; LEFT: 705px; POSITION: absolute; TOP: 278px;  TEXT-ALIGN: center"
                RUNAT="server" BACKCOLOR="Transparent" FORECOLOR="Black" FONT-BOLD="True" Width="83px"></ASP:LABEL>
              <ASP:IMAGE ID="imgListBack" STYLE="Z-INDEX: 50; LEFT: 0px; POSITION: absolute; TOP: 270px"
                RUNAT="server" HEIGHT="7px" WIDTH="800px" IMAGEURL="../Bmp/cmBorder.gif"></ASP:IMAGE>
            </DIV>
          </TD>
        </TR>
<!--
        <TR HEIGHT="35" BGCOLOR="#f5e7dd" ONFOCUS="CurPositionClr()">
          <TD HEIGHT="35" COLSPAN="6"></TD>
        </TR>
-->
        <TR HEIGHT="119" BGCOLOR="#f4eee4" ONFOCUS="CurPositionClr()">
          <TD HEIGHT="119" COLSPAN="6"></TD>
        </TR>
      </TABLE>
    </FORM>
  </BODY>
</HTML>
