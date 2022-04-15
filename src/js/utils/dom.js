export function selectDom(selector, baseElement = document) {
  return baseElement.querySelector(selector);
}

export function createMainElement(template) {
  const mainElement = document.createElement('main');
  mainElement.insertAdjacentHTML('beforeend', template);
  return mainElement;
}

export function createElementByTemplate(type, template) {
  const element = document.createElement(type);
  element.insertAdjacentHTML('beforeend', template);
  return element;
}

// eslint-disable-next-line max-lines-per-function
export function snackBar() {
  const snackBarContainer = document.getElementById('snackbar');
  let timeoutID = null;
  let isGenerated = false;
  return function generate(text) {
    if (isGenerated) {
      clearTimeout(timeoutID);
      isGenerated = false;
      snackBarContainer.classList.remove('fadeIn');
      setTimeout(() => {
        generate(text);
      });
      return;
    }
    isGenerated = true;
    snackBarContainer.textContent = text;
    snackBarContainer.classList.remove('init');
    snackBarContainer.classList.add('fadeIn');
    timeoutID = setTimeout(() => {
      snackBarContainer.classList.remove('fadeIn');
      isGenerated = false;
    }, 3000);
  };
}

export const generateSnackBar = snackBar();
