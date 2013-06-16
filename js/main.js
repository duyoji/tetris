(function (window) {

    // import
    var GameController = app.controllers.GameController;

    window.addEventListener('load', main);

    // import
    function main(event) {
        var gc = new GameController();
        // 何かGameControllerインスタンスをいじる処理があれば以降に記述

        var startButton = document.getElementById('start_button');
        var pauseButton = document.getElementById('pause_button');

        startButton.addEventListener("click", function () {
            gc.start();
        });

        pauseButton.addEventListener("click", function () {
            gc.pause();
        });
    }

    /*
    function gamePlay () {
        var gc = new GameController();
        gc.start();
    }

    function gamePause () {
        var audio = document.getElementById('audio');
        audio.pause();
    }

    function gameRetry () {

    }

    function stop () {
        var audio = document.getElementById('audio');
        audio.pause();
        audio.currentTime = 0;
    }
    */
})(window)