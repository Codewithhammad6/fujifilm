/****************************************************************************

  @file WindowUtility.js

  @brief Window処理に関するユーティリティ

  @author HSK山本

  Copyright(c) 2006 FUJIFILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  06/11/01  HSK山本       V1.4       新規生成
  @date  07/04/11  HSK平尾       V2.0       IE7対応


/****************************************************************************/

/**
 * 指定したidの子フレームを取得

 * @param {string}frameid フレームID
 * @return 子フレームオブジェクト（エラーの場合はnull）

 **/
function GetChildFrame(frameid)
{
    var frmWin = null;
    try{
        frmWin = window[frameid];
        if(frmWin && frmWin.frameElement && frmWin.frameElement.id == frameid){
            return frmWin;
        }
        //以下、idと同名のプロパティが設定されている場合

        var frmLen = frames.length;
        for(i=0;i<frmLen;i++)
        {
            if(frames[i].frameElement.id==frameid){
                frmWin = frames[i];
                break;
            }
        }
    }catch(e){
        frmWin = null;
    }
    return frmWin;
}


/**
 * Windowをクローズする。

 * @param {object}win クローズ対象のwindowオブジェクト
 * @return window.close実行＋IE7時の警告メッセージ表示の抑止

 **/
function WU_CloseWindow(win)
{
    try{
        (win.open('','_top').opener=top).close();
        return true;
    }catch(e){
        return false;
    }
}


