import './css/index.css';
import VendingMachine from './ts/VendingMachine';
import ItemManageTab from './ts/ItemManageTab';
import CoinRechargeTab from './ts/CoinRechargeTab';

const initApp = function () {
  const vendingMachine = new VendingMachine();
  const itemManageTab = new ItemManageTab(vendingMachine);
  const coinRechargeTab = new CoinRechargeTab(vendingMachine);

  return function () {
    if (!location.hash || location.hash === '#item-manage') {
      itemManageTab.render();
      return;
    }
    if (location.hash === '#coin-recharge') {
      coinRechargeTab.render();
      return;
    }
    if (location.hash === '#item-purchase') {
      return;
    }
  };
};

const checkRoute = initApp();

addEventListener('DOMContentLoaded', () => {
  checkRoute();
});

addEventListener('popstate', () => {
  checkRoute();
});
