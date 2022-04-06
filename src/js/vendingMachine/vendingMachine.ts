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
import ProductAPI from '../api/productAPI';

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

  chargeCoins(inputMoney: number) {
    validateChargeCoins(inputMoney);

    this.coinManager.chargeCoins(inputMoney);
    ProductAPI.updateMoney(this.coinManager.coinsSum);
  }

  chargeMoney(inputMoney: number) {
    validateInputMoney(inputMoney);

    this.moneyManager.chargeMoney(inputMoney);
  }

  async addItem(item: ItemType) {
    const { items } = this.itemManager;

    validateAddItemInput(item);
    checkDuplicatedItem(items, item, null);

    const product = await ProductAPI.addProduct(item);
    this.itemManager.addItem(product);
  }

  async changeItem(index: number, item: ItemType) {
    const { items } = this.itemManager;

    validateAddItemInput(item);
    checkDuplicatedItem(items, item, index);

    const targetItem = this.itemManager.items[index];
    const changedItem = { ...item, id: targetItem.id };

    const product = await ProductAPI.updateProduct(changedItem);
    this.itemManager.changeItem(index, product);
  }

  async deleteItem(targetItem: ItemType) {
    const item = this.itemManager.getItemWithName(targetItem.name);

    await ProductAPI.deleteProduct(item);
    this.itemManager.deleteItem(targetItem);
  }

  async purchaseItem(name: string, price: number) {
    checkItemExist(this.itemManager.getItemWithName(name).quantity);
    checkPurchaseAvailable(this.moneyManager.money, price);

    this.itemManager.purchaseItem(name);
    this.moneyManager.deductMoney(price);

    const { quantity, id } = this.itemManager.getItemWithName(name);
    await ProductAPI.updateProduct({ quantity, id });

    return quantity;
  }

  async returnChangeCoins() {
    const { money } = this.moneyManager;
    const coins = this.coinManager.exchangeCoins(money) as CoinsType;
    this.moneyManager.deductMoney(this.coinManager.getSumCoins(coins));
    const restMoney = this.moneyManager.money;

    await ProductAPI.updateMoney(this.coinManager.coinsSum);

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
