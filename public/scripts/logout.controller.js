angular.module('blueWatchApp')
.controller('LogoutController', LogoutController);

function LogoutController($http, $location, adminservice) {
  console.log('LogoutController loaded');
  var controller = this;

  controller.logout = function() {

    $http.get('/logout')
    .then(function(){
      adminservice.user = "";
      $location.path('/login');
    }, function(error) {
      console.log('error logging out', error);
    });
  };
}
