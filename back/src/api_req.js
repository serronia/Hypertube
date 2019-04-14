const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

module.exports = {
    api_req: function (req, res, k) {
        let i = 0;
        let j = 20; //nombre de film par page
        var tab = new Array();
        console.log("api_rep hit on api function");
        fetch("https://yts.am/api/v2/list_movies.json?sort_by=year&minimum_rating=6&limit=" + j + "&quality=1080p&page=" + k)
            .then((res) => res.json())
            .then(async data => {
                while (i < j) {
                    str = JSON.stringify({ name:   data.data.movies[i].title,
                            year:  data.data.movies[i].year  ,
                            genres:  data.data.movies[i].genres  ,
                            affiche:  data.data.movies[i].large_cover_image  ,
                            synopsis: data.data.movies[i].synopsis.substr(0, 119) + "..."  ,
                            duree:  data.data.movies[i].runtime  ,
                            rating:  data.data.movies[i].rating  ,
                            id:  data.data.movies[i].id});
                    tab[i]=JSON.parse(str);
                    i++;
                }
                res.status(200).json(tab);
            })
    },

    api_by_id: function (req, res, id) {
        fetch("https://yts.am/api/v2/movie_details.json?movie_id="+id+"&with_cast=true")
            .then((res) => res.json())
            .then(async data => {
                    str = JSON.stringify({ name: data.data.movie.title,
                            year:  data.data.movie.year  ,
                            genres:  data.data.movie.genres  ,
                            affiche:  data.data.movie.large_cover_image  ,
                            duree:  data.data.movie.runtime  ,
                            rating:  data.data.movie.rating  ,
                            langue:  data.data.movie.language,
                            description:  data.data.movie.description_full,
                            background_image:  data.data.movie.background_image,
                            cast : data.data.movie.cast,
                            id:  data.data.movie.id});
                    str=JSON.parse(str);
                res.status(200).json(str);
                /*if (data.data.movie.torrents[0].seeds > data.data.movie.torrents[1].seeds) {
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
                res.send(tab);*/
            })

    },
};