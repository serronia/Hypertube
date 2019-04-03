var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

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
        required: true,
        min: String
    },
    picture: {
        type: String,
    }
});
mongoose.plugin(findOrCreate);
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
