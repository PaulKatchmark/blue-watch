const router = require('express').Router();
const Admin = require('../models/adminSchema');

router.post('/', function(req, res) {
  console.log('registering new admin');

  const admin = new Admin({
      email: req.body.email,
      password: req.body.password,
      accessLevel:req.body.accessLevel
  });

  admin.save().then(function(user) {
      res.send(user);

  }).catch(function(err){
    console.log('Error in /admin', err);
    res.sendStatus(500);
  });
});

router.get('/', function(req, res) {
  console.log('getting admin users');

//finds all users inside admin database
  Admin.find({}).then(function(people){
        res.send(people);

  }).catch(function(err){
    console.log('Error in /register', err);
    res.sendStatus(500);
  });
});

//get logged in user to display
router.get('/adminSchema', function(req, res) {
  if (req.isAuthenticated()){
    var user = {
      email: req.user.email,
       accessLevel:req.user.accessLevel
    }
    console.log(req.user.accessLevel)
    return res.send(user);
  }
  res.sendStatus(401);
});

router.put('/:id', function(req, res) {
  console.log('updating admin user');
  var id = req.params.id;
  console.log(id);

  Admin.findById(id, function(err, user){
      if (err){
        res.sendStatus(500);
        return;
      }
      //set values
    user.email = req.body.email;
    user.password = req.body.password;
    user.accessLevel = req.body.accessLevel;

    user.save(function (err, updatedUser){
      if (err){
        res.sendStatus(500);
        return;
      }
      res.send(updatedUser);
    });
  });
});



router.delete('/:id', function(req, res) {
  console.log('deleting admin user');
  var id = req.params.id;
  console.log(id);

//finds all users inside admin database
  Admin.remove({ "_id" : id }).then(function(people){
        res.sendStatus(200);

  }).catch(function(err){
    console.log('Error in deleting admin user', err);
    res.sendStatus(500);
  });
});



module.exports = router;
