
BasicGame.Game = function (game) {

this.grideSizeX = 7;
this.grideSizeY = 8;

};

BasicGame.Game.prototype = {

	create: function () {

		BasicGame.dotsSelected = 0;

		this.dots = new Dots(this.game);
		this.dots.createGW(this.grideSizeX, this.grideSizeY);

		// Call 'clicked' when the user clicks
		this.game.input.onDown.add(this.clicked, this);
	},

	update: function () {

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

	},

	clicked: function () {
		// If dots are already selected, do nothing
		if (BasicGame.dotsSelected != 0) {
			return;
		}

		// Return the dot that is below the pointer
		// If there is no dot, do nothing
		var dot = this.dots.findClickedDot(50);
		if (!dot) {
			return;
		}

		// Set 'dot.selected = true' to all the dots that should be removed
		// If only 1 dot is selected: do nothing
		this.dots.selectDots(dot.i, dot.j, dot.frame);
		if (BasicGame.dotsSelected == 1) {
			this.dots.setAll('selected', false);
			BasicGame.dotsSelected = 0;
			return;
		}

		// remove the dots and update score
		this.dots.removeSelectedDots(this.grideSizeX, this.grideSizeY);
		//this.updateScore();

		// Once the dots finish disapearing: refill the world with dots
		this.game.time.events.add(300, this.refillDots, this);
	},

	refillDots: function () {
		this.dots.moveDotsDown(this.grideSizeX, this.grideSizeY);
		this.dots.addMissingDots(this.grideSizeX, this.grideSizeY);

		BasicGame.dotsSelected = 0;
	},

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
