import { Product } from '../interfaces/VendingMachine.interface';

const ProductItemComponent = (product: Product) => {
  const { name, price, amount } = product;
  return `
    <li>
      <span>${name}</span>
      <span>${price}</span>
      <span>${amount}</span>
      <span>
      <button type="button" class="product-modify-button">
        수정
      </button>
      </span>
    </li>
  `;
};

export default ProductItemComponent;
