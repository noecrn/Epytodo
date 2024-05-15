module.exports = {
    getAllUsers: "SELECT * FROM userTable",
    getuserById: "SELECT * FROM userTable WHERE id = ?",
	getuserByEmail: "SELECT * FROM userTable WHERE email = ?",
    createuser: "INSERT INTO userTable (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)",
    updateuser: "UPDATE userTable SET email = ?, password = ?, firstname = ?, name = ? WHERE id = ?",
    deleteuser: "DELETE FROM userTable WHERE id = ?"
};