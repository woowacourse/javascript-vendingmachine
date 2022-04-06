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

export function generateSnackBar(text) {
  const snackBarContainer = document.getElementById('snackbar');
  snackBarContainer.className = 'show';
  snackBarContainer.textContent = text;
  setTimeout(() => {
    snackBarContainer.className = snackBarContainer.className.replace('show', '');
  }, 3000);
}
