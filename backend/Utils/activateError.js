module.exports = (statusCode = 500, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};
