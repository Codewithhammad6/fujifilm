@echo off
echo ************ Select Menu **************
echo [0] : END.
echo [1] : OS ShutDown.
echo [2] : DR Windows Service Stop.
echo ***************************************
set /p NUM="Please select the number of actions to be taken. >"

IF "%NUM%"=="1" goto SHUTDOWN
IF "%NUM%"=="2" goto SERVICESTOP
goto END

:SHUTDOWN
echo OS shutdown process. Please Wait...
START /w EndProcessExecuter.exe "1"
goto END

:SERVICESTOP
echo Service the process of stopping. Please Wait...
START /w EndProcessExecuter.exe "2"
goto END

:END
pause