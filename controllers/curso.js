'use strict'

var Curso = require('../models/curso');

function getCursos(req, res) {

    Curso.find({
        'anio': req.params.anio
    })
    .populate('nivel')
    .exec(function(error,cursos) {
        if (error) {
            return res.status(400).json({
                title: 'Ocurrió un error',
                error: error
            });
        }

        if (cursos.length == 0) {
            return res.status(404).json({
                title: 'Error',
                error: 'No se registraron Cursos en ese año'
            });
        }

        res.status(200).json({
            message: 'Success',
            obj: cursos
        });
    })
}

function getCurso(req, res) {
    console.log('GET CURSO')
}

function updateCurso(req, res) {
    console.log('UPDATE CURSO')
}

function saveCurso(req, res) {
    console.log('SAVE CURSO')
}

function deleteCurso(req, res) {
    console.log('DELETE CURSO')
}

module.exports = {
    getCursos,
    getCurso,
    updateCurso,
    saveCurso,
    deleteCurso
}