BasicGame.Preloader = function(game) {

    this.ready = false;

};

BasicGame.Preloader.prototype = {

    preload: function() {

        // Add a loading label 
        var loadingLabel = this.add.text(this.game.world.centerX, game.world.centerY - 80, 'loading...', {
            font: 'bold 40px Arial',
            fill: '#606060'
        });
        loadingLabel.anchor.setTo(0.5, 0.5);

        // Add a progress bar
        var progressBar = this.add.sprite(this.game.world.centerX, game.world.centerY, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        progressBar.scale.set(2);
        this.load.setPreloadSprite(progressBar);

        // Load all assets
        this.load.spritesheet('mute', 'assets/images/muteButton.png', 28, 22);

        //	Here we load the rest of the assets our game needs.
        //	+ lots of other required assets here


        this.load.spritesheet('jewels', 'assets/images/jewels80_72.png', 80, 72);

        this.load.image('bigjewel', 'assets/images/diamondbig.png');

        this.load.spritesheet('leaderboard', 'assets/images/leaderboard_276_52_2.png', 276, 52 );

        // emmiter images

        this.load.image('pix0', 'assets/images/frame0pix.png');
        this.load.image('pix1', 'assets/images/frame1pix.png');
        this.load.image('pix2', 'assets/images/frame2pix.png');
        this.load.image('pix3', 'assets/images/frame3pix.png');

        // sounds

        this.load.audio('endgame', ['assets/sounds/endgame.mp3', 'assets/sounds/endgame.ogg']);
        this.load.audio('explosion', ['assets/sounds/explosion.mp3', 'assets/sounds/explosion.ogg']);
        this.load.audio('nonclick', ['assets/sounds/nonclick.mp3', 'assets/sounds/nonclick.ogg']);
        this.load.audio('points', ['assets/sounds/points.mp3', 'assets/sounds/points.ogg']);
        this.load.audio('startgame', ['assets/sounds/startgame.mp3', 'assets/sounds/startgame.ogg']);
        this.load.audio('titleMusic', ['assets/sounds/Distant_Gaze.mp3', 'assets/sounds/Distant_Gaze.ogg']);

    },

    create: function() {

        //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        //this.preloadBar.cropEnabled = false;

    },

    update: function() {

        //	You don't actually need to do this, but I find it gives a much smoother game experience.
        //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
        //	You can jump right into the menu if you want and still play the music, but you'll have a few
        //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
        //	it's best to wait for it to decode here first, then carry on.

        //	If you don't have any music in your game then put the game.state.start line into the create function and delete
        //	the update function completely.

        if (this.cache.isSoundDecoded('titleMusic') && this.ready == false) {
            this.ready = true;

            // add in music
            BasicGame.music = this.add.audio('titleMusic');
            BasicGame.music.play('', 0, 0.3, true);
            this.state.start('MainMenu');
        }

    }

};