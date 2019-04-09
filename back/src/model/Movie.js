const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const moviesSchema = new mongoose.Schema({
    Magnet: {
        type: String
    },
    Movie_ID: {
        type: String,
        required: true
    },
    Movie_Path: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true
    },
    subtitle: [{
        File_name: String,
        File_path: String
    }],
    Info_Hash: {
        type: String,
        required: false,
        unique: true
    },
    cover_image: {
        type: String,
        required: true        
    }
})

const Movies = mongoose.model('Movie', moviesSchema);
moviesSchema.plugin(findOrCreate);

module.exports = Movies;