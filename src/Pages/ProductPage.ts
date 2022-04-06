import Header from 'Components/Header';
import Navigation from 'Components/Navigation';
import AddProduct from 'Components/AddProduct';
import ManageProductList from 'Components/ManageProductList';

import Page from './Abstract';

export default class ProductPage extends Page {
  title = '상품 관리';

  constructor() {
    super();

    this.createComponent(Header);
    this.createComponent(Navigation);
    this.createComponent(AddProduct);
    this.createComponent(ManageProductList);
  }
}
