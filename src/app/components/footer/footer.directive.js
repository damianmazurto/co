(function() {
  'use strict';

  angular
    .module('crossover')
    .directive('footerNavbar', footerNavbar);

  /** @ngInject */
  function footerNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/footer/footer.html',
      scope: {
          test: '='
      },
      controller: FooterController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function FooterController($scope, $mdDialog, $mdMedia) {
      var vm = this;

      $scope.status = '  ';
      $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
      
      vm.showPrivacyPolicy = function(ev) {

        var useFullScreen = ($mdMedia('xs')) ;
      
          $mdDialog.show({
            controller: PrivacyPolicyController,
            templateUrl: 'app/privacy-policy/privacy-policy.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
          })         
          $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
          }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
          });
        };

      vm.showTermsOfUse = function(ev) {

        var useFullScreen = ($mdMedia('xs')) ;
      
          $mdDialog.show({
            controller: TermsOfUseController,
            templateUrl: 'app/terms-of-use/terms-of-use.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
          })         
          $scope.$watch(function() {
            return $mdMedia('xs') ;
          }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
          });
      };

      vm.showSupport = function(ev) {

        var useFullScreen =  $mdMedia('xs') ;
      
          $mdDialog.show({
            controller: SupportController,
            templateUrl: 'app/support/support.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
          })
          .then(function(status) {
            if(status === 'success')
            {

            }
          })    
          $scope.$watch(function() {
            return $mdMedia('sm');
          }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
          });
      };

    }

  function PrivacyPolicyController($scope, $mdDialog) {

     $scope.hide = function() {
      $mdDialog.hide() ;
   };
   
   $scope.cancel = function() {
      $mdDialog.cancel() ;
   };
  
   $scope.answer = function(answer) {
      $mdDialog.hide(answer) ;
   };

  }

  function TermsOfUseController($scope, $mdDialog) {

     $scope.hide = function() {
      $mdDialog.hide() ;
   };
   
   $scope.cancel = function() {
      $mdDialog.cancel() ;
   };
  
   $scope.answer = function(answer) {
      $mdDialog.hide(answer) ;
   };

  }

  function SupportController($scope, $mdDialog) {

  $scope.send = function(ev) {

      $mdDialog.hide('success') ; 

      $mdDialog.show(
                  $mdDialog.alert()
                  .parent(angular.element(document.querySelector('body')))
                  .clickOutsideToClose(true)
                  .title('Support')
                  .content('Request is sent successfully')
                  .ariaLabel('Info')
                  .ok('Ok')
                  .targetEvent(ev)
                ) ;

           
   };
   
   $scope.cancel = function() {
      $mdDialog.cancel() ;
   };
  
   $scope.answer = function(answer) {
      $mdDialog.hide(answer) ;
   };

  }

}

})();
