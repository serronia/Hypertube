const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const {sha512, genRanString} = require('../util/password');

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
              
    },/*
    email: {
        type: String,
        match: /[^@]+@[^@]+\.[\w]{1,4}/,
        required: true
    },
    password: {
        type: String,
    },*/
    googleId: String
    /*actif: {
        type: Boolean,
        default: false
    },
    ssoid: {
        intraId: String,
        googleId: String
    }*/
});
mongoose.plugin(findOrCreate);
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
