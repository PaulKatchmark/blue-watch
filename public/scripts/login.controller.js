angular.module('blueWatchApp')
.controller('LoginController', LoginController);

function LoginController($http, $location) {
  console.log('LoginController loaded');
  var controller = this;

  controller.login = function() {
    console.log('logging in');
    $http.post('/login', {
      email: controller.email,
      password: controller.password
    }).then(function(){
    $location.path('/resources');
    }, function(error) {
      console.log('error loggin in', error);
    });
  };
}
