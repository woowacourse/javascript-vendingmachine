import { ACTION, COIN_UNITS } from '../constatns/flux-constants';
import { Action, AppState, CoinRecord } from '../types';
import { convertArrToObj, convertToInteger, deepCopy, shuffle } from '../utils';

function exchangeMoneyToCoin(money: number) {
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
    case ACTION.CHARGE_COINS: {
      newState.chargedCoins = mergeCoins(newState.chargedCoins, exchangeMoneyToCoin(payload));
      newState.chargedMoney += payload;
      break;
    }
    case ACTION.INSERT_MONEY: {
      newState.insertedMoney += convertToInteger(payload);
      break;
    }
    case ACTION.RETURN_CHANGES: {
      let returnMoney = newState.insertedMoney;

      COIN_UNITS.forEach((coin) => {
        if (returnMoney < 0) return;
        const useCoinAmount = Math.min(Math.floor(returnMoney / coin), newState.chargedCoins[coin]);
        returnMoney -= useCoinAmount * coin;
        newState.chargedMoney -= useCoinAmount * coin;
        newState.chargedCoins[coin] -= useCoinAmount;
        newState.returnCoins[coin] = useCoinAmount;
      });

      newState.insertedMoney = returnMoney;
      break;
    }
    case ACTION.PURCHASE_PRODUCT: {
      const productIndex = state.productList.findIndex((product) => product.name === payload);
      newState.productList[productIndex].quantity--;
      newState.insertedMoney -= newState.productList[productIndex].price;

      if (newState.productList[productIndex].quantity === 0) {
        newState.productList.splice(productIndex, 1);
      }
      break;
    }
    case ACTION.LOGIN: {
      newState.login.isLogin = true;
      newState.login.email = payload.email;
      newState.login.name = payload.name;
      break;
    }
    case ACTION.LOGOUT: {
      newState.login.isLogin = false;
      newState.login.email = '';
      newState.login.name = '';
      break;
    }
  }
  return newState;
};

export default reducer;
