angular.module('blueWatchApp')
    .controller('ResourcesController', ResourcesController);


function ResourcesController($http, $location, $q, ResourcesService,$scope, adminservice) {

  var controller = this;
  controller.categories = [];
  controller.resources=[];


controller.customIconInfo=[];

    //empty modal
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



  //whenever controller is loaded, will check to see if user which/if any user is logged in
  adminservice.normalLoggedin();

  //loads all the false icons on resources page

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

            controller.company = '';
            controller.description = '';
            controller.contact = '';
            controller.website = '';
            controller.street = '';
            controller.street2 = '';
            controller.city = '';
            controller.state = '';
            controller.zip = '';
            controller.category = '';

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

    controller.getIcons = function() {
        controller.customIconInfo.length=0;

        $http.get('/icons').then(function(response) {
            controller.customIconInfo = response.data;
            console.log('controller.customIconInfo ', controller.customIconInfo);

        });

    }; //End of getResources

    controller.getIcons();


    controller.getcategories = function() {
        $http.get('/categories').then(function(response) {
            // console.log(response);
            controller.categories = response.data;
            console.log(controller.categories);
        });
    };


    controller.getcategories();

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
                controller.getIcons();
                controller.getcategories();
            }, function(error) {
                console.log('error editing resource', error);
            });
        });
    };
    controller.findResourceId = function(id) {
        resourceIdToDelete = id;
    };
    controller.deleteResource = function() {
        $http.delete('/resource/' + resourceIdToDelete).then(function(response) {
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
           controller.getIcons();
        }, function(error) {
            console.log('error creating resource', error);
        });

    }; //End of createCategory



    controller.captureOldColor = function(color){

    controller.oldColor = color;

    }

//updateCategory function
    controller.updateCategory = function(category) {
console.log(category);

        var body = {
            categoryName: category.categoryName,
            color: category.newColor,
            oldColor:category.color
        };
        var id = category._id;

        console.log(body);

        $http.put('/categories/' + id, body).then(function(response) {
          controller.getcategories();
          controller.getResources();
          controller.getIcons();


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
            controller.getIcons();
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
