import { Safe } from '../domain/Safe';
import Product from '../domain/Product';

export interface Notification {
  action: string;
  amount: Safe;
  product?: Product;
  userAmount: number;
  userName?: string;
}

export class CustomElement extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEvent();
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return '';
  }

  setEvent() {}

  notify(notification: Notification) {}
}
