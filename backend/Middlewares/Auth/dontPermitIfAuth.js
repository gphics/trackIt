const activateError = require("../../Utils/activateError");

module.exports = (req, res, next) => {
  const { auth_token } = req.query;
  if (auth_token) {
    return next(activateError("you are authenticated already"));
  }
  next();
};

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIn0sImlhdCI6MTcwNzI1MzUwOSwiZXhwIjoxNzA3MzM5OTA5fQ.MVbj1c4Oc1zBtnTtYsXYIAphPDKvbtK9pKF3mO4D8oA
*/
