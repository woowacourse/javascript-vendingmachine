import {
  MESSAGE,
  PURCHASE_CASH_RULE,
  USER_INFO_RULE,
} from '../../src/ts/constants';

describe('손님 입장에서 UI 정상 동작 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
  });

  afterEach(() => {
    cy.reload();
  });

  it('구매할 금액을 투입하면 보유 금액에 더해진다.', () => {
    const cash = PURCHASE_CASH_RULE.MAX;
    cy.get('.purchase-cash-charge__input').type(cash);
    cy.get('.purchase-cash-charge__button').click();
    cy.get('.purchase-cash-charge__total-cash').should('have.text', cash);
  });

  it('투입 버튼 클릭 시 스낵바가 보여진다.', () => {
    cy.get('.purchase-cash-charge__button').click();
    cy.get('#snackbar').should('have.class', 'show');
  });

  it('반환 버튼 클릭 시 스낵바가 보여진다.', () => {
    cy.get('.return-coin__button').click();
    cy.get('#snackbar').should('have.class', 'show');
  });
});

describe('관리자 입장에서 UI 정상 동작 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
  });

  afterEach(() => {
    cy.reload();
  });

  it('로그인 버튼을 누르면 로그인 화면만 보여진다.', () => {
    cy.get('.signin-button').click();

    cy.get('#main').should('have.class', 'hide');
    cy.get('#sign-in').should('not.have.class', 'hide');
    cy.get('#sign-up').should('have.class', 'hide');
    cy.get('#user-info-edit').should('have.class', 'hide');
  });

  it('로그인 화면에서 회원가입 버튼을 누르면 회원가입 화면만 보여진다.', () => {
    cy.get('.signin-button').click();
    cy.get('.sign-in__link-sign-up').click();

    cy.get('#main').should('have.class', 'hide');
    cy.get('#sign-in').should('have.class', 'hide');
    cy.get('#sign-up').should('not.have.class', 'hide');
    cy.get('#user-info-edit').should('have.class', 'hide');
  });

  it('회원가입 시 하나라도 입력하지 않은 값이 있을 경우 에러를 보여준다.', () => {
    cy.get('.signin-button').click();
    cy.get('.sign-in__link-sign-up').click();

    cy.get('#sign-up-email').type('abc@email.com');
    cy.get('#sign-up-name').type('하'.repeat(USER_INFO_RULE.MIN_NAME_LENGTH));
    cy.get('#sign-up-password').type(
      'p'.repeat(USER_INFO_RULE.MIN_PASSWORD_LENGTH),
    );
    // confirm password를 입력하지 않음
    cy.get('.sign-up__button').click();

    cy.get('#snackbar').should('have.text', MESSAGE.ERROR_USER_INFO_EMPTY);
  });

  it(`회원가입 시 이름의 길이가 ${USER_INFO_RULE.MIN_NAME_LENGTH}~${USER_INFO_RULE.MAX_NAME_LENGTH}자가 아닌 경우 에러를 보여준다.`, () => {
    cy.get('.signin-button').click();
    cy.get('.sign-in__link-sign-up').click();

    cy.get('#sign-up-email').type('abc@email.com');
    cy.get('#sign-up-name').type(
      '하'.repeat(USER_INFO_RULE.MAX_NAME_LENGTH + 1),
    );
    cy.get('#sign-up-password').type(
      'p'.repeat(USER_INFO_RULE.MIN_PASSWORD_LENGTH),
    );
    cy.get('#sign-up-confirm-password').type(
      'p'.repeat(USER_INFO_RULE.MIN_PASSWORD_LENGTH),
    );
    cy.get('.sign-up__button').click();

    cy.get('#snackbar').should('have.text', MESSAGE.ERROR_USER_NAME_LENGTH);
  });

  it(`회원가입 시 비밀번호의 길이가 ${USER_INFO_RULE.MIN_PASSWORD_LENGTH}자 이상이 아닌 경우 에러를 보여준다.`, () => {
    cy.get('.signin-button').click();
    cy.get('.sign-in__link-sign-up').click();

    cy.get('#sign-up-email').type('abc@email.com');
    cy.get('#sign-up-name').type('하'.repeat(USER_INFO_RULE.MIN_NAME_LENGTH));
    cy.get('#sign-up-password').type(
      'p'.repeat(USER_INFO_RULE.MIN_PASSWORD_LENGTH - 1),
    );
    cy.get('#sign-up-confirm-password').type(
      'p'.repeat(USER_INFO_RULE.MIN_PASSWORD_LENGTH - 1),
    );
    cy.get('.sign-up__button').click();

    cy.get('#snackbar').should('have.text', MESSAGE.ERROR_USER_PASSWORD_LENGTH);
  });

  it(`회원가입 시 비밀번호 확인이 위의 비밀번호와 다른 경우 에러를 보여준다.`, () => {
    cy.get('.signin-button').click();
    cy.get('.sign-in__link-sign-up').click();

    cy.get('#sign-up-email').type('abc@email.com');
    cy.get('#sign-up-name').type('하'.repeat(USER_INFO_RULE.MIN_NAME_LENGTH));
    cy.get('#sign-up-password').type(
      'p'.repeat(USER_INFO_RULE.MIN_PASSWORD_LENGTH),
    );
    cy.get('#sign-up-confirm-password').type(
      `${'p'.repeat(USER_INFO_RULE.MIN_PASSWORD_LENGTH)}different`,
    );
    cy.get('.sign-up__button').click();

    cy.get('#snackbar').should(
      'have.text',
      MESSAGE.ERROR_USER_CONFIRM_PASSWORD,
    );
  });
});
