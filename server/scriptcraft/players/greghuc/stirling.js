//type 'sandstone', 'brick' or 'stone'
//numberOfFloors: number > 0
//sectionsAcross: number > 0
//sectionWidth: number >= 4
//if type, numberOfFloors, sectionsAcross or sectionWidth are left undefined, will use default values
exports.house = function(type, numberOfFloors, sectionsAcross, sectionWidth) {
    var blockId = getValueForString(type, { 'sandstone': '24:1', 'brick': 45, 'stone': '98:2' }, 'stone');
    numberOfFloors = getNumber(numberOfFloors, 3);
    sectionsAcross = getNumber(sectionsAcross, 3);
    sectionWidth = getNumber(sectionWidth, 4);
    sectionWidth = sectionWidth < 4 ? 4 : sectionWidth; //Ensure sectionWidth is minimum of 4

    var depth = 10;
    
    //Start drone up one block, as assume cursor is pointing at ground tile
    var drone = newDrone().up();

    //Floors
    var i; 
    for (i = 1; i <= numberOfFloors; i++) {
        var hasDoor = i == 1;
        drone = storey(drone, blockId, sectionsAcross, sectionWidth, depth, hasDoor);
    }
    
    //Roof
    http://www.minecraftinfo.com/cobblestonestairs.htm
    var roofBlockId = 67;
    var roofWidth = sectionsAcross * sectionWidth;
    drone.prism0(roofBlockId, roofWidth, depth);
    
    //Chimneys
    //http://www.minecraftinfo.com/stonebricks.htm
    var chimneyBlockId = 98;
    var chimneyPos = depth * 0.4;
    var chimneyHeight = depth * 0.6;
    var chimneyWidth = 3;
    var chimneyDepth = 1;
    drone.fwd(chimneyPos)
         .box(chimneyBlockId, chimneyDepth, chimneyHeight, chimneyWidth)
         .right(roofWidth - chimneyDepth)
         .box(chimneyBlockId, chimneyDepth, chimneyHeight, chimneyWidth);
};

var storey = function(drone, blockId, sectionsAcross, sectionWidth, depth, hasDoor) {
    var start = 'start';
    var sectionHeight = 4;

    var middleSection = Math.ceil(sectionsAcross/2);

    var sectionWindowWidth = sectionWidth - 2;
    var sectionWindowHeight = sectionHeight - 2;
    var glassBlockId = 102; //http://www.minecraftinfo.com/glasspane.htm
    
    drone.chkpt(start);   
    
    drone.box0(blockId, sectionsAcross * sectionWidth, sectionHeight, depth);
    
    var i;
    var drawDoor;
    for (i = 1; i <= sectionsAcross; i++) {
        drawDoor = hasDoor && (i == middleSection);
        
        if (drawDoor) {
            drone.move(start)
                 .right((i - 1) * sectionWidth)
                 .up(1)
                 .right(1)
                 .door();                 
        } else {
            drone.move(start)
                 .right((i - 1) * sectionWidth)
                 .up(1)
                 .right(1)
                 .box( blocks.glass_pane, sectionWindowWidth, sectionWindowHeight, 1 );
        }
    }
    
    return drone.move(start)
                .up(sectionHeight);
};

//type 'cobbles', 'dirt', or 'stone'
//width: number > 0
//length: number > 0
//if blockType, width or length are left undefined, will use default values
exports.road = function(type, width, length) {
    //http://www.minecraftinfo.com/stone.htm
    //http://www.minecraftinfo.com/cobblestone.htm
    //http://www.minecraftinfo.com/dirt.htm
    var blockId = getValueForString(type, { 'cobbles': 4, 'dirt': 3, 'stone': 1 }, 'cobbles');
    width = getNumber(width, 9);
    length = getNumber(length, 20);
    
	var drone = newDrone();
    drone.box(blockId, width, 1, length);
};

//type 'dirt', or 'stone'
//width: number > 0
//length: number > 0
//if blockType, width or length are left undefined, will use default values
exports.pavement = function(type, width, length) {
    //http://www.minecraftinfo.com/stonebrickslab.htm
    //http://www.minecraftinfo.com/dirt.htm

    var blockId = getValueForString(type, { 'dirt': 3, 'stone': '44:5' }, 'stone');
    width = getNumber(width, 3);
    length = getNumber(length, 20);
    
    var drone = newDrone();
    drone.box(blockId, width, 2, length);
};

//length: height > 0
//if height is left undefined, will use default value
exports.light = function(height) {
    var lamppostBlockId = 42; //http://www.minecraftinfo.com/blockofiron.htm
    var lightBlockId = 138; //http://www.minecraftinfo.com/beacon.htm
    
    height = getNumber(height, 6);

    var drone = newDrone();

    //Use height + 1, as assume cursor is pointing at ground tile
    drone.box(lamppostBlockId, 1, height + 1, 1)
         .up(height + 1)
         .box(lightBlockId, 1, 1, 1);
};

//width: number > 0
//length: number > 0
//if width or length are left undefined, will use default values
exports.garden = function(width, length) {
    width = getNumber(width, 9);
    length = getNumber(length, 5);
    
    var drone = newDrone();
    drone.garden(width,length);
};

//type: 'birch', 'oak', 'spruce'
//if type is left undefined, will use default value
exports.tree = function(type) {
    type = getStringOf(type, ['birch', 'oak', 'spruce'], 'birch');
    
    var drone = newDrone();
    drone[type]();
};

//mesage: string
//if message is undefined, will use default value
exports.signpost = function(message) {
    var drone = newDrone();

    message = getString(message, 'I am a sign');

    //Move up, as assume cursor is pointing at ground tile. And sign should be on surface
    drone.up().signpost(splitStringIntoLines(message, 15));
};

//mesage: string
//if message is undefined, will use default value
exports.wallsign = function(message) {
    var drone = newDrone();

    message = getString(message, 'I am a wall sign');

    drone.wallsign(splitStringIntoLines(message, 15));
};

exports.air = function(width, height, depth) {
    var drone = newDrone().up();
    var airBlockId = 0; //http://www.minecraftinfo.com/air.htm
    
    drone.box(airBlockId, width, height, depth);
};

//Helper functions below this point

var newDrone = function() {
    return new Drone(self);
}

var getValueForString = function (input, valueForString, defaultValue) {
    var value = input;

    if ((value == undefined) ||
        (typeof value != 'string')) {
        value = defaultValue;
    }
    
    return valueForString[value];
}

var getStringOf = function(input, acceptableValues, defaultValue) {
    var value = input;
    
    if ((value == undefined) ||
        (typeof value != 'string') ||
        (acceptableValues.indexOf(value) < 0)) {
        
        value = defaultValue;    
    }
    
    return value;
};

var getString = function(input, defaultValue) {
    var value = input;

    if ((value == undefined) ||
        (typeof value != 'string')) {
        value = defaultValue;
    }

    return value;
};

var getNumber = function(input, defaultValue) {
    var maxValue = 30;

    var value = input;

    if ((value == undefined) ||
       (typeof value != 'number') ||
       (value <= 0)) {
        value = defaultValue;    
    }
        
    if (value > maxValue) {
        value = maxValue;   
    }
        
    return value;
};

var splitStringIntoLines = function(value, maxLineLength) {
    return value.split(/\s+/).reduce(function (lines, word) {
        var lastLine = lines[lines.length - 1];

        if ((lastLine == undefined) || (lastLine.length + 1 + word.length > maxLineLength)) {
            lines.push(new String(word));
        } else {
            lines[lines.length - 1] = lastLine + ' ' + word;
        }

        return lines;
    }, []);
};