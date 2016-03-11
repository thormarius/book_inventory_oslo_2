var heroin = require("heroin-js");

var configurator = heroin(process.env.HEROKU_API_TOKEN);

configurator.export("thormarius").then((result) => {
    console.log(result);
})


var prod = {
    name: 'thormarius',
    region: 'eu',
    maintenance: false,
    stack: 'cedar-14',
    config_vars: {
        NODE_ENV: 'test',
        MONGOLAB_URI: 'mongodb://heroku_1xz9nhj3:98f4jauuormrrb3kueklcoe4gb@ds055945.mlab.com:55945/heroku_1xz9nhj3'
    },
    addons: {
        mongolab: {plan: 'mongolab:sandbox'}
    },
    collaborators: ['audun.strand@gmail.com', 'thor.henrichsen@gmail.com'],
    features: {
        'runtime-dyno-metadata': {enabled: false},
        'log-runtime-metrics': {enabled: false},
        'http-session-affinity': {enabled: false},
        preboot: {enabled: false},
        'http-shard-header': {enabled: false},
        'http-end-to-end-continue': {enabled: false}
    },
    formation: [{process: 'web', quantity: 1, size: 'Free'}],
    log_drains: [],
    domains: ['thormarius.herokuapp.com']
};

var test = {
    name: 'thormarius-test',
    region: 'eu',
    maintenance: false,
    stack: 'cedar-14',
    config_vars: {
        NODE_ENV: 'test'
    },
    addons: {
        mongolab: {plan: 'mongolab:sandbox'}
    },
    collaborators: ['audun.strand@gmail.com', 'thor.henrichsen@gmail.com'],
    features: {
        'runtime-dyno-metadata': {enabled: false},
        'log-runtime-metrics': {enabled: false},
        'http-session-affinity': {enabled: false},
        preboot: {enabled: false},
        'http-shard-header': {enabled: false},
        'http-end-to-end-continue': {enabled: false}
    },
    formation: [{process: 'web', quantity: 1, size: 'Free'}],
    log_drains: [],
};

configurator(prod);
configurator(test);
