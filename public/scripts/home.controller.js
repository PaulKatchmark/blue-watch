angular.module('blueWatchApp')
.controller('HomeController', HomeController);

function HomeController($http, $location) {
  var controller = this;

  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(40.0000, -98.0000),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  }

    controller.map = new google.maps.Map(document.getElementById('map'), mapOptions);






};
