
//*****************************************************************************
// fnGetMousePos()
// １．機能
//      クリックされた座標を取得する準備をする

// ２．戻り値
//　　  なし

// ３．備考

//　　　なし

//*****************************************************************************
function fnGetMousePos() {
	NumOfClick = 0;
//	document.onclick = fnClicked();
}

//*****************************************************************************
// fnClicked()
// １．機能
//      クリックされた座標を取得し、サービスエンジニアのユーザ選択操作チェックを行う
// ２．戻り値
//　　  なし

// ３．備考

//　　　なし

//*****************************************************************************
function fnClicked() {
	pxArray[NumOfClick] = window.event.clientX + document.body.scrollLeft;
	pyArray[NumOfClick] = window.event.clientY + document.body.scrollTop;
	if (pxArray[NumOfClick] < 50 || pxArray[NumOfClick] > 750 ||
	    pyArray[NumOfClick] < 80 || pyArray[NumOfClick] > 500) {
		NumOfClick += 1;
		if (NumOfClick >= 4) {
			var strMousePosition = "";
			NumOfClick = 0;
			for (i = 0; i < 3; i++) {
				strMousePosition += pxArray[i] + "," + pyArray[i] + ",";
			}
			strMousePosition += pxArray[3] + "," + pyArray[3];
			frmList.txtMousePosition.value = strMousePosition;
			pageNo = parent.pageNum;
			parent.frameProc.location.replace('./Login_Proc.aspx?Reload=1&URL=' + queryURL);
			parent.frameProc.document.all.txtFunction.value = "1";
			parent.frameProc.document.all.txtMousePosition.value = strMousePosition;
			parent.frameProc.frmLoginProc.submit();
		}
	}
}

//*****************************************************************************
// SEUserSelect()
// １．機能
//      サービスエンジニアのユーザ選択処理を行う
// ２．戻り値
//　　  なし

// ３．備考

//　　　なし

//*****************************************************************************
function SEUserSelect() {
			parent.framePass.document.all.txtUserID.value = SE_USER_ID;
			parent.framePass.document.all.lblUserName.innerHTML = parent.userNameDispSE;
			parent.framePass.document.all.lblUserComment.innerHTML = parent.userCommentSE;
			SetImageUrl(parent.framePass.document.all.imgUserImage, parent.userImageSE);
			parent.framePass.document.all.imgUserImageW.style.visibility = "hidden";
			parent.framePass.document.all.imgUserImageH.style.visibility = "hidden";
			parent.framePass.document.all.imgUserImage.style.visibility = "visible";
			displaySoftKeyBoard();
			parent.DisplayPassInput();
}
