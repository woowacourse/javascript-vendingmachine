import { $ } from '../utils/dom';
import { Product } from '../declarations/resourceDeclaration';
import { ProductManage } from '../declarations/coreDeclaration';
import { renderProductList } from '../views/render';
import {
  getProductInfo,
  getProductInfoModify,
  getProductRowIndex,
  getProductIndex,
  resetProductInfo,
} from '../utils/productUtil';
import VerifyValueValidation from '../validations/verifyValueValidation';

class ProductManagemManage implements ProductManage {
  private products: Array<Product>;
  verifyValue: VerifyValueValidation;

  constructor(products: Array<Product>, verifyValue: VerifyValueValidation) {
    this.products = products;
    this.verifyValue = verifyValue;
    window.addEventListener('load', () => {
      $('#tab__manage-button').addEventListener('click', renderProductList.bind(this, document));
      $('#add-product-form').addEventListener('submit', this.handleAddProduct.bind(this));
      $('#product-list').addEventListener('click', this.handleClickButtons.bind(this));
    });
  }

  handleAddProduct(e) {
    e.preventDefault();
    const productInfo = getProductInfo.call(this);
    if (this.verifyValue.verifyProductInfo(productInfo, -1)) {
      resetProductInfo();
      this.addProduct(productInfo);
      renderProductList.call(this);
    }
  }

  handleClickButtons(e) {
    const productTr = e.target.closest('tr');
    if (e.target.classList.contains('modify-button')) {
      productTr.classList.add('modify');
    }

    if (e.target.classList.contains('delete-button') && confirm('정말 삭제하시겠습니까?')) {
      this.deleteProduct(productTr.children[0].innerText);
      renderProductList.call(this);
    }

    if (e.target.classList.contains('confirm-button')) {
      const productInfo = getProductInfoModify.call(this, productTr);
      const index = getProductRowIndex.call(this, productTr);

      if (this.verifyValue.verifyProductInfo(productInfo, index)) {
        this.modifyProduct(productInfo, index);
        renderProductList.call(this);
      }
    }
  }

  addProduct(productInfo: Product): void {
    this.products.push(productInfo);
  }

  modifyProduct(productInfo: Product, index: number): void {
    this.products[index] = productInfo;
  }

  deleteProduct(name: string): void {
    this.products.splice(getProductIndex.call(this, name), 1);
  }
}

export default ProductManagemManage;
