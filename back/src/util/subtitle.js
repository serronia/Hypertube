const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const yifysubtitles = require('yifysubtitles');
const fs = require('fs');

// const OpenSubtitles = require('opensubtitles-api');
// const OS = new OpenSubtitles('OSTestUserAgent');
// OS.search({
//     imdbid: 'tt0314979',
//     sublanguageid: 'fre',
//     extensions: ['srt', 'vtt'],
//     gzip: true
// }).then(subtitles => {
//     if (subtitles.fr) {
//         console.log('Subtitle found:', subtitles);
//         require('request')({
//             url: subtitles.fr.url,
//             encoding: null
//         }, (error, response, data) => {
//             if (error) throw error;
//             require('zlib').unzip(data, (error, buffer) => {
//                 if (error) throw error;
//                 const subtitle_content = buffer.toString(subtitles.fr.encoding);
//                 console.log('Subtitle content:', subtitle_content);
//             });
//         });
//     } else {
//         throw 'no subtitle found';
//     }
// }).catch(console.error);
 
// yifysubtitles(imdb, {path: '/tmp', langs: ['en', 'fr', 'es']})
//     .then(res => {
//         console.log(res);
//     })
//     .catch(err => console.log(err));

module.exports = {
    get_subtitle: function (req, res, imdb_code, langue) {
        console.log("dans subtitle.js");
        console.log("dans subtitle.js      id_imdb = ", imdb_code);
        //yifysubtitles('tt4157728', {path: './streams/subtitles', langs: ['en', 'fr', 'es']})
        const basePath = './streams/subtitles';
        yifysubtitles(imdb_code, {path: basePath, langs: langue})
        .then(subs => {
            console.log("sub = ", subs);
            let i = 0;
            for(let element in subs)
            {
                const pathRet = `${basePath}/${imdb_code}-${subs[i].langShort}.${subs[i].path.split('.').pop()}`
                fs.rename(subs[i].path, pathRet, e => {
                    if (e) console.log(e);
                })
                subs[i].path = pathRet;
                i++;
            }
            res.status(200).json(subs);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({'message': err});
        });
    },
    /*get_pipe_sub: function(req, res, langue) {
        console.log("Dans pipe");

        path = './streams/subtitles/';

    }*/

}