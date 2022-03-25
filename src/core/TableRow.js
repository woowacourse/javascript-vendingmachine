import { deepEqual } from '../utils/commons';

export default class TableRow extends HTMLTableRowElement {
  props;

  state;

  constructor() {
    super();

    this.setProps();
    this.setup();
    this.setEvent();
  }

  connectedCallback() {
    Subject.observe(this);
  }

  disconnectedCallback() {
    Subject.unobserve(this);
  }

  setProps() {
    this.props = {};

    this.getAttributeNames().forEach((attributeName) => {
      this.props[attributeName] = this.getAttribute(attributeName);
    });
  }

  setup() {}

  render() {
    this.beforeRender();
    this.innerHTML = this.template();
    this.afterRender();
  }

  clearDOM() {
    while (this.firstChild) {
      this.removeChild(this.lastChild);
    }
  }

  template() {
    return ``;
    // throw new Error('override');
  }

  beforeRender() {}

  afterRender() {}

  setState(newState) {
    if (deepEqual(this.state, newState)) return;

    this.state = { ...this.state, ...newState };
    this.render();
  }

  setEvent() {}

  addEvent(type, selector, callback) {
    const isTarget = (target) => target.closest(selector);

    this.addEventListener(type, (event) => {
      if (!isTarget(event.target)) return;

      event.preventDefault();

      callback(event);
    });
  }

  notify() {
    this.render();
  }
}
