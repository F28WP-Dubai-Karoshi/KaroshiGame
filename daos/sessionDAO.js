const { Session } = require('../models/entities');
const mysql = require('mysql');
var con = mysql.createConnection({
    host: "sql109.epizy.com",
    user: "epiz_27308916",
    password: "QQnOTjwo27juZl",
    database: "epiz_27308916_XXX"
});


const find = function() {
    const selectSessions = "SELECT * from epiz_27308916_XXX.sessions ;";
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
    const selectSession = "SELECT * from epiz_27308916_XXX.sessions where id = ?";
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
    const insertSession = "INSERT INTO epiz_27308916_XXX.sessions VALUES();";
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
    const deleteSession = "DELETE FROM epiz_27308916_XXX.sessions WHERE id = ?";
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