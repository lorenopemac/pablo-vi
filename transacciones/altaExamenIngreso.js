'use strict'

var express = require('express');
var CursoController = require('../controllers/curso');
var ExamenIngresoController = require('../controllers/examenIngreso');
var AlumnoController = require('../controllers/alumno');
var ProfesorController = require('../controllers/profesor');
var MateriaController = require('../controllers/materia');


var api = express.Router();

// OBTENER CURSOS DE UN AÑO ESCOLAR
api.get('/obtenerCursos/:anio',CursoController.getCursos);

// OBTENER EXAMENES DE INGRESO DEL CURSO EN ESE AÑO 
api.get('/obtenerExamenes/:anio/:nivel',ExamenIngresoController.getExamenesIngreso);

// OBTENER INGRESANTES
api.get('/obtenerPostulantes/:idCurso',AlumnoController.getAlumnosPostulantesCurso);

//OBTENER PROFESORES
api.get('/obtenerProfesores/:idMateria',ProfesorController.getProfesores);

// OBTENER MATERIAS DEL CURSO
api.get('/obtenerMaterias/:idNivel',MateriaController.getMaterias);

// GUARDAR NOTAS DE INGRESO
api.post('/guardarExamenIngreso',ExamenIngresoController.saveExamenIngreso);

module.exports = api;