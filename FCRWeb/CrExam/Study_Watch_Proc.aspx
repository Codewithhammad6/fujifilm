<%@ Page language="c#" Codebehind="Study_Watch_Proc.aspx.cs" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.Study_Watch_Proc" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
/****************************************************************************

  @file Study_Watch_Proc.aspx

  @brief 画像ファイル監視（だらだら監視）処理フレーム

  @author YSK齋藤

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/11/24  YSK齋藤     V1.0　     新規作成
  @date  06/03/22  YSK齋藤     V1.2       OnLoadイベントのハンドリング対応(PVCS#1742)
  @date  07/01/22  YSK齋藤     V1.4       データ記憶容量領域のメモリリーク対策(外部JavaScriptのインライン展開)(PVCS#1784)
  @date  08/03/12  HSK山本     V3.2       RU End-Readエラー対応
  @date  10/10/19  NDD照屋     V2.0(B)    CQ#453 30501エラー改善対応
  @date  12/09/04  FF千葉      V2.3B      CQ#1524 DICOM受信性能改善
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
    <TITLE>画像ファイル監視</TITLE>
    <META NAME="GENERATOR" CONTENT="Microsoft Visual Studio .NET 7.1">
    <META NAME="CODE_LANGUAGE" CONTENT="C#">
    <META NAME="vs_defaultClientScript" CONTENT="JavaScript">
    <META NAME="vs_targetSchema" CONTENT="http://schemas.microsoft.com/intellisense/ie5">
<% // 2007/01/22 PVCS#1784 H.SAITO -ST-
/*
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/Study_Watch_Proc.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js"		CHARSET="UTF-8"></SCRIPT>
*/
%>
    <SCRIPT LANGUAGE="JavaScript" CHARSET="UTF-8"><!-- #Include virtual="Include/Study_Watch_Proc.js" --></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" CHARSET="UTF-8"><!-- #Include virtual="Include/MessageWindow.js" --></SCRIPT>
<% // 2007/01/22 PVCS#1784 H.SAITO -ED- %>
    <SCRIPT LANGUAGE="JavaScript">
//080312 HSK山本 RU End-Readエラー対応 ADD-ST
    var FLAG_NORMAL          = "0";                 // 通常フラグ
    var FLAG_DELETE          = "1";                 // 削除フラグ
    var FLAG_MISS_SHOT       = "2";	                // 写損フラグ
    var STATE_NORMAL         = "NORMAL";            // 通常ステータス
    var STATE_DELETE         = "DELETE";            // 削除ステータス
    var STATE_MISS_SHOT      = "MISS";	            // 写損ステータス
//080312 HSK山本 RU End-Readエラー対応 ADD-ED
  // 2006/03/22 H.SAITO -ST-
  function Fn_OnLoad(){
  // 2006/03/22 H.SAITO -ED-
		try{
      var SPOT_CODE_ASPX = 0;                   //スポットコード
      var FILE_NAME_ASPX = "Study_Watch_Proc.aspx"  //ファイル名
			var tableNo;
			var STATE_UNSHOT		= "0";
			var STATE_INPUT_OFF = "1";
			var STATE_INPUT_ON  = "2";

			//入力中だらだら情報ありのフラグを更新
			parent.InputOnFlag     = "<%=InputOnFlag%>";
			//入力中だらだら情報ありの対象画像シーケンスを更新
			parent.InputOnImageSeq  = "<%=InputOnImageSeq%>";
			//入力中だらだら情報なしのフラグを初期化
			parent.InputOffFlag    = "";
			//入力中だらだら情報なしの対象画像シーケンスを初期化
			parent.InputOffImageSeq = new Array();
      //入力中モード
      parent.InputMode       = "<%=InputMode%>";
      // 2005/07/14 005 H.SAITO 再送処理対応
      // 入力中に失敗した画像ID
      parent.InputErrorImageId = "<%=InputErrorImageId%>";
      // 画像入力・画像処理エラーコード
      parent.InputErrorCode    = "<%=InputErrorCode%>";
			<% for(int i = 0;i < DataCount;i++){ %>
				//画像シーケンスをキーに添え字を取得
				tableNo  = parent.AssosiateId["<%=ImageSeq[i]%>"];

				//入力中でだらだら情報なしがあれば
				//画像の入力ステータスを更新前にSTATE_UNSHOT⇒STATE_INPUT_OFFになるものを調べる					
				if("<%=InputOffFlag%>" == "ON"){				
					if(parent.InputStatus[tableNo] == STATE_UNSHOT && "<%=InputStatus[i]%>" == STATE_INPUT_OFF){
						//入力中でだらだら情報なしのフラグを更新
						parent.InputOffFlag   = "ON";
						//入力中でだらだら情報なしの対象画像シーケンスをＰＵＳＨ（だらだら情報なしが複数通知される場合がある）
						parent.InputOffImageSeq.push("<%=ImageSeq[i]%>");
					}
				}
				parent.InputStatus[tableNo] = "<%=InputStatus[i]%>";
				
				//入力完了ならば画像情報を取得する
				<% if(InputStatus[i] == STATE_COMPLETE){ %>
					//画像のファイル名
					parent.ImageFileName[tableNo]     = "<%=ImageFileName[i]%>";
					//画像の高さ
					parent.ImageHeight[tableNo]       = "<%=ImageHeight[i]%>";
					//画像の幅
					parent.ImageWidth[tableNo]        = "<%=ImageWidth[i]%>";
					//サムネイルのファイル名
					parent.ThumbnailFileName[tableNo] = "<%=ThumbnailFileName[i]%>";
					//サムネイルの高さ
					parent.ThumbnailHeight[tableNo]   = "<%=ThumbnailHeight[i]%>";
					//サムネイルの幅
					parent.ThumbnailWidth[tableNo]    = "<%=ThumbnailWidth[i]%>";
					//サムネイルのファイルパス
					parent.ThumbnailFilePath[tableNo]    = "<%=ThumbnailFilePath[i]%>";//2012/09/04 FF千葉 V2.3B CQ#1524 DICOM受信性能改善
          //入力完了直後の画像を表示するフラグをONにする
          parent.ImageViewFlag[tableNo]     = "1";
//080312 HSK山本 RU End-Readエラー対応 ADD-ST
                    switch("<%=ImageStatus[i]%>")
                    {
                        case FLAG_NORMAL:
                        parent.ImageStatus[tableNo] = STATE_NORMAL
                        break;
                        case FLAG_DELETE:
                        parent.ImageStatus[tableNo] = STATE_DELETE
                        break;
                        case FLAG_MISS_SHOT:
                        parent.ImageStatus[tableNo] = STATE_MISS_SHOT
                        break;
                    }
//080312 HSK山本 RU End-Readエラー対応 ADD-ED
				<% }%> 
			<% }%>
			
			<% if(DivInfoResendCount != ""){ %>
				//再送カウント（通常時1、再送時は2以上）
				parent.DivInfoResendCount      = "<%=DivInfoResendCount%>";
				//だらだら方向　Bottom:（下から上）Top:（上から下）Left:（左から右）Right:（右から左）
				parent.DivInfoDirection        = "<%=DivInfoDirection%>";
				//だらだら分割数（総数）
				parent.DivInfoDivcount         = <%=DivInfoDivCount%>; 
				//だらだら読み込み完了数
				parent.DivInfoDivCompcount     = <%=DivInfoDivCompleteCount%>;
				//総画像サイズのHEIGHT
				parent.DivInfoTotalImageHeight = "<%=DivInfoTotalImageHeight%>";  
				//総画像サイズのWIDTH
				parent.DivInfoTotalImageWidth  = "<%=DivInfoTotalImageWidth%>"; 

				//だらだら画像の情報
				<% for(int j = 0;j < DivInfoDivCompleteCount ;j++){ %>
					parent.DivDataFileName[<%=j%>]         = "<%=DivDataFileName[j]%>"; 
					parent.DivDataImageHeight[<%=j%>]      = "<%=DivDataImageHeight[j]%>";  
					parent.DivDataImageWidth[<%=j%>]       = "<%=DivDataImageWidth[j]%>";
				<% }%>
			<% }%>
			
// CQ#453 ADD ST
			parent.StudyWatchProcReloadCount = 0;
// CQ#453 ADD ED
			
			// 2006/03/22 H.SAITO -ST-
			<%=ClientScript%>
			// 2006/03/22 H.SAITO -ED-
	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
  // 2006/03/22 H.SAITO -ST-
  }
  // 2006/03/22 H.SAITO -ED-
    </SCRIPT>
  </HEAD>
<!-- 2006/03/22 H.SAITO -ST- -->
<!--
  <BODY ONLOAD="Fn_InitPage();<%=ClientScript%>">
-->
  <BODY ONLOAD="Fn_InitPage();Fn_OnLoad();">
<!-- 2006/03/22 H.SAITO -ED- -->
    <FORM NAME="frmWatchForm" METHOD="POST">
      <INPUT TYPE="hidden" ID="procMode"		   NAME="procMode">        
      <INPUT TYPE="hidden" ID="selectimageSeq" NAME="selectImageSeq">    
      <INPUT TYPE="hidden" ID="sendData"       NAME="sendData">    
    </FORM>
  </BODY>
</HTML>