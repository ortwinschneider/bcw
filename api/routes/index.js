var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var file_path = process.env.FILE_PATH || '../data/db.json';

/* GET return welcome page. */
router.get('/', function(request, response, next) {
  response.send('BCW API Server');
});

/**
 * GET current status of players attending training
 */
router.get('/players', function(request, response, next) {
  let players = readData();
  response.send(players);
});

/**
 * PUT update player status. -> Expects {"id":1,"name":"Gast 1","isPlaying":false}
 */
router.put('/players', function(request, response, next) {
  let players = readData();
  let index = players.findIndex(el =>  el.id === request.body.id);
  if(index !== -1) {
    players[index] = request.body;
    fs.writeFileSync(path.resolve(__dirname, file_path), JSON.stringify(players));
    response.status(200).send('ok');
  }
});

/**
 * POST add new player to list. Expects {"id":1,"name":"Gast 1","isPlaying":false}
 */
router.post('/players', function(request, response, next) {
  let players = readData();
  request.body.id = getNextId(players);
  players.push(request.body);
  fs.writeFileSync(path.resolve(__dirname, file_path), JSON.stringify(players));
  response.status(200).send('ok');
});

/**
 * DELETE player from list
 */
router.delete('/players/:id', function(request, response, next) {
  let players = readData();
  players = players.filter(el => el.id !== parseInt(request.params.id));
  console.log(players);
  fs.writeFileSync(path.resolve(__dirname, file_path), JSON.stringify(players));
  response.status(200).send('ok');
});

/* Read data from file and return it as JSON */
function readData() {
  let rawdata = fs.readFileSync(path.resolve(__dirname, file_path));
  return JSON.parse(rawdata);
}

/* get max id from list and add one */
function getNextId(data) {
  return (Math.max.apply(Math, data.map(el => el.id)) +1);
}

module.exports = router;
