<%@ Page language="c#" Codebehind="MediaStatus_View.aspx.cs" AutoEventWireup="false" Inherits="Indicator.MediaStatus_View" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file MediaStatus_View.aspx

  @brief メディア装置状態情報表示用フレーム


  @author YSK菅野

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reseved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/22  YSK菅野     XX-XX      新規作成

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
    <TITLE>MediaStatus_View</TITLE>
    <META CONTENT="Microsoft Visual Studio .NET 7.1" NAME="GENERATOR">
    <META CONTENT="C#" NAME="CODE_LANGUAGE">
    <META CONTENT="JavaScript" NAME="vs_defaultClientScript">
    <META CONTENT="http://schemas.microsoft.com/intellisense/ie5" NAME="vs_targetSchema">
    <LINK REL="stylesheet" TYPE="text/css" HREF="CSS/MediaStatus_View.css" CHARSET="UTF-8">
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/MediaStatus_View.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/ButtonChange.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Control.js" CHARSET="UTF-8"></SCRIPT>
  </HEAD>
  <BODY ONSELECTSTART="return false;" ONLOAD="Fn_InitPage();" ONCONTEXTMENU="return false;">
    <!-- 装置名称ラベル -->
    <TABLE ID="tblDeviceName"><TR><TD>
      <DIV ID="divDeviceName"></DIV>
    </TD></TR></TABLE>
    <!-- 装置状態ラベル -->
    <TABLE ID="tblDeviceStatus"><TR><TD>
      <DIV ID="divDeviceStatus"></DIV>
    </TD></TR></TABLE>
    <!-- 用途ラベル -->
    <TABLE ID="tblUseType"><TR><TD>
      <DIV ID="divUseType"></DIV>
    </TD></TR></TABLE>
    <!-- 書込設定ラベル -->
    <TABLE ID="tblWritable"><TR><TD>
      <DIV ID="divWritable"></DIV>
    </TD></TR></TABLE>
    <!-- 装置ステータステキスト -->
    <TABLE ID="tblDeviceStatusTxt"><TR><TD>
      <DIV ID="divDeviceStatusTxt"></DIV>
    </TD></TR></TABLE>
    <!-- 用途テキスト -->
    <TABLE ID="tblUseTypeTxt"><TR><TD>
      <DIV ID="divUseTypeTxt"></DIV>
    </TD></TR></TABLE>
    <!-- 書込設定テキスト -->
    <TABLE ID="tblWritableTxt"><TR><TD>
      <DIV ID="divWritableTxt"></DIV>
    </TD></TR></TABLE>
    <!-- 入れ替えボタン -->
    <IMG ID="imgMediaChange" SRC="../Bmp/indMedeiaChgBtnU.gif"
          ONDRAG="return false;"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/indMedeiaChgBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/indMedeiaChgBtnD.gif');"
          ONCLICK="Fn_DiskChange();"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/indMedeiaChgBtnU.gif');">
    <IMG ID="imgMediaChangeDisable" SRC="../Bmp/indMedeiaChgBtnX.gif"
          ONDRAG="return false;">
    <TABLE ID="tblMediaChange"
           ONMOUSEUP="document.getElementById('imgMediaChange').onmouseup();"
           ONMOUSEDOWN="document.getElementById('imgMediaChange').onmousedown();"
           ONCLICK="document.getElementById('imgMediaChange').click();"
           ONMOUSEOUT="document.getElementById('imgMediaChange').onmouseout();"><TR><TD>
      <DIV ID="divMediaChange"></DIV>
    </TD></TR></TABLE>
    <!-- 取り出しボタン -->
    <IMG ID="imgMediaEject" SRC="../Bmp/indMedeiaOutBtnU.gif"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/indMedeiaOutBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/indMedeiaOutBtnD.gif');"
          ONCLICK="Fn_MediaControl(1);"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/indMedeiaOutBtnU.gif');"
          ONDRAG="return false;">
    <IMG ID="imgMediaEjectDisable" SRC="../Bmp/indMedeiaOutBtnX.gif"
          ONDRAG="return false;">
    <TABLE ID="tblMediaEject"
            ONMOUSEUP="document.getElementById('imgMediaEject').onmouseup();" 
            ONMOUSEDOWN="document.getElementById('imgMediaEject').onmousedown();"
            ONCLICK="document.getElementById('imgMediaEject').click();"
            ONMOUSEOUT="document.getElementById('imgMediaEject').onmouseout();"><TR><TD>
      <DIV ID="divMediaEject"></DIV>
    </TD></TR></TABLE>
    <!-- クライアントUTLボタン -->
    <IMG ID="imgUtility" SRC="../Bmp/indMedeiaUtlBtnU.gif"
          ONMOUSEUP="SetImageUrl(this,'../Bmp/indMedeiaUtlBtnU.gif');"
          ONMOUSEDOWN="SetImageUrl(this,'../Bmp/indMedeiaUtlBtnD.gif');"
          ONCLICK="Fn_MediaControl(2);"
          ONMOUSEOUT="SetImageUrl(this,'../Bmp/indMedeiaUtlBtnU.gif');"
          ONDRAG="return false;">
    <IMG ID="imgUtilityDisable" SRC="../Bmp/indMedeiaUtlBtnX.gif"
          ONDRAG="return false;">
    <TABLE ID="tblUtility"
           ONMOUSEUP="document.getElementById('imgUtility').onmouseup();"
           ONMOUSEDOWN="document.getElementById('imgUtility').onmousedown();"
           ONCLICK="document.getElementById('imgUtility').click();"
           ONMOUSEOUT="document.getElementById('imgUtility').onmouseout();"><TR><TD>
      <DIV ID="divUtility"></DIV>
    </TD></TR></TABLE>
    <!-- コンボボックス -->
    <!-- 表示上部 -->
    <TABLE ID="tblHead" BORDER="0" CELLSPACING="0">
      <TR><TD ID="tdHead" ONMOUSEDOWN="Fn_ShowDrop();">
        <DIV ID="divHead" NOWRAP></DIV>
      </TD></TR>
    </TABLE>
    <!-- ボタン -->
    <IMG ID="imgPull" SRC="../Bmp/cmPullDownBtnU.gif"
          ONMOUSEDOWN="this.src='../Bmp/cmPullDownBtnD.gif';Fn_ShowDrop();"
          ONMOUSEUP="this.src='../Bmp/cmPullDownBtnU.gif';"
          ONMOUSEOUT="this.src='../Bmp/cmPullDownBtnU.gif';"
          ONDRAG="return false;">
  </BODY>
</HTML>
