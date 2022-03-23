import { Product } from '../interfaces/VendingMachine.interface';

const ModifyProductComponent = (product: Product) => {
  const { name, price, amount } = product;
  return `
    <span>
      <input
      type="text"
      class="product-name-modify-input"
      value="${name}"
      placeholder="상품명"
      required
      />
    </span>
    <span>
      <input
      type="text"
      class="product-price-modify-input"
      value="${price}"
      placeholder="가격"
      required
      />
    </span>
    <span>
      <input
      type="text"
      class="product-amount-modify-input"
      value="${amount}"
      placeholder="수량"
      required
      />  
    </span>
    <span>
      <button type="button" class="product-modify-submit-button" data-name="${name}">
        확인
      </button>
    </span>
  `;
};

export default ModifyProductComponent;
