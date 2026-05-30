<%@ Page language="c#" Codebehind="Function.aspx.cs" AutoEventWireup="false" Inherits="ImportImage.Function" ASPCOMPAT="true" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>Now Loading...</title>
		<META http-equiv="Pragma" content="no-cache">
		<META http-equiv="Cache-Control" content="no-cache">
		<META http-equiv="Expires" content="Thu, 01 Dec 1994 16:00:00 GMT">
		<META content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<SCRIPT LANGUAGE="JavaScript" src="./Include/ImportImageCommon.js" charset="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" src="../Include/Control.js" charset="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" SRC="../Include/FixToKB912945.js" CHARSET="UTF-8"></SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" CHARSET="UTF-8">
        <!--
//070918 HSK山本 汎用画像取込機能 DEL-ST
//タイトルの設定はMain側で行う
//        // タイトル設定
//        top.SetTitle("<=Title>");※%表記だと読み込まれてしまうので削除した
//070918 HSK山本 汎用画像取込機能 DEL-ED

        /**
        * @private
        * ブラウザ終了時イベント 
        * onBeforeUnload時に呼ばれる 
        **/
        function OnBeforeUnload()
        {
            try
            {
                ImportImageCtrl.Finalize(top.window.screenLeft,top.window.screenTop)
            }
            catch(e)
            {
                ErrorHandler( FATAL_ERROR, "OnBeforeUnload Exception" );
            }
        }


        /**
        * @private
        * 各種医用画像取込画面の初期化
        * onLoad時に呼ばれる
        **/
        function Onload()
        {
            var windowWidth = 1024;
// 2007/10/01 HSK入山 V3.0対応 UPD START
//// 2007/05/16 HSK入山 PVCS#2190 UPD START
////          var windowHeight = 768;
//            var windowHeight = 778;
//// 2007/05/16 HSK入山 PVCS#2190 UPD END
            var windowHeight = 914;
// 2007/10/01 HSK入山 V3.0対応
// 2007/04/09 HSK朴 B票#265 UPT START
            try
            {
                top.window.resizeTo(windowWidth,windowHeight);
            }
            catch(e)
            {
                //WindowSize設定エラーの場合無視する。 
            }
            try
            {
                //top.window.resizeTo(windowWidth,windowHeight);
// 2007/04/09 HSK朴 B票#265 UPT END
// 2007/06/08 HSK入山 PVCS#2312 UPD START
//                if(!ImportImageCtrl.Initialize('<%=LoginUserID%>','<%=LoginTime%>'))
//070914 HSK山本 V3.0汎用画像取込機能 UPDATE-ST
//                if(!ImportImageCtrl.Initialize("<%=LoginUserID%>","<%=LoginTime%>"))
                if(!ImportImageCtrl.Initialize("<%=LoginUserID%>","<%=LoginTime%>","<%=ScreenType%>"))
//070914 HSK山本 V3.0汎用画像取込機能 UPDATE-ED
// 2007/06/08 HSK入山 PVCS#2312 UPD END
                {
// 2007/03/31 HSK朴 B票#79,81 UPT START
                    // window.open('../Close.html','_self');
                    //window.top.open('../Close.html','_self');
                    top.WU_CloseWindow(window);
// 2007/03/31 HSK朴 B票#79,81 UPT END
                    return;
                }

            }
            catch(e)
            {
                ErrorHandler( FATAL_ERROR, "Onload Exception" );
            }
        }
        -->
		</SCRIPT>
	</HEAD>
	<BODY bgColor="#f4f2e4" onBeforeUnload="OnBeforeUnload();" ms_positioning="GridLayout"
		style="MARGIN:0px" onload='Onload();'>
		<SCRIPT LANGUAGE="JavaScript" CHARSET="UTF-8">
        <!--
        WriteToDocument(
        '<OBJECT id="ImportImageCtrl" classid="clsid:AFEE281B-312B-4b2d-A401-07D71EA08601" style="margin:0,0,0,0; POSITION:absolute; top:0; left:0; PADDING:0,0,0,0;">',
        '</OBJECT>'
        );
        -->
		</SCRIPT>
		<SCRIPT LANGUAGE="JavaScript" CHARSET="UTF-8">
        function ImportImageCtrl::RequestFinish()
        {
            // 画面終了要求イベント
            try
            {
// 2007/03/31 HSK朴 B票#79,81 UPT START
                // window.open('../Close.html','_self');
                //window.top.open('../Close.html','_self');
                top.WU_CloseWindow(window);
// 2007/03/31 HSK朴 B票#79,81 UPT END
            }
            catch(e)
            {
                ErrorHandler( FATAL_ERROR, "RequestFinish Exception" );
            }
        }
        function ImportImageCtrl::RequestSetGeometry(browserLeft,browserTop)
        {
// 2007/04/09 HSK朴 B票#274 UPD START
//          // ブラウザ位置設定要求イベント
//          var browserTitle = 30;
//          var browserLeftSpace = 4;
//          //--------------------------------------------------------
//          // 位置変更
//          // 尚、この位置変更は画面デザインのWindowsXPスタイルのみ
//          // 有効です。Windowsクラシックスタイルは対応していません。
//          //--------------------------------------------------------
//          var iTop = browserTop - browserTitle;
//          var iLeft = browserLeft - browserLeftSpace;
            var iTop = browserTop;
            var iLeft = browserLeft;
// 2007/04/09 HSK朴 B票#265 ADD START
            var bError = false;
// 2007/04/09 HSK朴 B票#265 ADD END
// 2007/04/09 HSK朴 B票#274 UPD END
            try
            {
                if( browserLeft != -9999 || browserTop != -9999 )
                {
                    if (iLeft < 0) 
                    {
                        // LEFTの値がマイナスの場合、0を設定
                        iLeft = 0;
                    }
                    if (iTop < 0)
                    {
                        // TOPの値がマイナスの場合、0を設定
                        iTop = 0;
                    }
// 2007/04/09 HSK朴 B票#265 DEL START
//                  top.window.moveTo(iLeft,iTop);
// 2007/04/09 HSK朴 B票#265 DEL END
                }
                else
                {
                    // 初回時用
// 2007/04/09 HSK朴 B票#274 UPD START
                    var windowWidth  = 1024;
// 2007/10/01 HSK入山 V3.0対応 UPD START
//// 2007/05/25 HSK入山 PVCS#2277 ADD START
//                    var windowHeight = 778;
//// 2007/05/25 HSK入山 PVCS#2277 ADD END
                    var windowHeight = 914;
// 2007/10/01 HSK入山 V3.0対応 UPD END

// 2007/05/16 HSK入山 PVCS#2190 UPD START
//                  var windowHeight = 768;
//                  var windowHeight = 778;
// 2007/05/16 HSK入山 PVCS#2190 UPD END
//                  var windowWidth  = document.body.offsetWidth + browserLeftSpace;
//                  var windowHeight = document.body.offsetHeight + browserTitle;
// 2007/04/09 HSK朴 B票#274 UPD END
                    iLeft = (screen.width-windowWidth) / 2;
                    iTop = (screen.height-windowHeight) / 2;
// 2007/04/09 HSK朴 B票#265 DEL START
//                  top.window.moveTo(iLeft, iTop);
// 2007/04/09 HSK朴 B票#265 DEL END
                }
            }
            catch(e)
            {
// 2007/04/09 HSK朴 B票#265 ADD START
                bError = true;
// 2007/04/09 HSK朴 B票#265 ADD END
                ErrorHandler( FATAL_ERROR, "RequestSetGeometry Exception" );
            }
// 2007/04/09 HSK朴 B票#265 ADD START
            try
            {
                if(!bError)
                {
                    top.window.moveTo(iLeft, iTop);
                }
            }
            catch(e)
            {
                // Window配置変更中エラーの場合無視する。
            }
// 2007/04/09 HSK朴 B票#265 ADD END
        }
		</SCRIPT>
	</BODY>
</HTML>
