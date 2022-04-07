import { getUser, login, signup } from '../../src/domains/Auth';
import { getCookie } from '../../src/utils';

describe('자판기를 이용할 수 있다.', () => {
  const newProduct = {
    name: '티거',
    price: 1000,
    quantity: 10,
  };

  const newUser = {
    email: `${Date.now()}@test.com`,
    name: '티거',
    password: 'tiger',
  };

  before(() => {
    cy.visit('http://localhost:9000');
  });

  it('로그아웃을 할 수 있어야 한다.', () => {
    cy.get('.user-button').click();
    cy.get('.logout-button').click();
  });

  it('고객은 고객용 화면을 볼 수 있어야 한다.', () => {
    cy.get('administrator-menu').should('not.be.visible');
    cy.get('.login-button').should('be.visible');
    cy.get('product-purchase-container').should('be.visible');
  });

  it('로그인 버튼을 클릭하면 로그인 화면을 볼 수 있어야 한다.', () => {
    cy.get('.login-button').click();

    cy.get('vending-machine').should('not.be.visible');
    cy.get('log-in').should('be.visible');
  });

  it('회원 가입 버튼을 클릭하면 회원 가입 화면을 볼 수 있어야 한다.', () => {
    cy.get('.signup-button').click();

    cy.get('log-in').should('not.be.visible');
    cy.get('sign-up').should('be.visible');
  });

  it('회원 가입을 할 수 있어야 한다.', () => {
    cy.get('#signup-email').type(newUser.email);
    cy.get('#signup-name').type(newUser.name);
    cy.get('#signup-password').type(newUser.password);
    cy.get('#signup-password-confirm').type(newUser.password);
    cy.get('.signup-confirm-button').click();

    signup(newUser.email, newUser.name, newUser.password);
  });

  it('로그인을 할 수 있어야 한다.', () => {
    cy.wait(5000);
    cy.visit('#!login');

    cy.get('log-in').should('be.visible');
    cy.get('#login-email').type(newUser.email);
    cy.get('#login-password').type(newUser.password);

    login(newUser.email, newUser.password);
  });

  it('관리자는 관리자용 화면을 볼 수 있어야 한다.', () => {
    cy.wait(5000);
    cy.visit('#!product-purchase');

    cy.get('vending-machine').should('be.visible');
    cy.get('administrator-menu').should('be.visible');
    cy.get('.user-button').should('be.visible');
    cy.get('product-purchase-container').should('be.visible');
  });

  it('상품을 추가하면 추가한 상품을 상품 현황에서 볼 수 있어야 한다.', () => {
    cy.get('.nav__product-manage-button').click();

    cy.get('.product-name-input').type(newProduct.name);
    cy.get('.product-price-input').type(newProduct.price);
    cy.get('.product-quantity-input').type(newProduct.quantity);
    cy.get('.product-add-button').click();

    cy.get(`[data-product-name="${newProduct.name}"]`).should('be.visible');
  });

  it('추가한 상품을 구매 가능 상품 현황에서 볼 수 있어야 한다.', () => {
    cy.get('.nav__product-purchase-button').click();

    cy.get(`[data-purchasable-product-name="${newProduct.name}"]`).should('be.visible');
  });

  it('상품을 구매할 금액을 투입할 수 있어야 한다.', () => {
    const customerMoney = 1000;

    cy.get('#customer-money-input').type(customerMoney);
    cy.get('.money-input-button').click();

    cy.get('.customer-money').should('have.text', customerMoney);
  });

  it('상품을 구매할 수 있어야 한다.', () => {
    cy.get('.table__product-purchase-button').click();

    cy.get('.purchasable-product-quantity-td').should('have.text', newProduct.quantity - 1);
  });

  it('회원 정보를 수정할 수 있어야 한다.', () => {
    cy.get('.user-button').click();
    cy.get('.user-info-modify-button').click();

    cy.get('user-info-modify').should('be.visible');
  });
});
