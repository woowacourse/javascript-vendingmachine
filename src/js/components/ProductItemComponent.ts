import { Product } from '../interfaces/VendingMachine.interface';

const controlButton = () => {
  return `<button type="button" class="product-modify-button">
  수정
</button>
<button type="button" class="product-remove-button">
  삭제
</button>`;
};

const purchaseButton = () => {
  return `<button type="button" class="product-purchase-button">
  구매
</button>`;
};

const ProductItemComponent = (product: Product, isAdmin: boolean = false) => {
  const { name, price, amount } = product;
  return `
  <span class="product-name">${name}</span>
  <span class="product-price">${price}</span>
  <span class="product-amount">${amount}</span>
  <span class="product-control-buttons">
  ${isAdmin ? controlButton() : purchaseButton()}
  </span>
  `;
};

export default ProductItemComponent;
