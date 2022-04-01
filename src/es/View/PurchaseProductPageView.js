import { $ } from '../utils';

export default class PurchaseProductPageView {
  loadPage = () => {
    $('main').innerHTML = '<h3>상품을 구입해요!</h3>';
  };
}
