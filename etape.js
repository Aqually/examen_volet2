const fs = require("fs");
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const app = express();
let db;
app.set('view engine', 'ejs'); // générateur de templateit
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public
app.use(bodyParser.json())  // pour traiter les données JSON



//acces au fichier à lire sur "/fichier"
app.get('/fichier',  (req, res) => {
    res.sendFile(__dirname + "/public/text/collection_provinces.json")
})

app.get('/collection', (req, res) => {
    const cursor = db.collection('provinces').find().toArray( (err, data) => {
        if (err)
            return console.log(err)
            // renders index.ejs
        // affiche le contenu de la BD
        res.render('index.ejs', {province: data})
    })
})

//acces au fichier à lire sur "/"
app.get('/provinces',  (req, res) => {
    fs.readFile( __dirname + "/public/text/" + "collection_provinces.json", 'utf8', (err, data) => {
        const province = JSON.parse( data );
        if (err)
            return console.log(err)
        res.render(__dirname + "/views/index.ejs", {province: province})
    });
})

function creerProvince(){
    return {
        code: "QC",
        nom: "Québec",
        capital: Math.floor(Math.random() * 100) + 100
    }
}

//requte pour ajouter
app.get('/ajouter', (req, res) => {
    //on sauvegarde les données dans la DB mongo
    const data = creerProvince();
    db.collection('provinces').save(data, (err, result) => {
        if (err)
            return console.warn(err)
        const cursor = db.collection('provinces').find().toArray( (err, data) => {
            if (err)
                return console.log(err)
                // renders index.ejs
            // affiche le contenu de la BD
            res.render('index.ejs', {province: data})
        })
    })
})
app.get("/", (req, res) =>{
    res.redirect('/provinces');
})

//pour se connecter à la base de donnée Mongo
MongoClient.connect('mongodb://127.0.0.1:27017/provinces', (err, database) => {
    if (err)
        return console.log(err)
    db = database
    app.listen(8080, () => {
        console.log('connexion à la BD et on écoute sur le port 8080')
    })
})
