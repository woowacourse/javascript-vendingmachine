import { componentMixin } from './componentMixin';

export default class Component extends HTMLElement {
  props;

  state;

  constructor() {
    super();

    this.setProps();
    this.setup();
    this.setEvent();
  }
}

Object.assign(Component.prototype, componentMixin);
