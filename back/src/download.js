const TorrentStream = require('torrent-stream');
const fs = require('fs');
const Mongoose = require('Mongoose');
const MovieList = require('./model/ViewedMovie');
const Express = require('Express');
const Router = Express.Router();

const database = process.env.C_MONGO;
Mongoose.connect(database);

const magnet = 'magnet:?xt=urn:btih:1d82c75adef98fc3f44bc39f2a9c8f94dfb6e6b0&dn=Thor.Ragnarok.2017.720p.TS.x264.DUBLADO-.mp4&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969'
const opts = {
    tmp: 'streams',          // Root folder for the files storage.
    // connections: 100,     // Max amount of peers to be connected to.
    // uploads: 10,          // Number of upload slots.
    // Defaults to '/tmp' or temp folder specific to your OS.
    // Each torrent will be placed into a separate folder under /tmp/torrent-stream/{infoHash}
    // path: '/tmp/my-file', // Where to save the files. Overrides `tmp`.
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

const insertFilmDB = (userID, filmID) => {
    return new Promise((resolve, reject) => {
        let movie = new MovieList({
            User_ID: userID,
            Movie_ID: filmID,
            Date_vue: Date.now()
        });

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
    })
};

Router.get('/', (req, res) => {
    // const Download = TorrentStream(magnet, opts);
    //
    // Download.on('ready', () => {
    //     insertFilmDB(15, 275)
    //         .then(result => {
    //             console.log(result);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    //
    //     Download.files.forEach(function (file) {
    //         console.log('filename:', file.name);
    //         let stream = fs.createReadStream('streams/torrent-stream/1d82c75adef98fc3f44bc39f2a9c8f94dfb6e6b0/Thor.Ragnarok.2017.720p.TS.x264.DUBLADO-LAPUMiAFiLMES.COM.mp4');
    //         // let stream = file.createReadStream();
    //         // let filePath = stream._engine.path + '/' + file.name;
    //         // let writer = fs.createWriteStream(filePath);
    //         stream.pipe(res);
    //     });
    // });
    //
    // Download.on('download', () => {
    //     console.log(Download.swarm.downloaded);
    // });
    //
    // Download.on('idle', () => {
    //     Download.destroy();
    // });

    let stream = fs.createReadStream('streams/torrent-stream/1d82c75adef98fc3f44bc39f2a9c8f94dfb6e6b0/Thor.Ragnarok.2017.720p.TS.x264.DUBLADO-LAPUMiAFiLMES.COM.mp4');
    // let stream = file.createReadStream();
    // let filePath = stream._engine.path + '/' + file.name;
    // let writer = fs.createWriteStream(filePath);
    stream.pipe(res);
});

module.exports = Router;
