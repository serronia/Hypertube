const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const {sha512, genRanString} = require('../util/password');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        min: String,
        max: String
    },
    firstname: {
        type: String,
        lowercase: true        
    },
    lastname: {
        type: String, 
        lowercase: true
              
    },
    email: {
        type: String,
        match: /[^@]+@[^@]+/,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        default: sha512(),
    },
    picture: {
        type: String,
    },
    ssoid: {
        intra: {
            type: String
        }
    }
});
mongoose.plugin(findOrCreate);
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
