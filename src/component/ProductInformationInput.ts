import { ProductCatalog } from '../domain/ProductCatalog';

export class ProductInformationInput {
  private productCatalog: ProductCatalog;
  private target: HTMLDivElement;
  private productInformationForm: HTMLFormElement;
  private productNameInput: HTMLInputElement;
  private productPriceInput: HTMLInputElement;
  private productQuantityInput: HTMLInputElement;
  private submitButton: HTMLButtonElement;

  constructor(props) {
    this.target = props.target;
    this.productCatalog = props.productCatalog;
  }

  render() {
    this.target.insertAdjacentHTML('beforeend', this.template());
    this.selectDom();
    this.bindEvent();
  }

  private template(): string {
    return `
      <form id="product-information-input">
        <label id="product-input-label" for="product-information-input">추가할 상품 정보를 입력해주세요</label>
        <input id="product-name-input" class="input" type="text" placeholder="상품명" />
        <input id="product-price-input" class="input" type="number" placeholder="가격" />
        <input id="product-quantity-input" class="input" type="number" placeholder="수량" />
        <button id="product-information-submit-btn" class="submit-button button" type="submit">추가</button>
      </form>
    `;
  }

  private selectDom() {
    this.productInformationForm = document.querySelector('#product-information-input');
    this.productNameInput = document.querySelector('#product-name-input');
    this.productPriceInput = document.querySelector('#product-price-input');
    this.productQuantityInput = document.querySelector('#product-quantity-input');
    this.submitButton = document.querySelector('#product-information-submit-btn');
  }

  private bindEvent() {
    this.submitButton.addEventListener('click', this.handleAddProduct);
  }

  private handleAddProduct = (e) => {
    e.preventDefault();

    const productName = this.productNameInput.value;
    const productPrice = this.productPriceInput.valueAsNumber;
    const productQuantity = this.productQuantityInput.valueAsNumber;

    try {
      this.productCatalog.addProduct(productName, productPrice, productQuantity);
    } catch (err) {
      alert(err.message);

      return;
    }

    this.target.dispatchEvent(new CustomEvent('productAdded'));
    this.productInformationForm.reset();
  };
}
