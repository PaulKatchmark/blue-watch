angular.module('blueWatchApp').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  var checkAuth = function($http, $location) {
    console.log("resolving");
    return $http.get('/authenticated')
                .catch(function(){
                  $location.path('/login')
                });
  }

  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeController as home'
  }).when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController as login'
  }).when('/resources', {
    templateUrl: 'views/resources.html',
    controller: 'ResourcesController as resources',
    resolve: {
      auth: checkAuth
    }
  }).when('/adminSetup', {
    templateUrl: 'views/adminSetup.html',
    controller: 'AdminSetupController as admin',
    resolve: {
      auth: checkAuth
    }
  }).when('/approval', {
    templateUrl: 'views/approval.html',
    controller: 'ApprovalController as approval',
    resolve: {
      auth: checkAuth
    }
  }).otherwise({
    templateUrl: 'views/home.html',
    controller: 'HomeController as home'
  });
});
