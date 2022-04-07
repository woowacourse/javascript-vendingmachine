/* eslint-disable no-undef */
describe('자판기 관리 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000');
    cy.login();
  });

  it('상품 관리 탭 선택시 해당 탭으로 이동할 수 있다.', () => {
    cy.get('#manage-menu').click();
    cy.get('#product-add-form').should('be.visible');
  });

  it('상품 관리 테이블에 새로운 상품을 추가할 수 있다.', () => {
    cy.get('#manage-menu').click();
    cy.get('#product-name-input').type('콜라');
    cy.get('#product-price-input').type(1000);
    cy.get('#product-quantity-input').type(10);
    cy.get('.hover-button').click();

    cy.get('#product-tbody').contains('콜라').should('be.visible');
  });

  it('잔돈 충전 탭 선택시 해당 탭으로 이동할 수 있다.', () => {
    cy.get('#charge-menu').click();
    cy.get('#charge-form').should('be.visible');
  });

  it('자판기 보유 금액을 투입하면 충전된 금액이 보여진다.', () => {
    const amount = 1000;
    cy.get('#charge-menu').click();
    cy.get('#charge-amount-input').type(amount);
    cy.get('.hover-button').click();

    cy.get('.current-amount').should('have.text', `현재 보유 금액: ${amount}원`);
  });

  it('상품 구매 탭 선택시 해당 탭으로 이동할 수 있다.', () => {
    cy.get('#purchase-menu').click();
    cy.get('#purchase-form').should('be.visible');
  });

  it('구매할 금액을 투입하면 투입된 금액이 보여진다.', () => {
    const amount = 1000;
    cy.get('#purchase-menu').click();
    cy.get('#product-purchase-input').type(amount);
    cy.get('.hover-button').click();

    cy.get('.current-amount').should('have.text', `투입한 금액: ${amount}원`);
  });
});

describe('사용자 로그인 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000');
  });

  it('로그인이 안되면 자판기 관리 기능 버튼을 볼 수 없다.', () => {
    cy.get('#menu-category').should('not.be.visible');
  });

  it('로그인 버튼을 누르면 로그인 페이지를 보여준다.', () => {
    cy.get('.login').click();
    cy.get('#login-form').should('be.visible');
  });

  it('로그인을 하면 메인 페이지에서 썸네일 버튼을 보여준다.', () => {
    cy.login();
    cy.get('.thumbnail').should('be.visible');
  });

  it('로그인을 한 뒤, 회원 정보 수정 버튼을 누르면 해당 페이지를 보여준다.', () => {
    cy.login();
    cy.get('.thumbnail').click();
    cy.get('[name="edit"]').click();

    cy.get('#profile-form').should('be.visible');
  });

  it('로그인 페이지에서 회원가입 링크를 누르면 해당 페이지를 보여준다.', () => {
    cy.get('.login').click();
    cy.get('#sign-up').click();

    cy.get('#sign-up-form').should('be.visible');
  });
});
