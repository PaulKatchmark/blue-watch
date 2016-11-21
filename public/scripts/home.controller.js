angular.module('blueWatchApp')
    .controller('HomeController', HomeController);

function HomeController($http, $location) {

    console.log('Home controller');
    var controller = this;

    controller.globalMarkers;
    controller.resources;
    controller.selectedCategoryArray;
    //sets where the map is located, type and zoom

    var mapOptions = {
        center: new google.maps.LatLng(40.0000, -98.0000),
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP,

        panControl: true,
        mapTypeControl: false,
        panControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        scaleControl: false,
        streetViewControl: false,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        }
    };


    //creates the map
    controller.map = new google.maps.Map(document.getElementById('map'), mapOptions);



    //loads all the resources on page load
    controller.getResources = function() {

        $http.get('/resource').then(function(response) {
            controller.resources = response.data;

            //array of all the markers
            controller.markers = [];


            controller.resources.forEach(function(info) {


                //get address from resource
                console.log('address', info.street + info.city + info.state + info.zip);
                var address = info.street + ' ' + info.city + ' ' + info.state + ' ' + info.zip;
                //call geocode to convert to lat/long
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    address: address
                }, function(results, status) {

                    if (status == google.maps.GeocoderStatus.OK) {

                        info.lat = results[0].geometry.location.lat();
                        info.long = results[0].geometry.location.lng();

                        console.log('Geocode Result', info.lat, info.long);

                        //creates markers
                        createMarker(info.lat, info.long);

                    } else { // if status value is not equal to "google.maps.GeocoderStatus.OK"

                        // warning message
                        alert("The Geocode was not successful for the following reason: " + status);

                    }

                }); //End of geocode

                //create marker
                function createMarker(latinfo, lnginfo) {
                    console.log('Geocode Result', latinfo, lnginfo);
                    console.log('info', info);
                    info.marker = new google.maps.Marker({
                        map: controller.map,
                        position: new google.maps.LatLng(latinfo, lnginfo),
                        title: info.company,
                        visible: true
                    });
                    console.log(info.marker);
                    info.marker.content = '<div class="infoWindowContent">' + info.description + '</div>';

                    var infoWindow = new google.maps.InfoWindow();
                        //opens bubble on marker click
                    google.maps.event.addListener(info.marker, 'click', function() {
                      console.log('marker', info.marker);
                        infoWindow.setContent('<p>' + info.marker.title + ': ' + info.marker.content + '</p>');
                        infoWindow.open(controller.map, info.marker);
                    });

                    google.maps.event.addListener(controller.map, 'idle', function() {
                        controller.map.getBounds().contains(info.marker.getPosition());
                        console.log('city in bounds', info.city, controller.map.getBounds().contains(info.marker.getPosition()));
                    });

                }; //End of createMarker


                console.log(info);

            }); //End of for each


        });

    }; //End of getResources
    controller.getResources();
    console.log('controller.resources before mapping', controller.resources);


                        controller.openInfoWindow = function($event, selectedMarker) {
                                event.preventDefault();
                                console.log(selectedMarker);
                                google.maps.event.trigger(selectedMarker, 'click');
                            }

    //changes the category list to list of resources from selected category
    controller.change = {
        categoryList: false
    };
    controller.change = {
        selectedCateogry: false
    };
    controller.expandCategory = function(category) {

        controller.selectedCategoryArray = [];
    
        //will take in what the user wants so it can be listed on the DOM
        controller.resources.forEach(function(resource) {
            if (resource.category.categoryName === category) {
                controller.selectedCategoryArray.push(resource);
            }
        });
    }
        //this hides the categoryList and shows the list of selected categories
        controller.change.categoryList = !controller.change.categoryList;
        controller.change.selectedCateogry = !controller.change.selectedCateogry;
    }

    controller.backCategories = function(category) {
        controller.search = "";
        controller.change = {
            categoryList: false
        };
        controller.change = {
            selectedCateogry: false
        };
    }

    controller.searchAddress = function() {

        var addressInput = document.getElementById('address-input').value;

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({
            address: addressInput
        }, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {

                var myResult = results[0].geometry.location;

                controller.map.setCenter(myResult);

                controller.map.setZoom(15);

            } else { // if status value is not equal to "google.maps.GeocoderStatus.OK"

                // warning message
                alert("The Geocode was not successful for the following reason: " + status);

            }

        });
    }

};
