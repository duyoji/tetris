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
        this._gameView = new GameView();
        this.setKeyboardEvent();
        this._gameSpeed = config.gameSpeed;

        this.start();
    };

    /**
     * [ゲーム開始(initでwindow.addEventListenerリスナー)]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    GameController.prototype.start = function (event) {
        this.update();
    };

    /**
     * [ゲームのアップデート一元管理]
     * @return {[type]} [description]
     */
    GameController.prototype.update = function () {
        // 各フィールドのインスタンスの更新をこの関数(update)で呼び出す
        this._gameView.update();


        var self = this;
        setTimeout(function () {
            self.update();
        }, 1000/config.gameSpeed);
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