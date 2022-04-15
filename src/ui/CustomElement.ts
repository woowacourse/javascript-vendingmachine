import { Safe } from '../domain/Safe';
import Product from '../domain/Product';
import { ELEMENT_KEY } from '../constants';
import VendingMachine from '../domain/VendingMachine';
import Authentication from '../domain/Authentication';

export interface Notification {
  action: string;
  amount?: Safe;
  product?: Product;
  userAmount?: number;
  userName?: string;
}

export class Page extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEvent();
  }

  inject(domain: VendingMachine | Authentication, elementKey: ELEMENT_KEY) {
    domain.observe({ key: elementKey, element: this });
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

export class Tab extends Page {}

export class Menu extends Page {}
