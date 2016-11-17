angular.module('blueWatchApp')
.controller('AdminSetupController', AdminSetupController);

function AdminSetupController($http) {
console.log('AdminSetupController loaded!');

var admin = this;
admin.usersArray = [];

admin.addNewUser = function(email, password){
    var data = {
        email:email,
        password:password
    };
console.log('da')
$http.post('/admin', data).then(function(response){
    console.log('successfully added a new user', response);
});


}; //End of addNewUser

admin.getUser = function(){
    $http.get('/admin').then(function(response){
        console.log('successfully get users',response);
        admin.usersArray = response.data;

    });
}//End of getUser

admin.getUser();

admin.updateUser = function(email, password, id){
    var data = {
        email:email,
        password:password
    };
    $http.put('/admin/'+id, data).then(function(response){
        console.log('successfully updated the user', response);
    });
}; //End of updateUser



}; // End of AdminSetupController
