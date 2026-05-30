Option Explicit
Const adOpenStatic = 3
Const adLockOptimistic = 3
Const adCmdText = 1
Const ForWriting = 2
Const ForAppending = 8
Const TemporaryFolder = 2

Function Main()

    Dim strPath
    Dim nRet
    strPath = "C:\\Documents and Settings\\All Users\\Application Data\\FujiFilm\\Hobbit\\Config\\SysMaster.mdb"
    
    nRet = UpdateSysMaster(strPath, "PDIRecordableMedia", "3")
    
    If nRet<>0 Then
       nRet = -1
    End if
    
    Main = nRet

End Function

Function UpdateSysMaster(strFilePath, strKeyName, strValue) 

    On Error Resume Next

    Dim strSQL
    Dim objCN
    Dim objRS

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

    If Err<>0 Then
        WriteLog strKeyName, strValue, Err.Number,Err.Description
    
    End If
    UpdateSysMaster = Err.Number

End Function

Sub WriteLog(strKeyName, strValue, nErrNumber,strErrDescription)
    On Error Resume Next
   
    Dim objFIO
    Dim stream
    Dim strFilePath

    Set objFIO = CreateObject("Scripting.FileSystemObject")  
    strFilePath = objFIO.GetSpecialFolder(TemporaryFolder) & "\UpdateSysMaster.txt"   
    Set stream = objFIO.OpenTextFile(strFilePath ,ForAppending ,true)

    stream.WriteLine(date & " " & time & " " &  "KeyName=" & strKeyName & ", Value=" & strValue & ", Error Number =" & nErrNumber & ", Error Description=" & strErrDescription)
    stream.Close

    stream = Nothing
    objFIO = Nothing
    
End Sub


