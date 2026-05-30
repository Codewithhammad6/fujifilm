/****************************************************************************

  @file KeyBoardInputtext.js

  @brief ソフトキーボード動作クライアントスクリプト

  @author YSK畑



        SpotCode MAX 13
  
  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  03/11/05  YSK畑        V1.0       新規作成
  @date  06/10/08  FF蔵敷       V1.4       WrapInputManEditCtrl追加による修正
                                           インデント(TAB=Space4)の修正
                                           gSelectedオブジェクトもnull値で判定
  @date  06/10/25  FF蔵敷       V1.4       SST不具合解消
  @date  06/12/02  FF蔵敷　　　 V1.4      不活性状態の色　仕様変更
  @date  09/12/01  FF星野       V1.1(B)    1.1(B)対応 
/****************************************************************************/
    // 色定義
var ACTIVE_FORE_COLOR    = "#000000";  // 活性時文字色
var ACTIVE_BACK_COLOR    = "#FFFFFF";  // 活性時背景色
var NONACTIVE_FORE_COLOR = "#AAAAAA";  // 不活性時文字色
var NONACTIVE_BACK_COLOR = "#ECC2AC";  // 不活性時背景色

var FATAL_ERROR_KEY          = "FATAL_ERROR";     //致命的なエラー 
var RETRY_ERROR_KEY          = "RETRY_ERROR";     //再試行可能なエラー
var SPOT_CODE_KEY            = 0;                 //スポットコード

var FILE_NAME_KEY            = "KeyBoardInputText.js";//ファイル名

var MESSAGE_ID_KEY           = 30500;             //メッセージID 

var KEYBOARD_COUNT   = 3;   // キーボード最大数
var LINE_INPUT_COUNT = 5;   
var LINE_NUM_COUNT   = 4;   

//オブジェクト定義 //K.Kurashiki add 2006/12/02
var W_INPUTMAN_GUID = "clsid:9AACD52E-FC2D-4ec6-8525-2D930AD0BBE0";

// 変数設定
var gPos = 0;                                               // カーソル以降の文字列の長さ
//var gSelected = "";                                           // オブジェクト
var gSelected = null;


//***************************************************************************
//  BodyFocus()     
//
//  1．機能
//      BODYタグのフォーカス
//      
//  2．戻り値  
//        なし
//  3．備考
//     
//***************************************************************************
function BodyFocus()
{
    try{
//      frmSoftKeyBoard.KeyBoardDisabled(4);
        CurPositionClr();

    }catch(e){
        top.GetErrorMessage(FATAL_ERROR_KEY,MESSAGE_ID_KEY, FILE_NAME_KEY, SPOT_CODE_KEY+0); 
    }
}
//************************************************
// IsWrapInputManEditCtrl
//
// 1.機能
// オブジェクトタグで指定したOBJECTがWrapInputManEditCtrl.dllか否かを確かめる。
//
// 2.戻り値
// Boolean true:OBJECTはWrapInputManEditCtrl.dllである。
//         false:OBJECTはWrapInputManEditCtrl.dllではない。
// 3.備考
//   2006/10/08 K.Kurashiki wrote.
//   2006/10/25 K.kurashiki 不具合修正
// 
//************************************************
function IsWrapInputManEditCtrl(Elem)
{
    try{
        if(Elem.classid==W_INPUTMAN_GUID)
        {
            return true;
        }
        return false;
    }
    catch(e)
    {
        return false;
    }
}
//************************************************
// SelectText
// 
// １．機能 
//     入力するテキストオブジェクトの設定
//     
// ２．戻り値
//     なし
// ３．備考
//     2006/10/08 K.Kurashiki インデント修正、OBJECT部分追加
//     2006/12/02 K.Kurashiki Enabled=false状態の色変更
//************************************************
function SelectText(Elem)
{
    try{
        var obj = document.getElementsByTagName("INPUT")
        for(i=0; i<obj.length; i++)
        {
            if(obj[i].type.toUpperCase() == "TEXT" || obj[i].type.toUpperCase() == "PASSWORD")
            {
                if (obj[i].Enabled == false)
                { 
                     // 文字色を不活性色に変更
                     obj[i].style.color = NONACTIVE_FORE_COLOR;
                }
                else
                {
                     // 文字色を活性色に変更
                     obj[i].style.color = ACTIVE_FORE_COLOR;       
                }
                obj[i].style.backgroundColor = NONACTIVE_BACK_COLOR;         
            }
        }
        
        //K.Kurashiki Add 2006/10/08
        var obj2 = document.getElementsByTagName("OBJECT")
        for(i=0; i<obj2.length; i++)
        {
            if(IsWrapInputManEditCtrl(obj2[i]))
            {
                if (obj2[i].Enabled == false)
                { 
                     // 文字色を不活性色に変更
                     obj2[i].style.color = NONACTIVE_FORE_COLOR;
                }
                else
                {
                     // 文字色を活性色に変更
                     obj2[i].style.color = ACTIVE_FORE_COLOR;       
                }
                obj2[i].style.backgroundColor = NONACTIVE_BACK_COLOR;         
            }
        }
        
         //2009.12.01 V1.1(B)対応 FF星野 ADD-ST

        var obj3 = document.getElementsByTagName("TEXTAREA")
        for(i=0; i<obj3.length; i++)
        {
        
            if(obj3[i].id == "txtPatientComment")
            {
				if (obj3[i].Enabled == false)
				{ 
						// 文字色を不活性色に変更
						obj3[i].style.color = NONACTIVE_FORE_COLOR;
				}
				else
				{
						// 文字色を活性色に変更
						obj3[i].style.color = ACTIVE_FORE_COLOR;       
				}
				obj3[i].style.backgroundColor = NONACTIVE_BACK_COLOR;   
            }      
        }
        //2009.12.01 V1.1(B)対応 FF星野 ADD-ED       
        
        // テキストボックス活性色に変更
        Elem.style.color = ACTIVE_FORE_COLOR;
        Elem.style.backgroundColor = ACTIVE_BACK_COLOR;
        gSelected = Elem;
        CmdOther();
    }
    catch(e)
    {
        top.GetErrorMessage(FATAL_ERROR_KEY, MESSAGE_ID_KEY, FILE_NAME_KEY, SPOT_CODE_KEY+1); 
    }
}
//************************************************
// CurPosition 
// 
// １．機能 
//     カーソル以降の文字の長さを設定
//     
// ２．戻り値
//     なし
// ３．備考
//     2006/10/08 K.Kurashiki インデント修正、INPUTMANオブジェクトの場合、
//                            動作しない。
//************************************************
function CurPosition()
{
    try
    {
        //指定したエレメントがWrapInputManEditCtrlでははなかった場合は何もしない。//K.Kurashiki Add 2006/10/08
        if(IsWrapInputManEditCtrl(gSelected)==false)
        {
            var doc;
            if(!document.all)return;
            // カーソル位置を設定
            doc = document.selection.createRange();
            doc.moveEnd("textedit");
            // カーソルからの長さを設定
            gPos = doc.text.length;
        }
    }
    catch(e)
    {
        top.GetErrorMessage(FATAL_ERROR_KEY,MESSAGE_ID_KEY, FILE_NAME_KEY, SPOT_CODE_KEY+2);
    }
}
//************************************************
// CurPositionClr 
// 
// １．機能 
//     初期状態に戻す
//     
// ２．戻り値
//     なし
// ３．備考
//     2006/10/08 K.Kurashiki インデント修正、gSelectedの修正
//************************************************
function CurPositionClr()
{
    try
    {
//      if(gSelected != "")
        if(gSelected != null)
        {
            // テキストボックス不活性色に変更
//          gSelected.style.color = NONACTIVE_FORE_COLOR;
//          gSelected.style.backgroundColor = NONACTIVE_BACK_COLOR;
//          gSelected = "";
            gSelected = null;
            
            // 06/10/20 >>>
            // ソフトキーボード入力不可の時にテキストボックスが白色になる
            // 不具合を修正
	        var obj = document.getElementsByTagName("INPUT")
	        for(i=0; i<obj.length; i++)
	        {
	            if(obj[i].type.toUpperCase() == "TEXT" || obj[i].type.toUpperCase() == "PASSWORD")
	            {
	                // テキストボックス不活性色に変更
	                obj[i].style.color = NONACTIVE_FORE_COLOR;
	                obj[i].style.backgroundColor = NONACTIVE_BACK_COLOR;
	            }
	        }
	        
	        //K.Kurashiki Add 2006/10/08
	        var obj2 = document.getElementsByTagName("OBJECT")
	        for(i=0; i<obj2.length; i++)
	        {
	            if(IsWrapInputManEditCtrl(obj2[i]))
	            {
	                // テキストボックス不活性色に変更
	                obj2[i].style.color = NONACTIVE_FORE_COLOR;
	                obj2[i].style.backgroundColor = NONACTIVE_BACK_COLOR;
	            }
	        }
	        // <<<
        }
    }
    catch(e)
    {
        top.GetErrorMessage(FATAL_ERROR_KEY,MESSAGE_ID_KEY, FILE_NAME_KEY, SPOT_CODE_KEY+3); 
    }
}
//************************************************
// InputChar
// 
// １．機能 
//     テキストオブジェクトに文字入力
//     ただし、オブジェクトWrapInputManEditCtrlの場合は、コントロール自身に任せる。
//     
// ２．戻り値
//     なし
// ３．備考
//     2006/10/08 K.Kurashiki インデント修正、INPUTMANオブジェクトの場合を追加、gSelectedの修正
//************************************************
function InputChar( Str )
{
    try
    {
        var doc;
//      if(gSelected!="")
        if(gSelected!=null)
        {
            //K.Kurashiki Add 2006/10/08
            if(IsWrapInputManEditCtrl(gSelected))
            {
                gSelected.InputChar(Str);
            }
            else
            {
                doc = gSelected.createTextRange();                                      // 現在のオブジェクト
                doc.collapse();                                                         // テキストボックスの先頭位置に移動
                doc.moveStart("character", gSelected.value.length - gPos);              // 挿入位置を元のカーソル位置に移動
                doc.text = Str;                                                         // 文字入力
                doc.select();                                                           // カーソル表示
            }
        }
    }
    catch(e)
    {
        top.GetErrorMessage(FATAL_ERROR_KEY,MESSAGE_ID_KEY, FILE_NAME_KEY, SPOT_CODE_KEY+4);
    }
}
//************************************************
// MoveCursor 
// 
// １．機能 
//     カーソルの左右移動
//     
// ２．戻り値
//     なし
// ３．備考
//     2006/10/08 K.Kurashiki インデント修正、INPUTMANオブジェクトの場合を追加、gSelectedの修正
//************************************************
function MoveCursor(num)
{
    try
    {
        var doc;
//      if(gSelected!="")
        if(gSelected!=null)
        {
            //K.Kurashiki Add 2006/10/08
            if(IsWrapInputManEditCtrl(gSelected))
            {
                //移動方向が逆のため、反転する。
                num = -1 * num;
                gSelected.MoveCursor(num);
            }
            else
            {
                //最大値、最小値チェック
                if(num == -1)   //←ボタン押下時
                {
                    if(gPos != 0)
                    {
                        // カーソル以降の文字列の長さを変更
                        gPos = gPos + num;
                    }
                }
                if(num == 1)    //→ボタン押下時
                {
                    if(gPos != gSelected.value.length)
                    {
                        // カーソル以降の文字列の長さを変更
                        gPos = gPos + num;
                    }
                }
                doc = gSelected.createTextRange();                                      // 現在のオブジェクト
                doc.collapse();                                                         // テキストボックスの先頭位置に移動
                doc.moveStart("character", gSelected.value.length - gPos);              // 挿入位置を移動
                doc.select();                                                           // カーソル表示
            }
        }
    }
    catch(e)
    {
        top.GetErrorMessage(FATAL_ERROR_KEY,MESSAGE_ID_KEY, FILE_NAME_KEY, SPOT_CODE_KEY+5); 
    }
}
//************************************************
// AllClear 
// 
// １．機能 
//     全消去
//     
// ２．戻り値
//     なし
// ３．備考
//     2006/10/08 K.Kurashiki インデント修正、gSelectedの修正
//************************************************
function AllClear()
{
    try
    {
//      if(gSelected!="")
        if(gSelected!=null)
        {
            // テキストボックスをクリア
            gSelected.value = "";
            gPos = 0;
            gSelected.focus();
        }
    }
    catch(e)
    {
        top.GetErrorMessage(FATAL_ERROR_KEY,MESSAGE_ID_KEY, FILE_NAME_KEY, SPOT_CODE_KEY+6); 
    }
}
//************************************************
// ClearChar 
// 
// １．機能 
//     一文字消去
//     
// ２．戻り値
//     なし
// ３．備考
//     2006/10/08 K.Kurashiki インデント修正、INPUTMANオブジェクトの場合を追加、334「;」追加、gSelectedの修正
//************************************************
function ClearChar()
{
    try
    {
        var Str;
        var SliceNo;
        var doc;
//      if(gSelected!="" || gPos > 0)
        if(gSelected!=null || gPos > 0)
        {
            //K.Kurashiki Add 2006/10/08
            if(IsWrapInputManEditCtrl(gSelected))
            {
                gSelected.ClearChar();
            }
            else
            {
                // 消去する文字の位置を設定
                SliceNo = gSelected.value.length - gPos;
                // 消去する文字の位置が0番目より小さいまたは表示最大文字数より大きい
                if((SliceNo <= 0)||(SliceNo > gSelected.value.length))
                {
                    //0番目を削除時、キャレットが消失する不具合の対応
                    gSelected.focus();
//                  return;
                }
                else
                {
                    // 消去する文字を除いて文字列を生成
                    Str = gSelected.value.slice( 0,SliceNo-1 ) + gSelected.value.slice( SliceNo ); 
                    gSelected.value = Str;                                                  // テキストオブジェクトに設定
                    
                    doc = gSelected.createTextRange();
                    doc.collapse();
                    doc.moveStart("character", gSelected.value.length - gPos );
                    doc.select();
                }
            }
        }
    }
    catch(e)
    {
        top.GetErrorMessage(FATAL_ERROR_KEY,MESSAGE_ID_KEY, FILE_NAME_KEY, SPOT_CODE_KEY+7);
    }
}
//************************************************
// CmdOther 
// 
// １．機能 
//     
// ２．戻り値
//     なし
// ３．備考
//     2006/10/08 K.Kurashiki インデント修正、INPUTMANオブジェクトの場合を追加、gSelectedの修正

//************************************************
function CmdOther()
{
    try
    {
        var doc;
//      if(gSelected!="")       
        if(gSelected!=null && IsWrapInputManEditCtrl(gSelected)==false)             //K.Kurashiki Add 2006/10/08
        {
            doc = gSelected.createTextRange();                                      // 現在のオブジェクト
            doc.collapse();                                                         // テキストボックスの先頭位置に移動
            doc.moveStart("character", gSelected.value.length - gPos );             // 挿入位置を移動
            doc.select();                                                           // カーソル表示
        }
    }
    catch(e)
    {
        top.GetErrorMessage(FATAL_ERROR_KEY,MESSAGE_ID_KEY, FILE_NAME_KEY, SPOT_CODE_KEY+8); 
    }
}
//************************************************
// KeyBoardDisabled
// 
// １．機能 
//     ソフトキーボード活性／不活性
// ２．戻り値
//     なし
// ３．備考
//     FocusNum : 1 全キーボード不活性(デフォルトボタンも不活性) //\
//              : 2 全キーボード不活性(デフォルトボタンは活性)
//              : 3 カナ、記号キーボード不活性
//              : 4 カナキーボード不活性
//              : 5 全キーボード活性
//     2006/10/08 K.Kurashiki インデント修正
//************************************************
function KeyBoardDisabled(FocusNum)
{
    try
    {
        if(SoftKeyBoardFlag == 1)
        {
            frmSoftKeyBoard.KeyBoardDisabled(FocusNum);
        }
    }
    catch(e)
    {
        top.GetErrorMessage(FATAL_ERROR_KEY,MESSAGE_ID_KEY, FILE_NAME_KEY, SPOT_CODE_KEY+12); 
    }
}
//************************************************
// KeyBoardChange(0:アルファベット1:カナ 2/記号
// 
// １．機能 
//     ソフトキーボード変更
// ２．戻り値
//     なし
// ３．備考
//     2006/10/08 K.Kurashiki インデント修正
//************************************************
function KeyBoardChange(SignNum)
{
    try
    {
        if(SoftKeyBoardFlag == 1)
        {
            frmSoftKeyBoard.Fn_Change(SignNum);
        }
    }
    catch(e)
    {
        top.GetErrorMessage(FATAL_ERROR_KEY,MESSAGE_ID_KEY, FILE_NAME_KEY, SPOT_CODE_KEY+13);
    }
}
// 2005/09/15 ADD ST PVCS#1469
//************************************************
// InitCurPosition
// 
// １．機能 
//     カーソル位置の初期化
//     gPosを0にし、カーソルをテキストの最後部に設定する
// ２．戻り値
//     なし
// ３．備考
//************************************************
function InitCurPosition()
{
    gPos = 0;
}
// 2005/09/15 ADD ED PVCS#1469

