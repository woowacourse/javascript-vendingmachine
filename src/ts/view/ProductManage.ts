import { ProductManageView, VendingMachine, Product } from '../../index.d';
import { $ } from '../util/index';
import VendingMachineImpl from '../interactor/VendingMachineImpl';

export default class ProductManage implements ProductManageView {
  public readonly $addProductForm: HTMLElement;
  public readonly $productContainer: HTMLElement;
  public readonly $additionalProductName: HTMLElement;
  public readonly $additionalProductPrice: HTMLElement;
  public readonly $additionalProductQuantity: HTMLElement;
  public readonly vendingMachine: VendingMachine;

  constructor() {
    this.$addProductForm = $('#add-product-form');
    this.$productContainer = $('#product-list');
    this.$additionalProductName = $('#product-name-input');
    this.$additionalProductPrice = $('#product-price-input');
    this.$additionalProductQuantity = $('#product-quantity-input');
    this.vendingMachine = VendingMachineImpl.getInstance();
  }

  bindEvent() {
    this.$addProductForm.addEventListener('submit', this.handleSubmitForm.bind(this));
    this.$productContainer.addEventListener('click', this.handleClickButtons.bind(this));
  }

  handleSubmitForm(e: Event) {
    e.preventDefault();

    try {
      const newProduct: Product =  { 
        name: (this.$additionalProductName as HTMLInputElement).value, 
        price: Number((this.$additionalProductPrice as HTMLInputElement).value),  
        quantity: Number((this.$additionalProductQuantity as HTMLInputElement).value),
      };

      this.vendingMachine.addProduct(newProduct);
      this.render();
    } catch ({ message }) {
      alert(message);
    }
  }

  handleClickButtons(e: Event) {
    const target = e.target as HTMLElement;

    if (target.classList.contains('modify-button')) this.setModifyForm(target.closest('tr'));

    if (target.classList.contains('delete-button') && confirm('정말 삭제하시겠습니까?')) this.deleteProduct(target.closest('tr'));

    if (target.classList.contains('confirm-button')) this.modifyProduct(target.closest('tr'));
  }

  setModifyForm(productRow: HTMLElement) {
    productRow.classList.add('modify');
  }

  deleteProduct(productRow: HTMLElement) {
    try {
      this.vendingMachine.deleteProduct(($('.product-info-name', productRow) as HTMLInputElement).value);
      this.render();
    } catch ({ message }) {
      alert(message);
    }
  }

  modifyProduct(productRow: HTMLElement) {
    try {
      const newProduct: Product = {
        name: ($('.product-info-name', productRow) as HTMLInputElement).value, 
        price: Number(($('.product-info-price', productRow) as HTMLInputElement).value),  
        quantity: Number(($('.product-info-quantity', productRow) as HTMLInputElement).value),
      };
      const originProductName = $('.product-info__text.name', productRow).innerText;

      this.vendingMachine.modifyProduct(newProduct, originProductName);
      this.render();
    } catch ({ message }) {
      alert(message);
    }
  }
  
  render() {
    const template = this.vendingMachine.productCollection.products
      .map(
        ({ name, price, quantity }: Product) =>
          `<tr class="product-info">
          <td class="product-info__text name">${name}</td>
          <td class="product-info__text price">${price}</td>
          <td class="product-info__text quantity">${quantity}</td>
          <td class="product-info__input"><input type="text" class="product-info-name" value="${name}" /></td>
          <td class="product-info__input"><input type="text" class="product-info-price" value="${price}" /></td>
          <td class="product-info__input"><input type="text" class="product-info-quantity" value="${quantity}" /></td>
          <td>
            <button class="modify-button button">수정</button>
            <button class="delete-button button">삭제</button>
            <button class="confirm-button button">확인</button>
          </td>
        </tr>`,
      )
      .join('');
    this.$productContainer.replaceChildren();
    this.$productContainer.insertAdjacentHTML('beforeend', template);
  }
} 
