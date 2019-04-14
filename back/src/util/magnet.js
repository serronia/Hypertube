const express = require('express');
const router = express.Router()

module.exports = {
    magnet_creation: function (req, res, hash) {
         hash ="E090434E40D2C51A46F3362AB9C941CA535DFDBC";
        //dragon 3
        var magnet = "magnet:?xt=urn:btih:"+hash+"&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337&tr=udp://tracker.intenetriors.net:13"
        console.log("le magnet donne => ", magnet); 
        return(magnet);
    },
};