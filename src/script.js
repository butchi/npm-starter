(function() {
  'use strict';
  class NpmStarter {
    constructor(option) {
      if(console) {
        console.log('Thanks, world!');
      }
    }
  }

  // export
  global.NpmStarter = NpmStarter;
})();
