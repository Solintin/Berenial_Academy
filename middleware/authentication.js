const { StatusCodes } = require("http-status-codes");
const { response } = require("../services/response");
const { isTokenValid } = require("../utils/jwt");

const isUserAuthenticated = (req, res, next) => {
  let token = null;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
    try {
      const { id, email, role } = isTokenValid(token);
      req.user = { id, email, role };
      console.log(req.user);
      next();
    } catch (error) {
      return response(
        res,
        StatusCodes.UNAUTHORIZED,
        "Access Denied. Authentication Invalid"
      );
    }
  } else {
    return response(
      res,
      StatusCodes.UNAUTHORIZED,
      "Access Denied. Authentication required"
    );
  }
};

const isUserPermitted = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return response(
        res,
        StatusCodes.FORBIDDEN,
        "Access Forbidden - User cannot perform this action."
      );
    }
    next();
  };
};

module.exports = { isUserAuthenticated, isUserPermitted };
