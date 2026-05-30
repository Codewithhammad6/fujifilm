///////////////////////////////////////////////////////////////////////
// maintenance.js
//
// バックアップユーティリティ
// メンテナンスログ収集機能拡張スクリプト
//
//  変更履歴     担当      内容
//  2011/10/26   FFS生田   新規作成 (CQ#1045)
//
//  Copyright(c) 2011 FUJI PHOTO FILM CO., LTD. All rights reserved.
///////////////////////////////////////////////////////////////////////


//*****************************************************************************
//
// 変数定義
//
//*****************************************************************************
var numCaller;
var strTemporaryFolder;
var strUserFolder;
var blnRangedCollect;
var numCollectRange;
var objShell = WScript.CreateObject("WScript.Shell");
var strMSINFO32Path = "c:\\Program Files\\Common Files\\Microsoft Shared\\MSInfo\\msinfo32.exe"
var objFileSystem = WScript.CreateObject("Scripting.FileSystemObject");

main();

//*****************************************************************************
//
// スクリプトのエントリポイント
//
//*****************************************************************************
function main()
{
	var nRet;
	nRet = GetParameter();
	if (nRet == false) return;
	switch (numCaller)
	{
		//収集ファイルを一時フォルダにコピーする直前
		case 1:
			if (blnRangedCollect)
			{
				nRet = Remove_IISLog();
				nRet = Remove_ClientApplicationLog();
			}
			break;
		//収集ファイルを一時フォルダにコピーした直後
		case 2:
			nRet = Collect_msinfo32();
			break;
		//一時フォルダの圧縮が完了した直後
		case 3:
			break;
		default:
			nRet = false;
	}
}

//*****************************************************************************
//
// パラメータを取得する
//
//*****************************************************************************
function GetParameter()
{
	var nRet = true;
	try
	{
		var args = WScript.Arguments;
		numCaller = parseInt(args(0));
		strTemporaryFolder = args(1);
		strUserFolder = args(2);
		blnRangedCollect = (args(3) == 1) ? true : false;
		numCollectRange = parseInt(args(4));
	} catch (e)
	{
		nRet = false;
	}
	return nRet;
}

//*****************************************************************************
//
// msinfo32の出力結果を一時フォルダにコピーする
//
//*****************************************************************************
function Collect_msinfo32()
{
	var nRet = true;
	try
	{
		var strCommand = '"'+strMSINFO32Path + '"'+ " /nfo "+ '"'+strTemporaryFolder+ 'system.nfo"';
		objShell.Run(strCommand, 0, true);
	} catch (e)
	{
		nRet = false;
	}
	return nRet;
}

//*****************************************************************************
//
// 範囲指定外のIISログを削除する
//
//*****************************************************************************
function Remove_IISLog()
{
	var nRet = true;
	try
	{
		var objApp = WScript.CreateObject("Shell.Application");
		var objFolder = objApp.NameSpace(strUserFolder + "Log\\IISLog\\");
		var objFolderItems = objFolder.Items();
		Remove_IISLog_Search(objFolderItems);
	} catch (e)
	{
		nRet = false;
	}
	return nRet;
}
function Remove_IISLog_Search(tmpFolderItems)
{
	var nRet;
	try
	{
		var objFolderItemsB;
		var objItem;
		var i;
		for (i=0; i<tmpFolderItems.Count; i++)
		{
			objItem = tmpFolderItems.Item(i);
			if (objItem.IsFolder == true)
			{
				objFolderItemsB = objItem.GetFolder;
				Remove_IISLog_Search(objFolderItemsB.Items());
			} else {
				var dtFile = new Date(new String(objItem.ModifyDate));
				var dtNow = new Date();
				if (GetSecond(dtNow) - numCollectRange * 60 * 60 * 24 > GetSecond(dtFile))
				{
					objFileSystem.DeleteFile(objItem.Path);
				}
			}
		}
	} catch (e)
	{
		nRet = false;
	}
}
function GetSecond(date)
{
	try
	{
		var numSecond;
		numSecond = date.getSeconds() + date.getMinutes() * 60 +
			        date.getHours() * 60 * 60 + date.getDate() * 60 * 60 * 24 +
			        date.getMonth() * 60 * 60 * 24 * 31 + date.getFullYear() * 60 * 60 * 24 * 31 * 365;
		return numSecond;
	} catch (e)
	{
		return -1;
	}
}

//*****************************************************************************
//
// 最新以外のクライアントアプリケーションログを削除する
//
//*****************************************************************************
function Remove_ClientApplicationLog()
{
	var nRet;
	try
	{
		var objApp = WScript.CreateObject("Shell.Application");
		var objFolder = objApp.NameSpace(strUserFolder + "Log\\CLIENT_LOG\\");
		var objFolderItems = objFolder.Items();
		var objLogArray1 = new Array();
		var objLogArray2 = new Array();
		var objLogArray3 = new Array();
		Remove_ClientApplicationLog_Search(objFolderItems, objLogArray1, objLogArray2, objLogArray3);
		for (var i=0; i<objLogArray3.length; i++)
		{
			if (objLogArray2[objLogArray3[i].split("_")[1]] != objLogArray3[i])
			{
				objFileSystem.DeleteFolder(strUserFolder + "Log\\CLIENT_LOG\\"+objLogArray3[i]);
			}
		}
		nRet = true;
	} catch (e)
	{
		nRet = false;
	}
	return nRet;
}
function Remove_ClientApplicationLog_Search(tmpFolderItems, _objArray1, _objArray2, _objArray3)
{
	try
	{
		var nRet = true;
		var objFolderItemsB;
		var objItem;
		var i;
		for (i=0; i<tmpFolderItems.Count; i++)
		{
			objItem = tmpFolderItems.Item(i);
			if (objItem.IsFolder == true)
			{
				var strFolderName = new String(objItem.Name);
				var aryPart = strFolderName.split("_");
				if ((aryPart.length == 3) && (aryPart[0] == "Maintenance"))
				{
					if (aryPart[2].length == 12)
					{
						var dtFolder = new Date( 2000 + parseInt(aryPart[2].substring(0,2)),
							                            parseInt(aryPart[2].substring(2,4)),
							                            parseInt(aryPart[2].substring(4,6)),
							                            parseInt(aryPart[2].substring(6,8)),
							                            parseInt(aryPart[2].substring(8,10)),
							                            parseInt(aryPart[2].substring(10,12)),0 );
						if (_objArray1[aryPart[1]] == null)
						{
							_objArray1[aryPart[1]] = GetSecond(dtFolder);
							_objArray2[aryPart[1]] = objItem.Name;
							_objArray3.push(objItem.Name);
						} else {
							if (_objArray1[aryPart[1]] < GetSecond(dtFolder))
							{
								_objArray1[aryPart[1]] = GetSecond(dtFolder);
								_objArray2[aryPart[1]] = objItem.Name;
							}
							_objArray3.push(objItem.Name);
						}
					}
				} else {
					objFolderItemsB = objItem.GetFolder;
					Remove_ClientApplicationLog_Search(objFolderItemsB.Items(), _objArray1, _objArray2, _objArray3);
				}
			}
		}
	} catch (e)
	{
		nRet = false;
	}
	return nRet;
}