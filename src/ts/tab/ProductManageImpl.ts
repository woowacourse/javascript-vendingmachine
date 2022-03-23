import { $ } from '../util/dom';
import { Product } from '../resource/declaration';
import ProductManage from './declaration';
import vendingMachineResource from '../resource/vendingMachineResource';
import { template } from '@babel/core';

class ProductManageImpl implements ProductManage {
  addEvent() {
    $('#add-product-form').addEventListener('submit', this.handleAddProduct.bind(this));
    $('#product-list').addEventListener('click', this.handleClickButtons.bind(this));
  }

  handleAddProduct(e) {
    e.preventDefault();

    const name = $('#product-name-input').value; 
    const price = Number($('#product-price-input').value); 
    const quantity = Number($('#product-quantity-input').value); 

    if (this.isValidProductInfo(name, price, quantity)) {
      this.addProduct(name, price, quantity);
      this.drawProductList();
    }
  }

  handleClickButtons(e) {
    console.log(e.target);
    if (e.target.classList.contains('modify-button')) {

    }
    if (e.target.classList.contains('delete-button') && confirm('정말 삭제하시겠습니까?')) {
      console.log(e.target.closest('tr').children[0].innerText);
      this.deleteProduct(e.target.closest('tr').children[0].innerText);
      this.drawProductList();
    }
    if (e.target.classList.contains('confirm-button')) {

    }
  }
  
  isValidProductInfo(name: string, price: number, quantity: number): boolean {
    if (name.length < 1 || name.length > 10) {
      return false;
    }
    if (vendingMachineResource.products.some((product: Product) => product.name === name)) {
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

  drawProductList() {
    const template = vendingMachineResource
      .products
      .map(
        ({ name, price, quantity }: Product) => 
        `<tr class="product-info">
          <td class="product-info__text">${name}</td>
          <td class="product-info__text">${price}</td>
          <td class="product-info__text">${quantity}</td>
          <td class="product-info__input"><input type="text" value="${name}" /></td>
          <td class="product-info__input"><input type="text" value="${price}" /></td>
          <td class="product-info__input"><input type="text" value="${quantity}" /></td>
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

  addProduct(name: string, price: number, quantity: number): void {
    
    if (this.isValidProductInfo(name, price, quantity)) {
      vendingMachineResource.products.push({ name, price, quantity });
    }
  }

  modifyProduct(name: string, price: number, quantity: number): void {
    if (this.isValidProductInfo(name, price, quantity)) {
      vendingMachineResource.products[this.getProductIndex(name)] = { name, price, quantity };
    }
  }
  
  deleteProduct(name: string): void {
    vendingMachineResource.products.splice(this.getProductIndex(name), 1);
  }

  getProductIndex(name: string) {
    return vendingMachineResource.products.findIndex((product: Product) => product.name === name);
  }
}

export default ProductManageImpl;
