<%@ Page LANGUAGE="c#" CodeBehind="Study_View.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.Study_View" ASPCOMPAT="true" %>
<HTML>
  <HEAD>
<%
    /****************************************************************************

  @file Study_View.aspx

  @brief 検査画面フレーム

  @author YSK齋藤

  Copyright(c) 2004-2008 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/11/09  YSK齋藤     V1.0       新規作成
  @date  08/04/18  HSK由比     V4.0       ガイダンス表示対応
  @date  09/06/12  FF 西川     V6.0       撮影画面最小化対応
  @date  14/03/05  TYS沼       V3.0(B)    DR撮影画面切替対応

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
    <META http-equiv="Imagetoolbar" content="no">
    <LINK HREF="CSS/Study_View.css"    TYPE="text/css" REL="stylesheet">
    <LINK HREF="CSS/MessageWindow.css" TYPE="text/css" REL="stylesheet">     
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Cookie.js"    CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Study_View.js"    CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/WindowUtility.js"     CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="../Include/FrameController.js"   CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" CHARSET="UTF-8">
		try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "Study_View.aspx"  //ファイル名
        //-------------------------//
				// 各変数は.jsにて宣言済み //
        //-------------------------//
				// 画面オープンモード
				OPEN_MODE							 = <%=OpenMode%>;
				//3050xST
				top.WindowOpenMode					= OPEN_MODE;
				//3050xED
				// だらだら入力監視間隔を取得
				NORMAL_WAITTIME				 = <%=SendReadOpeTime%>;
				// だらだら入力中監視間隔
				INPUT_WAITTIME				 = <%=CheckReadOpeTime%>;
				// 処理済画像ファイルのパス名
				IMAGE_FILE_PATH				 = "<%=ImageFilePath%>";
				// だらだら画像ファイルのパス名
				INPUT_IMAGE_FILE_PATH  = "<%=InputImageFilePath%>";
				// だらだら画像ファイルのパス名
        EXAMEND_STATUS         = "<%=ExamEndStatus%>";
				// フォント名
        FONT_NAME              = "<%=FontName%>";
        // サーバのホスト名
        HOST_NAME              = "<%=HostName%>";
        // 2005/06/22 013 H.SAITO デザイン変更対応(フォントサイズ）
        //// フォントサイズ
        //FONT_SIZE              = "<%=FontSize%>";
        // フォントサイズ(短冊内メニュー名称)
        FONT_SIZE_MENU         = "<%=FontSize_Menu%>";
        // フォントサイズ(短冊メニューページ数)
        FONT_SIZE_MENU_PAGE    = "<%=FontSize_Menu_Page%>";
        // フォントサイズ(ボタン)
        FONT_SIZE_BUTTON       = "<%=FontSize_Button%>";
        // フォントサイズ(ボタン(上部にアイコンを含む))
        FONT_SIZE_UPICON       = "<%=FontSize_Button_UpIcon%>";
        // フォントサイズ(その他)
        FONT_SIZE_OTHER        = "<%=FontSize_Other%>";

// 080418 HSK由比 ガイダンス表示対応 ADD-ST
        GUIDANCE_USE           = "<%=GuidanceUse%>";
// 080418 HSK由比 ガイダンス表示対応 ADD-ED
// 2014/03/12 TYS沼 DR直結対応 ADD START ------------------------------------------------
		// numa debug DRオプション名称未定
        CONNECTINGDR_USE = <%=ConnectingDRUse%>;		// DR切り替え
// 2014/03/12 TYS沼 DR直結対応 ADD END --------------------------------------------------

				// 文字列取得(文字列ＤＢから取得)
				ModifyText             = top.DispFrame.Public_GetString(32358,"Modify");      //"修正";
// 080515 HSK由比 ガイダンス表示対応 DELETE-ST
//				UndoText               = top.DispFrame.Public_GetString(32350,"Default");     //"元に戻す";
//				TurnLeftText					 = top.DispFrame.Public_GetString(32351,"Rotate 270");  //"左90ﾟ回転";
//				TurnRightText					 = top.DispFrame.Public_GetString(32352,"Rotate 90");   //"右90ﾟ回転";
//				Turn180Text						 = top.DispFrame.Public_GetString(32353,"Rotate 180");  //"180ﾟ回転"
//				ReverseText						 = top.DispFrame.Public_GetString(32354,"Turn");        //"左右回転";
// 080515 HSK由比 ガイダンス表示対応 DELETE-ED
				SuspendText						 = top.DispFrame.Public_GetString(32359,"Suspend");       //"保留";
// 090612 Nishikawa 簡易撮影画面 UPDATE-ST
				SimpleText						 = top.DispFrame.Public_GetString(32366,"Simple");       //"保留";
// 090612 Nishikawa 簡易撮影画面 UPDATE-ED
				ViewText               = top.DispFrame.Public_GetString(32360,"Viewer Mode"); //"ビューアーモード";
				UpdateText             = top.DispFrame.Public_GetString(32361,"Complete");
				ProcText               = top.DispFrame.Public_GetString(32730,"Please Waiting"); // お待ちください
				ErrorButton						 = top.DispFrame.Public_GetString(32731,"OK");     //"OK" 
				TOTAL_PAGE_STRING			 = top.DispFrame.Public_GetString(32355,"Total");
	    	PAGE_STRING						 = top.DispFrame.Public_GetString(32357,"Page");
    		MENU_STRING						 = top.DispFrame.Public_GetString(32356,"Menu");   //"ﾒﾆｭｰ"
    		// 2014/03/06 TYS沼 DR直結対応 ADD-ST
    		DrChangeText			   = top.DispFrame.Public_GetString(32375,"DR切替"); //"ビューアーモード";
    		// 2014/03/06 TYS沼 DR直結対応 ADD-END
        // 2005/07/20 H.SAITO 003 不要のため削除
        //UnshotMenuDeleteString = top.DispFrame.Public_GetLangMsgString(31518,"There is a menu of unTo.delete if?")//"未撮の撮影メニューがあります。削除してもよろしいですか";
        //StudyDeleteString      = top.DispFrame.Public_GetLangMsgString(31519,"This inspection is deleted. Is it good?")//"撮影していませんので、この検査を削除します。よろしいですか";
//        NotMoveViewString      = top.DispFrame.Public_GetLangMsgString(31520,"It is not possible to swicth to VIEWR MODE becaouse it doesn't take a picture.")//"撮影していませんので、ビューアーモードに切り替えできません。";
        ConfirmOkString        = top.DispFrame.Public_GetString(32731,"OK");     //"OK"
        ConfirmCancelString    = top.DispFrame.Public_GetString(32732,"Cancel");
        UserGuidanceString     = top.DispFrame.Public_GetString(32363,"UserGuidance");				
				// 操作権限エラー文字
//       NotLogInString         = top.DispFrame.Public_GetLangMsgString(31500,"Login user known");
//        LogOffString           = top.DispFrame.Public_GetLangMsgString(31501,"Logoff user");
//        DifferentIdString      = top.DispFrame.Public_GetLangMsgString(31502,"User different");
//        ForbiddenString        = top.DispFrame.Public_GetLangMsgString(31503,"User forbidden");
// 2005/08/22 Kanno ADD ST タイトルバーの文字列対応
        TitleString            = top.DispFrame.Public_GetString(32546,"Study");
// 2005/08/22 Kanno ADD ED タイトルバーの文字列対応

        
				//サーバ処理後に実行されるクライアントスクリプト
				<%=ClientScript%>
	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
    </SCRIPT>
  </HEAD>
  <BODY ID="BODY" ONLOAD="Fn_InitPage();" ONSELECTSTART="return false;" ONKEYDOWN="return false;" ONDRAG="return false;" oncontextmenu="return false;">
    <!-- ヘッダ -->
    <DIV ID="DIV_Study_Header"></DIV> 
    <!-- リスト縁左（灰）-->
    <DIV ID="DIV_BackGround_Gray_Left"></DIV> 
    <!-- リスト縁右（緑）-->
    <DIV ID="DIV_BackGround_Green_Right"></DIV> 
    <!-- リスト背景（灰）-->
    <DIV ID="DIV_BackGround_Gray"></DIV> 
    <!-- リスト背景（灰2）-->
    <DIV ID="DIV_BackGround_Gray2"></DIV> 
    <!-- リスト背景（紫）-->
    <DIV ID="DIV_BackGround_Purple"></DIV>
    <!-- 撮影写真背景 -->
    <DIV ID="DIV_PatientFilm"></DIV>
    <!-- 撮影写真 -->
    <DIV ID="DIV_PatientFilmImage"></DIV>
<!-- 2008/05/13 HSK由比 ガイダンス表示対応 ADD-ST -->
    <!-- ガイダンス画像 -->
    <DIV ID="DIV_GuidanceImage"></DIV>
<!-- 2008/05/13 HSK由比 ガイダンス表示対応 ADD-ST -->
    <!-- 撮影メニュー１ -->
    <DIV ID="DIV_StudyMenu1" ONCLICK="Fn_OnButton(1);">
      <IMG   ID="IMG_StudyMenu1" SRC="../Bmp/crUnSelMenu2Plt.gif">
      <DIV   ID="DIV_StudyFilm1"></DIV>
      <IMG   ID="IMG_DeleteImage1" SRC="../Bmp/crImageDelSim.gif">
      <INPUT ID="DIV_StudyText1" READONLY>
    </DIV>
    <!-- 撮影メニュー２ -->
    <DIV ID="DIV_StudyMenu2" ONCLICK="Fn_OnButton(2);">
      <IMG   ID="IMG_StudyMenu2" SRC="../Bmp/crUnSelMenu2Plt.gif">
      <DIV   ID="DIV_StudyFilm2"></DIV>
      <IMG   ID="IMG_DeleteImage2" SRC="../Bmp/crImageDelSim.gif">
      <INPUT ID="DIV_StudyText2" READONLY>
    </DIV>
    <!-- 撮影メニュー３ -->
    <DIV ID="DIV_StudyMenu3" ONCLICK="Fn_OnButton(3);">
      <IMG   ID="IMG_StudyMenu3" SRC="../Bmp/crUnSelMenu2Plt.gif">
      <DIV   ID="DIV_StudyFilm3"></DIV>
      <IMG   ID="IMG_DeleteImage3" SRC="../Bmp/crImageDelSim.gif">
      <INPUT ID="DIV_StudyText3" READONLY>
    </DIV>
    <!-- 撮影メニュー４ -->
    <DIV ID="DIV_StudyMenu4" ONCLICK="Fn_OnButton(4);">
      <IMG   ID="IMG_StudyMenu4" SRC="../Bmp/crUnSelMenu2Plt.gif">
      <DIV   ID="DIV_StudyFilm4"></DIV>
      <IMG   ID="IMG_DeleteImage4" SRC="../Bmp/crImageDelSim.gif">
      <INPUT ID="DIV_StudyText4" READONLY>
    </DIV>
    <!-- 隠しボタン(選択ボタン) -->
    <DIV ID="DIV_StudyMenu5" ONCLICK="Fn_OnButton(5);">
      <IMG ID="IMG_StudyMenu5" SRC="../Bmp/crSelMenu2Plt.gif">
    </DIV>
    <!-- 隠し画像(入力対象画像) -->
    <DIV ID="DIV_StudyFilm5" ONCLICK="Fn_OnButton(6);">
      <IMG ID="IMG_StudyFilm5" SRC="../Bmp/crNextMenuSim.gif">
    </DIV>
    <!-- 総数テキスト -->
    <DIV ID="DIV_TextCnt"></DIV>
    <!-- ↑ボタン -->
    <DIV ID="DIV_UpBtn">
      <IMG ID="IMG_UpBtn_Enable" SRC="../Bmp/cmUpPageBtnU.gif" ONCLICK="Fn_OnButton(11);" ONMOUSEDOWN="Fn_OnButton(12);" ONMOUSEOUT="Fn_OnButton(13);">
      <IMG ID="IMG_UpBtn_Disable" SRC="../Bmp/cmUpPageBtnX.gif">
    </DIV>
    <!-- ↓ボタン -->
    <DIV ID="DIV_DownBtn">
      <IMG ID="IMG_DownBtn_Enable" SRC="../Bmp/cmDownPageBtnU.gif" ONCLICK="Fn_OnButton(15);" ONMOUSEDOWN="Fn_OnButton(16);" ONMOUSEOUT="Fn_OnButton(17);">
      <IMG ID="IMG_DownBtn_Disable" SRC="../Bmp/cmDownPageBtnX.gif">
    </DIV>
    <!-- 修正ボタン -->
    <TABLE ID="TABLE_ModifyBtn"   ONCLICK="Fn_OnButton(21);" ONMOUSEDOWN="Fn_OnButton(22);" ONMOUSEOUT="Fn_OnButton(23);">
      <TR><TD></TD></TR>
    </TABLE>
    <IMG ID="IMG_ModifyBtn_Enable" SRC="../Bmp/crStudyEditBtnU.gif">
    <IMG ID="IMG_ModifyBtn_Disable" SRC="../Bmp/crStudyEditBtnX.gif">
    <DIV ID="DIV_ModifyText"></DIV>
    <!-- 元に戻すボタン -->
    <TABLE ID="TABLE_UndoBtn"     ONCLICK="Fn_OnButton(31);" ONMOUSEDOWN="Fn_OnButton(32);" ONMOUSEOUT="Fn_OnButton(33);">
      <TR><TD></TD></TR>
    </TABLE>
    <IMG ID="IMG_UndoBtn_Enable" SRC="../Bmp/crStudyUndoBtnU.gif">
    <IMG ID="IMG_UndoBtn_Disable" SRC="../Bmp/crStudyUndoBtnX.gif">
<!-- 2008/05/16 HSK由比 ガイダンス表示対応 DELETE-ST -->
<!--    <DIV ID="DIV_UndoText"></DIV> -->
<!-- 2008/05/16 HSK由比 ガイダンス表示対応 DELETE-ED -->
<!-- 2008/04/18 HSK由比 ガイダンス表示対応 ADD-ST -->
    <!-- ガイダンス切り替えボタン -->
    <TABLE ID="TABLE_GuidanceToggleBtn" ONCLICK="Fn_OnButton(161);" ONMOUSEDOWN="Fn_OnButton(162);" ONMOUSEOUT="Fn_OnButton(163);">
      <TR><TD></TD></TR>
    </TABLE>
    <IMG ID="IMG_GuidanceToggleBtn_Enable" SRC="../Bmp/crGuidanceBtnU1.gif">
    <IMG ID="IMG_GuidanceToggleBtn_Disable" SRC="../Bmp/crGuidanceBtnX.gif">
<!-- 2008/05/16 HSK由比 ガイダンス表示対応 DELETE-ST -->
<!--    <DIV ID="DIV_GuidanceToggleBtnText"></DIV> -->
<!-- 2008/05/16 HSK由比 ガイダンス表示対応 DELETE-ED -->
<!-- 2008/04/18 HSK由比 ガイダンス表示対応 ADD-ED -->
    <!-- 左９０°回転ボタン -->
    <TABLE ID="TABLE_TurnLeftBtn" ONCLICK="Fn_OnButton(41);" ONMOUSEDOWN="Fn_OnButton(42);" ONMOUSEOUT="Fn_OnButton(43);">
      <TR><TD></TD></TR>
    </TABLE>
    <IMG ID="IMG_TurnLeftBtn_Enable" SRC="../Bmp/crLeftRollBtnU.gif">
    <IMG ID="IMG_TurnLeftBtn_Disable" SRC="../Bmp/crLeftRollBtnX.gif">
<!-- 2008/05/16 HSK由比 ガイダンス表示対応 DELETE-ST -->
<!--    <DIV ID="DIV_TurnLeftText"></DIV> -->
<!-- 2008/05/16 HSK由比 ガイダンス表示対応 DELETE-ED -->
    <!-- 右９０°回転ボタン -->
    <TABLE ID="TABLE_TurnRightBtn" ONCLICK="Fn_OnButton(51);" ONMOUSEDOWN="Fn_OnButton(52);" ONMOUSEOUT="Fn_OnButton(53);">
      <TR><TD></TD></TR>
    </TABLE>
    <IMG ID="IMG_TurnRightBtn_Enable" SRC="../Bmp/crRightRollBtnU.gif">
    <IMG ID="IMG_TurnRightBtn_Disable" SRC="../Bmp/crRightRollBtnX.gif">
<!-- 2008/05/16 HSK由比 ガイダンス表示対応 DELETE-ST -->
<!--    <DIV ID="DIV_TurnRightText"></DIV> -->
<!-- 2008/05/16 HSK由比 ガイダンス表示対応 DELETE-ED -->
    <!-- １８０°回転ボタン -->
    <TABLE ID="TABLE_Turn180Btn"   ONCLICK="Fn_OnButton(61);" ONMOUSEDOWN="Fn_OnButton(62);" ONMOUSEOUT="Fn_OnButton(63);">
      <TR><TD></TD></TR>
    </TABLE>
    <IMG ID="IMG_Turn180Btn_Enable" SRC="../Bmp/crUpDwonBtnU.gif">
    <IMG ID="IMG_Turn180Btn_Disable" SRC="../Bmp/crUpDwonBtnX.gif">
<!-- 2008/05/16 HSK由比 ガイダンス表示対応 DELETE-ST -->
<!--    <DIV ID="DIV_Turn180Text"></DIV> -->
<!-- 2008/05/16 HSK由比 ガイダンス表示対応 DELETE-ED -->
    <!-- 左右回転ボタン -->
    <TABLE ID="TABLE_ReverseBtn"   ONCLICK="Fn_OnButton(71);" ONMOUSEDOWN="Fn_OnButton(72);" ONMOUSEOUT="Fn_OnButton(73);">
      <TR><TD></TD></TR>
    </TABLE>
    <IMG ID="IMG_ReverseBtn_Enable"  SRC="../Bmp/crMirrorBtnU.gif">
    <IMG ID="IMG_ReverseBtn_Disable" SRC="../Bmp/crMirrorBtnX.gif">
		<!-- 2014/03/05 TYS沼 DR直結対応 ADD-ST -->
		<!-- DR撮影画面切替ボタン -->
		<TABLE ID="TABLE_DRChangeBtn" ONCLICK="Fn_OnButton(78);" ONMOUSEDOWN="Fn_OnButton(79);"
			ONMOUSEOUT="Fn_OnButton(80);">
			<TR>
				<TD></TD>
			</TR>
		</TABLE>
		<DIV ID="DIV_DRChangeBtn">
			<IMG ID="IMG_DRChangeBtn_Enable" SRC="../Bmp/cmOvalAPaleLLBtnU.gif"> <IMG ID="IMG_DRChangeBtn_Disable" SRC="../Bmp/cmOvalAPaleLLBtnX.gif">
			<DIV ID="DIV_DRChangeText"></DIV>
		</DIV>
		<!-- 2014/03/05 TYS沼 DR直結対応 ADD-ED -->
<!-- 2008/05/16 HSK由比 ガイダンス表示対応 DELETE-ST -->
<!--    <DIV ID="DIV_ReverseText"></DIV> -->
<!-- 2008/05/16 HSK由比 ガイダンス表示対応 DELETE-ED -->
    <!-- 保留ボタン(ビューアーモード表示時) -->
    <TABLE ID="TABLE_SuspendBtn"   ONCLICK="Fn_OnButton(81);" ONMOUSEDOWN="Fn_OnButton(82);" ONMOUSEOUT="Fn_OnButton(83);">
      <TR><TD></TD></TR>
    </TABLE>
    <DIV ID="DIV_SuspendBtn">
      <IMG ID="IMG_SuspendBtn_Enable" SRC="../Bmp/cmOvalAPaleSBtnU.gif">
      <IMG ID="IMG_SuspendBtn_Disable" SRC="../Bmp/cmOvalAPaleSBtnX.gif">
      <DIV ID="DIV_SuspendText"></DIV>
    </DIV>
    <!-- 保留ボタン(ビューアーモード非表示時) -->
    <TABLE ID="TABLE_SuspendBtn2"   ONCLICK="Fn_OnButton(85);" ONMOUSEDOWN="Fn_OnButton(86);" ONMOUSEOUT="Fn_OnButton(87);">
      <TR><TD></TD></TR>
    </TABLE>
    <DIV ID="DIV_SuspendBtn2">
      <IMG ID="IMG_SuspendBtn2_Enable" SRC="../Bmp/cmOvalAPaleLBtnU.gif">
      <IMG ID="IMG_SuspendBtn2_Disable" SRC="../Bmp/cmOvalAPaleLBtnX.gif">
      <DIV ID="DIV_SuspendText2"></DIV>
    </DIV>
<!-- 2009/06/12 Nishikawa UPDATE-ST V6.0簡易撮影画面対応-->
    <!-- 簡易撮影画面ボタン(ビューアーモード表示時) -->
    <TABLE ID="TABLE_SimpleBtn"   ONCLICK="Fn_OnButton(171);" ONMOUSEDOWN="Fn_OnButton(172);" ONMOUSEOUT="Fn_OnButton(173);">
      <TR><TD></TD></TR>
    </TABLE>
    <DIV ID="DIV_SimpleBtn">
      <IMG ID="IMG_SimpleBtn_Enable" SRC="../Bmp/cmOvalAPaleSBtnU.gif">
      <IMG ID="IMG_SimpleBtn_Disable" SRC="../Bmp/cmOvalAPaleSBtnX.gif">
      <DIV ID="DIV_SimpleText"></DIV>
    </DIV>
    <!-- 保留ボタン(画像確認モニタ) -->
    <!--<TABLE ID="TABLE_SimpleBtn2"   ONCLICK="Fn_OnButton(175);" ONMOUSEDOWN="Fn_OnButton(176);" ONMOUSEOUT="Fn_OnButton(177);">
      <TR><TD></TD></TR>
    </TABLE>
    <DIV ID="DIV_SimpleBtn2">
      <IMG ID="IMG_SimpleBtn2_Enable" SRC="../Bmp/cmOvalAPaleLBtnU.gif">
      <IMG ID="IMG_SimpleBtn2_Disable" SRC="../Bmp/cmOvalAPaleLBtnX.gif">
      <DIV ID="DIV_SimpleText2"></DIV>
    </DIV>-->
<!-- 2009/06/12 Nishikawa UPDATE-ED V6.0簡易撮影画面対応-->
    <!-- ビューアーモードボタン -->
    <TABLE ID="TABLE_ViewBtn"      ONCLICK="Fn_OnButton(91);" ONMOUSEDOWN="Fn_OnButton(92);" ONMOUSEOUT="Fn_OnButton(93);">
      <TR><TD></TD></TR>
    </TABLE>
    <DIV ID="DIV_ViewBtn">
      <IMG ID="IMG_ViewBtn_Enable"  SRC="../Bmp/cmCirBblueBtnU.gif">
      <IMG ID="IMG_ViewBtn_Disable" SRC="../Bmp/cmCirBblueBtnX.gif">
      <DIV ID="DIV_ViewText"></DIV>
    </DIV>
    <!-- 確認ボタン -->
    <TABLE ID="TABLE_UpdateBtn"    ONCLICK="Fn_OnButton(101);" ONMOUSEDOWN="Fn_OnButton(102);" ONMOUSEOUT="Fn_OnButton(103);">
      <TR><TD></TD></TR>
    </TABLE>
    <DIV ID="DIV_UpdateBtn">
      <IMG ID="IMG_UpdateBtn_Enable"  SRC="../Bmp/cmCirBGreenBtnU.gif">
      <IMG ID="IMG_UpdateBtn_Disable" SRC="../Bmp/cmCirBGreenBtnX.gif">
      <DIV ID="DIV_UpdateText"></DIV>
    </DIV>
    <!-- ２連ボタン背景 -->
    <IMG ID="IMG_DoubleBackBtn" SRC="../Bmp/crBtnBack2Plt.gif"> 
    <!-- ３連ボタン背景 -->
    <IMG ID="IMG_TripleBackBtn" SRC="../Bmp/crBtnBackPlt.gif"> 
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
    <!-- 2005/07/13 020 H.SAITO 再送処理対応 再送処理判定専用のダイアログ -->   
    <!-- ダイアログボックス -->
    <TABLE ID="TABLE_ConfirmBox_ReSend">
      <TR><TD ID="TD_ConfirmTitle1_ReSend"></TD></TR>
      <TR><TD ID="TD_ConfirmTitle2_ReSend"></TD></TR>
      <TR><TD ID="TD_ConfirmText_ReSend"></TD></TR>
      <TR><TD ID="TD_ConfirmCode_ReSend"></TD></TR>
      <TR><TD><BR></TD></TR>
      <TR><TD><BR></TD></TR>
    </TABLE>
    <!-- ＯＫボタン -->
    <DIV ID="DIV_ConfirmOkButton_ReSend" ONCLICK="Fn_OnButton(131)" ONMOUSEDOWN="Fn_OnButton(132)" ONMOUSEOUT="Fn_OnButton(133)">
      <DIV ID="DIV_ConfirmOkText_ReSend"></DIV>
      <IMG ID="IMG_ConfirmOkButton_ReSend" SRC="../Bmp/cmOvalAGreenLBtnU.gif">
    </DIV>
    <!-- キャンセルボタン -->
    <DIV ID="DIV_ConfirmCancelButton_ReSend" ONCLICK="Fn_OnButton(141)" ONMOUSEDOWN="Fn_OnButton(142)" ONMOUSEOUT="Fn_OnButton(143)">
      <DIV ID="DIV_ConfirmCancelText_ReSend"></DIV>
      <IMG ID="IMG_ConfirmCancelButton_ReSend" SRC="../Bmp/cmOvalAPaleLBtnU.gif">
    </DIV>
    <!-- 2005/08/03 019 H.SAITO #790 RU自己排他エラー対応 RU排他エラー専用のダイアログ -->
    <!-- エラーフレーム -->
    <TABLE ID="TABLE_ErrorFrame_SelfRu">
      <TR><TD>
        <!-- 処理中ボックス -->
        <TABLE ID="TABLE_ErrorBox_SelfRu">
          <TR><TD id="TD_ErrorTitle1_SelfRu"><br></TD></TR>
          <TR><TD id="TD_ErrorTitle2_SelfRu"><br></TD></TR>
          <TR><TD id="TD_ErrorText_SelfRu"><br></TD></TR>
          <TR><TD id="TD_ErrorCode_SelfRu"><br></TD></TR>
          <TR><TD><br></TD></TR>
        </TABLE>
        <!-- ボタン -->
        <DIV id="DIV_ErrorButton_SelfRu"  ONCLICK="Fn_OnButton(151)" ONMOUSEDOWN="Fn_OnButton(152)"	ONMOUSEOUT="Fn_OnButton(153)">
          <DIV id="DIV_ErrorOkText_SelfRu"></DIV>
          <IMG id="IMG_ErrorButton_SelfRu" src="../Bmp/cmOvalAGreenLBtnU.gif">
        </DIV>
      </TD></TR>
    </TABLE>
  </BODY>
</HTML>