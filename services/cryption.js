const jwt = require("jsonwebtoken");

var signToken = (data) => jwt.sign(data, "secret");

var verifyToken = (token) => jwt.verify(token, "secret");

module.exports = {signToken, verifyToken}