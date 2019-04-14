const TorrentStream = require('torrent-stream');
const fs = require('fs');

// const FfmpegCommand = require('fluent-ffmpeg');
//
// const command = new FfmpegCommand();

// var express = require('express'),
//     ffmpeg = require('../index');
//
// var app = express();
//
// app.use(express.static(__dirname + '/flowplayer'));
//
// app.get('/', function(req, res) {
//     res.send('index.html');
// });
//
// app.get('/video/:filename', function(req, res) {
//     res.contentType('flv');
//     // make sure you set the correct path to your video file storage
//     var pathToMovie = '/path/to/storage/' + req.params.filename;
//     var proc = ffmpeg(pathToMovie)
//     // use the 'flashvideo' preset (located in /lib/presets/flashvideo.js)
//         .preset('flashvideo')
//         // setup event handlers
//         .on('end', function() {
//             console.log('file has been converted succesfully');
//         })
//         .on('error', function(err) {
//             console.log('an error happened: ' + err.message);
//         })
//         // save to stream
//         .pipe(res, {end:true});
// });
//
// app.listen(4000);

const magnet = 'magnet:?xt=urn:btih:c64f4edabd570549ec40f03a83fb4f3f124b6eac&dn=The.Big.Bang.Theory.S11E11.HDTV.x264-SVA&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969'
const opts = {
    // connections: 100,     // Max amount of peers to be connected to.
    // uploads: 10,          // Number of upload slots.
    tmp: 'streams',          // Root folder for the files storage.
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

const downloadTorrent = (magnet) => {
    return new Promise((resolve, reject) => {
        const Download = TorrentStream(magnet, opts);
        Download.on('ready', () => {
            Download.files.forEach(function (file) {
                console.log('filename:', file.name);

                const reader = file.createReadStream();
                // const writer = fs.createWriteStream(filePath);
            });
        });

        Download.on('download', () => {
            console.log(Download.swarm.downloaded);
        });

        Download.on('idle', () => {
            resolve({200: 'OK'});
            Download.destroy();
        });
    })
};

downloadTorrent(magnet)

    .then(res => {
        console.log(res)
    }).catch(err => {
    console.log(err)
});