'use strict'

var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:testedutec18@ds123490.mlab.com:23490/zooedu', )

app.listen(port);

console.log('Edutec Backend is running')