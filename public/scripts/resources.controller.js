angular.module('blueWatchApp')
.controller('ResourcesController', ResourcesController);

function ResourcesController($http, $location) {
  var controller = this;
  controller.categories = [];
  controller.resources=[];

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
    category: controller.category

  };
  console.log(body);
      $http.post('/resource', body
    ).then(function(){
    controller.getResources();
    }, function(error) {
      console.log('error creating resource', error);
    });
  };

  controller.getResources = function(){

      $http.get('/resource').then(function(response){
          controller.resources=response.data;
          console.log(response);
      });

  };
  controller.getResources();


controller.deleteResource=function(id){

    $http.delete('/resource/'+id).then(function(response){
        console.log(response);
        controller.getResources();
    });

}; //End deleteResource

  controller.createCategory = function(){
      var data = {
          categoryName: controller.categoryName,
          color:controller.color
      };
      console.log(data);
      $http.post('/categories', data
  ).then(function(response){
    controller.getcategories();
    }, function(error) {
      console.log('error creating resource', error);
    });

}; //End of createCategory


  controller.getcategories = function(){
    $http.get('/categories').then(function(response){
      console.log(response);
      controller.categories = response.data;
    });
  };
  controller.getcategories();


} //End of ResourcesController
