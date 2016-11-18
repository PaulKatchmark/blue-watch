angular.module('blueWatchApp')
    .factory('adminservice', function($http){

  var adminservice = this;
  //this is to use logged in user in view
  adminservice.user = "";

    adminservice.loggedin = function(){
      return $http.get('/admin/adminSchema').then(function(response) {
        adminservice.user = response.data.email;
        console.log('adminservice user', adminservice.user);
        return adminservice.user;

      },function(error){
        return false;
      }
    );
    };
    return this;
});
