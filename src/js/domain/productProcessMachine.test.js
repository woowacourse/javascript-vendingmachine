import { ProductProcessMachine } from "./ProductProcessMachine";
import { ERROR_MESSAGE, VENDING_MACHINE_NUMBER } from "../constant";

describe("상품 관리하는 도메인 테스트", () => {
  test("상품명, 가격, 수량을 입력해 상품을 추가할 수 있다.", () => {
    localStorage.clear();
    const productProcessMachine = new ProductProcessMachine();

    productProcessMachine.add({ name: "호프", price: 110, count: 2 });
    productProcessMachine.add({ name: "스밍", price: 9990, count: 1 });

    expect(productProcessMachine.getProducts()).toStrictEqual([
      { name: "호프", price: 110, count: 2 },
      { name: "스밍", price: 9990, count: 1 },
    ]);
  });

  test(`상품명은 최대 ${VENDING_MACHINE_NUMBER.MAXIMUM_NAME_LENGTH}글자이상일 경우 에러를 던진다`, () => {
    localStorage.clear();
    const productProcessMachine = new ProductProcessMachine();

    expect(() => {
      productProcessMachine.add({
        name: "스밍스밍스밍스밍스밍스밍",
        price: 100,
        count: 1,
      });
    }).toThrowError(ERROR_MESSAGE.MAXIMUM_NAME_LENGTH);
  });

  test("상품명이 중복되면 에러를 던진다", () => {
    localStorage.clear();
    const productProcessMachine = new ProductProcessMachine();

    expect(() => {
      productProcessMachine.add({ name: "호프", price: 110, count: 2 });
      productProcessMachine.add({ name: "호프", price: 110, count: 2 });
    }).toThrowError(ERROR_MESSAGE.DUPLICATED_NAME);
  });

  test(`상품가격이 ${VENDING_MACHINE_NUMBER.MINIMUM_PRICE}원미만이라면 에러를 던진다.`, () => {
    localStorage.clear();
    const productProcessMachine = new ProductProcessMachine();

    expect(() => {
      productProcessMachine.add({
        name: "호프",
        price: 90,
        count: 1,
      });
    }).toThrowError(ERROR_MESSAGE.VALID_PRICE);
  });

  test(`상품가격이 ${VENDING_MACHINE_NUMBER.MAXIMUM_PRICE}원초과라면 에러를 던진다.`, () => {
    const productProcessMachine = new ProductProcessMachine();
    localStorage.clear();

    expect(() => {
      productProcessMachine.add({
        name: "스밍",
        price: 10010,
        count: 1,
      });
    }).toThrowError(ERROR_MESSAGE.VALID_PRICE);
  });

  test(`상품가격이 ${VENDING_MACHINE_NUMBER.MINIMUM_COIN}으로 나눠떨어지지 않으면 에러를 던진다.`, () => {
    localStorage.clear();
    const productProcessMachine = new ProductProcessMachine();

    expect(() => {
      productProcessMachine.add({
        name: "스밍",
        price: 9999,
        count: 1,
      });
    }).toThrowError(ERROR_MESSAGE.VALID_PRICE);
  });

  test(`한 제품의 수량이 ${VENDING_MACHINE_NUMBER.MAXIMUM_COUNT}개 이상일 경우 에러를 던진다.`, () => {
    localStorage.clear();
    const productProcessMachine = new ProductProcessMachine();

    expect(() => {
      productProcessMachine.add({
        name: "호오프",
        price: 2000,
        count: 0,
      });
    }).toThrowError(ERROR_MESSAGE.MINIMUM_COUNT);
    expect(() => {
      productProcessMachine.add({
        name: "호오프",
        price: 2000,
        count: 21,
      });
    }).toThrowError(ERROR_MESSAGE.MAXIMUM_COUNT);
  });

  test("제품의 정보를 수정 할 수 있다.", () => {
    localStorage.clear();
    const productProcessMachine = new ProductProcessMachine();

    productProcessMachine.add({ name: "호프", price: 110, count: 2 });
    productProcessMachine.add({ name: "스밍", price: 9990, count: 1 });

    productProcessMachine.update(0, "밝아진 호프", 5000, 4);
    expect(productProcessMachine.getProducts()[0]).toStrictEqual({
      name: "밝아진 호프",
      price: 5000,
      count: 4,
    });
  });

  test("제품을 삭제할수 있다.", () => {
    localStorage.clear();
    const productProcessMachine = new ProductProcessMachine();

    productProcessMachine.add({ name: "호프", price: 110, count: 2 });
    productProcessMachine.add({ name: "스밍", price: 9990, count: 1 });

    productProcessMachine.delete(0);
    expect(productProcessMachine.getProducts()).toStrictEqual([
      { name: "스밍", price: 9990, count: 1 },
    ]);
  });
});
