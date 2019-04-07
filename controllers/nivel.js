'use strict'

var Nivel = require('../models/nivel');

function getNiveles(req, res) {
    console.log('GET NIVELES')
}

function getNivel(req, res) {
    console.log('GET NIVEL')
}

function updateNivel(req, res) {
    console.log('UPDATE NIVEL')
}

function saveNivel(req, res) {
    console.log('SAVE NIVEL')
}

function deleteNivel(req, res) {
    console.log('DELETE NIVEL')
}

module.exports = {
    getNiveles,
    getNivel,
    updateNivel,
    saveNivel,
    deleteNivel
}