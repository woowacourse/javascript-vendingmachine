import MoneyType from '../type/MoneyType';

export default class Money implements MoneyType {
  value: number;
  count: number;

  constructor(value: number, count: number) {
    this.value = value;
    this.count = count;
  }
}
