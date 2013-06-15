/*****************************************************
 * Config package (namespace)
 *****************************************************/
var config = {};

// config.fps = 1; // なめらかなアニメーションにしたい場合は30 or 60を入れる
config.gameSpeed = 1; // デフォルト値 2,3と入れるとスピードも2,3倍する

config.canvas = {
    // iphone4サイズ
    width   : 320,
    height  : 480,
};

config.block = {
    // canvas横幅に20個のブロック, 1はブロック間の隙間
    size : (config.canvas.width / 20) - 1,
};

