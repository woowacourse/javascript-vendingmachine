import {
  PRODUCT_PRICE,
  PRODUCT_QUANTITY,
  ERROR_MESSAGE,
} from '../../src/ts/constants';

describe('상품 수정 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.login();
  });

  it('추가된 상품 정보를 수정할 수 있다.', () => {
    const productName = '콜라';
    const productPrice = 1000;
    const productQuantity = 20;

    const editProductName = '사이다';
    const editProductPrice = 1100;
    const editProductQuantity = 15;

    cy.wait(1500);
    cy.addProduct(productName, productPrice, productQuantity);

    cy.editProduct(
      productName,
      editProductName,
      editProductPrice,
      editProductQuantity
    );
    cy.checkProductInfo(
      editProductName,
      editProductName,
      editProductPrice,
      editProductQuantity
    );
  });

  it('중복된 상품명으로 수정할 시 에러 메세지를 보여준다.', () => {
    const productName = '콜라';
    const productPrice = 1000;
    const productQuantity = 20;

    const duplicatedEditProductName = '사이다';
    const editProductPrice = 1100;
    const editProductQuantity = 15;

    cy.wait(1500);

    cy.addProduct(productName, productPrice, productQuantity);
    cy.addProduct(duplicatedEditProductName, productPrice, productQuantity);

    cy.editProduct(
      productName,
      duplicatedEditProductName,
      editProductPrice,
      editProductQuantity
    ).then(() => {
      cy.checkErrorMessage(ERROR_MESSAGE.DUPLICATED_PRODUCT_NAME);
    });
  });

  it(`${PRODUCT_PRICE.MAX_PRICE}을 초과한 상품 가격으로 수정 시 에러 메세지를 보여준다.`, () => {
    const productName = '콜라';
    const productPrice = 1000;
    const overMaxPriceProductPrice = 10010;
    const productQuantity = 20;

    cy.wait(1500);

    cy.addProduct(productName, productPrice, productQuantity);

    cy.editProduct(
      productName,
      productName,
      overMaxPriceProductPrice,
      productQuantity
    ).then(() => {
      cy.checkErrorMessage(ERROR_MESSAGE.WRONG_RANGE_PRODUCT_PRICE);
    });
  });

  it(`${PRODUCT_PRICE.MIN_PRICE} 미만으로 상품 가격을 수정 시 에러 메세지를 보여준다.`, () => {
    const productName = '콜라';
    const productPrice = 1000;
    const underMinPriceProductPrice = 90;
    const productQuantity = 20;

    cy.wait(1500);

    cy.addProduct(productName, productPrice, productQuantity);

    cy.editProduct(
      productName,
      productName,
      underMinPriceProductPrice,
      productQuantity
    ).then(() => {
      cy.checkErrorMessage(ERROR_MESSAGE.WRONG_RANGE_PRODUCT_PRICE);
    });
  });

  it(`수정한 상품 가격이 ${PRODUCT_PRICE.UNIT}원 단위가 아니라면 에러 메세지가 보인다. `, () => {
    const productName = '콜라';
    const productPrice = 1000;
    const wrongUnitProductPrice = 105;
    const productQuantity = 20;

    cy.wait(1500);
    cy.addProduct(productName, productPrice, productQuantity);

    cy.editProduct(
      productName,
      productName,
      wrongUnitProductPrice,
      productQuantity
    ).then(() => {
      cy.checkErrorMessage(ERROR_MESSAGE.WRONG_UNIT_PRODUCT_PRICE);
    });
  });

  it(`${PRODUCT_QUANTITY.MAX_QUANTITY} 초과로 상품 수량을 수정 시 에러 메세지를 보여준다.`, () => {
    const productName = '콜라';
    const productPrice = 1000;
    const productQuantity = 20;
    const overMaxQuantityProductQuantity = 21;

    cy.wait(1500);
    cy.addProduct(productName, productPrice, productQuantity);

    cy.editProduct(
      productName,
      productName,
      productPrice,
      overMaxQuantityProductQuantity
    ).then(() => {
      cy.checkErrorMessage(ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY);
    });
  });

  it(`${PRODUCT_QUANTITY.MIN_QUANTITY} 미만으로 상품 수량을 수정 시 에러 메세지를 보여준다.`, () => {
    const productName = '콜라';
    const productPrice = 1000;
    const productQuantity = 20;
    const underMinQuantityProductQuantity = 0;

    cy.wait(1500);
    cy.addProduct(productName, productPrice, productQuantity);

    cy.editProduct(
      productName,
      productName,
      productPrice,
      underMinQuantityProductQuantity
    ).then(() => {
      cy.checkErrorMessage(ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY);
    });
  });
});
