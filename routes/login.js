const router = require('express').Router();
const passport = require('passport');

router.post('/', passport.authenticate('local'), function(req, res){
  res.sendStatus(200);
});

router.get('/info', function(req, res) {
  if (req.isAuthenticated()){
    var user = {
      email: req.user.email,
      accessLevel:req.user.accessLevel
    }
    return res.send(user);
  }
  res.sendStatus(401);
});


module.exports = router;
