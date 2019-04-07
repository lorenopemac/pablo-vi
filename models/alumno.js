'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ESQUEMA DE RESULTADO CURSADA
var ResultadoCursada = new Schema({
    materia: {type: Schema.Types.ObjectId, ref: 'Materia'},
    notaTrimestre1: Number,
    notaTrimestre2: Number,
    notaTrimestre3: Number
});

// ESQUEMA DE RESULTADO INGRESO
var ResultadoIngreso = new Schema({
    examenIngreso: {type: Schema.Types.ObjectId, ref: 'ExamenIngreso'},
    nota: Number
});

// ESQUEMA DE BOLETIN INGRESO
var BoletinIngreso = new Schema({
    curso: {type: Schema.Types.ObjectId, ref: 'Curso'},
    resultadosExamenIngreso: [ResultadoIngreso]
});

// ESQUEMA DE BOLETIN CURSADA
var BoletinCursada = new Schema({
    curso: {type: Schema.Types.ObjectId, ref: 'Curso'},
    resultadosMateria: [ResultadoCursada]
});

// ESTADOS DEL ALMUNO
var EstadoPostulante = new Schema({
	fechaInicio: Date,
    boletinIngreso: BoletinIngreso
});

var EstadoAdmitido = new Schema({
    fechaInicio: Date,
    boletines: [BoletinCursada]
});

var EstadoExAlumno = new Schema({
	fechaInicio: Date
});

// ESQUEMA DE ALUMNO
var AlumnoSchema = Schema({
    legajo: { type: String, unique: true },
    nombre: String,
    apellido: String,
    estadoAdmitido: EstadoAdmitido,
    estadoPostulante: EstadoPostulante,
    estadoExAlumno: EstadoExAlumno
});

var Alumno = mongoose.model('Alumno', AlumnoSchema, 'alumnos');

module.exports = Alumno;
