import VendingMachine from '../model/VendingMachine'



describe('자판기 기본 기능 테스트', () => {
  const vendingMachine = new VendingMachine();

    it('자판기에 상품을 추가할 수 있어야 한다.', () => {
      const product = {
        name: "코카콜라",
        price: 1000,
        amount: 5,
      }

      vendingMachine.addProduct(product);
      expect(vendingMachine.products.includes(product));
    });

    it('자판기에 같은 이름의 상품은 추가할 수 없어야 한다.', () => {
      const product = {
        name: "코카콜라",
        price: 1000,
        amount: 5,
      }

      expect(() => vendingMachine.addProduct(product)).toThrowError('이미 존재하는 이름의 상품입니다.');
    });
})



