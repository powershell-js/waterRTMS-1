@echo off
%~d0
cd %~dp0
set P=%~dp0
set p=%p:\=/%
call ����.bat
echo ��װ����...
nssm install %NAME% %COMMAND%
nssm set %NAME% AppDirectory %p%
echo ��װ���
call ����.bat
pause