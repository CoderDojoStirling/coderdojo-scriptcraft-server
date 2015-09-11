/*
 Creative Stirling / CoderDojo plan to run a demo at OpenDoors 2015.
 The idea is that people will be able to 'build an old Stirling street' - by coding it in Minecraft.
 By 'coding', people will be able to call a set of pre-existing Javascript functions, which create
 buildings, streets, signs, etc. Some variation in construction will be possible, e.g. the number of
 building storeys can be specified.

 This file contains the project Javascript code.
 Each Javascript function is callable from inside the Minecraft client (if setup with Scriptcraft).
 So to call the house function, you run from the Minecraft prompt 'js stirling.house()'
 All function calls need to prefixed with 'stirling.'

 We'd like to add more construction functions (more house types?).
 Read the code below to get a feel for how we're creating things in the Minecraft.
 We're basically using an awesome project called Scriptcraft, which lets people code in Minecraft using
 Javascript: https://github.com/walterhiggins/ScriptCraft

 Scriptcraft has lots of docs to help you get started: https://github.com/walterhiggins/ScriptCraft#further-reading
 But to shortcut a lot of reading, we're using its Drone functionality:
 https://github.com/walterhiggins/ScriptCraft/blob/master/docs/API-Reference.md#drone-plugin

 Final tip. Use the list of Minecraft block types (and ids) at: http://www.minecraftinfo.com/idlist.htm
 We need to specify block types when building (e.g. 'stone' house)
 */

exports.house = function(widthInWindows, heightInFloors, material, dormers) {
    widthInWindows = getNumber(widthInWindows, 3);
    heightInFloors = getNumber(heightInFloors, 3);
    var blockIds = getValueForString(material, {
        'stone': {
            ground: 1,
            upper: 1
        },
        'sandstone': {
            ground: 24,
            upper: 24
        },
        'brick': {
            ground: 98,
            upper: 98
        }
    }, 'stone');
    var doorType = 'single';
    var hasDormers = getValueForString(dormers, { 'dormers': true, 'nodormers': false }, 'nodormers');
    innerHouse(widthInWindows, heightInFloors, blockIds, doorType, hasDormers);
};

exports.houseWithShop = function(widthInWindows, heightInFloors, material, dormers) {
    widthInWindows = getNumber(widthInWindows, 3);
    heightInFloors = getNumber(heightInFloors, 3);
    var blockIds = getValueForString(material, {
        'stone': {
            ground: '159:5',
            upper: 1
        },
        'sandstone': {
            ground: '159:10',
            upper: 24
        },
        'brick': {
            ground: '159:12',
            upper: 98
        }
    }, 'stone');
    var doorType = 'double';
    var hasDormers = getValueForString(dormers, { 'dormers': true, 'nodormers': false }, 'nodormers');
    innerHouse(widthInWindows, heightInFloors, blockIds, doorType, hasDormers);
};

var innerHouse = function(widthInWindows, heightInFloors, blockIds, doorType, hasDormers) {
    var roofBlockId = 67;
    var dormerHeight = 2;

    //TODO: Nicer way of doing this?
    var windowSectionWidth = 4;
    var depth = 10;

    //Start drone up one block, as assume cursor is pointing at ground tile
    var drone = newDrone().up();

    //Floors
    var i;
    for (i = 1; i <= heightInFloors; i++) {
        var groundFloor = i == 1;
        var doorType = groundFloor ? doorType : null;
        var blockId = groundFloor ? blockIds.ground : blockIds.upper;
        drone = storey(drone, blockId, widthInWindows, windowSectionWidth, depth, doorType);
    }

    //Roof
    //http://www.minecraftinfo.com/cobblestonestairs.htm
    var roofWidth = widthInWindows * windowSectionWidth;
    drone.prism0(roofBlockId, roofWidth, depth);

    var roofStart = 'roofStart';
    drone.chkpt(roofStart);

    //Dormers
    if (hasDormers) {
        var dormerOffset = ((2 * windowSectionWidth) - windowSectionWidth)/2;

        var doubleSections = Math.floor(widthInWindows / 2);
        var doubleSectionStart;
        for (i = 1; i <= doubleSections; i++) {
            drone.move(roofStart);
            doubleSectionStart = (i - 1) * (windowSectionWidth * 2);
            drone.right(doubleSectionStart);
            drone.right(dormerOffset);
            dormer(drone, blockId, roofBlockId, windowSectionWidth, dormerHeight, depth);
        }
    }

    //Chimneys
    //http://www.minecraftinfo.com/stonebricks.htm
    var chimneyBlockId = 98;
    var chimneyPos = depth * 0.4;
    var chimneyHeight = depth * 0.6;
    var chimneyWidth = 3;
    var chimneyDepth = 1;
    drone.move(roofStart).fwd(chimneyPos)
        .box(chimneyBlockId, chimneyDepth, chimneyHeight, chimneyWidth)
        .right(roofWidth - chimneyDepth)
        .box(chimneyBlockId, chimneyDepth, chimneyHeight, chimneyWidth);
};

var dormer = function(drone, bodyBlockId, roofBlockId, width, height, depth) {
    var numberOfTurns = 3;
    var windowBlockId = 102;
    var windowDepth = 1;

    var windowOffset = 1;
    var windowWidth = width - (2 * windowOffset);
    var windowHeight = height;

    var dormerStart = 'dormerStart';
    drone.chkpt(dormerStart);
    drone.box0(bodyBlockId, width, height, depth);
    drone.up(height).right(width - 1).turn(numberOfTurns).prism(roofBlockId, depth, width);
    drone.move(dormerStart).right(windowOffset).box( windowBlockId, windowWidth, windowHeight, windowDepth );
    drone.move(dormerStart).fwd(depth - windowDepth).right(windowOffset).box( windowBlockId, windowWidth, windowHeight, windowDepth );
};

var storey = function(drone, blockId, sectionsAcross, sectionWidth, depth, doorType) {
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
        drawDoor = (doorType !== null) && (i == middleSection);

        if (drawDoor) {
            var doorFunc = getValueForString(doorType, { 'single': 'door', 'double': 'door2' }, 'single');

            //Front door and backdoor
            drone.move(start).right((i - 1) * sectionWidth).right(1)[doorFunc]();
            drone.move(start).right((i - 1) * sectionWidth).right(1).fwd(depth - 1)[doorFunc]();

        } else {
            drone.move(start)
                .right((i - 1) * sectionWidth)
                .up(1)
                .right(1)
                .box(glassBlockId, sectionWindowWidth, sectionWindowHeight, 1 );
        }
    }

    return drone.move(start)
        .up(sectionHeight);
};



//type 'sandstone', 'brick' or 'stone'
//numberOfFloors: number > 0
//sectionsAcross: number > 0
//sectionWidth: number >= 4
//if type, numberOfFloors, sectionsAcross or sectionWidth are left undefined, will use default values
exports.houseOld = function(type, numberOfFloors, sectionsAcross, sectionWidth) {
    var blockId = getValueForString(type, { 'sandstone': '24:1', 'brick': 45, 'stone': '98:2' }, 'stone');
    numberOfFloors = getNumber(numberOfFloors, 7);
    sectionsAcross = getNumber(sectionsAcross, 2);
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





//length: height > 0
//if height is left undefined, will use default value
exports.light = function(height) {
    var lamppostBlockId = 42; //http://www.minecraftinfo.com/blockofiron.htm
    var lightBlockId = 89; //http://www.minecraftinfo.com/beacon.htm

    height = getNumber(height, 7);

    var drone = newDrone();

    //Use height + 1, as assume cursor is pointing at ground tile
    drone.box(lamppostBlockId, 1, height + 1, 1)
         .up(height)
         .box(lightBlockId, 1, 1, 1);
};

//width: number > 0
//length: number > 0
//if width or length are left undefined, will use default values
exports.garden = function(width, length) {
    width = getNumber(width, 8);
    length = getNumber(length, 10);

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
exports.sign = function(message) {
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


//Not for public consumption

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

exports.air = function(width, height, depth) {
    var drone = newDrone().up();
    var airBlockId = 0; //http://www.minecraftinfo.com/air.htm

    drone.box(airBlockId, width, height, depth);
};

exports.grass = function(width, height, depth) {
  var drone = newDrone().up();
  var grassBlockId = 2;

  drone.box(grassBlockId, width, height, depth);
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
