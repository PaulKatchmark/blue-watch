const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('express').Router();
const mongoose = require('mongoose');
const Review = require('../models/reviewSchema.js');

router.post('/', function(req,res){
  console.log(req.body);
  var review = new Review(req.body);

  review.save().then(function(review){
      res.sendStatus(201);
    }).catch(function(err){
      console.log('error in post review', err);
      res.sendStatus(500);
  });
});

router.get('/', function(req, res) {
  Review.find({}).then(function(review){
        res.send(review);
  }).catch(function(err){
    console.log('Error in /reviews', err);
    res.sendStatus(500);
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
console.log('id', id);
Review.find({ "resource_id" : id }).then(function(review){
  console.log(review);
  res.send(review);
}).catch(function(err){
  console.log('Error getting review', err);
});
});

router.delete('/:id', function(req, res) {
  console.log('deleting a review');
  var id = req.params.id;
  console.log(id);

//finds all users inside admin database
  Review.remove({ "_id" : id }).then(function(review){
        res.sendStatus(200);

  }).catch(function(err){
    console.log('Error in deleting resource', err);
    res.sendStatus(500);
  });
});

router.put('/:id', function(req, res) {
  console.log('approved review');
  var id = req.params.id;
  console.log(req.body);

  Review.findById(id, function(err, review){
      if (err){
        res.sendStatus(500);
        return;
      }
      //set values
      review.comments = req.body.comments;
      review.approved = true

    review.save(function (err, approvedReview){
      if (err){
        res.sendStatus(500);
        return;
      }
      res.send(approvedReview);
    });
  });
});


module.exports = router;
