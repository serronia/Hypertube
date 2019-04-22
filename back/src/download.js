const TorrentStream = require('torrent-stream');
const fs = require('fs');
const pump = require('pump');
const Mongoose = require('Mongoose');
const MovieList = require('./model/ViewedMovie');
const Express = require('Express');
const Router = Express.Router();

// const FfmpegCommand = require('fluent-ffmpeg');
// const command = new FfmpegCommand();

const database = process.env.C_MONGO;
Mongoose.connect(database);

const insertFilmDB = (userID, filmID) => {
    return new Promise((resolve, reject) => {
        let movie = new MovieList({
            User_ID: userID,
            Movie_ID: filmID,
            Date_vue: Date.now()
        });
    });
};

const downloadTorrent = (magnet, res) => {
    MovieList.findOne({User_ID: userID, Movie_ID: filmID}).then(doc => {
        if (doc) {
            resolve('already exist');
        } else {
            movie.save(error => {
                if (error) {
                    reject("viewed movie not saved, error : ", error);
                } else {
                    resolve('viewed movies saved.');
                }
            });
        }
    });

    const opts = {
        tmp: 'streams',          // Root folder for the files storage.
        // connections: 100,     // Max amount of peers to be connected to.
        // uploads: 10,          // Number of upload slots.
        // tmp: './streams',          // Root folder for the files storage.
        // Defaults to '/tmp' or temp folder specific to your OS.
        // Each torrent will be placed into a separate folder under /tmp/torrent-stream/{infoHash}
        path: './streams/', // Where to save the files. Overrides `tmp`.
        // verify: true,         // Verify previously stored data before starting
        // Defaults to true
        // dht: true,            // Whether or not to use DHT to initialize the swarm.
        // Defaults to true
        // tracker: true,        // Whether or not to use trackers from torrent file or magnet link
        // Defaults to true
        // trackers: [
        //     'udp://tracker.openbittorrent.com:80',
        //     'udp://tracker.ccc.de:80'
        // ],
        // Allows to declare additional custom trackers to use
        // Defaults to empty
        // storage: myStorage()  // Use a custom storage backend rather than the default disk-backed one
    };

    let engine = TorrentStream(magnet, opts);

    engine.on('ready', () => {
        let file = engine.files[0];
        let stream = file.createReadStream();

        console.log(file.path);
        pump(stream, res);
    });

    engine.on('download', () => {
        console.log(engine.swarm.downloaded);
    })
};

module.exports = downloadTorrent;