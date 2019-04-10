const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

module.exports = {
    api_req: function (req, res) {
        let i = 0;
        let j = 15;
        var tab = new Array();
        console.log("api_rep hit on api function");
        // res.send("l\'api va s\'afficher la =>");
    //    fetch("https://yts.am/api/v2/list_movies.json?sort_by=year&limit=" + j + "&order_by=desc")
        fetch("https://yts.am/api/v2/movie_suggestions.json?movie_id=" + j)
            .then((res) => res.json())
            .then(async data => {
                 console.log(data);
               /* while (i < j) {
                    console.log(data.data.movies[i].title);
                    tab[i] = data.data.movies[i].title;
                    i++;
                }
                res.send(tab);*/
            })
    },
};