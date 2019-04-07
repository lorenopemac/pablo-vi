var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CursoSchema = Schema({
    anio: Number,
    nivel: {type: Schema.Types.ObjectId, ref: 'Nivel'},
    division: String
});
var Curso = mongoose.model('Curso', CursoSchema, 'cursos');

module.exports = Curso;
