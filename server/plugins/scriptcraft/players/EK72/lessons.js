exports.lesson1 = function() {
	echo('This is my first Minecraft program :-) ');
};
//Lesson 2: create box
exports.lesson2 = function() {
	var drone = new Drone();
	drone.box( blocks.iron );
};
	exports.ironone = function() {
	var drone = new Drone();
	drone.box( blocks.iron );
};
exports.snowone = function() {
	var drone = new Drone();
	drone.box( blocks.snow	);
};
exports.lavaone = function() {
	var drone = new Drone();
	drone.box( blocks.lava );
};
exports.glassone = function() {
	var drone = new Drone();
	drone.box( blocks.glass );
};
exports.bookshelfone = function() {
	var drone = new Drone();
	drone.box( blocks.bookshelf);
};

//Lesson 3 - create box with dimensions
exports.lesson3 = function() {
	var drone = new Drone();
	drone.box( blocks.snow, 3, 2, 1 );
exports.snowbox = function() {
	var drone = new Drone();
	drone.box( blocks.snow, 3, 2, 1 );
};
exports.bookshelfbox = function() {
	var drone = new Drone();
	drone.box( blocks.bookshelf, 3, 3, 3 );
};
exports.tntbox = function() {
	var drone = new Drone();
	drone.box( blocks.tnt, 3, 4, 2 );
}; 

//Lesson 4 - create cylinder with parameter dimensions
exports.lesson4 = function(radius, height) {
	var drone = new Drone();
	drone.cylinder0( blocks.stone, radius, height );
};

// Lesson 5