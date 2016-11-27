angular.module('blueWatchApp')
    .factory('ResourcesService', ResourcesService);

    function ResourcesService($http){
      var service = this;
      service.openIcons = [];

      service.icons = {
         green: {
           icon: '/assets/img/Green_Marker.png'
         },
         purple: {
           icon: '/assets/img/Purple_Marker.png'
         },
         yellow: {
           icon: '/assets/img/Yellow_Marker.png'
         },
         orange: {
           icon: '/assets/img/Orange_Marker.png'
         },
         blue: {
           icon: '/assets/img/Blue_Marker.png'
         },
         red: {
           icon: '/assets/img/Red_Marker.png'
         },
         pink: {
           icon: 'assets/img/Pink_Marker.png'
         },
         'light purple': {
           icon: '/assets/img/LightPurple_Marker.png'
         },
         'light green': {
           icon: '/assets/img/LightGreen_Marker.png'
         },
         'lighter green': {
           icon: '/assets/img/LighterGreen_Marker.png'
         },
         'light blue': {
           icon: '/assets/img/LightBlue_Marker.png'
         },
         'lighter blue': {
           icon: '/assets/img/LighterBlue_Marker.png'
         },
         gray: {
           icon: '/assets/img/Gray_Marker.png'
         },
         gold: {
           icon: 'assets/img/Gold_Marker.png'
         },
         burgundy: {
           icon: 'assets/img/Burgundy_Marker.png'
         }
       };


       return {
         service: service
       }
    };
