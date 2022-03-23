import { $ } from '../util/dom';
import { Product } from '../resource/declaration';
import ProductManage from './declaration';
import vendingMachineResource from '../resource/vendingMachineResource';

class ProductManageImpl implements ProductManage {
  addEvent() {
    console.log($('#add-product-form'));
    $('#add-product-form').addEventListener('submit', this.handleAddProduct.bind(this));
    $('#product-list').addEventListener('click', this.handleClickButtons.bind(this));
  }

  handleAddProduct(e) {
    e.preventDefault();
    if (e.target.classList.contains('.input-form__submit-button')) {
      const name = $('#product-name-input').value; 
      const price = Number($('#product-price-input').value); 
      const quantity = Number($('#product-quantity-input').value); 
      if (this.isValidProductInfo(name, price, quantity)) {
        this.addProduct(name, price, quantity);
      }
    }
  }

  handleClickButtons(e) {
    if (e.target.classList.contains('.modify-button')) {

    }
    if (e.target.classList.contains('.delete-button')) {
      this.deleteProduct(e.target.closest('tr').children[0].innerText);
    }
    if (e.target.classList.contains('.confirm-button')) {

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

  addProduct(name: string, price: number, quantity: number): void {
    if (this.isValidProductInfo(name, price, quantity)) {
      vendingMachineResource.products.push({ name, price, quantity });
    }
  }

  modifyProduct(name: string, price: number, quantity: number): void {
    if (this.isValidProductInfo(name, price, quantity)) {
      vendingMachineResource.products[this.index(name)] = { name, price, quantity };
    }
  }
  
  deleteProduct(name: string): void {
    vendingMachineResource.products.splice(this.index(name), 1);
  }

  index(name: string) {
    return vendingMachineResource.products.findIndex((product: Product) => product.name === name);
  }
}

export default ProductManageImpl;
