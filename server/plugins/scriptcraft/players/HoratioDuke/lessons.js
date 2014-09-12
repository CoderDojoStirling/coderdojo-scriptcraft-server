exports.lesson1 = function() {
	echo('This is my first Minecraft program :-)');
};

exports.lesson2 = function() {
	var drone = new Drone();
	drone.box( blocks.beacon );
};

exports.lesson3 = function() {
    var drone = new Drone();
	drone.box( blocks.tnt, 30 , 34, 32 );
};