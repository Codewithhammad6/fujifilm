<%@ Page language="c#" Codebehind="ModifyMain.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.ModifyMain" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>ModifyMain</title>
		<%
/****************************************************************************

  @file ModifyMain.aspx

  @brief 修正メイン画面フレーム

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/21　YSK畑  　   V1.0　     新規作成

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
		<LINK REL="stylesheet" TYPE="text/css" HREF="CSS/ModifyMain.css">
		<LINK REL="stylesheet" TYPE="text/css" HREF="CSS/MessageWindow.css">
		<script language="javascript" src="./Include/ImageButton_Color.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/ModifyMain.js" charset="UTF-8"></script>
		<script language="javascript" src="./Include/MessageWindow.js" charset="UTF-8"></script>
        <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"     CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"   CHARSET="UTF-8"></SCRIPT>
		<script language="javascript" charset="UTF-8">
	  try{
	  	
        //データ取得完了時にメソッドを呼ぶ      
        <%=ClientScript%>
        var OpenMode               = <%=OpenMode%>;
        var FONT_NAME              = "<%=FontName%>";// フォント名
        var FONT_SIZE              = "<%=FontSize%>";// フォントサイズ
        // 2005/06/23 005 H.SAITO デザイン変更対応（フォントサイズ）
        var FONT_SIZE_CTRLBUTTON_NAME    = "<%=FontSize_CtrlButton_Name%>";    // フォントサイズ(入力ボックス(患者情報))       
        var FONT_SIZE_CTRLBUTTON_COMMENT = "<%=FontSize_CtrlButton_Comment%>"; // フォントサイズ(キャプション(入力ボックス横))        
        var FONT_SIZE_BUTTON             = "<%=FontSize_Button%>";             // フォントサイズ(ボタン)        
        var FONT_SIZE_OTHER              = "<%=FontSize_Other%>";              // フォントサイズ(その他)

        // 文字列
		    // メッセージ
//		    var NotLogInString         = top.DispFrame.Public_GetLangMsgString(31500,"Login user known");
//		    var LogOffString           = top.DispFrame.Public_GetLangMsgString(31501,"Logoff user");
//		    var DifferentIdString      = top.DispFrame.Public_GetLangMsgString(31502,"User different");
//		    var ForbiddenString        = top.DispFrame.Public_GetLangMsgString(31503,"User forbidden");
        var ProcString             = top.DispFrame.Public_GetString(32730,"Please wait...");
        // ボタン表題
        var LabelAddMenu     = top.DispFrame.Public_GetString(32400,"Add Menu");
        var LabelChangeMenu  = top.DispFrame.Public_GetString(32401,"Change Menu");
        var LabelDeleteMenu  = top.DispFrame.Public_GetString(32402,"Delete Menu");
        var LabelSortMenu    = top.DispFrame.Public_GetString(32403,"Turn Menu");
        var LabelChangeImg   = top.DispFrame.Public_GetString(32404,"Change Image");
        var LabelOutput      = top.DispFrame.Public_GetString(32405,"Output Setting");
        var LabelEditPatient = top.DispFrame.Public_GetString(32406,"Modify PatientInfomation");
				// ボタン説明
        var LabelAddMenuExplan     = top.DispFrame.Public_GetString(32407,"");
        var LabelChangeMenuExplan  = top.DispFrame.Public_GetString(32408,"");
        var LabelDeleteMenuExplan  = top.DispFrame.Public_GetString(32409,"");
        var LabelSortMenuExplan    = top.DispFrame.Public_GetString(32410,"");
        var LabelChangeImgExplan   = top.DispFrame.Public_GetString(32411,"");
        var LabelOutputExplan      = top.DispFrame.Public_GetString(32412,"");
        var LabelEditPatientExplan = top.DispFrame.Public_GetString(32413,"");
				// ボタン
        var ButtonBack	= "";
        if(OpenMode == OPEN_MODE_CE ){
          ButtonBack = top.DispFrame.Public_GetString(32414,"Back");
        }else if(OpenMode == OPEN_MODE_DIALOG || OpenMode == OPEN_MODE_WINDOW){
          ButtonBack = top.DispFrame.Public_GetString(32415,"Close");
		    }        
        var UserGuidanceString = top.DispFrame.Public_GetString(32416,"Please push Button");        
// 2005/08/22 Kanno ADD ST タイトルバーの文字列対応
        var TitleString        = top.DispFrame.Public_GetString(32417,"Main Menu");        
// 2005/08/22 Kanno ADD ED タイトルバーの文字列対応
		}catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
    }
		</script>
	</HEAD>
	<body ID="BODY" onload="Fn_InitPage()" onselectstart="return false;" ondrag="return false;" oncontextmenu="return false;">
<!-- 2005/05/24-ST //-->
      <!-- メッセージと主要画面の境界 -->
      <TABLE>
        <TR><TD ID="DIV_List_Border"></TD></TR>
      </TABLE> 
<!-- 2005/05/24-EN //-->
		<!--メニュー追加ボタン表示//-->
		<TABLE ID="TABLE_AddMenu" ONCLICK="Fn_OnButton(10);" ONMOUSEDOWN="Fn_OnButton(11);" ONMOUSEOUT="Fn_OnButton(12);">
			<TR><TD></TD></TR>
		</TABLE>
    <IMG SRC="../Bmp/crStudyAddBtnU.gif"  ID="imgAddMenu_Enable">
    <IMG SRC="../Bmp/crStudyAddBtnX.gif" ID="imgAddMenu_Disable">
    <DIV ID="divAddMenu_Title"></DIV>
    <DIV ID="divAddMenu_Value"></DIV>
		<!--メニュー変更ボタン表示//-->
		<TABLE ID="TABLE_ChangeMenu" ONCLICK="Fn_OnButton(20);" ONMOUSEDOWN="Fn_OnButton(21);" ONMOUSEOUT="Fn_OnButton(22);">
			<TR><TD></TD></TR>
		</TABLE>
    <IMG SRC="../Bmp/crStudyChgBtnU.gif" ID="imgChangeMenu_Enable">
    <IMG SRC="../Bmp/crStudyChgBtnX.gif" ID="imgChangeMenu_Disable">
    <DIV ID="divChangeMenu_Title"></DIV>
    <DIV ID="divChangeMenu_Value"></DIV>
		<!--メニュー削除ボタン表示//-->
		<TABLE ID="TABLE_DeleteMenu" ONCLICK="Fn_OnButton(30);" ONMOUSEDOWN="Fn_OnButton(31);" ONMOUSEOUT="Fn_OnButton(32);">
			<TR><TD></TD></TR>
		</TABLE>
    <IMG SRC="../Bmp/crStudyDelBtnU.gif" ID="imgDeleteMenu_Enable">
    <IMG SRC="../Bmp/crStudyDelBtnX.gif" ID="imgDeleteMenu_Disable">
    <DIV ID="divDeleteMenu_Title"></DIV>
    <DIV ID="divDeleteMenu_Value"></DIV>
		<!--メニュー入れ替えボタン表示//-->
		<TABLE ID="TABLE_SortMenu" ONCLICK="Fn_OnButton(40);" ONMOUSEDOWN="Fn_OnButton(41);" ONMOUSEOUT="Fn_OnButton(42);">
			<TR><TD></TD></TR>
		</TABLE>
    <IMG SRC="../Bmp/crStudyNumBtnU.gif" ID="imgSortMenu_Enable">
    <IMG SRC="../Bmp/crStudyNumBtnX.gif" ID="imgSortMenu_Disable">
    <DIV ID="divSortMenu_Title"></DIV>
    <DIV ID="divSortMenu_Value"></DIV>
		<!--画像入れ替えボタン表示//-->
		<TABLE ID="TABLE_ChangeImg" ONCLICK="Fn_OnButton(50);" ONMOUSEDOWN="Fn_OnButton(51);" ONMOUSEOUT="Fn_OnButton(52);">
			<TR><TD></TD></TR>
		</TABLE>
    <IMG SRC="../Bmp/crImageChgBtnU.gif" ID="imgChangeImg_Enable">
    <IMG SRC="../Bmp/crImageChgBtnX.gif" ID="imgChangeImg_Disable">
    <DIV ID="divChangeImg_Title"></DIV>
    <DIV ID="divChangeImg_Value"></DIV>
		<!--出力先ボタン表示//-->
		<TABLE ID="TABLE_Output" ONCLICK="Fn_OnButton(60);" ONMOUSEDOWN="Fn_OnButton(61);" ONMOUSEOUT="Fn_OnButton(62);">
			<TR><TD></TD></TR>
		</TABLE>
    <IMG SRC="../Bmp/crStudyPrintBtnU.gif" ID="imgOutput_Enable">
    <IMG SRC="../Bmp/crStudyPrintBtnX.gif" ID="imgOutput_Disable">
    <DIV ID="divOutput_Title"></DIV>
    <DIV ID="divOutput_Value"></DIV>
		<!--患者変更ボタン表示//-->
		<TABLE ID="TABLE_EditPatient" ONCLICK="Fn_OnButton(70);" ONMOUSEDOWN="Fn_OnButton(71);" ONMOUSEOUT="Fn_OnButton(72);">
			<TR><TD></TD></TR>
		</TABLE>
    <IMG SRC="../Bmp/crPatientEditBtnU.gif" ID="imgEditPatient_Enable">
    <IMG SRC="../Bmp/crPatientEditBtnX.gif" ID="imgEditPatient_Disable">
    <DIV ID="divEditPatient_Title"></DIV>
    <DIV ID="divEditPatient_Value"></DIV>
    <!-- コマンドボタン領域の色 -->  
    <DIV ID="DIV_CommandBackGround"></DIV>
    <!-- リストとコマンドボタンの境界 -->
    <IMG ID="IMG_List-Command_Border" SRC="../Bmp/cmBorder.gif">
		<!--画面遷移ボタン表示//-->
    <IMG SRC="../Bmp/crBtnBack6Plt.gif" ID="IMG_Back_BackGround">
		<TABLE ID="TABLE_Back" ONCLICK="Fn_OnButton(90);" ONMOUSEDOWN="Fn_OnButton(91);" ONMOUSEOUT="Fn_OnButton(92);">
			<TR><TD></TD></TR>
		</TABLE>
    <IMG SRC="../Bmp/cmOvalAPaleLBtnU.gif" ID="imgBack_Enable">
    <IMG SRC="../Bmp/cmOvalAPaleLBtnX.gif" ID="imgBack_Disable">
    <DIV ID="divBack_Value"></DIV>
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
            <!--<DIV id="DIV_ErrorButton" onmousedown="Public_OnButton(0)"	onmouseup="Public_OnButton(1)" onmouseout="Public_OnButton(1)" onclick="Public_CloseError()"> -->
            <DIV id="DIV_ErrorButton" onmousedown="Public_OnButton(0)"	onmouseup="Public_OnButton(1)" onmouseout="Public_OnButton(1)" onclick="Fn_OnButton(201)">
            <!-- 2005/09/16 PVCS#1429 H.SAITO StudyData_Get_Procでの排他チェックエラー後の遷移先変更対応(ダイアログが使いづらいので、インタフェース見直し）-ED- -->
              <DIV id="DIV_ErrorOkText"></DIV>
              <IMG id="IMG_ErrorButton" src="../Bmp/cmOvalAGreenLBtnU.gif">
            </DIV>
          </TD>
        </TR>
      </TABLE>
	</body>
</HTML>
