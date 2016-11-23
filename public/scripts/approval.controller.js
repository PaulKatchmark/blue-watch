angular.module('blueWatchApp')
.controller('ApprovalController', ApprovalController);

function ApprovalController($http, $location) {
    console.log('ApprovalController loaded!');

var review = this;
review.reviewsArray =[];

review.getPendingReviews = function(){
        $http.get('/reviews').then(function(response){
            review.reviewsArray = response.data;
            console.log(review.reviewsArray);
        });


}; //End of getPendingReviews

review.getPendingReviews();



}// End of ApprovalController
