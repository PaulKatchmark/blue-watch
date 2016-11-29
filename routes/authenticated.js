const router = require('express').Router();

router.get('/', function(req,res){
  if(req.isAuthenticated()){
    res.sendStatus(200);
  }else{
    res.sendStatus(401);
  };
});
