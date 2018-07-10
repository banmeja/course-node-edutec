//se declara la logica del controlador
'use strict'

var Animal = require('../model/animal');

function getAnimals(req, res) {
    res.status(200).send({
        message: 'Prueba de controlador de animales'
    });
}

function getAnimal(req, res) {
    var animalId = req.params.id;

    Animal.findById(animalId).exec((err, animal) => {
            if (err) {
                res.status(500).send({
                    message: 'Error en la peticion'
                })
            } else {
                if (!animal) {
                    //si no existe el animal
                    res.status(404).send({
                        message: 'El animal no existe'
                    });
                } else {
                    res.status(200).send({
                        animal
                    });
                }
            }
        })
        //pupular data | es ir a buscar especificamente lo que se necesita
}

function saveAnimal(req, res) {
    var animal = new Animal();
    var params = req.body;

    if (params.name) {
        animal.name = params.name
        animal.description = params.description
        animal.origen.country = params.country
        animal.origen.state = params.state
        animal.image = null;
        //.save el propio de mongoose
        animal.save((err, animalStored) => {
            if (err) {
                res.status(500).send({
                    message: 'Fallo en el servidor'
                });
            } else {

                if (!animalStored) {
                    res.status(400).send({
                        message: 'No se ha guardado'
                    });
                } else {
                    res.status(200).send({
                        message: animalStored
                    });
                }
            }
        });
    }

}
//se pueden tener metodos privados
//se debe exportar metodo por metodo
module.exports = {
    getAnimals,
    saveAnimal,
    getAnimal
}