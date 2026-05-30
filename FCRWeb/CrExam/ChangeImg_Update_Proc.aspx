<%@ Page language="c#" Codebehind="ChangeImg_Update_Proc.aspx.cs" EnableSessionState="false" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.ChageImg_Update_Proc" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
<%
/****************************************************************************

  @file ChangeImg_Update_Proc.aspx

  @brief 画像入れ替え更新処理フレーム

  @author YSK齋藤

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/02  YSK齋藤     V1.0       新規作成
  @date  06/03/22  YSK齋藤     V1.2       OnLoadイベントのハンドリング対応(PVCS#1742)
  @date  07/07/24  YSK齋藤     V3.0       同時押し対応(ASPCOMPAT=trueの追加)(PVCS#1737)
  @date  09/07/16  原田憲      V6.0       NAS対応  
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
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/ChangeImg_Update_Proc.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js"         CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="./Include/Control.js"         CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" CHARSET="UTF-8">
    // 2006/03/22 H.SAITO -ST-
    function Fn_OnLoad(){
    // 2006/03/22 H.SAITO -ED-
      try{
        var SPOT_CODE_ASPX = 0;                             //スポットコード
        var FILE_NAME_ASPX = "ChangeImg_Update_Proc.aspx";  //ファイル名
        var imageSeq   = new Array();
        var tableNo    = new Array();
        var WorkAssosiateId;
        var WorkImageSeq;
// 2005/03/25 002 H.SAITO メニュー入れ替え不具合修正
//        var WorkMenuKind;
        var WorkImageStatus;
        var WorkDataStatus;
        var WorkMenuName;
        var WorkThumbnailFileName;
        var WorkThumbnailHeight;
        var WorkThumbnailWidth;
        var WorkThumbnailFilePath;//** 2009/07/16 k.harada add
        
        <% for(int i = 0;i < DataCount ;i++){ %>
          //画像シーケンスを取得
          imageSeq[<%=i%>]                          = "<%=ImageSeq[i]%>";
          //添え字←画像シーケンスを取得
          tableNo[<%=i%>]                           =  parent.AssosiateId[imageSeq[<%=i%>]];
          //サムネイル画像ファイル名
          parent.ThumbnailFileName[tableNo[<%=i%>]] = "<%=ThumbnailFileName[i]%>";
          //サムネイル画像高さ
          parent.ThumbnailHeight[tableNo[<%=i%>]]   = "<%=ThumbnailHeight[i]%>";
          //サムネイル画像幅
          parent.ThumbnailWidth[tableNo[<%=i%>]]    = "<%=ThumbnailWidth[i]%>";
          //画像ステータス
          parent.ImageStatus[tableNo[<%=i%>]]       = "<%=ImageStatus[i]%>";
          //サムネイル画像ファイルフルパス
          parent.ThumbnailFilePath[tableNo[<%=i%>]] = "<%=ThumbnailFilePath[i]%>";
        <% }%>
        //更新終了後にデータの入れ替え
        <% if(DataCount > 0) { %>           
            //Work←src
            WorkAssosiateId       = parent.AssosiateId[imageSeq[0].toString()];
            WorkImageSeq          = parent.ImageSeq[tableNo[0]];
// 2005/03/25 002 H.SAITO メニュー入れ替え不具合修正
//            WorkMenuName          = parent.MenuName[tableNo[0]];
            WorkMenuKind          = parent.MenuKind[tableNo[0]];
            WorkImageStatus       = parent.ImageStatus[tableNo[0]];
            WorkDataStatus        = parent.DataStatus[tableNo[0]];       
            WorkThumbnailFileName = parent.ThumbnailFileName[tableNo[0]];
            WorkThumbnailHeight   = parent.ThumbnailHeight[tableNo[0]];
            WorkThumbnailWidth    = parent.ThumbnailWidth[tableNo[0]];
            WorkThumbnailFilePath = parent.ThumbnailFilePath[tableNo[0]];//** 2009/07/16 k.harada add
            //src←dist
            parent.AssosiateId[imageSeq[0]]      = parent.AssosiateId[imageSeq[1].toString()];
            parent.ImageSeq[tableNo[0]]          = parent.ImageSeq[tableNo[1]];
// 2005/03/25 002 H.SAITO メニュー入れ替え不具合修正
//            parent.MenuName[tableNo[0]]          = parent.MenuName[tableNo[1]];
            parent.MenuKind[tableNo[0]]          = parent.MenuKind[tableNo[1]];
            parent.ImageStatus[tableNo[0]]       = parent.ImageStatus[tableNo[1]];
            parent.DataStatus[tableNo[0]]        = parent.DataStatus[tableNo[1]];       
            parent.ThumbnailFileName[tableNo[0]] = parent.ThumbnailFileName[tableNo[1]];
            parent.ThumbnailHeight[tableNo[0]]   = parent.ThumbnailHeight[tableNo[1]];
            parent.ThumbnailWidth[tableNo[0]]    = parent.ThumbnailWidth[tableNo[1]];
            parent.ThumbnailFilePath[tableNo[0]] = parent.ThumbnailFilePath[tableNo[1]];//** 2009/07/16 k.harada add
            //dist←Work
            parent.AssosiateId[imageSeq[1]]      = WorkAssosiateId;
            parent.ImageSeq[tableNo[1]]          = WorkImageSeq;
// 2005/03/21 002 H.SAITO メニュー入れ替え不具合修正
//            parent.MenuName[tableNo[1]]          = WorkMenuName;
            parent.MenuKind[tableNo[1]]          = WorkMenuKind;
            parent.ImageStatus[tableNo[1]]       = WorkImageStatus;
            parent.DataStatus[tableNo[1]]        = WorkDataStatus;    
            parent.ThumbnailFileName[tableNo[1]] = WorkThumbnailFileName;
            parent.ThumbnailHeight[tableNo[1]]   = WorkThumbnailHeight;
            parent.ThumbnailWidth[tableNo[1]]    = WorkThumbnailWidth;
            parent.ThumbnailFilePath[tableNo[1]] = WorkThumbnailFilePath;//** 2009/07/16 k.harada add
            //検査ステータスの更新
            parent.StudyStatus                   = "<%=StudyStatus%>";
        <%}%>
        //データ取得完了時にメソッドを呼ぶ      
        <%=ClientScript%>
      }
      catch(e){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
      }
    // 2006/03/22 H.SAITO -ST-
    }
    // 2006/03/22 H.SAITO -ED-
    </SCRIPT>
  </HEAD>
<!-- 2006/03/22 H.SAITO -ST- -->
<!--
    <BODY ONLOAD="Fn_InitPage();">
-->
    <BODY ONLOAD="Fn_InitPage();Fn_OnLoad();">
<!-- 2006/03/22 H.SAITO -ED- -->
    <FORM NAME="frmUpdateForm" METHOD="post">
        <INPUT TYPE='hidden' ID='procMode'      NAME='procMode'>
        <INPUT TYPE='hidden' ID='studySequence' NAME='studySequence'>
        <INPUT TYPE='hidden' ID='imageSeq'      NAME='imageSeq'>
        <INPUT TYPE='hidden' ID='studyStatus'   NAME='studyStatus'>
        <INPUT TYPE='hidden' ID='patientId'     NAME='patientId'>
        <INPUT TYPE='hidden' ID='loginUserId'   NAME='loginUserId'>
        <INPUT TYPE='hidden' ID='loginTime'     NAME='loginTime'>
    </FORM>
  </BODY>
</HTML>