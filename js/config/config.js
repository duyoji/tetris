/*****************************************************
 * Config package (namespace)
 *****************************************************/
var config = {};

config.canvas = {
    // iphone4サイズ
    width   : 320,
    height  : 480,

    // GameControllerで値代入(既に値が入っていれば代入しない)
    context : null,　
};

config.block = {
    // canvas横幅に20個のブロック, 1はブロック間の隙間
    size : (config.canvas.width / 20) - 1,
};

