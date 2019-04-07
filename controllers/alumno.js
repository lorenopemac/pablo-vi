'use strict'

var Alumno = require('../models/alumno');

function getAlumnos(req, res) {
    console.log('GET ALUMNOS')
}

function getAlumnosPostulantes(req, res) {
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
            if (postulante.estadoPostulante.boletinIngreso.curso._id == req.params.idCurso) {
                for (let j = 0; j < postulante.estadoPostulante.boletinIngreso.resultadosExamenIngreso.length; j++) {
                    var resExIng = postulante.estadoPostulante.boletinIngreso.resultadosExamenIngreso[j];
                    if (resExIng.examenIngreso._id == req.params.idExamenIngreso) {
                        retPostulantes.push(postulante);
                    }
                }
            }
                     
            if (i+1 == postulantes.length) {
                if (retPostulantes.length == 0) {
                    return res.status(404).json({
                        title: 'Error',
                        error: 'No se registraron Postulantes'
                    });
                } else {
                    res.status(200).json({
                        message: 'Success',
                        obj: retPostulantes
                    });
                }
            }
        }
    })
}

function getAlumnosPostulantesCurso(req, res) {
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
            if (postulante.estadoPostulante.boletinIngreso.curso._id == req.params.idCurso) {
                retPostulantes.push(postulante);
            }
                     
            if (i+1 == postulantes.length) {
                res.status(200).json({
                    message: 'Success',
                    obj: retPostulantes
                });
            }
        }
    })
}

function getAlumnosAdmitidos(req, res) {
    Alumno.find({
        'estadoAdmitido': { $ne: null }
    })
    .populate({ path: 'estadoAdmitido.boletines.curso'})
    .populate({path: 'estadoAdmitido.boletines.resultadosMateria.materia'})
    .exec(function(error,alumnos) {
        if (error) {
            return res.status(400).json({
                title: 'Ocurrió un error',
                error: error
            });
        }
        var alumnosRet = [];
        var cont = 0;
        alumnos.forEach(alumno => {
            cont++;
            alumno.estadoAdmitido.boletines.forEach(boletin => {
                if (boletin.curso._id == req.params.idCurso) {
                    boletin.resultadosMateria.forEach(resultadoMateria => {
                        if (resultadoMateria.materia._id == req.params.idMateria) {
                            alumnosRet.push(alumno)
                        }
                    });
                }
            });

            if (cont == alumnos.length) {
                if (alumnosRet.length == 0) {
                    return res.status(404).json({
                        title: 'No se encontraron alumnos',
                        error: error
                    });
                }
                else {
                    res.status(200).json({
                        message: 'success',
                        obj: alumnosRet
                    });
                }
            }
        });
    })
}

function getAlumnosAdmitidosCursos(req, res){
    Alumno.find({
        'estadoAdmitido': { $ne: null }
    })
    .populate({ path: 'estadoAdmitido.boletines.curso'})
    .exec(function(error,alumnos) {
        if (error) {
            return res.status(400).json({
                title: 'Ocurrió un error',
                error: error
            });
        }
        if (!alumnos) {
            return res.status(404).json({
                title: 'Error',
                error: 'No se registraron Alumnos'
            });
        }
        var alumProm = [];
        for (let i = 0; i < alumnos.length; i++) {
            var promedio = 0;
            var alumno = alumnos[i];
            for (let j = 0; j < alumno.estadoAdmitido.boletines.length; j++) {
                
                var boletin = alumno.estadoAdmitido.boletines[j];

                if (boletin.curso._id == req.params.idCurso) {
                    let aux = 0;
                    for (let k = 0; k < boletin.resultadosMateria.length; k++) {
                        aux = aux + boletin.resultadosMateria[k].notaTrimestre1;
                        aux = aux + boletin.resultadosMateria[k].notaTrimestre2;
                        aux = aux + boletin.resultadosMateria[k].notaTrimestre3;           
                    }
                    promedio = aux / (boletin.resultadosMateria.length * 3);

                    var r = alumno.toObject();
                    r.promedio = promedio; // agrega el att promedio
                    alumProm.push(r);
                }
                                
            }
            
            if (i+1 == alumnos.length) {
                console.log(alumProm)
                res.status(200).json({
                    message: 'Alumnos Admitidos',
                    obj: alumProm
                });
            }
        }
    })
}

function getAlumno(req, res) {
    console.log('GET ALUMNO');
}

function updateAlumno(req, res) {
    console.log('UPDATE ALUMNO');
}

function saveAlumno(req, res) {
    console.log('SAVE ALUMNO');
}

function saveNotasCurso(req, res) {
    console.log('SAVE NOTAS CURSO');

    if (!req.body.alumnos) {
        return res.status(400).json({
            title: 'Error',
            error: 'No hay alumnos'
        });
    }

    Alumno.find({
        'estadoAdmitido': { $ne: null }
    })
    .populate({ path: 'estadoAdmitido.boletines.curso'})
    .populate({path: 'estadoAdmitido.boletines.resultadosMateria.materia'})
    .exec(function(error,alumnos) {
        if (error) {
            return res.status(400).json({
                title: 'Ocurrió un error',
                error: error
            });
        }

        var obj = req.body.alumnos;
        for (let i = 0; i < alumnos.length; i++) {
            var alumno = alumnos[i];
            for (let j = 0; j < alumno.estadoAdmitido.boletines.length; j++) {
                var boletin = alumno.estadoAdmitido.boletines[j];
                if (boletin.curso._id == req.params.idCurso) {
                    for (let k = 0; k < alumnos[i].estadoAdmitido.boletines[j].resultadosMateria.length; k++) {
                        var resultado = boletin.resultadosMateria[k];
                        if (resultado.materia._id == req.params.idMateria) {
                            resultado.notaTrimestre1 =
                            obj[i].estadoAdmitido.boletines[j].resultadosMateria[k].notaTrimestre1;
        
                            resultado.notaTrimestre2 =
                            obj[i].estadoAdmitido.boletines[j].resultadosMateria[k].notaTrimestre2;
        
                            resultado.notaTrimestre3 =
                            obj[i].estadoAdmitido.boletines[j].resultadosMateria[k].notaTrimestre3;
                        }
                    }
                }
            }

            if (i+1 == alumnos.length) {
                alumnos[i].save().then(function (alum) {
                    res.status(200).json({
                        message: 'Success',
                        obj: alum
                    });
                }, function (err) {
                    return res.status(404).json({
                        title: 'Error',
                        error: err
                    });
                });
            }
            else{
                alumnos[i].save()
            }
        }
    })
}

function saveNotasIngreso(req, res) {
    console.log('SAVE NOTAS INGRESO');
    if (!req.body.postulantes) {
        return res.status(400).json({
            title: 'Error',
            error: 'No se enviaron Postulantes'
        });
    }

    Alumno.find({
        'estadoAdmitido': null,
        'estadoPostulante': { $ne: null }
    })
    .populate({ path: 'estadoPostulante.boletinIngreso.curso'})
    .populate({path: 'estadoPostulante.boletinIngreso.resultadosExamenIngreso.examenIngreso'})
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
                error: 'No se registraron Alumnos'
            });
        }
        var obj = req.body.postulantes;
        for (let i = 0; i < postulantes.length; i++) {
            var postulante = postulantes[i]
            if ( postulante.estadoPostulante.boletinIngreso.curso._id == req.params.idCurso) {
                for (let j = 0; j < postulante.estadoPostulante.boletinIngreso.resultadosExamenIngreso.length; j++) {
                    var resExIng = postulante.estadoPostulante.boletinIngreso.resultadosExamenIngreso[j];
                    if (resExIng.examenIngreso._id == req.params.idExamenIngreso) {
                        resExIng.nota = obj[i].estadoPostulante.boletinIngreso.resultadosExamenIngreso[j].nota;
                    }
                }
            }
                     
            if (i+1 == postulantes.length) {
                postulantes[i].save().then(function (alum) {
                    res.status(200).json({
                        message: 'Success',
                        obj: alum
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
}

function deleteAlumno(req, res) {
    console.log('DELETE ALUMNO');
}

module.exports = {
    getAlumnos,
    getAlumnosPostulantes,
    getAlumnosPostulantesCurso,
    getAlumnosAdmitidos,
    getAlumnosAdmitidosCursos,
    getAlumno,
    updateAlumno,
    saveAlumno,
    saveNotasCurso,
    saveNotasIngreso,
    deleteAlumno
}