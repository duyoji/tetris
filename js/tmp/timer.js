/* timer.js */

//グローバル変数定義
var ctx;
var x = 10, y = 0; //四角形を表示する座標

//初期化
window.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 240;
    document.body.appendChild( canvas );
    ctx = canvas.getContext("2d");

    timerfunc();
}

function timerfunc() {
    ctx.fillStyle = "rgb(0, 0, 0)"
    ctx.fillRect(x*16, y*16, 15, 15);
    y++;
    if(y > 15) y=15;

    setTimeout("timerfunc()", 1000);
}