var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NivelSchema = Schema({
    nombre: String,
    especialidad: String
});

var Nivel = mongoose.model('Nivel', NivelSchema, 'niveles');

module.exports = Nivel;
