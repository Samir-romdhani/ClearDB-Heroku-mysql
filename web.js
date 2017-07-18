var express = require("express");
var mysql = require('mysql');
var app = express();
app.use(express.logger());

/*
app.get('/', function(request, response) {
response.send('Hello World!!!!test0 --> test1') ;
}) ;
*/

var connection = mysql.createConnection({
    host: 'olxl65dqfuqr6s4y.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'q2yseffhsh99cnbt',
    password: 'fdc1grofl58s3rqc',
    database: 'ec3n49dqttudnvr0'
});

connection.connect();

app.get('/', function(request, response) {
	    connection.query('SELECT * from t_users', function(err, rows, fields) {
        if (err) {
            console.log('error: ', err);
            throw err;
        }
        
    });
        
        
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
