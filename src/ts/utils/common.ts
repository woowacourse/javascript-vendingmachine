const pickNumberInList = (list: number[]) => {
  const randomNumber = Math.floor(Math.random() * list.length);
  return list[randomNumber];
};

export { pickNumberInList };
