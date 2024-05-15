const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require('mysql');
const db = require('../../config/db');
const generateAccessToken = require('../../utils/generateAccessToken');

const router = express.Router();

router.post("/register", async (req,res) => {
	const email = req.body.email;
	const name = req.body.name;
	const firstname = req.body.firstname;
	const hashedPassword = await bcrypt.hash(req.body.password,10);

	db.getConnection( async (err, connection) => {
		if (err) throw (err)
		const sqlSearch = "SELECT * FROM userTable WHERE name = ?";
		const search_query = mysql.format(sqlSearch,[name]);
		const sqlInsert = "INSERT INTO userTable (id, email, name, firstname, password) VALUES (0,?,?,?,?)";
		const insert_query = mysql.format(sqlInsert,[email, name, firstname, hashedPassword]);
		
		await connection.query (search_query, async (err, result) => {
			if (err) throw (err)
			if (result.length != 0) {
				connection.release();
				res.json({msg: "Account already exists"});
			} 
			else {
				await connection.query (insert_query, (err, result)=> {
					connection.release();
					if (err) throw (err)
					res.status(201).json({token: "Token of the newly registered user"});
				})
			}
		})
	})
});

router.post("/login", (req, res)=> {
	const email = req.body.email
	const password = req.body.password
	const userId = req.body.id;
	const name = req.body.name;
	const firstname = req.body.firstname;
	const created_at = req.body.created_at;

	db.getConnection ( async (err, connection)=> {
		if (err) throw (err)
		const sqlSearch = "Select * from userTable where email = ?"
		const search_query = mysql.format(sqlSearch,[email])

		connection.query (search_query, async (err, result) => {
			connection.release()

			if (err) throw (err)
			if (result.length == 0) {
				res.sendStatus(404).json({msg: "User does not exist"})
			}
			else {
				const hashedPassword = result[0].password
				
				if (await bcrypt.compare(password, hashedPassword)) {
					const token = generateAccessToken({userId: userId, email: email, name: name, firstname: firstname, created_at: created_at})
					console.log(token);
					res.json({token: 'Token of the newly logged in user'});
				} else {
					res.json({msg: "Invalid Credentials"})
				}
			}
		})
	})
});

module.exports = router;