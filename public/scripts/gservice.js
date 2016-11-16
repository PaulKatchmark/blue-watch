angular.module('gservice', [])
    .factory('gservice', function ($http){

      // Service our factory will return
      var googleMapService = {};

      //array of resources obtained from API calls
      var resources = [];

      // Handling Clicks and location selection
      googleMapService.clickLat  = 0;
      googleMapService.clickLong = 0;

    // Convert a JSON of resources into map points
              var convertToMapPoints = function(response){
                  // Clear the resources holder
                  var resources = [];
                  // Loop through all of the JSON entries provided in the response
                  for(var i= 0; i < response.length; i++) {
                      var resource = response[i];
                      var lat = resource.location[1]; //not sure on response from JSON - coming from geocode
                      var long = resource.location[0];
                      var url = 'http://www.google.com/maps/dir/Current+Location/' + lat + ',' + long;


                      // Create popup windows for each record
                      var  contentString =
                          '<p><b>Resource</b>: ' + resource.name +
                          '<br><b>Get Directions</b>: ' + '<a class="marker-link" href="' + url +'">Directions</a>' +
                          '</p>';

                      // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                      resources.push({
                          latlon: new google.maps.LatLng(resource.location[1], resource.location[0]),
                          message: new google.maps.InfoWindow({
                              content: contentString,
                              maxWidth: 320
                          }),
                        //this will be list of items from resource database to display on home.html
                          // destName: resource.destName,
                          // destComment: resource.destComment,
                          // name: resource.name
                  });
              }
          //     // location is now an array populated with records in Google Maps format
              return resources;
          };


    };
    return googleMapService;
