angular.module('blueWatchApp')
.controller('ResourcesController', ResourcesController);

function ResourcesController($http, $location) {
  var controller = this;

  //controller to create new resource
  controller.createresource = function() {
    var body = {
    company:  controller.company,
    description: controller.description,
    contact: controller.contact,
    website: controller.website,
    street: controller.street,
    city: controller.city,
    state: controller.state,
    zip: controller.zip
  };
      $http.post('/resources', body
    ).then(function(){
      $location.path('/resources');
    }, function(error) {
      console.log('error creating resource', error);
    });
  };

}
