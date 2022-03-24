import { $ } from '../utils/common';
import { itemMangeTemplate, itemPurchaseTemplate } from './template/templates';

export default class ItemManageView {
  $content: HTMLElement;
  constructor() {
    this.$content = $('#content');
  }

  render(item) {
    // const dummyItem = [
    //   { name: 'ㅎㅇ', price: 100, quantity: 100 },
    //   { name: 'ㅎㅇ', price: 100, quantity: 100 },
    // ];
    // this.$content.innerHTML = itemMangeTemplate(dummyItem);
    const dummyCoin = { fiveHundred: 5, hundred: 4, fifty: 3, ten: 2 };

    this.$content.innerHTML = itemPurchaseTemplate(dummyCoin, 5000);
  }

  bindEvents() {
    // 추가
    // 수정,가제
  }
}
