const ErrorHandler = require("../Utils/ErrorHandler");
const CatchAsyncErro = require("./CatchAsyncErro");
const jwt = require("jsonwebtoken");
const User = require("./../Models/UserModel");
exports.isAuthenticated = CatchAsyncErro(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login for access this route"), 401);
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

// for admin role
exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role ${req.user.role} does not exist`));
    }
    next();
  };
};
