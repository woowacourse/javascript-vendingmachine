export default class Page {
  #app;

  constructor(header, main) {
    this.#app = document.createElement('div');
    this.#app.id = 'app';
    this.#app.append(header.element, main.element);
  }

  get element() {
    return this.#app;
  }
}
