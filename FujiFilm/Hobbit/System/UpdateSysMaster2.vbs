'2012/02/28
'UpdateSysMaster2.vbs

Const adOpenStatic = 3
Const adLockOptimistic = 3
Const adCmdText = 1

Function Main()

    Dim strFilePath
    Dim strKeyName
    Dim strValue
    Dim strErrFilePath
    
    Dim strSQL
    Dim objCN
    Dim objRS
    
    On Error Resume Next
    
    Set objShell = WScript.CreateObject("WScript.Shell")

	strLanguageType = objShell.RegRead("HKLM\SOFTWARE\FujiFilm\Hobbit\Version\Language")

	strFilePath = objShell.ExpandEnvironmentStrings("%HOBBIT_USER%") & "\\Config\\SysMaster.mdb"
    strKeyName = "FujiCRDetectFor355"
    strValue = "No"
    
    If "USA" = strLanguageType Then
	    Set objCN = CreateObject("ADODB.Connection")
	    Set objRS = CreateObject("ADODB.Recordset")
	    
	    objCN.Open "DRIVER={Microsoft Access Driver (*.mdb)}; DBQ= " & strFilePath
	    strSQL = "select * from SysConfig where Key='" & strKeyName & "'"
	    objRS.Open strSQL, objCN, adOpenStatic, adLockOptimistic, adCmdText
	    
	    With objRS
	        .Fields("Value") = strValue
	        .Update
	    End With
	         
	    objRS.Close
	    objCN.Close
	    Set objRS = Nothing
	    Set objCN = Nothing
	End If

    If Err<>0 Then
		WScript.Quit(1)
	End If

	WScript.Quit(0)

End Function
