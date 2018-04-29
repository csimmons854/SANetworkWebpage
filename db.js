var mysql = require('mysql');

var state = {
    pool: null
};

exports.connect = function (done) {
    state.pool = mysql.createPool({
        host: 'sanetwork.ck2egjql3cxl.us-east-2.rds.amazonaws.com',
        user: 'simmonsc',
        password: 'group6-4431',
        database: 'SADatabase'
    });
    done();
};

exports.get = function () {
    return state.pool;
};

