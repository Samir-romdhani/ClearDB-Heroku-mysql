var express = require("express");
//var mysql = require('mysql');
var app = express();
app.use(express.logger());


app.get('/', function(request, response) {
response.send('Hello World!!!!test0 --> test1') ;
}) ;

/*
var connection = mysql.createConnection({
    host: 'thzz882efnak0xod.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'vbebknxc303ntx0f',
    password: 'nnzetk5uihgms2l8',
    database: 'vti0cwdbw6zs5nka'
});

connection.connect();

app.get('/', function(request, response) {
	    connection.query('SELECT * from t_users', function(err, rows, fields) {
        if (err) {
            console.log('error: ', err);
            throw err;
        }
        response.send(['Hello World!!!! HOLA MUNDO!!!! Samir', rows]);
    });
        
        
});

*/

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
