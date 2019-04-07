var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExamenIngresoSchema = Schema({
	fecha: Date,
    profesor: {type: Schema.Types.ObjectId, ref: 'Profesor'},
    materia: {type: Schema.Types.ObjectId, ref: 'Materia'},
});
var ExamenIngreso = mongoose.model('ExamenIngreso', ExamenIngresoSchema, 'examenesingreso');

module.exports = ExamenIngreso;
