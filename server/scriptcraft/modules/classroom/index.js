'use strict';
/*global require, module, __plugin, __dirname, echo, persist, isOp, events, Packages, command, global */
var blackboard = require('blackboard'),
    utils = require('utils'),
    foreach = utils.foreach,
    livereload = require('livereload'),
    playersDir = __dirname + '/../../players/',
    serverAddress = utils.serverAddress();

/************************************************************************
 ## Classroom Plugin

 The `classroom` object contains a couple of utility functions for use
 in a classroom setting. The goal of these functions is to make it
 easier for tutors to facilitate ScriptCraft for use by students in a
 classroom environment. Although granting ScriptCraft access to
 students on a shared server is potentially risky (Students can
 potentially abuse it), it is slighlty less risky than granting
 operator privileges to each student. (Enterprising students will
 quickly realise how to grant themselves and others operator privileges
 once they have access to ScriptCraft).

 The goal of this module is not so much to enforce restrictions
 (security or otherwise) but to make it easier for tutors to setup a
 shared server so students can learn Javascript. When scripting is
 turned on, every player who joins the server will have a dedicated
 directory into which they can save scripts. All scripts in such
 directories are automatically watched and loaded into a global
 variable named after the player.

 So for example, if player 'walterh' joins the server, a `walterh`
 global variable is created. If a file `greet.js` with the following
 content is dropped into the `scriptcraft/players/walterh`
 directory...

 ```javascript
 exports.hi = function( player ){
  echo( player, 'Hi ' + player.name);
};
 ```

 ... then it can be invoked like this: `/js walterh.hi( self )` . This
 lets every player/student create their own functions without having
 naming collisions.

 It's strongly recommended that the
 `scriptcraft/players/` directory is shared so that
 others can connect to it and drop .js files into their student
 directories. On Ubuntu, select the folder in Nautilus (the default
 file browser) then right-click and choose *Sharing Options*, check the
 *Share this folder* checkbox and the *Allow others to create and
 delete files* and *Guest access* checkboxes. Click *Create Share*
 button to close the sharing options dialog. Students can then access
 the shared folder as follows...

 * Windows:   Open Explorer, Go to \\{serverAddress}\players\
 * Macintosh: Open Finder,   Go to smb://{serverAddress}/players/
 * Linux:     Open Nautilus, Go to smb://{serverAddress}/players/

 ... where {serverAddress} is the ip address of the server (this is
 displayed to whoever invokes the classroom.allowScripting() function.)

 ### jsp classroom command
 The `jsp classroom` command makes it easy for tutors to turn on or off
 classroom mode. This command can only be used by server operators. To
 turn on classroom mode (enable scripting for all players):

 jsp classroom on

 To turn off classroom mode (disable scripting for all players):

 jsp classroom off

 The `jsp classroom` command is provided as an easier way to turn on or
 off classroom mode. This should be used in preference to the
 classroom.allowScripting() function which is provided only for
 programmatically enabling or disabling classroom mode.

 ### classroom.allowScripting() function

 Allow or disallow anyone who connects to the server (or is already
 connected) to use ScriptCraft. This function is preferable to granting 'ops' privileges
 to every student in a Minecraft classroom environment.

 Whenever any file is added/edited or removed from any of the players/
 directories the contents are automatically reloaded. This is to
 facilitate quick turnaround time for students getting to grips with
 Javascript.

 #### Parameters

 * canScript : true or false

 #### Example

 To allow all players (and any players who connect to the server) to
 use the `js` and `jsp` commands...

 /js classroom.allowScripting( true, self )

 To disallow scripting (and prevent players who join the server from using the commands)...

 /js classroom.allowScripting( false, self )

 Only ops users can run the classroom.allowScripting() function - this is so that students
 don't try to bar themselves and each other from scripting.

 ***/

var store = persist('classroom', {enableScripting: false}),
    File = java.io.File;

function grantScripting(player) {
    console.log('Enabling scripting for player ' + player.name);

    if (__plugin.bukkit) {
        player.addAttachment(__plugin, 'scriptcraft.*', true);
    }
    if (__plugin.canary) {
        player.permissionProvider.addPermission('scriptcraft.evaluate', true);
    }

    var playerName = (player.name + '').replace(/[^a-zA-Z0-9_\-]/g, '');
    var playerDir = new File(playersDir + playerName);

    if (!playerDir.exists()) {
        playerDir.mkdirs();
    }

    livereload.enableLiveReloadForDir(playerDir, playerName);
}

function revokeScripting(player) {
    console.log('Disabling scripting for player ' + player.name);

    if (__plugin.bukkit) {
        foreach(player.getEffectivePermissions(), function (perm) {
            if (('' + perm.permission).indexOf('scriptcraft.') == 0) {
                if (perm.attachment) {
                    perm.attachment.remove();
                }
            }
        });
    }
    if (__plugin.canary) {
        //
        var Canary = Packages.net.canarymod.Canary;
        Canary.permissionManager().removePlayerPermission('scriptcraft.evaluate', player);
    }

    var playerName = (player.name + '').replace(/[^a-zA-Z0-9_\-]/g, '');
    var playerDir = new File(playersDir + playerName);

    livereload.disableLiveReloadForDir(playerDir);
}

var _classroom = {
    allowScripting: function (/* boolean: true or false */ canScript, sender) {
        sender = utils.player(sender);
        if (!sender) {
            console.log('Attempt to set classroom scripting without credentials');
            console.log('classroom.allowScripting(boolean, sender)');
            return;
        }
        /*
         only operators should be allowed run this function
         */
        if (!isOp(sender)) {
            console.log('Attempt to set classroom scripting without credentials: ' + sender.name);
            echo(sender, 'Only operators can use this function');
            return;
        }
        utils.players(function (player) {
            if (!isOp(player)) {
                canScript ? grantScripting(player) : revokeScripting(player);
            }
        });

        blackboard.allowScripting(canScript);

        store.enableScripting = canScript;

        echo(sender, 'Scripting turned ' + ( canScript ? 'on' : 'off' ) +
            ' for all players on server ' + serverAddress);
    }
};

if (__plugin.canary) {
    events.connection(function (event) {
        if (store.enableScripting) {
            grantScripting(event.player);
        }
    }, 'CRITICAL');
} else {
    events.playerJoin(function (event) {
        if (store.enableScripting) {
            grantScripting(event.player);
        }
    }, 'HIGHEST');
}

if (store.enableScripting) {
    //Enable blackboard on startup
    blackboard.allowScripting(true);
}

module.exports = _classroom;