angular.module('blueWatchApp')
.controller('AdminSetupController', AdminSetupController);

function AdminSetupController($http) {
console.log('AdminSetupController loaded!');

var admin = this;
admin.usersArray = [];
admin.capturedId = '';

admin.addNewUser = function(email, password){
    var data = {
        email:email,
        password:password
    };
console.log('da')
$http.post('/admin', data).then(function(response){
    console.log('successfully added a new user', response);
    admin.getUsers();
});


}; //End of addNewUser

admin.getUsers = function(){
    $http.get('/admin').then(function(response){
        console.log('successfully get users',response);
        admin.usersArray = response.data;

    });
}//End of getUser

admin.getUsers();

admin.captureId = function(id){
admin.capturedId=id;
console.log('capturedId ', admin.capturedId);
};//End of captureId

admin.updateUser = function(email, password){
    var data = {
        email:email,
        password:password
    };
    $http.put('/admin/'+ admin.capturedId, data).then(function(response){
        console.log('successfully updated the user', response);
        admin.getUsers();
    });
}; //End of updateUser



admin.deleteUser = function(id){

    $http.delete('/admin/'+id).then(function(response){
        console.log('successfully deleted user', response);
        admin.getUsers();
    });
}; //End of deleteUser



}; // End of AdminSetupController
