import { CoinsType, ItemType } from '../types/types';
import CoinManager from './coinManager';
import ItemManager from './itemManager';
import {
  checkDuplicatedItem,
  checkItemExist,
  checkPurchaseAvailable,
  validateAddItemInput,
  validateChargeCoins,
  validateInputMoney,
} from '../validates/validates';
import MoneyManager from './moneyManager';
import { ProductAPI } from '../api/productAPI';

export default class VendingMachine {
  private itemManager = new ItemManager();
  private coinManager = new CoinManager();
  private moneyManager = new MoneyManager();

  get items() {
    return this.itemManager.items;
  }

  get coins() {
    return this.coinManager.coins;
  }

  get coinsSum() {
    return this.coinManager.coinsSum;
  }

  get InitialCoins() {
    return this.coinManager.initialCoins;
  }

  get money() {
    return this.moneyManager.money;
  }

  addItem(item: ItemType) {
    const { items } = this.itemManager;

    validateAddItemInput(item);
    checkDuplicatedItem(items, item, null);

    ProductAPI.addProduct(item);
    this.itemManager.addItem(item);
  }

  changeItem(index: number, item: ItemType) {
    const { items } = this.itemManager;
    const { id } = this.itemManager.getItemWithName(item.name);
    const changedItem = { ...item, id };

    validateAddItemInput(item);
    checkDuplicatedItem(items, item, index);

    ProductAPI.updateProduct(changedItem);
    this.itemManager.changeItem(index, item);
  }

  deleteItem(targetItem: ItemType) {
    const item = this.itemManager.getItemWithName(targetItem.name);

    ProductAPI.deleteProduct(item);
    this.itemManager.deleteItem(targetItem);
  }

  chargeCoins(inputMoney: number) {
    validateChargeCoins(inputMoney);

    this.coinManager.chargeCoins(inputMoney);
    ProductAPI.updateMoney(this.coinManager.coinsSum);
  }

  chargeMoney(inputMoney: number) {
    validateInputMoney(inputMoney);

    this.moneyManager.chargeMoney(inputMoney);
  }

  purchaseItem(name: string, price: number) {
    checkItemExist(this.itemManager.getItemWithName(name).quantity);
    checkPurchaseAvailable(this.moneyManager.money, price);

    this.itemManager.purchaseItem(name);
    this.moneyManager.deductMoney(price);

    const { quantity, id } = this.itemManager.getItemWithName(name);
    ProductAPI.updateProduct({ quantity, id });

    return this.itemManager.getItemWithName(name).quantity;
  }

  returnChangeCoins() {
    const { money } = this.moneyManager;
    const coins = this.coinManager.exchangeCoins(money) as CoinsType;
    this.moneyManager.deductMoney(this.coinManager.getSumCoins(coins));
    const restMoney = this.moneyManager.money;

    ProductAPI.updateMoney(this.coinManager.coinsSum);

    return { coins, restMoney };
  }

  async updateResponseItems() {
    const products = (await ProductAPI.getProducts()) as ItemType[];
    this.itemManager.setItems(products);
  }

  async updateResponsCoins() {
    const money = (await ProductAPI.getMoney()) as number;
    this.coinManager.setCoins(money);
  }
}
