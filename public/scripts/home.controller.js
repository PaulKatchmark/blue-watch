angular.module('blueWatchApp')
    .controller('HomeController', HomeController);

function HomeController($http, $location) {

    console.log('Home controller');
    var controller = this;

    //array of all the markers
    controller.markers = [];

    controller.globalMarkers;
    controller.resources;
    controller.selectedCategoryArray;
    //sets where the map is located, type and zoom

    var mapOptions = {
         center            : new google.maps.LatLng(38.62452, -90.18514),
        // center: new google.maps.LatLng(44.9778, 93.2650), //this lat/long to center of cities - jsm
        zoom: 5, //zoom level to show most - jsm
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
        streetViewControl: true,
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

            controller.resources.forEach(function(info) {

                controller.runGeoCode(info);

                console.log(info);

            }); //End of for each


        });

    }; //End of getResources

    controller.runGeoCode = function(info) {

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

                //creates markers
                controller.createMarker(info.lat, info.long, info);
}
        }); //End of geocode

    }; // End of runGeoCode

    //create marker
    controller.createMarker = function(latinfo, lnginfo, info) {

        info.marker = new google.maps.Marker({
            map: controller.map,
            position: new google.maps.LatLng(latinfo, lnginfo),
            title: info.company,
            category: info.category.categoryName,
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
        controller.markers.push(info.marker);

        controller.showVisible(controller.markers); //show all markers

    }; //End of createMarker

    controller.hideMarkers = function(markers) {

        markers.forEach(function(marker){
            marker.setVisible(false);
        });
    };


    controller.showVisible = function(controllerMarkers) {
        var bounds = new google.maps.LatLngBounds();

        controllerMarkers.forEach(function(marker) {
            marker.setVisible(true);

            // extending bounds to contain this visible marker position
            bounds.extend(marker.getPosition());
        });

        // setting new bounds to visible markers of
        controller.map.fitBounds(bounds);
    }

    controller.getResources(); //run getResources function


    //show marker when company name is clicked
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
        selectedCategory: false
    };
    controller.change = {
        checkedCategory: false
    };
    controller.expandCategory = function(category) {

        //array of markers to show
        controller.showMarkers = [];

        controller.selectedCategoryArray = [];

        //will take in what the user wants so it can be listed on the DOM
        controller.resources.forEach(function(resource) {
            if (resource.category.categoryName === category) {
                controller.selectedCategoryArray.push(resource);
                controller.showMarkers.push(resource.marker);
            }
        });
        console.log(controller.markers);
        //hide all markers
        controller.hideMarkers(controller.markers);

        console.log(controller.showMarkers);
        //show markers of selected category
        controller.showVisible(controller.showMarkers);
        console.log('array', controller.selectedCategoryArray);



        //this hides the categoryList and shows the list of selected categories
        controller.change.categoryList = !controller.change.categoryList;
        controller.change.selectedCategory = !controller.change.selectedCategory;
    }

    controller.expandCheckedCategory = function(category) {
        //markers to show based on selected category
        controller.showMarkers = [];
        var vals = [];
        getValues(category);

        function getValues(category) {
            for (var key in category) {
                if (category.hasOwnProperty(key)) {
                    //we only want selected vales in our array
                    if (category[key] !== false) {
                        vals.push(category[key]);
                    }
                }
            }
            return vals;
        }

        console.log(vals);
        controller.checkedCategory = [];

        vals.forEach(function(checkedCategory) {
            var selectedCategoryArray = [];

            controller.resources.forEach(function(resource) {
                if (resource.category.categoryName === checkedCategory) {
                    selectedCategoryArray.push(resource);
                    //add marker to array of markers to show
                    controller.showMarkers.push(resource.marker);
                }

            });
            console.log("controller.resources[0].category.categoryName", controller.resources[0].category.categoryName);
            var name = controller.resources[0].category.categoryName;
            console.log('selectedCategoryArray', selectedCategoryArray);
            controller.checkedCategory.push({
                name: checkedCategory,
                resources: selectedCategoryArray
            });

        });
        //hide all markers
        controller.hideMarkers(controller.markers);
        //show markers of selected category
        controller.showVisible(controller.showMarkers);

        console.log('checkedCategory', controller.checkedCategory);
        //this hides the categoryList and shows the list of selected categories
        controller.change.categoryList = !controller.change.categoryList;
        controller.change.checkedCategory = !controller.change.checkedCategory;
    }
    controller.backCategories = function(category) {
        //refreshes the map and show all
        controller.showVisible(controller.markers);
        controller.search = "";
        controller.change = {
            categoryList: false
        };
        controller.change = {
            selectedCategory: false
        };
        controller.change = {
            checkedCategory: false
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

                controller.map.setZoom(8); //this zoom level needs to be changed - was at 15. jsm

            } else { // if status value is not equal to "google.maps.GeocoderStatus.OK"

                // warning message
                alert("The Geocode was not successful for the following reason: " + status);

            }

        });
    }

};
