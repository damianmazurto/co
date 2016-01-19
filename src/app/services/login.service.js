(function() {
  'use strict';

  angular
    .module('crossover')
    .factory('LoginService', LoginService);



function LoginService ($http, $rootScope, API, $localStorage) {

  var loginService = {} ;
 
  loginService.login = function (credentials) {
    console.log(credentials) ;

    return $http({url: API + '/login',
                  method: 'GET',
                  params: credentials})    
      .then(function (res) { 
        $localStorage.user = res.data ;       
        $rootScope.user = res.data ;
        return res.data;
      },function() {
        return 'connection_error' ;
      });
  };
 
  loginService.isLogged = function () {
    if(typeof $localStorage.user !== "undefined")
    {
      console.log($localStorage.user) ;
      $rootScope.user = $localStorage.user ;
    }

    if(typeof $rootScope.user !== "undefined" && $rootScope.user !== null)
      return true ;
    else
      return false ;
    
  };
 
 
  return loginService;

}


})();
