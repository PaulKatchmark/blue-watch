const router = require('express').Router();
const Admin = require('../models/adminSchema');

router.post('/', function(req, res) {
  console.log('registering new admin');
  const admin = new Admin({email: req.body.email, password: req.body.password});

  admin.save().then(function() {

      //where is req.login from?
    req.login(admin, function(err){
      if (err) {
        return res.sendStatus(500);
      }
      res.sendStatus(201);
    });

  }).catch(function(err){
    console.log('Error in /register', err);
    res.sendStatus(500);
  });
});

module.exports = router;
