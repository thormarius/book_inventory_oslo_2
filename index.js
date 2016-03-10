var express = require('express');
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

app.use(logIncoming);

app.get('/', function (req, res) {
    throw new Error("'database migration', fancy word for downtime");
    res.send("Do Gangnam, not Kanban");
});

app.use(clientError);
app.use(serverError);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});