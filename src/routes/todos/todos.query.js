module.exports = {
    getAllTodos: "SELECT * FROM todoTable",
    getTodoById: "SELECT * FROM todoTable WHERE id = ?",
    getTodoByUser_id: "SELECT * FROM todoTable WHERE user_id = ?",
    createTodo: "INSERT INTO todoTable (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)",
    updateTodo: "UPDATE todoTable SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?",
    deleteTodo: "DELETE FROM todoTable WHERE id = ?"
};