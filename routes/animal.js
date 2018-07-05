//declaracion de rutas

'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var api = express.Router();

//router indica todas las rutas
//crud
api.get('/animals', AnimalController.getAnimals); //buscar todos los animales | ,ejecutar del controlador.metodo
api.get('animal/:id'); //buscar un animal
api.post('/animal'); //agregar un animal
api.post('/animals'); //agregar lista de animales
api.put('/animal/:id'); //actualizar por id
api.delete('/animal/:id'); //borrar animal
api.post('/animal-uplodad-image/:id'); //subir imagen para un animal segun id

module.exports = api;