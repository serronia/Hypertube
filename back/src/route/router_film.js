const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const database = process.env.C_MONGO;
const Com = require('../model/Com');

mongoose.connect(database);

router.get('/', (req, res) => {
	res.send('server film listening');
});

/**************************************************************/
router.post('/create', (req, res) => {
    var id_film = req.body.id_film;
    var id_user = req.body.id_user;
    var comm = req.body.com;
    var date = new Date(Date.now());

    let com = new Com({
        id_film: id_film,
        id_user: id_user,
        com: comm,
        date: date
    });
    com.save(error => {
        if (error)
        {
            res.status(400).send("Format error, please re-read your input = "+ error);
        }
        else
        {
            res.status(201).json({message: 'Com created successfully'});
        }
    });
  });



  router.get('/getComs/:id', (req, res) => {
    var id_film = req.params.id;
    Com.find({id_film: id_film}, function(err, com){
        if(err){
            console.log("Something wrong when geting com!");
            res.status(400).send("Something wrong when geting com!");
        }
        else
        {
          //console.log("ok com getted  = ", com);
          res.status(201).json({com});
        }
    });

  });
  


module.exports = router;
