/**
 * ゲームのメインビュー(ステージとブロックを表示する)
 */
app.views.GameView = (function () {

    // import
    var Block = app.views.Block;
    // var GameModel = 用意する  // 積まれたブロック情報を保持する(記憶)

    // static
    var BLOCK_NO   = 0; // まだブロックが置かれていない状態
    var BLOCK_MOVE = 1; // 移動中の状態
    var BLOCK_PUT  = 2; // これ以上下に移動できない配置された状態

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
        this._context.fillStyle = config.color.gray;
        this._isOver       = false; // ゲームオーバーフラグ
        this._blockX       = 0;
        this._blockY       = 0;
        this._block        = Block.getInstance();
        this._blockMap = this.initBlockMap();
        this.initBlock();

        // 描画
        this.drawBlockMap();
    };

    // ブロック初期化
    GameView.prototype.initBlock = function () {
        this._blockX       = this._blockMap[0].length / 2; // ステージマップ中央
        this._blockY       = 1;
        this._block.init();
    };

    // ブロックマップ初期化
    GameView.prototype.initBlockMap = function () {
        var i,j;
        var blockMap = [];
        var maxX = config.canvas.width / (config.block.size + 1);
        var maxY = config.canvas.height / (config.block.size + 1);

        for (i = 0; i < maxY; i++) {
            var xLine = [];
            for (j = 0; j < maxX; j++) {
                xLine.push(BLOCK_NO);
            }
            blockMap.push(xLine);
        }

        return blockMap;
    };

    GameView.prototype.update = function () {
        if (this._isOver) {
            console.log('ゲームオーバー');
            return;
        }

        var downIndex  = app.events.type.KeyboardEventType.MOVE.DOWN;
        var mapXLength = this._blockMap[0].length; // mapのx軸方向の要素数
        var i,n;


        // 下に出来なければthis._blockMapにブロックを描画してブロックを初期化
        if (!this.canMove(downIndex)) {
            var blockDatas = this._block.datas;

            // TODOリファクタリング
            for (i = 0, n = this._block.datas.length; i < n; i++) {
                var dataX = blockDatas[i][0];
                var dataY = blockDatas[i][1];
                var mapX  = this._blockX + dataX;
                var mapY  = this._blockY + dataY;

                this._blockMap[mapY][mapX] = BLOCK_PUT;
            }


            this.initBlock();
        }

        this.drawBlockMap();


        // ゲームオーバーしたかチェック
        // this._blockMap[0]の行に一つでもブロックがあれば終わり
        for (i = 0, n = mapXLength; i < n; i ++) {
            if (this._blockMap[0][i] === BLOCK_PUT) {
                this._isOver = true;

                // TODO ゲームオーバーの見た目考える
                alert('ゲームオーバー');

                break;
            }
        }
    };

    /**
     * [キャンパスをクリアする]
     * @return {[type]} [description]
     */
    GameView.prototype.clearCanvas = function () {
        // this._context.beginPath();
        this._context.clearRect(0, 0, config.canvas.width, config.canvas.height);
    };

    GameView.prototype.spinBlock = function (spinIndex) {
        if (this.canSpin(spinIndex)) {
            this.drawBlockMap();
        }
    };

    GameView.prototype.moveBlock = function (moveIndex) {
        // var canMove = this.canMove(moveIndex);
        if (this.canMove(moveIndex)) {
            this.drawBlockMap();
        }
    };

    // 移動前に左,右,下のそれぞれを確認して回転できるかチェック
    GameView.prototype.canSpin = function (spinIndex) {
        var canSpin = true;
        var mapYLength = this._blockMap.length;    // mapのy軸方向の要素数
        var mapXLength = this._blockMap[0].length; // mapのx軸方向の要素数

        this._block.spin(spinIndex);

        if (!this.canPutBlock(this._block.datas))  {
            this._block.spin(-spinIndex);
            canSpin = false;
        }

        return canSpin;
    };

    // 移動前に左,右,下のそれぞれを確認して移動できるかチェック
    GameView.prototype.canMove = function (moveIndex) {
        // 移動した後に移動できない状態であったらもとの値に戻すために値を保持する
        var moveX = 0;
        var moveY = 0;
        var canMove = true;

        if (moveIndex === app.events.type.KeyboardEventType.MOVE.LEFT) {
            moveX = -1;
        } else if (moveIndex === app.events.type.KeyboardEventType.MOVE.RIGHT) {
            moveX = 1;
        } else if (moveIndex === app.events.type.KeyboardEventType.MOVE.DOWN) {
            moveY = 1;
        } else {
            throw new Error ('値が不正');
        }

        this._blockX += moveX;
        this._blockY += moveY;

        if (!this.canPutBlock(this._block.datas))  {
            this._blockX -= moveX;
            this._blockY -= moveY;
            canMove = false;
        }

        return canMove;
    };

    GameView.prototype.canPutBlock = function (blockDatas) {
        var canPut = true;
        var mapYLength = this._blockMap.length;    // mapのy軸方向の要素数
        var mapXLength = this._blockMap[0].length; // mapのx軸方向の要素数

        for (i = 0, n = blockDatas.length; i < n; i++) {
            var dataX = blockDatas[i][0];
            var dataY = blockDatas[i][1];
            var mapX  = this._blockX + dataX;
            var mapY  = this._blockY + dataY;

            // マップステージの端より外に出ようとしたら移動禁止 (値を元に戻す)
            if (mapX < 0 || mapX > mapXLength - 1 || mapY > mapYLength - 1) {
                canPut = false;
                break;
            }

            // 移動先に既にブロックが存在すれば移動禁止 (値を元に戻す)
            if (this._blockMap[mapY][mapX] === BLOCK_PUT) {
                canPut = false;
                break;
            }
        }

        return canPut;
    };

    // マップ全体を描画 (今まで配置したブロックを含める)
    GameView.prototype.drawBlockMap = function () {
        var mapYLength = this._blockMap.length;    // mapのy軸方向の要素数
        var mapXLength = this._blockMap[0].length; // mapのx軸方向の要素数
        var i,n;
        var j,m;

        this.clearCanvas();

        for (i = 0, n = mapYLength; i < n; i++) {
            for (j = 0, m = mapXLength; j < m; j++) {
                var state = this._blockMap[i][j];
                if (state === BLOCK_NO) {
                    this._context.fillStyle = config.color.gray;
                } else {
                    this._context.fillStyle = config.color.black;
                }
                this.putBlock(j, i);
            }
        }

        this.drawBlock(this._block.datas);
    };

    // 現在操作しているブロックを描画する
    GameView.prototype.drawBlock = function (blockDatas) {
        this._context.fillStyle = config.color.black;
        for (i = 0, n = blockDatas.length; i < n; i++) {
            var dataX = blockDatas[i][0];
            var dataY = blockDatas[i][1];
            var mapX  = this._blockX + dataX;
            var mapY  = this._blockY + dataY;

            this.putBlock(mapX, mapY);
        }
    };

    // x,y座標をもらってconfig.block.size分の大きさのブロックを描画する
    GameView.prototype.putBlock = function (x, y) {
        this._context.fillRect(
            x * (config.block.size + 1),
            y * (config.block.size + 1),
            config.block.size,
            config.block.size
        );
    };

    return GameView;
})();