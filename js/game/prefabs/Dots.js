var Dots = function(game) {
	Phaser.Group.call(this, game);

	this.createMultiple(60, 'dots');
	this.setAll('inputEnabled', true);
	this.setAll('input.useHandCursor', true);

};

// creating a prefab that inherites phaser group methods
Dots.prototype = Object.create(Phaser.Group.prototype);
Dots.prototype.constructor = Dots;

Dots.prototype.createGW = function (gridSizeX, gridSizeY) {

	// Go through the grid (7x7)
    for (var i = 0; i < gridSizeX; i++) {
        for (var j = 0; j < gridSizeY; j++) {
            // Create a dot at each spot
            this.addDot(i, j);	
            }
        }
};

Dots.prototype.addDot = function (i, j) {
	// Retrive a dead dot from the group
    var dot = this.getFirstDead();
    if (!dot) {
    	return;
    	}
    	
    // Init the dot
    dot.scale.setTo(1, 1);
	dot.reset(30 + i*dot.width, 70 + j*dot.height);	
	dot.anchor.setTo(0.5, 0.5);
	dot.frame = game.rnd.integerInRange(0, 3);

	// Add custom parameters to the dot
	dot.i = i;
	dot.j = j;
	dot.selected = false;

	// Tween
	dot.scale.setTo(0, 0);
	this.game.add.tween(dot.scale).to({x: 1, y: 1}, 200).start();
};

Dots.prototype.findClickedDot = function(tileSize) {
	var x = game.input.activePointer.x, y = game.input.activePointer.y;
		
	// Convert the x, y point into i,j value
	var i = Math.floor((x-30+25)/tileSize);
	var j = Math.floor((y-70+25)/tileSize);
		
	return this.getDot(i, j);
};

Dots.prototype.selectDots = function(i, j, frame) {
	// Get the corresponding dot
	var dot = this.getDot(i, j);
	if (!dot) {
		return;
	}

	// If the dot maches the color we are looking for (the same frame)
	if (dot.frame == frame && !dot.selected) {
		// Then select the dot
		dot.selected = true;
		BasicGame.dotsSelected += 1;

		// And recursively call the function for all the adjacent dots
		this.selectDots(i, j-1, frame);
		this.selectDots(i, j+1, frame);
		this.selectDots(i-1, j, frame);
		this.selectDots(i+1, j, frame);			
	}	
};

// return the do i, j
Dots.prototype.getDot = function(i, j) {
	var dotIJ;

	// We go through every dots to find the one we are looking for
	this.forEachAlive(function(dot) {
		if (dot.i == i && dot.j == j) {
				dotIJ = dot;
		}
	}, this);

	return dotIJ;
};

Dots.prototype.removeSelectedDots = function(gridSizeX, gridSizeY) {
	// Go through all the dots
	for (var i = 0; i < gridSizeX; i++) {
        for (var j = 0; j < gridSizeY; j++) {
           	var dot = this.getDot(i, j);

			if (dot.selected) {
				// If the dot is selected, kill it with a tween
                this.game.add.tween(dot.scale).to({x: 0, y: 0}, 200).start();
                dot.alive = false;
			}
		}
	}
};

Dots.prototype.moveDotsDown = function(gridSizeX, gridSizeY) {
		// Go through the grid
    for (var i = 0; i < gridSizeX; i++) {
        var moveBy = 0;

    for (var j = gridSizeY-1; j >= 0; j--) {
            var dot = this.getDot(i, j);

            if (!dot) {
                // If a dot is missing
                // It means that the dots above will have to move down
                moveBy += 1;
            }
            else if (moveBy > 0) {
                // If there is a dot, and it should move down
                // Move it down by the correct amount (moveBy)
            	this.setDot(i, j, j+moveBy);
                this.game.add.tween(dot).to({y: dot.y + moveBy*dot.height}, 200).start();
            }
        }
    }
};

Dots.prototype.addMissingDots = function(gridSizeX, gridSizeY) {
	// Go through the grid
    for (var i = 0; i < gridSizeX; i++) {
        for (var j = gridSizeY-1; j >= 0; j--) {
            var dot = this.getDot(i, j);

            if (!dot) {
                // If a dot is missing, add a new one
                this.addDot(i, j);
            }
        }
    }	
};

Dots.prototype.setDot = function(i, j, newJ) {
	var dot = this.getDot(i, j);
	dot.j = newJ;
};