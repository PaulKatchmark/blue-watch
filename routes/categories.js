const router = require('express').Router();
const Categories = require('../models/categorySchema');
const Color = require('../models/colorSchema');
const Resources = require('../models/resourceSchema');

router.get('/', function(req, res) {
  console.log('getting categories');

//finds all categories inside category database
  Categories.find({}).then(function(categories){
    // console.log('categories ', categories);
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

  category.save().then(function(category, err) {
      res.send(category);
      if (err){
        res.sendStatus(500);
        return;
      }
      var color = req.body.color;

      Color.find({'color': color}).then(function(color){
            console.log(color);
                  color.inUse = true;

              color.save(function (err, updatedInUse){
                  console.log('color updated!', updatedInUse);
                if (err){
                  res.sendStatus(500);
                  return;
                }
            });// End of color saved


        });//End of color find




      }).catch(function(err){
        console.log('Error getting review', err);
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
     var categoryName = req.body.categoryName;
      var color = req.body.color;
      var oldColor = req.body.oldColor;
      category.categoryName = categoryName;
      category.color = color;

    category.save(function (err, updatedCategory){
        console.log('category updated',updatedCategory);
      if (err){
        res.sendStatus(500);
        return;
      }
    //    res.send(updatedCategory);
      Color.find({'$or':[{'color': color},{'color':oldColor}]}).then(function(colors){

          console.log(colors);

         for (var i=0; i<colors.length; i++){
             if(colors[i].color == req.body.color){
                 colors[i].inUse = true;
                 console.log('new color', colors[i]);
             } else if(colors[i].color == req.body.oldColor){
                 colors[i].inUse = false;
                  console.log('old Color', colors[i]);
             }

             colors[i].save(function (err, updatedInUse){
                 console.log('color updated!', updatedInUse);
               if (err){
                 res.sendStatus(500);
                 return;
               }
           });// End of color saved

       }//end of for loop

})//End of color find


        // res.sendStatus(200);
        // var usedColor = color[0];



        // usedColor.save(function (err, updatedInUse){
        //   if (err){
        //     res.sendStatus(500);
        //     return;
        //   }
//update resources with new category name and color
        Resources.update({'category._id': id},
          {$set: {'category.categoryName': category.categoryName, 'category.color': category.color }}, {multi: true})
          .then(function(response, err){
              console.log('Resources updated', response);
            if (err){
              res.sendStatus(500);
              return;
            }
        }); //End of resources update

    //   }).catch(function(err){
    //     console.log('Error getting review', err);
    //   });
  }); //End of category save
  }); //End of categories find
  });//End of router put
// }); //end update category

//delete category
router.delete('/:id', function(req, res){
  Categories.findByIdAndRemove(req.params.id, function(err, destination){
    if (err){
      res.sendStatus(500);
      return;
    }res.sendStatus(204);
  });
});

module.exports = router;
