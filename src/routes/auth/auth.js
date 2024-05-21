const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require('mysql');
const db = require('../../config/db');
const generateAccessToken = require('../../utils/generateAccessToken');

const router = express.Router();

// Register a new user
router.post("/register", async (req,res) => {
	const email = req.body.email;
	const name = req.body.name;
	const firstname = req.body.firstname;
	const hashedPassword = await bcrypt.hash(req.body.password,10);
	const created_at = new Date();

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
				res.status(409).json({msg: "Account already exists"});
			} 
			else {
				await connection.query (insert_query, (err, result)=> {
					if (err) throw (err)
					const userId = result.insertId;
					const token = generateAccessToken({userId: userId, email: email, name: name, firstname: firstname, created_at: created_at});
					connection.release();
					res.status(201).json({ id: userId, token: token });
				})
			}
		})
	})
});

// Connect a user
router.post("/login", (req, res)=> {
	const email = req.body.email
	const password = req.body.password

	db.getConnection ( async (err, connection)=> {
		if (err) throw (err)
		const sqlSearch = "Select * from userTable where email = ?"
		const search_query = mysql.format(sqlSearch,[email])

		connection.query (search_query, async (err, result) => {
			connection.release()

			if (err) throw (err)
			if (result.length == 0) {
				res.status(401).json({msg: "Invalid Credentials"})
			}
			else {
				const hashedPassword = result[0].password
				const userId = result[0].id;
				const email = result[0].email;
				const name = result[0].name;
				const firstname = result[0].firstname;
				const created_at = result[0].created_at;
				
				if (await bcrypt.compare(password, hashedPassword)) {
					const token = generateAccessToken({userId: userId, email: email, name: name, firstname: firstname, created_at: created_at});
					res.status(201).json({ id: userId, token: token });
				} else {
					res.status(401).json({msg: "Invalid Credentials"})
				}
			}
		})
	})
});

module.exports = router;