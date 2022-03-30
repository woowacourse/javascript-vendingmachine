export const selectDom = (selector, parent = document) => parent.querySelector(selector);

export const selectDoms = (selector, parent = document) => parent.querySelectorAll(selector);
