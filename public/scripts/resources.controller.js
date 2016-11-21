angular.module('blueWatchApp')
.controller('ResourcesController', ResourcesController);

function ResourcesController($http, $location) {
  var controller = this;
  controller.categories = [];
  controller.resources=[];
  controller.capturedCompany = '';
  controller.capturedDescription = '';
  controller.capturedContact = '';
  controller.capturedWebsite = '';
  controller.capturedStreet = '';
  controller.capturedCity = '';
  controller.capturedState = '';
  controller.capturedZip = '';
  controller.capturedCategory = '';
  controller.capturedId='';

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
          // console.log(response);
      });

  };
  controller.getResources();

  controller.captureInfo = function(company, description, contact, website, street, city, state, zip, category,id){
      controller.capturedCompany = company;
      controller.capturedDescription = description;
      controller.capturedContact = contact;
      controller.capturedWebsite = website;
      controller.capturedStreet = street;
      controller.capturedCity = city;
      controller.capturedState = state;
      controller.capturedZip = zip;
      controller.capturedCategory = category;
      controller.capturedId=id;
      console.log('capturedId',controller.capturedId)
  };


  controller.updateResource = function(id) {
    var body = {
    company: controller.capturedCompany,
    description: controller.capturedDescription,
    contact: controller.capturedContact ,
    website: controller.capturedWebsite,
    street: controller.capturedStreet,
    city: controller.capturedCity,
    state: controller.capturedState,
    zip: controller.capturedZip,
    category: controller.capturedCategory
  };
  console.log(id);
      $http.put('/resource/'+id, body
  ).then(function(response){
    controller.getResources();
    }, function(error) {
      console.log('error editing resource', error);
    });
  };


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
      // console.log(response);
      controller.categories = response.data;
    });
  };
  controller.getcategories();

//updateCategory function
  controller.updateCategory = function(category) {
    // console.log(category);
    var body = {
      categoryName: category.categoryName,
      color:category.color
  };

    $http.put('/categories/'+category._id, body
  ).then(function(response){
    console.log('response in put', response);
    console.log('response.body', response.data);
    controller.getcategories();
    // this will pass on to a new update resources function...
    // var category = response.data.categoryName;
    // var id = response.data._id;
    // var color = response.data.color;
    // controller.updateResources2(category, id, color);

    }, function(error) {
      console.log('error editing categories', error);
    });
  };  //end of updateCategory

} //End of ResourcesController
