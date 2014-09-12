//Lesson 1: create first Javascript program in Minecraft
exports.lesson1 = function() {
	echo('This is my first Minecraft program :-)');
};

//Lesson 2: create box
exports.lesson2 = function() {
	var drone = new Drone(); 
	drone.box( blocks.iron );
};
//Challenge 2: create box out of lava
exports.challenge2 = function() {
	var drone = new Drone(); 
	drone.box( blocks.glass );
};

//Lesson 3: create box with dimensions
exports.lesson3 = function() {
	var drone = new Drone(); 
	drone.box( blocks.snow, 3, 2, 1 );
};
//Challenge 3: create wood box with depth 2, width 4, height 3, 
exports.challenge3 = function() {
	var drone = new Drone(); 
	drone.box( blocks.wood, 4, 3, 2 );
};

//Lesson 4: create cylinder with parameter dimensions
exports.lesson4 = function(radius, height) {
	var drone = new Drone(); 
	drone.cylinder0( blocks.stone, radius, height );
};
//Challenge 4: create glass cylinder with radius 4 and height 1
exports.challenge4 = function(radius, height) {
	var drone = new Drone(); 
	drone.cylinder0( blocks.glass, radius, height );
};
//greghuc.challenge4(4, 1);

//Lesson 5: specifying where to build something
exports.lesson5part1 = function() {
	var drone = new Drone(); 
	drone.box( blocks.iron );
}
//Lesson 5: specifying where to build something, and moving drone around
exports.lesson5part2 = function() {
	var drone = new Drone(); 
	drone.up(2);
	drone.box( blocks.iron );
}
//Challenge 5: create block 4 up, 3 right
exports.challenge5 = function() {
	var drone = new Drone(); 
	drone.up(4);
	drone.right(3);
	drone.box( blocks.iron );
}

//Lesson 6: create a shape multiple times
exports.lesson6part1 = function() {
	var drone = new Drone(); 
	drone.up(1);
	drone.fwd(1);
	drone.box( blocks.wood, 3, 1, 2 );
	drone.up(1);
	drone.fwd(1);
	drone.box( blocks.wood, 3, 1, 2 );
	drone.up(1);
	drone.fwd(1);
	drone.box( blocks.wood, 3, 1, 2 );	
}
//Lesson 6: create a shape multiple times, with a loop
exports.lesson6part2 = function(numberOfSteps) {
	var drone = new Drone(); 
	var counter = 1;
	while (counter <= numberOfSteps) {
	    drone.up(1);
	    drone.fwd(1);
	    drone.box( blocks.wood, 3, 1, 2 );
	    
	    counter = counter + 1;
	}	
}

//Lesson 7: skyscraper
exports.lesson7 = function(levels){
	var drone = new Drone();
	drone.up();

	var counter = 1;
	while (counter <= levels) {
		drone.box(blocks.iron, 20, 1, 20);
    	drone.up();
    	drone.box0(blocks.glass_pane,20,3,20)
    	drone.up(3);
    	
    	counter = counter + 1;
	}
};

exports.showShapes = function(){
	var drone = new Drone();
	drone.up();

	//Box
	//box(material, width, height, depth)
	drone.box(blocks.iron, 2, 3, 1);
    drone.fwd(3);
    
    //Hollow box
    //box(material, width, height, depth)
    drone.box0(blocks.iron, 5, 5, 5);
    drone.fwd(7);
    
    //Prism (like a roof)
    //prism(material, width, length)
    drone.prism(blocks.iron, 5, 7);
	drone.fwd(9);

    //Hollow prism (like a roof)
    //prism0(material, width, length)
    drone.prism0(blocks.iron, 5, 7);
	drone.fwd(9);
	

    //Cylinder
    //cylinder(material, radius, height)
    drone.cylinder(blocks.iron, 3, 7);
	drone.fwd(8);
		
	//Hollow cylinder
    //cylinder0(material, radius, height)
    drone.cylinder0(blocks.iron, 3, 7);
	drone.fwd(8);	
};

exports.randomObjects = function() {
	var drone = new Drone();
	drone.up();
	
	//Single door
	drone.door()
	drone.fwd(3);
	
	//Double doors
	drone.door2();
	drone.fwd(3);
	
	//Oak tree
	drone.fwd(15);
	drone.oak()
 	
 	//Spruce tree
 	drone.fwd(15);
 	drone.spruce()
 	
 	//Birch tree
 	drone.fwd(15);
 	drone.birch()
 	
 	//Jungle tree
 	drone.fwd(15);
 	drone.jungle()
};

exports.movement = function() {
	var drone = new Drone();
	drone.up(2);
	drone.box(blocks.iron);
	drone.right(2);
	drone.box(blocks.glass);
	drone.down(1);
	drone.box(blocks.iron);
	drone.left(4);
	drone.box(blocks.tnt);
	drone.fwd(4);
	drone.box(blocks.iron);
	drone.back(1);
	drone.box(blocks.obsidian);
	drone.turn(1);
	drone.fwd(1);
	drone.box(blocks.chest);
};

exports.materials = function() {
	var drone = new Drone();
	drone.up(1);
	materials = [ 'stone', 'grass', 'wood', 'glass', 'gold', 'chest', 'ice', 'pumpkin', 'tnt', 'water', 'lava' ]
	for (var i = 0; i < materials.length; i++) {
		drone.box(blocks[materials[i]]);
		drone.fwd(1);
	}
};

