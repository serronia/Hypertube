const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

module.exports = {
    api_req: function (req, res) {
        let i = 0;
        let j = 20; //nombre de film par page
        let k = 1;  //numero de la page
        var tab = new Array();
        console.log("api_rep hit on api function");
        fetch("https://yts.am/api/v2/list_movies.json?sort_by=year&minimum_rating=5&limit=" + j + "&quality=1080p&page=" + k)
            .then((res) => res.json())
            .then(async data => {
                while (i < j) {
                //    console.log(data.data.movies[i]);
                    console.log("titre =>", data.data.movies[i].title);
                    console.log("annee =>", data.data.movies[i].year);
                    console.log("genre =>", data.data.movies[i].genres);
                    console.log("affiche =>", data.data.movies[i].large_cover_image);
                    console.log("synopsis =>", data.data.movies[i].synopsis);
                    console.log("duree min =>", data.data.movies[i].runtime);
                    console.log("note =>", data.data.movies[i].rating);
                    console.log("ID_film", data.data.movies[i].id);
                    tab[i] = data.data.movies[i].title;
                    i++;
                }
                res.send(tab);
            })

    },

    api_by_id: function (req, res, id) {
        var tab = new Array();
        fetch("https://yts.am/api/v2/movie_details.json?movie_id="+id)
            .then((res) => res.json())
            .then(async data => {
                //        console.log(data.data.movie.title);
                //        console.log(data.data.movie);
                //console.log(data.data.movies[i].torrents[1].quality);
                console.log("titre =>", data.data.movie.title);
                console.log("annee =>", data.data.movie.year);
                //         console.log("genre =>", data.data.movie.genres);
                console.log("langue =>", data.data.movie.language);
                console.log("affiche =>", data.data.movie.large_cover_image);
                console.log("description =>", data.data.movie.description_full);
                console.log("background_image =>", data.data.movie.background_image);
                console.log("duree min =>", data.data.movie.runtime);
                console.log("note =>", data.data.movie.rating);
                if (data.data.movie.torrents[0].seeds > data.data.movie.torrents[1].seeds) {
                    console.log("qualite =>", data.data.movie.torrents[0].quality);
                    console.log("seeds =>", data.data.movie.torrents[0].seeds);
                    console.log("hash =>", data.data.movie.torrents[0].hash);
                }
                else {
                    console.log("qualite =>", data.data.movie.torrents[1].quality);
                    console.log("seeds =>", data.data.movie.torrents[1].seeds);
                    console.log("hash =>", data.data.movie.torrents[1].hash);
                }
                tab[0] = "lol";
                res.send(tab);
            })

    },
};