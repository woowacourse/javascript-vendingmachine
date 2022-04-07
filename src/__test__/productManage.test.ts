import ProductManager from "../ts/manager/ProductManager";
import { ERROR_MESSAGES, PRODUCT } from "../ts/utils/constants";

describe("상품 관리 테스트", () => {
  const productManager = new ProductManager();

  test("상품명을 입력하지 않으면, 상품을 추가할 수 없다.", () => {
    const newProduct = { name: "", price: 100, quantity: 1 };

    expect(() => productManager.addProduct(newProduct)).toThrowError(ERROR_MESSAGES.EMPTY_PRODUCT_NAME);
  });

  test(`상품명이 ${PRODUCT.MAX_LENGTH}글자를 초과하면, 상품을 추가할 수 없다.`, () => {
    const newProduct = { name: "사과딸기바나나포도메론", price: 100, quantity: 1 };

    expect(() => productManager.addProduct(newProduct)).toThrowError(ERROR_MESSAGES.EXCEED_PRODUCT_LENGTH);
  });

  test(`상품금액이 ${PRODUCT.MIN_PRICE}원보다 작으면, 상품을 추가할 수 없다.`, () => {
    const newProduct = { name: "사과", price: 9, quantity: 1 };

    expect(() => productManager.addProduct(newProduct)).toThrowError(ERROR_MESSAGES.INVALID_PRODUCT_PRICE_RANGE);
  });

  test(`상품금액이 ${PRODUCT.MAX_PRICE}원을 초과하면, 상품을 추가할 수 없다.`, () => {
    const newProduct = { name: "사과", price: 10010, quantity: 1 };

    expect(() => productManager.addProduct(newProduct)).toThrowError(ERROR_MESSAGES.INVALID_PRODUCT_PRICE_RANGE);
  });

  test(`상품금액이 ${PRODUCT.UNIT}원 단위가 아니면, 상품을 추가할 수 없다.`, () => {
    const newProduct = { name: "사과", price: 111, quantity: 1 };

    expect(() => productManager.addProduct(newProduct)).toThrowError(ERROR_MESSAGES.INVALID_PRODUCT_PRICE_UNIT);
  });

  test(`상품개수가 ${PRODUCT.MIN_QUANTITY}개보다 작으면, 상품을 추가할 수 없다.`, () => {
    const newProduct = { name: "사과", price: 100, quantity: 0 };

    expect(() => productManager.addProduct(newProduct)).toThrowError(ERROR_MESSAGES.INVALID_PRODUCT_QUANTITY_RANGE);
  });

  test(`상품개수가 ${PRODUCT.MAX_QUANTITY}개를 초과하면, 상품을 추가할 수 없다.`, () => {
    const newProduct = { name: "사과", price: 100, quantity: 21 };

    expect(() => productManager.addProduct(newProduct)).toThrowError(ERROR_MESSAGES.INVALID_PRODUCT_QUANTITY_RANGE);
  });

  test("상품개수가 소수점이면, 상품을 추가할 수 없다.", () => {
    const newProduct = { name: "사과", price: 100, quantity: 1.1 };

    expect(() => productManager.addProduct(newProduct)).toThrowError(ERROR_MESSAGES.INVALID_PRODUCT_QUANTITY_UNIT);
  });

  test("상품명,가격,수량을 올바르게 입력하면 상품을 추가할 수 있다.", () => {
    const newProduct = { name: "사과", price: 100, quantity: 1 };
    productManager.addProduct(newProduct);
    const productsCount = productManager.getProducts().length;

    expect(productsCount).toBe(1);
  });
});
