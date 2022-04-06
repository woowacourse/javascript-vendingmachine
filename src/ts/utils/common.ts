const pickNumberInList = (list: number[]) => {
  const randomNumber = Math.floor(Math.random() * list.length);
  return list[randomNumber];
};

const clearInput = (...inputs: HTMLElement[]) => {
  inputs.forEach((input: HTMLInputElement) => (input.value = ""));
};

const createTextElement = (tagName: string, className: string, text: string) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  element.textContent = text;

  return element;
};

export { pickNumberInList, clearInput, createTextElement };
