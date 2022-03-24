import { ProductCatalog } from '../domain/ProductCatalog';

export class ProductInformationInput {
  productCatalog: ProductCatalog;
  target: HTMLDivElement;

  constructor(props) {
    this.target = props.target;
    this.productCatalog = props.productCatalog;
  }

  templates(): string {
    return `
        <form id="product-information-input">
            <label id ='product-input-label' for="product-information-input">추가할 상품 정보를 입력해주세요</label>
            <input id='product-name-input' type="text" placeholder="상품명" class = 'input'></input>
            <input id='product-price-input' type="number" placeholder="가격" class = 'input'></input>
            <input id='product-quantity-input' type="number" placeholder="수량" class = 'input'></input>
            <button id = 'product-information-submit-btn' type="submit" class='submit-button button'>추가</button>
          </form>
    `;
  }

  render() {
    this.target.insertAdjacentHTML('beforeend', this.templates());
    this.selectDom();
    this.bindEvent();
  }

  productNameInput: HTMLInputElement;
  productPriceInput: HTMLInputElement;
  productQuantityInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
  selectDom() {
    this.productNameInput = document.querySelector('#product-name-input');
    this.productPriceInput = document.querySelector('#product-price-input');
    this.productQuantityInput = document.querySelector('#product-quantity-input');
    this.submitButton = document.querySelector('#product-information-submit-btn');
  }

  bindEvent() {
    this.submitButton.addEventListener('click', this.handleAddProduct);
  }

  tempEvent: CustomEvent;
  handleAddProduct = (e) => {
    e.preventDefault();

    const productName = this.productNameInput.value;
    const productPrice = this.productPriceInput.valueAsNumber;
    const productQuantity = this.productQuantityInput.valueAsNumber;

    try {
      this.productCatalog.addProduct(productName, productPrice, productQuantity);
      this.tempEvent = new CustomEvent('productAdded');
      this.target.dispatchEvent(this.tempEvent);
    } catch (err) {
      //Todo:Error message;
    }
  };
}
