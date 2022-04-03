import Coin from '../domain/Coin';
import { Product } from '../domain/Product';

class CustomElement extends HTMLElement {
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

  notify({}) {}
}

export default CustomElement;
