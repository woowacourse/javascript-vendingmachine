import AuthAPI from '../../src/js/api/authAPI';
import ProductAPI from '../../src/js/api/productAPI';
import { SELECTOR } from '../../src/js/constants/viewConstants';

describe('관리자 로그인, 회원 가입, 회원 정보 수정', () => {
  before(() => {
    cy.intercept('GET', ProductAPI.BASE_URL + ProductAPI.TYPES.PRODUCTS, {
      fixture: 'productListDataResponse.json',
    }).as('productListDataRequest');

    cy.intercept('GET', ProductAPI.BASE_URL + ProductAPI.TYPES.MONEY, {
      fixture: 'moneyDataResponse.json',
    }).as('moneyDataRequest');

    cy.intercept('POST', AuthAPI.BASE_URL + AuthAPI.TYPES.SIGN_IN, {
      fixture: 'userData.json',
    }).as('signInRequest');

    cy.intercept('POST', AuthAPI.BASE_URL + AuthAPI.TYPES.SIGN_UP, {
      fixture: 'userData.json',
    }).as('signUpRequest');

    cy.intercept('PATCH', AuthAPI.BASE_URL + AuthAPI.TYPES.USERS + '/**', {
      fixture: 'editedUserData.json',
    }).as('editUserDataRequest');

    cy.visit('http://localhost:9000');

    cy.get(SELECTOR.CLASS.CHARGE_MONEY_INPUT);
    cy.get(SELECTOR.ID.SIGN_BUTTON).click();
  });

  it('관리자로 회원 가입을 할 수 있다.', () => {
    cy.get(SELECTOR.ID.OFFER_SIGNUP_BUTTON).click();

    cy.get(SELECTOR.ID.EMAIL_INPUT).type('rkadndud06@naver.com');
    cy.get(SELECTOR.ID.NAME_INPUT).type('밧드');
    cy.get(SELECTOR.ID.PASSWORD_INPUT).type('password1234!');
    cy.get(SELECTOR.ID.PASSWORD_CONFIRM_INPUT).type('password1234!{enter}');

    cy.get(SELECTOR.ID.SIGNUP_SUBMIT).should('not.exist');
  });

  it('관리자는 로그아웃을 할 수 있다.', () => {
    cy.get(SELECTOR.ID.SIGN_BUTTON).click();

    cy.get(SELECTOR.ID.MENU_SIGN_OUT).click();
    cy.get(SELECTOR.ID.SIGN_BUTTON).contains('로그인');
  });

  it('관리자는 로그인을 할 수 있다.', () => {
    cy.get(SELECTOR.CLASS.CHARGE_MONEY_INPUT);
    cy.get(SELECTOR.ID.SIGN_BUTTON).click();

    cy.get(SELECTOR.ID.EMAIL_INPUT).type('rkadndud06@naver.com');
    cy.get(SELECTOR.ID.PASSWORD_INPUT).type('dndud5548!{enter}');

    cy.get(SELECTOR.ID.SIGNIN_SUBMIT).should('not.exist');
  });
});
