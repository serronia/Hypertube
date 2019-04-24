const OpenSubtitles = require('opensubtitles-api');
const OS = new OpenSubtitles('OSTestUserAgent');
OS.search({
    imdbid: 'tt0314979',
    sublanguageid: 'fre',
    extensions: ['srt', 'vtt'],
    gzip: true
}).then(subtitles => {
    if (subtitles.fr) {
        console.log('Subtitle found:', subtitles);
        require('request')({
            url: subtitles.fr.url,
            encoding: null
        }, (error, response, data) => {
            if (error) throw error;
            require('zlib').unzip(data, (error, buffer) => {
                if (error) throw error;
                const subtitle_content = buffer.toString(subtitles.fr.encoding);
                console.log('Subtitle content:', subtitle_content);
            });
        });
    } else {
        throw 'no subtitle found';
    }
}).catch(console.error);

const yifysubtitles = require('yifysubtitles');
 
yifysubtitles(imdb, {path: '/tmp', langs: ['en', 'fr', 'es']})
    .then(res => {
        console.log(res);
/*
=>
res [ { lang: 'english',
    langShort: 'en',
    path: '/tmp/Zombieland.2009.720p.BrRip.x264-YIFY.vtt',
    fileName: 'Zombieland.2009.720p.BrRip.x264-YIFY.vtt' },
  { lang: 'french',
    langShort: 'fr',
    path: '/tmp/Zombieland.2009.720p.BrRip.x264-YIFY.www.subsynchro.com.vtt',
    fileName: 'Zombieland.2009.720p.BrRip.x264-YIFY.www.subsynchro.com.vtt' },
  { lang: 'chinese',
    langShort: 'zh',
    path: '/tmp/Zombieland.720p.BluRay.x264-CROSSBOW.cht.vtt',
    fileName: 'Zombieland.720p.BluRay.x264-CROSSBOW.cht.vtt' } ]
*/
    })
    .catch(err => console.log(err));