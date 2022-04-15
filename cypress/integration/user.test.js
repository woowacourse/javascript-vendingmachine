import { pickNumberInRange } from '../../src/js/utils';
import {
  ERROR_MESSAGE,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  SUCCESS_MESSAGE,
} from '../../src/js/constants/';

describe('유저 테스트', () => {
  describe('회원가입 테스트', () => {
    it('name이 2~6글자 사이가 아니면 에러가 발생한다.', () => {
      cy.visit('/');
      cy.get('#to-login-anchor').click();
      cy.get('#signup--anchor').click();
      const email = `${pickNumberInRange(0, 255).toString(16)}${Date.now()}@gmail.com`;
      const name = 'a';
      const password = 'Abc1234!';
      cy.signUp(email, name, password, password);
      cy.get('#snackbar').should('have.text', ERROR_MESSAGE.INVALID_NAME_LENGTH);
    });

    it('name이 password글자가 형식에 맞지 않으면 에러가 발생한다.', () => {
      const email = `${pickNumberInRange(0, 255).toString(16)}${Date.now()}@gmail.com`;
      const name = 'abc';
      const password = 'Abc12';
      cy.signUp(email, name, password, password);
      cy.get('#snackbar').should('have.text', ERROR_MESSAGE.INVALID_PASSWORD);
    });

    it('이미 존재하는 이메일을 사용하는 경우 에러가 발생한다.', () => {
      const email = 'test123@naver.com';
      const password = 'Abc1234!';
      const name = '주동혁';
      cy.signUp(email, name, password, password);
      cy.get('#snackbar').should('have.text', SIGNUP_ERROR['Email already exists']);
    });

    it('형식에 맞는 회원가입 창을 작성하면 회원가입이 완료된다.', () => {
      const email = `${pickNumberInRange(0, 255).toString(16)}${Date.now()}@gmail.com`;
      const name = 'abcd';
      const password = 'Abc1234!';
      cy.signUp(email, name, password, password);
      cy.get('#snackbar').should('have.text', SUCCESS_MESSAGE.SIGNUP);
    });
  });

  let email = 'test123@naver.com';
  let name = 'test';
  let password = 'Abc1234!';

  describe('로그인 테스트', () => {
    it('존재하지 않는 이메일을 입력하면 해당 에러가 발생한다.', () => {
      const invalidEmail = 'test1234@naver.com';
      cy.visit('/');
      cy.get('#to-login-anchor').click();
      cy.login(invalidEmail, password);
      cy.get('#snackbar').should('have.text', LOGIN_ERROR['Cannot find user']);
    });

    it('비밀번호가 틀리면 해당 에러가 발생한다.', () => {
      const invalidPassword = 'asdQWE@!#';
      cy.login(email, invalidPassword);
      cy.get('#snackbar').should('have.text', LOGIN_ERROR['Incorrect password']);
    });

    it('올바른 회원 폼을 작성하면 로그인이 완료된다.', () => {
      cy.login(email, password);
      cy.get('#snackbar').should('have.text', SUCCESS_MESSAGE.LOGIN);
    });

    it('로그인 후 사용자 이름의 첫번째 글자를 썸네일로 보인다.', () => {
      cy.get('.user-navigation-profile--button').should('have.text', name.charAt(0));
    });
  });

  describe('회원정보 수정 테스트', () => {
    const email = `${pickNumberInRange(0, 255).toString(16)}${Date.now()}@gmail.com`;
    const name = 'ABCD';
    const password = 'Abc1234!';

    it('로그인후 썸네일을 클릭하면 회원 정보 수정을 볼 수 있다.', () => {
      cy.get('.user-navigation-profile--button').click();
      cy.get('#logout').click();
      cy.visit('/#/signup');
      cy.signUp(email, name, password, password);
      cy.get('.user-navigation-profile--button').click();
      cy.get('#user-navigation-profile').should('be.visible');
      cy.get('#logout').should('be.visible');
    });

    it('로그인 후 회원정보 수정을 클릭하면 썸네일이 바뀐다.', () => {
      cy.get('.user-navigation-profile--button').click();
      cy.get('#user-navigation-profile').click();
      cy.updateUser('test', password, password);
      cy.get('.user-navigation-profile--button').should('have.text', 't');
    });
  });

  describe('로그아웃 테스트', () => {
    it('로그아웃 하면 썸네일이 로그인 버튼으로 바뀐다.', () => {
      cy.get('.user-navigation-profile--button').click();
      cy.get('#logout').click();
      cy.get('#to-login-anchor').should('be.visible');
    });
  });
});
