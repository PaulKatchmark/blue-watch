angular.module('blueWatchApp')
.controller('ResourcesController', ResourcesController);

function ResourcesController($http, $location) {
  var controller = this;
  controller.categories = [];

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
    zip: controller.zip,
    categoryId: controller.categoryId

  };
  console.log(body);
      $http.post('/resources', body
    ).then(function(){
      $location.path('/resources');
    }, function(error) {
      console.log('error creating resource', error);
    });
  };

  controller.getcategories = function(){
    $http.get('/categories').then(function(response){
      // console.log(response);
      controller.categories = response.data;
    });
  };
  controller.getcategories();
}
