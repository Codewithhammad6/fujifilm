function DispErrDiv(ErrString)
{
	document.getElementById("div_err").style.visibility = "visible";
	document.getElementById("ErrMsgDiv").innerText = ErrString;
}

function CloseErrDiv()
{
	document.getElementById("div_err").style.visibility = "hidden";
}

