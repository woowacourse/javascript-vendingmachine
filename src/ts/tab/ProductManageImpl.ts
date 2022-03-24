import { $ } from '../util/dom';
import { Product } from '../resource/declaration';
import { ProductManage } from './declaration';

class ProductManageImpl implements ProductManage {
  private products: Array<Product>;

  constructor(products: Array<Product>) {
    this.products = products;
    $('#add-product-form').addEventListener('submit', this.handleAddProduct.bind(this));
    $('#product-list').addEventListener('click', this.handleClickButtons.bind(this));
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
    if (this.isValidProductInfo(productInfo)) {
      this.addProduct(productInfo);
      this.drawProductList();
    }
  }

  handleClickButtons(e) {
    if (e.target.classList.contains('modify-button')) {
      e.target.closest('tr').classList.add('modify');
    }
    if (e.target.classList.contains('delete-button') && confirm('정말 삭제하시겠습니까?')) {
      this.deleteProduct(e.target.closest('tr').children[0].innerText);
      this.drawProductList();
    }
    if (e.target.classList.contains('confirm-button')) {
      const productInfo = this.getProductInfoModify(e.target.closest('tr'));

      this.modifyProduct(productInfo);
      if (this.isValidModifyProductInfo(productInfo)) {
        this.products[this.getProductIndex(productInfo)] = productInfo;
        this.drawProductList();
      }
    }
  }

  isValidModifyProductInfo({ name, price, quantity }: Product): boolean {
    if (name.length < 1 || name.length > 10) {
      return false;
    }
    if (price < 100 || price > 10000 || price % 10 !== 0) {
      return false;
    }
    if (quantity < 0 || quantity > 20) {
      return false;
    }
    
    return true;
  }
  
  isValidProductInfo(productInfo: Product): boolean {
    if (!this.isValidModifyProductInfo(productInfo)) {
      return false;
    }
    if (this.products.some((product: Product) => product.name === productInfo.name)) {
      return false;
    }
 
    return true;
  }

  drawProductList() {
    const template = this
      .products
      .map(
        ({ name, price, quantity }: Product) => 
        `<tr class="product-info">
          <td class="product-info__text">${name}</td>
          <td class="product-info__text">${price}</td>
          <td class="product-info__text">${quantity}</td>
          <td class="product-info__input"><input type="text" class="product-info-name" value="${name}" /></td>
          <td class="product-info__input"><input type="text" class="product-info-price" value="${price}" /></td>
          <td class="product-info__input"><input type="text" class="product-info-quantity" value="${quantity}" /></td>
          <td>
            <button class="modify-button button">수정</button>
            <button class="delete-button button">삭제</button>
            <button class="confirm-button button">확인</button>
          </td>
        </tr>`)
        .join('');
    $('#product-list').replaceChildren();
    $('#product-list').insertAdjacentHTML('beforeend', template);
  }

  addProduct(productInfo: Product): void {
    this.products.push(productInfo);

  }

  modifyProduct(productInfo: Product): void {
    if (this.isValidProductInfo(productInfo)) {
      this.products[this.getProductIndex(productInfo)] = productInfo;
    }
  }
  
  deleteProduct(productInfo: Product): void {
    this.products.splice(this.getProductIndex(productInfo), 1);
  }

  getProductIndex({ name }: Product) {
    return this.products.findIndex((product: Product) => product.name === name);
  }
}

export default ProductManageImpl;
