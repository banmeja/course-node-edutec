//se declara la logica del controlador
'use strict'

var Animal = require('../model/animal');

function getAnimals(req, res) {
    res.status(200).send({
        message: 'Prueba de controlador de animales'
    });
}
//se pueden tener metodos privados
//se debe exportar metodo por metodo
module.exports = {
    getAnimals
}