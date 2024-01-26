(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/*
onsole.js 
Like console but on screen
*/

module.exports = function() {
  
  var onsoleEl = document.createElement('div');
  onsoleEl.style.position = 'fixed';
  onsoleEl.style.bottom = '0px';
  onsoleEl.style.height = '100px';
  onsoleEl.style.overflow = 'scroll';
  onsoleEl.style.fontSize = '10px';
  onsoleEl.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
  onsoleEl.style.color = 'white';
  onsoleEl.style.fontFamily = 'monospace';
  onsoleEl.style.right = 0;
  onsoleEl.style.left = 0;
  
  
  var attached = false;
  
  function getArguments(args) {
    var _arguments = [];
    for(var a = 0; a < args.length; a++) {
      _arguments.push(args[a]);
    }
    return _arguments;
  }

  var _interface = {
      log: function() {
          if(!attached) {
            attached = true;
              document.querySelector('body').appendChild(onsoleEl);
          }
          var _arguments = getArguments(arguments);
          function formatLogItem(a) {
            try {
              return JSON.stringify(a, null, 2);
            }
            catch(e) {
              return a.toString();
            }
          }
          onsoleEl.innerHTML = '<div>'+_arguments.map(formatLogItem).join(', ')+'</div>' + onsoleEl.innerHTML;
      },
      info: function() {
        var newArguments = ['ℹ️'].concat(getArguments(arguments));
        _interface.log.apply(_interface, newArguments);
      },
      error: function() {
        var newArguments = ['⛔️'].concat(getArguments(arguments));
        _interface.log.apply(_interface, newArguments);
      },
      clear: function() {
        onsoleEl.innerHTML = "";
      }

  };
  return _interface;
};

})));
