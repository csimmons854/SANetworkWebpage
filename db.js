var mysql = require('mysql');

var state = {
    pool: null
};

exports.connect = function (done) {
    state.pool = mysql.createPool({
        host: 'sanetwork.ck2egjql3cxl.us-east-2.rds.amazonaws.com',
        user: 'simmonsc',
        password: 'e330f6ef1a',
        database: 'group6-4431'
    });
    done();
};

exports.get = function () {
    return state.pool;
};

