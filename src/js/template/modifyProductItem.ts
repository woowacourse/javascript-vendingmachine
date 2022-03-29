import { Product } from '../interfaces/VendingMachine.interface';

const modifyProductItem = (product: Product) => {
  const { name, price, amount } = product;
  return `
    <span class="product-block">
      <input
      type="text"
      class="product-name-modify-input product-modify-input"
      value="${name}"
      placeholder="상품명"
      required
      />
    </span>
    <span class="product-block">
      <input
      type="number"
      class="product-price-modify-input product-modify-input"
      value="${price}"
      placeholder="가격"
      required
      />
    </span>
    <span class="product-block">
      <input
      type="number"
      class="product-amount-modify-input product-modify-input"
      value="${amount}"
      placeholder="수량"
      required
      />  
    </span>
    <span class="product-block">
      <button type="button" class="product-modify-submit-button" data-name="${name}">
        확인
      </button>
    </span>
  `;
};

export default modifyProductItem;
