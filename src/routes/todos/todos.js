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

module.exports = router;