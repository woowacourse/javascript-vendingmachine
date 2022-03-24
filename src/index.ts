import './css/index.css';
import VendingMachine from './ts/VendingMachine';
import ItemManageTab from './ts/ItemManageTab';
import CoinRechargeTab from './ts/CoinRechargeTab';

const vendingMachine = new VendingMachine();
new ItemManageTab(vendingMachine);
new CoinRechargeTab(vendingMachine);
