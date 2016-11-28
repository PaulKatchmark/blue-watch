angular.module('blueWatchApp')
    .factory('ResourcesService', ResourcesService);

    function ResourcesService($http){
      var service = this;
      service.openIcons = [];

      service.icons = [
         {color: 'green',
         icon: '/assets/img/Green_Marker.png'
         },
         {
             color: 'purple',
           icon: '/assets/img/Purple_Marker.png'
         },
        {
             color: 'yellow',
           icon: '/assets/img/Yellow_Marker.png'
         },
          {
             color:'orange',
           icon: '/assets/img/Orange_Marker.png'
         },
          {
             color:'blue',
           icon: '/assets/img/Blue_Marker.png'
         },
         {
             color:'red',
           icon: '/assets/img/Red_Marker.png'
         },
          {
             color:'pink',
           icon: 'assets/img/Pink_Marker.png'
         },
         {
             color:'light purple',
           icon: '/assets/img/LightPurple_Marker.png'
         },
         {
             color: 'light green',
           icon: '/assets/img/LightGreen_Marker.png'
         },
          {
             color:'lighter green',
           icon: '/assets/img/LighterGreen_Marker.png'
         },
         {
             color:'light blue',
           icon: '/assets/img/LightBlue_Marker.png'
         },
         {
             color:'lighter blue',
           icon: '/assets/img/LighterBlue_Marker.png'
         },
         {
             color: 'gray',
           icon: '/assets/img/Gray_Marker.png'
         },
         {
             color: 'gold',
           icon: 'assets/img/Gold_Marker.png'
         },
         {
             color: 'burgundy',
           icon: 'assets/img/Burgundy_Marker.png'
         }
     ];


       return {
         service: service
       }
    };
