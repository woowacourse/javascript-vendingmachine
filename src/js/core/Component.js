import { componentMixin } from './componentMixin';
import Subject from './Subject';

export default class Component extends HTMLElement {
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
}

Object.assign(Component.prototype, componentMixin);
