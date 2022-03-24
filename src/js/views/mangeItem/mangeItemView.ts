import { $ } from '../../utils/common';
import { mangeItemTemplate } from '../template/templates';

export default class ManageItemView {
  $content: HTMLElement;
  constructor() {
    this.$content = $('#content');
  }

  render(items) {
    this.$content.innerHTML = mangeItemTemplate(items);
  }

  bindEvents() {
    // 추가
    // 수정,가제
  }
}
