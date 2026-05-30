@ECHO off
@ECHO Windows is changing the startup type of service...
set LOGFILE="WinServiceAuto.log"
set ERROR_COUNT=0

echo ŠJŽn“úŽž %DATE% %TIME% > %LOGFILE%
sc.exe config "Hobbit Study Table Regist" start= auto >> %LOGFILE%
echo ERROR_LEVEL %ERRORLEVEL% >> %LOGFILE%
if %ERRORLEVEL%==1 (
  SET /a ERROR_COUNT=ERROR_COUNT+1
)

echo Œ»Ý“úŽž %DATE% %TIME% >> %LOGFILE%
sc.exe config "Hobbit Image Retrieve Request" start= auto >> %LOGFILE%
echo ERROR_LEVEL %ERRORLEVEL% >> %LOGFILE%
if %ERRORLEVEL%==1 (
  SET /a ERROR_COUNT=ERROR_COUNT+1
)

echo Œ»Ý“úŽž %DATE% %TIME% >> %LOGFILE%
sc.exe config "Hobbit Selected Patient Notice" start= auto >> %LOGFILE%
echo ERROR_LEVEL %ERRORLEVEL% >> %LOGFILE%
if %ERRORLEVEL%==1 (
  SET /a ERROR_COUNT=ERROR_COUNT+1
)

echo Œ»Ý“úŽž %DATE% %TIME% >> %LOGFILE%
sc.exe config "ActiveLineService" start= auto >> %LOGFILE%
echo ERROR_LEVEL %ERRORLEVEL% >> %LOGFILE%
if %ERRORLEVEL%==1 (
  SET /a ERROR_COUNT=ERROR_COUNT+1
)

echo Œ»Ý“úŽž %DATE% %TIME% >> %LOGFILE%
sc.exe config "MeasurementsSendService" start= auto >> %LOGFILE%
echo ERROR_LEVEL %ERRORLEVEL% >> %LOGFILE%
if %ERRORLEVEL%==1 (
  SET /a ERROR_COUNT=ERROR_COUNT+1
)

echo Œ»Ý“úŽž %DATE% %TIME% >> %LOGFILE%
sc.exe config "PlusStorageUploadFileCreateService" start= auto >> %LOGFILE%
echo ERROR_LEVEL %ERRORLEVEL% >> %LOGFILE%
if %ERRORLEVEL%==1 (
  SET /a ERROR_COUNT=ERROR_COUNT+1
)

echo Œ»Ý“úŽž %DATE% %TIME% >> %LOGFILE%
sc.exe config "MirroringService" start= auto >> %LOGFILE%
echo ERROR_LEVEL %ERRORLEVEL% >> %LOGFILE%
if %ERRORLEVEL%==1 (
  SET /a ERROR_COUNT=ERROR_COUNT+1
)

echo Œ»Ý“úŽž %DATE% %TIME% >> %LOGFILE%
sc.exe config "FFDRInputService" start= auto >> %LOGFILE%
echo ERROR_LEVEL %ERRORLEVEL% >> %LOGFILE%
if %ERRORLEVEL%==1 (
  SET /a ERROR_COUNT=ERROR_COUNT+1
)

echo Œ»Ý“úŽž %DATE% %TIME% >> %LOGFILE%
sc.exe config "W3SVC" start= auto >> %LOGFILE%
echo ERROR_LEVEL %ERRORLEVEL% >> %LOGFILE%
if %ERRORLEVEL%==1 (
  SET /a ERROR_COUNT=ERROR_COUNT+1
)

echo I—¹“úŽž %DATE% %TIME% >> %LOGFILE%
echo ERROR_COUNT %ERROR_COUNT% >> %LOGFILE%
EXIT /B %ERROR_COUNT%
