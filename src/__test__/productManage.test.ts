import ProductManager from "../ts/mananger/ProductManager";
import { PRODUCT } from "../ts/utils/constants";

describe("상품 관리 테스트", () => {
  test(`상품명이 ${PRODUCT.MAX_LENGTH}글자를 초과하면, 상품을 추가할 수 없다.`, () => {
    const productManager = new ProductManager();
    const newProduct = { name: "사과딸기바나나포도메론", price: 100, quantity: 1 };

    expect(() => productManager.addProduct(newProduct)).toThrowError("상품명은 최대 10글자까지 입력 가능합니다.");
  });

  test(`상품금액이 ${PRODUCT.MIN_PRICE}원보다 작으면, 상품을 추가할 수 없다.`, () => {
    const productManager = new ProductManager();
    const newProduct = { name: "사과", price: 9, quantity: 1 };

    expect(() => productManager.addProduct(newProduct)).toThrowError(
      "상품 가격은 100원부터, 최대 10000원까지 가능합니다.",
    );
  });

  test(`상품금액이 ${PRODUCT.MAX_PRICE}원을 초과하면, 상품을 추가할 수 없다.`, () => {
    const productManager = new ProductManager();
    const newProduct = { name: "사과", price: 10010, quantity: 1 };

    expect(() => productManager.addProduct(newProduct)).toThrowError(
      "상품 가격은 100원부터, 최대 10000원까지 가능합니다.",
    );
  });

  test(`상품금액이 ${PRODUCT.UNIT}원 단위가 아니면, 상품을 추가할 수 없다.`, () => {
    const productManager = new ProductManager();
    const newProduct = { name: "사과", price: 111, quantity: 1 };

    expect(() => productManager.addProduct(newProduct)).toThrowError("상품 가격은 10원으로 나누어 떨어져야합니다.");
  });

  test(`상품개수가 ${PRODUCT.MIN_QUANTITY}개보다 작으면, 상품을 추가할 수 없다.`, () => {
    const productManager = new ProductManager();
    const newProduct = { name: "사과", price: 100, quantity: 0 };

    expect(() => productManager.addProduct(newProduct)).toThrowError(
      "제품당 수량은 최소 20개부터 최대 1개까지 가능합니다.",
    );
  });

  test(`상품개수가 ${PRODUCT.MAX_QUANTITY}개를 초과하면, 상품을 추가할 수 없다.`, () => {
    const productManager = new ProductManager();
    const newProduct = { name: "사과", price: 100, quantity: 21 };

    expect(() => productManager.addProduct(newProduct)).toThrowError(
      "제품당 수량은 최소 20개부터 최대 1개까지 가능합니다.",
    );
  });
});
