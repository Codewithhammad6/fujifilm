/****************************************************************************

  @file ImageButton.js

  @brief 画像ボタンの押下処理

  @author YSK宮滝

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/28  YSK宮滝     V1.0　     新規作成
         06/10/12  S1 神立     V1.4       操作性向上(キーボード操作)

/****************************************************************************/

//*****************************************************************************
// SetImageUrl
// １．機能
//      画像ボタン押下時の画像すり替え
// ２．戻り値
//　　  なし
// ３．備考//      06/10/12  S1 神立     フォーカス時に画像を差し替える処理を追加

//*****************************************************************************
function SetImageUrl(obj,imgUrl)
{
    // 061012 Kandachi >>>
    // ログインボタン
    if(obj.id == "imgLogin"){
        var PATH_LOGIN_BTN_F = "../Bmp/cmCirBGreenBtnF.gif";
        var PATH_LOGIN_BTN_U = "../Bmp/cmCirBGreenBtnU.gif";
        var PATH_LOGIN_BTN_D = "../Bmp/cmCirBGreenBtnD.gif";
        
        // 凸/凹、フォーカス有/無の状態を見分けるプロパティを設定する
        var loginBtn = document.getElementById("btnLogin");
        switch(event.type){
        case "mouseup"    :
        case "mouseout"   :
            loginBtn.pressed = false;
            break;
        case "focus"      :
            loginBtn.focused = true;
            break;
        case "blur"       :
            loginBtn.focused = false;
            break;
        case "mousedown"  :
            loginBtn.pressed = true;
            break;
        default         :
            break;
        }
        
        // 各状態の画像のパスを決める
        if(loginBtn.pressed == true){       // 凹状態
            imgUrl = PATH_LOGIN_BTN_D ;
        }else if(loginBtn.focused == true){ // 凸でフォーカス
            imgUrl = PATH_LOGIN_BTN_F ;
        }else{                              // 凸でフォーカスなし
            imgUrl = PATH_LOGIN_BTN_U ;
        }
    }
    
    // 戻るボタン
    if(obj.id == "imgBack"){
        var PATH_BACK_BTN_F  = "../Bmp/cmOvalAPaleLBtnF.gif";
        var PATH_BACK_BTN_U  = "../Bmp/cmOvalAPaleLBtnU.gif";
        var PATH_BACK_BTN_D  = "../Bmp/cmOvalAPaleLBtnD.gif";
        
        // 凸/凹、フォーカス有/無の状態を見分けるプロパティを設定する
        var backBtn = document.getElementById("btnBack");
        switch(event.type){
        case "mouseup"    :
        case "mouseout"   :
            backBtn.pressed = false;
            break;
        case "focus"      :
            backBtn.focused = true;
            break;
        case "blur"       :
            backBtn.focused = false;
            break;
        case "mousedown"  :
            backBtn.pressed = true;
            break;
        default           :
            break;
        }
        
        // 各状態の画像のパスを決める
        if(backBtn.pressed == true){
            imgUrl = PATH_BACK_BTN_D ;
        }else if(backBtn.focused == true){
            imgUrl = PATH_BACK_BTN_F ;
        }else{
            imgUrl = PATH_BACK_BTN_U ;
        }
    }
    // <<<
    
	obj.src = imgUrl;
}
