'use strict';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const jsonSchema = require('chai-json-schema');
const server = 'http://localhost:3000'
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(jsonSchema);


describe('Alta Examen Ingreso', (done) => {

// ##########
// # TEST 1 #
// ##########
  it('Debería: fallar al obtener cursos', (done) => {
    // Busco cursos
    chai.request(server)
      .get('/altaExamenIngreso/obtenerCursos/asdasd')
      .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res).to.have.status(400);
          done();
      });
  }).timeout(100000);
      
// ##########
// # TEST 2 #
// ##########
it('Debería: fallar al obtener materias', (done) => {
    // Busco cursos
    chai.request(server)
      .get('/altaExamenIngreso/obtenerCursos/2018')
      .end((err, cursos) => {
          // Busco materias
          chai.request(server)
          .get('/altaExamenIngreso/obtenerMaterias/asdasd')
          .end((error, res) => {
            expect(res.body).to.be.a('object');
            expect(res).to.have.status(404);
            done();
          })
      });
  }).timeout(100000);

// ##########
// # TEST 3 #
// ##########
it('Debería: fallar al obtener profesores', (done) => {
    // Busco cursos
    chai.request(server)
      .get('/altaExamenIngreso/obtenerCursos/2018')
      .end((err, cursos) => {
          // Busco materias
          var idCurso = cursos.body.obj[0]._id;
          var idNivel = cursos.body.obj[0].nivel._id;
          chai.request(server)
          .get('/altaExamenIngreso/obtenerMaterias/' + idNivel)
          .end((error, res) => {

            chai.request(server)
            .get('/altaExamenIngreso/obtenerProfesores/sadas' )
            .end((error, res) => {
            expect(res.body).to.be.a('object');
            expect(res).to.have.status(404);
            done();
            })
          })
      });
  }).timeout(100000);

// ##########
// # TEST 4 #
// ##########
it('Debería: fallar al obtener los alumnos', (done) => {
    // Busco cursos
    chai.request(server)
      .get('/altaExamenIngreso/obtenerCursos/2018')
      .end((err, cursos) => {
          // Busco materias
          var idCurso = cursos.body.obj[0]._id;
          var idNivel = cursos.body.obj[0].nivel._id;
          chai.request(server)
          .get('/altaExamenIngreso/obtenerMaterias/' + idNivel)
          .end((error, materias) => {
            var idMateria = materias.body.obj[0]._id;
            chai.request(server)
            .get('/altaExamenIngreso/obtenerProfesores/'+  idMateria)
            .end((error, res) => {
                chai.request(server)
                .get('/altaExamenIngreso/obtenerPostulantes/asdas'  )
                .end((error, res) => {
                    expect(res.body).to.be.a('object');
                    expect(res).to.have.status(404);
                    done();
                })
            })
          })
      });
  }).timeout(100000);

// ##########
// # TEST 5 #
// ##########
it('Debería: fallar al guardar Examen Ingreso', (done) => {
    // Busco cursos
    chai.request(server)
      .get('/altaExamenIngreso/obtenerCursos/2018')
      .end((err, cursos) => {
          // Busco materias
          var idCurso = cursos.body.obj[0]._id;
          var idNivel = cursos.body.obj[0].nivel._id;
          chai.request(server)
          .get('/altaExamenIngreso/obtenerMaterias/' + idNivel)
          .end((error, materias) => {
            var idMateria = materias.body.obj[0]._id;
            chai.request(server)
            .get('/altaExamenIngreso/obtenerProfesores/'+  idMateria)
            .end((error, res) => {
                chai.request(server)
                .get('/altaExamenIngreso/obtenerPostulantes/'+ idCurso  )
                .end((error, res) => {
                    chai.request(server)
                    .post('/altaExamenIngreso/guardarExamenIngreso/')
                    .send({
                        fecha:'asdsa', idProfesor: 'asd', idMateria: 'asda', idCurso: 'asdsad'
                      })
                    .end((error, res) => {
                        expect(res.body).to.be.a('object');
                        expect(res).to.have.status(404);
                        done();
                    })
                })
            })
          })
      });
  }).timeout(100000);


// ##########
// # TEST 6 #
// ##########
it('Debería: ser exitoso al guardar Examen Ingreso', (done) => {
    // Busco cursos
    chai.request(server)
      .get('/altaExamenIngreso/obtenerCursos/2018')
      .end((err, cursos) => {
          // Busco materias
          var idCurso = cursos.body.obj[0]._id;
          var idNivel = cursos.body.obj[0].nivel._id;
          chai.request(server)
          .get('/altaExamenIngreso/obtenerMaterias/' + idNivel)
          .end((error, materias) => {
            var idMateria = materias.body.obj[0]._id;
            chai.request(server)
            .get('/altaExamenIngreso/obtenerProfesores/'+  idMateria)
            .end((error, profesores) => {
                chai.request(server)
                .get('/altaExamenIngreso/obtenerPostulantes/'+ idCurso  )
                .end((error, postulantes) => {
                    var idProfesor = profesores.body.obj[0]._id
                    chai.request(server)
                    .post('/altaExamenIngreso/guardarExamenIngreso/')
                    .send({
                        fecha: new Date(), 
                        idProfesor:  idProfesor, 
                        idMateria: idMateria, 
                        idCurso: idCurso
                      })
                    .end((error, res) => {
                        expect(res.body).to.be.a('object');
                        expect(res).to.have.status(201);
                        done();
                    })
                })
            })
          })
      });
  }).timeout(100000);

});