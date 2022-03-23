import { CoinList } from '../domains/Coin';
import { ItemInfo } from '../domains/Item';
import ItemService from '../domains/ItemService';
import CoinService from '../domains/CoinService';

describe('ItemService', () => {
  const initItems: Array<ItemInfo> = [];
  const itemService = new ItemService(initItems);

  beforeEach(() => {
    itemService.init(initItems);
  });

  describe('add', () => {
    const newItem = { name: '콜라', price: 1500, stockCount: 5 };

    describe('성공 시', () => {
      test('유효한 상품 정보가 상품 목록에 추가되어야 한다.', () => {
        itemService.add(newItem);

        expect(itemService.itemList.get('콜라')).toEqual({
          name: '콜라',
          price: 1500,
          stockCount: 5,
        });
      });
    });

    describe('실패 시', () => {
      test('stockCount > 20이면 Error를 throw한다.', () => {
        expect(() => {
          itemService.add({ name: '사이다', price: 1500, stockCount: 21 });
        }).toThrowError();
      });

      test('price를 10 단위가 아니면 Error를 throw한다.', () => {
        expect(() => {
          itemService.add({ name: '사이다', price: 101, stockCount: 1 });
        }).toThrowError();
      });

      test('name의 길이가 10자를 초과하면 Error를 throw한다.', () => {
        expect(() => {
          itemService.add({
            name: '사이다사이다사이다사이',
            price: 100,
            stockCount: 1,
          });
        }).toThrowError();
      });

      test('name이 공백으로 이루어지면 Error를 throw한다.', () => {
        expect(() => {
          itemService.add({
            name: ' ',
            price: 100,
            stockCount: 1,
          });
        }).toThrowError();
      });

      test('price가 100 미만이면 Error를 throw한다.', () => {
        expect(() => {
          itemService.add({
            name: '사이다',
            price: 90,
            stockCount: 1,
          });
        }).toThrowError();
      });

      test('price가 10000 초과이면 Error를 throw한다.', () => {
        expect(() => {
          itemService.add({
            name: '사이다',
            price: 10010,
            stockCount: 1,
          });
        }).toThrowError();
      });
    });
  });

  describe('update', () => {
    describe('성공 시', () => {
      test('상품명, 가격, 개수를 유효하게 입력해야한다.', () => {
        itemService.add({ name: '콜라', price: 1500, stockCount: 5 });
        itemService.update('콜라', {
          name: '사이다',
          price: 1500,
          stockCount: 10,
        });

        expect(itemService.itemList.get('콜라')).toEqual({
          name: '사이다',
          price: 1500,
          stockCount: 10,
        });
      });
    });
    describe('실패 시', () => {
      test('itemList에 포함되지 없는 값을 업데이트 할 때 Error를 throw한다.', () => {
        expect(() => {
          itemService.update('콜라', {
            name: '콜라',
            price: 1500,
            stockCount: 10,
          });
        }).toThrowError();
      });
      test('수정한 이름이 이미 존재할 때 Error를 throw한다.', () => {
        itemService.add({
          name: '콜라',
          price: 1000,
          stockCount: 1,
        });
        itemService.add({
          name: '사이다',
          price: 1000,
          stockCount: 1,
        });

        expect(() => {
          itemService.update('사이다', {
            name: '콜라',
            price: 1500,
            stockCount: 10,
          });
        }).toThrowError();
      });
    });
  });

  describe('delete', () => {
    describe('성공 시', () => {
      test('상품을 삭제할 수 있다', () => {
        itemService.add({ name: '콜라', price: 1500, stockCount: 5 });
        itemService.delete('콜라');
        expect(itemService.itemList.has('콜라')).toBeFalsy();
      });
    });

    describe('실패 시', () => {
      test('itemList에 존재하지 않는 상품명의 상품을 삭제할 시 Error를 throw한다.', () => {
        expect(() => {
          itemService.delete('콜라');
        }).toThrowError();
      });
    });
  });

  describe('find', () => {
    describe('성공 시', () => {
      test('name에 해당하는 상품을 반환해야 한다.', () => {
        itemService.add({ name: '콜라', price: 1500, stockCount: 5 });
        expect(itemService.find('콜라')).toEqual({
          name: '콜라',
          price: 1500,
          stockCount: 5,
        });
      });

      test('name에 해당하는 상품을 반환해야 한다.', () => {
        expect(itemService.find('사이다')).toBeNull();
      });
    });
  });
});

describe('CoinService', () => {
  const initCoins: CoinList = {
    10: 0,
    50: 0,
    100: 0,
    500: 0,
  };
  const coinService = new CoinService(initCoins);

  beforeEach(() => {
    coinService.init(initCoins);
  });

  describe('add', () => {
    describe('성공 시', () => {
      test('유효한 금액을 입력하면 동전이 추가된다.', () => {
        coinService.add(100000);

        expect(coinService.getTotalMoney()).toBe(100000);
      });
    });

    describe('실패 시', () => {
      test('주어진 금액이 10 ~ 100000 사이가 아니면 Error를 throw한다.', () => {
        expect(() => {
          coinService.add(0);
        }).toThrowError();

        expect(() => {
          coinService.add(100010);
        }).toThrowError();
      });

      test('주어진 금액이 10 단위가 아니면 Error를 throw한다.', () => {
        expect(() => {
          coinService.add(11);
        }).toThrowError();
      });

      test('보유 금액이 100000이 넘으면 Error를 throw한다.', () => {
        expect(() => {
          coinService.add(100000);
          coinService.add(10);
        }).toThrowError();
      });
    });
  });

  describe('getTotalMoney', () => {
    describe('성공 시', () => {
      test('총 보유 금액을 반환한다.', () => {
        expect(coinService.getTotalMoney()).toBe(0);

        coinService.add(10000);

        expect(coinService.getTotalMoney()).toBe(10000);

        coinService.add(90000);

        expect(coinService.getTotalMoney()).toBe(100000);
      });
    });
  });
});
