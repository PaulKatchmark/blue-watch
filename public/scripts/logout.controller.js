angular.module('blueWatchApp')
.controller('LogoutController', LogoutController);

function LogoutController($http, $location, adminservice, LogoutService) {
  console.log('LogoutController loaded');
  var controller = this;
  controller.homePage = LogoutService;

  controller.logout = function() {

    $http.get('/logout')
    .then(function(){
      adminservice.user = "";
      adminservice.isLoggedIn = false;
      $location.path('/login');
    }, function(error) {
      console.log('error logging out', error);
    });
  };
}
