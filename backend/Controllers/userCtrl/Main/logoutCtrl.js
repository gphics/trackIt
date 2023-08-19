module.exports = async (req, res, next) => {
  req.session.destroy((err) => err && console.log(err));
  res.json({ data: "logged out ..." });
};
