exports.lesson1 = function() {
  echo('This is my first Minecraft program :-)');
};

exports.lesson2 = function() {
   var drone = new Drone();
   drone.box( blocks.lava);
};

exports.lesson3 = function() {
   var drone = new Drone();
   drone.box( blocks.tnt, 4, 3, 2 );
};

exports.lesson4 = function(radius, height) {
   var drone = new Drone();
   drone.cylinder0( blocks.glass, radius, height);
};

exports.lesson5part1 = function() {
   var drone = new Drone();
   drone.box( blocks.iron);
};

exports.lesson5part2 = function() {
   var drone = new Drone();
   drone.up(4);
   drone.right(3);
   drone.box( blocks.iron);
};

exports.floaty = function(radius, height) {
   var drone = new Drone();
   drone.up(4);
   drone.cylinder( blocks.glass, radius, height);
};

exports.lesson6 = function(numberOfSteps) {
   var drone = new Drone();
   var counter = 1;
   while (counter <= numberOfSteps) {
      drone.up(1);
      drone.fwd(1);
      drone.box( blocks.tnt, 3, 1, 2 );

       
      counter = counter + 1;
   }
   echo('Drew staircase!');
}

