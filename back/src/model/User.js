const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const {sha512, genRanString} = require('../util/password');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true
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
        match: /^[a-z0-9._%+-]{1,64}@[a-z0-9._-]+\.[a-z]{2,255}$/i,
        required: true,
        unique: true

    },
    password: {
        type: String,
    },
    picture: {
        type: String,
    },
    actif: {
        type: Boolean,
        default: false
    },
    ssoid: {
        intra: {
            type: String
        },
        google: {
            type: String
        }
    }
});
mongoose.plugin(findOrCreate);
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
