import { ERROR_MESSAGE } from '../../src/constants';

describe('상품을 관리 한다 - 실패케이스', () => {
  const email = `${Date.now()}@gmail.com`;
  const name = '윤병인';
  const password = 'Abcde123!';
  const _product = {
    name: '콜라',
    price: 1000,
    quantity: 10,
  };

  before(() => {
    cy.register(email, name, password);
    cy.login(email, password);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.removeProducts();
  });

  it('상품명이 빈 경우', () => {
    const product = { ..._product, name: '' };
    cy.addProduct(product);
    cy.checkToastErrorMessage(ERROR_MESSAGE.EMPTY_PRODUCT_NAME);
  });

  it('상품명이 너무 긴 경우', () => {
    const product = { ..._product, name: '가나다라마바사123456' };
    cy.addProduct(product);
    cy.checkToastErrorMessage(ERROR_MESSAGE.OVER_MAX_LENGTH_PRODUCT_NAME);
  });

  it('상품명이 중복된 경우', () => {
    cy.addProduct(_product);
    cy.addProduct(_product);
    cy.checkToastErrorMessage(ERROR_MESSAGE.DUPLICATE_PRDUCT_NAME);
  });

  it('상품가격이 빈 경우', () => {
    const product = { ..._product, name: '환타', price: '' };
    cy.addProduct(product);
    cy.checkToastErrorMessage(ERROR_MESSAGE.EMPTY_PRODUCT_PRICE);
  });

  it('상품수량이 빈 경우', () => {
    const product = { ..._product, name: '밀키스', quantity: '' };
    cy.addProduct(product);
    cy.checkToastErrorMessage(ERROR_MESSAGE.EMPTY_PRODUCT_QUANTITY);
  });

  // 상품 수정

  it('상품 수정 - 상품명이 빈 경우', () => {
    cy.addProduct(_product);
    cy.findProduct(_product.name);
    cy.get('@productIndex').then((index) => {
      cy.editProduct(index, true, { ..._product, name: '' });
      cy.checkToastErrorMessage(ERROR_MESSAGE.EMPTY_PRODUCT_NAME);
    });
  });

  it('상품 수정 - 상품명이 너무 긴 경우', () => {
    cy.addProduct(_product);
    cy.findProduct(_product.name);
    cy.get('@productIndex').then((index) => {
      cy.editProduct(index, true, { ..._product, name: '가나다라마바사123456' });
      cy.checkToastErrorMessage(ERROR_MESSAGE.OVER_MAX_LENGTH_PRODUCT_NAME);
    });
  });

  it('상품 수정 - 상품명이 중복된 경우', () => {
    cy.addProduct(_product);
    const newProduct = { ..._product, name: '사이다' };
    cy.addProduct(newProduct);
    cy.findProduct(_product.name);
    cy.get('@productIndex').then((index) => {
      cy.editProduct(index, true, newProduct);
      cy.checkToastErrorMessage(ERROR_MESSAGE.DUPLICATE_PRDUCT_NAME);
    });
  });

  it('상품 수정 - 상품가격이 빈 경우', () => {
    cy.addProduct(_product);
    cy.findProduct(_product.name);
    cy.get('@productIndex').then((index) => {
      cy.editProduct(index, true, { ..._product, price: '' });
      cy.checkToastErrorMessage(ERROR_MESSAGE.EMPTY_PRODUCT_PRICE);
    });
  });

  it('상품 수정 - 상품수량이 빈 경우', () => {
    cy.addProduct(_product);
    cy.findProduct(_product.name);
    cy.get('@productIndex').then((index) => {
      cy.editProduct(index, true, { ..._product, quantity: '' });
      cy.checkToastErrorMessage(ERROR_MESSAGE.EMPTY_PRODUCT_QUANTITY);
    });
  });
});
