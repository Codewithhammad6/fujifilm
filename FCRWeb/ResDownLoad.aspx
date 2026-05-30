<%@ Page language="c#" Codebehind="ResDownLoad.aspx.cs" AutoEventWireup="false" Inherits="FCRWeb.ResDownLoad" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
<HTML>
    <HEAD>
        <title>Now Loading...</title>
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Cache-Control" content="no-cache">
        <meta http-equiv="Expires" content="Thu, 01 Dec 1994 16:00:00 GMT">
        <meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
        <meta content="C#" name="CODE_LANGUAGE">
        <meta content="JavaScript" name="vs_defaultClientScript">
        <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
        <SCRIPT language="JavaScript" src="./Include/FixToKB912945.js" charset="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="JavaScript" SRC="./Include/MessageWindow.js" CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="javascript">
		<!--
		    // タイトル設定
            top.SetTitle( "<%=Title%>" );
            
            // エラー画面遷移メソッド
            function ReplaceErrorPage( spotCode )
            {
                var FATAL_ERROR    = "FATAL_ERROR";                // 致命的エラー
                var SPOT_CODE_BASE = "<% =SPOT_CODE_BASE %>";      //スポットコード
                var FILE_NAME      = "<% =SOURCE_FILE_NAME %>";    //ファイル名
                var MESSAGE_ID     = "<% =GetErrorMessageId() %>"; //メッセージID 
                
// 2007/10/31 HSK鈴木 PVCS#2473 UPDATE START
                // エラー画面へ遷移
                top.GetErrorMessage2( FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE_BASE );
                //Public_ErrorDialog(FATAL_ERROR, FILE_NAME, SPOT_CODE_BASE, "errorTitle1", "errorTitle2", "errorMessage", "OK" );
                //location.replace("./ErrorMsg_Get_Proc.aspx?"
                //    + "MsgId"    + "=" + MESSAGE_ID   + "&"
                //    + "Command"  + "=" + FATAL_ERROR  + "&"
                //    + "FileName" + "=" + FILE_NAME    + "&"
                //    + "SpotCode" + "=" + SPOT_CODE_BASE + spotCode );
// 2007/10/31 HSK鈴木 PVCS#2473 UPDATE END
            }
            
// 2007/10/31 HSK鈴木 PVCS#2473 ADD START
            // ページロード時にエラーが発生した場合にエラー画面遷移メソッドを呼ぶ
            function IsFailedPageLoad( isError )
            {
                // ページロードでエラーが発生した場合
                if( isError == "True" )
                {
                    // エラー画面遷移
                    ReplaceErrorPage( 0 );
                }
            }
// 2007/10/31 HSK鈴木 PVCS#2473 ADD END
        //-->
        </SCRIPT>
    </HEAD>
    <body bgColor="#f7f1e6" onload="top.SetCurrentView('VERCHECK');IsFailedPageLoad('<%=isFailedPageLoad%>');ReqDownload();" onunload="top.SetCurrentView('');"
        MS_POSITIONING="GridLayout">
        <form id="frmResDownLoad" method="post" runat="server">
            <FONT face="MS UI Gothic">
            <DIV id="DispMessage" style="DISPLAY: inline; Z-INDEX: 103; LEFT: 93px; WIDTH: 400px; POSITION: absolute; TOP: 58px; HEIGHT: 60px"
                ms_positioning="FlowLayout"><%=DispMessage%></DIV>
            </FONT>
        </form>
        <SCRIPT language="JavaScript" charset="UTF-8">
        WriteToDocument(
        '<OBJECT id="DeliveryFileDownloader" classid="clsid:52C463FB-169E-41fe-8BB5-8978273B7D95" style="margin:0,0,0,0; POSITION:absolute; top:90; left:93; PADDING:0,0,0,0;">',
        '</OBJECT>'
        );
        </SCRIPT>
        <SCRIPT language="JavaScript" charset="UTF-8">
        <!--
        // ダウンロード指示
        function ReqDownload()
        {
            try
            {
                // 配信用ファイルパスを設定
                DeliveryFileDownloader.DeliveryIniFilePath = "<% =GetReplacedDeliveryIniFilePath() %>";
                
                // ダウンロードファイルパスを取得
                DeliveryFileDownloader.SourceFilePath = "<% =GetReplacedDownlodFilePath() %>";
                
                // ダウンロード開始
                DeliveryFileDownloader.ReqDownload();
            }
            catch(e)
            {
                // エラー画面へ遷移
                ReplaceErrorPage( 1 );
            }
        }
        // ダウンロード終了通知
        function DeliveryFileDownloader::AnsDownload( isSuccess )
        {
            // ダウンロード終了要求イベント
            try
            {   // ダウンロード成否
                if( isSuccess )
                {
                    // ダウンロード成功
                    
                    // Version.aspxへ遷移
                    var encStartURL  = encodeURIComponent( "<% =GetReplacedStartURL() %>" );
                    var encQueryKind = encodeURIComponent( "<% =queryKind %>" );// 2007/10/31 HSK鈴木 PVCS#2473 ADD
                    
// 2007/10/31 HSK鈴木 PVCS#2473 UPDATE START
	    //location.replace("./VersionCheck.aspx?" + "<%=QUERY_KEY_RESOURCE_START_URL%>" + "=" + encStartURL );
	                location.replace("./VersionCheck.aspx?" + "<%=QUERY_KEY_RESOURCE_START_URL%>" + "=" + encStartURL
	                                                  + "&" + "<%=QUERY_KEY_IS_DOWNLOADED%>"      + "=" + encQueryKind );
// 2007/10/31 HSK鈴木 PVCS#2473 UPDATE END
                }
                else
                {
                    // エラー画面へ遷移
                    ReplaceErrorPage( 2 );
                }
            }
            catch(e)
            { 
                // エラー画面へ遷移
                ReplaceErrorPage( 3 );
            }
        }
        //-->
        </SCRIPT>
    </body>
</HTML>
