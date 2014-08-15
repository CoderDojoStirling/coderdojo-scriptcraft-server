//Lesson: create box
exports.lesson1 = function() {
	var drone = new Drone(); 
	drone.box( blocks.iron );
};
//Challenge: change block type to glass
exports.chall1 = function() {
	var drone = new Drone(); 
	drone.box( blocks.glass );
};

//Lesson: create box with dimensions
exports.lesson2 = function() {
	var drone = new Drone(); 
	drone.box( blocks.snow, 3, 2, 1 );
};
//Challenge: change dimensions: depth 2, width 4, height 3, 
exports.chall2 = function() {
	var drone = new Drone(); 
	drone.box( blocks.snow, 4, 3, 2 );
};

//Lesson: create cylinder with parameter dimensions
exports.lesson3 = function(radius, height) {
	var drone = new Drone(); 
	drone.cylinder0( blocks.tnt, radius, height );
};
//lesson3(4, 5);
//Challenge: call lesson3 with parameters height 1 and radius 4

//Lesson: move drone around
exports.lesson4 = function() {
	var drone = new Drone(); 
	drone.up().box( blocks.iron ).fwd(2).box( blocks.glass );
}
//Challenge: add third box 3 squares ahead of glass box
exports.chall4 = function() {
	var drone = new Drone(); 
	drone.up().box( blocks.iron ).fwd(2).box( blocks.glass ).fwd(3).box( blocks.glass);
}

//Lesson: move drone around
exports.lesson5 = function() {
	var drone = new Drone();
	drone.up();
	drone.fwd(2).box( blocks.iron );
	drone.fwd(2).box( blocks.iron );
	drone.fwd(2).box( blocks.iron );
}
//Challenge: make 6 boxes in a row
exports.chall5 = function() {
	var drone = new Drone();
	drone.up();
	drone.fwd(2).box( blocks.iron );
	drone.fwd(2).box( blocks.iron );
	drone.fwd(2).box( blocks.iron );
	drone.fwd(2).box( blocks.iron );
	drone.fwd(2).box( blocks.iron );
	drone.fwd(2).box( blocks.iron );	
}

//Lesson: repeat action with loop, rather than copy and paste
exports.lesson6 = function() {
	var drone = new Drone();
	drone.up();
	for (var i = 1; i <= 6; i = i + 1) {
		drone.fwd(2).box( blocks.iron );
	}
}
//Challenge: make 100 boxes in a row
exports.chall6 = function() {
	var drone = new Drone();
	drone.up();
	for (var i = 1; i <= 100; i = i + 1) {
		drone.fwd(2).box( blocks.iron );
	}
}

//Lesson: if statements
exports.lesson7 = function() {
	var drone = new Drone();
	drone.up();
	for (var i = 1; i <= 6; i = i + 1) {
		var blockType;
		if (i == 3) {
			blockType = blocks.tnt;
		} else {
			blockType = blocks.iron;
		}
		drone.fwd(2).box( blockType );
	}
}
//Challenge: make blocks 3 to 6 tnt
exports.chall7 = function() {
	var drone = new Drone();
	drone.up();
	for (var i = 1; i <= 6; i = i + 1) {
		var blockType;
		if (i > 3) {
			blockType = blocks.tnt;
		} else {
			blockType = blocks.iron;
		}
		drone.fwd(2).box( blockType );
	}
}

//Lesson: checkpoints
exports.lesson8 = function() {
	var drone = new Drone();
	drone.up();
	
	drone.chkpt('start');
	
	for (var i = 1; i <= 6; i = i + 1) {
		drone.fwd(2).box( blocks.iron );
	}
	
	drone.move('start');
	
	for (var i = 1; i <= 6; i = i + 1) {
		drone.up(2).box( blocks.iron );
	}
}

//TODO: Send tomorrow evening
//TODO: Come up with checkpoint lesson and challenge
//TODO: Final skyscraper
//TODO: Go do stuff: shapes, loops, if, blocks, checkpoints
//TODO: Define list of functions and blocks they can use

exports.house = function(){
	echo('Building house');
	var drone = new Drone();
	drone.box0( 4, 7, 3, 6).up(3).prism( 5, 7, 6 ); 
};

exports.skyscraper = function(){
	echo('Building skyscraper');
	var drone = new Drone();
    drone.chkpt('myskyscraper');
    for ( var i = 0; i < 10; i++ ) {
        drone.box(blocks.iron,20,1,20)
            .up()
            .box0(blocks.glass_pane,20,3,20)
            .up(3);
    }
    return drone.move('myskyscraper');
};

exports.pyramid = function( block,height) {
	echo('Building pyramid');
	var drone = new Drone(); 
    drone.chkpt('pyramid');
    for ( var i = height; i > 0; i -= 2) {
    	drone.box(block, i, 1, i).up().right().fwd();
    }
    return drone.move('pyramid');      
}
