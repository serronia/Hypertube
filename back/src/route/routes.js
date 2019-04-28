const express = require('express');
//const session = require('express-session');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/User');
const Com = require('../model/Com');
const bodyParser = require('body-parser');
var api = require('../api_req');
var flux = require('../util/start_film')
var player = require('../util/magnet');
var watch = require("../download");
var sub = require("../util/subtitle");

const database = process.env.C_MONGO;
mongoose.connect(database);

router.use(bodyParser.json());


router.get('/', (req, res) => {
	res.send('server listening');
});


/********************************************/
router.get('/users', (req, res) => {
	User.find({}, (err, users) => {
		if (err)
			res.status(500).send(error);
		else
			res.status(200).json(users);
				
	});
});

router.get('/coms', (req, res) => {
	Com.find({}, (err, coms) => {
		if (err)
			res.status(500).send(error);
		else
			res.status(200).json(coms);
				
	});
});

router.get('/users/:id', (req, res) => {
	User.findById(req.params.id, (err, users) => {
		if (err) 
			res.status(400).send(error);
		else
			res.status(200).json(users);
	});
});
/*************************************************/

router.get('/reset_password', (req, res) => {
	console.log("mail sent");
	reset.forgotPassword(req, res)
});


router.get('/api', (req, res) => {
	api.api_req(req, res, req.params.param);
	})

router.get('/api_by_id/:p1', (req, res) => {
	console.log("id film = ",req.params.p1 )
	api.api_by_id(req, res, req.params.p1);
	})
router.get('/magnet', (req, res) => {
	res.send("l\'api va s\'afficher la =>");
	player.magnet_creation(req, res, 1);
})

router.get('/api_by_id_omdb/:p1', (req, res) => {
	api.api_by_id_omdb(req, res, req.params.p1);
	
	})

router.get('/research', /*Jwthandle.verify,*/ (req, res) => {
	api.api_research(req, res, req.params.param);
});

router.get('/api_getfilm_id/:id_movie/:id_user', (req, res) => {
	flux.flux_video(req, res, req.params.id_user, req.params.id_movie);
	
});
router.get('/subtitle/:id_movie_imdb', (req, res) => {
	console.log("id_imdb = ", req.params.id_movie_imdb);
	sub.get_subtitle(req, res, req.params.id_movie_imdb, ["en", "fr", "es", "it", "de"]);
})

router.get('/subtitle_path/:path', (req, res) => {
	console.log("id_imdb sub= ", req.params);
	sub.get_subtitle_path(req, res, req.params.path);
})

module.exports = router;