const express = require('express');
//can't use same const name unlike variable - (JSM - who made this comment & what?)
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('express').Router();
const mongoose = require('mongoose');
const Resource = require('../models/resourceSchema.js');
const Admin = require('../models/adminSchema.js');
const Category = require('../models/categorySchema.js');


//post new resources
router.post('/', function(req,res){
  console.log(req.body);
  var resource = new Resource(req.body);

  resource.save().then(function(resource){
      res.sendStatus(201);
    }).catch(function(err){
      console.log('error in post resource', err);
      res.sendStatus(500);
  });
});

router.get('/', function(req, res) {
  console.log('getting resources');

//finds all users inside admin database
  Resource.find({}).then(function(resources){
        res.send(resources);

  }).catch(function(err){
    console.log('Error in /resources', err);
    res.sendStatus(500);
  });
});

router.delete('/:id', function(req, res) {
  console.log('deleting a resource');
  var id = req.params.id;
  console.log(id);

//finds all users inside admin database
  Resource.remove({ "_id" : id }).then(function(resource){
        res.sendStatus(200);

  }).catch(function(err){
    console.log('Error in deleting resource', err);
    res.sendStatus(500);
  });
});

router.put('/:id', function(req, res) {
  console.log('updating resource');
  var id = req.params.id;
  console.log(id);

  Resource.findById(id, function(err, resource){
      if (err){
        res.sendStatus(500);
        return;
      }
      //set values
      resource.category = req.body.category;
      resource.description = req.body.description;
      resource.company = req.body.company;
      resource.contact = req.body.contact;
      resource.website = req.body.website;
      resource.street = req.body.street;
      resource.street2 = req.body.street2;
      resource.city = req.body.city;
      resource.state = req.body.state;
      resource.zip = req.body.zip;
      resource.lat = req.body.lat;
      resource.long = req.body.long;

    resource.save(function (err, updatedResource){
      if (err){
        res.sendStatus(500);
        return;
      }
      res.send(updatedResource);
    });
  });
});


module.exports = router;
