'use strict'

var express = require('express');
var CursoController = require('../controllers/curso');
var ExamenIngresoController = require('../controllers/examenIngreso');
var AlumnoController = require('../controllers/alumno');
var api = express.Router();

// OBTENER CURSOS DE UN AÑO ESCOLAR
api.get('/obtenerCursos/:anio',CursoController.getCursos);


// OBTENER ALUMNOS CON PROMEDIO
api.get('/admitidos/:idCurso',AlumnoController.getAlumnosAdmitidosCursos);

module.exports = api;