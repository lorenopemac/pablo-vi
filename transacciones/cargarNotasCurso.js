'use strict'

var express = require('express');
var CursoController = require('../controllers/curso');
var MateriaController = require('../controllers/materia');
var AlumnoController = require('../controllers/alumno');
var api = express.Router();

// OBTENER CURSOS DE UN AÑO ESCOLAR
api.get('/obtenerCursos/:anio',CursoController.getCursos);

// OBTENER MATERIAS DEL CURSO
api.get('/obtenerMaterias/:idNivel',MateriaController.getMaterias);

// OBTENER ALUMNOS DEL CURSO Y SUS NOTAS DE LA MATERIA
api.get('/admitidos/:idCurso/:idMateria',AlumnoController.getAlumnosAdmitidos);

// GUARDAR NOTAS INGRESADAS
api.patch('/notasCurso/:idCurso/:idMateria',AlumnoController.saveNotasCurso);

module.exports = api;