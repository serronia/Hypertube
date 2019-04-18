const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

module.exports = {
    api_req: function (req, res) {
        let i = 0;
        let j = 20; //nombre de film par page
        let k = 0;
        var tab = new Array();
        console.log("api_rep hit on api function");
        requete = "https://yts.am/api/v2/list_movies.json?sort_by=year&limit=" + j + "&quality=1080p&page=" + req.query.page;
        if (req.query.note_min)
            requete = requete + "&minimum_rating=" + req.query.note_min;
        else
            requete = requete + "&minimum_rating=6";
        
        if (req.query.tri)
        {
            requete = requete + "&sort_by=" + req.query.tri+"&order_by=asc";
        }
        if (req.query.genre)
        {
            requete = requete + "&genre=" + req.query.genre;
        }
        fetch(requete)
            .then((res) => res.json())
            .then(async data => {
                if((req.query.year_min == 'null') || (req.query.year_min == "")){year_min=0;}else{year_min=req.query.year_min};
                if((req.query.year_max == 'null') || (req.query.year_min == "")){year_max=10000;}else{year_max=req.query.year_max};
                while (i < j) {
                    if((data.data.movies[i].year >= year_min) && (data.data.movies[i].year <=  year_max))
                    {
                        str = JSON.stringify({ name:   data.data.movies[i].title,
                            year:  data.data.movies[i].year  ,
                            genres:  data.data.movies[i].genres  ,
                            affiche:  data.data.movies[i].large_cover_image  ,
                            synopsis: data.data.movies[i].synopsis.substr(0, 119) + "..."  ,
                            duree:  data.data.movies[i].runtime  ,
                            rating:  data.data.movies[i].rating  ,
                            id:  data.data.movies[i].id});
                        tab[k]=JSON.parse(str);
                        k++;
                    }
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

    api_research: function (req, res) {
        let i = 0;
        let j = 20; //nombre de film par page
        let k=0;
        var tab = new Array();
        var requete="https://yts.am/api/v2/list_movies.json?query_term="+req.query.search+"&limit=20&page="+req.query.page;
        if (req.query.tri)
        {
            requete = requete + "&sort_by=" + req.query.tri;
        }
        else{
            requete = requete + "&sort_by=title"+"&order_by=asc";
        }
        if (req.query.genre)
        {
            requete = requete + "&genre=" + req.query.genre;
        }
        if (req.query.note_min)
            requete = requete + "&minimum_rating=" + req.query.note_min;
        else
            requete = requete + "&minimum_rating=6";

        fetch(requete)
            .then((res) => res.json())
            .then(async data => {
                if((req.query.year_min == 'null') || (req.query.year_min == "")){year_min=0;}else{year_min=req.query.year_min};
                if((req.query.year_max == 'null') || (req.query.year_min == "")){year_max=10000;}else{year_max=req.query.year_max};
                if(data.data.movie_count)
                {
                    if (data.data.movie_count < 20)
                        j = data.data.movie_count;
                    while (i < j) {
                        if((data.data.movies[i].year >= year_min) && (data.data.movies[i].year <= year_max))
                        {
                            str = JSON.stringify({ name:   data.data.movies[i].title,
                                year:  data.data.movies[i].year  ,
                                genres:  data.data.movies[i].genres  ,
                                affiche:  data.data.movies[i].large_cover_image  ,
                                synopsis: data.data.movies[i].synopsis.substr(0, 119) + "..."  ,
                                duree:  data.data.movies[i].runtime  ,
                                rating:  data.data.movies[i].rating  ,
                                id:  data.data.movies[i].id});
                            tab[k]=JSON.parse(str);
                            k++;
                        }
                        i++;
                    }
                    res.status(200).json(tab);
                }
            })
    }
 
};