var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var stockRepository = require('./mongoStockRepository');

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

app.post('/stock', function (req, res, next) {
    var isbn = req.body.isbn;
    var count = req.body.count;

    stockRepository.
        stockUp(isbn, count).
        catch(next);

    res.json({isbn: isbn, count: count});
});

app.get('/stock', function (req, res, next) {
    stockRepository.findAll().
        then(function (docs) {
            res.json(docs);
        }).
        catch(next);
});

app.get('/stock/:isbn', function (req, res) {
    stockRepository.getCount(req.params.isbn).then(function (result) {
        if (result !== null) {
            res.status(200).json({count: result});
        } else {
            res.status(404).json({error: 'No book with ISBN: ' + req.params.isbn});
        }
        res.json({});
    });
});

app.use(clientError);
app.use(serverError);


module.exports = app;