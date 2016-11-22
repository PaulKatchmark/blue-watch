const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/connection');
const path = require('path');
const login = require('./routes/login');
const logout = require('./routes/logout');
const review = require('./routes/reviews');
const resources = require('./routes/resources');
const admin = require('./routes/admin');
const categories = require('./routes/categories');
const auth = require('./auth/setup');
const passport = require('passport');
const session = require('express-session');


const sessionConfig = {
  secret: 'super secret key goes here', // TODO this should be read from ENV
  key: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000,
    secure: false
  }
};

// This line was commented out
connection.connect();
auth.setup();

const app = express();


app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', login);
app.use('/logout', logout);
app.use('/reviews', review);
app.use('/resource', resources);
app.use('/admin', ensureAuthenticated, ensureAccessLevel, admin);
app.use('/categories', categories);

//This is duplicate
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});


app.get('/authenticated', ensureAuthenticated);


app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

// everything beyond this point must be authenticated
app.use(ensureAuthenticated);


// app.get('/resources', function(req, res){
//   res.sendFile('logged in');
// });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
}

function ensureAccessLevel(req, res, next){
    //ensure user has accessLevel = yes
    if (req.user.accessLevel !== 'yes'){
        return res.sendStatus(403);
    } else {
        next();
    }
};

var server = app.listen(3000, function() {
  console.log('Listening on port', server.address().port);
});
