(function() {
  'use strict';
  class NpmStarter {
    constructor(option) {
      if(global.console) {
        console.log('Thanks, world!');
      }
    }
  }

  // export
  global.NpmStarter = NpmStarter;
})();
