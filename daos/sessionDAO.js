const { Session } = require('../models/entities');
const mysql = require('mysql');
var con = mysql.createConnection({
    host: "fdb29.awardspace.net",
    user: "3664440_virus",
    password: "pogroot1",
    database: "3664440_virus"
});


const find = function() {
    const selectSessions = "SELECT * from 3664440_virus.sessions ;";
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
    const selectSession = "SELECT * from 3664440_virus.sessions where id = ?";
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
    const insertSession = "INSERT INTO 3664440_virus.sessions VALUES();";
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
    const deleteSession = "DELETE FROM 3664440_virus.sessions WHERE id = ?";
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