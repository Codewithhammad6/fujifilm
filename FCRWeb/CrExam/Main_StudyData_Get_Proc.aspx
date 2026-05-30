<%@ Page language="c#" Codebehind="Main_StudyData_Get_Proc.aspx.cs" EnableSessionState="false" AutoEventWireup="false" Inherits="HobbitWeb.CrExam.Main_StudyData_Get_Proc" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" > 
<HTML>
  <HEAD>
    <TITLE></TITLE>
<%
/****************************************************************************

  @file Main_StudyData_Get_Proc.aspx

  @brief 検査情報取得処理フレーム(Main_接頭語付）

  @author YSK齋藤

  Copyright(C) 2004-2008 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/10/29  YSK齋藤     V1.0　     新規作成
  @date  06/03/22  YSK齋藤     V1.2       OnLoadイベントのハンドリング対応(PVCS#1742) 
  @date  07/03/01  YSK齋藤     V2.0       ×ボタン押下対応（ファイル名変更及び処理追加）(PVCS#1956) 
  @date  07/03/08  HSK山本     V2.0       DicomStorage出力機能 
  @date  07/03/22  HSK古場     V2.0       内視鏡画像取り込み機能 
  @date  07/06/14  HSK山本     V2.0       PVCS#2209対応 
  @date  08/04/11  HSK山本     V3.2HF     PVCS#2790対応 
  @date  08/04/18  HSK由比     V4.0       ガイダンス表示対応
  @date  09/07/16  原田憲      V6.0       NAS対応  
  @date  09/12/01  FF 星野     V1.1(B)    1.1(B)対応 
  @date  10/04/19  TYS園木     V2.0(B)    責任者マルチバイト対応
  @date  14/04/14  TYS会田     V3.0(B)    DR直結-検査情報修正
  @date  14/07/28  TYS会田     V3.0(B)    JIRA#2483対応(DR撮影画面からのメニュー追加対応)
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
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/StudyData_Get_Proc.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" SRC="Include/MessageWindow.js" CHARSET="UTF-8"></SCRIPT>
    <SCRIPT LANGUAGE="JavaScript" CHARSET="UTF-8">
    <!--
  // 2006/03/22 H.SAITO -ST-
  function Fn_OnLoad(){
  // 2006/03/22 H.SAITO -ED-
    try{
      var SPOT_CODE_ASPX = 0;                          //スポットコード
      <% /* 2007/03/01 PVCS#1956 H.SAITO -ST- */%>
      //var FILE_NAME_ASPX = "StudyData_Get_Proc.aspx";  //ファイル名
      var FILE_NAME_ASPX = "Main_StudyData_Get_Proc.aspx";  //ファイル名
      <% /* 2007/03/01 PVCS#1956 H.SAITO -ED- */ %>

      <% /* 2007/03/01 PVCS#1956 H.SAITO -ST- */%>
      <% /* 親ウィンドウ設定 */ %>
      <% if(RequestedType == REQUEST_TYPE_QUERY) {%>
        var parent;
        var top;
        parent	=	window.dialogArguments.parent;
        top		=	window.dialogArguments.top;
      <% }%>
      <% /* 2007/03/01 PVCS#1956 H.SAITO -ED- */%>

      //患者情報取得
      <% if(DataGetMode == GET_ALL || DataGetMode == GET_PATIENT || DataGetMode == GET_MENU || DataGetMode == GET_OUTPUT) {%>
        // 検査シーケンス
        top.StudySequence       = <%=StudySequence%>;
        //患者ＩＤ
        parent.PatientId        = "<%=PatientId%>";
        //患者名
        parent.PatientName      = "<%=PatientName%>";
        //漢字患者名
        parent.PatientKanjiName = "<%=PatientKanjiName%>";
        //性別      
        parent.PatientSex       = "<%=PatientSex%>";
        //生年月日
        parent.PatientBirthDate = "<%=PatientBirthDate%>";
        //年齢
        parent.PatientAge		= "<%=PatientAge%>";
        
        //2009.12.01 V1.1(B)対応 FF星野 ADD-ST
		//患者コメント
		parent.PatientComment	= "<%=PatientComment%>";
		//身長
		parent.PatientsSize		= "<%=PatientsSize%>";
		//体重
		parent.PatientsWeight	= "<%=PatientsWeight%>";
		//去勢避妊
		parent.PatientsSexNeutred= "<%=PatientsSexNeutred%>";
		//種別
		parent.PatientSpeciesDescription= "<%=PatientSpeciesDescription%>";
		//品種
		parent.PatientBreedDescription= "<%=PatientBreedDescription%>";
		//責任者
		parent.ResponsiblePerson= "<%=ResponsiblePerson%>";
		//所属先
		parent.ResponsibleOrganization= "<%=ResponsibleOrganization%>";
        //2009.12.01 V1.1(B)対応 FF星野 ADD-ED
        //2010.04.19 責任者マルチバイト対応 TYS園木 ADD-ST
        //責任者(全角)
		parent.ResponsiblePersonIdoGraphic= "<%=ResponsiblePersonIdoGraphic%>";
		//2010.04.19 責任者マルチバイト対応 TYS園木 ADD-ED
		//2014.04.14 TYS会田 DR直結-検査情報修正 ADD-ST
		parent.Modality= "<%=Modality%>";
		parent.IsExistExMPMCode= "<%=IsExistExMPMCode%>";
		//2014.04.14 TYS会田 DR直結-検査情報修正 ADD-ED

        
        
      <%}%>
      //検査情報取得
      <% if(DataGetMode == GET_ALL || DataGetMode == GET_MENU || DataGetMode == GET_PATIENT || DataGetMode == GET_OUTPUT) {%>    
        //検査ステータス
        parent.StudyStatus      = "<%=StudyStatus%>";
      <%}%>
				parent.PurPose =  "<%=PurPose%>";
//070322 HSK古場 ADD-ST
        //画像種別
				parent.ImageKind = "<%=ImageKind%>";
//070322 HSK古場 ADD-ED
      
      //2014/07/08 TYS会田 JIRA#2483 DR撮影画面からのメニュー追加への対応 ADD-ST
      // DR撮影画面からメニュー追加を行ったとき、追加前のメニュー数を取得する
      <% if(DataGetMode == GET_PATIENT) {%>    
        //検査ステータス
        parent.DataCount = <%=DataCount%>;
      <%}%>
      //2014/07/08 TYS会田 JIRA#2483 DR撮影画面からのメニュー追加への対応 ADD-ED

      //画像情報取得
      <% if(DataGetMode == GET_ALL || DataGetMode == GET_MENU) {%>    
        var j;
        parent.DataCount = <%=DataCount%>;
        // 2005/07/06 003 H.SAITO PVCS#870 メディアから取り込んだ検査
        //メディアから取り込んだ検査かフラグ
        parent.MediaGetStatus = "<%=MediaGetStatus%>";
        <% for(int i = 0;i < DataCount;i++){ %>
          j = <%=i%>;
          parent.ImageSeq[j]                     = "<%=ImageSeq[i]%>";
          parent.AssosiateId[parent.ImageSeq[j]] = j;
          parent.MenuName[j]                     = "<%=MenuName[i]%>";
// 080418 HSK由比 ガイダンス表示対応 ADD-ST
          if(parent.MenuCode) parent.MenuCode[j]  = "<%=MenuCode[i]%>";
// 080418 HSK由比 ガイダンス表示対応 ADD-ED
          parent.ImageStatus[j]                  = "<%=ImageStatus[i]%>";
          parent.DataStatus[j]                   = "<%=DataStatus[i]%>";
          parent.ThumbnailFileName[j]            = "<%=ThumbnailFileName[i]%>";
          parent.ThumbnailHeight[j]              = "<%=ThumbnailHeight[i]%>";
          parent.ThumbnailWidth[j]               = "<%=ThumbnailWidth[i]%>";
          parent.ImageFileName[j]                = "<%=ImageFileName[i]%>";
          parent.ImageHeight[j]                  = "<%=ImageHeight[i]%>";
          parent.ImageWidth[j]                   = "<%=ImageWidth[i]%>";
//070614 HSK山本 PVCS#2209 ADD-ST
          parent.MediaOutStatus[j]               = "<%=MediaOutStatus[i]%>";
//070614 HSK山本 PVCS#2209 ADD-ED
//080411 HSK山本 PVCS#2790 ADD-ST
          parent.SeriesUID[j]                    = "<%=SeriesUID[i]%>";
//080411 HSK山本 PVCS#2790 ADD-ED
//** 2009/07/16 k.harada add start
          parent.ThumbnailFilePath[j]            = "<%=ThumbnailFilePath[i]%>";
//** 2009/07/16 k.harada add end
        <%}%>
      <%}%>

// ADD 2005/02/18==========================
       //出力先設定情報取得
      <% if(DataGetMode == GET_OUTPUT) {%> 
        parent.PrintPriority = "<%=PrintPriority%>";   
        parent.OutputCopies  = "<%=OutputCopies%>";
        var m=0;
        parent.OutputDataCount = <%=OutputInfoNum%>;
        <% for(int k = 0;k < OutputInfoNum;k++){ %>
          m = <%=k%>;
          parent.DeviceCode[m]           = "<%=DeviceCode[k]%>";
          parent.DeviceType[m]           = "<%=DeviceType[k]%>";
          parent.OutputTiming[m]         = "<%=OutputTiming[k]%>";
          parent.OutputReqClass[m]       = "<%=OutputReqClass[k]%>";
          parent.OutputDensity[m]        = "<%=OutputDensity[k]%>";
          parent.OutputPicCompType[m]    = "<%=OutputPicCompType[k]%>";
          parent.OutputPicProcessType[m] = "<%=OutputPicProcessType[k]%>";
          parent.OutputPicProcessParam[m]= "<%=OutputPicProcessParam[k]%>";
          parent.OutputStatus[m]         = "<%=OutputStatus[k]%>";             //出力状況
          parent.OutputFlag[m]           = "<%=OutputFlag[k]%>";  //出力有無
        <%}%>
			  parent.OutputAliasMedia              = "<%=OutputAliasMedia%>";                               // メディア名称
			  parent.OutputAliasMediaNo            = <%=OutputAliasMediaNo%>;                               // メディア装置コード
        parent.OutputAliasMediaStatus        = "<%=OutputAliasMediaStatus%>";                         // メディア出力状況
			  parent.OutputAliasCarna              = top.DispFrame.Public_GetString(32444, "C@Rna Center"); // C@Rna名称
        parent.OutputAliasCarnaStatus        = "<%=OutputAliasCarnaStatus%>";                         // C@Rna出力状況
			  parent.OutputAliasFile               = top.DispFrame.Public_GetString(32445, "Foler");        // 汎用ファイル名称 
        parent.OutputAliasFileStatus         = "<%=OutputAliasFileStatus%>";                          // 汎用ファイル出力状況
			  var n = 0;
        <% for(int i = 0;i < PrinterCount;i++){%>
          n = <%=i%>;
		      parent.OutputAliasPrinter[n]       = "<%=OutputAliasPrinter[i]%>";                          // プリンタ名称
		      parent.OutputAliasPrinterNo[n]     = <%=OutputAliasPrinterNo[i]%>;                          // プリンタ装置コード
          parent.OutputAliasPrinterStatus[n] ="<%=OutputAliasPrinterStatus[i]%>";                     // プリンタ出力状況
        <%}%>
//070302 HSK山本 ADD-ST
        <% for(int i = 0;i < StorageCount;i++){%>
          n = <%=i%>;
              parent.OutputAliasStorage[n]       = "<%=OutputAliasStorage[i]%>";                          // DicomStorage名称
              parent.OutputAliasStorageNo[n]     = <%=OutputAliasStorageNo[i]%>;                          // DicomStorage装置コード
          parent.OutputAliasStorageStatus[n] ="<%=OutputAliasStorageStatus[i]%>";                     // DicomStorage出力状況
        <%}%>
//070302 HSK山本 ADD-ED
      <%}%>
      // 2005/07/15 004 H.SAITO 再送処理対応
      <% if(InputErrorImageId != ""){ %>
        parent.InputErrorImageId = "<%=InputErrorImageId%>";
      <%}%>
      // 2005/11/30 PVCS#1560 H.SAITO 排他エラーの見直し -ST-
      parent.RuExclusionErrorFlag        = <%=RuExclusionErrorFlag%>;
      parent.StudyExclusionErrorFlag     = <%=StudyExclusionErrorFlag%>;
      parent.CompletedErrorFlag          = "<%=CompletedErrorFlag%>";
      // 2005/11/30 PVCS#1560 H.SAITO 排他エラーの見直し -ED-
      
// ADD EN ===================================
      // 2006/03/22 H.SAITO -ST-
      <%=ClientScript%>
      // 2006/03/22 H.SAITO -ED-

      <% /* 2007/03/01 PVCS#1956 H.SAITO -ST- */%>
      <% if(RequestedType == REQUEST_TYPE_QUERY) {%>
        close();
      <% }%>
      <% /* 2007/03/01 PVCS#1956 H.SAITO -ED- */%>

	  }catch(e){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME_ASPX, SPOT_CODE_ASPX+0);
	  }
  // 2006/03/22 H.SAITO -ST-
  }
  // 2006/03/22 H.SAITO -ED-
  // 2006/03/22 H.SAITO -ST-
//function Fn_Initialize(){
//    <%=ClientScript%>
//}
  // 2006/03/22 H.SAITO -ED-
    //-->   
    </SCRIPT>
  </HEAD>
<!--
<!-- 2006/03/22 H.SAITO -ST- -->
<!--
  <BODY ONLOAD="Fn_InitPage();Fn_Initialize();">
-->
  <BODY ONLOAD="Fn_InitPage();Fn_OnLoad();">
<!-- 2006/03/22 H.SAITO -ED- -->
    <FORM NAME="frmGetForm" METHOD="post">
      <INPUT TYPE="hidden" NAME="procMode"> <INPUT TYPE="hidden" NAME="studySequence">
      <INPUT TYPE="hidden" NAME="exclusiveModeRu"> <INPUT TYPE="hidden" NAME="exclusiveModeStudy">
      <INPUT TYPE="hidden" NAME="loginUserId"> <INPUT TYPE="hidden" NAME="loginTime">
    </FORM>
  </BODY>
</HTML>
