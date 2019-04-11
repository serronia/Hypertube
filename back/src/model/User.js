const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const {sha512, genRanString} = require('../util/password');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,

        unique: true
    },
    firstname: String,
    lastname: String,
    email: {
        type: String
    },
    password: {
        type: String,
    },
    googleId: String,
    fortytwoId: String
});
mongoose.plugin(findOrCreate);
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
