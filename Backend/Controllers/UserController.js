const CatchAsyncError = require("../MiddleWare/CatchAsyncErro");
const ApiFeatures = require("../Utils/ApiFeatures");
const User = require("../Models/UserModel");
const { response } = require("../App");
const ErrorHandler = require("../Utils/ErrorHandler");
const sendToken = require("../Utils/JwtToken");
const CatchAsyncErro = require("../MiddleWare/CatchAsyncErro");
const sendEmail = require("../Utils/SendEmail");

exports.registerUser = CatchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is sample public id",
      url: "sampleavatarurl",
    },
  });
  sendToken(user, 201, res);
});

// login user

exports.loginUser = CatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // check email and password exist
  if (!email || !password) {
    return next(new ErrorHandler("please provide email and password", 401));
  }
  //   check if user exists

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new ErrorHandler("Email and password not Exists", 401));
  }
  sendToken(user, 201, res);
});

// logout user

exports.logOutUser = CatchAsyncErro(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
    message: " Log Out Successfully",
  });
});

// forgort password
exports.forgotPassword = CatchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  // Get reset token
  const resetToken = user.passwordResetToken();

  await user.save({ validateBeforeSave: false });

  const passwordResetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/${resetToken}`;

  const message = `your password reset token is :/n/n ${passwordResetUrl} if you are not requesting a reset token please ignore this`;

  try {
    await sendEmail({
      email: req.body.email,
      subject: `Ecommerce password reset recovery email`,
      message,
    });

    res.status(200).json({
      success: "success",
      message: `Password reset recovery email sent successfully to ${req.body.email}`,
    });
  } catch (e) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(e.message, 500));
  }
});
