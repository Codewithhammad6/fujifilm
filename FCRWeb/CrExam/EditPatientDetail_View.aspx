<%@ Page language="c#" Codebehind="EditPatientDetail_View.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.EditPatientDetail_View" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
    <title>EditPatientDetail_View</title>
    <%
/****************************************************************************

  @file EditPatientDetail_View.aspx

  @brief 患者詳細情報画面フレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/21  YSK畑　     V1.0       新規作成
  @date  06/10/11  FF蔵敷　　　V1.4　　　ふりがな自動出力コントロールの貼り付け
  @date  06/10/13  S1神立      V1.4       操作性向上(キーボード操作)
  @date  06/12/07  S1蔵敷      V1.4       操作性向上(コントロール変更)
  @date  07/01/09  HSK古場     V1.4       操作性向上メモリリーク対策
  @date  07/02/08  S1神立      V1.4       PVCS2124
  @date  07/04/25  HSK山本     V2.0       PVCS2137対応
  @date  09/07/09  HSK齋藤誠   V5.1       PC版画像確認モニタ対応
  @date  09/12/01  FF 星野     V1.1(B)    1.1(B)対応 
  @date  09/12/25  FFS黒田     V1.1(B)    CQ#73対応
  @date  10/05/25  FF 星野     V2.0(B)    CQ#218対応
  @data  10/06/01  FF 星野     V2.0(B)    CQ#219対応
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
    <script language="javascript" src="../Include/FixToKB912945.js" charset="UTF-8"></script>
    <script language="javascript" src="../Include/SystemEnvironment.js  " charset="UTF-8"></script>
    <script language="javascript" src="./Include/ImageButton_Color.js" charset="UTF-8"></script>
    <script language="javascript" src="./Include/ChangeDateFormatDef.js" charset="UTF-8"></script>
    <script language="javascript" src="./Include/ChangeDateFormat.js" charset="UTF-8"></script>
    <script language="javascript" src="./Include/ChangeDBDateFormat.js" charset="UTF-8"></script>
    <script language="javascript" src="./Include/CheckCommon.js" charset="UTF-8"></script>
    <script language="javascript" src="./Include/EditPatientDetail_View.js" charset="UTF-8"></script>
    <script language="javascript" src="./Include/MessageWindow.js" charset="UTF-8"></script>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/KeyControl.js" CHARSET="UTF-8"></SCRIPT><%-- 061002 神立 --%>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/KeyControlMainError.js" CHARSET="UTF-8"></SCRIPT><%-- 061026 神立 --%>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"     CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"   CHARSET="UTF-8"></SCRIPT>
    <script language="javascript">
    try{
      var SPOT_CODE_ASPX = 0;                             //スポットコード
      var FILE_NAME_ASPX = "EditPatientDetail_View.aspx"; //ファイル名
      var ViewStatus = "<%=View%>";			// 画面モード

    // 画面オープンモード
    var OpenMode = <%=OpenMode%>;
    var DateFormat     = <%=DateFormat%>;				          // 日付フォーマット
    var EraDisplayFlag = <%=EraDisplayFlag%>;			        // 和暦ボタン表示フラグ
    var ValueMulti     = <%=ValueMulti%>;				          // マルチバイト
    var KanjiInputFlag = <%=KanjiInputFlag%>;			        // 漢字フラグ
    var HonorificFlag  = <%=HonorificFlag%>;			        // 敬称表示フラグ
    var HonorificTitle = "<%=HonorificTitle%>";			      // 敬称表示文字		
    var SoftKeyBoardFlag = <%=SoftKeyBoardFlag%>;		      // ソフトキーボード使用フラグ
    // --V1.4 K.Kurashiki >>
    var FuriganaAutomaticInput  = "<%=FuriganaAutomaticInput%>";        // FuriganaAutomaticInput
    var FuriganaIMEMode = "<%=FuriganaIMEMode%>";                           // FuriganaIMEMode
    var ALPHA = 1;																	          // アルファベット設定値   
    var HIRAGANA = 2;																		  //ひらがな設定値
    var LanguageValue ="<%=LanguageValue%>";									  //表示言語設定
    var FONTSTYLE_BOLD = 1;															//フォントスタイル
    // -- V1.4 K.Kurashiki <<          
    var PatientNameLength              = 64;				      // ｶﾝｼﾞｬﾒｲ最大長取得
    var PatientJapaneseNameLength      = 64;		          // 患者名最大長取得
    var PatientNameProhibition         = "\"#%&\'+?\\/*@<=";// ｶﾝｼﾞｬﾒｲ禁則文字列
    var PatientJapaneseNameProhibition = "";	            // 患者名禁則文字列 
    var exBirth = top.DispFrame.Public_GetString(32571,"example>>");
    var FONT_NAME                      = "<%=FontName%>"; // フォント名を取得
    // 2005/06/23 007 H.SAITO デザイン変更対応（フォントサイズ）
    //var FONT_SIZE                      = "<%=FontSize%>"; // フォントサイズを取得
    var FONT_SIZE_INPUTBOX             = "<%=FontSize_InputBox%>";     // フォントサイズ(入力ボックス(患者情報))
    var FONT_SIZE_CAPTION              = "<%=FontSize_Caption%>";      // フォントサイズ(キャプション(入力ボックス上))
    var FONT_SIZE_CAPTION_SIDE         = "<%=FontSize_Caption_Side%>"; // フォントサイズ(キャプション(入力ボックス横))
    var FONT_SIZE_BUTTON               = "<%=FontSize_Button%>";       // フォントサイズ(ボタン)
    var FONT_SIZE_OTHER                = "<%=FontSize_Other%>";        // フォントサイズ(その他) 

	//2009.12.01 1.1(B)対応 FF星野 ADD-ST
	//2009.12.25 CQ#73対応 FFS黒田 Update Start
	//var PatientVeterinaryProhibition   = "\"%&\'+?\\/*@<=";// 責任者以外の禁則文字
	//2012/02/02 FFS生田 CQ#1287 Mod -S
	//var PatientVeterinaryProhibition   = "\"%&+?\\/*@<=";// 責任者以外の禁則文字
	var PatientVeterinaryProhibition   = "\"%&?\\/*@<=";// 責任者以外の禁則文字
	//2012/02/02 FFS生田 CQ#1287 Mod -E
	//2009.12.25 CQ#73対応 FFS黒田 Update End
	
	var Veterinary = <%=Veterinary%>
	var SystemSizeUnit = "<%=SystemSizeUnit%>";//0:m 1:cm 2:inch 3:feet
	var SystemWeightUnit = "<%=SystemWeightUnit%>";//0:kg 1:g 2:stone 3pound

	var LabelPatientsSize				= top.DispFrame.Public_GetString(32800,"PatientsSize");
	var LabelPatientsWeight				= top.DispFrame.Public_GetString(32801,"PatientsWeight");
	var LabelPatientSpeciesDescription	= top.DispFrame.Public_GetString(32802,"PatientSpeciesDescription");
	var LabelPatientBreedDescription	= top.DispFrame.Public_GetString(32803,"PatientBreedDescription");
	var LabelSexNeutred					= top.DispFrame.Public_GetString(32804,"SexNeutred");
	var LabelSexNeutredAltered			= top.DispFrame.Public_GetString(32805,"Altered");
	var LabelSexNeutredUnAltered		= top.DispFrame.Public_GetString(32806,"UnAltered");
	var LabelSexNeutredUnknown			= top.DispFrame.Public_GetString(32807,"Unknown");
	var LabelResponsiblePerson			= top.DispFrame.Public_GetString(32808,"ResponsiblePerson");
	var LabelResponsibleOrganization	= top.DispFrame.Public_GetString(32809,"ResponsibleOrganization");
	var LabelPatientComment				= top.DispFrame.Public_GetString(32810,"PatientComment");
	var LabelUnitSizeCM					= top.DispFrame.Public_GetString(32811,"cm");
	var LabelUnitSizeM					= top.DispFrame.Public_GetString(32812,"m");
	var LabelUnitSizeINCH				= top.DispFrame.Public_GetString(32813,"inch");
	var LabelUnitSizeFEET				= top.DispFrame.Public_GetString(32814,"feet");
	var LabelUnitWeightG				= top.DispFrame.Public_GetString(32815,"g");
	var LabelUnitWeightKG				= top.DispFrame.Public_GetString(32816,"kg");
	var LabelUnitWeightPOUND			= top.DispFrame.Public_GetString(32817,"pound");
	var LabelUnitWeightSTONE			= top.DispFrame.Public_GetString(32818,"stone");
	var LabelUnitSize="";
	var LabelUnitWeight="";
	
	//身長単位
	switch(SystemSizeUnit)
	{
		case "1":
			LabelUnitSize = LabelUnitSizeCM;
			break;
		case "2":
			LabelUnitSize = LabelUnitSizeINCH;		
			break;
		case "3":
			LabelUnitSize = LabelUnitSizeFEET;		
			break;
		default:
			LabelUnitSize = LabelUnitSizeM;		
			break;
	}
	
	//体重単位
	switch(SystemWeightUnit)
	{
		case "1":
			LabelUnitWeight = LabelUnitWeightG;
			break;
		case "2":
			LabelUnitWeight = LabelUnitWeightSTONE;		
			break;
		case "3":
			LabelUnitWeight = LabelUnitWeightPOUND;		
			break;
		default:
			LabelUnitWeight = LabelUnitWeightKG;		
			break;
	}	
	//2009.12.01 1.1(B)対応 FF星野 ADD-ED

    // 文字列取得
    var LablePatientName      = top.DispFrame.Public_GetString(32560,"PatientName");
    var LabelPatientKanjiName = top.DispFrame.Public_GetString(32561,"PatientKanjiName");
    var LabelPatientSex       = top.DispFrame.Public_GetString(32562,"Sex");
    var LabelPatientBirth     = top.DispFrame.Public_GetString(32563,"BirthDate");

    var LabelSexMale   = top.DispFrame.Public_GetString(32564,"Male");
    var LabelSexFemale = top.DispFrame.Public_GetString(32565,"Female");
    var LabelSexOther  = top.DispFrame.Public_GetString(32566,"Other");

    var LabelEraMeiji  = top.DispFrame.Public_GetString(32567,"Meiji");
    var LabelEraTaisho = top.DispFrame.Public_GetString(32568,"Taisho");
    var LabelEraShowa  = top.DispFrame.Public_GetString(32569,"Showa");
    var LabelEraHeisei = top.DispFrame.Public_GetString(32570,"Heisei");

    var ButtonBack  = top.DispFrame.Public_GetString(32572,"Back");
    var ButtonNext = "";
    if(ViewStatus == VIEW_MODE_INPUT){
      ButtonNext  = top.DispFrame.Public_GetString(32573,"Next");
    }else if(ViewStatus == VIEW_MODE_EDIT || ViewStatus == VIEW_MODE_CHANGE){
      ButtonNext  = top.DispFrame.Public_GetString(32574,"Update");
    }

    var UserGuidanceStringInput  = top.DispFrame.Public_GetString(32576,"UserGuidance1");
    var UserGuidanceStringEdit   = top.DispFrame.Public_GetString(32577,"UserGuidance2");
    var UserGuidanceStringChange = top.DispFrame.Public_GetString(32578,"UserGuidance3");

//    var ErrorInputPatientName       = top.DispFrame.Public_GetLangMsgString(31509,"Patient's name over");
//    var ErrorStirngPatientName      = top.DispFrame.Public_GetLangMsgString(31508,"Patient's name error");
//    var ErrorInputPatientKanjiName  = top.DispFrame.Public_GetLangMsgString(31511,"Kanji patient's name over");
//    var ErrorStirngPatientKanjiName = top.DispFrame.Public_GetLangMsgString(31510,"Kanji patient's name error");
//    var ErrorInputPatientBirth      = top.DispFrame.Public_GetLangMsgString(31512,"Patient's birthday error");
    var StopString           = top.DispFrame.Public_GetString(32737,",");

    var ProcString			 = top.DispFrame.Public_GetString(32730,"Please Waiting...");

    var ConfirmChangeString	 = top.DispFrame.Public_GetString(32575,"Change DB?");//TABLEタグを使用するか検討必要
    var ConfirmOkString		 = top.DispFrame.Public_GetString(32738,"Yes");
    var ConfirmCancelString	 = top.DispFrame.Public_GetString(32739,"No");

        //データ取得完了時にメソッドを呼ぶ      
        <%=ClientScript%>

	  }catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }

    </script>
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/EditPatientDetail_View.css">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/MessageWindow.css">
    <script language="javascript">
// 生年月日表示
	if(DateFormat == FORMAT_JAPANESEDATE && EraDisplayFlag == ERABUTTON_DISPLAY)
	{
		document.write('	    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/EditPatientDetail_View_Birth_Button.css">\n');
	}else{
		document.write('	    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/EditPatientDetail_View_Birth.css">\n');
	}	

	//2009.12.01 1.1(B)対応 FF星野 ADD-ST
	if(Veterinary == VETERINARY_FLAG)
	{
		document.write('	    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/EditPatient_Detail_View_Veterinary.css">\n');
	}
	else
	{
		document.write('	    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/EditPatient_Detail_View_Human.css">\n');

	}
	//2009.12.01 1.1(B)対応 FF星野 ADD-ED

    //**************************************************************************
    //  CR検査操作性向上(キーボード操作)に必要なページロード時の処理をする 061013 神立
    //**************************************************************************
    function InitKeyControl(){
        try{
            // 変数宣言　=======================================================
            // ログ用の定数
            var MSG_ID_BASE     = 30900; // CR検査部3x900のIDを使う
            
            // コントロール
            var name             = document.getElementById("txtPatientName");
            var kanjiName        = document.getElementById("txtPatientKanjiName");
            var birthDay         = document.getElementById("txtPatientBirth");
            
            var sexImages        = document.getElementsByName("imgSex");
            var maleRadio        = document.getElementById("DivSexMale_Value");
            var femaleRadio      = document.getElementById("DivSexFemale_Value");
            var otherRadio       = document.getElementById("DivSexOther_Value");
            
            var eraImages        = document.getElementsByName("imgEra");
            var meijiRadio       = document.getElementById("DivEraMeiji_Value");
            var taishoRadio      = document.getElementById("DivEraTaisho_Value");
            var showaRadio       = document.getElementById("DivEraShowa_Value");
            var heiseiRadio      = document.getElementById("DivEraHeisei_Value");
            
            var nextBtn          = document.getElementById("TABLE_Next");
            var nextImg          = document.getElementById("imgNext_Enable");

            var backBtn          = document.getElementById("divButtonNG");
            var backImg          = document.getElementById("imgBack");

            var errorFrame       = document.getElementById("TABLE_ErrorFrame");
            var errorOkBtn       = document.getElementById("DIV_ErrorButton");
            var errorOkImg       = document.getElementById("IMG_ErrorButton");
            
            var confirmFrame     = document.getElementById("TABLE_ConfirmFrame");
            var confirmOkBtn     = document.getElementById("DIV_ConfirmOkButton");
            var confirmOkImg     = document.getElementById("IMG_ConfirmOkButton");
            var confirmCancelBtn = document.getElementById("DIV_ConfirmCancelButton");
            var confirmCancelImg = document.getElementById("IMG_ConfirmOkButton");
            
            var sexNeuteredImages        = document.getElementsByName("imgSexNeutered");
            
            //2009.12.01 1.1(B)対応 FF星野 ADD-ST
			var patientComment = document.getElementById("txtPatientComment");
			var patientsSize = document.getElementById("txtPatientsSize");
			var patientsWeight =document.getElementById("txtPatientsWeight");
			var speciesDescription = document.getElementById("txtPatientSpeciesDescription");
			var breedDescription = document.getElementById("txtPatientBreedDescription");
			var responsiblePerson= document.getElementById("txtResponsiblePerson");
			var responsibleOrganization= document.getElementById("txtResponsibleOrganization");
			//2009.12.01 1.1(B)対応 FF星野 ADD-ED
            
            // 患者情報入力画面のBody ---
            var editPatientDetailBody  = document.getElementById("BODY");

            // FCRWeb\Main.aspxのエラー画面 -------------------------------------
            // ボタンイメージのパス
            var PATH_ERROR_OK_IMG_F = "./Bmp/cmOvalAGreenLBtnF.gif";
            var PATH_ERROR_OK_IMG_U = "./Bmp/cmOvalAGreenLBtnU.gif";
            // フレーム
            var mainErrorFrameName  = "TABLE_MainErrorFrame";

            // グローバル変数を初期化 =======================================
            groupHolder = [];
            msgIdBase   = MSG_ID_BASE; 

            // Enter, Space でClickできるようにする ===========================
            EnableClick(nextBtn);
            EnableClick(backBtn);
            EnableClick(errorOkBtn);
            EnableClick(confirmOkBtn);
            EnableClick(confirmCancelBtn);

            // テキストボックスでEnterを押したときの処理 ======================
            EnableEntry(name);
            EnableEntry(kanjiName);
            EnableEntry(birthDay);
			//2009.12.01 1.1(B)対応 FF星野 ADD-ST
            EnableEntry(patientsSize);
            EnableEntry(patientsWeight);
            EnableEntry(speciesDescription);
            EnableEntry(breedDescription);
            EnableEntry(responsiblePerson);
            EnableEntry(responsibleOrganization);
            //EnableEntry(patientComment);Enterで改行できなくなるので登録しない。
			//2009.12.01 1.1(B)対応 FF星野 ADD-ED
			
            // ラジオボタン  ==================================================
            // ① イベントハンドラを追加する
            // ② プロパティを設定する
            // ③ IMG部分もフォーカスを受け取れるようにする
            // ④ ラジオボタン１組を設定する
            
            // 性別 ------------------------------------------------------
            var sexRadios = [maleRadio, femaleRadio, otherRadio];
            
            for(var i=0; i<sexRadios.length; i++){
                // ①
                sexRadios[i].onfocus  = FocusSex ;
                sexRadios[i].onblur   = FocusSex ;
                // ②
                sexRadios[i].display  = sexImages[i] ;
            }

            // ③
            for(var i=0; i<sexImages.length; i++){
                sexImages[i].tabIndex = 0;
            }
            sexImages[0].onfocus = function(){maleRadio.focus()};
            sexImages[1].onfocus = function(){femaleRadio.focus()};
            sexImages[2].onfocus = function(){otherRadio.focus()};

            // ④
            var sexIDAry = [maleRadio.id, femaleRadio.id, otherRadio.id];
            CreateRadioGroup(sexIDAry, GetSelectedSex);

            // 和暦 ------------------------------------------------------
            var eraRadios = [meijiRadio, taishoRadio, showaRadio, heiseiRadio];
            
            for(var i=0; i<eraRadios.length; i++){
                // ①
                eraRadios[i].onfocus  = FocusEra ;
                eraRadios[i].onblur   = FocusEra ;
                // ②
                eraRadios[i].display  = eraImages[i] ;
            }
            // ③
            for(var i=0; i<eraImages.length; i++){
                eraImages[i].tabIndex = 0;
            }
            eraImages[0].onfocus = function(){meijiRadio.focus()};
            eraImages[1].onfocus = function(){taishoRadio.focus()};
            eraImages[2].onfocus = function(){showaRadio.focus()};
            eraImages[3].onfocus = function(){heiseiRadio.focus()};

            // ④
            // PVCS2124 昭和→平成→明治→大正 の順に変更 070208
            var eraIDAry = [showaRadio.id, heiseiRadio.id, meijiRadio.id, taishoRadio.id];
            CreateRadioGroup(eraIDAry, GetSelectedEra);

			//2009.12.01 1.1(B)対応 FF星野 ADD-ST
            // 避妊 ------------------------------------------------------
            var sexNeutredRadios = [alteredRadio, unalteredRadio, unknownRadio];
            
            for(var i=0; i<sexNeutredRadios.length; i++){
                // ①
                sexNeutredRadios[i].onfocus  = FocusSexNeutred ;
                sexNeutredRadios[i].onblur   = FocusSexNeutred ;
                // ②
                sexNeutredRadios[i].display  = sexNeuteredImages[i] ;
            }

            // ③
            for(var i=0; i<sexNeuteredImages.length; i++){
                sexNeuteredImages[i].tabIndex = 0;
            }
            sexNeuteredImages[0].onfocus = function(){alteredRadio.focus()};
            sexNeuteredImages[1].onfocus = function(){unalteredRadio.focus()};
            sexNeuteredImages[2].onfocus = function(){unknownRadio.focus()};

            // ④
            var sexNeuteredIDAry = [alteredRadio.id, unalteredRadio.id, unknownRadio.id];
            CreateRadioGroup(sexIDAry, GetSelectedSexNeutered);
			//2009.12.01 1.1(B)対応 FF星野 ADD-ED

            // フォーカス制御 =================================================
            // ①各コントロールに、イベントハンドラを追加する。 
            // ②プロパティを持たせる
            // ③ボタン上の文字などをクリックした時にもフォーカスが外れないようにする。
            // ④フォーカス対象の１グループを設定する 

            // テキストボックス
            // ①
            EnableTxtLeave(name);
            EnableTxtLeave(kanjiName);
            EnableTxtLeave(birthDay);
            //2009.12.01 1.1(B)対応 FF星野 ADD-ST
            EnableTxtLeave(patientsSize);
            EnableTxtLeave(patientsWeight);
            EnableTxtLeave(speciesDescription);
            EnableTxtLeave(breedDescription);
            EnableTxtLeave(responsiblePerson);
            EnableTxtLeave(responsibleOrganization);
            EnableTxtLeave(patientComment);
            //2009.12.01 1.1(B)対応 FF星野 ADD-ED
            // ②
            name.display      = name;
            kanjiName.display = kanjiName;
            birthDay.display  = birthDay ;
            //2009.12.01 1.1(B)対応 FF星野 ADD-ST
            patientsSize.display = patientsSize;
            patientsWeight.display = patientsWeight;
            speciesDescription.display = speciesDescription;
            breedDescription.display = breedDescription;
            responsiblePerson.display = responsiblePerson;
            responsibleOrganization.display = responsibleOrganization;
            patientComment.display = patientComment;
            //2009.12.01 1.1(B)対応 FF星野 ADD-ED
            
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
            nextBtn.EPDV_onfocusFunction     = FocusNextBtn;
            nextBtn.EPDV_onblurFunction      = BlurNextBtn;
            nextBtn.EPDV_onmousedownFunction = function(){nextBtn.pressed = true};
            nextBtn.EPDV_onmouseupFunction   = function(){nextBtn.pressed = false};
            nextBtn.EPDV_onmouseoutFunction  = function(){nextBtn.pressed = false};
            nextBtn.attachEvent("onfocus"    , FocusNextBtn);
            nextBtn.attachEvent("onblur"     , BlurNextBtn);
            nextBtn.attachEvent("onmousedown", nextBtn.EPDV_onmousedownFunction);
            nextBtn.attachEvent("onmouseup"  , nextBtn.EPDV_onmouseupFunction);
            nextBtn.attachEvent("onmouseout" , nextBtn.EPDV_onmouseoutFunction);
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
            backBtn.EPDV_onfocusFunction     = FocusBackBtn;
            backBtn.EPDV_onblurFunction      = BlurBackBtn;
            backBtn.EPDV_onmousedownFunction = function(){backBtn.pressed = true};
            backBtn.EPDV_onmouseupFunction   = function(){backBtn.pressed = false};
            backBtn.EPDV_onmouseoutFunction  = function(){backBtn.pressed = false};
            backBtn.attachEvent("onfocus"    , FocusBackBtn);
            backBtn.attachEvent("onblur"     , BlurBackBtn);
            backBtn.attachEvent("onmousedown", backBtn.EPDV_onmousedownFunction);
            backBtn.attachEvent("onmouseup"  , backBtn.EPDV_onmouseupFunction);
            backBtn.attachEvent("onmouseout" , backBtn.EPDV_onmouseoutFunction);
            // ②
            backBtn.focused = false;
            backBtn.pressed = false;
            backBtn.display = backImg;
            // ③
            EnableKeepFocus(backBtn);

            // ④
            // PVCS2124 元号のデフォルトフォーカス位置を「昭和」に変更 070208
            var array = [name.id, kanjiName.id, maleRadio.id, showaRadio.id, birthDay.id, nextBtn.id, backBtn.id];
            CreateFocusGroup(array); 

            // エラー画面 =====================================================
            // ①イベントハンドラを追加する
            // ②プロパティを設定する
            // ③ボタン上の文字などをクリックした時にもフォーカスが外れないようにする。
            // ④エラー画面１つ分のグループを設定する

            // OKボタンだけのエラー画面 ------------------------------------
            // ①
            // フォーカスが当った時のイベントハンドラ
            function FocusErrorOkBtn(){
                event.srcElement.focused = true;
                Public_OnButton(2);
                return false;
            }
            // フォーカスが外れた時のイベントハンドラ
            function BlurErrorOkBtn(){
                event.srcElement.focused = false;
                Public_OnButton(3);
                return false;
            }
            
            // イベントハンドラを追加する
            errorOkBtn.EPDV_onfocusFunction     = FocusErrorOkBtn;
            errorOkBtn.EPDV_onblurFunction      = BlurErrorOkBtn;
            errorOkBtn.EPDV_onmousedownFunction = function(){errorOkBtn.pressed = true};
            errorOkBtn.EPDV_onmouseupFunction   = function(){errorOkBtn.pressed = false};
            errorOkBtn.EPDV_onmouseoutFunction  = function(){errorOkBtn.pressed = false};
            errorOkBtn.EPDV_onclickFunction     = FocusTextbox
            errorOkBtn.attachEvent("onfocus"    , FocusErrorOkBtn);
            errorOkBtn.attachEvent("onblur"     , BlurErrorOkBtn);
            errorOkBtn.attachEvent("onmousedown", errorOkBtn.EPDV_onmousedownFunction);
            errorOkBtn.attachEvent("onmouseup"  , errorOkBtn.EPDV_onmouseupFunction);
            errorOkBtn.attachEvent("onmouseout" , errorOkBtn.EPDV_onmouseoutFunction);
            errorOkBtn.attachEvent("onclick"    , FocusTextbox);
            
            // ②
            errorFrame.keyControlable = true ;
            errorOkBtn.focused     = false;
            errorOkBtn.pressed     = false;
            errorOkBtn.img         = errorOkImg;
            
            // ③
            EnableKeepFocus(errorOkBtn);

            // ④
            // ボタン１つだけなのでグループは作らない
            
            // ボタン２つのエラー画面 -------------------------------------
            // ①
            // OKボタンフォーカス時のイベントハンドラ
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
            // Cancelボタンからフォーカスが離れた時のイベントハンドラ
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

            // イベントハンドラを追加する
            confirmOkBtn.EPDV_onfocusFunction     = FocusConfirmOkBtn;
            confirmOkBtn.EPDV_onblurFunction      = BlurConfirmOkBtn;
            confirmOkBtn.EPDV_onmousedownFunction = function(){confirmOkBtn.pressed = true};
            confirmOkBtn.EPDV_onmouseupFunction   = function(){confirmOkBtn.pressed = false};
            confirmOkBtn.EPDV_onmouseoutFunction  = function(){confirmOkBtn.pressed = false};
            confirmOkBtn.attachEvent("onfocus"    , FocusConfirmOkBtn);
            confirmOkBtn.attachEvent("onblur"     , BlurConfirmOkBtn);
            confirmOkBtn.attachEvent("onmousedown", confirmOkBtn.EPDV_onmousedownFunction);
            confirmOkBtn.attachEvent("onmouseup"  , confirmOkBtn.EPDV_onmouseupFunction);
            confirmOkBtn.attachEvent("onmouseout" , confirmOkBtn.EPDV_onmouseoutFunction);

            confirmCancelBtn.EPDV_onfocusFunction     = FocusConfirmCancelBtn;
            confirmCancelBtn.EPDV_onblurFunction      = BlurConfirmCancelBtn;
            confirmCancelBtn.EPDV_onmousedownFunction = function(){confirmCancelBtn.pressed = true};
            confirmCancelBtn.EPDV_onmouseupFunction   = function(){confirmCancelBtn.pressed = false};
            confirmCancelBtn.EPDV_onmouseoutFunction  = function(){confirmCancelBtn.pressed = false};
            confirmCancelBtn.attachEvent("onfocus"    , FocusConfirmCancelBtn);
            confirmCancelBtn.attachEvent("onblur"     , BlurConfirmCancelBtn);
            confirmCancelBtn.attachEvent("onmousedown", confirmCancelBtn.EPDV_onmousedownFunction);
            confirmCancelBtn.attachEvent("onmouseup"  , confirmCancelBtn.EPDV_onmouseupFunction);
            confirmCancelBtn.attachEvent("onmouseout" , confirmCancelBtn.EPDV_onmouseoutFunction);

            // ②
            confirmFrame.keyControlable = true ;

            confirmOkBtn.focused     = false ;
            confirmOkBtn.pressed     = false ;
            confirmOkBtn.display     = confirmOkImg;
            confirmOkBtn.hideFocus   = true;

            confirmCancelBtn.focused   = false ;
            confirmCancelBtn.pressed   = false ;
            confirmCancelBtn.display   = confirmCancelImg;
            confirmCancelBtn.hideFocus = true;
            
            // ③
            EnableKeepFocus(confirmOkBtn);
            EnableKeepFocus(confirmCancelBtn);

            // ④
            var confirmAry = [confirmCancelBtn.id, confirmOkBtn.id];
            CreateErrorButtonGroup(confirmAry);

            // Main.aspxのエラー画面をキー操作可能にする ======================
            
            // 090709 HSK齋藤誠 PC版画像確認モニタ対応 UPDATE-ST
            //if(isWindowsCE() == false){
            if(isClientTypeMini() == false){
            // 090709 HSK齋藤誠 PC版画像確認モニタ対応 UPDATE-ED
                InitMainErrKeyCtl(mainErrorFrameName, FocusTextbox);
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
            // 変数宣言　=======================================================

            // コントロール
            var name             = document.getElementById("txtPatientName");
            var kanjiName        = document.getElementById("txtPatientKanjiName");
            var birthDay         = document.getElementById("txtPatientBirth");
            
            var sexImages        = document.getElementsByName("imgSex");
            var maleRadio        = document.getElementById("DivSexMale_Value");
            var femaleRadio      = document.getElementById("DivSexFemale_Value");
            var otherRadio       = document.getElementById("DivSexOther_Value");
            
            var eraImages        = document.getElementsByName("imgEra");
            var meijiRadio       = document.getElementById("DivEraMeiji_Value");
            var taishoRadio      = document.getElementById("DivEraTaisho_Value");
            var showaRadio       = document.getElementById("DivEraShowa_Value");
            var heiseiRadio      = document.getElementById("DivEraHeisei_Value");
            
            var nextBtn          = document.getElementById("TABLE_Next");
            var backBtn          = document.getElementById("divButtonNG");
            var errorOkBtn       = document.getElementById("DIV_ErrorButton");
            var confirmOkBtn     = document.getElementById("DIV_ConfirmOkButton");
            var confirmCancelBtn = document.getElementById("DIV_ConfirmCancelButton");

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

            // EnableEntry()のメモリリーク対策 =================================
            DisableEntry(name);
            DisableEntry(kanjiName);
            DisableEntry(birthDay);

            // ラジオボタンのメモリリーク対策 ==================================
            
            // 性別 ------------------------------------------------------
            var sexRadios = [maleRadio, femaleRadio, otherRadio];
            
            for(var i=0; i<sexRadios.length; i++){
                sexRadios[i].onfocus  = null;
                sexRadios[i].onblur   = null;
                sexRadios[i].display  = null;
            }
            sexImages[0].onfocus = null;
            sexImages[1].onfocus = null;
            sexImages[2].onfocus = null;

            // 和暦 ------------------------------------------------------
            var eraRadios = [meijiRadio, taishoRadio, showaRadio, heiseiRadio];
            
            for(var i=0; i<eraRadios.length; i++){
                eraRadios[i].onfocus  = null;
                eraRadios[i].onblur   = null;
                eraRadios[i].display  = null;
            }
            eraImages[0].onfocus = null;
            eraImages[1].onfocus = null;
            eraImages[2].onfocus = null;
            eraImages[3].onfocus = null;

            // フォーカス制御のメモリリーク対策 ================================

            // テキストボックス
            DisableTxtLeave(name);
            DisableTxtLeave(kanjiName);
            DisableTxtLeave(birthDay);
 
            name.display      = null;
            kanjiName.display = null;
            birthDay.display  = null;
            
            // [次へ]ボタン
            nextBtn.detachEvent("onfocus"    , nextBtn.EPDV_onfocusFunction);
            nextBtn.detachEvent("onblur"     , nextBtn.EPDV_onblurFunction);
            nextBtn.detachEvent("onmousedown", nextBtn.EPDV_onmousedownFunction);
            nextBtn.detachEvent("onmouseup"  , nextBtn.EPDV_onmouseupFunction);
            nextBtn.detachEvent("onmouseout" , nextBtn.EPDV_onmouseoutFunction);
            nextBtn.EPDV_onfocusFunction     = null;
            nextBtn.EPDV_onblurFunction      = null;
            nextBtn.EPDV_onmousedownFunction = null;
            nextBtn.EPDV_onmouseupFunction   = null;
            nextBtn.EPDV_onmouseoutFunction  = null;
            nextBtn.display = null;
            DisableKeepFocus(nextBtn);

            // [戻る]ボタン
            backBtn.detachEvent("onfocus"    , backBtn.EPDV_onfocusFunction);
            backBtn.detachEvent("onblur"     , backBtn.EPDV_onblurFunction);
            backBtn.detachEvent("onmousedown", backBtn.EPDV_onmousedownFunction);
            backBtn.detachEvent("onmouseup"  , backBtn.EPDV_onmouseupFunction);
            backBtn.detachEvent("onmouseout" , backBtn.EPDV_onmouseoutFunction);
            backBtn.EPDV_onfocusFunction     = null;
            backBtn.EPDV_onblurFunction      = null;
            backBtn.EPDV_onmousedownFunction = null;
            backBtn.EPDV_onmouseupFunction   = null;
            backBtn.EPDV_onmouseoutFunction  = null;
            backBtn.display = null;
            DisableKeepFocus(backBtn);

            // エラー画面のメモリリーク対策 ====================================
            
            // OKボタンだけのエラー画面 ------------------------------------
            errorOkBtn.detachEvent("onfocus"    , errorOkBtn.EPDV_onfocusFunction);
            errorOkBtn.detachEvent("onblur"     , errorOkBtn.EPDV_onblurFunction);
            errorOkBtn.detachEvent("onmousedown", errorOkBtn.EPDV_onmousedownFunction);
            errorOkBtn.detachEvent("onmouseup"  , errorOkBtn.EPDV_onmouseupFunction);
            errorOkBtn.detachEvent("onmouseout" , errorOkBtn.EPDV_onmouseoutFunction);
            errorOkBtn.detachEvent("onclick"    , errorOkBtn.EPDV_onclickFunction);
            errorOkBtn.EPDV_onfocusFunction     = null;
            errorOkBtn.EPDV_onblurFunction      = null;
            errorOkBtn.EPDV_onmousedownFunction = null;
            errorOkBtn.EPDV_onmouseupFunction   = null;
            errorOkBtn.EPDV_onmouseoutFunction  = null;
            errorOkBtn.EPDV_onclickFunction     = null;
            errorOkBtn.img = null;
            DisableKeepFocus(errorOkBtn);

            // ボタン２つのエラー画面 -------------------------------------
            confirmOkBtn.detachEvent("onfocus"    , confirmOkBtn.EPDV_onfocusFunction);
            confirmOkBtn.detachEvent("onblur"     , confirmOkBtn.EPDV_onblurFunction);
            confirmOkBtn.detachEvent("onmousedown", confirmOkBtn.EPDV_onmousedownFunction);
            confirmOkBtn.detachEvent("onmouseup"  , confirmOkBtn.EPDV_onmouseupFunction);
            confirmOkBtn.detachEvent("onmouseout" , confirmOkBtn.EPDV_onmouseoutFunction);
            confirmOkBtn.EPDV_onfocusFunction     = null;
            confirmOkBtn.EPDV_onblurFunction      = null;
            confirmOkBtn.EPDV_onmousedownFunction = null;
            confirmOkBtn.EPDV_onmouseupFunction   = null;
            confirmOkBtn.EPDV_onmouseoutFunction  = null;
            confirmCancelBtn.detachEvent("onfocus"    , confirmCancelBtn.EPDV_onfocusFunction);
            confirmCancelBtn.detachEvent("onblur"     , confirmCancelBtn.EPDV_onblurFunction);
            confirmCancelBtn.detachEvent("onmousedown", confirmCancelBtn.EPDV_onmousedownFunction);
            confirmCancelBtn.detachEvent("onmouseup"  , confirmCancelBtn.EPDV_onmouseupFunction);
            confirmCancelBtn.detachEvent("onmouseout" , confirmCancelBtn.EPDV_onmouseoutFunction);
            confirmCancelBtn.EPDV_onfocusFunction     = null;
            confirmCancelBtn.EPDV_onblurFunction      = null;
            confirmCancelBtn.EPDV_onmousedownFunction = null;
            confirmCancelBtn.EPDV_onmouseupFunction   = null;
            confirmCancelBtn.EPDV_onmouseoutFunction  = null;
            confirmOkBtn.display = null;
            confirmCancelBtn.display = null;
            DisableKeepFocus(confirmOkBtn);
            DisableKeepFocus(confirmCancelBtn);

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
  </HEAD>
  <body id="BODY" onload="Fn_InitPage(); SetObjectParam();InitKeyControl();" onfocus="CurPositionClr();" onunload="CleanupKeyControl();" tabindex=-1>
      <!-- WindowsCEとWindowsXPの判別//-->
        <SCRIPT language="javascript">
        <!--        
        var isCE = isWindowsCE();
        //-->
        </SCRIPT>   
    <DIV id='divSelect"'>
      <!-- 患者名入力//-->
        <SCRIPT language="javascript">
        <!--
        if(isCE == false)
        {    
            WriteToDocument(
            "<OBJECT id='txtPatientName'",
            "onfocus='SelectText(document.getElementById(\"txtPatientName\"));'",        
            "classid='clsid:9AACD52E-FC2D-4ec6-8525-2D930AD0BBE0' VIEWASTEXT>",
            "</OBJECT>"
            );
        }
        else
        {   
            WriteToDocument(
            "<INPUT id='txtPatientName' type='text' onfocus='SelectText(document.getElementById(\"txtPatientName\"));'",
            "onmouseup='CurPosition()' onkeyup='CurPosition()'> "
            );
        }    
        //-->
        </SCRIPT>
      <!-- 漢字患者名入力//-->
        <SCRIPT language="javascript">
        <!--
        if(isCE == false)
        {    
            WriteToDocument(
            "<OBJECT id='txtPatientKanjiName'",
            "onfocus='SelectText(document.getElementById(\"txtPatientKanjiName\"));'",
            "classid='clsid:9AACD52E-FC2D-4ec6-8525-2D930AD0BBE0' VIEWASTEXT>",
            "</OBJECT>"
            );
        }
        else
        {   
            WriteToDocument(
            "<INPUT id='txtPatientKanjiName' type='text' onfocus='SelectText(document.getElementById(\"txtPatientKanjiName\"));'",
            "onmouseup='CurPosition()' onkeyup='CurPosition()'> "
            );
        }    
        //-->
        </SCRIPT>

        <SCRIPT language="javascript">
        <!--
		function FocusPNWithKanji()
		{
			document.getElementById("txtPatientName").InputMode =FuriganaIMEMode ;
			document.getElementById("txtPatientName").SelectIME();
			document.getElementById("txtPatientName").focused = true;
			return false;
		}		
		function FocusPName()
		{
			document.getElementById("txtPatientName").InputMode = ALPHA;
			document.getElementById("txtPatientName").SelectIME();
			document.getElementById("txtPatientName").focused = true;
			return false;
		}        
 		function FocusPKName()
		{
		//alert("focus");
			document.getElementById("txtPatientKanjiName").InputMode = HIRAGANA;
			document.getElementById("txtPatientKanjiName").SelectIME();
			document.getElementById("txtPatientKanjiName").focused = true;
			return false;
		}                    
        // オブジェクトタグのパラメータ設定
        function SetObjectParam()
        {
            if(isCE == false)
            {
//070425 HSK山本 PVCS#2137 UPDATE-ST
//            　　//テキストボックスのフォントを指定
                //テキストボックスのフォントを指定
//070425 HSK山本 PVCS#2137 UPDATE-ED
                document.getElementById("txtPatientName").FontName = FONT_NAME;
                document.getElementById("txtPatientName").FontSize = FONT_SIZE_INPUTBOX;
                document.getElementById("txtPatientName").FontStyleID = FONTSTYLE_BOLD; 
                document.getElementById("txtPatientName").SelectFont();
            
                document.getElementById("txtPatientKanjiName").FontName = FONT_NAME;
                document.getElementById("txtPatientKanjiName").FontSize = FONT_SIZE_INPUTBOX;
                document.getElementById("txtPatientKanjiName").FontStyleID = FONTSTYLE_BOLD; 
                document.getElementById("txtPatientKanjiName").SelectFont();
                
                //システムが日本語環境かそれ以外か。テキストの入力モードの設定
                if(LanguageValue==0)
                {
                    document.getElementById("txtPatientName").InputMode = FuriganaIMEMode;
                    document.getElementById("txtPatientName").attachEvent("onfocus",FocusPNWithKanji);
                    document.getElementById("txtPatientKanjiName").InputMode = HIRAGANA;
                    document.getElementById("txtPatientKanjiName").attachEvent("onfocus",FocusPKName);
					//フリガナ自動入力の設定
					document.getElementById("txtPatientKanjiName").AutoFurigana = FuriganaAutomaticInput;
                }
                else
                {
                    document.getElementById("txtPatientName").InputMode = ALPHA;
                    document.getElementById("txtPatientName").attachEvent("onfocus",FocusPName);
                    document.getElementById("txtPatientKanjiName").AutoFurigana = false;
                }         
            }
        }
        // フリガナ出力のイベント
        function txtPatientKanjiName::Furigana(yomi)
        {
            txtPatientName.value += yomi;
            txtPatientName.InitCaret();
        }

        //-->
        </SCRIPT>
      <!-- 生年月日入力//-->
      <INPUT id='txtPatientBirth' class='EraBirthDate' type='text' onfocus='SelectText(document.getElementById("txtPatientBirth"));'
        onmouseup='CurPosition()' onkeyup='CurPosition()'>
<!-- //2009.12.01 1.1(B)対応 FF星野 ADD-ST-->  
      <!-- 患者コメント入力//-->
      <TEXTAREA id='txtPatientComment' class='PatientComment' onfocus='SelectText(document.getElementById("txtPatientComment"));'
        onmouseup='CurPosition()' onkeyup="LengthCheck(this,1024);CurPosition();" rows='4' cols='50'></TEXTAREA>
      <!-- 身長入力//-->
      <INPUT id='txtPatientsSize' class='PatientsSize' type='text' maxlength=10 onfocus='SelectText(document.getElementById("txtPatientsSize"));'
        onmouseup='CurPosition()' onkeyup='CurPosition()'>
      <!-- 体重入力//-->
      <INPUT id='txtPatientsWeight' class='PatientsWeight' type='text' maxlength=10 onfocus='SelectText(document.getElementById("txtPatientsWeight"));'
        onmouseup='CurPosition()' onkeyup='CurPosition()'>
      <!-- 種別入力//-->
      <INPUT id='txtPatientSpeciesDescription' class='PatientSpeciesDescription' type='text' maxlength=64 onfocus='SelectText(document.getElementById("txtPatientSpeciesDescription"));'
        onmouseup='CurPosition()' onkeyup='CurPosition()'>       
      <!-- 品種入力//-->
      <INPUT id='txtPatientBreedDescription' class='PatientBreedDescription' type='text' maxlength=64 onfocus='SelectText(document.getElementById("txtPatientBreedDescription"));'
        onmouseup='CurPosition()' onkeyup='CurPosition()'>    
      <!-- 責任者入力//-->
      <INPUT id='txtResponsiblePerson' class='ResponsiblePerson' type='text' maxlength=64 onfocus='SelectText(document.getElementById("txtResponsiblePerson"));'
        onmouseup='CurPosition()' onkeyup='CurPosition()'>    
      <!-- 所属先入力//-->
      <INPUT id='txtResponsibleOrganization' class='ResponsibleOrganization' type='text' maxlength=64 onfocus='SelectText(document.getElementById("txtResponsibleOrganization"));'
        onmouseup='CurPosition()' onkeyup='CurPosition()'>    
<!-- //2009.12.01 1.1(B)対応 FF星野 ADD-ED-->  
    </DIV>
    <DIV id="divAll" oncontextmenu="return false;" onselectstart="return false;" ondrag="return false;"
      onfocus="CurPositionClr();">
<!-- 2005/05/24-ST //-->
      <!-- メッセージと主要画面の境界 -->
      <TABLE>
        <TR><TD ID="DIV_List_Border"></TD></TR>
      </TABLE> 
<!-- 2005/05/24-EN //-->
      <!-- 患者名ラベル//-->
      <DIV id="DivPatientName_Value" onfocus="CurPositionClr();"></DIV>
      <!-- 漢字患者名ラベル//-->
      <DIV id="DivPatientKanjiName_Value" onfocus="CurPositionClr();"></DIV>
      <!-- 敬称表示//-->
      <DIV id="DivNameHonorific"></DIV>
      <DIV id="DivKanjiHonorific"></DIV>
      <!-- 性別ボタン//-->
      <DIV id="DivPatientSex_Value" onfocus="CurPositionClr();"></DIV>
      <!--性別(男性)//-->
      <DIV id="DivSexMale_Value" onmousedown="document.getElementsByName('imgSex')[0].onmousedown();"
        onfocus="CurPositionClr();"></DIV>
      <IMG name="imgSex" class="SexMale" src="../Bmp/cmSquare1BtnU.GIF" onmousedown="SelectSex(1)">
      <!--性別(女性)//-->
      <DIV id="DivSexFemale_Value" onmousedown="document.getElementsByName('imgSex')[1].onmousedown();"
        onfocus="CurPositionClr();"></DIV>
      <IMG name="imgSex" class="SexFemale" src="../Bmp/cmSquare1BtnU.GIF" onmousedown="SelectSex(2)">
      <!--性別(その他)//-->
      <DIV id="DivSexOther_Value" onmousedown="document.getElementsByName('imgSex')[2].onmousedown();"
        onfocus="CurPositionClr();"></DIV>
      <IMG name="imgSex" class="SexOther" src="../Bmp/cmSquare1BtnU.GIF" onmousedown="SelectSex(3)">
      <!-- 生年月日//-->
      <DIV id="DivPatientBirth_Value" onfocus="CurPositionClr();"></DIV>
      <!-- 和暦ボタン//-->
      <DIV id='DivEraMeiji_Value' onmousedown='document.getElementsByName("imgEra")[0].onmousedown();'
        onfocus='CurPositionClr();'></DIV>
      <IMG Name='imgEra' class='EraMeiji' src='../Bmp/cmSquare1BtnU.GIF' onmousedown='SelectEra(1,"M")'>
      <DIV id='DivEraTaisho_Value' onmousedown='document.getElementsByName("imgEra")[1].onmousedown();'
        onfocus='CurPositionClr();'></DIV>
      <IMG Name='imgEra' class='EraTaisho' src='../Bmp/cmSquare1BtnU.GIF' onmousedown='SelectEra(2,"T")'>
      <DIV id='DivEraShowa_Value' onmousedown='document.getElementsByName("imgEra")[2].onmousedown();'
        onfocus='CurPositionClr();'></DIV>
      <IMG Name='imgEra' class='EraShowa' src='../Bmp/cmSquare1BtnU.GIF' onmousedown='SelectEra(3,"S")'>
      <DIV id='DivEraHeisei_Value' onmousedown='document.getElementsByName("imgEra")[3].onmousedown();'
        onfocus='CurPositionClr();'></DIV>
      <IMG Name='imgEra' class='EraHeisei' src='../Bmp/cmSquare1BtnU.GIF' onmousedown='SelectEra(4,"H")'>
      <FONT id='fontExample'>
        <DIV id='divExample' class='EraBirthExample' onfocus='CurPositionClr();'></DIV>
      </FONT>
      
<!-- //2009.12.01 1.1(B)対応 FF星野 ADD-ST-->  
      <!-- 患者コメントラベル//-->
      <DIV id="DivPatientComment_Value" onfocus="CurPositionClr();"></DIV>
      <!-- 身長ラベル//-->
      <DIV id="DivPatientsSize_Value" onfocus="CurPositionClr();"></DIV>
      <!-- 体重ラベル//-->
      <DIV id="DivPatientsWeight_Value" onfocus="CurPositionClr();"></DIV>
      <!-- 身長単位ラベル//-->
      <DIV id="DivPatientsSizeUnit_Value" onfocus="CurPositionClr();"></DIV>
      <!-- 体重単位ラベル//-->
      <DIV id="DivPatientsWeightUnit_Value" onfocus="CurPositionClr();"></DIV>

      <!-- 種別ラベル//-->
      <DIV id="DivPatientSpeciesDescription_Value" onfocus="CurPositionClr();"></DIV>
      <!-- 品種ラベル//-->
      <DIV id="DivPatientBreedDescription_Value" onfocus="CurPositionClr();"></DIV>
      <!-- 責任者ラベル//-->
      <DIV id="DivResponsiblePerson_Value" onfocus="CurPositionClr();"></DIV>
      <!-- 所属先ラベル//-->
      <DIV id="DivResponsibleOrganization" onfocus="CurPositionClr();"></DIV>
      
      <!-- 避妊去勢ボタン//-->
      <DIV id="DivSexNeutred_Value" onfocus="CurPositionClr();"></DIV>
      <!--避妊(有)//-->
      <DIV id="DivSexNeutredAltered_Value" onmousedown="document.getElementsByName('imgSexNeutred')[0].onmousedown();"
        onfocus="CurPositionClr();"></DIV>
      <IMG id="ImgSexNeutredAltered_Value" name="imgSexNeutred" class="SexAltered" src="../Bmp/cmSquare1BtnU.GIF" onmousedown="SelectSexNeutred(1)">
      <!--避妊(無)//-->
      <DIV id="DivSexNeutredUnAltered_Value" onmousedown="document.getElementsByName('imgSexNeutred')[1].onmousedown();"
        onfocus="CurPositionClr();"></DIV>
      <IMG id="ImgSexNeutredUnAltered_Value" name="imgSexNeutred" class="SexUnAltered" src="../Bmp/cmSquare1BtnU.GIF" onmousedown="SelectSexNeutred(2)">
      <!--避妊(不明)//-->
      <DIV id="DivSexNeutredUnknown_Value" onmousedown="document.getElementsByName('imgSexNeutred')[2].onmousedown();"
        onfocus="CurPositionClr();"></DIV>
      <IMG id="ImgSexNeutredUnknown_Value" name="imgSexNeutred" class="SexUnknown" src="../Bmp/cmSquare1BtnU.GIF" onmousedown="SelectSexNeutred(3)">      

      <!--患者情報取得-->
      <DIV id="DivGetPatientInfoLabel_Value" onfocus="CurPositionClr();"></DIV>
      <DIV id="DivGetPatientInfoButtonLabel_Value" onmousedown="Fn_OnButton(101)" onmouseup="Fn_OnButton(102)" onmouseout="Fn_OnButton(102)"
        onclick="Fn_OnButton(100)"></DIV>
      <IMG id = "ImgDivGetPatientInfo" name="imgGetPatientInfo" class="GetPatientInfo" src="../Bmp/cmObtainPatientInfo1BtnU.gif" onmousedown="Fn_OnButton(101)" onmouseup="Fn_OnButton(102)" onmouseout="Fn_OnButton(102)"
        onclick="Fn_OnButton(100)">

<!-- //2009.12.01 1.1(B)対応 FF星野 ADD-ED--> 
 
      <script language="javascript">
<!--
	if(isCE == true)//2009.12.01 1.1(B)対応 FF星野 ADD
	{	
		//2010.06.01 2.0(B)対応 FF星野 ADD-ST
		document.getElementById("DivGetPatientInfoLabel_Value").style.display  = "none";
		document.getElementById("DivGetPatientInfoButtonLabel_Value").style.display  = "none";
		document.getElementById("ImgDivGetPatientInfo").style.display  = "none";
		//2010.06.01 2.0(B)対応 FF星野 ADD-ED
		
		// ソフトキーボード表示
		if(SoftKeyBoardFlag == FLAG_SOFTKEYBOARD_USE){
			if(ValueMulti == REGISTRY_MULTIBYTE){
				document.write("				<iframe id='frmSoftKeyBoard' src='../SoftKeyBoard/SoftKeyBoard.aspx?KeyNo=2' frameBorder=0 scrolling='no' onload='Fn_SoftKeyBoardLoad()' tabindex=-1> </iframe>\n");
			}else{
				document.write("				<iframe id='frmSoftKeyBoard' src='../SoftKeyBoard/SoftKeyBoard.aspx?KeyNo=1' frameBorder=0 scrolling='no' onload='Fn_SoftKeyBoardLoad()' tabindex=-1> </iframe>\n");
			}	  
		}else{;}
	}else
	{
		//2010.06.01 2.0(B)対応 FF星野 ADD-ST
		document.getElementById("DivGetPatientInfoLabel_Value").style.display  = "block";
		document.getElementById("DivGetPatientInfoButtonLabel_Value").style.display  = "block";
		document.getElementById("ImgDivGetPatientInfo").style.display  = "block";
		//2010.06.01 2.0(B)対応 FF星野 ADD-ED
	}
//-->
      </script>
      <!-- コマンドボタン領域の色 -->
      <DIV ID="DIV_CommandBackGround"></DIV>
      <!-- リストとコマンドボタンの境界 -->
      <IMG SRC="../Bmp/cmBorder.gif" ID="IMG_List-Command_Border"> 
      <!-- ボタン背景//-->
      <IMG ID="IMG_Button_Back" SRC="../Bmp/crBtnBack5Plt.gif">
      <!-- 戻るボタン//-->
      <DIV id="divButtonNG" onmousedown="Fn_OnButton(91)" onmouseup="Fn_OnButton(92)" onmouseout="Fn_OnButton(92)"
        onclick="Fn_OnButton(90)">
        <DIV id="DivButtonNG_Value"></DIV>
        <IMG id="imgBack" src="../Bmp/cmOvalAPaleLBtnU.GIF">
      </DIV>
      <!-- 次へ(修正完了)ボタン//-->
	    <TABLE ID="TABLE_Next" ONCLICK="Fn_OnButton(95);" ONMOUSEDOWN="Fn_OnButton(96);" ONMOUSEOUT="Fn_OnButton(97);" onmouseup="Fn_OnButton(97)">
		    <TR><TD></TD></TR>
	    </TABLE>
      <DIV id="DivButtonOK_Value"></DIV>
      <IMG id="imgNext_Enable" src="../Bmp/cmCirBGreenBtnU.gif">
      <IMG id="imgNext_Disable" src="../Bmp/cmCirBGreenBtnX.gif">
    </DIV>
    <DIV id="divBox" oncontextmenu="return false;" onselectstart="return false;" ondrag="return false;">
      <!-- 確認ダイアログフレーム -->
      <TABLE ID="TABLE_ConfirmFrame">
        <TR>
          <TD></TD>
        </TR>
      </TABLE>
      <!-- ダイアログボックス -->
      <TABLE ID="TABLE_ConfirmBox">
        <TR>
          <TD id="TD_ConfirmTitle1"></TD>
        <TR>
        <TR>
          <TD id="TD_ConfirmTitle2"></TD>
        </TR>
        <TR>
          <TD id="TD_ConfirmText"></TD>
        </TR>
        <TR>
          <TD id="TD_ConfirmCode"></TD>
        </TR>
        <TR>
          <TD><BR>
          </TD>
        </TR>
        <TR>
          <TD><BR>
          </TD>
        </TR>
      </TABLE>
      <!-- キャンセルボタン -->
      <DIV id="DIV_ConfirmCancelButton" onmousedown="Fn_OnButton(51)" onmouseup="Fn_OnButton(52)"
        onmouseout="Fn_OnButton(52)" onclick="Fn_OnButton(50)">
        <DIV id="DIV_ConfirmCancelText"></DIV>
        <IMG id="IMG_ConfirmCancelButton" src="../Bmp/cmOvalAPaleLBtnU.gif">
      </DIV>
      <!-- ＯＫボタン -->
      <DIV id="DIV_ConfirmOkButton" onmousedown="Fn_OnButton(61)" onmouseup="Fn_OnButton(62)"
        onmouseout="Fn_OnButton(62)" onclick="Fn_OnButton(60)">
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
            <!-- <DIV id="DIV_ErrorButton" onmousedown="Public_OnButton(0)" onmouseup="Public_OnButton(1)" onmouseout="Public_OnButton(1)" onclick="Fn_CloseError()"> -->
            <DIV id="DIV_ErrorButton" onmousedown="Public_OnButton(0)" onmouseup="Public_OnButton(1)" onmouseout="Public_OnButton(1)" onclick="Fn_OnButton(201)">
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
