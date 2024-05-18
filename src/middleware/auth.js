const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Get token from header
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

  // Check if token exists
  if (token == null) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  jwt.verify(token, process.env.SECRET, {expiresIn: "24h"}, (err, user) => {
    if (err) return res.status(403).json({msg: 'Token is not valid'});
    req.user = { id: user.id, email: user.email };
    next()
  })
};

module.exports = authenticateToken;