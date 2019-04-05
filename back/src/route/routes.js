const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/User');

const database = process.env.C_MONGO;
mongoose.connect(database);

/*const userSchema = new mongoose.Schema({
	nom: String,
	prenom: String,
	age: Number
});

const User = mongoose.model('User', userSchema);
*/
router.get('/', (req, res) => {
	console.log('server hit /');
	res.send('server listening');
});

router.get('/users', (req, res) => {
	console.log("server hit /users");
	    User.find({}, (err, users) => {
			        if (err)
						res.status(500).send(error);
						if (!users)
							console.log("users vide");
						else
							console.log(users);
						res.status(200).json(users);
					
		});
});

router.get('/users/:id', (req, res) => {
	console.log('tapping ' + req.params.id); 
	    User.findById(req.params.id, (err, users) => {
			        if (err) 
						res.status(500).send(error);
					res.status(200).json(users);
					    });
});

router.get('/adduser', (req, res) => {
	console.log("server hit /adduser");
	 let user = new User({
		         nom: "thevak",
				 prenom: "sh",
				 age: 23
	});
	 user.save(error => {
		if (error)
			res.status(500).send(error);
		res.status(201).json({message: 'User created successfully'});
	});
});

module.exports = router;
