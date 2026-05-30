/****************************************************************************

  @file SystemEnviroment.js

  @brief 

  @author HSK酒井  
          SpotCode MAX XXX

  Copyright(c) 2006 FUJIFILM CO., LTD. All rights reseved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
    @date  06/08/09  HSK酒井     V1.4       CR検査部構造見直し[8]対応

    @date  09/07/09  HSK齋藤誠   V5.1       PC版画像確認モニタ対応  
/****************************************************************************/
function isWindowsCE() {
    var os = navigator.userAgent.toLowerCase();
    if (os.indexOf("windows ce") > 0) {
        return true;
    }
    return false;
}

// 20090709 HSK齋藤誠 PC版画像確認モニタ対応 A Start
function isClientTypeMini() {
    if (top.ClientMode == top.CLIENT_TYPE_MINI) {
        return true;
    }
    return false;
}
// 20090709 HSK齋藤誠 PC版画像確認モニタ対応 A End
