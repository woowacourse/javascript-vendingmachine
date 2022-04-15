import { Product } from '../interfaces/VendingMachine.interface';
import * as Component from './abstractComponents/Component';

class ProductItemComponent extends Component.DependentComponent {
  bindEventAndElement(): void {
    throw new Error('Method not implemented.');
  }
  name: string;
  price: number;
  amount: number;
  isAdmin: boolean;

  constructor(product: Product, isAdmin: boolean = false) {
    super();
    this.name = product.name;
    this.price = product.price;
    this.amount = product.amount;
    this.isAdmin = isAdmin;
  }

  render() {
    return this.template();
  }

  protected template = () => `
    <span class="product-name">${this.name}</span>
    <span class="product-price">${this.price}</span>
    <span class="product-amount">${this.amount}</span>
    <span class="product-control-buttons">
      ${this.isAdmin ? this.controlButton() : this.purchaseButton()}
    </span>
    `;

  controlButton = () => {
    return `<button type="button" class="product-modify-button">
    수정
  </button>
  <button type="button" class="product-remove-button">
    삭제
  </button>`;
  };

  purchaseButton = () => {
    return `<button type="button" class="product-purchase-button">
    구매
  </button>`;
  };
}

export default ProductItemComponent;
