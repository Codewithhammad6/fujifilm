//*****************************************************************************
//  DefineLangStr.js 
//
//     DefineLangStrのクライアントスクリプト
//
//     更新履歴    担当       Ver.        内容
//     2004/11/12  菅野      -----        新規作成
//     2006/03/16  平尾      V2.0         内視鏡画像取込／DICOM出力対応
//     2009/06/08  FF蔵敷  V6.0          NAS対応  V60_NAS
//     2009/07/27  FF星野    V6.0         インジケーター切り離し対応
//     2010/04/05  FF星野    V2.0(B)      インジケーター全削除対応
//     2014/03/11  TYK石井   V3.0(B)      DR装置画面追加
//     2014/05/19  FFS星野   V3.0(B)      DR入力対応
//*****************************************************************************

  //---- 取得コード ----//
  var KeyReadUnit       = 0;       // 読み取り機

  var KeyDVD            = 1;       // DVD
  var KeyPrinter        = 2;       // プリンタ
  var KeyOutput         = 3;       // データ転送

  var KeyEvent          = 4;       // イベント

  var KeyRefresh        = 5;       // 更新
  var KeyOK             = 6;       // ＯＫ
  var KeyStatus         = 7;       // ステータス
  var KeyControl        = 8;       // 操作

  var KeyDeviceStatus   = 9;       // 装置状態

  var KeyDetailInfo     = 10;      // 詳細情報
  var KeyScanerCleaning = 11;      // スキャナクリーニング
  var KeyDVDStatus      = 12;      // 現在のＤＶＤ状態/操作

  var KeyDVDList        = 13;      // 保管用ＤＶＤの一覧
  var KeyDeviceName     = 14;      // 装置名称
  var KeyUseType        = 16;      // 用途

  var KeyDVDChange      = 17;      // DVDの入れ替え

  var KeyDVDEject       = 18;      // DVDの取り出し

  var KeyUtility        = 19;      // ユーティリティ
  var KeyPatientID      = 24;      // 患者ＩＤ
  var KeyStudyDateTime  = 25;      // 検査日時

  var KeyDelete         = 27;      // 削除
  var KeyForceOutput    = 28;      // 強制出力

  var KeyKind           = 29;      // 種別
  var KeyErrorCode      = 31;      // エラーコード

  var KeyIncDateTime    = 32;      // 発生日時

  var KeyErrorInfo      = 34;      // エラー内容
  var KeyConfirm        = 36;      // 確認

  var KeyAllConfirm     = 37;      // 全確認

  var KeyDetail         = 38;      // 詳細
  var KeyErrorLevel     = 39;      // エラーレベル
  var KeyExecute        = 42;      // 実行

  var KeyExecuting      = 43;      // 処理中です。

  var KeyWriteSetup     = 44;      // 書込設定

  var KeyDiskName       = 45;      // ディスク名

  var KeyWriteStart     = 46;      // 書込開始日
  var KeyWriteEnd       = 47;      // 書込終了日
  var KeyForStrage      = 48;      // 画像保管に使用
  var KeyForWork        = 49;      // 作業ディスクに使用
  var KeyWritable       = 50;      // 書込可能
  var KeyUnWritable     = 51;      // 書込不可
  var KeyUsing            = 115;      //V60_NAS
  var KeyFilter         = 59;      // フィルタ条件
  var KeyPatientName    = 60;      // 患者名
  var KeyTransmission   = 61;      // 送信先

  var KeyAll            = 63;      // 全て
  var KeyFilm           = 64;      // フィルム
  var KeyDisk           = 65;      // ディスク
  var KeyCaRna          = 66;      // C@Rna
  var KeyGeneral        = 67;      // 汎用ファイル
  // 20070316 HSK平尾 V2.0 DICOM送信対応 A Start
  var KeyDicom          = 110;     // DICOMストレージ
  // 20070316 HSK平尾 V2.0 DICOM送信対応 A End
  var KeyOutputStatus1  = 68;      // スプール中
  var KeyOutputStatus2  = 69;      // 画像処理待ち
  var KeyOutputStatus3  = 70;      // 画像処理中
  var KeyOutputStatus4  = 71;      // 画像処理エラー
  var KeyOutputStatus5  = 72;      // 出力待ち
  var KeyOutputStatus6  = 73;      // 出力中
  var KeyOutputStatus7  = 74;      // 出力エラー
  var KeyOutputStatus8  = 75;      // 出力済み
  var KeyOutputStatus9  = 76;      // 削除済み
  var KeyOutputStatus10 = 77;      // 利用可能ローカルフィルム無し

  var KeyOutputStatus11 = 78;      // 出力オプション無し

  var KeyOutputStatus12 = 79;      // 利用可能Dicomフィルム無し

  var KeyOutputStatus13 = 80;      // エラー復旧中
  var KeyOutputStatus14 = 81;      // 出力不可
  var KeyOutputStatus15 = 82;      // 出力一時停止
  var KeyOutputStatus16 = 83;      // コミットメント待ち
  var KeyOutputStatus17 = 84;      // コミットメント完了待ち
  var KeyOutputStatus18 = 85;      // コミットメント出力エラー
  var KeyOutputStatus19 = 86;      // フィルムサイズエラー
  var KeyOutputStatus20 = 87;      // 完了処理中
  var KeyOutputStatus21 = 88;      // 他筐体画像取得エラー
  var KeyOutputDelMsg   = 89;      // 出力キュー削除確認メッセージ
  var KeyOKButton       = 90;      // OK
  var KeyCancelButton   = 91;      // Cancel
  var KeySelectOutput   = 92;      // 画像の情報を選択してください。

  var KeyClose          = 93;      // 閉じる

  var KeyMedia          = 94;      // メディア
  var KeyCaRnaData      = 95;      // C@Rnaデータセンタ
  var KeyRU             = 96;      // RU
  var KeyStudyRegist    = 97;      // 検査登録
  var KeyImageRef       = 98;      // 画像参照
  var KeyCommon         = 99;      // 共通
  // 20070316 HSK平尾 V2.0 内視鏡画像取込/DICOM送信対応 A Start
  var KeyDicomStorage   = 111;      // DICOMストレージ
  var KeyInputEsImage   = 112;      // 内視鏡画像取込
  // 20070316 HSK平尾 V2.0 内視鏡画像取込/DICOM送信対応 A End

  var KeyOther          = 100;      // その他

  var KeyUnconfirmed    = 101;      // 未確認のみ
  var KeyConfirmed      = 102;      // 確認済みのみ
  var KeySelectEvent    = 103;      // イベントを選択してください。

  var KeyEventDelMsg    = 104;      // イベント情報削除確認メッセージ
  var KeyRuConnectErr   = 105;      // RU未接続エラーメッセージ
  var KeyIndicator      = 106;      // インジケータ
  var KeyErrorMessage   = 107;      // 例外発生時のメッセージ
// 2005/08/12 Kanno UPDATE ST 文字列追加・削除
//  var KeyEventStat1     = 108;      // 未確認

//  var KeyEventStat2     = 109;      // 確認済
  var CleaningCancel    = 108;      // スキャナクリーニングキャンセルメッセージ
// 2005/08/12 Kanno UPDATE ED 文字列追加・削除
  // 20070316 HSK平尾 V2.0 内視鏡画像取込対応 A Start
  var KeyModality          = 113;     // モダリティ
  // 20070316 HSK平尾 V2.0 内視鏡画像取込対応 A End

  var KeyAllConfirmPage = 114;//2009.07.27 FF 星野 インジケーター切り離し対応 ADD
  var KeyAllDelete = 116;//2010.04.05 FF 星野 インジケーター全削除対応 ADD
  
  //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD Start
  var KeyDRDeviceName      = 117;
  var KeyDRMessage         = 118;
  var KeyDRDeviceStatus    = 119;
  var KeyDRBatteryStatus   = 120;
  var KeyDRConnectStatus   = 121;
  var KeyDRAllErrorMessage = 122;
  var KeyRUDevice          = 123;
  var KeyDRDevice          = 124;
  var KeyDRMessageNum      = 125;
  var KeyDRCauseUnknownMessage = 126;
  
  var KeyDRDeviceStatus_Normal = 128;
  var KeyDRDeviceStatus_Emergency = 129;
  var KeyDRDeviceStatus_InExecution = 130;
  
  var KeyDRConnectStatus_True = 131;
  var KeyDRConnectStatus_False = 132;
  //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD End
  var KeyDRReadUnit = 127;//2014.05.19 FFS 星野 DR入力対応
  
  //---- デフォルト値 ----//
  var DefaultReadUnit       = "ReadUnit";   // 読み取り機

  var DefaultDVD            = "DVD";        // DVD
  var DefaultPrinter        = "Printer";    // プリンタ
  var DefaultOutput         = "Output";     // データ転送

  var DefaultEvent          = "Event";      // イベント

  var DefaultRefresh        = "Refresh";      // 更新
  var DefaultOK             = "OK";      // ＯＫ
  var DefaultStatus         = "Status";      // ステータス
  var DefaultControl        = "Control";      // 操作

  var DefaultDeviceStatus   = "DeviceStatus";      // 装置状態

  var DefaultDetailInfo     = "Information";      // 詳細情報
  var DefaultScanerCleaning = "ScanerCleaning";      // スキャナクリーニング
  var DefaultDVDStatus      = "Disc Status/Control";      // 現在のＤＶＤ状態/操作

  var DefaultDVDList        = "Disc List"     // 保管用ＤＶＤの一覧
  var DefaultDeviceName     = "Device Name";      // 装置名称
  var DefaultUseType        = "Use Type";      // 用途

  var DefaultDVDChange      = "Disk Change";      // DVDの入れ替え

  var DefaultDVDEject       = "Disk Eject";      // DVDの取り出し

  var DefaultUtility        = "Utility";      // ユーティリティ
  var DefaultPatientID      = "PatientID";      // 患者ＩＤ
  var DefaultStudyDateTime  = "StudyDateTime";      // 検査日時

  var DefaultDelete         = "Delete";      // 削除
  var DefaultForceOutput    = "ForceOutput";      // 強制出力

  var DefaultKind           = "Kind";      // 種別
  var DefaultErrorCode      = "ErrorCode";      // エラーコード

  var DefaultIncDateTime    = "IncDateTime";      // 発生日時

  var DefaultErrorInfo      = "ErrorInformation";      // エラー内容
  var DefaultConfirm        = "Confirm";      // 確認

  var DefaultAllConfirm     = "ConfirmAll";      // 全確認

  var DefaultAllConfirmPage = "ConfirmAllPage";      //2009.07.27 FF 星野 インジケーター切り離し対応 ADD
  var DefaultAllDelete = "AllDelete";      //2010.04.05 FF 星野 インジケーター全削除対応 ADD

  var DefaultDetail         = "Detail";      // 詳細
  var DefaultErrorLevel     = "ErrorLevel";      // エラーレベル
  var DefaultExecute        = "Execute";      // 実行

  var DefaultExecuting      = "It is processing.";      // 処理中です。

  var DefaultWriteSetup     = "WriteSetUp";      // 書込設定

  var DefaultDiskName       = "DiskName";      // ディスク名

  var DefaultWriteStart     = "WriteStartDay";      // 書込開始日
  var DefaultWriteEnd       = "WriteEndDay";      // 書込終了日
  var DefaultForStrage      = "For Strage";      // 画像保管に使用
  var DefaultForWork        = "For Work";      // 作業ディスクに使用
  var DefaultWritable       = "Writable";      // 書込可能
  var DefaultUnWritable     = "UnWritable";      // 書込不可
  var DefaultUsing			= "Using";				//V60_NAS
  var DefaultFilter         = "Filter";      // フィルタ条件
  var DefaultPatientName    = "PatientName";      // 患者名
  var DefaultTransmission   = "Destination";      // 送信先

  var DefaultAll            = "All";      // 全て
  var DefaultFilm           = "Film";      // フィルム
  var DefaultDisk           = "Disk";      // ディスク
  var DefaultCaRna          = "C@Rna";      // C@Rna
  var DefaultGeneral        = "GeneralFile";      // 汎用ファイル
  // 20070316 HSK平尾 V2.0 DICOM送信対応 A Start
  var DefaultDicom          = "DicomStorage";     // DICOMストレージ
  // 20070316 HSK平尾 V2.0 DICOM送信対応 A End
  var DefaultOutputStatus1  = "It is spooling";      // スプール中
  var DefaultOutputStatus2  = "Image data processing waiting";      // 画像処理待ち
  var DefaultOutputStatus3  = "The image is being processed";      // 画像処理中
  var DefaultOutputStatus4  = "Image processing error";      // 画像処理エラー
  var DefaultOutputStatus5  = "Output waiting";      // 出力待ち
  var DefaultOutputStatus6  = "It is outputting";      // 出力中
  var DefaultOutputStatus7  = "Output error";      // 出力エラー
  var DefaultOutputStatus8  = "It has output";      // 出力済み
  var DefaultOutputStatus9  = "It has deleted";      // 削除済み
  var DefaultOutputStatus10 = "There is no local film that can be used";      // 利用可能ローカルフィルム無し

  var DefaultOutputStatus11 = "There is no output option";      // 出力オプション無し

  var DefaultOutputStatus12 = "There is no Dicom film that can be used";      // 利用可能Dicomフィルム無し

  var DefaultOutputStatus13 = "The error is being recovered";      // エラー復旧中
  var DefaultOutputStatus14 = "It is not possible to output";      // 出力不可
  var DefaultOutputStatus15 = "Temporary stop of output";      // 出力一時停止
  var DefaultOutputStatus16 = "Commitment waiting";      // コミットメント待ち
  var DefaultOutputStatus17 = "Commitment completion waiting";      // コミットメント完了待ち
  var DefaultOutputStatus18 = "Commitment output error";      // コミットメント出力エラー
  var DefaultOutputStatus19 = "Error of size of film";      // フィルムサイズエラー
  var DefaultOutputStatus20 = "Completion is being processed";      // 完了処理中
  var DefaultOutputStatus21 = "Another case image acquisition error";      // 他筐体画像取得エラー
  var DefaultOutputDelMsg   = "Could you delete Output-Image? If you are OK, Please push [OK]button";      // 出力キュー削除確認メッセージ
  var DefaultOKButton       = "OK";      // はい

  var DefaultCancelButton   = "Cancel";      // いいえ

  var DefaultSelectOutput   = "Please select Output-Image";      // 画像の情報を選択してください。

  var DefaultClose          = "Close";      // 閉じる
  var DefaultMedia          = "Disk";      // メディア
  var DefaultCaRnaData      = "C@Rna";      // C@Rnaデータセンタ
  var DefaultRU             = "RU";      // RU
  var DefaultStudyRegist    = "Stydy";      // 検査登録
  var DefaultImageRef       = "ImageView";      // 画像参照
  var DefaultCommon         = "Common";      // 共通
  var DefaultOther          = "Other";      // その他
  // 20070316 HSK平尾 V2.0 内視鏡画像取込/DICOM送信対応 A Start
  var DefaultDicomStorage   = "DicomStorage";      // DICOMストレージ
  var DefaultInputEsImage   = "InputEsImage";      // 内視鏡画像取込
  // 20070316 HSK平尾 V2.0 内視鏡画像取込DICOM送信対応 A Start

  var DefaultDRUnit         = "DRUnit";      // DRUnit //2014.05.19 FFS 星野 DR入力対応 ADD

  var DefaultUnconfirmed    = "UnConfirmed";      // 未確認のみ
  var DefaultConfirmed      = "Confirmed";      // 確認済みのみ
  var DefaultSelectEvent    = "Please select Event-Information";      // イベントを選択してください。
  var DefaultEventDelMsg    = "Could you delete Event-Information? If you are OK, Please push [YES]button";      // イベント情報削除確認メッセージ
  var DefaultRuConnectErr   = "ReadUnit is not connected";      // RU未接続エラーメッセージ
  var DefaultIndicator      = "Indicator";      // インジケータ
  var DefaultErrorMessage   = "Error is occured.Please call service.";      // 例外発生時のメッセージ
// 2005/08/12 Kanno UPDATE ST 文字列追加・削除
//  var DefaultEventStat1     = "UnConfirmed";      // 未確認
//  var DefaultEventStat2     = "Confirmed";      // 確認済
  var DefaultCleaningCancel = "ScanerCleaning is canceled.";      // スキャナクリーニングキャンセルメッセージ
// 2005/08/12 Kanno UPDATE ED 文字列追加・削除
  // 20070316 HSK平尾 V2.0 内視鏡画像取込対応 A Start
  var DefaultModality         = "Modality";     // モダリティ
  // 20070316 HSK平尾 V2.0 内視鏡画像取込対応 A End
  
  //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD Start
  var DefaultDRDeviceName      = "DeviceName";
  var DefaultDRMessage         = "Message";
  var DefaultDRDeviceStatus    = "Device";
  var DefaultDRBatteryStatus   = "Battery";
  var DefaultDRConnectStatus   = "Connect";
  var DefaultDRAllErrorMessage = "AllErrorMessage";
  var DefaultRUDevice          = "RUDevice";
  var DefaultDRDevice          = "DRDevice";
  var DefaultDRMessageNum      = "Num";
  
  var DefaultDRDeviceStatus_Normal = "Normal";
  var DefaultDRDeviceStatus_Emergency = "Emergency";
  var DefaultDRDeviceStatus_InExecution = "In Execution";
  
  var DefaultDRConnectStatus_True = "Connect";
  var DefaultDRConnectStatus_False = "Not Connect";
  //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD End
