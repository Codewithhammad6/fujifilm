<%@ Page language="c#" Codebehind="Login_Proc.aspx.cs" AutoEventWireup="false" Inherits="UserAuth.Login_Proc" ASPCOMPAT="true" %>
<%
/* キャッシュ制御を停止 */
Response.CacheControl = "no-cache";
Response.AddHeader("Pragma","no-cache");
Response.Expires = -1;
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
  <HEAD>
    <title>Login_Proc</title>
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Expires" content="Thu, 01 Dec 1994 16:00:00 GMT">
    <meta content="Microsoft Visual Studio .NET 7.1" name=GENERATOR>
    <meta content=C# name=CODE_LANGUAGE>
    <meta content=JavaScript name=vs_defaultClientScript>
    <meta content=http://schemas.microsoft.com/intellisense/ie5 name=vs_targetSchema>
    <script language=JavaScript src="./Include/Login_Proc.js"   charset="UTF-8"></script>
    <script language=JavaScript src="./Include/ImageButton.js"  charset="UTF-8"></script>
    <script language=javascript>
    <!--
      // 取得したユーザ情報を親フレームの変数へ代入する
      parent.userId[0]      = "<%=userId[0]%>";
      parent.userName[0]    = "<%=userName[0]%>";
      parent.userComment[0] = "<%=userComment[0]%>";
      parent.userImage[0]   = "<%=userImage[0]%>";
      parent.sizeofImage[0] = "<%=sizeofImage[0]%>";
      parent.userId[1]      = "<%=userId[1]%>";
      parent.userName[1]    = "<%=userName[1]%>";
      parent.userComment[1] = "<%=userComment[1]%>";
      parent.userImage[1]   = "<%=userImage[1]%>";
      parent.sizeofImage[1] = "<%=sizeofImage[1]%>";
      parent.userId[2]      = "<%=userId[2]%>";
      parent.userName[2]    = "<%=userName[2]%>";
      parent.userComment[2] = "<%=userComment[2]%>";
      parent.userImage[2]   = "<%=userImage[2]%>";
      parent.sizeofImage[2] = "<%=sizeofImage[2]%>";
      parent.userId[3]      = "<%=userId[3]%>";
      parent.userName[3]    = "<%=userName[3]%>";
      parent.userComment[3] = "<%=userComment[3]%>";
      parent.userImage[3]   = "<%=userImage[3]%>";
      parent.sizeofImage[3] = "<%=sizeofImage[3]%>";
      parent.userId[4]      = "<%=userId[4]%>";
      parent.userName[4]    = "<%=userName[4]%>";
      parent.userComment[4] = "<%=userComment[4]%>";
      parent.userImage[4]   = "<%=userImage[4]%>";
      parent.sizeofImage[4] = "<%=sizeofImage[4]%>";
      parent.userId[5]      = "<%=userId[5]%>";
      parent.userName[5]    = "<%=userName[5]%>";
      parent.userComment[5] = "<%=userComment[5]%>";
      parent.userImage[5]   = "<%=userImage[5]%>";
      parent.sizeofImage[5] = "<%=sizeofImage[5]%>";
      parent.pageNum        = <%=pageNo%>;
      parent.pageNumMax     = <%=pageNumMax%>;
    //-->
    </script>

<script language=javascript>
    <!--
      // 2005/08/06 003 H.SAITO PVCS#1110 Enter押下でログイン対応
      // 処理中フラグをクリア
      parent.ProcFlag = 0;

      <%=script%>
    //-->
    </script>
</HEAD>
<BODY bgColor=#f5e7dd onload=Fn_InitPage();>
<FORM name=frmLoginProc method=post>
  <INPUT id=txtFunction type=hidden name=txtFunction> 
  <INPUT id=txtUserID type=hidden name=txtUserID> 
  <INPUT id=txtPassword type=hidden name=txtPassword>
  <INPUT id=txtStartURL type=hidden name=txtStartURL>
  <INPUT id=txtMousePosition type=hidden name=txtMousePosition>
</FORM>
</BODY>
</HTML>
