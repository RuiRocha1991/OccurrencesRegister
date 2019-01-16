"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
//insert routes
const pointsRouter = require('./routes/pointsRoute');
const polygonsRouter = require('./routes/polygonRoute');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const path = require('path');
app.use(express.static(path.resolve(__dirname, 'static')));
app.get('/', function(){
    res.sendFile('index.html');
})



app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})




app.use('/points',pointsRouter);
app.use('/polygons',polygonsRouter);

module.exports = app;