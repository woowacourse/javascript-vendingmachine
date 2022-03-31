const pickNumberInList = (list: number[]) => {
  const randomNumber = Math.floor(Math.random() * list.length);
  return list[randomNumber];
};

const clearInput = (...inputs: HTMLElement[]) => {
  inputs.forEach((input: HTMLInputElement) => (input.value = ""));
};

export { pickNumberInList, clearInput };
