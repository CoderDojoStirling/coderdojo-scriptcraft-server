var utils = require('utils'),
    foreach = utils.foreach,
    livereload = require('livereload'),
    File = java.io.File,
    blackboardDir = new File(__dirname + '/../../blackboard/'),
    serverAddress = utils.serverAddress();

function startBlackboard() {
    if (!blackboardDir.exists()) {
        blackboardDir.mkdirs();
    }

    runForSubdirs(blackboardDir, function (subdir) {
        livereload.enableLiveReloadForDir(subdir, subdir.getName());
    });
}

function stopBlackboard() {
    runForSubdirs(blackboardDir, function (subdir) {
        livereload.disableLiveReloadForDir(subdir);
    });
}

function runForSubdirs(dir, runnable) {
    var files = dir.listFiles();
    if ( !files ) {
        return;
    }
    for ( var i = 0; i < files.length; i++ ) {
        var file = files[i];
        if (file.isDirectory( )) {
            runnable(file);
        }
    }
}

var isOn = false;

var _blackboard = {
    allowScripting: function (/* boolean: true or false */ canScript) {
        //Function has no administrative controls
        //Intent is that blackboard is used internally from classroom

        if (isOn == canScript) {
            //Do nothing, if blackboard is already in desired state
            return;
        } else {
            isOn = canScript;
        }

        canScript ? startBlackboard() : stopBlackboard();

        console.log('Blackboard turned ' + ( canScript ? 'on' : 'off' ) +
            ' for all players on server ' + serverAddress);
    }
};

module.exports = _blackboard;
