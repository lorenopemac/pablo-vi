'use strict'

var express = require('express');
var CursoController = require('../controllers/curso');
var api = express.Router();

// METODOS GET
api.get('/:anio',CursoController.getCursos);
api.get('/:idCurso',CursoController.getCurso);

// METODOS PATCH
api.patch('/:idCurso',CursoController.updateCurso);

// METODOS POST
api.post('/',CursoController.saveCurso);

// METODOS DELETE
api.delete('/:idCurso',CursoController.deleteCurso);

module.exports = api;
