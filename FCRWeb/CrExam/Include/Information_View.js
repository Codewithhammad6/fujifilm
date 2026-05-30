/****************************************************************************

  @file Information_View.js

  @brief Information_Viewのクライアントスクリプト

  @author YSK齋藤
  
        SpotCode MAX 10

  Copyright(c) 2004-2009 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/28  YSK齋藤     V1.0       新規作成
  @date  06/10/23  HSK山本     V1.4       CR検査部構造見直し[4]対応  @date  09/12/01  FFS黒田     V1.1(B)    患者情報項目追加

/****************************************************************************/
//[定数]
var FATAL_ERROR           = "FATAL_ERROR";         //致命的なエラー 
var RETRY_ERROR           = "RETRY_ERROR";         //再試行可能なエラー
var SPOT_CODE             = 0;                     //スポットコードvar FILE_NAME             = "Information_View.js"; //ファイル名var MESSAGE_ID            = 30500;                 //メッセージID 
var MESSAGE_ID_ACCESS     = 30501;                 //メッセージID 
// 時刻フォーマットvar TIMEFORMAT_TWELVE     = 0;                     // 12タイムテーブル(HH:MM SS) 		
var TIMEFORMAT_TWENTYFOUR = 1;                     // 24タイムテーブル(HH:MM)
//2005/05/24==============
var BACKGROUND_COLOR_BLUE  = "#001B59";
var BACKGROUND_COLOR_GREEN = "#00AD82";
//2005/05/24===============
//[変数]
var SexMale        = ""; // 性別(男性)
var SexFemale      = ""; // 性別(女性)
var SexOther       = ""; // 性別(その他)
var HonorificTitle = ""; // 敬称文字var DateFormat     = ""; // 日付フォーマット

// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Add Start
var SexNeutredAltered = ""; 	// 避妊：済
var SexNeutredUnnaltered = ""; // 避妊：未
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Add End
//*****************************************************************************
// Fn_InitPage
//
// １．機能
//      ページロード時の処理
// ２．戻り値
//　　  なし// ３．備考//*****************************************************************************
function Fn_InitPage(){
  try{
    //フォント名,フォントサイズの設定    document.getElementById("BODY").style.fontFamily   = FONT_NAME;
    // 2005/06/22 017 H.SAITO デザイン変更対応(フォントサイズ変更) 
    //document.getElementById("BODY").style.fontSize     = FONT_SIZE + "px";
    ////患者情報表示領域設定    //document.getElementById("DIV_PatientIDText").style.height        = parseInt(FONT_SIZE)+4 + "px";
    //document.getElementById("DIV_PatientSexText").style.height       = parseInt(FONT_SIZE)+4 + "px";
    //document.getElementById("DIV_PatientNameText").style.height      = parseInt(FONT_SIZE)+4 + "px";
    //document.getElementById("DIV_PatientBirthDateText").style.height = parseInt(FONT_SIZE)+4 + "px";
    //document.getElementById("DIV_PatientAgeText").style.height       = parseInt(FONT_SIZE)+4 + "px";
    //document.getElementById("DIV_DateTimeText").style.height         = parseInt(FONT_SIZE)+4 + "px";
    document.getElementById("BODY").style.fontSize                   = FONT_SIZE;
    //患者情報表示領域設定//    document.getElementById("DIV_PatientIDText").style.height        = parseInt(FONT_SIZE)+4 + "px";
//    document.getElementById("DIV_PatientSexText").style.height       = parseInt(FONT_SIZE)+4 + "px";
//    document.getElementById("DIV_PatientNameText").style.height      = parseInt(FONT_SIZE)+4 + "px";
//    document.getElementById("DIV_PatientBirthDateText").style.height = parseInt(FONT_SIZE)+4 + "px";
//    document.getElementById("DIV_PatientAgeText").style.height       = parseInt(FONT_SIZE)+4 + "px";
//    document.getElementById("DIV_DateTimeText").style.height         = parseInt(FONT_SIZE)+4 + "px";
 }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+0);
  }
}
//*****************************************************************************
// Public_ClearInformation
//
// １．機能
//     患者情報/ガイダンスの表示を消去する
// ２．戻り値
//　　  なし// ３．備考//*****************************************************************************
function Public_ClearInformation(){
  try{
    document.getElementById("DIV_PatientIDText").innerText        = ""; 
    document.getElementById("DIV_PatientSexText").innerText       = ""; 
    document.getElementById("DIV_PatientNameText").innerText      = "";
    document.getElementById("DIV_PatientBirthDateText").innerText = "";
    document.getElementById("DIV_PatientAgeText").innerText				= "";
    document.getElementById("DIV_DateTimeText").innerText				  = "";
    document.getElementById("DIV_UserGuidanceText").innerText     = "";  
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
  } 
}
//*****************************************************************************
// Public_SetPatientID
//
// １．機能
//     患者ＩＤをセットする(最大:26桁)
// ２．戻り値
//　　  なし// ３．備考//*****************************************************************************
function Public_SetPatientId(patientId){
  try{
    document.getElementById("DIV_PatientIDText").innerText = patientId; 
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+2);
  }
}
//*****************************************************************************
// Public_SetPatientSex
//
// １．機能
//     性別をセットする
// ２．戻り値
//　　  なし// ３．備考//*****************************************************************************
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update Start
//function Public_SetPatientSex(patientSex){
function Public_SetPatientSex(patientSex, patientSexNeutred){
// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update End
	try{
		var patientSexString;

		if(patientSex != ""){
			patientSex=parseInt(patientSex);
		}
		
		// 性別の文字列を取得する		switch(patientSex){
			// 男性
			case 1:
				patientSexString = SexMale;
				break;
			// 女性
			case 2:
				patientSexString = SexFemale;
				break;	
			// その他			case 3:
				patientSexString = SexOther;
				break;
			// エラー
			// 空文字			case 0:
				patientSexString = SexOther;
				break;
			default:
				patientSexString = "";
				break;
//				Public_Error(FATAL_ERROR, "UnExcepted patientSex");
		}
		
		// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Add Start
		//避妊処置の表示
		var patientSexNeutredString;
		var npatientSexNeutred = 3;	//避妊処置未設定
		if(patientSexNeutred != ""){
			npatientSexNeutred = parseInt(patientSexNeutred);
		}

		switch(npatientSexNeutred){
			//避妊済み
			case 1:
				patientSexNeutredString = SexNeutredAltered;
				break;
			//避妊未
			case 2:
				patientSexNeutredString = SexNeutredUnnaltered;
				break;
			default:
				patientSexNeutredString = "";
				break;
		}
		// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Add End
		
		// 性別をセットする
		// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update Start
		//document.getElementById("DIV_PatientSexText").innerText = patientSexString;
		document.getElementById("DIV_PatientSexText").innerText = patientSexString + "  " + patientSexNeutredString;
		// 2009/12/01 FFS黒田 V1.1(B) 患者情報項目追加 Update End
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+3);
	}
}
//*****************************************************************************
// Public_SetPatientName
//
// １．機能
//     患者名をセットする(最大:全角21文字[敬称含む],半角33文字[敬称含まない]) 
// ２．戻り値
//　　  なし// ３．備考//*****************************************************************************
function Public_SetPatientName(patientNameSbcs, patientNameDbcs){
  try{
	  // 患者名がなければ敬称も表示しない	  if(!patientNameSbcs && !patientNameDbcs){ 
		  document.getElementById("DIV_PatientNameText").innerText = ""; 		
		  return;
	  }
	  // シングルバイト文字のみ無い場合
	  if(!patientNameSbcs){
		  document.getElementById("DIV_PatientNameText").innerText = patientNameDbcs + " " + HonorificTitle;
		  return;
	  }
	  // マルチバイト文字のみ無い場合
	  if(!patientNameDbcs){
		  document.getElementById("DIV_PatientNameText").innerText = patientNameSbcs + " " + HonorificTitle;
		  return;
	  }
	  // 両方の文字がある場合	  document.getElementById("DIV_PatientNameText").innerText = patientNameSbcs + "  " + patientNameDbcs + " " + HonorificTitle; 
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+4);
  }
}
//*****************************************************************************
// Public_SetPatientBirthDate
//
// １．機能
//     患者の生年月日をセットする
// ２．戻り値
//　　  なし// ３．備考//*****************************************************************************
function Public_SetPatientBirthDate(patientBirthDate){
	try{
		var returnValue;

		// 日付フォーマットの変更
		returnValue = ChangeDateToScreenFormat(patientBirthDate, DateFormat);

		// 変換エラーのチェック
		if(returnValue == -1){
      Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+5);
			return;
		}
		document.getElementById("DIV_PatientBirthDateText").innerText = returnValue;
	}
	catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+6);
	}
}
//*****************************************************************************
// Public_SetPatientAge
//
// １．機能
//     患者の年齢をセットする
// ２．戻り値
//　　  なし// ３．備考//*****************************************************************************
function Public_SetPatientAge(patientAge){
  try{
    patientAge = parseInt(patientAge,10);
	  if(patientAge > -1){
		  document.getElementById("DIV_PatientAgeText").innerText = "(" + patientAge + AgeString + ")";
	  }
	  else{
		  document.getElementById("DIV_PatientAgeText").innerText = "";
	  }
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+7);
  }
}
//*****************************************************************************
// Public_SetDateTime
//
// １．機能
//     現在時刻をセットする
// ２．戻り値
//　　  なし// ３．備考//*****************************************************************************
function Public_SetDateTime(dateTime){
	try{
		if(dateTime != ""){ 
			// 日付と時刻を分割
			aryDateTime = dateTime.split(" ");
			
			// 日付フォーマット変更
			var aryDate = aryDateTime[0].split("/");
			var date = "";
			for(i=0; i<aryDate.length; i++){
				date = date + aryDate[i];
			}
			returnValue = ChangeDateToScreenFormat(date, DateFormat);
			// 変換エラーのチェック
			if(returnValue == -1){
        Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+8);
				return;
			}
			// 時刻フォーマット変更(秒数は省略)
			var aryTime = aryDateTime[1].split(":");
			var time = "";
			var timeFlag = 0;
			for(j=0; j<aryTime.length-1; j++){
				// 時間をフォーマットに変更
				if(j==0){
					if(TimeFormat == TIMEFORMAT_TWELVE){
					
						if(aryTime[j]>=12){
						aryTime[j] = aryTime[j] - 12;
						timeFlag = 1;
						}
					}
				}
			}
			time = aryTime[0] + ":" + aryTime[1]; 

			if(TimeFormat == TIMEFORMAT_TWELVE){
				if(timeFlag == 1){
					time = time + " PM";
				}
				else{
					time = time + " AM";
				}
			}
			//日付と時間を連結
			dateTime = returnValue + " " + time;
		}
				
		document.getElementById("DIV_DateTimeText").innerText = dateTime;

	}catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+9);
	}
}
//*****************************************************************************
// Public_SetUserGuidance(userGuidance : カイダンス文字列
//                        background   : ガイダンス背景色(0:青(ルーチン) 1:緑(ルーチン以外))
//
// １．機能
//     ユーザガイダンスをセットする
// ２．戻り値
//　　  なし
// ３．備考
//*****************************************************************************
function Public_SetUserGuidance(userGuidance, background){
  try{
//2005/05/24=========================
  	switch(background){
  	  case 0:
	    document.getElementById("DIV_UserGuidance").style.backgroundColor = BACKGROUND_COLOR_BLUE;
		break;
	  case 1:
	    document.getElementById("DIV_UserGuidance").style.backgroundColor = BACKGROUND_COLOR_GREEN;
		break;
	  default:
	    break;
	}
//2005/05/24-EN=======================
    document.getElementById("DIV_UserGuidanceText").innerText = userGuidance;
  }catch(e){
    Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+10);
  }
}