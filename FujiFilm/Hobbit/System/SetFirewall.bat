@ECHO OFF
CD C:\WINDOWS\SYSTEM32
ECHO The setting of firewall begins.

ECHO Setting Allowed Echo(Ping)...
CALL netsh firewall set icmpsetting type=8 mode=ENABLE

ECHO Setting File and Print...
CALL netsh firewall set service type=FILEANDPRINT mode=ENABLE

ECHO Setting Web Server...
CALL netsh firewall add portopening protocol=TCP port=80 name=WebServer mode=ENABLE scope=SUBNET profile=STANDARD

rem ---- 20090915 SQLServerリモート許可設定
ECHO Setting SQLServer
CALL netsh firewall add allowedprogram program="C:\Program Files\Microsoft SQL Server\MSSQL.1\MSSQL\Binn\sqlservr.exe" name=SQLServer mode=ENABLE scope=SUBNET profile=STANDARD

ECHO Setting SQL Server Browser
CALL netsh firewall add allowedprogram program="C:\Program Files\Microsoft SQL Server\90\Shared\sqlbrowser.exe" name=SQLBrowser mode=ENABLE scope=SUBNET profile=STANDARD

ECHO Setting TCPPort...
CALL netsh firewall add portopening protocol = TCP port = 1433 name = SQLServer
rem ---- 20090915 SQLServerリモート許可設定

ECHO Setting FFBackupUtility...
CALL netsh firewall add allowedprogram program="C:\Program Files\FujiFilm\Hobbit\System\FFBackupUtility.exe" name=FFBackupUtility mode=ENABLE scope=SUBNET profile=STANDARD

ECHO Setting FFDiskCopy...
CALL netsh firewall add allowedprogram program="C:\Program Files\FujiFilm\Hobbit\System\FFDiskCopy.exe" name=FFDiskCopy mode=ENABLE scope=SUBNET profile=STANDARD

ECHO Setting FFInput...
CALL netsh firewall add allowedprogram program="C:\Program Files\FujiFilm\Hobbit\System\FFInput.exe" name=FFInput mode=ENABLE scope=SUBNET profile=STANDARD

ECHO Setting FFMediaControl...
CALL netsh firewall add allowedprogram program="C:\Program Files\FujiFilm\Hobbit\System\FFMediaControl.exe" name=FFMediaControl mode=ENABLE scope=SUBNET profile=STANDARD

ECHO Setting FFMediaValidation...
CALL netsh firewall add allowedprogram program="C:\Program Files\FujiFilm\Hobbit\System\FFMediaValidation.exe" name=FFMediaValidation mode=ENABLE scope=SUBNET profile=STANDARD

ECHO Setting FFOUTPUT...
CALL netsh firewall add allowedprogram program="C:\Program Files\FujiFilm\Hobbit\System\FFOUTPUT.exe" name=FFOUTPUT mode=ENABLE scope=SUBNET profile=STANDARD

ECHO Setting FFRetrieve...
CALL netsh firewall add allowedprogram program="C:\Program Files\FujiFilm\Hobbit\System\FFRetrieve.exe" name=FFRetrieve mode=ENABLE scope=SUBNET profile=STANDARD

ECHO Setting FFRoutine...
CALL netsh firewall add allowedprogram program="C:\Program Files\FujiFilm\Hobbit\System\FFRoutine.exe" name=FFRoutine mode=ENABLE scope=SUBNET profile=STANDARD

ECHO Setting FFServiceUtility...
CALL netsh firewall add allowedprogram program="C:\Program Files\FujiFilm\Hobbit\System\FFServiceUtility.exe" name=FFServiceUtility mode=ENABLE scope=SUBNET profile=STANDARD

ECHO Setting FFUPSEvent...
CALL netsh firewall add allowedprogram program="C:\Program Files\FujiFilm\Hobbit\System\FFUPSEvent.exe" name=FFUPSEvent mode=ENABLE scope=SUBNET profile=STANDARD

ECHO Setting FFUserUtility...
CALL netsh firewall add allowedprogram program="C:\Program Files\FujiFilm\Hobbit\System\FFUserUtility.exe" name=FFUserUtility mode=ENABLE scope=SUBNET profile=STANDARD

ECHO Setting FMTAutoEdit...
CALL netsh firewall add allowedprogram program="C:\Program Files\FujiFilm\Hobbit\System\FMTAutoEdit.exe" name=FMTAutoEdit mode=ENABLE scope=SUBNET profile=STANDARD

ECHO Setting Hobbit...
CALL netsh firewall add allowedprogram program="C:\Program Files\FujiFilm\Hobbit\System\Hobbit.exe" name=Hobbit mode=ENABLE scope=SUBNET profile=STANDARD

ECHO Setting RestartServiceUtility...
CALL netsh firewall add allowedprogram program="C:\Program Files\FujiFilm\Hobbit\System\RestartServiceUtility.exe" name=RestartServiceUtility mode=ENABLE scope=SUBNET profile=STANDARD

ECHO Setting HTMLView...
CALL netsh firewall add allowedprogram program="C:\Program Files\FujiFilm\Hobbit\System\HTMLView.exe" name=HTMLView mode=ENABLE scope=SUBNET profile=STANDARD

EXIT
