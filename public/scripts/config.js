angular.module('blueWatchApp').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    // controller: 'HomeController as home'
  }).when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController as login'
  }).when('/resources', {
    templateUrl: 'views/resources.html',
    controller: 'ResourcesController as resources'
  }).when('/adminSetup', {
    templateUrl: 'views/adminSetup.html',
    // controller: 'adminSetupController as adminSetup'
  }).when('/approval', {
    templateUrl: 'views/approval.html',
    // controller: 'ApprovalController as approval'
  }).otherwise({
    templateUrl: 'views/home.html',
  });
});
