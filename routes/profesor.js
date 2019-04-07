'use strict'

var express = require('express');
var ProfesorController = require('../controllers/profesor');
var api = express.Router();

// METODOS GET
api.get('/:idMateria',ProfesorController.getProfesores);
api.get('/:idProfesor',ProfesorController.getProfesor);

// METODOS PATCH
api.patch('/:idProfesor',ProfesorController.updateProfesor);

// METODOS POST
api.post('/',ProfesorController.saveProfesor);

// METODOS DELETE
api.delete('/:idProfesor',ProfesorController.deleteProfesor);

module.exports = api;
