import { Coin } from '../domain/Coin';
import Product from '../domain/Product';

export interface Notification {
  action: string;
  amount: Coin;
  product?: Product;
  userAmount: number;
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
