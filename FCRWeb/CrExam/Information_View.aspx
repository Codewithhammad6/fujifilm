<%@ Page language="c#" Codebehind="Information_View.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.Information_View" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" > 
<%
/****************************************************************************

  @file Information_View.aspx

  @brief 患者情報/ユーザガイダンス表示画面フレーム

  @author YSK齋藤

  Copyright(c) 2004-2009 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/08  YSK齋藤     V1.0       新規作成
  @date  09/12/01  FFS黒田     V1.1(B)    患者情報項目追加

/****************************************************************************/
%>
<%
/* キャッシュ制御を停止 */
Response.CacheControl = "no-cache";
Response.AddHeader("Pragma","no-cache");
Response.Expires = -1;
%>
<HTML>
  <HEAD>
    <META content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
    <META content="C#" name="CODE_LANGUAGE">
    <META content="JavaScript" name="vs_defaultClientScript">
    <META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <META HTTP-EQUIV="Imagetoolbar" CONTENT="no">
		<LINK REL="stylesheet" TYPE="text/css" HREF="CSS/Information_View.css">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Information_View.js"    CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js"       CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/ChangeDBDateFormat.js"  CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="Include/ChangeDateFormatDef.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript">
    try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "Information_View.aspx"  //ファイル名

			// 敬称文字を取得
			HonorificTitle = "<%=HonorificTitle%>";
			// 日付フォーマットを取得
			DateFormat		 = "<%=DateFormat%>";
			// 時刻フォーマットを取得
			TimeFormat		 = "<%=TimeFormat%>";
      // フォント名を取得
      FONT_NAME      = "<%=FontName%>"; 
      // フォントサイズを取得
      FONT_SIZE      = "<%=FontSize%>"; 
			// 性別の文字を取得
			SexMale        = top.DispFrame.Public_GetString(32733,"Male");
			SexFemale      = top.DispFrame.Public_GetString(32734,"Female");
			SexOther       = top.DispFrame.Public_GetString(32735,"Other");
			// 年齢の文字を取得
			AgeString      = top.DispFrame.Public_GetString(32736,"age");

			// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Add Start
			//避妊処置の文字を取得
			SexNeutredAltered     = top.DispFrame.Public_GetString(32751,"ALTERED");
			SexNeutredUnnaltered  = top.DispFrame.Public_GetString(32752,"UNNALTERED");
			// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Add End

			// エラー時のクライアントスクリプト
			<%=ClientScript%>

		}catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
		}

	  </SCRIPT>
  </HEAD>
  <BODY ID="BODY" ONLOAD="Fn_InitPage();" ONSELECTSTART="return false;" ONKEYDOWN="return false;" ONDRAG="return false;" oncontextmenu="return false;">
    <!-- 患者情報 -->
    <DIV ID="DIV_BackGround"></DIV>
    <IMG SRC="../Bmp/crTitlePlt.gif"  ID="IMG_BackGround_Gray_Patient"> 
    <!-- 患者ＩＤ -->
    <DIV ID="DIV_PatientIDText"></DIV>
    <!-- 性別 -->
    <DIV ID="DIV_PatientSexText"></DIV>
    <!-- 患者名 -->
    <DIV ID="DIV_PatientNameText"></DIV>
    <!-- 生年月日 -->
    <DIV ID="DIV_PatientBirthDateText"></DIV>
    <!-- 年齢 -->
    <DIV ID="DIV_PatientAgeText"></DIV>
    <!-- 現在時刻 -->
    <DIV ID="DIV_DateTimeText"></DIV>
    <!-- ユーザガイダンス -->
    <DIV ID="DIV_UserGuidance"></DIV> 
    <DIV ID="DIV_UserGuidanceText"></DIV>
<!-- 2005/05/24-ST //-->
    <!-- メッセージと主要画面の境界 -->
    <TABLE>
      <TR><TD ID="DIV_BackGround_Border"></TD></TR>
    </TABLE> 
<!-- 2005/05/24-EN //-->
  </BODY>
</HTML>
