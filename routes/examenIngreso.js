'use strict'

var express = require('express');
var ExamenIngresoController = require('../controllers/examenIngreso');
var api = express.Router();

// METODOS GET
api.get('/:anio/:nivel',ExamenIngresoController.getExamenesIngreso);
api.get('/:idExamenIngreso',ExamenIngresoController.getExamenIngreso);

// METODOS PATCH
api.patch('/:idExamenIngreso',ExamenIngresoController.updateExamenIngreso);

// METODOS POST
api.post('/',ExamenIngresoController.saveExamenIngreso);

// METODOS DELETE
api.delete('/:idExamenIngreso',ExamenIngresoController.deleteExamenIngreso);

module.exports = api;
