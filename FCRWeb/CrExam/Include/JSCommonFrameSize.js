/****************************************************************************

  @file JSCommonFrameSize.js

  @brief CR検査で使用するフレームの大きさ

  @author YSK畑


  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  04/12/28  YSK畑       V1.0       新規作成
  @date  09/09/08  FF 星野     V6.0       インジケーター切り離し対応
  @date  14/03/28  TYK石井     V3.0       DR装置画面追加
/****************************************************************************/
//[定数]
var  IFRAME_CTRL_VISIBLE_HEIGHT  = "600px";				// 機能フレーム表示
var  IFRAME_CTRL_VISIBLE_WIDTH   = "800px";				// 機能フレーム表示
var  IFRAME_CTRL_HIDDEN_HEIGHT   = "0px";				// 機能フレーム非表示
var  IFRAME_CTRL_HIDDEN_WIDTH    = "0px";				// 機能フレーム非表示

var  IFRAME_VIEW_USERGUIDE_HEIGHT  = "83px";			// ユーザガイダンスたて
var  IFRAME_VIEW_USERGUIDE_WIDTH   = "800px";			// ユーザガイダンス幅

// 2005/09/01 Kanno UPDATE ST デザイン修正
//var  IFRAME_VIEW_INDICATOR_HEIGHT  = "40px";			// インジケータたて
//var  IFRAME_VIEW_INDICATOR_WIDTH   = "200px";			// インジケータ幅
var  IFRAME_VIEW_INDICATOR_HEIGHT  = "38px";			// インジケータたて
//var  IFRAME_VIEW_INDICATOR_WIDTH   = "192px";			// インジケータ幅　//09.09.08 FF 星野 インジケーター切り離し対応 DEL
//var  IFRAME_VIEW_INDICATOR_WIDTH   = "229px";			// インジケータ幅  //09.09.08 FF 星野 インジケーター切り離し対応 ADD
var  IFRAME_VIEW_INDICATOR_WIDTH   = "267px";           // インジケータ幅  //2014.03.11 V3.0(B) TYK石井 DR装置画面追加 ADD

// 2005/09/01 Kanno UPDATE ED デザイン修正
var  IFRAME_VIEW_INDICATOR_HIDDEN  = "0px";				// インジケータ非表示

var  IFRAME_VIEW_VISIBLE_HEIGHT    = "517px";			// 画面表示
var  IFRAME_VIEW_VISIBLE_WIDTH     = "800px";			// 画面表示
var  IFRAME_VIEW_HIDDEN_HEIGHT     = "0px";				// 画面非表示
var  IFRAME_VIEW_HIDDEN_WIDTH      = "0px";				// 画面非表示




