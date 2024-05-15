const express = require('express');
const db = require('../../config/db');
const todosQuery = require('./todos.query');
const userQuery = require('../user/user.query');

const router = express.Router();

// View all user tasks
router.get("/todos", (req, res) => {
	db.getConnection((err, connection) => {
		connection.query(todosQuery.getAllTodos, (err, result) => {
			if (err) {
				console.log("[ERROR]" + err);
				return res.status(500).json({ msg: "Internal server error" });
			}

			res.status(200).json(result);
		});
	});
});

// View the todo
router.get("/todos/:id", (req, res) => {
	const id = req.params.id;

	db.getConnection((err, connection) => {
		connection.query(todosQuery.getTodoById, [id], (err, result) => {
			if (err) {
				console.log("[ERROR]" + err);
				return res.status(500).json({ msg: "Internal server error" });
			}

			if (result.length === 0) {
				return res.status(404).json({ msg: "Todo not found" });
			}

			res.status(200).json(result[0]);
		});
	});
});

// Create a todo
router.post("/todos", (req, res) => {
    const { title, description, due_time, user_id, status } = req.body;

    const validStatuses = ['not started', 'todo', 'in progress', 'done'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ msg: "Invalid status"});
    }

    db.getConnection((err, connection) => {
        if (err) {
            console.log("[ERROR]" + err);
            return res.status(500).json({ msg: "Internal server error" });
        }

        connection.query(userQuery.getuserById, [user_id], (err, result) => {
            if (err) {
                console.log("[ERROR]" + err);
                return res.status(500).json({ msg: "Internal server error" });
            }

            if (result.length === 0) {
                return res.status(404).json({ msg: "User not found" });
            }

            connection.query(todosQuery.createTodo, [title, description, due_time, user_id, status], (err, result) => {
                if(err) {
                    console.log("[ERROR]" + err);
                    return res.status(500).json({ msg: "Internal server error" });
                }

                const newTodoId = result.insertId;

                connection.query(todosQuery.getTodoById, [newTodoId], (err, result) => {
                    connection.release();

                    if(err) {
                        console.log("[ERROR]" + err);
                        return res.status(500).json({ msg: "Internal server error" });
                    }

                    res.status(201).json(result[0]);
                });
            });
        });
    });
});

// Update a todo
router.put("/todos/:id", (req, res) => {
	const id = req.params.id;
	const { title, description, due_time, user_id, status } = req.body;

	db.getConnection((err, connection) => {
		if (err) {
			console.log("[ERROR]" + err);
			return res.status(500).json({ msg: "Internal server error" });
		}
		connection.query(todosQuery.updateTodo, [title, description, due_time, user_id, status, id], (err, result) => {
			if (err) {
				connection.release();
				console.log("[ERROR]" + err);
				return res.status(500).json({ msg: "Internal server error" });
			}

			if (result.affectedRows === 0) {
				connection.release();
				return res.status(404).json({ msg: "Todo not found" });
			}

			connection.query(todosQuery.getTodoById, [id], (err, rows) => {
				if (err) {
					connection.release();
					console.log("[ERROR]" + err);
					return res.status(500).json({ msg: "Internal server error" });
				}

				connection.release();
				const user = rows[0];
				res.json({
					title: user.title,
					description: user.description,
					due_time: due_time,
					user_id: user.user_id,
					status: user.status
				})
			});
		});
	});
});

// Delete a todo
router.delete("/todos/:id", (req, res) => {
	const id = req.params.id;

	db.getConnection((err, connection) => {
		if (err) {
			connection.release();
			console.log("[ERROR]" + err);
			return res.status(500).json({ msg: "Internal server error" });
		}

		connection.query(todosQuery.deleteTodo, [id], (err, result) => {
			if (err) {
				connection.release();
				console.log("[ERROR]" + err);
				return res.status(500).json({ msg: "Internal server error" });
			}

			if (result.affectedRows === 0) {
				return res.status(404).json({ msg: "Todo not found" });
			}

			res.status(200).json({msg: `Successfully deleted record number: ${id}`})
		});
	});
});

module.exports = router;