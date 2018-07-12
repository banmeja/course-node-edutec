//se declara la logica del controlador
'use strict'
//modulos . propias de node / del lenguaje
var fs = require('fs');
var path = require('path');


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
//req donde vienen todos los datos, res lo que se le dice al cliente lo que se devuelve
function updateAnimal(req, res) {
    var animalId = req.params.id;
    var update = req.body; //en el body de la request vienen los datos 

    //Animal.findById // se puede buscar por id, hacer el update y save
    //mogoose facilita el upd
    Animal.findByIdAndUpdate(animalId, update, { new: true }, (err, animalUpdated) => { //verificar si no existe, si asi es se crea uno nuevo => evita el :: function(res){return res} ::
        //se valida que no reciba un error
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!animalUpdated) {
                res.status(404).send({
                    message: 'No se ha actualizado el animal'
                })
            } else {
                res.status(200).send({
                    animal: animalUpdated
                });
            }
        }
    });
}

function deleteAnimal(req, res) {
    var animalId = req.params.id;

    Animal.findByIdAndRemove(animalId, (err, animalRemoved) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!animalRemoved) {
                res.status(404).send({
                    message: 'No se ha encontrado el animal'
                });
            } else {
                res.status(200).send({
                    animal: animalRemoved
                });
            }
        }
    })

}

//metodo para subir imagenes
//instalar libreria npm path , 
function uploadImage(req, res) {
    var animalId = req.params.id;
    var file_name = 'No imagen';

    //console.log(req.files);
    //si en el request va una imagen
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\'); // | regresa un arreglo
        console.log('->>>>>>>>>>>>' + file_split);
        var file_name = file_split[2];

        var ext_split = file_name.split('\.'); //split para obtner la extension
        var file_ext = ext_split[1];

        //validar que sea una imagen
        //new, es para crear el campo si no existe, image:image_file es sobre el campo que se va a trabajar
        if (file_ext == 'png' || file_ext == 'jpg') {
            Animal.findByIdAndUpdate(animalId, { image: file_name }, { new: true }, (err, animalUpdated) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error al actualizar la imagen del animal'
                    });
                } else {
                    if (!animalUpdated) {
                        res.status(404).send({
                            message: 'No se encontro el animal'
                        });
                    } else {
                        //si el estado es 200, retorna el animal y el nombre del archivo
                        res.status(200).send({
                            animal: animalUpdated,
                            image: file_name
                        });
                    }
                }
            });
        } else {
            // si no cumple se utiliza fs : como no cumple, el filesystem unlink detecta que clase de archivo es y si no encuentra archivo
            fs.unlink(file_path, (err) => {
                if (err) {
                    res.status(200).send({
                        message: 'Extension del archivo no valida y no encontrada'
                    });
                } else {
                    // si lleva archivo pero la extension es otra
                    res.status(200).send({
                        message: 'Extension del archivo no valida'
                    });
                }
            });
        }

    } else {
        //como el endpoint responde, por eso se usa 200 aunque traiga errores
        res.status(200).send({
            message: 'No se ha subido ningun archivo'
        })
    }
}
//se pueden tener metodos privados
//se debe exportar metodo por metodo
module.exports = {
    getAnimals,
    saveAnimal,
    getAnimal,
    updateAnimal,
    deleteAnimal,
    uploadImage
}