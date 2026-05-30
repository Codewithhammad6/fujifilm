@ECHO off
@ECHO Windows Service Stopping...
set LOGFILE="WinServiceStop.log"

rem CQ#1673対応で、サービス停止処理を削除し、WinServiceStarterで実施するよう変更
rem 開始/停止対象のサービスは、WinServiceList.xmlに記載
cd C:\Program Files\FujiFilm\Hobbit\System
echo 開始日時 %DATE% %TIME% > %LOGFILE%

WinServiceStarter stop
echo WinServiceStarter RESULT = %ERRORLEVEL% >> %LOGFILE%

echo 終了日時 %DATE% %TIME% >> %LOGFILE%
EXIT /B %ERRORLEVEL%