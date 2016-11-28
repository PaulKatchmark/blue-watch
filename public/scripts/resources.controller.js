angular.module('blueWatchApp')
    .controller('ResourcesController', ResourcesController);


function ResourcesController($http, $location, $q, ResourcesService,$scope) {

  var controller = this;
  controller.categories = [];
  controller.resources=[];
  controller.openIcons =[];
  controller.capturedCompany = '';
  controller.capturedDescription = '';
  controller.capturedContact = '';
  controller.capturedWebsite = '';
  controller.capturedStreet = '';
  controller.capturedStreet2 = '';
  controller.capturedCity = '';
  controller.capturedState = '';
  controller.capturedZip = '';
  controller.capturedCategory = '';
  controller.capturedId='';
  controller.iconColor ='';

  //loads all the false icons on resources page
  controller.getIcons = function() {

      $http.get('/icons').then(function(response) {
          controller.customIconInfo = response.data;
          console.log('controller.customIconInfo ', controller.customIconInfo);
            controller.openIcons = [];
         controller.customIconInfo.forEach(function(info) {
           if (info.inUse === false) {
               controller.openIcons.push(info);
              //  controller.openIcons = JSON.parse(controller.openIcons);
           }
          }); //End of for each

          console.log('response in ResourcesController ', controller.openIcons);
      });

  }; //End of getResources

  controller.getIcons();


  //controller to create new resource
  controller.createresource = function() {

  var address = controller.street + ' ' + controller.city + ' ' + controller.state + ' ' + controller.zip;

        controller.verifyAddress(address).then(function(response) {
            var lat = response.lat;
            var long = response.long;
            var body = {
                company: controller.company,
                description: controller.description,
                contact: controller.contact,
                website: controller.website,
                street: controller.street,
                street2: controller.street2,
                city: controller.city,
                state: controller.state,
                zip: controller.zip,
                category: controller.category,
                lat: lat.toString(),
                long: long.toString()
            };

            console.log('body in createresource', body);
            $http.post('/resource', body).then(function() {
                controller.getResources();
            }, function(error) {
                console.log('error creating resource', error);
            });
        });

  };
    controller.getResources = function() {

        $http.get('/resource').then(function(response) {
            controller.resources = response.data;
            console.log(response);
        });
    };
    controller.getResources();


  //function to set value of icon to true if chosen for category
  controller.setIconInUse = function(){
    for (i=0; i<controller.openIcons.length; i++) {
      if (controller.openIcons[i].color == controller.iconColor) {
        console.log('inside if statement ');
        var data = {
          id: controller.openIcons[i]._id,
          pin: controller.openIcons[i].pin,
          color: controller.openIcons[i].color,
          inUse: true
        };
      console.log('data ', data);
      $http.put('/icons/'+data.id, data
    ).then(function(response){
      controller.getIcons();
      }, function(error) {
        console.log('error updating icons', error);
      });
    };
  };
  };



    controller.captureInfo = function(company, description, contact, website, street, street2, city, state, zip, category, id) {
        controller.capturedCompany = company;
        controller.capturedDescription = description;
        controller.capturedContact = contact;
        controller.capturedWebsite = website;
        controller.capturedStreet = street;
        controller.capturedStreet2 = street2;
        controller.capturedCity = city;
        controller.capturedState = state;
        controller.capturedZip = zip;
        controller.capturedCategory = category;
        controller.capturedId = id;
        // console.log('capturedId',controller.capturedId)
    };

    controller.updateResource = function(id) {
        var address = controller.capturedStreet + ' ' + controller.capturedCity + ' ' + controller.capturedState + ' ' + controller.capturedZip;
        console.log(address);
        controller.verifyAddress(address).then(function(response) {
            var lat = response.lat;
            var long = response.long;
            var body = {
                company: controller.capturedCompany,
                description: controller.capturedDescription,
                contact: controller.capturedContact,
                website: controller.capturedWebsite,
                street: controller.capturedStreet,
                street2: controller.capturedStreet2,
                city: controller.capturedCity,
                state: controller.capturedState,
                zip: controller.capturedZip,
                category: controller.capturedCategory,
                lat: lat.toString(),
                long: long.toString()
            };
            // console.log(id);

            $http.put('/resource/' + id, body).then(function(response) {
                controller.getResources();
                controller.setIconInUse();
            }, function(error) {
                console.log('error editing resource', error);
            });
        });
    };

    controller.deleteResource = function(id) {
        $http.delete('/resource/' + id).then(function(response) {
            console.log(response);
            controller.getResources();
        });

    }; //End deleteResource

    controller.createCategory = function() {
        var data = {
            categoryName: controller.categoryName,
            color: controller.color
        };
        console.log(data);
        $http.post('/categories', data).then(function(response) {
            controller.getcategories();
            controller.setIconInUse();
        }, function(error) {
            console.log('error creating resource', error);
        });

    }; //End of createCategory


    controller.getcategories = function() {
        $http.get('/categories').then(function(response) {
            // console.log(response);
            controller.categories = response.data;
        });
    };

    controller.getcategories();

//updateCategory function
    controller.updateCategory = function(category) {
        var body = {
            categoryName: category.categoryName,
            color: category.color
        };
        var id = category._id;

        $http.put('/categories/' + id, body).then(function(response) {
          controller.getcategories();
          controller.getResources();

        }, function(error) {
            console.log('error editing categories', error);
        });
    }; //end of updateCategory


    //find id to pass into delete category model confirmation
    controller.findCategoryId = function(id) {
        idToDelete = id;
    };
    // delete category
    controller.deleteCategory = function() {
        $http.delete('/categories/' + idToDelete).then(function(response) {
            controller.getcategories();
        }, function(error) {
            console.log('error deleting category');
        });
    };


    controller.verifyAddress = function(address) {
        return $q(function(resolve, reject) {
            var geocoder = new google.maps.Geocoder();
            console.log(address);

            geocoder.geocode({
                address: address
            }, function(results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    var lat = results[0].geometry.location.lat();
                    var long = results[0].geometry.location.lng();
                    resolve({
                        lat,
                        long
                    });
                } else { // if status value is not equal to "google.maps.GeocoderStatus.OK"
                    // warning message
                    alert("There is no address found! Please check and verify address is correct " + status);
                    reject();
                }
            });
        });
  };



// other way to show dropdown functionality

//   $('.selected-items-box').bind('click', function(e){
//     e.stopPropagation();
//     $('.multiple-select-wrapper .list').toggle('slideDown');
//   });
//
//   $('.multiple-select-wrapper .list').bind('click', function(e){
//   	e.stopPropagation();
//     	$('.multiple-select-wrapper .list').slideUp();
//   });
//
//   $(document).bind('click', function(){
//   	$('.multiple-select-wrapper .list').slideUp();
//   });
//
// controller.selectedColor=function(marker){
//     controller.capturedMarker=marker;
//     console.log(marker);
// }









} //End of ResourcesController

//directive to convert url to correct format
angular.module('blueWatchApp')
.directive('httpPrefix', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, controller) {
            function ensureHttpPrefix(value) {
                // Add prefix if we don't have http:// prefix already AND we don't have part of it
                if(value && !/^(https?):\/\//i.test(value)
                   && 'http://'.indexOf(value) !== 0 && 'https://'.indexOf(value) !== 0 ) {
                    controller.$setViewValue('http://' + value);
                    controller.$render();
                    return 'http://' + value;
                }
                else
                    return value;
            }
            controller.$formatters.push(ensureHttpPrefix);
            controller.$parsers.splice(0, 0, ensureHttpPrefix);
        }
    };
});
