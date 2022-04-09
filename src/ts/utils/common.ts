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

const passwordRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

export { pickNumberInList, clearInput, createTextElement, passwordRegex };
