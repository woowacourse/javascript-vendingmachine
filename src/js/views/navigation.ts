import { $, $$ } from '../utils/common';

const navigation = {
  $navContainer: $('.nav-container'),
  $navButton: $$('.nav-button'),
  $itemManage: $('#상품관리'),
  $moneyCharge: $('#잔돈충전'),
  $itemPurchase: $('#상품구매'),

  // Event
  bindEvents(callback) {
    this.$navContainer.addEventListener('click', event => {
      callback(event);
    });
  },

  bindPostStateEvent(callback) {
    window.addEventListener('popstate', callback);
  },
};

export default navigation;
