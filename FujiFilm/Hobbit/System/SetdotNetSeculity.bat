CD  %windir%\Microsoft.NET\Framework\v1.1.4322

CALL caspol.exe -q -chggroup 1.2 FullTrust

CD  %windir%\Microsoft.NET\Framework\v2.0.50727

CALL caspol.exe -q -machine -chggroup LocalIntranet_Zone FullTrust




