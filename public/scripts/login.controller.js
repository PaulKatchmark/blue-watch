angular.module('blueWatchApp')
.controller('LoginController', LoginController);

function LoginController($http, $location, adminservice) {
  console.log('LoginController loaded');
  var controller = this;

//logged in email to display
  controller.loggedInEmail = function(){
    adminservice.loggedin().then(function(response){
    }, function(error){
      $location.path('/login');
    });
  };

  controller.login = function() {
    console.log('logging in');
    $http.post('/login', {
      email: controller.email,
      password: controller.password
    }).then(function(){
    controller.loggedInEmail();
    $location.path('/resources');
    }, function(error) {
      console.log('error loggin in', error);
    });
  };

  controller.adminservice = adminservice;

}
