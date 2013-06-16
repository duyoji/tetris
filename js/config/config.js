/*****************************************************
 * Config package (namespace)
 *****************************************************/
var config = {};

// config.fps = 60; // なめらかなアニメーションにしたい場合は30 or 60を入れる
config.gameSpeed = 10; // デフォルト値 2,3と入れるとスピードも2,3倍する

config.canvas = {
    // iphone4サイズ
    width   : 320,
    height  : 480,
};

config.color = {
    gray  : 'rgb(200, 200, 200)',
    black : 'rgb(0, 0, 0)'
};

config.block = {
    // canvas横幅に20個のブロック, 1はブロック間の隙間
    size : (config.canvas.width / 20) - 1,
};