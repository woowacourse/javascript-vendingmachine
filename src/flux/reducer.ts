import { ACTION, COIN_UNITS } from '../constants';
import { Action, AppState, CoinRecord } from '../types';
import { convertArrToObj, deepCopy, shuffle } from '../utils';

function moneyToCoin(money: number) {
  const coins = convertArrToObj(COIN_UNITS, 0);
  let idx = 0;
  while (money > 0) {
    const mixedCoins = shuffle(COIN_UNITS);
    if (money < mixedCoins[idx]) {
      idx = (idx + 1) % COIN_UNITS.length;
      continue;
    }
    money -= mixedCoins[idx];
    coins[mixedCoins[idx]]++;
    idx = (idx + 1) % COIN_UNITS.length;
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
  if (type === ACTION.ADD_PRODUCT) {
    newState.productList = [...newState.productList, { ...payload, isEditing: false }];
  } else if (type === ACTION.CHANGE_EDIT_MODE) {
    const { name, isEditing } = payload;
    const index = newState.productList.findIndex((item) => item.name === name);
    newState.productList[index].isEditing = isEditing;
  } else if (type === ACTION.EDIT_PRODUCT) {
    const { originalName, name, price, quantity } = payload;
    const index = newState.productList.findIndex((item) => item.name === originalName);
    newState.productList[index] = { name, price, quantity, isEditing: false };
  } else if (type === ACTION.DELETE_PRODUCT) {
    newState.productList = newState.productList.filter((item) => item.name !== payload);
  } else if (type === ACTION.CHARGE_COINS) {
    newState.chargedCoins = mergeCoins(newState.chargedCoins, moneyToCoin(payload));
    newState.chargedMoney += payload;
  } else if (type === ACTION.CHANGE_ACTIVE_TAB) {
    newState.activeTab = payload;
  }
  return newState;
};

export default reducer;
