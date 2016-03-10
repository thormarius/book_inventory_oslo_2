var express = require('express');
var app = express();

var logIncoming = function (req, res, next) {
    console.log('incoming request at ' + new Date());
    next();
};
app.use(logIncoming);

var auth = function (req, res, next) {
    console.log('doing auth here');
    next();
};
app.use(auth);


app.get('/', logIncoming, auth, function (req, res, next) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});