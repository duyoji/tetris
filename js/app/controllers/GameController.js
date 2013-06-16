/**
 * ゲームマップとキーボードイベントの管理
 */
app.controllers.GameController = (function () {

    // import
    var GameView = app.views.GameView;
    var KeyboardEvent = app.events.KeyboardEvent;

    /**
     * コンストラクタ
     */
    function GameController() {
        this.init();
    }

    /**
     * 初期化
     */
    GameController.prototype.init = function () {
        this._audio = document.getElementById('audio');
        this._audio.pause();
        this._isStart = false;
        this._isOver  = false; // ゲームオーバーフラグ
        this._isPause = false; // 一時中断フラグ
        this._gameView = new GameView(this);
        this.setKeyboardEvent();
        this._gameSpeed = config.gameSpeed;
        this._timerId = null;
    };

    GameController.prototype.start = function () {
        // 初期スタート, 一時停止, ゲームオーバー以外のスタートボタンを聞かないようにする
        if (this._isPause) {
            this._isPause = false;
            this._audio.play();
        } else if (!this._isStart || this._isOver) {
            this._isStart = true;
            this._isOver  = false;
            this._isPause = false;
            this._audio.play();
            this._gameView.init();

            if (this._timerId) {
                clearTimeout( this._timerId );
            }
            this.update();
        }
    };

    GameController.prototype.pause = function () {
        if (!this._isStart) {
            alert('ゲームを開始していない');
            return;
        }

        this._isPause = true;
        this._audio.pause();
    };

    GameController.prototype.over = function () {
        this._audio.pause();
        this._audio.currentTime = 0;
        this._isOver = true;
    };

    /**
     * [ゲームのアップデート一元管理]
     * @return {[type]} [description]
     */
    GameController.prototype.update = function () {
        var self = this;
        this._timerId = setTimeout(function () {
            self.update();
        }, 1000/config.gameSpeed);

        if (this._isOver) {
            console.log('終了');
            return;
        }

        if (this._isPause) {
            console.log('一時中断');
            return;
        }

        // 各フィールドのインスタンスの更新をこの関数(update)で呼び出す
        this._gameView.update();
    };

    GameController.prototype.setKeyboardEvent = function () {
        var kbInstance = KeyboardEvent.getInstance();
        var self = this;

        kbInstance.onSpinHandler = function (spinIndex) {
            self._gameView.spinBlock(spinIndex);
        };

        kbInstance.onMoveHandler = function (moveIndex) {
            self._gameView.moveBlock(moveIndex);
        };
    };

    return GameController;
})();