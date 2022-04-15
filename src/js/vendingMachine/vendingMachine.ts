import { COINS } from '../constants/constants';
import { generateRandom } from '../utils/common';
import { ItemType, CoinsType } from '../types';
import { validateReturnChange } from '../validates/validates';

export default class VendingMachine {
  private items: ItemType[] = [];
  private coins: CoinsType = { fiveHundred: 0, hundred: 0, fifty: 0, ten: 0 };
  private change: CoinsType = { fiveHundred: 0, hundred: 0, fifty: 0, ten: 0 };
  private currentOwnMoney = 0;
  private purchaseInputMoney = 0;

  getItems(): Array<ItemType> {
    return JSON.parse(JSON.stringify(this.items));
  }

  setItems(newItems: ItemType[]) {
    this.items = newItems;
  }

  getCoins(): CoinsType {
    return { ...this.coins };
  }

  setCoins(newCoins: CoinsType) {
    this.coins = newCoins;
  }

  getCurrentOwnMoney(): number {
    return this.currentOwnMoney;
  }

  setCurrentOwnMoney(currentOwnMoney: number) {
    this.currentOwnMoney = currentOwnMoney;
  }

  getPurchaseInputMoney(): number {
    return this.purchaseInputMoney;
  }

  setPurchaseInputMoney(purchaseInputMoney: number) {
    this.purchaseInputMoney = purchaseInputMoney;
  }

  getChange() {
    return { ...this.change };
  }

  setChange(change) {
    this.change = change;
  }

  getTotalMoney(coins: CoinsType): number {
    let totalMoney = 0;
    Object.keys(coins).forEach(coinKey => {
      totalMoney += coins[coinKey] * COINS[coinKey];
    });
    return totalMoney;
  }

  addItem({ name, price, quantity }: ItemType) {
    const newItems = [...this.items, { name, price, quantity }];
    this.setItems(newItems);
  }

  deleteItem(targetItem: ItemType) {
    const newItems = this.getItems().filter(item => item.name !== targetItem.name);
    this.setItems(newItems);
  }

  changeItem(index: number, { name, price, quantity }: ItemType) {
    const newItems = this.getItems();
    newItems[index] = { name, price, quantity };
    this.setItems(newItems);
  }

  generateRandomCoins(money: number): CoinsType {
    const newCoins = this.getCoins();
    let restMoney = money;

    Object.keys(newCoins).forEach(key => {
      if (key === 'ten') {
        newCoins[key] += restMoney / COINS[key];
        return;
      }
      const randomNumber = generateRandom(Math.floor(restMoney / COINS[key]));
      restMoney -= randomNumber * COINS[key];
      newCoins[key] += randomNumber;
    });
    return newCoins;
  }

  chargeOwnMoney(money: number) {
    const newCoins = this.generateRandomCoins(money);
    const newMoney = this.getCurrentOwnMoney() + money;
    this.setCoins(newCoins);
    this.setCurrentOwnMoney(newMoney);
  }

  chargePurchaseInputMoney(inputMoney: number) {
    const newMoney = this.getPurchaseInputMoney() + inputMoney;
    this.setPurchaseInputMoney(newMoney);
  }

  giveChange() {
    let purchaseMoney = this.getPurchaseInputMoney();
    let ownMoney = this.getCurrentOwnMoney();
    const coins = this.getCoins();
    const change = this.getChange();

    validateReturnChange(purchaseMoney, ownMoney);

    Object.keys(coins).forEach(key => {
      let coinCount = Math.floor(purchaseMoney / COINS[key]);
      if (coins[key] < coinCount) {
        coinCount = coins[key];
      }
      if (ownMoney >= coinCount * COINS[key]) {
        coins[key] -= coinCount;
        change[key] = coinCount;
        purchaseMoney -= coinCount * COINS[key];
        ownMoney -= coinCount * COINS[key];
      }
    });
    this.setCoins(coins);
    this.setPurchaseInputMoney(purchaseMoney);
    this.setChange(change);
    this.setCurrentOwnMoney(ownMoney);
  }

  buyItem(itemName) {
    const items = this.getItems();
    const newItems = items.map(item => {
      if (item.name === itemName) {
        const newMoney = this.getPurchaseInputMoney() - item.price;
        if (item.quantity === 0) {
          throw new Error('구매할 수 있는 상품의 수량이 남아있지 않습니다.');
        }
        if (newMoney < 0) {
          throw new Error('투입된 금액이 부족합니다.');
        }
        item.quantity -= 1;
        this.setPurchaseInputMoney(newMoney);
        this.chargeOwnMoney(item.price);

        return item;
      }
      return item;
    });
    this.setItems(newItems);
  }
}
