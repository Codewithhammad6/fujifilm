<%@ Page language="c#" Codebehind="ReserveStudy_View.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.ReserveStudy_View" ASPCOMPAT="true" %>
<%
/****************************************************************************

  @file ReserveStudy_View.aspx

  @brief 予約検査削除画面フレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/21  YSK畑　　   V1.0       新規作成

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
		<title>ReserveStudy_View</title>
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <META HTTP-EQUIV="Imagetoolbar" CONTENT="no">
		<script language="javascript" src="./Include/ChangeDateFormatDef.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/ChangeDBDateFormat.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/ImageButton_Color.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/ReserveStudy_View.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/MessageWindow.js" charset="UTF-8"></script>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Cookie.js"         CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"     CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"   CHARSET="UTF-8"></SCRIPT>
	  <script language=javascript>
	  try{
      var SPOT_CODE_ASPX = 0;                       //スポットコード
      var FILE_NAME_ASPX = "ReserveStudy_View.aspx";//ファイル名
      var FONT_NAME      = "<%=FontName%>";         //フォント名
      // 2005/06/23 009 H.SAITO デザイン変更対応（フォントサイズ）
      //var FONT_SIZE      = "<%=FontSize%>";         //フォントサイズを取得
      var FONT_SIZE_MENU          = "<%=FontSize_Menu%>";         //フォントサイズ(短冊内メニュー名称)
      var FONT_SIZE_MENU_PAGE     = "<%=FontSize_Menu_Page%>";    //フォントサイズ(短冊メニューページ数)
      var FONT_SIZE_INPUTBOX      = "<%=FontSize_InputBox%>";     //フォントサイズ(入力ボックス(患者情報))
      var FONT_SIZE_CAPTION       = "<%=FontSize_Caption%>";      //フォントサイズ(キャプション(入力ボックス横))
      var FONT_SIZE_BUTTON        = "<%=FontSize_Button%>";       //フォントサイズ(ボタン)
      var FONT_SIZE_BUTTON_UPICON = "<%=FontSize_Button_UpIcon%>";//フォントサイズ(ボタン(上部にアイコンを含む))
      var FONT_SIZE_OTHER         = "<%=FontSize_Other%>";        //フォントサイズ(その他)
// 変数=====================================
	var gListPage       = 1;					// メニューリスト表示ページ数
	var gListMaxPage    = 1;					// メニューリスト最大ページ数
	var gListMaxCount   = 1;					// メニュー最大数
	var gListNo         = 0;

	var aryMenuNameInfo  = new Array();
	var aryMenuStateInfo = new Array();

var ValueMulti     = <%=ValueMulti%>;			// マルチバイト
var DateFormat     = <%=DateFormat%>;			// 日付フォーマット
var HonorificFlag  = <%=HonorificFlag%>;		// 敬称表示フラグ
var HonorificTitle = "<%=HonorificTitle%>";		// 敬称表示文字列
//==================================================
// 文字列取得
var LabelPatientId              = top.DispFrame.Public_GetString(32310,"PatientId");
var LabelPatientName            = top.DispFrame.Public_GetString(32311,"Patientname"); 
var LabelPatientKanjiName       = top.DispFrame.Public_GetString(32312,"PatientKanjiName"); 
var LabelPatientSex             = top.DispFrame.Public_GetString(32313,"Sex"); 
var LabelPatientBirth           = top.DispFrame.Public_GetString(32314,"BirthDate"); 

var ButtonPatEdit               = top.DispFrame.Public_GetString(32315,"Edit"); 
var ButtonPatDetailEdit         = top.DispFrame.Public_GetString(32315,"Edit"); 
var ButtonPatChange             = top.DispFrame.Public_GetString(32316,"ChangePatient"); 

var ButtonModify                = top.DispFrame.Public_GetString(32320,"Modify"); 
var ButtonDelete                = top.DispFrame.Public_GetString(32321,"Delete"); 

var ButtonLogoff                = top.DispFrame.Public_GetString(32322,"Logoff"); 
var ButtonRenew                 = top.DispFrame.Public_GetString(32323,"Renew"); 
var ButtonRegist                = top.DispFrame.Public_GetString(32324,"Register"); 
var ButtonStart                 = top.DispFrame.Public_GetString(32325,"Start");

var LabelSexMale                = top.DispFrame.Public_GetString(32331,"Male");
var LabelSexFemale              = top.DispFrame.Public_GetString(32332,"Female");
var LabelSexOther               = top.DispFrame.Public_GetString(32333,"Other");
var LabelAge                    = top.DispFrame.Public_GetString(32736,"Age");

var LabelMenuTotal              = top.DispFrame.Public_GetString(32317,"Total");
var LabelMenuCount              = top.DispFrame.Public_GetString(32318,"Menu");
var LabelMenuPage               = top.DispFrame.Public_GetString(32319,"Page");

var LabelReserve                = top.DispFrame.Public_GetString(32330,"");//"保留中";
var UserGuideReserveString      = top.DispFrame.Public_GetString(32326,"UserString1");
var UserGuideNoReserveStirng    = top.DispFrame.Public_GetString(32327,"UserStirng2");
var NoReserveString             = top.DispFrame.Public_GetString(32329,"");//"現在予約検査はありません";
var ConfirmDeleteString         = top.DispFrame.Public_GetString(32328,"");//TABLEタグを使用するか検討必要
var ConfirmOkString					    = top.DispFrame.Public_GetString(32731,"OK");
var ConfirmCancelString			    = top.DispFrame.Public_GetString(32732,"Cancel");

var ProcString                  = top.DispFrame.Public_GetString(32730,"Please Waiting...");
//var ExclusiveErrorRuString      = top.DispFrame.Public_GetLangMsgString(31517,"")//"他の画面で検査実施中です。\n再施行しますか。";
//var ExclusiveErrorStudyString   = top.DispFrame.Public_GetLangMsgString(31504,"");//"他の画面で 検査/修正 操作実施中です。\n再施行しますか。";
//var NotFoundStudyString         = top.DispFrame.Public_GetLangMsgString(31516,"Study Delete");
// 操作権限エラー文字
//var NotLogInString         = top.DispFrame.Public_GetLangMsgString(31500,"Login user known");
//var LogOffString           = top.DispFrame.Public_GetLangMsgString(31501,"Logoff user");
//var DifferentIdString      = top.DispFrame.Public_GetLangMsgString(31502,"User different");
//var ForbiddenString        = top.DispFrame.Public_GetLangMsgString(31503,"User forbidden");
        //データ取得完了時にメソッドを呼ぶ      
        <%=ClientScript%>
	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }

		</script>
		<script language="javascript">
if(ValueMulti == REGISTRY_MULTIBYTE){
	document.write('	    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/ReserveStudy_View.css">\n');
}else{
	document.write('	    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/ReserveStudy_View_Single.css">\n');
}
		</script>
		<LINK href="CSS/MessageWindow.css" type="text/css" rel="stylesheet">
	</HEAD>
	<body ID="BODY" onselectstart="return false;" onload="Fn_InitPage()" ondrag="return false;" oncontextmenu="return false;">
		<!-- 予約検査背景色//-->
		<!--検査情報枠表示//-->
		<DIV ID="DIV_StudyInfo_Frame"></DIV>
    <!--患者情報背景//-->
    <DIV ID="DIV_Back_Black"></DIV>
		<!--患者情報枠表示//-->
		<DIV ID="DIV_PatInfo_Frame"></DIV>
    <!--メニュー情報背景//-->
    <DIV ID="DIV_MenuBack_Black"></DIV>
		<!--メニュー情報枠表示//-->
		<DIV ID="DIV_MenuInfo_Frame"></DIV>
		<!-- 保留中表示//-->
		<div id="divReserve"></div>
		<IMG id="imgReserve" src="../Bmp/crReserveSim.GIF">
		<!-- 患者背景表示//-->
		<IMG id="Img_Patient" src="../Bmp/crPatinetPlt.gif"> 
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
		<!--患者情報表示//-->
		<DIV id="divPatInfo0"></DIV>
		<DIV id="divPatInfo1"></DIV>
		<DIV id="divPatInfo2"></DIV>
		<DIV id="divPatInfo3"></DIV>
		<DIV id="divPatInfo4"></DIV>
		<!-- 患者ID編集ボタン表示//-->
		<DIV id="divEditId" onclick="Fn_OnButton(1)" onmousedown="Fn_OnButton(2)" onmouseout="Fn_OnButton(3)">
		  <IMG id="imgEditId" src="../Bmp/crPatideditBtnU.GIF">
		  <DIV id="divEditId_Value"></DIV>
	  </DIV>
		<!-- 患者詳細編集ボタン表示//-->
		<DIV id="divEditDetail" onclick="Fn_OnButton(5)" onmousedown="Fn_OnButton(6)" onmouseout="Fn_OnButton(7)">
	    <IMG id="imgEditDetail" src="../Bmp/crPatinfoeditBtnU.GIF">
		  <DIV id="divEditDetail_Value"></DIV>
    </DIV>
		<!-- 患者変更ボタン//-->
		<DIV id="divChange" onclick="Fn_OnButton(10)" onmousedown="Fn_OnButton(11)" onmouseout="Fn_OnButton(12)">
		  <IMG id="imgChangePatient" src="../Bmp/crPatchgBtnU.GIF">
		  <DIV id="divChange_Value"></DIV>
    </DIV>
		<!--メニューボタン表示//-->
		<IMG id="imgMenuInfo0" src="../Bmp/crMenuPlt.GIF"> 
		<IMG id="imgMenuInfo1" src="../Bmp/crMenuPlt.GIF">
		<IMG id="imgMenuInfo2" src="../Bmp/crMenuPlt.GIF"> 
		<IMG id="imgMenuInfo3" src="../Bmp/crMenuPlt.GIF">
		<!--メニュー情報写損表示//-->
		<IMG id="imgDeleteMenu0" src="../Bmp/crImageDelSim.gif"> 
		<IMG id="imgDeleteMenu1" src="../Bmp/crImageDelSim.gif">
		<IMG id="imgDeleteMenu2" src="../Bmp/crImageDelSim.gif"> 
		<IMG id="imgDeleteMenu3" src="../Bmp/crImageDelSim.gif">
		<!--メニュー情報表示//-->
		<INPUT id="divMenuInfo0" READONLY>
		<INPUT id="divMenuInfo1" READONLY>
		<INPUT id="divMenuInfo2" READONLY>
		<INPUT id="divMenuInfo3" READONLY>
		<!--メニュー数表示//-->
    <!--メニュー情報背景//-->
    <DIV ID="div_Back_MenuCount"></DIV>
		<DIV id="divMenuCount"></DIV>
		<!--↑メニューボタンの表示//-->
		<IMG id="imgUp_Enable" src="../Bmp/cmUpPage4BtnU.GIF" onclick="Fn_OnButton(60)" onmousedown="Fn_OnButton(61)" onmouseout="Fn_OnButton(62)">
		<IMG id="imgUp_Disable" src="../Bmp/cmUpPage4BtnX.GIF">
		<!--↓メニューボタンの表示//-->
		<IMG id="imgDown_Enable" src="../Bmp/cmDownPage4BtnU.GIF" onclick="Fn_OnButton(65)" onmousedown="Fn_OnButton(66)" onmouseout="Fn_OnButton(67)">
		<IMG id="imgDown_Disable" src="../Bmp/cmDownPage4BtnX.GIF">
		<!--ボタン背景の表示//-->
		<DIV ID="DIV_Button_Back"></DIV>
		<!--修正ボタンの表示//-->
	  <TABLE ID="TABLE_Modify" ONCLICK="Fn_OnButton(15);" ONMOUSEDOWN="Fn_OnButton(16);" ONMOUSEOUT="Fn_OnButton(17);">
		  <TR><TD></TD></TR>
	  </TABLE>
		<DIV id="divModify_Value"></DIV>
		<IMG id="imgModify_Enable" src="../Bmp/crStudyEditBtnU.GIF">
		<IMG id="imgModify_Disable" src="../Bmp/crStudyEditBtnX.GIF">
		<!--削除ボタンの表示//-->
	  <TABLE ID="TABLE_Delete" ONCLICK="Fn_OnButton(20);" ONMOUSEDOWN="Fn_OnButton(21);" ONMOUSEOUT="Fn_OnButton(22);">
		  <TR><TD></TD></TR>
	  </TABLE>
		<DIV id="divDelete_Value"></DIV>
		<IMG id="imgDelete_Enable" src="../Bmp/crStudyDelBtn2U.gif">
		<IMG id="imgDelete_Disable" src="../Bmp/crStudyDelBtn2X.gif">
		<!-- 予約検査遷移ボタン表示//-->
		<!-- 予約検査先頭へボタン表示//-->
		<IMG id="imgFirst_Enable"  src="../Bmp/cmTopBtnU.GIF" onclick="Fn_OnButton(70)" onmousedown="Fn_OnButton(71)" onmouseout="Fn_OnButton(72)">
		<IMG id="imgFirst_Disable" src="../Bmp/cmTopBtnX.GIF">
		<!-- 予約検査前へボタン表示//-->
		<IMG id="imgBack_Enable"  src="../Bmp/cmBeforeSBtnU.GIF" onclick="Fn_OnButton(75)" onmousedown="Fn_OnButton(76)" onmouseout="Fn_OnButton(77)">
		<IMG id="imgBack_Disable" src="../Bmp/cmBeforeSBtnX.GIF">
		<!-- 予約検査次へボタン表示//-->
		<IMG id="imgNext_Enable" src="../Bmp/cmNextSBtnU.GIF" onclick="Fn_OnButton(80)" onmousedown="Fn_OnButton(81)" onmouseout="Fn_OnButton(82)">
		<IMG id="imgNext_Disable" src="../Bmp/cmNextSBtnX.GIF">
		<!-- 予約検査最後へボタン表示//-->
		<IMG id="imgEnd_Enable"  src="../Bmp/cmBottomBtnU.GIF" onclick="Fn_OnButton(85)" onmousedown="Fn_OnButton(86)" onmouseout="Fn_OnButton(87)">
		<IMG id="imgEnd_Disable" src="../Bmp/cmBottomBtnX.GIF">
		<!-- 予約検査件数表示//-->
		<DIV ID="DIV_ReservePage_Back"></DIV>
		<DIV id="divReservePage"></DIV>
		<!--画面遷移ボタン表示//-->
		<!--ログオフボタン//-->
		<IMG id="IMG_Logoff_Back" SRC="../Bmp/crBtnBack6Plt.gif">
    <DIV id="divLogOff" onclick="Fn_OnButton(90)" onmousedown="Fn_OnButton(91)"  onmouseout="Fn_OnButton(92)">
		  <DIV id="divLogoff_Value"></DIV>
		  <IMG id="imgLogoff" src="../Bmp/cmOvalAPaleLBtnU.GIF"> 
		</DIV>
		<!--更新ボタン//-->
		<IMG ID="IMG_Renew_Back" SRC="../Bmp/crBtnBack3Plt.gif">
    <DIV id="divRenew" onclick="Fn_OnButton(50);" onmousedown="Fn_OnButton(51);"  onmouseout="Fn_OnButton(52);">
		  <DIV id="divRenew_Value"></DIV>
		  <IMG id="imgRenew" src="../Bmp/cmCirBblueBtnU.GIF"> 
		</DIV>
		<!--新規登録ボタン//-->
		<IMG ID="IMG_Regist_Back" SRC="../Bmp/crBtnBack3Plt.gif">
    <DIV id="divRegist" onclick="Fn_OnButton(93)" onmousedown="Fn_OnButton(94);"  onmouseout="Fn_OnButton(95)">
		  <DIV id="divRegist_Value"></DIV>
		  <IMG id="imgRegist" src="../Bmp/cmCirBblueBtnU.GIF"> 
		</DIV>
		<!--検査開始ボタン//-->
		<IMG ID="IMG_Start_Back" SRC="../Bmp/crBtnBack3Plt.gif">
	  <TABLE ID="TABLE_StudyStart" ONCLICK="Fn_OnButton(96);" ONMOUSEDOWN="Fn_OnButton(97);" ONMOUSEOUT="Fn_OnButton(98);">
		  <TR><TD></TD></TR>
	  </TABLE>
    <IMG ID="imgStart_Enable"   SRC="../Bmp/cmCirBGreenBtnU.gif">
    <IMG ID="imgStart_Disable"  SRC="../Bmp/cmCirBGreenBtnX.gif">
    <DIV ID="divStart_Value"></DIV>
		<!-- 予約件数0フレーム -->
		<TABLE ID="TABLE_NoReserveFrame">
			<TR><TD>
				<!-- 予約件数0表示 -->
				<TABLE ID="TABLE_NoReserveBox">
					<TR>
						<TD id="TD_NoReserveText"></TD>
					</TR>
				</TABLE>
			</TD></TR>
		</TABLE>
		<!-- 確認ダイアログフレーム -->
		<TABLE ID="TABLE_ConfirmFrame">
			<TR>
				<TD></TD>
			</TR>
		</TABLE>
		<!-- ダイアログボックス -->
		<TABLE ID="TABLE_ConfirmBox">
			<TR>
				<TD id="TD_ConfirmText"></TD>
			</TR>
		</TABLE>
		<!-- キャンセルボタン -->
		<DIV id="DIV_ConfirmCancelButton" onclick="Fn_OnButton(35)" onmousedown="Fn_OnButton(36);" onmouseout="Fn_OnButton(37);">
			<DIV id="DIV_ConfirmCancelText"></DIV>
			<IMG id="IMG_ConfirmCancelButton" src="../Bmp/cmOvalAPaleLBtnU.gif">
		</DIV>
		<!-- ＯＫボタン -->
		<DIV id="DIV_ConfirmOkButton" onclick="Fn_OnButton(25)" onmousedown="Fn_OnButton(26);" onmouseout="Fn_OnButton(27);">
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
           <DIV id="DIV_ErrorButton" onmousedown="Public_OnButton(0)"	onmouseup="Public_OnButton(1)" onmouseout="Public_OnButton(1)" onclick="Public_CloseError()">
              <DIV id="DIV_ErrorOkText"></DIV>
              <IMG id="IMG_ErrorButton" src="../Bmp/cmOvalAGreenLBtnU.gif">
            </DIV>
          </TD>
        </TR>
      </TABLE>
	</BODY>
</HTML>
