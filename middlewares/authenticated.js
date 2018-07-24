'use strict'

var jwt = require('jwt-simple');
var moment = require('moment'); //para validar la fecha de expiracion del token
var secret = 'desencriptacion-de-token'; //la clave secreta

//en el exports la funcion que se va a devolver, si no se va a ejectuar un metodo
//next funcion propia de nodeJs; el siguiente | nodeJs espera promesas : similar a un break

exports.ensureAuth = function(req, res, next) {
    var authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(403).send({ //validar si tiene la cabezera
            message: 'La peticion debe de contener un header de autenticación'
        });
    } //acaba la funcion

    var toke = req.headers.authorization.replace(/['"]+/g, '') //remplazar los caracteres que no interesen del token, si es un espacio en blanco etc
    try {
        var payload = jwt.decode(token, secret); //obtenemos el token
        //la fecha de expiración viene en||validar con la fecha que se creo en el servidor
        //1 verificar que el usuario exista, si existe devuelve un token
        var expiredDate = payload.exp;
        var currentDate = moment().unix();
        if (expiredDate <= moment()) {
            return res.status(401).send({
                message: 'El Token ha expirado'
            })
        }
    } catch (exception) {
        return res.status(404).send({
            message: 'Token invalido'
        });
        console.log(exception);
    }
    //dejar para algun uso, los datos del usuario
    req.user = payload;
    next();
};