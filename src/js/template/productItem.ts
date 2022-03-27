import { Product } from '../interfaces/VendingMachine.interface';

const productItem = (product: Product) => {
  const { name, price, amount } = product;
  return `
    <span class="product-name">${name}</span>
    <span class="product-price">${price}</span>
    <span class="product-amount">${amount}</span>
    <span class="product-control-buttons">
      <button type="button" class="product-modify-button">
        수정
      </button>
      <button type="button" class="product-remove-button">
        삭제
      </button>
    </span>
  `;
};

export default productItem;
