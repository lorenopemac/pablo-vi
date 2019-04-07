var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfesorSchema = Schema({
    legajo: String,
    nombre: String,
    apellido: String,
    habilitado: [{type: Schema.Types.ObjectId, ref: 'Materia'}]
});

var Profesor = mongoose.model('Profesor', ProfesorSchema, 'profesores');

module.exports = Profesor;
