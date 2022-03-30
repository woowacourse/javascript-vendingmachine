import VendingMachine from '../domains/VendingMachine';
import { COIN } from '../configs/constants';

let vendingMachine;

describe('vendingMachine', () => {
  beforeEach(() => {
    vendingMachine = new VendingMachine([], COIN.EMPTY_COINS);
  });

  describe('addItem', () => {
    describe('성공 시', () => {
      const newItem = { name: '콜라', price: 1500, quantity: 5 };

      test('유효한 상품 정보가 상품 목록에 추가되어야 한다.', () => {
        vendingMachine.addItem(newItem);

        const items = vendingMachine.useStore((state) => state.items);

        expect(items).toEqual([
          {
            name: '콜라',
            price: 1500,
            quantity: 5,
          },
        ]);
      });
    });

    describe('실패 시', () => {
      test('quantity > 20이면 Error를 throw한다.', () => {
        expect(() => {
          vendingMachine.addItem({ name: '사이다', price: 1500, quantity: 20 });
          vendingMachine.addItem({ name: '사이다', price: 1500, quantity: 1 });
        }).toThrowError();
      });

      test('price를 10 단위가 아니면 Error를 throw한다.', () => {
        expect(() => {
          vendingMachine.addItem({ name: '사이다', price: 101, quantity: 1 });
        }).toThrowError();
      });

      test('name의 길이가 10자를 초과하면 Error를 throw한다.', () => {
        expect(() => {
          vendingMachine.addItem({
            name: '사이다사이다사이다사이',
            price: 100,
            quantity: 1,
          });
        }).toThrowError();
      });

      test('name이 공백으로 이루어지면 Error를 throw한다.', () => {
        expect(() => {
          vendingMachine.addItem({
            name: ' ',
            price: 100,
            quantity: 1,
          });
        }).toThrowError();
      });

      test('price가 100 미만이면 Error를 throw한다.', () => {
        expect(() => {
          vendingMachine.addItem({
            name: '사이다',
            price: 90,
            quantity: 1,
          });
        }).toThrowError();
      });

      test('price가 10000 초과이면 Error를 throw한다.', () => {
        expect(() => {
          vendingMachine.addItem({
            name: '사이다',
            price: 10010,
            quantity: 1,
          });
        }).toThrowError();
      });
    });
  });

  describe('updateItem', () => {
    describe('성공 시', () => {
      test('상품명, 가격, 개수를 유효하게 입력해야한다.', () => {
        vendingMachine.addItem({ name: '콜라', price: 1500, quantity: 5 });
        vendingMachine.updateItem('콜라', {
          name: '사이다',
          price: 1500,
          quantity: 10,
        });

        const items = vendingMachine.useStore((state) => state.items);

        expect(items).toEqual([
          {
            name: '사이다',
            price: 1500,
            quantity: 10,
          },
        ]);
      });
    });
    describe('실패 시', () => {
      test('itemList에 포함되지 없는 값을 업데이트 할 때 Error를 throw한다.', () => {
        expect(() => {
          vendingMachine.updateItem('콜라', {
            name: '콜라',
            price: 1500,
            quantity: 10,
          });
        }).toThrowError();
      });
      test('수정한 이름이 이미 존재할 때 Error를 throw한다.', () => {
        vendingMachine.addItem({
          name: '콜라',
          price: 1000,
          quantity: 1,
        });
        vendingMachine.addItem({
          name: '사이다',
          price: 1000,
          quantity: 1,
        });

        expect(() => {
          vendingMachine.updateItem('사이다', {
            name: '콜라',
            price: 1500,
            quantity: 10,
          });
        }).toThrowError();
      });
    });
  });

  describe('remove', () => {
    describe('성공 시', () => {
      test('상품을 삭제할 수 있다', () => {
        vendingMachine.addItem({ name: '콜라', price: 1500, quantity: 5 });
        vendingMachine.removeItem('콜라');

        const items = vendingMachine.useStore((state) => state.items);

        expect(items).toEqual([]);
      });
    });

    describe('실패 시', () => {
      test('itemList에 존재하지 않는 상품명의 상품을 삭제할 시 Error를 throw한다.', () => {
        expect(() => {
          vendingMachine.removeItem('콜라');
        }).toThrowError();
      });
    });
  });

  describe('findItem', () => {
    describe('성공 시', () => {
      test('name에 해당하는 상품을 반환해야 한다.', () => {
        vendingMachine.addItem({ name: '콜라', price: 1500, quantity: 5 });
        expect(vendingMachine.findItem('콜라')).toEqual({
          name: '콜라',
          price: 1500,
          quantity: 5,
        });
      });

      test('name에 해당하는 상품을 반환해야 한다.', () => {
        expect(vendingMachine.findItem('사이다')).toBeNull();
      });
    });
  });
});

describe('vendingMachine', () => {
  beforeEach(() => {
    vendingMachine = new VendingMachine([], COIN.EMPTY_COINS);
  });

  describe('addCoin', () => {
    describe('성공 시', () => {
      test('유효한 금액을 입력하면 동전이 추가된다.', () => {
        vendingMachine.addCoin(100000);

        expect(vendingMachine.getTotalMoney()).toBe(100000);
      });
    });

    describe('실패 시', () => {
      test('주어진 금액이 10 ~ 100000 사이가 아니면 Error를 throw한다.', () => {
        expect(() => {
          vendingMachine.addCoin(0);
        }).toThrowError();

        expect(() => {
          vendingMachine.addCoin(100010);
        }).toThrowError();
      });

      test('주어진 금액이 10 단위가 아니면 Error를 throw한다.', () => {
        expect(() => {
          vendingMachine.addCoin(11);
        }).toThrowError();
      });

      test('보유 금액이 100000이 넘으면 Error를 throw한다.', () => {
        expect(() => {
          vendingMachine.addCoin(100000);
          vendingMachine.addCoin(10);
        }).toThrowError();
      });
    });
  });

  describe('getTotalMoney', () => {
    describe('성공 시', () => {
      test('총 보유 금액을 반환한다.', () => {
        expect(vendingMachine.getTotalMoney()).toBe(0);

        vendingMachine.addCoin(10000);

        expect(vendingMachine.getTotalMoney()).toBe(10000);

        vendingMachine.addCoin(90000);

        expect(vendingMachine.getTotalMoney()).toBe(100000);
      });
    });
  });
});
