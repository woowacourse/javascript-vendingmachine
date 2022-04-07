import { testid } from '../support/utils';

describe('상품 관리를 한다', () => {
  const email = `${Date.now()}@gmail.com`;
  const password = 'Thoumas138!';

  before(() => {
    // 회원가입을 한다
    cy.visit('http://localhost:9000/register');
    cy.get(testid`email-input`).type(`${email}`);
    cy.get(testid`name-input`).type('윤병인');
    cy.get(testid`password-input`).type(`${password}`);
    cy.get(testid`repassword-input`).type(`${password}`);
    cy.get(testid`register-btn`).click();

    cy.wait(5000);
  });

  beforeEach(() => {
    // 로그인을 한다
    cy.visit('http://localhost:9000/login');
    cy.get(testid`email-input`).type(`${email}`);
    cy.get(testid`password-input`).type(`${password}`);
    cy.get(testid`login-btn`).click();
  });

  it('상품을 추가한다', () => {
    cy.get(testid`product-manage-link`).click();
    cy.get(testid`product-name-input`).type('콜라');
    cy.get(testid`product-name-price`).type('1000');
    cy.get(testid`product-name-quantity`).type('10');
    cy.get(testid`add-product-btn`).click();

    cy.get(`product-inventory tr td:first-of-type`).contains('콜라');
  });

  it('잔돈을 충전한다', () => {
    cy.get(testid`charge-money-link`).click();

    cy.get(testid`charge-money-input`).type('3000');
    cy.get(testid`charge-money-btn`).click();

    cy.get(testid`current-charged-money`).contains('3,000');
  });

  it('상품을 구매한다', () => {
    // 상품을 먼저 추가한다
    cy.get(testid`product-manage-link`).click();
    cy.get(testid`product-name-input`).type('콜라');
    cy.get(testid`product-name-price`).type('1000');
    cy.get(testid`product-name-quantity`).type('10');
    cy.get(testid`add-product-btn`).click();

    // 이제 상품을 구매한다
    cy.get(testid`purchase-product-link`).click();

    cy.get(testid`insert-money-input`).type('3000');
    cy.get(testid`insert-money-btn`).click();

    cy.get(testid`purchase-btn`).click();

    cy.get(testid`inserted-money`).contains('2,000');
  });
});
