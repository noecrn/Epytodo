const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../config/db');

const router = express.Router();

router.get("/user", (req, res) => {
	const email = req.user.email;
	const getQuery = "SELECT id, email, password, name, firstname, created_at FROM userTable WHERE email = ?";

    db.getConnection((err, connection) => {
        if (err) {
            console.error("[ERROR] " + err);
            return res.status(500).json({ msg: "Internal server error" });
        }

        connection.query(getQuery, [email], (err, result) => {
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

router.get("/user/todos", (req, res) => {
	const email = req.user.email;
	const getQuery = "SELECT id, title, description, created_at, due_time, status, user_id FROM todoTable WHERE user_id = ?";

    db.getConnection((err, connection) => {
        if (err) {
            console.error("[ERROR] " + err);
            return res.status(500).json({ msg: "Internal server error" });
        }

        connection.query(getQuery, [req.user.id], (err, result) => {
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

router.get("/users/:identifier", (req, res) => {
    const identifier = req.params.identifier;
    let getQuery;

    if (isNaN(identifier)) {
        getQuery = "SELECT * FROM userTable WHERE email = ?";
    } else {
        getQuery = "SELECT * FROM userTable WHERE id = ?";
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

router.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const { email, password, firstname, name } = req.body;

    bcrypt.hash(password, 10, function(err, hashedPassword) {
        if (err) {
            console.error("[ERROR] " + err);
            return res.status(500).json({ msg: "Internal server error"});
        }

        const updateQuery = "UPDATE userTable SET email = ?, password = ?, firstname = ?, name = ? WHERE id = ?";

        db.getConnection((err, connection) => {
            if (err) {
                console.error("[ERROR] " + err);
                return res.status(500).json({ msg: "Internal server error" });
            }

            connection.query(updateQuery, [email, hashedPassword, firstname, name, id], (err, result) => {
                if (err) {
                    connection.release();
                    console.error("[ERROR] " + err);
                    return res.status(500).json({ msg: "Internal server error" });
                }
                if (result.affectedRows === 0) {
                    connection.release();
                    return res.status(404).json({ msg: "User not found" });
                }

                connection.query('SELECT * FROM userTable WHERE id = ?', [id], (err, rows) => {
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

router.delete("/users/:id", (req, res) => {
	const id = req.params.id;

	const deleteQuery = "DELETE FROM userTable WHERE id = ?";

	db.getConnection((err, connection) => {
		if (err) {
			console.log("[ERROR]" + err);
			return res.status(500).json({ msg: "Internal server error" });
		}

		connection.query(deleteQuery, [id], (err, result) => {
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