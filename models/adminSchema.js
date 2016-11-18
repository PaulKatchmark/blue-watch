const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
require('mongoose-type-email');

const adminSchema = new mongoose.Schema({
  email: {type: mongoose.SchemaTypes.Email, required:true},
  password: String,

  accessLevel: String,
}, {collection: 'admin'});

// make sure that everytime we save an admin/modify password, the password gets hashed
adminSchema.pre('save', function(done){
  const user = this;
  if (user.isModified('password')) {
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash){
      if (err) {
        console.log('Error hashing password', err);
        return done(new Error('Error hashing password'));
      }

      user.password = hash;
      done();
    });
  } else {
    done();
  }
});


adminSchema.methods.comparePassword = function(password) {
  const user = this;

  return new Promise(function(resolve){
    console.log('admin password', user.password);
    console.log('password', password);
    bcrypt.compare(password, user.password, function(err, match){
      if (err) {
        console.log('Error comparing password', err);
        return resolve(false);
      }
     console.log('adminSchema comparePassword', match);
      resolve(match);
    });
  });
};


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
