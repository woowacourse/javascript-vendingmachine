import {
  ERROR_MESSAGE,
  PRODUCT_PRICE,
  PRODUCT_QUANTITY,
} from '../../src/ts/constants';

describe('상품 추가 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.login();
  });

  it('상품명, 가격, 수량을 입력하고 확인 버튼을 누르면 입력한 상품이 등록된다.', () => {
    const productName = '콜라';
    const productPrice = 1000;
    const productQuantity = 20;

    cy.wait(1500);
    cy.addProduct(productName, productPrice, productQuantity);

    cy.checkProductInfo(
      productName,
      productName,
      productPrice,
      productQuantity
    );
  });

  it('중복된 상품명을 입력하면 에러 메세지가 보인다.', () => {
    const duplicatedProductName = '콜라';
    const productPrice = 1000;
    const productQuantity = 20;

    cy.wait(1500);
    cy.addProduct(duplicatedProductName, productPrice, productQuantity);
    cy.addProduct(duplicatedProductName, productPrice, productQuantity).then(
      () => {
        cy.checkErrorMessage(ERROR_MESSAGE.DUPLICATED_PRODUCT_NAME);
      }
    );
  });

  it(`상품 가격이 ${PRODUCT_PRICE.MAX_PRICE} 초과면 에러 메세지가 보인다. `, () => {
    const productName = '콜라';
    const overMaxPriceProductPrice = 10010;
    const productQuantity = 20;

    cy.wait(1500);
    cy.addProduct(productName, overMaxPriceProductPrice, productQuantity).then(
      () => {
        cy.checkErrorMessage(ERROR_MESSAGE.WRONG_RANGE_PRODUCT_PRICE);
      }
    );
  });

  it(`상품 가격이 ${PRODUCT_PRICE.MIN_PRICE} 미만이면 에러 메세지가 보인다. `, () => {
    const productName = '콜라';
    const underMintPriceProductPrice = 90;
    const productQuantity = 20;

    cy.wait(1500);
    cy.addProduct(
      productName,
      underMintPriceProductPrice,
      productQuantity
    ).then(() => {
      cy.checkErrorMessage(ERROR_MESSAGE.WRONG_RANGE_PRODUCT_PRICE);
    });
  });

  it(`상품 가격이 ${PRODUCT_PRICE.UNIT}원 단위가 아니라면 에러 메세지가 보인다. `, () => {
    const productName = '콜라';
    const wrongUnitProductPrice = 105;
    const productQuantity = 20;

    cy.wait(1500);
    cy.addProduct(productName, wrongUnitProductPrice, productQuantity).then(
      () => {
        cy.checkErrorMessage(ERROR_MESSAGE.WRONG_UNIT_PRODUCT_PRICE);
      }
    );
  });

  it(`상품 수량이 ${PRODUCT_QUANTITY.MAX_QUANTITY} 초과면 에러 메세지가 보인다. `, () => {
    const productName = '콜라';
    const productPrice = 1000;
    const overMaxQuantityProductQuantity = 21;

    cy.wait(1500);
    cy.addProduct(
      productName,
      productPrice,
      overMaxQuantityProductQuantity
    ).then(() => {
      cy.checkErrorMessage(ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY);
    });
  });

  it(`상품 수량이 ${PRODUCT_QUANTITY.MIN_QUANTITY} 미만면 에러 메세지가 보인다. `, () => {
    const productName = '콜라';
    const productPrice = 1000;
    const underMinQuantityProductQuantity = 0;

    cy.wait(1500);
    cy.addProduct(
      productName,
      productPrice,
      underMinQuantityProductQuantity
    ).then(() => {
      cy.checkErrorMessage(ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY);
    });
  });
});
