exports.lesson1 = function() {
    echo('This is my first Minecraft program hare :-)');
};


//lesson2:create box 
exports.lesson2 = function() {
var drone = new Drone();
drone.box( blocks.lava );
};

//lesson 3 - create box with dimensions
exports.lesson3 = function() {
	var drone = new Drone();
	drone.box( blocks.snow, 4, 3, 2 );
	};
	
	
//lesson 4 - create box
exports.lesson4 = function(radius, height) {
var drone = new Drone();
drone.cylinder0( blocks.stone, radius, height );
};	


//lesson 5: specifying where to build something
exports.lesson5part1 = function() {
var drone = new Drone();
drone.up(2);
drone.box( blocks.tnt );
}


//lesson 5: 
exports.lesson5part2 = function() {
var drone = new Drone();
drone.up(4);
drone.right(3);
drone.box( blocks.iron );
}