import { componentMixin } from './componentMixin';

export default class TableRow extends HTMLTableRowElement {
  props;

  state;

  constructor() {
    super();

    this.setProps();
    this.setup();
    this.setEvent();
  }
}

Object.assign(TableRow.prototype, componentMixin);
