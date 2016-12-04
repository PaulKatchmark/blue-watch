angular.module('blueWatchApp')
.controller('LoginController', LoginController);

function LoginController($http, $location, adminservice) {
  console.log('LoginController loaded');
  var controller = this;

  //whenever controller is loaded, will check to see if user which/if any user is logged in
    adminservice.loggedin();

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
      firstName: controller.firstName,
      lastName: controller.lastName,
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
