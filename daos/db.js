const createDb = function() {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: "sql109.epizy.com",
        user: "epiz_27308916",
        password: "QQnQTjwo27juZl"
    });

    connection.connect(function(err) {
        if (err) throw err;
        //create database
        // const sqlDB = "CREATE DATABASE IF NOT EXISTS `epiz_27308916_XXX`;";
        // connection.query(sqlDB, function(err, result) {
        //     if (err) throw err;
        //     console.log('The database has been created');
        // });
        //change database
        connection.changeUser({ database: 'epiz_27308916_XXX' }, function(err) {
            if (err) {
                console.log('error in changing database', err);
                return;
            }
        });

        //create table Payers
        const sqlUser = "Create table if not exists `epiz_27308916_XXX`.`users`(" +
            "`id` int(11) NOT NULL auto_increment," +
            "`pseudoname` varchar(32) NOT NULL default 'Unkown'," +
            "`password` varchar(32) NOT NULL," +
            "PRIMARY KEY (`id`)" +
            "); ";
        connection.query(sqlUser, function(err, result) {
            if (err) throw err;
            console.log("Users table created");
        });
        //create table Sessions
        const sqlSession = "Create table if not exists `epiz_27308916_XXX`.`sessions` (" +
            "`id` int(11) NOT NULL auto_increment," +
            "`startDate` DATETIME DEFAULT CURRENT_TIMESTAMP," +
            "PRIMARY KEY(`id`)" +
            ");";
        connection.query(sqlSession, function(err, result) {
            if (err) throw err;
            console.log("Sessions table created");
        });
        //create table Participants 
        const sqlParticipant = "Create table if not exists `epiz_27308916_XXX`.`participants`(" +
            "`sessionId` int(11) NOT NULL, " +
            "`userId` int(11) NOT NULL, " +
            "`startDate` DATETIME DEFAULT CURRENT_TIMESTAMP, " +
            "`endDate` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP , " +
            "`score` int(10) , " +
            "PRIMARY KEY(userId, sessionId), " +
            "FOREIGN KEY (userId) REFERENCES epiz_27308916_XXX.users(id), " +
            "FOREIGN KEY (sessionId) REFERENCES epiz_27308916_XXX.sessions(id)" +
            ");";
        connection.query(sqlParticipant, function(err, result) {
            if (err) throw err;
            console.log("Participants table created");
        });
    });
};

module.exports = createDb;