import { $ } from '../utils/common';
import { itemMangeTemplate } from './template/templates';

export default class ItemManageView {
  $content: HTMLElement;
  constructor() {
    this.$content = $('#content');
  }

  render(items) {
    this.$content.innerHTML = itemMangeTemplate(items);
  }

  bindEvents() {
    // 추가
    // 수정,가제
  }
}
