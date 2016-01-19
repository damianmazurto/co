(function() {
  'use strict';

  angular
    .module('crossover')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

   
  }

})();
