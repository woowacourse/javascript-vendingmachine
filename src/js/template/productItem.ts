import { Product } from '../interfaces/VendingMachine.interface';

const productItem = (product: Product) => {
  const { name, price, amount } = product;
  return `
    <span class="product-name product-block">${name}</span>
    <span class="product-price product-block">${price}</span>
    <span class="product-amount product-block">${amount}</span>
    <span class="product-control-buttons product-block">
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
