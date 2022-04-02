import { ACTION, COIN } from '../constants';
import { Action, AppState, CoinRecord } from '../types';
import { coinToMoney, convertArrToObj, deepCopy, shuffle } from '../utils';

function moneyToCoin(money: number) {
  const coins = convertArrToObj(COIN.UNITS, 0);
  let idx = 0;
  while (money > 0) {
    const mixedCoins = shuffle(COIN.UNITS);
    if (money < mixedCoins[idx]) {
      idx = (idx + 1) % COIN.UNITS.length;
      continue;
    }
    money -= mixedCoins[idx];
    coins[mixedCoins[idx]]++;
    idx = (idx + 1) % COIN.UNITS.length;
  }
  return coins;
}

function mergeCoins(coins: CoinRecord, newCoins: CoinRecord) {
  for (const unit in coins) {
    coins[unit] += newCoins[unit];
  }
  return coins;
}

const reducer = (state: AppState, { type, payload }: Action) => {
  const newState = deepCopy(state) as AppState;
  switch (type) {
    case ACTION.ADD_PRODUCT: {
      newState.productList = [...newState.productList, { ...payload, isEditing: false }];
      break;
    }
    case ACTION.CHANGE_EDIT_MODE: {
      const { name, isEditing } = payload;
      const index = newState.productList.findIndex((item) => item.name === name);
      newState.productList[index].isEditing = isEditing;
      break;
    }
    case ACTION.EDIT_PRODUCT: {
      const { originalName, name, price, quantity } = payload;
      const index = newState.productList.findIndex((item) => item.name === originalName);
      newState.productList[index] = { name, price, quantity, isEditing: false };
      break;
    }
    case ACTION.DELETE_PRODUCT: {
      newState.productList = newState.productList.filter((item) => item.name !== payload);
      break;
    }
    case ACTION.DELETE_PRODUCT: {
      newState.productList = newState.productList.filter((item) => item.name !== payload);
      break;
    }
    case ACTION.CHARGE_COINS: {
      newState.chargedCoins = mergeCoins(newState.chargedCoins, moneyToCoin(payload));
      newState.chargedMoney += payload;
      break;
    }
    case ACTION.CHANGE_ACTIVE_TAB: {
      newState.activeTab = payload;
      break;
    }
    case ACTION.INSERT_MONEY: {
      newState.insertedMoney += payload;
      break;
    }
    case ACTION.PURCHASE_PRODUCT: {
      const { name } = payload;
      const productIdx = newState.productList.findIndex((item) => item.name === name);
      const { price } = newState.productList[productIdx];
      newState.productList[productIdx].quantity -= 1;
      newState.insertedMoney -= price;
      newState.productList = newState.productList.filter((item) => item.quantity > 0);
      break;
    }
    case ACTION.RELEASE_COIN: {
      let { insertedMoney } = newState;
      const chargedCoins = { ...newState.chargedCoins };
      const units = [...COIN.UNITS].sort((a, b) => b - a);
      const changes: CoinRecord = units.reduce((acc, unit) => {
        if (insertedMoney === 0) return acc;
        const quotient = Math.floor(insertedMoney / unit);
        const min = Math.min(quotient, chargedCoins[unit]);
        insertedMoney -= min * unit;
        chargedCoins[unit] -= min;
        acc[unit] = min;
        return acc;
      }, convertArrToObj(COIN.UNITS, 0));
      newState.chargedMoney = coinToMoney(chargedCoins);
      newState.chargedCoins = chargedCoins;
      newState.changes = changes;
      newState.insertedMoney = insertedMoney;
    }
  }
  return newState;
};

export default reducer;
