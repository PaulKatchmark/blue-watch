angular.module('blueWatchApp')
.controller('AdminSetupController', AdminSetupController);

function AdminSetupController($http, adminservice) {
console.log('AdminSetupController loaded!');

var admin = this;
admin.usersArray = [];
admin.capturedId = '';
//sets logged in user info
admin.accessLevel= 'no';
admin.adminservice = adminservice;

admin.adminservice.loggedin();
//whenever controller is loaded, will check to see if user which/if any user is logged in
adminservice.normalLoggedin();

admin.getUsers = function(){
    $http.get('/admin').then(function(response){
        console.log('successfully get users',response);
        admin.usersArray = response.data;

    });
}//End of getUser

admin.addNewUser = function(firstName, lastName, email, password, access){

    var data = {
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password,
        accessLevel: admin.accessLevel
    };
// console.log(data);
$http.post('/admin', data).then(function(response){
    console.log('successfully added a new user', response);
    admin.getUsers();
    // empty form
    admin.firstName='';
    admin.lastName='';
    admin.email='';
    admin.password='';
    admin.accessLevel='no';
});


}; //End of addNewUser



admin.getUsers();

admin.captureInfo = function(id, firstName, lastName, email, password, access){
admin.capturedId=id;
admin.capturedFirstName=firstName;
admin.capturedLastName=lastName;
admin.capturedEmail=email;
admin.capturedPassword=password;
admin.capturedAccessLevel=access;
console.log(access);

console.log('capturedId ', admin.capturedId);
};//End of captureId

admin.updateUser = function(firstName, lastName, email, password,access){
    var data = {
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password,
        accessLevel: access
    };
    $http.put('/admin/'+ admin.capturedId, data).then(function(response){
        console.log('successfully updated the user', response);
        admin.getUsers();

        // empty form
        admin.firstName='';
        admin.lastName='';
        admin.email='';
        admin.password='';
        admin.accessLevel='no';

    });
}; //End of updateUser



admin.deleteUser = function(id){

    $http.delete('/admin/'+id).then(function(response){
        console.log('successfully deleted user', response);
        admin.getUsers();
    });
}; //End of deleteUser



}; // End of AdminSetupController
