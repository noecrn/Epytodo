const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../config/db');
const userQuery = require('./user.query');
const todosQuery = require('../todos/todos.query');

const router = express.Router();

// View all user information
router.get("/user", (req, res) => {
	const email = req.user.email;

    db.getConnection((err, connection) => {
        if (err) {
            console.error("[ERROR] " + err);
            return res.status(500).json({ msg: "Internal server error" });
        }

        connection.query(userQuery.getuserByEmail, [email], (err, result) => {
            connection.release();
            if (err) {
                console.error("[ERROR] " + err);
                return res.status(500).json({ msg: "Internal server error" });
            }
            if (result.length === 0) {
                return res.status(404).json({ msg: "User not found" });
            }

            const user = result[0];

            res.json({
				id: user.id,
                email: email,
                password: user.password,
				created_at: user.created_at,
				firstname: user.firstname,
				name: user.name
            });
        });
    });
});

// View all user tasks
router.get("/user/todos", (req, res) => {
	const email = req.user.email;

    db.getConnection((err, connection) => {
        if (err) {
            console.error("[ERROR] " + err);
            return res.status(500).json({ msg: "Internal server error" });
        }

        connection.query(todosQuery.getTodoByUser_id, [req.user.id], (err, result) => {
            connection.release();
            if (err) {
                console.error("[ERROR] " + err);
                return res.status(500).json({ msg: "Internal server error" });
            }
            if (result.length === 0) {
                return res.status(404).json({ msg: "No todos found for this user" });
            }
			
			res.json(result);
        });
    });
});

// View user information
router.get("/users/:identifier", (req, res) => {
    const identifier = req.params.identifier;
    let getQuery;

    if (isNaN(identifier)) {
        userQuery.getuserByEmail;
    } else {
        userQuery.getuserById;
    }

    db.getConnection((err, connection) => {
        if (err) {
            console.error("[ERROR] " + err);
            return res.status(500).json({ msg: "Internal server error" });
        }

        connection.query(getQuery, [identifier], (err, result) => {
            connection.release();
            if (err) {
                console.error("[ERROR] " + err);
                return res.status(500).json({ msg: "Internal server error" });
            }
            if (result.length === 0) {
                return res.status(404).json({ msg: "User not found" });
            }

            const user = result[0];

            res.json(user);
        });
    });
});

// Update user information
router.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const { email, password, firstname, name } = req.body;

    bcrypt.hash(password, 10, function(err, hashedPassword) {
        if (err) {
            console.error("[ERROR] " + err);
            return res.status(500).json({ msg: "Internal server error"});
        }

        db.getConnection((err, connection) => {
            if (err) {
                console.error("[ERROR] " + err);
                return res.status(500).json({ msg: "Internal server error" });
            }

            connection.query(userQuery.updateuser, [email, hashedPassword, firstname, name, id], (err, result) => {
                if (err) {
                    connection.release();
                    console.error("[ERROR] " + err);
                    return res.status(500).json({ msg: "Internal server error" });
                }
                
                if (result.affectedRows === 0) {
                    connection.release();
                    return res.status(404).json({ msg: "User not found" });
                }

                connection.query(userQuery.getuserById, [id], (err, rows) => {
                    if (err) {
                        connection.release();
                        console.error("[ERROR]" + err);
                        return res.status(500).json({ msg: "Internal server error" });
                    }

                    connection.release();
                    const user = rows[0];
					res.json({
						id: user.id,
						email: user.email,
						password: user.password,
						created_at: user.created_at,
						firstname: user.firstname,
						name: user.name
					})
                });
            });
        });
    });
});

// Delete user
router.delete("/users/:id", (req, res) => {
	const id = req.params.id;

	db.getConnection((err, connection) => {
		if (err) {
			console.log("[ERROR]" + err);
			return res.status(500).json({ msg: "Internal server error" });
		}

		connection.query(userQuery.deleteuser, [id], (err, result) => {
			connection.release();

			if (err){
				console.log("[ERROR]" + err);
				return res.status(500).json({ msg: "Internal server error" });
			}

			if (result.affectedRows === 0) {
				return res.status(404).json({ msg: "User not found" });
			}

			res.status(200).json({ msg: `Successfully deleted record number: ${id}`})
		});
	});
});

module.exports = router;