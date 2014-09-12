exports.lesson7 = function(levels) {
	var drone = new Drone();
	var counter = 1;
	while (counter <= levels) {
	drone.box(blocks.iron, 20, 1, 20);
	drone.up(1);
	drone.box0(blocks.glass_pane, 20, 3, 20);
	drone.up(3);
	drone.box(blocks.iron, 20, 1, 20);
	
	counter = counter + 1
	}
	echo ('Skyscraper was drawn')
};