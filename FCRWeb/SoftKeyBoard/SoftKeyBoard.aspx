<%@ Page language="c#" Codebehind="SoftKeyBoard.aspx.cs" AutoEventWireup="false" Inherits="SoftKeyBoard.SoftKeyBoard" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
    <TITLE>WebForm1</TITLE>
    <%
/****************************************************************************

  @file SoftKeyBoard.aspx

  @brief ソフトキーボードASPX

  @author YSK畑

  Copyright(C) 2004-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/17  YSK畑　     V1.0       新規作成
  @date  07/04/17  HSK山本     V2.0       PVCS#1671

/****************************************************************************/
%>
    <%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
    <META NAME="GENERATOR" CONTENT="Microsoft Visual Studio .NET 7.1">
    <META NAME="CODE_LANGUAGE" CONTENT="C#">
    <META NAME="vs_defaultClientScript" CONTENT="JavaScript">
    <META NAME="vs_targetSchema" CONTENT="http://schemas.microsoft.com/intellisense/ie5">
    <LINK REL="stylesheet" TYPE="text/css" HREF="./CSS/SoftKeyBoard.css">
    <SCRIPT LANGUAGE="javascript" SRC="./Include/SoftKeyBoard_Color.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/SoftKeyBoard.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="./../CrExam/Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="javascript">
try{
  var SPOT_CODE_ASPX = 0;                   //スポットコード
  var FILE_NAME_ASPX = "SoftKeyBoad.aspx"  //ファイル名

  var COUNT_KEYBOARD = 3;
  var COUNT_ROW      = 5;
  var COUNT_COL      = 13;

  var ScreenNo       = <%=ScreenNo%>;
  var ValueMulti     = <%=ValueMulti%>;
	// フォント名
  var FONT_NAME      = "<%=FontName%>";
  // フォントサイズ
  var FONT_SIZE_S    = "<%=FontSizeS%>";
  var FONT_SIZE_M    = "<%=FontSizeM%>";
	// 文字列数
	var StringCount    = <%=StringCount%>;// 文字列数
	var CaptionString  = new Array();			// 文字列配列
	var CaptionId      = new Array();			// 文字列キー配列
// 文字列配列作成
<%
int t;
 for(t=0; t<StringCount; t++){
%>
		CaptionString.push("<%=CaptionString[t]%>");
		CaptionId.push(<%=CaptionId[t]%>);
		
<%
}
%>
    // 文字列取得
    Public_ClearStirngCount();
    var CharacterSpace     = Public_GetString(32593,"Space");
    var CharacterDelete    = Public_GetString(32594,"Delete");
    var CharacterAllDelete = Public_GetString(32595,"AllDelete");

    var TabAlpha = Public_GetString(32590,"ABC");
    var TabKana  = Public_GetString(32591,"Kana");
    var TabSign  = Public_GetString(32592,"Sign");
	  }catch(e){
        top.GetErrorMessage(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }

    </SCRIPT>
  </HEAD>
  <BODY ID="BODY" ONLOAD="Fn_InitPage();Fn_Init()" ONCONTEXTMENU="return false;" ONSELECTSTART="return false;"
    ONDRAG="return false;">
   <!-- リストとコマンドボタンの境界 -->
   <IMG SRC="../Bmp/cmBorder.gif" ID="IMG_SoftKeyBoard_Border"> 
   <!-- ソフトキーボード(文字部)//-->
    <DIV ID="divKeyChar">
    </DIV>
    <!-- ソフトキーボード(10キー)//-->
    <DIV ID="divKeyNum">
      <TABLE CLASS="Board" BORDER="1" BORDERCOLORDARK="#6e7878" BORDERCOLORLIGHT="#000000" CELLSPACING="1"
        CELLPADDING="3" ID="KeyNum">
        <TR ALIGN="center">
          <TD CLASS="KeyAlphB" ONMOUSEDOWN="SetMouseDownColor()" ONMOUSEUP="SetMouseUpColor()"
            ONMOUSEOUT="SetMouseUpColor()" ONCLICK="parent.InputChar(this.innerText)">7</TD>
          <TD CLASS="KeyAlphB" ONMOUSEDOWN="SetMouseDownColor()" ONMOUSEUP="SetMouseUpColor()"
            ONMOUSEOUT="SetMouseUpColor()" ONCLICK="parent.InputChar(this.innerText)">8</TD>
          <TD CLASS="KeyAlphB" ONMOUSEDOWN="SetMouseDownColor()" ONMOUSEUP="SetMouseUpColor()"
            ONMOUSEOUT="SetMouseUpColor()" ONCLICK="parent.InputChar(this.innerText)">9</TD>
        </TR>
        <TR ALIGN="center">
          <TD CLASS="KeyAlphB" ONMOUSEDOWN="SetMouseDownColor()" ONMOUSEUP="SetMouseUpColor()"
            ONMOUSEOUT="SetMouseUpColor()" ONCLICK="parent.InputChar(this.innerText)">4</TD>
          <TD CLASS="KeyAlphB" ONMOUSEDOWN="SetMouseDownColor()" ONMOUSEUP="SetMouseUpColor()"
            ONMOUSEOUT="SetMouseUpColor()" ONCLICK="parent.InputChar(this.innerText)">5</TD>
          <TD CLASS="KeyAlphB" ONMOUSEDOWN="SetMouseDownColor()" ONMOUSEUP="SetMouseUpColor()"
            ONMOUSEOUT="SetMouseUpColor()" ONCLICK="parent.InputChar(this.innerText)">6</TD>
        </TR>
        <TR ALIGN="center">
          <TD CLASS="KeyAlphB" ONMOUSEDOWN="SetMouseDownColor()" ONMOUSEUP="SetMouseUpColor()"
            ONMOUSEOUT="SetMouseUpColor()" ONCLICK="parent.InputChar(this.innerText)">1</TD>
          <TD CLASS="KeyAlphB" ONMOUSEDOWN="SetMouseDownColor()" ONMOUSEUP="SetMouseUpColor()"
            ONMOUSEOUT="SetMouseUpColor()" ONCLICK="parent.InputChar(this.innerText)">2</TD>
          <TD CLASS="KeyAlphB" ONMOUSEDOWN="SetMouseDownColor()" ONMOUSEUP="SetMouseUpColor()"
            ONMOUSEOUT="SetMouseUpColor()" ONCLICK="parent.InputChar(this.innerText)">3</TD>
        </TR>
        <TR ALIGN="center">
          <!-- 070417 HSK山本 PVCS#1671 UPDATE -->
          <!-- <TD CLASS="KeyAlphA" ONMOUSEDOWN="SetMouseDownColor()" ONMOUSEUP="SetMouseUpColor()"
            ONMOUSEOUT="SetMouseUpColor()" ONCLICK="parent.MoveCursor(1)">←;</TD> -->
          <TD CLASS="KeyAlphA" ONMOUSEDOWN="SetMouseDownColor()" ONMOUSEUP="SetMouseUpColor()"
            ONMOUSEOUT="SetMouseUpColor()" ONCLICK="parent.MoveCursor(1)">&larr;</TD>
          <TD CLASS="KeyAlphB" ONMOUSEDOWN="SetMouseDownColor()" ONMOUSEUP="SetMouseUpColor()"
            ONMOUSEOUT="SetMouseUpColor()" ONCLICK="parent.InputChar(this.innerText)">0</TD>
          <!-- 070417 HSK山本 PVCS#1671 UPDATE -->
          <!-- <TD CLASS="KeyAlphA" ONMOUSEDOWN="SetMouseDownColor()" ONMOUSEUP="SetMouseUpColor()"
            ONMOUSEOUT="SetMouseUpColor()" ONCLICK="parent.MoveCursor(-1)">→;</TD> -->
          <TD CLASS="KeyAlphA" ONMOUSEDOWN="SetMouseDownColor()" ONMOUSEUP="SetMouseUpColor()"
            ONMOUSEOUT="SetMouseUpColor()" ONCLICK="parent.MoveCursor(-1)">&rarr;</TD>
        </TR>
      </TABLE>
    </DIV>
    <!-- ソフトキーボードデフォルトボタン表示//-->
    <DIV ID="divKeyBoard_other">
      <TABLE CLASS="Board" BORDER="1" BORDERCOLORDARK="#6e7878" BORDERCOLORLIGHT="#000000" CELLSPACING="1"
        CELLPADDING="3" ID="KeyDef">
        <TR ALIGN="center">
          <TD ID="LabelSpace" CLASS="KeyOther" ONMOUSEDOWN="SetMouseDownColor()" ONMOUSEUP="SetMouseUpColor()"
            ONMOUSEOUT="SetMouseUpColor()" ONCLICK="parent.InputChar(' ')"></TD>
          <TD ID="LabelDelete" CLASS="KeyOther" ONMOUSEDOWN="SetMouseDownColor()" ONMOUSEUP="SetMouseUpColor()"
            ONMOUSEOUT="SetMouseUpColor()" ONCLICK="parent.ClearChar()"></TD>
          <TD ID="LabelAllDelete" CLASS="KeyOther" ONMOUSEDOWN="SetMouseDownColor()" ONMOUSEUP="SetMouseUpColor()"
            ONMOUSEOUT="SetMouseUpColor()" ONCLICK="parent.AllClear()"></TD>
        </TR>
      </TABLE>
    </DIV>
    <!-- タブの表示//-->
    <TABLE BORDER="0" CELLSPACING="0" CELLPADDING="0" ID="KeyTab">
      <TR>
        <TD VALIGN="top">
          <SCRIPT LANGUAGE="javascript">
<!--
try{
		document.write("		<IMG id='IMG_Tab_Select'   src='../Bmp/crKeyTabS.gif' border='0'>\n");

	if(ScreenNo == 2 && ValueMulti == 1){
		document.write("		<IMG id='imgtab_Left'   src='../Bmp/crKeyTab.gif' border='0' onmousedown='Fn_Change(0);'>\n");
		document.write("		<IMG id='imgtab_Center' src='../Bmp/crKeyTab.gif' border='0' onmousedown='Fn_Change(1);'>\n");
		document.write("		<IMG id='imgtab_Right'  src='../Bmp/crKeyTab.gif' border='0' onmousedown='Fn_Change(2);'>\n");
		document.write("		<div id='DIV_Tab_Left'   onmousedown='Fn_Change(0);'>"+TabAlpha+"</div>\n");
		document.write("		<div id='DIV_Tab_Center' onmousedown='Fn_Change(1);'>"+TabKana+"</div>\n");
		document.write("		<div id='DIV_Tab_Right'  onmousedown='Fn_Change(2);'>"+TabSign+"</div>\n");
	}else{
		document.write("		<IMG id='imgtab_Left'   src='../Bmp/crKeyTab.gif' border='0' onmousedown='Fn_Change(0);'>\n");
		document.write("		<IMG id='imgtab_Center' src='../Bmp/crKeyTab.gif' border='0' onmousedown='Fn_Change(2);'>\n");
		document.write("		<div id='DIV_Tab_Left'   onmousedown='Fn_Change(0);'>"+TabAlpha+"</div>\n");
		document.write("		<div id='DIV_Tab_Center' onmousedown='Fn_Change(2);'>"+TabSign+"</div>\n");

	}
}catch(e){
   top.GetErrorMessage(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+2);
}
//-->
          </SCRIPT>
        <TD VALIGN="top"></TD>
      </TR>
    </TABLE>
    <!-- コマンドボタン領域の色 -->
    <DIV ID="DIV_CommandBackGround"></DIV>
    <!-- リストとコマンドボタンの境界 -->
    <IMG SRC="../Bmp/cmBorder.gif" ID="IMG_List-Command_Border"> 
    <!-- ボタン背景//-->
    <IMG ID="IMG_Button_Back" SRC="../Bmp/crBtnBack5Plt.gif">
  </BODY>
</HTML>
