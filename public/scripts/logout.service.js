angular.module('blueWatchApp')
  .service('LogoutService', LogoutService);

  function LogoutService($http) {
    console.log('service loaded');
     this.status = true;
}
