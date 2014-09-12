exports.lesson6c = function(numberOfSteps) {
	var drone = new Drone();
	drone.down(1)
	var counter = 1;
	while (counter <= numberOfSteps) {
	drone.up(1)
	drone.fwd(1)
	drone.box( blocks.tnt, 2, 1, 1 );
	counter = counter + 1;
	};
	echo('Staircase was drawn.');
};