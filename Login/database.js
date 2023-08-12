const mysql = require('mysql');

const connection = mysql.createConnection({
	host : 'localhost',
	database : 'login_db',
	user : 'root',
	password : '1234#Ahan'
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;