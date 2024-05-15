const mysql = require('mysql');

const db = mysql.createPool({
	connectionLimit: 100,
	database: process.env.MYSQL_DATABASE,
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_ROOT_PASSWORD,
	port: process.env.PORT
});

module.exports = db;