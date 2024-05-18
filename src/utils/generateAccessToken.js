const jwt = require("jsonwebtoken")

function generateAccessToken (user) {
	return jwt.sign({ id: user.userId }, process.env.SECRET, {expiresIn: "24h"})
}

module.exports=generateAccessToken