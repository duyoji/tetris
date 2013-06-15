app.events.KeyboardEvent = (function() {
    var _instance = null;

    var keys = {
        ignore_keys : [
            9,   // Tab
            13,  // Enter
            16,  // Shift
            17,  // Ctrl
            18,  // Alt
        ],
        spin_left_keys : [
            32, // 'space'
            90  // 'z'
        ],
        spin_right_keys : [
            38, // '↑'
            88  // 'x'
        ],
        move_left  : 37, // '←'
        move_right : 39, // '→'
        move_down  : 40  // '↓'
    };


    // var SPIN_LEFT  = 1;
    // var SPIN_RIGHT = -1;
    // var MOVE_LEFT  = 0;
    // var MOVE_DOWN  = 1;
    // var MOVE_RIGHT = 2;

    var onSpinHandler = function (spinIndex) {};
    var onMoveHandler = function (moveIndex) {};

    function keyDown (e) {
        // e.preventDefault();
        var keyCode = e.keyCode;
        var i,n;

        for (i = 0, n = keys.ignore_keys.length; i < n; i++) {
            if (keys.ignore_keys[i] === keyCode) {
                // console.log('ignore key!');
                return;
            }
        }

        for (i = 0, n = keys.spin_left_keys.length; i < n; i++) {
            if (keys.spin_left_keys[i] === keyCode) {
                // console.log('spin left!');
                onSpinHandler(app.events.type.KeyboardEventType.SPIN.LEFT);
                return;
            }
        }

        for (i = 0, n = keys.spin_right_keys.length; i < n; i++) {
            if (keys.spin_right_keys[i] === keyCode) {
                // console.log('spin right!');
                onSpinHandler(app.events.type.KeyboardEventType.SPIN.RIGHT);
                return;
            }
        }

        if (keys.move_left === keyCode) {
            // console.log ('move left!');
            onMoveHandler(app.events.type.KeyboardEventType.MOVE.LEFT);
            return;
        }

        if (keys.move_right === keyCode) {
            // console.log ('move right!');
            onMoveHandler(app.events.type.KeyboardEventType.MOVE.RIGHT);
            return;
        }

        if (keys.move_down === keyCode) {
            // console.log ('move down!');
            onMoveHandler(app.events.type.KeyboardEventType.MOVE.DOWN);
            return;
        }

        // console.log(this + ' : other kc : ' + e.keyCode);
    }

    /**
     * コンストラクタ
     */
    function KeyboardEvent() {}

    //setter, getterのハンドラーはローカルメンバで所持
    KeyboardEvent.prototype = {
        set onSpinHandler (handler) {
            onSpinHandler = handler;
        },
        get onSpinHandler () {
            return onSpinHandler;
        },

        set onMoveHandler (handler) {
            onMoveHandler = handler;
        },
        get onMoveHandler () {
            return onMoveHandler;
        }
    };

    KeyboardEvent.prototype.addListeners = function (window) {
        this.removeListeners();
        window.addEventListener("keydown", keyDown);
    };

    KeyboardEvent.prototype.removeListeners = function () {
        window.removeEventListener("keydown", keyDown);
    };

    return {
        getInstance : function () {
            if (!_instance) {
                _instance = new KeyboardEvent();
            }

            return _instance;
        }
    };
}());