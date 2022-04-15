export default class Page {
  #app;
  #header;
  #main;

  constructor(header, main) {
    this.#app = document.createElement('div');
    this.#app.id = 'app';
    this.#header = header;
    this.#main = main;
    this.#app.append(header.element, main.element);
  }

  get header() {
    return this.#header;
  }

  get element() {
    return this.#app;
  }

  get main() {
    return this.#main;
  }
}
