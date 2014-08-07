exports.house = function(){
	echo('Building house');
	var drone = new Drone();
	drone.box0( 4, 7, 3, 6).up(3).prism( 5, 7, 6 ); 
};

exports.skyscraper = function(){
	echo('Building skyscraper');
	var drone = new Drone();
    drone.chkpt('myskyscraper');
    for ( var i = 0; i < 10; i++ ) {
        drone.box(blocks.iron,20,1,20)
            .up()
            .box0(blocks.glass_pane,20,3,20)
            .up(3);
    }
    return drone.move('myskyscraper');
};