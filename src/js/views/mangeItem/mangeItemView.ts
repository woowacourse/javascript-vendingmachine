import { $ } from '../../utils/common';
import { manageItemTemplate } from './template';

export default class ManageItemView {
  $content: HTMLElement;
  constructor() {
    this.$content = $('#content');
  }

  render(items) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', manageItemTemplate(items));
  }

  bindEvents() {
    // 추가
    // 수정,가제
  }
}
