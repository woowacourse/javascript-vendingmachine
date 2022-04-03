import { ProductCatalog } from '../domain/ProductCatalog';

export class ProductInformationInput {
  #productCatalog: ProductCatalog;
  #target: HTMLDivElement;
  #productInformationForm: HTMLFormElement;
  #productNameInput: HTMLInputElement;
  #productPriceInput: HTMLInputElement;
  #productQuantityInput: HTMLInputElement;
  #submitButton: HTMLButtonElement;

  constructor({ target, productCatalog }) {
    this.#target = target;
    this.#productCatalog = productCatalog;
  }

  render() {
    this.#target.insertAdjacentHTML('beforeend', this.template());
    this.selectDom();
    this.bindEvent();
  }

  private template(): string {
    return `
      <form id="product-information-form">
        <label id="product-input-label" for="product-information-input">추가할 상품 정보를 입력해주세요</label>
        <input id="product-name-input" class="input" type="text" placeholder="상품명" />
        <input id="product-price-input" class="input" type="number" placeholder="가격" />
        <input id="product-quantity-input" class="input" type="number" placeholder="수량" />
        <button id="product-information-submit-btn" class="submit-button button" type="submit">추가</button>
      </form>
    `;
  }

  private selectDom() {
    this.#productInformationForm = document.querySelector('#product-information-form');
    this.#productNameInput = document.querySelector('#product-name-input');
    this.#productPriceInput = document.querySelector('#product-price-input');
    this.#productQuantityInput = document.querySelector('#product-quantity-input');
    this.#submitButton = document.querySelector('#product-information-submit-btn');
  }

  private bindEvent() {
    this.#submitButton.addEventListener('click', this.handleAddProduct);
  }

  private handleAddProduct = (e) => {
    e.preventDefault();

    const name = this.#productNameInput.value;
    const price = this.#productPriceInput.valueAsNumber;
    const quantity = this.#productQuantityInput.valueAsNumber;

    try {
      this.#productCatalog.addProduct({ name, price, quantity });
    } catch (err) {
      alert(err.message);

      return;
    } finally {
      this.#productInformationForm.reset();
    }

    this.#target.dispatchEvent(
      new CustomEvent('productAdded', { detail: { name, price, quantity } })
    );
  };
}
