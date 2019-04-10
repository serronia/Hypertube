const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');


var UserSchema = new mongoose.Schema({
    username: {
        type: String,

        unique: true
    },
    firstname: {
        type: String
      
    },
    lastname: {
        type: String
              
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    googleID: { type: String },
    fortytwoID: { type: String },
    profile_picture: { type: String }
});
mongoose.plugin(findOrCreate);
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
