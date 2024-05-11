require("dotenv").config()

const jwt = require("jsonwebtoken")
const express = require("express")
const app = express()
const mysql = require("mysql")
const bcrypt = require("bcrypt")
const port = process.env.DB_PORT

const generateAccessToken = require("./generateAccessToken")

const db = mysql.createPool({
	connectionLimit: 100,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: port
})

app.use(express.json())

app.post("/createUser", async (req,res) => {
	const user = req.body.name;
	const hashedPassword = await bcrypt.hash(req.body.password,10);

	db.getConnection( async (err, connection) => {
		if (err) throw (err)
		const sqlSearch = "SELECT * FROM userTable WHERE user = ?"
		const search_query = mysql.format(sqlSearch,[user])
		const sqlInsert = "INSERT INTO userTable VALUES (0,?,?)"
		const insert_query = mysql.format(sqlInsert,[user, hashedPassword])
		
		await connection.query (search_query, async (err, result) => {
			if (err) throw (err)
			console.log("------> Search Results")
			console.log(result.length)
			if (result.length != 0) {
			connection.release()
			console.log("------> User already exists")
			res.sendStatus(409) 
			} 
			else {
				await connection.query (insert_query, (err, result)=> {
					connection.release()
					if (err) throw (err)
					console.log ("--------> Created new User")
					console.log(result.insertId)
					res.sendStatus(201)
				})
			}
		})
	})
})

app.post("/login", (req, res)=> {
	const user = req.body.name
	const password = req.body.password

	db.getConnection ( async (err, connection)=> {
		if (err) throw (err)
		const sqlSearch = "Select * from userTable where user = ?"
		const search_query = mysql.format(sqlSearch,[user])

		await connection.query (search_query, async (err, result) => {
			connection.release()

			if (err) throw (err)
			if (result.length == 0) {
				console.log("--------> User does not exist")
				res.sendStatus(404)
			} 
			else {
				const hashedPassword = result[0].password
				
				if (await bcrypt.compare(password, hashedPassword)) {
					console.log("---------> Login Successful")
					console.log("---------> Generating accessToken")
					const token = generateAccessToken({user: user})
					console.log(token)
					res.json({accessToken: token})
				} else {
					res.send("Password incorrect!")
				}
			}
		})
	})
})

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) return res.sendStatus(401)

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "24h"}, (err, user) => {
		if (err) return res.sendStatus(403)
		req.user = user
		next()
	})
}

app.get("/user", authenticateToken, (req, res) => {
    const userName = req.user.user;
    const getQuery = "SELECT user, password FROM userTable WHERE user = ?";

	console.log(userName)

    db.getConnection((err, connection) => {
        if (err) {
            console.error("[ERROR] " + err);
            return res.status(500).json({ msg: "Internal server error" });
        }

        connection.query(getQuery, [userName], (err, result) => {
            connection.release();
            if (err) {
                console.error("[ERROR] " + err);
                return res.status(500).json({ msg: "Internal server error" });
            }
            if (result.length === 0) {
                return res.status(404).json({ msg: "User not found" });
            }

            const user = result[0];
            const password = user.password;

            res.json({
                username: userName,
                password: password
            });
        });
    });
});


app.listen(port, ()=> console.log(`Server Started on port ${port}...`))

db.getConnection( (err, connection)=> {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
})