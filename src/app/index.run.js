(function() {
  'use strict';

  angular
    .module('crossover')
    .run(loginCheck);

  /** @ngInject */
  function loginCheck($rootScope, $location, LoginService, $log) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
                    
            if (toState.authenticate && !LoginService.isLogged()) {                  
                  $location.path('/login');
              }
          
        });

    $log.debug('runBlock end');
  }

})();
