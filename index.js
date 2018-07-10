"use strict"

var mongoose = require('mongoose');
var port = 3000;
var app = require('./app');

//promesas, mongoose trabaja en base a promesas
mongoose.Promise = global.Promise;
//conexion a base de datos de mongo
mongoose.connect('mongodb://localhost:27017/dbTec1', ) // { useMongoClient: true } se quita para la nueva version, en este caso 5.2.1
    .then(() => {
        console.log('La conexión a mongo a sido exitosa');
        app.listen(port, () => {
            console.log('El servidor local de node y express esta corriendo');
        });
    })
    .catch(err => console.log(err));

//27017 usa mongo /no usar

// 'mongodb://' url de esquema
//las promesas quedan ejecutando un proceso, al finalizar resuelve
//roundFunction (funcion implitica) arrowFunction' similar a lambas