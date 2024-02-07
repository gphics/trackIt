const jwt = require("jsonwebtoken");

module.exports = (obj) => {
  const encoded = jwt.sign({ data: obj }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
  return encoded;
};
