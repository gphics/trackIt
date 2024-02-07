const jwt = require("jsonwebtoken");

module.exports = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { err: null, data: decoded.data };
  } catch (error) {
    return { err: error.message, data: null };
  }
};
