const express = require('express');
//can't use same const name unlike variable - (JSM - who made this comment & what?)
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('express').Router();
const mongoose = require('mongoose');
const Resources = require('../models.resourceSchema.js');
const Admin = require('../adminSchema.js');
const Category = require('../categorySchema.js');


//post new resources and attach category
router.post('/', function(req,res){
  var resource = new Resource(req.body);
  resource.categoryId = req.category.id;

  resource.save().then(function(resource){
      res.sendStatus(201);
    }).catch(function(err){
      console.log('error in post resource', err);
      res.sendStatus(500);
  });
});

module.exports = router;
