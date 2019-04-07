var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MateriaSchema = Schema({
	nombre: String,
    nivel: {type: Schema.Types.ObjectId, ref: 'Nivel'}
});
var Materia = mongoose.model('Materia', MateriaSchema, 'materias');

module.exports = Materia;
