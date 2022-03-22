import { ItemInfo } from '../Item';
import ItemService from '../ItemService';

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
});
