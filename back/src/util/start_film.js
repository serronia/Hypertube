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
                    //const path_name = final_data[200]._engine.torrent.files[1].path
                    const lenght_path = final_data[200]._engine.torrent.files[1].lenght;
                    if (lenght_path > 100000)
                        path_name = final_data[200]._engine.torrent.files[1].path;
                    else
                        path_name = final_data[200]._engine.torrent.files[0].path;

                    console.log("ntm-------------------------------------------------------------------------------")
                    console.log(path_name);
                    console.log("ntm fin-------------------------------------------------------------------------------")
                    console.log("ntm-------------------------------------------------------------------------------")
                    console.log(final_data[200]._engine.torrent.name);
                    console.log("ntm fin-------------------------------------------------------------------------------")
                    console.log(final_data[200]._engine.torrent.files[1].path);

                    str = JSON.stringify({
                        magnet: data,
                        stp: path_name,
                        alors: "ca fonctionne"
                    })
                    res.status(200).json(str);
                });
            });
        })
    },

};