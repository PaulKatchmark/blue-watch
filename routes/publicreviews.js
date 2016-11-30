const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('express').Router();
const mongoose = require('mongoose');
const Review = require('../models/reviewSchema.js');
const nodemailer = require('nodemailer');

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

router.get('/:id', function(req, res) {
  var id = req.params.id;
console.log('id', id);
Review.find({ "resource_id" : id, "approved": true}).then(function(review){
  console.log(review);
  res.send(review);
}).catch(function(err){
  console.log('Error getting review', err);
});
});


router.post('/mail', function(req,res){

    console.log('in mail get');
var transporter = nodemailer.createTransport('smtps://bwatch36%40gmail.com:bluewatch36@smtp.gmail.com');
  //
  // var authConfig = {
  //   user: 'levy.kohout@gmail.com',
  //   scope: 'https://mail.google.com',
  //   clientId: credentials.mail.clientId,
  //   clientSecret: credentials.mail.clientSecret,
  //   refreshToken: req.user.refreshtoken,
  //   accessToken: req.user.accesstoken
  // }
  //
  // // create nodemailer transporter for sending email
  // var transporter = nodemailer.createTransport({
  //   service: 'Gmail',
  //   auth: {
  //     xoauth2: xoauth2.createXOAuth2Generator(authConfig)
  //   }
  // });
  //
  //
  var mailOptions = {
   from: 'bwatch36@gmail.com',
   to:'juliesmike@gmail.com',
   subject: 'A new review has been added ',
   html: '<div><p>You have a new review pending for approval! Click link below to check review!</p></div><div> <a href="http://localhost:3000/approval">Click Here </a></div>'
  };
  //
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    } else {
      console.log('Message sent: ' + info.response);
      res.send(info.response);
    }
  }); // end sendMail


});

module.exports = router;
