'////////////////////////////////////////////////////////////////////////////////
'//
'// フｧイル名:  SetImageDirSetting.vbs
'//
'// 説明:  指定されたイメージフォルダに対して以下の操作を行う。
'//        ①イメージフォルダに対する所有者設定
'//        ②IISのイメージ用仮想ディレクトリのパスにイメージフォルダパスを設定
'//        ③イメージフォルダに対する共有設定
'//
'// History：  2012/05/31 H.Onimaru 新規作成
'//
'////////////////////////////////////////////////////////////////////////////////

Option Explicit

Dim oParam
Dim strImagePath
Dim xpVersion
Dim WSHShell
Dim WSHNetwork
Dim strComputerName
Dim OSInfoCollection
Dim OSInfo
Dim CurrentOSVersion
Dim strCacls
Dim strGrant
Dim strASPOption
Dim strIUSROption
Dim strIISUSEROption 
Dim nResult

Dim IIsWebVDirImageObj

Dim strNetCmd
Dim strCmdLine

'コマンドライン引数（パラメータ）の取得
Set oParam = WScript.Arguments

If oParam.Count < 1 Then
	MsgBox "パラメータ不正"
	WScript.Quit 1
End If

strImagePath = oParam(0)

'XPのバージョンを設定する
xpVersion = "5.1.2600"
'Shellオブジェクト生成
Set WSHShell = CreateObject("WScript.Shell")

'筐体のコンピューター名の取得
Set WSHNetwork = CreateObject("WScript.Network")
strComputerName = WSHNetwork.computername

'OSバージョン取得
Set OSInfoCollection = GetObject("winmgmts:").InstancesOf("Win32_OperatingSystem")
For Each OSInfo In OSInfoCollection 'ループはコレクションの1番目を参照するためのみの役割
	'OSのバージョン
	CurrentOSVersion = OSInfo.Version  
Next
'オブジェクトの開放
Set OSInfoCollection = Nothing

'OSバージョンによる実行コマンドの判定
If CurrentOSVersion = xpVersion Then
	strCacls = "cacls.exe "
	strASPOption = " /T /E /G ASPNET:F"
	strIUSROption = " /T /E /G IUSR_" & strComputerName & ":F"

Else 
	strCacls = "icacls.exe "
	strGrant = " /grant:r "
	strASPOption = strGrant & " ASPNET:(OI)(CI)F /T"    
	strIUSROption = strGrant & " IUSR_" & strComputerName & ":(OI)(CI)F /T"
	strIISUSEROption = strGrant & " IIS_IUSRS:(OI)(CI)F /T"  

End if


'イメージフォルダへの所有者設定コマンド実行
nResult = WSHShell.Run (strCacls & """" & strImagePath & """" & strASPOption, 0,true)
nResult = WSHShell.Run (strCacls & """" & strImagePath & """" & strIUSROption, 0,true)

If CurrentOSVersion <> xpVersion Then
	nResult = WSHShell.Run (strCacls & """" & strImagePath & """" & strIISUSEROption, 0,true)
End if

'オブジェクトの開放
Set WSHNetwork = Nothing

'IIS仮想ディレクトリのパス更新
'FCRWebのオブジェクトを取得
Set IIsWebVDirImageObj = GetObject("IIS://localhost/W3SVC/1/Root/FCRWeb/Image")

'仮想ディレクトリのパスを更新
IIsWebVDirImageObj.Put "Path", strImagePath

IIsWebVDirImageObj.SetInfo

'オブジェクトの開放
Set IIsWebVDirImageObj = Nothing


'イメージフォルダの共有設定
strNetCmd = "net.exe "
'OSバージョンによる実行コマンドの判定
If CurrentOSVersion = xpVersion Then
	strCmdLine = " share Image=""" & strImagePath & """ /unlimited /remark:""Image Folder"""

Else 
	strCmdLine = " share Image=""" & strImagePath & """ /unlimited /remark:""Image Folder"" /grant:everyone,full"

End if

'元のイメージフォルダ共有解除コマンド実行
nResult = WSHShell.Run (strNetCmd & " share Image" & " /delete", 0,true)

'イメージフォルダへの共有設定コマンド実行
nResult = WSHShell.Run (strNetCmd & strCmdLine, 0,true)

'オブジェクトの開放
Set WSHShell = Nothing
