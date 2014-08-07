exports.greet = function( greeting, player ) {
    player.sendMessage(greeting + ': ' + player.name);
}

exports.hiAll = function () {
    var players = server.onlinePlayers,
        player,
        i;
    for ( i = 0; i < players.length; i++) {
        player = players[i];
        player.sendMessage( 'Hi!' );
    }
}