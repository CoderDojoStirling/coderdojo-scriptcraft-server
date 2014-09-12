exports.lesson1 = function() {
	echo('This is my first Minecraft program :-)');
};
//Lesson 2: create box
exports.lesson2 = function() {
	var drone = new Drone();
	drone.box( blocks.lava );
};
//Lesson 3: create box with dimensions
exports.lesson3 = function() {
	var drone = new Drone();
	drone.box(blocks.tnt,15,15,15 );
};
//Lesson 4: create cylinder with parameter dimensions
exports.lesson4 = function(radius, height) {
	var drone = new Drone(); 
	drone.cylinder(blocks.lava, radius,height );
};
exports.lesson5 = function() {
	var drone = new Drone();
	drone.box( blocks.lava,5,5,5 );
};