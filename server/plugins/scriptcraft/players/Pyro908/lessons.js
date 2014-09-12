exports.lesson1 = function() {
	echo('This is my first Minecraft program :-)');
};

exports.lesson2 = function() {
	var drone = new Drone();
	drone.box( blocks.lava );
};

exports.lesson3 = function() {
	var drone = new Drone();
	drone.box( blocks.snow, 3, 2, 1 );
};

exports.lesson4 = function(radius, height) {
	var drone = new Drone();
	drone.cylinder0( blocks.glass, radius, height );
};

exports.lesson6part1 = function() {
	var drone = new Drone();
	drone.up(1);
	drone.fwd(1);
	drone.box( blocks.tnt, 3, 1, 2 );
	drone.up(1);
	drone.fwd(1);
	drone.box( blocks.tnt, 3, 1, 2 );
	drone.up(1);
	drone.fwd(1);
	drone.box( blocks.tnt, 3, 1, 2 );
}