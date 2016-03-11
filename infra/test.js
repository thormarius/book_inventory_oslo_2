var _ = require('lodash');
var heroin = require('heroin-js');

var test = {
    name: 'thormarius-test'
};

var config = _.merge({}, require('./base'), test);

var configurator = heroin(process.env.HEROKU_API_TOKEN);
configurator(config);