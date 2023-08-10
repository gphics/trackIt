module.exports = (...params) => {
  return params.reduce((prev, cur) => {
    prev.push(new Date(cur).toString());
    return prev;
  }, []);
};
