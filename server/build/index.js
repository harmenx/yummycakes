"use strict";
var express = require('express');
var app = express();
var Datastore = require('nedb');
var db = new Datastore({ filename: './src/cakes.json', autoload: true });
var helmet = require('helmet');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var main = require('./controllers/main');
var whitelist = ['http://localhost:3000'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.get('/', function (req, res) { return res.send('hello world'); });
app.get('/cake/:id', function (req, res) { return main.getCake(req, res, db); });
app.get('/cakes', function (req, res) { return main.getCakes(req, res, db); });
app.post('/cake', function (req, res) { return main.postCake(req, res, db); });
app.put('/cake', function (req, res) { return main.putCake(req, res, db); });
app.delete('/cake/:id', function (req, res) { return main.deleteCake(req, res, db); });
app.listen(process.env.PORT || 3001, function () {
    console.log("app is running on port " + (process.env.PORT || 3001));
});
