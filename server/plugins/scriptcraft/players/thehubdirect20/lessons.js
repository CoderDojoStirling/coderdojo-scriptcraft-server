exports.lesson1 = function() {
    echo('This is my first Minecraft program :-)');
};

//lesson2: create box
exports.lesson2 = function() {
	var drone = new Drone();
	drone.box( blocks.lava );
};
//lesson2: create box
exports.lesson3 = function() {
	var drone = new Drone();
	drone.box( blocks.obsidian, 2, 4, 3  );
};
//lesson2: create box
exports.lesson4 = function() {
	var drone = new Drone();
	drone.cylinder0( blocks.obsidian,10,10 );
};
//lesson2: create box
exports.lesson5 = function() {
	var drone = new Drone();
	drone.up(4);
	drone.right(3);
	drone.box( blocks.iron );
};
//lesson2: create box
exports.lesson6 = function(numberOfSteps) {
	var drone = new Drone();
	var counter = 1;
	while (counter <= numberOfSteps) {
	drone.up(1);
	drone.fwd(1);
	drone.box ( blocks.obsidian, 3, 1, 2 );
    
    counter = counter + 1;
    }
    echo('Drew staircase! lol!');
};