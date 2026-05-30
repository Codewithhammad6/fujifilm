<%@ Page language="c#" Codebehind="EditPatientId_View.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.EditPatientId_View" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
    <title>EditPatientId_View2</title>
    <%
/****************************************************************************

  @file EditPatientId_View.aspx

  @brief 患者ID情報画面フレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/20  YSK畑　     V1.0       新規作成
  @date  06/10/13  S1神立      V1.4       操作性向上(キーボード操作)
  @date  07/01/09  HSK古場     V1.4       操作性向上メモリリーク対策
  @date  09/07/09  HSK齋藤誠   V5.1       PC版画像確認モニタ対応
  @date  12/02/02  FFS生田     V2.2(B)HF0002 CQ#1287対応

/****************************************************************************/
%>
    <%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
    <meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <META HTTP-EQUIV="Imagetoolbar" CONTENT="no">
    <script language="javascript" src="../SoftKeyBoard/Include/KeyBoardInputtext.js" charset="UTF-8"></script>
    <script language="javascript" src="./Include/ImageButton_Color.js" charset="UTF-8"></script>
    <script language="javascript" src="./Include/CheckCommon.js" charset="UTF-8"></script>
    <script language="javascript" src="./Include/EditPatientId_View.js" charset="UTF-8"></script>
    <script language="JavaScript" src="Include/MessageWindow.js" charset="UTF-8"></script>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
    <script language="javascript" src="../Include/SystemEnvironment.js  " charset="UTF-8"></script><%-- 061127 神立 --%>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/KeyControl.js" CHARSET="UTF-8"></SCRIPT><%-- 061002 神立 --%>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/KeyControlMainError.js" CHARSET="UTF-8"></SCRIPT><%-- 061026 神立 --%>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"     CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"   CHARSET="UTF-8"></SCRIPT>
    <script language="javascript">
    try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "EditPatientId_View.aspx"  //ファイル名


			var ViewStatus    = "<%=View%>";					 // 画面モード
			// 画面オープンモード
			var OpenMode = <%=OpenMode%>;
			var PaddingFlag   = <%=PaddingFlag%>;			// パディング設定フラグ
//			var PaddingLength = <%=PaddingLength%>;			// パディング桁数
			var SoftKeyBoardFlag = <%=SoftKeyBoardFlag%>;	// ソフトキーボード使用フラグ

			var ElectKarteKey     = <%=ElectKarteKey%>;				// 電子カルテオプションキー
			var ElectKarteUse     = <%=ElectKarteUse%>;				// 電子カルテ使用I/F
			var ElectKarteInitialFlag    = <%=ElectKarteInitialFlag%>;			// 電子カルテ初期取得フラグ
			var ElectKarteConnectFlag    = <%=ElectKarteConnectFlag%>;			// 電子カルテ連携フラグ

			var PatientIdLength      = <%=PatientIdLength%>;		// 患者ID文字列最大長
			//2012/02/02 FFS生田 CQ#1287 Mod -S
			//var PatientIdProhibition = "\"#%&\'+?\\/*@<";	// 患者ID禁則文字
			var PatientIdProhibition = "\"#%&\'?\\/*@<";	// 患者ID禁則文字
			//2012/02/02 FFS生田 CQ#1287 Mod -E
      var FONT_NAME            = "<%=FontName%>";      //フォント名を取得
      // 2005/06/23 006 H.SAITO デザイン変更対応（フォントサイズ）       
      //var FONT_SIZE            = "<%=FontSize%>";      //フォントサイズを取得
      var FONT_SIZE_INPUTBOX   = "<%=FontSize_InputBox%>"; // フォントサイズ(入力ボックス(患者情報))を取得       
      var FONT_SIZE_CAPTION    = "<%=FontSize_Caption%>";  // フォントサイズ(キャプション(入力ボックス横))を取得        
      var FONT_SIZE_BUTTON     = "<%=FontSize_Button%>";   // フォントサイズ(ボタン)を取得
      var FONT_SIZE_OTHER      = "<%=FontSize_Other%>";    // フォントサイズ(その他)を取得   

      // 文字列取得
      var LabelPatientId    = top.DispFrame.Public_GetString(32530,"PatientId");

      var ButtonBack  = "";
      var ButtonNext  = "";
      if(ViewStatus == VIEW_MODE_INPUT){
      //UPDATE ST hata V1.0-0036(2005/01/29)=======================
      //	if(OpenMode == OPEN_MODE_CE || OpenMode == OPEN_MODE_WINDOW){
	      if(OpenMode == OPEN_MODE_CE ){
		      ButtonNext = top.DispFrame.Public_GetString(32536,"Next");
		      ButtonBack = top.DispFrame.Public_GetString(32532,"Back");
	      }else if(OpenMode == OPEN_MODE_DIALOG || OpenMode == OPEN_MODE_WINDOW){
		      ButtonNext = top.DispFrame.Public_GetString(32536,"Next");
		      ButtonBack = top.DispFrame.Public_GetString(32533,"Close");
	      }
      //UPDATE ED======================================================
      }else if(ViewStatus == VIEW_MODE_CHANGE){
	      ButtonNext = top.DispFrame.Public_GetString(32535,"Search");
	      ButtonBack = top.DispFrame.Public_GetString(32532,"Back");
      }else if(ViewStatus == VIEW_MODE_EDIT){
	      ButtonNext = top.DispFrame.Public_GetString(32534,"Update");
	      ButtonBack = top.DispFrame.Public_GetString(32532,"Back");
      }
      var ButtonElect = top.DispFrame.Public_GetString(32531,"EKarte");

      var UserGuidanceStringInput  = top.DispFrame.Public_GetString(32539,"UserGuidance1");
      var UserGuidanceStringEdit   = top.DispFrame.Public_GetString(32540,"UserGuidance2");
      var UserGuidanceStringChange = top.DispFrame.Public_GetString(32541,"UserGuidance3");

      var ErrorInputPatientId    = top.DispFrame.Public_GetLangMsgString(MSG_WARNING_ID_OVER,"PatientId over.");
//      var ErrorInputNoPatientId  = top.DispFrame.Public_GetLangMsgString(31507,"PatientId nothing.");
//      var ErrorStringPatientId   = top.DispFrame.Public_GetLangMsgString(31505,"PatientId error.");
      var StopString = top.DispFrame.Public_GetString(32737,",");

	    // エラー文字列作成
	    ErrorInputPatientId = ErrorInputPatientId + PatientIdLength;
      	
      var ProcString           = top.DispFrame.Public_GetString(32730,"Please Waiting...");
      var GetElectDataString   = top.DispFrame.Public_GetString(32538,"Get EKarte");
      
      // 2005/07/20 002 H.SAITO 不要のため削除
      //var ErrorElectDataString = top.DispFrame.Public_GetLangMsgString(31515,"EKarte connect error");

      var ConfirmChangeString	 = top.DispFrame.Public_GetString(32537,"Change DB?");//（ＴＡＢＬＥタグを使用するか検討必要）
      var ConfirmOkString		 = top.DispFrame.Public_GetString(32738,"Yes");
      var ConfirmCancelString	 = top.DispFrame.Public_GetString(32739,"No");

      var ErrorConfirmOkString     = top.DispFrame.Public_GetString(32545,"Again");
      var ErrorConfirmCancelString = top.DispFrame.Public_GetString(32543,"Cancel");
      var ErrorConfirmSkipString   = top.DispFrame.Public_GetString(32544,"Skip");
// 2005/08/22 Kanno ADD ST タイトルバーの文字列対応
      var TitleString              = top.DispFrame.Public_GetString(32546,"Study");
// 2005/08/22 Kanno ADD ED タイトルバーの文字列対応
			//データ取得完了時にメソッドを呼ぶ      
			<%=ClientScript%>;

	  }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }

    //**************************************************************************
    // CR検査操作性向上(キーボード操作)に必要なページロード時の処理をする 061002神立
    //**************************************************************************
      function InitKeyControl(){
        try{
            // 変数宣言 =======================================================
            // ログ用の定数
            var MSG_ID_BASE     = 30900; // CR検査部3x900のIDを使う
            
            // EditPatientId_View.aspx内のコントロール ----------------------
            // ID入力テキストボックス
            var txtBox              = document.getElementById("txtPatientId");
            // 次へボタン
            var nextBtn             = document.getElementById("TABLE_Next");
            var nextImg             = document.getElementById("imgNext_Enable");
            // 戻るボタン
            var backBtn             = document.getElementById("divButtonNG");
            var backImg             = document.getElementById("imgBack");
            // 電子カルテ連携ボタン
            var kalteBtn            = document.getElementById("divElect");
            var kalteImg            = document.getElementById("imgElect");
            
            // エラー画面（ボタン１つ）
            var errorFrame          = document.getElementById("TABLE_ErrorFrame");
            // OKボタン
            var errorOkBtn          = document.getElementById("DIV_ErrorButton");
            var errorOkImg          = document.getElementById("IMG_ErrorButton");
            
            // 確認画面（ボタン2-3つ）
            var confirmFrame        = document.getElementById("TABLE_ConfirmFrame");
            // OKボタン
            var confirmOkBtn        = document.getElementById("DIV_ConfirmOkButton");
            var confirmOkImg        = document.getElementById("IMG_ConfirmOkButton");
            // Cancelボタン
            var confirmCancelBtn    = document.getElementById("DIV_ConfirmCancelButton");
            var confirmCancelImg    = document.getElementById("IMG_ConfirmCancelButton");
            // Skipボタン
            var confirmSkipBtn      = document.getElementById("DIV_ConfirmSkipButton");
            var confirmSkipImg      = document.getElementById("IMG_ConfirmSkipButton");

            // 患者ID入力画面のBODY 
            var editPatientIdBody  = document.getElementById("BODY");

            // FCRWeb\Main.aspxのエラー画面 -------------------------------------
            // ボタンイメージのパス
            var PATH_ERROR_OK_IMG_F = "./Bmp/cmOvalAGreenLBtnF.gif";
            var PATH_ERROR_OK_IMG_U = "./Bmp/cmOvalAGreenLBtnU.gif";
            // フレーム
            var mainErrorFrameName  = "TABLE_MainErrorFrame";
            
            // グローバル変数を初期化 =======================================
            groupHolder = [];
            msgIdBase   = MSG_ID_BASE; 
            
            // Enter, Space でのボタン押下 ====================================
            EnableClick(nextBtn);
            EnableClick(backBtn);
            EnableClick(errorOkBtn);
            EnableClick(confirmOkBtn);
            EnableClick(confirmCancelBtn);
            EnableClick(confirmSkipBtn);
            EnableClick(kalteBtn);
            
            // テキストボックスでEnterを押したときの処理 ======================
            EnableSubmit(txtBox, nextBtn);
            
            // フォーカス制御 =================================================
            // ①コントロールにイベントハンドラを追加する。 
            // ②プロパティを持たせる
            // ③ボタン上の文字などをクリックした時にもフォーカスが外れないようにする。
            // ④フォーカス対象１グループを設定する

            // [患者ID]テキストボックス
            // ①
            EnableTxtLeave(txtBox);
            // ②
            txtBox.display = txtBox;

            // [電子カルテ連携]ボタン
            // ①
            function FocusKalteBtn(){
                kalteBtn.focused = true;
                Fn_OnButton(4);
                return false;
            }
            // フォーカスが離れた時のイベントハンドラ
            function BlurKalteBtn(){
                kalteBtn.focused = false;
                Fn_OnButton(5);
                return false;
            }
            // イベントハンドラを追加する
            kalteBtn.EPIV_onfocusFunction     = FocusKalteBtn;
            kalteBtn.EPIV_onblurFunction      = BlurKalteBtn;
            kalteBtn.EPIV_onmousedownFunction = function(){kalteBtn.pressed = true};
            kalteBtn.EPIV_onmouseupFunction   = function(){kalteBtn.pressed = false};
            kalteBtn.EPIV_onmouseoutFunction  = function(){kalteBtn.pressed = false};
            kalteBtn.attachEvent("onfocus", FocusKalteBtn);
            kalteBtn.attachEvent("onblur" , BlurKalteBtn);
            kalteBtn.attachEvent("onmousedown", kalteBtn.EPIV_onmousedownFunction);
            kalteBtn.attachEvent("onmouseup"  , kalteBtn.EPIV_onmouseupFunction);
            kalteBtn.attachEvent("onmouseout" , kalteBtn.EPIV_onmouseoutFunction);
            // ②
            kalteBtn.focused = false;
            kalteBtn.pressed = false;
            kalteBtn.display = kalteImg;
            // ③
            EnableKeepFocus(kalteBtn);

            // [次へ]ボタン
            // ①
            // フォーカスが当たった時のイベントハンドラ
            function FocusNextBtn(){
                nextBtn.focused = true;
                Fn_OnButton(98);
                return false;
            }
            // フォーカスが離れた時のイベントハンドラ
            function BlurNextBtn(){
                nextBtn.focused = false;
                Fn_OnButton(99);
                return false;
            }
            // イベントハンドラを追加する
            nextBtn.EPIV_onfocusFunction     = FocusNextBtn;
            nextBtn.EPIV_onblurFunction      = BlurNextBtn;
            nextBtn.EPIV_onmousedownFunction = function(){nextBtn.pressed = true};
            nextBtn.EPIV_onmouseupFunction   = function(){nextBtn.pressed = false};
            nextBtn.EPIV_onmouseoutFunction  = function(){nextBtn.pressed = false};
            nextBtn.attachEvent("onfocus", FocusNextBtn);
            nextBtn.attachEvent("onblur" , BlurNextBtn);
            nextBtn.attachEvent("onmousedown", nextBtn.EPIV_onmousedownFunction);
            nextBtn.attachEvent("onmouseup"  , nextBtn.EPIV_onmouseupFunction);
            nextBtn.attachEvent("onmouseout" , nextBtn.EPIV_onmouseoutFunction);
            // ②
            nextBtn.focused = false;
            nextBtn.pressed = false;
            nextBtn.display = nextImg;
            // ③
            EnableKeepFocus(nextBtn);
            
            // [戻る]ボタン
            // ①        
            // フォーカスが当たった時のイベントハンドラ
            function FocusBackBtn(){
                backBtn.focused = true;
                Fn_OnButton(93);
                return false;
            }
            // フォーカスが離れた時のイベントハンドラ
            function BlurBackBtn(){
                backBtn.focused = false;
                Fn_OnButton(94);
                return false;
            }
            // イベントハンドラを追加する
            backBtn.EPIV_onfocusFunction     = FocusBackBtn;
            backBtn.EPIV_onblurFunction      = BlurBackBtn;
            backBtn.EPIV_onmousedownFunction = function(){backBtn.pressed = true};
            backBtn.EPIV_onmouseupFunction   = function(){backBtn.pressed = false};
            backBtn.EPIV_onmouseoutFunction  = function(){backBtn.pressed = false};
            backBtn.attachEvent("onfocus", FocusBackBtn);
            backBtn.attachEvent("onblur" , BlurBackBtn);
            backBtn.attachEvent("onmousedown", backBtn.EPIV_onmousedownFunction);
            backBtn.attachEvent("onmouseup"  , backBtn.EPIV_onmouseupFunction);
            backBtn.attachEvent("onmouseout" , backBtn.EPIV_onmouseoutFunction);
            // ②
            backBtn.focused = false;
            backBtn.pressed = false;
            backBtn.display = backImg;
            // ③
            EnableKeepFocus(backBtn);
            
            // ④ 
            var array = [txtBox.id, kalteBtn.id, nextBtn.id, backBtn.id];
            CreateFocusGroup(array);

            // エラー画面 =====================================================
            // OKボタンだけのエラー画面 ------------------------------------
            // ボタンにフォーカスが当った時のイベントハンドラ
            function FocusErrorOkBtn(){
                event.srcElement.focused = true;
                Public_OnButton(2);
                return false;
            }
            // ボタンからフォーカスが離れた時のイベントハンドラ
            function BlurErrorOkBtn(){
                event.srcElement.focused = false;
                Public_OnButton(3);
                return false;
            }

            // イベントハンドラを追加する
            errorOkBtn.EPIV_onfocusFunction     = FocusErrorOkBtn;
            errorOkBtn.EPIV_onblurFunction      = BlurErrorOkBtn;
            errorOkBtn.EPIV_onmousedownFunction = function(){errorOkBtn.pressed = true};
            errorOkBtn.EPIV_onmouseupFunction   = function(){errorOkBtn.pressed = false};
            errorOkBtn.EPIV_onmouseoutFunction  = function(){errorOkBtn.pressed = false};
            errorOkBtn.EPIV_onclickFunction     = function(){txtBox.focus()};
            errorOkBtn.attachEvent("onfocus", FocusErrorOkBtn);
            errorOkBtn.attachEvent("onblur" , BlurErrorOkBtn);
            errorOkBtn.attachEvent("onmousedown", errorOkBtn.EPIV_onmousedownFunction);
            errorOkBtn.attachEvent("onmouseup"  , errorOkBtn.EPIV_onmouseupFunction);
            errorOkBtn.attachEvent("onmouseout" , errorOkBtn.EPIV_onmouseoutFunction);
            errorOkBtn.attachEvent("onclick"    , errorOkBtn.EPIV_onclickFunction);

            // プロパティを持たせる
            errorFrame.keyControlable = true ;
            errorOkBtn.focused     = false;
            errorOkBtn.pressed     = false;
            errorOkBtn.display     = errorOkImg;

            // ボタンの中身をクリックした時にフォーカスが外れないようにする。
            EnableKeepFocus(errorOkBtn);

            // ボタン３つのエラー画面 -------------------------------------
            // OKボタンにフォーカスが当った時のイベントハンドラ
            function FocusConfirmOkBtn(){
                event.srcElement.focused = true;
                Fn_OnButton(63);
                return false;
            }
            // OKボタンからフォーカスが離れた時のイベントハンドラ
            function BlurConfirmOkBtn(){
                event.srcElement.focused = false;
                Fn_OnButton(64);
                return false;
            }
            // Cancelボタンにフォーカスが当った時のイベントハンドラ
            function FocusConfirmCancelBtn(){
                event.srcElement.focused = true;
                Fn_OnButton(53);
                return false;
            }
            // Cancelボタンからフォーカスが離れた時のイベントハンドラ
            function BlurConfirmCancelBtn(){
                event.srcElement.focused = false;
                Fn_OnButton(54);
                return false;
            }
            // Skipボタンにフォーカスが当った時のイベントハンドラ
            function FocusConfirmSkipBtn(){
                event.srcElement.focused = true;
                Fn_OnButton(58);
                return false;
            }
            // Skipボタンからフォーカスが離れた時のイベントハンドラ
            function BlurConfirmSkipBtn(){
                event.srcElement.focused = false;
                Fn_OnButton(59);
                return false;
            }

            // イベントハンドラを追加する
            confirmOkBtn.EPIV_onfocusFunction     = FocusConfirmOkBtn;
            confirmOkBtn.EPIV_onblurFunction      = BlurConfirmOkBtn;
            confirmOkBtn.EPIV_onmousedownFunction = function(){confirmOkBtn.pressed = true};
            confirmOkBtn.EPIV_onmouseupFunction   = function(){confirmOkBtn.pressed = false};
            confirmOkBtn.EPIV_onmouseoutFunction  = function(){confirmOkBtn.pressed = false};
            confirmOkBtn.attachEvent("onfocus", FocusConfirmOkBtn);
            confirmOkBtn.attachEvent("onblur" , BlurConfirmOkBtn);
            confirmOkBtn.attachEvent("onmousedown", confirmOkBtn.EPIV_onmousedownFunction);
            confirmOkBtn.attachEvent("onmouseup"  , confirmOkBtn.EPIV_onmouseupFunction);
            confirmOkBtn.attachEvent("onmouseout" , confirmOkBtn.EPIV_onmouseoutFunction);
            
            confirmCancelBtn.EPIV_onfocusFunction     = FocusConfirmCancelBtn;
            confirmCancelBtn.EPIV_onblurFunction      = BlurConfirmCancelBtn;
            confirmCancelBtn.EPIV_onmousedownFunction = function(){confirmCancelBtn.pressed = true};
            confirmCancelBtn.EPIV_onmouseupFunction   = function(){confirmCancelBtn.pressed = false};
            confirmCancelBtn.EPIV_onmouseoutFunction  = function(){confirmCancelBtn.pressed = false};
            confirmCancelBtn.EPIV_onclickFunction     = function(){txtBox.focus()};
            confirmCancelBtn.attachEvent("onfocus", FocusConfirmCancelBtn);
            confirmCancelBtn.attachEvent("onblur" , BlurConfirmCancelBtn);
            confirmCancelBtn.attachEvent("onmousedown", confirmCancelBtn.EPIV_onmousedownFunction);
            confirmCancelBtn.attachEvent("onmouseup"  , confirmCancelBtn.EPIV_onmouseupFunction);
            confirmCancelBtn.attachEvent("onmouseout" , confirmCancelBtn.EPIV_onmouseoutFunction);
            confirmCancelBtn.attachEvent("onclick",     confirmCancelBtn.EPIV_onclickFunction);
            
            confirmSkipBtn.EPIV_onfocusFunction     = FocusConfirmSkipBtn;
            confirmSkipBtn.EPIV_onblurFunction      = BlurConfirmSkipBtn;
            confirmSkipBtn.EPIV_onmousedownFunction = function(){confirmSkipBtn.pressed = true};
            confirmSkipBtn.EPIV_onmouseupFunction   = function(){confirmSkipBtn.pressed = false};
            confirmSkipBtn.EPIV_onmouseoutFunction  = function(){confirmSkipBtn.pressed = false};
            confirmSkipBtn.attachEvent("onfocus", FocusConfirmSkipBtn);
            confirmSkipBtn.attachEvent("onblur" , BlurConfirmSkipBtn);
            confirmSkipBtn.attachEvent("onmousedown", confirmSkipBtn.EPIV_onmousedownFunction);
            confirmSkipBtn.attachEvent("onmouseup"  , confirmSkipBtn.EPIV_onmouseupFunction);
            confirmSkipBtn.attachEvent("onmouseout" , confirmSkipBtn.EPIV_onmouseoutFunction);

            // プロパティを持たせる
            confirmFrame.keyControlable = true ;
            
            confirmOkBtn.focused     = false ;
            confirmOkBtn.pressed     = false ;
            confirmOkBtn.display     = confirmOkImg;
            confirmOkBtn.hideFocus   = true;
            
            confirmCancelBtn.focused   = false ;
            confirmCancelBtn.pressed   = false ;
            confirmCancelBtn.display   = confirmCancelImg;
            confirmCancelBtn.hideFocus = true;
            
            confirmSkipBtn.focused   = false ;
            confirmSkipBtn.pressed   = false ;
            confirmSkipBtn.display   = confirmSkipImg;
            confirmSkipBtn.hideFocus = true;

            // ボタンの中身をクリックしたときにもフォーカスが外れないようにする。
            EnableKeepFocus(confirmOkBtn);
            EnableKeepFocus(confirmCancelBtn);
            EnableKeepFocus(confirmSkipBtn);

            // フォーカス対象の１グループをを設定する 
            var confirmAry = [confirmCancelBtn.id, confirmSkipBtn.id, confirmOkBtn.id];
            CreateErrorButtonGroup(confirmAry);

            // Main.aspxのエラー画面をキー操作可能にする ======================
            // 090709 HSK齋藤誠 PC版画像確認モニタ対応 UPDATE-ST
            //if(isWindowsCE() == false){
            if(isClientTypeMini() == false){
            // 090709 HSK齋藤誠 PC版画像確認モニタ対応 UPDATE-ED
                InitMainErrKeyCtl(mainErrorFrameName, FocusTextbox);
            }
            
            function FocusTextbox(){
                txtBox.focus();
            }
            
                       
        }catch(exception){
            WriteIISLog(FILE_NAME_ASPX, 0);
        }
      }
      
    //**************************************************************************
    //  CR検査操作性向上のメモリリーク対策	070109 古場
    //**************************************************************************
    function CleanupKeyControl(){
        try{
            // 変数宣言 =======================================================
            
            // EditPatientId_View.aspx内のコントロール ----------------------
            // ID入力テキストボックス
            var txtBox              = document.getElementById("txtPatientId");
            // 次へボタン
            var nextBtn             = document.getElementById("TABLE_Next");
            // 戻るボタン
            var backBtn             = document.getElementById("divButtonNG");
            // 電子カルテ連携ボタン
            var kalteBtn            = document.getElementById("divElect");

            // OKボタン
            var errorOkBtn          = document.getElementById("DIV_ErrorButton");

            // OKボタン
            var confirmOkBtn        = document.getElementById("DIV_ConfirmOkButton");
            // Cancelボタン
            var confirmCancelBtn    = document.getElementById("DIV_ConfirmCancelButton");
            // Skipボタン
            var confirmSkipBtn      = document.getElementById("DIV_ConfirmSkipButton");

            // FCRWeb\Main.aspxのエラー画面 -------------------------------------
            // フレーム
            var mainErrorFrameName  = "TABLE_MainErrorFrame";

            // グローバル変数を解放 ============================================
            CleanupGroupHolder();
            
            // EnableClick()のメモリリーク対策 =================================
            DisableClick(nextBtn);
            DisableClick(backBtn);
            DisableClick(errorOkBtn);
            DisableClick(confirmOkBtn);
            DisableClick(confirmCancelBtn);
            DisableClick(confirmSkipBtn);
            DisableClick(kalteBtn);
            
            // EnableSubmit()のメモリリーク対策 ================================
            DisableSubmit(txtBox);
            
            // フォーカス制御のメモリリーク対策 ================================

            // [患者ID]テキストボックス
            DisableTxtLeave(txtBox);
            txtBox.display = null;

            // [電子カルテ連携]ボタン
            kalteBtn.detachEvent("onfocus",     kalteBtn.EPIV_onfocusFunction);
            kalteBtn.detachEvent("onblur" ,     kalteBtn.EPIV_onblurFunction);
            kalteBtn.detachEvent("onmousedown", kalteBtn.EPIV_onmousedownFunction);
            kalteBtn.detachEvent("onmouseup"  , kalteBtn.EPIV_onmouseupFunction);
            kalteBtn.detachEvent("onmouseout" , kalteBtn.EPIV_onmouseoutFunction);
            kalteBtn.EPIV_onfocusFunction     = null;
            kalteBtn.EPIV_onblurFunction      = null;
            kalteBtn.EPIV_onmousedownFunction = null;
            kalteBtn.EPIV_onmouseupFunction   = null;
            kalteBtn.EPIV_onmouseoutFunction  = null;
            kalteBtn.display = null;
            DisableKeepFocus(kalteBtn);

            // [次へ]ボタン
            nextBtn.detachEvent("onfocus",     nextBtn.EPIV_onfocusFunction);
            nextBtn.detachEvent("onblur" ,     nextBtn.EPIV_onblurFunction);
            nextBtn.detachEvent("onmousedown", nextBtn.EPIV_onmousedownFunction);
            nextBtn.detachEvent("onmouseup"  , nextBtn.EPIV_onmouseupFunction);
            nextBtn.detachEvent("onmouseout" , nextBtn.EPIV_onmouseoutFunction);
            nextBtn.EPIV_onfocusFunction     = null;
            nextBtn.EPIV_onblurFunction      = null;
            nextBtn.EPIV_onmousedownFunction = null;
            nextBtn.EPIV_onmouseupFunction   = null;
            nextBtn.EPIV_onmouseoutFunction  = null;
            nextBtn.display = null;
            DisableKeepFocus(nextBtn);
            
            // [戻る]ボタン
            backBtn.detachEvent("onfocus",     backBtn.EPIV_onfocusFunction);
            backBtn.detachEvent("onblur" ,     backBtn.EPIV_onblurFunction);
            backBtn.detachEvent("onmousedown", backBtn.EPIV_onmousedownFunction);
            backBtn.detachEvent("onmouseup"  , backBtn.EPIV_onmouseupFunction);
            backBtn.detachEvent("onmouseout" , backBtn.EPIV_onmouseoutFunction);
            backBtn.EPIV_onfocusFunction     = null;
            backBtn.EPIV_onblurFunction      = null;
            backBtn.EPIV_onmousedownFunction = null;
            backBtn.EPIV_onmouseupFunction   = null;
            backBtn.EPIV_onmouseoutFunction  = null;
            backBtn.display = null;
            DisableKeepFocus(backBtn);

            // エラー画面のメモリリーク対策 ====================================

            // OKボタンだけのエラー画面 ------------------------------------
            errorOkBtn.detachEvent("onfocus",     errorOkBtn.EPIV_onfocusFunction);
            errorOkBtn.detachEvent("onblur" ,     errorOkBtn.EPIV_onblurFunction);
            errorOkBtn.detachEvent("onmousedown", errorOkBtn.EPIV_onmousedownFunction);
            errorOkBtn.detachEvent("onmouseup"  , errorOkBtn.EPIV_onmouseupFunction);
            errorOkBtn.detachEvent("onmouseout" , errorOkBtn.EPIV_onmouseoutFunction);
            errorOkBtn.detachEvent("onclick"    , errorOkBtn.EPIV_onclickFunction);
            errorOkBtn.EPIV_onfocusFunction     = null;
            errorOkBtn.EPIV_onblurFunction      = null;
            errorOkBtn.EPIV_onmousedownFunction = null;
            errorOkBtn.EPIV_onmouseupFunction   = null;
            errorOkBtn.EPIV_onmouseoutFunction  = null;
            errorOkBtn.EPIV_onclickFunction     = null;
            errorOkBtn.display = null;
            DisableKeepFocus(errorOkBtn);

            // ボタン３つのエラー画面 -------------------------------------
            confirmOkBtn.detachEvent("onfocus",     confirmOkBtn.EPIV_onfocusFunction);
            confirmOkBtn.detachEvent("onblur" ,     confirmOkBtn.EPIV_onblurFunction);
            confirmOkBtn.detachEvent("onmousedown", confirmOkBtn.EPIV_onmousedownFunction);
            confirmOkBtn.detachEvent("onmouseup"  , confirmOkBtn.EPIV_onmouseupFunction);
            confirmOkBtn.detachEvent("onmouseout" , confirmOkBtn.EPIV_onmouseoutFunction);
            confirmOkBtn.EPIV_onfocusFunction     = null;
            confirmOkBtn.EPIV_onblurFunction      = null;
            confirmOkBtn.EPIV_onmousedownFunction = null;
            confirmOkBtn.EPIV_onmouseupFunction   = null;
            confirmOkBtn.EPIV_onmouseoutFunction  = null;
            
            confirmCancelBtn.detachEvent("onfocus",     confirmCancelBtn.EPIV_onfocusFunction);
            confirmCancelBtn.detachEvent("onblur" ,     confirmCancelBtn.EPIV_onblurFunction);
            confirmCancelBtn.detachEvent("onmousedown", confirmCancelBtn.EPIV_onmousedownFunction);
            confirmCancelBtn.detachEvent("onmouseup"  , confirmCancelBtn.EPIV_onmouseupFunction);
            confirmCancelBtn.detachEvent("onmouseout" , confirmCancelBtn.EPIV_onmouseoutFunction);
            confirmCancelBtn.detachEvent("onclick",     confirmCancelBtn.EPIV_onclickFunction);
            confirmCancelBtn.EPIV_onfocusFunction     = null;
            confirmCancelBtn.EPIV_onblurFunction      = null;
            confirmCancelBtn.EPIV_onmousedownFunction = null;
            confirmCancelBtn.EPIV_onmouseupFunction   = null;
            confirmCancelBtn.EPIV_onmouseoutFunction  = null;
            confirmCancelBtn.EPIV_onclickFunction     = null;
            
            confirmSkipBtn.detachEvent("onfocus",     confirmSkipBtn.EPIV_onfocusFunction);
            confirmSkipBtn.detachEvent("onblur" ,     confirmSkipBtn.EPIV_onblurFunction);
            confirmSkipBtn.detachEvent("onmousedown", confirmSkipBtn.EPIV_onmousedownFunction);
            confirmSkipBtn.detachEvent("onmouseup"  , confirmSkipBtn.EPIV_onmouseupFunction);
            confirmSkipBtn.detachEvent("onmouseout" , confirmSkipBtn.EPIV_onmouseoutFunction);
            confirmSkipBtn.EPIV_onfocusFunction     = null;
            confirmSkipBtn.EPIV_onblurFunction      = null;
            confirmSkipBtn.EPIV_onmousedownFunction = null;
            confirmSkipBtn.EPIV_onmouseupFunction   = null;
            confirmSkipBtn.EPIV_onmouseoutFunction  = null;

            confirmOkBtn.display     = null;
            confirmCancelBtn.display = null;
            confirmSkipBtn.display   = null;

            DisableKeepFocus(confirmOkBtn);
            DisableKeepFocus(confirmCancelBtn);
            DisableKeepFocus(confirmSkipBtn);

            // KeyControlMainError.jsのメモリリーク対策 ========================
            // 090709 HSK齋藤誠 PC版画像確認モニタ対応 UPDATE-ST
            //if(isWindowsCE() == false){
            if(isClientTypeMini() == false){
            // 090709 HSK齋藤誠 PC版画像確認モニタ対応 UPDATE-ED
                CleanupMainErrKeyCtl(mainErrorFrameName);
            }

        }catch(exception){
            WriteIISLog(FILE_NAME_ASPX, 1);
        }
    }

    </script>
    <LINK href="../SoftKeyBoard/CSS/SoftKeyBoard.css" type="text/css" rel="stylesheet">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/MessageWindow.css">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/EditPatientId_View.css">
  </HEAD>
  <body ID="BODY" onfocus="CurPositionClr();" onload="Fn_InitPage();InitKeyControl();" onunload="CleanupKeyControl();" tabindex=-1>
  <!-- テキストボックスのみ選択・ドラッグを可能とする//-->
  <DIV id="divSelect">
    <!-- 患者ID入力//-->
    <INPUT id="txtPatientId" type="text" onfocus="SelectText(document.getElementById('txtPatientId'));"
      onmouseup="CurPosition()" onkeyup="CurPosition()"> 
  </DIV>
  <!-- 選択・ドラッグ不可//-->
  <DIV id="divAll" oncontextmenu="return false;" onselectstart="return false;" ondrag="return false;" onfocus="CurPositionClr();">
<!-- 2005/05/23-ST //-->
    <!-- メッセージと主要画面の境界 -->
    <TABLE>
      <TR><TD ID="DIV_List_Border"></TD></TR>
    </TABLE> 
<!-- 2005/05/23-EN //-->
    <!-- 患者IDラベル//-->
    <DIV id="DivPatientId_Value" onfocus="CurPositionClr();"></DIV>
    <!-- 電子カルテボタン//-->
    <IMG ID="IMG_Elect_Back" SRC="../Bmp/crKalteBackPlt.gif">
    <DIV id="divElect" onmousedown="Fn_OnButton(2)" onmouseup="Fn_OnButton(3)" onmouseout="Fn_OnButton(3)" onclick="Fn_OnButton(1)">
      <DIV id='DivElect_Value'></DIV>
      <IMG id='imgElect' src='../Bmp/crKalteBtnU.gif'>
    </DIV>
    <script language="javascript">
<!--
	// ソフトキーボード表示
	if(SoftKeyBoardFlag == 1){
	  document.write("				<iframe id='frmSoftKeyBoard' src='../SoftKeyBoard/SoftKeyBoard.aspx?KeyNo=1' frameBorder=0 scrolling='no' onload='Fn_SoftKeyBoardLoad()' tabIndex=-1> </iframe>\n");
	}else{;}
//-->
    </script>
    <!-- コマンドボタン領域の色 -->
    <DIV ID="DIV_CommandBackGround"></DIV>
    <!-- リストとコマンドボタンの境界 -->
    <IMG SRC="../Bmp/cmBorder.gif" ID="IMG_List-Command_Border"> 
    <!-- ボタン背景//-->
    <IMG ID="IMG_Button_Back" SRC="../Bmp/crBtnBack5Plt.gif">
    <!-- 戻るボタン//-->
    <DIV id="divButtonNG" onmousedown="Fn_OnButton(91)" onmouseup="Fn_OnButton(92)" onmouseout="Fn_OnButton(92)" onclick="Fn_OnButton(90)">
      <DIV id="DivButtonNG_Value"></DIV>
      <IMG id="imgBack" src="../Bmp/cmOvalAPaleLBtnU.gif"> 
    </DIV>
    <!-- 次へボタン//-->
	  <TABLE ID="TABLE_Next" ONCLICK="Fn_OnButton(95);" ONMOUSEDOWN="Fn_OnButton(96);" ONMOUSEOUT="Fn_OnButton(97);" onmouseup="Fn_OnButton(97)">
		  <TR><TD></TD></TR>
	  </TABLE>
    <DIV id="DivButtonOK_Value"></DIV>
    <IMG id="imgNext_Enable" src="../Bmp/cmCirBGreenBtnU.gif"> 
    <IMG id="imgNext_Disable" src="../Bmp/cmCirBGreenBtnX.gif"> 
 	</DIV>
  <DIV id="divBox" oncontextmenu="return false;" onselectstart="return false;" ondrag="return false;" >
   <!-- 確認ダイアログフレーム -->
    <TABLE ID="TABLE_ConfirmFrame">
      <TR>
        <TD></TD>
      </TR>
    </TABLE>
    <!-- ダイアログボックス -->
<!--
    <TABLE ID="TABLE_ConfirmBox">
      <TR>
        <TD id="TD_ConfirmText"></TD>
      </TR>
    </TABLE>
-->
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
    <DIV id="DIV_ConfirmCancelButton" onmousedown="Fn_OnButton(51)" onmouseup="Fn_OnButton(52)" onmouseout="Fn_OnButton(52)" onclick="Fn_OnButton(50)">
      <DIV id="DIV_ConfirmCancelText"></DIV>
      <IMG id="IMG_ConfirmCancelButton" src="../Bmp/cmOvalAPaleLBtnU.gif">
    </DIV>
    <!-- スキップボタン -->
    <DIV id="DIV_ConfirmSkipButton" onmousedown="Fn_OnButton(56)" onmouseup="Fn_OnButton(57)" onmouseout="Fn_OnButton(57)" onclick="Fn_OnButton(55)">
      <DIV id="DIV_ConfirmSkipText"></DIV>
      <IMG id="IMG_ConfirmSkipButton" src="../Bmp/cmOvalAPaleLBtnU.gif">
    </DIV>
    <!-- ＯＫボタン -->
    <DIV id="DIV_ConfirmOkButton" onmousedown="Fn_OnButton(61)" onmouseup="Fn_OnButton(62)" onmouseout="Fn_OnButton(62)" onclick="Fn_OnButton(60)">
      <DIV id="DIV_ConfirmOkText"></DIV>
      <IMG id="IMG_ConfirmOkButton" src="../Bmp/cmOvalAGreenLBtnU.gif">
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
            <!-- 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応(ダイアログが使いづらいので、インタフェース見直し）-ST- -->
            <!-- <DIV id="DIV_ErrorButton" onmousedown="Public_OnButton(0)"	onmouseup="Public_OnButton(1)" onmouseout="Public_OnButton(1)" onclick="Fn_CloseError()"> -->
            <DIV id="DIV_ErrorButton" onmousedown="Public_OnButton(0)"	onmouseup="Public_OnButton(1)" onmouseout="Public_OnButton(1)" onclick="Fn_OnButton(201)">
            <!-- 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応(ダイアログが使いづらいので、インタフェース見直し）-ED- -->
              <DIV id="DIV_ErrorOkText"></DIV>
              <IMG id="IMG_ErrorButton" src="../Bmp/cmOvalAGreenLBtnU.gif">
            </DIV>
          </TD>
        </TR>
      </TABLE>
  </DIV>
  </body>
</HTML>
