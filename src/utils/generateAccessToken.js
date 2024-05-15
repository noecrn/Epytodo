const jwt = require("jsonwebtoken")

function generateAccessToken (user) {
	return jwt.sign(user, process.env.SECRET, {expiresIn: "24h"})
}

module.exports=generateAccessToken