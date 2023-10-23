module.exports = sendtoken = async (user, token, res) => {
  let option = {
    expires: new Date(Date.now() + process.env.COOKIE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(200).cookie("token", token, option).json({
    user,
    token,
  });
};
