/****************************************************************************

  @file PageLoader.js

  @brief ASPXページ先読みクライアントスクリプト

  @author YSK齋藤

  @requires .\MessageWindow.js,.\WindowUtility.js
  
  Copyright(c) 2004-2006 FUJIFILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/11/25  YSK齋藤       V1.0       新規作成
  @date  06/10/30  HSK山本       V1.4       CR検査部構造見直し[4]対応

/****************************************************************************/

//onloadイベント名
var PL_EVENT_ONLOAD = "onload";

//ロードモードvar LOADMODE_ASSIGN = 0;//代入ロードvar LOADMODE_REPLACE = 1;//入れ替えロード

/**
 * @private
 * プライベート変数
 **/
var PL_FATAL_ERROR          = "FATAL_ERROR";        // 致命的エラー
var PL_BASE_SPOT_CODE = 0;                   //スポットコードvar PL_FILE_NAME = "PageLoader.js"  //ファイル名var PL_MESSAGE_ID = 30500;              //メッセージID 


/**
 * @param {string}frameid フレームID(必須)
 * @param {string}pageSrc ページソースパス(必須)
 * @param {function}callback ロード完了後実行するコールバック関数（省略可）
 * @param {object}param callback実行時に渡すパラメータ（省略可）
 * 指定したフレームにページローダを使用してページをロードする
 **/
function LoadPage(frameid,pageSrc,callback,param)
{
    try{
        LoadPageInDiv(null,frameid,pageSrc,callback,param,null);
    }catch(e){
        LoadError(0);
    }
}

/**
 * 指定したDIV内フレームにページをロードする
 * フレームが存在しない場合は生成する。
 * @param {string}divid フレーム生成先のdivID（未設定可）
 * @param {string}frameid フレームID（必須）
 * @param {string}pageSrc ページソースパス（必須）
 * @param {function}callback ロード完了後実行するコールバック関数（省略可）
 * @param {object}param callback実行時に渡すパラメータ（省略可）
 * @param {function}frmCreatedFn フレーム生成通知（省略可）
 *
 **/
function LoadPageInDiv(divID,frameID,pageSrc,callback,param,frmCreatedFn)
{
    try{
        //ページローダ生成
        var loader = new PageLoader();
        //ページ情報追加
        loader.AddLoadPage(frameID,pageSrc,divID);
        //コールバック設定
        loader.SetAllPageLoadedNotification(callback,param);
        //フレーム生成通知
        loader.SetFrameCreatedNotification(frmCreatedFn);
        //ロード開始
        loader.Start();
    }catch(e){
        LoadError(1);
    }
    
}

/**
 * @private
 * @param スポットコード
 * ロードエラー表示
 **/
function LoadError(spotcode)
{
    try{
        top.GetErrorMessage(PL_FATAL_ERROR,PL_MESSAGE_ID,PL_FILE_NAME,PL_BASE_SPOT_CODE+spotcode);
    }catch(e){
        alert("Exception PageLoader::LoadError spotcode = " + spotcode);
    }
}
/**
 * @class
 * @constructor
 * ページローダクラス
 **/
function PageLoader()
{
    /**
     * @private
     * ページのソースファイルパスリスト
     **/
    var _pageListArray = null;

    /**
     * @private
     * ページをロードするiframeのIDリスト
     **/
    var _pageIdArray = null;

    /**
     * @private
     * ページのインデックス
     **/
     var _pageIndex = -1;
     
    /**
     * @private
     * iframeを生成するDIVの連想配列（key:frameId item:divId）
     **/
    var _divIdArray = null;

    /**
     * @private
     * 全子ページロード完了通知のコールバック関数
     **/
    var _allPageLoadedNotification = null;

    /**
     *    @private
     *    _allPageLoadedNotificationのパラメータ
     **/
     var _allPageLoadedNotificationParam = null;

    /**
     * @private
     * ロード完了通知
     **/
     var _loadCompleteNotification = null;
     
    /**
     * @private
     * ロードモード
     **/
    var _loadingMode = null;
    
    /**
     *    @private
     *    フレーム生成通知
     **/
     var _frameCreatedNotification = null;
    /**
     * @private
     * 初期化
     **/
    function Init()
    {
        _pageListArray = null;
        _pageIdArray = null;
        _pageIndex=-1;
        _divIdArray = null;
        _allPageLoadedNotification = null;
        _allPageLoadedNotificationParam = null;
        _loadCompleteNotification = null;
        _loadingMode = null;
        _frameCreatedNotification = null;
        window.curPageLoader = null;
    }
    
    /**
     * @private
     * ロードする子ページリストへ追加する。     * @param {string}frameId フレームID
     * @param {string}pageSrc ページソースパス
     * @param {string}divId フレームの生成先のDIV(生成不要の場合は、未設定)
     **/
    function AddLoadPage(frameId,pageSrc,divId)
    {
        try{
            if(frameId == null){
                throw new Exception("PageLoader::AddLoadPage frameId is null");
            }
            if(pageSrc == null){
                throw new Exception("PageLoader::AddLoadPage pageSrc is null");
            }
            
            //リストはなければ作る
            if(_pageIdArray == null){
                _pageIdArray = new Array();
            }
            if(_pageListArray == null){
                _pageListArray = new Array();
            }
            _pageIdArray.push(frameId);
            _pageListArray.push(pageSrc);
            if(divId){
                if(_divIdArray == null){
                    _divIdArray = new Array();
                }
                _divIdArray[frameId]=divId;
            }
        }catch(e){
            LoadError(2);
        }
    }
    
    /**
     * ロードモードの変更
     * @param{string}mode ロードモード
     **/
    function ChangeLoadMode(mode)
    {
        _loadingMode = mode;
    }

    /**
     * ロード処理開始     * @param {string}mode ロードモード（省略したらINPUT）     **/
    function Start(mode)
    {
        if(mode == null){
            mode = LOADMODE_ASSIGN;
        }
        ChangeLoadMode(mode);

        NextPageLoading();
    }

    /**
     * コールバック実行     **/
    function NotifyAllPageLoaded()
    {
        try{
            if(_allPageLoadedNotification != null){
                _allPageLoadedNotification(_allPageLoadedNotificationParam);
            }
        }catch(e){
            LoadError(3);
        }
    }

    /**
     * ロード完了通知
     **/
    function NotifyLoadComplete()
    {
        try{
            if(_loadCompleteNotification != null){
                _loadCompleteNotification();
            }
        }catch(e){
            LoadError(4);
        }
    }
    
    
    /**
     * @private
     * 次ページロード処理     **/
    function NextPageLoading()
    {
        try{
            if(_pageListArray && _pageListArray){
            
                _pageIndex++;
                if(_pageListArray.length <= _pageIndex){
                    //コールバック実行
                    NotifyAllPageLoaded();
                    //ロード完了通知
                    NotifyLoadComplete();
                    //初期化
                    Init();
                }else{
                    var targetid = _pageIdArray[_pageIndex];
                    var targetSrc = _pageListArray[_pageIndex];
                    var frameObj = document.getElementById(targetid);
                    if(frameObj==null && _divIdArray){
                        //フレーム生成処理
                        var divId = _divIdArray[targetid];
                        if(divId){
                            frameObj = CreateFrameInDiv(divId,targetid);
                        }
                    }
                    
                    var isFrameLoaded=true;//ロード済フラグ
                    var framewin = null;
                    if(_loadingMode == LOADMODE_ASSIGN){
                        if(frameObj.src != targetSrc){//未ロード
                            frameObj.src = targetSrc;
                            isFrameLoaded = false;
                        }
                    }else if(_loadingMode == LOADMODE_REPLACE){//replace
                        framewin = GetChildFrame(targetid);
                        if(framewin.location.href != targetid){//未ロード
                            framewin.location.replace(targetSrc);
                            isFrameLoaded = false;
                        }
                    }
                    
                    if(isFrameLoaded){//ロード済
                        LoadFrameComplete(targetid);
                    }else{//未ロード
                        frameObj.attachEvent(PL_EVENT_ONLOAD,OnFrameLoad);
                    }
                }
                
            }
        }catch(e){
            LoadError(5);
        }
        
    }

    /**
     * ロード対象の全子ページがロードされた時に実行されるコールバック関数を登録する。     * @param {fuction}callback コールバック関数
     * @param {object}param コールバック実行時のパラメータ（省略化）     **/
    function SetAllPageLoadedNotification(notification,param)
    {
        _allPageLoadedNotification = notification;
        _allPageLoadedNotificationParam = param;
    }

    /**
     * ロード完了の通知
     * @private
     * @param {function} 通知関数
     **/
    function SetLoadCompleteNotification(notification)
    {
        _loadCompleteNotification = notification;
    }
    
    /**
     * @private
     * iframeのロード完了イベントハンドラ
     **/
    function OnFrameLoad()
    {
        try{
            frameElm = event.srcElement;
            frameElm.detachEvent(PL_EVENT_ONLOAD,OnFrameLoad);
            //ロード完了
            LoadFrameComplete(frameElm.id);
        }catch(e){
            LoadError(7);
        }
    }
    
    /**
     * ロード完了     * @private
     * @param {string} frameId ロードが完了したフレームのid
     **/
    function LoadFrameComplete(frameId)
    {
        try{
            var framewin = GetChildFrame(frameId);
            if(framewin != null){
                var childPageLoader = framewin.curPageLoader;
                if(childPageLoader == null){
                    NextPageLoading();
                }else{
                    childPageLoader.SetLoadCompleteNotification(NextPageLoading);
                }
            }
        }catch(e){
        
        }
    }
    
    /**
     * フレームの生成
     * @private
     * @param {string} divID 生成対象のdivのID
     * @param {string} frameID 生成するフレームのID
     *
     **/
    function CreateFrameInDiv(divID,frameID)
    {
        try{
            var divEle = document.getElementById(divID);
            
            if(divEle == null){
                return null;
            }
            if(divEle.innerHTML == ""){
                divEle.innerHTML = "<IFRAME ID='"+frameID+"' SCROLLING='no' FRAMEBORDER='0'></IFRAME>";
                if(_frameCreatedNotification){
                    //通知があったら生成したフレームIDを引数にして通知する
                    _frameCreatedNotification(frameID);
                }
            }
            return document.getElementById(frameID);
        }catch(e){
            LoadError(8);
            return null;
        }
    }
    
    /**
     * フレーム生成完了の通知
     * @private
     * @param {function} 通知関数
     **/
    function SetFrameCreatedNotification(notification)
    {
        _frameCreatedNotification = notification;
    }

    
    //関数の公開
    PageLoader.prototype.AddLoadPage = AddLoadPage;
    PageLoader.prototype.Start = Start;
    PageLoader.prototype.SetAllPageLoadedNotification = SetAllPageLoadedNotification;
    PageLoader.prototype.SetFrameCreatedNotification = SetFrameCreatedNotification;
    PageLoader.prototype.SetLoadCompleteNotification = SetLoadCompleteNotification;
    //ウィンドウ内のプロパティにページローダを追加
    window.curPageLoader = this;
    
    return this;

}
