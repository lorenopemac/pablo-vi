'use strict';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const jsonSchema = require('chai-json-schema');
const server = 'http://localhost:3000'
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(jsonSchema);


describe('Cargar Notas Postulantes', (done) => {

// ##########
// # TEST 1 #
// ##########
  it('Debería: fallar al obtener cursos', (done) => {
    // Busco cursos
    chai.request(server)
      .get('/cargarNotasIngreso/obtenerCursos/asdasd')
      .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res).to.have.status(400);
          done();
      });
  }).timeout(100000);
      


// ##########
// # TEST 2 #
// ##########
  it('Debería: fallar al obtener examenes', (done) => {
    // Busco cursos
    chai.request(server)
      .get('/cargarNotasIngreso/obtenerCursos/2018')
      .end((err, cursos) => {
          // Busco examenes
          chai.request(server)
          .get('/cargarNotasIngreso/obtenerExamenes/' + 2018 + '/asdasd')
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
it('Deberia: fallar al obtener postulantes', (done) => {
  // Busco cursos
  chai.request(server)
    .get('/cargarNotasIngreso/obtenerCursos/2018')
    .end((err, cursos) => {
        var idNivel = cursos.body.obj[0].nivel._id;
        // Busco examenes
        chai.request(server)
        .get('/cargarNotasIngreso/obtenerExamenes/' + 2018 + '/' + idNivel)
        .end((error, examenes) => {
          // Busco alumnos
          chai.request(server)
          .get('/cargarNotasIngreso/postulantes/asdasd/asdasd')
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
it('Deberia: fallar al guardar notas', (done) => {
// Busco cursos
  chai.request(server)
    .get('/cargarNotasIngreso/obtenerCursos/2018')
    .end((err, cursos) => {
        var idNivel = cursos.body.obj[0].nivel._id;
      // Busco examenes
        chai.request(server)
        .get('/cargarNotasIngreso/obtenerExamenes/' + 2018 + '/' + idNivel)
        .end((error, examenes) => {
          var idCurso = cursos.body.obj[0]._id;
          var idExamen = examenes.body.obj[0]._id;
        // Busco postulantes
          chai.request(server)
          .get('/cargarNotasIngreso/postulantes/' + idCurso + '/' + idExamen)
          .end((error, postulantes) => {
          // Guardo notas postulantes
            chai.request(server)
            .patch('/cargarNotasIngreso/notasIngreso/asdasd/asdasd')
            .send({
            })
            .end((err, res) => {
              expect(res.body).to.be.a('object');
                  expect(res).to.have.status(400);
                  done();
            });
          })
        })
    });
}).timeout(100000);
      

// ##########
// # TEST 5 #
// ##########
it('Deberia: guardar notas', (done) => {
  // Busco cursos
    chai.request(server)
      .get('/cargarNotasIngreso/obtenerCursos/2018')
      .end((err, cursos) => {
          var idNivel = cursos.body.obj[0].nivel._id;
        // Busco examenes
          chai.request(server)
          .get('/cargarNotasIngreso/obtenerExamenes/' + 2018 + '/' + idNivel)
          .end((error, examenes) => {
            var idCurso = cursos.body.obj[0]._id;
            var idExamen = examenes.body.obj[0]._id;
          // Busco postulantes
            chai.request(server)
            .get('/cargarNotasIngreso/postulantes/' + idCurso + '/' + idExamen)
            .end((error, postulantes) => {
            // Guardo notas postulantes
              chai.request(server)
              .patch('/cargarNotasIngreso/notasIngreso/' + idCurso + '/' + idExamen)
              .send({
                postulantes: postulantes.body.obj
              })
              .end((err, res) => {
                expect(res.body).to.be.a('object');
                expect(res).to.have.status(200);
                done();
              });
            })
          })
      });
  }).timeout(100000);
});