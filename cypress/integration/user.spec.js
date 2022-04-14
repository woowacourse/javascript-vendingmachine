import { ERROR_MESSAGE, SUCCESS, AUTH } from '../../src/constants';

const visitURL = 'http://localhost:9000/';

describe('회원가입 테스트', () => {
  it('이미 가입되어있는 이메일을 작성한 경우, 에러 메시지를 확인할 수 있어야한다.', () => {
    cy.visit(visitURL);
    cy.get('.login-button').click();
    cy.get('.signup').click();
    cy.get('#signup-email-input').type('winnie0512@test.com'); // heroku의 db.json의 default user값입니다. (테스트용)
    cy.get('#signup-name-input').type('위니');
    cy.get('#signup-password-input').type('alreadyexist0512');
    cy.get('#password-confirm-input').type('alreadyexist0512');
    cy.get('.signup-confirm-button').click();
    cy.get('#snackbar').should('have.text', AUTH.EMAIL_ALREADY_EXISTS);
  });

  it('비밀번호가 10자리 미만인 경우, 에러 메시지를 확인할 수 있어야한다.', () => {
    cy.get('#signup-email-input')
      .clear()
      .type(`${Math.random().toString(36).substring(10)}@email.com`);
    cy.get('#signup-password-input').clear().type('under');
    cy.get('#password-confirm-input').clear().type('under');
    cy.get('.signup-confirm-button').click();
    cy.get('#snackbar').should('have.text', ERROR_MESSAGE.IS_NOT_CORRECTED_PASSWORD);
  });

  it('비밀번호에 영어 대문자, 소문자, 숫자 중 2종류 이상이 조합되지 않은 경우, 에러 메시지를 확인할 수 있어야한다.', () => {
    cy.get('#signup-email-input')
      .clear()
      .type(`${Math.random().toString(36).substring(10)}@email.com`);
    cy.get('#signup-password-input').clear().type('onlyenglish');
    cy.get('#password-confirm-input').clear().type('onlyenglish');
    cy.get('.signup-confirm-button').click();
    cy.get('#snackbar').should('have.text', ERROR_MESSAGE.IS_NOT_CORRECTED_PASSWORD);
  });

  it('비밀번호 입력과 비밀번호 확인 입력이 다른 경우, 에러 메시지를 확인할 수 있어야한다.', () => {
    cy.get('#signup-password-input').clear().type('notmatch0512');
    cy.get('#password-confirm-input').clear().type('notmatch512');
    cy.get('.signup-confirm-button').click();
    cy.get('#snackbar').should('have.text', ERROR_MESSAGE.IS_NOT_MATCHED_PASSWORD);
  });

  it('회원가입이 가능하다.', () => {
    cy.get('#signup-password-input').clear().type('correctpassword0512');
    cy.get('#password-confirm-input').clear().type('correctpassword0512');
    cy.get('.signup-confirm-button').click();
    cy.get('#snackbar').should('have.text', SUCCESS.SIGNUP);
  });
});

describe('회원 정보 수정 테스트', () => {
  it('비밀번호가 10자리 미만인 경우, 에러 메시지를 확인할 수 있어야한다.', () => {
    cy.get('.profile-button').click();
    cy.get('.info-modify').click();
    cy.get('#info-name-input').type('로이');
    cy.get('#info-password-input').type('under');
    cy.get('#info-password-confirm-input').type('under');
    cy.get('.info-confirm-button').click();
    cy.get('#snackbar').should('have.text', ERROR_MESSAGE.IS_NOT_CORRECTED_PASSWORD);
  });
  it('비밀번호에 영어 대문자, 소문자, 숫자 중 2종류 이상이 조합되지 않은 경우, 에러 메시지를 확인할 수 있어야한다.', () => {
    cy.get('#info-password-input').clear().type('onlyenglish');
    cy.get('#info-password-confirm-input').clear().type('onlyenglish');
    cy.get('.info-confirm-button').click();
    cy.get('#snackbar').should('have.text', ERROR_MESSAGE.IS_NOT_CORRECTED_PASSWORD);
  });
  it('비밀번호 입력과 비밀번호 확인 입력이 다른 경우, 에러 메시지를 확인할 수 있어야한다.', () => {
    cy.get('#info-password-input').clear().type('notmatch0512');
    cy.get('#info-password-confirm-input').clear().type('notmatch512');
    cy.get('.info-confirm-button').click();
    cy.get('#snackbar').should('have.text', ERROR_MESSAGE.IS_NOT_MATCHED_PASSWORD);
  });
  it('회원 정보 수정이 가능하다.', () => {
    cy.get('#info-password-input').clear().type('correct0512');
    cy.get('#info-password-confirm-input').clear().type('correct0512');
    cy.get('.info-confirm-button').click();
    cy.get('#snackbar').should('have.text', SUCCESS.MODIFY);
  });
});

describe('로그아웃이 가능하다.', () => {
  it('로그아웃 버튼이 클릭되면, 로그아웃 완료 메시지를 확인할 수 있다.', () => {
    cy.get('.profile-button').click();
    cy.get('.logout').click();
    cy.get('#snackbar').should('have.text', SUCCESS.LOGOUT);
  });
});

describe('로그인 테스트', () => {
  it('입력된 이메일로 가입된 계정이 없을 경우, 에러메시지를 확인할 수 있다 .', () => {
    cy.get('.login-button').click();
    cy.get('#email-input').type('notexist@email.com');
    cy.get('#password-input').type('testpassword0512');
    cy.get('.login-confirm-button').click();
    cy.get('#snackbar').should('have.text', AUTH.CANNOT_FIND_USER);
  });
  it('비밀번호를 잘못 입력했을 경우, 에러메시지를 확인할 수 있다 .', () => {
    cy.get('#email-input').clear().type('winnie0512@test.com');
    cy.get('#password-input').clear().type('incorrectpassword');
    cy.get('.login-confirm-button').click();
    cy.get('#snackbar').should('have.text', AUTH.INCORRECT_PASSWORD);
  });
  it('비밀번호가 너무 짧은 경우, 에러메시지를 확인할 수 있다 .', () => {
    cy.get('#password-input').clear().type('hi');
    cy.get('.login-confirm-button').click();
    cy.get('#snackbar').should('have.text', AUTH.PASSWORD_IS_TOO_SHORT);
  });
  it('로그인이 가능하다.', () => {
    cy.get('#password-input').clear().type('testaccount0512');
    cy.get('.login-confirm-button').click();
    cy.get('#snackbar').should('have.text', SUCCESS.LOGIN);
  });
});
