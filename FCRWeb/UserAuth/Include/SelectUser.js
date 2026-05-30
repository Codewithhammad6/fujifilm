
//*****************************************************************************
// UserStrip_Click()
// １．機能
//      ユーザ短冊選択時の処理


// ２．戻り値
//　　  なし


// ３．備考


//　　　なし


//*****************************************************************************
function UserStrip_Click(no)
{
	userStripNo = no;
	clearTimeout(timerId);
	visibleAllStrip();
	
	switch(no) {
		case 1:
			if (document.getElementById('txtUserName1').style.visibility == "hidden")
			{
				return;
			}
			document.getElementById('imgUserStripN1').style.visibility = "hidden";
			parent.framePass.document.all.txtUserID.value = parent.userId[0];
			parent.framePass.document.all.lblUserName.value = document.getElementById('txtUserName1').value;
			parent.framePass.document.all.lblUserComment.value = document.getElementById('txtUserComment1').value;
			parent.framePass.document.all.txtPassword.value = "";
			if (parent.sizeofImage[0] == 0)
			{
				SetImageUrl(parent.framePass.document.all.imgUserImageH, document.getElementById('imgUserImage1h').src);
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageH.style.visibility = "visible";
			}
			else if (parent.sizeofImage[0] == 1)
			{
				SetImageUrl(parent.framePass.document.all.imgUserImageW, document.getElementById('imgUserImage1w').src);
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "visible";
				parent.framePass.document.all.imgUserImageH.style.visibility = "hidden";
			}
			else
			{
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageH.style.visibility = "hidden";
			}
			displaySoftKeyBoard();
			timerId = setTimeout("document.getElementById('imgUserStripN1').style.visibility = 'visible';parent.DisplayPassInput();", 500);
			break;
		case 2:
			if (document.getElementById('txtUserName2').style.visibility == "hidden")
			{
				return;
			}
			document.getElementById('imgUserStripN2').style.visibility = "hidden";
			parent.framePass.document.all.txtUserID.value = parent.userId[1];
			parent.framePass.document.all.lblUserName.value = document.getElementById('txtUserName2').value;
			parent.framePass.document.all.lblUserComment.value = document.getElementById('txtUserComment2').value;
			parent.framePass.document.all.txtPassword.value = "";
			if (parent.sizeofImage[1] == 0)
			{
				SetImageUrl(parent.framePass.document.all.imgUserImageH, document.getElementById('imgUserImage2h').src);
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageH.style.visibility = "visible";
			}
			else if (parent.sizeofImage[1] == 1)
			{
				SetImageUrl(parent.framePass.document.all.imgUserImageW, document.getElementById('imgUserImage2w').src);
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "visible";
				parent.framePass.document.all.imgUserImageH.style.visibility = "hidden";
			}
			else
			{
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageH.style.visibility = "hidden";
			}
			displaySoftKeyBoard();
			timerId = setTimeout("document.getElementById('imgUserStripN2').style.visibility = 'visible';parent.DisplayPassInput();", 500);
			break;
		case 3:
			if (document.getElementById('txtUserName3').style.visibility == "hidden")
			{
				return;
			}
			document.getElementById('imgUserStripN3').style.visibility = "hidden";
			parent.framePass.document.all.txtUserID.value = parent.userId[2];
			parent.framePass.document.all.lblUserName.value = document.getElementById('txtUserName3').value;
			parent.framePass.document.all.lblUserComment.value = document.getElementById('txtUserComment3').value;
			parent.framePass.document.all.txtPassword.value = "";
			if (parent.sizeofImage[2] == 0)
			{
				SetImageUrl(parent.framePass.document.all.imgUserImageH, document.getElementById('imgUserImage3h').src);
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageH.style.visibility = "visible";
			}
			else if (parent.sizeofImage[2] == 1)
			{
				SetImageUrl(parent.framePass.document.all.imgUserImageW, document.getElementById('imgUserImage3w').src);
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "visible";
				parent.framePass.document.all.imgUserImageH.style.visibility = "hidden";
			}
			else
			{
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageH.style.visibility = "hidden";
			}
			displaySoftKeyBoard();
			timerId = setTimeout("document.getElementById('imgUserStripN3').style.visibility = 'visible';parent.DisplayPassInput();", 500);
			break;
		case 4:
			if (document.getElementById('txtUserName4').style.visibility == "hidden")
			{
				return;
			}
			document.getElementById('imgUserStripN4').style.visibility = "hidden";
			parent.framePass.document.all.txtUserID.value = parent.userId[3];
			parent.framePass.document.all.lblUserName.value = document.getElementById('txtUserName4').value;
			parent.framePass.document.all.lblUserComment.value = document.getElementById('txtUserComment4').value;
			parent.framePass.document.all.txtPassword.value = "";
			if (parent.sizeofImage[3] == 0)
			{
				SetImageUrl(parent.framePass.document.all.imgUserImageH, document.getElementById('imgUserImage4h').src);
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageH.style.visibility = "visible";
			}
			else if (parent.sizeofImage[3] == 1)
			{
				SetImageUrl(parent.framePass.document.all.imgUserImageW, document.getElementById('imgUserImage4w').src);
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "visible";
				parent.framePass.document.all.imgUserImageH.style.visibility = "hidden";
			}
			else
			{
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageH.style.visibility = "hidden";
			}
			displaySoftKeyBoard();
			timerId = setTimeout("document.getElementById('imgUserStripN4').style.visibility = 'visible';parent.DisplayPassInput();", 500);
			break;
		case 5:
			if (document.getElementById('txtUserName5').style.visibility == "hidden")
			{
				return;
			}
			document.getElementById('imgUserStripN5').style.visibility = "hidden";
			parent.framePass.document.all.txtUserID.value = parent.userId[4];
			parent.framePass.document.all.lblUserName.value = document.getElementById('txtUserName5').value;
			parent.framePass.document.all.lblUserComment.value = document.getElementById('txtUserComment5').value;
			parent.framePass.document.all.txtPassword.value = "";
			if (parent.sizeofImage[4] == 0)
			{
				SetImageUrl(parent.framePass.document.all.imgUserImageH, document.getElementById('imgUserImage5h').src);
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageH.style.visibility = "visible";
			}
			else if (parent.sizeofImage[4] == 1)
			{
				SetImageUrl(parent.framePass.document.all.imgUserImageW, document.getElementById('imgUserImage5w').src);
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "visible";
				parent.framePass.document.all.imgUserImageH.style.visibility = "hidden";
			}
			else
			{
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageH.style.visibility = "hidden";
			}
			displaySoftKeyBoard();
			timerId = setTimeout("document.getElementById('imgUserStripN5').style.visibility = 'visible';parent.DisplayPassInput();", 500);
			break;
		case 6:
			if (document.getElementById('txtUserName6').style.visibility == "hidden")
			{
				return;
			}
			document.getElementById('imgUserStripN6').style.visibility = "hidden";
			parent.framePass.document.all.txtUserID.value = parent.userId[5];
			parent.framePass.document.all.lblUserName.value = document.getElementById('txtUserName6').value;
			parent.framePass.document.all.lblUserComment.value = document.getElementById('txtUserComment6').value;
			parent.framePass.document.all.txtPassword.value = "";
			if (parent.sizeofImage[5] == 0)
			{
				SetImageUrl(parent.framePass.document.all.imgUserImageH, document.getElementById('imgUserImage6h').src);
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageH.style.visibility = "visible";
			}
			else if (parent.sizeofImage[5] == 1)
			{
				SetImageUrl(parent.framePass.document.all.imgUserImageW, document.getElementById('imgUserImage6w').src);
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "visible";
				parent.framePass.document.all.imgUserImageH.style.visibility = "hidden";
			}
			else
			{
				parent.framePass.document.all.imgUserImage.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageW.style.visibility = "hidden";
				parent.framePass.document.all.imgUserImageH.style.visibility = "hidden";
			}
			displaySoftKeyBoard();
			timerId = setTimeout("document.getElementById('imgUserStripN6').style.visibility = 'visible';parent.DisplayPassInput();", 500);
			break;
		default:
			break;
	}
}

//*****************************************************************************
// visibleAllStrip()
// １．機能
//      全てのユーザ短冊を非選択状態にする
// ２．戻り値
//　　  なし


// ３．備考


//　　　なし


//*****************************************************************************
function visibleAllStrip()
{
	if (document.getElementById('txtUserName1').style.visibility == "visible")
	{
		document.getElementById('imgUserStripN1').style.visibility = "visible";
	}
	if (document.getElementById('txtUserName2').style.visibility == "visible")
	{
		document.getElementById('imgUserStripN2').style.visibility = "visible";
	}
	if (document.getElementById('txtUserName3').style.visibility == "visible")
	{
		document.getElementById('imgUserStripN3').style.visibility = "visible";
	}
	if (document.getElementById('txtUserName4').style.visibility == "visible")
	{
		document.getElementById('imgUserStripN4').style.visibility = "visible";
	}
	if (document.getElementById('txtUserName5').style.visibility == "visible")
	{
		document.getElementById('imgUserStripN5').style.visibility = "visible";
	}
	if (document.getElementById('txtUserName6').style.visibility == "visible")
	{
		document.getElementById('imgUserStripN6').style.visibility = "visible";
	}
}

//*****************************************************************************
// displaySoftKeyBoard()
// １．機能
//      ソフトウェアキーボードを表示を設定値によって切り替える
// ２．戻り値
//　　  なし


// ３．備考


//　　　なし


//*****************************************************************************
function displaySoftKeyBoard()
{
	// ソフトキーボードの表示
	if (frmList.txtSoftKeyBoardFlag.value == "1") {
		parent.framePass.document.all.frmSoftKeyBoard.style.visibility = "visible";
		parent.framePass.SoftKeyBoardFlag = 1;    //表示
	}
	else if (frmList.txtSoftKeyBoardFlag.value == "0") {
		parent.framePass.document.all.frmSoftKeyBoard.style.visibility = "hidden";
		parent.framePass.SoftKeyBoardFlag = 0;    //非表示
	}
}
