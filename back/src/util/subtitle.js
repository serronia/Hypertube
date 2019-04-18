const OpenSubtitles = require('opensubtitles-api');
const OS = new OpenSubtitles('OSTestUserAgent');
OS.search({
    imdbid: 'tt0314979',
    sublanguageid: 'fre',
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