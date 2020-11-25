//const { Session } = require('../models/entities');
const mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "players"
});


const find = function() {
    const selectSessions = "SELECT * from players.sessions ;";
    con.connect(function(err) {
        if (err) throw err;
        //select all sessions
        con.query(selectSessions, function(err, result) {
            if (err) throw err;
            console.log("Selected: " + result);
            return result;
        });
    });
};

const findById = function(id) {
    const selectSession = "SELECT * from players.sessions where id = ?";
    con.connect(function(err) {
        if (err) throw err;
        //select session by id
        con.query(selectSession, [id], function(err, result) {
            if (err) throw err;
            console.log("Selected: " + result);
            return result;
        });
    });
};

const createSession = function() {
    const insertSession = "INSERT INTO players.sessions VALUES();";
    con.connect(function(err) {
        if (err) throw err;
        //create session with default values ID, and startDate
        con.query(insertSession, function(err, result) {
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows);
            return result.affectedRows;
        });
    });
};

const deleteSession = function(id) {
    const deleteSession = "DELETE FROM players.sessions WHERE id = ?";
    con.connect(function(err) {
        if (err) throw err;
        //delete session with ID
        con.query(deleteSession, [id], function(err, result) {
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows);
            return result.affectedRows;
        });
    });
};
module.exports = {
    find,
    findById,
    createSession,
    deleteSession
};