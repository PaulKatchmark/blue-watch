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

//update category route
router.put('/:id', function(req, res) {
  console.log('updating category');
  var id = req.params.id;
  // console.log(id);

  Categories.findById(id, function(err, category){
      if (err){
        res.sendStatus(500);
        return;
      }
      //set values
      category.categoryName = req.body.categoryName;
      category.color = req.body.color;

    category.save(function (err, updatedCategory){
      if (err){
        res.sendStatus(500);
        return;
      }
      res.send(updatedCategory);
    });
  });
}); //end update category

module.exports = router;
