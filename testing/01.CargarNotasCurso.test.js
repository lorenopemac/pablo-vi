'use strict';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const jsonSchema = require('chai-json-schema');
const server = 'http://localhost:3000'
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(jsonSchema);


describe('Cargar Notas Curso', (done) => {

// ##########
// # TEST 1 #
// ##########
  it('Debería: fallar al obtener cursos', (done) => {
    // Busco cursos
    chai.request(server)
      .get('/cargarNotasCurso/obtenerCursos/asdasd')
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
      .get('/cargarNotasCurso/obtenerCursos/2018')
      .end((err, cursos) => {
          // Busco materias
          chai.request(server)
          .get('/cargarNotasCurso/obtenerMaterias/asdasd')
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
it('Deberia: fallar al obtener alumnos', (done) => {
  // Busco cursos
  chai.request(server)
    .get('/cargarNotasCurso/obtenerCursos/2018')
    .end((err, cursos) => {
        var idNivel = cursos.body.obj[0].nivel._id;
        // Busco materias
        chai.request(server)
        .get('/cargarNotasCurso/obtenerMaterias/' + idNivel)
        .end((error, materias) => {
          // Busco alumnos
          chai.request(server)
          .get('/cargarNotasCurso/admitidos/asdasd/asdasd')
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
    .get('/cargarNotasCurso/obtenerCursos/2018')
    .end((err, cursos) => {
        var idNivel = cursos.body.obj[0].nivel._id;
      // Busco materias
        chai.request(server)
        .get('/cargarNotasCurso/obtenerMaterias/' + idNivel)
        .end((error, materias) => {
          var idCurso = cursos.body.obj[0]._id;
          var idMateria = materias.body.obj[0]._id;
        // Busco alumnos
          chai.request(server)
          .get('/cargarNotasCurso/admitidos/' + idCurso + '/' + idMateria)
          .end((error, alumnos) => {
          // Busco alumnos
            chai.request(server)
            .patch('/cargarNotasCurso/notasCurso/asdasd/asdasd')
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
      .get('/cargarNotasCurso/obtenerCursos/2018')
      .end((err, cursos) => {
          var idNivel = cursos.body.obj[0].nivel._id;
        // Busco materias
          chai.request(server)
          .get('/cargarNotasCurso/obtenerMaterias/' + idNivel)
          .end((error, materias) => {
            var idCurso = cursos.body.obj[0]._id;
            var idMateria = materias.body.obj[0]._id;
          // Busco alumnos
            chai.request(server)
            .get('/cargarNotasCurso/admitidos/' + idCurso + '/' + idMateria)
            .end((error, alumnos) => {
            // Guardo Notas
              chai.request(server)
              .patch('/cargarNotasCurso/notasCurso/' + idCurso + '/' + idMateria)
              .send({
                alumnos: alumnos.body.obj
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