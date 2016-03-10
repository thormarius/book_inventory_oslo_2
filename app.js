var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var logIncoming = function (req, res, next) {
    console.log('incoming request at ' + new Date());
    next();
};

function clientError(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function serverError(err, req, res, next) {
    res.status(err.status || 500);
    console.error(err.stack);
    res.json({
        message: err.message,
        error: (process.env.NODE_ENV === 'production') ? {} : err.stack
    });
}

app.use(bodyParser.json());
app.use(logIncoming);


var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/books_inventory_db';

var collection = null;
MongoClient.connect(url, function (err, db) {
    collection = db.collection('books');
});

app.post('/stock', function (req, res) {
    var isbn = req.body.isbn;
    var count = req.body.count;

    collection.
        updateOne({isbn: isbn}, {
            isbn: isbn,
            count: count
        }, {upsert: true});
    res.json({isbn: isbn, count: count});
});

app.get('/stock', function (req, res) {
    collection.
    find({}).
        toArray(function (err, docs) {
            res.json(docs);
        });
});

app.use(clientError);
app.use(serverError);


module.exports = app;