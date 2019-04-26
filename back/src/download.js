const TorrentStream = require('torrent-stream');
const fs = require('fs');
const pump = require('pump');
const movieList = require('./model/Movie');

const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);

const opts = {
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
    trackers: [
        'udp://open.demonii.com:1337/announce',
        'udp://tracker.openbittorrent.com:80',
        'udp://tracker.coppersurfer.tk:6969',
        'udp://glotorrents.pw:6969/announce',
        'udp://tracker.opentrackr.org:1337/announce',
        'udp://torrent.gresille.org:80/announce',
        'udp://p4p.arenabg.com:1337',
        'udp://tracker.leechers-paradise.org:6969'],
    // Allows to declare additional custom trackers to use
    // Defaults to empty
    // storage: myStorage()  // Use a custom storage backend rather than the default disk-backed one
};

const downloadTorrent = (magnet, res) => {
    // return new Promise((resolve, reject) => {
    //     const Download = TorrentStream(magnet, opts);
    //     Download.on('ready', () => {

    //         file = Download.files[1];
    //             console.log('filename: da', file.path);
    //             try{
    //             if (fs.existsSync("/stream/"+file.path)) 
    //             var stream = fs.createReadStream("/streams/"+file.path);
    //             else
    //             var stream = file.createReadStream();
    //             } catch(err) {
    //                 console.log("c'est pas bon, c'est meme faux")
    //             }
    //             resolve({200: stream});
    //     });
    // Download.on('download', () => {
    //     console.log(Download.swarm.downloaded);
    // });

    // Download.on('idle', () => {
    //     // resolve({200: 'OK'});
    //     Download.destroy();
    //     movieList.findOrCreate({})
    // });

    let engine = TorrentStream(magnet, opts);

    engine.on('ready', () => {
        engine.files.sort((a, b) => b.length - a.length);

        let file = engine.files[0];

        let stream = file.createReadStream();

        let conversion = ffmpeg(stream)
            .withVideoCodec("libvpx")
            .withVideoBitrate("4000")
            .withAudioCodec("libvorbis")
            .withAudioBitrate("256k")
            .audioChannels(2)
            .outputOptions([
                "-preset ultrafast",
                "-deadline realtime",
                "-error-resilient 1",
                "-movflags +faststart",
            ])
            .format("matroska");
        res.contentType('video/webm');
        res.on("close", () => {
            conversion.kill("SIGTERM")
        });
        pump(conversion, res);
    });

    engine.on('download', () => {
        console.log(engine.swarm.downloaded);
    })
    // })
};

module.exports = downloadTorrent;

// downloadTorrent(magnet)

//     .then(res => {
//         console.log(res)
//     }).catch(err => {
//     console.log(err)
// });