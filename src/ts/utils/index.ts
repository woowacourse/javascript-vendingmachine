const getRandomIndex = <T>(array: T[]) => {
  return Math.floor(Math.random() * array.length);
};

const insertNBSP = (str: string) => {
  return str.replace(/\s+/g, '&nbsp;');
};

const removeNBSP = (str: string) => {
  return str.replace(String.fromCharCode(160), ' ');
};

export { getRandomIndex, insertNBSP, removeNBSP };
