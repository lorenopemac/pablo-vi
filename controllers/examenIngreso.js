'use strict'

var ExamenIngreso = require('../models/examenIngreso');
var Alumno = require('../models/alumno');

function getExamenesIngreso(req, res) {
    ExamenIngreso.find()
    .exec(function(error,examenes) {
        if (error) {
            return res.status(400).json({
                title: 'Ocurrió un error',
                error: error
            });
        }
        if (!examenes) {
            return res.status(404).json({
                title: 'Error',
                error: 'No se registraron Examenes'
            });
        }
        
        ExamenIngreso.populate(examenes,[
                            { path: 'profesor'},
                            { path: 'materia'},
                            { path: 'materia.nivel'}], 
        function (error, examenesPopu) {
            if (error) {
                return res.status(400).json({
                    title: 'Ocurrió un error',
                    error: error
                });
            }
            var examenesEnAnio = [];
            for (let i = 0; i < examenesPopu.length; i++) {
                
                if (examenesPopu[i].fecha.getFullYear() == req.params.anio && examenesPopu[i].materia.nivel._id == req.params.nivel) {
                    examenesEnAnio.push(examenesPopu[i]);
                }

                if (i+1 == examenesPopu.length) {
                    if (examenesEnAnio.length == 0) {
                        return res.status(404).json({
                            title: 'No se registraron examenes',
                            error: error
                        });
                    } else {
                        res.status(200).json({
                            message: 'success',
                            obj: examenesEnAnio
                        });
                    }
                }
            }
        })
    })
}

function getExamenIngreso(req, res) {
    console.log('GET EXAMEN INGRESO')
}

function updateExamenIngreso(req, res) {
    console.log('UPDATE EXAMEN INGRESO')
}

function saveExamenIngreso(req, res) {
    console.log('SAVE EXAMEN INGRESO')

    if (!req.body.idProfesor) {
        return res.status(400).json({
            title: 'Error',
            error: 'No tiene Profesor.'
        });
    }
    if (!req.body.idMateria) {
        return res.status(400).json({
            title: 'Error',
            error: 'No tiene Materia.'
        });
    }
    if (!req.body.fecha) {
        return res.status(400).json({
            title: 'Error',
            error: 'No tiene Fecha.'
        });
    }

    var examenIngreso = new ExamenIngreso({
        fecha: req.body.fecha,
        profesor: req.body.idProfesor,
        materia: req.body.idMateria
    });

    examenIngreso.save().then(function (examenIng) {

        ExamenIngreso.populate(examenIng,[
            { path: 'profesor'},
            { path: 'materia'},
            { path: 'materia.nivel'}], 
        function (error, examenPopu) {
            if (error) {
                return res.status(400).json({
                    title: 'Ocurrió un error',
                    error: error
                });
            }

            var nuevoResultadoExamen = {
                examenIngreso: examenIngreso._id,
                nota: null
            }

            Alumno.find({
                'estadoAdmitido': null,
                'estadoPostulante': { $ne: null }
            })
            .populate({ path: 'estadoPostulante.boletinIngreso.curso'})
            .populate('estadoPostulante.boletinIngreso.resultadosExamenIngreso.examenIngreso')
            .exec(function(error,postulantes) {
                if (error) {
                    return res.status(400).json({
                        title: 'Ocurrió un error',
                        error: error
                    });
                }
                if (!postulantes) {
                    return res.status(404).json({
                        title: 'Error',
                        error: 'No se registraron Postulantes'
                    });
                }
                var retPostulantes = [];
                for (let i = 0; i < postulantes.length; i++) {
                    var postulante = postulantes[i]
                    if (postulante.estadoPostulante.boletinIngreso.curso._id == req.body.idCurso) {
                        postulante.estadoPostulante.boletinIngreso.resultadosExamenIngreso.push(nuevoResultadoExamen);
                    }
                             
                    if (i+1 == postulantes.length) {
                        postulantes[i].save().then(function (alum) {
                            res.status(201).json({
                                message: 'Success',
                                obj: examenPopu
                            });
                        }, function (err) {
                            return res.status(404).json({
                                title: 'Error',
                                error: err
                            });
                        });
                    }
                    else{
                        postulantes[i].save()
                    }
                }
            })
        })
    }, function (err) {
        return res.status(404).json({
            title: 'Error',
            error: err
        });
    });
}

function deleteExamenIngreso(req, res) {
    console.log('DELETE EXAMEN INGRESO')
}

module.exports = {
    getExamenesIngreso,
    getExamenIngreso,
    updateExamenIngreso,
    saveExamenIngreso,
    deleteExamenIngreso
}