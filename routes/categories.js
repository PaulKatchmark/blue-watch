const router = require('express').Router();
const Categories = require('../models/categorySchema');

router.get('/', function(req, res) {
  console.log('getting categories');

//finds all categories inside category database
  Categories.find({}).then(function(categories){
        res.send(categories);

  }).catch(function(err){
    console.log('Error in /categories', err);
    res.sendStatus(500);
  });
});

router.post('/', function(req, res) {
  console.log('creating new category');

  var category = new Categories({
      categoryName: req.body.categoryName,
      color: req.body.color,

  });

  category.save().then(function(category) {
      res.send(category);
  }).catch(function(err){
    console.log('Error in /categories', err);
    res.sendStatus(500);
  });
});

module.exports = router;
