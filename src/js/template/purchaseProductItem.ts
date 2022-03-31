import { Product } from '../interfaces/VendingMachine.interface';

const purchaseProductItem = (product: Product) => {
  const { name, price, amount } = product;
  return `
    <span class="product-name product-block">${name}</span>
    <span class="product-price product-block">${price}</span>
    <span class="product-amount product-block">${amount}</span>
    <span class="product-block">
      <button type="button" class="product-purchase-submit-button" data-name="${name}">
        확인
      </button>
    </span>
  `;
};

export default purchaseProductItem;
