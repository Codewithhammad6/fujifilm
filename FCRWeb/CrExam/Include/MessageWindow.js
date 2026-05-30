var FATAL_ERROR = "FATAL_ERROR";
var RETRY_ERROR = "RETRY_ERROR";
var MESSAGE_ID = 30500;
var MESSAGE_ID_ACCESS = 30501;
var COOKIE_STUDY_SEQ   = "StudyingSequence";
var DialogProcMode     = "";
function Public_Error(errorKind, messageString){
try{
switch(errorKind){
case RETRY_ERROR:
document.getElementById("TD_ErrorText").innerHTML= messageString;
document.getElementById("DIV_ErrorOkText").innerText          = "OK";
document.getElementById("TABLE_ErrorFrame").style.visibility = "visible";
document.getElementById("DIV_ErrorButton").style.visibility = "visible";
if(document.getElementById("TABLE_ErrorFrame").keyControlable == true){
document.getElementById("DIV_ErrorButton").focus();
}
break;
default:
break;
}
}
catch(e){
Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+100);
}
}
function Public_Warning(errorKind, messageTitle1, messageTitle2, messageString){
try{
switch(errorKind){
case RETRY_ERROR:
document.getElementById("TD_ErrorTitle1").innerHTML          = messageTitle1;
document.getElementById("TD_ErrorTitle2").innerHTML          = messageTitle2;
document.getElementById("TD_ErrorText").innerHTML            = messageString;
document.getElementById("DIV_ErrorOkText").innerText         = "OK";
document.getElementById("TABLE_ErrorFrame").style.visibility = "visible";
document.getElementById("DIV_ErrorButton").style.visibility  = "visible";
if(document.getElementById("TABLE_ErrorFrame").keyControlable == true){
document.getElementById("DIV_ErrorButton").focus();
}
break;
default:
break;
}
}
catch(e){
Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+101);
}
}
function Public_Warning(errorKind, messageTitle1, messageTitle2, messageString, dialogProcMode){
try{
DialogProcMode = dialogProcMode;
switch(errorKind){
case RETRY_ERROR:
document.getElementById("TD_ErrorTitle1").innerHTML          = messageTitle1;
document.getElementById("TD_ErrorTitle2").innerHTML          = messageTitle2;
document.getElementById("TD_ErrorText").innerHTML            = messageString;
document.getElementById("DIV_ErrorOkText").innerText         = "OK";
document.getElementById("TABLE_ErrorFrame").style.visibility = "visible";
document.getElementById("DIV_ErrorButton").style.visibility  = "visible";
if(document.getElementById("TABLE_ErrorFrame").keyControlable == true){ 
document.getElementById("DIV_ErrorButton").focus();
} 
break;
default:
break;
}
}
catch(e){
Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+114);
}
}
function Public_ErrorDisplay(errorCommand,errorMsgId,errorFile,errorSpot)
{
	//2010/11/16 30501ÉGÉâÅ[â¸ëPëŒâû MOD ST
	if (top.WindowOpenMode == 0) {
		top.GetErrorMessage(errorCommand,errorMsgId,errorFile,errorSpot);
	} else {
		switch(errorMsgId)
		{
			case 30500:
				errorMsgId = 40500;
			case 30501:
			case 40501:
			case 40502:
			case 40503:
			case 40504:
			case 40505:
			case 40506:
			// 2013/02/15 NDDñkë∫ CQ#1650 ADD Start
			case 40507:
			// 2013/02/15 NDDñkë∫ CQ#1650 ADD End
				if (top.frames[1].STUDY_CTRL != undefined)
				{
					top.frames[1].STUDY_CTRL.STUDY_VIEW.CommandMode = "SUSPEND";
					top.frames[1].STUDY_CTRL.STUDY_VIEW.DeleteModeAtConfirm = 0;
					top.frames[1].STUDY_CTRL.STUDY_VIEW.DeleteUnShotImageSequence = "";
					top.ignoreFinish = true;
					top.frames[1].STUDY_CTRL.STUDY_VIEW.Fn_EndProc("SUSPEND");
					top.frames[1].STUDY_CTRL.STUDY_VIEW.CommandMode = "";
					var cond = "top.isExclusiveProcDone == true";
					var funcCall = "top.GetErrorMessage("+errorCommand+","+errorMsgId+",'"+errorFile+"',"+errorSpot+")";
					top.isExclusiveProcDone = false;
					setViser(cond, funcCall, 100);
					break;
				} else {
					top.ignoreFinish = true;
					parent.EXCLUSIVE_PROC.Public_Exclusive(PROC_MODE, parent.StudySequence, "", 0);
					top.GetErrorMessage(errorCommand,errorMsgId,errorFile,errorSpot);
					break;
				}
			default:
				top.GetErrorMessage(errorCommand,errorMsgId,errorFile,errorSpot);
				break;
		}
	}
	//2010/11/16 30501ÉGÉâÅ[â¸ëPëŒâû MOD ED
}

//2010/11/16 30501ÉGÉâÅ[â¸ëPëŒâû ADD ST
var g_IdViser = new Array();
var g_NumViser = 0;
var g_i = 0;
// 2012/07/06 NDDñkë∫ CQ#1384 ADD Start
var g_cnt = 0;
// 2012/07/06 NDDñkë∫ CQ#1384 ADD End
function setViser( cond, funcCall, timeVise)
{
	// 2012/07/06 NDDñkë∫ CQ#1384 UPD Start
	//strFunc = "" + "if(" + cond + "){ clearInterval(g_IdViser[" + g_NumViser + "]);" + funcCall + ";}";
	// 2012/07/06 NDDñkë∫ CQ#1384 UPD
	strFunc = "" + "if(" + cond + " || g_cnt > 50){ clearInterval(g_IdViser[" + g_NumViser + "]);" + funcCall + ";} g_cnt++;";
	// 2012/07/06 NDDñkë∫ CQ#1384 UPD End
	g_IdViser[g_NumViser++] = setInterval( strFunc, timeVise );
}
//2010/11/16 30501ÉGÉâÅ[â¸ëPëŒâû ADD ED

function Fn_ReleaseExclusive(){
try{
if(!typeof(PROC_MODE)){
return;    
}
switch(parent.ExclusiveMode){
case EXCLUSIVE_MODE1:      
parent.ExclusiveMode = "";
parent.EXCLUSIVE_PROC.Public_Exclusive(PROC_MODE);
return;
case EXCLUSIVE_MODE2:
return;
default:
return;
}
}
catch(e){
Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+102);
}
}
function Public_CloseError(){
try{
document.getElementById("TABLE_ErrorFrame").style.visibility   = "hidden";
document.getElementById("DIV_ErrorButton").style.visibility = "hidden";
}
catch(e){
Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+103);
}
}
function Public_Message(messageKind, messageString){
try{
switch(messageKind){
case "DIALOG":
document.getElementById("TD_ProcText").innerText = messageString;
document.getElementById("TABLE_ProcBox").style.visibility   = "visible";
document.getElementById("TABLE_ProcFrame").style.visibility = "visible";
document.getElementById("TABLE_ProcFrame").focus();
break;
case "NODIALOG":
document.getElementById("TABLE_ProcBox").style.visibility   = "hidden";
document.getElementById("TABLE_ProcFrame").style.visibility = "visible";
document.getElementById("TABLE_ProcFrame").focus();
break;
default:
break;
}
}
catch(e){
Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+104);
}
}
function Public_CloseMessage(){
try{
document.getElementById("TABLE_ProcBox").style.visibility   = "hidden";
document.getElementById("TABLE_ProcFrame").style.visibility = "hidden";
}
catch(e){
Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+105);
}
}
function Public_Confirm(){
try{
document.getElementById("TABLE_ConfirmFrame").style.visibility                = "visible";
document.getElementById("TABLE_ConfirmBox").style.visibility                    = "visible";
document.getElementById("IMG_ConfirmOkButton").style.visibility            = "visible";
document.getElementById("IMG_ConfirmCancelButton").style.visibility    = "visible";
document.getElementById("DIV_ConfirmOkText").style.visibility                    =    "visible";
document.getElementById("DIV_ConfirmCancelText").style.visibility            =    "visible";
document.getElementById("DIV_ConfirmOkButton").style.visibility     = "visible";
document.getElementById("DIV_ConfirmCancelButton").style.visibility = "visible";
document.getElementById("DIV_ConfirmOkButton").style.display        = "block";
document.getElementById("DIV_ConfirmCancelButton").style.display    = "block";
if(document.getElementById("TABLE_ConfirmFrame").keyControlable == true){
document.getElementById("DIV_ConfirmCancelButton").focus() ;
}
}
catch(e){
Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+106);
}
}
function Public_CloseConfirm(){
try{
document.getElementById("TABLE_ConfirmFrame").style.visibility                = "hidden";
document.getElementById("TABLE_ConfirmBox").style.visibility                    = "hidden";
document.getElementById("IMG_ConfirmOkButton").style.visibility            = "hidden";
document.getElementById("IMG_ConfirmCancelButton").style.visibility        = "hidden";
document.getElementById("DIV_ConfirmOkText").style.visibility                    =    "hidden";
document.getElementById("DIV_ConfirmCancelText").style.visibility            =    "hidden";
document.getElementById("DIV_ConfirmOkButton").style.visibility         = "hidden";
document.getElementById("DIV_ConfirmCancelButton").style.visibility     = "hidden";      
document.getElementById("DIV_ConfirmOkButton").style.display            = "none";
document.getElementById("DIV_ConfirmCancelButton").style.display        = "none";
}
catch(e){
Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+107);
}
}
function Public_ErrorConfirm(){
try{
document.getElementById("TABLE_ConfirmFrame").style.visibility                = "visible";
document.getElementById("TABLE_ConfirmBox").style.visibility                    = "visible";
document.getElementById("IMG_ConfirmOkButton").style.visibility            = "visible";
document.getElementById("IMG_ConfirmCancelButton").style.visibility    = "visible";
document.getElementById("IMG_ConfirmSkipButton").style.visibility    = "visible";
document.getElementById("DIV_ConfirmOkText").style.visibility                    =    "visible";
document.getElementById("DIV_ConfirmCancelText").style.visibility            =    "visible";
document.getElementById("DIV_ConfirmSkipText").style.visibility            =    "visible";
document.getElementById("DIV_ConfirmOkButton").style.visibility     = "visible";
document.getElementById("DIV_ConfirmCancelButton").style.visibility = "visible";
document.getElementById("DIV_ConfirmSkipButton").style.visibility   = "visible";
document.getElementById("DIV_ConfirmOkButton").style.display     = "block";
document.getElementById("DIV_ConfirmCancelButton").style.display = "block";
document.getElementById("DIV_ConfirmSkipButton").style.display   = "block";
if(document.getElementById("TABLE_ConfirmFrame").keyControlable == true){
document.getElementById("DIV_ConfirmCancelButton").focus() ;
}
}
catch(e){
Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+108);
}
}
function Public_ErrorCloseConfirm(){
try{
document.getElementById("TABLE_ConfirmFrame").style.visibility                = "hidden";
document.getElementById("TABLE_ConfirmBox").style.visibility                    = "hidden";
document.getElementById("IMG_ConfirmOkButton").style.visibility            = "hidden";
document.getElementById("IMG_ConfirmCancelButton").style.visibility        = "hidden";
document.getElementById("IMG_ConfirmSkipButton").style.visibility        = "hidden";
document.getElementById("DIV_ConfirmOkText").style.visibility                    =    "hidden";
document.getElementById("DIV_ConfirmCancelText").style.visibility            =    "hidden";
document.getElementById("DIV_ConfirmSkipText").style.visibility            =    "hidden";
document.getElementById("DIV_ConfirmOkButton").style.visibility     = "hidden";
document.getElementById("DIV_ConfirmCancelButton").style.visibility = "hidden";
document.getElementById("DIV_ConfirmSkipButton").style.visibility   = "hidden";
document.getElementById("DIV_ConfirmOkButton").style.display     = "none";
document.getElementById("DIV_ConfirmCancelButton").style.display = "none";
document.getElementById("DIV_ConfirmSkipButton").style.display   = "none";
}
catch(e){
Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+109);
}
}
function Fn_GetFileName(){
try{
var filePath;
var fileName;
filePath = window.location.href;
fileName = filePath.substring(filePath.lastIndexOf('/',filePath.length) + 1,filePath.length); 
if(fileName.indexOf("?") != -1){
fileName = fileName.substring(0, fileName.indexOf("?"));
}
return fileName;
}
catch(e){
Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+110);
}  
}
function Public_OnButton(buttonNo){
try{
var element =  document.getElementById("DIV_ErrorButton");
switch(buttonNo){
case 0:
document.getElementById("IMG_ErrorButton").src = "../Bmp/cmOvalAGreenLBtnD.gif";
break;
case 1:
if(element.focused == true){
document.getElementById("IMG_ErrorButton").src = "../Bmp/cmOvalAGreenLBtnF.gif";
}else{
document.getElementById("IMG_ErrorButton").src = "../Bmp/cmOvalAGreenLBtnU.gif";
}
break;
case 2:
if(element.pressed != true){
document.getElementById("IMG_ErrorButton").src = "../Bmp/cmOvalAGreenLBtnF.gif";
}
break;
case 3:
if(element.pressed != true){
document.getElementById("IMG_ErrorButton").src = "../Bmp/cmOvalAGreenLBtnU.gif";
}
break;
default:
Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+111);
break;
}
}
catch(e){
Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+112);
}
}
function Public_Unload(){
try{
var dialogParam;
if(OpenMode != OPEN_MODE_WINDOW){
return;
}
var strURL;
var topPos  = window.screenTop;
var leftPos = window.screenLeft;
switch(ExclusiveState){
case 1:
case 3:
dialogParam = new Array();
dialogParam.push(ExclusiveState);
dialogParam.push(StudySequence); 
dialogParam.push(encodeURIComponent(top.LoginUserId)); 
dialogParam.push(top.LoginTime); 
ExclusiveState = 0;
StudySequence = -1;
strURL = "Main_Close_Proc.aspx?DialogParam=" + dialogParam;
showModalDialog(strURL,"", "scroll=no; toolbar=no; help=off; location=no; directories=no; status=no; menubar=no; resizable=no; dialogTop:" + topPos + "px;dialogLeft:" + leftPos + "px;     dialogHeight:0px;dialogWidth:0px");
break;
case 2:
dialogParam = new Array();
dialogParam.push(ExclusiveState);
dialogParam.push(StudySequence); 
dialogParam.push(encodeURIComponent(top.LoginUserId)); 
dialogParam.push(top.LoginTime); 
ExclusiveState = 0;
StudySequence = -1;
top.SetCookie(COOKIE_STUDY_SEQ, "");
strURL = "Main_Close_Proc.aspx?DialogParam=" + dialogParam;
showModalDialog(strURL,"", "scroll=no; toolbar=no; help=off; location=no; directories=no; status=no; menubar=no; resizable=no; dialogTop:" + topPos + "px;dialogLeft:" + leftPos + "px;     dialogHeight:0px;dialogWidth:0px");
break;
default:
break;
}
top.Public_Dialog();
}
catch(e){
Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+113);
}  
}