angular.module('blueWatchApp')
    .factory('adminservice', function($http){

  var adminservice = this;
  //this is to create var to store email address if we want to use in view
  adminservice.user = {email: ""};

    this.loggedin = function(){
      return $http.get('/adminservice/moto.users').then(function(response) {
        adminservice.user.email = response.data.email;
        return response.data;
      },function(error){
        return false;
      }
    );
    };
    return this;
});
