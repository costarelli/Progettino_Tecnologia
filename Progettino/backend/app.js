var express = require('express');
var app = express();
const path = require('path');
var cors = require('cors');
app.use(cors());

const fs = require('fs');

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', function (req, res) {
    res.send('Scegli il film che preferisci');
    });

app.get('/film', (req, res) => {
  fs.readFile('api/film.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Errore durante la lettura del file JSON:', err);
      return res.status(500).send('Errore interno del server');
    }

    const productsData = JSON.parse(data);
    console.log(typeof productsData);
    res.setHeader('Content-Type', 'application/json');
    res.json(productsData);
  });
});

const port = process.env.PORT || '3000';
app.set('port', port);
app.listen(port,  () => {console.log('Example app listening on port 3000!');});