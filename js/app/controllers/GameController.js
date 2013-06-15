//初期化
(function (window) {
    // import
    var Block         = app.views.Block;
    var KeyboardEvent = app.events.KeyboardEvent;

    // private member
    var _block = Block.getInstance();
    var x = 10; // dummy ブロック表示位置関連
    var y = 4;  // dummy ブロック表示位置関連


    window.addEventListener('load', gameStart);

    function gameStart (event) {
        // キーボードイベント
        var kbInstance = KeyboardEvent.getInstance();
        kbInstance.addListeners(window);
        kbInstance.onSpinHandler = function (spinIndex) {
            clearCanvas();
            _block.spin(spinIndex);
            drawBlock(_block.datas);
        };

        kbInstance.onMoveHandler = function (moveIndex) {
            moveBlock(moveIndex);
        };
        // KerboardEvent.initWithWindow(window);
        // KerboardEvent.remove();

        // canvas
        var canvas                      = document.createElement('canvas');
        canvas.width                    = config.canvas.width;
        canvas.height                   = config.canvas.height;
        canvas.style.background         = '#c0c0c0';
        config.canvas.context           = config.canvas.context || canvas.getContext('2d');
        config.canvas.context.fillStyle = 'rgb(0, 0, 0)';

        document.body.appendChild(canvas);

        // ブロックをランダムに表示
        drawBlock(_block.datas);
    }

    // ゲームのアップデート一元管理
    function update () {
        // 各フィールドのインスタンスの更新をこの関数(update)で呼び出す

    }

    function moveBlock(moveIndex) {
        clearCanvas();

        if (moveIndex === app.events.type.KeyboardEventType.MOVE.LEFT) {
            x--;
        } else if (moveIndex === app.events.type.KeyboardEventType.MOVE.RIGHT) {
            x++
        } else if (moveIndex === app.events.type.KeyboardEventType.MOVE.DOWN) {
            y++
        } else {
            throw new Error ('値が不正');
        }

        drawBlock(_block.datas);
    }

    // ブロックの初期化(新しい形にして一番上から降らせる)
    function initBlock(block) {
        _block.init();
        clearCanvas();
        drawBlock(_block.datas);
    }

    function clearCanvas() {
        config.canvas.context.beginPath();
        config.canvas.context.clearRect(0, 0, config.canvas.width, config.canvas.height);
    }

    function drawBlock (blockDatas) {
        for (i = 0, n = blockDatas.length; i < n; i++) {
            var x1 = blockDatas[i][0];
            var y1 = blockDatas[i][1];
            config.canvas.context.fillRect(
                (x + x1) * (config.block.size + 1),
                (y + y1) * (config.block.size + 1),
                config.block.size,
                config.block.size
            );
        }
        console.log('test size : ' + config.block.size);
    }
})(window);