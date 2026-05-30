var FATAL_ERROR = "FATAL_ERROR";
var RETRY_ERROR = "RETRY_ERROR";
var SPOT_CODE = 0;
var FILE_NAME = "Study_Watch_Proc.js";
var MESSAGE_ID = 30500;
var MESSAGE_ID_ACCESS   = 30501;
var objXMLHttp;
var Prototype = {
  emptyFunction: function() {}
}
//080312 HSK山本 RU End-Readエラー対応 ADD-ST
    var FLAG_NORMAL          = "0";                 // 通常フラグ
    var FLAG_DELETE          = "1";                 // 削除フラグ
    var FLAG_MISS_SHOT       = "2";	                // 写損フラグ
    var STATE_NORMAL         = "NORMAL";            // 通常ステータス
    var STATE_DELETE         = "DELETE";            // 削除ステータス
    var STATE_MISS_SHOT      = "MISS";	            // 写損ステータス
//080312 HSK山本 RU End-Readエラー対応 ADD-ED

function Fn_InitPage(){
}
function Public_GetData(procMode, selectImageSeq, sendData){
try{
	if ((top.WindowOpenMode == 0) || (top.forceFrameProcMode == true))
	{
		frmWatchForm.procMode.value       = procMode;
		frmWatchForm.selectImageSeq.value = selectImageSeq;  
		frmWatchForm.sendData.value       = sendData;  
		frmWatchForm.submit();
	} else {
		var tableNo;
		var STATE_UNSHOT	= "0";
		var STATE_INPUT_OFF = "1";
		var STATE_INPUT_ON  = "2";
		var STATE_COMPLETE  = "3";

		var strSendData = "procMode=" + procMode +
		                  "&selectImageSeq=" + selectImageSeq +
		                  "&sendData=" + sendData; 
		if (objXMLHttp == null)
		{
			objXMLHttp = new ActiveXObject("MSXML2.XMLHTTP");
		}
		objXMLHttp.open("POST", "/FCRWeb/CrExam/Do_Study_Watch_Proc.aspx", true);
		objXMLHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
		objXMLHttp.onreadystatechange = function()
		{
			if ((objXMLHttp.readyState == 4) && (objXMLHttp.status == 200))
			{
				objXMLHttp.onreadystatechange = Prototype.emptyFunction;
				var xmlResponse = objXMLHttp.responseXML;
				//サーバーサイドエラーの扱い
				if (xmlResponse.getElementsByTagName("Response")[0] == null)
				{
					return;
				}
				if (xmlResponse.getElementsByTagName("InputOnFlag")[0] == null)
				{
					var strError = decodeURIComponent(xmlResponse.getElementsByTagName("ClientScript")[0].text);
					eval(strError);
					return;
				}
				
				objXMLHttp = null;
				//データを取得
					//画像（だらだら監視用）
					var DataCount = 0;
					var ImageSeq = new Array();
					var InputStatus = new Array();
					var ImageStatus = new Array();
					var ImageFileName = new Array();
					var ImageHeight = new Array();
					var ImageWidth = new Array();
					var ThumbnailFileName = new Array();
					var ThumbnailHeight = new Array();
					var ThumbnailWidth = new Array();
					var ThumbnailFilePath = new Array();	//2012/04/24 FF千葉 V2.3B DICOM受信性能改善
				
					//だらだら情報
					var InputMode = "";
					var InputOnFlag = "";
					var InputOffFlag = "";
					var InputOnImageSeq = "";
					var	DivInfoResendCount = "";
					var DivInfoDirection = "";
					var DivInfoDivCount = 0;
					var DivInfoDivCompleteCount = 0;
					var DivInfoTotalImageHeight = "";
					var DivInfoTotalImageWidth = "";
					var DivDataFileName = new Array();
					var DivDataImageHeight = new Array();
					var DivDataImageWidth = new Array();
					
					//状態遷移関数
					var strClientScript = "";
				
				var InputErrorImageId = "";
				var InputErrorCode = "";
				
				if (xmlResponse.getElementsByTagName("Response")[0] != null)
				{
					InputOnFlag = xmlResponse.getElementsByTagName("InputOnFlag")[0].text;
					InputOffFlag = xmlResponse.getElementsByTagName("InputOffFlag")[0].text;
					InputOnImageSeq = xmlResponse.getElementsByTagName("InputOnImageSeq")[0].text;
					InputMode = xmlResponse.getElementsByTagName("InputMode")[0].text;
					InputErrorImageId = xmlResponse.getElementsByTagName("InputErrorImageId")[0].text;
					InputErrorCode = xmlResponse.getElementsByTagName("InputErrorCode")[0].text;
					DataCount =  xmlResponse.getElementsByTagName("DataCount")[0].text;
					DivInfoResendCount = xmlResponse.getElementsByTagName("DivInfoResendCount")[0].text;
					DivInfoDirection = xmlResponse.getElementsByTagName("DivInfoDirection")[0].text;
					DivInfoDivCount = xmlResponse.getElementsByTagName("DivInfoDivCount")[0].text;
					DivInfoDivCompleteCount = xmlResponse.getElementsByTagName("DivInfoDivCompleteCount")[0].text;
					DivInfoTotalImageHeight = xmlResponse.getElementsByTagName("DivInfoTotalImageHeight")[0].text;
					DivInfoTotalImageWidth = xmlResponse.getElementsByTagName("DivInfoTotalImageWidth")[0].text;
					for(var j=0; j<DivInfoDivCompleteCount; j++){
						DivDataFileName[j] = xmlResponse.getElementsByTagName("DivDataFileName"+j)[0].text;
						DivDataImageHeight[j] = xmlResponse.getElementsByTagName("DivDataImageHeight"+j)[0].text; 
						DivDataImageWidth[j] = xmlResponse.getElementsByTagName("DivDataImageWidth"+j)[0].text; 
					}
					strClientScript =  decodeURIComponent(xmlResponse.getElementsByTagName("ClientScript")[0].text.replace(/\+/g," "));
				}

				//入力中だらだら情報ありのフラグを更新
				parent.InputOnFlag = InputOnFlag;

				//入力中だらだら情報ありの対象画像シーケンスを更新
				parent.InputOnImageSeq = InputOnImageSeq;

				//入力中だらだら情報なしのフラグを初期化
				parent.InputOffFlag = "";
				//入力中だらだら情報なしの対象画像シーケンスを初期化
				parent.InputOffImageSeq = new Array();
				//入力中モード
				parent.InputMode = InputMode;
				// 2005/07/14 005 H.SAITO 再送処理対応
				// 入力中に失敗した画像ID
				parent.InputErrorImageId = InputErrorImageId;
				// 画像入力・画像処理エラーコード
				parent.InputErrorCode = InputErrorCode;

				// 画像入力・画像処理エラーコード
				for (var i=0; i<DataCount; i++)
				{
					ImageSeq[i] = xmlResponse.getElementsByTagName("ImageSeq"+i)[0].text;
					InputStatus[i] = xmlResponse.getElementsByTagName("InputStatus"+i)[0].text;

					//画像シーケンスをキーに添え字を取得
					tableNo = parent.AssosiateId[ImageSeq[i]];

					//入力中でだらだら情報なしがあれば
					//画像の入力ステータスを更新前にSTATE_UNSHOT⇒STATE_INPUT_OFFになるものを調べる					
					if (InputOffFlag == "ON")
					{
						if (parent.InputStatus[tableNo] == STATE_UNSHOT && InputStatus[i] == STATE_INPUT_OFF)
						{
							//入力中でだらだら情報なしのフラグを更新
							parent.InputOffFlag = "ON";
							//入力中でだらだら情報なしの対象画像シーケンスをＰＵＳＨ（だらだら情報なしが複数通知される場合がある）
							parent.InputOffImageSeq.push(ImageSeq[i]);
						}
					}
					parent.InputStatus[tableNo] = InputStatus[i];

					ImageFileName[i] = xmlResponse.getElementsByTagName("ImageFileName"+i)[0].text;
					ImageHeight[i] = xmlResponse.getElementsByTagName("ImageHeight"+i)[0].text;
					ImageWidth[i] = xmlResponse.getElementsByTagName("ImageWidth"+i)[0].text;
					ThumbnailFileName[i] = xmlResponse.getElementsByTagName("ThumbnailFileName"+i)[0].text;
					ThumbnailHeight[i] = xmlResponse.getElementsByTagName("ThumbnailHeight"+i)[0].text;
					ThumbnailWidth[i] = xmlResponse.getElementsByTagName("ThumbnailWidth"+i)[0].text;
					ThumbnailFilePath[i] = xmlResponse.getElementsByTagName("ThumbnailFilePath"+i)[0].text;//2012/04/24 FF千葉 V2.3B DICOM受信性能改善
					ImageStatus[i] = xmlResponse.getElementsByTagName("ImageStatus"+i)[0].text;
					//入力完了ならば画像情報を取得する
					if (InputStatus[i] == STATE_COMPLETE)
					{
						//画像のファイル名
						parent.ImageFileName[tableNo] = ImageFileName[i];
						//画像の高さ
						parent.ImageHeight[tableNo] = ImageHeight[i];
						//画像の幅
						parent.ImageWidth[tableNo] = ImageWidth[i];
						//サムネイルのファイル名
						parent.ThumbnailFileName[tableNo] = ThumbnailFileName[i];
						//サムネイルの高さ
						parent.ThumbnailHeight[tableNo] = ThumbnailHeight[i];
						//サムネイルの幅
						parent.ThumbnailWidth[tableNo] = ThumbnailWidth[i]
						//サムネイルのファイルパス									//2012/04/24 FF千葉 V2.3B DICOM受信性能改善
						parent.ThumbnailFilePath[tableNo] = ThumbnailFilePath[i];	//2012/04/24 FF千葉 V2.3B DICOM受信性能改善
						//入力完了直後の画像を表示するフラグをONにする
						parent.ImageViewFlag[tableNo] = "1";

						//080312 HSK山本 RU End-Readエラー対応 ADD-ST
						switch(ImageStatus[i])
						{
							case FLAG_NORMAL:
								parent.ImageStatus[tableNo] = STATE_NORMAL;
								break;
							case FLAG_DELETE:
								parent.ImageStatus[tableNo] = STATE_DELETE;
								break;
							case FLAG_MISS_SHOT:
								parent.ImageStatus[tableNo] = STATE_MISS_SHOT;
								break;
							default:
								break;
						}
						//080312 HSK山本 RU End-Readエラー対応 ADD-ED
					}
				}

				if (DivInfoResendCount != "")
				{
					//再送カウント（通常時1、再送時は2以上）
					parent.DivInfoResendCount      = DivInfoResendCount;
					//だらだら方向　Bottom:（下から上）Top:（上から下）Left:（左から右）Right:（右から左）
					parent.DivInfoDirection        = DivInfoDirection;
					//だらだら分割数（総数）
					parent.DivInfoDivcount         = DivInfoDivCount;
					//だらだら読み込み完了数
					parent.DivInfoDivCompcount     = DivInfoDivCompleteCount;
					//総画像サイズのHEIGHT
					parent.DivInfoTotalImageHeight =  DivInfoTotalImageHeight;
					//総画像サイズのWIDTH
					parent.DivInfoTotalImageWidth  = DivInfoTotalImageWidth;
					//だらだら画像の情報
					for(var j=0; j<DivInfoDivCompleteCount; j++){
						parent.DivDataFileName[j] = DivDataFileName[j];
						parent.DivDataImageHeight[j] = DivDataImageHeight[j];
						parent.DivDataImageWidth[j] = DivDataImageWidth[j];
					}
				}
				//状態遷移
				eval(strClientScript);
			}
		}
		objXMLHttp.send(strSendData);
	}
}
catch(e){
	Public_ErrorDisplay(FATAL_ERROR, MESSAGE_ID, FILE_NAME, SPOT_CODE+1);
}
}