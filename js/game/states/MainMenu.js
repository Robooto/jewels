BasicGame.MainMenu = function(game) {

};

BasicGame.MainMenu.prototype = {

    create: function() {

        // load big diamond
        var bigD = this.game.add.sprite(game.world.centerX, 370, 'bigjewel');
        bigD.anchor.setTo(0.5);

        // leaderboard button
        var leaderboardButton = this.game.add.button(game.world.centerX, this.game.height - 40, 'leaderboard', this.openLeaderboard, this, 1, 0);
        leaderboardButton.anchor.setTo(0.5);
        // if the mouse is over the button, it becomes a hand
        leaderboardButton.input.useHandCursor = true;

        // emitter for fun
        var menuEmitter = game.add.emitter(game.world.centerX, this.game.height);
        menuEmitter.makeParticles('jewels', [0, 1, 2, 3], 20);
        menuEmitter.start(false, 6000);
        menuEmitter.setYSpeed(-105, -400);
        menuEmitter.setXSpeed(-100, 100);

        // Name of the game
        var nameLabel = game.add.text(game.world.centerX, 390, 'Sam Jeweled', {
            font: 'bold 70px Arial',
            fill: '#606060'
        });
        nameLabel.anchor.setTo(0.5, 0.5);



        // How to start the game
        var startLabel = game.add.text(game.world.centerX, 900, 'Tap the screen to Start', {
            font: '26px Arial',
            fill: '#606060'
        });
        startLabel.anchor.setTo(0.5, 0.5);

        game.add.tween(startLabel).to({
            angle: -2
        }, 500).to({
            angle: 2
        }, 500).loop().start();

        // Display top score
        var scoreName = localStorage.getItem('samJeweledName');

        var highScore = BasicGame.highScore;

        if (highScore) {
            var highScoreText = game.add.text(game.world.centerX, game.world.centerY + 55, 'Top Score: ' + highScore, {
                font: '36px Arial',
                fill: '#606060'
            });
            highScoreText.anchor.setTo(0.5, 0.5);
        }

        // place holder for next best score from db
        var nextScore = BasicGame.scoreToBeat;

        if (nextScore) {
            var nextScoreText = game.add.text(game.world.centerX, game.world.centerY + 150, 'Rival Score: ' + nextScore, {
                font: '36px Arial',
                fill: '#606060'
            });
            nextScoreText.anchor.setTo(0.5, 0.5);


            if (highScore > nextScore) {
                var newHighScoreText = this.game.add.text(game.world.centerX + 170, game.world.centerY + 50, 'Beat Rival\'s Score!', {
                    font: '18px Arial',
                    fill: '#40ccff'
                });
                newHighScoreText.angle = 45;
                var highScoreTween = this.game.add.tween(newHighScoreText.scale).to({
                    x: 1.3,
                    y: 1.3,
                }, 500).to({
                    x: 1,
                    y: 1
                }, 500).loop().start();
            }
        }

        // Add a mute button
        this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound, this);
        this.muteButton.input.useHandCursor = true;
        this.muteButton.scale.setTo(2);
        if (game.sound.mute) {
            this.muteButton.frame = 1;
        }

        // start the game on tap
        this.game.input.onDown.addOnce(this.start, this);

        // start game sound
        this.startsound = this.add.audio('startgame');

    },

    toggleSound: function() {
        game.sound.mute = !game.sound.mute;
        this.muteButton.frame = game.sound.mute ? 1 : 0;
    },

    openLeaderboard: function() {
        // change this to the leaderboard url
        alert("Leaderboard");
    },

    start: function() {
        this.startsound.play();
        game.state.start('Game');
    }

};