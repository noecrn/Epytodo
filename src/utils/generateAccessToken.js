const jwt = require("jsonwebtoken")

function generateAccessToken (user) {
	return jwt.sign({ id: user.userId, email: user.email, name: user.name, firstname: user.firstname, created_at: user.created_at }, process.env.SECRET, {expiresIn: "24h"})
}

module.exports=generateAccessToken