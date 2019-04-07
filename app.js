const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000

var mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost:27017/pablovi", { useNewUrlParser: true });

var app = express()

app.use(bodyParser.urlencoded({extended: true},{limit: '100mb'}));
app.use(bodyParser.json({limit: '100mb'}));
app.use(express.static(__dirname));
app.use(cors());

// DECLARAR ROUTES
var alumnoRoutes = require('./routes/alumno');
var cursoRoutes = require('./routes/curso');
var examenIngresoRoutes = require('./routes/examenIngreso');
var materiaRoutes = require('./routes/materia');
var nivelRoutes = require('./routes/nivel');
var profesorRoutes = require('./routes/profesor');

var cargarNotasCurso = require('./transacciones/cargarNotasCurso');
var cargarNotasIngreso = require('./transacciones/cargarNotasIngresantes');
var promedios = require('./transacciones/promedios');
var altaExamenIngerso = require('./transacciones/altaExamenIngreso');

// USAR ROUTES
app.use('/alumno', alumnoRoutes);
app.use('/curso', cursoRoutes);
app.use('/examenIngreso', examenIngresoRoutes);
app.use('/materia', materiaRoutes);
app.use('/nivel', nivelRoutes);
app.use('/profesor', profesorRoutes);
app.use('/altaExamenIngreso',altaExamenIngerso);
app.use('/promedios',promedios);
app.use('/cargarNotasCurso',cargarNotasCurso);
app.use('/cargarNotasIngreso',cargarNotasIngreso);

app.listen(port, () => console.log('Servidor Corriendo!'))

module.exports = app;