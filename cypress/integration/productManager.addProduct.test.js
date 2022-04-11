import { PRODUCT_PRICE, PRODUCT_QUANTITY } from '../../src/ts/constants';

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
    cy.addProduct(productName, productPrice, productQuantity).then(() => {
      cy.get(`[data-product-name="${productName}"] td`)
        .eq(0)
        .should('have.text', productName);
      cy.get(`[data-product-name="${productName}"] td`)
        .eq(1)
        .should('have.text', productPrice);
      cy.get(`[data-product-name="${productName}"] td`)
        .eq(2)
        .should('have.text', `${productQuantity}개`);
    });
  });

  it('중복된 상품명을 입력하면 에러 메세지가 보인다.', () => {
    const duplicatedProductName = '콜라';
    const productPrice = 1000;
    const productQuantity = 20;

    cy.wait(1500);
    cy.addProduct(duplicatedProductName, productPrice, productQuantity);
    cy.addProduct(duplicatedProductName, productPrice, productQuantity).then(
      () => {
        cy.get('.snack-bar-container .snack-bar-container__message').should(
          'have.text',
          '중복된 상품명을 입력하셨습니다. 중복되지 않는 상품명을 다시 입력해주세요.'
        );
      }
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
        cy.get('.snack-bar-container .snack-bar-container__message').should(
          'have.text',
          '중복된 상품명을 입력하셨습니다. 중복되지 않는 상품명을 다시 입력해주세요.'
        );
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
        cy.get('.snack-bar-container .snack-bar-container__message').should(
          'have.text',
          `상품 가격을 잘못 입력하셨습니다. 상품 가격은 ${PRODUCT_PRICE.MIN_PRICE}원 이상 ${PRODUCT_PRICE.MAX_PRICE}원 이하로 입력해주세요.`
        );
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
      cy.get('.snack-bar-container .snack-bar-container__message').should(
        'have.text',
        `상품 가격을 잘못 입력하셨습니다. 상품 가격은 ${PRODUCT_PRICE.MIN_PRICE}원 이상 ${PRODUCT_PRICE.MAX_PRICE}원 이하로 입력해주세요.`
      );
    });
  });

  it(`상품 가격이 ${PRODUCT_PRICE.UNIT}원 단위가 아니라면 에러 메세지가 보인다. `, () => {
    const productName = '콜라';
    const wrongUnitProductPrice = 105;
    const productQuantity = 20;

    cy.wait(1500);
    cy.addProduct(productName, wrongUnitProductPrice, productQuantity).then(
      () => {
        cy.get('.snack-bar-container .snack-bar-container__message').should(
          'have.text',
          `상품 가격을 잘못 입력하셨습니다. 상품 가격은 ${PRODUCT_PRICE.UNIT}원 단위로 작성해주세요.`
        );
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
      cy.get('.snack-bar-container .snack-bar-container__message').should(
        'have.text',
        `상품 수량을 잘못 입력하셨습니다. 상품 수량은 최소 ${PRODUCT_QUANTITY.MIN_QUANTITY}개 이상 최대 ${PRODUCT_QUANTITY.MAX_QUANTITY}개 이하로 작성해주세요.`
      );
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
      cy.get('.snack-bar-container .snack-bar-container__message').should(
        'have.text',
        `상품 수량을 잘못 입력하셨습니다. 상품 수량은 최소 ${PRODUCT_QUANTITY.MIN_QUANTITY}개 이상 최대 ${PRODUCT_QUANTITY.MAX_QUANTITY}개 이하로 작성해주세요.`
      );
    });
  });
});
