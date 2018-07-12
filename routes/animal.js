//declaracion de rutas

'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

//se necesita declarar el multi-party que permite subir archivos
var multipart = require('connect-multiparty'); // se declara solo aca, porque solo animal lo utiliza, si es globar se declara en app.js
var md_upload = multipart({ uploadDir: './uploads/animals' }) // se inidca al midelware que debe de almacenar las imagenes de esta ruta en ...
    /*//   { uploadDir: './../uploads/animals' }*/
var api = express.Router();

//router indica todas las rutas
//crud
api.get('/animals', AnimalController.getAnimals); //buscar todos los animales | ,ejecutar del controlador.metodo
api.get('animal/:id', AnimalController.getAnimal); //buscar un animal
api.post('/animal', AnimalController.saveAnimal); //agregar un animal
api.post('/animals'); //agregar lista de animales
api.put('/animal/:id', AnimalController.updateAnimal); //actualizar por id
api.delete('/animal/:id', AnimalController.deleteAnimal); //borrar animal
api.post('/animal-uplodad-image/:id', [md_upload], AnimalController.uploadImage); //subir imagen para un animal segun id | se agrega el md_upload

module.exports = api;