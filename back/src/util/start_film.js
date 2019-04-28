const api = require('../api_req');
const magnet = require('../util/magnet');
const download = require('../download');

module.exports = {
    flux_video: function (req, res, id_user, id_movie) {
        api.film_by_id(id_movie).then(data => {
            console.log(data.hash);
            magnet.magnet_creation(data.hash).then(data => {
                console.log("le magnet recup vaut =>", data);
                download(data, res, id_movie, id_user)
            });
        })
    },
};