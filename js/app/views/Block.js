// 落下するブロックは必ず一つだけなのでsingletonで管理
// 落下が終わったときてブロックの形を再定義するときはinitで初期化する

app.views.Block = (function() {
    // private static var
    var _blocks = [
        [ [0, -1], [0, 0], [ 0,  1], [ 0,  2] ], // 縦棒
        [ [0, -1], [0, 0], [ 1,  0], [-1,  0] ], // ピラミッド
        [ [0, -1], [0, 0], [ 1,  0], [ 1, -1] ], // 四角
        [ [0, -1], [0, 0], [-1,  0], [ 1, -1] ], // 右上, 左下, 中2
        [ [0, -1], [0, 0], [ 1,  0], [-1, -1] ], // 左上, 右下, 中2
        [ [0, -1], [0, 0], [ 0,  1], [-1,  1] ], // 中3, 左下
        [ [0, -1], [0, 0], [ 0,  1], [ 1,  1] ]  // 中3, 右下
    ];
    var classsName = 'Block';
    var _instance  = null;

    function Block() {
        this.init();
    }

    // prototype public method

    Block.prototype = {
        getClassName : function() {
            return className;
        },

        get datas() {
            return this._datas;
        }
    };

    Block.prototype.init = function () {
        this._index = Math.floor(Math.random()*_blocks.length);
        this._datas = _blocks[this._index];
    };

    /**
     * [ description]
     * @param  {[type]} spinIndex 1 or -1 回転方向
     * @return {[type]}           [description]
     */
    Block.prototype.spin = function (spinIndex) {
        // 四角だったらスピンさせない
        if (this._index === 2) {
            return this;
        }

        var i,n;
        for (i = 0, n = this.datas.length; i < n; i++) {
            var tmpX = this.datas[i][0];
            var x1 = this.datas[i][1] * (-spinIndex);
            var y1 = tmpX * spinIndex;
            this.datas[i][0] = x1;
            this.datas[i][1] = y1;
        }

        return this;
    };

    // return Block;
    return {
        getInstance : function () {
            if (!_instance) {
                _instance = new Block();
            }
            return _instance;
        }
    };
})();