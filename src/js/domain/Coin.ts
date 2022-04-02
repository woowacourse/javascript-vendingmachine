type CoinName = 'FIVE_HUNDRED_WON' | 'ONE_HUNDRED_WON' | 'FIFTY_WON' | 'TEN_WON';
type CoinValue = 500 | 100 | 50 | 10;

export default class Coin {
  #name: CoinName;
  #value: CoinValue;
  #count: number;

  constructor(name, value) {
    this.#name = name;
    this.#value = value;
    this.#count = 0;
  }

  get name() {
    return this.#name;
  }

  get value() {
    return this.#value;
  }

  get count() {
    return this.#count;
  }

  consumed(count: number) {
    this.#count -= count;
  }

  added(count: number) {
    this.#count += count;
  }
}
