// 落下するブロックは必ず一つだけなのでsingletonで管理
// 落下が終わったときてブロックの形を再定義するときはinitで初期化する

app.views.Block = (function() {
    // private static var
    var _blocks = [
        [ [0, -1], [0, 0], [ 0,  1], [ 0,  2] ],
        [ [0, -1], [0, 0], [ 1,  0], [-1,  0] ],
        [ [0, -1], [0, 0], [ 1,  0], [ 1, -1] ],
        [ [0, -1], [0, 0], [-1,  0], [ 1, -1] ],
        [ [0, -1], [0, 0], [ 1,  0], [-1, -1] ],
        [ [0, -1], [0, 0], [ 0,  1], [-1,  1] ],
        [ [0, -1], [0, 0], [ 0,  1], [ 1,  1] ]
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
        var index = Math.floor(Math.random()*_blocks.length);
        this._datas = _blocks[index];
    };

    /**
     * [ description]
     * @param  {[type]} spinIndex 1 or -1 回転方向
     * @return {[type]}           [description]
     */
    Block.prototype.spin = function (spinIndex) {
        var i,n;
        console.log ('si : ' + spinIndex);
        console.log(this.block);
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