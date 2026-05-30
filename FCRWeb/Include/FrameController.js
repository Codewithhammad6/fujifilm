/****************************************************************************

  @file FrameController.js

  @brief フレーム制御モジュール

  @author HSK山本

  @requires.\MessageWindow.js,.\WindowUtility.js
  
  Copyright(C) 2006-2007 FUJIFILM Corporation All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  06/10/30  HSK山本       V1.4       新規生成 
  @date  06/11/01  HSK酒井       V1.4       CR操作性向上[2]画面制御 
  @date  06/11/29  HSK山本       V1.4       CR操作性向上[2]画面制御 追加 
  @date  07/05/18  HSK山本       V2.0       PVCS#2194対応 

****************************************************************************/

/**
 * @private
 * プライベート変数
 **/
var FC_FATAL_ERROR = "FATAL_ERROR";    //致命的なエラー 
var FC_RETRY_ERROR = "RETRY_ERROR";    //再試行可能なエラー
var FC_SPOT_CODE = 0;                   //スポットコードvar FC_FILE_NAME = "FrameController.js";  //ファイル名var FC_MESSAGE_ID = 30500;              //メッセージID 
var FC_IFRAME_HIDDEN = "0px";                     // フレーム非表示時のサイズ
var FC_IFRAME_VIEW_VISIBLE_HEIGHT    = "517px";// 画面表示のサイズ
var FC_IFRAME_VIEW_VISIBLE_WIDTH     = "800px";// 画面表示のサイズ


/**
 *  @private
 *  フレーム終了通知
 **/
var FC_FrameFinishedNotification = null;

/**
 *  @private
 *  フレーム終了通知時に返す識別子（文字列）
 **/
var FC_FinishedFrameId = "";

/**
 *  @private
 *  画面制御時の通知関数とパラメータ
 **/
var FC_ViewMovingNotification = null;
var FC_ViewMovedNotification = null;

//画面遷移開始モード
var FC_MOVING_MODE_INIT     = 0;//初期化
var FC_MOVING_MODE_UPDATE   = 1;//更新
var FC_MOVING_MODE_CLEAR    = 2;//クリア

/**
 *  @private
 *  現在、表示しているフレームのID
 **/
var FC_DispFrame = "";
/****************************************************************************
 * フレーム終了時に実行するコールバック関数を登録する。
（ＣＲ検査 V1.4時点では、サブメインフレーム、機能フレーム、画面フレームの終了時）
 * @param {function}notification コールバック関数(必須)
 * @param {string}id フレームの識別子(省略可)
                                                                           */
function SetFrameFinishedNotification(notification, id)
{
    try{
        FC_FrameFinishedNotification=notification;
        FC_FinishedFrameId=id;
    }
    catch(e){
        FC_Error(1);
    }
}
/****************************************************************************
 * コールバック関数を実行する。
 * @param {object}param フレームが終了する時のパラメータ (任意)（省略化）
                                                                           */
function NotifyFrameFinished(param)
{
    try{
        if(FC_FrameFinishedNotification!=null){
            FC_FrameFinishedNotification(FC_FinishedFrameId, param);
        }
    }
    catch(e){
        FC_Error(2);
    }
}
/****************************************************************************
 * フレームを表示する。
 * @param {object}obj フレームエレメント(必須)
 * @param {string}width フレームの横幅(必須)
 * @param {string}height フレームの縦幅（必須）
                                                                           */
function ShowFrame(obj, width, height)
{
    try{
        ResizeFrame(obj, width, height);
    }
    catch(e){
        FC_Error(3);
    }
}
/****************************************************************************
 * フレームを表示する。
 * @param {string}id フレームＩＤ(必須)
 * @param {string}width フレームの横幅(必須)
 * @param {string}height フレームの縦幅（必須）
                                                                           */
function ShowFrameById(id, width, height)
{
    try{
        var obj = document.getElementById(id);
        ShowFrame(obj, width, height);
    }
    catch(e){
        FC_Error(4);
    }
}
/****************************************************************************
 * フレームを非表示にする。
 * @param {object}obj フレームエレメント(必須)
                                                                           */
function HideFrame(obj)
{
    try{
//070518 HSK山本 PVCS#2194 UPDATE-ST
//Hideするフレームにフォーカスが当たっていたらフォーカス状態を解除(連打防止) 
        if(obj && obj == document.activeElement){
            obj.focus();
            obj.blur();
        }
//070518 HSK山本 PVCS#2194 UPDATE-ED
        ResizeFrame(obj, FC_IFRAME_HIDDEN, FC_IFRAME_HIDDEN);
    }
    catch(e){
        FC_Error(5);
    }
}
/****************************************************************************
 * フレームを非表示にする。
 * @param {string}id フレームＩＤ(必須)
                                                                           */
function HideFrameById(id)
{
    try{
        var obj = document.getElementById(id);
        HideFrame(obj);
    }
    catch(e){
        FC_Error(6);
    }
}
/****************************************************************************
 * フレームを切替える。
 * @param {string}hideId 非表示にするフレームＩＤ
 * @param {string}showId 表示するフレームＩＤ(必須)
 * @param {string}width 表示するフレームの横幅(必須)
 * @param {string}height 表示するフレームの縦幅（必須）
                                                                           */
function HideAndShowFrameById(hideId, showId, width, height)
{
    try{
        if(hideId != ""){
            HideFrameById(hideId);
        }
        ShowFrameById(showId, width, height);
    }
    catch(e){
        FC_Error(7);
    }
}
/****************************************************************************
 * フレームのサイズを設定する。
 * @param {object}obj フレームエレメント(必須)
 * @param {string}width フレームの横幅(必須)
 * @param {string}height フレームの縦幅（必須）
                                                                           */
function ResizeFrame(obj, width, height)
{
    try{
        if(obj!=null){
            obj.style.width=width;
            obj.style.height=height;
        }
    }
    catch(e){
        FC_Error(8);
    }
}
/****************************************************************************
 *  画面遷移開始通知設定
 *  @param {function}notification 画面遷移開始通知
                                                                           */
function SetViewMovingNotification(notification)
{
    try{
        FC_ViewMovingNotification = notification;
    }
    catch(e){
        FC_Error(9);
    }
}

/****************************************************************************
 *  画面遷移開始通知実行
 *  @private
 *  @param {object}param 実行時のパラメータ
 *  @param {FC_MOVING_MODE}movingMode 遷移モード
                                                                           */
function NotifyViewMoving(param,movingMode)
{
    try{
        if(FC_ViewMovingNotification){
            FC_ViewMovingNotification(param,movingMode);
        }
    }
    catch(e){
        FC_Error(10);
    }
}

/****************************************************************************
 *  画面遷移終了通知設定
 *  @param {function}notification 画面遷移終了通知
                                                                           */
function SetViewMovedNotification(notification)
{
    try{
        FC_ViewMovedNotification = notification;
    }
    catch(e){
        FC_Error(11);
    }
}

/****************************************************************************
 *  画面遷移終了通知実行
 *  @private
 *  @param {object}param 実行時のパラメータ
                                                                           */
function NotifyViewMoved(param)
{
    try{
        if(FC_ViewMovedNotification){
            FC_ViewMovedNotification(param);
        }
    }
    catch(e){
        FC_Error(12);
    }
}

/****************************************************************************
 * @class
 * @constructor
 * @param {string}frameid 遷移画面のフレームのID（必須）
 * @param {string}viewid 遷移画面のID（省略可）
 * 画面遷移情報クラス
                                                                           */
function MoveViewInfo(frameid,viewid)
{
    try{
        /**
         *  @private
         *  フレームID
         **/
        var _frameId = frameid;
        if(_frameId == null || _frameId.length == 0){
            throw new Exception("FrameController::MoveViewInfo frameId is empty");
        }
        
        /**
         *  @private
         *  ViewId
         *  同フレームで異なる画面を表示する際に使用
         **/
        var _viewId = viewid;
        if(_viewId == null){//未指定の場合は、1画面=1フレームと
            _viewId = _frameId;
        }
        
        /**
         *  @private
         *  遷移画面の終了時の通知関数
         **/
         var _viewFinishedNotification = null;
        /**
         *  @private
         *  遷移開始時の通知パラメータ
         **/
        var _movingParam = null;
        /**
         *  @private
         *  遷移終了時の通知パラメータ
         **/
        var _movedParam = null;
        
        /**
         *  @private
         *  遷移時のモード（初期化、更新、クリア）
         **/
        var _movingMode = null;

        /****************************************************************************
         *  遷移開始時のパラメータ設定
         *  @param {object}movingParam 
                                                                                   */
        function SetMovingParam(movingParam)
        {
            _movingParam = movingParam;
        }
        
        /****************************************************************************
         *  遷移終了時のパラメータ設定
         *  @param {object}movedParam 
                                                                                   */
        function SetMovedParam(movedParam)
        {
            _movedParam = movedParam;
        }
        
        /****************************************************************************
         *  遷移開始時のパラメータ取得
         *  @return {object}movingParam 
                                                                                   */
        function GetMovingParam()
        {
            return _movingParam;
        }

        /****************************************************************************
         *  遷移終了時のパラメータ取得
         *  @return {object}movedParam 
                                                                                   */
        function GetMovedParam()
        {
            return _movedParam;
        }

        /****************************************************************************
         *  遷移画面のフレームID取得
         *  @return {object}frameId 
                                                                                   */
        function GetFrameId()
        {
            return _frameId;
        }
        
        /****************************************************************************
         *  遷移画面のID取得
         *  @return {object}viewId 
                                                                                   */
        function GetViewId()
        {
            return _viewId;
        }

        /****************************************************************************
         *  遷移した画面の終了通知設定
         *  @param {function}notification 
                                                                                   */
        function SetFinishedNotification(notification)
        {
            _viewFinishedNotification = notification;
        }
        
        /****************************************************************************
         *  遷移した画面の終了通知取得
         *  @return {function}notification 
                                                                                   */
        function GetFinishedNotification()
        {
            return _viewFinishedNotification;
        }
        
        /****************************************************************************
         *  初期化モード設定
         *  @param {FC_MOVING_MODE}mode 
                                                                                   */
        function SetMovingMode(mode)
        {
            _movingMode = mode;
        }
        
        /****************************************************************************
         *  初期化モード取得
         *  @return {FC_MOVING_MODE}mode 
                                                                                   */
        function GetMovingMode()
        {
            return _movingMode;
        }

        //関数の公開
        MoveViewInfo.prototype.GetFrameId = GetFrameId;
        MoveViewInfo.prototype.GetViewId = GetViewId;
        MoveViewInfo.prototype.SetMovingParam = SetMovingParam;
        MoveViewInfo.prototype.GetMovingParam = GetMovingParam;
        MoveViewInfo.prototype.SetMovedParam = SetMovedParam;
        MoveViewInfo.prototype.GetMovedParam = GetMovedParam;
        MoveViewInfo.prototype.SetFinishedNotification = SetFinishedNotification;
        MoveViewInfo.prototype.GetFinishedNotification = GetFinishedNotification;
        MoveViewInfo.prototype.SetMovingMode = SetMovingMode;
        MoveViewInfo.prototype.GetMovingMode = GetMovingMode;

    }catch(e){
        FC_Error(13);
    }
    return this;
}

/****************************************************************************
 * 画面を表示にする
                                                                           */
function ShowViewById(id)
{
    try{
        ShowFrameById(id, FC_IFRAME_VIEW_VISIBLE_WIDTH, FC_IFRAME_VIEW_VISIBLE_HEIGHT);
        //現在表示している画面として記録
        FC_DispFrame = id;
    }
    catch(e){
        FC_Error(6);
    }
}

/****************************************************************************
 * 画面を非表示にする。
 * @param {string}id フレームＩＤ(必須)
                                                                           */
function HideViewById(id)
{
    try{
        HideFrameById(id);
        //現在表示している画面を空にする
        FC_DispFrame = "";
    }
    catch(e){
        FC_Error(6);
    }
}

/****************************************************************************
 * 画面を非表示にする
                                                                           */
function ClearView()
{
    HideViewById(FC_DispFrame);
}

/****************************************************************************
 * 画面を切替える。
 * @param {string}hideId 非表示にするフレームＩＤ
 * @param {string}showId 表示するフレームＩＤ(必須)
 * @param {string}width 表示するフレームの横幅(必須)
 * @param {string}height 表示するフレームの縦幅（必須）
                                                                           */
function HideAndShowViewById(hideId, showId)
{
    try{
        if(hideId != ""){
            HideViewById(hideId);
        }
        ShowViewById(showId);
    }
    catch(e){
        FC_Error(7);
    }
}

/****************************************************************************
 * 画面表示
 * @param {string}showId 表示するフレームＩＤ(必須)
 * @param {string}width 表示するフレームの横幅(必須)
 * @param {string}height 表示するフレームの縦幅（必須）
                                                                           */
function ClearAndShowViewById(showId)
{
    try{
        ClearView();
        ShowViewById(showId);
    }
    catch(e){
        FC_Error(7);
    }
}

/****************************************************************************
 * @param {MoveViewInfo}moveViewInfo 画面遷移情報
 * 画面遷移実行
                                                                           */
function MoveView(moveViewInfo)
{
    try{
        var frameId = moveViewInfo.GetFrameId();
        var viewId = moveViewInfo.GetViewId();
        var viewFinNotification = moveViewInfo.GetFinishedNotification();
        
        var movingMode = moveViewInfo.GetMovingMode();
        if(movingMode == null){//モード未設定
            movingMode = FC_MOVING_MODE_INIT;
        }
        
        var movingParam = moveViewInfo.GetMovingParam();
        var movedParam = moveViewInfo.GetMovedParam();

        var frmObj = GetChildFrame(frameId);

        //Move開始通知
        if(frmObj["NotifyViewMoving"]){
            frmObj["NotifyViewMoving"](movingParam,movingMode);
        }

        //画面終了通知設定
        if(viewFinNotification && frmObj["SetFrameFinishedNotification"]){
            frmObj["SetFrameFinishedNotification"](viewFinNotification,viewId);
        }
        
        //画面表示
        ClearAndShowViewById(frameId);

        //Move終了通知
        if(frmObj["NotifyViewMoved"]){
            frmObj["NotifyViewMoved"](movedParam);
        }

    }catch(e){
        FC_Error(15);
    }
    
}

/****************************************************************************
 * @private
 * エラー表示を表示する。
 * @param {int}spotcode スポットコード
                                                                           */
function FC_Error(spotcode)
{
    try{
        top.GetErrorMessage(FC_FATAL_ERROR, FC_MESSAGE_ID, FC_FILE_NAME, FC_BASE_SPOT_CODE + spotcode);
    }catch(e){
        alert("Exception FrameController::FC_Error spotcode = " + spotcode);
    }
}

