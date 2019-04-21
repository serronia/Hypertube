const express = require('express');
var api = require('../api_req');
var magnet = require('../util/magnet');
var download = require('../download');
const router = express.Router()

module.exports = {
    flux_video: function (req, res, id_movie) {
        console.log("mdr j'ai reussi a venir sur flux_video, gg!");
        api.film_by_id(id_movie).then(data => {
            console.log(data.hash);
            magnet.magnet_creation(data.hash).then(data => {
                console.log("le magnet recup vaut =>", data);
                download(data).then(final_data => {

                    console.log("ntm-------------------------------------------------------------------------------")
                    console.log(final_data[200]._engine.torrent.files[1].path);
                    console.log("ntm fin-------------------------------------------------------------------------------")
                    str = JSON.stringify({
                    //    magnet: data,
                        stp: final_data,
                        alors: "ca fonctionne"
                    })
                    res.status(200).json(str);
                });
            });
        })
    },

};