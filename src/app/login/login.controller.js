(function() {
  'use strict';

  angular
    .module('crossover')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($timeout, LoginService, $state) {
    var vm = this;
    
    vm.user = {} ;

    vm.login = function(form) {

    	console.log(form.$submitted) ;
    	if(form.$valid)
    	{
	    	LoginService.login(vm.user).then(function(res) {
	    		console.log(res) ;
	    		vm.status = res ;

	    		if(vm.status.loginSucceeded)
	    		{
	    			$state.go('home') ;
	    		}
	    	}, function(res) {vm.status = res }) ;
    	}
    }

  }
})();
