const express = require('express');
//const session = require('express-session');
const router = express.Router();
const mongoose = require('mongoose');
const Usertest = require('../model/User');
const bodyParser = require('body-parser');


const database = process.env.C_MONGO;
mongoose.connect(database);

/*const usertestSchema = new mongoose.Schema({
	nom: String,
	prenom: String,
	age: Number
});*/

//const Usertest = mongoose.model('User', UserSchema);

router.use(bodyParser.json());



router.get('/', (req, res) => {
	res.send('server listening');
});
//router.get('/redirect', router.post('/login'));


/********************************************/
router.get('/users', (req, res) => {
	    Usertest.find({}, (err, users) => {
			if (err)
				res.status(500).send(error);
			else
				res.status(200).json(users);
					
		});
});

router.get('/users/:id', (req, res) => {
	Usertest.findById(req.params.id, (err, users) => {
		if (err) 
			res.status(400).send(error);
		else
			res.status(200).json(users);
	});
});
/*************************************************/
module.exports = router;
