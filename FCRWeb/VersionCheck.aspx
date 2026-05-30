<%@ Page language="c#" Codebehind="VersionCheck.aspx.cs" AutoEventWireup="false" Inherits="FCRWeb.VersionCheck" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
    <HEAD>
        <title>Now Loading...</title>
<%
  /* キャッシュ制御を停止 */
  Response.CacheControl = "no-cache";
  Response.AddHeader("Pragma","no-cache");
  Response.Expires = -1;
%>
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Cache-Control" content="no-cache">
        <meta http-equiv="Expires" content="Thu, 01 Dec 1994 16:00:00 GMT">
        <meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
        <meta content="C#" name="CODE_LANGUAGE">
        <meta content="JavaScript" name="vs_defaultClientScript">
        <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
        <SCRIPT LANGUAGE="JavaScript" SRC="./Include/FixToKB912945.js" CHARSET="UTF-8"></SCRIPT>
        <SCRIPT LANGUAGE="javascript">
		<!--
		    // タイトル設定
            top.SetTitle("<%=Title%>");
            
// 2007/10/31 HSK鈴木 PVCS#2473 ADD START
            // ページロード時にエラーが発生した場合にエラー画面遷移メソッドを呼ぶ
            function IsFailedPageLoad( isError )
            {
                // ページロードでエラーが発生した場合
                if( isError == "True" )
                {
                    var FATAL_ERROR    = "FATAL_ERROR";                // 致命的エラー
                    var SPOT_CODE_BASE = "<% =SPOT_CODE %>";           //スポットコード
                    var FILE_NAME      = "<% =SOURCE_FILE_NAME %>";    //ファイル名
                    var MESSAGE_ID     = "<% =GetErrorMessageId() %>"; //メッセージID 
                
                    // エラー画面へ遷移
                    top.GetErrorMessage2( FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE_BASE );
                }
            }
// 2007/10/31 HSK鈴木 PVCS#2473 ADD END
        //-->
        </SCRIPT>
    </HEAD>
    <body bgColor=#f7f1e6
          onload="top.SetCurrentView('VERCHECK');IsFailedPageLoad('<%=isFailedPageLoad%>');<%=Action_Onload%>" 
          onunload="top.SetCurrentView('');" 
          MS_POSITIONING="GridLayout">
        <!-- PVCS#1796 -->
        <!-- ActiveX更新プログラムKB912945対応 -->
        <SCRIPT LANGUAGE="javascript">
		<!--
		WriteToDocument(
		'<OBJECT id="objVersion" style="Z-INDEX: 102; LEFT: 264px; POSITION: absolute; TOP: 136px"',
			'classid="clsid:D6267FBA-91DD-4DA5-BE6D-E2A009871DA0" VIEWASTEXT>',
			'<PARAM NAME="_Version" VALUE="65536">',
			'<PARAM NAME="_ExtentX" VALUE="2646">',
			'<PARAM NAME="_ExtentY" VALUE="1323">',
			'<PARAM NAME="_StockProps" VALUE="0">',
		'</OBJECT>'
		)
		//-->
        </SCRIPT>
        <script language="jscript">
<!--		
function ReqVersionInfo()
{
	try
	{
		objVersion.ReqVersionInfo();
	}
	catch(e)
	{
		location.replace("./AppDownLoad.aspx?" +
			"URL=" + "<%=StartURL%>");
	}
}
function objVersion::AnsVersionInfo()
{
	var clientVersion;
	var configVersion;
	var parameterVersion;
	var StartURL;
	var isDownloaded; // 2007/10/31 HSK鈴木 PVCS#2473 ADD
	
	clientVersion    = encodeURIComponent( objVersion.clientVersion );
	configVersion    = encodeURIComponent( objVersion.configVersion );
	parameterVersion = encodeURIComponent( objVersion.parameterVersion );	
	StartURL         = encodeURIComponent( "<%=StartURL%>" );
	isDownloaded     = encodeURIComponent( "<%=isDownloaded%>" );// 2007/10/31 HSK鈴木 PVCS#2473 ADD
   
    // ページリロード 
	location.replace("./VersionCheck.aspx?" +
		"<%=QUERY_KEY_CLIENT_VERSION%>"     + "=" + clientVersion    + "&" + 
		"<%=QUERY_KEY_CONFIG_VERSION%>"     + "=" + configVersion    + "&" +  
		"<%=QUERY_KEY_PARAMETER_VERSION%>"  + "=" + parameterVersion + "&" + 
		"<%=QUERY_KEY_IS_DOWNLOADED%>"      + "=" + isDownloaded     + "&" + // 2007/10/31 HSK鈴木 PVCS#2473 ADD
		"<%=QUERY_KEY_RESOURCE_START_URL%>" + "=" + StartURL);
		
    //var StartURL = "<%=StartURL%>";
	//location.replace("./VersionCheck.aspx?" +
	//	"Version=" + clientVersion + ":" + configVersion + "&" + 
	//	"URL=" + StartURL);
}
-->
        </script>
    </body>
</HTML>
