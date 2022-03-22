import VendingMachine from '../vendingMachine/vendingMachine.ts';

describe('자판기 테스트', () => {
  describe('상품 관리', () => {
    test('상품명, 가격, 수량을 입력해 상품을 추가할 수 있다.', () => {
      const vendingMachine = new VendingMachine();

      const name = '환타';
      const price = 1200;
      const quantity = 15;

      vendingMachine.addItem({ name, price, quantity });

      expect(vendingMachine.getItems()).toEqual([{ name, price, quantity }]);
    });

    test('상품명, 가격, 수량을 입력해 상품의 정보를 수정할 수 있다.', () => {
      const vendingMachine = new VendingMachine();
      const name = '환타';
      const price = 1200;
      const quantity = 15;

      vendingMachine.addItem({ name, price, quantity });

      const changedName = '닥터페퍼';
      const changedPrice = 1500;
      const changedQuantity = 20;
      const index = 0;

      vendingMachine.changeItem(index, {
        name: changedName,
        price: changedPrice,
        quantity: changedQuantity,
      });

      expect(vendingMachine.getItems()).toEqual([
        { name: changedName, price: changedPrice, quantity: changedQuantity },
      ]);
    });
  });

  describe('잔돈 충전', () => {
    test('최초 자판기가 가지고있는 각 동전의 개수는 0개이다.', () => {
      const vendingMachine = new VendingMachine();

      expect(vendingMachine.getCoins()).toEqual({ ten: 0, fifty: 0, hundred: 0, fiveHundred: 0 });
    });

    // 자판기 보유 금액을 충전할 수 있다.
    // charge money
    // 자판기 보유 금액만큼의 동전이 무작위로 생성된다.
    // random 함수 의존성에 생각

    // 자판기 보유 금액을 누적하여 충전할 수 있다. 추가 충전 금액만큼의 동전이 무작위로 생성되어 기존 동전들에 더해진다.
    // chare money 로 대체 가능한지 고민

    test('자판기 보유 금액을 충전할 수 있다.', () => {
      const vendingMachine = new VendingMachine();
      const validInputMoney = 610;

      expect(vendingMachine.generateRandomCoins(validInputMoney)).toEqual();
    });
  });
});
