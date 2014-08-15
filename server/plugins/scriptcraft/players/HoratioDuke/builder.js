exports.lesson1 = function() {
	var drone = new Drone();
	drone.box( blocks.glass );
};

exports.lesson2 = function() {
	var drone = new Drone();
	drone.box( blocks.snow, 10, 5, 2 );
};

exports.lesson3 = function(radius, height) {
	var drone = new Drone();
	drone.cylinder0( 46, radius, height );
};

exports.lesson4 = function() {
	var drone = new Drone();
	drone.up().box( blocks.oak ).fwd(2).box( blocks.glass ).fwd(2).box( blocks.snow );
};

exports.lesson5 = function() {
	var drone = new Drone();
	drone.up();
	drone.fwd(2).box( blocks.iron );
	drone.fwd(2).box( blocks.iron );
	drone.fwd(2).box( blocks.iron );
	drone.fwd(2).box( blocks.iron );
	drone.fwd(2).box( blocks.iron );
	drone.fwd(2).box( blocks.iron );
};

exports.lesson6 = function() {
	var drone = new Drone();
	drone.up();
	for (var i = 1; i <= 200; i = i + 1) {
		drone.fwd(2).box( blocks.oak );
	}
};

exports.lesson7 = function() {
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
};

exports.lesson8 = function() {
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
};