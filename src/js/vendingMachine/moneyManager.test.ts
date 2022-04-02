import MoneyManager from './moneyManager';

describe('입력된 금액이 주어지면', () => {
  test('금액을 저장할 수 있다.', () => {
    const purchaseManger = new MoneyManager();
    const inputMoney = 10000;

    purchaseManger.chargeMoney(inputMoney);

    expect(purchaseManger.money).toEqual(inputMoney);
  });

  test('구입한 상품의 금액만큼 저장된 금액에서 차감할 수 있다.', () => {
    const purchaseManger = new MoneyManager();
    const inputMoney = 10000;
    const purchasedItemPrice = 1200;

    purchaseManger.chargeMoney(inputMoney);
    purchaseManger.deductMoney(purchasedItemPrice);

    expect(purchaseManger.money).toEqual(inputMoney - purchasedItemPrice);
  });
});
