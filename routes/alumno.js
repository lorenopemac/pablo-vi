'use strict'

var express = require('express');
var AlumnoController = require('../controllers/alumno');
var api = express.Router();

// METODOS GET
api.get('/',AlumnoController.getAlumnos);
api.get('/:idAlumno',AlumnoController.getAlumno);

api.get('/postulantes/:idCurso/:idExamenIngreso',AlumnoController.getAlumnosPostulantes);
api.get('/admitidos/:idCurso/:idMateria',AlumnoController.getAlumnosAdmitidos);

// METODOS PATCH
api.patch('/:idAlumno',AlumnoController.updateAlumno);

// METODOS POST
api.post('/',AlumnoController.saveAlumno);

// METODOS DELETE
api.delete('/:idAlumno',AlumnoController.deleteAlumno);

module.exports = api;
