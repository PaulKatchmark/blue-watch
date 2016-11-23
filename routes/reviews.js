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
  console.log('getting reviews');

//finds all users inside admin database
  Review.find({}).then(function(reviews){
        res.send(reviews);

  }).catch(function(err){
    console.log('Error in /reviews', err);
    res.sendStatus(500);
  });
});

module.exports = router;
