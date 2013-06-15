/**
 * ゲームのメインビュー(ステージとブロックを表示する)
 */
app.views.GameView = (function () {

    // import
    var Block = app.views.Block;
    var KeyboardEvent = app.events.KeyboardEvent;

    /**
     * コンストラクタ
     */
    function GameView() {
        this.init();
    }

    /**
     * 初期化
     */
    GameView.prototype.init = function () {
        var canvas                      = document.createElement('canvas');
        canvas.width                    = config.canvas.width;
        canvas.height                   = config.canvas.height;
        canvas.style.background         = '#c0c0c0';
        document.body.appendChild(canvas);

        this._context           = canvas.getContext('2d');
        this._context.fillStyle = 'rgb(0, 0, 0)';
        this._blockX = 10;
        this._blockY = 10;
        this._block = Block.getInstance();

        // test
        this.drawBlock(this._block.datas);
    };

    GameView.prototype.update = function () {
        console.log('gameview update !!!!!!!!!!!!!!!');
    };

    /**
     * [キャンパスをクリアする]
     * @return {[type]} [description]
     */
    GameView.prototype.clearCanvas = function () {
        this._context.beginPath();
        this._context.clearRect(0, 0, config.canvas.width, config.canvas.height);
    };

    GameView.prototype.moveBlock = function (moveIndex) {
        this.clearCanvas();

        // if (moveIndex === app.events.type.KeyboardEventType.MOVE.LEFT) {
        //     x--;
        // } else if (moveIndex === app.events.type.KeyboardEventType.MOVE.RIGHT) {
        //     x++
        // } else if (moveIndex === app.events.type.KeyboardEventType.MOVE.DOWN) {
        //     y++
        // } else {
        //     throw new Error ('値が不正');
        // }

        // バリデート
        // 左に移動できるかチェック
        // 右に移動できるかチェック
        // 下に移動できるかチェック

        //上記のバリデートに引っかからなかったらブロックを移動する
        // drawBlock(_block.datas);
    };

    // ブロックの初期化(新しい形にして一番上から降らせる)


    // ゲームマップで記入
    // function initBlock(block) {
    //     _block.init();
    //     clearCanvas();
    //     drawBlock(_block.datas);
    // }

    GameView.prototype.drawBlock = function (blockDatas) {
        for (i = 0, n = blockDatas.length; i < n; i++) {
            var x1 = blockDatas[i][0];
            var y1 = blockDatas[i][1];
            this._context.fillRect(
                (this._blockX + x1) * (config.block.size + 1),
                (this._blockY + y1) * (config.block.size + 1),
                config.block.size,
                config.block.size
            );
        }
    };



    return GameView;
})();