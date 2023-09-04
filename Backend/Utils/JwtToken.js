const sendToken = (user, statusCode, res) => {
  const token = user.getSignToken();
  // store in cookie
  const option = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, option).json({
    status: "success",
    user,
    token,
  });
};

module.exports = sendToken;
