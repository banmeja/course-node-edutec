//crear controlador para menjar rutas
// para que detecte que es el ultimo java script la linea 3
'use strict'

var express = require('express');
var bodyParser = require('body-parser');
// se declara despues la app, para que primero importe express - se desempaqueta primero express
var app = express();
//configuracion de bodyParser | por defecto es true, pero no se quiere que se encode la url.

var animalRoutes = require('./routes/animal');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurar el dominio/api   | ejemplo base de datos (api=conjunto de endpoints) api no es lo mismo que webservice
app.use('/api', animalsRoutes);
//usar el mvc ¿modelos, controladores¿rutas
//1 para construir api, lo primero es un modelo= es la capa de datos que se conecta a los controladores | contiene las propiedades de un objeto

//metodos, get-post-upd-delete
app.get('/test', (req, res) => {
    res.status(200).send({
        message: 'mi primer endpoint'
    });
});

//export al app |    cuando no se hace, no se puede acceder de ningun otro lado
module.exports = app;