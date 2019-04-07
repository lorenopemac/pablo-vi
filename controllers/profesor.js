'use strict'

var Profesor = require('../models/profesor');

function getProfesores(req, res) {
    console.log('GET PROFESORES');
    Profesor.find({

    })
    .populate({path: 'habilitado'})
    .exec(function (error,profesores) {
        if (error) {
            return res.status(400).json({
                title: 'Ocurrió un error',
                error: error
            });
        }
        if (!profesores) {
            return res.status(404).json({
                title: 'Error',
                error: 'No se registraron Profesores'
            });
        }
        var profHabilitado = [];
        for (let i = 0; i < profesores.length; i++) {
            for (let j = 0; j < profesores[i].habilitado.length; j++) {
                if (profesores[i].habilitado[j]._id == req.params.idMateria) {
                    profHabilitado.push(profesores[i])
                }
            }

            if (i+1 == profesores.length) {
                res.status(200).json({
                    message: 'success',
                    obj: profHabilitado
                });
            }
        }
    })
}

function getProfesor(req, res) {
    console.log('GET PROFESOR')
}

function updateProfesor(req, res) {
    console.log('UPDATE PROFESOR')
}

function saveProfesor(req, res) {
    console.log('SAVE PROFESOR')
}

function deleteProfesor(req, res) {
    console.log('DELETE PROFESOR')
}

module.exports = {
    getProfesores,
    getProfesor,
    updateProfesor,
    saveProfesor,
    deleteProfesor
}