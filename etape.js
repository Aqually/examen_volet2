const fs = require("fs");
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const app = express();
app.set('view engine', 'ejs'); // générateur de templateit
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public
app.use(bodyParser.json())  // pour traiter les données JSON

//acces au fichier à lire sur "/"
app.get('/',  (req, res) => {
    res.sendFile(__dirname + "/public/text/collection_provinces.json")
})

//utiliser le port 8080
app.listen(8080);
