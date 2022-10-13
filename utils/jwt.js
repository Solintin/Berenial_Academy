const jwt = require("jsonwebtoken");

const createJWT = ({ _id, email, role }) => {
  const payload = { id: _id, email, role };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

const isTokenValid = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { createJWT, isTokenValid };
