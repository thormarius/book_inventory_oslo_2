var mongoRepository = require('./mongoStockRepository');
var app = require('./app')(mongoRepository);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});