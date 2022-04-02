import MoneyType from '../type/MoneyType';

export default class Money implements MoneyType {
  private _value: number;
  private _count: number;

  constructor(value: number, count: number) {
    this._value = value;
    this._count = count;
  }

  public get value() {
    return this._value;
  }

  public get count() {
    return this._count;
  }

  public deductCount(refundableCount: number) {
    this._count = this._count - refundableCount;
  }

  public increaseCount() {
    this._count += 1;
  }
}
