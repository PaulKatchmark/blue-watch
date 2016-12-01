angular.module('blueWatchApp')
    .factory('adminservice', function($http){

  var adminservice = this;
  //this is to use logged in user in view
  adminservice.user = "";
  adminservice.isLoggedIn = false;
  adminservice.accessLevel=false;

    adminservice.loggedin = function(){
      return $http.get('/admin/adminSchema').then(function(response) {
        adminservice.user = response.data.email;
        adminservice.isLoggedIn = true;
        if (response.data.accessLevel == 'no'){
            adminservice.accessLevel = false;
        } else {
            adminservice.accessLevel = true;
        }
        console.log(response.data.accessLevel);
        console.log('adminservice user', adminservice.user);
        console.log('isLoggedIn ', adminservice.isLoggedIn);
        return adminservice.user;

      },function(error){
        adminservice.isLoggedIn = true; //look here
        console.log('isLoggedIn ', adminservice.isLoggedIn);
        return false;
      }
    );
    };


    adminservice.normalLoggedin = function(){
      return $http.get('/login/info').then(function(response) {
        adminservice.user = response.data.email;
        adminservice.isLoggedIn = true;
        if (response.data.accessLevel == 'no'){
            adminservice.accessLevel = false;
        } else {
            adminservice.accessLevel = true;
        }
        console.log(response.data.accessLevel);
        console.log('adminservice user regular', adminservice.user);
        console.log('isLoggedIn ', adminservice.isLoggedIn);
        return adminservice.user;

      },function(error){
        adminservice.isLoggedIn = true; //look here
        console.log('isLoggedIn ', adminservice.isLoggedIn);
        return false;
      }
    );
    };
    return this;
});
