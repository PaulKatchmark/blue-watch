const router = require('express').Router();
const passport = require('passport');

router.post('/', passport.authenticate('local'), function(req, res){
  res.sendStatus(200);
});

router.get('/info', function(req, res) {
    console.log(req.body);
  if (req.isAuthenticated()){
    var user = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      accessLevel:req.user.accessLevel
    }
    return res.send(user);
    console.log(user);
  }
  res.sendStatus(401);
});


module.exports = router;
