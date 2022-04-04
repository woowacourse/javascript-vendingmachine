import { $ } from '../util/dom';
import { Product } from '../resource/declaration';
import { ProductManage } from './declaration';
import { isValidProductInfo } from '../validation/isValidProductInfo';

class ProductManageImpl implements ProductManage {
  private products: Array<Product>;

  constructor(products: Array<Product>) {
    this.products = products;
    window.addEventListener('load', () => {
      $('#tab__manage-button').addEventListener(
        'click',
        this.drawProductList.bind(this),
      );
      $('#add-product-form').addEventListener(
        'submit',
        this.handleAddProduct.bind(this),
      );
      $('#product-list').addEventListener(
        'click',
        this.handleClickButtons.bind(this),
      );
    });
  }

  getProductInfo() {
    const name = $('#product-name-input').value;
    const price = Number($('#product-price-input').value);
    const quantity = Number($('#product-quantity-input').value);

    return { name, price, quantity };
  }

  getProductInfoModify(productNode) {
    const name = $('.product-info-name', productNode).value;
    const price = Number($('.product-info-price', productNode).value);
    const quantity = Number($('.product-info-quantity', productNode).value);

    return { name, price, quantity };
  }

  handleAddProduct(e) {
    e.preventDefault();
    const productInfo = this.getProductInfo();
    if (isValidProductInfo(productInfo, -1, this.products)) {
      this.addProduct(productInfo);
      this.drawProductList();
    }
  }

  getProductRowIndex(productRow) {
    return [...$('#product-list').childNodes].findIndex(
      row => row === productRow,
    );
  }

  handleClickButtons(e) {
    if (e.target.classList.contains('modify-button')) {
      e.target.closest('tr').classList.add('modify');
    }
    if (
      e.target.classList.contains('delete-button') &&
      confirm('정말 삭제하시겠습니까?')
    ) {
      this.deleteProduct(e.target.closest('tr').children[0].innerText);
      this.drawProductList();
    }
    if (e.target.classList.contains('confirm-button')) {
      const productInfo = this.getProductInfoModify(e.target.closest('tr'));
      const index = this.getProductRowIndex(e.target.closest('tr'));

      if (isValidProductInfo(productInfo, index, this.products)) {
        this.modifyProduct(productInfo, index);
        this.drawProductList();
      }
    }
  }

  drawProductList() {
    const template = this.products
      .map(
        ({ name, price, quantity }: Product) =>
          `<tr class="product-info">
          <td class="product-info__text">${name}</td>
          <td class="product-info__text">${price}</td>
          <td class="product-info__text">${quantity}</td>
          <td class="product-info__input"><input type="text" minlength="1" maxlength="10" required="required" class="product-info-name" value="${name}" /></td>
          <td class="product-info__input"><input type="number" max="10000" min="100" required="required" class="product-info-price" value="${price}" /></td>
          <td class="product-info__input"><input type="number" max="20" min="1" required="required" class="product-info-quantity" value="${quantity}" /></td>
          <td>
            <button class="modify-button button">수정</button>
            <button class="delete-button button">삭제</button>
            <button class="confirm-button button">확인</button>
          </td>
        </tr>`,
      )
      .join('');
    $('#product-list').replaceChildren();
    $('#product-list').insertAdjacentHTML('beforeend', template);
  }

  addProduct(productInfo: Product): void {
    this.products.push(productInfo);
  }

  modifyProduct(productInfo: Product, index: number): void {
    this.products[index] = productInfo;
  }

  deleteProduct(name: string): void {
    this.products.splice(this.getProductIndex(name), 1);
  }

  getProductIndex(name: string) {
    return this.products.findIndex((product: Product) => product.name === name);
  }
}

export default ProductManageImpl;
