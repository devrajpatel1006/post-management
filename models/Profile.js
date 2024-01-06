const mongoose = require('mongoose');

const Profile = mongoose.model('Profile', {
    name: String,
    age: String,
    image: String
  });

  
module.exports = Profile;




