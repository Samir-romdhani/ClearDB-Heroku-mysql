var express = require("express");
var mysql = require('mysql');
var app = express();
app.use(express.logger());

var db_config = {
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'bbd7ce5b72d0bc',
    password: 'd782912a',
    database: 'heroku_227dbd8f597ec9f'
};

var db_config_Mariadb = {
    host: 'olxl65dqfuqr6s4y.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'q2yseffhsh99cnbt',
    password: 'fdc1grofl58s3rqc',
    database: 'ec3n49dqttudnvr0'
};

var connection;

function handleDisconnect() {
    console.log('1. connecting to db:');
   
     connection = mysql.createConnection(db_config); // Recreate the connection, since
     //connection = mysql.createConnection(db_config_Mariadb); // Recreate the connection, since
													// the old one cannot be reused.

    connection.connect(function(err) {              	// The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('2. error when connecting to db:', err);
            setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
        }                                     	// to avoid a hot loop, and to allow our node script to
    });                                     	// process asynchronous requests in the meantime.
    											// If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('3. db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { 	// Connection to the MySQL server is usually
            handleDisconnect();                      	// lost due to either server restart, or a
        } else {                                      	// connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();

app.get('/', function(request, response) {
    //cleardb
    
    connection.query('SELECT * from t_users', function(err, rows, fields) {
        if (err) {
            console.log('error: ', err);
            throw err;
        }
        response.send(['Hello World!!!!', rows]);
    });
    
    //mariadb
    /*
        connection.query('SELECT nom , mail from employes', function(err, rows, fields) {
        if (err) {
            console.log('error: ', err);
            throw err;
        }
        response.send(['Hello World!!!!', rows]);
    });
    */
    
    
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});


