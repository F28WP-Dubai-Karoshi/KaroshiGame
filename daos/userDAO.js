// const { Player } = require('../models/entities');
//const { User } = require('../models/entities');
var SQL = require('sql-template-strings');
const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: "sql109.epizy.com",
    user: "epiz_27308916",
    password: "QQnQTjwo27juZl",
    database: "epiz_27308916_XXX",
    debug: true
});

function executeQuery(query, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err, null);
        } else if (connection) {
            connection.query(query, function(err, rows, fields) {
                connection.release();
                if (err) {
                    return callback(err, null);
                }
                return callback(null, rows);
            });
        } else {
            return callback(true, "No Connection");
        }
    });
}


function getResult(query, callback) {
    executeQuery(query, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            callback(true, err);
        }
    });
}

function find(callback) {
    const selectUsers = "SELECT * from epiz_27308916_XXX.users; ";
    getResult(selectUsers, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}



function findByPseudoname(pseudoname, callback) {
    const selectUser = (SQL `SELECT * from epiz_27308916_XXX.users where pseudoname like ${pseudoname};`);
    getResult(selectUser, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function findById(id, callback) {
    const selectUser = (SQL `SELECT * from epiz_27308916_XXX.users where id = ${id};`);
    getResult(selectUser, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function createUser(pseudoname, email, callback) {
    const insertUser = (SQL `INSERT INTO epiz_27308916_XXX.users (pseudoname, email) VALUES (${pseudoname}, ${email}) ;`);
    getResult(insertUser, function(err, result) {
        if (!err) {
            callback(null, result.affectedRows, result.insertId);
        } else {
            console.log(err);
        }
    });
}


function deleteUser(id, callback) {
    const selectUser = (SQL `DELETE from epiz_27308916_XXX.users where id = ${id};`);
    getResult(selectUser, function(err, result) {
        if (!err) {
            console.log("Number of users inserted: " + result.affectedRows);
            callback(null, result.affectedRows);
        } else {
            console.log(err);
        }
    });
}


module.exports = {
    find,
    findByPseudoname,
    findById,
    createUser,
    deleteUser
};