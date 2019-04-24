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



router.get('/api', (req, res) => {
	api.api_req(req, res, req.params.param);
	})

router.get('/api_by_id/:p1', (req, res) => {
	api.api_by_id(req, res, req.params.p1);
	})

router.get('/api_by_id_omdb/:p1', (req, res) => {
	api.api_by_id_omdb(req, res, req.params.p1);
	})

router.get('/research', /*Jwthandle.verify,*/ (req, res) => {
	api.api_research(req, res, req.params.param);
});

router.get('/api_getfilm_id/:id_movie', (req, res) => {
	//res.send("l\'api va s\'afficher la =>"+ req.params.id_movie);
	console.log("coucou je suis bien sur la bonne route");
	flux.flux_video(req, res, req.params.id_movie);
})
module.exports = router;