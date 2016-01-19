(function() {
  'use strict';

  angular
    .module('crossover')
    .directive('userNavbar', userNavbar);

  /** @ngInject */
  function userNavbar() {
    var directive = {
      restrict: '',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(LoginService, $rootScope, $state, $localStorage) {
      var vm = this;

      vm.logged = LoginService.isLogged() ;

      $rootScope.$watch('user', function(newValue, oldValue){
        if(typeof newValue !== "undefined")
        if(newValue == null)  vm.logged = false ;
          else
        vm.logged = newValue.loginSucceeded ;
      }, true) ;

      vm.logout = function() {
        $localStorage.user = null ;
        $rootScope.user = null ;
        $state.go('login', {reload:true}) ;
      }
    }
  }

})();
