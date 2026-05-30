@ECHO off
@ECHO Windows Service Starting...
set LOGFILE="WinServiceStart.log"

rem CQ#1673対応で、サービス開始処理を削除し、WinServiceStarterで実施するよう変更
rem 開始/停止対象のサービスは、WinServiceList.xmlに記載
cd C:\Program Files\FujiFilm\Hobbit\System
echo 開始日時 %DATE% %TIME% > %LOGFILE%

WinServiceStarter start
echo WinServiceStarter RESULT = %ERRORLEVEL% >> %LOGFILE%

echo 終了日時 %DATE% %TIME% >> %LOGFILE%
EXIT /B %ERRORLEVEL%