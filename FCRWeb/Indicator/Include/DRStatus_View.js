//*****************************************************************************
//  DRStatus_View.js 
//
//     DRStatus_Viewのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2014/03/11  TYK石井    3.0(B)      新規作成
//*****************************************************************************

  //---- 接続装置の選択行 ----//
  var g_DeviceSelectedObj      = "";       // 選択された行のオブジェクト
  var g_DeviceSelectedObjColor = "";       // 選択された行の背景色
  var g_DeviceIndex            = -1;       // 選択された行のインデックス
  var g_CurentDeviceIndex      = -1;       // 現在選択された行のインデックス
  
  var TimerID                  = "";       // タイマID


  //文字の色
  var ListColor_Red     = "red";       // エラー
  var ListColor_Black   = "black";     // 警告

  //警告ID
  var Warning_10203 = 40203;
  var Warning_10209 = 40209;
  var Warning_10200 = 40200;
  var Warning_10102 = 40102;
  var Warning_10100 = 40100;
  var Warning_10101 = 40101;
  var Warning_10224 = 40224;
  var Warning_10212 = 40212;
  
  //タイマー時間をmsecに変換する値
  var ConvertMsecValue = 1000;
  
  //60分
  var minutes = 60;
  
  //SEリストの最大表示行数
  var SeListMaxCount = 3;
  
  //全メッセージリストの最大表示行数
  var ALLMessageListMaxCount = 10;
  
  //SE装置リストの表示/非表示
  var SeListVisible = "True";
  var SeListhidden = "False";
  
  //接続状態
  var Connected = "True";
  var DisConnected = "False";
  
  //バッテリー状態
  var Battery_OK = 1;
  var Battery_NG = 2;
  var Battery_Electrified = 3;
  
  //緊急モード
  var NormalMode = 0;
  var EmergencyMode = 1;
  
  //キャリブステータス
  var InExecution = 0;
  var Stopped = 1;
  
  //不明
  var Unknown = -1;
  
  //SE装置リストの選択背景
  var bgColor = "8FFFBD";

//*****************************************************************************
// Fn_InitPage
//
// １．機能
//     ・画面に表示する文字列の設定を行う
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_InitPage(){
  try{
    // BODYのフォントを指定
    document.body.style.fontFamily								= top.FUNCTION_FRAME.FontFamily;

    // コントロールに対してフォントサイズを設定
    // リストの装置名ヘッダ列
    document.getElementById("divDeviceName").style.fontSize     = top.FUNCTION_FRAME.FontSizeS;
    // リストのメッセージヘッダ列
    document.getElementById("divMessage").style.fontSize		= top.FUNCTION_FRAME.FontSizeS;
     // リストのメッセージ件数ヘッダ列
    document.getElementById("divMessageNum").style.fontSize		= top.FUNCTION_FRAME.FontSizeS;
    // リストの装置状態ヘッダ列
    document.getElementById("divDeviceStatus").style.fontSize	= top.FUNCTION_FRAME.FontSizeS;
    // リストのバッテリー状態ヘッダ列
    document.getElementById("divBatteryStatus").style.fontSize	= top.FUNCTION_FRAME.FontSizeS;
    // リストの接続状態ヘッダ列
    document.getElementById("divConnectStatus").style.fontSize  = top.FUNCTION_FRAME.FontSizeS;
        
    // 文字列設定
    document.getElementById("divDeviceName").innerText			= top.FUNCTION_FRAME.Public_GetString(parent.KeyDRDeviceName, parent.DefaultDRDeviceName);
    document.getElementById("divMessage").innerText				= top.FUNCTION_FRAME.Public_GetString(parent.KeyDRMessage, parent.DefaultDRMessage);
    document.getElementById("divMessageNum").innerText			= "(" + top.FUNCTION_FRAME.Public_GetString(parent.KeyDRMessageNum, parent.DefaultDRMessageNum) + ")";
    document.getElementById("divDeviceStatus").innerText		= top.FUNCTION_FRAME.Public_GetString(parent.KeyDRDeviceStatus, parent.DefaultDRDeviceStatus);
    document.getElementById("divBatteryStatus").innerText		= top.FUNCTION_FRAME.Public_GetString(parent.KeyDRBatteryStatus, parent.DefaultDRBatteryStatus);
    document.getElementById("divConnectStatus").innerText       = top.FUNCTION_FRAME.Public_GetString(parent.KeyDRConnectStatus, parent.DefaultDRConnectStatus);
	document.getElementById("divAllErrorMessage").innerText		= top.FUNCTION_FRAME.Public_GetString(parent.KeyDRAllErrorMessage, parent.DefaultDRAllErrorMessage);

    //初期化
    g_DeviceSelectedObj      = "";
    g_DeviceSelectedObjColor = "";
    g_DeviceIndex            = -1;
    g_CurentDeviceIndex      = -1;

  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Public_GetDeviceInfo
//
// １．機能
//     ・接続装置情報を取得する

//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_GetDeviceInfo(){
  try{	
    // 接続装置情報取得
    parent.Public_GetDeviceInfo();

  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}


//*****************************************************************************
// Public_EndGetDeviceInfo
//
// １．機能
//     ・接続装置情報を表示する
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Public_EndGetDeviceInfo(){
  try{
    //描画
    Fn_DrawTable();

    // 接続装置更新タイマ起動
    TimerID = setTimeout("Public_GetDeviceInfo();",top.FUNCTION_FRAME.SeDeviceRefreshInterval * ConvertMsecValue);

  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_DrawTable
//
// １．機能
//     ・テーブルに撮影装置情報表示
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function Fn_DrawTable(){
  try{
  
    //SE装置テーブルを初期化
    InitSETable();
  
    var nDeviceCount = 0;
    nDeviceCount = Number(parent.g_nRecordCount);
    //接続装置数が最大数の3台を超えた場合は、3台までしか表示させない
    if(nDeviceCount > SeListMaxCount){
      nDeviceCount = SeListMaxCount;
    }
    
    // 撮影装置情報リストに取得情報書き込み
    for(i = 0; i < nDeviceCount; i++){
      divDeviceNameTxt[i].innerText = parent.g_strName[i];	//装置名
      divDeviceColor[i].style.backgroundColor = parent.g_strColor[i];	//カラー
      SetMessage(i);								        //メッセージ
      SetMessageNum(i);								        //メッセージ件数
      SetDeviceStatus(i);                                   //装置状態
      SetBatteryStatus(i);						            //バッテリー状態
      SetConnectStatus(i);						            //接続状態
    }
    
    //エラー内容一覧を表示する
    SetOtherStatusList();
    
    //選択された行のインデックスを保持する
    g_CurentDeviceIndex = g_DeviceIndex;
    
    // 初期表示時は表示用フレームを表示する
    if(parent.parent.document.getElementById("DEVICE_VIEW").style.visibility == "hidden"){
      parent.parent.document.getElementById("DEVICE_VIEW").style.visibility = "visible";
    }
    
    if(parent.parent.parent.document.getElementById("VIEW_FRAME").style.visibility == "hidden"){
      parent.parent.parent.document.getElementById("VIEW_FRAME").style.visibility = "visible";
    }
    
  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_SelectLine
//
// １．機能
//     ・行を選択する

//
// ２．戻り値
//      なし

//
// ３．備考

//    引数    obj    選択された行のオブジェクト

//            i      選択された行番号
//*****************************************************************************
function Fn_SelectLine(obj,i){
  try{
	// タイマ停止
    if(TimerID){
      clearTimeout(TimerID);
    }
    
    //装置がない行には選択させない
    if(i < Number(parent.g_nRecordCount)){
      
      // 行を非選択状態にする
      if(g_DeviceSelectedObj){
        g_DeviceSelectedObj.bgColor = g_DeviceSelectedObjColor;
      }
      
      // 選択された行の背景色を変え、選択状態にする
      g_DeviceSelectedObj = obj;
      g_DeviceSelectedObjColor = obj.bgColor;
      obj.bgColor = bgColor;
      g_DeviceIndex = i;
    }
      
    //エラー内容一覧を表示する
    SetOtherStatusList();
    
    //選択された行のインデックスを保持する
    g_CurentDeviceIndex = g_DeviceIndex;
    
    // 接続装置更新タイマ起動
    TimerID = setTimeout("Public_GetDeviceInfo();",top.FUNCTION_FRAME.SeDeviceRefreshInterval * ConvertMsecValue);
    
  }catch(ex){
    // 例外発生時の処理
    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// Fn_SelectErrorLine
//
// １．機能
//     ・エラー情報一覧の行を選択する

//
// ２．戻り値
//      なし

//
// ３．備考

//    引数    obj    選択された行のオブジェクト

//            i      選択された行番号
//*****************************************************************************
function Fn_SelectErrorLine(obj,i){
  //なにもしない
}

//*****************************************************************************
// SetMessage
//
// １．機能
//     ・メッセージを設定
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function SetMessage(i){
  
  if(Number(parent.g_nOtherStatus1[i]) > 0){
    SetMessageText(i,parent.g_nOtherStatus1[i]);
  }
  else if(Number(parent.g_nOtherStatus2[i]) > 0){
    SetMessageText(i,parent.g_nOtherStatus2[i]);
  }
  else if(Number(parent.g_nOtherStatus3[i]) > 0){
    SetMessageText(i,parent.g_nOtherStatus3[i]);
  }
  else if(Number(parent.g_nOtherStatus4[i]) > 0){
    SetMessageText(i,parent.g_nOtherStatus4[i]);
  }
  else if(Number(parent.g_nOtherStatus5[i]) > 0){
    SetMessageText(i,parent.g_nOtherStatus5[i]);
  }
  else if(Number(parent.g_nOtherStatus6[i]) > 0){
    SetMessageText(i,parent.g_nOtherStatus6[i]);
  }
  else if(Number(parent.g_nOtherStatus7[i]) > 0){
    SetMessageText(i,parent.g_nOtherStatus7[i]);
  }
  else if(Number(parent.g_nOtherStatus8[i]) > 0){
    SetMessageText(i,parent.g_nOtherStatus8[i]);
  }
  else if(Number(parent.g_nOtherStatus9[i]) > 0){
    SetMessageText(i,parent.g_nOtherStatus9[i]);
  }
  else if(Number(parent.g_nOtherStatus10[i]) > 0){
    SetMessageText(i,parent.g_nOtherStatus10[i]);
  }
  else
  {
    divMessageTxt[i].innerText       = "";
    divErrorTxt[i].style.color = ListColor_Black;    
  }
}

//*****************************************************************************
// SetDeviceStatus
//
// １．機能
//     ・装置状態を設定
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function SetDeviceStatus(i){
    
  if(Number(parent.g_nAutoCalib_Status[i]) == InExecution)
  {
    //キャリブ中
    imgDeviceStatus[i].src			    = "../Bmp/Status_Panel_calib.png"; 
    //活性化
    imgDeviceStatus[i].style.visibility = "visible"; 
    //ツールチップ
    imgDeviceStatus[i].title            = top.FUNCTION_FRAME.Public_GetString(parent.KeyDRDeviceStatus_InExecution, parent.DefaultDRDeviceStatus_InExecution);
  }
  else if(Number(parent.g_nEmagencyMode[i]) == EmergencyMode)
  {
    //緊急モード
      imgDeviceStatus[i].src			= "../Bmp/Status_Panel_Running.png";
    //活性化
    imgDeviceStatus[i].style.visibility = "visible";
    //ツールチップ
    imgDeviceStatus[i].title            = top.FUNCTION_FRAME.Public_GetString(parent.KeyDRDeviceStatus_Emergency, parent.DefaultDRDeviceStatus_Emergency);
  }
  else if((Number(parent.g_nEmagencyMode[i]) == NormalMode) && (parent.g_nAutoCalib_Status[i] == Stopped))
  {
    //起動完了
    imgDeviceStatus[i].src			= "../Bmp/Status_Panel_Complete.png";
  //活性化
  imgDeviceStatus[i].style.visibility = "visible";
    //ツールチップ
    imgDeviceStatus[i].title            = top.FUNCTION_FRAME.Public_GetString(parent.KeyDRDeviceStatus_Normal, parent.DefaultDRDeviceStatus_Normal);
  }
  else
  {
    //非表示
    imgDeviceStatus[i].sr = "";
    //非活性
    imgDeviceStatus[i].style.visibility = "hidden";
    //ツールチップ
    imgDeviceStatus[i].title            = "";
  }
}
//*****************************************************************************
// SetBatteryStatus
//
// １．機能
//     ・バッテリー状態を設定
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function SetBatteryStatus(i){
  
  //値がシステム定義上の範囲で設定されているかチェック
  if((Number(parent.g_nBatteryStatus[i]) != Unknown) && 
     (Number(parent.g_nBatteryStatus[i]) != Battery_OK) &&
     (Number(parent.g_nBatteryStatus[i]) != Battery_NG) && 
     (Number(parent.g_nBatteryStatus[i]) != Battery_Electrified)){
      
     imgBatteryStatus[i].src				 = "";
     imgBatteryStatus[i].style.visibility = "hidden";
     return;
  }
  
  if((Number(parent.g_nBatteryTimeRemain[i]) < 0) || 
     (Number(parent.g_nBatteryStatus[i]) == Unknown) || 
     (parent.g_nConnect[i] == DisConnected)){
    //バッテリ残時間不明、バッテリ状態がNG or 不明の場合はバッテリ残時間、バッテリ状態を表示しない。
    imgBatteryStatus[i].src				 = "";
    imgBatteryStatus[i].style.visibility = "hidden";
  }
  else{
    
    //バッテリーアイコン設定  
    if(Number(parent.g_nBatteryStatus[i]) == Battery_NG)
    {
      //使用不可 ※0分
      imgBatteryStatus[i].src = "../Bmp/Status_NoElectricity.png";
    }
    else if(Number(parent.g_nBatteryStatus[i]) == Battery_Electrified){
      //充電中
      imgBatteryStatus[i].src = "../Bmp/Status_Energization.png";
    }
    else if(minutes <= Number(parent.g_nBatteryTimeRemain[i])){
      //満タン ※60分 <= バッテリ時間
      imgBatteryStatus[i].src = "../Bmp/Status_Electricity.png";
    }
    else if((top.FUNCTION_FRAME.BatteryWarningCapacity < Number(parent.g_nBatteryTimeRemain[i])) && 
            (Number(parent.g_nBatteryTimeRemain[i]) < minutes)){
      //2/3 ※撮影可能充電時間 < バッテリ時間 < 60 分
      imgBatteryStatus[i].src = "../Bmp/Status_b_Electricity_lv2.png";
    }
    else if((0 < Number(parent.g_nBatteryTimeRemain[i])) && 
           (Number(parent.g_nBatteryTimeRemain[i]) <= top.FUNCTION_FRAME.BatteryWarningCapacity)){
      //1/3　※0分 < バッテリ時間 <= 撮影可能充電時間
      imgBatteryStatus[i].src = "../Bmp/Status_Electricity_lv1.png";
    }
    else{
      //使用不可 ※0分
      imgBatteryStatus[i].src = "../Bmp/Status_NoElectricity.png";
    }
    
    imgBatteryStatus[i].style.visibility = "visible";
    
    //残時間設定
    if(Number(parent.g_nBatteryStatus[i]) != Battery_Electrified){
    
      //時間表示 ※形式を00:00 にする
      var min = Number(parent.g_nBatteryTimeRemain[i]) % minutes;
      var hour = (Number(parent.g_nBatteryTimeRemain[i]) - min) / minutes;
      divBatteryStatusTxt[i].innerText	= ('0' + hour).slice(-2) + ":" + ('0' + min).slice(-2);
    
      //パーセント表示
      //残時間/最大時間 x 100
      var percent = Math.floor((Number(parent.g_nBatteryTimeRemain[i]) / top.FUNCTION_FRAME.BatteryMaxTime) * 100);
      
      if(percent >= 100){
        //100%を超える場合は95%に丸める
        percent = 95;
      }
      else{
        //5%刻みで表示するため、5で割った余りを切り捨てる。
        percent = percent - (percent % 5);
      }
      
      //00:00(%) 形式に変換する
      divBatteryStatusTxt[i].innerText	= divBatteryStatusTxt[i].innerText + "(" + percent + "%)";
    }
  }
}
//*****************************************************************************
// SetConnectStatus
//
// １．機能
//     ・接続状態を設定
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function SetConnectStatus(i){

  if(parent.g_nConnect[i] == Connected){
    //接続状態
    imgConnectStatus[i].src			= "../Bmp/Status_Link_Running.png";
    //ツールチップ
    imgConnectStatus[i].title		= top.FUNCTION_FRAME.Public_GetString(parent.KeyDRConnectStatus_True, parent.DefaultDRConnectStatus_True);
  }
  else{
    //未接続状態
    imgConnectStatus[i].src			= "../Bmp/Status_Link_Disable.png";
    //ツールチップ
    imgConnectStatus[i].title		= top.FUNCTION_FRAME.Public_GetString(parent.KeyDRConnectStatus_False, parent.DefaultDRConnectStatus_False);
  }
   
  //活性化
  imgConnectStatus[i].style.visibility = "visible";

}
//*****************************************************************************
// SetOtherStatusList
//
// １．機能
//     ・エラー内容の一覧を設定
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function SetOtherStatusList(){
	
  var i = 0;
  if(g_DeviceIndex != -1){
    // 選択された行が更新されたら、スクロールを先頭に移動する
    if(g_DeviceIndex != g_CurentDeviceIndex){
      divErrorList.scrollTop = 0;
    }
  
    // 撮影装置からのエラー内容を書き込み
	if(Number(parent.g_nOtherStatus1[g_DeviceIndex]) > 0){
	  SetErrorText(i,parent.g_nOtherStatus1[g_DeviceIndex]);
	  i++;
	}
	if(Number(parent.g_nOtherStatus2[g_DeviceIndex]) > 0){
	  SetErrorText(i,parent.g_nOtherStatus2[g_DeviceIndex]);
	  i++;
	}
	if(Number(parent.g_nOtherStatus3[g_DeviceIndex]) > 0){
	  SetErrorText(i,parent.g_nOtherStatus3[g_DeviceIndex]);
	  i++;
	}
	if(Number(parent.g_nOtherStatus4[g_DeviceIndex]) > 0){
	  SetErrorText(i,parent.g_nOtherStatus4[g_DeviceIndex]);
	  i++;
	}
	if(Number(parent.g_nOtherStatus5[g_DeviceIndex]) > 0){
	  SetErrorText(i,parent.g_nOtherStatus5[g_DeviceIndex]);
	  i++;
	}
	if(Number(parent.g_nOtherStatus6[g_DeviceIndex]) > 0){
	  SetErrorText(i,parent.g_nOtherStatus6[g_DeviceIndex]);
	  i++;
	}
	if(Number(parent.g_nOtherStatus7[g_DeviceIndex]) > 0){
	  SetErrorText(i,parent.g_nOtherStatus7[g_DeviceIndex]);
	  i++;
	}
	if(Number(parent.g_nOtherStatus8[g_DeviceIndex]) > 0){
	  SetErrorText(i,parent.g_nOtherStatus8[g_DeviceIndex]);
	  i++;
	}
	if(Number(parent.g_nOtherStatus9[g_DeviceIndex]) > 0){
	  SetErrorText(i,parent.g_nOtherStatus9[g_DeviceIndex]);
	  i++;
	}
	if(Number(parent.g_nOtherStatus10[g_DeviceIndex]) > 0){
	  SetErrorText(i,parent.g_nOtherStatus10[g_DeviceIndex]);
	  i++;
	}
  }
  
  //表示領域の10行以下なら空文字を設定する
  for(; i < ALLMessageListMaxCount; i++){
    divErrorTxt[i].innerText    = "";
    divErrorTxt[i].style.color = ListColor_Black;
  }
}

//*****************************************************************************
// SetErrorText
//
// １．機能
//     ・エラー内容の一覧の文字列を設定
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function SetErrorText(i,nOtherStatus){
  
  //テキストを設定
  divErrorTxt[i].innerText = top.FUNCTION_FRAME.Public_GetSEString(nOtherStatus, String(nOtherStatus));
  
  //カラーを設定
  if(IsOtherStatus_Error(nOtherStatus) == true){
    divErrorTxt[i].style.color = ListColor_Black;
  }
  else{
    divErrorTxt[i].style.color = ListColor_Red;
  }
}

//*****************************************************************************
// SetMessageText
//
// １．機能
//     ・エラー内容の一覧の文字列を設定
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function SetMessageText(i,nOtherStatus){
  
  //テキストを設定
  divMessageTxt[i].innerText = top.FUNCTION_FRAME.Public_GetSEString(nOtherStatus, String(nOtherStatus));

  //カラーを設定
  if(IsOtherStatus_Error(nOtherStatus) == true){
    divMessageTxt[i].style.color = ListColor_Black;
  }
  else{
    divMessageTxt[i].style.color = ListColor_Red;
  }
}

//*****************************************************************************
// SetMessageNum
//
// １．機能
//     ・エラーメッセージの件数
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function SetMessageNum(i){
  var nCount = 0;
  
  // 撮影装置からのエラー内容を書き込み
  if(Number(parent.g_nOtherStatus1[i]) > 0){
    nCount++;
  }
  
  if(Number(parent.g_nOtherStatus2[i]) > 0){
    nCount++;
  }
  
  if(Number(parent.g_nOtherStatus3[i]) > 0){
    nCount++;
  }
  
  if(Number(parent.g_nOtherStatus4[i]) > 0){
    nCount++;
  }
  
  if(Number(parent.g_nOtherStatus5[i]) > 0){
    nCount++;
  }
  
  if(Number(parent.g_nOtherStatus6[i]) > 0){
    nCount++;
  }
  
  if(Number(parent.g_nOtherStatus7[i]) > 0){
    nCount++;
  }
  
  if(Number(parent.g_nOtherStatus8[i]) > 0){
    nCount++;
  }
  
  if(Number(parent.g_nOtherStatus9[i]) > 0){
    nCount++;
  }
  
  if(Number(parent.g_nOtherStatus10[i]) > 0){
    nCount++;
  }
  
  if(nCount > 0){
    //メッセージ件数を表示
    divMessageNumTxt[i].innerText       = "(" + String(nCount) + ")";
  }
}

//*****************************************************************************
// InitSETable
//
// １．機能
//     ・SE装置テーブルを初期化
//
// ２．戻り値
//      なし

//
// ３．備考

//*****************************************************************************
function InitSETable(){
    
  // SE装置テーブルを初期化
  for(i = 0; i < SeListMaxCount; i++){
    divDeviceNameTxt[i].innerText		 = "";				//装置名
    divDeviceColor[i].style.backgroundColor	= "";			//カラー
    divMessageTxt[i].innerText		     = "";				//メッセージ
    divMessageNumTxt[i].innerText	     = "";				//メッセージ件数
    imgDeviceStatus[i].src			     = "";				//装置状態
    imgDeviceStatus[i].style.visibility  = "hidden";		//装置状態
    divBatteryStatusTxt[i].innerText	 = "";				//バッテリー状態
    imgBatteryStatus[i].src			     = "";				//バッテリー状態
    imgBatteryStatus[i].style.visibility = "hidden";		//バッテリー状態
    imgConnectStatus[i].src			     = "";				//接続状態
    imgConnectStatus[i].style.visibility = "hidden";		//接続状態
  }
  
  //表示領域の10行以下なら空文字を設定する
  for(i = 0; i < ALLMessageListMaxCount; i++){
    divErrorTxt[i].innerText    = "";
    divErrorTxt[i].style.color = ListColor_Black;
  }
  
}

//*****************************************************************************
// Public_EndGetNoStatus
//
// １．機能
//     DR装置状態情報の表示(結果が0件の場合)
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function Public_EndGetNoStatus(){
  try{
    
    //初期化
    InitSETable();
    
    // 初期表示時は表示用フレームを表示する
    if(parent.parent.document.getElementById("DEVICE_VIEW").style.visibility == "hidden"){
      parent.parent.document.getElementById("DEVICE_VIEW").style.visibility = "visible";
    }
    
    if(parent.parent.parent.document.getElementById("VIEW_FRAME").style.visibility == "hidden"){
      parent.parent.parent.document.getElementById("VIEW_FRAME").style.visibility = "visible";
    }

  }catch(ex){
    // 例外発生時の処理

    top.FUNCTION_FRAME.Public_ExceptionMessage(ex);
  }
}

//*****************************************************************************
// IsOtherStatus_Error
//
// １．機能
//     OtherStatusのIDがエラー or ワーニングで判定する
//
// ２．戻り値
//      なし
//
// ３．備考
//*****************************************************************************
function IsOtherStatus_Error(nOtherStatus){
  if((nOtherStatus == Warning_10203) || 
     (nOtherStatus == Warning_10209) || 
     (nOtherStatus == Warning_10200) ||
     (nOtherStatus == Warning_10102) ||
     (nOtherStatus == Warning_10100) ||
     (nOtherStatus == Warning_10101) ||
     (nOtherStatus == Warning_10224) ||
     (nOtherStatus == Warning_10212))
  {
    return true;
  }
  else
  {
    return false;
  }
  
}
