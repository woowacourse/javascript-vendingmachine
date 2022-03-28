import MoneyType from '../type/MoneyType';

export default class Money implements MoneyType {
  private _value: number;
  private _count: number;

  constructor(value: number, count: number) {
    this._value = value;
    this._count = count;
  }

  get value() {
    return this._value;
  }

  get count() {
    return this._count;
  }

  increaseCount() {
    this._count += 1;
  }
}
