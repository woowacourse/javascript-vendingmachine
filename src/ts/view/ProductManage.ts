import { DomainView, Admin, Product, ProductName } from '../../index.d';
import { $ } from '../util/index';
import { CONFIRM_DELETE_PRODUCT_MESSAGE } from '../constant/index';
import AdminImpl from '../interactor/AdminImpl';
import Snackbar from './Snackbar';

export default class ProductManage implements DomainView {
  private $addProductForm: HTMLElement;
  private $productContainer: HTMLElement;
  private $additionalProductName: HTMLElement;
  private $additionalProductPrice: HTMLElement;
  private $additionalProductQuantity: HTMLElement;
  private admin: Admin;
  private snackbar: Snackbar;

  constructor(snackbar: Snackbar) {
    this.$addProductForm = $('#add-product-form');
    this.$productContainer = $('#product-list');
    this.$additionalProductName = $('#product-name-input');
    this.$additionalProductPrice = $('#product-price-input');
    this.$additionalProductQuantity = $('#product-quantity-input');
    this.admin = AdminImpl.getInstance();
    this.snackbar = snackbar;
  }

  render(): void {
    if (!this.admin.isLogin()) {
      history.back();
      return;
    }

    const template = this.admin.vendingMachine.products
      .map(
        ({ name, price, quantity }: Product) =>
          `<tr class="product-info">
          <td class="product-info__text name">${name}</td>
          <td class="product-info__text price">${price}</td>
          <td class="product-info__text quantity">${quantity}</td>
          <td class="product-info__input"><input type="text" min="1" max="10" class="product-info-name" value="${name}" /></td>
          <td class="product-info__input"><input type="number" step="10" min="100" max="10000" class="product-info-price" value="${price}" /></td>
          <td class="product-info__input"><input type="number" min="1" max="20" class="product-info-quantity" value="${quantity}" /></td>
          <td>
            <button class="modify-button gray-button button">수정</button>
            <button class="delete-button gray-button button">삭제</button>
            <button class="confirm-button gray-button button">확인</button>
          </td>
        </tr>`,
      )
      .join('');
    this.$productContainer.replaceChildren();
    this.$productContainer.insertAdjacentHTML('beforeend', template);
    this.$additionalProductName.focus();
  }

  bindEvent(): void {
    this.$addProductForm.addEventListener('submit', this.handleSubmitForm.bind(this));
    this.$productContainer.addEventListener('click', this.handleClickButtons.bind(this));
  }

  private handleSubmitForm(e: Event): void {
    e.preventDefault();

    try {
      const newProduct: Product =  { 
        name: (this.$additionalProductName as HTMLInputElement).value, 
        price: Number((this.$additionalProductPrice as HTMLInputElement).value),  
        quantity: Number((this.$additionalProductQuantity as HTMLInputElement).value),
      };

      this.admin.addProduct(newProduct);
      this.render();
    } catch ({ message }) {
      this.snackbar.on(message);
    }
  }

  private handleClickButtons(e: Event): void {
    const target = e.target as HTMLElement;

    if (target.classList.contains('modify-button')) target.closest('tr').classList.add('modify');
    else if (target.classList.contains('delete-button') && confirm(CONFIRM_DELETE_PRODUCT_MESSAGE)) this.deleteProduct(target.closest('tr'));
    else if (target.classList.contains('confirm-button')) this.modifyProduct(target.closest('tr'));
  }

  private deleteProduct(productRow: HTMLElement): void {
    try {
      const productName = ($('.product-info-name', productRow) as HTMLInputElement).value as unknown as ProductName;
      this.admin.deleteProduct(productName);
      this.render();
    } catch ({ message }) {
      this.snackbar.on(message);
    }
  }

  private modifyProduct(productRow: HTMLElement): void {
    try {
      const newProduct: Product = {
        name: ($('.product-info-name', productRow) as HTMLInputElement).value, 
        price: Number(($('.product-info-price', productRow) as HTMLInputElement).value),  
        quantity: Number(($('.product-info-quantity', productRow) as HTMLInputElement).value),
      };
      const originProductName = $('.product-info__text.name', productRow).innerText as unknown as ProductName;

      this.admin.modifyProduct(newProduct, originProductName);
      this.render();
    } catch ({ message }) {
      this.snackbar.on(message);
    }
  }
} 
