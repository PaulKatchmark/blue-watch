angular.module('blueWatchApp')
.controller('AdminSetupController', AdminSetupController);

function AdminSetupController($http) {
console.log('AdminSetupController loaded!');

var admin = this;

admin.addNewUser = function(email, password){
    var data = {
        email:email,
        password:password
    };
console.log('da')
$http.post('admin', data).then(function(response){
    console.log(response);
});


}; //End of addNewUser




}; // End of AdminSetupController
