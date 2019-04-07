'use strict'

var Materia = require('../models/materia');

function getMaterias(req, res) {
    
    Materia.find()
    .populate({path: 'nivel'})
    .exec(function(error,materias) {
        if (error) {
            return res.status(400).json({
                title: 'Ocurrió un error',
                error: error
            });
        }

        var materiasRet = []
        var cont = 0;
        materias.forEach(materia => {
            cont++;
            if (materia.nivel._id == req.params.idNivel) {
                materiasRet.push(materia)
            }

            if(cont == materias.length){
                if (materiasRet.length == 0) {
                    return res.status(404).json({
                        title: 'Error',
                        error: 'No hay materias'
                    });
                }
                else{
                    res.status(200).json({
                        message: 'Success',
                        obj: materiasRet
                    });
                }
            }
        });
    })
}

function getMateria(req, res) {
    console.log('GET MATERIA')
}

function updateMateria(req, res) {
    console.log('UPDATE MATERIA')
}

function saveMateria(req, res) {
    console.log('SAVE MATERIA')
}

function deleteMateria(req, res) {
    console.log('DELETE MATERIA')
}

module.exports = {
    getMaterias,
    getMateria,
    updateMateria,
    saveMateria,
    deleteMateria
}