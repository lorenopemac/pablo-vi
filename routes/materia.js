'use strict'

var express = require('express');
var MateriaController = require('../controllers/materia');
var api = express.Router();

// METODOS GET
api.get('/:nivel',MateriaController.getMaterias);
api.get('/:idMateria',MateriaController.getMateria);

// METODOS PATCH
api.patch('/:idMateria',MateriaController.updateMateria);

// METODOS POST
api.post('/',MateriaController.saveMateria);

// METODOS DELETE
api.delete('/:idMateria',MateriaController.deleteMateria);

module.exports = api;
