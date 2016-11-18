angular.module('blueWatchApp')
    .factory('adminservice', function($http){

  var adminservice = this;
  //this is to create var to store email address if we want to use in view
  adminservice.user = "";

    adminservice.loggedin = function(){
      return $http.get('/admin/adminSchema').then(function(response) {
        console.log('response in adminservice', response);
        adminservice.user = response.data.email;
        console.log('response.data in service', response.data.email);
      },function(error){
        return false;
      }
    );
    };
    return this;
});
