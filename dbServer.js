require("dotenv").config()

const jwt = require("jsonwebtoken")
const express = require("express")
const app = express()
const mysql = require("mysql")
const bcrypt = require("bcrypt")
const port = process.env.PORT

const generateAccessToken = require("./generateAccessToken")

const db = mysql.createPool({
	connectionLimit: 100,
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_ROOT_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	port: port
})

app.use(express.json())

app.post("/register", async (req,res) => {
	const email = req.body.email;
	const user = req.body.name;
	const firstname = req.body.firstname;
	const hashedPassword = await bcrypt.hash(req.body.password,10);

	db.getConnection( async (err, connection) => {
		if (err) throw (err)
		const sqlSearch = "SELECT * FROM userTable WHERE name = ?"
		const search_query = mysql.format(sqlSearch,[user])
		const sqlInsert = "INSERT INTO userTable VALUES (0,?,?,?,?)"
		const insert_query = mysql.format(sqlInsert,[email, user, firstname, hashedPassword])
		
		await connection.query (search_query, async (err, result) => {
			if (err) throw (err)
			if (result.length != 0) {
			connection.release()
			res.json({msg: "Account already exists"})
			} 
			else {
				await connection.query (insert_query, (err, result)=> {
					connection.release()
					if (err) throw (err)
					res.sendStatus(201).json({token: "Token of the newly registered user"})
				})
			}
		})
	})
})

app.post("/login", (req, res)=> {
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
				res.sendStatus(404).json({msg: "User does not exist"})
			}
			else {
				const hashedPassword = result[0].password
				
				if (await bcrypt.compare(password, hashedPassword)) {
					const token = generateAccessToken({email: email})
					res.json({token: token})
				} else {
					res.json({msg: "Invalid Credentials"})
				}
			}
		})
	})
})

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) return res.sendStatus(401)

	jwt.verify(token, process.env.SECRET, {expiresIn: "24h"}, (err, user) => {
		if (err) return res.sendStatus(403)
		req.user = user
		next()
	})
}

app.get("/user", authenticateToken, (req, res) => {
	const userId = req.userId.userId;
	const email = req.email.email;
    const userName = req.user.user;
    const getQuery = "SELECT user, password FROM userTable WHERE email = ?";

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
				id: userId,
                email: email,
                password: password,
				firstname: firstname,
				name: userName
            });
        });
    });
});


app.listen(port, ()=> console.log(`Server Started on port ${port}...`))

db.getConnection( (err, connection)=> {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
})