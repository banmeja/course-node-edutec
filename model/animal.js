//primer modelo | en node y mongo, el modelo es lo mismo que el esquema
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//construir clase
var AnimalSchema = Schema({
    name: String,
    description: String,
    image: String,
    origen: {
        country: String,
        state: String
    }
});

//se exporta el esquema
module.exports = mongoose.model('Animal', AnimalSchema);

//starndar code sytle ap
// si la variable es de paquete, que inicie de minusculaMayuscula
//cuando es un modulo de un paquete, inice con Mayuscula

//para origien, que contenga, pais y estado, podria crearse como un esquema aparte que solo se herede