var KEYCONTROL_JS = "KeyControl.js";
var RETRY_ERROR = "RETRY_ERROR"; 
var msgIdBase ; var VK_TAB = 0x09;
var VK_ENTER = 0x0D;
var VK_SPACE = 0x20;
var VK_LEFT = 0x25;
var VK_UP = 0x26;
var VK_RIGHT = 0x27;
var VK_DOWN = 0x28;
var NONACTIVE_FORE_COLOR = "#000000"; 
var NONACTIVE_BACK_COLOR = "#ECC2AC"; 
var groupHolder;
function WriteIISLog(filename,spotCode){
try{
var screen = window.location.pathname ;
var id = "MsgId=" + (msgIdBase + spotCode) ;
var level = "&Command=" + RETRY_ERROR ;
var file = "&FileName=" + filename ;
var spotCode = "&SpotCode=" + spotCode ;
var message = screen + id + level + file + spotCode ;
top.GetErrorFrame.location.replace(message);
}catch(exception){
;;;; }
}
function EnableClick(element){
element.KC_EnableClickFunction = keyDown;
element.attachEvent("onkeydown", keyDown);
function keyDown(){
try{
if(event.keyCode == VK_SPACE || event.keyCode == VK_ENTER ){
element.fireEvent("onclick");
return false ;
}
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 0);
return false ;
}
}
}
function DisableClick(element){
element.detachEvent("onkeydown", element.KC_EnableClickFunction);
element.KC_EnableClickFunction = null;
}
function EnableEntry(element){
element.KC_EnableEntryFunction = FireTabKeyEvent;
element.attachEvent("onkeydown", FireTabKeyEvent);
function FireTabKeyEvent(){
try{
if(event.keyCode == VK_ENTER){
var e = event;
e.keyCode = VK_TAB;
element.fireEvent("onkeydown", e);
return false;
}
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 1);
return false;
}
}
}
function DisableEntry(element){
element.detachEvent("onkeydown", element.KC_EnableEntryFunction);
element.KC_EnableEntryFunction = null;
}
function EnableSubmit(txtbox, button){
txtbox.KC_EnableSubmitFunction = EnterKeydown;
txtbox.attachEvent("onkeydown", EnterKeydown);
function EnterKeydown(){
try{
if(event.keyCode == VK_ENTER && event.shiftKey != true ){
button.fireEvent("onclick");
return false;
}
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 2);
return false;
}
}
}
function DisableSubmit(txtbox){
txtbox.detachEvent("onkeydown", txtbox.KC_EnableSubmitFunction);
txtbox.KC_EnableSubmitFunction = null;
}
function EnableTxtLeave(element){
element.KC_EnableTxtLeaveFunction = TabKeydown;
element.attachEvent("onkeydown", TabKeydown);
function TabKeydown(){
try{
if(event.keyCode == VK_TAB){
gSelected = null;
event.srcElement.style.backgroundColor = NONACTIVE_BACK_COLOR;
event.srcElement.style.color = NONACTIVE_FORE_COLOR;
}
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 3);
}
}
}
function DisableTxtLeave(element){
element.detachEvent("onkeydown", element.KC_EnableTxtLeaveFunction);
element.KC_EnableTxtLeaveFunction = null;
}
function EnableKeepFocus(button){
try{
var elements = button.getElementsByTagName("*");
for(i=0; i<elements.length; i++){
elements[i].onfocus = function(){button.focus()};
}
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 4);
}
}
function DisableKeepFocus(button){
try{
var elements = button.getElementsByTagName("*");
for(i=0; i<elements.length; i++){
elements[i].onfocus = null;
}
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 5);
}
}
function CreateFocusGroup(array){
try{
groupHolder.push(new FocusGroup(array));
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 6);
}
}
function CreateRadioGroup(array, getSelected){
try{
groupHolder.push(new RadioGroup(array, getSelected));
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 7);
}
}
function CreateErrorButtonGroup(array){
try{
groupHolder.push(new ErrorButtonGroup(array));
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 8);
}
}
function GetSelectedSex(){
var ID_MALE_RADIO = "DivSexMale_Value";
var ID_FEMALE_RADIO = "DivSexFemale_Value";
var ID_OTHER_RADIO = "DivSexOther_Value";
try{
var selectedElementId;
switch(g_PSex){
case SEX_MALE:
selectedElementId = ID_MALE_RADIO;
break;
case SEX_FEMALE:
selectedElementId = ID_FEMALE_RADIO;
break;
default :
selectedElementId = ID_OTHER_RADIO;
break;
}
return document.getElementById(selectedElementId);
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 9);
return null;
}
}
function GetSelectedEra(){
var ID_MEIJI_RADIO = "DivEraMeiji_Value";
var ID_TAISHO_RADIO = "DivEraTaisho_Value";
var ID_SHOWA_RADIO = "DivEraShowa_Value";
var ID_HEISEI_RADIO = "DivEraHeisei_Value";
try{
var selectedElementId;
switch(g_EraNo){
case 1:
selectedElementId = ID_MEIJI_RADIO;
break;
case 2:
selectedElementId = ID_TAISHO_RADIO;
break;
case 3:
selectedElementId = ID_SHOWA_RADIO;
break;
case 4:
selectedElementId = ID_HEISEI_RADIO;
break;
default :
return null;
break;
}
return document.getElementById(selectedElementId);
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 10);
return null ;
}
}
function FocusGroup(array){
this.focusSequence = array;
var self = this;
this.KeyDown = function(){
try{
var id = event.srcElement.id;
if(event.keyCode == VK_TAB){
var nextElement ;
if(event.shiftKey == false){
nextElement = self.GetNextElement(id);
}else{
nextElement = self.GetPrevElement(id);
}
if(nextElement.isRadio == true){
var selectedElement
= nextElement.container.GetSelectedElement();
if(selectedElement != null){
nextElement = selectedElement ;
}
}
nextElement.focus();
return false;
}
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 50);
return false;
}
}
this.GetNextElement = function(id){
try{
var index = this.IndexOf(id);
var nextElement;
do{
if(index != this.focusSequence.length - 1){
index = index+1;
}else{
index = 0;
}
var nextElementId = this.focusSequence[index];
nextElement = document.getElementById(nextElementId);
}while(nextElement.display.style.visibility == "hidden"
|| nextElement.display.style.display == "none"
|| nextElement.display.currentStyle.visibility == "hidden"
|| nextElement.disabled == true
|| nextElement.Enabled == false )
return nextElement;
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 51);
}
}
this.GetPrevElement = function(id){
try{
var index = this.IndexOf(id);
var prevElement ;
do{
if(index != 0){
index = index-1;
}else{
index = this.focusSequence.length - 1;
}
var prevElementId = this.focusSequence[index];
prevElement = document.getElementById(prevElementId);
}while(prevElement.display.style.visibility == "hidden"
|| prevElement.display.style.display == "none"
|| prevElement.display.currentStyle.visibility == "hidden"
|| prevElement.disabled == true
|| prevElement.Enabled == false )
return prevElement;
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 52);
}
}
this.IndexOf = function (id){
try{
for(i=0; i<this.focusSequence.length; i++){
if(this.focusSequence[i]==id){
return i;
}
}
return -1;
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 53);
}
}
for(i=0; i<array.length; i++){
var element = document.getElementById(array[i]);
element.attachEvent("onkeydown", this.KeyDown);
}
this.CleanupEventHandler = function(){
for(i=0; i<this.focusSequence.length; i++){
var element = document.getElementById(this.focusSequence[i]);
element.detachEvent("onkeydown", this.KeyDown);
}
}
}
function RadioGroup(radioIdArray, getSelected){
this.radioIDs = radioIdArray;
this.GetSelectedElement = getSelected;
var self = this;
this.KeyDown = function () {
try{
var keyCode = event.keyCode;
var element = event.srcElement;
switch(keyCode){
case VK_UP :
case VK_LEFT :
self.FocusPrev(element.id);
return false ;
break;
case VK_DOWN :
case VK_RIGHT :
self.FocusNext(element.id);
return false ;
break;
case VK_TAB :
if(event.srcElement.id != self.radioIDs[0]){
var firstRadio = document.getElementById(self.radioIDs[0]);
var tabKeyDownEvent = event;
tabKeyDownEvent.keyCode = VK_TAB;
firstRadio.fireEvent("onkeydown", tabKeyDownEvent);
return false;
}
break;
case VK_ENTER :
if(event.srcElement != self.GetSelectedElement()){
event.srcElement.fireEvent("onmousedown");
}
if(event.shiftKey != true){
var tabKeyDownEvent = event;
tabKeyDownEvent.keyCode = VK_TAB;
element.fireEvent("onkeydown", tabKeyDownEvent);
return false;
}
break;
case VK_SPACE :
event.srcElement.fireEvent("onmousedown");
return false ;
break;
default:
return ;
break;
}
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 60);
return false ;
}
}
this.FocusNext = function (id){
try{
var currentIndex = this.IndexOf(id);
var nextElement = undefined;
if(currentIndex != this.radioIDs.length - 1){
nextElement = document.getElementById(this.radioIDs[currentIndex+1]);
}else{
nextElement = document.getElementById(this.radioIDs[0]);
}
nextElement.focus();
nextElement.fireEvent("onmousedown");
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 62);
}
}
this.FocusPrev = function (id){
try{
var currentIndex = this.IndexOf(id);
var prevElement = undefined;
if(currentIndex != 0){
var prevElementId = this.radioIDs[currentIndex-1];
prevElement = document.getElementById(prevElementId);
}else{
var prevElementId = this.radioIDs[this.radioIDs.length-1];
prevElement = document.getElementById(prevElementId);
}
prevElement.focus();
prevElement.fireEvent("onmousedown");
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 63);
}
}
this.IndexOf = function (id){
try{
for(i=0; i<this.radioIDs.length; i++){
if(this.radioIDs[i]==id){
return i;
}
}
return -1;
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 64);
}
}
for(i=0; i<radioIdArray.length; i++){
var element = document.getElementById(radioIdArray[i]);
element.attachEvent("onkeydown", this.KeyDown);
element.isRadio = true; 
element.container = this;}
this.CleanupEventHandler = function(){
for(i=0; i<this.radioIDs.length; i++){
var element = document.getElementById(this.radioIDs[i]);
element.detachEvent("onkeydown", this.KeyDown);
element.container = null;
}
this.GetSelectedElement = null;
}
}
function ErrorButtonGroup(idArray){
this.prototype = new FocusGroup(idArray);
this.arrowFocusSequence = idArray;
var self = this;
this.ArrowKeyDown = function(){
try{
var id = event.srcElement.id;
var retValue = false ;
switch(event.keyCode){
case VK_DOWN :
case VK_RIGHT :
var nextElement = self.prototype.GetNextElement(id);
nextElement.focus();
return false ;
break;
case VK_UP :
case VK_LEFT :
nextElement = self.prototype.GetPrevElement(id);
nextElement.focus();
return false ;
break;
default :
return ;
break;
}
}catch(exception){
WriteIISLog(KEYCONTROL_JS, 70);
return false ;
}
}
for(i=0; i<idArray.length; i++){
var element = document.getElementById(idArray[i]);
element.tabIndex = 0;
element.attachEvent("onkeydown", this.ArrowKeyDown);
}
this.CleanupEventHandler = function(){
for(i=0; i<this.arrowFocusSequence.length; i++){
var element = document.getElementById(this.arrowFocusSequence[i]);
element.detachEvent("onkeydown", this.ArrowKeyDown);
}
this.prototype.CleanupEventHandler();
}
}
function CleanupGroupHolder(){
try{
for (var i=0; i<groupHolder.length; i++){
groupHolder[i].CleanupEventHandler();
}
}catch(exception){
;;;; }
groupHolder = null;
}
