import MoneyType from '../type/MoneyType';

export interface MoneyInterface extends MoneyType {
  getValue(): number;
  getCount(): number;
  decreaseCount(share: number): number;
}

export default class Money implements MoneyInterface {
  value: number;
  count: number;

  constructor(value: number, count: number) {
    this.value = value;
    this.count = count;
  }

  getValue = () => this.value;

  getCount = () => this.count;

  decreaseCount = (share: number) => {
    let decreasedCount = 0;

    for (let i = 0; i < share; i += 1) {
      if (this.count > 0) {
        this.count -= 1;
        decreasedCount += 1;
      }
    }
    return decreasedCount;
  };
}
