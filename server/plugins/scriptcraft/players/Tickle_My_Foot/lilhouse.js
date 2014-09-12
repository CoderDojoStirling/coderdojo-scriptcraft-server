exports.lilhouse = function() {
	var drone = new Drone();
	var sign = ['A little house.', 'All welcome.']
	drone.down(2);
	drone.box(blocks.diamond, 8, 2, 4);
	drone.up(2);
	drone.box0(blocks.stone, 8, 4, 4);
	drone.up(4)
	drone.prism(blocks.wood, 8, 4, 4);
	drone.down(4)
	drone.right(3)
	drone.door2();
	drone.up(2)
	drone.sign(sign, 68);
	drone.right(1);
	drone.sign(sign, 68);
	
	echo ('A little house was drawn')
};