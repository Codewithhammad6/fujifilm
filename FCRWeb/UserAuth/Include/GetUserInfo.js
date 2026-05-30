
//*****************************************************************************
// requestUserInfo()
// １．機能
//      1ページ分のユーザ情報を取得する
// ２．引数
//      page  : 取得したいページ
//              -1  : 前のページ
//               0  : 現在のページ(再取得)
//               1  : 次のページ
// ３．戻り値
//　　  なし
// ４．備考
//      Login_Procの処理を呼び出す
//*****************************************************************************
function requestUserInfo(page)
{
	if (page == -1)
	{
		// 1ページ前の情報を取得
		parent.pageNum = parent.pageNum -1;
	}
	else if (page == 0)
	{
		// 現在ページの情報を再取得
	}
	else if (page == 1)
	{
		// 1ページ後の情報を取得
		parent.pageNum = parent.pageNum + 1;
	}
	parent.frameProc.location.replace('./Login_Proc.aspx?PageNo=' + parent.pageNum + '&URL=' + queryURL + '&IsLogoff=' + queryIsLogoff);
}

//*****************************************************************************
// setUserInfo()
// １．機能
//      取得したユーザ情報を画面に反映する
// ２．戻り値
//　　  なし
// ３．備考
//      requestUserInfo()呼出し後に実行する(Login_Procから呼ばれる)
//*****************************************************************************
function setUserInfo()
{
	// ユーザ短冊1
	if (parent.userId[0] != "")
	{
		document.getElementById('imgUserStripN1').style.visibility = "visible";
		document.getElementById('imgUserStripS1').style.visibility = "visible";
		document.getElementById('txtUserName1').style.visibility = "visible";
		document.getElementById('txtUserComment1').style.visibility = "visible";
		if (parent.sizeofImage[0] == 0)
		{
			document.getElementById('imgUserImage1w').style.visibility = "hidden";
			document.getElementById('imgUserImage1h').style.visibility = "visible";
			document.getElementById('imgUserImage1h').src = parent.userImage[0];
		}
		else if (parent.sizeofImage[0] == 1)
		{
			document.getElementById('imgUserImage1w').style.visibility = "visible";
			document.getElementById('imgUserImage1h').style.visibility = "hidden";
			document.getElementById('imgUserImage1w').src = parent.userImage[0];
		}
		else
		{
			document.getElementById('imgUserImage1w').style.visibility = "hidden";
			document.getElementById('imgUserImage1h').style.visibility = "hidden";
		}

		if(parent.userName[0] != "")
		{
			document.getElementById('txtUserName1').value = parent.userName[0];
		}
		else
		{
			document.getElementById('txtUserName1').value = parent.userId[0];
		}

		document.getElementById('txtUserComment1').value = parent.userComment[0];
	}
	else
	{
		document.getElementById('imgUserStripN1').style.visibility = "hidden";
		document.getElementById('imgUserStripS1').style.visibility = "hidden";
		document.getElementById('txtUserName1').style.visibility = "hidden";
		document.getElementById('txtUserComment1').style.visibility = "hidden";
		document.getElementById('imgUserImage1h').style.visibility = "hidden";
		document.getElementById('imgUserImage1w').style.visibility = "hidden";
	}

	// ユーザ短冊2
	if (parent.userId[1] != "")
	{
		document.getElementById('imgUserStripN2').style.visibility = "visible";
		document.getElementById('imgUserStripS2').style.visibility = "visible";
		document.getElementById('txtUserName2').style.visibility = "visible";
		document.getElementById('txtUserComment2').style.visibility = "visible";
		if (parent.sizeofImage[1] == 0)
		{
			document.getElementById('imgUserImage2w').style.visibility = "hidden";
			document.getElementById('imgUserImage2h').style.visibility = "visible";
			document.getElementById('imgUserImage2h').src = parent.userImage[1];
		}
		else if (parent.sizeofImage[1] == 1)
		{
			document.getElementById('imgUserImage2w').style.visibility = "visible";
			document.getElementById('imgUserImage2h').style.visibility = "hidden";
			document.getElementById('imgUserImage2w').src = parent.userImage[1];
		}
		else
		{
			document.getElementById('imgUserImage2w').style.visibility = "hidden";
			document.getElementById('imgUserImage2h').style.visibility = "hidden";
		}

		if(parent.userName[1] != "")
		{
			document.getElementById('txtUserName2').value = parent.userName[1];
		}
		else
		{
			document.getElementById('txtUserName2').value = parent.userId[1];
		}

		document.getElementById('txtUserComment2').value = parent.userComment[1];
	}
	else
	{
		document.getElementById('imgUserStripN2').style.visibility = "hidden";
		document.getElementById('imgUserStripS2').style.visibility = "hidden";
		document.getElementById('txtUserName2').style.visibility = "hidden";
		document.getElementById('txtUserComment2').style.visibility = "hidden";
		document.getElementById('imgUserImage2h').style.visibility = "hidden";
		document.getElementById('imgUserImage2w').style.visibility = "hidden";
	}

	// ユーザ短冊3
	if (parent.userId[2] != "")
	{
		document.getElementById('imgUserStripN3').style.visibility = "visible";
		document.getElementById('imgUserStripS3').style.visibility = "visible";
		document.getElementById('txtUserName3').style.visibility = "visible";
		document.getElementById('txtUserComment3').style.visibility = "visible";
		if (parent.sizeofImage[2] == 0)
		{
			document.getElementById('imgUserImage3w').style.visibility = "hidden";
			document.getElementById('imgUserImage3h').style.visibility = "visible";
			document.getElementById('imgUserImage3h').src = parent.userImage[2];
		}
		else if (parent.sizeofImage[2] == 1)
		{
			document.getElementById('imgUserImage3w').style.visibility = "visible";
			document.getElementById('imgUserImage3h').style.visibility = "hidden";
			document.getElementById('imgUserImage3w').src = parent.userImage[2];
		}
		else
		{
			document.getElementById('imgUserImage3w').style.visibility = "hidden";
			document.getElementById('imgUserImage3h').style.visibility = "hidden";
		}

		if(parent.userName[2] != "")
		{
			document.getElementById('txtUserName3').value = parent.userName[2];
		}
		else
		{
			document.getElementById('txtUserName3').value = parent.userId[2];
		}

		document.getElementById('txtUserComment3').value = parent.userComment[2];
	}
	else
	{
		document.getElementById('imgUserStripN3').style.visibility = "hidden";
		document.getElementById('imgUserStripS3').style.visibility = "hidden";
		document.getElementById('txtUserName3').style.visibility = "hidden";
		document.getElementById('txtUserComment3').style.visibility = "hidden";
		document.getElementById('imgUserImage3h').style.visibility = "hidden";
		document.getElementById('imgUserImage3w').style.visibility = "hidden";
	}

	// ユーザ短冊4
	if (parent.userId[3] != "")
	{
		document.getElementById('imgUserStripN4').style.visibility = "visible";
		document.getElementById('imgUserStripS4').style.visibility = "visible";
		document.getElementById('txtUserName4').style.visibility = "visible";
		document.getElementById('txtUserComment4').style.visibility = "visible";
		if (parent.sizeofImage[3] == 0)
		{
			document.getElementById('imgUserImage4w').style.visibility = "hidden";
			document.getElementById('imgUserImage4h').style.visibility = "visible";
			document.getElementById('imgUserImage4h').src = parent.userImage[3];
		}
		else if (parent.sizeofImage[3] == 1)
		{
			document.getElementById('imgUserImage4w').style.visibility = "visible";
			document.getElementById('imgUserImage4h').style.visibility = "hidden";
			document.getElementById('imgUserImage4w').src = parent.userImage[3];
		}
		else
		{
			document.getElementById('imgUserImage4w').style.visibility = "hidden";
			document.getElementById('imgUserImage4h').style.visibility = "hidden";
		}

		if(parent.userName[3] != "")
		{
			document.getElementById('txtUserName4').value = parent.userName[3];
		}
		else
		{
			document.getElementById('txtUserName4').value = parent.userId[3];
		}

		document.getElementById('txtUserComment4').value = parent.userComment[3];
	}
	else
	{
		document.getElementById('imgUserStripN4').style.visibility = "hidden";
		document.getElementById('imgUserStripS4').style.visibility = "hidden";
		document.getElementById('txtUserName4').style.visibility = "hidden";
		document.getElementById('txtUserComment4').style.visibility = "hidden";
		document.getElementById('imgUserImage4h').style.visibility = "hidden";
		document.getElementById('imgUserImage4w').style.visibility = "hidden";
	}

	// ユーザ短冊5
	if (parent.userId[4] != "")
	{
		document.getElementById('imgUserStripN5').style.visibility = "visible";
		document.getElementById('imgUserStripS5').style.visibility = "visible";
		document.getElementById('txtUserName5').style.visibility = "visible";
		document.getElementById('txtUserComment5').style.visibility = "visible";
		if (parent.sizeofImage[4] == 0)
		{
			document.getElementById('imgUserImage5w').style.visibility = "hidden";
			document.getElementById('imgUserImage5h').style.visibility = "visible";
			document.getElementById('imgUserImage5h').src = parent.userImage[4];
		}
		else if (parent.sizeofImage[4] == 1)
		{
			document.getElementById('imgUserImage5w').style.visibility = "visible";
			document.getElementById('imgUserImage5h').style.visibility = "hidden";
			document.getElementById('imgUserImage5w').src = parent.userImage[4];
		}
		else
		{
			document.getElementById('imgUserImage5w').style.visibility = "hidden";
			document.getElementById('imgUserImage5h').style.visibility = "hidden";
		}

		if(parent.userName[4] != "")
		{
			document.getElementById('txtUserName5').value = parent.userName[4];
		}
		else
		{
			document.getElementById('txtUserName5').value = parent.userId[4];
		}

		document.getElementById('txtUserComment5').value = parent.userComment[4];
	}
	else
	{
		document.getElementById('imgUserStripN5').style.visibility = "hidden";
		document.getElementById('imgUserStripS5').style.visibility = "hidden";
		document.getElementById('txtUserName5').style.visibility = "hidden";
		document.getElementById('txtUserComment5').style.visibility = "hidden";
		document.getElementById('imgUserImage5h').style.visibility = "hidden";
		document.getElementById('imgUserImage5w').style.visibility = "hidden";
	}

	// ユーザ短冊6
	if (parent.userId[5] != "")
	{
		document.getElementById('imgUserStripN6').style.visibility = "visible";
		document.getElementById('imgUserStripS6').style.visibility = "visible";
		document.getElementById('txtUserName6').style.visibility = "visible";
		document.getElementById('txtUserComment6').style.visibility = "visible";
		if (parent.sizeofImage[5] == 0)
		{
			document.getElementById('imgUserImage6w').style.visibility = "hidden";
			document.getElementById('imgUserImage6h').style.visibility = "visible";
			document.getElementById('imgUserImage6h').src = parent.userImage[5];
		}
		else if (parent.sizeofImage[5] == 1)
		{
			document.getElementById('imgUserImage6w').style.visibility = "visible";
			document.getElementById('imgUserImage6h').style.visibility = "hidden";
			document.getElementById('imgUserImage6w').src = parent.userImage[5];
		}
		else
		{
			document.getElementById('imgUserImage6w').style.visibility = "hidden";
			document.getElementById('imgUserImage6h').style.visibility = "hidden";
		}

		if(parent.userName[5] != "")
		{
			document.getElementById('txtUserName6').value = parent.userName[5];
		}
		else
		{
			document.getElementById('txtUserName6').value = parent.userId[5];
		}

		document.getElementById('txtUserComment6').value = parent.userComment[5];
	}
	else
	{
		document.getElementById('imgUserStripN6').style.visibility = "hidden";
		document.getElementById('imgUserStripS6').style.visibility = "hidden";
		document.getElementById('txtUserName6').style.visibility = "hidden";
		document.getElementById('txtUserComment6').style.visibility = "hidden";
		document.getElementById('imgUserImage6h').style.visibility = "hidden";
		document.getElementById('imgUserImage6w').style.visibility = "hidden";
	}
	
	document.getElementById('txtPageNum').value = parent.pageNum + "/" + parent.pageNumMax;
	
	checkPageNum();

}

//*****************************************************************************
// checkPageNum()
// １．機能
//      ページ切り替えボタンの状態(活性・不活性)を切り替える
// ２．戻り値
//　　  なし
// ３．備考
//　　　なし
//*****************************************************************************
function checkPageNum()
{
	if (parent.pageNum == 1)
	{
		document.getElementById('imgBeforeButtonUD').style.visibility = "hidden";
		document.getElementById('imgBeforeButtonX').style.visibility = "visible";
	}
	else
	{
		document.getElementById('imgBeforeButtonUD').style.visibility = "visible";
		document.getElementById('imgBeforeButtonX').style.visibility = "hidden";
	}
	
	if (parent.pageNum >= parent.pageNumMax)
	{
		document.getElementById('imgNextButtonUD').style.visibility = "hidden";
		document.getElementById('imgNextButtonX').style.visibility = "visible";
	}
	else
	{
		document.getElementById('imgNextButtonUD').style.visibility = "visible";
		document.getElementById('imgNextButtonX').style.visibility = "hidden";
	}
}
