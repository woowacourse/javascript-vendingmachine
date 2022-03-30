export function selectDom(selector, baseElement = document) {
  return baseElement.querySelector(selector);
}

export function createMainElement(template) {
  const mainElement = document.createElement('main');
  mainElement.insertAdjacentHTML('beforeend', template);

  return mainElement;
}
