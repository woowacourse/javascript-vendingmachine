const ramdomNumber = Math.random().toString(36);
const email = `test${ramdomNumber}@gmail.com`;
const password = 'Harry0044!';
const passwordConfirm = 'Harry0044!';
const userName = '테스트';

describe('사용자 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
  });

  it('1000원 미만의 금액을 투입하면 금액이 충전되지 않는다.', () => {
    const inputMoney = 900;
    cy.get('#input-money-input').type(inputMoney);
    cy.get('#input-form__submit-button').click();
    cy.get('.input-money-indicator').should('have.text', `투입한 금액: 0원`);
  });

  it('10000원을 초과하는 금액을 투입하면 금액이 충전되지 않는다.', () => {
    const inputMoney = 11000;
    cy.get('#input-money-input').type(inputMoney);
    cy.get('#input-form__submit-button').click();
    cy.get('.input-money-indicator').should('have.text', `투입한 금액: 0원`);
  });

  it('10으로 나누어떨어지지 않는 금액을 투입하면 금액이 충전되지 않는다.', () => {
    const inputMoney = 1001;
    cy.get('#input-money-input').type(inputMoney);
    cy.get('#input-form__submit-button').click();
    cy.get('.input-money-indicator').should('have.text', `투입한 금액: 0원`);
  });

  it('올바른 액수의 금액을 투입하면 금액이 충전된다.', () => {
    const inputMoney = 5000;
    cy.get('#input-money-input').type(inputMoney);
    cy.get('#input-form__submit-button').click();
    cy.get('.input-money-indicator').should('have.text', `투입한 금액: ${inputMoney}원`);
  });

  it('회원가입을 할 수 있다', () => {
    cy.get('.login-button').click();
    cy.get('#link').click();

    cy.get('#signup-form__email-input').type(email);
    cy.get('#signup-form__name-input').type(userName);
    cy.get('#signup-form__password-input').type(password);
    cy.get('#signup-form__password-check-input').type(passwordConfirm);
    cy.get('#signup-confirm-button').click();

    cy.get('#name-thumbnail').should('have.text', userName[0]);
  });

  it('등록되지 않은 이메일로 로그인 할 수 없다.', () => {
    cy.get('.login-button').click();
    cy.get('#login-form__email-input').type('asdfsadf123@test.com');
    cy.get('#login-form__password-input').type(password);
    cy.get('#login-confirm-button').click();

    cy.get('#name-thumbnail').should('have.text', '아이디');
  });

  it('틀린 비밀번호로 로그인 할 수 없다.', () => {
    cy.get('.login-button').click();
    cy.get('#login-form__email-input').type(email);
    cy.get('#login-form__password-input').type('1');
    cy.get('#login-confirm-button').click();

    cy.get('#name-thumbnail').should('have.text', '아이디');
  });

  it('로그인을 할 수 있다.', () => {
    cy.get('.login-button').click();
    cy.get('#login-form__email-input').type(email);
    cy.get('#login-form__password-input').type(password);
    cy.get('#login-confirm-button').click();

    cy.get('#name-thumbnail').should('have.text', userName[0]);
  });
});
