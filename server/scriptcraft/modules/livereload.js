var autoload = require('plugin').autoload,
    watcher = require('watcher'),
    watchDir = watcher.watchDir,
    unwatchDir = watcher.unwatchDir;

var dirEventHandlers = {};

exports.enableLiveReloadForDir = function(dir, globalName) {
  var context = {};
  reloadModules( context, dir );
  global[globalName] = context;
  watchDir( dir, function( changedDir ){
    reloadModules(context, dir );
  });
}

exports.disableLiveReloadForDir = function(dir) {
  unwatchDir( dir );
}

function reloadModules( context, dir ){
  /*
   wph 20150118 first unregister any event handlers registered by the player
   */
  var dirPath = ''+ dir.getAbsolutePath();
  var eventHandlers = dirEventHandlers[dirPath];
  if (eventHandlers){
    for (var i = 0;i < eventHandlers.length; i++){
      eventHandlers[i].unregister();
    }
    eventHandlers.length  = 0;
  } else {
    dirEventHandlers[dirPath] = [];
    eventHandlers = dirEventHandlers[dirPath];
  }
  /*
   override events.on() so that the listener is stored here so it can be unregistered.
   */
  var oldOn = events.on;
  var newOn = function( eventType, fn, priority){
    var handler = oldOn(eventType, fn, priority);
    eventHandlers.push(handler);
  };
  events.on = newOn;
  autoload( context, dir, { cache: false });
  events.on = oldOn;
}

