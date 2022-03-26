export const $ = (select) => document.querySelector(select);

export const replaceElement = (element, content) => {
  element.replaceChildren();
  element.insertAdjacentHTML('beforeend', content);
};
