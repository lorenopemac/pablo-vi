'use strict'

var express = require('express');
var CursoController = require('../controllers/curso');
var ExamenIngresoController = require('../controllers/examenIngreso');
var AlumnoController = require('../controllers/alumno');
var api = express.Router();

// OBTENER CURSOS DE UN AÑO ESCOLAR
api.get('/obtenerCursos/:anio',CursoController.getCursos);

// OBTENER EXAMENES DE INGRESO DEL CURSO EN ESE AÑO 
api.get('/obtenerExamenes/:anio/:nivel',ExamenIngresoController.getExamenesIngreso);

// OBTENER INGRESANTES
api.get('/postulantes/:idCurso/:idExamenIngreso',AlumnoController.getAlumnosPostulantes);

// GUARDAR NOTAS DE INGRESO
api.patch('/notasIngreso/:idCurso/:idExamenIngreso',AlumnoController.saveNotasIngreso);

module.exports = api;