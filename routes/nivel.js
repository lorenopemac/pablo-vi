'use strict'

var express = require('express');
var NivelController = require('../controllers/nivel');
var api = express.Router();

// METODOS GET
api.get('/',NivelController.getNiveles);
api.get('/:idNivel',NivelController.getNivel);

// METODOS PATCH
api.patch('/:idNivel',NivelController.updateNivel);

// METODOS POST
api.post('/',NivelController.saveNivel);

// METODOS DELETE
api.delete('/:idNivel',NivelController.deleteNivel);

module.exports = api;
