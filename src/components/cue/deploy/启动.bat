@echo off
%~d0
cd %~dp0
call ����.bat
echo ������������...
nssm start %NAME%
echo �������
pause