import { componentMixin } from './componentMixin';
import Subject from './Subject';

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
}

Object.assign(TableRow.prototype, componentMixin);
