import { $ } from '../utils/common';
import { itemMangeTemplate } from './template/templates';

export default class ItemManageView {
  $content: HTMLElement;
  constructor() {
    this.$content = $('#content');
  }

  render(item) {
    const dummyItem = [
      { name: 'ㅎㅇ', price: 100, quantity: 100 },
      { name: 'ㅎㅇ', price: 100, quantity: 100 },
    ];
    this.$content.innerHTML = itemMangeTemplate.pageTemplate(dummyItem);
  }

  bindEvents() {
    // 추가
    // 수정,가제
  }
}
