'use strict';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const jsonSchema = require('chai-json-schema');
const server = 'http://localhost:3000'
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(jsonSchema);


describe('Calculo Mejor Promedio', (done) => {

    // ##########
// # TEST 1 #
// ##########
  it('Debería: fallar al obtener cursos', (done) => {
    // Busco cursos
    chai.request(server)
      .get('/promedios/obtenerCursos/asdasd')
      .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res).to.have.status(400);
          done();
      });
  }).timeout(100000);

// ##########
// # TEST 2 #
// ##########

it('Debería: fallar al calcular el promedio', (done) => {
    // Busco cursos
    chai.request(server)
      .get('/promedios/obtenerCursos/2018')
      .end((err, cursos) => {
          // Busco materias
          chai.request(server)
          .get('/promedios/admitidos/asdasd')
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

it('Debería: ser exitoso al calcular el promedio', (done) => {
    // Busco cursos
    chai.request(server)
      .get('/promedios/obtenerCursos/2018')
      .end((err, cursos) => {
          // Busco materias
          var idCurso = cursos.body.obj[0]._id;
          chai.request(server)
          .get('/promedios/admitidos/' + idCurso)
          .end((error, res) => {
            expect(res.body).to.be.a('object');
            expect(res).to.have.status(200);
            done();
          })
      });
  }).timeout(100000);



});