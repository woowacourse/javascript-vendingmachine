import { $ } from './dom';
import { Product } from '../declarations/resourceDeclaration';

export const getProductInfo = function () {
  const name = $('#product-name-input').value;
  const price = Number($('#product-price-input').value);
  const quantity = Number($('#product-quantity-input').value);

  return { name, price, quantity };
};

export const getProductInfoModify = function (productNode) {
  const name = $('.product-info-name', productNode).value;
  const price = Number($('.product-info-price', productNode).value);
  const quantity = Number($('.product-info-quantity', productNode).value);

  return { name, price, quantity };
};

export const getProductRowIndex = function (productRow) {
  return [...$('#product-list').childNodes].findIndex(row => row === productRow);
};

export const getProductIndex = function (name: string) {
  return this.products.findIndex((product: Product) => product.name === name);
};

export const generateRandomCoins = function (inputMoney: number) {
  const coins: Array<number> = this.coins.map(({ amount }) => amount);
  const coinList = [0, 0, 0, 0];

  while (inputMoney > 0) {
    const pickLength = coins.filter(coin => inputMoney >= coin);
    const coinIndex = Math.floor(Math.random() * pickLength.length);

    coinList[coinIndex] += 1;
    inputMoney -= coins[coinIndex];
  }

  return coinList;
};
