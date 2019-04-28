const express = require('express');
let api = require('../api_req');
let magnet = require('../util/magnet');
let download = require('../download');
const router = express.Router()

module.exports = {
    flux_video: function (req, res, id_user, id_movie) {
        api.film_by_id(id_movie).then(data => {
            console.log(data.hash);
            magnet.magnet_creation(data.hash).then(data => {
                console.log("le magnet recup vaut =>", data);
                download(data, res, id_movie, id_user).then(final_data => {
                    console.log(final_data);
                    str = JSON.stringify({
                        alors: "ca fonctionne"
                    })
                    res.status(206).json(str);
                });
            });
        })
    },

};