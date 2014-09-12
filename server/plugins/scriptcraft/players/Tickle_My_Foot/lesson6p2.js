exports.lesson6part2 = function(numberOfSteps) {
	var drone = new Drone();
	var counter = 1;
	while (counter <= numberOfSteps) {
	drone.up(1)
	drone.fwd(1)
	drone.box( blocks.tnt, 3, 2, 2 );
	counter = counter + 1;
	};
	echo('Staircase was drawn.');
};