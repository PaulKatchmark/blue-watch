angular.module('blueWatchApp')
.controller('AdminSetupController', AdminSetupController);

function AdminSetupController($http, adminservice) {
console.log('AdminSetupController loaded!');

var admin = this;
admin.usersArray = [];
admin.capturedId = '';
//sets logged in user info
admin.adminservice = adminservice;


admin.addNewUser = function(email, password, access){
    var data = {
        email:email,
        password:password,
        accessLevel: access
    };
console.log('data');
$http.post('/admin', data).then(function(response){
    console.log('successfully added a new user', response);
    admin.getUsers();
    // empty form
    admin.email='';
    admin.password='';
    admin.accessLevel='';
});


}; //End of addNewUser

admin.getUsers = function(){
    $http.get('/admin').then(function(response){
        console.log('successfully get users',response);
        admin.usersArray = response.data;

    });
}//End of getUser

admin.getUsers();

admin.captureInfo = function(id, email, password, access){
admin.capturedId=id;
admin.capturedEmail=email;
admin.capturedPassword=password;
admin.capturedAcessLevel=access;

console.log('capturedId ', admin.capturedId);
};//End of captureId

admin.updateUser = function(email, password,access){
    var data = {
        email:email,
        password:password,
        accessLevel: access
    };
    $http.put('/admin/'+ admin.capturedId, data).then(function(response){
        console.log('successfully updated the user', response);
        admin.getUsers();

        // empty form
        admin.email='';
        admin.password='';
        admin.accessLevel='';

    });
}; //End of updateUser



admin.deleteUser = function(id){

    $http.delete('/admin/'+id).then(function(response){
        console.log('successfully deleted user', response);
        admin.getUsers();
    });
}; //End of deleteUser



}; // End of AdminSetupController
