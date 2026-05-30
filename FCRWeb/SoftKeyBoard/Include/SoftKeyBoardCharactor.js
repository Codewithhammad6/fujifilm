/****************************************************************************

  @file SoftKeyBoardCharactor.aspx

  @brief ソフトキーボード文字列設定

  @author YSK畑

  Copyright(c) 2004-2006 FUJI PHOTO FILM CO., LTD. All rights reserved.

         更新履歴  担当        Ver.       内容
  -----  --------  ----------  --------   -------------------------------
  @date  05/01/17  YSK畑　     V1.0       新規作成

/****************************************************************************/
//[定数]
var COUNT_KEYBOARD = 3;
var COUNT_ROW      = 5;
var COUNT_COL      = 13;

//[変数]
var KeyBoardName  = new Array(COUNT_KEYBOARD);
var KeyBoardChar  = new Array(COUNT_KEYBOARD);
var KeyBoardClass = new Array(COUNT_KEYBOARD);

// 配列作成
for(i=0; i<COUNT_KEYBOARD; i++){
	KeyBoardName[i]  = new Array(COUNT_ROW);
	KeyBoardChar[i]  = new Array(COUNT_ROW);
	KeyBoardClass[i] = new Array(COUNT_ROW);
	for(j=0; j<COUNT_ROW; j++){
		KeyBoardName[i][j]  = new Array(COUNT_COL);
		KeyBoardChar[i][j]  = new Array(COUNT_COL);
		KeyBoardClass[i][j] = new Array(COUNT_COL);

	}
}

//表示文字作成
// アルファベット
KeyBoardName[0][0][0]  = "A";
KeyBoardName[0][0][1]  = "B";
KeyBoardName[0][0][2]  = "C";
KeyBoardName[0][0][3]  = "D";
KeyBoardName[0][0][4]  = "E";
KeyBoardName[0][0][5]  = "F";
KeyBoardName[0][0][6]  = "G";
KeyBoardName[0][0][7]  = "H";
KeyBoardName[0][0][8]  = "I";
KeyBoardName[0][0][9]  = "J";
KeyBoardName[0][0][10] = "K";
KeyBoardName[0][0][11] = "L";
KeyBoardName[0][0][12] = "M";

KeyBoardName[0][1][0]  = "N";
KeyBoardName[0][1][1]  = "O";
KeyBoardName[0][1][2]  = "P";
KeyBoardName[0][1][3]  = "Q";
KeyBoardName[0][1][4]  = "R";
KeyBoardName[0][1][5]  = "S";
KeyBoardName[0][1][6]  = "T";
KeyBoardName[0][1][7]  = "U";
KeyBoardName[0][1][8]  = "V";
KeyBoardName[0][1][9]  = "W";
KeyBoardName[0][1][10] = "X";
KeyBoardName[0][1][11] = "Y";
KeyBoardName[0][1][12] = "Z";

KeyBoardName[0][2][0]  = "a";
KeyBoardName[0][2][1]  = "b";
KeyBoardName[0][2][2]  = "c";
KeyBoardName[0][2][3]  = "d";
KeyBoardName[0][2][4]  = "e";
KeyBoardName[0][2][5]  = "f";
KeyBoardName[0][2][6]  = "g";
KeyBoardName[0][2][7]  = "h";
KeyBoardName[0][2][8]  = "i";
KeyBoardName[0][2][9]  = "j";
KeyBoardName[0][2][10] = "k";
KeyBoardName[0][2][11] = "l";
KeyBoardName[0][2][12] = "m";

KeyBoardName[0][3][0]  = "n";
KeyBoardName[0][3][1]  = "o";
KeyBoardName[0][3][2]  = "p";
KeyBoardName[0][3][3]  = "q";
KeyBoardName[0][3][4]  = "r";
KeyBoardName[0][3][5]  = "s";
KeyBoardName[0][3][6]  = "t";
KeyBoardName[0][3][7]  = "u";
KeyBoardName[0][3][8]  = "v";
KeyBoardName[0][3][9]  = "w";
KeyBoardName[0][3][10] = "x";
KeyBoardName[0][3][11] = "y";
KeyBoardName[0][3][12] = "z";

KeyBoardName[0][4][0]  = "<BR>";
KeyBoardName[0][4][1]  = "<BR>";
KeyBoardName[0][4][2]  = "<BR>";
KeyBoardName[0][4][3]  = "<BR>";
KeyBoardName[0][4][4]  = "<BR>";
KeyBoardName[0][4][5]  = "/";
KeyBoardName[0][4][6]  = "&rsquo;";
KeyBoardName[0][4][7]  = ";";
KeyBoardName[0][4][8]  = ",";
KeyBoardName[0][4][9]  = "#";
KeyBoardName[0][4][10] = "_";
KeyBoardName[0][4][11] = "-";
KeyBoardName[0][4][12] = ".";


// カナ
KeyBoardName[1][0][0]  = "ｱ";
KeyBoardName[1][0][1]  = "ｶ";
KeyBoardName[1][0][2]  = "ｻ";
KeyBoardName[1][0][3]  = "ﾀ";
KeyBoardName[1][0][4]  = "ﾅ";
KeyBoardName[1][0][5]  = "ﾊ";
KeyBoardName[1][0][6]  = "ﾏ";
KeyBoardName[1][0][7]  = "ﾔ";
KeyBoardName[1][0][8]  = "ﾗ";
KeyBoardName[1][0][9]  = "ﾜ";
KeyBoardName[1][0][10] = "ｧ";
KeyBoardName[1][0][11] = "ｯ";
KeyBoardName[1][0][12] = "ﾞ";

KeyBoardName[1][1][0]  = "ｲ";
KeyBoardName[1][1][1]  = "ｷ";
KeyBoardName[1][1][2]  = "ｼ";
KeyBoardName[1][1][3]  = "ﾁ";
KeyBoardName[1][1][4]  = "ﾆ";
KeyBoardName[1][1][5]  = "ﾋ";
KeyBoardName[1][1][6]  = "ﾐ";
KeyBoardName[1][1][7]  = "<BR>";
KeyBoardName[1][1][8]  = "ﾘ";
KeyBoardName[1][1][9]  = "<BR>";
KeyBoardName[1][1][10] = "ｨ";
KeyBoardName[1][1][11] = "ｬ";
KeyBoardName[1][1][12] = "ﾟ";

KeyBoardName[1][2][0]  = "ｳ";
KeyBoardName[1][2][1]  = "ｸ";
KeyBoardName[1][2][2]  = "ｽ";
KeyBoardName[1][2][3]  = "ﾂ";
KeyBoardName[1][2][4]  = "ﾇ";
KeyBoardName[1][2][5]  = "ﾌ";
KeyBoardName[1][2][6]  = "ﾑ";
KeyBoardName[1][2][7]  = "ﾕ";
KeyBoardName[1][2][8]  = "ﾙ";
KeyBoardName[1][2][9]  = "ｦ";
KeyBoardName[1][2][10] = "ｩ";
KeyBoardName[1][2][11] = "ｭ";
KeyBoardName[1][2][12] = "ｰ";

KeyBoardName[1][3][0]  = "ｴ";
KeyBoardName[1][3][1]  = "ｹ";
KeyBoardName[1][3][2]  = "ｾ";
KeyBoardName[1][3][3]  = "ﾃ";
KeyBoardName[1][3][4]  = "ﾈ";
KeyBoardName[1][3][5]  = "ﾍ";
KeyBoardName[1][3][6]  = "ﾒ";
KeyBoardName[1][3][7]  = "<BR>";
KeyBoardName[1][3][8]  = "ﾚ";
KeyBoardName[1][3][9]  = "<BR>";
KeyBoardName[1][3][10] = "ｪ";
KeyBoardName[1][3][11] = "ｮ";
KeyBoardName[1][3][12] = "";

KeyBoardName[1][4][0]  = "ｵ";
KeyBoardName[1][4][1]  = "ｺ";
KeyBoardName[1][4][2]  = "ｿ";
KeyBoardName[1][4][3]  = "ﾄ";
KeyBoardName[1][4][4]  = "ﾉ";
KeyBoardName[1][4][5]  = "ﾎ";
KeyBoardName[1][4][6]  = "ﾓ";
KeyBoardName[1][4][7]  = "ﾖ";
KeyBoardName[1][4][8]  = "ﾛ";
KeyBoardName[1][4][9]  = "ﾝ";
KeyBoardName[1][4][10] = "ｫ";
KeyBoardName[1][4][11] = "-";
KeyBoardName[1][4][12] = ".";


// 記号
KeyBoardName[2][0][0]  = "_";
KeyBoardName[2][0][1]  = "^";
KeyBoardName[2][0][2]  = "&yen;";
KeyBoardName[2][0][3]  = ";";
KeyBoardName[2][0][4]  = ":";
KeyBoardName[2][0][5]  = "#";
KeyBoardName[2][0][6]  = "$";
KeyBoardName[2][0][7]  = "%";
KeyBoardName[2][0][8]  = "&amp;";
KeyBoardName[2][0][9]  = "/";
KeyBoardName[2][0][10] = "!";
KeyBoardName[2][0][11] = "?";
KeyBoardName[2][0][12] = "<BR>";

KeyBoardName[2][1][0]  = "&lt;";
KeyBoardName[2][1][1]  = "&gt;";
KeyBoardName[2][1][2]  = "(";
KeyBoardName[2][1][3]  = ")";
KeyBoardName[2][1][4]  = "[";
KeyBoardName[2][1][5]  = "]";
KeyBoardName[2][1][6]  = ",";
KeyBoardName[2][1][7]  = ".";
KeyBoardName[2][1][8]  = "-";
KeyBoardName[2][1][9]  = "+";
KeyBoardName[2][1][10] = "&rsquo;";
KeyBoardName[2][1][11] = "&quot;";
KeyBoardName[2][1][12] = "<BR>";

KeyBoardName[2][2][0]  = "<BR>";
KeyBoardName[2][2][1]  = "<BR>";
KeyBoardName[2][2][2]  = "<BR>";
KeyBoardName[2][2][3]  = "<BR>";
KeyBoardName[2][2][4]  = "<BR>";
KeyBoardName[2][2][5]  = "<BR>";
KeyBoardName[2][2][6]  = "<BR>";
KeyBoardName[2][2][7]  = "<BR>";
KeyBoardName[2][2][8]  = "<BR>";
KeyBoardName[2][2][9]  = "<BR>";
KeyBoardName[2][2][10] = "<BR>";
KeyBoardName[2][2][11] = "<BR>";
KeyBoardName[2][2][12] = "<BR>";

KeyBoardName[2][3][0]  = "<BR>";
KeyBoardName[2][3][1]  = "<BR>";
KeyBoardName[2][3][2]  = "<BR>";
KeyBoardName[2][3][3]  = "<BR>";
KeyBoardName[2][3][4]  = "<BR>";
KeyBoardName[2][3][5]  = "<BR>";
KeyBoardName[2][3][6]  = "<BR>";
KeyBoardName[2][3][7]  = "<BR>";
KeyBoardName[2][3][8]  = "<BR>";
KeyBoardName[2][3][9]  = "<BR>";
KeyBoardName[2][3][10] = "<BR>";
KeyBoardName[2][3][11] = "<BR>";
KeyBoardName[2][3][12] = "<BR>";

KeyBoardName[2][4][0]  = "<BR>";
KeyBoardName[2][4][1]  = "<BR>";
KeyBoardName[2][4][2]  = "<BR>";
KeyBoardName[2][4][3]  = "<BR>";
KeyBoardName[2][4][4]  = "<BR>";
KeyBoardName[2][4][5]  = "<BR>";
KeyBoardName[2][4][6]  = "<BR>";
KeyBoardName[2][4][7]  = "<BR>";
KeyBoardName[2][4][8]  = "<BR>";
KeyBoardName[2][4][9]  = "<BR>";
KeyBoardName[2][4][10] = "<BR>";
KeyBoardName[2][4][11] = "-";
KeyBoardName[2][4][12] = ".";

//入力文字作成
// アルファベット
KeyBoardChar[0][0][0]  = "A";
KeyBoardChar[0][0][1]  = "B";
KeyBoardChar[0][0][2]  = "C";
KeyBoardChar[0][0][3]  = "D";
KeyBoardChar[0][0][4]  = "E";
KeyBoardChar[0][0][5]  = "F";
KeyBoardChar[0][0][6]  = "G";
KeyBoardChar[0][0][7]  = "H";
KeyBoardChar[0][0][8]  = "I";
KeyBoardChar[0][0][9]  = "J";
KeyBoardChar[0][0][10] = "K";
KeyBoardChar[0][0][11] = "L";
KeyBoardChar[0][0][12] = "M";

KeyBoardChar[0][1][0]  = "N";
KeyBoardChar[0][1][1]  = "O";
KeyBoardChar[0][1][2]  = "P";
KeyBoardChar[0][1][3]  = "Q";
KeyBoardChar[0][1][4]  = "R";
KeyBoardChar[0][1][5]  = "S";
KeyBoardChar[0][1][6]  = "T";
KeyBoardChar[0][1][7]  = "U";
KeyBoardChar[0][1][8]  = "V";
KeyBoardChar[0][1][9]  = "W";
KeyBoardChar[0][1][10] = "X";
KeyBoardChar[0][1][11] = "Y";
KeyBoardChar[0][1][12] = "Z";

KeyBoardChar[0][2][0]  = "a";
KeyBoardChar[0][2][1]  = "b";
KeyBoardChar[0][2][2]  = "c";
KeyBoardChar[0][2][3]  = "d";
KeyBoardChar[0][2][4]  = "e";
KeyBoardChar[0][2][5]  = "f";
KeyBoardChar[0][2][6]  = "g";
KeyBoardChar[0][2][7]  = "h";
KeyBoardChar[0][2][8]  = "i";
KeyBoardChar[0][2][9]  = "j";
KeyBoardChar[0][2][10] = "k";
KeyBoardChar[0][2][11] = "l";
KeyBoardChar[0][2][12] = "m";

KeyBoardChar[0][3][0]  = "n";
KeyBoardChar[0][3][1]  = "o";
KeyBoardChar[0][3][2]  = "p";
KeyBoardChar[0][3][3]  = "q";
KeyBoardChar[0][3][4]  = "r";
KeyBoardChar[0][3][5]  = "s";
KeyBoardChar[0][3][6]  = "t";
KeyBoardChar[0][3][7]  = "u";
KeyBoardChar[0][3][8]  = "v";
KeyBoardChar[0][3][9]  = "w";
KeyBoardChar[0][3][10] = "x";
KeyBoardChar[0][3][11] = "y";
KeyBoardChar[0][3][12] = "z";


KeyBoardChar[0][4][0]  = "";
KeyBoardChar[0][4][1]  = "";
KeyBoardChar[0][4][2]  = "";
KeyBoardChar[0][4][3]  = "";
KeyBoardChar[0][4][4]  = "";
KeyBoardChar[0][4][5]  = "/";
KeyBoardChar[0][4][6]  = "\'";
KeyBoardChar[0][4][7]  = ";";
KeyBoardChar[0][4][8]  = ",";
KeyBoardChar[0][4][9]  = "#";
KeyBoardChar[0][4][10] = "_";
KeyBoardChar[0][4][11] = "-";
KeyBoardChar[0][4][12] = ".";


// カナ
KeyBoardChar[1][0][0]  = "ｱ";
KeyBoardChar[1][0][1]  = "ｶ";
KeyBoardChar[1][0][2]  = "ｻ";
KeyBoardChar[1][0][3]  = "ﾀ";
KeyBoardChar[1][0][4]  = "ﾅ";
KeyBoardChar[1][0][5]  = "ﾊ";
KeyBoardChar[1][0][6]  = "ﾏ";
KeyBoardChar[1][0][7]  = "ﾔ";
KeyBoardChar[1][0][8]  = "ﾗ";
KeyBoardChar[1][0][9]  = "ﾜ";
KeyBoardChar[1][0][10] = "ｧ";
KeyBoardChar[1][0][11] = "ｯ";
KeyBoardChar[1][0][12] = "ﾞ";

KeyBoardChar[1][1][0]  = "ｲ";
KeyBoardChar[1][1][1]  = "ｷ";
KeyBoardChar[1][1][2]  = "ｼ";
KeyBoardChar[1][1][3]  = "ﾁ";
KeyBoardChar[1][1][4]  = "ﾆ";
KeyBoardChar[1][1][5]  = "ﾋ";
KeyBoardChar[1][1][6]  = "ﾐ";
KeyBoardChar[1][1][7]  = "";
KeyBoardChar[1][1][8]  = "ﾘ";
KeyBoardChar[1][1][9]  = "";
KeyBoardChar[1][1][10] = "ｨ";
KeyBoardChar[1][1][11] = "ｬ";
KeyBoardChar[1][1][12] = "ﾟ";

KeyBoardChar[1][2][0]  = "ｳ";
KeyBoardChar[1][2][1]  = "ｸ";
KeyBoardChar[1][2][2]  = "ｽ";
KeyBoardChar[1][2][3]  = "ﾂ";
KeyBoardChar[1][2][4]  = "ﾇ";
KeyBoardChar[1][2][5]  = "ﾌ";
KeyBoardChar[1][2][6]  = "ﾑ";
KeyBoardChar[1][2][7]  = "ﾕ";
KeyBoardChar[1][2][8]  = "ﾙ";
KeyBoardChar[1][2][9]  = "ｦ";
KeyBoardChar[1][2][10] = "ｩ";
KeyBoardChar[1][2][11] = "ｭ";
KeyBoardChar[1][2][12] = "ｰ";

KeyBoardChar[1][3][0]  = "ｴ";
KeyBoardChar[1][3][1]  = "ｹ";
KeyBoardChar[1][3][2]  = "ｾ";
KeyBoardChar[1][3][3]  = "ﾃ";
KeyBoardChar[1][3][4]  = "ﾈ";
KeyBoardChar[1][3][5]  = "ﾍ";
KeyBoardChar[1][3][6]  = "ﾒ";
KeyBoardChar[1][3][7]  = "";
KeyBoardChar[1][3][8]  = "ﾚ";
KeyBoardChar[1][3][9]  = "";
KeyBoardChar[1][3][10] = "ｪ";
KeyBoardChar[1][3][11] = "ｮ";
KeyBoardChar[1][3][12] = "";

KeyBoardChar[1][4][0]  = "ｵ";
KeyBoardChar[1][4][1]  = "ｺ";
KeyBoardChar[1][4][2]  = "ｿ";
KeyBoardChar[1][4][3]  = "ﾄ";
KeyBoardChar[1][4][4]  = "ﾉ";
KeyBoardChar[1][4][5]  = "ﾎ";
KeyBoardChar[1][4][6]  = "ﾓ";
KeyBoardChar[1][4][7]  = "ﾖ";
KeyBoardChar[1][4][8]  = "ﾛ";
KeyBoardChar[1][4][9]  = "ﾝ";
KeyBoardChar[1][4][10] = "ｫ";
KeyBoardChar[1][4][11] = "-";
KeyBoardChar[1][4][12] = ".";


// 記号
KeyBoardChar[2][0][0]  = "_";
KeyBoardChar[2][0][1]  = "^";
KeyBoardChar[2][0][2]  = "\\\\";
KeyBoardChar[2][0][3]  = ";";
KeyBoardChar[2][0][4]  = ":";
KeyBoardChar[2][0][5]  = "#";
KeyBoardChar[2][0][6]  = "$";
KeyBoardChar[2][0][7]  = "%";
KeyBoardChar[2][0][8]  = "&";
KeyBoardChar[2][0][9]  = "/";
KeyBoardChar[2][0][10] = "!";
KeyBoardChar[2][0][11] = "?";
KeyBoardChar[2][0][12] = "";

KeyBoardChar[2][1][0]  = "&lt;";
KeyBoardChar[2][1][1]  = "&gt;";
KeyBoardChar[2][1][2]  = "(";
KeyBoardChar[2][1][3]  = ")";
KeyBoardChar[2][1][4]  = "[";
KeyBoardChar[2][1][5]  = "]";
KeyBoardChar[2][1][6]  = ",";
KeyBoardChar[2][1][7]  = ".";
KeyBoardChar[2][1][8]  = "-";
KeyBoardChar[2][1][9]  = "+";
KeyBoardChar[2][1][10] = "'";
KeyBoardChar[2][1][11] = '\\"';
KeyBoardChar[2][1][12] = "";

KeyBoardChar[2][2][0]  = "";
KeyBoardChar[2][2][1]  = "";
KeyBoardChar[2][2][2]  = "";
KeyBoardChar[2][2][3]  = "";
KeyBoardChar[2][2][4]  = "";
KeyBoardChar[2][2][5]  = "";
KeyBoardChar[2][2][6]  = "";
KeyBoardChar[2][2][7]  = "";
KeyBoardChar[2][2][8]  = "";
KeyBoardChar[2][2][9]  = "";
KeyBoardChar[2][2][10] = "";
KeyBoardChar[2][2][11] = "";
KeyBoardChar[2][2][12] = "";

KeyBoardChar[2][3][0]  = "";
KeyBoardChar[2][3][1]  = "";
KeyBoardChar[2][3][2]  = "";
KeyBoardChar[2][3][3]  = "";
KeyBoardChar[2][3][4]  = "";
KeyBoardChar[2][3][5]  = "";
KeyBoardChar[2][3][6]  = "";
KeyBoardChar[2][3][7]  = "";
KeyBoardChar[2][3][8]  = "";
KeyBoardChar[2][3][9]  = "";
KeyBoardChar[2][3][10] = "";
KeyBoardChar[2][3][11] = "";
KeyBoardChar[2][3][12] = "";

KeyBoardChar[2][4][0]  = "";
KeyBoardChar[2][4][1]  = "";
KeyBoardChar[2][4][2]  = "";
KeyBoardChar[2][4][3]  = "";
KeyBoardChar[2][4][4]  = "";
KeyBoardChar[2][4][5]  = "";
KeyBoardChar[2][4][6]  = "";
KeyBoardChar[2][4][7]  = "";
KeyBoardChar[2][4][8]  = "";
KeyBoardChar[2][4][9]  = "";
KeyBoardChar[2][4][10] = "";
KeyBoardChar[2][4][11] = "-";
KeyBoardChar[2][4][12] = ".";


//クラス設定
// アルファベット
KeyBoardClass[0][0][0]  = "KeyAlphA";
KeyBoardClass[0][0][1]  = "KeyAlphA";
KeyBoardClass[0][0][2]  = "KeyAlphA";
KeyBoardClass[0][0][3]  = "KeyAlphA";
KeyBoardClass[0][0][4]  = "KeyAlphA";
KeyBoardClass[0][0][5]  = "KeyAlphA";
KeyBoardClass[0][0][6]  = "KeyAlphA";
KeyBoardClass[0][0][7]  = "KeyAlphA";
KeyBoardClass[0][0][8]  = "KeyAlphA";
KeyBoardClass[0][0][9]  = "KeyAlphA";
KeyBoardClass[0][0][10] = "KeyAlphA";
KeyBoardClass[0][0][11] = "KeyAlphA";
KeyBoardClass[0][0][12] = "KeyAlphA";

KeyBoardClass[0][1][0]  = "KeyAlphA";
KeyBoardClass[0][1][1]  = "KeyAlphA";
KeyBoardClass[0][1][2]  = "KeyAlphA";
KeyBoardClass[0][1][3]  = "KeyAlphA";
KeyBoardClass[0][1][4]  = "KeyAlphA";
KeyBoardClass[0][1][5]  = "KeyAlphA";
KeyBoardClass[0][1][6]  = "KeyAlphA";
KeyBoardClass[0][1][7]  = "KeyAlphA";
KeyBoardClass[0][1][8]  = "KeyAlphA";
KeyBoardClass[0][1][9]  = "KeyAlphA";
KeyBoardClass[0][1][10] = "KeyAlphA";
KeyBoardClass[0][1][11] = "KeyAlphA";
KeyBoardClass[0][1][12] = "KeyAlphA";

KeyBoardClass[0][2][0]  = "KeyAlphB";
KeyBoardClass[0][2][1]  = "KeyAlphB";
KeyBoardClass[0][2][2]  = "KeyAlphB";
KeyBoardClass[0][2][3]  = "KeyAlphB";
KeyBoardClass[0][2][4]  = "KeyAlphB";
KeyBoardClass[0][2][5]  = "KeyAlphB";
KeyBoardClass[0][2][6]  = "KeyAlphB";
KeyBoardClass[0][2][7]  = "KeyAlphB";
KeyBoardClass[0][2][8]  = "KeyAlphB";
KeyBoardClass[0][2][9]  = "KeyAlphB";
KeyBoardClass[0][2][10] = "KeyAlphB";
KeyBoardClass[0][2][11] = "KeyAlphB";
KeyBoardClass[0][2][12] = "KeyAlphB";

KeyBoardClass[0][3][0]  = "KeyAlphB";
KeyBoardClass[0][3][1]  = "KeyAlphB";
KeyBoardClass[0][3][2]  = "KeyAlphB";
KeyBoardClass[0][3][3]  = "KeyAlphB";
KeyBoardClass[0][3][4]  = "KeyAlphB";
KeyBoardClass[0][3][5]  = "KeyAlphB";
KeyBoardClass[0][3][6]  = "KeyAlphB";
KeyBoardClass[0][3][7]  = "KeyAlphB";
KeyBoardClass[0][3][8]  = "KeyAlphB";
KeyBoardClass[0][3][9]  = "KeyAlphB";
KeyBoardClass[0][3][10] = "KeyAlphB";
KeyBoardClass[0][3][11] = "KeyAlphB";
KeyBoardClass[0][3][12] = "KeyAlphB";

KeyBoardClass[0][4][0]  = "KeyNothing";
KeyBoardClass[0][4][1]  = "KeyNothing";
KeyBoardClass[0][4][2]  = "KeyNothing";
KeyBoardClass[0][4][3]  = "KeyNothing";
KeyBoardClass[0][4][4]  = "KeyNothing";
KeyBoardClass[0][4][5]  = "KeyAlphB";
KeyBoardClass[0][4][6]  = "KeyAlphB";
KeyBoardClass[0][4][7]  = "KeyAlphB";
KeyBoardClass[0][4][8]  = "KeyAlphB";
KeyBoardClass[0][4][9]  = "KeyAlphB";
KeyBoardClass[0][4][10] = "KeyAlphB";
KeyBoardClass[0][4][11] = "KeyAlphB";
KeyBoardClass[0][4][12] = "KeyAlphB";

// カナ
KeyBoardClass[1][0][0]  = "KeyKanaA";
KeyBoardClass[1][0][1]  = "KeyKanaA";
KeyBoardClass[1][0][2]  = "KeyKanaA";
KeyBoardClass[1][0][3]  = "KeyKanaA";
KeyBoardClass[1][0][4]  = "KeyKanaA";
KeyBoardClass[1][0][5]  = "KeyKanaA";
KeyBoardClass[1][0][6]  = "KeyKanaA";
KeyBoardClass[1][0][7]  = "KeyKanaA";
KeyBoardClass[1][0][8]  = "KeyKanaA";
KeyBoardClass[1][0][9]  = "KeyKanaA";
KeyBoardClass[1][0][10] = "KeyKanaB";
KeyBoardClass[1][0][11] = "KeyKanaB";
KeyBoardClass[1][0][12] = "KeyKanaB";

KeyBoardClass[1][1][0]  = "KeyKanaB";
KeyBoardClass[1][1][1]  = "KeyKanaB";
KeyBoardClass[1][1][2]  = "KeyKanaB";
KeyBoardClass[1][1][3]  = "KeyKanaB";
KeyBoardClass[1][1][4]  = "KeyKanaB";
KeyBoardClass[1][1][5]  = "KeyKanaB";
KeyBoardClass[1][1][6]  = "KeyKanaB";
KeyBoardClass[1][1][7]  = "KeyNothing";
KeyBoardClass[1][1][8]  = "KeyKanaB";
KeyBoardClass[1][1][9]  = "KeyNothing";
KeyBoardClass[1][1][10] = "KeyKanaB";
KeyBoardClass[1][1][11] = "KeyKanaB";
KeyBoardClass[1][1][12] = "KeyKanaB";

KeyBoardClass[1][2][0]  = "KeyKanaB";
KeyBoardClass[1][2][1]  = "KeyKanaB";
KeyBoardClass[1][2][2]  = "KeyKanaB";
KeyBoardClass[1][2][3]  = "KeyKanaB";
KeyBoardClass[1][2][4]  = "KeyKanaB";
KeyBoardClass[1][2][5]  = "KeyKanaB";
KeyBoardClass[1][2][6]  = "KeyKanaB";
KeyBoardClass[1][2][7]  = "KeyKanaB";
KeyBoardClass[1][2][8]  = "KeyKanaB";
KeyBoardClass[1][2][9]  = "KeyKanaB";
KeyBoardClass[1][2][10] = "KeyKanaB";
KeyBoardClass[1][2][11] = "KeyKanaB";
KeyBoardClass[1][2][12] = "KeyKanaB";

KeyBoardClass[1][3][0]  = "KeyKanaB";
KeyBoardClass[1][3][1]  = "KeyKanaB";
KeyBoardClass[1][3][2]  = "KeyKanaB";
KeyBoardClass[1][3][3]  = "KeyKanaB";
KeyBoardClass[1][3][4]  = "KeyKanaB";
KeyBoardClass[1][3][5]  = "KeyKanaB";
KeyBoardClass[1][3][6]  = "KeyKanaB";
KeyBoardClass[1][3][7]  = "KeyNothing";
KeyBoardClass[1][3][8]  = "KeyKanaB";
KeyBoardClass[1][3][9]  = "KeyNothing";
KeyBoardClass[1][3][10] = "KeyKanaB";
KeyBoardClass[1][3][11] = "KeyKanaB";
KeyBoardClass[1][3][12] = "KeyNothing";

KeyBoardClass[1][4][0]  = "KeyKanaB";
KeyBoardClass[1][4][1]  = "KeyKanaB";
KeyBoardClass[1][4][2]  = "KeyKanaB";
KeyBoardClass[1][4][3]  = "KeyKanaB";
KeyBoardClass[1][4][4]  = "KeyKanaB";
KeyBoardClass[1][4][5]  = "KeyKanaB";
KeyBoardClass[1][4][6]  = "KeyKanaB";
KeyBoardClass[1][4][7]  = "KeyKanaB";
KeyBoardClass[1][4][8]  = "KeyKanaB";
KeyBoardClass[1][4][9]  = "KeyKanaB";
KeyBoardClass[1][4][10] = "KeyKanaB";
KeyBoardClass[1][4][11] = "KeyKanaB";
KeyBoardClass[1][4][12] = "KeyKanaB";

// 記号
KeyBoardClass[2][0][0]  = "KeyAlphB";
KeyBoardClass[2][0][1]  = "KeyAlphB";
KeyBoardClass[2][0][2]  = "KeyAlphB";
KeyBoardClass[2][0][3]  = "KeyAlphB";
KeyBoardClass[2][0][4]  = "KeyAlphB";
KeyBoardClass[2][0][5]  = "KeyAlphB";
KeyBoardClass[2][0][6]  = "KeyAlphB";
KeyBoardClass[2][0][7]  = "KeyAlphB";
KeyBoardClass[2][0][8]  = "KeyAlphB";
KeyBoardClass[2][0][9]  = "KeyAlphB";
KeyBoardClass[2][0][10] = "KeyAlphB";
KeyBoardClass[2][0][11] = "KeyAlphB";
KeyBoardClass[2][0][12] = "KeyNothing";

KeyBoardClass[2][1][0]  = "KeyAlphB";
KeyBoardClass[2][1][1]  = "KeyAlphB";
KeyBoardClass[2][1][2]  = "KeyAlphB";
KeyBoardClass[2][1][3]  = "KeyAlphB";
KeyBoardClass[2][1][4]  = "KeyAlphB";
KeyBoardClass[2][1][5]  = "KeyAlphB";
KeyBoardClass[2][1][6]  = "KeyAlphB";
KeyBoardClass[2][1][7]  = "KeyAlphB";
KeyBoardClass[2][1][8]  = "KeyAlphB";
KeyBoardClass[2][1][9]  = "KeyAlphB";
KeyBoardClass[2][1][10] = "KeyAlphB";
KeyBoardClass[2][1][11] = "KeyAlphB";
KeyBoardClass[2][1][12] = "KeyNothing";

KeyBoardClass[2][2][0]  = "KeyNothing";
KeyBoardClass[2][2][1]  = "KeyNothing";
KeyBoardClass[2][2][2]  = "KeyNothing";
KeyBoardClass[2][2][3]  = "KeyNothing";
KeyBoardClass[2][2][4]  = "KeyNothing";
KeyBoardClass[2][2][5]  = "KeyNothing";
KeyBoardClass[2][2][6]  = "KeyNothing";
KeyBoardClass[2][2][7]  = "KeyNothing";
KeyBoardClass[2][2][8]  = "KeyNothing";
KeyBoardClass[2][2][9]  = "KeyNothing";
KeyBoardClass[2][2][10] = "KeyNothing";
KeyBoardClass[2][2][11] = "KeyNothing";
KeyBoardClass[2][2][12] = "KeyNothing";

KeyBoardClass[2][3][0]  = "KeyNothing";
KeyBoardClass[2][3][1]  = "KeyNothing";
KeyBoardClass[2][3][2]  = "KeyNothing";
KeyBoardClass[2][3][3]  = "KeyNothing";
KeyBoardClass[2][3][4]  = "KeyNothing";
KeyBoardClass[2][3][5]  = "KeyNothing";
KeyBoardClass[2][3][6]  = "KeyNothing";
KeyBoardClass[2][3][7]  = "KeyNothing";
KeyBoardClass[2][3][8]  = "KeyNothing";
KeyBoardClass[2][3][9]  = "KeyNothing";
KeyBoardClass[2][3][10] = "KeyNothing";
KeyBoardClass[2][3][11] = "KeyNothing";
KeyBoardClass[2][3][12] = "KeyNothing";

KeyBoardClass[2][4][0]  = "KeyNothing";
KeyBoardClass[2][4][1]  = "KeyNothing";
KeyBoardClass[2][4][2]  = "KeyNothing";
KeyBoardClass[2][4][3]  = "KeyNothing";
KeyBoardClass[2][4][4]  = "KeyNothing";
KeyBoardClass[2][4][5]  = "KeyNothing";
KeyBoardClass[2][4][6]  = "KeyNothing";
KeyBoardClass[2][4][7]  = "KeyNothing";
KeyBoardClass[2][4][8]  = "KeyNothing";
KeyBoardClass[2][4][9]  = "KeyNothing";
KeyBoardClass[2][4][10] = "KeyNothing";
KeyBoardClass[2][4][11] = "KeyAlphB";
KeyBoardClass[2][4][12] = "KeyAlphB";
