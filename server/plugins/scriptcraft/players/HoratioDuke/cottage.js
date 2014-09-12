exports.cottage = function() {
    var drone = new Drone();

//    var wallBlocks = blocks.moss_stone;
    var wallBlocks = blocks.diamond;

//    var signText = ['Home','Sweet','Home'];
    var signText = ['Coderdojo','Stirling'];

    drone.box0(wallBlocks,7,2,6)  // 4 walls
        .right(3)
        .door() // door front and center
        .up(1)
        .left(2)
        .box(102) // windows to left and right
        .right(4)
        .box(102)
        .left(5)
        .up()
        .prism0(53,7,6)
        .down()
        .right(4)
        .sign(signText,68);

};