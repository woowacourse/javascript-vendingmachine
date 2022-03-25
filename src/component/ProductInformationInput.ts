import { ProductCatalog } from '../domain/ProductCatalog';

export class ProductInformationInput {
  productCatalog: ProductCatalog;
  target: HTMLDivElement;

  constructor(props) {
    this.target = props.target;
    this.productCatalog = props.productCatalog;
  }

  render() {
    this.target.insertAdjacentHTML('beforeend', this.template());
    this.selectDom();
    this.bindEvent();
  }

  template(): string {
    return `
      <form id="product-information-input">
        <label id="product-input-label" for="product-information-input">추가할 상품 정보를 입력해주세요</label>
        <input id="product-name-input" type="text" placeholder="상품명" class="input" />
        <input id="product-price-input" type="number" placeholder="가격" class="input" />
        <input id="product-quantity-input" type="number" placeholder="수량" class="input" />
        <button id="product-information-submit-btn" type="submit" class="submit-button button">추가</button>
      </form>
    `;
  }

  productInformationForm: HTMLFormElement;
  productNameInput: HTMLInputElement;
  productPriceInput: HTMLInputElement;
  productQuantityInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
  selectDom() {
    this.productInformationForm = document.querySelector('#product-information-input');
    this.productNameInput = document.querySelector('#product-name-input');
    this.productPriceInput = document.querySelector('#product-price-input');
    this.productQuantityInput = document.querySelector('#product-quantity-input');
    this.submitButton = document.querySelector('#product-information-submit-btn');
  }

  bindEvent() {
    this.submitButton.addEventListener('click', this.handleAddProduct);
  }

  handleAddProduct = (e) => {
    e.preventDefault();

    const productName = this.productNameInput.value;
    const productPrice = this.productPriceInput.valueAsNumber;
    const productQuantity = this.productQuantityInput.valueAsNumber;

    try {
      this.productCatalog.addProduct(productName, productPrice, productQuantity);
      this.target.dispatchEvent(new CustomEvent('productAdded'));
    } catch (err) {
      alert(err.message);
    }

    this.productInformationForm.reset();
  };
}
