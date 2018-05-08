var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  email: { // TODO: Need to add email validation
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 99
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99
  }
});

// Override 'toJSON' to prevent the password from being returned with the user
// Keeps the Id, name and email and not the password for security reasons
// Sends JSON object to React
userSchema.set('toJSON', {
  transform: function(doc, user, options) {
    var returnJson = {
      id: user._id,
      email: user.email,
      name: user.name
    };
    return returnJson;
  }
});

// Helper method to make sure user entered the correct password
userSchema.methods.authenticated = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res ? this : false);
    }
  });
}

// Mongoose's version of a beforeCreate hook
// Before save, we are hashing the password and reassigning it
userSchema.pre('save', function(next) {
  var hash = bcrypt.hashSync(this.password, 10);
  // store the hash as the user's password
  this.password = hash;
  next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;
