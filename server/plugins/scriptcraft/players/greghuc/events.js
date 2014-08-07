exports.blockBreak = function() {
  events.on('block.BlockBreakEvent', function ( event ) { 
      var breaker = event.player;
      breaker.sendMessage('You broke a block');    
  } );
};

