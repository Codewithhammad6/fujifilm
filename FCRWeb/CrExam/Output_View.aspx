<%@ Page language="c#" Codebehind="Output_View.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.Output_View" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
    <title>Output_View</title>
    <%
/****************************************************************************

  @file Output_View.aspx

  @brief 出力先設定画面フレーム

  @author YSK畑

  Copyright(C) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/10  YSK畑　     V1.0       新規作成
  @date  05/12/12  YSK齋藤　   V1.1.0.1   C@Rnaサービスの機能別有効化対応(PVCS#1698)
  @date  07/03/02  HSK山本     V2.0       DicomStorage出力機能
  @date  07/06/14  HSK山本     V2.0       PVCS#2342対応
  @date  07/10/02  HSK山本     V2.1.0.0   V3.0 出力必須解除
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
    <LINK href="CSS/Output_View.css" type="text/css" rel="stylesheet">
    <LINK href="CSS/MessageWindow.css" type="text/css" rel="stylesheet">
    <SCRIPT language="JavaScript" src="Include/Output_View.js" charset="UTF-8"></SCRIPT>
    <SCRIPT language="JavaScript" src="Include/MessageWindow.js" charset="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"     CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"   CHARSET="UTF-8"></SCRIPT>
    <script language="javascript">
	  try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "Output_View.aspx";  //ファイル名

		  // 画面オープンモード
		  var OpenMode      = <%=OpenMode%>;
      //フォント名を取得
      var FONT_NAME     = "<%=FontName%>";
      // 2005/06/23 011 H.SAITO デザイン変更対応（フォントサイズ）
      //フォントサイズを取得
      //var FONT_SIZE     = "<%=FontSize%>";
      // フォントサイズ(枠なしリスト)
      var FONT_SIZE_LIST        = "<%=FontSize_List%>";
      // フォントサイズ(リスト項目名)
      var FONT_SIZE_LIST_FIELD  = "<%=FontSize_List_Field%>";
      // フォントサイズ(ボタン)
      var FONT_SIZE_BUTTON      = "<%=FontSize_Button%>";
      // フォントサイズ(その他)
      var FONT_SIZE_OTHER       = "<%=FontSize_Other%>";
		  // 出力先設定情報
		  var OptionPrinter = <%=OptionPrinter%>;		// プリンタオプション
		  var OptionCarna   = <%=OptionCarna%>;		// C＠Rnaオプション
		  var OptionFile    = <%=OptionFile%>;		// 汎用ファイルオプション
    //070302 HSK山本 ADD-ST
        var OptionStorage = <%=OptionStorage%>;		// DicomStorageオプション
    //070302 HSK山本 ADD-ED
      // 2005/12/12 PVCS#1698 H.SAITO -ST-
		  var CarnaStorage   = "<%=CarnaStorage%>";	// C@Rna画像出力
      // 2005/12/12 PVCS#1698 H.SAITO -ED-
//071002 HSK山本 V3.0 出力必須解除 ADD-ST
        var IndispensableOutputFlag = <%=IndispensableOutputFlag%>;//出力必須解除設定
//071002 HSK山本 V3.0 出力必須解除 ADD-ED

		  // 文字列取得
		  var Label_OutputFlag   = top.DispFrame.Public_GetString(32430,"Output")//"出力の有無";
		  var Label_OutputStatus = top.DispFrame.Public_GetString(32431,"Output")//"現在の検査での状況";
		  var Label_OutputDevice = top.DispFrame.Public_GetString(32434,"OutputAlias")//"出力先";
		  var Label_OutputTiming = top.DispFrame.Public_GetString(32435,"Output Timing")//"出力タイミング";
		  var Label_OutputHeight = top.DispFrame.Public_GetString(32439,"OutputHigh")//"優先出力を行う";
 		
		  var Label_Button_Detail = top.DispFrame.Public_GetString(32438,"OutputDetail")//"詳細";
		  var Label_Button_Next   = top.DispFrame.Public_GetString(32442,"Update")//"修正完了";
		  var Lavel_Button_Back="";
		  if(OpenMode == OPEN_MODE_CE || OpenMode == OPEN_MODE_WINDOW){
		    Label_Button_Back   = top.DispFrame.Public_GetString(32440,"Back")//"戻る";
		  }else if(OpenMode == OPEN_MODE_DIALOG){
		    Label_Button_Back   = top.DispFrame.Public_GetString(32441,"Close")//"閉じる";
		  }
		  var Status_Output   = top.DispFrame.Public_GetString(32432,"")//"出力済み";
		  var Status_NoOutput = top.DispFrame.Public_GetString(32433,"")//"未出力";
		  var Status_Format   = top.DispFrame.Public_GetString(32446,"")//"指定なし";
		  var Device_Format   = top.DispFrame.Public_GetString(32447,"")//"-";
  		
		  var Timing_Confirm  = top.DispFrame.Public_GetString(32437,"Confirm")//"確認時";
		  var Timing_Decision = top.DispFrame.Public_GetString(32436,"Decision")//"確定時";
		  var Timing_Format   = top.DispFrame.Public_GetString(32447,"Decision")//"-";
      var ProcString          = top.DispFrame.Public_GetString(32730,"Please Waiting...");
		  var UserGuidanceString  = top.DispFrame.Public_GetString(32443,"UserGuidance")//"出力先の設定を行ってください。";		
      var ConfirmOkString         = top.DispFrame.Public_GetString(32731,"OK");     //"OK"
      var ConfirmCancelString     = top.DispFrame.Public_GetString(32732,"Cancel");
// 2005/08/22 Kanno ADD ST タイトルバーの文字列対応
      var TitleString         = top.DispFrame.Public_GetString(32448,"Setting Print / Save");
// 2005/08/22 Kanno ADD ED タイトルバーの文字列対応

	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
    </script>
  </HEAD>
  <body id="BODY" onselectstart="return false;" ondrag="return false;" onload="Fn_InitPage()" oncontextmenu="return false;">
    <!--ヘッダー//-->
    <div id="divHeadder0"></div>
    <DIV id="divHeadder1"></DIV>
    <DIV id="divHeadder2"></DIV>
    <DIV id="divHeadder3"></DIV>
<!-- 2005/05/24-ST //-->
    <DIV id="divBackGround"></DIV>
      <!-- メッセージと主要画面の境界 -->
      <TABLE>
        <TR><TD ID="DIV_List_Border"></TD></TR>
      </TABLE> 
<!-- 2005/05/24-EN //-->

    <!-- 出力先イメージ//--><IMG id="imgOutput0"> <IMG id="imgOutput1"> <IMG id="imgOutput2">
    <IMG id="imgOutput3"> 
    <!-- 070307 HSK山本ADD -ST //-->
    <IMG id="imgOutput4"> 
    <!-- 070307 HSK山本ADD -ED //-->
    <!--出力の有無(チェックボックス)//-->
    <INPUT id="chkOutput0" onclick="Fn_OnButton(1);" type="checkbox">
    <INPUT id="chkOutput1" onclick="Fn_OnButton(2);" type="checkbox">
    <INPUT id="chkOutput2" onclick="Fn_OnButton(3);" type="checkbox">
    <INPUT id="chkOutput3" onclick="Fn_OnButton(4);" type="checkbox"> 
    <!-- 070302 HSK山本ADD -ST //-->
    <INPUT id="chkOutput4" onclick="Fn_OnButton(5);" type="checkbox">
    <!-- 070302 HSK山本ADD -ED //-->
    <!--現在の検査での状況(チェックボックス)//-->
    <INPUT id="chkOutputStatus0" type="checkbox" DISABLED>
    <INPUT id="chkOutputStatus1" type="checkbox" DISABLED>
    <INPUT id="chkOutputStatus2" type="checkbox" DISABLED>
    <INPUT id="chkOutputStatus3" type="checkbox" DISABLED>
    <!-- 070302 HSK山本ADD -ST //-->
    <INPUT id="chkOutputStatus4" type="checkbox" DISABLED>
    <!-- 070302 HSK山本ADD -ED //-->
    <!--現在の検査での状況(文字列)//-->
    <DIV id="divOutputStatus0"></DIV>
    <DIV id="divOutputStatus1"></DIV>
    <DIV id="divOutputStatus2"></DIV>
    <DIV id="divOutputStatus3"></DIV>
    <!-- 070302 HSK山本ADD -ST //-->
    <DIV id="divOutputStatus4"></DIV>
    <!-- 070302 HSK山本ADD -ED //-->
    <!--出力先//-->
    <INPUT id="divOutputDevice0" READONLY>
    <INPUT id="divOutputDevice1" READONLY>
    <INPUT id="divOutputDevice2" READONLY>
    <INPUT id="divOutputDevice3" READONLY>
    <!-- 070302 HSK山本ADD -ST //-->
    <INPUT id="divOutputDevice4" READONLY>
    <!-- 070302 HSK山本ADD -ED //-->
    <!--出力タイミング//-->
    <DIV id="divOutputTiming0"></DIV>
    <DIV id="divOutputTiming1"></DIV>
    <DIV id="divOutputTiming2"></DIV>
    <DIV id="divOutputTiming3"></DIV>
    <!-- 070302 HSK山本ADD -ST //-->
    <DIV id="divOutputTiming4"></DIV>
    <!-- 070302 HSK山本ADD -ED //-->
    <!--詳細ボタン//-->
    <TABLE ID="TABLE_DetailBtn0" ONCLICK="Fn_Detail(0);" ONMOUSEDOWN="Fn_OnButton(21);" ONMOUSEOUT="Fn_OnButton(22);" ONMOUSEUP="Fn_OnButton(22);">
      <TR><TD></TD></TR>
    </TABLE>
    <div id="divDetail_Btn0">
      <DIV id="divDetail0"></DIV>
      <IMG id="imgDetail0_Enable" src="../Bmp/cmSquare1BtnU.gif">
      <IMG ID="imgDetail0_Disable" SRC="../Bmp/cmSquare1BtnX.gif">
    </div>
    <TABLE ID="TABLE_DetailBtn1" ONCLICK="Fn_Detail(1);" ONMOUSEDOWN="Fn_OnButton(31);" ONMOUSEOUT="Fn_OnButton(32);" ONMOUSEUP="Fn_OnButton(32);">
      <TR><TD></TD></TR>
    </TABLE>
    <div id="divDetail_Btn1">
      <DIV id="divDetail1"></DIV>
      <IMG id="imgDetail1_Enable" src="../Bmp/cmSquare1BtnU.GIF">
      <IMG ID="imgDetail1_Disable" SRC="../Bmp/cmSquare1BtnX.GIF">
    </div>
    <TABLE ID="TABLE_DetailBtn2" ONCLICK="Fn_Detail(2);" ONMOUSEDOWN="Fn_OnButton(41);" ONMOUSEOUT="Fn_OnButton(42);" ONMOUSEUP="Fn_OnButton(42);">
      <TR><TD></TD></TR>
    </TABLE>
    <div id="divDetail_Btn2">
      <DIV id="divDetail2"></DIV>
      <IMG id="imgDetail2_Enable" src="../Bmp/cmSquare1BtnU.GIF">
      <IMG ID="imgDetail2_Disable" SRC="../Bmp/cmSquare1BtnX.GIF">
    </div>
    <TABLE ID="TABLE_DetailBtn3" ONCLICK="Fn_Detail(3);" ONMOUSEDOWN="Fn_OnButton(51);" ONMOUSEOUT="Fn_OnButton(52);" ONMOUSEUP="Fn_OnButton(52);">
      <TR><TD></TD></TR>
    </TABLE>
    <div id="divDetail_Btn3">
      <DIV id="divDetail3"></DIV>
      <IMG id="imgDetail3_Enable" src="../Bmp/cmSquare1BtnU.GIF">
      <IMG ID="imgDetail3_Disable" SRC="../Bmp/cmSquare1BtnX.GIF">
    </div>
    <!-- 070302 HSK山本ADD -ST //-->
    <TABLE ID="TABLE_DetailBtn4" ONCLICK="Fn_Detail(4);" ONMOUSEDOWN="Fn_OnButton(61);" ONMOUSEOUT="Fn_OnButton(62);" ONMOUSEUP="Fn_OnButton(52);">
      <TR><TD></TD></TR>
    </TABLE>
    <div id="divDetail_Btn4">
      <DIV id="divDetail4"></DIV>
      <IMG id="imgDetail4_Enable" src="../Bmp/cmSquare1BtnU.GIF">
      <IMG ID="imgDetail4_Disable" SRC="../Bmp/cmSquare1BtnX.GIF">
    </div>
    <!-- 070302 HSK山本ADD -ED //-->
    <!-- 優先順位表示 -->
    <font id="OutputHeight">
    <!-- 070302 HSK山本 UPDATE-ST //-->
<!--    <DIV ONCLICK="Fn_OnButton(5);">  //-->
    <DIV ONCLICK="Fn_OnButton(10);">  
    <!-- 070302 HSK山本 UPDATE-ED //-->
      <DIV id="divOutputHeight"></DIV>
      <INPUT id="chkOutputHeight" type="checkbox">
    </DIV>
    </font> 
    <!-- コマンドボタン領域の色 -->  
    <DIV ID="DIV_CommandBackGround"></DIV>
    <!-- リストとコマンドボタンの境界 -->
    <IMG id="IMG_List-Command_Border" src="../Bmp/cmBorder.gif">
    <!-- 戻るボタン -->
  	<IMG ID="IMG_Cancel_BackGround" SRC="../Bmp/crBtnBack6Plt.gif">
		<TABLE ID="TABLE_CancelBtn" ONCLICK="Fn_OnButton(91);" ONMOUSEDOWN="Fn_OnButton(92);" ONMOUSEOUT="Fn_OnButton(93);">
			<TR><TD></TD></TR>
		</TABLE>
    <DIV id="DIV_CancelBtn">
      <IMG id="IMG_CancelBtn" src="../Bmp/cmOvalAPaleLBtnU.gif">
      <DIV id="DIV_CancelText"></DIV>
    </DIV>
    <!-- 修正完了ボタン -->
  	<IMG ID="IMG_Update_BackGround" SRC="../Bmp/crBtnBack4Plt.gif">
		<TABLE ID="TABLE_UpdateBtn" ONCLICK="Fn_OnButton(95);" ONMOUSEDOWN="Fn_OnButton(96);" ONMOUSEOUT="Fn_OnButton(97);">
			<TR><TD></TD></TR>
		</TABLE>
    <DIV id="DIV_UpdateBtn">
      <IMG id="IMG_UpdateBtn_Enable" src="../Bmp/cmCirBGreenBtnU.gif">
      <IMG ID="IMG_UpdateBtn_Disable" SRC="../Bmp/cmCirBGreenBtnX.gif">
      <DIV id="DIV_UpdateText"></DIV>
    </DIV>
    <!-- 処理中フレーム -->
    <TABLE id="TABLE_ProcFrame">
      <TR>
        <TD>
          <!-- 処理中ボックス -->
          <TABLE id="TABLE_ProcBox">
            <TR>
              <TD id="TD_ProcText"></TD>
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
            <!-- 070614 HSK山本 PVCS#2342 UPDATE-ST-->
            <!-- <DIV ID="DIV_ErrorButton" ONMOUSEDOWN="Public_OnButton(0)"	ONMOUSEUP="Public_OnButton(1)" ONMOUSEOUT="Public_OnButton(1)" ONCLICK="Public_CloseError()"> -->
            <DIV ID="DIV_ErrorButton" ONMOUSEDOWN="Public_OnButton(0)"	ONMOUSEUP="Public_OnButton(1)" ONMOUSEOUT="Public_OnButton(1)" ONCLICK="OnClickErrorButton()">
            <!-- 070614 HSK山本 PVCS#2342 UPDATE-ED-->
              <DIV id="DIV_ErrorOkText"></DIV>
              <IMG id="IMG_ErrorButton" src="../Bmp/cmOvalAGreenLBtnU.gif">
            </DIV>
          </TD>
        </TR>
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
  </body>
</HTML>
