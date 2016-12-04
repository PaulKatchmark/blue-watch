angular.module('blueWatchApp')
.controller('ApprovalController', ApprovalController);

function ApprovalController($http, $location, adminservice) {
    console.log('ApprovalController loaded!');

var review = this;
review.reviewsArray =[];
review.resources=[];

// adminservice.loggedin();
//whenever controller is loaded, will check to see if user which/if any user is logged in
adminservice.normalLoggedin();

review.getPendingReviews = function(){
        $http.get('/reviews').then(function(response){
            review.reviewsArray = response.data;
            review.getResources();
        });


}; //End of getPendingReviews

review.getResources = function(){

    $http.get('/resource').then(function(response){
        review.resources=response.data;
        review.addCompanyName(review.resources);

    });

};

review.getPendingReviews();


review.addCompanyName = function(resources){

    review.reviewsArray.forEach(function(review){
        resources.forEach(function(resource){
        if(review.resource_id == resource._id){
            review.companyName = resource.company;
        }
    });
});
}

review.captureInfo=function(reviews){
    review.capturedCompanyName=reviews.companyName;
    review.capturedComments = reviews.comments;
    review.capturedRating = reviews.rating;
    review.capturedId = reviews._id;
};

review.approvedReview = function(id, comments){
    var data ={
        comments:comments
    }
    $http.put('/reviews/'+id, data).then(function(response){
        console.log(response.data);
        review.getPendingReviews();
    });
};

review.deleteReview = function(id){

    $http.delete('/reviews/'+id).then(function(response){
            review.getPendingReviews();
    });
};




}// End of ApprovalController
