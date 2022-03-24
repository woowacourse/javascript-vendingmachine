const getRandomIndex = <T>(array: T[]) => {
  return Math.floor(Math.random() * array.length);
};

export { getRandomIndex };
