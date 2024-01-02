const generateRandomNumber = () => {
  const min = 1000000000; // 10^9
  const max = 9999999999; // 10^10 - 1
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { generateRandomNumber };
