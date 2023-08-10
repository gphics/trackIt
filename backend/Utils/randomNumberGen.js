module.exports = () => {
  const arr = [4, 5, 3, 6, 7, 8, 9, 1, 2, 7, 5, 9, 0];

  const res = [];
  for (let i = 1; i <= 6; i++) {
    const rand = Math.floor(Math.random() * 12);
    res.push(arr[rand]);
  }

  return res.join("");
};
