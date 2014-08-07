var utils = require('utils');

exports.playSound = function(sound) {
  sound = org.bukkit.Sound.CAT_MEOW;
  utils.foreach( server.onlinePlayers, function( player ) { 
      player.playSound(player.location, 
                       sound,
                       1,
                       1);
  } );
};
